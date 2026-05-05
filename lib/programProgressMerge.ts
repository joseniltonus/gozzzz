import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { supabase } from '@/lib/supabase';
import { LESSONS_DATA } from '@/data/lessons';

export function userProgressLocalStorageKey(userId: string): string {
  return `user_progress_local_${userId}`;
}

/**
 * Completed lesson ids from Supabase plus offline queue (same keys as lesson completion writes).
 * Union avoids home vs program drift when the server is behind or RLS blocks a row.
 */
export async function loadMergedCompletedLessonIds(userId: string): Promise<Set<string>> {
  const merged = new Set<string>();

  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('completed', true);

  if (!error && data) {
    for (const row of data as { lesson_id: string | number }[]) {
      merged.add(String(row.lesson_id));
    }
  }

  try {
    const key = userProgressLocalStorageKey(userId);
    const raw =
      Platform.OS === 'web'
        ? typeof window !== 'undefined'
          ? window.localStorage.getItem(key)
          : null
        : await SecureStore.getItemAsync(key);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        for (const id of parsed) {
          merged.add(String(id));
        }
      }
    }
  } catch {
    /* best-effort local merge */
  }

  return merged;
}

/** Ordered program steps: count completed + first missing step as "next". */
export function deriveProgressMetrics(completedIds: Set<string>): { completedCount: number; nextStep: number } {
  const ordered = [...LESSONS_DATA].sort((a, b) => a.step_number - b.step_number);
  const completedCount = ordered.filter((l) => completedIds.has(l.id)).length;
  let nextStep = 22;
  for (const l of ordered) {
    if (!completedIds.has(l.id)) {
      nextStep = l.step_number;
      break;
    }
  }
  return { completedCount, nextStep };
}
