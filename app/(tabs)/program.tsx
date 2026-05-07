import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal as RNModal, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LESSONS_DATA } from '@/data/lessons';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import FreeTierPaywallModal from '@/components/FreeTierPaywallModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import { useProgress } from '@/contexts/ProgressContext';

import { ErrorBoundary } from '@/components/ErrorBoundary';
function ProgramContent() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { profile } = useUserProfile();
  const effectiveChronotype = useEffectiveChronotype();
  const { progress, refreshProgress } = useProgress();
  const completedLessonKey = progress.completedLessonIds.join(',');
  const completedLessons = useMemo(() => {
    if (!completedLessonKey) return new Set<string>();
    return new Set(completedLessonKey.split(','));
  }, [completedLessonKey]);
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [lockedModalVisible, setLockedModalVisible] = useState(false);
  const [showFreeTierPaywall, setShowFreeTierPaywall] = useState(false);

  useFocusEffect(
    useCallback(() => {
      void refreshProgress();
    }, [refreshProgress])
  );

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    border: isDark ? 'rgba(212,169,106,0.08)' : 'rgba(0,0,0,0.08)',
    gradientColors: (isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']) as [string, string],
    ctaBg: isDark ? '#07070f' : '#f8fafc',
    modalBg: isDark ? '#12121e' : '#ffffff',
    modalBorder: isDark ? 'rgba(212,169,106,0.2)' : 'rgba(0,0,0,0.1)',
    lockedBg: isDark ? '#0d0d16' : '#f1f5f9',
    completedBg: isDark ? '#0f1919' : '#f0fdf4',
    availableBg: isDark ? '#14172a' : '#eff6ff',
  };

  // Subscription + QA allowlist (see lib/subscriptionAccess.ts)
  useEffect(() => {
    if (!user) {
      setHasPremiumAccess(false);
      return;
    }
    if (profile) {
      setHasPremiumAccess(hasPremiumProgramAccess(profile.subscription_type, user.email));
      return;
    }
    setHasPremiumAccess(hasPremiumProgramAccess(null, user.email));
  }, [profile, user]);

  useEffect(() => {
    if (!user) return;
    const completed =
      completedLessonKey.length === 0 ? new Set<string>() : new Set(completedLessonKey.split(','));
    if (completed.has('3') && !hasPremiumAccess && !completed.has('4')) {
      setShowFreeTierPaywall(true);
    }
  }, [user, hasPremiumAccess, completedLessonKey]);

  useEffect(() => {
    void refreshProgress();

    if (!user) return;

    const channel = supabase
      .channel(`user_progress:${user.id}`)
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

  const getLessonTitle = (lesson: typeof LESSONS_DATA[0]) => {
    if (language === 'pt') return lesson.title_pt;
    return lesson.title_en;
  };

  const getLessonDescription = (lesson: typeof LESSONS_DATA[0]) => {
    const desc = language === 'pt' ? lesson.description_pt :
                 lesson.description_en;
    return desc?.substring(0, 100) + '...' || '';
  };

  const getChronotypeEmoji = (chronotype: string) => {
    const emojis: Record<string, string> = {
      dolphin: '🐬',
      lion: '🦁',
      bear: '🐻',
      wolf: '🐺',
    };
    return emojis[chronotype] || '';
  };

  const getChronotypeLabel = (chronotype: string) => {
    const labels: Record<string, { pt: string; en: string }> = {
      dolphin: { pt: 'Golfinho', en: 'Dolphin' },
      lion: { pt: 'Leão', en: 'Lion' },
      bear: { pt: 'Urso', en: 'Bear' },
      wolf: { pt: 'Lobo', en: 'Wolf' },
    };
    const label = labels[chronotype];
    return label ? (language === 'pt' ? label.pt : label.en) : '';
  };


  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: tc.bg }]}>
        <LinearGradient colors={tc.gradientColors} style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{t('program.title')}</Text>
            <Text style={styles.subtitle}>{t('program.subtitle')}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
        {LESSONS_DATA.map((lesson, index) => {
          const chronotype = effectiveChronotype;
          const isLocked = lesson.step_number > 3 && !hasPremiumAccess;
          const isCompleted = completedLessons.has(lesson.id);
          const chronotypeBadge = chronotype && lesson.step_number <= 3 ? (
            <View style={[styles.chronotypeBadge, { backgroundColor: isDark ? 'rgba(212,169,106,0.12)' : 'rgba(212,169,106,0.15)' }]}>
              <Text style={styles.chronotypeBadgeEmoji}>{getChronotypeEmoji(chronotype)}</Text>
              <Text style={[styles.chronotypeBadgeText, { color: isDark ? '#d4a96a' : '#9a7c4e' }]}>
                {getChronotypeLabel(chronotype)}
              </Text>
            </View>
          ) : null;

          return (
            <TouchableOpacity
              key={lesson.id}
              style={[
                styles.lessonCard,
                {
                  backgroundColor: isCompleted ? tc.completedBg :
                                   !isCompleted && !isLocked ? tc.availableBg :
                                   isLocked ? tc.lockedBg : tc.card,
                  borderColor: isCompleted ? (isDark ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.4)') :
                               !isCompleted && !isLocked ? (isDark ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.5)') :
                               isLocked ? (isDark ? 'rgba(100,116,139,0.2)' : 'rgba(203,213,225,0.5)') : tc.border,
                  borderWidth: isCompleted || (!isCompleted && !isLocked) ? 1.5 : 1,
                },
              ]}
              onPress={() => {
                if (isLocked) {
                  setLockedModalVisible(true);
                } else {
                  router.push(`/lesson/${lesson.id}`);
                }
              }}
            >
              <View style={styles.lessonHeader}>
                <View style={[
                  styles.stepBadge,
                  isCompleted && styles.stepBadgeCompleted,
                  !isCompleted && !isLocked && styles.stepBadgeAvailable,
                  isLocked && styles.stepBadgeLocked,
                ]}>
                  <Text style={[
                    styles.stepBadgeText,
                    isCompleted && styles.stepBadgeTextCompleted,
                    !isCompleted && !isLocked && styles.stepBadgeTextAvailable,
                    isLocked && styles.stepBadgeTextLocked,
                  ]}>
                    {t('lesson.step')} {lesson.step_number}
                  </Text>
                </View>
                {isCompleted && (
                  <View style={styles.completedBadge}>
                    <CheckCircle size={20} color="#10b981" />
                  </View>
                )}
                {isLocked && (
                  <View style={styles.lockedBadge}>
                    <Lock size={16} color="#94a3b8" />
                  </View>
                )}
              </View>

              <Text style={[
                styles.lessonTitle,
                { color: isCompleted ? '#10b981' :
                         !isCompleted && !isLocked ? '#3b82f6' :
                         isLocked ? (isDark ? '#4a5568' : '#94a3b8') : tc.textPrimary }
              ]}>
                {getLessonTitle(lesson)}
              </Text>

              {chronotypeBadge}

              <Text style={[
                styles.lessonDescription,
                { color: isCompleted ? (isDark ? '#0d9662' : '#059669') :
                         !isCompleted && !isLocked ? (isDark ? '#1e40af' : '#1d4ed8') :
                         isLocked ? (isDark ? '#374151' : '#9ca3af') : tc.textSecondary }
              ]} numberOfLines={2}>
                {getLessonDescription(lesson)}
              </Text>

              <View style={styles.lessonFooter}>
                <View style={styles.lessonFooterIcons}>
                </View>

                {isLocked && (
                  <Text style={[styles.lockedText, { color: isDark ? '#4a5568' : '#94a3b8' }]}>{t('program.locked')}</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}

        {!hasPremiumAccess && (
        <View style={styles.paywallBanner}>
          <View style={styles.paywallBannerTopLight} />
          <View style={styles.paywallBannerRow}>
            <Text style={styles.paywallBannerEmoji}>👑</Text>
            <View style={styles.paywallBannerTextCol}>
              <Text style={styles.paywallBannerTitle}>
                {language === 'pt' ? 'Desbloqueie todos os 21 passos' : 'Unlock all 21 steps'}
              </Text>
              <Text style={styles.paywallBannerSub}>
                {language === 'pt'
                  ? 'Acesso vitalício por R$147 — pagamento único'
                  : 'Lifetime access for $24.99 — one-time payment'}
              </Text>
            </View>
            <TouchableOpacity style={styles.paywallBannerBtn} onPress={() => router.push('/payment')} activeOpacity={0.88}>
              <Text style={styles.paywallBannerBtnText}>
                {language === 'pt' ? 'Desbloquear' : 'Unlock'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        )}

        <View style={styles.programFooter}>
          <Text style={[styles.programFooterCompany, { color: tc.textSecondary }]}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
          <Text style={[styles.programFooterCnpj, { color: isDark ? '#64748b' : '#94a3b8' }]}>CNPJ: 66.059.212/0001-52</Text>
        </View>
      </View>

      <FreeTierPaywallModal
        visible={showFreeTierPaywall}
        onClose={() => setShowFreeTierPaywall(false)}
      />

      <RNModal
        visible={lockedModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLockedModalVisible(false)}
      >
        <Pressable style={styles.lockedOverlay} onPress={() => setLockedModalVisible(false)}>
          <Pressable style={styles.lockedSheet} onPress={() => {}}>
            <View style={styles.lockedHandleBar} />

            <View style={styles.lockedIconCircle}>
              <Text style={styles.lockedIconEmoji}>🔒</Text>
            </View>

            <Text style={styles.lockedHeadline}>
              {language === 'pt' ? 'Conteúdo Premium' : 'Premium content'}
            </Text>
            <Text style={styles.lockedSubtitle}>
              {language === 'pt'
                ? 'Este passo faz parte do programa completo.'
                : 'This step is part of the full program.'}
            </Text>

            <TouchableOpacity
              style={styles.lockedCtaWrap}
              onPress={() => {
                setLockedModalVisible(false);
                router.push('/payment');
              }}
              activeOpacity={0.88}
            >
              <LinearGradient
                colors={['#ffd060', '#ffb020']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.lockedCtaGradient}
              >
                <Text style={styles.lockedCtaText}>
                  {language === 'pt' ? 'Desbloquear programa completo' : 'Unlock the full program'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.lockedSecondary}
              onPress={() => {
                setLockedModalVisible(false);
                router.push('/(auth)/login');
              }}
              activeOpacity={0.75}
            >
              <Text style={styles.lockedSecondaryText}>{t('program.modal.alreadySub')}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </RNModal>
    </ScrollView>
    </>
  );
}

export default function ProgramScreen() {
  return (
    <ErrorBoundary>
      <ProgramContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 36,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 34,
    fontWeight: '700',
    color: '#EDEFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  logoGo: {
    color: '#EDEFFF',
  },
  logoZzzz: {
    color: '#EDEFFF',
  },
  headline: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 36,
  },
  headlineFirstLine: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  headlineSecondLine: {
    fontSize: 28,
    fontWeight: '600',
    color: '#8A7CFF',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    padding: 20,
  },
  lessonCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepBadge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  stepBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d4a96a',
  },
  stepBadgeCompleted: {
    backgroundColor: 'rgba(16,185,129,0.12)',
    borderColor: 'rgba(16,185,129,0.4)',
  },
  stepBadgeTextCompleted: {
    color: '#10b981',
  },
  stepBadgeAvailable: {
    backgroundColor: 'rgba(59,130,246,0.12)',
    borderColor: 'rgba(59,130,246,0.4)',
  },
  stepBadgeTextAvailable: {
    color: '#3b82f6',
  },
  stepBadgeLocked: {
    backgroundColor: 'rgba(100,116,139,0.08)',
    borderColor: 'rgba(100,116,139,0.2)',
  },
  stepBadgeTextLocked: {
    color: '#94a3b8',
  },
  chronotypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 8,
    width: 'auto',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  chronotypeBadgeEmoji: {
    fontSize: 14,
    lineHeight: 16,
  },
  chronotypeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16,185,129,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#10b981',
  },
  lockedBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lessonTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  lessonFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonFooterIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 12,
    color: '#4a5568',
  },
  durationTextLocked: {
    color: '#374151',
  },
  videoIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  videoText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#d4a96a',
  },
  podcastIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  podcastText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10b981',
  },
  lockedText: {
    fontSize: 12,
  },
  upgradeButton: {
    backgroundColor: '#d4a96a',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 40,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },

  paywallBanner: {
    width: '100%',
    backgroundColor: 'rgba(255,190,50,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.18)',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 32,
    position: 'relative',
    overflow: 'hidden',
  },
  paywallBannerTopLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,190,50,0.30)',
  },
  paywallBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paywallBannerEmoji: {
    fontSize: 20,
  },
  paywallBannerTextCol: {
    flex: 1,
  },
  paywallBannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#dde0f8',
    marginBottom: 2,
  },
  paywallBannerSub: {
    fontSize: 12,
    color: '#8090b0',
  },
  paywallBannerBtn: {
    backgroundColor: '#ffc84a',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  paywallBannerBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#080a15',
  },
  programFooter: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 4,
  },
  programFooterCompany: { fontSize: 12, fontWeight: '600' },
  programFooterCnpj: { fontSize: 12 },

  lockedOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  lockedSheet: {
    backgroundColor: '#0d0f1e',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 36,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  lockedHandleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  lockedIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    alignSelf: 'center',
    marginBottom: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedIconEmoji: {
    fontSize: 22,
    textAlign: 'center',
  },
  lockedHeadline: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  lockedSubtitle: {
    fontSize: 14,
    color: '#8090b0',
    textAlign: 'center',
    marginBottom: 20,
  },
  lockedCtaWrap: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  lockedCtaGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  lockedCtaText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#080a15',
  },
  lockedSecondary: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  lockedSecondaryText: {
    fontSize: 13,
    color: '#3a4060',
    textAlign: 'center',
  },
});
