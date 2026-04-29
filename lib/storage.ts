import { Platform } from 'react-native';

const isWeb = Platform.OS === 'web';

export const storage = {
  async getItem(key: string): Promise<string | null> {
    if (isWeb) {
      if (typeof window === 'undefined') return null;
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    }
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    if (isWeb) {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.setItem(key, value);
      } catch {}
      return;
    }
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      await AsyncStorage.setItem(key, value);
    } catch {}
  },

  async removeItem(key: string): Promise<void> {
    if (isWeb) {
      if (typeof window === 'undefined') return;
      try {
        window.localStorage.removeItem(key);
      } catch {}
      return;
    }
    try {
      const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
      await AsyncStorage.removeItem(key);
    } catch {}
  },
};
