import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useState, useMemo } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Brain,
  Sun,
  Coffee,
  ArrowRight,
  Check,
  Crown,
  BookOpen,
  Heart,
  Shield,
  Headphones,
  Lock,
  BadgeCheck,
  Calendar,
  Bed,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import ChronotypePremiumWebFunnel from '@/components/web/chronotype/ChronotypePremiumWebFunnel';
import { WEB_OG_IMAGE_URL, WEB_OG_SITE_NAME, WEB_ORIGIN } from '@/lib/webOgConstants';

const isWeb = Platform.OS === 'web';

const GOLD = '#d4a96a';
const GOLD_LIGHT = '#e8c99a';

function WebNav({ scrollY }: { scrollY: number }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const showLinks = width >= 768;
  const scrolled = scrollY > 40;

  return (
    <View style={[styles.nav, scrolled && styles.navScrolled]}>
      <View style={styles.navInner}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.navBrand}>
          <GozzzzWordmark size="md" />
        </TouchableOpacity>

        {showLinks ? (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push('/web/programa')}>
              <Text style={styles.navLink}>{t('web.nav.program')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/coach')}>
              <Text style={styles.navLink}>{t('web.nav.coach')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sobre')}>
              <Text style={styles.navLink}>{t('web.nav.about')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/assinar')} style={styles.navCta}>
              <Text style={styles.navCtaText}>{t('web.nav.subscribe')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => router.push('/web/assinar')} style={styles.navCta}>
            <Text style={styles.navCtaText}>{t('web.nav.subscribe')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function WebMarketingLanding() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const [hoveredPricingBtn, setHoveredPricingBtn] = useState<number | null>(null);
  const [hoveredCtaBtn, setHoveredCtaBtn] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  /** RN Web: o scroll é no `ScrollView`, não em `window` — `window.scrollY` ficava sempre 0. */
  const onPageScroll = (e: { nativeEvent: { contentOffset: { y: number } } }) => {
    setScrollY(e.nativeEvent.contentOffset.y);
  };

  const testimonials = [
    {
      name: 'Ana Paula M.',
      role: t('web.testimonial.ana.role'),
      text: t('web.testimonial.ana.text'),
      result: t('web.testimonial.ana.result'),
      stars: 5,
    },
    {
      name: 'Carlos R.',
      role: t('web.testimonial.carlos.role'),
      text: t('web.testimonial.carlos.text'),
      result: t('web.testimonial.carlos.result'),
      stars: 5,
    },
  ];

  const steps = language === 'pt'
    ? [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Entenda Sua Biologia', desc: 'Aprenda como o ritmo circadiano funciona e por que o sono importa', hasVideo: true, hasAudio: true },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Domine a Exposição à Luz', desc: 'Controle sua exposição à luz para otimizar seu relógio biológico', hasVideo: true, hasAudio: true },
        { num: 3, icon: Coffee, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Otimize Seus Horários', desc: 'Aprenda quando comer, exercitar e descansar para dormir melhor', hasVideo: true, hasAudio: true },
      ]
    : [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Understand Your Biology', desc: 'Learn how your circadian rhythm works and why sleep matters', hasVideo: true, hasAudio: true },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Master Light Exposure', desc: 'Control your light exposure to optimize your body clock', hasVideo: true, hasAudio: true },
        { num: 3, icon: Coffee, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Optimize Timing', desc: 'Learn when to eat, exercise, and rest for better sleep', hasVideo: true, hasAudio: true },
      ];

  const sciencePillars = language === 'pt'
    ? [
        { icon: Brain, title: 'Arquitetura do Sono', desc: 'Baseado em pesquisas revisadas por pares sobre estágios do sono, biologia circadiana e consolidação da memória' },
        { icon: Sun, title: 'Ciência Circadiana', desc: 'Fundamentado em estudos publicados sobre exposição à luz, regulação da melatonina e otimização do relógio biológico' },
        { icon: Bed, title: 'Distúrbios do Sono', desc: 'Informado por pesquisas clínicas sobre insônia, privação de sono e medicina comportamental do sono' },
        { icon: Heart, title: 'Protocolos de Estilo de Vida', desc: 'Sintetiza evidências de ciência nutricional, fisiologia do exercício e literatura de gerenciamento do estresse' },
      ]
    : [
        { icon: Brain, title: 'Sleep Architecture', desc: 'Built on peer-reviewed research covering sleep stages, circadian biology, and memory consolidation' },
        { icon: Sun, title: 'Circadian Science', desc: 'Grounded in published studies on light exposure, melatonin regulation, and body-clock optimization' },
        { icon: Bed, title: 'Sleep Disorders', desc: 'Informed by clinical research on insomnia, sleep deprivation, and behavioral sleep medicine' },
        { icon: Heart, title: 'Lifestyle Protocols', desc: 'Synthesizes evidence from nutrition science, exercise physiology, and stress management literature' },
      ];

  const founderContent = language === 'pt'
    ? {
        label: 'HISTÓRIA DO FUNDADOR',
        headline: 'Por que eu criei o GoZzzz',
        paragraphs: [
          'Por quase 10 anos, eu mal conseguia dormir.\nTentei remédios, melatonina, meditação.\nNada funcionou de verdade.',
          'Então passei mais 10 anos estudando a ciência do sono — pesquisa por pesquisa, estudo por estudo. Walker, Huberman, Czeisler, Breus — mergulhei fundo em cada descoberta publicada.',
          'O GoZzzz é o programa que eu gostaria\nde ter encontrado no início dessa jornada.',
        ],
        signature: 'José Nilton, Fundador do GoZzzz',
        result: 'Hoje durmo 7-8 horas praticamente todas as noites.\nE você também pode.',
      }
    : {
        label: "FOUNDER'S STORY",
        headline: 'Why I Created GoZzzz',
        paragraphs: [
          'For almost 10 years, I could barely sleep.\nI tried medication, melatonin, meditation.\nNothing truly worked.',
          'Then I spent another 10 years studying the science of sleep — research by research, study by study. Walker, Huberman, Czeisler, Breus — I dove deep into every published finding.',
          'GoZzzz is the program I wish I had found\nat the beginning of that journey.',
        ],
        signature: 'José Nilton, Founder of GoZzzz',
        result: 'Today I sleep 7–8 hours on virtually every night.\nAnd you can too.',
      };

  const dynamicStyles = useMemo(() => {
    const contentMax = 1100;
    const pad = 48;
    const usable = Math.min(windowWidth - pad, contentMax);

    return {
      problemItemWidth: isDesktop
        ? (usable - 32) / 3
        : isTablet
          ? (usable - 16) / 2
          : windowWidth - pad,
      stepCardWidth: isDesktop
        ? (usable - 40) / 3
        : isTablet
          ? (usable - 20) / 2
          : windowWidth - pad,
      expertCardWidth: isDesktop
        ? (usable - 60) / 4
        : isTablet
          ? (usable - 40) / 3
          : windowWidth - pad,
    };
  }, [windowWidth, isDesktop, isTablet]);

  return (
    <>
      <Head>
        <title>{t('web.meta.home.title')}</title>
        <meta name="description" content={t('web.meta.home.description')} />
        <meta name="keywords" content="sono, insônia, dormir melhor, sono profundo, ciência do sono, programa de sono, higiene do sono" />
        <meta property="og:title" content={t('web.meta.home.title')} />
        <meta property="og:description" content={t('web.meta.home.description')} />
        <meta property="og:image" content={WEB_OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={WEB_ORIGIN} />
        <meta property="og:site_name" content={WEB_OG_SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('web.meta.home.title')} />
        <meta name="twitter:description" content={t('web.meta.home.description')} />
        <meta name="twitter:image" content={WEB_OG_IMAGE_URL} />
        <link rel="canonical" href={WEB_ORIGIN} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GoZzzz",
          "url": "https://gozzzz.app",
          "description": t('web.meta.home.description'),
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gozzzz.app/web/programa"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": t('web.meta.home.title'),
          "description": t('web.meta.home.description'),
          "provider": {
            "@type": "Organization",
            "name": "GoZzzz",
            "url": "https://gozzzz.app"
          },
          "numberOfCredits": "21"
        })}</script>
      </Head>
      <ScrollView
        style={styles.page}
        showsVerticalScrollIndicator={false}
        onScroll={onPageScroll}
        scrollEventThrottle={16}
      >
        <WebNav scrollY={scrollY} />

      <ChronotypePremiumWebFunnel scrollY={scrollY} />

      {/* PROBLEM */}
      <View style={styles.problemSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.problem.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.problem.title')}</Text>
          <View style={styles.problemGrid}>
            {[
              t('web.problem.item1'),
              t('web.problem.item2'),
              t('web.problem.item3'),
              t('web.problem.item4'),
              t('web.problem.item5'),
              t('web.problem.item6'),
            ].map((item, i) => (
              <View key={i} style={[styles.problemItem, { width: dynamicStyles.problemItemWidth }]}>
                <Text style={styles.problemDot}>✕</Text>
                <Text style={styles.problemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* SOLUTION */}
      <LinearGradient colors={['#07070f', '#0d0d16']} style={styles.solutionSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.solution.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.solution.title')}</Text>
          <Text style={styles.sectionDesc}>{t('web.solution.desc')}</Text>

          <View style={styles.stepsGrid}>
            {steps.map((step) => (
              <View key={step.num} style={[styles.stepCard, { width: dynamicStyles.stepCardWidth }]}>
                <View style={[styles.stepIcon, { backgroundColor: step.bg }]}>
                  <step.icon size={28} color={step.color} />
                </View>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{language === 'pt' ? 'Passo' : 'Step'} {step.num}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
                <View style={styles.stepResourcesRow}>
                  {step.hasAudio && (
                    <View style={styles.stepResourceBadge}>
                      <Headphones size={11} color="#10b981" />
                      <Text style={styles.stepResourceText}>Audio</Text>
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  style={styles.stepLink}
                  onPress={() => router.push('/web/programa')}
                >
                  <Text style={styles.stepLinkText}>{language === 'pt' ? 'Ver Mais' : 'View More'}</Text>
                  <ArrowRight size={14} color="#d4a96a" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/web/programa')}>
            <BookOpen size={18} color="#07070f" />
            <Text style={styles.viewAllBtnText}>{t('web.solution.viewAll')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* SCIENCE METHODOLOGY */}
      <View style={styles.expertsSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{language === 'pt' ? 'NOSSA METODOLOGIA' : 'OUR METHODOLOGY'}</Text>
          <Text style={styles.sectionTitle}>{language === 'pt' ? 'Baseado em Ciência Publicada' : 'Built on Published Science'}</Text>
          <Text style={styles.sectionDesc}>{t('about.credibilityLine')}</Text>
          <View style={styles.expertsGrid}>
            {sciencePillars.map((p, i) => (
              <View key={i} style={[styles.expertCard, { width: dynamicStyles.expertCardWidth }]}>
                <View style={styles.expertAvatar}>
                  <p.icon size={24} color="#fbbf24" />
                </View>
                <Text style={styles.expertName}>{p.title}</Text>
                <Text style={styles.expertRole}>{p.desc}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/web/sobre')}>
            <BookOpen size={18} color="#07070f" />
            <Text style={styles.viewAllBtnText}>{language === 'pt' ? 'Sobre Nossa Metodologia' : 'About Our Methodology'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TESTIMONIALS */}
      <LinearGradient colors={['#0a0a12', '#0f0f1a']} style={styles.testimonialsSection}>
        <View style={styles.container}>
          <Text style={styles.testimonialsSectionLabel}>{t('web.testimonials.label')}</Text>
          <Text style={styles.testimonialsSectionTitle}>{t('web.testimonials.title')}</Text>
          <View style={[styles.testimonialsGrid, !isDesktop && !isTablet && { flexDirection: 'column' as const }]}>
            {testimonials.map((item, i) => (
              <View key={i} style={styles.testimonialCard}>
                <Text style={styles.testimonialBigQuote}>&quot;</Text>
                <Text style={styles.testimonialText}>{item.text}</Text>
                <View style={styles.testimonialDivider} />
                <View style={styles.testimonialFooter}>
                  <View style={styles.testimonialAuthorBlock}>
                    <View style={styles.testimonialAvatar}>
                      <Text style={styles.testimonialAvatarText}>{item.name[0]}</Text>
                    </View>
                    <View>
                      <Text style={styles.testimonialName}>{item.name}</Text>
                      <Text style={styles.testimonialRole}>{item.role}</Text>
                    </View>
                  </View>
                  <View style={styles.testimonialResultBadge}>
                    <Text style={styles.testimonialResultText}>{item.result}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* PRICING */}
      <View style={styles.pricingSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.pricing.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.pricing.title')}</Text>

          <View style={styles.pricingGrid}>
            <View style={[styles.pricingCard, styles.pricingCardFeatured]}>
              <View style={styles.pricingBadge}>
                <Crown size={12} color="#ffffff" />
                <Text style={styles.pricingBadgeText}>{language === 'pt' ? 'ACESSO VITALÍCIO' : 'LIFETIME ACCESS'}</Text>
              </View>
              <Text style={[styles.pricingPlanName, { color: '#ffffff' }]}>{language === 'pt' ? 'Acesso Completo' : 'Complete Access'}</Text>
              <View style={styles.pricingAmount}>
                <Text style={[styles.pricingCurrency, { color: GOLD }]}>{t('web.pricing.annual.currency')}</Text>
                <Text style={[styles.pricingPrice, { color: '#ffffff' }]}>{t('web.pricing.annual.amount')}{t('web.pricing.annual.cents')}</Text>
              </View>
              <Text style={[styles.pricingPeriod, { color: 'rgba(255,255,255,0.65)' }]}>{language === 'pt' ? 'pagamento único' : 'one-time payment'}</Text>
              <TouchableOpacity
                style={[
                  styles.pricingFilledBtn,
                  hoveredPricingBtn === 1 && styles.pricingFilledBtnHovered,
                ]}
                onPress={() => router.push('/web/assinar')}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredPricingBtn(1),
                  onMouseLeave: () => setHoveredPricingBtn(null),
                } : {})}
              >
                <Text style={styles.pricingFilledBtnText}>
                  {t('web.hero.startNow')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pricingFeatures}>
            {[
              t('web.pricing.feature1'),
              t('web.pricing.feature2'),
              t('web.pricing.feature3'),
              t('web.pricing.feature5'),
            ].map((f, i) => (
              <View key={i} style={styles.pricingFeatureItem}>
                <View style={styles.pricingFeatureCheck}>
                  <Check size={14} color="#10b981" />
                </View>
                <Text style={styles.pricingFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* DISCLAIMER */}
      <View style={styles.disclaimerSection}>
        <View style={styles.container}>
          <View style={styles.disclaimerBox}>
            <Shield size={20} color="#64748b" />
            <Text style={styles.disclaimerTitle}>{t('web.disclaimer.title')}</Text>
            <Text style={styles.disclaimerText}>{t('web.disclaimer.text')}</Text>
          </View>
        </View>
      </View>

      {/* FINAL CTA */}
      <View style={styles.ctaSection}>
        {isWeb && <View style={styles.ctaRadialGlow} />}
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.ctaTitle}>{t('web.cta.title')}</Text>
            <Text style={styles.ctaSubtitle}>{t('web.cta.subtitle')}</Text>
            <TouchableOpacity
              style={[styles.ctaBtn, hoveredCtaBtn && styles.ctaBtnHovered]}
              onPress={() => router.push('/web/assinar')}
              {...(isWeb ? {
                onMouseEnter: () => setHoveredCtaBtn(true),
                onMouseLeave: () => setHoveredCtaBtn(false),
              } : {})}
            >
              <Calendar size={20} color="#1e293b" />
              <Text style={styles.ctaBtnText}>{t('web.cta.btn')}</Text>
              <ArrowRight size={20} color="#1e293b" />
            </TouchableOpacity>
            <View style={styles.securityBadgesRow}>
              <Lock size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>{t('payment.ssl')}</Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <Shield size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>{t('payment.pciDss')}</Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <BadgeCheck size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>
                {t('payment.secureCheckout')}
              </Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <Heart size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>
                {language === 'pt' ? 'Garantia de 7 Dias' : '7-Day Satisfaction Guarantee'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* FOUNDER MOMENT */}
      <View style={styles.founderSection}>
        <View style={styles.container}>
          <View style={styles.founderCard}>
            <Text style={styles.founderLabel}>{founderContent.label}</Text>
            <Text style={styles.founderHeadline}>{founderContent.headline}</Text>

            <View style={styles.founderDividerTop} />

            <View style={styles.founderBody}>
              {founderContent.paragraphs.map((para, i) => (
                <Text key={i} style={styles.founderParagraph}>{para}</Text>
              ))}
            </View>

            <View style={styles.founderSignatureRow}>
              <View style={styles.founderAvatarCircle}>
                <Text style={styles.founderAvatarInitial}>J</Text>
              </View>
              <View style={styles.founderSignatureBlock}>
                <Text style={styles.founderSignature}>{founderContent.signature}</Text>
              </View>
            </View>

            <View style={styles.founderResultBox}>
              <Text style={styles.founderResultText}>{founderContent.result}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <Text style={styles.footerBrandText}>GoZzzz</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => router.push('/web/programa')}>
              <Text style={styles.footerLink}>{t('web.nav.program')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/coach')}>
              <Text style={styles.footerLink}>{t('web.nav.coach')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sobre')}>
              <Text style={styles.footerLink}>{t('web.nav.about')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/assinar')}>
              <Text style={styles.footerLink}>{t('web.nav.subscribe')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerLegalLinks}>
            <TouchableOpacity onPress={() => router.push(language === 'pt' ? '/privacy' : '/privacy-en')}>
              <Text style={styles.footerLegalLink}>{language === 'pt' ? 'Privacidade' : 'Privacy'}</Text>
            </TouchableOpacity>
            <Text style={styles.footerLegalSep}>·</Text>
            <TouchableOpacity onPress={() => router.push(language === 'pt' ? '/terms' : '/terms-en')}>
              <Text style={styles.footerLegalLink}>{language === 'pt' ? 'Termos' : 'Terms'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerCopy}>
            {t('web.footer.copyright')}
          </Text>
        </View>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },

  nav: {
    position: isWeb ? ('fixed' as any) : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    transition: isWeb ? 'background-color 0.4s ease, box-shadow 0.4s ease' : undefined,
  } as any,
  navScrolled: {
    backgroundColor: 'rgba(15,23,42,0.96)',
    boxShadow: isWeb ? '0 2px 20px rgba(0,0,0,0.3)' : undefined,
    backdropFilter: isWeb ? 'blur(12px)' : undefined,
  } as any,
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  navLink: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  navCta: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transition: isWeb ? 'transform 0.3s ease, opacity 0.3s ease' : undefined,
  } as any,
  navCtaText: { fontSize: 14, fontWeight: '700', color: '#1e293b' },

  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },

  problemSection: { paddingVertical: 80, backgroundColor: '#0d0d16' },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d4a96a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: isWeb ? 48 : 36,
  },
  sectionDesc: {
    fontSize: 17,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 680,
    alignSelf: 'center',
    marginBottom: 48,
  },
  problemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 40,
    justifyContent: 'center',
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#12121e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    transition: isWeb ? 'box-shadow 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  problemDot: { fontSize: 16, color: '#ef4444', fontWeight: '700' },
  problemText: { fontSize: 15, color: '#8892a4', lineHeight: 22, flex: 1 },

  solutionSection: { paddingVertical: 80 },
  stepsGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  stepCard: {
    backgroundColor: '#12121e',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  stepBadgeText: { fontSize: 12, fontWeight: '700', color: '#d4a96a' },
  stepTitle: { fontSize: 20, fontWeight: '700', color: '#e8d5b7', marginBottom: 10 },
  stepDesc: { fontSize: 15, color: '#8892a4', lineHeight: 22, marginBottom: 20 },
  stepResourcesRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  stepResourceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  stepResourceText: { fontSize: 12, fontWeight: '600', color: '#8892a4' },
  stepLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stepLinkText: { fontSize: 14, fontWeight: '600', color: '#d4a96a' },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#d4a96a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 40,
    transition: isWeb ? 'transform 0.3s ease' : undefined,
  } as any,
  viewAllBtnText: { fontSize: 16, fontWeight: '700', color: '#07070f' },

  expertsSection: { paddingVertical: 80, backgroundColor: '#0d0d16' },
  expertsGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  expertCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
    borderTopWidth: 3,
    borderTopColor: '#d4a96a',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  expertAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(212,169,106,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  expertName: { fontSize: 16, fontWeight: '700', color: '#e8d5b7', textAlign: 'center', marginBottom: 6 },
  expertRole: { fontSize: 13, color: '#8892a4', textAlign: 'center', lineHeight: 18 },

  testimonialsSection: { paddingVertical: 88 },
  testimonialsSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  testimonialsSectionTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: isWeb ? 50 : 36,
  },
  testimonialsGrid: {
    flexDirection: 'row',
    gap: 24,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 36,
    borderWidth: 1,
    borderColor: `rgba(212,169,106,0.18)`,
    transition: isWeb ? 'border-color 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  testimonialBigQuote: {
    fontSize: 80,
    color: GOLD,
    lineHeight: 60,
    fontWeight: '800',
    opacity: 0.45,
    marginBottom: 8,
  },
  testimonialText: {
    fontSize: isWeb ? 18 : 16,
    color: '#c8b89a',
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: 28,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  testimonialDivider: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.2)',
    marginBottom: 20,
  },
  testimonialFooter: {
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: isWeb ? 'center' : 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  } as any,
  testimonialAuthorBlock: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialAvatarText: { fontSize: 18, fontWeight: '800', color: '#07070f' },
  testimonialName: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  testimonialRole: { fontSize: 13, color: '#8892a4' },
  testimonialResultBadge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.28)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  testimonialResultText: { fontSize: 12, color: GOLD_LIGHT, fontWeight: '600' },

  pricingSection: { paddingVertical: 80 },
  pricingGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
  } as any,
  pricingCard: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 32,
    width: isWeb ? 400 : '100%',
    maxWidth: 440,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  pricingCardFeatured: {
    backgroundColor: '#0f172a',
    borderColor: GOLD,
    boxShadow: isWeb ? `0 8px 32px rgba(212,169,106,0.18)` : undefined,
    transform: [{ scale: isWeb ? 1.05 : 1 }],
  } as any,
  pricingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: GOLD,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  pricingBadgeText: { fontSize: 12, fontWeight: '700', color: '#07070f' },
  pricingPlanName: { fontSize: 18, fontWeight: '700', color: '#e8d5b7', marginBottom: 12 },
  pricingAmount: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4 },
  pricingCurrency: { fontSize: 20, fontWeight: '700', color: '#d4a96a', marginBottom: 6 },
  pricingPrice: { fontSize: 56, fontWeight: '800', color: '#e8d5b7', lineHeight: 60 },
  pricingCents: { fontSize: 24, fontWeight: '700', color: '#d4a96a', marginBottom: 8 },
  pricingPeriod: { fontSize: 14, color: '#8892a4', marginBottom: 20, textAlign: 'center' },
  pricingSavings: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  pricingSavingsText: { fontSize: 13, fontWeight: '700', color: '#d4a96a' },

  pricingGhostBtn: {
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    transition: isWeb ? 'background-color 0.3s ease' : undefined,
  } as any,
  pricingGhostBtnHovered: {
    backgroundColor: GOLD,
  },
  pricingGhostBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: GOLD,
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  pricingGhostBtnTextHovered: {
    color: '#07070f',
  },
  pricingFilledBtn: {
    backgroundColor: GOLD,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    transition: isWeb ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  pricingFilledBtnHovered: {
    opacity: 0.88,
    transform: [{ scale: 1.02 }],
  },
  pricingFilledBtnText: { fontSize: 15, fontWeight: '700', color: '#07070f' },

  pricingFeatures: { marginTop: 40, gap: 12, maxWidth: 400, alignSelf: 'center', width: '100%' },
  pricingFeatureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pricingFeatureCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingFeatureText: { fontSize: 15, color: '#8892a4' },

  disclaimerSection: { paddingVertical: 32, backgroundColor: '#07070f' },
  disclaimerBox: {
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#12121e',
    alignItems: 'center',
    gap: 8,
  },
  disclaimerTitle: { fontSize: 13, fontWeight: '700', color: '#4a5568', textTransform: 'uppercase', letterSpacing: 1 },
  disclaimerText: { fontSize: 12, color: '#8892a4', lineHeight: 20, textAlign: 'center', maxWidth: 700 },

  ctaSection: {
    paddingVertical: 100,
    alignItems: 'center',
    backgroundColor: '#07070f',
    overflow: 'hidden',
    position: 'relative',
  },
  ctaRadialGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 800,
    height: 800,
    borderRadius: 400,
    transform: [{ translateX: -400 }, { translateY: -400 }],
    backgroundImage: isWeb ? 'radial-gradient(ellipse at center, rgba(212,169,106,0.1) 0%, rgba(212,169,106,0.04) 40%, transparent 68%)' : undefined,
    pointerEvents: 'none',
  } as any,
  ctaTitle: {
    fontSize: isWeb ? 48 : 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: isWeb ? 58 : 42,
    marginBottom: 18,
    maxWidth: 680,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  ctaSubtitle: {
    fontSize: 18,
    color: '#8892a4',
    textAlign: 'center',
    marginBottom: 44,
    lineHeight: 28,
    maxWidth: 520,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingHorizontal: 44,
    paddingVertical: 20,
    borderRadius: 14,
    marginBottom: 28,
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  ctaBtnHovered: {
    transform: [{ scale: 1.04 }],
    boxShadow: isWeb ? `0 8px 32px rgba(212,169,106,0.4)` : undefined,
  } as any,
  ctaBtnText: { fontSize: 18, fontWeight: '800', color: '#07070f' },

  securityBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  securityBadgeText: { fontSize: 13, color: '#8892a4' },
  securityBadgeDot: { fontSize: 13, color: '#4a5568' },

  founderSection: {
    paddingVertical: 80,
    backgroundColor: '#080810',
  },
  founderCard: {
    backgroundColor: '#0e0e1c',
    borderRadius: 24,
    padding: isWeb ? 56 : 32,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.18)',
    maxWidth: 780,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    boxShadow: isWeb ? '0 4px 60px rgba(212,169,106,0.07)' : undefined,
  } as any,
  founderLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 18,
    textAlign: 'center',
  },
  founderHeadline: {
    fontSize: isWeb ? 36 : 26,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    lineHeight: isWeb ? 46 : 34,
    marginBottom: 32,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  founderDividerTop: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.15)',
    marginBottom: 36,
  },
  founderBody: {
    gap: 20,
    marginBottom: 40,
  },
  founderParagraph: {
    fontSize: isWeb ? 18 : 16,
    color: '#a8b3c4',
    lineHeight: isWeb ? 30 : 26,
    textAlign: 'center',
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
    fontStyle: 'italic',
  } as any,
  founderSignatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 36,
  },
  founderAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  founderAvatarInitial: {
    fontSize: 22,
    fontWeight: '800',
    color: '#07070f',
  },
  founderSignatureBlock: {
    gap: 2,
  },
  founderSignature: {
    fontSize: isWeb ? 22 : 18,
    color: GOLD,
    fontFamily: isWeb ? '"Brush Script MT", "Segoe Script", cursive' : undefined,
    letterSpacing: 0.5,
  } as any,
  founderResultBox: {
    backgroundColor: 'rgba(212,169,106,0.07)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  founderResultText: {
    fontSize: isWeb ? 18 : 16,
    color: '#e8d5b7',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: isWeb ? 28 : 24,
  },

  footer: { backgroundColor: '#07070f', paddingVertical: 44, borderTopWidth: 1, borderTopColor: 'rgba(212,169,106,0.12)' },
  footerInner: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24, alignItems: 'center', gap: 20 },
  footerBrandText: { fontSize: 22, fontWeight: '800', color: GOLD, letterSpacing: 1.5 },
  footerLinks: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  footerLink: {
    fontSize: 14,
    color: '#8892a4',
    fontWeight: '500',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  footerLegalLinks: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
  footerLegalLink: {
    fontSize: 13,
    color: '#4a5568',
    fontWeight: '500',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  footerLegalSep: { fontSize: 13, color: '#374151' },
  footerCopy: { fontSize: 12, color: '#374151', textAlign: 'center', letterSpacing: 0.3 },
});
