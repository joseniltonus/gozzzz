/**
 * Conteúdo da tela de resultado premium — alinhado a traços comportamentais
 * de cronobiologia/sono, sem hormonas, sem estatísticas inventadas.
 *
 * Fonte de chaves: `ChronotypeKey` em `chronotypesIntelligence.ts`.
 */
import type { ChronotypeKey } from '@/data/chronotypesIntelligence';

export type ChronotypeResultLocale = 'pt' | 'en';

export type ChronotypeResultAccent = {
  primary: string;
  primarySoft: string;
  bar: string;
  barMuted: string;
};

/** Curva ilustrativa (5 pontos, 0–1): manhã → noite. Só visual, sem dados clínicos. */
export const chronotypeResultEnergyCurve: Record<ChronotypeKey, readonly [number, number, number, number, number]> = {
  /** Pico de alerta mais tardio */
  dolphin: [0.32, 0.38, 0.44, 0.62, 0.88],
  /** Plataforma com ligeiro vale ao meio-dia */
  bear: [0.52, 0.62, 0.42, 0.55, 0.48],
  /** Pico matinal, declive à noite */
  lion: [0.88, 0.72, 0.52, 0.4, 0.34],
  /** Pico de energia mais tardio */
  wolf: [0.28, 0.34, 0.46, 0.68, 0.9],
};

export const chronotypeResultAccent: Record<ChronotypeKey, ChronotypeResultAccent> = {
  dolphin: {
    primary: '#7dd3fc',
    primarySoft: 'rgba(125,211,252,0.18)',
    bar: 'rgba(125,211,252,0.85)',
    barMuted: 'rgba(125,211,252,0.22)',
  },
  bear: {
    primary: '#6ee7b7',
    primarySoft: 'rgba(110,231,183,0.18)',
    bar: 'rgba(110,231,183,0.85)',
    barMuted: 'rgba(110,231,183,0.22)',
  },
  lion: {
    primary: '#fdba74',
    primarySoft: 'rgba(253,186,116,0.2)',
    bar: 'rgba(253,186,116,0.9)',
    barMuted: 'rgba(253,186,116,0.25)',
  },
  wolf: {
    primary: '#a78bfa',
    primarySoft: 'rgba(167,139,250,0.2)',
    bar: 'rgba(167,139,250,0.88)',
    barMuted: 'rgba(167,139,250,0.24)',
  },
};

type LocaleBlock = {
  sections: {
    mind: string;
    why: string;
    effects: string;
    solutions: string;
    curveMorning: string;
    curveNight: string;
  };
  name: string;
  subtitle: string;
  mindCards: readonly [string, string, string];
  whyBody: string;
  effects: readonly [string, string, string];
  solutions: readonly [string, string, string];
  insight: string;
  scienceFoot: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const PT: Record<ChronotypeKey, LocaleBlock> = {
  dolphin: {
    sections: {
      mind: 'Como sua mente funciona',
      why: 'Por que isso acontece',
      effects: 'O que isso causa',
      solutions: 'O que costuma ajudar',
      curveMorning: 'Manhã',
      curveNight: 'Noite',
    },
    name: 'Golfinho',
    subtitle: 'Sua mente pode permanecer mais ativa quando o corpo pede descanso.',
    mindCards: ['🧠 Mente mais ativa à noite', '🌙 Sono mais leve', '⚡ Mais vigilância à noite'],
    whyBody:
      'Em muitas pessoas com este padrão, o ritmo entre alerta e sono é mais sensível ao final do dia.',
    effects: ['Mais dificuldade em adormecer', 'Sono mais fragmentado', 'Acordar menos repousado'],
    solutions: ['Menos estímulos fortes à noite', 'Horário de deitar regular', 'Desacelerar gradualmente antes de dormir'],
    insight: 'Isto não é falta de disciplina. É um padrão que pode ser apoiado com hábitos consistentes.',
    scienceFoot: 'Baseado em ciência do sono e cronobiologia.',
    ctaPrimary: 'Começar Dia 1',
    ctaSecondary: 'Entender melhor o meu perfil',
  },
  bear: {
    sections: {
      mind: 'Como sua mente funciona',
      why: 'Por que isso acontece',
      effects: 'O que isso causa',
      solutions: 'O que costuma ajudar',
      curveMorning: 'Manhã',
      curveNight: 'Noite',
    },
    name: 'Urso',
    subtitle: 'O teu ritmo tende a acompanhar o dia com energia estável.',
    mindCards: ['☀️ Alinhamento ao ciclo do dia', '📊 Energia relativamente estável', '☕ Ligeiro baixo à tarde'],
    whyBody:
      'Muitas pessoas seguem um padrão próximo do ciclo de luz e escuridão, com variações modestas ao longo do dia.',
    effects: ['Menos “picos extremos”', 'Baixa de energia suave após o almoço', 'Sono mais previsível quando há rotina'],
    solutions: ['Luz natural de manhã', 'Pausa curta à tarde', 'Horários de sono regulares'],
    insight: 'A tua consistência é uma base forte — pequenos ajustes costumam fazer grande diferença.',
    scienceFoot: 'Baseado em ciência do sono e cronobiologia.',
    ctaPrimary: 'Começar Dia 1',
    ctaSecondary: 'Entender melhor o meu perfil',
  },
  lion: {
    sections: {
      mind: 'Como sua mente funciona',
      why: 'Por que isso acontece',
      effects: 'O que isso causa',
      solutions: 'O que costuma ajudar',
      curveMorning: 'Manhã',
      curveNight: 'Noite',
    },
    name: 'Leão',
    subtitle: 'O teu melhor desempenho costuma aparecer cedo; a noite pede mais descanso.',
    mindCards: ['🌅 Pico de energia mais cedo', '⏰ Acordar com mais facilidade', '🌆 Menos “fôlego” à noite'],
    whyBody:
      'Em vários perfis matutinos, o alerta máximo ocorre mais cedo e o corpo prepara descanso mais cedo à noite.',
    effects: ['Menos energia no final do dia', 'Menos produtividade noturna', 'Risco de “forçar” a noite'],
    solutions: ['Tarefas exigentes de manhã', 'Noite com menos estímulo', 'Rotina fixa de sono'],
    insight: 'Respeitar o teu pico matinal é estratégia — não limitação.',
    scienceFoot: 'Baseado em ciência do sono e cronobiologia.',
    ctaPrimary: 'Começar Dia 1',
    ctaSecondary: 'Entender melhor o meu perfil',
  },
  wolf: {
    sections: {
      mind: 'Como sua mente funciona',
      why: 'Por que isso acontece',
      effects: 'O que isso causa',
      solutions: 'O que costuma ajudar',
      curveMorning: 'Manhã',
      curveNight: 'Noite',
    },
    name: 'Lobo',
    subtitle: 'A tua energia sobe mais tarde; manhãs cedo pedem mais transição.',
    mindCards: ['🌙 Pico de energia mais tarde', '😴 Acordar cedo custa mais', '✨ Mais criatividade à noite'],
    whyBody:
      'Em perfis mais tardios, o ritmo de alerta e sono tende a deslocar-se para mais tarde no relógio social.',
    effects: ['Manhã com mais inércia', 'Noites mais produtivas', 'Conflito com horários “cedo” fixos'],
    solutions: ['Luz forte de manhã ao acordar', 'Evitar telas muito tarde quando queres adormecer', 'Pequena rotina de “fecho” do dia'],
    insight: 'Não és “preguiçoso” — o teu ritmo pede alinhamento, não culpa.',
    scienceFoot: 'Baseado em ciência do sono e cronobiologia.',
    ctaPrimary: 'Começar Dia 1',
    ctaSecondary: 'Entender melhor o meu perfil',
  },
};

const EN: Record<ChronotypeKey, LocaleBlock> = {
  dolphin: {
    sections: {
      mind: 'How your mind tends to work',
      why: 'Why this happens',
      effects: 'What this tends to cause',
      solutions: 'What usually helps',
      curveMorning: 'Morning',
      curveNight: 'Night',
    },
    name: 'Dolphin',
    subtitle: 'Your mind may stay more active when your body asks for rest.',
    mindCards: ['🧠 More mental activity at night', '🌙 Lighter sleep', '⚡ More evening vigilance'],
    whyBody:
      'For many people with this pattern, the balance between alertness and sleep is more sensitive later in the day.',
    effects: ['Harder time falling asleep', 'More fragmented sleep', 'Waking less refreshed'],
    solutions: ['Fewer strong stimuli at night', 'A regular bedtime', 'A gradual wind-down before sleep'],
    insight: 'This is not a lack of discipline. It is a pattern that habits can support over time.',
    scienceFoot: 'Grounded in sleep science and chronobiology.',
    ctaPrimary: 'Start Day 1',
    ctaSecondary: 'Learn more about my profile',
  },
  bear: {
    sections: {
      mind: 'How your mind tends to work',
      why: 'Why this happens',
      effects: 'What this tends to cause',
      solutions: 'What usually helps',
      curveMorning: 'Morning',
      curveNight: 'Night',
    },
    name: 'Bear',
    subtitle: 'Your rhythm tends to follow the day with steady energy.',
    mindCards: ['☀️ Aligned with the daylight cycle', '📊 Relatively stable energy', '☕ A mild afternoon dip'],
    whyBody:
      'Many people follow a pattern close to the light–dark cycle, with modest variation across the day.',
    effects: ['Fewer extreme peaks', 'A gentle post-lunch energy dip', 'More predictable sleep with routine'],
    solutions: ['Morning natural light', 'A short afternoon pause', 'Regular sleep times'],
    insight: 'Your steadiness is a strength — small tweaks often matter a lot.',
    scienceFoot: 'Grounded in sleep science and chronobiology.',
    ctaPrimary: 'Start Day 1',
    ctaSecondary: 'Learn more about my profile',
  },
  lion: {
    sections: {
      mind: 'How your mind tends to work',
      why: 'Why this happens',
      effects: 'What this tends to cause',
      solutions: 'What usually helps',
      curveMorning: 'Morning',
      curveNight: 'Night',
    },
    name: 'Lion',
    subtitle: 'Your best performance often arrives early; evenings ask for more rest.',
    mindCards: ['🌅 Energy peaks earlier', '⏰ Easier to wake up', '🌆 Less “fuel” late in the evening'],
    whyBody:
      'For many morning-oriented profiles, peak alertness is earlier and the body prepares for rest earlier at night.',
    effects: ['Less energy late in the day', 'Lower night productivity', 'Temptation to “push” late nights'],
    solutions: ['Demanding tasks in the morning', 'A calmer evening routine', 'A fixed sleep schedule'],
    insight: 'Honoring your morning peak is strategy — not a limitation.',
    scienceFoot: 'Grounded in sleep science and chronobiology.',
    ctaPrimary: 'Start Day 1',
    ctaSecondary: 'Learn more about my profile',
  },
  wolf: {
    sections: {
      mind: 'How your mind tends to work',
      why: 'Why this happens',
      effects: 'What this tends to cause',
      solutions: 'What usually helps',
      curveMorning: 'Morning',
      curveNight: 'Night',
    },
    name: 'Wolf',
    subtitle: 'Your energy rises later; early mornings need more transition.',
    mindCards: ['🌙 Energy peaks later', '😴 Early wake-ups feel harder', '✨ More creativity at night'],
    whyBody:
      'For later profiles, the rhythm of alertness and sleep tends to shift later on the social clock.',
    effects: ['More morning inertia', 'More productive evenings', 'Friction with fixed “early” schedules'],
    solutions: ['Bright morning light at wake-up', 'Screens late at night vs. sleep goal', 'A simple day “close-out” ritual'],
    insight: 'You are not “lazy” — your rhythm needs alignment, not blame.',
    scienceFoot: 'Grounded in sleep science and chronobiology.',
    ctaPrimary: 'Start Day 1',
    ctaSecondary: 'Learn more about my profile',
  },
};

export type ChronotypeResultPremiumPayload = LocaleBlock & {
  key: ChronotypeKey;
  accent: ChronotypeResultAccent;
  curve: readonly [number, number, number, number, number];
  emoji: string;
};

const EMOJI: Record<ChronotypeKey, string> = {
  dolphin: '🐬',
  bear: '🐻',
  lion: '🦁',
  wolf: '🐺',
};

export function getChronotypeResultPremium(
  key: ChronotypeKey,
  locale: ChronotypeResultLocale = 'pt',
): ChronotypeResultPremiumPayload {
  const copy = locale === 'en' ? EN[key] : PT[key];
  return {
    key,
    emoji: EMOJI[key],
    accent: chronotypeResultAccent[key],
    curve: chronotypeResultEnergyCurve[key],
    ...copy,
  };
}

/** Modal “Entender melhor o perfil” — linguagem prudente, sem diagnóstico. */
export type ChronotypeProfileExplainCopy = {
  title: string;
  paragraphs: readonly [string, string];
  disclaimer: string;
  closeLabel: string;
  startCtaLabel: string;
};

const EXPLAIN_PT: Record<ChronotypeKey, ChronotypeProfileExplainCopy> = {
  dolphin: {
    title: 'O teu perfil, em contexto',
    paragraphs: [
      '“Golfinho” descreve padrões frequentes na literatura de cronotipos: mais vigilância à noite e sono mais leve. É uma ferramenta para pautar rotinas — não um diagnóstico.',
      'Se o sono interfere de forma persistente na tua vida, um profissional de saúde pode ajudar a separar hábitos de outras causas.',
    ],
    disclaimer: 'Baseado em ciência do sono e cronobiologia.',
    closeLabel: 'Fechar',
    startCtaLabel: 'Começar Dia 1',
  },
  bear: {
    title: 'O teu perfil, em contexto',
    paragraphs: [
      '“Urso” aponta para um ritmo comum, próximo do ciclo dia/noite, com energia relativamente estável. Muitas pessoas encaixam aqui de forma aproximada.',
      'Mesmo num perfil “comum”, consistência de horários e luz natural continuam a contar para o descanso.',
    ],
    disclaimer: 'Baseado em ciência do sono e cronobiologia.',
    closeLabel: 'Fechar',
    startCtaLabel: 'Começar Dia 1',
  },
  lion: {
    title: 'O teu perfil, em contexto',
    paragraphs: [
      '“Leão” assinala tendência a mais energia cedo e menos fôlego à noite — uma variação normal no espectro de ritmos.',
      'Ajustar tarefas exigentes para a manhã costuma ser mais eficaz do que forçar noites longas de alta performance.',
    ],
    disclaimer: 'Baseado em ciência do sono e cronobiologia.',
    closeLabel: 'Fechar',
    startCtaLabel: 'Começar Dia 1',
  },
  wolf: {
    title: 'O teu perfil, em contexto',
    paragraphs: [
      '“Lobo” descreve um ritmo mais tardio: mais inércia de manhã e energia que sobe mais tarde. É descrição de padrão, não julgamento de carácter.',
      'Luz forte ao acordar e horários estáveis costumam ajudar quando o relógio social não coincide com o teu ritmo.',
    ],
    disclaimer: 'Baseado em ciência do sono e cronobiologia.',
    closeLabel: 'Fechar',
    startCtaLabel: 'Começar Dia 1',
  },
};

const EXPLAIN_EN: Record<ChronotypeKey, ChronotypeProfileExplainCopy> = {
  dolphin: {
    title: 'Your profile, in context',
    paragraphs: [
      '“Dolphin” summarizes common chronotype patterns: more evening vigilance and lighter sleep. It is a guide for routines — not a diagnosis.',
      'If sleep problems persist and affect your life, a health professional can help separate habits from other causes.',
    ],
    disclaimer: 'Grounded in sleep science and chronobiology.',
    closeLabel: 'Close',
    startCtaLabel: 'Start Day 1',
  },
  bear: {
    title: 'Your profile, in context',
    paragraphs: [
      '“Bear” points to a common rhythm close to the day–night cycle, with relatively steady energy. Many people fit here approximately.',
      'Even with a “common” profile, regular sleep timing and morning light still matter for rest.',
    ],
    disclaimer: 'Grounded in sleep science and chronobiology.',
    closeLabel: 'Close',
    startCtaLabel: 'Start Day 1',
  },
  lion: {
    title: 'Your profile, in context',
    paragraphs: [
      '“Lion” marks a tendency toward more energy early and less late-evening stamina — a normal variation on the rhythm spectrum.',
      'Placing demanding work earlier is often more effective than pushing late-night productivity.',
    ],
    disclaimer: 'Grounded in sleep science and chronobiology.',
    closeLabel: 'Close',
    startCtaLabel: 'Start Day 1',
  },
  wolf: {
    title: 'Your profile, in context',
    paragraphs: [
      '“Wolf” describes a later rhythm: more morning inertia and energy that rises later. It is a pattern description, not a character judgment.',
      'Bright light after wake-up and stable bedtimes often help when social schedules do not match your rhythm.',
    ],
    disclaimer: 'Grounded in sleep science and chronobiology.',
    closeLabel: 'Close',
    startCtaLabel: 'Start Day 1',
  },
};

export function getChronotypeProfileExplain(
  key: ChronotypeKey,
  locale: ChronotypeResultLocale = 'pt',
): ChronotypeProfileExplainCopy {
  return locale === 'en' ? EXPLAIN_EN[key] : EXPLAIN_PT[key];
}
