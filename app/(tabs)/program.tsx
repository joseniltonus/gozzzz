import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal as RNModal, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Lock, CircleCheck as CheckCircle, Crown, Shield, BadgeCheck, ArrowRight, X } from 'lucide-react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { LESSONS_DATA } from '@/data/lessons';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import FreeTierPaywallModal from '@/components/FreeTierPaywallModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { useState, useEffect, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';

import { ErrorBoundary } from '@/components/ErrorBoundary';
function ProgramContent() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const { profile } = useUserProfile();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [lockedModalVisible, setLockedModalVisible] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [showFreeTierPaywall, setShowFreeTierPaywall] = useState(false);
  const [localChronotype, setLocalChronotype] = useState<string | null>(null);

  useEffect(() => {
    const loadLocalChronotype = async () => {
      if (!user?.id) {
        setLocalChronotype(null);
        return;
      }
      const key = `quiz_chronotype_${user.id}`;
      try {
        const latestKey = 'quiz_latest_chronotype';
        const [userValue, latestValue] = Platform.OS === 'web'
          ? [localStorage.getItem(key), localStorage.getItem(latestKey)]
          : [await SecureStore.getItemAsync(key), await SecureStore.getItemAsync(latestKey)];
        const value = latestValue ?? userValue;
        setLocalChronotype(value);
      } catch {
        setLocalChronotype(null);
      }
    };
    loadLocalChronotype();
  }, [user?.id]);

  const fetchUserProgress = useCallback(async () => {
    if (!user) {
      setCompletedLessons(new Set());
      return;
    }

    try {
      const { data } = await supabase
        .from('user_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id)
        .eq('completed', true) as any;

      if (data) {
        const completedIds = data.map((p: any) => String(p.lesson_id));
        const completed = new Set<string>(completedIds);
        setCompletedLessons(completed);

        if (completed.has('3') && !hasPremiumAccess) {
          const hasLessonFour = completed.has('4');
          if (!hasLessonFour) {
            setShowFreeTierPaywall(true);
          }
        }
      }
    } catch {
      setCompletedLessons(new Set());
    }
  }, [user, hasPremiumAccess]);

  useFocusEffect(
    useCallback(() => {
      fetchUserProgress();
    }, [fetchUserProgress])
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
    fetchUserProgress();

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
          fetchUserProgress();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user, fetchUserProgress]);

  const getLessonTitle = (lesson: typeof LESSONS_DATA[0]) => {
    if (language === 'pt') return lesson.title_pt;
    return lesson.title_en;
  };

  const getLessonDescription = (lesson: typeof LESSONS_DATA[0]) => {
    const desc = language === 'pt' ? lesson.description_pt :
                 lesson.description_en;
    return desc?.substring(0, 100) + '...' || '';
  };

  const getChronotype = () => localChronotype || profile?.chronotype || null;

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
          const chronotype = getChronotype();
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
        <View style={[styles.ctaBanner, { backgroundColor: tc.ctaBg, borderColor: isDark ? 'rgba(212,169,106,0.18)' : 'rgba(0,0,0,0.1)' }]}>
          <View style={styles.ctaBannerHeader}>
            <Crown size={28} color="#d4a96a" />
            <View style={styles.ctaBannerText}>
              <Text style={[styles.ctaBannerTitle, { color: isDark ? '#ffffff' : '#1a202c' }]}>{t('payment.unlockAllLessons')}</Text>
              <Text style={[styles.ctaBannerSub, { color: tc.textSecondary }]}>{t('payment.premiumAccess')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.ctaFilledBtn} onPress={() => router.push('/payment')}>
            <Crown size={18} color="#0f172a" />
            <Text style={styles.ctaFilledBtnText}>{t('payment.subscribe')}</Text>
            <ArrowRight size={18} color="#0f172a" />
          </TouchableOpacity>
          <View style={styles.ctaSecurityRow}>
            <Lock size={12} color="#d4a96a" />
            <Text style={[styles.ctaSecurityText, { color: isDark ? '#4a5568' : '#64748b' }]}>{t('payment.ssl')}</Text>
            <Text style={[styles.ctaSecurityDot, { color: isDark ? '#374151' : '#94a3b8' }]}>·</Text>
            <Shield size={12} color="#d4a96a" />
            <Text style={[styles.ctaSecurityText, { color: isDark ? '#4a5568' : '#64748b' }]}>{t('payment.pciDss')}</Text>
            <Text style={[styles.ctaSecurityDot, { color: isDark ? '#374151' : '#94a3b8' }]}>·</Text>
            <BadgeCheck size={12} color="#d4a96a" />
            <Text style={[styles.ctaSecurityText, { color: isDark ? '#4a5568' : '#64748b' }]}>{t('payment.secureCheckout')}</Text>
          </View>
        </View>
        )}

        <View style={styles.programFooter}>
          <Text style={[styles.programFooterCompany, { color: tc.textSecondary }]}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
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
        animationType="fade"
        onRequestClose={() => setLockedModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setLockedModalVisible(false)}
        >
          <Pressable
            style={[styles.modalContent, { backgroundColor: tc.modalBg, borderColor: tc.modalBorder }]}
            onPress={() => {}}
          >
            <View style={[styles.modalHeader, { borderBottomColor: isDark ? 'rgba(212,169,106,0.1)' : 'rgba(0,0,0,0.08)' }]}>
              <View style={styles.modalIconRow}>
                <Lock size={20} color="#d4a96a" />
                <Text style={styles.modalLabel}>{t('program.modal.badge')}</Text>
              </View>
              <TouchableOpacity
                style={[styles.modalCloseButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
                onPress={() => setLockedModalVisible(false)}
              >
                <X size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={[styles.modalTitle, { color: isDark ? '#ffffff' : '#1a202c' }]}>
                {t('program.modal.title')}
              </Text>

              <View style={[styles.modalFeatures, { backgroundColor: isDark ? 'rgba(212,169,106,0.05)' : 'rgba(212,169,106,0.08)' }]}>
                {[
                  language === 'pt' ? '21 lições interativas que guiam você passo a passo para noites melhores' : '21 interactive lessons that guide you step by step to better nights',
                  language === 'pt' ? 'Cada etapa fundamentada nas pesquisas das melhores universidades e publicações científicas dos EUA' : 'Each step based on research from the best universities and scientific publications in the USA',
                  language === 'pt' ? 'Avance no seu próprio ritmo — sem pressa, com propósito' : 'Progress at your own pace — no rush, with purpose',
                  language === 'pt' ? 'Disponível na Web, iOS e Android' : 'Available on Web, iOS, and Android',
                ].map((text, idx) => (
                  <View key={idx} style={styles.featureItem}>
                    <Text style={styles.featureIcon}>✓</Text>
                    <Text style={[styles.featureText, { color: isDark ? '#c8a876' : '#9a7c4e' }]}>{text}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalCta}
                onPress={() => {
                  setLockedModalVisible(false);
                  router.push('/payment');
                }}
              >
                <Crown size={18} color="#0f172a" />
                <Text style={styles.modalCtaText}>
                  {t('program.modal.cta')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSecondary}
                onPress={() => {
                  setLockedModalVisible(false);
                  router.push('/(auth)/login');
                }}
              >
                <Text style={styles.modalSecondaryText}>
                  {t('program.modal.alreadySub')}
                </Text>
              </TouchableOpacity>
            </View>
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

  ctaBanner: {
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    marginBottom: 32,
    borderWidth: 1,
  },
  ctaBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 20,
  },
  ctaBannerText: { flex: 1 },
  ctaBannerTitle: { fontSize: 18, fontWeight: '800' },
  ctaBannerSub: { fontSize: 13, marginTop: 2 },
  ctaFilledBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  ctaFilledBtnText: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  ctaSecurityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaSecurityText: { fontSize: 11 },
  ctaSecurityDot: { fontSize: 11 },
  programFooter: {
    paddingVertical: 24,
    alignItems: 'center',
    gap: 4,
  },
  programFooterCompany: { fontSize: 12, fontWeight: '600' },
  programFooterCnpj: { fontSize: 12 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 24,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  modalIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 12,
    lineHeight: 28,
  },
  modalDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  modalFeatures: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '800',
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  priceLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#d4a96a',
    marginBottom: 2,
  },
  priceFreq: {
    fontSize: 14,
    color: '#64748b',
  },
  modalCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  modalCtaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  modalSecondary: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalSecondaryText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
});
