import { useState, useCallback, useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Platform, useWindowDimensions, Animated, Easing } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useProgress } from '@/contexts/ProgressContext';
import { getChronotypeInfo } from '@/data/chronotypes';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import ChronotypeQuizModal from '@/components/ChronotypeQuizModal';
import * as SecureStore from 'expo-secure-store';
import { saveQuizDoneLocal, readQuizDoneLocal } from '@/lib/quizDevicePersistence';
import { supabase } from '@/lib/supabase';

type Chronotype = 'lion' | 'bear' | 'wolf' | 'dolphin';
type Lang = 'pt' | 'en';

const PURPLE = '#7c6fff';
const BG = '#0f0e1a';
const CARD_BG = '#1a1830';
const GOLD = '#d4a96a';

const saveQuizChronotype = async (userId: string, chronotype: string) => {
  try {
    const key = `quiz_chronotype_${userId}`;
    const latestKey = 'quiz_latest_chronotype';
    const verifiedKey = `quiz_chronotype_verified_${userId}`;
    if (Platform.OS === 'web') {
      localStorage.setItem(key, chronotype);
      localStorage.setItem(latestKey, chronotype);
      localStorage.setItem(verifiedKey, 'true');
    } else {
      await Promise.all([
        SecureStore.setItemAsync(key, chronotype),
        SecureStore.setItemAsync(latestKey, chronotype),
        SecureStore.setItemAsync(verifiedKey, 'true'),
      ]);
    }
  } catch (err) {
    console.error('Local chronotype save error:', err);
  }
};

const readChronotypeVerified = async (userId: string): Promise<boolean> => {
  try {
    const key = `quiz_chronotype_verified_${userId}`;
    const value = Platform.OS === 'web' ? localStorage.getItem(key) : await SecureStore.getItemAsync(key);
    return value === 'true';
  } catch {
    return false;
  }
};

const readQuizChronotype = async (userId: string): Promise<Chronotype | null> => {
  try {
    const key = `quiz_chronotype_${userId}`;
    const latestKey = 'quiz_latest_chronotype';
    const [userValue, latestValue] = Platform.OS === 'web'
      ? [localStorage.getItem(key), localStorage.getItem(latestKey)]
      : [await SecureStore.getItemAsync(key), await SecureStore.getItemAsync(latestKey)];

    const isValid = (v: string | null): v is Chronotype =>
      v === 'lion' || v === 'bear' || v === 'wolf' || v === 'dolphin';

    // Prefer latest quiz result if available.
    if (isValid(latestValue)) {
      return latestValue;
    }
    if (isValid(userValue)) {
      return userValue;
    }
    return null;
  } catch (err) {
    console.error('Local chronotype read error:', err);
    return null;
  }
};

const isChronotype = (value: string | null | undefined): value is Chronotype =>
  value === 'lion' || value === 'bear' || value === 'wolf' || value === 'dolphin';

// ─── DASHBOARD ─────────────────────────────────────────────────
function ReturningUserScreen({ profile, lang, progress }: { profile: any; lang: Lang; progress: any }) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isNarrowScreen = width < 380;
  const info = getChronotypeInfo(profile.chronotype, lang);
  const progressPercent = Math.round(((progress.completedCount ?? 0) / 21) * 100);
  const emojiMap: Record<string, string> = { lion: '🦁', bear: '🐻', wolf: '🐺', dolphin: '🐬' };
  const moonPulse = useRef(new Animated.Value(0)).current;
  const starsTwinkle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const moonLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(moonPulse, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(moonPulse, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    const starLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(starsTwinkle, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(starsTwinkle, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    );
    moonLoop.start();
    starLoop.start();
    return () => {
      moonLoop.stop();
      starLoop.stop();
    };
  }, [moonPulse, starsTwinkle]);

  return (
    <ScrollView style={styles.dashboardContainer} contentContainerStyle={styles.dashboardContent}>
      <View style={styles.skyDecor} pointerEvents="none">
        <Animated.View
          style={[
            styles.moonAuraOuter,
            {
              opacity: moonPulse.interpolate({ inputRange: [0, 1], outputRange: [0.55, 0.9] }),
              transform: [{ scale: moonPulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.04] }) }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.moonAuraInner,
            {
              opacity: moonPulse.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }),
            },
          ]}
        />
        <Animated.View
          style={[
            styles.moonCore,
            {
              transform: [{ scale: moonPulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] }) }],
            },
          ]}
        />
        <View style={styles.moonCutout} />
        <Animated.Text
          style={[
            styles.star,
            styles.starOne,
            {
              opacity: starsTwinkle.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }),
            },
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.starTwo,
            {
              opacity: starsTwinkle.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.8] }),
            },
          ]}
        >
          ✧
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.starThree,
            {
              opacity: starsTwinkle.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.95] }),
            },
          ]}
        >
          ✦
        </Animated.Text>
        <Animated.Text
          style={[
            styles.star,
            styles.starFour,
            {
              opacity: starsTwinkle.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.9] }),
            },
          ]}
        >
          ✦
        </Animated.Text>
      </View>
      <Text style={styles.greeting}>{lang === 'pt' ? 'Bom dia' : 'Good morning'}, {profile.full_name || 'User'}</Text>
      <Text style={styles.greetingSubtitle}>Sono profundo. De forma consistente.</Text>

      <View style={styles.progressCard}>
        <Text style={styles.progressLabel}>{lang === 'pt' ? 'Seu progresso' : 'Your progress'}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.progressStep}>{lang === 'pt' ? `Passo ${progress.nextStep ?? 1} de 21` : `Step ${progress.nextStep ?? 1} of 21`}</Text>
          <Text style={styles.progressPercent}>{progressPercent}%</Text>
        </View>
        <View style={styles.progressBarSmall}>
          <View style={[styles.progressBarSmallFill, { width: `${progressPercent}%` as any }]} />
        </View>
      </View>

      <View style={[styles.statsRow, isNarrowScreen && styles.statsRowStacked]}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>{lang === 'pt' ? 'Pico de energia' : 'Energy peak'}</Text>
          <Text style={styles.statValue}>{info?.peakHours?.[lang] ?? '–'}</Text>
          <Text style={styles.statSub}>{emojiMap[profile.chronotype]} {info?.name?.[lang] ?? ''}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>{lang === 'pt' ? 'Janela ideal de sono' : 'Ideal sleep window'}</Text>
          <Text style={styles.statValue}>{info?.sleepTime?.[lang] ?? '–'}</Text>
          <Text style={[styles.statSub, { color: '#40c0a0' }]}>{lang === 'pt' ? 'Ideal hoje' : 'Ideal today'}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.navigate('/(tabs)/program')}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>
          {lang === 'pt' ? `Continuar — Passo ${progress.nextStep ?? 1}` : `Continue — Step ${progress.nextStep ?? 1}`}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── HOME CONTENT ──────────────────────────────────────────────
function HomeContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { language } = useLanguage();
  const { profile, loading, hasFetched, error, refetchProfile } = useUserProfile();
  const { progress, refreshProgress } = useProgress();
  const [localQuizDone, setLocalQuizDone] = useState<boolean | null>(null);
  const [localChronotype, setLocalChronotype] = useState<Chronotype | null>(null);
  const [localChronotypeVerified, setLocalChronotypeVerified] = useState<boolean | null>(null);
  const chronotypeFromAuthMeta =
    isChronotype((user?.user_metadata as { chronotype?: string } | undefined)?.chronotype)
      ? ((user?.user_metadata as { chronotype: Chronotype }).chronotype)
      : null;
  const quizCompletedFromMeta =
    (user?.user_metadata as { quiz_completed?: boolean } | undefined)?.quiz_completed === true;

  const effectiveProfile = {
    id: profile?.id ?? user?.id ?? '',
    email: profile?.email ?? user?.email ?? '',
    full_name:
      profile?.full_name ??
      (user?.user_metadata as any)?.full_name ??
      user?.email?.split('@')[0] ??
      null,
    chronotype: localChronotype ?? (profile?.chronotype as Chronotype | null) ?? chronotypeFromAuthMeta,
    language: (profile?.language as Lang | undefined) ?? (language as Lang) ?? 'pt',
    subscription_type: profile?.subscription_type ?? 'free',
    quiz_completed: (profile?.quiz_completed ?? false) || quizCompletedFromMeta,
    quiz_progress: (profile?.quiz_progress as number | null | undefined) ?? null,
  };

  // Disk + JWT metadata together (avoid async disk read overwriting quiz_done from Auth).
  useEffect(() => {
    if (!user?.id || !user) return;

    const checkLocalFlag = async () => {
      const metaDone = quizCompletedFromMeta;
      const [doneDisk, chronoDisk] = await Promise.all([
        readQuizDoneLocal(user.id),
        readQuizChronotype(user.id),
      ]);
      setLocalQuizDone(doneDisk || metaDone);
      setLocalChronotype(chronoDisk ?? chronotypeFromAuthMeta ?? null);

      const diskVerifiedFlag = await readChronotypeVerified(user.id);
      const verified =
        metaDone ||
        diskVerifiedFlag ||
        !!chronoDisk ||
        !!chronotypeFromAuthMeta;
      setLocalChronotypeVerified(verified);

      if (metaDone) void saveQuizDoneLocal(user.id);
    };
    void checkLocalFlag();
  }, [user?.id, quizCompletedFromMeta, chronotypeFromAuthMeta]);

  useEffect(() => {
    if (profile?.quiz_completed && user?.id) {
      // Keep local flag aligned with Supabase to prevent quiz regressions.
      void saveQuizDoneLocal(user.id);
      setLocalQuizDone(true);
    }
  }, [profile?.quiz_completed, user?.id]);

  useEffect(() => {
    if (profile?.quiz_completed && profile.chronotype) {
      setLocalChronotypeVerified(true);
    }
  }, [profile?.quiz_completed, profile?.chronotype]);

  useEffect(() => {
    if (!user?.id || !localChronotype || !profile?.chronotype) return;
    if (localChronotype === profile.chronotype) return;
    // Heal stale server chronotype from old buggy flows.
    (supabase as any)
      .from('profiles')
      .update({ chronotype: localChronotype, quiz_completed: true })
      .eq('id', user.id)
      .then(({ error: updateError }: { error: any }) => {
        if (updateError) {
          console.error('[PROFILE:CHRONOTYPE_SYNC_ERROR]', updateError);
        } else {
          refetchProfile();
        }
      });
  }, [user?.id, localChronotype, profile?.chronotype, refetchProfile]);

  useFocusEffect(
    useCallback(() => {
      refreshProgress();
    }, [refreshProgress])
  );

  const handleQuizComplete = useCallback((chronotype: string) => {
    setLocalQuizDone(true);
    if (chronotype === 'lion' || chronotype === 'bear' || chronotype === 'wolf' || chronotype === 'dolphin') {
      setLocalChronotype(chronotype);
    }

    // Navigate first so CTA always feels instant.
    router.replace('/(tabs)/program');

    // Persist in background and refresh state when done.
    if (user?.id) {
      void Promise.all([
        saveQuizDoneLocal(user.id),
        saveQuizChronotype(user.id, chronotype),
      ]).finally(() => {
        refetchProfile();
        refreshProgress();
      });
      return;
    }

    refetchProfile();
    refreshProgress();
  }, [user?.id, refetchProfile, refreshProgress, router]);

  // QUIZ DONE = device flag OR profile OR JWT user_metadata OR derived effectiveProfile
  const quizDone =
    localQuizDone === true ||
    quizCompletedFromMeta ||
    profile?.quiz_completed === true ||
    effectiveProfile.quiz_completed === true;

  useEffect(() => {
    if (!user?.id || !quizDone || localChronotypeVerified !== false) return;
    const chronotypeToPersist = isChronotype(localChronotype)
      ? localChronotype
      : isChronotype(effectiveProfile.chronotype)
        ? effectiveProfile.chronotype
        : null;
    if (!chronotypeToPersist) return;

    // Repair old/local missing verification in background without reopening quiz.
    void saveQuizChronotype(user.id, chronotypeToPersist).then(() => {
      setLocalChronotypeVerified(true);
    });
  }, [user?.id, quizDone, localChronotypeVerified, localChronotype, effectiveProfile.chronotype]);

  // Wait for local flag check AND profile fetch
  if (localQuizDone === null || localChronotypeVerified === null || !hasFetched || loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  if (error && localQuizDone !== true && !profile?.quiz_completed && !quizCompletedFromMeta) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  if (!quizDone) {
    return <ChronotypeQuizModal visible onComplete={handleQuizComplete} />;
  }

  if (!effectiveProfile.chronotype) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  return <ReturningUserScreen profile={effectiveProfile} lang={language as Lang} progress={progress} />;
}

// ─── EXPORT ────────────────────────────────────────────────────
export default function HomeScreen() {
  return (
    <ErrorBoundary>
      <HomeContent />
    </ErrorBoundary>
  );
}

// ─── STYLES ────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG, justifyContent: 'center', alignItems: 'center' },
  dashboardContainer: { flex: 1, backgroundColor: BG },
  dashboardContent: { paddingHorizontal: 20, paddingTop: 30, paddingBottom: 88 },
  skyDecor: {
    position: 'relative',
    height: 116,
    marginBottom: 12,
  },
  moonAuraOuter: {
    position: 'absolute',
    right: 6,
    top: -10,
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(212,169,106,0.10)',
  },
  moonAuraInner: {
    position: 'absolute',
    right: 22,
    top: 6,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(212,169,106,0.14)',
  },
  moonCore: {
    position: 'absolute',
    right: 30,
    top: 14,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f5e7c9',
    borderWidth: 2,
    borderColor: 'rgba(212,169,106,0.75)',
  },
  moonCutout: {
    position: 'absolute',
    right: 16,
    top: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: BG,
  },
  star: {
    position: 'absolute',
    color: '#f0d9ab',
    opacity: 0.92,
  },
  starOne: {
    right: 102,
    top: 10,
    fontSize: 16,
  },
  starTwo: {
    right: 10,
    top: 64,
    fontSize: 12,
  },
  starThree: {
    right: 116,
    top: 52,
    fontSize: 11,
  },
  starFour: {
    right: 70,
    top: 78,
    fontSize: 10,
  },
  greeting: { fontSize: 14, color: '#98a1b3', marginBottom: 6, letterSpacing: 0.3 },
  greetingSubtitle: { fontSize: 28, fontWeight: '700', color: '#f8f6f2', marginBottom: 30, lineHeight: 34, letterSpacing: 0.2 },
  progressCard: {
    backgroundColor: CARD_BG,
    borderColor: 'rgba(212,169,106,0.18)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.26,
    shadowRadius: 20,
    elevation: 6,
  },
  progressLabel: { fontSize: 11, color: '#aab3c2', fontWeight: '600', marginBottom: 10, letterSpacing: 0.9 },
  progressStep: { fontSize: 17, fontWeight: '700', color: '#f8f6f2' },
  progressPercent: { fontSize: 18, fontWeight: '800', color: GOLD },
  progressBarSmall: { height: 5, backgroundColor: '#26233b', borderRadius: 999, overflow: 'hidden', marginTop: 12 },
  progressBarSmallFill: { height: '100%', backgroundColor: PURPLE },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 28 },
  statsRowStacked: { flexDirection: 'column' },
  statCard: {
    flex: 1,
    backgroundColor: CARD_BG,
    borderColor: 'rgba(212,169,106,0.14)',
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
  },
  statLabel: { fontSize: 11, color: '#aab3c2', fontWeight: '600', marginBottom: 8, letterSpacing: 0.8 },
  statValue: { fontSize: 19, fontWeight: '700', color: '#f8f6f2', marginBottom: 6 },
  statSub: { fontSize: 11, color: GOLD, fontWeight: '600' },
  primaryButton: {
    backgroundColor: '#f8f6f2',
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 18,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.4)',
  },
  primaryButtonText: { fontSize: 16, fontWeight: '700', color: '#191629', letterSpacing: 0.2 },
  secondaryLink: { fontSize: 14, color: PURPLE, fontWeight: '500', textAlign: 'center' },
});
