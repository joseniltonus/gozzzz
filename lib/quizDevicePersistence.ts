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
