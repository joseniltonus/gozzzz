import type { Chronotype } from '@/data/chronotypes';

export type EngagementLang = 'pt' | 'en';
export type EngagementSlot = 'morning' | 'wind_down' | 'program' | 'midday' | 'concierge';

export interface EngagementCopy {
  title: string;
  body: string;
}

type Pool = Record<Chronotype, Record<EngagementLang, readonly EngagementCopy[]>>;

function stablePick<T>(items: readonly T[], seed: number): T {
  if (items.length === 0) throw new Error('engagement copy pool empty');
  const idx = Math.abs(seed) % items.length;
  return items[idx]!;
}

const MORNING: Pool = {
  lion: {
    pt: [
      { title: 'Ritmo matinal', body: 'Luz forte cedo reforça o relógio central: dois minutos junto à janela já contam — só se fizer sentido para ti.' },
      { title: 'Ancoragem suave', body: 'O teu corpo tende a acordar cedo; manter horários de luz estáveis ajuda o cortisol a subir sem “susto” para o sistema.' },
      { title: 'Sem pressa', body: 'Hoje não precisa de ser perfeito: regularidade de luz e movimento pesa mais do que intensidade.' },
      { title: 'Pequeno alinhamento', body: 'Cronótipo matinal ganha com transições previsíveis. Um minuto de luz natural vale mais do que outro café.' },
      { title: 'Ciência, sem ruído', body: 'A supraquiasmática gosta de pistas simples. Luz + hora de acordar semelhante = sinal claro; o resto é opcional.' },
    ],
    en: [
      { title: 'Morning rhythm', body: 'Bright light soon after wake strengthens the master clock—two minutes by the window counts, only if it feels right.' },
      { title: 'Gentle anchor', body: 'Your body skews early; stable light timing helps cortisol rise without jolting the system.' },
      { title: 'No rush', body: 'Today does not need to be perfect—light and movement regularity matter more than intensity.' },
      { title: 'Small alignment', body: 'Morning chronotypes benefit from predictable transitions. One minute of natural light beats another espresso.' },
      { title: 'Quiet science', body: 'The suprachiasmatic nucleus likes simple cues. Light + a similar wake time = a clear signal; the rest is optional.' },
    ],
  },
  bear: {
    pt: [
      { title: 'Meio-termo inteligente', body: 'O teu ritmo costuma seguir o sol com folga: luz e atividade pela manhã sustentam o melatonina à noite com menos esforço consciente.' },
      { title: 'Hoje, consistência', body: 'Pequenas repetições (luz, refeição, primeiro movimento) ensinam o relógio periférico a acompanhar o central.' },
      { title: 'Ritmo social, ritmo biológico', body: 'Quando os dois se aproximam, o adormecer tende a ficar mais “automático”. Um passo de cada vez.' },
      { title: 'Luz como pista', body: 'Mesmo em dias nublados, luz ambiente alta pela manhã já informa o cérebro: “dia”. Sem heroísmo.' },
      { title: 'Prático', body: 'Se só fizeres uma coisa: 90 segundos de luz real depois de acordar. O resto pode esperar.' },
    ],
    en: [
      { title: 'Balanced rhythm', body: 'Your timing often tracks daylight with slack—morning light and activity support melatonin timing later with less strain.' },
      { title: 'Today: consistency', body: 'Small repeats (light, meal, first movement) teach peripheral clocks to follow the central pacemaker.' },
      { title: 'Social vs biology', body: 'When the two align, sleep onset often feels more automatic. One step at a time.' },
      { title: 'Light as a cue', body: 'Even on gray days, brighter morning light tells the brain “daytime”—no heroics required.' },
      { title: 'Practical', body: 'If you do only one thing: ninety seconds of real light after waking. The rest can wait.' },
    ],
  },
  wolf: {
    pt: [
      { title: 'Manhã sem culpa', body: 'Atraso fisiológico é comum: alerta baixa cedo não é preguiça. Luz e movimento leves ajudam sem “forçar” o sono à noite.' },
      { title: 'Pouca luz, muito efeito', body: 'Mesmo acordando tarde, luz diurna cedo (para ti) ainda move o relógio—devagar é ciência, não fraqueza.' },
      { title: 'Cafeína, com estratégia', body: 'Meia-vida longa: o que bebes ainda à tarde conversa com o adormecer. Um lembrete gentil, não uma regra rígida.' },
      { title: 'Micro-acordar', body: 'Se o corpo pede mais tempo, abre cortinas cedo e deixa a luz fazer parte do despertar—sem discurso motivacional.' },
      { title: 'Didática', body: 'Cronótipo tardio = fase do melatonina mais tarde. Ajustar luz e temperatura à noite pesa mais do que “dormir mais cedo à força”.' },
    ],
    en: [
      { title: 'Guilt-free morning', body: 'Physiological delay is common—low early alertness is not laziness. Light and gentle movement help without forcing sleep later.' },
      { title: 'Small light, real effect', body: 'Even with a later wake, daytime light (for you) still shifts the clock—slow is science, not weakness.' },
      { title: 'Caffeine strategy', body: 'Long half-life: what you drink in the afternoon still talks to sleep onset. A gentle reminder, not a rigid rule.' },
      { title: 'Micro-wake', body: 'If your body wants more time, open curtains and let light join the wake-up—no pep talk required.' },
      { title: 'Why it works', body: 'Late chronotype = melatonin phase later. Evening light and temperature tweaks beat “force an earlier bedtime.”' },
    ],
  },
  dolphin: {
    pt: [
      { title: 'Sono fragmentado', body: 'Hipervigilância leve é comum no teu perfil: rotinas curtas e repetíveis reduzem ruído mental mais do que “tentar relaxar muito”.' },
      { title: 'Hábito > duração', body: 'Para o teu padrão, consistência de hora de deitar importa mais do que horas totais numa noite isolada.' },
      { title: 'Luz e ansiedade', body: 'O eixo HPA responde a previsibilidade. Mesma sequência de 5 minutos antes do quarto já é sinal seguro para o sistema.' },
      { title: 'Prático', body: 'Hoje: um único estímulo calmo antes de deitar (luz baixa + temperatura estável). Ciência de arousal, em formato pequeno.' },
      { title: 'Sem pressão', body: 'Se acordaste várias vezes, o relógio ainda ganha com regularidade de manhã—não com autocrítica à noite.' },
    ],
    en: [
      { title: 'Fragmented sleep', body: 'Light hypervigilance fits your profile—short repeatable routines reduce mental noise more than “trying hard to relax.”' },
      { title: 'Habit over duration', body: 'For your pattern, consistent bedtime matters more than total hours on any single night.' },
      { title: 'Light and anxiety', body: 'The HPA axis likes predictability. The same five-minute pre-bed sequence is already a safety signal.' },
      { title: 'Practical', body: 'Today: one calm cue before bed (dim light + stable temperature). Arousal science, small format.' },
      { title: 'No pressure', body: 'If you woke often, the clock still wins with morning regularity—not with nighttime self-criticism.' },
    ],
  },
};

const WIND: Pool = {
  lion: {
    pt: [
      { title: 'Descida do dia', body: 'O teu melatonina tende a subir mais cedo: luz baixa e temperatura fresca avisam o corpo sem drama.' },
      { title: 'Transição curta', body: 'Quinze minutos de luz âmbar e menos estímulos visuais alinham a supraquiasmática com o deitar—sem prometer milagres.' },
      { title: 'Temperatura', body: 'Quarto ligeiramente mais fresco que o corpo facilita a sonolência: fisiologia básica, aplicada com calma.' },
      { title: 'Opcional', body: 'Se ainda estiveres “ligado”, um ritual fixo pequeno pesa mais do que forçar o relógio.' },
      { title: 'Ritmo natural', body: 'Cronótipo matinal: antecipa o “apagão” com menos luz azul—o sistema agradece a previsibilidade.' },
    ],
    en: [
      { title: 'Evening descent', body: 'Your melatonin rise tends to start earlier—dim light and a cooler room cue the body without drama.' },
      { title: 'Short transition', body: 'Fifteen minutes of amber light and less visual stimulation align the SCN with bedtime—no miracle promises.' },
      { title: 'Temperature', body: 'A room slightly cooler than core temperature nudges sleepiness—basic physiology, calmly applied.' },
      { title: 'Optional', body: 'If you still feel wired, a tiny fixed ritual matters more than forcing the clock.' },
      { title: 'Natural rhythm', body: 'Morning chronotype: move the “dimming” earlier—your system likes predictable cues.' },
    ],
  },
  bear: {
    pt: [
      { title: 'Janela de descompressão', body: 'Luz descendente e menos decisões cognitivas à noite protegem a curva natural do melatonina.' },
      { title: 'Pré-sono', body: 'O relógio periférico (digestão, temperatura) precisa de tempo: jantar mais cedo ou mais leve pode ser ciência, não estética.' },
      { title: 'Sem culpa', body: 'Se o dia foi intenso, não precisa de “compensar” com ecrã—só de menos contraste luminoso.' },
      { title: 'Hábito elite', body: 'Uma sequência fixa de 10 minutos vale mais do que uma app diferente cada noite.' },
      { title: 'Didático', body: 'Pressão de adormecer aumenta arousal. Ritual mecânico (luz, chá, página) reduz vigilância sem pressa.' },
    ],
    en: [
      { title: 'Wind-down window', body: 'Falling light and fewer cognitive decisions at night protect the natural melatonin curve.' },
      { title: 'Pre-sleep', body: 'Peripheral clocks (digestion, temperature) need runway—earlier or lighter dinner can be science, not aesthetics.' },
      { title: 'No guilt', body: 'If the day was heavy, you do not need to “make up” with screens—just lower light contrast.' },
      { title: 'Quiet habit', body: 'A fixed ten-minute sequence beats a different app every night.' },
      { title: 'Why it helps', body: 'Sleep pressure plus anxiety fight each other. A mechanical ritual (light, tea, page) lowers vigilance without rush.' },
    ],
  },
  wolf: {
    pt: [
      { title: 'Noite ainda ativa', body: 'O teu relógio pede mais estímulo diurno antes do melatonina: luz baixa mais tarde, mas consistente, funciona melhor que briga com a cabeceira.' },
      { title: 'Transição tardia', body: 'Menos luz branca depois do jantar; mais temperatura fresca. Sinais simples para uma fase circadiana deslocada.' },
      { title: 'Prático', body: 'Se ainda não sentes sono, troca conteúdo intenso por algo monótono—monotonia reduz arousal cognitivo.' },
      { title: 'Ciência', body: 'DLMO mais tarde significa que “deitar cedo” pode falhar sem culpa; alinhar luz e rotina pesa mais.' },
      { title: 'Suave', body: 'Hoje: cortar metade do brilho do ecrã já altera entrada de luz melanópica—pequeno, mensurável.' },
    ],
    en: [
      { title: 'Active evening', body: 'Your clock wants more daytime signal before melatonin—dim light later but consistent beats arguing with the pillow.' },
      { title: 'Late transition', body: 'Less white light after dinner; cooler room. Simple signals for a later circadian phase.' },
      { title: 'Practical', body: 'If sleepiness is not there yet, swap intense content for something dull—boredom lowers cognitive arousal.' },
      { title: 'Science note', body: 'Later DLMO means “early bed” can fail without fault; light and routine alignment matter more.' },
      { title: 'Gentle', body: 'Today: halve screen brightness—you already change melanopic light input. Small, measurable.' },
    ],
  },
  dolphin: {
    pt: [
      { title: 'Proteger a descida', body: 'Sono mais leve ganha com menos variabilidade de hora e menos estímulos imprevisíveis à noite.' },
      { title: 'Micro-rotina', body: 'Respiração lenta aumenta variabilidade cardíaca parassimpática—efeito modesto, real, sem misticismo.' },
      { title: 'Temperatura + luz', body: 'Dois canais circadianos clássicos. Ajusta um de cada vez; não precisa de checklist longo.' },
      { title: 'Didático', body: 'Fragmentação piora com hiperfoco no resultado do sono; processos mecânicos roubam menos atenção ao cérebro.' },
      { title: 'Opcional', body: 'Se acordaste cedo demais, luz muito baixa até a hora desejada preserva pressão de sono.' },
    ],
    en: [
      { title: 'Protect the descent', body: 'Lighter sleep benefits from steadier timing and fewer unpredictable night stimuli.' },
      { title: 'Micro-routine', body: 'Slow breathing nudges parasympathetic tone—a modest, real effect, no mysticism.' },
      { title: 'Temperature + light', body: 'Two classic circadian channels. Adjust one at a time; no long checklist needed.' },
      { title: 'Why it helps', body: 'Fragmentation worsens with hyperfocus on sleep outcome; mechanical steps demand less brain bandwidth.' },
      { title: 'Optional', body: 'If you woke too early, very dim light until target wake helps preserve sleep pressure.' },
    ],
  },
};

const PROGRAM: Pool = {
  lion: {
    pt: [
      { title: 'Programa', body: 'Um passo curto hoje reforça o hábito sem sobrecarregar o sistema de recompensa—abre quando quiseres.' },
      { title: 'Pequeno avanço', body: 'Consistência > intensidade: o programa foi desenhado para encaixar em dias reais, não ideais.' },
      { title: 'Sem streak agressivo', body: 'A ciência do hábito favorece retomada suave. O próximo passo espera-te sem pressa.' },
    ],
    en: [
      { title: 'Your program', body: 'A short step today reinforces habit without overloading reward circuits—open when it feels right.' },
      { title: 'Small progress', body: 'Consistency beats intensity—the program is built for real days, not ideal ones.' },
      { title: 'No harsh streaks', body: 'Habit science favors gentle return. The next step waits without pressure.' },
    ],
  },
  bear: {
    pt: [
      { title: 'Programa', body: 'Se fizer sentido, revisita um passo curto: memória de procedimento fixa melhor com repetição espaçada.' },
      { title: 'Ritmo sustentável', body: 'O programa encaixa no teu cronótipo médio—usa-o como mapa, não como meta diária rígida.' },
      { title: 'Opcional', body: 'Três minutos no passo atual podem reorganizar o que fazes à noite sem “reinventar a vida”.' },
    ],
    en: [
      { title: 'Your program', body: 'If it fits, revisit a short step—procedural memory sticks better with spaced repetition.' },
      { title: 'Sustainable rhythm', body: 'The program maps to a middle chronotype—use it as a guide, not a rigid daily target.' },
      { title: 'Optional', body: 'Three minutes on the current step can reorganize your night without reinventing your life.' },
    ],
  },
  wolf: {
    pt: [
      { title: 'Programa', body: 'Cronótipo tardio + rotina estruturada = menos improviso à hora de desligar. Um passo serve de âncora.' },
      { title: 'Quando quiseres', body: 'Não precisa ser agora—o programa guarda contexto para quando o teu ritmo permitir foco.' },
      { title: 'Prático', body: 'Passos curtos encaixam depois do pico noturno de alerta; usa isso a teu favor.' },
    ],
    en: [
      { title: 'Your program', body: 'Late chronotype plus structure means less improvisation at shutdown. One step is an anchor.' },
      { title: 'Whenever', body: 'It does not have to be now—the program keeps context for when your rhythm allows focus.' },
      { title: 'Practical', body: 'Short steps fit after your evening alertness peak; use that to your advantage.' },
    ],
  },
  dolphin: {
    pt: [
      { title: 'Programa', body: 'Para sono leve, rotinas pequenas e previsíveis reduzem vigilância mais do que “fazer tudo”.' },
      { title: 'Passo único', body: 'Escolhe só o próximo micro-passo; o cérebro do tipo golfinho cans menos com metas explícitas.' },
      { title: 'Didático', body: 'Consolidar um hábito com baixa variância melhora a qualidade percebida, mesmo quando o sono oscila.' },
    ],
    en: [
      { title: 'Your program', body: 'For lighter sleep, small predictable routines lower vigilance more than “doing everything.”' },
      { title: 'Single step', body: 'Pick only the next micro-step—the dolphin brain tires less with explicit goals.' },
      { title: 'Why it helps', body: 'Locking a habit with low variance improves perceived quality even when sleep fluctuates.' },
    ],
  },
};

const MIDDAY: Pool = {
  lion: { pt: [], en: [] },
  bear: { pt: [], en: [] },
  wolf: {
    pt: [
      { title: 'Luz & alerta', body: 'No teu perfil, luz natural a meio do dia ajuda a ancorar o relógio sem roubar sono à noite.' },
      { title: 'Pausa curta', body: 'Caminhada breve + luz ambiente: sinal diurno forte para uma fase circadiana tardia.' },
      { title: 'Cafeína', body: 'Se ainda há café no corpo à noite, cortar a partir de agora já altera a curva de adormecer.' },
    ],
    en: [
      { title: 'Light and alertness', body: 'For you, midday natural light anchors the clock without stealing sleep later.' },
      { title: 'Short break', body: 'Brief walk + ambient light—a strong daytime signal for a later phase.' },
      { title: 'Caffeine', body: 'If caffeine is still on board at night, cutting from now onward shifts the sleep curve.' },
    ],
  },
  dolphin: {
    pt: [
      { title: 'Meio do dia', body: 'Luz moderada e movimento leve reduzem “sono de dever” à tarde sem confundir o relógio à noite.' },
      { title: 'Sesta?', body: 'Se dormires de dia, mantém curto e cedo; pressão de sono à noite é química, não moral.' },
      { title: 'Ancoragem', body: 'Para sono fragmentado, um bloco de atenção plena de 3 minutos à tarde pode baixar ruminação à noite.' },
    ],
    en: [
      { title: 'Midday', body: 'Moderate light and light movement reduce “obligation sleepiness” in the afternoon without confusing night timing.' },
      { title: 'Nap?', body: 'If you nap, keep it short and early—night sleep pressure is chemistry, not morality.' },
      { title: 'Anchor', body: 'For fragmented sleep, a three-minute attention block in the afternoon can lower rumination at night.' },
    ],
  },
};

const CONCIERGE: Pool = {
  lion: {
    pt: [
      { title: 'Sleep Concierge', body: 'Quando quiseres afinar rotina matinal e luz, o Concierge lê o teu padrão com base em hábito e ciência do sono — sem diagnóstico clínico.' },
      { title: 'Concierge', body: 'Um check-in curto por WhatsApp pode traduzir o teu cronótipo em micro-ajustes práticos. Usa quando fizer sentido.' },
    ],
    en: [
      { title: 'Sleep Concierge', body: 'When you want to refine morning light and routine, Concierge reads your pattern through habit and sleep science—not clinical diagnosis.' },
      { title: 'Concierge', body: 'A short WhatsApp check-in can turn your chronotype into practical micro-tweaks. Use it when it fits.' },
    ],
  },
  bear: {
    pt: [
      { title: 'Sleep Concierge', body: 'Se o meio-termo te deixa em dúvida entre “muito cedo” e “muito tarde”, o Concierge ajuda a priorizar uma alavanca por semana.' },
      { title: 'Concierge', body: 'Coaching educativo: alinhar luz, temperatura e rotina com o que a evidência sugere para o teu perfil.' },
    ],
    en: [
      { title: 'Sleep Concierge', body: 'If the middle path still feels unclear between “too early” and “too late,” Concierge helps prioritize one lever per week.' },
      { title: 'Concierge', body: 'Educational coaching—align light, temperature, and routine with evidence for your profile.' },
    ],
  },
  wolf: {
    pt: [
      { title: 'Sleep Concierge', body: 'Cronótipo tardio beneficia de plano de luz e cafeína bem desenhado; o Concierge desenha isso contigo, sem julgar.' },
      { title: 'Concierge', body: 'Quando o dia ainda “puxa” à noite, um par externo ajuda a traduzir ciência em horários realistas.' },
    ],
    en: [
      { title: 'Sleep Concierge', body: 'Late chronotypes benefit from a thoughtful light and caffeine plan—Concierge sketches it with you, without judgment.' },
      { title: 'Concierge', body: 'When evenings still feel “pulled,” an external pair helps translate science into realistic timing.' },
    ],
  },
  dolphin: {
    pt: [
      { title: 'Sleep Concierge', body: 'Sono leve + ansiedade: o Concierge foca em rotinas curtas e mensuráveis — menos ruído, mais clareza.' },
      { title: 'Concierge', body: 'Se o cérebro revisa o dia em loop, um plano comportamental curto pode quebrar o padrão. Opcional, premium.' },
    ],
    en: [
      { title: 'Sleep Concierge', body: 'Light sleep plus anxiety: Concierge focuses on short measurable routines—less noise, more clarity.' },
      { title: 'Concierge', body: 'If your brain replays the day on loop, a brief behavioral plan can interrupt the pattern. Optional, premium.' },
    ],
  },
};

const POOLS: Record<EngagementSlot, Pool> = {
  morning: MORNING,
  wind_down: WIND,
  program: PROGRAM,
  midday: MIDDAY,
  concierge: CONCIERGE,
};

export function pickEngagementCopy(
  chronotype: Chronotype,
  lang: EngagementLang,
  slot: EngagementSlot,
  seed: number,
): EngagementCopy {
  const pool = POOLS[slot][chronotype][lang];
  if (pool.length === 0) {
    if (slot === 'midday') return pickEngagementCopy(chronotype, lang, 'morning', seed + 17);
    return pickEngagementCopy('bear', lang, slot, seed + 3);
  }
  return stablePick(pool, seed);
}

export function engagementHref(slot: EngagementSlot): string {
  switch (slot) {
    case 'concierge':
      return '/(tabs)/concierge';
    case 'program':
      return '/(tabs)/program';
    default:
      return '/(tabs)/home';
  }
}
