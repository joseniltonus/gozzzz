import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { SchedulableTriggerInputTypes, AndroidImportance } from 'expo-notifications';
import type { Chronotype } from '@/data/chronotypes';
import {
  engagementHref,
  pickEngagementCopy,
  type EngagementLang,
  type EngagementSlot,
} from '@/lib/engagementNotificationCopy';

const PREF_KEY = '@gozzzz/pref_engagement_local_notifications';
const ENGAGEMENT_ID_PREFIX = 'gozzzz_eng_';
const ANDROID_CHANNEL_ID = 'engagement_routine';

type DayParts = { morning: [number, number]; windDown: [number, number]; program: [number, number]; midday: [number, number] };

/** Local times aligned with common chronotype patterns (light / melatonin phase), not medical advice. */
const SCHEDULE: Record<Chronotype, DayParts> = {
  lion: { morning: [6, 45], windDown: [20, 15], program: [11, 20], midday: [13, 30] },
  bear: { morning: [8, 15], windDown: [21, 15], program: [12, 45], midday: [14, 0] },
  wolf: { morning: [9, 30], windDown: [22, 15], program: [15, 30], midday: [14, 45] },
  dolphin: { morning: [8, 30], windDown: [20, 45], program: [12, 15], midday: [14, 15] },
};

export async function readEngagementNotificationPref(): Promise<boolean> {
  try {
    const v = await AsyncStorage.getItem(PREF_KEY);
    if (v === null) return false;
    return v === '1';
  } catch {
    return false;
  }
}

export async function setEngagementNotificationPref(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(PREF_KEY, enabled ? '1' : '0');
}

function atLocalDateWithTime(base: Date, dayOffset: number, hour: number, minute: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(hour, minute, 0, 0);
  return d;
}

export async function cancelEngagementScheduledNotifications(): Promise<void> {
  if (Platform.OS === 'web') return;
  try {
    const all = await Notifications.getAllScheduledNotificationsAsync();
    await Promise.all(
      all
        .filter((req) => req.identifier.startsWith(ENGAGEMENT_ID_PREFIX))
        .map((req) => Notifications.cancelScheduledNotificationAsync(req.identifier)),
    );
  } catch {
    // ignore
  }
}

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: 'Rotina & sono',
    importance: AndroidImportance.DEFAULT,
    vibrationPattern: [0, 160],
  });
}

export async function requestEngagementNotificationPermissions(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === 'granted') return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export interface RescheduleEngagementParams {
  enabled: boolean;
  chronotype: Chronotype;
  lang: EngagementLang;
  isPremium: boolean;
}

/**
 * Schedules the next ~12 days of local notifications (morning + wind-down per day,
 * optional midday for wolf/dolphin, weekly program nudge, optional Concierge for premium).
 */
export async function rescheduleEngagementNotifications(params: RescheduleEngagementParams): Promise<void> {
  const { enabled, chronotype, lang, isPremium } = params;
  if (Platform.OS === 'web' || !enabled) {
    await cancelEngagementScheduledNotifications();
    return;
  }

  const granted = await requestEngagementNotificationPermissions();
  if (!granted) {
    await cancelEngagementScheduledNotifications();
    return;
  }

  await cancelEngagementScheduledNotifications();
  await ensureAndroidChannel();

  const now = Date.now();
  const parts = SCHEDULE[chronotype] ?? SCHEDULE.bear;
  const horizonDays = 12;

  const scheduleOne = async (idSuffix: string, date: Date, slot: EngagementSlot, seed: number) => {
    if (date.getTime() <= now + 25_000) return;
    const copy = pickEngagementCopy(chronotype, lang, slot, seed);
    const href = engagementHref(slot);
    const identifier = `${ENGAGEMENT_ID_PREFIX}${idSuffix}`;
    await Notifications.scheduleNotificationAsync({
      identifier,
      content: {
        title: copy.title,
        body: copy.body,
        data: { href, scope: 'engagement', slot },
        sound: false,
        ...(Platform.OS === 'android' ? { channelId: ANDROID_CHANNEL_ID } : {}),
      },
      trigger: { type: SchedulableTriggerInputTypes.DATE, date },
    });
  };

  for (let dayOffset = 0; dayOffset < horizonDays; dayOffset++) {
    const dayDate = new Date();
    dayDate.setHours(0, 0, 0, 0);
    dayDate.setDate(dayDate.getDate() + dayOffset);
    const weekday = dayDate.getDay();

    const [mh, mm] = parts.morning;
    const morningD = atLocalDateWithTime(new Date(), dayOffset, mh, mm);
    await scheduleOne(`d${dayOffset}_morning`, morningD, 'morning', dayOffset * 97 + 1);

    const [wh, wm] = parts.windDown;
    const windD = atLocalDateWithTime(new Date(), dayOffset, wh, wm);
    await scheduleOne(`d${dayOffset}_wind`, windD, 'wind_down', dayOffset * 97 + 2);

    if (chronotype === 'wolf' || chronotype === 'dolphin') {
      if (weekday === 2 || weekday === 5) {
        const [dh, dm] = parts.midday;
        const midD = atLocalDateWithTime(new Date(), dayOffset, dh, dm);
        await scheduleOne(`d${dayOffset}_mid`, midD, 'midday', dayOffset * 97 + 3);
      }
    }

    if (weekday === 4) {
      const [ph, pm] = parts.program;
      const progD = atLocalDateWithTime(new Date(), dayOffset, ph, pm);
      await scheduleOne(`d${dayOffset}_prog`, progD, 'program', dayOffset * 97 + 4);
    }
  }

  if (isPremium) {
    let conciergePlaced = false;
    for (let dayOffset = 0; dayOffset < horizonDays && !conciergePlaced; dayOffset++) {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() + dayOffset);
      if (d.getDay() !== 3) continue;
      const [ch, cm] = [18, 10];
      const cDate = atLocalDateWithTime(new Date(), dayOffset, ch, cm);
      if (cDate.getTime() > now + 25_000) {
        await scheduleOne(`d${dayOffset}_conc`, cDate, 'concierge', dayOffset * 131 + 5);
        conciergePlaced = true;
      }
    }
  }
}

let handlerInstalled = false;

export function ensureEngagementNotificationHandler(): void {
  if (handlerInstalled || Platform.OS === 'web') return;
  handlerInstalled = true;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}
