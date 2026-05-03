/**
 * GoZzzz — perfil de inteligência por cronótipo (conteúdo editorial + partilha Stories).
 * Sem percentagens nem estatísticas inventadas.
 */

export const CHRONOTYPE_KEYS = ['dolphin', 'bear', 'lion', 'wolf'] as const;
export type ChronotypeKey = (typeof CHRONOTYPE_KEYS)[number];

export type ChronotypeColor = 'blue' | 'green' | 'orange' | 'purple';

export type ChronotypeIntel = {
  emoji: string;
  name: string;
  color: ChronotypeColor;
  subtitle: string;
  signature: readonly [string, string, string, string];
  funFact: string;
  performance: string;
  insight: string;
  story: {
    title: string;
    line1: string;
    line2: string;
  };
  /** Rótulo curto para cartões “outros perfis” */
  spectrumLabel: string;
};

export const chronotypes: Record<ChronotypeKey, ChronotypeIntel> = {
  dolphin: {
    emoji: '🐬',
    name: 'Golfinho Desperto',
    color: 'blue',
    subtitle: 'Você opera em um modo de alta vigilância cognitiva.',
    signature: [
      'Processamento profundo e contínuo',
      'Alta sensibilidade a estímulos',
      'Padrão de sono fragmentado',
      'Precisão e autocobrança elevadas',
    ],
    funFact:
      'O cortisol segue um ritmo natural: alto pela manhã e baixo à noite. Estados de alerta noturno estão associados a padrões de insônia.',
    performance: 'Seu diferencial está em regular o desligamento com precisão.',
    insight: 'Alta percepção sem recuperação adequada gera ruído.',
    story: {
      title: '🐬 Golfinho — GoZzzz Profile',
      line1: 'Mente em estado de vigilância contínua',
      line2: 'Nem todos desaceleram à noite',
    },
    spectrumLabel: 'Vigilância cognitiva',
  },
  bear: {
    emoji: '🐻',
    name: 'Urso Equilibrado',
    color: 'green',
    subtitle: 'Seu corpo segue o ritmo natural do dia.',
    signature: [
      'Energia alinhada ao ciclo solar',
      'Sono consistente e previsível',
      'Boa estabilidade ao longo do dia',
      'Alta adaptabilidade social',
    ],
    funFact:
      'A maioria das pessoas segue um padrão circadiano alinhado à luz solar, com maior alerta durante o dia.',
    performance: 'Maximize suas horas de luz — seu pico já é natural.',
    insight: 'Consistência é sua maior vantagem competitiva.',
    story: {
      title: '🐻 Urso — GoZzzz Profile',
      line1: 'Meu corpo segue o ritmo natural',
      line2: 'Quando respeito isso, tudo flui',
    },
    spectrumLabel: 'Ritmo natural',
  },
  lion: {
    emoji: '🦁',
    name: 'Leão Disciplinado',
    color: 'orange',
    subtitle: 'Seu desempenho máximo acontece cedo.',
    signature: [
      'Alta energia nas primeiras horas',
      'Preferência por dormir mais cedo',
      'Execução rápida e objetiva',
      'Foco elevado pela manhã',
    ],
    funFact:
      'Alguns cronotipos apresentam avanço de fase circadiana, com picos de alerta mais cedo no dia.',
    performance: 'Proteja suas manhãs — é onde sua vantagem está.',
    insight: 'Quem começa antes, decide antes.',
    story: {
      title: '🦁 Leão — GoZzzz Profile',
      line1: 'Eu funciono melhor antes de todo mundo',
      line2: 'Minhas manhãs definem meu dia',
    },
    spectrumLabel: 'Pico matinal',
  },
  wolf: {
    emoji: '🐺',
    name: 'Lobo Noturno',
    color: 'purple',
    subtitle: 'Sua mente ganha força quando o mundo desacelera.',
    signature: [
      'Pico de energia tardio',
      'Dificuldade para acordar cedo',
      'Alta criatividade noturna',
      'Pensamento intuitivo e estratégico',
    ],
    funFact:
      'Cronotipos tardios apresentam atraso no ritmo circadiano, com liberação de melatonina mais tarde.',
    performance: 'Use a noite com estratégia — não contra você.',
    insight: 'Criatividade precisa de timing, não de pressão.',
    story: {
      title: '🐺 Lobo — GoZzzz Profile',
      line1: 'Minha energia começa quando a dos outros acaba',
      line2: 'A noite é meu diferencial',
    },
    spectrumLabel: 'Energia noturna',
  },
};

export function normalizeChronotypeKey(raw?: string | string[] | null): ChronotypeKey | null {
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

export function getChronotypeIntel(key: ChronotypeKey | string | null | undefined): ChronotypeIntel | null {
  const k = typeof key === 'string' ? normalizeChronotypeKey(key) : key;
  if (!k) return null;
  return chronotypes[k];
}

export function getOtherChronotypeKeys(main: ChronotypeKey): ChronotypeKey[] {
  return CHRONOTYPE_KEYS.filter((k) => k !== main);
}
