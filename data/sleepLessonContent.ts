export interface ProtocolData {
  difficulty: 'easy' | 'medium' | 'advanced';
  tonight: string;
  morning: string;
  why: string;
}

export interface LessonStep {
  tag: string;
  title: string;
  body: string;
}

export interface DataPoint {
  stat: string;
  source: string;
}

export interface ScienceCitation {
  citation: string;
  source: string;
}

export interface SleepLessonLang {
  hook: LessonStep;
  insight: LessonStep;
  mechanism: LessonStep;
  application: LessonStep;
  dataPoint: DataPoint;
  protocol: ProtocolData;
  science: ScienceCitation[];
  nextPreview: string;
}

export interface SleepLesson {
  id: string;
  en: SleepLessonLang;
  pt: SleepLessonLang;
}

export const PERSONALIZATION_EN = {
  didnt: {
    question: "What got in the way?",
    options: [
      { emoji: '🌡️', text: 'Room was too warm' },
      { emoji: '📱', text: 'Used phone in bed' },
      { emoji: '🧠', text: "Mind wouldn't stop" },
      { emoji: '🍷', text: 'Had alcohol' },
    ],
  },
  somewhat: {
    question: "What would help most tomorrow?",
    options: [
      { emoji: '⏰', text: 'Better wake time' },
      { emoji: '☀️', text: 'More morning light' },
      { emoji: '💤', text: 'Earlier bedtime' },
      { emoji: '🧘', text: 'Wind-down routine' },
    ],
  },
  felt: {
    question: "What do you want to optimize next?",
    options: [
      { emoji: '🧠', text: 'Memory & focus' },
      { emoji: '⚡', text: 'Energy levels' },
      { emoji: '😌', text: 'Stress & anxiety' },
      { emoji: '💪', text: 'Physical recovery' },
    ],
  },
};

export const PERSONALIZATION_PT = {
  didnt: {
    question: "O que atrapalhou?",
    options: [
      { emoji: '🌡️', text: 'Quarto estava quente' },
      { emoji: '📱', text: 'Usei o celular na cama' },
      { emoji: '🧠', text: 'Mente não parou' },
      { emoji: '🍷', text: 'Bebi álcool' },
    ],
  },
  somewhat: {
    question: "O que mais ajudaria amanhã?",
    options: [
      { emoji: '⏰', text: 'Horário de acordar melhor' },
      { emoji: '☀️', text: 'Mais luz matinal' },
      { emoji: '💤', text: 'Dormir mais cedo' },
      { emoji: '🧘', text: 'Rotina de desaceleração' },
    ],
  },
  felt: {
    question: "O que você quer otimizar agora?",
    options: [
      { emoji: '🧠', text: 'Memória & foco' },
      { emoji: '⚡', text: 'Níveis de energia' },
      { emoji: '😌', text: 'Estresse & ansiedade' },
      { emoji: '💪', text: 'Recuperação física' },
    ],
  },
};

export const SLEEP_LESSON_CONTENT: SleepLesson[] = [
  {
    id: '2',
    en: {
      hook: {
        tag: "The Hidden Variable",
        title: "You've been optimizing the wrong thing. It's not about how long you sleep.",
        body: "Most advice says: sleep 8 hours. But two people sleeping identical hours can feel radically different in the morning. The variable nobody tells you about? When you sleep — not how long. And that 'when' is largely written in your DNA.",
      },
      insight: {
        tag: "The Discovery",
        title: "Your chronotype is biological, not a personality choice.",
        body: "Researchers have identified four chronotypes — Lion, Bear, Wolf, Dolphin — each with a distinct peak energy window. Fighting your chronotype costs 20–30% of your cognitive output every day. Most people spend their careers working against their own biology.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Your genes set your sleep timing. Your habits can shift it slightly — but not override it.",
        body: "Your PER3 gene length predicts your chronotype. Wolves have longer variants; Lions, shorter. This genetic clock drives cortisol peaks, melatonin onset, and core temperature rhythm. You cannot rewire this — but you can align your life to it. Morning sunlight can shift late chronotypes 30–90 minutes earlier over weeks.",
      },
      application: {
        tag: "For You, Today",
        title: "Identify your chronotype in two steps.",
        body: "Step 1: On your next free day without an alarm, note when you naturally wake up and when you feel mentally sharpest.\n\nStep 2: Match to your type:\n• 4–6am wake, sharp before noon → Lion\n• 6–8am wake, peak by midday → Bear\n• 7–9am wake, peak after 3pm → Wolf\n• Fragmented sleep, anxious waker → Dolphin\n\nAlign your most demanding work with your natural peak window.",
      },
      dataPoint: {
        stat: "People working against their chronotype show 23% lower cognitive performance and significantly higher stress hormone levels.",
        source: "Current Biology, 2019",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Set no alarm for tomorrow if possible. Let your body wake naturally — this is your baseline chronotype data.",
        morning: "Note the exact time you wake naturally and your energy level at 9am, 12pm, and 3pm. This reveals your peak window.",
        why: "Three data points across the day reveal your chronotype more accurately than any quiz. Your natural wake time and energy peaks don't lie.",
      },
      science: [
        {
          citation: "Based on research by Michael Breus, Chronotype Specialist · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Current Biology, 2013",
        },
      ],
      nextPreview: "Tomorrow: why you might be sleeping 7 hours but functioning like someone who hasn't slept in 24 — and how sleep debt accumulates invisibly.",
    },
    pt: {
      hook: {
        tag: "A Variável Oculta",
        title: "Você tem otimizado a coisa errada. Não é sobre quanto você dorme.",
        body: "A maioria dos conselhos diz: durma 8 horas. Mas duas pessoas dormindo o mesmo tempo podem se sentir radicalmente diferentes ao acordar. A variável que ninguém te conta? Quando você dorme — não quanto. E esse 'quando' está em grande parte escrito no seu DNA.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Seu cronotipo é biológico, não uma escolha de personalidade.",
        body: "Pesquisadores identificaram quatro cronotipos — Leão, Urso, Lobo, Golfinho — cada um com uma janela de pico de energia distinta. Lutar contra seu cronotipo custa 20–30% da sua capacidade cognitiva diária. A maioria das pessoas passa a carreira trabalhando contra sua própria biologia.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Seus genes definem o timing do sono. Seus hábitos podem ajustá-lo levemente — mas não sobrepô-lo.",
        body: "O comprimento do seu gene PER3 prevê seu cronotipo. Lobos têm variantes mais longas; Leões, mais curtas. Esse relógio genético controla os picos de cortisol, o início da melatonina e o ritmo da temperatura corporal. Você não pode reprogramar isso — mas pode alinhar sua vida a ele. Luz solar matinal pode deslocar cronotipos tardios 30–90 minutos mais cedo ao longo de semanas.",
      },
      application: {
        tag: "Para Você, Hoje",
        title: "Identifique seu cronotipo em dois passos.",
        body: "Passo 1: No próximo dia livre sem alarme, note quando você acorda naturalmente e quando se sente mentalmente mais alerta.\n\nPasso 2: Compare com seu tipo:\n• Acorda ~5h, alerta antes do meio-dia → Leão\n• Acorda ~7–7h30, pico ao longo do dia seguindo o sol → Urso\n• Acorda ~8h, pico de produtividade começa por volta do meio-dia → Lobo\n• Sono fragmentado, acordador ansioso → Golfinho\n\nAlinhe seu trabalho mais exigente com sua janela de pico natural.",
      },
      dataPoint: {
        stat: "Pessoas trabalhando contra seu cronotipo apresentam 23% menos performance cognitiva e níveis significativamente mais altos de hormônios do estresse.",
        source: "Current Biology, 2019",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Se possível, não coloque alarme amanhã. Deixe seu corpo acordar naturalmente — esses são seus dados de cronotipo base.",
        morning: "Note o horário exato em que você acorda naturalmente e o nível de energia às 9h, 12h e 15h. Isso revela sua janela de pico.",
        why: "Três pontos de dados ao longo do dia revelam seu cronotipo com mais precisão do que qualquer questionário. Seu horário natural de despertar e picos de energia não mentem.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Michael Breus, Especialista em Cronotipos · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Current Biology, 2013",
        },
      ],
      nextPreview: "Amanhã: por que você pode estar dormindo 7 horas mas funcionando como alguém que não dormiu em 24 — e como a dívida de sono se acumula de forma invisível.",
    },
  },
  {
    id: '3',
    en: {
      hook: {
        tag: "The Silent Accumulation",
        title: "You think you're used to 6 hours. Your brain disagrees.",
        body: "After two weeks of sleeping 6 hours per night, your cognitive performance is equivalent to someone who has been awake for 24 hours straight. The critical part: you don't feel it. Sleep-deprived people consistently rate themselves as 'fine' — while their performance collapses on objective tests.",
      },
      insight: {
        tag: "The Discovery",
        title: "Sleep debt is cumulative, invisible, and doesn't pay itself back in a weekend.",
        body: "Every hour of sleep below your biological need creates a debt. Miss 2 hours nightly for a workweek and you've lost 10 hours of restoration. Research shows a single recovery weekend reduces the debt by only 30%. Full repayment takes 3–4 weeks of consistent adequate sleep.",
      },
      mechanism: {
        tag: "The Biology",
        title: "The molecule that makes you feel tired keeps building — and caffeine just masks it.",
        body: "Adenosine is a chemical that builds up in your brain the longer you stay awake. Sleep clears it. When you cut sleep short, you wake with a residual adenosine load — a deficit that compounds each night. Caffeine blocks adenosine receptors so you don't feel it, but the molecule keeps accumulating. This is why habitual short sleepers need progressively more caffeine to feel baseline normal.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Calculate your debt. Then start repaying it.",
        body: "Step 1: Estimate your true sleep need (most adults: 7.5–9 hours).\nStep 2: Calculate your average actual sleep.\nStep 3: Multiply the gap by days.\n\nExample: Need 8h, sleep 6.5h = 1.5h debt/day × 5 days = 7.5 hours of debt.\n\nRepayment: Add 30–45 minutes of sleep per night over 3–4 weeks. Don't binge on weekends — it disrupts your circadian rhythm.",
      },
      dataPoint: {
        stat: "Participants sleeping 6 hours nightly for 14 days matched the impairment of someone awake for 24 hours — but subjectively felt only 'slightly sleepy'.",
        source: "Sleep, Van Dongen et al., 2003",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Move your bedtime 20 minutes earlier than usual. Just 20 minutes — and maintain your wake time to avoid circadian drift.",
        morning: "Before checking your phone, rate your mental clarity on a scale of 1–10. Track this daily. A rising score confirms debt repayment.",
        why: "Small, consistent bedtime shifts are more effective than large irregular ones. The brain repays sleep debt in incremental cycles, not in lump sums.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep, 2003",
        },
        {
          citation: "Matthew Walker (UC Berkeley) in Why We Sleep describes adenosine pressure as a 'sleep debt clock' — accumulating from the moment you wake and only fully cleared during adequate, uninterrupted sleep.",
          source: "Why We Sleep, Walker, 2017",
        },
      ],
      nextPreview: "Tomorrow: your body runs dozens of biological clocks — and the one controlling your sleep is only 20,000 neurons. Here's how to reset it.",
    },
    pt: {
      hook: {
        tag: "O Acúmulo Silencioso",
        title: "Você acha que se acostumou com 6 horas. Seu cérebro discorda.",
        body: "Após duas semanas dormindo 6 horas por noite, sua performance cognitiva é equivalente à de alguém que ficou 24 horas acordado. O detalhe crítico: você não sente. Pessoas privadas de sono consistentemente se avaliam como 'bem' — enquanto sua performance desmorona em testes objetivos.",
      },
      insight: {
        tag: "A Descoberta",
        title: "A dívida de sono é cumulativa, invisível e não se paga em um fim de semana.",
        body: "Cada hora de sono abaixo da sua necessidade biológica cria uma dívida. Perder 2 horas por noite durante uma semana de trabalho resulta em 10 horas de restauração perdidas. Pesquisas mostram que um único fim de semana de recuperação reduz a dívida em apenas 30%. O pagamento completo leva 3–4 semanas de sono consistente e adequado.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "A molécula que faz você se sentir cansado continua acumulando — e a cafeína apenas mascara isso.",
        body: "A adenosina é uma substância química que se acumula no seu cérebro quanto mais tempo você fica acordado. O sono a elimina. Quando você corta o sono, acorda com uma carga residual de adenosina — um déficit que se intensifica a cada noite. A cafeína bloqueia os receptores de adenosina para que você não a sinta, mas a molécula continua acumulando. É por isso que quem habitualmente dorme pouco precisa de cada vez mais cafeína para se sentir normalmente bem.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Calcule sua dívida. Depois comece a pagá-la.",
        body: "Passo 1: Estime sua necessidade real de sono (maioria dos adultos: 7,5–9 horas).\nPasso 2: Calcule sua média real de sono.\nPasso 3: Multiplique a diferença pelos dias.\n\nExemplo: Precisa de 8h, dorme 6,5h = 1,5h de dívida/dia × 5 dias = 7,5 horas de dívida.\n\nPagamento: Adicione 30–45 minutos de sono por noite ao longo de 3–4 semanas. Não exagere nos fins de semana — isso perturba o ritmo circadiano.",
      },
      dataPoint: {
        stat: "Participantes dormindo 6 horas por noite por 14 dias igualaram o comprometimento de alguém acordado por 24 horas — mas subjetivamente se sentiam apenas 'levemente sonolentos'.",
        source: "Sleep, Van Dongen et al., 2003",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Antecipe seu horário de dormir em 20 minutos. Apenas 20 minutos — e mantenha o horário de acordar para evitar deriva circadiana.",
        morning: "Antes de verificar o celular, avalie sua clareza mental em uma escala de 1–10. Monitore isso diariamente. Uma pontuação crescente confirma o pagamento da dívida.",
        why: "Pequenos deslocamentos consistentes do horário de dormir são mais eficazes do que grandes variações irregulares. O cérebro paga a dívida de sono em ciclos incrementais, não em lump sums.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep, 2003",
        },
        {
          citation: "Matthew Walker (UC Berkeley) em Por Que Dormimos descreve a pressão de adenosina como um 'relógio de dívida de sono' — acumulando desde o momento em que você acorda e apenas completamente eliminado durante o sono adequado e ininterrupto.",
          source: "Por Que Dormimos, Walker, 2017",
        },
      ],
      nextPreview: "Amanhã: seu corpo opera dezenas de relógios biológicos — e o que controla o sono tem apenas 20.000 neurônios. Veja como redefiní-lo.",
    },
  },
  {
    id: '4',
    en: {
      hook: {
        tag: "The Clock You Ignore",
        title: "You have a 24-hour biological clock running in every cell of your body. And you keep resetting it wrong.",
        body: "Jet lag without flying. Mental fog that hits the same time every afternoon. Craving sugar at midnight. These aren't random — they're your circadian system out of sync. The fix isn't a supplement. It's light.",
      },
      insight: {
        tag: "The Discovery",
        title: "You don't have one circadian rhythm. You have thousands — and they all need the same synchronization signal.",
        body: "Every organ runs its own molecular clock: your liver times digestion, your heart adjusts output, your immune system peaks at specific hours. These clocks only stay coordinated when the brain's master clock — the suprachiasmatic nucleus — receives its daily reset signal: morning light. Disrupt the reset and the clocks desynchronize, creating internal jet lag every day.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Cortisol wakes you. Melatonin puts you to sleep. Light controls both.",
        body: "Morning light triggers a cortisol peak 30–60 minutes after waking — your natural alertness signal. It also starts a 14–16 hour countdown to melatonin release. Artificial light at night suppresses that melatonin signal, delaying sleep onset by 90 minutes or more. Your body doesn't know it's 11pm — it thinks it's still afternoon.",
      },
      application: {
        tag: "For You, This Week",
        title: "Two light rules that reset your clock.",
        body: "Rule 1 — Morning: Get outdoor light within 30 minutes of waking. 10–15 minutes on clear days, 20–30 on overcast. This starts the cortisol-melatonin countdown.\n\nRule 2 — Evening: Dim all lights 90 minutes before your target sleep time. No overhead lights. Use lamps at waist height or lower. This allows melatonin to rise naturally.\n\nDo both for 5 days and notice the shift.",
      },
      dataPoint: {
        stat: "Consistent same-time wake schedules — even after poor sleep nights — improved sleep quality scores by 34% over four weeks, independent of total sleep duration.",
        source: "Journal of Sleep Research, 2018",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Dim all overhead lights at 9pm tonight. Use only lamps below eye level. Notice if you feel sleepy earlier than usual.",
        morning: "Step outside within 30 minutes of waking — no sunglasses. This single act programs your entire circadian day.",
        why: "Light is the primary zeitgeber (time-giver). Morning light sets cortisol. Evening darkness releases melatonin. Together, they define your circadian phase — the foundation of all other sleep protocols.",
      },
      science: [
        {
          citation: "Based on research by Charles Czeisler, Sleep Medicine · Harvard",
          source: "Nobel Prize in Physiology or Medicine, 2017",
        },
        {
          citation: "Charles Czeisler (Harvard Medical School, 1999) demonstrated that even dim room light (180 lux) suppresses nocturnal melatonin production by 50%, showing that modern indoor environments systematically disrupt circadian timing.",
          source: "Journal of Biological Rhythms, 1999",
        },
      ],
      nextPreview: "Tomorrow: the specific habits destroying your deep sleep — the most restorative stage most people are silently missing.",
    },
    pt: {
      hook: {
        tag: "O Relógio que Você Ignora",
        title: "Você tem um relógio biológico de 24 horas funcionando em cada célula do seu corpo. E continua redefinindo-o errado.",
        body: "Jet lag sem viajar. Névoa mental que aparece sempre no mesmo horário da tarde. Desejo de açúcar à meia-noite. Isso não é aleatório — é seu sistema circadiano fora de sincronia. A solução não é um suplemento. É luz.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Você não tem um ritmo circadiano. Tem milhares — e todos precisam do mesmo sinal de sincronização.",
        body: "Cada órgão tem seu próprio relógio molecular: o fígado controla a digestão, o coração ajusta o ritmo, o sistema imunológico atinge o pico em horários específicos. Esses relógios só ficam coordenados quando o relógio mestre do cérebro — o núcleo supraquiasmático — recebe seu sinal de redefinição diário: luz matinal. Perturbe a redefinição e os relógios se dessincronizam, criando jet lag interno todos os dias.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "O cortisol te acorda. A melatonina te faz dormir. A luz controla os dois.",
        body: "A luz matinal desencadeia um pico de cortisol 30–60 minutos após acordar — seu sinal natural de alerta. Também inicia uma contagem regressiva de 14–16 horas até a liberação de melatonina. A luz artificial à noite suprime esse sinal de melatonina, atrasando o início do sono em 90 minutos ou mais. Seu corpo não sabe que são 23h — acha que ainda é tarde da tarde.",
      },
      application: {
        tag: "Para Você, Esta Semana",
        title: "Duas regras de luz que redefinem seu relógio.",
        body: "Regra 1 — Manhã: Exponha-se à luz ao ar livre dentro de 30 minutos após acordar. 10–15 minutos em dias claros, 20–30 em dias nublados. Isso inicia a contagem regressiva cortisol-melatonina.\n\nRegra 2 — Noite: Dimme todas as luzes 90 minutos antes do seu horário alvo de dormir. Sem luzes de teto. Use abajures na altura da cintura ou abaixo. Isso permite que a melatonina suba naturalmente.\n\nFaça os dois por 5 dias e perceba a mudança.",
      },
      dataPoint: {
        stat: "Horários de despertar consistentes — mesmo após noites de sono ruim — melhoraram as pontuações de qualidade do sono em 34% ao longo de quatro semanas, independentemente da duração total do sono.",
        source: "Journal of Sleep Research, 2018",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Dimme todas as luzes de teto às 21h desta noite. Use apenas abajures abaixo do nível dos olhos. Observe se sentir sono mais cedo que o usual.",
        morning: "Saia ao ar livre dentro de 30 minutos após acordar — sem óculos escuros. Esse único ato programa todo o seu dia circadiano.",
        why: "A luz é o principal zeitgeber (marcador de tempo). A luz matinal define o cortisol. A escuridão noturna libera a melatonina. Juntos, definem sua fase circadiana — a base de todos os outros protocolos de sono.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Charles Czeisler, Medicina do Sono · Harvard",
          source: "Nobel de Fisiologia ou Medicina, 2017",
        },
        {
          citation: "Charles Czeisler (Harvard Medical School, 1999) demonstrou que mesmo luz ambiente fraca (180 lux) suprime a produção noturna de melatonina em 50%, mostrando que os ambientes internos modernos perturbam sistematicamente o timing circadiano.",
          source: "Journal of Biological Rhythms, 1999",
        },
      ],
      nextPreview: "Amanhã: os hábitos específicos que destroem seu sono profundo — o estágio mais restaurador que a maioria das pessoas está perdendo silenciosamente.",
    },
  },
  {
    id: '5',
    en: {
      hook: {
        tag: "The Missing Hours",
        title: "You slept 8 hours. But your body didn't restore itself. Here's what was stolen.",
        body: "Deep sleep — stage N3 — is when your body releases growth hormone, repairs tissue, and your brain runs its biological cleaning cycle. Most people assume they're getting it. Most people are wrong. Several common evening habits systematically block deep sleep without touching total sleep time.",
      },
      insight: {
        tag: "The Discovery",
        title: "You need 1.5–2 hours of deep sleep per night. Six specific habits are stealing yours.",
        body: "Alcohol is the most powerful deep sleep suppressant known — reducing N3 by 20–40% even in moderate amounts. Room temperature above 20°C prevents the core temperature drop required to enter N3. Late caffeine, inconsistent sleep timing, high cortisol, and artificial light at night each independently reduce deep sleep. Most people are doing multiple simultaneously.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Your body needs to cool down to enter deep sleep. Almost everything about modern life prevents this.",
        body: "For your brain to enter N3, your core body temperature must drop approximately 1°C. This requires: a cool room (15–19°C), no stimulants blocking adenosine receptors, low cortisol levels, and a consistent sleep schedule that's synchronized with your circadian phase. Alcohol specifically fragments N3 architecture — you still reach deep sleep, but repeatedly exit it before completing the cycle.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Eliminate the top two deep sleep destroyers tonight.",
        body: "Pick your two biggest offenders from this list and act on them tonight:\n\n1. Temperature: Set room to 18–20°C before bed\n2. Alcohol: Skip it tonight — even one drink costs you N3\n3. Late caffeine: No caffeine after 1pm if you sleep at 10pm\n4. Screen light: All screens off 60 minutes before bed\n5. Stress: 10 minutes of slow breathing or journaling before sleep\n\nTrack your morning energy score tomorrow vs today.",
      },
      dataPoint: {
        stat: "A single moderate dose of alcohol reduces slow-wave (deep) sleep by 24% and increases nighttime waking events by 39% — even when total sleep time is unchanged.",
        source: "Alcoholism: Clinical and Experimental Research, 2015",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "No alcohol. Set bedroom temperature to 18–20°C. These two changes alone can increase deep sleep by 30–40% in one night.",
        morning: "On waking, notice physical recovery: muscle soreness, joint stiffness, overall body heaviness. These are direct signals of deep sleep quality.",
        why: "Deep sleep (N3) is the primary window for physical restoration — growth hormone release, immune strengthening, and metabolic repair all require uninterrupted N3 cycles.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Alcoholism: Clinical and Experimental Research, 2013",
        },
        {
          citation: "Czeisler and colleagues (Harvard, 1994) demonstrated that consistent sleep timing is as critical as duration for achieving adequate slow-wave sleep — irregular schedules reduce N3 by 10–15% per hour of timing variation.",
          source: "Science, 1994",
        },
      ],
      nextPreview: "Tomorrow: what's silently destroying your REM sleep — and why losing it makes you emotionally reactive, less creative, and unable to process stress.",
    },
    pt: {
      hook: {
        tag: "As Horas Roubadas",
        title: "Você dormiu 8 horas. Mas seu corpo não se restaurou. Veja o que foi roubado.",
        body: "O sono profundo — estágio N3 — é quando seu corpo libera hormônio de crescimento, repara tecidos e seu cérebro executa seu ciclo de limpeza biológica. A maioria das pessoas assume que está obtendo isso. A maioria está errada. Vários hábitos noturnos comuns bloqueiam sistematicamente o sono profundo sem afetar o tempo total de sono.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Você precisa de 1,5–2 horas de sono profundo por noite. Seis hábitos específicos estão roubando o seu.",
        body: "O álcool é o supressor de sono profundo mais poderoso conhecido — reduzindo o N3 em 20–40% mesmo em quantidades moderadas. Temperatura do quarto acima de 20°C impede a queda de temperatura central necessária para entrar no N3. Cafeína tardia, timing de sono inconsistente, alto cortisol e luz artificial à noite reduzem o sono profundo de forma independente. A maioria das pessoas faz vários simultaneamente.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Seu corpo precisa esfriar para entrar no sono profundo. Quase tudo na vida moderna impede isso.",
        body: "Para que seu cérebro entre no N3, a temperatura corporal central precisa cair aproximadamente 1°C. Isso requer: quarto fresco (15–19°C), sem estimulantes bloqueando receptores de adenosina, baixos níveis de cortisol e um horário de sono consistente sincronizado com sua fase circadiana. O álcool especificamente fragmenta a arquitetura do N3 — você ainda chega ao sono profundo, mas sai repetidamente dele antes de completar o ciclo.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Elimine os dois maiores destruidores de sono profundo esta noite.",
        body: "Escolha seus dois maiores ofensores desta lista e aja esta noite:\n\n1. Temperatura: Coloque o quarto em 18–20°C antes de dormir\n2. Álcool: Pule esta noite — mesmo uma dose custa N3\n3. Cafeína tardia: Sem cafeína após 13h se você dorme às 22h\n4. Luz de tela: Todas as telas desligadas 60 minutos antes de dormir\n5. Estresse: 10 minutos de respiração lenta ou diário antes de dormir\n\nMonitore sua pontuação de energia matinal amanhã vs hoje.",
      },
      dataPoint: {
        stat: "Uma única dose moderada de álcool reduz o sono de ondas lentas (profundo) em 24% e aumenta os eventos de despertar noturno em 39% — mesmo quando o tempo total de sono não muda.",
        source: "Alcoholism: Clinical and Experimental Research, 2015",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Sem álcool. Coloque a temperatura do quarto em 18–20°C. Essas duas mudanças sozinhas podem aumentar o sono profundo em 30–40% em uma noite.",
        morning: "Ao acordar, observe a recuperação física: dor muscular, rigidez articular, peso corporal geral. Esses são sinais diretos da qualidade do sono profundo.",
        why: "O sono profundo (N3) é a janela principal para restauração física — liberação de hormônio de crescimento, fortalecimento imunológico e reparo metabólico requerem ciclos N3 ininterruptos.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Alcoholism: Clinical and Experimental Research, 2013",
        },
        {
          citation: "Czeisler e colegas (Harvard, 1994) demonstraram que o timing consistente do sono é tão crítico quanto a duração para alcançar sono de ondas lentas adequado — horários irregulares reduzem o N3 em 10–15% por hora de variação.",
          source: "Science, 1994",
        },
      ],
      nextPreview: "Amanhã: o que está destruindo silenciosamente seu sono REM — e por que perdê-lo torna você emocionalmente reativo, menos criativo e incapaz de processar o estresse.",
    },
  },
  {
    id: '6',
    en: {
      hook: {
        tag: "The Invisible Damage",
        title: "You stopped dreaming. That's not a coincidence — it's a warning.",
        body: "REM sleep is when your brain processes emotional memories, makes creative connections, consolidates learning, and regulates mood. Most people who feel emotionally reactive, creatively blocked, or unable to 'shake off' a bad day are running on REM deficit. And the culprits are hiding in plain sight.",
      },
      insight: {
        tag: "The Discovery",
        title: "REM happens in the second half of the night — which is why 'only 5 hours' is disproportionately devastating.",
        body: "The first 3–4 hours of sleep are dominated by deep sleep (N3). REM accumulates in the last 2–3 hours. Cut sleep by 2 hours from the morning end and you lose 60–70% of your total REM — while losing only 20% of your deep sleep. This is why short sleep feels emotionally harder than it feels physically hard.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Alcohol, cannabis, antidepressants, and early wake times are the four primary REM suppressors.",
        body: "Alcohol is the most potent REM suppressant: it delays REM onset and reduces total REM by 40–70% on the night of consumption. Cannabis operates similarly. Many SSRIs significantly suppress REM as a side effect. And every hour of morning sleep cut short steals primarily REM, not deep sleep. Most people are doing at least one of these every night.",
      },
      application: {
        tag: "For You, Starting Tonight",
        title: "Protect your REM window.",
        body: "Three REM protection rules:\n\n1. No alcohol within 3 hours of sleep — ideally not at all on nights you need recovery\n2. Protect your morning sleep: your final 1–2 hours are 70% REM — guard them\n3. Consistent sleep timing: REM peaks are phase-dependent; irregular schedules disrupt when REM occurs\n\nIf you use SSRIs and notice absent dreams, speak to your prescriber — some alternatives have lower REM suppression profiles.",
      },
      dataPoint: {
        stat: "People deprived of REM sleep for one week showed a 40% increase in emotional reactivity to negative stimuli — equivalent to a full-blown anxiety state.",
        source: "Current Biology, Walker et al., 2020",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "No alcohol tonight. If you normally drink in the evening, replace it with a non-caffeinated herbal tea. Your dream recall tomorrow will be the evidence.",
        morning: "Upon waking, lie still for 60 seconds and try to recall any dream fragments. Dream recall is the most accessible proxy for REM quality.",
        why: "REM sleep is the brain's emotional processing system — without it, the prefrontal cortex loses regulatory control over the amygdala, causing emotional flooding and reduced resilience.",
      },
      science: [
        {
          citation: "Matthew Walker and colleagues (UC Berkeley, 2007) demonstrated that one night of REM sleep deprivation increased amygdala reactivity by 60% compared to well-rested controls — showing REM's role as an emotional regulator.",
          source: "Current Biology, 2007",
        },
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Nature Reviews Neuroscience, 2017",
        },
      ],
      nextPreview: "Tomorrow: based on everything you've learned in this first week, we'll build your personal sleep profile — a map of your chronotype, debt, and priority targets.",
    },
    pt: {
      hook: {
        tag: "O Dano Invisível",
        title: "Você parou de sonhar. Isso não é coincidência — é um aviso.",
        body: "O sono REM é quando seu cérebro processa memórias emocionais, faz conexões criativas, consolida o aprendizado e regula o humor. A maioria das pessoas que se sentem emocionalmente reativas, criativamente bloqueadas ou incapazes de 'sacudir' um dia ruim está operando com déficit de REM. E os culpados estão escondidos à vista.",
      },
      insight: {
        tag: "A Descoberta",
        title: "O REM acontece na segunda metade da noite — por isso 'apenas 5 horas' é desproporcionalmente devastador.",
        body: "As primeiras 3–4 horas de sono são dominadas pelo sono profundo (N3). O REM se acumula nas últimas 2–3 horas. Cortar o sono em 2 horas do lado da manhã e você perde 60–70% do seu REM total — enquanto perde apenas 20% do sono profundo. É por isso que o sono curto parece emocionalmente mais pesado do que fisicamente pesado.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Álcool, cannabis, antidepressivos e horários de despertar precoce são os quatro principais supressores de REM.",
        body: "O álcool é o supressor de REM mais potente: atrasa o início do REM e reduz o REM total em 40–70% na noite do consumo. A cannabis opera de forma similar. Muitos SSRIs suprimem significativamente o REM como efeito colateral. E cada hora de sono matinal cortada rouba principalmente REM, não sono profundo. A maioria das pessoas faz pelo menos um desses a cada noite.",
      },
      application: {
        tag: "Para Você, A Partir de Esta Noite",
        title: "Proteja sua janela de REM.",
        body: "Três regras de proteção do REM:\n\n1. Sem álcool dentro de 3 horas do sono — idealmente nem em noites que você precisa de recuperação\n2. Proteja o sono matinal: suas últimas 1–2 horas são 70% REM — guarde-as\n3. Timing de sono consistente: os picos de REM são dependentes de fase; horários irregulares perturbam quando o REM ocorre\n\nSe você usa SSRIs e nota ausência de sonhos, fale com seu médico — algumas alternativas têm perfis de supressão de REM mais baixos.",
      },
      dataPoint: {
        stat: "Pessoas privadas de sono REM por uma semana apresentaram 40% de aumento na reatividade emocional a estímulos negativos — equivalente a um estado de ansiedade completo.",
        source: "Current Biology, Walker et al., 2020",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Sem álcool esta noite. Se você normalmente bebe à noite, substitua por um chá de ervas sem cafeína. Sua lembrança de sonhos amanhã será a evidência.",
        morning: "Ao acordar, fique imóvel por 60 segundos e tente lembrar de quaisquer fragmentos de sonhos. A lembrança de sonhos é o proxy mais acessível para a qualidade do REM.",
        why: "O sono REM é o sistema de processamento emocional do cérebro — sem ele, o córtex pré-frontal perde o controle regulatório sobre a amígdala, causando inundação emocional e resiliência reduzida.",
      },
      science: [
        {
          citation: "Matthew Walker e colegas (UC Berkeley, 2007) demonstraram que uma noite de privação de sono REM aumentou a reatividade da amígdala em 60% em comparação a controles bem descansados — mostrando o papel do REM como regulador emocional.",
          source: "Current Biology, 2007",
        },
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Nature Reviews Neuroscience, 2017",
        },
      ],
      nextPreview: "Amanhã: com base em tudo que você aprendeu nesta primeira semana, vamos construir seu perfil pessoal de sono — um mapa do seu cronotipo, dívida e alvos prioritários.",
    },
  },
  {
    id: '7',
    en: {
      hook: {
        tag: "Your Baseline",
        title: "You've spent 6 days diagnosing your sleep. Today you get the report.",
        body: "Most people go years never understanding why they sleep poorly. You've just spent a week learning the science of your own biology. Now we use that knowledge to build a personal sleep profile — the foundation for everything in Acts 2 and 3.",
      },
      insight: {
        tag: "Your Profile",
        title: "Four elements define your sleep: chronotype, debt, deep sleep quality, and REM quality.",
        body: "Your chronotype (Lesson 2) defines WHEN you should sleep. Your sleep debt (Lesson 3) shows how much recovery you still owe your body. Your deep sleep quality (Lesson 5) reveals physical restoration gaps. Your REM quality (Lesson 6) reveals emotional and cognitive gaps. Together, these four elements create your personalized priority list for Acts 2 and 3.",
      },
      mechanism: {
        tag: "How to Use It",
        title: "Your sleep profile is a targeting system, not a report card.",
        body: "Act 2 (Lessons 8–14) introduces seven evidence-based protocols. Your profile tells you which ones to prioritize:\n\n• Chronotype misaligned with schedule → prioritize Lessons 8 and 11\n• High sleep debt → prioritize Lesson 9 and 10\n• Poor deep sleep → prioritize Lessons 10 and 12\n• Poor REM → prioritize Lessons 12 and 13\n\nEveryone benefits from all protocols — but your profile reveals which will move the needle fastest.",
      },
      application: {
        tag: "Your Profile, Right Now",
        title: "Answer these four questions. Write the answers down.",
        body: "1. What is your natural wake time without an alarm? (reveals chronotype)\n2. How many hours of sleep debt do you estimate you carry? (debt = need − actual × days)\n3. Do you wake feeling physically restored, or with body heaviness? (deep sleep signal)\n4. Do you remember dreams most mornings? Do you feel emotionally even-keeled? (REM signal)\n\nThese answers are your baseline. You'll compare them to your answers after completing Lesson 21.",
      },
      dataPoint: {
        stat: "Individuals who tracked and understood their personal sleep patterns showed 41% greater improvement in sleep quality after 8 weeks compared to those who received generic sleep advice.",
        source: "Sleep Medicine, 2019",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Write your four profile answers before bed. Keep them somewhere you can return to on Day 21.",
        morning: "Share your chronotype with one person who schedules time with you. Understanding your peak window changes how meetings, workouts, and focused work get planned.",
        why: "A personalized sleep profile converts general knowledge into specific action — the gap between knowing sleep science and actually improving your sleep.",
      },
      science: [
        {
          citation: "Based on research by Michael Breus, Chronotype Specialist · The Sleep Doctor",
          source: "Sleep Health, 2018",
        },
        {
          citation: "Based on research by Michael Breus, Chronotype Specialist · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
      ],
      nextPreview: "Act 2 begins tomorrow. Lesson 8: the single most impactful morning habit for sleep — and why most people skip it.",
    },
    pt: {
      hook: {
        tag: "Sua Linha de Base",
        title: "Você passou 6 dias diagnosticando seu sono. Hoje você recebe o relatório.",
        body: "A maioria das pessoas passa anos sem entender por que dorme mal. Você acabou de passar uma semana aprendendo a ciência da sua própria biologia. Agora usamos esse conhecimento para construir um perfil pessoal de sono — a base para tudo nos Atos 2 e 3.",
      },
      insight: {
        tag: "Seu Perfil",
        title: "Quatro elementos definem seu sono: cronotipo, dívida, qualidade do sono profundo e qualidade do REM.",
        body: "Seu cronotipo (Lição 2) define QUANDO você deve dormir. Sua dívida de sono (Lição 3) mostra quanto de recuperação você ainda deve ao seu corpo. Sua qualidade de sono profundo (Lição 5) revela lacunas de restauração física. Sua qualidade de REM (Lição 6) revela lacunas emocionais e cognitivas. Juntos, esses quatro elementos criam sua lista de prioridades personalizada para os Atos 2 e 3.",
      },
      mechanism: {
        tag: "Como Usar",
        title: "Seu perfil de sono é um sistema de mira, não um boletim de notas.",
        body: "O Ato 2 (Lições 8–14) introduz sete protocolos baseados em evidências. Seu perfil diz quais priorizar:\n\n• Cronotipo desalinhado com horário → priorize as Lições 8 e 11\n• Alta dívida de sono → priorize as Lições 9 e 10\n• Sono profundo ruim → priorize as Lições 10 e 12\n• REM ruim → priorize as Lições 12 e 13\n\nTodos se beneficiam de todos os protocolos — mas seu perfil revela quais moverão a agulha mais rápido.",
      },
      application: {
        tag: "Seu Perfil, Agora",
        title: "Responda estas quatro perguntas. Escreva as respostas.",
        body: "1. Qual é seu horário natural de despertar sem alarme? (revela cronotipo)\n2. Quantas horas de dívida de sono você estima carregar? (dívida = necessidade − real × dias)\n3. Você acorda se sentindo fisicamente restaurado, ou com peso corporal? (sinal de sono profundo)\n4. Você lembra de sonhos na maioria das manhãs? Você se sente emocionalmente equilibrado? (sinal de REM)\n\nEssas respostas são sua linha de base. Você as comparará com suas respostas ao completar a Lição 21.",
      },
      dataPoint: {
        stat: "Indivíduos que rastrearam e entenderam seus padrões pessoais de sono mostraram 41% mais melhora na qualidade do sono após 8 semanas em comparação com aqueles que receberam conselhos genéricos.",
        source: "Sleep Medicine, 2019",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Escreva suas quatro respostas de perfil antes de dormir. Guarde-as em algum lugar que você possa retornar no Dia 21.",
        morning: "Compartilhe seu cronotipo com uma pessoa que agenda tempo com você. Entender sua janela de pico muda como reuniões, treinos e trabalho focado são planejados.",
        why: "Um perfil de sono personalizado converte conhecimento geral em ação específica — a diferença entre saber a ciência do sono e realmente melhorar seu sono.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Michael Breus, Especialista em Cronotipos · The Sleep Doctor",
          source: "Sleep Health, 2018",
        },
        {
          citation: "Baseado em pesquisas de Michael Breus, Especialista em Cronotipos · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
      ],
      nextPreview: "O Ato 2 começa amanhã. Lição 8: o hábito matinal de maior impacto para o sono — e por que a maioria das pessoas o pula.",
    },
  },
  {
    id: '20',
    en: {
      hook: {
        tag: "The Double-Edged Tool",
        title: "Tracking your sleep can improve it — or become the reason it gets worse.",
        body: "Sleep trackers are now everywhere. Millions of people check their sleep scores the moment they wake up — and feel anxious when the numbers look wrong. Orthosomnia: the clinical term for sleep anxiety caused by obsessive sleep tracking. You need to know how to use data without letting data use you.",
      },
      insight: {
        tag: "The Discovery",
        title: "Objective data reveals patterns your perception consistently misses.",
        body: "People are notoriously poor at estimating their own sleep quality. Studies show self-reported 'good sleep' correlates only moderately with objective measures. Tracking creates a feedback loop that accelerates improvement — but only when the data informs behavior changes, not when it triggers anxiety spirals. The goal is trends over weeks, not scores on any single night.",
      },
      mechanism: {
        tag: "The Tools",
        title: "Three levels of tracking — choose the level that serves you without stressing you.",
        body: "Level 1 — Sleep Diary: Wake time, sleep time, perceived quality (1–10), caffeine, alcohol, stress. 2 minutes per day. The single most evidence-backed sleep tool.\n\nLevel 2 — App: Sleep Cycle or similar. Uses microphone or accelerometer to estimate sleep stages. Free and low-friction.\n\nLevel 3 — Wearable: Oura Ring, Apple Watch, Garmin. Continuous HR and movement data. Most accurate for trends — least accurate for any single night.",
      },
      application: {
        tag: "For You, Starting Today",
        title: "Set your tracking rules before you start.",
        body: "Rule 1: Never check your sleep score before doing anything else. Eat, move, or step outside first — then check.\n\nRule 2: Evaluate 7-day and 30-day averages, not nightly scores. One bad night is noise. A two-week trend is signal.\n\nRule 3: If checking your score causes anxiety for more than 3 consecutive days, pause tracking for 2 weeks. The habits you've built in this program work without data.\n\nRule 4: Use tracking to identify patterns — not to achieve a perfect score.",
      },
      dataPoint: {
        stat: "A study of Fitbit users found that those who checked sleep data daily had 28% higher sleep anxiety scores than those who reviewed weekly summaries only.",
        source: "Journal of Clinical Sleep Medicine, 2021",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Start a 7-day sleep diary: time to bed, wake time, how you feel on waking (1–10), and one variable you want to test this week.",
        morning: "Rate your morning clarity before looking at any data. Your subjective experience is valid data — don't let a device override what your body tells you.",
        why: "Sleep diaries outperform wearables in producing behavioral change because they require active reflection — the act of recording creates awareness that passive tracking does not.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Journal of Clinical Sleep Medicine, 2017",
        },
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Cochrane Database, 2019",
        },
      ],
      nextPreview: "Tomorrow: your final lesson. We build your Personal Sleep Blueprint — a single document that captures your chronotype, top protocols, and the one remaining challenge to solve.",
    },
    pt: {
      hook: {
        tag: "A Ferramenta de Dois Gumes",
        title: "Rastrear seu sono pode melhorá-lo — ou se tornar o motivo pelo qual piora.",
        body: "Rastreadores de sono estão em todo lugar. Milhões de pessoas verificam suas pontuações de sono no momento em que acordam — e ficam ansiosas quando os números parecem errados. Ortossonia: o termo clínico para ansiedade do sono causada por rastreamento obsessivo. Você precisa saber como usar dados sem deixar que os dados o usem.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Dados objetivos revelam padrões que sua percepção consistentemente perde.",
        body: "As pessoas são notoriamente ruins em estimar sua própria qualidade de sono. Estudos mostram que o 'bom sono' relatado por si mesmo se correlaciona apenas moderadamente com medidas objetivas. O rastreamento cria um ciclo de feedback que acelera a melhora — mas apenas quando os dados informam mudanças de comportamento, não quando desencadeiam espirais de ansiedade. O objetivo são tendências ao longo de semanas, não pontuações em uma única noite.",
      },
      mechanism: {
        tag: "As Ferramentas",
        title: "Três níveis de rastreamento — escolha o nível que te serve sem te estressar.",
        body: "Nível 1 — Diário de sono: Horário de acordar, horário de dormir, qualidade percebida (1–10), cafeína, álcool, estresse. 2 minutos por dia. A ferramenta de sono com mais evidência.\n\nNível 2 — App: Sleep Cycle ou similar. Usa microfone ou acelerômetro para estimar estágios do sono. Gratuito e de baixo atrito.\n\nNível 3 — Wearable: Oura Ring, Apple Watch, Garmin. Dados contínuos de FC e movimento. Mais preciso para tendências — menos preciso para qualquer noite individual.",
      },
      application: {
        tag: "Para Você, A Partir de Hoje",
        title: "Defina suas regras de rastreamento antes de começar.",
        body: "Regra 1: Nunca verifique sua pontuação de sono antes de fazer qualquer outra coisa. Coma, mova-se ou saia primeiro — depois verifique.\n\nRegra 2: Avalie médias de 7 e 30 dias, não pontuações noturnas. Uma noite ruim é ruído. Uma tendência de duas semanas é sinal.\n\nRegra 3: Se verificar sua pontuação causa ansiedade por mais de 3 dias consecutivos, pause o rastreamento por 2 semanas. Os hábitos que você construiu neste programa funcionam sem dados.\n\nRegra 4: Use o rastreamento para identificar padrões — não para alcançar uma pontuação perfeita.",
      },
      dataPoint: {
        stat: "Um estudo com usuários de Fitbit descobriu que aqueles que verificavam dados de sono diariamente tinham pontuações de ansiedade do sono 28% mais altas do que aqueles que revisavam apenas resumos semanais.",
        source: "Journal of Clinical Sleep Medicine, 2021",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Comece um diário de sono de 7 dias: horário de dormir, horário de acordar, como você se sente ao acordar (1–10) e uma variável que você quer testar esta semana.",
        morning: "Avalie sua clareza matinal antes de olhar para qualquer dado. Sua experiência subjetiva é dado válido — não deixe um dispositivo sobrepor o que seu corpo te diz.",
        why: "Diários de sono superam wearables na produção de mudança comportamental porque exigem reflexão ativa — o ato de registrar cria consciência que o rastreamento passivo não cria.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Journal of Clinical Sleep Medicine, 2017",
        },
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Cochrane Database, 2019",
        },
      ],
      nextPreview: "Amanhã: sua lição final. Construímos seu Plano Pessoal de Sono — um único documento que captura seu cronotipo, principais protocolos e o único desafio restante a resolver.",
    },
  },
  {
    id: '8',
    en: {
      hook: {
        tag: "Today's Mistake",
        title: "You woke up. Checked your phone. Made coffee. All in the dark.",
        body: "This 10-minute morning habit is silently setting up tonight's sleep failure — not now, but 16 hours from now. Most people fix their evenings when the fix was always in the morning.",
      },
      insight: {
        tag: "The Discovery",
        title: "Morning light is the master switch that sets every clock in your body.",
        body: "Your body has thousands of clocks — in every organ and cell. They only stay synchronized when the brain's master clock receives one signal each morning: outdoor light. Miss it, and melatonin, cortisol, body temperature and digestion all drift out of phase by tonight.",
      },
      mechanism: {
        tag: "The Biology",
        title: "One specific cell type wires your eye directly to your sleep timer.",
        body: "Your retina contains ipRGCs — cells sensitive to the short-wavelength light abundant in morning sky. When triggered, they fire directly to the suprachiasmatic nucleus (SCN), the brain's master clock. The SCN then starts a 14–16 hour countdown: melatonin release at the end of it. No morning light = countdown never starts = melatonin arrives late = you can't fall asleep.",
      },
      application: {
        tag: "For You, This Morning",
        title: "One action. Tomorrow morning.",
        body: "Step outside within 20 minutes of waking. Look toward the bright part of the sky for 10 minutes. No sunglasses. No phone first. This single action programs your melatonin release for tonight.",
      },
      dataPoint: {
        stat: "Morning light exposure within 30 minutes of waking reduced sleep onset time by 37% after just 4 weeks.",
        source: "Sleep Medicine, 2021",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Leave your shoes or jacket by the door tonight — a physical trigger for tomorrow's morning light walk.",
        morning: "Step outside within 20 minutes of waking. No sunglasses. Face the bright part of the sky for 10 minutes. Phone goes back inside.",
        why: "Morning light fires ipRGCs → resets the SCN → programs melatonin release exactly 14–16 hours later, setting your sleep timing for tonight.",
      },
      science: [
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Cell, 2012",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Current Biology, 2013",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Dialogues in Clinical Neuroscience, 2006",
        },
      ],
      nextPreview: "Tomorrow: why the coffee you drink each morning might be secretly programming you to feel tired by 3pm — and the exact time to stop.",
    },
    pt: {
      hook: {
        tag: "O Erro de Hoje",
        title: "Você acordou. Abriu o celular. Fez café. Tudo no escuro.",
        body: "Esse hábito matinal de 10 minutos está silenciosamente configurando o fracasso do sono desta noite — não agora, mas 16 horas depois. A maioria das pessoas tenta corrigir a noite quando a solução sempre esteve na manhã.",
      },
      insight: {
        tag: "A Descoberta",
        title: "A luz matinal é o interruptor mestre que define todos os relógios do seu corpo.",
        body: "Seu corpo tem milhares de relógios — em cada órgão e célula. Eles só se mantêm sincronizados quando o relógio mestre do cérebro recebe um sinal a cada manhã: luz ao ar livre. Sem ele, melatonina, cortisol, temperatura corporal e digestão ficam todos fora de fase até esta noite.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Um tipo específico de célula conecta seu olho diretamente ao seu timer de sono.",
        body: "Sua retina contém ipRGCs — células sensíveis à luz de curto comprimento de onda, abundante no céu matinal. Quando ativadas, elas enviam sinal diretamente ao núcleo supraquiasmático (NSQ), o relógio mestre do cérebro. O NSQ inicia uma contagem regressiva de 14–16 horas: liberação de melatonina ao final. Sem luz matinal = contagem regressiva não começa = melatonina chega tarde = você não consegue dormir.",
      },
      application: {
        tag: "Para Você, Esta Manhã",
        title: "Uma ação. Amanhã de manhã.",
        body: "Saia ao ar livre dentro de 20 minutos após acordar. Olhe para a parte clara do céu por 10 minutos. Sem óculos escuros. Sem celular primeiro. Essa única ação programa a liberação de melatonina para esta noite.",
      },
      dataPoint: {
        stat: "Exposição à luz matinal nos primeiros 30 minutos após acordar reduziu o tempo para adormecer em 37% após apenas 4 semanas.",
        source: "Sleep Medicine, 2021",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Deixe os tênis ou a jaqueta na porta esta noite — um gatilho físico para a caminhada à luz de amanhã de manhã.",
        morning: "Saia ao ar livre dentro de 20 minutos após acordar. Sem óculos escuros. Olhe para a parte clara do céu por 10 minutos. Celular fica dentro de casa.",
        why: "A luz matinal ativa as ipRGCs → redefine o NSQ → programa a liberação de melatonina exatamente 14–16h depois, definindo o timing do sono desta noite.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Cell, 2012",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Current Biology, 2013",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Dialogues in Clinical Neuroscience, 2006",
        },
      ],
      nextPreview: "Amanhã: por que o café que você bebe de manhã pode estar programando cansaço às 15h — e o horário exato para parar.",
    },
  },
  {
    id: '9',
    en: {
      hook: {
        tag: "The Hidden Saboteur",
        title: "You had one coffee at 2pm. You fell asleep by 11pm. You still woke up exhausted.",
        body: "Caffeine doesn't just keep you awake — it blocks the molecule that tells your brain how tired you are. And it stays in your system far longer than most people realize.",
      },
      insight: {
        tag: "The Discovery",
        title: "Caffeine doesn't give you energy. It hides how tired you already are.",
        body: "Adenosine is a molecule that builds up in your brain all day, creating sleep pressure. Caffeine works by blocking adenosine receptors — masking the fatigue signal, not clearing it. When caffeine clears from your system, all that adenosine crashes back at once. That 3pm slump isn't caffeine wearing off — it's reality returning.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Caffeine has a half-life of 5–7 hours. The math is brutal.",
        body: "A coffee at 2pm means 50% of that caffeine is still in your system at 8pm. Another 50% remains at 2am. Even when you fall asleep, caffeine reduces deep sleep (N3) by up to 20% — silently degrading the sleep that clears your brain. You sleep the hours but miss the restoration.",
      },
      application: {
        tag: "For You, Tonight",
        title: "The last coffee of your day is probably 4 hours too late.",
        body: "Your caffeine cutoff should be 10–12 hours before your target sleep time. If you sleep at 10pm, your last coffee is at 10am. If you sleep at midnight, it's noon. Adjust your last cup accordingly — tonight.",
      },
      dataPoint: {
        stat: "A double espresso 6 hours before sleep reduced total deep sleep by 20% — equivalent to ageing 10 years overnight.",
        source: "Journal of Clinical Sleep Medicine, 2013",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Identify your current last-coffee time. Move it 1 hour earlier, starting tomorrow. If it's already before noon, hold it.",
        morning: "Before your first coffee, drink 500ml of water. Wait 90 minutes after waking before caffeine — this allows cortisol to peak naturally first.",
        why: "Caffeine blocks adenosine receptors for 5–7 hours. Consuming it after noon keeps receptors blocked during deep sleep windows, reducing N3 quality.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Journal of Clinical Sleep Medicine, 2013",
        },
        {
          citation: "In Why We Sleep, Matthew Walker (UC Berkeley, 2017) describes adenosine as the brain's chemical barometer for sleep need — and caffeine as a molecule that temporarily disconnects that gauge without clearing the underlying fatigue.",
          source: "Why We Sleep, 2017",
        },
      ],
      nextPreview: "Tomorrow: the overlooked thermostat setting that's keeping you out of deep sleep — and costs nothing to fix.",
    },
    pt: {
      hook: {
        tag: "O Sabotador Oculto",
        title: "Você tomou um café às 14h. Dormiu às 23h. Ainda acordou exausto.",
        body: "A cafeína não apenas mantém você acordado — ela bloqueia a molécula que diz ao seu cérebro o quanto você está cansado. E permanece no seu sistema muito mais tempo do que a maioria das pessoas percebe.",
      },
      insight: {
        tag: "A Descoberta",
        title: "A cafeína não dá energia. Ela esconde o cansaço que você já tem.",
        body: "A adenosina é uma molécula que se acumula no cérebro ao longo do dia, criando pressão de sono. A cafeína funciona bloqueando receptores de adenosina — mascarando o sinal de fadiga, sem eliminá-lo. Quando a cafeína se vai, toda aquela adenosina retorna de uma vez. A queda das 15h não é a cafeína acabando — é a realidade voltando.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "A cafeína tem meia-vida de 5–7 horas. A matemática é brutal.",
        body: "Um café às 14h significa que 50% da cafeína ainda está no sistema às 20h. Outros 50% permanecem às 2h da manhã. Mesmo quando você dorme, a cafeína reduz o sono profundo (N3) em até 20% — degradando silenciosamente o sono que limpa seu cérebro. Você dorme as horas, mas perde a restauração.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "O último café do seu dia provavelmente é 4 horas tarde demais.",
        body: "O corte de cafeína deve ser 10–12 horas antes do horário-alvo de sono. Se você dorme às 22h, o último café é às 10h. Se dorme à meia-noite, é ao meio-dia. Ajuste o último café de acordo — a partir de hoje.",
      },
      dataPoint: {
        stat: "Um café duplo 6 horas antes do sono reduziu o sono profundo total em 20% — equivalente a envelhecer 10 anos em uma noite.",
        source: "Journal of Clinical Sleep Medicine, 2013",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Identifique o horário atual do seu último café. Adiante-o 1 hora, começando amanhã. Se já é antes do meio-dia, mantenha.",
        morning: "Antes do primeiro café, beba 500ml de água. Espere 90 minutos após acordar antes da cafeína — isso permite que o cortisol alcance o pico naturalmente primeiro.",
        why: "A cafeína bloqueia receptores de adenosina por 5–7 horas. Consumida depois do meio-dia, mantém os receptores bloqueados durante as janelas de sono profundo, reduzindo a qualidade do N3.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Journal of Clinical Sleep Medicine, 2013",
        },
        {
          citation: "Em Por que Dormimos, Matthew Walker (UC Berkeley, 2017) descreve a adenosina como o barômetro químico do cérebro para a necessidade de sono — e a cafeína como uma molécula que desconecta temporariamente esse medidor sem eliminar o cansaço subjacente.",
          source: "Por que Dormimos, 2017",
        },
      ],
      nextPreview: "Amanhã: a configuração esquecida do termostato que está te impedindo de ter sono profundo — e não custa nada corrigir.",
    },
  },
  {
    id: '10',
    en: {
      hook: {
        tag: "The Invisible Problem",
        title: "Your bedroom is 22°C. You think that's fine. Your body disagrees.",
        body: "Temperature is the most underestimated sleep lever that exists. You can do everything right — no screens, no caffeine — and still get fragmented sleep because your room is 3 degrees too warm.",
      },
      insight: {
        tag: "The Discovery",
        title: "Your body needs to drop its core temperature 1°C to fall asleep — and the room must help it happen.",
        body: "Falling asleep is not a mental state. It's a physical process driven by temperature. Your brain can't initiate sleep until core body temperature drops approximately 1°C. If your room is too warm, your body can't lose heat fast enough. You lay there. You're tired. But biology won't let you cross the threshold.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Peripheral vasodilation — the overlooked mechanism that pulls heat out of your core.",
        body: "About an hour before sleep, your body opens blood vessels in your hands, feet and face (peripheral vasodilation) to radiate heat outward. This drops core temperature, triggering melatonin and initiating sleep stages. A room at 18–20°C gives your body the thermal gradient it needs. A room at 23°C blocks heat loss — the process stalls and sleep fragments.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Your target: 18°C in the bedroom, one hour before bed.",
        body: "Set your thermostat or open a window. If you can't control the temperature directly, a warm shower 30–60 minutes before bed creates the same vasodilation effect — your body over-cools afterward, speeding sleep onset.",
      },
      dataPoint: {
        stat: "Sleeping in a room cooled to 19°C increased deep sleep by 17% compared to sleeping at 23°C.",
        source: "Journal of Physiological Anthropology, 2012",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Lower your bedroom temperature to 18–20°C at least 1 hour before bed. Open a window, turn on a fan, or set the AC.",
        morning: "Note how you felt. Did you wake naturally before your alarm? That's a sign of correctly timed temperature.",
        why: "Core body temperature must drop ~1°C to initiate sleep. A cooler room accelerates peripheral vasodilation and heat loss from the core.",
      },
      science: [
        {
          citation: "Based on research by Michael Breus, Chronotype Specialist · The Sleep Doctor",
          source: "Brain, 2008",
        },
        {
          citation: "Michael Breus's clinical work confirmed that the thermoneutral zone for sleep onset in adults is 15–19°C — above this range, sleep onset is delayed and N3 sleep is reduced.",
          source: "The Sleep Doctor's Diet Plan, 2011",
        },
      ],
      nextPreview: "Tomorrow: the specific type of light exposure after dark that suppresses your melatonin by 50% — even at low intensities.",
    },
    pt: {
      hook: {
        tag: "O Problema Invisível",
        title: "Seu quarto está a 22°C. Você acha que está bom. Seu corpo discorda.",
        body: "A temperatura é a alavanca de sono mais subestimada que existe. Você pode fazer tudo certo — sem telas, sem cafeína — e ainda ter sono fragmentado porque o quarto está 3 graus quente demais.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Seu corpo precisa reduzir a temperatura central em 1°C para dormir — e o ambiente precisa ajudar.",
        body: "Adormecer não é um estado mental. É um processo físico guiado pela temperatura. O cérebro não consegue iniciar o sono até que a temperatura corporal central caia cerca de 1°C. Se o quarto está muito quente, o corpo não consegue perder calor rápido o suficiente. Você fica deitado. Está cansado. Mas a biologia não deixa cruzar o limiar.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Vasodilatação periférica — o mecanismo esquecido que extrai calor do seu núcleo.",
        body: "Cerca de uma hora antes do sono, o corpo abre os vasos sanguíneos das mãos, pés e rosto (vasodilatação periférica) para irradiar calor para fora. Isso reduz a temperatura central, acionando melatonina e iniciando os estágios do sono. Um quarto a 18–20°C dá ao corpo o gradiente térmico necessário. Um quarto a 23°C bloqueia a perda de calor — o processo para e o sono fragmenta.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Alvo: 18°C no quarto, uma hora antes de dormir.",
        body: "Ajuste o termostato ou abra uma janela. Se não consegue controlar a temperatura, um banho quente 30–60 minutos antes da cama cria o mesmo efeito de vasodilatação — o corpo esfria demais depois, acelerando o início do sono.",
      },
      dataPoint: {
        stat: "Dormir em um quarto resfriado a 19°C aumentou o sono profundo em 17% em comparação com dormir a 23°C.",
        source: "Journal of Physiological Anthropology, 2012",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Reduza a temperatura do quarto para 18–20°C pelo menos 1 hora antes de dormir. Abra uma janela, ligue um ventilador ou o ar-condicionado.",
        morning: "Observe como se sentiu. Acordou naturalmente antes do alarme? Isso é sinal de temperatura corretamente ajustada.",
        why: "A temperatura central do corpo precisa cair ~1°C para iniciar o sono. Um quarto mais frio acelera a vasodilatação periférica e a perda de calor do núcleo.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Michael Breus, Especialista em Cronotipos · The Sleep Doctor",
          source: "Brain, 2008",
        },
        {
          citation: "O trabalho clínico de Michael Breus confirmou que a zona termoneutra para o início do sono em adultos é de 15–19°C — acima dessa faixa, o início do sono é atrasado e o sono N3 é reduzido.",
          source: "The Sleep Doctor's Diet Plan, 2011",
        },
      ],
      nextPreview: "Amanhã: o tipo específico de exposição à luz após escurecer que suprime sua melatonina em 50% — mesmo em baixas intensidades.",
    },
  },
  {
    id: '15',
    en: {
      hook: {
        tag: "The Good Habit Gone Wrong",
        title: "You worked out at 7pm. You were exhausted by 9pm. But you couldn't fall asleep until midnight.",
        body: "Exercise is one of the best things you can do for sleep — but the timing can flip the benefit into a problem. Most people don't know there's a 6-hour window after intense exercise where your body actively fights sleep.",
      },
      insight: {
        tag: "The Discovery",
        title: "Intense evening exercise raises core temperature, cortisol and adrenaline — three things that block sleep.",
        body: "Exercise is not just about tired muscles. High-intensity exercise triggers your stress response system: cortisol surges, norepinephrine rises, core temperature climbs. These are all arousal signals. Your body needs 4–6 hours to return them to baseline. Exercise at 7pm means those signals peak at 9–10pm — exactly when you need them to fall.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Adenosine builds faster with exercise — but so does cortisol.",
        body: "Physical activity accelerates adenosine accumulation, which is what makes exercise great for sleep. The problem is that intense exercise also spikes cortisol and raises core body temperature. Both suppress melatonin and delay sleep onset. Morning exercise gets all the adenosine benefit without the cortisol cost — your stress hormones have 14+ hours to return to baseline.",
      },
      application: {
        tag: "For You, Tonight",
        title: "If you can't exercise in the morning, the cutoff is 3pm for high intensity.",
        body: "Morning or early afternoon exercise produces the best sleep outcomes. Evening exercise should be low-intensity only — walking, yoga, stretching. If your schedule forces evening workouts, finish by 6pm and take a cool shower immediately after to accelerate core temperature drop.",
      },
      dataPoint: {
        stat: "Morning exercise increased sleep quality by 25% and reduced nighttime awakenings by 36% compared to evening exercise.",
        source: "Vascular Health and Risk Management, 2011",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "If you exercised today after 5pm, open a window tonight — your core temperature is higher than usual and you need the extra cooling.",
        morning: "If you can, do 10–20 minutes of movement outside within 1 hour of waking. Even a walk counts. Stack the light and the exercise benefit together.",
        why: "Exercise increases adenosine (good) but also cortisol and core temp (bad at night). Timing separates the benefit from the cost.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Mental Health and Physical Activity, 2019",
        },
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep Medicine Reviews, 2014",
        },
      ],
      nextPreview: "Tomorrow: how eating after 8pm directly fragments your sleep — and the 2-hour rule that changes everything.",
    },
    pt: {
      hook: {
        tag: "O Bom Hábito no Horário Errado",
        title: "Você se exercitou às 19h. Estava exausto às 21h. Mas não conseguiu dormir até meia-noite.",
        body: "O exercício é uma das melhores coisas para o sono — mas o horário pode transformar o benefício em problema. A maioria das pessoas não sabe que existe uma janela de 6 horas após exercício intenso em que o corpo ativamente resiste ao sono.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Exercício intenso à noite eleva temperatura central, cortisol e adrenalina — três coisas que bloqueiam o sono.",
        body: "O exercício não se trata apenas de músculos cansados. Exercício de alta intensidade aciona o sistema de resposta ao estresse: cortisol dispara, norepinefrina sobe, temperatura central sobe. Esses são sinais de alerta. O corpo precisa de 4–6 horas para retorná-los à linha de base. Exercício às 19h significa que esses sinais atingem o pico às 21–22h — exatamente quando precisam cair.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "A adenosina se acumula mais rápido com exercício — mas o cortisol também.",
        body: "A atividade física acelera o acúmulo de adenosina, o que torna o exercício ótimo para o sono. O problema é que o exercício intenso também dispara cortisol e eleva a temperatura corporal central. Ambos suprimem a melatonina e atrasam o início do sono. O exercício matinal obtém todos os benefícios da adenosina sem o custo do cortisol — os hormônios de estresse têm 14+ horas para voltar à linha de base.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Se não consegue se exercitar de manhã, o corte é 15h para alta intensidade.",
        body: "Exercício matinal ou no início da tarde produz os melhores resultados para o sono. Exercício noturno deve ser de baixa intensidade — caminhada, yoga, alongamento. Se sua agenda obriga treinos noturnos, termine até as 18h e tome um banho frio imediatamente depois para acelerar a queda da temperatura central.",
      },
      dataPoint: {
        stat: "Exercício matinal aumentou a qualidade do sono em 25% e reduziu os despertares noturnos em 36% em comparação ao exercício noturno.",
        source: "Vascular Health and Risk Management, 2011",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Se você se exercitou hoje após as 17h, abra uma janela esta noite — sua temperatura central está mais alta que o normal e você precisa de resfriamento extra.",
        morning: "Se possível, faça 10–20 minutos de movimento ao ar livre dentro de 1 hora após acordar. Até uma caminhada conta. Combine o benefício da luz com o do exercício.",
        why: "O exercício aumenta adenosina (bom) mas também cortisol e temperatura central (ruim à noite). O timing separa o benefício do custo.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Mental Health and Physical Activity, 2019",
        },
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep Medicine Reviews, 2014",
        },
      ],
      nextPreview: "Amanhã: como comer após as 20h fragmenta diretamente o seu sono — e a regra das 2 horas que muda tudo.",
    },
  },
  {
    id: '13',
    en: {
      hook: {
        tag: "The Transition Problem",
        title: "You closed your laptop. You got into bed. You lay there with your brain still running.",
        body: "Your nervous system doesn't switch states instantly. Going from high-stimulation work directly to bed is biologically equivalent to slamming on the brakes at highway speed. The car doesn't stop immediately — and neither does your brain.",
      },
      insight: {
        tag: "The Discovery",
        title: "Sleep doesn't start in bed. It starts 60–90 minutes before you lie down.",
        body: "The parasympathetic nervous system — the branch that enables sleep — is activated gradually by environmental signals: dimming light, falling temperature, reduced mental stimulation, slower breathing. You can't flip it on at bedtime. You have to walk it there, one step at a time, over 60–90 minutes.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Cortisol and norepinephrine must fall before melatonin can rise.",
        body: "During the day, the sympathetic ('fight or flight') system dominates — cortisol and norepinephrine are elevated. Sleep requires their replacement by parasympathetic signaling. But cortisol has a slow decay curve — it doesn't drop at your command. A wind-down routine creates the environmental conditions that accelerate this transition: light reduction, thermal cooling, cognitive deceleration.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Begin your wind-down routine 60–90 minutes before bed — not when you get into bed.",
        body: "The sequence matters: first close work (not just minimize it), then reduce light, then do something mentally passive (physical book, light stretching, a warm shower). Each step signals your nervous system to decelerate one gear at a time.",
      },
      dataPoint: {
        stat: "A 45-minute pre-sleep routine reduced sleep onset time by 28% and increased deep sleep by 14% in a 4-week trial.",
        source: "Journal of Sleep Research, 2018",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Tonight: 90 minutes before bed, close all work. 60 minutes before: switch to one warm lamp only. 30 minutes before: warm shower or bath. Then a physical book or light stretching until sleep.",
        morning: "Did you fall asleep within 20 minutes? That's the target. Adjust the routine start time if needed.",
        why: "Cortisol and norepinephrine decay slowly. A structured wind-down creates environmental conditions that accelerate their fall, allowing melatonin to rise and sleep to initiate.",
      },
      science: [
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Journal of Sleep Research, 2018",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Mayo Clinic Proceedings, 1974",
        },
      ],
      nextPreview: "Tomorrow: how chronic stress rewires your sleep architecture — and one intervention that resets cortisol rhythms in 5 days.",
    },
    pt: {
      hook: {
        tag: "O Problema da Transição",
        title: "Você fechou o notebook. Foi para a cama. Ficou deitado com o cérebro ainda funcionando.",
        body: "Seu sistema nervoso não muda de estado instantaneamente. Ir de um trabalho de alta estimulação diretamente para a cama é biologicamente equivalente a frear em velocidade de rodovia. O carro não para imediatamente — e seu cérebro também não.",
      },
      insight: {
        tag: "A Descoberta",
        title: "O sono não começa na cama. Começa 60–90 minutos antes de você deitar.",
        body: "O sistema nervoso parassimpático — o ramo que permite o sono — é ativado gradualmente por sinais ambientais: luz diminuindo, temperatura caindo, estimulação mental reduzida, respiração mais lenta. Você não consegue ativá-lo na hora de dormir. Você precisa caminhar até lá, um passo de cada vez, ao longo de 60–90 minutos.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Cortisol e norepinefrina precisam cair antes que a melatonina possa subir.",
        body: "Durante o dia, o sistema simpático ('luta ou fuga') domina — cortisol e norepinefrina estão elevados. O sono requer sua substituição pela sinalização parassimpática. Mas o cortisol tem uma curva de decaimento lenta — não cai por comando. Uma rotina de desaceleração cria as condições ambientais que aceleram essa transição: redução de luz, resfriamento térmico, desaceleração cognitiva.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Inicie a rotina de desaceleração 60–90 minutos antes de dormir — não quando for para a cama.",
        body: "A sequência importa: primeiro feche o trabalho (não apenas minimize), depois reduza a luz, depois faça algo mentalmente passivo (livro físico, alongamento leve, banho quente). Cada passo sinaliza ao sistema nervoso para desacelerar uma marcha de cada vez.",
      },
      dataPoint: {
        stat: "Uma rotina pré-sono de 45 minutos reduziu o tempo para adormecer em 28% e aumentou o sono profundo em 14% em um teste de 4 semanas.",
        source: "Journal of Sleep Research, 2018",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Esta noite: 90 minutos antes de dormir, feche todo trabalho. 60 minutos antes: apenas um abajur de luz quente. 30 minutos antes: banho quente. Depois um livro físico ou alongamento leve até adormecer.",
        morning: "Adormecer levou menos de 20 minutos? Esse é o alvo. Ajuste o horário de início da rotina se necessário.",
        why: "Cortisol e norepinefrina decaem lentamente. Uma desaceleração estruturada cria condições ambientais que aceleram sua queda, permitindo que a melatonina suba e o sono inicie.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Journal of Sleep Research, 2018",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Mayo Clinic Proceedings, 1974",
        },
      ],
      nextPreview: "Amanhã: como o estresse crônico reconfigura a arquitetura do seu sono — e uma intervenção que redefine os ritmos de cortisol em 5 dias.",
    },
  },
  {
    id: '16',
    en: {
      hook: {
        tag: "The Spiral",
        title: "You're stressed. You can't sleep. The fact that you can't sleep makes you more stressed.",
        body: "Stress and sleep have a bidirectional relationship that can spiral in either direction. Most people try to solve the stress to fix the sleep — but the faster fix is to break the cycle at the sleep end first.",
      },
      insight: {
        tag: "The Discovery",
        title: "Cortisol and melatonin are chemical opposites — when one rises, the other falls.",
        body: "Cortisol is your primary stress hormone. Melatonin is your primary sleep hormone. They operate on a strict seesaw: elevated cortisol directly suppresses melatonin release. Chronic stress keeps cortisol elevated at night — which is why anxious people lie awake with their mind racing despite being exhausted. The fatigue is real. The sleep block is also real.",
      },
      mechanism: {
        tag: "The Biology",
        title: "The HPA axis — your stress system — has a predictable daily rhythm that stress disrupts.",
        body: "The hypothalamic-pituitary-adrenal (HPA) axis regulates cortisol. Under normal conditions, cortisol peaks at 6–8am (the cortisol awakening response) and falls through the day, reaching minimum at midnight. Chronic stress flattens this curve — cortisol stays elevated all day and into the night, preventing the nighttime melatonin window from opening.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Write down tomorrow's worries tonight — then close the notebook.",
        body: "The practice of structured worry journaling before bed moves active concerns from working memory to external storage, reducing the cognitive arousal that keeps the HPA axis activated. It sounds too simple. The data says it works.",
      },
      dataPoint: {
        stat: "5 minutes of writing a to-do list before bed — specifically what you plan to do tomorrow — reduced sleep onset time by 9 minutes on average.",
        source: "Journal of Experimental Psychology: General, 2018",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Before bed: write down every unfinished task or concern on paper. Then write one sentence about when you'll address each. Close the notebook. Done.",
        morning: "After waking: reopen the notebook and review. This creates a reliable loop — the brain learns the journal is trustworthy and stops rehearsing at night.",
        why: "Writing externalizes active cognitive load, reducing HPA axis arousal. The hippocampus can stop rehearsing unsolved problems once they're in external storage.",
      },
      science: [
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Journal of Experimental Psychology: General, 2018",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Why Zebras Don't Get Ulcers, 2004",
        },
      ],
      nextPreview: "Tomorrow: why your morning alarm is the single most powerful lever for sleep — and how setting it differently changes everything.",
    },
    pt: {
      hook: {
        tag: "A Espiral",
        title: "Você está estressado. Não consegue dormir. O fato de não conseguir dormir te estressou ainda mais.",
        body: "Estresse e sono têm uma relação bidirecional que pode se espiralar em qualquer direção. A maioria das pessoas tenta resolver o estresse para consertar o sono — mas a solução mais rápida é quebrar o ciclo pelo lado do sono primeiro.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Cortisol e melatonina são opostos químicos — quando um sobe, o outro cai.",
        body: "O cortisol é o seu principal hormônio de estresse. A melatonina é o seu principal hormônio do sono. Eles operam numa gangorra rígida: cortisol elevado suprime diretamente a liberação de melatonina. O estresse crônico mantém o cortisol elevado à noite — por isso pessoas ansiosas ficam acordadas com a mente acelerada apesar de estarem exaustas. A fadiga é real. O bloqueio do sono também é real.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "O eixo HPA — seu sistema de estresse — tem um ritmo diário previsível que o estresse perturba.",
        body: "O eixo hipotálamo-hipófise-adrenal (HPA) regula o cortisol. Em condições normais, o cortisol atinge o pico às 6–8h (a resposta de despertar do cortisol) e cai ao longo do dia, chegando ao mínimo à meia-noite. O estresse crônico achata essa curva — o cortisol permanece elevado todo o dia e durante a noite, impedindo que a janela noturna de melatonina se abra.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Escreva as preocupações de amanhã esta noite — depois feche o caderno.",
        body: "A prática do diário de preocupações estruturado antes de dormir move preocupações ativas da memória de trabalho para armazenamento externo, reduzindo o estado de alerta cognitivo que mantém o eixo HPA ativado. Parece simples demais. Os dados dizem que funciona.",
      },
      dataPoint: {
        stat: "5 minutos escrevendo uma lista de tarefas antes de dormir — especificamente o que você planeja fazer amanhã — reduziu o tempo para adormecer em 9 minutos em média.",
        source: "Journal of Experimental Psychology: General, 2018",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Antes de dormir: escreva no papel cada tarefa inacabada ou preocupação. Depois escreva uma frase sobre quando você vai resolver cada uma. Feche o caderno. Pronto.",
        morning: "Após acordar: reabra o caderno e revise. Isso cria um ciclo confiável — o cérebro aprende que o diário é confiável e para de ensaiar de noite.",
        why: "Escrever externaliza a carga cognitiva ativa, reduzindo o estado de alerta do eixo HPA. O hipocampo pode parar de ensaiar problemas não resolvidos uma vez que estão em armazenamento externo.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Journal of Experimental Psychology: General, 2018",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Por que as Zebras Não Têm Úlcera, 2004",
        },
      ],
      nextPreview: "Amanhã: por que o alarme matinal é a alavanca mais poderosa para o sono — e como configurá-lo de forma diferente muda tudo.",
    },
  },
  {
    id: '11',
    en: {
      hook: {
        tag: "The Wrong Start",
        title: "Your alarm goes off. You hit snooze twice. You check your phone. You feel terrible for the next hour.",
        body: "The first 30 minutes after waking sets the neurochemical tone for the entire day — and most people spend it in a low-grade cortisol spiral. There is a better sequence. It takes the same 30 minutes.",
      },
      insight: {
        tag: "The Discovery",
        title: "The cortisol awakening response is the most powerful natural performance enhancer you're ignoring.",
        body: "Every morning, 30–45 minutes after waking, cortisol surges to 2–3× baseline. This is not stress — it's the biological equivalent of your brain's morning boot sequence: sharpening focus, organizing memory, priming the immune system. Optimize for it and you get a sharper, calmer day. Disrupt it (with snooze alarms, darkness, and phone scrolling) and you suppress it.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Light, movement, and cold exposure all amplify the cortisol awakening response.",
        body: "The cortisol awakening response is triggered by light (via ipRGCs) and physical movement (via sympathetic activation). Cold exposure (cold water on face or a cold shower) adds a second catecholamine spike — sharpening alertness rapidly. Done in the first 30 minutes, these three inputs produce a cortisol peak that clears adenosine, kills residual melatonin, and primes the prefrontal cortex for complex thought.",
      },
      application: {
        tag: "For You, Tomorrow Morning",
        title: "The first 30 minutes of your day determines the quality of the next 16.",
        body: "Sequence: (1) No snooze — sit up immediately. (2) Cold water on face or 30-second cold shower. (3) Step outside — 10 minutes of morning light. (4) Move — even 5 minutes of walking. Skip the phone until step 4 is done.",
      },
      dataPoint: {
        stat: "The cortisol awakening response is 50% larger in people with consistent wake times versus irregular schedules — independent of total sleep duration.",
        source: "Psychoneuroendocrinology, 2012",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Set one alarm only. No snooze option. Place your phone across the room so you have to stand up to turn it off.",
        morning: "Stand up the moment the alarm sounds. Splash cold water on your face. Then go outside for 10 minutes of light before looking at your phone.",
        why: "The cortisol awakening response (CAR) is amplified by light, movement and cold — and suppressed by darkness, inactivity and snooze fragments. The first 30 minutes sets the neurochemical tone for the full day.",
      },
      science: [
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Life Sciences, 1997",
        },
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Psychoneuroendocrinology, 2009",
        },
      ],
      nextPreview: "Tomorrow: why a 20-minute afternoon nap outperforms an extra hour of nighttime sleep — and the exact timing that doesn't destroy your evening.",
    },
    pt: {
      hook: {
        tag: "O Começo Errado",
        title: "O alarme tocou. Você apertou soneca duas vezes. Abriu o celular. Se sentiu péssimo pela hora seguinte.",
        body: "Os primeiros 30 minutos após acordar definem o tom neuroquímico de todo o dia — e a maioria das pessoas os passa em uma espiral de cortisol de baixo grau. Existe uma sequência melhor. Leva os mesmos 30 minutos.",
      },
      insight: {
        tag: "A Descoberta",
        title: "A resposta de despertar do cortisol é o melhorador de desempenho natural mais poderoso que você está ignorando.",
        body: "Toda manhã, 30–45 minutos após acordar, o cortisol sobe para 2–3× a linha de base. Isso não é estresse — é o equivalente biológico da sequência de boot matinal do seu cérebro: afiando o foco, organizando a memória, preparando o sistema imunológico. Otimize-o e você tem um dia mais nítido e calmo. Perturbe-o (com sonecas, escuridão e rolagem de celular) e você o suprime.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Luz, movimento e exposição ao frio amplificam a resposta de despertar do cortisol.",
        body: "A resposta de despertar do cortisol é acionada pela luz (via ipRGCs) e movimento físico (via ativação simpática). A exposição ao frio (água fria no rosto ou banho frio) adiciona um segundo pico de catecolaminas — afiando o estado de alerta rapidamente. Feitos nos primeiros 30 minutos, esses três estímulos produzem um pico de cortisol que elimina a adenosina, mata a melatonina residual e prepara o córtex pré-frontal para pensamento complexo.",
      },
      application: {
        tag: "Para Você, Amanhã de Manhã",
        title: "Os primeiros 30 minutos do seu dia determinam a qualidade das próximas 16 horas.",
        body: "Sequência: (1) Sem soneca — levante imediatamente. (2) Água fria no rosto ou banho frio de 30 segundos. (3) Saia ao ar livre — 10 minutos de luz matinal. (4) Movimente-se — mesmo 5 minutos de caminhada. Evite o celular até terminar o passo 4.",
      },
      dataPoint: {
        stat: "A resposta de despertar do cortisol é 50% maior em pessoas com horários de acordar consistentes versus horários irregulares — independente da duração total do sono.",
        source: "Psychoneuroendocrinology, 2012",
      },
      protocol: {
        difficulty: 'medium',
        tonight: "Defina apenas um alarme. Sem opção de soneca. Coloque o celular do outro lado do quarto para ter que se levantar para desligá-lo.",
        morning: "Levante no momento em que o alarme tocar. Jogue água fria no rosto. Depois vá para fora por 10 minutos de luz antes de olhar o celular.",
        why: "A resposta de despertar do cortisol (CAR) é amplificada por luz, movimento e frio — e suprimida por escuridão, inatividade e fragmentos de soneca. Os primeiros 30 minutos definem o tom neuroquímico para o dia inteiro.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Life Sciences, 1997",
        },
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Psychoneuroendocrinology, 2009",
        },
      ],
      nextPreview: "Amanhã: por que uma soneca de 20 minutos supera uma hora extra de sono noturno — e o timing exato que não destrói sua noite.",
    },
  },
  {
    id: '14',
    en: {
      hook: {
        tag: "The Stigma",
        title: "You nap. You feel guilty about it. You probably shouldn't.",
        body: "Napping is one of the most evidence-backed performance tools in sleep science — when timed correctly. Done wrong, it destroys your evening. Done right, it adds the equivalent of 1–2 extra sleep cycles to your day.",
      },
      insight: {
        tag: "The Discovery",
        title: "A 20-minute nap outperforms a 90-minute nap on alertness — because of which sleep stage you wake from.",
        body: "The sleep stage you're in when you wake determines how you feel. A 20-minute nap ends in Stage 2 (N2) — light sleep — producing immediate alertness with no grogginess. A 40–60 minute nap catches you in N3 (deep sleep) when the alarm fires, producing 30+ minutes of sleep inertia. The goal is the cycle timing, not the duration.",
      },
      mechanism: {
        tag: "The Biology",
        title: "The nap clears adenosine locally — temporarily reducing sleep pressure without depleting nighttime drive.",
        body: "Adenosine accumulates in wake-active brain regions throughout the day. A brief nap allows local adenosine clearance in the prefrontal cortex — the region most sensitive to sleep pressure — without depleting the global sleep drive that fuels deep nighttime sleep. This is why a correctly timed nap improves afternoon performance without reducing nighttime sleep quality.",
      },
      application: {
        tag: "For You, This Afternoon",
        title: "The power nap protocol: 20 minutes, before 3pm, with a coffee just before.",
        body: "The 'nap-a-ccino': drink an espresso, then immediately lie down for 20 minutes. Caffeine takes 20–30 minutes to absorb — you wake exactly as it kicks in. The nap clears adenosine. The caffeine blocks new adenosine. Double effect, no grogginess. Critical: the nap must end before 3pm or it begins displacing nighttime sleep pressure.",
      },
      dataPoint: {
        stat: "A 26-minute nap improved pilot performance by 34% and alertness by 100% compared to no nap — NASA's official protocol since 1995.",
        source: "Sleep, 1995 (NASA Fatigue Countermeasures Program)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Nothing — tonight's protocol is just maintaining your normal sleep window. Do not nap after 3pm.",
        morning: "If you feel the afternoon crash coming, schedule a 20-minute nap before 1pm. Set an alarm for 20 minutes exactly.",
        why: "A 20-minute nap ends in N2 sleep — light sleep — producing immediate alertness. Longer naps enter N3 and create sleep inertia on waking.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep, 2005",
        },
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Nature Neuroscience, 2003",
        },
      ],
      nextPreview: "Tomorrow: how the blue light from your phone after dark is doing the same thing to your brain as jet lag — and one filter setting that fixes it.",
    },
    pt: {
      hook: {
        tag: "O Estigma",
        title: "Você tira uma soneca. Sente culpa por isso. Provavelmente não deveria.",
        body: "A soneca é uma das ferramentas de desempenho mais respaldadas pela ciência do sono — quando cronometrada corretamente. Feita errada, destrói sua noite. Feita certa, adiciona o equivalente a 1–2 ciclos de sono extras ao seu dia.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Uma soneca de 20 minutos supera uma de 90 minutos em estado de alerta — por causa de qual estágio do sono você acorda.",
        body: "O estágio do sono em que você está quando acorda determina como você se sente. Uma soneca de 20 minutos termina no Estágio 2 (N2) — sono leve — produzindo alerta imediato sem confusão. Uma soneca de 40–60 minutos te pega em N3 (sono profundo) quando o alarme dispara, produzindo 30+ minutos de inércia do sono. O objetivo é o timing do ciclo, não a duração.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "A soneca limpa adenosina localmente — reduzindo temporariamente a pressão do sono sem esgotar o impulso noturno.",
        body: "A adenosina se acumula em regiões cerebrais ativas em vigília ao longo do dia. Uma soneca breve permite a eliminação local de adenosina no córtex pré-frontal — a região mais sensível à pressão do sono — sem esgotar o impulso global de sono que alimenta o sono profundo noturno. É por isso que uma soneca corretamente cronometrada melhora o desempenho vespertino sem reduzir a qualidade do sono noturno.",
      },
      application: {
        tag: "Para Você, Esta Tarde",
        title: "O protocolo da soneca energizante: 20 minutos, antes das 15h, com um café logo antes.",
        body: "O 'nap-a-ccino': tome um expresso, depois deite imediatamente por 20 minutos. A cafeína leva 20–30 minutos para ser absorvida — você acorda exatamente quando ela começa a fazer efeito. A soneca elimina adenosina. A cafeína bloqueia nova adenosina. Efeito duplo, sem confusão. Crítico: a soneca deve terminar antes das 15h ou começa a deslocar a pressão do sono noturno.",
      },
      dataPoint: {
        stat: "Uma soneca de 26 minutos melhorou o desempenho do piloto em 34% e o estado de alerta em 100% em comparação com nenhuma soneca — protocolo oficial da NASA desde 1995.",
        source: "Sleep, 1995 (Programa de Contramedidas de Fadiga da NASA)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Nada — o protocolo desta noite é apenas manter sua janela normal de sono. Não tire soneca após as 15h.",
        morning: "Se sentir a queda da tarde chegando, agende uma soneca de 20 minutos antes das 13h. Defina um alarme para exatamente 20 minutos.",
        why: "Uma soneca de 20 minutos termina no sono N2 — sono leve — produzindo alerta imediato. Sonecas mais longas entram em N3 e criam inércia do sono ao acordar.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep, 2005",
        },
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Nature Neuroscience, 2003",
        },
      ],
      nextPreview: "Amanhã: como a luz azul do seu celular após escurecer faz o mesmo com seu cérebro que um jet lag — e uma configuração de filtro que resolve.",
    },
  },
  {
    id: '17',
    en: {
      hook: {
        tag: "The Hidden Cost",
        title: "You slept 6 hours. You feel fine. You're actually 40% less sharp than yesterday.",
        body: "Sleep deprivation is the only impairment that makes you worse at detecting your own impairment. After one short night, you lack the prefrontal cortex activity needed to notice your own cognitive decline. You feel fine. The tests say otherwise.",
      },
      insight: {
        tag: "The Discovery",
        title: "One night of 6 hours' sleep impairs you as much as 24 hours of no sleep — but it doesn't feel that way.",
        body: "Laboratory studies measuring reaction time, working memory, and decision quality consistently show that subjects sleeping 6 hours per night for two weeks perform as poorly as subjects kept awake for 24–48 hours straight. The critical difference: the chronically sleep-restricted group consistently rated themselves as only mildly impaired.",
      },
      mechanism: {
        tag: "The Biology",
        title: "The prefrontal cortex is the first region to shut down under sleep restriction.",
        body: "The prefrontal cortex (PFC) — responsible for executive function, decision making, emotional regulation, and self-monitoring — is exquisitely sensitive to sleep loss. After one short night, PFC metabolism drops measurably in neuroimaging. The PFC is also the region that normally detects impairment. Remove PFC function, and you lose both performance and the ability to detect performance loss.",
      },
      application: {
        tag: "For You, Tonight",
        title: "Protecting sleep isn't a productivity sacrifice — it IS the productivity strategy.",
        body: "Consistently sleeping 7–8 hours doesn't reduce your available work time. It restores the cognitive efficiency that sleep deprivation destroys. The decisions you make in hour 10 of a 6-hour night are quantifiably lower quality than those in hour 4 of a 8-hour night. Quality of output matters more than hours spent working.",
      },
      dataPoint: {
        stat: "After 14 days of sleeping 6 hours per night, cognitive performance declined as much as after 48 hours of total sleep deprivation — despite subjects feeling only mildly sleepy.",
        source: "Sleep, 2003 (Van Dongen et al., University of Pennsylvania)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Commit to a fixed bedtime that gives you 7.5–8 hours before your alarm. Put it in your calendar as a non-negotiable appointment.",
        morning: "Track your first-thought clarity tomorrow. Was your mind sharp within 30 minutes of waking? That's the benchmark.",
        why: "The prefrontal cortex requires 7–8 hours of sleep to maintain full executive function. Each hour below 7 produces measurable performance decline that accumulates daily.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep, 2003",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) describes in Why We Sleep how sleep-deprived individuals show 60% more amygdala reactivity — meaning emotional decision-making is dramatically impaired even when cognitive performance appears intact.",
          source: "Why We Sleep, 2017",
        },
      ],
      nextPreview: "Tomorrow: the surprising relationship between sleep and your immune system — and why sleeping well is better prevention than any supplement.",
    },
    pt: {
      hook: {
        tag: "O Custo Oculto",
        title: "Você dormiu 6 horas. Se sente bem. Na verdade está 40% menos afiado do que ontem.",
        body: "A privação de sono é o único prejuízo que te torna pior em detectar seu próprio prejuízo. Após uma noite curta, você carece da atividade do córtex pré-frontal necessária para perceber seu próprio declínio cognitivo. Você se sente bem. Os testes dizem o contrário.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Uma noite de 6 horas de sono te prejudica tanto quanto 24 horas sem dormir — mas não parece assim.",
        body: "Estudos laboratoriais medindo tempo de reação, memória de trabalho e qualidade de decisão consistentemente mostram que sujeitos dormindo 6 horas por noite por duas semanas têm desempenho tão ruim quanto sujeitos mantidos acordados por 24–48 horas seguidas. A diferença crítica: o grupo com restrição crônica de sono consistentemente se avaliou como apenas levemente prejudicado.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "O córtex pré-frontal é a primeira região a desligar sob restrição de sono.",
        body: "O córtex pré-frontal (CPF) — responsável por função executiva, tomada de decisão, regulação emocional e automonitoramento — é extremamente sensível à perda de sono. Após uma noite curta, o metabolismo do CPF cai mensurável em neuroimagem. O CPF também é a região que normalmente detecta prejuízo. Remova a função do CPF, e você perde tanto o desempenho quanto a capacidade de detectar a perda de desempenho.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Proteger o sono não é um sacrifício de produtividade — é A estratégia de produtividade.",
        body: "Dormir consistentemente 7–8 horas não reduz seu tempo disponível de trabalho. Restaura a eficiência cognitiva que a privação de sono destrói. As decisões que você toma na hora 10 de uma noite de 6 horas são quantitativamente de menor qualidade do que as da hora 4 de uma noite de 8 horas. A qualidade do resultado importa mais do que as horas trabalhadas.",
      },
      dataPoint: {
        stat: "Após 14 dias dormindo 6 horas por noite, o desempenho cognitivo decaiu tanto quanto após 48 horas de privação total de sono — apesar dos sujeitos se sentirem apenas levemente sonolentos.",
        source: "Sleep, 2003 (Van Dongen et al., University of Pennsylvania)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Comprometa-se com um horário fixo de dormir que te dê 7,5–8 horas antes do alarme. Coloque no calendário como compromisso inegociável.",
        morning: "Acompanhe a clareza do seu primeiro pensamento amanhã. Sua mente estava afiada dentro de 30 minutos após acordar? Esse é o parâmetro.",
        why: "O córtex pré-frontal requer 7–8 horas de sono para manter a função executiva plena. Cada hora abaixo de 7 produz declínio de desempenho mensurável que se acumula diariamente.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep, 2003",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) descreve em Por que Dormimos como indivíduos privados de sono mostram 60% mais reatividade da amígdala — significando que a tomada de decisão emocional é dramaticamente prejudicada mesmo quando o desempenho cognitivo parece intacto.",
          source: "Por que Dormimos, 2017",
        },
      ],
      nextPreview: "Amanhã: a relação surpreendente entre sono e seu sistema imunológico — e por que dormir bem é melhor prevenção do que qualquer suplemento.",
    },
  },
  {
    id: '12',
    en: {
      hook: {
        tag: "The Relaxation Trap",
        title: "You had two glasses of wine to unwind. You fell asleep faster. Then you woke at 3am.",
        body: "Alcohol is the most common sleep 'aid' in the world — and one of the most effective sleep destroyers. It works as a sedative initially. But it has a second half: rebound arousal, REM suppression, and fragmented deep sleep that hits 3–4 hours after you fall asleep.",
      },
      insight: {
        tag: "The Discovery",
        title: "Alcohol suppresses REM sleep — the stage that processes emotions and consolidates memory.",
        body: "Alcohol is sedating in the first half of the night and stimulating in the second. As it metabolizes, acetaldehyde builds up — a stimulant that fragments sleep and blocks REM. The REM sleep you lose is not recovered the next night. Memories formed before a drinking night are 40% less consolidated by morning.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Alcohol suppresses REM in three ways simultaneously.",
        body: "First, acetaldehyde (a metabolic byproduct) activates wake-promoting neurons in the brainstem, fragmenting sleep. Second, alcohol suppresses acetylcholine — the neurotransmitter that drives REM sleep. Third, alcohol's diuretic effect causes dehydration, raising core body temperature and disturbing sleep architecture. The combination removes 20–25% of your REM sleep per night of drinking.",
      },
      application: {
        tag: "For You, Tonight",
        title: "If you drink: finish 3–4 hours before sleep, and hydrate aggressively.",
        body: "One drink per hour is the liver's metabolic rate. Two drinks at 8pm are processed by 10pm — giving you a 1-hour buffer before 11pm sleep. More than two drinks disrupts REM regardless of timing. The only 'safe' alcohol for sleep is none — but timing makes a measurable difference.",
      },
      dataPoint: {
        stat: "Even moderate alcohol (2 drinks) suppressed REM sleep by 24% and reduced total sleep time by 19 minutes — with effects that persisted into the sober second half of the night.",
        source: "Alcoholism: Clinical and Experimental Research, 2015",
      },
      protocol: {
        difficulty: 'advanced',
        tonight: "If you drink: maximum 2 drinks, finished by 3 hours before your target sleep time. Drink 500ml water before bed. Keep the bedroom cool.",
        morning: "Note dream recall. Reduced or absent dreams are a sign of REM suppression the night before.",
        why: "Alcohol metabolizes into acetaldehyde, which activates wake-promoting neurons and suppresses acetylcholine — the neurotransmitter that powers REM sleep.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Alcoholism: Clinical and Experimental Research, 2013",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) describes in Why We Sleep how REM sleep is the stage responsible for emotional memory processing — and how alcohol-suppressed REM produces not only worse sleep, but measurably impaired emotional regulation the following day.",
          source: "Why We Sleep, 2017",
        },
      ],
      nextPreview: "Tomorrow: how your immune system repairs itself exclusively during sleep — and why sick people sleep more for a very specific biological reason.",
    },
    pt: {
      hook: {
        tag: "A Armadilha do Relaxamento",
        title: "Você tomou duas taças de vinho para relaxar. Adormecer foi mais rápido. Depois acordou às 3h.",
        body: "O álcool é o 'auxílio' para dormir mais comum no mundo — e um dos destruidores de sono mais eficazes. Funciona como sedativo inicialmente. Mas tem uma segunda metade: despertar rebote, supressão de REM e sono profundo fragmentado que ocorre 3–4 horas depois que você adormece.",
      },
      insight: {
        tag: "A Descoberta",
        title: "O álcool suprime o sono REM — o estágio que processa emoções e consolida memórias.",
        body: "O álcool é sedativo na primeira metade da noite e estimulante na segunda. À medida que metaboliza, o acetaldeído se acumula — um estimulante que fragmenta o sono e bloqueia o REM. O sono REM que você perde não é recuperado na noite seguinte. Memórias formadas antes de uma noite de bebida são 40% menos consolidadas pela manhã.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "O álcool suprime o REM de três maneiras simultaneamente.",
        body: "Primeiro, o acetaldeído (subproduto metabólico) ativa neurônios promotores de vigília no tronco cerebral, fragmentando o sono. Segundo, o álcool suprime a acetilcolina — o neurotransmissor que impulsiona o sono REM. Terceiro, o efeito diurético do álcool causa desidratação, elevando a temperatura corporal central e perturbando a arquitetura do sono. A combinação remove 20–25% do seu sono REM por noite de bebida.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "Se beber: termine 3–4 horas antes de dormir, e hidrate-se agressivamente.",
        body: "Uma bebida por hora é a taxa metabólica do fígado. Duas bebidas às 20h são processadas até as 22h — dando-lhe um buffer de 1 hora antes de dormir às 23h. Mais de duas bebidas perturba o REM independente do timing. O único álcool 'seguro' para o sono é nenhum — mas o timing faz uma diferença mensurável.",
      },
      dataPoint: {
        stat: "Mesmo álcool moderado (2 doses) suprimiu o sono REM em 24% e reduziu o tempo total de sono em 19 minutos — com efeitos que persistiram na segunda metade sóbria da noite.",
        source: "Alcoholism: Clinical and Experimental Research, 2015",
      },
      protocol: {
        difficulty: 'advanced',
        tonight: "Se beber: máximo 2 doses, terminadas 3 horas antes do horário-alvo de sono. Beba 500ml de água antes de dormir. Mantenha o quarto fresco.",
        morning: "Observe a memória de sonhos. Sonhos reduzidos ou ausentes são sinal de supressão de REM na noite anterior.",
        why: "O álcool metaboliza em acetaldeído, que ativa neurônios promotores de vigília e suprime a acetilcolina — o neurotransmissor que alimenta o sono REM.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Alcoholism: Clinical and Experimental Research, 2013",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) descreve em Por que Dormimos como o sono REM é o estágio responsável pelo processamento de memórias emocionais — e como o REM suprimido pelo álcool produz não apenas sono pior, mas regulação emocional mensuravelmente prejudicada no dia seguinte.",
          source: "Por que Dormimos, 2017",
        },
      ],
      nextPreview: "Amanhã: como seu sistema imunológico se repara exclusivamente durante o sono — e por que pessoas doentes dormem mais por uma razão biológica muito específica.",
    },
  },
  {
    id: '19',
    en: {
      hook: {
        tag: "The Biology of Recovery",
        title: "You slept 5 hours during the sick week. You got sicker. That wasn't a coincidence.",
        body: "Sleep and immunity are not separate systems — they are the same system operating on different schedules. Your immune response peaks during sleep. Cut sleep short and you don't just feel sick longer — you become more susceptible, more severely, more often.",
      },
      insight: {
        tag: "The Discovery",
        title: "People who sleep less than 6 hours are 4× more likely to catch a cold when exposed to the virus.",
        body: "Aric Prather (UCSF, 2015) measured sleep objectively for 2 weeks, then administered rhinovirus directly to participants' nasal passages. Shorter sleepers got sick at dramatically higher rates — and their symptoms were more severe. Sleep duration predicted infection susceptibility more strongly than any other measured variable, including stress.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Deep sleep triggers a cascade of immune repair that cannot happen while you're awake.",
        body: "During N3 (deep sleep), the body releases growth hormone, which drives cellular repair and immune protein synthesis. T-cells and natural killer cells — your primary viral defense — show peak activity during sleep. Cytokine production (your immune signaling molecules) is coordinated during sleep. Cutting deep sleep is equivalent to reducing your immune workforce by 30–40%.",
      },
      application: {
        tag: "For You, Tonight",
        title: "The most effective immune supplement you have is already built in — and it's free.",
        body: "7–8 hours of consistent sleep, every night, maintains immune function equivalent to full vaccination efficacy. During illness: sleep 9–10 hours actively — your immune system is running overtime and needs the extended window. The fever you feel during illness is your immune system creating an environment hostile to pathogens — sleep amplifies this response.",
      },
      dataPoint: {
        stat: "Subjects sleeping less than 6 hours were 4.2× more likely to develop a cold compared to those sleeping 7+ hours after direct virus exposure.",
        source: "Sleep, 2015 (UCSF, Prather et al.)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Tonight: prioritize sleep over everything else on your to-do list. Your immune system works the night shift.",
        morning: "Morning: check how quickly you felt alert. Fast clearing = deep sleep happened = immune repair occurred.",
        why: "Deep sleep (N3) is when growth hormone peaks, T-cells activate, and cytokines coordinate immune response. Every hour below 7 reduces immune workforce by measurable percentage.",
      },
      science: [
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep, 2015",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) describes how a single night of 4–5 hours reduces natural killer cell activity by 70% — cells that identify and eliminate cancerous and virally infected cells.",
          source: "Why We Sleep, 2017",
        },
      ],
      nextPreview: "Tomorrow: why crossing time zones feels like it does — and the 3-day protocol that resets circadian timing faster than any medication.",
    },
    pt: {
      hook: {
        tag: "A Biologia da Recuperação",
        title: "Você dormiu 5 horas durante a semana doente. Ficou mais doente. Não foi coincidência.",
        body: "Sono e imunidade não são sistemas separados — são o mesmo sistema operando em horários diferentes. Sua resposta imunológica atinge o pico durante o sono. Encurte o sono e você não apenas fica doente mais tempo — torna-se mais suscetível, mais severamente, mais frequentemente.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Pessoas que dormem menos de 6 horas têm 4× mais probabilidade de pegar resfriado quando expostas ao vírus.",
        body: "Aric Prather (UCSF, 2015) mediu o sono objetivamente por 2 semanas, depois administrou rinovírus diretamente nas passagens nasais dos participantes. Aqueles que dormiam menos ficaram doentes em taxas dramaticamente maiores — e seus sintomas foram mais graves. A duração do sono previu a suscetibilidade à infecção mais fortemente do que qualquer outra variável medida, incluindo estresse.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "O sono profundo desencadeia uma cascata de reparo imunológico que não pode acontecer enquanto você está acordado.",
        body: "Durante o N3 (sono profundo), o corpo libera hormônio de crescimento, que impulsiona o reparo celular e a síntese de proteínas imunológicas. As células T e as células exterminadoras naturais — sua principal defesa viral — mostram atividade de pico durante o sono. A produção de citocinas (seus sinalizadores imunológicos) é coordenada durante o sono. Encurtar o sono profundo é equivalente a reduzir sua força de trabalho imunológica em 30–40%.",
      },
      application: {
        tag: "Para Você, Esta Noite",
        title: "O suplemento imunológico mais eficaz que você tem já está integrado — e é gratuito.",
        body: "7–8 horas de sono consistente, toda noite, mantém a função imunológica equivalente à eficácia de vacinação completa. Durante doenças: durma ativamente 9–10 horas — seu sistema imunológico está trabalhando horas extras e precisa da janela estendida. A febre que você sente durante uma doença é seu sistema imunológico criando um ambiente hostil aos patógenos — o sono amplifica essa resposta.",
      },
      dataPoint: {
        stat: "Sujeitos dormindo menos de 6 horas foram 4,2× mais propensos a desenvolver resfriado em comparação com os que dormiam 7+ horas após exposição direta ao vírus.",
        source: "Sleep, 2015 (UCSF, Prather et al.)",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Esta noite: priorize o sono acima de tudo na sua lista de afazeres. Seu sistema imunológico trabalha no turno da noite.",
        morning: "Manhã: verifique com que rapidez você se sentiu alerta. Despertar rápido = sono profundo ocorreu = reparo imunológico aconteceu.",
        why: "O sono profundo (N3) é quando o hormônio de crescimento atinge o pico, as células T são ativadas e as citocinas coordenam a resposta imunológica. Cada hora abaixo de 7 reduz a força de trabalho imunológica por percentual mensurável.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep, 2015",
        },
        {
          citation: "Matthew Walker (UC Berkeley, 2017) descreve como uma única noite de 4–5 horas reduz a atividade das células exterminadoras naturais em 70% — células que identificam e eliminam células cancerosas e infectadas por vírus.",
          source: "Por que Dormimos, 2017",
        },
      ],
      nextPreview: "Amanhã: por que cruzar fusos horários causa aquela sensação — e o protocolo de 3 dias que redefine o timing circadiano mais rápido do que qualquer medicamento.",
    },
  },
  {
    id: '18',
    en: {
      hook: {
        tag: "The Time Zone Problem",
        title: "You flew east. You can't fall asleep at midnight. You're wide awake at 4am.",
        body: "Jet lag is not imaginary tiredness — it's your body operating in a timezone that doesn't match the one you're standing in. Your circadian clock moves 1–1.5 hours per day maximum. A 6-hour time difference takes 4–6 days to fully resolve without intervention.",
      },
      insight: {
        tag: "The Discovery",
        title: "Eastward travel is harder than westward travel — and there's a biological reason.",
        body: "Your natural circadian period is slightly longer than 24 hours (approximately 24.2 hours). This makes it easier to delay sleep (fly west, stay up later) than to advance it (fly east, sleep earlier). Eastward travel requires advancing your phase — moving against your natural tendency. That's why eastward jet lag is more severe and slower to resolve.",
      },
      mechanism: {
        tag: "The Biology",
        title: "Light and melatonin can shift your circadian clock — but timing matters enormously.",
        body: "The circadian clock can be advanced or delayed by external inputs — primarily light and melatonin. Morning light advances the clock (makes you want to sleep and wake earlier). Evening light delays it. Melatonin taken in the early evening (before 8pm local destination time) advances the clock for eastward travel. Getting the timing wrong has zero effect or makes jet lag worse.",
      },
      application: {
        tag: "For You, Your Next Trip",
        title: "The 3-day jet lag protocol that actually works.",
        body: "For eastward travel: begin shifting your sleep 1 hour earlier per day, 3 days before departure. Take 0.5mg melatonin at 6–8pm destination time for 3 days after arrival. Seek morning light at destination time. Avoid bright light in the evening at your destination for the first 2 days.",
      },
      dataPoint: {
        stat: "A structured light-and-melatonin protocol reduced eastward jet lag symptom duration by 55% compared to no intervention.",
        source: "Journal of Biological Rhythms, 2002",
      },
      protocol: {
        difficulty: 'advanced',
        tonight: "If traveling soon: set your alarm 1 hour earlier for the next 3 mornings. This pre-adjusts your clock before you arrive.",
        morning: "At your destination: seek bright morning light at local time, even if your body thinks it's the middle of the night. Light is the fastest re-synchronizer.",
        why: "The circadian clock re-synchronizes at 1–1.5 hours per day maximum. Light is the primary driver. Melatonin taken at the right local time advances or delays the clock 2–3× faster than light alone.",
      },
      science: [
        {
          citation: "Based on research by Michael Breus, Chronotype Specialist · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
        {
          citation: "Based on research by Charles Czeisler, Sleep Medicine · Harvard",
          source: "British Medical Journal, 1987",
        },
      ],
      nextPreview: "Tomorrow: how sleep directly regulates testosterone, growth hormone, and insulin — and why poor sleep accelerates ageing faster than almost anything else.",
    },
    pt: {
      hook: {
        tag: "O Problema do Fuso Horário",
        title: "Você voou para o leste. Não consegue adormecer à meia-noite. Está bem acordado às 4h.",
        body: "O jet lag não é cansaço imaginário — é seu corpo operando em um fuso horário que não corresponde ao qual você está. Seu relógio circadiano se move no máximo 1–1,5 hora por dia. Uma diferença de 6 horas leva 4–6 dias para se resolver completamente sem intervenção.",
      },
      insight: {
        tag: "A Descoberta",
        title: "Viajar para o leste é mais difícil do que para o oeste — e há uma razão biológica.",
        body: "Seu período circadiano natural é ligeiramente mais longo do que 24 horas (aproximadamente 24,2 horas). Isso torna mais fácil atrasar o sono (voar para o oeste, ficar acordado mais tarde) do que antecipá-lo (voar para o leste, dormir mais cedo). A viagem para o leste requer avançar sua fase — movendo-se contra sua tendência natural. Por isso o jet lag para o leste é mais grave e mais lento para resolver.",
      },
      mechanism: {
        tag: "A Biologia",
        title: "Luz e melatonina podem mudar seu relógio circadiano — mas o timing importa enormemente.",
        body: "O relógio circadiano pode ser avançado ou atrasado por estímulos externos — principalmente luz e melatonina. Luz matinal avança o relógio (faz você querer dormir e acordar mais cedo). Luz noturna o atrasa. Melatonina tomada no início da noite (antes das 20h no horário local do destino) avança o relógio para viagens ao leste. Errar o timing não tem efeito ou piora o jet lag.",
      },
      application: {
        tag: "Para Você, Sua Próxima Viagem",
        title: "O protocolo de 3 dias para jet lag que realmente funciona.",
        body: "Para viagem ao leste: comece a deslocar seu sono 1 hora mais cedo por dia, 3 dias antes da partida. Tome 0,5mg de melatonina às 18–20h no horário do destino por 3 dias após a chegada. Busque luz matinal no horário do destino. Evite luz brilhante à noite no destino nos primeiros 2 dias.",
      },
      dataPoint: {
        stat: "Um protocolo estruturado de luz e melatonina reduziu a duração dos sintomas de jet lag para leste em 55% em comparação com nenhuma intervenção.",
        source: "Journal of Biological Rhythms, 2002",
      },
      protocol: {
        difficulty: 'advanced',
        tonight: "Se viajar em breve: defina o alarme 1 hora mais cedo pelos próximos 3 dias. Isso pré-ajusta seu relógio antes de chegar.",
        morning: "No destino: busque luz matinal brilhante no horário local, mesmo que seu corpo pense que é madrugada. A luz é o ressincronizador mais rápido.",
        why: "O relógio circadiano ressincroniza no máximo 1–1,5 hora por dia. A luz é o principal motor. A melatonina tomada no horário local certo avança ou atrasa o relógio 2–3× mais rápido do que a luz sozinha.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Michael Breus, Especialista em Cronotipos · The Sleep Doctor",
          source: "Current Biology, 2012",
        },
        {
          citation: "Baseado em pesquisas de Charles Czeisler, Medicina do Sono · Harvard",
          source: "British Medical Journal, 1987",
        },
      ],
      nextPreview: "Amanhã: como o sono regula diretamente testosterona, hormônio de crescimento e insulina — e por que o sono ruim acelera o envelhecimento mais rápido do que quase qualquer outra coisa.",
    },
  },
  {
    id: '21',
    en: {
      hook: {
        tag: "The Final Lesson",
        title: "You've learned 20 lessons. Most people stop here. The ones who don't are the ones who actually change.",
        body: "Knowledge is not transformation. Systems are. This lesson is about building the architecture that makes everything else automatic — so you never have to rely on willpower for something as critical as sleep.",
      },
      insight: {
        tag: "The Integration",
        title: "The three non-negotiables: anchor, environment, and transition.",
        body: "After 21 lessons, the evidence converges on three levers that explain 80% of sleep quality: (1) a fixed wake time every day — the anchor of your circadian clock, (2) a bedroom optimized for temperature, darkness, and silence, and (3) a 60-minute wind-down routine that transitions your nervous system from activation to rest. Everything else is optimization. These three are the foundation.",
      },
      mechanism: {
        tag: "The System",
        title: "Habit stacking converts knowledge into automatic behavior.",
        body: "Sleep improvement doesn't happen through motivation — it happens through structure. Habit stacking means linking new behaviors to existing ones: morning light after the alarm, wind-down after the last work task, bedroom temperature drop before the shower. Each link removes a decision point. Decision points are where habits break. Remove enough of them and the system runs itself.",
      },
      application: {
        tag: "For You, This Week",
        title: "Build your personal sleep system in three decisions.",
        body: "Decision 1: Your fixed wake time — non-negotiable, 7 days a week. Decision 2: Your bedroom baseline — temperature, light blocking, phone location. Decision 3: Your wind-down trigger — one specific event (closing the laptop, turning off the overhead light) that signals the transition has started. Write these three things down tonight.",
      },
      dataPoint: {
        stat: "People with structured sleep routines (consistent timing, environment, and wind-down) report 68% higher sleep quality than those with unstructured sleep — independent of total sleep duration.",
        source: "Journal of Sleep Research, 2020",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Write down: (1) your wake time, (2) your bedroom temperature, and (3) your wind-down trigger. These three are your sleep system. Keep the paper somewhere you'll see it tomorrow morning.",
        morning: "Read what you wrote. Today is the first day of a consistent system. The gains compound over weeks, not days.",
        why: "Behavioral consistency drives circadian consolidation. A system that runs on habit rather than willpower is the only sleep intervention that actually sustains.",
      },
      science: [
        {
          citation: "Based on research by Andrew Huberman, Neuroscientist · Stanford",
          source: "Atomic Habits, 2018",
        },
        {
          citation: "Based on research by Matthew Walker, Neuroscientist · UC Berkeley",
          source: "Sleep Medicine Reviews, 2015",
        },
      ],
      nextPreview: "You finished the program. Sleep well.",
    },
    pt: {
      hook: {
        tag: "A Lição Final",
        title: "Você aprendeu 20 lições. A maioria das pessoas para aqui. As que não param são as que realmente mudam.",
        body: "Conhecimento não é transformação. Sistemas são. Esta lição é sobre construir a arquitetura que torna tudo automático — para que você nunca precise depender da força de vontade para algo tão crítico quanto o sono.",
      },
      insight: {
        tag: "A Integração",
        title: "Os três inegociáveis: âncora, ambiente e transição.",
        body: "Após 21 lições, as evidências convergem em três alavancas que explicam 80% da qualidade do sono: (1) um horário fixo de acordar todos os dias — a âncora do seu relógio circadiano, (2) um quarto otimizado para temperatura, escuridão e silêncio, e (3) uma rotina de desaceleração de 60 minutos que transiciona seu sistema nervoso da ativação para o descanso. Tudo o mais é otimização. Esses três são a fundação.",
      },
      mechanism: {
        tag: "O Sistema",
        title: "O empilhamento de hábitos converte conhecimento em comportamento automático.",
        body: "A melhoria do sono não acontece por motivação — acontece por estrutura. O empilhamento de hábitos significa vincular novos comportamentos a comportamentos existentes: luz matinal após o alarme, desaceleração após a última tarefa de trabalho, queda de temperatura do quarto antes do banho. Cada vínculo remove um ponto de decisão. Pontos de decisão são onde os hábitos quebram. Remova o suficiente deles e o sistema se torna automático.",
      },
      application: {
        tag: "Para Você, Esta Semana",
        title: "Construa seu sistema pessoal de sono em três decisões.",
        body: "Decisão 1: Seu horário fixo de acordar — inegociável, 7 dias por semana. Decisão 2: Sua linha de base do quarto — temperatura, bloqueio de luz, localização do celular. Decisão 3: Seu gatilho de desaceleração — um evento específico (fechar o notebook, apagar a luz de teto) que sinaliza que a transição começou. Escreva essas três coisas esta noite.",
      },
      dataPoint: {
        stat: "Pessoas com rotinas de sono estruturadas (timing consistente, ambiente e desaceleração) relatam 68% maior qualidade de sono do que aquelas com sono não estruturado — independente da duração total do sono.",
        source: "Journal of Sleep Research, 2020",
      },
      protocol: {
        difficulty: 'easy',
        tonight: "Escreva: (1) seu horário de acordar, (2) a temperatura do seu quarto, e (3) seu gatilho de desaceleração. Esses três são seu sistema de sono. Guarde o papel em um lugar que você verá amanhã de manhã.",
        morning: "Leia o que você escreveu. Hoje é o primeiro dia de um sistema consistente. Os ganhos se compõem ao longo de semanas, não dias.",
        why: "A consistência comportamental impulsiona a consolidação circadiana. Um sistema que funciona por hábito em vez de força de vontade é a única intervenção de sono que realmente se sustenta.",
      },
      science: [
        {
          citation: "Baseado em pesquisas de Andrew Huberman, Neurocientista · Stanford",
          source: "Hábitos Atômicos, 2018",
        },
        {
          citation: "Baseado em pesquisas de Matthew Walker, Neurocientista · UC Berkeley",
          source: "Sleep Medicine Reviews, 2015",
        },
      ],
      nextPreview: "Você concluiu o programa. Durma bem.",
    },
  },
];
