import type { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { saveQuizDoneLocal } from '@/lib/quizDevicePersistence';

const VALID_CHRONO = new Set(['lion', 'bear', 'wolf', 'dolphin']);

function isValidChronotype(value: string | null | undefined): value is string {
  return !!value && VALID_CHRONO.has(value);
}

type ProfileQuizRow = {
  quiz_completed?: boolean;
  chronotype?: string | null;
  language?: string | null;
};

/**
 * Align Supabase profiles ↔ Auth JWT ↔ device storage so quiz completion cannot regress
 * after reinstall, login on another device, or partial writes.
 *
 * Safe to fire on INITIAL_SESSION / SIGNED_IN / TOKEN_REFRESHED (idempotent).
 */
export async function syncQuizCompletionFromServer(user: User | null | undefined): Promise<void> {
  if (!user?.id) return;

  const meta = (user.user_metadata ?? {}) as {
    quiz_completed?: boolean;
    chronotype?: string;
    language?: string;
  };
  let profile: ProfileQuizRow | null = null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('quiz_completed, chronotype, language')
      .eq('id', user.id)
      .maybeSingle();

    if (!error && data) profile = data as ProfileQuizRow;
  } catch {
    /* non-blocking */
  }

  const profileDone = profile?.quiz_completed === true;
  const metaDone = meta.quiz_completed === true;

  /** Never infer from chronotype alone — DB default is `bear` for new users. */
  const done = profileDone || metaDone;

  // Device cache must mirror server/JWT whenever we trust completion.
  if (done) {
    await saveQuizDoneLocal(user.id);
  }

  const profileCt = typeof profile?.chronotype === 'string' ? profile.chronotype : '';
  const metaCt = typeof meta.chronotype === 'string' ? meta.chronotype : '';

  // Authoritative DB row → JWT (new device never saw metadata).
  if (profileDone && !metaDone && isValidChronotype(profileCt)) {
    const { error } = await supabase.auth.updateUser({
      data: {
        quiz_completed: true,
        chronotype: profileCt,
        language: profile?.language ?? meta.language ?? 'pt',
      },
    });
    if (error) console.warn('[QUIZ_SYNC:JWT_BACKFILL]', error.message ?? error);
    return;
  }

  // JWT has completion but profiles row lagged / update hit 0 rows → repair DB from metadata.
  if (metaDone && !profileDone && isValidChronotype(metaCt)) {
    const { error } = await (supabase as any)
      .from('profiles')
      .update({
        chronotype: metaCt,
        language: meta.language ?? 'pt',
        quiz_completed: true,
        quiz_progress: null,
        quiz_completed_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (error) console.warn('[QUIZ_SYNC:PROFILE_BACKFILL]', error);
    return;
  }

  // Only profile says done without metadata chronotype edge (legacy rows).
  if (profileDone && !metaDone && !isValidChronotype(profileCt)) {
    const { error } = await supabase.auth.updateUser({
      data: { quiz_completed: true },
    });
    if (error) console.warn('[QUIZ_SYNC:JWT_QUIZONLY_BACKFILL]', error.message ?? error);
  }
}
