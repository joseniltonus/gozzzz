import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import type { Chronotype } from '@/data/chronotypes';
import {
  isValidChronotypeString,
  readGozzzzChronotypeWeb,
  readQuizChronotypeFromDevice,
} from '@/lib/quizDevicePersistence';

/**
 * Same merge order as Home `effectiveProfile.chronotype`: device quiz result, then Supabase profile, then JWT metadata.
 * Use anywhere personalized copy depends on chronotype so lessons/program match the dashboard after quiz.
 *
 * Adicionado: fallback pra `gozzzz_chronotype` (chave usada pelo quiz inline
 * da /web/sono-plus). Sem isso, quem comprou via Kiwify e fez o quiz mas
 * nunca criou conta veria o programa sem cronótipo nenhum.
 */
export function useEffectiveChronotype(): Chronotype | null {
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const [localChronotype, setLocalChronotype] = useState<Chronotype | null>(null);
  const [webAnonChronotype, setWebAnonChronotype] = useState<Chronotype | null>(null);

  const loadLocal = useCallback(async () => {
    setWebAnonChronotype(readGozzzzChronotypeWeb());
    if (!user?.id) {
      setLocalChronotype(null);
      return;
    }
    const c = await readQuizChronotypeFromDevice(user.id);
    setLocalChronotype(c);
  }, [user?.id]);

  useEffect(() => {
    void loadLocal();
  }, [loadLocal]);

  useFocusEffect(
    useCallback(() => {
      void loadLocal();
    }, [loadLocal]),
  );

  const fromMeta = isValidChronotypeString(
    (user?.user_metadata as { chronotype?: string } | undefined)?.chronotype,
  )
    ? ((user?.user_metadata as { chronotype: Chronotype }).chronotype)
    : null;

  const fromProfile = isValidChronotypeString(profile?.chronotype) ? (profile!.chronotype as Chronotype) : null;

  return localChronotype ?? fromProfile ?? fromMeta ?? webAnonChronotype;
}
