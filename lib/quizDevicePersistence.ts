import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import type { Chronotype } from '@/data/chronotypes';

export function isValidChronotypeString(v: string | null | undefined): v is Chronotype {
  return v === 'lion' || v === 'bear' || v === 'wolf' || v === 'dolphin';
}

/** Same keys as `(tabs)/home` and `ChronotypeQuizModal`: latest wins, then per-user key. */
export async function readQuizChronotypeFromDevice(userId: string): Promise<Chronotype | null> {
  try {
    const key = `quiz_chronotype_${userId}`;
    const latestKey = 'quiz_latest_chronotype';
    const [userValue, latestValue] =
      Platform.OS === 'web'
        ? [
            typeof window !== 'undefined' ? window.localStorage.getItem(key) : null,
            typeof window !== 'undefined' ? window.localStorage.getItem(latestKey) : null,
          ]
        : [await SecureStore.getItemAsync(key), await SecureStore.getItemAsync(latestKey)];

    if (isValidChronotypeString(latestValue)) return latestValue;
    if (isValidChronotypeString(userValue)) return userValue;
    return null;
  } catch (err) {
    console.error('Local chronotype read error:', err);
    return null;
  }
}

/**
 * Web-only: lê o cronótipo salvo pelo quiz inline da landing /web/sono-plus
 * (e pelo `ChronotypeQuizModal` quando rodando no web). Usado como fallback
 * pra usuários anônimos que vieram do funil Kiwify e ainda não têm conta.
 *
 * Por que existe uma chave separada: o quiz da landing salva em `gozzzz_chronotype`
 * (sem id de usuário). O sistema do app usa `quiz_latest_chronotype` /
 * `quiz_chronotype_<userId>`. Esta função une as duas leituras pra que a
 * personalização funcione em todo o web.
 */
export function readGozzzzChronotypeWeb(): Chronotype | null {
  if (Platform.OS !== 'web') return null;
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const value = window.localStorage.getItem('gozzzz_chronotype');
    if (isValidChronotypeString(value)) return value;
    const latest = window.localStorage.getItem('quiz_latest_chronotype');
    if (isValidChronotypeString(latest)) return latest;
    return null;
  } catch {
    return null;
  }
}

export async function saveQuizChronotypeToDevice(userId: string, chronotype: string): Promise<void> {
  try {
    const key = `quiz_chronotype_${userId}`;
    const latestKey = 'quiz_latest_chronotype';
    const verifiedKey = `quiz_chronotype_verified_${userId}`;
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, chronotype);
      window.localStorage.setItem(latestKey, chronotype);
      window.localStorage.setItem(verifiedKey, 'true');
      return;
    }
    await Promise.all([
      SecureStore.setItemAsync(key, chronotype),
      SecureStore.setItemAsync(latestKey, chronotype),
      SecureStore.setItemAsync(verifiedKey, 'true'),
    ]);
  } catch (err) {
    console.error('Local chronotype save error:', err);
  }
}

export async function readQuizChronotypeVerifiedFromDevice(userId: string): Promise<boolean> {
  try {
    const vKey = `quiz_chronotype_verified_${userId}`;
    const value =
      Platform.OS === 'web'
        ? typeof window !== 'undefined'
          ? window.localStorage.getItem(vKey)
          : null
        : await SecureStore.getItemAsync(vKey);
    return value === 'true';
  } catch {
    return false;
  }
}

/** Same backing store rules as `(tabs)/home`: localStorage on web, Secure Store on native. */
export async function readQuizDoneLocal(userId: string): Promise<boolean> {
  const key = `quiz_done_${userId}`;
  try {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return false;
      return window.localStorage.getItem(key) === 'true';
    }
    return (await SecureStore.getItemAsync(key)) === 'true';
  } catch {
    return false;
  }
}

export async function saveQuizDoneLocal(userId: string): Promise<void> {
  const key = `quiz_done_${userId}`;
  try {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.localStorage.setItem(key, 'true');
      return;
    }
    await SecureStore.setItemAsync(key, 'true');
  } catch {
    /* best-effort */
  }
}

/** Set when anon user finishes quiz (before signup). Migrated to per-user quiz_done_* on login. */
const PRE_REG_QUIZ_KEY = 'quiz_done_pre_registration';

export async function savePreRegistrationQuizDone(): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.localStorage.setItem(PRE_REG_QUIZ_KEY, 'true');
      return;
    }
    await SecureStore.setItemAsync(PRE_REG_QUIZ_KEY, 'true');
  } catch {
    /* best-effort */
  }
}

export async function readPreRegistrationQuizDone(): Promise<boolean> {
  try {
    if (Platform.OS === 'web') {
      if (typeof window === 'undefined') return false;
      return window.localStorage.getItem(PRE_REG_QUIZ_KEY) === 'true';
    }
    return (await SecureStore.getItemAsync(PRE_REG_QUIZ_KEY)) === 'true';
  } catch {
    return false;
  }
}

export async function clearPreRegistrationQuizDone(): Promise<void> {
  try {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') window.localStorage.removeItem(PRE_REG_QUIZ_KEY);
      return;
    }
    await SecureStore.deleteItemAsync(PRE_REG_QUIZ_KEY);
  } catch {
    /* best-effort */
  }
}
