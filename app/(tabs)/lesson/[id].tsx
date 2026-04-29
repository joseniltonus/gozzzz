import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, CircleCheck as CheckCircle, Clock, Lightbulb, Lock, Crown } from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react';
import { Lesson1InteractiveCard } from '@/components/Lesson1InteractiveCard';
import { LessonInteractiveCard } from '@/components/LessonInteractiveCard';
import { SleepLessonCard } from '@/components/SleepLessonCard';
import { SLEEP_LESSON_CONTENT } from '@/data/sleepLessonContent';
import { getChronotypeOneLiner } from '@/data/chronotypeOneLiner';
import { useUserProfile } from '@/hooks/useUserProfile';
import { ShareableCard } from '@/components/ShareableCard';
import { useProgress } from '@/contexts/ProgressContext';
import * as SecureStore from 'expo-secure-store';

export default function LessonDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { profile } = useUserProfile();
  const { refreshProgress } = useProgress();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [completingLesson, setCompletingLesson] = useState(false);
  const [sleepLessonComplete, setSleepLessonComplete] = useState(false);

  // Always use profile as single source of truth — no localStorage fallback needed
  const chronotype = profile?.chronotype || null;

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    resourceBg: isDark ? '#0d0d16' : '#f8fafc',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    gradientColors: (isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']) as [string, string],
    paywallGradient: isDark
      ? (['rgba(13,13,22,0)', 'rgba(13,13,22,0.97)', '#0d0d16'] as [string, string, string])
      : (['rgba(240,244,248,0)', 'rgba(240,244,248,0.97)', '#f0f4f8'] as [string, string, string]),
  };

  // Derive premium access from profile hook (single source of truth)
  useEffect(() => {
    if (profile) {
      setHasPremiumAccess(profile.subscription_type === 'premium');
      setAccessChecked(true);
      return;
    }
    if (!user) {
      setHasPremiumAccess(false);
      setAccessChecked(true);
    }
  }, [user, profile]);

  useEffect(() => {
    setSleepLessonComplete(false);
  }, [id]);

  const lesson = LESSONS_DATA.find((l) => l.id === id);

  const navigateToPrevLesson = () => {
    if (!lesson) return;
    if (lesson.step_number === 1) {
      router.push('/(tabs)/home');
    } else {
      const prevLesson = LESSONS_DATA.find((l) => l.step_number === lesson.step_number - 1);
      if (prevLesson) {
        router.push(`/lesson/${prevLesson.id}`);
      } else {
        router.back();
      }
    }
  };

  const navigateToNextLesson = () => {
    if (!lesson) return;
    const nextLesson = LESSONS_DATA.find((l) => l.step_number === lesson.step_number + 1);
    console.log("PRÓXIMA LIÇÃO pressed, current:", lesson.step_number, "next:", nextLesson?.step_number);
    if (nextLesson) {
      if (nextLesson.step_number > 3 && !hasPremiumAccess) {
        router.push('/(tabs)/program');
        return;
      }
      router.push(`/(tabs)/lesson/${nextLesson.id}`);
    } else {
      // Last step - go to home/dashboard
      router.push('/(tabs)/home');
    }
  };

  const handleMarkComplete = async () => {
    if (!user || !lesson || completingLesson) return;
    setCompletingLesson(true);
    try {
      await (supabase.from('user_progress') as any).upsert(
        {
          user_id: user.id,
          lesson_id: lesson.id,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,lesson_id' }
      );
      const localProgressKey = `user_progress_local_${user.id}`;
      if (Platform.OS === 'web') {
        const existing = localStorage.getItem(localProgressKey);
        const list: string[] = existing ? JSON.parse(existing) : [];
        if (!list.includes(lesson.id)) {
          localStorage.setItem(localProgressKey, JSON.stringify([...list, lesson.id]));
        }
      } else {
        const existing = await SecureStore.getItemAsync(localProgressKey);
        const list: string[] = existing ? JSON.parse(existing) : [];
        if (!list.includes(lesson.id)) {
          await SecureStore.setItemAsync(localProgressKey, JSON.stringify([...list, lesson.id]));
        }
      }
    } catch (error) {
      console.warn('Progress write fallback:', error);
    } finally {
      await refreshProgress();
      setCompletingLesson(false);
      navigateToNextLesson();
    }
  };
  const enhancement = LESSON_ENHANCEMENTS.find((e) => e.lessonId === id);

  if (!lesson) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: tc.bg }]}>
        <Text style={styles.errorText}>Not found</Text>
        <TouchableOpacity style={styles.backButtonError} onPress={() => router.back()}>
          <Text style={styles.backButtonErrorText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isLocked = lesson.step_number > 3 && (!accessChecked || !hasPremiumAccess);

  const getTitle = () => language === 'pt' ? lesson.title_pt : lesson.title_en;
  const getDescription = () => language === 'pt' ? lesson.description_pt : lesson.description_en;


  const lang = language as 'pt' | 'en';
  const oneLiner = getChronotypeOneLiner(lesson.step_number, chronotype, lang);

  const shouldShowShareableCard = [6, 10, 18, 21].includes(lesson.step_number);

  const getShareableCardData = () => {
    const step = lesson.step_number;
    const chronotypeMap: Record<string, string> = { dolphin: '🐬', lion: '🦁', bear: '🐻', wolf: '🐺' };
    const chronotypeEmoji = chronotype ? chronotypeMap[chronotype] || '🌙' : '🌙';

    const messages = {
      6: lang === 'pt' ? 'Entendi o que estava destruindo meu sono 😴' : 'I understood what was destroying my sleep 😴',
      10: lang === 'pt' ? 'Já na metade do programa GoZzzz 🎯' : 'Halfway through the GoZzzz program 🎯',
      18: lang === 'pt' ? 'Quase lá — transformando meu sono 🌙' : 'Almost there — transforming my sleep 🌙',
      21: lang === 'pt' ? 'Completei o programa GoZzzz — sono nunca mais será o mesmo ⭐' : 'I completed the GoZzzz program — sleep will never be the same ⭐',
    };

    const titles = {
      6: lang === 'pt' ? 'Descobri meu maior desafio' : 'I discovered my biggest challenge',
      10: lang === 'pt' ? 'Metade do caminho' : 'Halfway there',
      18: lang === 'pt' ? 'Transformação em progresso' : 'Transformation in progress',
      21: lang === 'pt' ? 'Programa concluído!' : 'Program completed!',
    };

    return {
      chronotypeName: '',
      chronotypeEmoji,
      title: titles[step as keyof typeof titles] || '',
      message: messages[step as keyof typeof messages] || '',
      statPercent: Math.floor(Math.random() * 25) + 5,
    };
  };

  if (isLocked) {
    return (
      <View style={[styles.container, { backgroundColor: tc.bg }]}>
        <LinearGradient colors={tc.gradientColors} style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <TouchableOpacity style={styles.backButton} onPress={navigateToPrevLesson}>
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>
                {t('lesson.step')} {lesson.step_number}
              </Text>
            </View>
            <Text style={styles.headerTitle}>{getTitle()}</Text>
            {oneLiner && (
              <Text style={styles.oneLinerText}>{oneLiner}</Text>
            )}
          </View>
        </LinearGradient>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        </ScrollView>

        <View style={styles.paywallOverlay}>
          <LinearGradient
            colors={tc.paywallGradient}
            style={styles.paywallGradient}
          >
            <View style={styles.paywallInner}>
              <View style={styles.paywallIconRow}>
                <Lock size={18} color="#d4a96a" />
                <Text style={styles.paywallLabel}>{t('lesson.premiumContent')}</Text>
              </View>
              <Text style={styles.paywallTitle}>{t('lesson.teaserUnlockTitle')}</Text>
              <Text style={[styles.paywallSub, { color: tc.textSecondary }]}>{t('lesson.teaserUnlockSub')}</Text>

              <TouchableOpacity
                style={styles.paywallCta}
                onPress={() => router.push('/payment')}
              >
                <Crown size={18} color="#0f172a" />
                <Text style={styles.paywallCtaText}>{t('lesson.teaserCta')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.paywallSecondary} onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.paywallSecondaryText}>{t('lesson.teaserAlreadySub')}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </View>
    );
  }

  if (!isLocked) {
    if (lesson.id === '1') {
      return (
        <View style={[styles.container, { backgroundColor: tc.bg }]}>
          <LinearGradient colors={tc.gradientColors} style={[styles.header, { paddingTop: insets.top + 24 }]}>
            <TouchableOpacity style={styles.backButton} onPress={navigateToPrevLesson}>
              <ArrowLeft size={24} color="#ffffff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepBadgeText}>
                  {t('lesson.step')} {lesson.step_number}
                </Text>
              </View>
              <Text style={styles.headerTitle}>{getTitle()}</Text>
            </View>
          </LinearGradient>
          <Lesson1InteractiveCard
            key={`lesson1-${id as string}`}
            renderCompleteButton={(isLast) => isLast ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.completeButton, completingLesson && styles.completeButtonDisabled]}
                  onPress={handleMarkComplete}
                  disabled={completingLesson}
                >
                  {completingLesson ? (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.continuing')}</Text>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.markComplete')}</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ) : null}
          />
        </View>
      );
    }

    return (
      <View style={[styles.container, { backgroundColor: tc.bg }]}>
        <LinearGradient colors={tc.gradientColors} style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <TouchableOpacity style={styles.backButton} onPress={navigateToPrevLesson}>
            <ArrowLeft size={24} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>
                {t('lesson.step')} {lesson.step_number}
              </Text>
            </View>
            <Text style={styles.headerTitle}>{getTitle()}</Text>
            {oneLiner && (
              <Text style={styles.oneLinerText}>{oneLiner}</Text>
            )}
          </View>
        </LinearGradient>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          {SLEEP_LESSON_CONTENT.find((l) => l.id === id) ? (
            <>
              <SleepLessonCard key={`sleep-${id as string}`} lessonId={id as string} onComplete={() => setSleepLessonComplete(true)} />
              {shouldShowShareableCard && (
                <ShareableCard {...getShareableCardData()} />
              )}
              {sleepLessonComplete && (
                <TouchableOpacity
                  style={[styles.completeButton, completingLesson && styles.completeButtonDisabled]}
                  onPress={handleMarkComplete}
                  disabled={completingLesson}
                >
                  {completingLesson ? (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.continuing')}</Text>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.markComplete')}</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </>
          ) : (
            <>
              <LessonInteractiveCard key={`interactive-${id as string}`} lessonId={id as string} onComplete={() => setSleepLessonComplete(true)} />
              {shouldShowShareableCard && (
                <ShareableCard {...getShareableCardData()} />
              )}
              {sleepLessonComplete && (
                <TouchableOpacity
                  style={[styles.completeButton, completingLesson && styles.completeButtonDisabled]}
                  onPress={handleMarkComplete}
                  disabled={completingLesson}
                >
                  {completingLesson ? (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.continuing')}</Text>
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} color="#0f172a" />
                      <Text style={styles.completeButtonText}>{t('lesson.markComplete')}</Text>
                    </>
                  )}
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: tc.bg }]}>
      <LinearGradient colors={tc.gradientColors} style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <View style={styles.headerContent}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>
              {t('lesson.step')} {lesson.step_number}
            </Text>
          </View>
          <Text style={styles.headerTitle}>{getTitle()}</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {enhancement?.imageUrl && (
          <Image
            source={{ uri: enhancement.imageUrl }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        )}


        {enhancement && (
          <View style={[styles.keyPointsCard, { backgroundColor: tc.card }]}>
            <View style={styles.cardHeader}>
              <Lightbulb size={24} color="#fbbf24" />
              <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('lesson.keyPoints')}</Text>
            </View>
            {(enhancement.keyPoints[lang] || []).map((point, index) => (
              <View key={index} style={styles.bulletPoint}>
                <View style={styles.bulletDot} />
                <Text style={[styles.bulletText, { color: tc.textSecondary }]}>{point}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={[styles.descriptionCard, { backgroundColor: tc.card }]}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('lesson.about')}</Text>
          <Text style={[styles.descriptionText, { color: tc.textSecondary }]}>{getDescription()}</Text>
          {lesson.duration_minutes && (
            <View style={styles.durationInfoContainer}>
              <Clock size={16} color="#64748b" />
              <Text style={styles.durationInfo}>
                {lesson.duration_minutes} {t('lesson.minutes')}
              </Text>
            </View>
          )}
        </View>

        {enhancement && (
          <View style={[styles.expertTipsCard, { backgroundColor: tc.card }]}>
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('lesson.scientificInsights')}</Text>
            {(enhancement.expertTips[lang] || []).map((tip, index) => (
              <View key={index} style={[styles.expertTip, { backgroundColor: tc.resourceBg }]}>
                <Text style={styles.expertName}>{tip.expert}</Text>
                <Text style={[styles.expertTipText, { color: tc.textSecondary }]}>&quot;{tip.tip}&quot;</Text>
              </View>
            ))}
          </View>
        )}

        {shouldShowShareableCard && (
          <ShareableCard {...getShareableCardData()} />
        )}

        <TouchableOpacity
          style={[styles.completeButton, completingLesson && styles.completeButtonDisabled]}
          onPress={handleMarkComplete}
          disabled={completingLesson}
        >
          {completingLesson ? (
            <>
              <CheckCircle size={20} color="#0f172a" />
              <Text style={styles.completeButtonText}>{t('lesson.continuing')}</Text>
            </>
          ) : (
            <>
              <CheckCircle size={20} color="#0f172a" />
              <Text style={styles.completeButtonText}>{t('lesson.markComplete')}</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#dc2626',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButtonError: {
    backgroundColor: '#12121e',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
  },
  backButtonErrorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#d4a96a',
  },
  header: {
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerBackButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  stepBadge: {
    backgroundColor: 'rgba(212,169,106,0.15)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  stepBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d4a96a',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  oneLinerText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#a89fff',
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },

  teaserBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,169,106,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  teaserBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 0.8,
  },
  teaserKeyPointCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
  },
  blurredPoints: {
    marginTop: 8,
    gap: 10,
  },
  blurredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  blurredLine: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#1e1e2e',
    opacity: 0.7,
  },
  teaserDescriptionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 160,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  descriptionFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(18,18,30,0.92)',
  },

  paywallOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 340,
  },
  paywallGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  paywallInner: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
    alignItems: 'center',
  },
  paywallIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  paywallLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#d4a96a',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  paywallTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  paywallSub: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: 300,
  },
  paywallCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 12,
  },
  paywallCtaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  paywallSecondary: {
    paddingVertical: 8,
  },
  paywallSecondaryText: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
  },

  resourcesCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(220,38,38,0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  resourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(220,38,38,0.12)',
  },
  resourceIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(220,38,38,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  resourceTextContainer: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  resourceSubtitle: {
    fontSize: 13,
    fontWeight: '500',
  },
  keyPointsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4a96a',
    marginTop: 6,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
  descriptionCard: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 16,
  },
  durationInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  durationInfo: {
    fontSize: 14,
    color: '#4a5568',
    fontWeight: '500',
  },
  expertTipsCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
  },
  expertTip: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  expertName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d4a96a',
    marginBottom: 8,
  },
  expertTipText: {
    fontSize: 15,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
});
