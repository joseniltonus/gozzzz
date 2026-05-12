import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  Lock,
  BookOpen,
  Crown,
  Sparkles,
  Check,
  CreditCard,
  Shield,
  BadgeCheck,
  Wand2,
} from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import { useProgramUnlock } from '@/lib/program-unlock';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import { getChronotypeOneLiner } from '@/data/chronotypeOneLiner';
import ChronotypeWebInlineQuiz from '@/components/web/chronotype/ChronotypeWebInlineQuiz';
import type { Chronotype } from '@/data/chronotypes';
import type { QuizChronotype } from '@/components/web/chronotype/ChronotypeWebInlineQuiz';

const isWeb = Platform.OS === 'web';

const CHRONOTYPE_META: Record<
  'dolphin' | 'lion' | 'bear' | 'wolf',
  { emoji: string; label: string; tint: string; tintBg: string; tintBorder: string }
> = {
  dolphin: {
    emoji: '🐬',
    label: 'Golfinho',
    tint: '#a78bfa',
    tintBg: 'rgba(167,139,250,0.12)',
    tintBorder: 'rgba(167,139,250,0.32)',
  },
  lion: {
    emoji: '🦁',
    label: 'Leão',
    tint: '#f59e0b',
    tintBg: 'rgba(245,158,11,0.12)',
    tintBorder: 'rgba(245,158,11,0.32)',
  },
  bear: {
    emoji: '🐻',
    label: 'Urso',
    tint: '#10b981',
    tintBg: 'rgba(16,185,129,0.12)',
    tintBorder: 'rgba(16,185,129,0.32)',
  },
  wolf: {
    emoji: '🐺',
    label: 'Lobo',
    tint: '#4a9eff',
    tintBg: 'rgba(74,158,255,0.12)',
    tintBorder: 'rgba(74,158,255,0.32)',
  },
};

export default function WebProgramPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t: translate } = useLanguage();
  const t = (key: string) => translate(key, 'pt');
  const [showQuizPanel, setShowQuizPanel] = useState(false);
  const [quizSessionKey, setQuizSessionKey] = useState(0);
  const [persistedChronotype, setPersistedChronotype] = useState<Chronotype | null>(null);

  // Cliente que veio do e-mail Kiwify com ?key= correto (ou já salvou no
  // localStorage) destrava todas as 21 lições. Sem login, sem fricção.
  const unlocked = useProgramUnlock();
  const chronotypeFromHook = useEffectiveChronotype();
  const chronotype = persistedChronotype ?? chronotypeFromHook;
  const meta = chronotype ? CHRONOTYPE_META[chronotype] : null;
  const quizEmailStack = width < 480;

  const allSteps = [
    ...LESSONS_DATA.map((l) => ({
      id: l.id,
      num: l.step_number,
      title: l.title_pt,
      desc: l.description_pt.substring(0, 120) + '...',
      oneLiner: chronotype ? getChronotypeOneLiner(l.step_number, chronotype, 'pt') : null,
      free: l.step_number <= 3 || unlocked,
    })),
  ];

  return (
    <>
      <Head>
        <title>{t('web.program.headTitle')}</title>
        <meta name="description" content={t('web.program.headDesc')} />
        <meta property="og:title" content={t('web.program.headTitle')} />
        <meta property="og:description" content={t('web.program.ogDesc')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gozzzz.app/web/programa" />
      </Head>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* NAV */}
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={18} color="#ffffff" />
            <Text style={styles.backBtnText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* HEADER — mesmo fundo escuro da página e dos cards de passos */}
      <View style={styles.header}>
        <View style={styles.headerBadge}>
          <Sparkles size={14} color="#fbbf24" />
          <Text style={styles.headerBadgeText}>{t('web.badge.scienceBased')}</Text>
        </View>
        <Text style={styles.headerTitle}>{t('web.program.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('web.program.subtitle')}</Text>
        <View style={styles.headerStats}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatNum}>21</Text>
            <Text style={styles.headerStatLabel}>{t('web.program.steps')}</Text>
          </View>
          <View style={styles.headerStatDiv} />
          <View style={styles.headerStat}>
            <Text style={styles.headerStatNum}>3</Text>
            <Text style={styles.headerStatLabel}>{t('web.program.freeLessons')}</Text>
          </View>
          <View style={styles.headerStatDiv} />
          <View style={styles.headerStat}>
            <Text style={styles.headerStatNum}>5 min</Text>
            <Text style={styles.headerStatLabel}>{t('web.program.eachStep')}</Text>
          </View>
        </View>
      </View>

      {/* STEPS */}
      <View style={styles.content}>
        <View style={styles.container}>
          {/* Banner de personalização — adapta CTA ou confirmação conforme cronótipo */}
          {meta && !showQuizPanel ? (
            <View style={[styles.personalizedBanner, { borderColor: meta.tintBorder }]}>
              <Text style={styles.personalizedBannerEmoji}>{meta.emoji}</Text>
              <View style={styles.personalizedBannerCol}>
                <Text style={[styles.personalizedBannerTitle, { color: meta.tint }]}>
                  Sua trilha personalizada — {meta.label}
                </Text>
                <Text style={styles.personalizedBannerDesc}>
                  As lições mostram orientação adaptada ao seu cronótipo. Você pode refazer o quiz a qualquer momento.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.personalizedBannerBtn}
                onPress={() => {
                  setQuizSessionKey((k) => k + 1);
                  setShowQuizPanel(true);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.personalizedBannerBtnText}>Refazer quiz</Text>
              </TouchableOpacity>
            </View>
          ) : showQuizPanel ? (
            <ChronotypeWebInlineQuiz
              key={quizSessionKey}
              paddingHorizontal={0}
              quizEmailStack={quizEmailStack}
              variant="embedded"
              enableHashAutostart={false}
              nativeId="program-quiz"
              initialQuizStep="answering"
              reportSource="web_quiz_inline_programa"
              onChronotypePersisted={(ct: QuizChronotype) => {
                setPersistedChronotype(ct);
              }}
              onPrimaryCtaPress={() => setShowQuizPanel(false)}
            />
          ) : (
            <TouchableOpacity
              style={styles.quizCtaBanner}
              onPress={() => setShowQuizPanel(true)}
              activeOpacity={0.88}
            >
              <View style={styles.quizCtaIconWrap}>
                <Wand2 size={22} color="#fbbf24" />
              </View>
              <View style={styles.quizCtaCol}>
                <Text style={styles.quizCtaTitle}>Personalizar minha trilha</Text>
                <Text style={styles.quizCtaDesc}>
                  Descubra seu cronótipo em 2 minutos e veja orientação específica em cada lição.
                </Text>
              </View>
              <View style={styles.quizCtaBtn}>
                <Text style={styles.quizCtaBtnText}>Fazer quiz</Text>
              </View>
            </TouchableOpacity>
          )}

          <View nativeID="program-lessons">
          <Text style={styles.sectionTitle}>{t('web.program.allLessons')}</Text>
          <Text style={styles.sectionDesc}>{t('web.program.learnScience')}</Text>

          <View style={styles.stepsGrid}>
            {allSteps.map((step) => (
              <View key={step.id} style={[styles.stepCard, !step.free && styles.stepCardLocked]}>
                <View style={styles.stepHeader}>
                  <View style={[styles.stepNum, !step.free && styles.stepNumLocked]}>
                    <Text style={[styles.stepNumText, !step.free && styles.stepNumTextLocked]}>
                      {step.num}
                    </Text>
                  </View>
                  <View style={styles.stepMeta}>
                    {step.free ? (
                      <View style={styles.freeBadge}>
                        <Text style={styles.freeBadgeText}>{t('web.program.free')}</Text>
                      </View>
                    ) : (
                      <View style={styles.premiumBadge}>
                        <Crown size={10} color="#f59e0b" />
                        <Text style={styles.premiumBadgeText}>{t('web.program.premium')}</Text>
                      </View>
                    )}
                  </View>
                  {!step.free && <Lock size={16} color="#94a3b8" />}
                </View>

                <Text style={[styles.stepTitle, !step.free && styles.stepTitleLocked]}>{step.title}</Text>

                {/* Badge de cronótipo nas 3 primeiras lições — espelha mobile */}
                {meta && step.num <= 3 && (
                  <View style={[styles.chronotypeBadge, { backgroundColor: meta.tintBg, borderColor: meta.tintBorder }]}>
                    <Text style={styles.chronotypeBadgeEmoji}>{meta.emoji}</Text>
                    <Text style={[styles.chronotypeBadgeText, { color: meta.tint }]}>{meta.label}</Text>
                  </View>
                )}

                {/* One-liner personalizado — mesma fonte que o app mobile */}
                {step.oneLiner && meta && (
                  <Text style={[styles.stepOneLiner, { color: meta.tint, opacity: step.free ? 1 : 0.55 }]}>
                    {step.oneLiner}
                  </Text>
                )}

                <Text style={[styles.stepDesc, !step.free && styles.stepDescLocked]}>{step.desc}</Text>

                <View style={styles.stepFooter}>
                  {step.free ? (
                    <View style={styles.stepFreeFooter}>
                      <View style={styles.stepResources}>
                      </View>
                      <TouchableOpacity
                        style={styles.viewLessonBtn}
                        onPress={() => router.push(`/web/licao/${step.id}`)}
                      >
                        <BookOpen size={13} color="#ffffff" />
                        <Text style={styles.viewLessonBtnText}>{t('web.program.viewLesson')}</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.unlockBtn}
                      onPress={() => router.push('/web/assinar')}
                    >
                      <Crown size={12} color="#ffffff" />
                      <Text style={styles.unlockBtnText}>{t('web.program.unlockPremium')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Crown size={40} color="#fbbf24" />
            <Text style={styles.ctaTitle}>{t('web.program.ctaTitle')}</Text>
            <Text style={styles.ctaDesc}>{t('web.program.ctaDesc')}</Text>
            <View style={styles.ctaFeatures}>
              {[t('web.program.feature1'), t('web.program.feature2'), t('web.program.feature3')].map((f, i) => (
                <View key={i} style={styles.ctaFeature}>
                  <Check size={14} color="#10b981" />
                  <Text style={styles.ctaFeatureText}>{f}</Text>
                </View>
              ))}
            </View>
            <View style={styles.ctaPayRow}>
              <View style={styles.ctaPayBadge}>
                <CreditCard size={13} color="#94a3b8" />
                <Text style={styles.ctaPayBadgeText}>Cartão</Text>
              </View>
              <View style={styles.ctaPayBadge}>
                <Text style={styles.ctaPayBadgeEmoji}></Text>
                <Text style={styles.ctaPayBadgeText}>Apple Pay</Text>
              </View>
              <View style={styles.ctaPayBadge}>
                <Text style={styles.ctaPayBadgeEmoji}>G</Text>
                <Text style={styles.ctaPayBadgeText}>Google Pay</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/web/assinar')}>
              <Crown size={18} color="#1e293b" />
              <Text style={styles.ctaBtnText}>{t('web.program.subscribeNow')}</Text>
            </TouchableOpacity>
            <View style={styles.ctaSecurityRow}>
              <Lock size={12} color="#10b981" />
              <Text style={styles.ctaSecurityText}>{t('payment.ssl')}</Text>
              <Shield size={12} color="#3b82f6" />
              <Text style={styles.ctaSecurityText}>Pagamento seguro via Stripe</Text>
              <BadgeCheck size={12} color="#f59e0b" />
              <Text style={styles.ctaSecurityText}>{t('payment.pciDss')}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },
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
    backgroundColor: '#07070f',
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(251,191,36,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
  },
  headerBadgeText: { fontSize: 13, fontWeight: '600', color: '#fbbf24' },
  headerTitle: { fontSize: isWeb ? 48 : 32, fontWeight: '800', color: '#ffffff', textAlign: 'center', marginBottom: 16 },
  headerSubtitle: { fontSize: 17, color: '#94a3b8', textAlign: 'center', lineHeight: 26, maxWidth: 580, marginBottom: 32 },
  headerStats: {
    flexDirection: 'row',
    gap: 28,
    backgroundColor: '#12121e',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  headerStat: { alignItems: 'center' },
  headerStatNum: { fontSize: 28, fontWeight: '800', color: '#fbbf24' },
  headerStatLabel: { fontSize: 13, color: '#94a3b8' },
  headerStatDiv: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.1)' },

  content: { paddingVertical: 56 },
  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },
  sectionTitle: { fontSize: 28, fontWeight: '800', color: '#e8d5b7', marginBottom: 8 },
  sectionDesc: { fontSize: 16, color: '#8892a4', marginBottom: 40 },

  stepsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 20,
  },
  stepCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    width: isWeb ? 320 : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  stepCardLocked: { opacity: 0.65, borderStyle: 'dashed', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)' },
  chronotypeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  chronotypeBadgeEmoji: { fontSize: 13, lineHeight: 15 },
  chronotypeBadgeText: { fontSize: 11.5, fontWeight: '700', letterSpacing: 0.2 },
  stepOneLiner: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '500',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  personalizedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 14,
    borderWidth: 1,
    /** Mesmo tom dos cards de lição — o tintBg do cronótipo clareava demais o bloco */
    backgroundColor: '#12121e',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  personalizedBannerEmoji: { fontSize: 26 },
  personalizedBannerCol: { flex: 1, minWidth: 220 },
  personalizedBannerTitle: { fontSize: 15, fontWeight: '800', marginBottom: 3 },
  personalizedBannerDesc: { fontSize: 12.5, color: '#a3b1c2', lineHeight: 18 },
  personalizedBannerBtn: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  personalizedBannerBtnText: { fontSize: 12, fontWeight: '700', color: '#e8e5df' },
  quizCtaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: 'rgba(251,191,36,0.06)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.22)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  quizCtaIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(251,191,36,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.3)',
  },
  quizCtaCol: { flex: 1, minWidth: 220 },
  quizCtaTitle: { fontSize: 15, fontWeight: '800', color: '#fbbf24', marginBottom: 3 },
  quizCtaDesc: { fontSize: 12.5, color: '#a3b1c2', lineHeight: 18 },
  quizCtaBtn: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  quizCtaBtnText: { fontSize: 13, fontWeight: '800', color: '#0d0d16' },
  stepHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14, gap: 8 },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(212,169,106,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumLocked: { backgroundColor: 'rgba(255,255,255,0.05)' },
  stepNumText: { fontSize: 16, fontWeight: '800', color: '#d4a96a' },
  stepNumTextLocked: { color: '#5a5a72' },
  stepMeta: { flex: 1 },
  freeBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  freeBadgeText: { fontSize: 11, fontWeight: '700', color: '#166534' },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  premiumBadgeText: { fontSize: 11, fontWeight: '700', color: '#92400e' },
  stepTitle: { fontSize: 17, fontWeight: '700', color: '#e8d5b7', marginBottom: 8 },
  stepTitleLocked: { color: '#5a5a72' },
  stepDesc: { fontSize: 14, color: '#8892a4', lineHeight: 20, marginBottom: 16 },
  stepDescLocked: { color: '#3a3a52' },
  stepFooter: { marginTop: 'auto' as any },
  stepFreeFooter: { gap: 12 },
  stepResources: { flexDirection: 'row', gap: 8 },
  viewLessonBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#d4a96a',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  viewLessonBtnText: { fontSize: 13, fontWeight: '700', color: '#0d0d16' },
  resourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  resourceText: { fontSize: 12, fontWeight: '600', color: '#8892a4' },
  unlockBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  unlockBtnText: { fontSize: 13, fontWeight: '700', color: '#ffffff' },

  ctaBox: {
    backgroundColor: '#0f172a',
    borderRadius: 24,
    padding: 40,
    marginTop: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  ctaTitle: { fontSize: 28, fontWeight: '800', color: '#ffffff', textAlign: 'center', marginTop: 16, marginBottom: 12 },
  ctaDesc: { fontSize: 16, color: '#94a3b8', textAlign: 'center', lineHeight: 24, maxWidth: 500, marginBottom: 28 },
  ctaFeatures: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 32,
  },
  ctaFeature: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  ctaFeatureText: { fontSize: 14, color: '#cbd5e1', fontWeight: '500' },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fbbf24',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 14,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaBtnText: { fontSize: 17, fontWeight: '800', color: '#1e293b' },

  ctaPayRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  ctaPayBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  ctaPayBadgeText: { fontSize: 12, fontWeight: '600', color: '#cbd5e1' },
  ctaPayBadgeEmoji: { fontSize: 13, fontWeight: '700', color: '#cbd5e1' },
  ctaSecurityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  ctaSecurityText: { fontSize: 11, color: '#64748b' },

  footer: { backgroundColor: '#07070f', paddingVertical: 24, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#8892a4' },
});
