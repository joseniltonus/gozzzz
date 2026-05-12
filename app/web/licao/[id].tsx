import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  LayoutChangeEvent,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Lightbulb,
  Lock,
  Crown,
 CircleCheck as CheckCircle } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { LESSONS_DATA } from '@/data/lessons';
import { LESSON_ENHANCEMENTS } from '@/data/lessonEnhancements';
import { useProgramUnlock } from '@/lib/program-unlock';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import { useProgress } from '@/contexts/ProgressContext';
import { supabase } from '@/lib/supabase';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { LESSON_FONT, LESSON_INK, LESSON_PAPER } from '@/constants/lessonPaperTheme';
import { useState, useEffect, useRef } from 'react';
import { Lesson1InteractiveCardWeb } from '@/components/Lesson1InteractiveCardWeb';
import { LessonInteractiveCardWeb } from '@/components/LessonInteractiveCardWeb';
import { SleepLessonCardWeb } from '@/components/SleepLessonCardWeb';
import { SLEEP_LESSON_CONTENT } from '@/data/sleepLessonContent';
import { getChronotypeOneLiner } from '@/data/chronotypeOneLiner';
import { getChronotypeProtocol } from '@/data/chronotypeLessonProtocols';

const CHRONOTYPE_LABELS: Record<'dolphin' | 'lion' | 'bear' | 'wolf', { emoji: string; label: string; tint: string }> = {
  dolphin: { emoji: '🐬', label: 'Golfinho', tint: '#a78bfa' },
  lion: { emoji: '🦁', label: 'Leão', tint: '#f59e0b' },
  bear: { emoji: '🐻', label: 'Urso', tint: '#10b981' },
  wolf: { emoji: '🐺', label: 'Lobo', tint: '#4a9eff' },
};

/** Mesmo nav da landing `/web/sono-plus` (marca só texto + roxo profundo). */
const NAV_GRAD_COLORS = ['#0c0a1f', '#1e1b4b'] as const;
const LESSON_HERO_GRAD_COLORS = ['#1e1b4b', '#0c0a1f'] as const;

export default function WebLessonPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { t: translate } = useLanguage();
  const language: 'pt' = 'pt';
  const t = (key: string) => translate(key, 'pt');
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const chronotype = useEffectiveChronotype();
  const { refreshProgress } = useProgress();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);
  const [accessChecked, setAccessChecked] = useState(false);
  const [completingLesson, setCompletingLesson] = useState(false);
  const [sleepLessonComplete, setSleepLessonComplete] = useState(false);
  const { width: windowWidth } = useWindowDimensions();
  const lessonScrollRef = useRef<ScrollView>(null);
  const lessonBodyScrollY = useRef(0);
  const compactLessonHero = windowWidth < 540;
  const microLessonHero = windowWidth < 380;
  const wideLessonHero = windowWidth >= 640;
  const contentPadH = windowWidth < 400 ? 16 : 24;

  const onLessonReadingZoneLayout = (e: LayoutChangeEvent) => {
    lessonBodyScrollY.current = e.nativeEvent.layout.y;
  };

  /** Rola até ao início do conteúdo da lição (após o hero), não até ao topo absoluto — melhor para leitura entre passos. */
  const scrollLessonToReadingStart = () => {
    requestAnimationFrame(() => {
      const y = lessonBodyScrollY.current;
      lessonScrollRef.current?.scrollTo({
        y: Math.max(0, y - 12),
        animated: true,
      });
    });
  };

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

  const isPremiumStep = lesson.step_number > 3;
  // Cliente que veio do e-mail Kiwify com ?key= certo (ou já salvou no
  // localStorage) destrava o conteúdo premium sem precisar logar.
  const unlockedFromUrl = useProgramUnlock();
  const accessPending = Boolean(
    user && isPremiumStep && !accessChecked && !unlockedFromUrl,
  );
  const isLocked =
    isPremiumStep && !unlockedFromUrl && (!user || (accessChecked && !hasPremiumAccess));

  if (accessPending) {
    return (
      <View style={styles.lockedPage}>
        <LinearGradient colors={NAV_GRAD_COLORS} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <View style={[styles.lockedBody, { flex: 1, justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color="#fbbf24" />
        </View>
      </View>
    );
  }

  if (isLocked) {
    return (
      <View style={styles.lockedPage}>
        <LinearGradient colors={NAV_GRAD_COLORS} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
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

  const getTitle = () => {
    if (language === 'pt') return lesson.title_pt;
    return lesson.title_en;
  };

  const getDescription = () => {
    if (language === 'pt') return lesson.description_pt;
    return lesson.description_en;
  };

  const oneLiner = getChronotypeOneLiner(lesson.step_number, chronotype, language as 'pt' | 'en');
  const protocol = getChronotypeProtocol(lesson.id, chronotype, language as 'pt' | 'en');
  const chronotypeMeta = chronotype ? CHRONOTYPE_LABELS[chronotype] : null;

  const protocolCallout =
    protocol && chronotypeMeta ? (
      <View
        style={[
          styles.protocolCallout,
          {
            borderColor: `${chronotypeMeta.tint}55`,
            backgroundColor: `${chronotypeMeta.tint}14`,
          },
        ]}
      >
        <View style={styles.protocolCalloutHeader}>
          <Text style={styles.protocolCalloutEmoji}>{chronotypeMeta.emoji}</Text>
          <Text style={[styles.protocolCalloutLabel, { color: chronotypeMeta.tint }]}>
            Pra você como {chronotypeMeta.label}
          </Text>
        </View>
        <Text style={[styles.protocolCalloutWindow, { color: chronotypeMeta.tint }]}>
          {protocol.window}
        </Text>
        <Text style={styles.protocolCalloutBody}>{protocol.why}</Text>
        <View style={[styles.protocolCalloutLimitRow, { borderColor: `${chronotypeMeta.tint}33` }]}>
          <Text style={styles.protocolCalloutLimitLabel}>Limite</Text>
          <Text style={styles.protocolCalloutLimitValue}>{protocol.limit}</Text>
        </View>
      </View>
    ) : null;

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
    // Lições 1–3 são abertas para visitantes sem login. Não guardamos por !user
    // aqui — o botão precisa avançar mesmo sem sessão (caso contrário o clique
    // some sem feedback). Para usuários logados, persistimos no Supabase + local;
    // para anônimos, persistimos só no localStorage com chave "anonymous".
    if (!lesson || completingLesson) return;
    setCompletingLesson(true);

    try {
      const localProgressKey = `user_progress_local_${user?.id ?? 'anonymous'}`;
      if (typeof window !== 'undefined' && window.localStorage) {
        const existing = window.localStorage.getItem(localProgressKey);
        const list: string[] = existing ? JSON.parse(existing) : [];
        if (!list.includes(lesson.id)) {
          window.localStorage.setItem(localProgressKey, JSON.stringify([...list, lesson.id]));
        }
      }
    } catch (error) {
      console.warn('Local progress write failed (web):', error);
    }

    if (user) {
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
      } catch (error) {
        console.warn('Server progress write fallback (web):', error);
      }
      // Fire-and-forget: não bloqueamos a navegação esperando o re-fetch.
      void refreshProgress();
    }

    const nextLesson = LESSONS_DATA.find((l) => l.step_number === lesson.step_number + 1);
    if (nextLesson) {
      const nextIsPremiumAndLocked =
        nextLesson.step_number > 3 && accessChecked && !hasPremiumAccess;
      if (nextIsPremiumAndLocked) {
        router.push('/web/programa');
      } else {
        router.push(`/web/licao/${nextLesson.id}`);
      }
    } else {
      router.push('/web/programa');
    }
    setCompletingLesson(false);
  };

  if (!isLocked) {
    if (lesson.id === '1') {
      return (
        <ScrollView
          ref={lessonScrollRef}
          style={styles.lessonPageScroll}
          contentContainerStyle={styles.lessonPageScrollContent}
          showsVerticalScrollIndicator
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient colors={NAV_GRAD_COLORS} style={styles.nav}>
            <View style={[styles.navInner, { paddingHorizontal: contentPadH }]}>
              <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
                <Text style={styles.navBrandText}>GoZzzz</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToPrevLesson} style={styles.backBtn}>
                <ArrowLeft size={18} color="#94a3b8" />
                <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <LinearGradient
            colors={LESSON_HERO_GRAD_COLORS}
            style={[
              styles.header,
              compactLessonHero && styles.headerCompact,
              microLessonHero && styles.headerMicro,
              { paddingHorizontal: contentPadH },
            ]}
          >
            <View style={[styles.stepBadge, microLessonHero && styles.stepBadgeMicro]}>
              <Text style={[styles.stepBadgeText, microLessonHero && styles.stepBadgeTextMicro]}>
                {t('web.lesson.step')} {lesson.step_number}
              </Text>
            </View>
            <Text
              style={[
                styles.headerTitle,
                wideLessonHero && styles.headerTitleWide,
                microLessonHero && styles.headerTitleMicro,
              ]}
            >
              {getTitle()}
            </Text>
            {oneLiner && (
              <Text style={[styles.oneLinerText, compactLessonHero && styles.oneLinerCompact]}>{oneLiner}</Text>
            )}
          </LinearGradient>

          <View style={styles.lessonReadingZone} onLayout={onLessonReadingZoneLayout}>
          <Lesson1InteractiveCardWeb
            key={`lesson1web-${id as string}`}
            onStepChange={scrollLessonToReadingStart}
            renderCompleteButton={(isLast) =>
              isLast ? (
                <View style={[styles.lesson1ButtonContainer, { paddingHorizontal: contentPadH }]}>
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
              ) : null
            }
          />
          </View>
        </ScrollView>
      );
    }

    return (
      <ScrollView
        ref={lessonScrollRef}
        style={styles.lessonPageScroll}
        contentContainerStyle={styles.lessonPageScrollContent}
        showsVerticalScrollIndicator
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient colors={NAV_GRAD_COLORS} style={styles.nav}>
          <View style={[styles.navInner, { paddingHorizontal: contentPadH }]}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={LESSON_HERO_GRAD_COLORS}
          style={[
            styles.header,
            compactLessonHero && styles.headerCompact,
            microLessonHero && styles.headerMicro,
            { paddingHorizontal: contentPadH },
          ]}
        >
          <View style={[styles.stepBadge, microLessonHero && styles.stepBadgeMicro]}>
            <Text style={[styles.stepBadgeText, microLessonHero && styles.stepBadgeTextMicro]}>
              {t('web.lesson.step')} {lesson.step_number}
            </Text>
          </View>
          <Text
            style={[
              styles.headerTitle,
              wideLessonHero && styles.headerTitleWide,
              microLessonHero && styles.headerTitleMicro,
            ]}
          >
            {getTitle()}
          </Text>
          {oneLiner && (
            <Text style={[styles.oneLinerText, compactLessonHero && styles.oneLinerCompact]}>{oneLiner}</Text>
          )}
        </LinearGradient>

        <View style={styles.lessonReadingZone} onLayout={onLessonReadingZoneLayout}>
        {protocolCallout && (
          <View style={[styles.protocolCalloutContainer, { paddingHorizontal: contentPadH }]}>{protocolCallout}</View>
        )}
        {SLEEP_LESSON_CONTENT.find((l) => l.id === id) ? (
          <SleepLessonCardWeb
            key={`sleepweb-${id as string}`}
            lessonId={id as string}
            onStepChange={scrollLessonToReadingStart}
            onComplete={() => setSleepLessonComplete(true)}
          />
        ) : (
          <LessonInteractiveCardWeb
            key={`interactiveweb-${id as string}`}
            lessonId={id as string}
            onComplete={() => setSleepLessonComplete(true)}
          />
        )}
        {(SLEEP_LESSON_CONTENT.find((l) => l.id === id) ? sleepLessonComplete : true) && (
          <View style={[styles.lesson2ButtonContainer, { paddingHorizontal: contentPadH }]}>
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
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={NAV_GRAD_COLORS} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.backBtn}>
            <ArrowLeft size={18} color="#94a3b8" />
            <Text style={styles.backBtnText}>{t('web.lesson.program')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <LinearGradient colors={LESSON_HERO_GRAD_COLORS} style={styles.header}>
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


          {protocolCallout}

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
  protocolCalloutContainer: {
    paddingTop: 20,
    maxWidth: 760,
    alignSelf: 'center',
    width: '100%',
  },
  protocolCallout: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  protocolCalloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  protocolCalloutEmoji: { fontSize: 22 },
  protocolCalloutLabel: {
    fontSize: 12.5,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  protocolCalloutWindow: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  protocolCalloutBody: {
    fontSize: 15,
    lineHeight: 24,
    color: '#e2e8f0',
    marginBottom: 14,
  },
  protocolCalloutLimitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  protocolCalloutLimitLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  protocolCalloutLimitValue: {
    flex: 1,
    fontSize: 13,
    color: '#e2e8f0',
    fontWeight: '500',
    lineHeight: 19,
  },
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
  page: { flex: 1, backgroundColor: LESSON_PAPER.page },
  lessonPageScroll: {
    flex: 1,
    backgroundColor: LESSON_PAPER.page,
    maxWidth: '100%',
    alignSelf: 'stretch',
  },
  lessonPageScrollContent: {
    flexGrow: 1,
    paddingBottom: 52,
  },
  lessonReadingZone: {
    width: '100%',
  },

  nav: {
    paddingTop: 0,
    paddingBottom: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  navBrandText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  header: {
    paddingTop: 40,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerCompact: {
    paddingTop: 20,
    paddingBottom: 22,
  },
  headerMicro: {
    paddingTop: 14,
    paddingBottom: 16,
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
  stepBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e8d5b0',
    letterSpacing: 0.6,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  stepBadgeMicro: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 10,
    borderRadius: 14,
  },
  stepBadgeTextMicro: { fontSize: 12 },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    maxWidth: 640,
    lineHeight: 34,
    paddingHorizontal: 8,
    letterSpacing: -0.35,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  headerTitleWide: {
    fontSize: 40,
    lineHeight: 46,
  },
  headerTitleMicro: {
    fontSize: 24,
    lineHeight: 30,
    maxWidth: '100%',
  },
  oneLinerText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#ddd5f0',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 6,
    maxWidth: 560,
    paddingHorizontal: 12,
    lineHeight: 24,
    opacity: 0.96,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  oneLinerCompact: {
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 8,
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
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 16,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },

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

  descText: {
    fontSize: 16,
    color: LESSON_INK.body,
    lineHeight: 29,
    marginBottom: 16,
    letterSpacing: 0.02,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  durationInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: LESSON_PAPER.divider,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: LESSON_INK.label,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  durationValue: {
    fontSize: 14,
    fontWeight: '700',
    color: LESSON_INK.display,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },

  expertTip: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  expertName: {
    fontSize: 13,
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 6,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  expertQuote: {
    fontSize: 15,
    color: LESSON_INK.muted,
    lineHeight: 24,
    fontStyle: 'italic',
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },

  completeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: LESSON_PAPER.foil,
    borderRadius: 14,
    paddingVertical: 18,
    minHeight: 54,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(90, 70, 40, 0.28)',
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  completeButtonDisabled: {
    opacity: 0.6,
  },
  completeButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#14110d',
    letterSpacing: 0.35,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  lesson1ButtonContainer: {
    paddingVertical: 24,
    paddingBottom: 32,
    backgroundColor: LESSON_PAPER.page,
  },
  lesson2ButtonContainer: {
    paddingVertical: 24,
    paddingBottom: 32,
    backgroundColor: LESSON_PAPER.page,
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
    backgroundColor: LESSON_PAPER.page,
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
