type Lang = 'pt' | 'en';
type Chronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

type OneLinerMap = Record<Chronotype, Record<Lang, string>>;

export const CHRONOTYPE_ONE_LINERS: Record<number, OneLinerMap> = {
  1: {
    dolphin: {
      pt: 'Golfinhos precisam de transição gradual — sua mente não desliga com comandos bruscos.',
      en: "Dolphins need gradual transitions — your mind doesn't switch off abruptly.",
    },
    lion: {
      pt: 'Leões têm ritmo forte — vamos blindá-lo contra as pressões do dia.',
      en: "Lions have strong rhythms — let's protect yours from daily pressures.",
    },
    bear: {
      pt: 'Ursos acumulam dívida de sono sem perceber — hoje você começa a pagar.',
      en: 'Bears accumulate sleep debt without noticing — today you start repaying it.',
    },
    wolf: {
      pt: 'Lobos vivem em jetlag social crônico — e não é culpa sua.',
      en: "Wolves live in chronic social jetlag — and it's not your fault.",
    },
  },
  2: {
    dolphin: {
      pt: 'Golfinhos têm o sono mais imprevisível dos quatro — conhecê-lo é o primeiro passo para domá-lo.',
      en: "Dolphins have the most unpredictable sleep of all four types — knowing it is the first step to taming it.",
    },
    lion: {
      pt: 'Leões adoram acordar cedo, mas até eles precisam entender o porquê do seu relógio biológico.',
      en: "Lions love waking early, but even they need to understand why their biological clock works that way.",
    },
    bear: {
      pt: 'Ursos seguem o ritmo solar — mas quando a vida força outro ritmo, o preço é alto.',
      en: 'Bears follow the solar rhythm — but when life forces a different one, the price is steep.',
    },
    wolf: {
      pt: 'Lobos não são preguiçosos — são biologicamente programados para a noite. Agora você tem provas.',
      en: 'Wolves are not lazy — they are biologically wired for night. Now you have the proof.',
    },
  },
  3: {
    dolphin: {
      pt: 'Golfinhos raramente dormem profundo o suficiente — cada noite ruim é mais dívida acumulando em silêncio.',
      en: 'Dolphins rarely sleep deep enough — each poor night adds silently to an already steep debt.',
    },
    lion: {
      pt: 'Leões dormem cedo mas nem sempre suficiente — sua produtividade matinal mascara o custo real.',
      en: 'Lions sleep early but not always enough — your morning productivity masks the real cost.',
    },
    bear: {
      pt: "A sensação de cansaço 'normal' do Urso já não é normal — essa lição mostra o quanto já se acumulou.",
      en: "The Bear's feeling of 'normal' tiredness is no longer normal — this lesson shows how much has already built up.",
    },
    wolf: {
      pt: 'Lobos dormem tarde e acordam cedo demais — sua dívida de sono é estrutural, não acidental.',
      en: 'Wolves sleep late and wake too early — your sleep debt is structural, not accidental.',
    },
  },
  4: {
    dolphin: {
      pt: 'Seu relógio biológico gira de forma irregular — sincronizá-lo é o maior presente que você pode se dar.',
      en: 'Your biological clock runs irregularly — synchronizing it is the greatest gift you can give yourself.',
    },
    lion: {
      pt: 'Seu relógio biológico já está bem calibrado — agora vamos garantir que o mundo não o desregule.',
      en: "Your biological clock is already well-calibrated — now let's make sure the world doesn't disrupt it.",
    },
    bear: {
      pt: 'Seu relógio segue o sol — mas a vida moderna o desconecta. Esta lição mostra como reconectá-lo.',
      en: 'Your clock follows the sun — but modern life disconnects it. This lesson shows how to reconnect.',
    },
    wolf: {
      pt: 'Seu relógio biológico está sempre em conflito com o relógio social — vamos entender como sair desse ciclo.',
      en: "Your biological clock is always in conflict with the social clock — let's understand how to break that cycle.",
    },
  },
  5: {
    dolphin: {
      pt: 'Golfinhos quase nunca atingem sono profundo — cada destruidor nesta lição é seu inimigo número um.',
      en: 'Dolphins almost never reach deep sleep — every destroyer in this lesson is your number one enemy.',
    },
    lion: {
      pt: 'Leões têm bom sono profundo, mas álcool e estresse roubam isso silenciosamente. Verifique o seu.',
      en: 'Lions have good deep sleep, but alcohol and stress steal it silently. Check yours.',
    },
    bear: {
      pt: 'Ursos precisam de sono profundo para recuperação física — sem ele, o cansaço se acumula sem solução.',
      en: 'Bears need deep sleep for physical recovery — without it, fatigue accumulates without resolution.',
    },
    wolf: {
      pt: 'Lobos dormem tarde e perdem os primeiros ciclos de sono profundo — isso tem um custo biológico real.',
      en: 'Wolves sleep late and miss the first deep sleep cycles — this has a real biological cost.',
    },
  },
  6: {
    dolphin: {
      pt: 'Golfinhos já têm sono fragmentado — cada ruptura do REM apaga exatamente o que sua mente precisava processar.',
      en: 'Dolphins already have fragmented sleep — each REM disruption erases exactly what your mind needed to process.',
    },
    lion: {
      pt: 'Leões geralmente têm bom REM, mas acordar muito cedo pode cortar os ciclos mais ricos do final da noite.',
      en: 'Lions usually have good REM, but waking too early can cut the richest cycles of the late night.',
    },
    bear: {
      pt: 'Ursos perdem REM quando bebem ou dormem inconsistentemente — e raramente percebem o impacto emocional.',
      en: 'Bears lose REM when they drink or sleep inconsistently — and rarely notice the emotional impact.',
    },
    wolf: {
      pt: 'Lobos têm REM rico quando finalmente dormem — mas raramente completam os ciclos sem ser forçados a acordar.',
      en: 'Wolves have rich REM when they finally sleep — but rarely complete their cycles without being forced awake.',
    },
  },
  7: {
    dolphin: {
      pt: 'Seu perfil de Golfinho explica por que o sono sempre foi uma luta — e também aponta a saída.',
      en: "Your Dolphin profile explains why sleep has always been a struggle — and also points the way out.",
    },
    lion: {
      pt: 'Seu perfil de Leão é uma vantagem real — mas só se você protegê-lo com os protocolos certos.',
      en: 'Your Lion profile is a real advantage — but only if you protect it with the right protocols.',
    },
    bear: {
      pt: 'Seu perfil de Urso é o mais equilibrado — mas equilíbrio pode ser quebrado rapidamente sem atenção.',
      en: "Your Bear profile is the most balanced — but balance can be broken quickly without attention.",
    },
    wolf: {
      pt: 'Seu perfil de Lobo é raro e frequentemente mal compreendido — até por você mesmo. Isso muda hoje.',
      en: 'Your Wolf profile is rare and often misunderstood — even by yourself. That changes today.',
    },
  },
  8: {
    dolphin: {
      pt: 'Para Golfinhos, a luz matinal não é opcional — é a âncora que seu relógio caótico precisa todo dia.',
      en: "For Dolphins, morning light is not optional — it's the anchor your chaotic clock needs every day.",
    },
    lion: {
      pt: 'Você já acorda cedo — agora use essa vantagem para sincronizar o ritmo circadiano com luz matinal.',
      en: 'You already wake early — now use that advantage to synchronize your circadian rhythm with morning light.',
    },
    bear: {
      pt: 'Sua janela de luz matinal é perfeita biologicamente — apenas saia antes de verificar o celular.',
      en: 'Your morning light window is biologically perfect — just step outside before checking your phone.',
    },
    wolf: {
      pt: 'Luz matinal é o protocolo mais poderoso para mover seu relógio mais cedo — essencial para você, Lobo.',
      en: 'Morning light is the most powerful protocol for shifting your clock earlier — essential for you, Wolf.',
    },
  },
  9: {
    dolphin: {
      pt: 'Golfinhos frequentemente usam cafeína como muleta — mas o timing errado piora exatamente o problema que queremos resolver.',
      en: "Dolphins often use caffeine as a crutch — but wrong timing worsens exactly the problem we're trying to solve.",
    },
    lion: {
      pt: 'Você acorda alerta naturalmente — esperar 90 minutos amplifica isso ainda mais, sem o crash da tarde.',
      en: 'You wake alert naturally — waiting 90 minutes amplifies that even more, without the afternoon crash.',
    },
    bear: {
      pt: 'Ursos dependem do café para arrancar de manhã — atrasar 90 minutos parece difícil, mas os resultados surpreendem.',
      en: 'Bears rely on coffee to get started — delaying 90 minutes feels hard, but the results are surprising.',
    },
    wolf: {
      pt: 'Cafeína cedo reforça seu atraso circadiano — esperar 90 minutos começa a reprogramar seu relógio.',
      en: 'Early caffeine reinforces your circadian delay — waiting 90 minutes starts reprogramming your clock.',
    },
  },
  10: {
    dolphin: {
      pt: 'Golfinhos dormem levemente e acordam com qualquer estímulo — temperatura fria cria o ambiente que sua mente hiperativa finalmente aceita.',
      en: 'Dolphins sleep lightly and wake with any stimulus — cool temperature creates the environment your hyperactive mind finally accepts.',
    },
    lion: {
      pt: 'Você já dorme cedo — um quarto frio garante que esses primeiros ciclos de sono profundo sejam de máxima qualidade.',
      en: 'You already sleep early — a cool room ensures those first deep sleep cycles are at maximum quality.',
    },
    bear: {
      pt: 'Temperatura é o interruptor que seu corpo usa para entrar em sono profundo — 19°C é o seu número mágico.',
      en: 'Temperature is the switch your body uses to enter deep sleep — 19°C is your magic number.',
    },
    wolf: {
      pt: 'Quando você finalmente vai dormir tarde, o quarto ainda está quente — isso rouba o sono profundo que você mal consegue acessar.',
      en: 'When you finally sleep late, the room is still warm — this steals the deep sleep you can barely access as it is.',
    },
  },
  11: {
    dolphin: {
      pt: 'Consistência é o antídoto do caos circadiano — para Golfinhos, um horário fixo de acordar pode mudar tudo.',
      en: 'Consistency is the antidote to circadian chaos — for Dolphins, a fixed wake time can change everything.',
    },
    lion: {
      pt: 'Você já é consistente — agora veja o que 7 dias sem variação fazem pelo seu sono profundo.',
      en: 'You are already consistent — now see what 7 days without variation do for your deep sleep.',
    },
    bear: {
      pt: 'O maior sabotador do Urso é o fim de semana com horário diferente — 7 dias iguais mudam a qualidade do sono.',
      en: "The Bear's biggest saboteur is the weekend with a different schedule — 7 identical days change sleep quality.",
    },
    wolf: {
      pt: 'Horário fixo de acordar é a forma mais eficaz de mover seu relógio mais cedo — difícil de manter, mas funciona.',
      en: 'Fixed wake time is the most effective way to shift your clock earlier — hard to maintain, but it works.',
    },
  },
  12: {
    dolphin: {
      pt: 'Álcool e o sono ansioso do Golfinho são uma combinação devastadora — ele falsifica relaxamento e destrói o que restava de qualidade.',
      en: "Alcohol and the Dolphin's anxious sleep are a devastating combination — it fakes relaxation while destroying what quality remained.",
    },
    lion: {
      pt: 'Leões tendem a ser disciplinados — mas mesmo uma taça de vinho pode custar 40% do seu REM naquela noite.',
      en: 'Lions tend to be disciplined — but even one glass of wine can cost 40% of your REM that night.',
    },
    bear: {
      pt: "Ursos usam álcool para 'relaxar' depois de dias intensos — mas o custo no sono profundo supera qualquer benefício.",
      en: "Bears use alcohol to unwind after intense days — but the cost to deep sleep outweighs any benefit.",
    },
    wolf: {
      pt: 'Álcool parece seu aliado para adormecer mais cedo — mas ele destrói exatamente o REM que seu corpo mais precisa.',
      en: 'Alcohol seems like your ally to fall asleep earlier — but it destroys exactly the REM your body needs most.',
    },
  },
  13: {
    dolphin: {
      pt: 'Sua mente hiperativa precisa de um ritual de desaceleração — sem ele, o ciclo de pensamentos não para nem quando o corpo pede.',
      en: "Your hyperactive mind needs a wind-down ritual — without it, the thought cycle doesn't stop even when your body begs.",
    },
    lion: {
      pt: 'Você já tem disciplina — adicionar 60 minutos sem telas vai acelerar sua entrada no sono profundo.',
      en: 'You already have discipline — adding 60 screen-free minutes will accelerate your entry into deep sleep.',
    },
    bear: {
      pt: 'Ursos costumam estar na tela até segundos antes de dormir — essa única mudança pode ser a mais impactante.',
      en: 'Bears are often on screen until seconds before sleep — this single change may be the most impactful.',
    },
    wolf: {
      pt: 'Você é ativo à noite por natureza — mas telas prolongam isso e atrasam seu sono ainda mais. Hora de criar limites.',
      en: 'You are naturally active at night — but screens extend this and push your sleep even later. Time to set limits.',
    },
  },
  14: {
    dolphin: {
      pt: 'Um cochilo estratégico pode interromper o ciclo de privação crônica do Golfinho — mas as regras precisam ser seguidas à risca.',
      en: "A strategic nap can break the Dolphin's chronic deprivation cycle — but the rules need to be followed precisely.",
    },
    lion: {
      pt: 'Leões raramente precisam de cochilos — mas nas semanas mais pesadas, 20 minutos podem restaurar seu foco matinal.',
      en: 'Lions rarely need naps — but in heavy weeks, 20 minutes can restore your morning focus.',
    },
    bear: {
      pt: 'O cochilo das 15h é o ponto fraco do Urso — 20 minutos aqui podem evitar a queda de produtividade do final do dia.',
      en: "The 3pm nap is the Bear's sweet spot — 20 minutes here can prevent the late-day productivity crash.",
    },
    wolf: {
      pt: 'Cochilos ajudam Lobos a sobreviver ao mundo diurno — mas usados errado, atrapalham ainda mais o sono noturno.',
      en: 'Naps help Wolves survive the daytime world — but used wrongly, they make nighttime sleep even harder.',
    },
  },
  15: {
    dolphin: {
      pt: 'Exercício ajuda Golfinhos a ancorar o ritmo biológico — mas o timing certo faz toda a diferença na qualidade do sono.',
      en: 'Exercise helps Dolphins anchor their biological rhythm — but the right timing makes all the difference in sleep quality.',
    },
    lion: {
      pt: 'Exercício matinal é seu superpoder natural — alinha com seu pico de cortisol e amplia o sono profundo noturno.',
      en: 'Morning exercise is your natural superpower — it aligns with your cortisol peak and amplifies deep sleep at night.',
    },
    bear: {
      pt: 'Ursos se beneficiam muito do exercício matinal — ele estabiliza o ritmo circadiano e aumenta o sono profundo.',
      en: 'Bears benefit greatly from morning exercise — it stabilizes circadian rhythm and increases deep sleep.',
    },
    wolf: {
      pt: 'Exercício vespertino é ideal para o Lobo — alinha com seu pico biológico e não interfere no sono tardio.',
      en: "Afternoon exercise is ideal for the Wolf — it aligns with your biological peak and doesn't interfere with late sleep.",
    },
  },
  16: {
    dolphin: {
      pt: 'Golfinhos são propensos à ansiedade — cortisol alto à noite é seu maior inimigo interno contra o sono profundo.',
      en: 'Dolphins are prone to anxiety — high cortisol at night is your greatest internal enemy against deep sleep.',
    },
    lion: {
      pt: 'Leões carregam muita responsabilidade — o cortisol do estresse invade a noite e fragmenta os ciclos mais valiosos.',
      en: 'Lions carry a lot of responsibility — stress cortisol invades the night and fragments the most valuable cycles.',
    },
    bear: {
      pt: 'Ursos absorvem o estresse do dia sem perceber — e ele aparece na arquitetura do sono, reduzindo o sono profundo.',
      en: 'Bears absorb daily stress without noticing — and it shows up in sleep architecture, reducing deep sleep.',
    },
    wolf: {
      pt: 'Lobos operam à noite com cortisol ainda elevado do dia — aprender a desativá-lo é crítico para seu sono.',
      en: 'Wolves operate at night with cortisol still elevated from the day — learning to deactivate it is critical for your sleep.',
    },
  },
  17: {
    dolphin: {
      pt: 'Golfinhos têm REM fragmentado — otimizá-lo significa processar emoções que de outro modo ficam presas em loop.',
      en: 'Dolphins have fragmented REM — optimizing it means processing emotions that would otherwise stay stuck on loop.',
    },
    lion: {
      pt: 'Seu REM é rico quando protegido — estas técnicas vão garantir que cada ciclo final da noite seja aproveitado ao máximo.',
      en: 'Your REM is rich when protected — these techniques will ensure every late-night cycle is fully utilized.',
    },
    bear: {
      pt: 'Ursos com bom REM têm criatividade e equilíbrio emocional naturais — veja como maximizar isso.',
      en: 'Bears with good REM have natural creativity and emotional balance — see how to maximize that.',
    },
    wolf: {
      pt: 'Você tem REM intenso quando dorme no seu ritmo natural — aprenda a protegê-lo mesmo com horários impostos.',
      en: 'You have intense REM when you sleep in your natural rhythm — learn to protect it even with imposed schedules.',
    },
  },
  18: {
    dolphin: {
      pt: 'Viagens desequilibram qualquer pessoa, mas Golfinhos sentem mais — seu ritmo irregular torna o jet lag ainda mais severo.',
      en: 'Travel throws anyone off, but Dolphins feel it more — your irregular rhythm makes jet lag even more severe.',
    },
    lion: {
      pt: 'Voos para o oeste favorecem seu relógio matinal — mas os para o leste exigem estratégia. Esta lição cobre os dois.',
      en: 'Westward flights favor your early clock — but eastward ones demand strategy. This lesson covers both.',
    },
    bear: {
      pt: 'Ursos se adaptam ao jet lag de forma moderada — as estratégias desta lição aceleram sua recuperação em dias.',
      en: 'Bears adapt to jet lag moderately — the strategies in this lesson can accelerate your recovery by days.',
    },
    wolf: {
      pt: 'Você já vive em jetlag social constante — viajar para o leste é um choque duplo. Veja como minimizar o dano.',
      en: 'You already live in constant social jetlag — traveling east is a double shock. See how to minimize the damage.',
    },
  },
  19: {
    dolphin: {
      pt: 'O sono do Golfinho já é leve por natureza — com a idade, proteger cada camada de qualidade se torna ainda mais urgente.',
      en: "The Dolphin's sleep is already light by nature — with age, protecting every layer of quality becomes even more urgent.",
    },
    lion: {
      pt: 'Você já tende ao cronotipo matinal — com a idade, isso se acentua. Aprenda a usar isso a seu favor.',
      en: 'You already lean toward the morning chronotype — with age, this intensifies. Learn to use it to your advantage.',
    },
    bear: {
      pt: 'O sono profundo do Urso diminui com a idade — os hábitos que você forma agora determinam como envelhecerá dormindo.',
      en: "The Bear's deep sleep decreases with age — the habits you form now determine how you will age as a sleeper.",
    },
    wolf: {
      pt: 'Seu cronotipo tardio tende a se alinhar mais cedo com a idade — mas só se você construir os hábitos certos agora.',
      en: 'Your late chronotype tends to shift earlier with age — but only if you build the right habits now.',
    },
  },
  20: {
    dolphin: {
      pt: 'Golfinhos tendem à obsessão com qualidade — rastrear o sono pode virar ansiedade. Aprenda os limites saudáveis.',
      en: 'Dolphins tend toward obsession with quality — sleep tracking can become anxiety. Learn the healthy limits.',
    },
    lion: {
      pt: 'Você é orientado a metas — use dados para confirmar progresso, mas não deixe números substituírem a sensação real.',
      en: "You are goal-oriented — use data to confirm progress, but don't let numbers replace the real feeling.",
    },
    bear: {
      pt: 'Ursos se beneficiam de rastreamento simples — ele revela padrões que o senso comum não captura.',
      en: "Bears benefit from simple tracking — it reveals patterns that common sense doesn't capture.",
    },
    wolf: {
      pt: 'Dados mostram o custo real do seu jetlag social crônico — use-os para motivar mudanças, não para se culpar.',
      en: 'Data shows the real cost of your chronic social jetlag — use it to motivate change, not to blame yourself.',
    },
  },
  21: {
    dolphin: {
      pt: 'Você chegou ao fim — seu plano de Golfinho foi construído lição por lição. Agora é só manter.',
      en: "You've reached the end — your Dolphin blueprint was built lesson by lesson. Now just maintain it.",
    },
    lion: {
      pt: '21 dias, 21 lições. Seu perfil de Leão está mais afiado do que nunca. Compartilhe e proteja.',
      en: '21 days, 21 lessons. Your Lion profile is sharper than ever. Share it and protect it.',
    },
    bear: {
      pt: 'Ursos constroem bem quando são consistentes — seu plano pessoal é prova de que você chegou lá.',
      en: 'Bears build well when consistent — your personal blueprint is proof that you made it.',
    },
    wolf: {
      pt: 'Você terminou apesar do sistema ser feito contra você — seu plano de Lobo é resistência e vitória.',
      en: 'You finished despite the system being built against you — your Wolf blueprint is resilience and victory.',
    },
  },
};

export function getChronotypeOneLiner(
  stepNumber: number,
  chronotype: string | null,
  lang: Lang
): string | null {
  if (!chronotype) return null;
  const step = CHRONOTYPE_ONE_LINERS[stepNumber];
  if (!step) return null;
  const entry = step[chronotype as Chronotype];
  if (!entry) return null;
  return entry[lang] ?? null;
}
