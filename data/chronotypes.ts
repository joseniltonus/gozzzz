export type Chronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';
type Lang = 'pt' | 'en';

export interface ChronotypeInfo {
  id: Chronotype;
  name: Record<Lang, string>;
  peakHours: Record<Lang, string>;
  sleepTime: Record<Lang, string>;
  description: Record<Lang, string>;
  education: Record<Lang, string[]>;
}

export const CHRONOTYPES: Record<Chronotype, ChronotypeInfo> = {
  dolphin: {
    id: 'dolphin',
    name: {
      pt: 'Golfinho',
      en: 'Dolphin',
    },
    peakHours: {
      pt: '14h–16h',
      en: '2pm–4pm',
    },
    sleepTime: {
      pt: '23h00–00h30',
      en: '11:00pm–12:30am',
    },
    description: {
      pt: 'Dorme levemente e acorda frequentemente com padrão imprevisível. Tendem a ser perfeccionistas ansiosos.',
      en: 'Sleeps lightly and wakes frequently with unpredictable patterns. Tend to be anxious perfectionists.',
    },
    education: {
      pt: [
        'Seu sono é naturalmente mais leve',
        'Você processa melhor à tarde',
        'Estresse afeta mais o seu sono',
      ],
      en: [
        'Your sleep is naturally lighter',
        'You process better in the afternoon',
        'Stress affects your sleep more',
      ],
    },
  },
  lion: {
    id: 'lion',
    name: {
      pt: 'Leão',
      en: 'Lion',
    },
    peakHours: {
      pt: '08h–10h',
      en: '8am–10am',
    },
    sleepTime: {
      pt: '20h30–22h00',
      en: '8:30pm–10:00pm',
    },
    description: {
      pt: 'Acorda naturalmente entre 4h–6h com pico de energia matinal. Ideal para líderes que trabalham cedo.',
      en: 'Naturally wakes between 4am–6am with morning energy peak. Ideal for early morning workers.',
    },
    education: {
      pt: [
        'Seu corpo se alinha com o amanhecer',
        'Você tem produtividade máxima pela manhã',
        'Noites mais cedo melhoram sua saúde',
      ],
      en: [
        'Your body aligns with the sunrise',
        'You have maximum productivity in the morning',
        'Earlier nights improve your health',
      ],
    },
  },
  bear: {
    id: 'bear',
    name: {
      pt: 'Urso',
      en: 'Bear',
    },
    peakHours: {
      pt: '10h–12h',
      en: '10am–12pm',
    },
    sleepTime: {
      pt: '21h30–23h00',
      en: '9:30pm–11:00pm',
    },
    description: {
      pt: 'Segue o ritmo solar. Acorda entre 6h–8h com pico até o meio-dia. Cronotipo mais comum.',
      en: 'Follows the solar rhythm. Wakes between 6am–8am with peak until noon. Most common chronotype.',
    },
    education: {
      pt: [
        'Seu ciclo segue o padrão natural do sol',
        'Você se sente bem durante a manhã e tarde',
        'Consistência é a chave do seu sucesso',
      ],
      en: [
        'Your cycle follows the natural sun pattern',
        'You feel good during morning and afternoon',
        'Consistency is key to your success',
      ],
    },
  },
  wolf: {
    id: 'wolf',
    name: {
      pt: 'Lobo',
      en: 'Wolf',
    },
    peakHours: {
      pt: '23h–01h',
      en: '11pm–1am',
    },
    sleepTime: {
      pt: '23h30–01h00',
      en: '11:30pm–1:00am',
    },
    description: {
      pt: 'Acorda entre 7h–9h com produtividade máxima à noite. Cronotipo tardio.',
      en: 'Wakes between 7am–9am with maximum productivity at night. Late chronotype.',
    },
    education: {
      pt: [
        'Sua criatividade explode à noite',
        'Manhãs cedo prejudicam seu desempenho',
        'Horários flexíveis otimizam seu potencial',
      ],
      en: [
        'Your creativity explodes at night',
        'Early mornings harm your performance',
        'Flexible schedules optimize your potential',
      ],
    },
  },
};

export function getChronotypeInfo(chronotype: string | null | undefined, lang: Lang = 'pt'): ChronotypeInfo | null {
  if (!chronotype) return null;
  const info = CHRONOTYPES[chronotype as Chronotype];
  return info || null;
}

export function getChronotypeName(chronotype: string | null | undefined, lang: Lang = 'pt'): string {
  const info = getChronotypeInfo(chronotype, lang);
  if (!info) return lang === 'pt' ? 'Usuário' : 'User';
  return info.name[lang];
}

export function getPeakHours(chronotype: string | null | undefined, lang: Lang = 'pt'): string {
  const info = getChronotypeInfo(chronotype, lang);
  if (!info) return lang === 'pt' ? '10h–12h' : '10am–12pm';
  return info.peakHours[lang];
}

export function getSleepTime(chronotype: string | null | undefined, lang: Lang = 'pt'): string {
  const info = getChronotypeInfo(chronotype, lang);
  if (!info) return lang === 'pt' ? '21h30–23h00' : '9:30pm–11:00pm';
  return info.sleepTime[lang];
}
