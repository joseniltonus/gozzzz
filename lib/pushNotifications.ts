import { Platform } from 'react-native';
import { storage } from './storage';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const output = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }
  return output.buffer as ArrayBuffer;
}

export function computeAndSyncWeek(): number {
  if (Platform.OS !== 'web') return 1;
  try {
    const raw = window.localStorage.getItem('gozzzz_onboarding_date');
    if (!raw) return 1;
    const daysPassed = Math.floor((Date.now() - parseInt(raw, 10)) / 86_400_000);
    const week = Math.min(Math.floor(daysPassed / 7) + 1, 3);
    window.localStorage.setItem('gozzzz_week', String(week));
    return week;
  } catch {
    return 1;
  }
}

async function getVapidPublicKey(): Promise<string | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/vapid-key`, {
      headers: { Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
    });
    const data = await res.json();
    return data.publicKey ?? null;
  } catch {
    return null;
  }
}

export async function subscribeToPushNotifications(): Promise<boolean> {
  try {
    const [chronotype, lang, onboarding_date_raw] = await Promise.all([
      storage.getItem('gozzzz_chronotype'),
      storage.getItem('gozzzz_lang'),
      storage.getItem('gozzzz_onboarding_date'),
    ]);
    const week = computeAndSyncWeek();
    const utc_offset = -new Date().getTimezoneOffset();
    const onboarding_date = parseInt(onboarding_date_raw || '0', 10);

    await storage.setItem('gozzzz_week', String(week));

    if (Platform.OS === 'web') {
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) return false;

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return false;

      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;

      const vapidKey = await getVapidPublicKey();
      if (!vapidKey) return false;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey),
      });

      const res = await fetch(`${SUPABASE_URL}/functions/v1/push-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          chronotype: chronotype || 'bear',
          lang: lang || 'pt',
          onboarding_date,
          utc_offset,
        }),
      });

      return res.ok;
    } else {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/push-subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          subscription: null,
          chronotype: chronotype || 'bear',
          lang: lang || 'pt',
          onboarding_date,
          utc_offset,
          platform: Platform.OS,
        }),
      });

      return res.ok;
    }
  } catch {
    return false;
  }
}

export function isPushSupported(): boolean {
  if (Platform.OS === 'web') {
    return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  }
  return true;
}

export function getPushPermissionState(): NotificationPermission | 'unsupported' {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
}
