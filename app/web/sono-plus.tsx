import { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Linking,
  useWindowDimensions,
} from 'react-native';
import Head from 'expo-router/head';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Check,
  CreditCard,
  Crown,
  MessageCircle,
  Moon,
  Lock,
  BadgeCheck,
  Shield,
  Sparkles,
  Sunrise,
  Zap,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { LESSONS_DATA } from '@/data/lessons';
import { supabase } from '@/lib/supabase';
import { KIWIFY_PARCELADO_URL, STRIPE_ENABLED } from '@/lib/payment-links';
import { buildSonoPlusSchemaGraph } from '@/lib/seo-sono-plus-schema';
const isWeb = Platform.OS === 'web';
const WHATSAPP = 'https://wa.me/5511982820759?text=SONO';

// Paleta dark/roxo — tela 1 landing page (Maio 2026).
// Mantido o nome `GOLD` como alias semântico de "accent primário" pra evitar
// renomear ~120 ocorrências de uma vez. Visualmente é roxo, não dourado.
const ACCENT = '#7c5ce8';                       // roxo primário (CTA, kicker)
const ACCENT_LIGHT = '#a5b4fc';                 // lavanda (ícones, highlights)
const ACCENT_DEEP = '#1e1b4b';                  // roxo profundo pro nav/hero
const ACCENT_DIM = 'rgba(124,92,232,0.14)';     // background de pílulas/badges
const GOLD = ACCENT;
const GOLD_DIM = ACCENT_DIM;
const BG = '#0a0a1a';                           // navy quase preto, leve azul/roxo
const BG_CARD = '#14122e';                      // card com pigmento roxo sutil
const TEXT_MAIN = '#e8e5df';
const TEXT_MUTED = '#94a3b8';
const NAV_H = 56;

interface PricingAnnual {
  price: number;
  label: string;
  equiv: string;
  note: string;
}
interface PricingData {
  currency: string;
  symbol: string;
  annual: PricingAnnual;
}
const DEFAULT_WEB_PRICING: Record<'pt' | 'en', PricingData> = {
  pt: {
    currency: 'BRL',
    symbol: 'R$',
    annual: { price: 147, label: 'R$ 147', equiv: 'acesso vitalício', note: 'pagamento único' },
  },
  en: {
    currency: 'USD',
    symbol: '$',
    annual: { price: 24.99, label: '$24.99', equiv: 'lifetime access', note: 'one-time payment' },
  },
};

/** FAQ estático — compartilhado entre JSON-LD e UI (evita drift SEO vs página). */
const SONO_PLUS_FAQ = [
  {
    question: 'O que são exatamente os 21 passos?',
    answer:
      'Uma sequência guiada: cada passo traduz princípios de ciência do sono em ações concretas para o dia seguinte — em blocos que cobrem entender o seu padrão, reconstruir hábitos e consolidar resultados.',
  },
  {
    question: 'Posso experimentar antes de assinar?',
    answer:
      'Sim. As 3 primeiras lições são gratuitas para você sentir o ritmo e a clareza do método.',
  },
  {
    question: 'O que é Sono+ em relação ao programa?',
    answer:
      'O programa cobre o percurso completo na app/web. Sono+ é a linha opcional de acompanhamento ao vivo — uma sessão de diagnóstico de 60 minutos com plano personalizado e relatório entregue em 72h.',
  },
  {
    question: 'Isso substitui acompanhamento médico?',
    answer:
      'Não. Conteúdo e consultoria comportamental são educativos — não fazem diagnóstico nem prescrevem tratamento médico.',
  },
] as const;

// ─── Quiz inline (mesma lógica do ChronotypeQuizModal, fora do componente
// para que arrays/funções não sejam recriados a cada render) ───────────────
type QuizChronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

const QUIZ_SCREENS: ReadonlyArray<{
  q: string;
  sub: string;
  multi: boolean;
  options: ReadonlyArray<{ id: string; emoji: string; label: string }>;
}> = [
  {
    q: 'O que rouba seu sono?',
    sub: 'Escolha o que mais te afeta',
    multi: false,
    options: [
      { id: 'mind', emoji: '🌀', label: 'Mente não para' },
      { id: 'cantfall', emoji: '🌙', label: 'Não consigo dormir' },
      { id: 'wakenight', emoji: '⚡', label: 'Acordo à noite' },
      { id: 'exhausted', emoji: '😮‍💨', label: 'Acordo exausto' },
    ],
  },
  {
    q: 'Sem alarme, que horas você acordaria?',
    sub: 'Seu ritmo natural de despertar',
    multi: false,
    options: [
      { id: 'before6', emoji: '🌅', label: 'Antes das 6h' },
      { id: '6to8', emoji: '☀️', label: '6h – 8h' },
      { id: '8to10', emoji: '🌤️', label: '8h – 10h' },
      { id: 'after10', emoji: '🌑', label: 'Depois das 10h' },
    ],
  },
  {
    q: 'Quando você tem mais energia?',
    sub: 'Seu pico natural de rendimento',
    multi: false,
    options: [
      { id: 'morning', emoji: '🏃', label: 'Cedo pela manhã' },
      { id: 'midday', emoji: '📈', label: 'Ao meio-dia' },
      { id: 'afternoon', emoji: '🌆', label: 'Final da tarde' },
      { id: 'night', emoji: '🦉', label: 'À noite' },
    ],
  },
  {
    q: 'O que atrapalha sua noite?',
    sub: 'Escolha até 2 opções',
    multi: true,
    options: [
      { id: 'screens', emoji: '📱', label: 'Telas' },
      { id: 'thoughts', emoji: '💭', label: 'Pensamentos' },
      { id: 'environment', emoji: '🔊', label: 'Ambiente' },
      { id: 'irregular', emoji: '⏰', label: 'Horários irregulares' },
    ],
  },
];

const CHRONOTYPE_RESULT: Record<
  QuizChronotype,
  { emoji: string; name: string; color: string; tip: string; planNote: string }
> = {
  dolphin: {
    emoji: '🐬',
    name: 'Golfinho',
    color: '#4a9eff',
    tip: 'Sono leve, mente ativa à noite. O passo 3 sobre dívida de sono foi feito para você.',
    planNote: 'Seu plano prioriza redução de ansiedade noturna e consistência de horários.',
  },
  lion: {
    emoji: '🦁',
    name: 'Leão',
    color: '#f59e0b',
    tip: 'Alta energia pela manhã, cansaço precoce. O passo 8 sobre luz matinal vai transformar seu rendimento.',
    planNote: 'Seu plano alavanca seu pico matinal e protege o início da noite.',
  },
  bear: {
    emoji: '🐻',
    name: 'Urso',
    color: '#a78bfa',
    tip: 'Segue o ciclo claro-escuro. O passo 2 sobre cronótipos explica exatamente seu ritmo.',
    planNote: 'Seu plano foca em consistência de horários e qualidade do sono profundo.',
  },
  wolf: {
    emoji: '🐺',
    name: 'Lobo',
    color: '#64748b',
    tip: 'Fase circadiana tardia. O passo 5 sobre sono profundo foi pensado para o seu perfil.',
    planNote: 'Seu plano trabalha a transição gradual para horários mais cedo sem forçar.',
  },
};

function calcQuizChronotype(answers: string[][]): QuizChronotype {
  const [a0, a1, a2, a3] = answers;
  const scores: Record<QuizChronotype, number> = { dolphin: 0, lion: 0, bear: 0, wolf: 0 };
  if (a0.includes('mind')) scores.dolphin += 2;
  if (a0.includes('cantfall')) scores.lion += 2;
  if (a0.includes('wakenight')) scores.dolphin += 3;
  if (a0.includes('exhausted')) {
    scores.dolphin += 2;
    scores.bear += 1;
  }
  if (a1.includes('before6')) scores.lion += 3;
  if (a1.includes('6to8')) scores.bear += 3;
  if (a1.includes('8to10')) scores.bear += 1;
  if (a1.includes('after10')) {
    scores.dolphin += 2;
    scores.wolf += 3;
  }
  if (a2.includes('morning')) scores.lion += 3;
  if (a2.includes('midday')) scores.bear += 3;
  if (a2.includes('afternoon')) scores.bear += 2;
  if (a2.includes('night')) scores.wolf += 3;
  if (a3.includes('thoughts')) scores.dolphin += 3;
  if (a3.includes('screens')) scores.lion += 2;
  if (a3.includes('environment')) scores.dolphin += 2;
  if (a3.includes('irregular')) scores.wolf += 3;
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as QuizChronotype;
}

/** Landing web: programa 21 passos como produto principal; Sono+ como opcional premium. Sem depoimentos inventados. */
export default function SonoPlusLandingPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { t: translate } = useLanguage();
  const language: 'pt' = 'pt';
  const t = (key: string) => translate(key, 'pt');
  const isPt = true;
  const [pricing, setPricing] = useState<PricingData>(DEFAULT_WEB_PRICING[language]);

  /** Mobile browser ainda é `Platform.OS === 'web'` — layout precisa seguir a largura real. */
  const contentPadH = width < 400 ? 16 : 24;
  const navStacked = width < 640;
  const navShortLabels = width < 520;
  const heroRowLayout = width >= 640;
  const layoutWide = width >= 720;
  const chronoStack = width < 520;
  const quizEmailStack = width < 480;
  const founderStack = width < 520;
  const sonoPlusStack = width < 540;

  // ─── Quiz inline ────────────────────────────────────────────────
  // O quiz vive dentro desta landing — sem redirect — para fechar a jornada
  // (descoberta → resultado personalizado → e-mail → checkout) na mesma URL.
  const [quizStep, setQuizStep] = useState<'idle' | 'answering' | 'result'>('idle');
  const [quizScreen, setQuizScreen] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[][]>([[], [], [], []]);
  const [quizResult, setQuizResult] = useState<QuizChronotype | null>(null);
  const [quizEmail, setQuizEmail] = useState('');
  const [quizEmailDone, setQuizEmailDone] = useState(false);
  const [quizEmailSending, setQuizEmailSending] = useState(false);

  const currentQuizScreen = QUIZ_SCREENS[quizScreen];
  const currentQuizAnswers = quizAnswers[quizScreen] ?? [];
  const hasQuizAnswer = currentQuizAnswers.length > 0;

  const toggleQuizOption = (id: string) => {
    setQuizAnswers((prev) => {
      const curr = prev[quizScreen];
      const isMulti = QUIZ_SCREENS[quizScreen].multi;
      let next: string[];
      if (curr.includes(id)) {
        next = curr.filter((x) => x !== id);
      } else if (isMulti) {
        next = curr.length >= 2 ? curr : [...curr, id];
      } else {
        next = [id];
      }
      const updated = [...prev];
      updated[quizScreen] = next;
      return updated;
    });
  };

  const goQuizNext = () => {
    if (quizScreen === 3) {
      const result = calcQuizChronotype(quizAnswers);
      setQuizResult(result);
      setQuizStep('result');
      // Persiste o cronótipo para que recargas/voltas ainda mostrem o
      // banner de personalização e a oferta personalizada.
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem('gozzzz_chronotype', result);
        } catch {
          // localStorage indisponível (modo privativo) — segue sem persistir
        }
      }
    } else {
      setQuizScreen((s) => s + 1);
    }
  };

  const handleQuizEmail = () => {
    const trimmed = quizEmail.trim().toLowerCase();
    if (!trimmed.includes('@') || trimmed.length < 5) return;
    if (!quizResult) return;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('gozzzz_lead_email', trimmed);
        window.localStorage.setItem('gozzzz_lead_ts', Date.now().toString());
        window.localStorage.setItem('gozzzz_lead_chronotype', quizResult);
      } catch {
        // ignora — captura é opcional
      }
    }

    // UI otimista: confirma imediatamente. O envio real (Supabase Edge
    // Function -> Resend) acontece em segundo plano. Falhas são logadas
    // mas não derrubam a confirmação — o lead ficou no localStorage e
    // será reconciliado pela equipe se necessário.
    setQuizEmail(trimmed);
    setQuizEmailDone(true);
    setQuizEmailSending(true);

    void (async () => {
      try {
        const { error } = await supabase.functions.invoke(
          'send-chronotype-report',
          {
            body: {
              email: trimmed,
              chronotype: quizResult,
              language: 'pt',
              source: 'web_quiz_inline',
              quizAnswers: quizAnswers,
            },
          },
        );
        if (error) {
          console.warn('[chronotype-report] dispatch failed:', error.message);
        }
      } catch (err) {
        console.warn('[chronotype-report] dispatch threw:', err);
      } finally {
        setQuizEmailSending(false);
      }
    })();
  };

  const resetQuiz = () => {
    setQuizStep('idle');
    setQuizScreen(0);
    setQuizAnswers([[], [], [], []]);
    setQuizResult(null);
    setQuizEmail('');
    setQuizEmailDone(false);
    setQuizEmailSending(false);
  };

  const scrollToCheckout = () => {
    if (isWeb && typeof document !== 'undefined') {
      document.getElementById('checkout-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };
  // ─── Fim quiz inline ────────────────────────────────────────────

  // Auto-start do quiz quando a URL chega com hash #quiz (links externos:
  // e-mail de boas-vindas, e-mail do relatório, posts/share). Pula o estado
  // idle (DNA + título + botão "Fazer o teste grátis →") direto pra primeira
  // pergunta — economiza um clique e melhora conversão de quem já decidiu
  // fazer o teste antes de chegar na página.
  //
  // Não dispara em visitas orgânicas (sem hash) — quem rola até o quiz
  // continua vendo o card idle com a explicação do que esperar.
  //
  // Mantemos initial state = 'idle' (em vez de inicializar via função do
  // useState) pra não quebrar a hidratação do export estático: o servidor
  // não conhece `window.location.hash`, então só o client decide.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#quiz') return;
    if (quizStep !== 'idle') return;
    setQuizStep('answering');
    // Scroll suave depois que o estado mudou — o bloco answering tem altura
    // diferente do idle, então o scroll nativo do hash pode parar no lugar
    // errado se acionado antes da re-renderização.
    requestAnimationFrame(() => {
      const el = document.getElementById('quiz');
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    // Linter desabilitado de propósito: queremos rodar UMA vez no mount.
    // Dependências [] aqui é intencional, não bug.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openWhatsApp = () => Linking.openURL(WHATSAPP);

  useEffect(() => {
    (async () => {
      try {
        const currencyMap = { pt: 'BRL', en: 'USD' } as const;
        const currency = currencyMap[language];
        const { data } = await (supabase.from('pricing') as any)
          .select('price, label, equiv, note')
          .eq('plan_type', 'annual')
          .eq('currency', currency)
          .maybeSingle();
        if (data) {
          setPricing({
            currency,
            symbol: language === 'pt' ? 'R$' : '$',
            annual: {
              price: data.price,
              label: data.label,
              equiv: data.equiv,
              note: data.note,
            },
          });
        }
      } catch {
        setPricing(DEFAULT_WEB_PRICING[language]);
      }
    })();
  }, [language]);

  // Banner de personalização exibido somente quando o visitante chega aqui
  // depois do quiz; lemos a chave gravada por ChronotypeQuizModal. Best-effort:
  // se o storage não existir, simplesmente não mostramos nada.
  const [userChronotype, setUserChronotype] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const ct = window.localStorage.getItem('gozzzz_chronotype');
      if (ct) setUserChronotype(ct);
    } catch {
      // localStorage indisponível — banner é opcional
    }
  }, []);

  const chronotypeBannerData: Record<
    string,
    { emoji: string; name: string; tip: string }
  > = {
    dolphin: {
      emoji: '🐬',
      name: 'Golfinho',
      tip: 'O passo 3 sobre dívida de sono foi feito para o seu perfil.',
    },
    lion: {
      emoji: '🦁',
      name: 'Leão',
      tip: 'O passo 8 sobre luz matinal vai transformar seu rendimento.',
    },
    bear: {
      emoji: '🐻',
      name: 'Urso',
      tip: 'O passo 2 sobre cronótipos explica exatamente seu ritmo.',
    },
    wolf: {
      emoji: '🐺',
      name: 'Lobo',
      tip: 'O passo 5 sobre sono profundo foi pensado para o seu perfil.',
    },
  };

  // Title encurtado pra 38-39 chars (não trunca em mobile, que corta em ~55).
  // Description em <=155 chars (limite de snippet do Google em desktop).
  const headTitle = isPt
    ? 'Programa de Sono em 21 Passos · GoZzzz'
    : 'GoZzzz · 21-Step Sleep Program';

  const headDesc = isPt
    ? '21 passos baseados em neurociência para reorganizar seu sono, ritmo e rotina. 3 lições grátis. Acesso vitalício por R$ 147.'
    : '21-step sleep program rooted in neuroscience. Reorganize sleep, rhythm and routine. 3 free lessons. Lifetime access.';

  const headOgDesc = isPt
    ? '21 passos baseados em neurociência para quem quer parar de adivinhar e começar a dormir de verdade. 3 lições grátis. R$ 147 pagamento único.'
    : 'A 21-step path to reorganize sleep, rhythm, and routine — 3 free lessons.';

  const headTwitterDesc = isPt
    ? '21 passos baseados em neurociência. 3 lições grátis. R$ 147 acesso vitalício.'
    : '21-step program. 3 free lessons. Lifetime access.';

  const previewLessons = useMemo(() => {
    return [...LESSONS_DATA]
      .sort((a, b) => a.step_number - b.step_number)
      .slice(0, 8)
      .map((l) => ({
        id: l.id,
        num: l.step_number,
        title: language === 'pt' ? l.title_pt : l.title_en,
        free: l.step_number <= 3,
      }));
  }, [language]);

  const socialImageUrl = 'https://gozzzz.app/og/sono-plus.png';

  const schemaGraph = useMemo(
    () =>
      buildSonoPlusSchemaGraph({
        isPt,
        headTitle,
        headDesc,
        socialImageUrl,
        faq: [...SONO_PLUS_FAQ],
      }),
    [isPt, headTitle, headDesc],
  );

  const heroProof = [
    `21 ${t('web.program.steps')}`,
    `3 ${t('web.program.freeLessons')}`,
    isPt ? '~5 min por passo' : t('web.program.pillApproxStep'),
    isPt ? 'R$ 147 acesso vitalício' : t('web.badge.scienceBased'),
  ];

  const programPathSteps = [
    t('web.program.path1'),
    t('web.program.path2'),
    t('web.program.path3'),
  ];

  const curiosity = isPt
    ? [
        {
          Ico: Brain,
          title: 'Por que a mente não “desliga”?',
          sub: 'Pressão do sono, alerta noturno e ritmo circadiano — em linguagem que você aplica na rotina.',
        },
        {
          Ico: Zap,
          title: 'O que realmente muda o seu descanso',
          sub: 'Passos pequenos, repetíveis, com foco no que a literatura costuma priorizar primeiro.',
        },
        {
          Ico: Sunrise,
          title: 'Manhã que puxa a noite',
          sub: 'Luz, horários e transição — encadeados para você sentir diferença sem virar fanatismo.',
        },
        {
          Ico: Shield,
          title: 'Sem promessa mágica',
          sub: 'Método + consistência. Educação de sono, não substituto de avaliação clínica quando necessário.',
        },
      ]
    : [
        {
          Ico: Brain,
          title: 'Why your mind will not switch off',
          sub: 'Sleep pressure, nighttime vigilance, and circadian timing — translated into daily moves.',
        },
        {
          Ico: Zap,
          title: 'What actually moves the needle',
          sub: 'Small, repeatable steps aligned with what sleep science usually prioritizes first.',
        },
        {
          Ico: Sunrise,
          title: 'Morning shapes the night',
          sub: 'Light, timing, and wind-down — chained so change feels realistic, not extreme.',
        },
        {
          Ico: Shield,
          title: 'No fairy-tale promises',
          sub: 'Method + consistency. Sleep education — not a replacement for clinical care when needed.',
        },
      ];

  const acts = [
    { range: '1–7', title: 'Ato 1 · Mapear', desc: 'Entender ciclos, cronotipo, dívida de sono e o que fragmenta o seu descanso.' },
    { range: '8–14', title: 'Ato 2 · Reconstruir', desc: 'Protocolos práticos — luz, temperatura, rotina e hábitos — um de cada vez.' },
    { range: '15–21', title: 'Ato 3 · Consolidar', desc: 'Fechar o ciclo: manter ganhos, ajustar o que falha e fixar um ritmo sustentável.' },
  ];

  const benefitLines = [
    'Menos fragmentação durante a noite',
    'Rotina guiada dia a dia',
    'Ciência aplicada ao que você faz em casa',
    'Clareza para ajustar o que não funciona',
  ];

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDesc} />
        {/* meta keywords removido — Google ignora desde 2009 e só infla HTML. */}
        <meta property="og:title" content={isPt ? 'Programa de Sono em 21 Passos · GoZzzz' : headTitle} />
        <meta property="og:description" content={headOgDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozzzz.app/web/sono-plus" />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:image:alt" content="GoZzzz - Programa de Sono em 21 Passos baseado em neurociência" />
        <meta property="og:site_name" content="GoZzzz" />
        <meta property="og:locale" content={isPt ? 'pt_BR' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isPt ? 'Programa de Sono em 21 Passos · GoZzzz' : headTitle} />
        <meta name="twitter:description" content={headTwitterDesc} />
        <meta name="twitter:image" content={socialImageUrl} />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <link rel="canonical" href="https://gozzzz.app/web/sono-plus" />
        <link rel="alternate" hrefLang="pt-BR" href="https://gozzzz.app/web/sono-plus" />
        <link rel="alternate" hrefLang="x-default" href="https://gozzzz.app/web/sono-plus" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Head>

      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* Nav — alinhado a /web/assinar */}
        <LinearGradient colors={['#0c0a1f', ACCENT_DEEP]} style={styles.navGrad}>
          <View style={[styles.navInner, navStacked && styles.navInnerStacked, { paddingHorizontal: contentPadH }]}>
            <Link href="/web" asChild>
              <TouchableOpacity
                style={[styles.brand, navStacked && styles.brandStacked]}
                accessibilityRole="link"
              >
                <Text style={styles.brandText}>GoZzzz</Text>
              </TouchableOpacity>
            </Link>
            <View style={[styles.navRight, navStacked && styles.navRightStacked]}>
              <Link href="/blog" asChild>
                <TouchableOpacity style={styles.navGhost} accessibilityRole="link">
                  <Text style={styles.navGhostTxt}>Blog</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/web/sono-plus" asChild>
                <TouchableOpacity style={styles.navGhost} accessibilityRole="link">
                  <BookOpen size={16} color={ACCENT_LIGHT} />
                  <Text style={styles.navGhostTxt}>
                    {navShortLabels ? '21 passos' : 'Programa 21 Passos'}
                  </Text>
                </TouchableOpacity>
              </Link>
              <Link href="/web/assinar" asChild>
                <TouchableOpacity style={styles.navGold} accessibilityRole="link">
                  <Text style={styles.navGoldTxt}>
                    {navShortLabels ? t('web.nav.subscribe') : t('coach.ctaSubscribe')}
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </LinearGradient>

        {/* Banner de personalização — aparece se o visitante chegou aqui depois do quiz */}
        {userChronotype && chronotypeBannerData[userChronotype] && (
          <View
            style={[
              styles.chronoBanner,
              { paddingHorizontal: contentPadH },
              chronoStack && styles.chronoBannerStacked,
            ]}
          >
            <Text style={styles.chronoBannerEmoji}>{chronotypeBannerData[userChronotype].emoji}</Text>
            <View style={styles.chronoBannerTextCol}>
              <Text style={styles.chronoBannerKicker}>
                SEU PLANO {chronotypeBannerData[userChronotype].name.toUpperCase()}
              </Text>
              <Text style={styles.chronoBannerTip}>
                {chronotypeBannerData[userChronotype].tip}
              </Text>
            </View>
          </View>
        )}

        {/* Hero — paleta dark/roxo. Sem ícone decorativo (logo é só texto). */}
        <LinearGradient colors={[ACCENT_DEEP, '#0c0a1f', BG]} style={styles.heroGradTop}>
          <View style={styles.heroGlow} />
          <View style={[styles.heroInner, { paddingTop: 36, paddingBottom: 8, paddingHorizontal: contentPadH }]}>
            <Text
              role="heading"
              aria-level={1}
              nativeID="speakable-headline"
              style={[styles.heroH1, heroRowLayout && styles.heroH1Wide]}
            >
              {isPt ? 'Programa de Sono em 21 Passos' : t('web.program.title')}
            </Text>
            <Text style={styles.heroKicker}>
              {isPt ? 'Baseado em Neurociência' : t('web.program.subtitle')}
            </Text>
            <Text nativeID="speakable-summary" style={styles.heroLead}>
              {isPt
                ? 'Você dorme, mas não descansa. Essa trilha de 21 passos reorganiza seu sono, seu ritmo e sua rotina — com base em pesquisa real, sem promessa mágica.'
                : 'A 21-step path for people who want to stop guessing and start moving — with clarity, rhythm, and evidence-informed structure.'}
            </Text>

            <View style={[styles.heroBtns, heroRowLayout && styles.heroBtnsRow]}>
              <TouchableOpacity
                style={[styles.btnGoldFill, heroRowLayout && styles.btnGoldFillRow]}
                onPress={() => router.push('/web/programa')}
              >
                <BookOpen size={18} color="#ffffff" />
                <Text style={styles.btnGoldFillTxt}>
                  {isPt ? 'Começar grátis → ver as 3 primeiras lições' : 'Start free → see the 3 first lessons'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnGhost, heroRowLayout && styles.btnGoldFillRow]} onPress={() => router.push('/web/assinar')}>
                <Text style={styles.btnGhostTxt}>
                  {isPt ? 'Ou desbloqueie todos os 21 passos por R$ 147' : 'Unlock all 21 steps'}
                </Text>
                <ArrowRight size={18} color={GOLD} />
              </TouchableOpacity>
            </View>

            <View style={styles.pillWrap}>
              {heroProof.map((label, i) => (
                <View key={i} style={styles.pill}>
                  <Sparkles size={12} color={GOLD} />
                  <Text style={styles.pillTxt}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Âncoras científicas — acima da dobra, sem infringir direitos autorais.
            Nome completo + instituição + área de pesquisa de cada referência, em
            cards uniformes. Disclaimer de não-afiliação obrigatório no rodapé. */}
        <View style={[styles.researchersBand, { paddingHorizontal: contentPadH }]}>
          <View style={styles.researchersInner}>
            <Text style={styles.researchersKicker}>
              Baseado em pesquisas publicadas de
            </Text>

            <View style={styles.researchersGrid}>
              {[
                {
                  name: 'Matthew Walker, PhD',
                  role: 'Professor de Neurociência — UC Berkeley',
                  field: 'Arquitetura do sono',
                  initial: 'W',
                  color: '#4a9eff',
                },
                {
                  name: 'Andrew Huberman, PhD',
                  role: 'Professor de Neurobiologia — Stanford',
                  field: 'Ritmo circadiano e neuroplasticidade',
                  initial: 'H',
                  color: '#10b981',
                },
                {
                  name: 'Charles A. Czeisler, MD, PhD',
                  role: 'Professor — Harvard Medical School',
                  field: 'Medicina do sono e cronobiologia',
                  initial: 'C',
                  color: '#a78bfa',
                },
                {
                  name: 'Michael J. Breus, PhD',
                  role: 'Psicólogo clínico do sono',
                  field: 'Cronotipos e higiene do sono',
                  initial: 'B',
                  color: '#f59e0b',
                },
              ].map((researcher) => (
                <View key={researcher.name} style={styles.researcherCard}>
                  <View
                    style={[
                      styles.researcherAvatar,
                      {
                        backgroundColor: researcher.color + '22',
                        borderColor: researcher.color + '44',
                      },
                    ]}
                  >
                    <Text style={[styles.researcherInitial, { color: researcher.color }]}>
                      {researcher.initial}
                    </Text>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={styles.researcherName}>{researcher.name}</Text>
                    <Text style={styles.researcherRole}>{researcher.role}</Text>
                    <Text style={[styles.researcherField, { color: researcher.color }]}>
                      {researcher.field}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.researchersDisclaimer}>
              As referências a pesquisadores têm fins educativos. GoZzzz não possui afiliação com nenhum pesquisador ou instituição citada.
            </Text>
          </View>
        </View>

        {/* ─── QUIZ DE CRONÓTIPO INLINE ───────────────────────────────
             Funil completo dentro da própria página: idle → 4 perguntas →
             resultado personalizado → captura de e-mail → CTA com scroll
             para o checkout. Sem redirect, sem nova URL.

             nativeID="quiz" expõe a âncora `#quiz` para deep-linking — o
             e-mail de boas-vindas (send-welcome-email) usa essa âncora para
             estimular quem ainda não fez o teste a abrir direto na seção. */}
        <View nativeID="quiz" style={[styles.quizSection, { paddingHorizontal: contentPadH }]}>
          {quizStep === 'idle' && (
            <View style={styles.quizIdleCard}>
              <Text style={styles.quizIdleEmoji}>🧬</Text>
              <Text style={styles.quizIdleTitle}>Descubra seu cronótipo</Text>
              <Text style={styles.quizIdleSub}>
                4 perguntas · 60 segundos · o programa se adapta ao seu perfil biológico
              </Text>
              <TouchableOpacity
                onPress={() => setQuizStep('answering')}
                style={styles.quizIdleBtn}
                activeOpacity={0.88}
              >
                <Text style={styles.quizIdleBtnTxt}>Fazer o teste grátis →</Text>
              </TouchableOpacity>
              <Text style={styles.quizIdleNote}>Gratuito · sem cadastro</Text>
            </View>
          )}

          {quizStep === 'answering' && (
            <View style={styles.quizCard}>
              <View style={styles.quizProgressRow}>
                {[0, 1, 2, 3].map((i) => (
                  <View
                    key={i}
                    style={[
                      styles.quizProgressBar,
                      { backgroundColor: i <= quizScreen ? GOLD : 'rgba(255,255,255,0.08)' },
                    ]}
                  />
                ))}
              </View>

              <Text style={styles.quizQuestion}>{currentQuizScreen.q}</Text>
              <Text style={styles.quizSub}>{currentQuizScreen.sub}</Text>

              <View style={styles.quizOptions}>
                {currentQuizScreen.options.map((opt) => {
                  const selected = currentQuizAnswers.includes(opt.id);
                  return (
                    <TouchableOpacity
                      key={opt.id}
                      onPress={() => toggleQuizOption(opt.id)}
                      activeOpacity={0.75}
                      style={[styles.quizOption, selected && styles.quizOptionSelected]}
                    >
                      <Text style={styles.quizOptionEmoji}>{opt.emoji}</Text>
                      <Text
                        style={[styles.quizOptionLabel, selected && styles.quizOptionLabelSelected]}
                      >
                        {opt.label}
                      </Text>
                      {selected && (
                        <View style={styles.quizOptionCheck}>
                          <Text style={styles.quizOptionCheckTxt}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                onPress={goQuizNext}
                disabled={!hasQuizAnswer}
                activeOpacity={0.88}
                style={[
                  styles.quizPrimaryBtn,
                  !hasQuizAnswer && styles.quizPrimaryBtnDisabled,
                ]}
              >
                <Text style={styles.quizPrimaryBtnTxt}>
                  {quizScreen === 3 ? 'Ver meu resultado →' : 'Continuar →'}
                </Text>
              </TouchableOpacity>

              {quizScreen > 0 && (
                <TouchableOpacity
                  onPress={() => setQuizScreen((s) => s - 1)}
                  style={styles.quizBackBtn}
                >
                  <Text style={styles.quizBackTxt}>← Voltar</Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {quizStep === 'result' && quizResult && (() => {
            const ct = CHRONOTYPE_RESULT[quizResult];
            return (
              <View style={[styles.quizResultCard, { borderColor: ct.color + '44' }]}>
                <Text style={styles.quizResultEmoji}>{ct.emoji}</Text>
                <Text style={[styles.quizResultName, { color: ct.color }]}>
                  Você é um {ct.name}
                </Text>
                <Text style={styles.quizResultTip}>{ct.tip}</Text>

                <View style={styles.quizPlanNoteCard}>
                  <Text style={styles.quizPlanNoteKicker}>
                    SEU PLANO {ct.name.toUpperCase()}
                  </Text>
                  <Text style={styles.quizPlanNoteText}>{ct.planNote}</Text>
                </View>

                {!quizEmailDone ? (
                  <View style={styles.quizEmailWrap}>
                    <Text style={styles.quizEmailLabel}>
                      📩 Receba seu plano personalizado por e-mail
                    </Text>
                    <View style={[styles.quizEmailRow, quizEmailStack && styles.quizEmailRowStack]}>
                      <TextInput
                        value={quizEmail}
                        onChangeText={setQuizEmail}
                        placeholder="seu@email.com"
                        placeholderTextColor="rgba(148,163,184,0.5)"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onSubmitEditing={handleQuizEmail}
                        style={[styles.quizEmailInput, quizEmailStack && styles.quizEmailInputStack]}
                      />
                      <TouchableOpacity
                        onPress={handleQuizEmail}
                        style={[styles.quizEmailBtn, quizEmailStack && styles.quizEmailBtnStack]}
                        activeOpacity={0.88}
                      >
                        <Text style={styles.quizEmailBtnTxt}>Enviar</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.quizEmailDisclaimer}>
                      Sem spam. Só seu plano e dicas do programa.
                    </Text>
                  </View>
                ) : (
                  <View style={styles.quizEmailDoneCard}>
                    <Text style={styles.quizEmailDoneTxt}>
                      {quizEmailSending
                        ? `Enviando seu relatório para ${quizEmail}…`
                        : `✓ Pronto. Seu relatório do cronótipo está a caminho — confira ${quizEmail} (e a pasta de spam, por garantia).`}
                    </Text>
                  </View>
                )}

                <TouchableOpacity
                  onPress={scrollToCheckout}
                  activeOpacity={0.88}
                  style={styles.quizCtaCheckout}
                >
                  <Crown size={18} color="#ffffff" />
                  <Text style={styles.quizCtaCheckoutTxt}>
                    Acessar o programa do {ct.name} — R$ 147
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={resetQuiz} style={styles.quizResetBtn}>
                  <Text style={styles.quizResetTxt}>Refazer o teste</Text>
                </TouchableOpacity>
              </View>
            );
          })()}
        </View>
        {/* ─── FIM QUIZ INLINE ───────────────────────────────────── */}

        {/* Prévia horizontal — lições gratuitas */}
        <View style={styles.previewSection}>
          <View style={[styles.previewHead, { paddingHorizontal: contentPadH }]}>
            <Text style={styles.sectionKicker}>Antes de assinar</Text>
            <Text role="heading" aria-level={2} style={styles.h2Tight}>Os primeiros tópicos da sua trilha</Text>
            <Text style={styles.previewSub}>
              Arraste para o lado — estes são títulos reais das lições.
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.previewScroll, { paddingHorizontal: contentPadH }]}
          >
            {previewLessons.map((lesson) => (
              <View key={lesson.id} style={styles.previewCard}>
                <View style={styles.previewCardTop}>
                  <Text style={styles.previewNum}>#{lesson.num}</Text>
                  {lesson.free ? (
                    <View style={styles.freePill}>
                      <Text style={styles.freePillTxt}>{t('web.program.free')}</Text>
                    </View>
                  ) : (
                    <View style={styles.lockPill}>
                      <Crown size={10} color={GOLD} />
                      <Text style={styles.lockPillTxt}>{t('web.program.premium')}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.previewTitle} numberOfLines={3}>
                  {lesson.title}
                </Text>
                <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.previewLink}>
                  <Text style={styles.previewLinkTxt}>{t('web.program.viewLesson')} →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.body, { paddingHorizontal: contentPadH }]}>
          {/* Ganchos visuais */}
          <View style={styles.block}>
            <Text style={styles.sectionKicker}>Por que abrir o próximo bloco?</Text>
            <Text role="heading" aria-level={2} style={styles.h2}>Feito para leitura curiosa, não enrolação</Text>
            <View style={[styles.bentoGrid, layoutWide && styles.bentoGridWide]}>
              {curiosity.map((c, idx) => {
                const { Ico } = c;
                return (
                  <View key={idx} style={[styles.bentoCard, layoutWide && styles.bentoCardWide]}>
                    <LinearGradient colors={['rgba(124,92,232,0.12)', 'rgba(255,255,255,0.02)']} style={styles.bentoIcon}>
                      <Ico size={22} color={GOLD} strokeWidth={2} />
                    </LinearGradient>
                    <Text style={styles.bentoTitle}>{c.title}</Text>
                    <Text style={styles.bentoSub}>{c.sub}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Três atos */}
          <LinearGradient colors={[BG_CARD, '#0a0a14']} style={styles.actsBand}>
            <Text style={styles.sectionKicker}>Estrutura</Text>
            <Text role="heading" aria-level={2} style={styles.h2}>21 passos em três movimentos</Text>
            {acts.map((act, idx) => (
              <View key={idx} style={styles.actRow}>
                <View style={styles.actBullet}>
                  <Text style={styles.actBulletTxt}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.actMeta}>
                    <Text style={styles.actRange}>{act.range}</Text>
                    <Text style={styles.actTitle}>{act.title}</Text>
                  </View>
                  <Text style={styles.actDesc}>{act.desc}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.btnGhostWideBand} onPress={() => router.push('/web/programa')}>
              <BookOpen size={18} color={GOLD} />
              <Text style={styles.btnGhostTxt}>Explorar todas as etapas</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Programa — textos próprios (evita misturar com passos da consultoria Sono+) */}
          <View style={[styles.block, styles.sectionBand]}>
            <Text style={styles.sectionKicker}>Na prática</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 22 }]}>{t('web.program.pathTitle')}</Text>
            {programPathSteps.map((desc, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumWrap}>
                  <Text style={styles.stepNum}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Stats + bridge */}
          <View style={[styles.sectionBandMuted, styles.block]}>
            <Text style={styles.sectionKicker}>{t('web.program.title')}</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 12 }]}>Números que definem o ritual</Text>
            <Text style={[styles.para, { marginBottom: 20 }]}>{webProgramBridgePt}</Text>
            <View style={[styles.statRow, layoutWide && styles.statRowWide]}>
              <View style={[styles.stat, layoutWide && styles.statWide]}>
                <Text style={styles.statNum}>21</Text>
                <Text style={styles.statLbl}>{t('web.program.steps')}</Text>
              </View>
              <View style={[styles.statDivider, layoutWide && styles.statDividerWide]} />
              <View style={[styles.stat, layoutWide && styles.statWide]}>
                <Text style={styles.statNum}>3</Text>
                <Text style={styles.statLbl}>{t('web.program.freeLessons')}</Text>
              </View>
              <View style={[styles.statDivider, layoutWide && styles.statDividerWide]} />
              <View style={[styles.stat, layoutWide && styles.statWide]}>
                <Text style={styles.statNum}>~5 min</Text>
                <Text style={styles.statLbl}>{t('web.program.stat3')}</Text>
              </View>
            </View>
          </View>

          {/* Benefícios */}
          <View style={[styles.block, styles.sectionBand]}>
            <Text style={styles.sectionKicker}>Ao seguir os passos</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 16 }]}>O que você treina ao longo do programa</Text>
            <View style={[styles.benefGrid, layoutWide && styles.benefGridWide]}>
              {benefitLines.map((line, idx) => (
                <View key={idx} style={[styles.benefCard, layoutWide && styles.benefCardWide]}>
                  <Check size={16} color="#22c55e" />
                  <Text style={styles.benefTxt}>{line}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* História do fundador — credibilidade humana imediatamente antes do paywall.
              Crítico para conversão: preço entra depois de "por que confiar". */}
          <View style={[styles.founderBlock, { paddingHorizontal: contentPadH }]}>
            <View style={[styles.founderCard, founderStack && styles.founderCardStack]}>
              <View style={styles.founderAvatar}>
                <Text style={styles.founderAvatarTxt}>J</Text>
              </View>
              <View style={[styles.founderTextCol, founderStack && styles.founderTextColStack]}>
                <Text style={[styles.founderQuote, founderStack && styles.founderQuoteStack]}>
                  &ldquo;Por quase 10 anos mal conseguia dormir. Passei mais 10 estudando a ciência. GoZzzz é o programa que eu queria ter encontrado no início da jornada.&rdquo;
                </Text>
                <Text style={[styles.founderSign, founderStack && styles.founderQuoteStack]}>José Nilton — Fundador do GoZzzz</Text>
              </View>
            </View>
          </View>

          {/* Checkout (layout espelho de /web/assinar, desktop — CTA leva ao Stripe na página certa) */}
          <View
            nativeID="checkout-section"
            style={[styles.block, styles.sectionBand, styles.checkoutSection]}
          >
            <Text style={styles.sectionKicker}>Assinar Premium</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 8 }]}>
              Acesse o programa completo
            </Text>
            <View style={[styles.checkoutGrid, layoutWide && styles.checkoutGridWide]}>
              <View style={[styles.checkoutCol, layoutWide && styles.checkoutColWide]}>
                <View style={[styles.planCardCk, styles.planCardCkSelected]}>
                  {/* Fallback defensivo: se o Supabase devolver label vazia, ainda
                      assim mostramos R$ 147 — preço hardcoded da oferta atual. */}
                  <Text style={[styles.priceHeadline, layoutWide && styles.priceHeadlineWide]}>
                    {pricing.annual.label || 'R$ 147'}
                  </Text>
                  <Text style={styles.priceLaunchTag}>Preço de lançamento</Text>
                  <Text style={styles.priceCaption}>
                    {pricing.annual.note} · {pricing.annual.equiv}
                  </Text>
                </View>

                {/* Urgência real: 7 dias a partir do build/visita.
                    Cada novo deploy "rola" o prazo, mantendo a credibilidade
                    do "preço de lançamento". Se decidirmos NÃO reajustar de
                    fato, este bloco deve ser removido (regra do prompt v4). */}
                {(() => {
                  const hoje = new Date();
                  const fimLancamento = new Date(hoje);
                  fimLancamento.setDate(hoje.getDate() + 7);
                  const dia = fimLancamento.getDate().toString().padStart(2, '0');
                  const mes = (fimLancamento.getMonth() + 1).toString().padStart(2, '0');
                  const dataFim = `${dia}/${mes}`;
                  return (
                    <View style={styles.urgencyTag}>
                      <Text style={styles.urgencyEmoji}>🔖</Text>
                      <Text style={styles.urgencyTxt}>
                        Preço de lançamento válido até {dataFim}. Após essa data o valor será reajustado.
                      </Text>
                    </View>
                  );
                })()}

                {/* Estratégia atual: Kiwify único (cartão + Pix + boleto +
                    parcelado + área de membros). Stripe está desativado via
                    flag pra evitar confusão de dois botões. Pra reativar
                    modelo híbrido, mudar STRIPE_ENABLED pra true. */}
                {KIWIFY_PARCELADO_URL ? (
                  <>
                    <TouchableOpacity
                      style={styles.checkoutBtnL}
                      activeOpacity={0.88}
                      onPress={() => Linking.openURL(KIWIFY_PARCELADO_URL)}
                    >
                      <CreditCard size={20} color="#ffffff" />
                      <Text style={styles.checkoutBtnLTxt}>
                        {STRIPE_ENABLED
                          ? 'Parcelar em 6x — R$ 24,50/mês'
                          : 'Comprar agora — R$ 147 à vista ou em até 6x'}
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.kiwifyNote}>
                      via Kiwify · cartão de crédito · acesso liberado após confirmação
                    </Text>

                    {STRIPE_ENABLED && (
                      <>
                        <View style={styles.payDivider}>
                          <View style={styles.payDividerLine} />
                          <Text style={styles.payDividerTxt}>ou</Text>
                          <View style={styles.payDividerLine} />
                        </View>

                        <TouchableOpacity
                          style={styles.checkoutBtnAlt}
                          activeOpacity={0.88}
                          onPress={() => router.push('/web/assinar')}
                        >
                          <Crown size={18} color={GOLD} />
                          <Text style={styles.checkoutBtnAltTxt}>
                            Pagar à vista — R$ 147
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                ) : (
                  <TouchableOpacity
                    style={styles.checkoutBtnL}
                    activeOpacity={0.88}
                    onPress={() => router.push('/web/assinar')}
                  >
                    <Crown size={20} color="#ffffff" />
                    <Text style={styles.checkoutBtnLTxt}>
                      Pagar à vista — R$ 147
                    </Text>
                  </TouchableOpacity>
                )}

                <Text style={styles.disclaimerCk}>
                  Pagamento único. Sem mensalidade. Sem renovação automática.
                </Text>
                <View style={styles.securityBadgesCk}>
                  <View style={styles.securityBadgeCk}>
                    <Lock size={14} color="#10b981" />
                    <Text style={styles.securityBadgeCkTxt}>{t('payment.ssl')}</Text>
                  </View>
                  <View style={styles.securityBadgeCk}>
                    <Shield size={14} color="#3b82f6" />
                    <Text style={styles.securityBadgeCkTxt}>
                      {STRIPE_ENABLED ? 'Stripe Secure' : 'Kiwify · Pagamento Seguro'}
                    </Text>
                  </View>
                  <View style={styles.securityBadgeCk}>
                    <BadgeCheck size={14} color="#f59e0b" />
                    <Text style={styles.securityBadgeCkTxt}>{t('payment.pciDss')}</Text>
                  </View>
                </View>
              </View>
              <View style={[styles.featuresColCk, layoutWide && styles.featuresColWide]}>
                <Text style={styles.colTitleCk}>O que está incluído</Text>
                <View style={styles.featuresCardCk}>
                  {[
                    '21 lições completas desbloqueadas imediatamente',
                    'Cada passo com ação concreta para o dia seguinte',
                    'Baseado em pesquisas de Walker, Huberman, Czeisler e Breus',
                    'Neurociência do sono e medicina circadiana',
                    'Atualizações gratuitas para sempre',
                    'Acesso imediato após pagamento — sem app, sem download',
                  ].map((feature, i) => (
                    <View key={i} style={styles.featureItemCk}>
                      <View style={styles.featureCheckCk}>
                        <Check size={14} color="#10b981" />
                      </View>
                      <Text style={styles.featureTextCk}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.guaranteeCardCk}>
                  <BadgeCheck size={28} color="#10b981" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guaranteeTitleCk}>Garantia de 7 dias por lei</Text>
                    <Text style={styles.guaranteeDescCk}>
                      Se não estiver satisfeito por qualquer motivo nos primeiros 7 dias, basta enviar um e-mail e devolvemos 100% — sem burocracia, sem questionamento. É seu direito pelo CDC.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sono+ — opcional, secundário */}
          <LinearGradient colors={['#120f0a', '#1a1610']} style={styles.sonoPlusBand}>
            <View style={[styles.sonoPlusRow, sonoPlusStack && styles.sonoPlusRowStack]}>
              <View style={sonoPlusStack ? { alignSelf: 'center', marginBottom: 4 } : {}}>
                <Crown size={28} color={GOLD} />
              </View>
              <View style={[styles.sonoPlusTextCol, sonoPlusStack && styles.sonoPlusTextColStack]}>
                <Text style={styles.sonoPlusKicker}>Opcional · Sono+</Text>
                <Text role="heading" aria-level={2} style={styles.sonoPlusTitle}>
                  Coaching Individual
                </Text>
                <Text style={styles.sonoPlusBody}>
                  Para quem quer resultado mais rápido com acompanhamento ao vivo. Uma sessão com especialista de sono custa entre R$ 400–800. Sono+ entrega diagnóstico + plano personalizado + 30 dias Premium por R$ 497 — sem lista de espera, de onde você estiver.
                </Text>
              </View>
            </View>
            <View style={styles.priceCard}>
              <View style={styles.priceHead}>
                <View style={styles.onlineTag}>
                  <Text style={styles.onlineTagTxt}>100% online</Text>
                </View>
                <Text style={styles.priceLabel}>Coaching Individual de Sono</Text>
              </View>
              <View style={styles.priceAmtRow}>
                <Text style={styles.priceAmt}>R$ 497</Text>
                <Text style={styles.priceSub}>sessão única</Text>
              </View>
              <Text style={styles.priceFmt}>60 minutos online, de onde você estiver.</Text>
              <View style={styles.divider} />
              {[
                'Sessão online de 60 minutos — de onde você estiver',
                'Mapeamento completo de hábitos, rotina e ambiente de sono',
                'Relatório personalizado com diagnóstico e próximos passos — entregue em 72h',
                'Suporte via WhatsApp por 30 dias — acesso direto, sem IA',
                '30 dias de acesso Premium com todos os 21 passos desbloqueados',
              ].map((feature, idx) => (
                <View key={idx} style={styles.priceRow}>
                  <View style={styles.bulletWrap}>
                    <Check size={16} color={GOLD} strokeWidth={2.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.priceLineTitle}>{feature}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.btnGoldFillWide} onPress={openWhatsApp}>
                <MessageCircle size={18} color="#ffffff" />
                <Text style={styles.btnGoldFillTxt}>Agendar minha sessão →</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* FAQ */}
          <View style={styles.block}>
            <Text role="heading" aria-level={2} style={styles.h2}>Perguntas frequentes</Text>
            <View style={{ marginTop: 16 }}>
              {SONO_PLUS_FAQ.map((item, i) => (
                <View key={i} style={styles.faqCard}>
                  <Text style={styles.faqQ}>{item.question}</Text>
                  {i === 0 ? (
                    <Text nativeID="speakable-faq" style={styles.faqA}>
                      {item.answer}
                    </Text>
                  ) : (
                    <Text style={styles.faqA}>{item.answer}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* CTA final — programa primeiro */}
          <View style={styles.ctaPanel}>
            <Moon size={24} color={GOLD} />
            <Text style={styles.ctaTitle}>Pronto para atravessar os 21 passos?</Text>
            <Text style={styles.ctaSub}>
              Comece pelas lições gratuitas ou desbloqueie o percurso completo. Sono+ fica disponível quando quiser refinamento ao vivo.
            </Text>
            <TouchableOpacity style={styles.btnGoldFillWide} onPress={() => router.push('/web/assinar')}>
              <Crown size={20} color="#ffffff" />
              <Text style={styles.btnGoldFillTxt}>{t('coach.ctaSubscribe')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlineGold} onPress={() => router.push('/web/programa')}>
              <BookOpen size={20} color={GOLD} />
              <Text style={styles.btnOutlineGoldTxt}>{t('web.program.allLessons')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGhostFinal} onPress={openWhatsApp}>
              <Calendar size={18} color={TEXT_MUTED} />
              <Text style={styles.btnGhostFinalTxt}>Falar sobre Sono+ (WhatsApp)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            {/* Internal linking para SEO — Google entende hierarquia entre as páginas */}
            <View style={styles.footerNav}>
              <Link href="/web" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>GoZzzz — Início</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/sono-plus" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Programa 21 Passos</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/programa" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Todas as lições</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/blog" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Blog</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/assinar" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Assinar</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <TouchableOpacity
                accessibilityRole="link"
                onPress={() => Linking.openURL('mailto:suporte@gozzzz.app?subject=Suporte%20GoZzzz')}
              >
                <Text style={styles.footerLink}>Suporte</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.footerCopy}>{t('web.footer.copyright')}</Text>
            <Text style={styles.footerSupport}>
              Dúvidas? Escreva pra{' '}
              <Text
                style={styles.footerSupportEmail}
                onPress={() => Linking.openURL('mailto:suporte@gozzzz.app?subject=Suporte%20GoZzzz')}
              >
                suporte@gozzzz.app
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const webProgramBridgePt =
  'Cada etapa sintetiza o que a literatura de sono recomenda aplicar no dia seguinte — no mesmo formato em que já confia na app.';
const webProgramBridgeEn =
  'Each step condenses sleep-science protocols into moves you repeat the next day — aligned with how the app teaches.';

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG, maxWidth: '100%', alignSelf: 'stretch' },
  navGrad: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  navInner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: NAV_H,
  },
  navInnerStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 12,
    paddingVertical: 12,
  },
  brand: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  brandStacked: { alignSelf: 'flex-start' },
  brandText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  navRight: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    justifyContent: 'flex-end',
  },
  navRightStacked: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  navGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  navGhostTxt: { color: '#94a3b8', fontWeight: '600', fontSize: 13 },
  navGold: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: GOLD },
  navGoldTxt: { color: '#ffffff', fontWeight: '800', fontSize: 13 },

  heroGradTop: { width: '100%', paddingBottom: 40, overflow: 'hidden' },
  heroGlow: {
    position: 'absolute',
    top: -120,
    left: '20%',
    right: '20%',
    height: 280,
    borderRadius: 200,
    backgroundColor: 'rgba(124,92,232,0.08)',
  },
  heroInner: { maxWidth: 720, width: '100%', alignSelf: 'center', alignItems: 'center', zIndex: 1 },
  heroH1: {
    marginTop: 16,
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroH1Wide: { fontSize: 34, lineHeight: 40 },
  heroKicker: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: GOLD,
    textAlign: 'center',
  },
  heroLead: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 560,
    paddingHorizontal: 8,
  },
  heroBtns: {
    marginTop: 24,
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 10,
    width: '100%',
    maxWidth: '100%',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  heroBtnsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  btnGoldFill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GOLD,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignSelf: 'stretch',
    maxWidth: '100%',
  },
  btnGoldFillRow: {
    flex: 1,
    minWidth: 0,
    maxWidth: 420,
    alignSelf: 'auto',
  },
  btnGoldFillTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15, flexShrink: 1, textAlign: 'center' },
  btnGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: GOLD,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    maxWidth: '100%',
  },
  btnGhostTxt: { color: GOLD, fontWeight: '700', fontSize: 15 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 22 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.22)',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  pillTxt: { color: TEXT_MUTED, fontSize: 11, fontWeight: '600', maxWidth: 240 },

  researchersBand: {
    backgroundColor: '#0c0c18',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(124,92,232,0.10)',
    paddingVertical: 20,
    width: '100%',
  },
  researchersInner: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  researchersKicker: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 16,
  },
  researchersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  researcherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    width: '100%',
    maxWidth: 360,
    minWidth: 0,
    alignSelf: 'center',
  },
  researcherAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  researcherInitial: { fontSize: 15, fontWeight: '800' },
  researcherName: { fontSize: 13, fontWeight: '700', color: '#e8e5df', marginBottom: 1, flexShrink: 1 },
  researcherRole: { fontSize: 11, color: '#64748b', fontWeight: '500', flexShrink: 1 },
  researcherField: { fontSize: 10, fontWeight: '700', marginTop: 2 },
  researchersDisclaimer: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 17,
  },
  urgencyTag: {
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urgencyEmoji: { fontSize: 14 },
  urgencyTxt: {
    flex: 1,
    fontSize: 12,
    color: '#fca5a5',
    lineHeight: 18,
    fontWeight: '500',
  },
  previewSection: {
    paddingTop: 28,
    paddingBottom: 8,
    backgroundColor: BG,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(124,92,232,0.06)',
  },
  previewHead: { maxWidth: 1100, width: '100%', alignSelf: 'center', marginBottom: 16 },
  previewSub: { marginTop: 8, color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },
  previewScroll: { gap: 12, paddingBottom: 12 },
  previewCard: {
    width: 260,
    backgroundColor: BG_CARD,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.18)',
    marginRight: 4,
  },
  previewCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  previewNum: { fontSize: 13, fontWeight: '800', color: GOLD },
  freePill: { backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  freePillTxt: { color: '#86efac', fontSize: 10, fontWeight: '800' },
  lockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: GOLD_DIM,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockPillTxt: { color: GOLD, fontSize: 10, fontWeight: '800' },
  previewTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', lineHeight: 21, minHeight: 63 },
  previewLink: { marginTop: 14 },
  previewLinkTxt: { color: GOLD, fontSize: 13, fontWeight: '700' },

  body: { maxWidth: 1100, width: '100%', alignSelf: 'center', paddingBottom: 48 },
  block: { marginTop: 36 },
  sectionBand: { paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(124,92,232,0.08)' },
  sectionBandMuted: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#0c0c16',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(124,92,232,0.06)',
  },
  sectionKicker: { color: GOLD, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, textTransform: 'uppercase' },
  h2: { color: TEXT_MAIN, fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h2Tight: { color: TEXT_MAIN, fontSize: 22, fontWeight: '700', lineHeight: 28 },
  para: { marginTop: 14, color: TEXT_MUTED, fontSize: 15, lineHeight: 24 },

  bentoGrid: {
    marginTop: 18,
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoGridWide: { flexDirection: 'row' },
  bentoCard: {
    width: '100%',
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  bentoCardWide: { width: '48%', minWidth: 0 },
  bentoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bentoTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  bentoSub: { color: TEXT_MUTED, fontSize: 13, lineHeight: 20 },

  actsBand: {
    marginTop: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(124,92,232,0.06)',
    position: 'relative',
  },
  actRow: { flexDirection: 'row', gap: 14, marginTop: 18, alignItems: 'flex-start' },
  actBullet: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(124,92,232,0.18)',
    borderWidth: 1,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actBulletTxt: { color: GOLD, fontWeight: '900', fontSize: 14 },
  actMeta: { flexDirection: 'row', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 6 },
  actRange: { color: GOLD, fontSize: 12, fontWeight: '800' },
  actTitle: { color: TEXT_MAIN, fontSize: 16, fontWeight: '700' },
  actDesc: { color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },
  btnGhostWideBand: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    maxWidth: '100%',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.35)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  stepRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    backgroundColor: BG_CARD,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: GOLD,
  },
  stepNumWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { fontSize: 18, fontWeight: '900', color: '#ffffff' },
  stepTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 5 },
  stepDesc: { color: TEXT_MUTED, fontSize: 15, lineHeight: 23 },

  statRow: {
    flexDirection: 'column',
    gap: 10,
    marginTop: 6,
    backgroundColor: BG_CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.12)',
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: 'stretch',
  },
  statRowWide: {
    flexDirection: 'row',
    gap: 0,
    paddingVertical: 18,
    alignItems: 'center',
  },
  stat: { flex: 1, alignItems: 'center' },
  statWide: { minWidth: 110 },
  statDivider: {
    width: '80%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(124,92,232,0.2)',
    alignSelf: 'center',
  },
  statDividerWide: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    minHeight: 40,
  },
  statNum: { color: TEXT_MAIN, fontSize: 26, fontWeight: '800' },
  statLbl: { color: TEXT_MUTED, fontSize: 11, marginTop: 4, textAlign: 'center' },

  benefGrid: { flexDirection: 'column', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  benefGridWide: { flexDirection: 'row' },
  benefCard: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: BG_CARD,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  benefCardWide: { width: '48%', minWidth: 0 },
  benefTxt: { flex: 1, color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },

  checkoutSection: { marginTop: 8 },
  checkoutGrid: {
    flexDirection: 'column',
    gap: 24,
    alignItems: 'stretch',
    marginTop: 20,
    width: '100%',
  },
  checkoutGridWide: { flexDirection: 'row', gap: 36, alignItems: 'flex-start' },
  checkoutCol: { width: '100%' },
  checkoutColWide: { flex: 1, minWidth: 0 },
  featuresColCk: { width: '100%', marginTop: 8 },
  featuresColWide: { flex: 1, minWidth: 0, marginTop: 0 },
  planCardCk: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  planCardCkSelected: {
    borderColor: GOLD,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  planTotalCk: { fontSize: 15, color: '#8892a4', fontWeight: '600', lineHeight: 22 },
  priceHeadline: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: 40,
  },
  priceHeadlineWide: { fontSize: 44, lineHeight: 50 },
  priceLaunchTag: {
    color: '#EF9F27',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  priceCaption: {
    marginTop: 6,
    fontSize: 14,
    color: '#cbd1de',
    fontWeight: '500',
    textAlign: 'center',
  },
  chronoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 12,
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'rgba(124,92,232,0.12)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(124,92,232,0.2)',
  },
  chronoBannerStacked: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  chronoBannerTextCol: { flex: 1, minWidth: 0, maxWidth: '100%' },
  chronoBannerEmoji: { fontSize: 22 },
  chronoBannerKicker: {
    color: ACCENT_LIGHT,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
    flexShrink: 1,
  },
  chronoBannerTip: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 1,
    flexShrink: 1,
  },
  checkoutBtnL: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    backgroundColor: GOLD,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutBtnLTxt: { fontSize: 16, fontWeight: '800', color: '#ffffff', textAlign: 'center', flexShrink: 1 },
  payDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    marginBottom: 12,
  },
  payDividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(148,163,184,0.18)' },
  payDividerTxt: {
    fontSize: 11,
    color: TEXT_MUTED,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  checkoutBtnAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: GOLD,
    backgroundColor: 'rgba(124,92,232,0.06)',
  },
  checkoutBtnAltTxt: { fontSize: 15, fontWeight: '700', color: GOLD },
  kiwifyNote: {
    fontSize: 11,
    color: TEXT_MUTED,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  disclaimerCk: { fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 18, marginBottom: 16 },
  securityBadgesCk: { flexDirection: 'row', gap: 8, justifyContent: 'center', flexWrap: 'wrap' },
  securityBadgeCk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  securityBadgeCkTxt: { fontSize: 11, fontWeight: '700', color: '#8892a4' },
  colTitleCk: { fontSize: 20, fontWeight: '800', color: '#e8d5b7', marginBottom: 16 },
  featuresCardCk: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 22,
    gap: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  featureItemCk: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  featureCheckCk: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  featureTextCk: { fontSize: 14, color: '#94a3b8', flex: 1, minWidth: 0, lineHeight: 21 },
  guaranteeCardCk: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    marginTop: 20,
  },
  guaranteeTitleCk: { fontSize: 15, fontWeight: '700', color: '#e8d5b7', marginBottom: 6 },
  guaranteeDescCk: { fontSize: 13, color: '#10b981', lineHeight: 20 },

  sonoPlusBand: {
    marginTop: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 26,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(124,92,232,0.14)',
    borderRadius: 0,
  },
  sonoPlusRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start', marginBottom: 20 },
  sonoPlusRowStack: { flexDirection: 'column', alignItems: 'stretch' },
  sonoPlusTextCol: { flex: 1, minWidth: 0 },
  sonoPlusTextColStack: { alignSelf: 'stretch', width: '100%' },
  sonoPlusKicker: { color: GOLD, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
  sonoPlusTitle: { color: TEXT_MAIN, fontSize: 17, fontWeight: '700', marginBottom: 8 },
  sonoPlusBody: { color: TEXT_MUTED, fontSize: 14, lineHeight: 22 },
  priceCard: {
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.28)',
  },
  priceHead: { marginBottom: 10 },
  onlineTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(124,92,232,0.15)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  onlineTagTxt: { color: GOLD, fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  priceLabel: { color: TEXT_MAIN, fontSize: 18, fontWeight: '800' },
  tagLineStack: { marginVertical: 12, gap: 3 },
  tagLine: { color: GOLD, fontSize: 13, fontWeight: '600' },
  priceAmtRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  priceAmt: { fontSize: 32, fontWeight: '900', color: GOLD },
  priceSub: { color: TEXT_MUTED, fontSize: 13, fontWeight: '600' },
  priceFmt: { color: TEXT_MUTED, fontSize: 13, marginBottom: 10 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(124,92,232,0.15)', marginVertical: 14 },
  priceRow: { flexDirection: 'row', gap: 10, marginBottom: 12, alignItems: 'flex-start' },
  bulletWrap: { paddingTop: 2 },
  priceLineTitle: { color: TEXT_MAIN, fontSize: 13, fontWeight: '600', lineHeight: 20 },
  priceLineSub: { color: TEXT_MUTED, fontSize: 12, marginTop: 2, lineHeight: 17 },
  btnGoldFillWide: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: GOLD,
    paddingVertical: 15,
    borderRadius: 14,
  },

  faqCard: {
    backgroundColor: BG_CARD,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 10,
  },
  faqQ: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  faqA: { color: TEXT_MUTED, fontSize: 13, lineHeight: 20 },

  ctaPanel: {
    marginTop: 36,
    alignItems: 'center',
    backgroundColor: '#0f1624',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.22)',
    gap: 10,
  },
  ctaTitle: { fontSize: 21, fontWeight: '800', color: TEXT_MAIN, textAlign: 'center', marginTop: 4 },
  ctaSub: { fontSize: 14, lineHeight: 21, color: TEXT_MUTED, textAlign: 'center', marginBottom: 6, paddingHorizontal: 4 },

  btnOutlineGold: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: GOLD,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 2,
  },
  btnOutlineGoldTxt: { color: GOLD, fontWeight: '800', fontSize: 15 },
  btnGhostFinal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    paddingVertical: 10,
  },
  btnGhostFinalTxt: { color: TEXT_MUTED, fontWeight: '600', fontSize: 14 },

  footer: { marginTop: 36, paddingVertical: 22, alignItems: 'center', gap: 6 },
  footerNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  footerLink: { color: '#cbd1de', fontSize: 13, fontWeight: '600' },
  footerSep: { color: 'rgba(203,209,222,0.4)', fontSize: 12 },
  footerCopy: { fontSize: 12, color: TEXT_MUTED, textAlign: 'center', paddingHorizontal: 16 },
  footerSupport: { fontSize: 12, color: TEXT_MUTED, textAlign: 'center', paddingHorizontal: 16, marginTop: 2 },
  footerSupportEmail: { color: ACCENT_LIGHT, fontWeight: '600' },

  // ─── Quiz inline ──────────────────────────────────────────────
  quizSection: {
    marginTop: 24,
    marginBottom: 8,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  quizIdleCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.25)',
    padding: 28,
    alignItems: 'center',
  },
  quizIdleEmoji: { fontSize: 28, marginBottom: 12 },
  quizIdleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_MAIN,
    textAlign: 'center',
    marginBottom: 8,
  },
  quizIdleSub: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 400,
  },
  quizIdleBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizIdleBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  quizIdleNote: { color: '#4a5568', fontSize: 12, marginTop: 12 },

  quizCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.18)',
    padding: 24,
  },
  quizProgressRow: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  quizProgressBar: { flex: 1, height: 4, borderRadius: 2 },
  quizQuestion: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_MAIN,
    marginBottom: 6,
    lineHeight: 28,
  },
  quizSub: { fontSize: 13, color: TEXT_MUTED, marginBottom: 20 },
  quizOptions: { gap: 10, marginBottom: 24 },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  quizOptionSelected: {
    borderColor: GOLD,
    backgroundColor: 'rgba(124,92,232,0.10)',
  },
  quizOptionEmoji: { fontSize: 22 },
  quizOptionLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: TEXT_MUTED },
  quizOptionLabelSelected: { color: TEXT_MAIN, fontWeight: '700' },
  quizOptionCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizOptionCheckTxt: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
  quizPrimaryBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  quizPrimaryBtnDisabled: { backgroundColor: 'rgba(124,92,232,0.3)' },
  quizPrimaryBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  quizBackBtn: { alignItems: 'center', marginTop: 12, paddingVertical: 8 },
  quizBackTxt: { color: '#64748b', fontSize: 13 },

  quizResultCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
  },
  quizResultEmoji: { fontSize: 56, marginBottom: 8 },
  quizResultName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  quizResultTip: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 440,
  },
  quizPlanNoteCard: {
    backgroundColor: 'rgba(124,92,232,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.2)',
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  quizPlanNoteKicker: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  quizPlanNoteText: { color: '#cbd5e1', fontSize: 13, lineHeight: 20 },

  quizEmailWrap: { width: '100%', marginBottom: 20 },
  quizEmailLabel: {
    color: TEXT_MAIN,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizEmailRow: { flexDirection: 'row', gap: 8, alignItems: 'stretch' },
  quizEmailRowStack: { flexDirection: 'column' },
  quizEmailInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  quizEmailInputStack: { width: '100%', minHeight: 48 },
  quizEmailBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  quizEmailBtnStack: { width: '100%', paddingVertical: 14, alignItems: 'center' },
  quizEmailBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
  quizEmailDisclaimer: {
    color: '#4a5568',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
  quizEmailDoneCard: {
    backgroundColor: 'rgba(16,185,129,0.10)',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  quizEmailDoneTxt: { color: '#10b981', fontSize: 13, fontWeight: '600' },

  quizCtaCheckout: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  quizCtaCheckoutTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15, textAlign: 'center', flexShrink: 1 },
  quizResetBtn: { marginTop: 12, paddingVertical: 8 },
  quizResetTxt: { color: '#64748b', fontSize: 12 },

  // ─── História do fundador ─────────────────────────────────────
  founderBlock: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 8,
  },
  founderCard: {
    backgroundColor: '#0e0e1c',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.18)',
    padding: 22,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  founderCardStack: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  founderAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  founderAvatarTxt: { fontSize: 20, fontWeight: '800', color: BG },
  founderTextCol: { flex: 1, minWidth: 0 },
  founderTextColStack: { width: '100%', alignItems: 'center' },
  founderQuote: {
    color: '#e8d5b7',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 22,
  },
  founderQuoteStack: { textAlign: 'center' },
  founderSign: { color: GOLD, fontSize: 12, fontWeight: '700', marginTop: 8 },
});
