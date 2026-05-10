/**
 * Protocolos específicos por cronótipo em lições onde a recomendação base
 * varia significativamente entre os 4 tipos. Aparece como callout "Pra você"
 * acima do conteúdo principal nas lições do programa (mobile + web).
 *
 * Por que existe: algumas lições (ex: lição 15 — exercício) têm um conteúdo
 * "padrão" que conflita com a biologia de cronótipos noturnos. Sem este
 * callout, um Lobo veria apenas "exercite-se de manhã" e descartaria a
 * recomendação. Com este callout, vê primeiro a janela específica pra ele.
 *
 * Quando NÃO usar: se o conteúdo da lição já trata todos os cronótipos
 * igualmente (ex: lição de luz matinal — todos se beneficiam dos primeiros
 * 30 min após acordar), não precisa entrada aqui.
 *
 * Para adicionar uma nova lição: adicione `'<lessonId>': { dolphin: {...},
 * lion: {...}, bear: {...}, wolf: {...} }` ao mapa abaixo. Mantenha PT/EN.
 */
type Lang = 'pt' | 'en';
type Chronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

export interface ChronotypeProtocol {
  /** Janela ideal compacta — ex: "6h–9h" ou "Janela ideal: manhã" */
  window: { pt: string; en: string };
  /** Razão biológica resumida — ex: "Seu pico de cortisol é matinal" */
  why: { pt: string; en: string };
  /** Limite/aviso prático — ex: "Evite intenso após 21h" */
  limit: { pt: string; en: string };
}

type LessonProtocols = Record<Chronotype, ChronotypeProtocol>;

const PROTOCOLS: Record<string, LessonProtocols> = {
  // Lição 15 — Exercício e Sono Pelo Seu Cronótipo
  '15': {
    lion: {
      window: {
        pt: 'Janela ideal: 6h–10h',
        en: 'Ideal window: 6am–10am',
      },
      why: {
        pt: 'Seu pico de cortisol e energia chega cedo. Exercitar nessa janela aproveita o pico natural sem competir com o sono.',
        en: 'Your cortisol and energy peak arrives early. Training in this window leverages your natural peak without competing with sleep.',
      },
      limit: {
        pt: 'Evite alta intensidade depois das 17h.',
        en: 'Avoid high intensity after 5pm.',
      },
    },
    bear: {
      window: {
        pt: 'Janela ideal: 8h–12h ou 16h–18h',
        en: 'Ideal window: 8am–12pm or 4pm–6pm',
      },
      why: {
        pt: 'Você segue o ritmo solar. Tanto manhã quanto fim de tarde funcionam — escolha o que cabe na sua rotina.',
        en: 'You follow the solar rhythm. Both morning and late afternoon work — choose what fits your schedule.',
      },
      limit: {
        pt: 'Evite alta intensidade depois das 19h.',
        en: 'Avoid high intensity after 7pm.',
      },
    },
    wolf: {
      window: {
        pt: 'Janela ideal: 15h–18h',
        en: 'Ideal window: 3pm–6pm',
      },
      why: {
        pt: 'Seu pico de temperatura corporal e cortisol chega tarde. Exercitar nessa janela aproveita seu pico natural — exercício matinal pode parecer impossível, e tudo bem.',
        en: 'Your body temperature and cortisol peak arrives late. Training in this window leverages your natural peak — morning exercise may feel impossible, and that is normal.',
      },
      limit: {
        pt: 'Evite intenso a menos de 3 horas antes de dormir.',
        en: 'Avoid intense exercise within 3 hours of bedtime.',
      },
    },
    dolphin: {
      window: {
        pt: 'Janela ideal: 10h–14h',
        en: 'Ideal window: 10am–2pm',
      },
      why: {
        pt: 'Como seu sono é mais leve e a energia varia ao longo do dia, exercício no meio do dia evita perturbar tanto o despertar quanto o adormecer.',
        en: 'Because your sleep is lighter and energy varies through the day, midday exercise avoids disturbing both wake-up and falling asleep.',
      },
      limit: {
        pt: 'Evite alta intensidade depois das 18h — qualquer coisa que eleve cortisol pode atrapalhar a transição.',
        en: 'Avoid high intensity after 6pm — anything that raises cortisol can disrupt your transition.',
      },
    },
  },
};

export function getChronotypeProtocol(
  lessonId: string,
  chronotype: Chronotype | null,
  lang: Lang = 'pt',
): { window: string; why: string; limit: string } | null {
  if (!chronotype) return null;
  const lessonMap = PROTOCOLS[lessonId];
  if (!lessonMap) return null;
  const protocol = lessonMap[chronotype];
  if (!protocol) return null;
  return {
    window: protocol.window[lang],
    why: protocol.why[lang],
    limit: protocol.limit[lang],
  };
}

export function hasChronotypeProtocol(lessonId: string): boolean {
  return Object.prototype.hasOwnProperty.call(PROTOCOLS, lessonId);
}
