import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, Moon, Check, ChevronDown, ChevronUp, FlaskConical } from 'lucide-react-native';
import { useState } from 'react';
import { LESSON_FONT, LESSON_INK, LESSON_PAPER } from '@/constants/lessonPaperTheme';

interface Lesson1InteractiveCardWebProps {
  renderCompleteButton?: (showButton: boolean) => React.ReactNode;
  onStepChange?: () => void;
}

const STEPS_PT = [
  {
    type: 'hook',
    tag: 'O Problema de Hoje',
    title: 'Dormiu 8 horas.\nAinda acordou cansado.',
    body: 'Se você já sentiu isso, não é fraqueza — é biologia. E tem uma explicação exata que a maioria das pessoas nunca ouviu.',
    proof: {
      stat: '1 em cada 3 adultos acorda sem se sentir descansado — mesmo dormindo a quantidade recomendada de horas.',
      source: 'Sleep Medicine Reviews, 2019',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Escolha um horário fixo para dormir esta noite e mantenha-o amanhã, independente do resultado. A consistência do timing vem antes de qualquer outra mudança.',
      morning: 'Ao acordar, registre uma palavra sobre como se sente — antes de abrir o celular.',
      why: 'O timing consistente do sono estabiliza a fase circadiana em 3–5 dias, mesmo antes de mudar qualquer outro hábito.',
    },
    science: [
      {
        citation: 'Pesquisa de Meir Kryger (Yale School of Medicine, 2017) concluiu que a qualidade do sono é um preditor mais forte de bem-estar diurno do que a quantidade total de horas dormidas.',
        source: 'Journal of Clinical Sleep Medicine, 2017',
      },
    ],
    cta: 'Descobrir por quê',
  },
  {
    type: 'insight',
    tag: 'O Que Ninguém te Contou',
    title: 'Seu cérebro tem um sistema de limpeza que só funciona enquanto você dorme.',
    body: 'Durante o sono profundo, o sistema glinfático remove toxinas acumuladas durante o dia — incluindo proteínas ligadas ao declínio cognitivo. Se você acorda no meio de um ciclo, interrompe esse processo. Mesmo com 8 horas no relógio.',
    proof: {
      stat: 'O sistema glinfático elimina até 60% mais resíduos durante o sono do que durante a vigília.',
      source: 'Science, 2013',
    },
    protocol: {
      difficulty: 'medium' as const,
      tonight: 'Elimine o álcool esta noite. Mesmo uma dose reduz o sono profundo (N3) em até 25%.',
      morning: 'Beba 500ml de água nos primeiros 10 minutos após acordar. O cérebro perde líquido durante a limpeza noturna.',
      why: 'O álcool bloqueia a entrada no sono N3 — a única janela em que o sistema glinfático opera em capacidade plena.',
    },
    science: [
      {
        citation: 'Pesquisa de Maiken Nedergaard (University of Rochester, 2013) demonstrou que o espaço intersticial do cérebro se expande aproximadamente 60% durante o sono, permitindo maior fluxo do líquido cefalorraquidiano e remoção de metabólitos tóxicos.',
        source: 'Science, 2013',
      },
    ],
    cta: 'Entender como funciona',
  },
  {
    type: 'mechanism',
    tag: 'A Biologia',
    title: 'Seu sono não é uma linha reta. É uma onda.',
    body: 'Cada noite você percorre 4–6 ciclos de ~90 minutos. Dentro de cada ciclo existem 4 estágios com funções diferentes. Acordar no meio do sono profundo (N3) é como interromper uma cirurgia pela metade.',
    proof: {
      stat: 'Acordar durante o sono profundo N3 compromete o desempenho cognitivo por até 30 minutos — mesmo após uma noite completa de sono.',
      source: 'Journal of Sleep Research, 2006',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Calcule agora seu horário de acordar em múltiplos de 90 min. Configure o alarme e desative a soneca.',
      morning: 'Quando o alarme tocar, sente-se imediatamente. Não aperte soneca — nem uma vez.',
      why: 'A soneca fragmenta o ciclo final, provocando inércia do sono no estágio mais difícil de recuperar.',
    },
    science: [
      {
        citation: 'Nathaniel Kleitman (University of Chicago) descobriu o ciclo ultradiano de ~90 minutos em 1953 — a mesma duração fundamental é confirmada em pesquisas contemporâneas.',
        source: 'Sleep, 1953',
      },
      {
        citation: 'Em Why We Sleep, Matthew Walker (UC Berkeley, 2017) descreve como a arquitetura dos ciclos determina a restauração cognitiva e emocional ao longo da noite.',
        source: 'Walker MP. Why We Sleep. Scribner, 2017 (fonte secundária; priorize estudos revisados por pares).',
      },
    ],
    cta: 'O que fazer esta noite',
  },
  {
    type: 'application',
    tag: 'Para Você, Esta Noite',
    title: 'Uma ação. Não uma lista.',
    body: 'Calcule seu horário de acordar em múltiplos de 90 minutos a partir da hora que vai dormir.\n\nExemplo: dorme às 22h30 → acorda às 6h00\n(5 ciclos × 90 min = 7h30)\n\nConfigure o alarme agora.',
    proof: {
      stat: 'Participantes que alinharam o horário de acordar a múltiplos de 90 minutos relataram 42% menos sonolência matinal.',
      source: 'Chronobiology International, 2011',
    },
    protocol: {
      difficulty: 'medium' as const,
      tonight: 'Deixe o celular de cabeça para baixo 30 min antes de dormir. A luz azul atrasa a melatonina em ~90 minutos.',
      morning: 'Exponha os olhos à luz natural nos primeiros 20 min após acordar. Sem óculos escuros.',
      why: 'A luz é o principal sincronizador circadiano — exposição noturna à tela pode atrasar o relógio biológico em horas.',
    },
    science: [
      {
        citation: 'Em Sleep, Nick Littlehales (2016) descreve o protocolo R90 — baseado em ciclos de 90 minutos — como a estrutura mais eficaz para maximizar a recuperação física e mental em atletas de elite.',
        source: 'Littlehales N. Sleep (book). Penguin, 2016 (fonte de prática esportiva; não ensaio clínico).',
      },
    ],
    cta: 'Quase lá',
  },
  {
    type: 'check',
    tag: 'Amanhã de Manhã',
    title: 'Um sinal para saber se funcionou.',
    body: 'Ao acordar, observe: você sentiu aquela confusão pesada nos primeiros minutos?\n\nSim → acordou no meio de um ciclo.\nNão → acertou o timing.',
    proof: {
      stat: 'A inércia do sono — a confusão ao acordar — é mensuravelmente menor quando o despertar ocorre no N1 ou N2 em comparação ao N3.',
      source: 'Journal of Sleep Research, 2012',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Baixe a temperatura do quarto para 18–20°C pelo menos 1 hora antes de dormir.',
      morning: 'Avalie como você se sentiu esta manhã:',
      why: 'A temperatura central do corpo precisa cair ~1°C para iniciar o sono — um ambiente fresco acelera esse processo.',
    },
    science: [
      {
        citation: 'Pesquisa de Leon Lack (Flinders University, 2005) demonstrou que cochilos de 10 minutos — terminando no N2 — produzem vigilância imediata sem inércia do sono, reforçando que o estágio do despertar importa mais do que a duração total.',
        source: 'Sleep, 2005',
      },
    ],
  },
];

const STEPS_EN = [
  {
    type: 'hook',
    tag: "Today's Problem",
    title: 'Slept 8 hours.\nStill woke up exhausted.',
    body: "If you've felt this, it's not weakness — it's biology. And there's an exact explanation most people have never heard.",
    proof: {
      stat: '1 in 3 adults reports waking unrefreshed despite adequate sleep duration.',
      source: 'Sleep Medicine Reviews, 2019',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Pick a fixed bedtime tonight and hold it tomorrow, whatever the result. Timing consistency comes before everything else.',
      morning: 'When you wake, write one word for how you feel — before opening your phone.',
      why: 'Consistent sleep timing stabilises circadian phase in 3–5 days, even before changing any other habit.',
    },
    science: [
      {
        citation: 'Research by Meir Kryger (Yale School of Medicine, 2017) found that sleep quality is a stronger predictor of daytime wellbeing than total sleep duration.',
        source: 'Journal of Clinical Sleep Medicine, 2017',
      },
    ],
    cta: 'Find out why',
  },
  {
    type: 'insight',
    tag: 'What Nobody Told You',
    title: 'Your brain has a cleaning system that only runs while you sleep.',
    body: 'During deep sleep, the glymphatic system flushes out toxins built up during the day — including proteins linked to cognitive decline. Wake mid-cycle and you cut that process short. Even after 8 hours on the clock.',
    proof: {
      stat: 'The glymphatic system clears up to 60% more waste during sleep than during wakefulness.',
      source: 'Science, 2013',
    },
    protocol: {
      difficulty: 'medium' as const,
      tonight: 'Skip alcohol tonight. Even one drink reduces deep sleep (N3) by up to 25%.',
      morning: 'Drink 500ml of water within 10 minutes of waking. The brain loses fluid during overnight cleaning.',
      why: 'Alcohol blocks entry into N3 sleep — the only window when the glymphatic system runs at full capacity.',
    },
    science: [
      {
        citation: "Research by Maiken Nedergaard (University of Rochester, 2013) demonstrated that the brain's interstitial space expands approximately 60% during sleep, enabling significantly greater cerebrospinal fluid flow and removal of toxic metabolites.",
        source: 'Science, 2013',
      },
    ],
    cta: 'See how it works',
  },
  {
    type: 'mechanism',
    tag: 'The Biology',
    title: "Your sleep isn't a flat line. It's a wave.",
    body: 'Each night you move through 4–6 cycles of ~90 minutes. Each cycle has 4 stages with distinct functions. Waking mid-deep sleep (N3) is like stopping a surgery halfway.',
    proof: {
      stat: 'Waking during N3 deep sleep impairs cognitive performance for up to 30 minutes — even after a full night of sleep.',
      source: 'Journal of Sleep Research, 2006',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Calculate your wake time now in 90-minute multiples. Set the alarm and disable snooze.',
      morning: 'When the alarm sounds, sit up immediately. Do not hit snooze — not even once.',
      why: 'The snooze alarm fragments the final cycle, triggering sleep inertia at the hardest stage to recover from.',
    },
    science: [
      {
        citation: 'Nathaniel Kleitman (University of Chicago) discovered the ~90-minute ultradian sleep-wake cycle in 1953 — the same fundamental duration confirmed by contemporary research.',
        source: 'Sleep, 1953',
      },
      {
        citation: 'In Why We Sleep, Matthew Walker (UC Berkeley, 2017) describes how cycle architecture determines cognitive and emotional restoration across the night.',
        source: 'Walker MP. Why We Sleep. Scribner, 2017 (secondary source; pair with peer-reviewed studies).',
      },
    ],
    cta: 'What to do tonight',
  },
  {
    type: 'application',
    tag: 'For You, Tonight',
    title: 'One action. Not a list.',
    body: "Calculate your wake time in 90-minute multiples from when you fall asleep.\n\nExample: sleep at 10:30pm → wake at 6:00am\n(5 cycles × 90 min = 7h30)\n\nSet your alarm now.",
    proof: {
      stat: 'Participants who aligned wake times to 90-minute cycle multiples reported 42% less morning grogginess.',
      source: 'Chronobiology International, 2011',
    },
    protocol: {
      difficulty: 'medium' as const,
      tonight: 'Put your phone face-down 30 minutes before bed. Blue light delays melatonin onset by ~90 minutes.',
      morning: 'Let natural light hit your eyes within 20 minutes of waking. No sunglasses.',
      why: 'Light is the primary circadian synchroniser — evening screen exposure can delay the biological clock by hours.',
    },
    science: [
      {
        citation: 'In Sleep, Nick Littlehales (2016) describes the R90 protocol — built on 90-minute cycles — as the most effective framework for maximising physical and mental recovery in elite athletes.',
        source: 'Littlehales N. Sleep (book). Penguin, 2016 (practice-oriented source; not a clinical trial).',
      },
    ],
    cta: 'Almost there',
  },
  {
    type: 'check',
    tag: 'Tomorrow Morning',
    title: 'One signal to know if it worked.',
    body: 'When you wake, notice: did you feel that heavy, foggy confusion in the first few minutes?\n\nYes → you woke mid-cycle.\nNo → you nailed the timing.',
    proof: {
      stat: 'Sleep inertia — the groggy confusion on waking — is measurably reduced when waking from N1 or N2 compared to N3.',
      source: 'Journal of Sleep Research, 2012',
    },
    protocol: {
      difficulty: 'easy' as const,
      tonight: 'Lower your room to 18–20°C at least 1 hour before bed.',
      morning: 'Rate how you felt this morning:',
      why: 'Core body temperature must drop ~1°C to initiate sleep — a cool room accelerates that process.',
    },
    science: [
      {
        citation: 'Research by Leon Lack (Flinders University, 2005) found that 10-minute naps — ending in N2 — produce immediate alertness with no sleep inertia, reinforcing that wake-stage matters more than total duration.',
        source: 'Sleep, 2005',
      },
    ],
  },
];

const STAGES_PT = [
  { label: 'N1', sublabel: 'Transição', color: '#334155', depth: 1 },
  { label: 'N2', sublabel: 'Sono leve', color: '#1e40af', depth: 2 },
  { label: 'N3', sublabel: 'Sono profundo', color: '#1d4ed8', depth: 4 },
  { label: 'REM', sublabel: 'Memória & emoções', color: '#fbbf24', depth: 2 },
];

const STAGES_EN = [
  { label: 'N1', sublabel: 'Transition', color: '#334155', depth: 1 },
  { label: 'N2', sublabel: 'Light sleep', color: '#1e40af', depth: 2 },
  { label: 'N3', sublabel: 'Deep sleep', color: '#1d4ed8', depth: 4 },
  { label: 'REM', sublabel: 'Memory & emotion', color: '#fbbf24', depth: 2 },
];

type SourceKind = 'peer' | 'secondary';

function classifySource(source: string): SourceKind {
  const s = source.toLowerCase();
  const secondaryHints = ['why we sleep', 'por que nós dormimos', 'por que dormimos', 'sleep (book)', 'penguin', 'scribner'];
  return secondaryHints.some((hint) => s.includes(hint)) ? 'secondary' : 'peer';
}

export const Lesson1InteractiveCardWeb = ({ renderCompleteButton, onStepChange }: Lesson1InteractiveCardWebProps) => {
  const { language } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const padH = windowWidth < 400 ? 16 : windowWidth < 640 ? 22 : 48;
  const isPt = language === 'pt';
  const steps = isPt ? STEPS_PT : STEPS_EN;
  const stages = isPt ? STAGES_PT : STAGES_EN;

  const [currentStep, setCurrentStep] = useState(0);
  const [commitment, setCommitment] = useState('');
  const [committed, setCommitted] = useState(false);
  const [scienceOpen, setScienceOpen] = useState(false);
  const step = steps[currentStep];
  const totalSteps = steps.length;
  const isLast = currentStep === totalSteps - 1;

  const titleRead =
    windowWidth < 400
      ? { fontSize: 26, lineHeight: 34 }
      : windowWidth < 640
        ? { fontSize: 30, lineHeight: 40 }
        : { fontSize: 34, lineHeight: 44 };
  const bodyRead =
    windowWidth < 400 ? { fontSize: 17, lineHeight: 29 } : { fontSize: 18, lineHeight: 31 };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setScienceOpen(false);
      onStepChange?.();
    }
  };
  return (
    <View
      style={[
        styles.wrapper,
        {
          maxWidth: windowWidth > 780 ? 648 : ('100%' as const),
        },
      ]}
    >
      <ProgressBar current={currentStep} total={totalSteps} padH={padH} />

      <View style={[styles.scrollContent, { paddingHorizontal: padH }]} key={currentStep}>
        <View style={styles.stepContainer}>
          <View style={styles.tagRow}>
            <Moon size={14} color={LESSON_PAPER.foil} />
            <Text style={styles.tag}>{step.tag}</Text>
          </View>

          <Text style={[styles.title, titleRead]}>{step.title}</Text>
          <Text style={[styles.body, bodyRead]}>{step.body}</Text>

          {step.type === 'mechanism' && (
            <SleepCycleDiagram stages={stages} isPt={isPt} />
          )}

          <ProofMoment stat={step.proof.stat} source={step.proof.source} />

          <ProtocolCard
            difficulty={step.protocol.difficulty}
            tonight={step.protocol.tonight}
            morning={step.protocol.morning}
            why={step.protocol.why}
            isPt={isPt}
          />

          {step.type === 'check' && !committed && (
            <View style={styles.commitmentBox}>
              <Text style={styles.commitmentLabel}>
                {isPt ? '"Esta noite eu vou ___"' : '"Tonight I will ___"'}
              </Text>
              <TextInput
                style={styles.commitmentInput}
                placeholder={isPt ? 'escreva seu compromisso...' : 'write your commitment...'}
                placeholderTextColor={LESSON_INK.label}
                value={commitment}
                onChangeText={setCommitment}
                multiline
              />
              {commitment.trim().length > 0 && (
                <TouchableOpacity
                  style={styles.commitBtn}
                  onPress={() => setCommitted(true)}
                >
                  <Check size={16} color="#0f172a" />
                  <Text style={styles.commitBtnText}>
                    {isPt ? 'Confirmar compromisso' : 'Confirm commitment'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}

          {step.type === 'check' && committed && (
            <View style={styles.committedBox}>
              <View style={styles.committedCheck}>
                <Check size={20} color="#0f172a" />
              </View>
              <Text style={styles.committedText}>
                {isPt ? `"${commitment}"` : `"${commitment}"`}
              </Text>
              <Text style={styles.committedSub}>
                {isPt ? 'Compromisso registrado. Boa noite.' : 'Commitment set. Sleep well.'}
              </Text>
            </View>
          )}

          <ScienceExpander
            isPt={isPt}
            open={scienceOpen}
            onToggle={() => setScienceOpen(!scienceOpen)}
            entries={step.science}
          />
        </View>

      </View>

      <View style={[styles.navRow, { paddingHorizontal: padH }]}>
        {!isLast && (
          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>{step.cta}</Text>
            <ArrowRight size={18} color="#ffffff" />
          </TouchableOpacity>
        )}

        {isLast && !committed && (
          <View style={styles.nextBtnDisabled}>
            <Text style={styles.nextBtnDisabledText}>
              {isPt ? 'Preencha o compromisso' : 'Fill in your commitment'}
            </Text>
          </View>
        )}
      </View>

      {renderCompleteButton && renderCompleteButton(isLast)}
    </View>
  );
};

function ProtocolCard({
  difficulty,
  tonight,
  morning,
  why,
  isPt,
}: {
  difficulty: 'easy' | 'medium' | 'advanced';
  tonight: string;
  morning: string;
  why: string;
  isPt: boolean;
}) {
  const difficultyMap = {
    easy: { emoji: '🟢', label: isPt ? 'Fácil' : 'Easy' },
    medium: { emoji: '🟡', label: isPt ? 'Médio' : 'Medium' },
    advanced: { emoji: '🔴', label: isPt ? 'Avançado' : 'Advanced' },
  };
  const diff = difficultyMap[difficulty];

  return (
    <View style={proto.wrapper}>
      <View style={proto.headerRow}>
        <Text style={proto.headerLabel}>
          {isPt ? 'O PROTOCOLO' : 'THE PROTOCOL'}
        </Text>
        <View style={proto.difficultyTag}>
          <Text style={proto.difficultyText}>{diff.emoji} {diff.label}</Text>
        </View>
      </View>

      <View style={proto.row}>
        <View style={proto.rowIcon}>
          <Text style={proto.rowIconText}>🌙</Text>
        </View>
        <View style={proto.rowContent}>
          <Text style={proto.rowLabel}>{isPt ? 'Esta noite' : 'Tonight'}</Text>
          <Text style={proto.rowText}>{tonight}</Text>
        </View>
      </View>

      <View style={proto.divider} />

      <View style={proto.row}>
        <View style={proto.rowIcon}>
          <Text style={proto.rowIconText}>☀️</Text>
        </View>
        <View style={proto.rowContent}>
          <Text style={proto.rowLabel}>{isPt ? 'Amanhã' : 'Tomorrow'}</Text>
          <Text style={proto.rowText}>{morning}</Text>
        </View>
      </View>

      <View style={proto.whyRow}>
        <Text style={proto.whyLabel}>{isPt ? 'Por que funciona:' : 'Why it works:'}</Text>
        <Text style={proto.whyText}>{why}</Text>
      </View>
    </View>
  );
}

function ProofMoment({ stat, source }: { stat: string; source: string }) {
  return (
    <View style={proof.wrapper}>
      <View style={proof.accent} />
      <View style={proof.content}>
        <Text style={proof.stat}>{stat}</Text>
        <Text style={proof.source}>— {source}</Text>
      </View>
    </View>
  );
}

function ScienceExpander({
  isPt,
  open,
  onToggle,
  entries,
}: {
  isPt: boolean;
  open: boolean;
  onToggle: () => void;
  entries: { citation: string; source: string }[];
}) {
  return (
    <View style={sci.wrapper}>
      <TouchableOpacity style={sci.header} onPress={onToggle} activeOpacity={0.7}>
        <View style={sci.headerLeft}>
          <FlaskConical size={14} color="#0369a1" />
          <Text style={sci.headerText}>
            {isPt ? 'A Ciência Por Trás Disso' : 'The Science Behind This'}
          </Text>
        </View>
        {open ? (
          <ChevronUp size={16} color="#0369a1" />
        ) : (
          <ChevronDown size={16} color="#0369a1" />
        )}
      </TouchableOpacity>

      {open && (
        <View style={sci.body}>
          <Text style={sci.disclaimer}>
            {isPt
              ? 'Resumo autoral das evidências (sem cópia literal de conteúdo protegido).'
              : 'Author-written evidence summary (no verbatim copyrighted content).'}
          </Text>
          {[...entries]
            .sort((a, b) => {
              const aRank = classifySource(a.source) === 'peer' ? 0 : 1;
              const bRank = classifySource(b.source) === 'peer' ? 0 : 1;
              return aRank - bRank;
            })
            .map((entry, i) => {
              const kind = classifySource(entry.source);
              return (
            <View key={i} style={[sci.entry, i > 0 && sci.entryBorder]}>
              <View style={[sci.credibilityBadge, kind === 'peer' ? sci.credibilityPeer : sci.credibilitySecondary]}>
                <Text style={sci.credibilityBadgeText}>
                  {kind === 'peer'
                    ? (isPt ? 'Artigo revisado por pares' : 'Peer-reviewed article')
                    : (isPt ? 'Fonte secundária' : 'Secondary source')}
                </Text>
              </View>
              <Text style={sci.citation}>{entry.citation}</Text>
              <Text style={sci.entrySource}>{isPt ? 'Fonte' : 'Source'}: {entry.source}</Text>
            </View>
              );
            })}
        </View>
      )}
    </View>
  );
}

function ProgressBar({ current, total, padH }: { current: number; total: number; padH: number }) {
  return (
    <View style={[pb.wrapper, { paddingHorizontal: padH }]}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            pb.segment,
            i < current && pb.done,
            i === current && pb.active,
            i > current && pb.pending,
          ]}
        />
      ))}
    </View>
  );
}

function SleepCycleDiagram({
  stages,
  isPt,
}: {
  stages: typeof STAGES_PT;
  isPt: boolean;
}) {
  const maxDepth = 4;
  const barMaxHeight = 80;

  return (
    <View style={diag.wrapper}>
      <Text style={diag.label}>
        {isPt ? '1 ciclo de sono (~90 minutos)' : '1 sleep cycle (~90 minutes)'}
      </Text>
      <View style={diag.row}>
        {stages.map((s, i) => (
          <View key={i} style={diag.col}>
            <View style={diag.barTrack}>
              <View
                style={[
                  diag.bar,
                  {
                    height: (s.depth / maxDepth) * barMaxHeight,
                    backgroundColor: s.color,
                  },
                ]}
              />
            </View>
            <Text style={[diag.stageLabel, s.label === 'REM' && diag.remLabel]}>
              {s.label}
            </Text>
            <Text style={diag.stageSub}>{s.sublabel}</Text>
          </View>
        ))}
      </View>
      <View style={diag.footnoteRow}>
        <View style={diag.footnoteItem}>
          <View style={[diag.dot, { backgroundColor: '#1d4ed8' }]} />
          <Text style={diag.footnoteText}>
            {isPt ? 'N3 = limpeza cerebral' : 'N3 = brain cleaning'}
          </Text>
        </View>
        <View style={diag.footnoteItem}>
          <View style={[diag.dot, { backgroundColor: '#fbbf24' }]} />
          <Text style={diag.footnoteText}>
            {isPt ? 'REM = memória & sonhos' : 'REM = memory & dreams'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    backgroundColor: LESSON_PAPER.canvas,
    alignSelf: 'center',
    overflow: 'hidden',
    marginTop: -8,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: LESSON_PAPER.border,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.09,
    shadowRadius: 24,
    elevation: 3,
  },
  scrollContent: {
    paddingTop: 28,
    paddingBottom: 20,
  },
  stepContainer: {
    minHeight: 220,
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  tag: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6a5230',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  title: {
    fontWeight: '700',
    color: LESSON_INK.display,
    marginBottom: 22,
    letterSpacing: -0.45,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  body: {
    color: LESSON_INK.body,
    marginBottom: 26,
    letterSpacing: 0.02,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  commitmentBox: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
    gap: 16,
    marginBottom: 24,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 18,
    elevation: 2,
  },
  commitmentLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5c4828',
    fontStyle: 'italic',
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  commitmentInput: {
    backgroundColor: LESSON_PAPER.inset,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: LESSON_INK.display,
    minHeight: 88,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    textAlignVertical: 'top',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  commitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: LESSON_PAPER.foil,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(90, 70, 40, 0.25)',
  },
  commitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1510',
    letterSpacing: 0.2,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  committedBox: {
    backgroundColor: '#ecfdf5',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.35)',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  committedCheck: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#10b981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  committedText: {
    fontSize: 18,
    fontWeight: '600',
    color: LESSON_INK.display,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 30,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  committedSub: {
    fontSize: 14,
    color: '#047857',
    fontWeight: '600',
  },
  navRow: {
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: LESSON_PAPER.border,
    alignItems: 'stretch',
    backgroundColor: LESSON_PAPER.elevated,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  backBtnText: {
    fontSize: 14,
    color: LESSON_INK.muted,
    fontWeight: '500',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#121018',
    paddingVertical: 17,
    paddingHorizontal: 24,
    borderRadius: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: LESSON_PAPER.foilSoft,
  },
  nextBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#faf7f0',
    letterSpacing: 0.8,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  nextBtnDisabled: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    backgroundColor: LESSON_PAPER.canvas,
    width: '100%',
    alignItems: 'center',
  },
  nextBtnDisabledText: {
    fontSize: 14,
    color: LESSON_INK.label,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});

const pb = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 14,
    gap: 6,
    backgroundColor: LESSON_PAPER.elevated,
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: LESSON_PAPER.divider,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  done: {
    backgroundColor: LESSON_PAPER.foil,
    opacity: 0.45,
  },
  active: {
    backgroundColor: LESSON_PAPER.foil,
  },
  pending: {
    backgroundColor: LESSON_PAPER.border,
  },
});

const proof = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 16,
    marginBottom: 26,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 2,
  },
  accent: {
    width: 3,
    backgroundColor: LESSON_PAPER.foil,
  },
  content: {
    flex: 1,
    padding: 16,
    gap: 6,
  },
  stat: {
    fontSize: 15,
    fontWeight: '600',
    color: LESSON_INK.display,
    lineHeight: 25,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  source: {
    fontSize: 13,
    color: LESSON_INK.label,
    fontStyle: 'italic',
    lineHeight: 20,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});

const proto = StyleSheet.create({
  wrapper: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    padding: 22,
    marginBottom: 26,
    gap: 0,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.07,
    shadowRadius: 20,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: LESSON_INK.display,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  difficultyTag: {
    backgroundColor: LESSON_PAPER.inset,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
  },
  difficultyText: {
    fontSize: 12,
    color: LESSON_INK.muted,
    fontWeight: '500',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 8,
  },
  rowIcon: {
    width: 28,
    alignItems: 'center',
    paddingTop: 2,
  },
  rowIconText: {
    fontSize: 16,
  },
  rowContent: {
    flex: 1,
    gap: 4,
  },
  rowLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: LESSON_INK.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  rowText: {
    fontSize: 15,
    color: LESSON_INK.body,
    lineHeight: 25,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  divider: {
    height: 1,
    backgroundColor: LESSON_PAPER.divider,
    marginVertical: 4,
  },
  whyRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: LESSON_PAPER.divider,
    gap: 4,
  },
  whyLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: LESSON_INK.label,
    textTransform: 'uppercase',
    letterSpacing: 1,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  whyText: {
    fontSize: 14,
    color: LESSON_INK.muted,
    lineHeight: 23,
    fontStyle: 'italic',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});

const sci = StyleSheet.create({
  wrapper: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(71, 95, 119, 0.22)',
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: LESSON_PAPER.elevated,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#e4ebf2',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3d5566',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  body: {
    backgroundColor: LESSON_PAPER.elevated,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  entry: {
    gap: 6,
  },
  entryBorder: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: LESSON_PAPER.divider,
  },
  citation: {
    fontSize: 14,
    color: LESSON_INK.body,
    lineHeight: 23,
    ...(LESSON_FONT.display ? { fontFamily: LESSON_FONT.display } : {}),
  },
  entrySource: {
    fontSize: 12,
    color: LESSON_INK.label,
    fontStyle: 'italic',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  disclaimer: {
    fontSize: 12,
    color: LESSON_INK.muted,
    lineHeight: 18,
    marginBottom: 2,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  credibilityBadge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  credibilityPeer: {
    backgroundColor: 'rgba(16,185,129,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.35)',
  },
  credibilitySecondary: {
    backgroundColor: 'rgba(251,191,36,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.4)',
  },
  credibilityBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: LESSON_INK.display,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});

const diag = StyleSheet.create({
  wrapper: {
    backgroundColor: LESSON_PAPER.elevated,
    borderRadius: 18,
    padding: 26,
    marginBottom: 26,
    borderWidth: 1,
    borderColor: LESSON_PAPER.border,
    shadowColor: LESSON_PAPER.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 16,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: LESSON_INK.label,
    textAlign: 'center',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 20,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  col: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  barTrack: {
    height: 80,
    justifyContent: 'flex-end',
    width: '70%',
  },
  bar: {
    width: '100%',
    borderRadius: 6,
    minHeight: 12,
  },
  stageLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: LESSON_INK.display,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  remLabel: {
    color: '#b45309',
  },
  stageSub: {
    fontSize: 10,
    color: LESSON_INK.muted,
    textAlign: 'center',
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
  footnoteRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    borderTopWidth: 1,
    borderTopColor: LESSON_PAPER.divider,
    paddingTop: 16,
  },
  footnoteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  footnoteText: {
    fontSize: 12,
    color: LESSON_INK.muted,
    ...(LESSON_FONT.text ? { fontFamily: LESSON_FONT.text } : {}),
  },
});
