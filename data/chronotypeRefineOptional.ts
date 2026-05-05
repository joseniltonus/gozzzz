/**
 * Bloco opcional pós-cronótipo — hábitos e ritmo, sem diagnóstico.
 * Não altera o animal do quiz principal; complementa com leituras prudentes.
 */
import type { ChronotypeKey } from '@/data/chronotypesIntelligence';
import type { ChronotypeResultLocale } from '@/data/chronotypeResultPremium';

export type RefineStepId = 'wake_weekend' | 'post_lunch' | 'peak_complex';

export type RefineOptionId =
  | 'wake_weekend_earlier'
  | 'wake_weekend_same'
  | 'wake_weekend_later'
  | 'postlunch_yes'
  | 'postlunch_sometimes'
  | 'postlunch_rare'
  | 'complex_morning'
  | 'complex_midday'
  | 'complex_evening';

export type RefineUiCopy = {
  collapsedTitle: string;
  collapsedSubtitle: string;
  collapsedMeta: string;
  collapsedCta: string;
  activeBadge: string;
  doneTitle: string;
  doneLead: string;
  doneFoot: string;
  doneDismiss: string;
};

const UI_PT: RefineUiCopy = {
  collapsedTitle: 'Afinar o teu perfil',
  collapsedSubtitle:
    'Três toques opcionais (~30 s). Cruzamos hábitos com o teu cronótipo para sugestões mais claras — não substituem avaliação médica.',
  collapsedMeta: 'Opcional · ciência do sono e hábitos',
  collapsedCta: 'Afinar agora',
  activeBadge: 'Afinar',
  doneTitle: 'Leitura complementar',
  doneLead: 'Com base nas tuas respostas (e no teu cronótipo), isto costuma ser relevante:',
  doneFoot: 'Estas notas são educativas. Para queixas persistentes, fala com um profissional de saúde.',
  doneDismiss: 'Fechar',
};

const UI_EN: RefineUiCopy = {
  collapsedTitle: 'Refine your profile',
  collapsedSubtitle:
    'Three optional taps (~30 s). We cross-check habits with your chronotype for clearer guidance — not a medical assessment.',
  collapsedMeta: 'Optional · sleep science & habits',
  collapsedCta: 'Refine now',
  activeBadge: 'Refine',
  doneTitle: 'Complementary read',
  doneLead: 'Based on your answers (and your chronotype), this often matters:',
  doneFoot: 'These notes are educational. For persistent issues, talk to a health professional.',
  doneDismiss: 'Done',
};

export function getRefineUiCopy(locale: ChronotypeResultLocale): RefineUiCopy {
  return locale === 'en' ? UI_EN : UI_PT;
}

export type RefineStep = {
  id: RefineStepId;
  q_pt: string;
  q_en: string;
  sub_pt: string;
  sub_en: string;
  options: readonly {
    id: RefineOptionId;
    emoji: string;
    label_pt: string;
    label_en: string;
  }[];
};

export const REFINE_STEPS: readonly RefineStep[] = [
  {
    id: 'wake_weekend',
    q_pt: 'Num dia sem alarme e sem trabalho, costumas acordar…',
    q_en: 'On a day off with no alarm, you usually wake up…',
    sub_pt: 'Compara com um dia útil típico',
    sub_en: 'Compared to a typical workday',
    options: [
      { id: 'wake_weekend_earlier', emoji: '🌅', label_pt: 'Mais cedo', label_en: 'Earlier' },
      { id: 'wake_weekend_same', emoji: '☀️', label_pt: 'Perto da mesma hora', label_en: 'About the same time' },
      { id: 'wake_weekend_later', emoji: '🌙', label_pt: 'Mais tarde', label_en: 'Later' },
    ],
  },
  {
    id: 'post_lunch',
    q_pt: 'Sem cafeína, sentes um “baixo” claro depois do almoço?',
    q_en: 'Without caffeine, do you feel a clear dip after lunch?',
    sub_pt: 'Honestidade ajuda a afinar dicas',
    sub_en: 'Honest answers sharpen tips',
    options: [
      { id: 'postlunch_yes', emoji: '📉', label_pt: 'Sim, com frequência', label_en: 'Yes, often' },
      { id: 'postlunch_sometimes', emoji: '〰️', label_pt: 'Às vezes', label_en: 'Sometimes' },
      { id: 'postlunch_rare', emoji: '✓', label_pt: 'Raramente ou nunca', label_en: 'Rarely or never' },
    ],
  },
  {
    id: 'peak_complex',
    q_pt: 'Para resolver algo exigente, quando te sentes mais a posto?',
    q_en: 'For demanding work, when do you feel most on your game?',
    sub_pt: 'Não há resposta “certa”',
    sub_en: 'There is no “wrong” answer',
    options: [
      { id: 'complex_morning', emoji: '🌤️', label_pt: 'Manhã', label_en: 'Morning' },
      { id: 'complex_midday', emoji: '📊', label_pt: 'Entre almoço e fim da tarde', label_en: 'Midday to late afternoon' },
      { id: 'complex_evening', emoji: '🌆', label_pt: 'Noite / antes de dormir', label_en: 'Evening / before bed' },
    ],
  },
] as const;

type InsightRule = {
  /** Mais específico = menor número = avaliado primeiro */
  priority: number;
  match: (c: ChronotypeKey, a: readonly RefineOptionId[]) => boolean;
  pt: string;
  en: string;
};

const REFINE_RULES: readonly InsightRule[] = [
  {
    priority: 10,
    match: (c, a) =>
      a.includes('wake_weekend_later') && (c === 'wolf' || c === 'dolphin'),
    pt: 'Dormir mais tarde ao fim de semana costuma ir de par com ritmos mais “tardios”; luz e horário estáveis ao acordar nos dias úteis ajudam a alinhar o relógio social.',
    en: 'Sleeping in on weekends often pairs with later rhythms; steady wake time and morning light on weekdays help align the social clock.',
  },
  {
    priority: 11,
    match: (c, a) => a.includes('wake_weekend_later') && c === 'bear',
    pt: 'Mesmo com perfil “diurno”, um despertar bem mais tardio ao fim de semana pode suavizar-se com luz matinal nos dois primeiros dias da semana.',
    en: 'Even with a daytime profile, a much later weekend wake can be smoothed with morning light early in the week.',
  },
  {
    priority: 20,
    match: (c, a) => a.includes('wake_weekend_earlier') && (c === 'lion' || c === 'bear'),
    pt: 'Acordar mais cedo ao livre encaixa com picos matinais; cuidado para não “puxar” demais a noite — o corpo ainda precisa de tempo de desligar.',
    en: 'Earlier wake on days off fits morning peaks; still leave enough wind-down time at night.',
  },
  {
    priority: 30,
    match: (c, a) => a.includes('postlunch_yes') && (c === 'bear' || c === 'lion'),
    pt: 'Um vale pós-almoço é comum; luz, ar e um movimento curto costumam ajudar sem depender só de cafeína.',
    en: 'A post-lunch dip is common; light, air, and brief movement often help without relying only on caffeine.',
  },
  {
    priority: 31,
    match: (c, a) => a.includes('postlunch_yes') && (c === 'wolf' || c === 'dolphin'),
    pt: 'Se o teu pico é mais tarde, o contraste com a tarde pode parecer forte; pausas curtas e luz controlada marcam a diferença.',
    en: 'If your peak is later, the afternoon contrast can feel sharp; short breaks and controlled light help.',
  },
  {
    priority: 40,
    match: (c, a) => a.includes('complex_evening') && (c === 'wolf' || c === 'dolphin'),
    pt: 'Trabalho exigente à noite mantém o cérebro em modo “resolução”; antecipar o desligamento (luz baixa, rotina fixa) costuma ajudar o adormecer.',
    en: 'Demanding work at night keeps the brain in “problem-solving” mode; earlier wind-down (dim light, fixed cues) often helps sleep onset.',
  },
  {
    priority: 41,
    match: (c, a) => a.includes('complex_evening') && c === 'lion',
    pt: 'Se o teu cronótipo é matinal mas o trabalho pesado cai à noite, observa contexto (telas, silêncio): às vezes é hábito, não só biologia.',
    en: 'If you are morning-oriented but heavy work lands at night, check context (screens, quiet)—habits matter alongside biology.',
  },
  {
    priority: 42,
    match: (c, a) => a.includes('complex_morning') && (c === 'wolf' || c === 'dolphin'),
    pt: 'Concentrares o mais difícil de manhã pode funcionar; se à noite ainda rendes muito, equilibra com um “fecho” claro do dia.',
    en: 'Hard tasks in the morning can work; if you still perform late, add a clear “close” to the day.',
  },
  {
    priority: 50,
    match: (c, a) => a.includes('wake_weekend_same'),
    pt: 'Estabilidade entre dias livres e úteis é um dos melhores preditores de sono mais regular — um bom sinal para manter.',
    en: 'Stable timing between off days and workdays is one of the best predictors of steadier sleep—worth keeping.',
  },
  {
    priority: 60,
    match: (c, a) => a.includes('postlunch_rare'),
    pt: 'Menos queda pós-almoço pode dar margem para foco contínuo; ainda assim, pausas curtas protegem a tensão acumulada.',
    en: 'Less afternoon dip can mean steadier focus; short breaks still help manage accumulated strain.',
  },
];

const FALLBACK_PT: Record<ChronotypeKey, string> = {
  dolphin:
    'Combinar menos estímulo intenso à noite com horário de deitar previsível costuma ser o melhor próximo passo prático.',
  bear: 'Manter horários de sono e luz natural de manhã costuma ser o maior multiplicador para quem segue o ritmo do dia.',
  lion: 'Proteger as manhãs para o que exige mais energia e aceitar um desacelerar mais cedo à noite costuma aliviar tensão acumulada.',
  wolf: 'Luz forte ao acordar e limitar telas muito tarde quando o objetivo é dormir costuma reduzir o atrito com horários “cedo”.',
};

const FALLBACK_EN: Record<ChronotypeKey, string> = {
  dolphin: 'Less intense stimulation at night plus a predictable bedtime is often the best next practical step.',
  bear: 'Regular sleep timing plus morning natural light is often the biggest multiplier for daytime-aligned rhythms.',
  lion: 'Protect mornings for demanding work and allow an earlier evening wind-down—this often eases built-up tension.',
  wolf: 'Bright light at wake-up and limiting very late screens when sleep is the goal usually reduce friction with early schedules.',
};

export function buildRefineInsights(
  chronotypeKey: ChronotypeKey,
  answers: readonly RefineOptionId[],
  locale: ChronotypeResultLocale,
): string[] {
  const sorted = [...REFINE_RULES].sort((x, y) => x.priority - y.priority);
  const out: string[] = [];
  const pick = (s: string) => {
    if (out.length >= 3) return;
    if (!out.includes(s)) out.push(s);
  };
  for (const rule of sorted) {
    if (rule.match(chronotypeKey, answers)) {
      pick(locale === 'en' ? rule.en : rule.pt);
    }
  }
  if (out.length === 0) {
    pick(locale === 'en' ? FALLBACK_EN[chronotypeKey] : FALLBACK_PT[chronotypeKey]);
  }
  if (out.length < 2) {
    const fb = locale === 'en' ? FALLBACK_EN[chronotypeKey] : FALLBACK_PT[chronotypeKey];
    if (!out.includes(fb)) pick(fb);
  }
  if (out.length < 2) {
    const bridge =
      locale === 'en'
        ? 'Small daily tweaks usually beat occasional “big resets”.'
        : 'Pequenos ajustes diários costumam vencer “grandes mudanças” de vez em quando.';
    pick(bridge);
  }
  return out.slice(0, 3);
}
