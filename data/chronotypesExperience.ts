/**
 * GoZzzz — experiência premium de resultado (2 ecrãs + partilhas + TikTok).
 * Conteúdo editorial; sem percentagens inventadas.
 */

export const CHRONOTYPE_EXP_KEYS = ['dolphin', 'bear', 'lion', 'wolf'] as const;
export type ChronotypeExpKey = (typeof CHRONOTYPE_EXP_KEYS)[number];

export type TraitIconKey =
  | 'brain'
  | 'moon'
  | 'bolt'
  | 'sun'
  | 'clock'
  | 'users'
  | 'sunrise'
  | 'target'
  | 'check'
  | 'sparkles';

export type ChronotypeColor = 'blue' | 'green' | 'orange' | 'purple';

export type LocaleChronotypeBlock = {
  emoji: string;
  name: string;
  subtitle: string;
  color: ChronotypeColor;
  traits: readonly { icon: TraitIconKey; title: string }[];
  cause: readonly { icon: TraitIconKey; line: string }[];
  solutions: readonly { icon: TraitIconKey; line: string }[];
  insight: string;
  final: string;
  story: { short: string; curiosity: string };
  /** Curva energia manhã/noite 0–100 (visual simples) */
  energy: { morning: number; night: number };
  energyCaption: string;
  sectionIdentity: string;
  sectionWhy: string;
  sectionCauses: string;
  sectionFixes: string;
  ctaUnderstand: string;
  ctaDay1: string;
  landingTagline: string;
  tiktok: { hook: string; identify: string; explain: string; cta: string };
};

const pt = {
  dolphin: {
    emoji: '🐬',
    name: 'Golfinho Desperto',
    subtitle: 'Sua mente não desliga facilmente — especialmente à noite.',
    color: 'blue' as const,
    traits: [
      { icon: 'brain' as const, title: 'Mente acelerada' },
      { icon: 'moon' as const, title: 'Sono leve' },
      { icon: 'bolt' as const, title: 'Sempre em alerta' },
    ],
    cause: [
      { icon: 'moon' as const, line: 'Demora para adormecer' },
      { icon: 'bolt' as const, line: 'Acorda com facilidade' },
      { icon: 'brain' as const, line: 'Mente ativa na cama' },
    ],
    solutions: [
      { icon: 'moon' as const, line: 'Reduzir estímulos à noite' },
      { icon: 'brain' as const, line: 'Desacelerar a mente' },
      { icon: 'clock' as const, line: 'Criar rotina consistente' },
    ],
    insight: 'Isso não é falta de disciplina. É como seu cérebro funciona.',
    final: 'Você não precisa fazer mais. Precisa aprender a desligar melhor.',
    story: {
      short: 'Minha mente não desliga à noite',
      curiosity: 'Isso explica por que eu não durmo bem',
    },
    energy: { morning: 55, night: 88 },
    energyCaption: 'Alerta costuma permanecer alto quando o corpo já pede descanso.',
    sectionIdentity: 'Como sua mente funciona',
    sectionWhy: 'Por que isso acontece?',
    sectionCauses: 'O que isso causa?',
    sectionFixes: 'O que resolve?',
    ctaUnderstand: 'Entendi — como melhorar?',
    ctaDay1: 'Começar Dia 1',
    landingTagline: 'Alta vigilância à noite',
    tiktok: {
      hook: 'Se você demora a dormir e a mente não para, veja isso.',
      identify: 'Você pode ser Golfinho Desperto.',
      explain: 'Não é preguiça: é um padrão de alerta que compete com o sono.',
      cta: 'Descubra o seu → gozzzz.app',
    },
  },
  bear: {
    emoji: '🐻',
    name: 'Urso Equilibrado',
    subtitle: 'Seu corpo segue o ritmo natural do dia.',
    color: 'green' as const,
    traits: [
      { icon: 'sun' as const, title: 'Energia estável' },
      { icon: 'clock' as const, title: 'Rotina natural' },
      { icon: 'users' as const, title: 'Alta adaptação' },
    ],
    cause: [
      { icon: 'sun' as const, line: 'Queda leve à tarde' },
      { icon: 'moon' as const, line: 'Sono previsível' },
      { icon: 'bolt' as const, line: 'Funciona melhor de dia' },
    ],
    solutions: [
      { icon: 'sunrise' as const, line: 'Aproveitar manhã' },
      { icon: 'moon' as const, line: 'Evitar excesso à noite' },
      { icon: 'clock' as const, line: 'Manter consistência' },
    ],
    insight: 'Seu ritmo já é sua vantagem.',
    final: 'Consistência é o que mantém seu desempenho.',
    story: {
      short: 'Meu corpo segue o ritmo natural',
      curiosity: 'Quando respeito isso, tudo flui',
    },
    energy: { morning: 72, night: 48 },
    energyCaption: 'Energia acompanha a luz: pico diurno e queda suave à noite.',
    sectionIdentity: 'Como sua mente funciona',
    sectionWhy: 'Por que isso acontece?',
    sectionCauses: 'O que isso causa?',
    sectionFixes: 'O que resolve?',
    ctaUnderstand: 'Entendi — como melhorar?',
    ctaDay1: 'Começar Dia 1',
    landingTagline: 'Ritmo solar estável',
    tiktok: {
      hook: 'Se você funciona bem de dia e quer manter o ritmo, veja isso.',
      identify: 'Você pode ser Urso Equilibrado.',
      explain: 'Seu relógio biológico tende a seguir o dia — consistência amplifica isso.',
      cta: 'Descubra o seu → gozzzz.app',
    },
  },
  lion: {
    emoji: '🦁',
    name: 'Leão Disciplinado',
    subtitle: 'Seu pico de desempenho acontece cedo.',
    color: 'orange' as const,
    traits: [
      { icon: 'sunrise' as const, title: 'Alta energia cedo' },
      { icon: 'target' as const, title: 'Execução rápida' },
      { icon: 'check' as const, title: 'Foco matinal' },
    ],
    cause: [
      { icon: 'sunrise' as const, line: 'Acorda com facilidade' },
      { icon: 'moon' as const, line: 'Cansa cedo' },
      { icon: 'bolt' as const, line: 'Queda à noite' },
    ],
    solutions: [
      { icon: 'sunrise' as const, line: 'Proteger manhã' },
      { icon: 'target' as const, line: 'Priorizar tarefas cedo' },
      { icon: 'moon' as const, line: 'Dormir mais cedo' },
    ],
    insight: 'Seu poder está no início do dia.',
    final: 'Quem domina a manhã, domina o dia.',
    story: {
      short: 'Eu funciono melhor antes de todo mundo',
      curiosity: 'Minhas manhãs definem meu dia',
    },
    energy: { morning: 92, night: 32 },
    energyCaption: 'Pico cedo: máxima energia na primeira metade do dia.',
    sectionIdentity: 'Como sua mente funciona',
    sectionWhy: 'Por que isso acontece?',
    sectionCauses: 'O que isso causa?',
    sectionFixes: 'O que resolve?',
    ctaUnderstand: 'Entendi — como melhorar?',
    ctaDay1: 'Começar Dia 1',
    landingTagline: 'Pico ao amanhecer',
    tiktok: {
      hook: 'Se você acorda disposto e cansa à noite, veja isso.',
      identify: 'Você pode ser Leão Disciplinado.',
      explain: 'Cronotipo matinal: agir cedo alinha esforço com o seu pico natural.',
      cta: 'Descubra o seu → gozzzz.app',
    },
  },
  wolf: {
    emoji: '🐺',
    name: 'Lobo Noturno',
    subtitle: 'Sua energia cresce quando o dia termina.',
    color: 'purple' as const,
    traits: [
      { icon: 'moon' as const, title: 'Pico noturno' },
      { icon: 'sparkles' as const, title: 'Criatividade alta' },
      { icon: 'brain' as const, title: 'Pensamento profundo' },
    ],
    cause: [
      { icon: 'sun' as const, line: 'Dificuldade cedo' },
      { icon: 'bolt' as const, line: 'Energia à noite' },
      { icon: 'brain' as const, line: 'Foco tardio' },
    ],
    solutions: [
      { icon: 'sun' as const, line: 'Ajuste gradual' },
      { icon: 'sunrise' as const, line: 'Exposição à luz cedo' },
      { icon: 'moon' as const, line: 'Evitar telas tarde' },
    ],
    insight: 'Seu ritmo é diferente, não errado.',
    final: 'Use a noite com estratégia.',
    story: {
      short: 'Minha energia começa quando a dos outros acaba',
      curiosity: 'A noite é meu diferencial',
    },
    energy: { morning: 38, night: 90 },
    energyCaption: 'Energia sobe à noite: comum em cronotipos mais tardios.',
    sectionIdentity: 'Como sua mente funciona',
    sectionWhy: 'Por que isso acontece?',
    sectionCauses: 'O que isso causa?',
    sectionFixes: 'O que resolve?',
    ctaUnderstand: 'Entendi — como melhorar?',
    ctaDay1: 'Começar Dia 1',
    landingTagline: 'Energia à noite',
    tiktok: {
      hook: 'Se você só “liga” de noite, veja isso.',
      identify: 'Você pode ser Lobo Noturno.',
      explain: 'Atraso de fase: criatividade e foco podem concentrar-se no fim do dia.',
      cta: 'Descubra o seu → gozzzz.app',
    },
  },
} satisfies Record<ChronotypeExpKey, LocaleChronotypeBlock>;

const en: Record<ChronotypeExpKey, LocaleChronotypeBlock> = {
  dolphin: {
    emoji: '🐬',
    name: 'Alert Dolphin',
    subtitle: 'Your mind does not switch off easily — especially at night.',
    color: 'blue',
    traits: [
      { icon: 'brain', title: 'Fast mind' },
      { icon: 'moon', title: 'Light sleep' },
      { icon: 'bolt', title: 'Always on guard' },
    ],
    cause: [
      { icon: 'moon', line: 'Takes long to fall asleep' },
      { icon: 'bolt', line: 'Wakes easily' },
      { icon: 'brain', line: 'Active mind in bed' },
    ],
    solutions: [
      { icon: 'moon', line: 'Reduce night stimulation' },
      { icon: 'brain', line: 'Slow the mind down' },
      { icon: 'clock', line: 'Build a steady routine' },
    ],
    insight: 'This is not lack of discipline. It is how your brain works.',
    final: 'You do not need to do more. You need to learn to switch off better.',
    story: {
      short: 'My mind does not switch off at night',
      curiosity: 'That is why I do not sleep well',
    },
    energy: { morning: 55, night: 88 },
    energyCaption: 'Alertness often stays high when the body already asks for rest.',
    sectionIdentity: 'How your mind works',
    sectionWhy: 'Why does this happen?',
    sectionCauses: 'What does it cause?',
    sectionFixes: 'What helps?',
    ctaUnderstand: 'Got it — how do I improve?',
    ctaDay1: 'Start Day 1',
    landingTagline: 'High night vigilance',
    tiktok: {
      hook: 'If you cannot fall asleep and your mind races, watch this.',
      identify: 'You might be an Alert Dolphin.',
      explain: 'Not laziness: it is an alert pattern competing with sleep.',
      cta: 'Find yours → gozzzz.app',
    },
  },
  bear: {
    emoji: '🐻',
    name: 'Balanced Bear',
    subtitle: 'Your body follows the natural rhythm of the day.',
    color: 'green',
    traits: [
      { icon: 'sun', title: 'Stable energy' },
      { icon: 'clock', title: 'Natural routine' },
      { icon: 'users', title: 'High adaptation' },
    ],
    cause: [
      { icon: 'sun', line: 'Mild afternoon dip' },
      { icon: 'moon', line: 'Predictable sleep' },
      { icon: 'bolt', line: 'Best performance by day' },
    ],
    solutions: [
      { icon: 'sunrise', line: 'Use the morning' },
      { icon: 'moon', line: 'Avoid excess at night' },
      { icon: 'clock', line: 'Stay consistent' },
    ],
    insight: 'Your rhythm is already your edge.',
    final: 'Consistency is what keeps your performance.',
    story: {
      short: 'My body follows the natural rhythm',
      curiosity: 'When I respect that, everything flows',
    },
    energy: { morning: 72, night: 48 },
    energyCaption: 'Energy follows light: daytime peak and a gentle night wind-down.',
    sectionIdentity: 'How your mind works',
    sectionWhy: 'Why does this happen?',
    sectionCauses: 'What does it cause?',
    sectionFixes: 'What helps?',
    ctaUnderstand: 'Got it — how do I improve?',
    ctaDay1: 'Start Day 1',
    landingTagline: 'Solar-stable rhythm',
    tiktok: {
      hook: 'If you feel good by day and want to keep the rhythm, watch this.',
      identify: 'You might be a Balanced Bear.',
      explain: 'Your clock tends to follow the day — consistency amplifies it.',
      cta: 'Find yours → gozzzz.app',
    },
  },
  lion: {
    emoji: '🦁',
    name: 'Disciplined Lion',
    subtitle: 'Your performance peak happens early.',
    color: 'orange',
    traits: [
      { icon: 'sunrise', title: 'High early energy' },
      { icon: 'target', title: 'Fast execution' },
      { icon: 'check', title: 'Morning focus' },
    ],
    cause: [
      { icon: 'sunrise', line: 'Wakes easily' },
      { icon: 'moon', line: 'Tires early' },
      { icon: 'bolt', line: 'Evening dip' },
    ],
    solutions: [
      { icon: 'sunrise', line: 'Protect mornings' },
      { icon: 'target', line: 'Prioritize tasks early' },
      { icon: 'moon', line: 'Sleep earlier' },
    ],
    insight: 'Your power is at the start of the day.',
    final: 'Own the morning, own the day.',
    story: {
      short: 'I work best before everyone else',
      curiosity: 'My mornings define my day',
    },
    energy: { morning: 92, night: 32 },
    energyCaption: 'Early peak: strongest energy in the first half of the day.',
    sectionIdentity: 'How your mind works',
    sectionWhy: 'Why does this happen?',
    sectionCauses: 'What does it cause?',
    sectionFixes: 'What helps?',
    ctaUnderstand: 'Got it — how do I improve?',
    ctaDay1: 'Start Day 1',
    landingTagline: 'Dawn peak',
    tiktok: {
      hook: 'If you wake up sharp and fade at night, watch this.',
      identify: 'You might be a Disciplined Lion.',
      explain: 'Morning type: acting early matches your natural peak.',
      cta: 'Find yours → gozzzz.app',
    },
  },
  wolf: {
    emoji: '🐺',
    name: 'Night Wolf',
    subtitle: 'Your energy rises when the day winds down.',
    color: 'purple',
    traits: [
      { icon: 'moon', title: 'Night peak' },
      { icon: 'sparkles', title: 'High creativity' },
      { icon: 'brain', title: 'Deep thinking' },
    ],
    cause: [
      { icon: 'sun', line: 'Hard early start' },
      { icon: 'bolt', line: 'Energy at night' },
      { icon: 'brain', line: 'Late focus' },
    ],
    solutions: [
      { icon: 'sun', line: 'Gradual adjustment' },
      { icon: 'sunrise', line: 'Morning light exposure' },
      { icon: 'moon', line: 'Limit late screens' },
    ],
    insight: 'Your rhythm is different, not wrong.',
    final: 'Use the night with strategy.',
    story: {
      short: 'My energy starts when everyone else runs out',
      curiosity: 'The night is my edge',
    },
    energy: { morning: 38, night: 90 },
    energyCaption: 'Energy rises at night: common in later chronotypes.',
    sectionIdentity: 'How your mind works',
    sectionWhy: 'Why does this happen?',
    sectionCauses: 'What does it cause?',
    sectionFixes: 'What helps?',
    ctaUnderstand: 'Got it — how do I improve?',
    ctaDay1: 'Start Day 1',
    landingTagline: 'Night energy',
    tiktok: {
      hook: 'If you only “turn on” at night, watch this.',
      identify: 'You might be a Night Wolf.',
      explain: 'Delayed phase: creativity and focus can cluster late in the day.',
      cta: 'Find yours → gozzzz.app',
    },
  },
};

export const chronotypesExperience: Record<ChronotypeExpKey, { pt: LocaleChronotypeBlock; en: LocaleChronotypeBlock }> =
  {
    dolphin: { pt: pt.dolphin, en: en.dolphin },
    bear: { pt: pt.bear, en: en.bear },
    lion: { pt: pt.lion, en: en.lion },
    wolf: { pt: pt.wolf, en: en.wolf },
  };

export function getChronotypeExperience(
  key: ChronotypeExpKey,
  locale: 'pt' | 'en' = 'pt',
): LocaleChronotypeBlock {
  return chronotypesExperience[key][locale];
}

export function normalizeChronotypeExpKey(raw?: string | string[] | null): ChronotypeExpKey | null {
  if (!raw) return null;
  const v = String(Array.isArray(raw) ? raw[0] : raw)
    .trim()
    .toLowerCase();
  if (v === 'dolphin' || v === 'golfinho') return 'dolphin';
  if (v === 'bear' || v === 'urso') return 'bear';
  if (v === 'lion' || v === 'leão' || v === 'leao') return 'lion';
  if (v === 'wolf' || v === 'lobo') return 'wolf';
  return null;
}

export function tiktokScriptText(block: LocaleChronotypeBlock): string {
  const { hook, identify, explain, cta } = block.tiktok;
  return `${hook}\n\n${identify}\n${explain}\n\n${cta}`;
}
