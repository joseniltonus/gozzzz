import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Moon,
  Brain,
  Sun,
  Coffee,
  ArrowRight,
  Check,
  Crown,
  BookOpen,
  Heart,
  Shield,
  Lock,
  BadgeCheck,
  Calendar,
  HelpCircle,
  Zap,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { STRIPE_ENABLED } from '@/lib/payment-links';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import ChronotypePremiumWebFunnel from '@/components/web/chronotype/ChronotypePremiumWebFunnel';

const isWeb = Platform.OS === 'web';

/** FAQ da home — factual, alinhado à oferta (sem depoimentos inventados). */
const HOME_WEB_FAQ_PT = [
  {
    q: 'O que são os 21 passos?',
    a: 'Uma sequência guiada: cada passo traduz princípios de ciência do sono em ações concretas — do entendimento do seu padrão à consolidação de hábitos.',
  },
  {
    q: 'Posso experimentar antes de assinar?',
    a: 'Sim. As 3 primeiras lições são gratuitas para você sentir o ritmo, a linguagem e a profundidade do método.',
  },
  {
    q: 'O que está incluído no acesso completo?',
    a: 'Acesso a todas as 21 lições na web e no app, atualizações de conteúdo do programa e orientações práticas ao longo do percurso.',
  },
  {
    q: 'Como funciona a garantia de satisfação?',
    a: 'Você tem 7 dias para solicitar reembolso integral se o produto não atender às suas expectativas, conforme nossa política e o Código de Defesa do Consumidor.',
  },
  {
    q: 'Isso substitui consulta médica ou tratamento?',
    a: 'Não. O programa é educativo e de hábitos; não faz diagnóstico nem prescreve medicamentos. Em dúvidas de saúde, procure um profissional habilitado.',
  },
  {
    q: 'O que é a personalização por cronótipo?',
    a: 'Após um quiz rápido, o conteúdo pode destacar orientações mais compatíveis com o seu perfil de sono (ex.: matinal vs. noturno), sem substituir avaliação clínica.',
  },
  {
    q: 'Como funciona o pagamento e o acesso?',
    a: STRIPE_ENABLED
      ? 'Na página de compra você pode escolher checkout com cartão (Kiwify) ou fluxo alternativo com Stripe, conforme as opções exibidas no momento. O acesso ao programa é liberado após a confirmação do pagamento.'
      : 'O checkout é feito pela Kiwify, com cartão de crédito, Pix e boleto quando disponíveis, e parcelamento em até 6x conforme a página de compra. O acesso às lições é liberado após a confirmação do pagamento.',
  },
] as const;

const HOME_WEB_FAQ_EN = [
  {
    q: 'What are the 21 steps?',
    a: 'A guided sequence: each step turns sleep-science principles into concrete actions — from understanding your pattern to consolidating habits.',
  },
  {
    q: 'Can I try before I pay?',
    a: 'Yes. The first 3 lessons are free so you can feel the pace, tone, and depth of the method.',
  },
  {
    q: 'What is included in full access?',
    a: 'Access to all 21 lessons on web and app, program content updates, and practical guidance along the way.',
  },
  {
    q: 'How does the satisfaction guarantee work?',
    a: 'You have 7 days to request a full refund if the product does not meet your expectations, per our policy and applicable consumer law.',
  },
  {
    q: 'Does this replace medical care or treatment?',
    a: 'No. The program is educational and habit-focused; it does not diagnose or prescribe. For health concerns, see a licensed professional.',
  },
  {
    q: 'What is chronotype personalization?',
    a: 'After a short quiz, content can highlight guidance that fits your sleep profile (e.g., morning vs. evening tendency) — not a clinical assessment.',
  },
  {
    q: 'How do payment and access work?',
    a: STRIPE_ENABLED
      ? 'At checkout you may see card payment via our sales partner or an alternate Stripe flow, depending on what is offered on the purchase page. Program access is granted after payment confirmation.'
      : 'Checkout is handled by our sales partner (Kiwify), with card and local payment options as shown on the purchase page. Lesson access is granted after payment confirmation.',
  },
] as const;

const GOLD = '#d4a96a';
const GOLD_LIGHT = '#e8c99a';

type WebNavProps = {
  onFaqPress?: () => void;
};

function WebNav({ onFaqPress }: WebNavProps) {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { width } = useWindowDimensions();
  const navPadH = width < 400 ? 16 : 24;
  const [scrolled, setScrolled] = useState(false);
  const showLinks = width >= 768;

  useEffect(() => {
    if (!isWeb) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <View style={[styles.nav, scrolled && styles.navScrolled]}>
      <View style={[styles.navInner, { paddingHorizontal: navPadH }]}>
        <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <Moon size={24} color={GOLD} strokeWidth={2} />
          </div>
          <Text style={styles.navBrandText}>GoZzzz</Text>
        </TouchableOpacity>

        {showLinks ? (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push('/web/programa')}>
              <Text style={styles.navLink}>{t('web.nav.program')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/coach')}>
              <Text style={styles.navLink}>{t('web.nav.coach')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/sono')}>
              <Text style={styles.navLink}>Sono+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sobre')}>
              <Text style={styles.navLink}>{t('web.nav.about')}</Text>
            </TouchableOpacity>
            {onFaqPress ? (
              <TouchableOpacity onPress={onFaqPress} style={styles.navGhostLink}>
                <HelpCircle size={16} color={GOLD} />
                <Text style={styles.navGhostLinkText}>{language === 'pt' ? 'Dúvidas' : 'FAQ'}</Text>
              </TouchableOpacity>
            ) : null}
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

export default function WebLandingPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { profile } = useUserProfile();
  const chronotype = useEffectiveChronotype();
  const [hoveredPricingBtn, setHoveredPricingBtn] = useState<number | null>(null);
  const [hoveredCtaBtn, setHoveredCtaBtn] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const typographyWide = windowWidth >= 768;
  const pricingWide = windowWidth >= 720;
  const founderLayoutWide = windowWidth >= 640;
  const contentPadH = windowWidth < 400 ? 16 : 24;

  const steps = language === 'pt'
    ? [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Entenda Sua Biologia', desc: 'Aprenda como o ritmo circadiano funciona e por que o sono importa' },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Domine a Exposição à Luz', desc: 'Controle sua exposição à luz para otimizar seu relógio biológico' },
        { num: 3, icon: Coffee, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Otimize Seus Horários', desc: 'Aprenda quando comer, exercitar e descansar para dormir melhor' },
      ]
    : [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Understand Your Biology', desc: 'Learn how your circadian rhythm works and why sleep matters' },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Master Light Exposure', desc: 'Control your light exposure to optimize your body clock' },
        { num: 3, icon: Coffee, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Optimize Timing', desc: 'Learn when to eat, exercise, and rest for better sleep' },
      ];

  const sciencePillars = language === 'pt'
    ? [
        { icon: Brain, title: 'Arquitetura do Sono', desc: 'Baseado em pesquisas revisadas por pares sobre estágios do sono, biologia circadiana e consolidação da memória' },
        { icon: Sun, title: 'Ciência Circadiana', desc: 'Fundamentado em estudos publicados sobre exposição à luz, regulação da melatonina e otimização do relógio biológico' },
        { icon: Moon, title: 'Distúrbios do Sono', desc: 'Informado por pesquisas clínicas sobre insônia, privação de sono e medicina comportamental do sono' },
        { icon: Heart, title: 'Protocolos de Estilo de Vida', desc: 'Sintetiza evidências de ciência nutricional, fisiologia do exercício e literatura de gerenciamento do estresse' },
      ]
    : [
        { icon: Brain, title: 'Sleep Architecture', desc: 'Built on peer-reviewed research covering sleep stages, circadian biology, and memory consolidation' },
        { icon: Sun, title: 'Circadian Science', desc: 'Grounded in published studies on light exposure, melatonin regulation, and body-clock optimization' },
        { icon: Moon, title: 'Sleep Disorders', desc: 'Informed by clinical research on insomnia, sleep deprivation, and behavioral sleep medicine' },
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
        ctaPrimary: 'Começar com acesso completo',
        ctaSecondary: 'Ver as 3 lições gratuitas',
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
        ctaPrimary: 'Get full access',
        ctaSecondary: 'See the 3 free lessons',
      };

  const dynamicStyles = useMemo(() => {
    const contentMax = 1100;
    const horizontalPad = windowWidth < 400 ? 32 : 48;
    const usable = Math.min(windowWidth - horizontalPad, contentMax);

    return {
      problemItemWidth: isDesktop
        ? (usable - 32) / 3
        : isTablet
          ? (usable - 16) / 2
          : windowWidth - horizontalPad,
      stepCardWidth: isDesktop
        ? (usable - 40) / 3
        : isTablet
          ? (usable - 20) / 2
          : windowWidth - horizontalPad,
      expertCardWidth: isDesktop
        ? (usable - 60) / 4
        : isTablet
          ? (usable - 40) / 3
          : windowWidth - horizontalPad,
    };
  }, [windowWidth, isDesktop, isTablet]);

  const homeStructuredData = useMemo(() => {
    const faqItems = language === 'pt' ? HOME_WEB_FAQ_PT : HOME_WEB_FAQ_EN;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'GoZzzz',
          url: 'https://gozzzz.app',
          description: t('web.meta.home.description', 'pt'),
          inLanguage: 'pt-BR',
        },
        {
          '@type': 'Organization',
          name: 'GoZzzz',
          legalName: 'MORFEU SAÚDE E TECNOLOGIA LTDA',
          url: 'https://gozzzz.app',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'GoZzzz', item: 'https://gozzzz.app/web' },
            { '@type': 'ListItem', position: 2, name: 'Programa 21 Passos', item: 'https://gozzzz.app/sono' },
          ],
        },
        {
          '@type': 'Course',
          name: t('web.meta.home.title', 'pt'),
          description: t('web.meta.home.description', 'pt'),
          provider: {
            '@type': 'Organization',
            name: 'GoZzzz',
            url: 'https://gozzzz.app',
          },
          numberOfCredits: '21',
        },
        {
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    };
  }, [language, t]);

  const homeFaqItems = language === 'pt' ? HOME_WEB_FAQ_PT : HOME_WEB_FAQ_EN;

  const scrollToFaq = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.getElementById('web-landing-faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const [scrollContentH, setScrollContentH] = useState(0);
  const [scrollViewportH, setScrollViewportH] = useState(0);
  const nearBottom = scrollContentH > 0 && scrollY + scrollViewportH >= scrollContentH - 160;
  const showStickyBar = isWeb && scrollY > 480 && scrollContentH > 400 && !nearBottom;

  const journeySteps =
    language === 'pt'
      ? [
          { Icon: Zap, title: 'Quiz do cronótipo', desc: 'Grátis · ~2 min' },
          { Icon: BookOpen, title: '21 passos guiados', desc: 'Web e app' },
          { Icon: Moon, title: 'Hábitos sustentáveis', desc: 'Ciência na prática' },
        ]
      : [
          { Icon: Zap, title: 'Chronotype quiz', desc: 'Free · ~2 min' },
          { Icon: BookOpen, title: '21 guided steps', desc: 'Web + app' },
          { Icon: Moon, title: 'Sustainable habits', desc: 'Science applied' },
        ];

  return (
    <>
      <Head>
        {/* Snapshot SSR é canônico em pt-BR — a rota gozzzz.app/web é
            pt-BR. O `t(key)` depende do state do LanguageProvider, que no SSR
            (Node, sem navigator) cai em fallback. Forçando `'pt'` aqui evita
            que o Google e bots de social previewers leiam o site em inglês. */}
        <title>{t('web.meta.home.title', 'pt')}</title>
        <meta name="description" content={t('web.meta.home.description', 'pt')} />
        <meta
          name="keywords"
          content="cronótipo, teste de cronótipo, sono, insônia, dormir melhor, neurociência do sono, programa de sono, ritmo circadiano, GoZzzz"
        />
        <meta property="og:title" content={t('web.meta.home.ogTitle', 'pt')} />
        <meta property="og:description" content={t('web.meta.home.ogDesc', 'pt')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozzzz.app/web" />
        <meta property="og:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta property="og:image:alt" content="GoZzzz — Programa de Sono em 21 Passos baseado em neurociência" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('web.meta.home.twitterTitle', 'pt')} />
        <meta name="twitter:description" content={t('web.meta.home.twitterDesc', 'pt')} />
        <meta name="twitter:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <link rel="canonical" href="https://gozzzz.app/web" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <script type="application/ld+json">{JSON.stringify(homeStructuredData)}</script>
      </Head>
      <ScrollView
        style={styles.page}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
        contentContainerStyle={showStickyBar ? { paddingBottom: 92 } : undefined}
        onContentSizeChange={(_w, h) => setScrollContentH(h)}
        onLayout={(e) => setScrollViewportH(e.nativeEvent.layout.height)}
      >
        <WebNav onFaqPress={scrollToFaq} />

        {chronotype &&
          (() => {
            const badges: Record<string, { pt: string; en: string }> = {
              dolphin: { pt: 'Plano 🐬 Golfinho', en: '🐬 Dolphin Plan' },
              lion: { pt: 'Plano 🦁 Leão', en: '🦁 Lion Plan' },
              bear: { pt: 'Plano 🐻 Urso', en: '🐻 Bear Plan' },
              wolf: { pt: 'Plano 🐺 Lobo', en: '🐺 Wolf Plan' },
            };
            const label = badges[chronotype]?.[language] ?? null;
            if (!label) return null;
            return (
              <View style={styles.chronotypeBanner}>
                <Text style={styles.chronotypeBadgeText}>{label}</Text>
              </View>
            );
          })()}

        <ChronotypePremiumWebFunnel scrollY={scrollY} />

      {/* PROBLEM */}
      <View style={styles.problemSection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <Text style={styles.sectionLabel}>{t('web.problem.label')}</Text>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide]}>{t('web.problem.title')}</Text>
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

      {/* JOURNEY */}
      <View style={styles.journeySection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <Text style={styles.sectionLabel}>{language === 'pt' ? 'SIMPLES ASSIM' : 'HOW IT WORKS'}</Text>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide, styles.journeyHeadline]}>
            {language === 'pt' ? 'Do quiz à rotina de sono' : 'From quiz to sleep routine'}
          </Text>
          <Text style={[styles.sectionDesc, styles.journeySub]}>
            {language === 'pt'
              ? 'Sem complicação: você entende seu perfil, percorre o programa no seu ritmo e transforma o que aprendeu em hábitos.'
              : 'No fluff: understand your profile, move through the program at your pace, and turn insights into habits.'}
          </Text>
          <View style={[styles.journeyRow, typographyWide && styles.journeyRowWide]}>
            {journeySteps.map((step, i) => (
              <View key={i} style={[styles.journeyCell, typographyWide && styles.journeyCellWide]}>
                <View style={styles.journeyIconWrap}>
                  <step.Icon size={22} color={GOLD} strokeWidth={2} />
                </View>
                <Text style={styles.journeyStepTitle}>{step.title}</Text>
                <Text style={styles.journeyStepDesc}>{step.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* SOLUTION */}
      <LinearGradient colors={['#07070f', '#0d0d16']} style={styles.solutionSection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <Text style={styles.sectionLabel}>{t('web.solution.label')}</Text>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide]}>{t('web.solution.title')}</Text>
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
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <Text style={styles.sectionLabel}>{language === 'pt' ? 'NOSSA METODOLOGIA' : 'OUR METHODOLOGY'}</Text>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide]}>{language === 'pt' ? 'Baseado em Ciência Publicada' : 'Built on Published Science'}</Text>
          <Text style={styles.sectionDesc}>{t('about.credibilityLine')}</Text>
          <View style={styles.expertsGrid}>
            {sciencePillars.map((p, i) => (
              <View key={i} style={[styles.expertCard, { width: dynamicStyles.expertCardWidth }]}>
                <View style={styles.expertAvatar}>
                  <p.icon size={24} color={GOLD} />
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

      {/* FOUNDER */}
      <View style={styles.founderSection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <View style={[styles.founderCard, founderLayoutWide && styles.founderCardWide]}>
            <Text style={styles.founderLabel}>{founderContent.label}</Text>
            <Text style={[styles.founderHeadline, typographyWide && styles.founderHeadlineWide]}>
              {founderContent.headline}
            </Text>

            <View style={styles.founderDividerTop} />

            <View style={styles.founderBody}>
              {founderContent.paragraphs.map((para, i) => (
                <Text key={i} style={[styles.founderParagraph, typographyWide && styles.founderParagraphWide]}>
                  {para}
                </Text>
              ))}
            </View>

            <View style={styles.founderSignatureRow}>
              <View style={styles.founderAvatarCircle}>
                <Text style={styles.founderAvatarInitial}>J</Text>
              </View>
              <View style={styles.founderSignatureBlock}>
                <Text style={[styles.founderSignature, typographyWide && styles.founderSignatureWide]}>
                  {founderContent.signature}
                </Text>
              </View>
            </View>

            <View style={styles.founderResultBox}>
              <Text style={[styles.founderResultText, typographyWide && styles.founderResultTextWide]}>
                {founderContent.result}
              </Text>
            </View>

            <View style={styles.founderCtaColumn}>
              <TouchableOpacity style={styles.founderPrimaryBtn} onPress={() => router.push('/web/assinar')} activeOpacity={0.88}>
                <Crown size={18} color="#07070f" />
                <Text style={styles.founderPrimaryBtnText}>{founderContent.ctaPrimary}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.founderSecondaryTouchable}
                onPress={() => router.push('/web/programa')}
                activeOpacity={0.85}
              >
                <Text style={styles.founderSecondaryLink}>{founderContent.ctaSecondary}</Text>
                <ArrowRight size={14} color={GOLD} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* PRICING */}
      <View style={styles.pricingSection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <Text style={styles.sectionLabel}>{t('web.pricing.label')}</Text>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide]}>{t('web.pricing.title')}</Text>

          <View style={[styles.pricingGrid, pricingWide && styles.pricingGridWide]}>
            <View
              style={[
                styles.pricingCard,
                pricingWide && styles.pricingCardWide,
                styles.pricingCardFeatured,
                pricingWide && styles.pricingCardFeaturedWide,
              ]}
            >
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
                  {t('web.pricing.ctaSubscribe', language)}
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
                  <Check size={14} color={GOLD} />
                </View>
                <Text style={styles.pricingFeatureText}>{f}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.guaranteeHighlight, typographyWide && styles.guaranteeHighlightWide]}>
            <Heart size={22} color={GOLD} strokeWidth={2} />
            <View style={styles.guaranteeHighlightCol}>
              <Text style={styles.guaranteeHighlightKicker}>
                {language === 'pt' ? 'GARANTIA DE SATISFAÇÃO · 7 DIAS' : '7-DAY SATISFACTION GUARANTEE'}
              </Text>
              <Text style={styles.guaranteeHighlightBody}>
                {language === 'pt'
                  ? 'Se o programa não fizer sentido para você, solicite reembolso integral dentro do prazo — em linha com o CDC.'
                  : 'If the program is not a fit, request a full refund within the stated window — per our policy and consumer law.'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.guaranteeHighlightBtn, typographyWide && styles.guaranteeHighlightBtnWide]}
              onPress={() => router.push('/web/assinar')}
              activeOpacity={0.88}
            >
              <Text style={styles.guaranteeHighlightBtnText}>
                {language === 'pt' ? 'Começar com segurança' : 'Start risk-aware'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* DISCLAIMER */}
      <View style={styles.disclaimerSection}>
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <View style={styles.disclaimerBox}>
            <Shield size={20} color="#64748b" />
            <Text style={styles.disclaimerTitle}>{t('web.disclaimer.title')}</Text>
            <Text style={styles.disclaimerText}>{t('web.disclaimer.text')}</Text>
          </View>
        </View>
      </View>

      {/* FAQ */}
      <View
        nativeID="web-landing-faq"
        {...(isWeb ? ({ id: 'web-landing-faq' } as object) : {})}
        style={styles.faqSection}
      >
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <View style={styles.faqIntroRow}>
            <HelpCircle size={22} color={GOLD} strokeWidth={2} />
            <Text style={styles.sectionLabel}>
              {language === 'pt' ? 'PERGUNTAS FREQUENTES' : 'FAQ'}
            </Text>
          </View>
          <Text style={[styles.sectionTitle, typographyWide && styles.sectionTitleWide, styles.faqTitleCenter]}>
            {language === 'pt' ? 'Antes de você decidir' : 'Before you decide'}
          </Text>
          <Text style={[styles.sectionDesc, styles.faqSubtitleCenter]}>
            {language === 'pt'
              ? 'Respostas diretas sobre o programa, o teste e a compra — sem promessas milagrosas.'
              : 'Straight answers about the program, the trial, and purchase — no miracle claims.'}
          </Text>
          <View style={styles.faqList}>
            {homeFaqItems.map((item, i) => (
              <View key={i} style={styles.faqCard}>
                <Text style={styles.faqQuestion}>{item.q}</Text>
                <Text style={styles.faqAnswer}>{item.a}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* FINAL CTA */}
      <View style={styles.ctaSection}>
        {isWeb && <View style={styles.ctaRadialGlow} />}
        <View style={[styles.container, { paddingHorizontal: contentPadH }]}>
          <View style={{ alignItems: 'center' }}>
            <Text style={[styles.ctaTitle, typographyWide && styles.ctaTitleWide]}>{t('web.cta.title')}</Text>
            <Text style={styles.ctaSubtitle}>{t('web.cta.subtitle')}</Text>
            <TouchableOpacity
              style={[styles.ctaBtn, hoveredCtaBtn && styles.ctaBtnHovered]}
              onPress={() => router.push('/web/assinar')}
              {...(isWeb ? {
                onMouseEnter: () => setHoveredCtaBtn(true),
                onMouseLeave: () => setHoveredCtaBtn(false),
              } : {})}
            >
              <Calendar size={20} color="#07070f" />
              <Text style={styles.ctaBtnText}>{t('web.cta.btn')}</Text>
              <ArrowRight size={20} color="#07070f" />
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

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={[styles.footerInner, { paddingHorizontal: contentPadH }]}>
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
            <TouchableOpacity onPress={scrollToFaq}>
              <Text style={styles.footerLink}>{language === 'pt' ? 'Dúvidas frequentes' : 'FAQ'}</Text>
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
      {showStickyBar ? (
        <View style={styles.stickyCtaBar} pointerEvents="box-none">
          <View style={[styles.stickyCtaInner, { paddingHorizontal: contentPadH }]}>
            <TouchableOpacity style={styles.stickyCtaGhost} onPress={() => router.push('/web/programa')} activeOpacity={0.88}>
              <BookOpen size={17} color={GOLD} />
              <Text style={styles.stickyCtaGhostText} numberOfLines={1}>
                {language === 'pt' ? '3 lições grátis' : '3 free lessons'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stickyCtaPrimary} onPress={() => router.push('/web/assinar')} activeOpacity={0.9}>
              <Crown size={17} color="#07070f" />
              <Text style={styles.stickyCtaPrimaryText} numberOfLines={1}>
                {language === 'pt' ? 'Acesso completo' : 'Full access'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f', maxWidth: '100%', alignSelf: 'stretch' },

  nav: {
    position: isWeb ? ('fixed' as any) : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  } as any,
  navScrolled: {
    backgroundColor: 'rgba(7,7,15,0.96)',
    boxShadow: isWeb ? '0 2px 20px rgba(0,0,0,0.35)' : undefined,
    backdropFilter: isWeb ? 'blur(12px)' : undefined,
  } as any,
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 22, fontWeight: '800', color: '#ffffff', letterSpacing: 1 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  navLink: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  } as any,
  navCta: {
    backgroundColor: GOLD,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  } as any,
  navCtaText: { fontSize: 14, fontWeight: '700', color: '#07070f' },
  navGhostLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.4)',
  } as any,
  navGhostLinkText: { fontSize: 14, fontWeight: '700', color: GOLD },

  chronotypeBanner: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.32)',
  },
  chronotypeBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e8d5b7',
  },

  container: { maxWidth: 1100, alignSelf: 'center', width: '100%' },

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
    fontSize: 28,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  sectionTitleWide: { fontSize: 40, lineHeight: 48 },
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
  } as any,
  problemDot: { fontSize: 16, color: '#ef4444', fontWeight: '700' },
  problemText: { fontSize: 15, color: '#8892a4', lineHeight: 22, flex: 1 },

  journeySection: {
    paddingVertical: 64,
    backgroundColor: '#0d0d16',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  journeyHeadline: { marginBottom: 10 },
  journeySub: { marginBottom: 32 },
  journeyRow: {
    gap: 14,
    width: '100%',
    maxWidth: 960,
    alignSelf: 'center',
  },
  journeyRowWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  journeyCell: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    width: '100%',
  } as any,
  journeyCellWide: {
    flexGrow: 1,
    flexBasis: '28%',
    minWidth: 200,
    maxWidth: 300,
  } as any,
  journeyIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(212,169,106,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  journeyStepTitle: { fontSize: 16, fontWeight: '800', color: '#e8d5b7', marginBottom: 4 },
  journeyStepDesc: { fontSize: 13, color: '#8892a4', lineHeight: 18 },

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

  pricingSection: { paddingVertical: 80 },
  pricingGrid: {
    flexDirection: 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 40,
    flexWrap: 'wrap',
  } as any,
  pricingGridWide: {
    flexDirection: 'row',
    alignItems: 'center',
  } as any,
  pricingCard: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 440,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  } as any,
  pricingCardWide: {
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  } as any,
  pricingCardFeatured: {
    backgroundColor: '#12121e',
    borderColor: GOLD,
  } as any,
  pricingCardFeaturedWide: {
    boxShadow: isWeb ? `0 8px 32px rgba(212,169,106,0.18)` : undefined,
    transform: [{ scale: 1.05 }],
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
  } as any,
  pricingGhostBtnHovered: {
    backgroundColor: GOLD,
  },
  pricingGhostBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: GOLD,
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
    backgroundColor: 'rgba(212,169,106,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingFeatureText: { fontSize: 15, color: '#8892a4' },

  guaranteeHighlight: {
    marginTop: 36,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.28)',
    backgroundColor: 'rgba(212,169,106,0.06)',
    gap: 16,
    alignItems: 'center',
    flexDirection: 'column',
  } as any,
  guaranteeHighlightWide: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guaranteeHighlightCol: { flex: 1, minWidth: 220 },
  guaranteeHighlightKicker: {
    fontSize: 12,
    fontWeight: '800',
    color: GOLD,
    letterSpacing: 1.2,
  },
  guaranteeHighlightBody: { fontSize: 14, color: '#8892a4', lineHeight: 21, marginTop: 6 },
  guaranteeHighlightBtn: {
    backgroundColor: GOLD,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignSelf: 'stretch',
  } as any,
  guaranteeHighlightBtnWide: {
    alignSelf: 'center',
  },
  guaranteeHighlightBtnText: { color: '#07070f', fontWeight: '800', fontSize: 14, textAlign: 'center' },

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
    fontSize: 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 42,
    marginBottom: 18,
    maxWidth: 680,
  } as any,
  ctaTitleWide: {
    fontSize: 48,
    lineHeight: 58,
    fontFamily: 'Georgia, "Times New Roman", serif',
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
    backgroundColor: '#0d0d16',
  },
  founderCard: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderTopWidth: 3,
    borderTopColor: GOLD,
    maxWidth: 780,
    alignSelf: 'center',
    width: '100%',
  } as any,
  founderCardWide: { padding: 56 } as any,
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
    fontSize: 26,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 32,
  } as any,
  founderHeadlineWide: {
    fontSize: 36,
    lineHeight: 46,
    fontFamily: 'Georgia, "Times New Roman", serif',
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
    fontSize: 16,
    color: '#8892a4',
    lineHeight: 26,
    textAlign: 'center',
    fontStyle: 'italic',
  } as any,
  founderParagraphWide: {
    fontSize: 18,
    lineHeight: 30,
    fontFamily: 'Georgia, "Times New Roman", serif',
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
    fontSize: 18,
    color: GOLD,
    letterSpacing: 0.5,
  } as any,
  founderSignatureWide: {
    fontSize: 22,
    fontFamily: '"Brush Script MT", "Segoe Script", cursive',
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
    fontSize: 16,
    color: '#e8d5b7',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
  founderResultTextWide: { fontSize: 18, lineHeight: 28 },

  founderCtaColumn: {
    marginTop: 28,
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  founderPrimaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    width: '100%',
    maxWidth: 400,
  } as any,
  founderPrimaryBtnText: { fontSize: 16, fontWeight: '800', color: '#07070f' },
  founderSecondaryTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  founderSecondaryLink: { fontSize: 14, fontWeight: '600', color: '#8892a4' },

  faqSection: {
    paddingVertical: 72,
    backgroundColor: '#07070f',
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,169,106,0.1)',
  },
  faqIntroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
  },
  faqTitleCenter: { textAlign: 'center', alignSelf: 'center' },
  faqSubtitleCenter: { textAlign: 'center', marginBottom: 36, maxWidth: 560, alignSelf: 'center' },
  faqList: { maxWidth: 720, width: '100%', alignSelf: 'center', gap: 12 },
  faqCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  } as any,
  faqQuestion: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e8d5b7',
    marginBottom: 10,
    lineHeight: 22,
  },
  faqAnswer: { fontSize: 14, color: '#8892a4', lineHeight: 22 },

  footer: { backgroundColor: '#07070f', paddingVertical: 44, borderTopWidth: 1, borderTopColor: 'rgba(212,169,106,0.12)' },
  footerInner: { maxWidth: 1100, alignSelf: 'center', width: '100%', alignItems: 'center', gap: 20 },
  footerBrandText: { fontSize: 22, fontWeight: '800', color: GOLD, letterSpacing: 1.5 },
  footerLinks: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  footerLink: {
    fontSize: 14,
    color: '#8892a4',
    fontWeight: '500',
  } as any,
  footerLegalLinks: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
  footerLegalLink: {
    fontSize: 13,
    color: '#4a5568',
    fontWeight: '500',
  } as any,
  footerLegalSep: { fontSize: 13, color: '#374151' },
  footerCopy: { fontSize: 12, color: '#374151', textAlign: 'center', letterSpacing: 0.3 },

  stickyCtaBar: {
    ...(isWeb
      ? {
          position: 'fixed' as const,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 95,
          paddingTop: 10,
          paddingBottom: 16,
          backgroundColor: 'rgba(7,7,15,0.94)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(212,169,106,0.28)',
          backdropFilter: 'blur(14px)',
        }
      : {}),
  } as any,
  stickyCtaInner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyCtaGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.45)',
    flex: 1,
    maxWidth: 200,
    justifyContent: 'center',
  } as any,
  stickyCtaGhostText: { fontSize: 13, fontWeight: '700', color: GOLD, flexShrink: 1 },
  stickyCtaPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    backgroundColor: GOLD,
    flex: 1,
    maxWidth: 240,
    justifyContent: 'center',
  } as any,
  stickyCtaPrimaryText: { fontSize: 13, fontWeight: '800', color: '#07070f', flexShrink: 1 },
});
