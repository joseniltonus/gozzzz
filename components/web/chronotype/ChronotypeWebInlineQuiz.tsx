/**
 * Quiz de cronótipo inline (web) — mesma lógica persistida em `gozzzz_chronotype`
 * que a landing /web/sono-plus. Reutilizável na página /web/programa sem
 * `router.push` com hash (no Expo Router web isso costuma falhar).
 */
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Crown } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

const isWeb = Platform.OS === 'web';

export type QuizChronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

const GOLD = '#7c5ce8';
const BG_CARD = '#14122e';
const TEXT_MAIN = '#e8e5df';
const TEXT_MUTED = '#94a3b8';

const QUIZ_SCREENS: ReadonlyArray<{
  q: string;
  sub: string;
  multi: boolean;
  options: ReadonlyArray<{ id: string; emoji: string; label: string }>;
}> = [
  {
    q: 'O que rouba seu sono?',
    sub: 'Escolha o que mais te afeta',
    multi: false,
    options: [
      { id: 'mind', emoji: '🌀', label: 'Mente não para' },
      { id: 'cantfall', emoji: '🌙', label: 'Não consigo dormir' },
      { id: 'wakenight', emoji: '⚡', label: 'Acordo à noite' },
      { id: 'exhausted', emoji: '😮‍💨', label: 'Acordo exausto' },
    ],
  },
  {
    q: 'Sem alarme, que horas você acordaria?',
    sub: 'Seu ritmo natural de despertar',
    multi: false,
    options: [
      { id: 'before6', emoji: '🌅', label: 'Antes das 6h' },
      { id: '6to8', emoji: '☀️', label: '6h – 8h' },
      { id: '8to10', emoji: '🌤️', label: '8h – 10h' },
      { id: 'after10', emoji: '🌑', label: 'Depois das 10h' },
    ],
  },
  {
    q: 'Quando você tem mais energia?',
    sub: 'Seu pico natural de rendimento',
    multi: false,
    options: [
      { id: 'morning', emoji: '🏃', label: 'Cedo pela manhã' },
      { id: 'midday', emoji: '📈', label: 'Ao meio-dia' },
      { id: 'afternoon', emoji: '🌆', label: 'Final da tarde' },
      { id: 'night', emoji: '🦉', label: 'À noite' },
    ],
  },
  {
    q: 'O que atrapalha sua noite?',
    sub: 'Escolha até 2 opções',
    multi: true,
    options: [
      { id: 'screens', emoji: '📱', label: 'Telas' },
      { id: 'thoughts', emoji: '💭', label: 'Pensamentos' },
      { id: 'environment', emoji: '🔊', label: 'Ambiente' },
      { id: 'irregular', emoji: '⏰', label: 'Horários irregulares' },
    ],
  },
];

const CHRONOTYPE_RESULT: Record<
  QuizChronotype,
  { emoji: string; name: string; color: string; tip: string; planNote: string }
> = {
  dolphin: {
    emoji: '🐬',
    name: 'Golfinho',
    color: '#4a9eff',
    tip: 'Sono leve, mente ativa à noite. O passo 3 sobre dívida de sono foi feito para você.',
    planNote: 'Seu plano prioriza redução de ansiedade noturna e consistência de horários.',
  },
  lion: {
    emoji: '🦁',
    name: 'Leão',
    color: '#f59e0b',
    tip: 'Alta energia pela manhã, cansaço precoce. O passo 8 sobre luz matinal vai transformar seu rendimento.',
    planNote: 'Seu plano alavanca seu pico matinal e protege o início da noite.',
  },
  bear: {
    emoji: '🐻',
    name: 'Urso',
    color: '#a78bfa',
    tip: 'Segue o ciclo claro-escuro. O passo 2 sobre cronótipos explica exatamente seu ritmo.',
    planNote: 'Seu plano foca em consistência de horários e qualidade do sono profundo.',
  },
  wolf: {
    emoji: '🐺',
    name: 'Lobo',
    color: '#64748b',
    tip: 'Fase circadiana tardia. O passo 5 sobre sono profundo foi pensado para o seu perfil.',
    planNote: 'Seu plano trabalha a transição gradual para horários mais cedo sem forçar.',
  },
};

function calcQuizChronotype(answers: string[][]): QuizChronotype {
  const [a0, a1, a2, a3] = answers;
  const scores: Record<QuizChronotype, number> = { dolphin: 0, lion: 0, bear: 0, wolf: 0 };
  if (a0.includes('mind')) scores.dolphin += 2;
  if (a0.includes('cantfall')) scores.lion += 2;
  if (a0.includes('wakenight')) scores.dolphin += 3;
  if (a0.includes('exhausted')) {
    scores.dolphin += 2;
    scores.bear += 1;
  }
  if (a1.includes('before6')) scores.lion += 3;
  if (a1.includes('6to8')) scores.bear += 3;
  if (a1.includes('8to10')) scores.bear += 1;
  if (a1.includes('after10')) {
    scores.dolphin += 2;
    scores.wolf += 3;
  }
  if (a2.includes('morning')) scores.lion += 3;
  if (a2.includes('midday')) scores.bear += 3;
  if (a2.includes('afternoon')) scores.bear += 2;
  if (a2.includes('night')) scores.wolf += 3;
  if (a3.includes('thoughts')) scores.dolphin += 3;
  if (a3.includes('screens')) scores.lion += 2;
  if (a3.includes('environment')) scores.dolphin += 2;
  if (a3.includes('irregular')) scores.wolf += 3;
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as QuizChronotype;
}

export type ChronotypeWebInlineQuizVariant = 'landing' | 'embedded';

export type ChronotypeWebInlineQuizProps = {
  paddingHorizontal: number;
  quizEmailStack: boolean;
  variant?: ChronotypeWebInlineQuizVariant;
  /** Âncora `#quiz` na landing: abre direto na 1ª pergunta */
  enableHashAutostart?: boolean;
  /** `nativeID` do bloco (vira `id` no DOM no web) */
  nativeId?: string;
  /** Ao persistir o cronótipo (fim das 4 perguntas), para atualizar a UI pai */
  onChronotypePersisted?: (ct: QuizChronotype) => void;
  /** Começar já em "answering" (ex.: botão "Fazer quiz" na lista de lições) */
  initialQuizStep?: 'idle' | 'answering';
  /** `document.getElementById` após o CTA principal no resultado */
  primaryCtaScrollTargetId?: string;
  /** Tag no corpo da edge function (analytics) */
  reportSource?: string;
  /** Após o scroll do CTA principal (ex.: fechar o painel na página do programa) */
  onPrimaryCtaPress?: () => void;
};

export default function ChronotypeWebInlineQuiz({
  paddingHorizontal,
  quizEmailStack,
  variant = 'landing',
  enableHashAutostart = true,
  nativeId = 'quiz',
  onChronotypePersisted,
  initialQuizStep = 'idle',
  primaryCtaScrollTargetId,
  reportSource = 'web_quiz_inline',
  onPrimaryCtaPress,
}: ChronotypeWebInlineQuizProps) {
  const scrollTargetId =
    primaryCtaScrollTargetId ??
    (variant === 'embedded' ? 'program-lessons' : 'checkout-section');

  const [quizStep, setQuizStep] = useState<'idle' | 'answering' | 'result'>(() =>
    initialQuizStep === 'answering' ? 'answering' : 'idle',
  );
  const [quizScreen, setQuizScreen] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[][]>([[], [], [], []]);
  const [quizResult, setQuizResult] = useState<QuizChronotype | null>(null);
  const [quizEmail, setQuizEmail] = useState('');
  const [quizEmailDone, setQuizEmailDone] = useState(false);
  const [quizEmailSending, setQuizEmailSending] = useState(false);

  const currentQuizScreen = QUIZ_SCREENS[quizScreen];
  const currentQuizAnswers = quizAnswers[quizScreen] ?? [];
  const hasQuizAnswer = currentQuizAnswers.length > 0;

  useEffect(() => {
    if (!enableHashAutostart) return;
    if (typeof window === 'undefined') return;
    if (window.location.hash !== '#quiz') return;
    if (quizStep !== 'idle') return;
    setQuizStep('answering');
    requestAnimationFrame(() => {
      const el = document.getElementById(nativeId);
      if (el && typeof el.scrollIntoView === 'function') {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleQuizOption = (id: string) => {
    setQuizAnswers((prev) => {
      const curr = prev[quizScreen];
      const isMulti = QUIZ_SCREENS[quizScreen].multi;
      let next: string[];
      if (curr.includes(id)) {
        next = curr.filter((x) => x !== id);
      } else if (isMulti) {
        next = curr.length >= 2 ? curr : [...curr, id];
      } else {
        next = [id];
      }
      const updated = [...prev];
      updated[quizScreen] = next;
      return updated;
    });
  };

  const goQuizNext = () => {
    if (quizScreen === 3) {
      const result = calcQuizChronotype(quizAnswers);
      setQuizResult(result);
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem('gozzzz_chronotype', result);
        } catch {
          // ignore
        }
      }
      onChronotypePersisted?.(result);
      setQuizStep('result');
    } else {
      setQuizScreen((s) => s + 1);
    }
  };

  const handleQuizEmail = () => {
    const trimmed = quizEmail.trim().toLowerCase();
    if (!trimmed.includes('@') || trimmed.length < 5) return;
    if (!quizResult) return;

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('gozzzz_lead_email', trimmed);
        window.localStorage.setItem('gozzzz_lead_ts', Date.now().toString());
        window.localStorage.setItem('gozzzz_lead_chronotype', quizResult);
      } catch {
        // ignore
      }
    }

    setQuizEmail(trimmed);
    setQuizEmailDone(true);
    setQuizEmailSending(true);

    void (async () => {
      try {
        const { error } = await supabase.functions.invoke('send-chronotype-report', {
          body: {
            email: trimmed,
            chronotype: quizResult,
            language: 'pt',
            source: reportSource,
            quizAnswers: quizAnswers,
          },
        });
        if (error) {
          console.warn('[chronotype-report] dispatch failed:', error.message);
        }
      } catch (err) {
        console.warn('[chronotype-report] dispatch threw:', err);
      } finally {
        setQuizEmailSending(false);
      }
    })();
  };

  const resetQuiz = () => {
    setQuizStep('idle');
    setQuizScreen(0);
    setQuizAnswers([[], [], [], []]);
    setQuizResult(null);
    setQuizEmail('');
    setQuizEmailDone(false);
    setQuizEmailSending(false);
  };

  const scrollToPrimaryCta = () => {
    if (isWeb && typeof document !== 'undefined') {
      document.getElementById(scrollTargetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    onPrimaryCtaPress?.();
  };

  return (
    <View nativeID={nativeId} style={[styles.quizSection, { paddingHorizontal }]}>
      {quizStep === 'idle' && (
        <View style={styles.quizIdleCard}>
          <Text style={styles.quizIdleEmoji}>🧬</Text>
          <Text style={styles.quizIdleTitle}>Descubra seu cronótipo</Text>
          <Text style={styles.quizIdleSub}>
            4 perguntas · 60 segundos · o programa se adapta ao seu perfil biológico
          </Text>
          <TouchableOpacity
            onPress={() => setQuizStep('answering')}
            style={styles.quizIdleBtn}
            activeOpacity={0.88}
          >
            <Text style={styles.quizIdleBtnTxt}>Fazer o teste grátis →</Text>
          </TouchableOpacity>
          <Text style={styles.quizIdleNote}>Gratuito · sem cadastro</Text>
        </View>
      )}

      {quizStep === 'answering' && (
        <View style={styles.quizCard}>
          <View style={styles.quizProgressRow}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={[
                  styles.quizProgressBar,
                  { backgroundColor: i <= quizScreen ? GOLD : 'rgba(255,255,255,0.08)' },
                ]}
              />
            ))}
          </View>

          <Text style={styles.quizQuestion}>{currentQuizScreen.q}</Text>
          <Text style={styles.quizSub}>{currentQuizScreen.sub}</Text>

          <View style={styles.quizOptions}>
            {currentQuizScreen.options.map((opt) => {
              const selected = currentQuizAnswers.includes(opt.id);
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => toggleQuizOption(opt.id)}
                  activeOpacity={0.75}
                  style={[styles.quizOption, selected && styles.quizOptionSelected]}
                >
                  <Text style={styles.quizOptionEmoji}>{opt.emoji}</Text>
                  <Text style={[styles.quizOptionLabel, selected && styles.quizOptionLabelSelected]}>
                    {opt.label}
                  </Text>
                  {selected && (
                    <View style={styles.quizOptionCheck}>
                      <Text style={styles.quizOptionCheckTxt}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity
            onPress={goQuizNext}
            disabled={!hasQuizAnswer}
            activeOpacity={0.88}
            style={[styles.quizPrimaryBtn, !hasQuizAnswer && styles.quizPrimaryBtnDisabled]}
          >
            <Text style={styles.quizPrimaryBtnTxt}>
              {quizScreen === 3 ? 'Ver meu resultado →' : 'Continuar →'}
            </Text>
          </TouchableOpacity>

          {quizScreen > 0 && (
            <TouchableOpacity onPress={() => setQuizScreen((s) => s - 1)} style={styles.quizBackBtn}>
              <Text style={styles.quizBackTxt}>← Voltar</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {quizStep === 'result' && quizResult && (() => {
        const ct = CHRONOTYPE_RESULT[quizResult];
        return (
          <View style={[styles.quizResultCard, { borderColor: ct.color + '44' }]}>
            <Text style={styles.quizResultEmoji}>{ct.emoji}</Text>
            <Text style={[styles.quizResultName, { color: ct.color }]}>Você é um {ct.name}</Text>
            <Text style={styles.quizResultTip}>{ct.tip}</Text>

            <View style={styles.quizPlanNoteCard}>
              <Text style={styles.quizPlanNoteKicker}>SEU PLANO {ct.name.toUpperCase()}</Text>
              <Text style={styles.quizPlanNoteText}>{ct.planNote}</Text>
            </View>

            {!quizEmailDone ? (
              <View style={styles.quizEmailWrap}>
                <Text style={styles.quizEmailLabel}>📩 Receba seu plano personalizado por e-mail</Text>
                <View style={[styles.quizEmailRow, quizEmailStack && styles.quizEmailRowStack]}>
                  <TextInput
                    value={quizEmail}
                    onChangeText={setQuizEmail}
                    placeholder="seu@email.com"
                    placeholderTextColor="rgba(148,163,184,0.5)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onSubmitEditing={handleQuizEmail}
                    style={[styles.quizEmailInput, quizEmailStack && styles.quizEmailInputStack]}
                  />
                  <TouchableOpacity
                    onPress={handleQuizEmail}
                    style={[styles.quizEmailBtn, quizEmailStack && styles.quizEmailBtnStack]}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.quizEmailBtnTxt}>Enviar</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.quizEmailDisclaimer}>Sem spam. Só seu plano e dicas do programa.</Text>
              </View>
            ) : (
              <View style={styles.quizEmailDoneCard}>
                <Text style={styles.quizEmailDoneTxt}>
                  {quizEmailSending
                    ? `Enviando seu relatório para ${quizEmail}…`
                    : `✓ Pronto. Seu relatório do cronótipo está a caminho — confira ${quizEmail} (e a pasta de spam, por garantia).`}
                </Text>
              </View>
            )}

            <TouchableOpacity onPress={scrollToPrimaryCta} activeOpacity={0.88} style={styles.quizCtaCheckout}>
              <Crown size={18} color="#ffffff" />
              <Text style={styles.quizCtaCheckoutTxt}>
                {variant === 'embedded'
                  ? `Ver lições com minha trilha (${ct.name}) →`
                  : `Acessar o programa do ${ct.name} — R$ 147`}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetQuiz} style={styles.quizResetBtn}>
              <Text style={styles.quizResetTxt}>Refazer o teste</Text>
            </TouchableOpacity>
          </View>
        );
      })()}
    </View>
  );
}

const styles = StyleSheet.create({
  quizSection: {
    marginTop: 24,
    marginBottom: 8,
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
  },
  quizIdleCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.25)',
    padding: 28,
    alignItems: 'center',
  },
  quizIdleEmoji: { fontSize: 28, marginBottom: 12 },
  quizIdleTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_MAIN,
    textAlign: 'center',
    marginBottom: 8,
  },
  quizIdleSub: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 400,
  },
  quizIdleBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quizIdleBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  quizIdleNote: { color: '#4a5568', fontSize: 12, marginTop: 12 },

  quizCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.18)',
    padding: 24,
  },
  quizProgressRow: { flexDirection: 'row', gap: 6, marginBottom: 24 },
  quizProgressBar: { flex: 1, height: 4, borderRadius: 2 },
  quizQuestion: {
    fontSize: 20,
    fontWeight: '800',
    color: TEXT_MAIN,
    marginBottom: 6,
    lineHeight: 28,
  },
  quizSub: { fontSize: 13, color: TEXT_MUTED, marginBottom: 20 },
  quizOptions: { gap: 10, marginBottom: 24 },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  quizOptionSelected: {
    borderColor: GOLD,
    backgroundColor: 'rgba(124,92,232,0.10)',
  },
  quizOptionEmoji: { fontSize: 22 },
  quizOptionLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: TEXT_MUTED },
  quizOptionLabelSelected: { color: TEXT_MAIN, fontWeight: '700' },
  quizOptionCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizOptionCheckTxt: { color: '#ffffff', fontSize: 12, fontWeight: '800' },
  quizPrimaryBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  quizPrimaryBtnDisabled: { backgroundColor: 'rgba(124,92,232,0.3)' },
  quizPrimaryBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15 },
  quizBackBtn: { alignItems: 'center', marginTop: 12, paddingVertical: 8 },
  quizBackTxt: { color: '#64748b', fontSize: 13 },

  quizResultCard: {
    backgroundColor: BG_CARD,
    borderRadius: 20,
    borderWidth: 1,
    padding: 28,
    alignItems: 'center',
  },
  quizResultEmoji: { fontSize: 56, marginBottom: 8 },
  quizResultName: {
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 6,
  },
  quizResultTip: {
    fontSize: 14,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    maxWidth: 440,
  },
  quizPlanNoteCard: {
    backgroundColor: 'rgba(124,92,232,0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.2)',
    padding: 14,
    width: '100%',
    marginBottom: 20,
  },
  quizPlanNoteKicker: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  quizPlanNoteText: { color: '#cbd5e1', fontSize: 13, lineHeight: 20 },

  quizEmailWrap: { width: '100%', marginBottom: 20 },
  quizEmailLabel: {
    color: TEXT_MAIN,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  quizEmailRow: { flexDirection: 'row', gap: 8, alignItems: 'stretch' },
  quizEmailRowStack: { flexDirection: 'column' },
  quizEmailInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  quizEmailInputStack: { width: '100%', minHeight: 48 },
  quizEmailBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  quizEmailBtnStack: { width: '100%', paddingVertical: 14, alignItems: 'center' },
  quizEmailBtnTxt: { color: '#ffffff', fontWeight: '800', fontSize: 13 },
  quizEmailDisclaimer: {
    color: '#4a5568',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 6,
  },
  quizEmailDoneCard: {
    backgroundColor: 'rgba(16,185,129,0.10)',
    borderRadius: 10,
    padding: 12,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  quizEmailDoneTxt: { color: '#10b981', fontSize: 13, fontWeight: '600' },

  quizCtaCheckout: {
    backgroundColor: GOLD,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    width: '100%',
    maxWidth: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  quizCtaCheckoutTxt: { color: '#ffffff', fontWeight: '800', fontSize: 15, textAlign: 'center', flexShrink: 1 },
  quizResetBtn: { marginTop: 12, paddingVertical: 8 },
  quizResetTxt: { color: '#64748b', fontSize: 12 },
});
