import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Moon,
  ArrowLeft,
  Lightbulb,
  Lock,
  Crown,
 CircleCheck as CheckCircle } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useProgress } from '@/contexts/ProgressContext';
import { supabase } from '@/lib/supabase';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { useState, useEffect } from 'react';
import { Lesson1InteractiveCardWeb } from '@/components/Lesson1InteractiveCardWeb';
import { LessonInteractiveCardWeb } from '@/components/LessonInteractiveCardWeb';
import { SleepLessonCardWeb } from '@/components/SleepLessonCardWeb';
import { SLEEP_LESSON_CONTENT } from '@/data/sleepLessonContent';
import { getChronotypeOneLiner } from '@/data/chronotypeOneLiner';

const isWeb = Platform.OS === 'web';

export default function WebLessonPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const { refreshProgress } = useProgress();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [completingLesson, setCompletingLesson] = useState(false);
  const [sleepLessonComplete, setSleepLessonComplete] = useState(false);

  // Derive chronotype from profile (single source of truth: database)
  const chronotype = profile?.chronotype || null;

  // Check premium / gift access: wait for profile hook, then direct fetch fallback
  useEffect(() => {
    if (!user) {
      setHasPremiumAccess(false);
      setAccessChecked(true);
      return;
    }

    if (profileLoading) {
      setAccessChecked(false);
      return;
    }

    if (profile) {
      setHasPremiumAccess(hasPremiumProgramAccess(profile.subscription_type, user.email));
      setAccessChecked(true);
      return;
    }

    let cancelled = false;
    const checkAccess = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('subscription_type')
        .eq('id', user.id)
        .maybeSingle() as any;
      if (cancelled) return;
      setHasPremiumAccess(hasPremiumProgramAccess(data?.subscription_type, user.email));
      setAccessChecked(true);
    };
    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [user, profile, profileLoading]);

  const lesson = LESSONS_DATA.find((l) => l.id === id);
  const enhancement = LESSON_ENHANCEMENTS.find((e) => e.lessonId === id);

  if (!lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{t('web.lesson.notFound')}</Text>
        <TouchableOpacity style={styles.errorBtn} onPress={() => router.push('/web/programa')}>
          <Text style={styles.errorBtnText}>{t('web.lesson.viewProgram')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (lesson.step_number > 3 && (!accessChecked || !hasPremiumAccess)) {
    return (
      <View style={styles.lockedPage}>
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
              <Moon size={22} color="#fbbf24" />
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={styles.lockedBody}>
          <Lock size={56} color="#fbbf24" />
          <Text style={styles.lockedTitle}>{t('web.lesson.premiumContent')}</Text>
          <Text style={styles.lockedSubtitle}>{t('web.lesson.premiumSubtitle')}</Text>
          <TouchableOpacity style={styles.lockedBtn} onPress={() => router.push('/web/assinar')}>
            <Crown size={18} color="#1e293b" />
            <Text style={styles.lockedBtnText}>{t('web.lesson.subscribeNow')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.lockedBack} onPress={() => router.push('/web/programa')}>
            <ArrowLeft size={16} color="#94a3b8" />
            <Text style={styles.lockedBackText}>{t('web.lesson.backToProgram')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const isLocked = lesson.step_number > 3 && (!accessChecked || !hasPremiumAccess);

  const getTitle = () => {
    if (language === 'pt') return lesson.title_pt;
    return lesson.title_en;
  };

  const getDescription = () => {
    if (language === 'pt') return lesson.description_pt;
    return lesson.description_en;
  };

  const oneLiner = getChronotypeOneLiner(lesson.step_number, chronotype, language as 'pt' | 'en');

  const navigateToPrevLesson = () => {
    if (!lesson) return;
    if (lesson.step_number === 1) {
      router.push('/web');
    } else {
      const prevLesson = LESSONS_DATA.find((l) => l.step_number === lesson.step_number - 1);
      if (prevLesson) {
        router.push(`/web/licao/${prevLesson.id}`);
      } else {
        router.push('/web/programa');
      }
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
      const existing = localStorage.getItem(localProgressKey);
      const list: string[] = existing ? JSON.parse(existing) : [];
      if (!list.includes(lesson.id)) {
        localStorage.setItem(localProgressKey, JSON.stringify([...list, lesson.id]));
      }
    } catch (error) {
      console.warn('Progress write fallback (web):', error);
    } finally {
      await refreshProgress();
      const nextLesson = LESSONS_DATA.find((l) => l.step_number === lesson.step_number + 1);
      if (nextLesson) {
        if (nextLesson.step_number > 3 && !hasPremiumAccess) {
          router.push('/web/programa');
          setCompletingLesson(false);
          return;
        }
        router.push(`/web/licao/${nextLesson.id}`);
      } else {
        router.push('/web/programa');
      }
      setCompletingLesson(false);
    }
  };

  if (!isLocked) {
    if (lesson.id === '1') {
      return (
        <View style={styles.page}>
          <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
            <View style={styles.navInner}>
              <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
                <Moon size={22} color="#fbbf24" />
                <Text style={styles.navBrandText}>GoZzzz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToPrevLesson} style={styles.backBtn}>
                <ArrowLeft size={18} color="#94a3b8" />
                <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.header}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{t('web.lesson.step')} {lesson.step_number}</Text>
            </View>
            <Text style={styles.headerTitle}>{getTitle()}</Text>
            {oneLiner && <Text style={styles.oneLinerText}>{oneLiner}</Text>}
          </LinearGradient>

          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Lesson1InteractiveCardWeb
              key={`lesson1web-${id as string}`}
              renderCompleteButton={(isLast) => isLast ? (
                <View style={styles.lesson1ButtonContainer}>
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
        </View>
      );
    }

    return (
      <View style={styles.page}>
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
              <Moon size={22} color="#fbbf24" />
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.header}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{t('web.lesson.step')} {lesson.step_number}</Text>
          </View>
          <Text style={styles.headerTitle}>{getTitle()}</Text>
          {oneLiner && <Text style={styles.oneLinerText}>{oneLiner}</Text>}
        </LinearGradient>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          {SLEEP_LESSON_CONTENT.find((l) => l.id === id) ? (
            <SleepLessonCardWeb key={`sleepweb-${id as string}`} lessonId={id as string} onComplete={() => setSleepLessonComplete(true)} />
          ) : (
            <LessonInteractiveCardWeb key={`interactiveweb-${id as string}`} lessonId={id as string} onComplete={() => setSleepLessonComplete(true)} />
          )}
          {(SLEEP_LESSON_CONTENT.find((l) => l.id === id) ? sleepLessonComplete : true) && (
            <View style={styles.lesson2ButtonContainer}>
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
          )}
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <Moon size={22} color="#fbbf24" />
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
            <ArrowLeft size={18} color="#94a3b8" />
            <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.header}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>{t('web.lesson.step')} {lesson.step_number}</Text>
        </View>
        <Text style={styles.headerTitle}>{getTitle()}</Text>
        {oneLiner && <Text style={styles.oneLinerText}>{oneLiner}</Text>}
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.container}>
          {enhancement?.imageUrl && (
            <Image
              source={{ uri: enhancement.imageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          )}


          {enhancement && (
            <View style={[styles.card, styles.cardYellow]}>
              <View style={styles.cardHeader}>
                <Lightbulb size={22} color="#f59e0b" />
                <Text style={styles.cardTitle}>{t('web.lesson.keyPoints')}</Text>
              </View>
              {enhancement.keyPoints[language as keyof typeof enhancement.keyPoints]?.map((point, i) => (
                <View key={i} style={styles.bullet}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.bulletText}>{point}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('web.lesson.aboutStep')}</Text>
            <Text style={styles.descText}>{getDescription()}</Text>
            {lesson.duration_minutes && (
              <View style={styles.durationInfo}>
                <Text style={styles.durationLabel}>{t('web.lesson.readingTime')}</Text>
                <Text style={styles.durationValue}>{lesson.duration_minutes} {t('web.lesson.minutes')}</Text>
              </View>
            )}
          </View>

          {enhancement && (
            <View style={[styles.card, styles.cardBlue]}>
              <Text style={styles.cardTitle}>{t('web.lesson.scientificInsights')}</Text>
              {enhancement.expertTips[language as keyof typeof enhancement.expertTips]?.map((tip, i) => (
                <View key={i} style={styles.expertTip}>
                  <Text style={styles.expertName}>{tip.expert}</Text>
                  <Text style={styles.expertQuote}>&quot;{tip.tip}&quot;</Text>
                </View>
              ))}
            </View>
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

          <View style={styles.navBtns}>
            {lesson.step_number > 1 && (
              <TouchableOpacity
                style={styles.navBtn}
                onPress={() => router.push(`/web/licao/${lesson.step_number - 1}`)}
              >
                <ArrowLeft size={16} color="#475569" />
                <Text style={styles.navBtnText}>{t('web.lesson.previousStep')}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={styles.programBtn}
              onPress={() => router.push('/web/programa')}
            >
              <Text style={styles.programBtnText}>{t('web.lesson.viewFullProgram')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 GoZzzz · {t('web.lesson.footer')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lockedPage: { flex: 1, backgroundColor: '#0f172a' },
  lockedBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    gap: 18,
    minHeight: 500,
  },
  lockedTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 8,
  },
  lockedSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 480,
  },
  lockedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 8,
  },
  lockedBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
  },
  lockedBack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  lockedBackText: {
    fontSize: 14,
    color: '#94a3b8',
  },
  page: { flex: 1, backgroundColor: '#f8fafc' },

  nav: { paddingTop: 0, paddingBottom: 0 },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 16,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  header: {
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  stepBadge: {
    backgroundColor: 'rgba(251,191,36,0.15)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
  },
  stepBadgeText: { fontSize: 13, fontWeight: '700', color: '#fbbf24' },
  headerTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    maxWidth: 700,
  },
  oneLinerText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: '#a89fff',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 4,
    maxWidth: 600,
    paddingHorizontal: 16,
  },

  content: { paddingVertical: 48 },
  container: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
    gap: 24,
  },

  heroImage: {
    width: '100%',
    height: 240,
    borderRadius: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardYellow: {
    backgroundColor: '#fffbeb',
    borderWidth: 2,
    borderColor: '#fde68a',
  },
  cardBlue: {
    backgroundColor: '#eff6ff',
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#0f172a', marginBottom: 16 },

  resourceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 12,
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceText: { flex: 1 },
  resourceTitle: { fontSize: 15, fontWeight: '700', color: '#1e293b' },
  resourceSub: { fontSize: 12, color: '#64748b', marginTop: 2 },

  bullet: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  bulletDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
    marginTop: 6,
    marginRight: 12,
    flexShrink: 0,
  },
  bulletText: { flex: 1, fontSize: 15, color: '#78350f', lineHeight: 22, fontWeight: '500' },

  descText: { fontSize: 16, color: '#475569', lineHeight: 28, marginBottom: 16 },
  durationInfo: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#e2e8f0', flexDirection: 'row', alignItems: 'center', gap: 8 },
  durationLabel: { fontSize: 14, fontWeight: '600', color: '#64748b' },
  durationValue: { fontSize: 14, fontWeight: '700', color: '#0f172a' },

  expertTip: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  expertName: { fontSize: 13, fontWeight: '700', color: '#2563eb', marginBottom: 6 },
  expertQuote: { fontSize: 15, color: '#1e40af', lineHeight: 22, fontStyle: 'italic' },

  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    borderRadius: 16,
    paddingVertical: 18,
    marginBottom: 24,
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
  lesson1ButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#f8fafc',
  },
  lesson2ButtonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: '#f8fafc',
  },
  navBtns: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  navBtnText: { fontSize: 14, fontWeight: '600', color: '#475569' },
  programBtn: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  programBtnText: { fontSize: 14, fontWeight: '700', color: '#ffffff' },

  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8fafc',
  },
  errorText: { fontSize: 18, color: '#dc2626', marginBottom: 20 },
  errorBtn: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  errorBtnText: { fontSize: 14, fontWeight: '700', color: '#ffffff' },

  footer: { backgroundColor: '#0f172a', paddingVertical: 24, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#475569' },
});
