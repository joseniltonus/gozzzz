import { useCallback, useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import type { Chronotype } from '@/data/chronotypes';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import {
  cancelEngagementScheduledNotifications,
  ensureEngagementNotificationHandler,
  readEngagementNotificationPref,
  rescheduleEngagementNotifications,
} from '@/lib/engagementNotifications';
import type { EngagementLang } from '@/lib/engagementNotificationCopy';

/**
 * Keeps local engagement notifications aligned with chronotype, language, premium flag, and user preference.
 */
export function EngagementNotificationSync() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const { profile } = useUserProfile();
  const chronotype = useEffectiveChronotype();
  const router = useRouter();
  const appState = useRef(AppState.currentState);
  const coldStartHandled = useRef(false);

  const sync = useCallback(async () => {
    if (Platform.OS === 'web') return;
    if (!user) {
      await cancelEngagementScheduledNotifications();
      return;
    }
    const enabled = await readEngagementNotificationPref();
    const ct = (chronotype ?? 'bear') as Chronotype;
    const lang = (language === 'en' ? 'en' : 'pt') as EngagementLang;
    const isPremium = hasPremiumProgramAccess(profile?.subscription_type, user.email);
    await rescheduleEngagementNotifications({
      enabled,
      chronotype: ct,
      lang,
      isPremium,
    });
  }, [user, chronotype, language, profile?.subscription_type]);

  useEffect(() => {
    ensureEngagementNotificationHandler();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const href = response.notification.request.content.data?.href;
      if (typeof href === 'string' && href.startsWith('/(')) {
        router.push(href as Parameters<typeof router.push>[0]);
      }
    });
    return () => sub.remove();
  }, [router]);

  useEffect(() => {
    if (Platform.OS === 'web' || coldStartHandled.current) return;
    void (async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (!response || coldStartHandled.current) return;
      if (response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) return;
      const href = response.notification.request.content.data?.href;
      if (typeof href === 'string' && href.startsWith('/(')) {
        coldStartHandled.current = true;
        router.push(href as Parameters<typeof router.push>[0]);
        await Notifications.clearLastNotificationResponseAsync();
      }
    })();
  }, [router]);

  useEffect(() => {
    void sync();
  }, [sync]);

  useEffect(() => {
    if (Platform.OS === 'web' || !user) return;
    const sub = AppState.addEventListener('change', (next) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        void sync();
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, [user, sync]);

  return null;
}
