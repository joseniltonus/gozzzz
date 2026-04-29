import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

interface Progress {
  completedCount: number;
  nextStep: number;
}

interface ProgressContextType {
  progress: Progress;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>({ completedCount: 0, nextStep: 1 });

  const refreshProgress = useCallback(async () => {
    if (!user) return;
    console.log('PROGRESS CONTEXT: refreshProgress called for user', user.id);
    const localProgressKey = `user_progress_local_${user.id}`;

    const { data, error } = await supabase
      .from('user_progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('completed', true);

    let localCount = 0;
    try {
      const localRaw =
        Platform.OS === 'web'
          ? localStorage.getItem(localProgressKey)
          : await SecureStore.getItemAsync(localProgressKey);
      if (localRaw) {
        const parsed = JSON.parse(localRaw);
        if (Array.isArray(parsed)) localCount = parsed.length;
      }
    } catch {}

    if (!error && data) {
      const completedCount = Math.max(data.length, localCount);
      const nextStep = completedCount + 1;
      console.log('PROGRESS CONTEXT: completedCount:', completedCount, 'nextStep:', nextStep);
      setProgress({ completedCount, nextStep });
    } else if (error) {
      console.log('PROGRESS CONTEXT: fetch error', error.message);
      const completedCount = localCount;
      const nextStep = completedCount + 1;
      setProgress({ completedCount, nextStep });
    }
  }, [user]);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  return (
    <ProgressContext.Provider value={{ progress, refreshProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}
