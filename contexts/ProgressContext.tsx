import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { deriveProgressMetrics, loadMergedCompletedLessonIds } from '@/lib/programProgressMerge';
import { supabase } from '@/lib/supabase';

interface Progress {
  completedCount: number;
  nextStep: number;
  /** Merged server + device; same set the program list uses for checkmarks */
  completedLessonIds: string[];
}

interface ProgressContextType {
  progress: Progress;
  refreshProgress: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const emptyProgress: Progress = { completedCount: 0, nextStep: 1, completedLessonIds: [] };

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const refreshSeqRef = useRef(0);

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setProgress(emptyProgress);
      return;
    }

    const seq = ++refreshSeqRef.current;
    console.log('PROGRESS CONTEXT: refreshProgress called for user', user.id);
    const merged = await loadMergedCompletedLessonIds(user.id);
    const { completedCount, nextStep } = deriveProgressMetrics(merged);
    const completedLessonIds = [...merged].sort();
    console.log('PROGRESS CONTEXT: merged size:', merged.size, 'completedCount:', completedCount, 'nextStep:', nextStep);

    // Evita sobrescrever com resposta antiga quando múltiplos refreshes correm em paralelo.
    if (seq === refreshSeqRef.current) {
      setProgress({ completedCount, nextStep, completedLessonIds });
    }
  }, [user]);

  useEffect(() => {
    void refreshProgress();
  }, [refreshProgress]);

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`progress_context:${user.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_progress',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          void refreshProgress();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, refreshProgress]);

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
