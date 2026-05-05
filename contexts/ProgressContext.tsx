import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { deriveProgressMetrics, loadMergedCompletedLessonIds } from '@/lib/programProgressMerge';

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

  const refreshProgress = useCallback(async () => {
    if (!user) {
      setProgress(emptyProgress);
      return;
    }

    console.log('PROGRESS CONTEXT: refreshProgress called for user', user.id);
    const merged = await loadMergedCompletedLessonIds(user.id);
    const { completedCount, nextStep } = deriveProgressMetrics(merged);
    const completedLessonIds = [...merged].sort();
    console.log('PROGRESS CONTEXT: merged size:', merged.size, 'completedCount:', completedCount, 'nextStep:', nextStep);
    setProgress({ completedCount, nextStep, completedLessonIds });
  }, [user]);

  useEffect(() => {
    void refreshProgress();
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
