import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

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
