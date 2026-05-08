import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
  Platform,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { syncQuizCompletionFromServer } from '@/lib/syncQuizCompletion';
import { savePreRegistrationQuizDone } from '@/lib/quizDevicePersistence';
import { ShareableCard } from './ShareableCard';
import * as SecureStore from 'expo-secure-store';
import ProgressBar from '@/src/components/ProgressBar';

type Chronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

const SCREENS = [
  {
    q_pt: 'O que rouba seu sono?',
    q_en: 'What steals your sleep?',
    sub_pt: 'Escolha o que mais te afeta',
    sub_en: 'Pick the one that affects you most',
    multi: false,
    options: [
      { id: 'mind', emoji: '🌀', label_pt: 'Mente não para', label_en: "Mind won't stop" },
      { id: 'cantfall', emoji: '🌙', label_pt: 'Não consigo dormir', label_en: "Can't fall asleep" },
      { id: 'wakenight', emoji: '⚡', label_pt: 'Acordo à noite', label_en: 'Wake up at night' },
      { id: 'exhausted', emoji: '😮‍💨', label_pt: 'Acordo exausto', label_en: 'Wake up exhausted' },
    ],
  },
  {
    q_pt: 'Sem alarme, que horas você acordaria?',
    q_en: 'Without an alarm, when would you wake up?',
    sub_pt: 'Seu ritmo natural de despertar',
    sub_en: 'Your natural wake rhythm',
    multi: false,
    options: [
      { id: 'before6', emoji: '🌅', label_pt: 'Antes das 6h', label_en: 'Before 6am' },
      { id: '6to8', emoji: '☀️', label_pt: '6h – 8h', label_en: '6am – 8am' },
      { id: '8to10', emoji: '🌤️', label_pt: '8h – 10h', label_en: '8am – 10am' },
      { id: 'after10', emoji: '🌑', label_pt: 'Depois das 10h', label_en: 'After 10am' },
    ],
  },
  {
    q_pt: 'Quando você tem mais energia?',
    q_en: 'When do you have the most energy?',
    sub_pt: 'Seu pico natural de rendimento',
    sub_en: 'Your natural performance peak',
    multi: false,
    options: [
      { id: 'morning', emoji: '🏃', label_pt: 'Cedo pela manhã', label_en: 'Early morning' },
      { id: 'midday', emoji: '📈', label_pt: 'Ao meio-dia', label_en: 'Midday' },
      { id: 'afternoon', emoji: '🌆', label_pt: 'Final da tarde', label_en: 'Late afternoon' },
      { id: 'night', emoji: '🦉', label_pt: 'À noite', label_en: 'At night' },
    ],
  },
  {
    q_pt: 'O que atrapalha sua noite?',
    q_en: 'What disrupts your night?',
    sub_pt: 'Escolha até 2 opções',
    sub_en: 'Choose up to 2 options',
    multi: true,
    options: [
      { id: 'screens', emoji: '📱', label_pt: 'Telas', label_en: 'Screens' },
      { id: 'thoughts', emoji: '💭', label_pt: 'Pensamentos', label_en: 'Thoughts' },
      { id: 'environment', emoji: '🔊', label_pt: 'Ambiente', label_en: 'Environment' },
      { id: 'irregular', emoji: '⏰', label_pt: 'Horários irregulares', label_en: 'Irregular schedules' },
    ],
  },
];

const CHRONOTYPE_DATA: Record<Chronotype, { emoji: string; name_pt: string; name_en: string; color: string }> = {
  dolphin: { emoji: '🐬', name_pt: 'Golfinho', name_en: 'Dolphin', color: '#4a9eff' },
  lion: { emoji: '🦁', name_pt: 'Leão', name_en: 'Lion', color: '#f59e0b' },
  bear: { emoji: '🐻', name_pt: 'Urso', name_en: 'Bear', color: '#a78bfa' },
  wolf: { emoji: '🐺', name_pt: 'Lobo', name_en: 'Wolf', color: '#64748b' },
};

const SCIENCE_NOTES: Record<Chronotype, { pt: string; en: string }> = {
  dolphin: {
    pt: 'Baseado na cronobiologia: perfis Golfinho tendem a ter sono mais leve e maior reatividade ao estresse, com melhor rendimento cognitivo no meio da tarde.',
    en: 'Chronobiology-based: Dolphin profiles tend to have lighter sleep and higher stress reactivity, with better cognitive performance in mid-afternoon.',
  },
  lion: {
    pt: 'Baseado na cronobiologia: perfis Leao costumam ter maior alerta nas primeiras horas do dia e queda natural de energia no fim da noite.',
    en: 'Chronobiology-based: Lion profiles usually show stronger alertness in early morning and a natural drop in energy at night.',
  },
  bear: {
    pt: 'Baseado na cronobiologia: perfis Urso seguem mais de perto o ciclo claro-escuro, com melhor estabilidade quando mantem horarios regulares.',
    en: 'Chronobiology-based: Bear profiles align more closely with the light-dark cycle and improve with regular schedules.',
  },
  wolf: {
    pt: 'Baseado na cronobiologia: perfis Lobo tendem a apresentar fase circadiana mais tardia, com maior desempenho no fim do dia.',
    en: 'Chronobiology-based: Wolf profiles tend to show a later circadian phase and better performance later in the day.',
  },
};

function calcChronotype(answers: string[][]): Chronotype {
  const [a0, a1, a2, a3] = answers;
  const scores: Record<Chronotype, number> = { dolphin: 0, lion: 0, bear: 0, wolf: 0 };
  if (a0.includes('mind')) scores.dolphin += 2;
  if (a0.includes('cantfall')) scores.lion += 2;
  if (a0.includes('wakenight')) scores.dolphin += 3;
  if (a0.includes('exhausted')) { scores.dolphin += 2; scores.bear += 1; }
  if (a1.includes('before6')) scores.lion += 3;
  if (a1.includes('6to8')) scores.bear += 3;
  if (a1.includes('8to10')) scores.bear += 1;
  if (a1.includes('after10')) { scores.dolphin += 2; scores.wolf += 3; }
  if (a2.includes('morning')) scores.lion += 3;
  if (a2.includes('midday')) scores.bear += 3;
  if (a2.includes('afternoon')) scores.bear += 2;
  if (a2.includes('night')) scores.wolf += 3;
  if (a3.includes('thoughts')) scores.dolphin += 3;
  if (a3.includes('screens')) scores.lion += 2;
  if (a3.includes('environment')) scores.dolphin += 2;
  if (a3.includes('irregular')) scores.wolf += 3;
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Chronotype;
}

interface Props {
  visible: boolean;
  onComplete: (chronotype: string) => void;
  /** Use on a Stack screen (/quiz): no RN Modal wrapper (avoids double sheet / web glitches). */
  presentation?: 'modal' | 'fullscreen';
  /** When false, parent (e.g. QuizScreen) renders the progress bar. Default true. */
  showProgressBar?: boolean;
  /** Fires with 0–3 while answering questions (fullscreen sync with external bar). */
  onQuestionIndexChange?: (questionIndex: number) => void;
}

async function persistLatestChronotype(chronotype: Chronotype, userId?: string) {
  const latestKey = 'quiz_latest_chronotype';
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(latestKey, chronotype);
      if (userId) {
        localStorage.setItem(`quiz_chronotype_${userId}`, chronotype);
      }
      return;
    }
    await SecureStore.setItemAsync(latestKey, chronotype);
    if (userId) {
      await SecureStore.setItemAsync(`quiz_chronotype_${userId}`, chronotype);
    }
  } catch (err) {
    console.error('[QUIZ:LOCAL_CHRONOTYPE_SAVE_ERROR]', err);
  }
}

async function persistQuizResultRemotely(params: {
  userId: string;
  chronotype: Chronotype;
  language: 'pt' | 'en';
}) {
  const { userId, chronotype, language } = params;
  try {
    const { error: authErr } = await supabase.auth.updateUser({
      data: {
        quiz_completed: true,
        chronotype,
        language,
      },
    });
    if (authErr) {
      console.warn('[QUIZ:AUTH_META:ERROR]', authErr.message ?? authErr);
    }

    const sb = supabase as any;
    const rowPayload = {
      chronotype,
      language,
      quiz_completed: true,
      quiz_progress: null,
      quiz_completed_at: new Date().toISOString(),
    };

    const { data: updatedRows, error: updateErr } = await sb
      .from('profiles')
      .update(rowPayload)
      .eq('id', userId)
      .select('id');

    const updated =
      Array.isArray(updatedRows) && updatedRows.length > 0;

    if (updateErr) {
      if ((updateErr as any)?.code === '42501') {
        console.warn('[QUIZ:PROFILE_UPDATE:RLS_BLOCKED]', (updateErr as any)?.message ?? 'blocked');
      } else {
        console.warn('[QUIZ:PROFILE_UPDATE:ERROR]', updateErr);
      }
    }

    if (!updated || updateErr) {
      const { data: authUserResp } = await supabase.auth.getUser();
      const email = authUserResp?.user?.email ?? '';

      const { error: upsertErr } = await sb
        .from('profiles')
        .upsert(
          {
            id: userId,
            email,
            subscription_type: 'free',
            ...rowPayload,
          },
          { onConflict: 'id' }
        );
      if (upsertErr && (upsertErr as any)?.code !== '42501') {
        console.warn('[QUIZ:PROFILE_UPSERT:ERROR]', upsertErr);
      }
    }

    const { data: freshAuth } = await supabase.auth.getUser();
    await syncQuizCompletionFromServer(freshAuth?.user ?? null);
  } catch (err) {
    // Never block UX on transient network/server failures.
    console.warn('[QUIZ:PERSIST_REMOTE:EXCEPTION]', err);
  }
}

export default function ChronotypeQuizModal({
  visible,
  onComplete,
  presentation = 'modal',
  showProgressBar = true,
  onQuestionIndexChange,
}: Props) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isNarrow = width < 380;
  const lang = language as 'pt' | 'en';
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([[], [], [], []]);
  const [result, setResult] = useState<Chronotype | null>(null);
  const [saving, setSaving] = useState(false);
  // Captura de e-mail opcional no card de resultado (web). Best-effort:
  // se o usuário deixar passar, o quiz segue normal — mas se digitar, gravamos
  // o lead no localStorage para integrar com nutrição posterior.
  const [emailInput, setEmailInput] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const scienceGlow = useRef(new Animated.Value(0)).current;

  const handleEmailSubmit = useCallback(() => {
    const trimmed = emailInput.trim();
    if (!trimmed.includes('@') || trimmed.length < 5) return;
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('gozzzz_lead_email', trimmed);
        window.localStorage.setItem('gozzzz_lead_ts', Date.now().toString());
        if (result) {
          window.localStorage.setItem('gozzzz_lead_chronotype', result);
        }
      } catch {
        // localStorage indisponível (modo privativo) — não quebrar UX
      }
    }
    setEmailSubmitted(true);
  }, [emailInput, result]);

  const currentScreen = SCREENS[Math.min(screen, 3)];
  const currentAnswers = answers[screen] ?? [];
  const hasAnswer = currentAnswers.length > 0;
  const isResultScreen = screen === 4 && result !== null;

  const toggleOption = useCallback((id: string) => {
    setAnswers(prev => {
      const curr = prev[screen];
      const isMulti = SCREENS[screen].multi;
      let next: string[];
      if (curr.includes(id)) {
        next = curr.filter(x => x !== id);
      } else if (isMulti) {
        next = curr.length >= 2 ? curr : [...curr, id];
      } else {
        next = [id];
      }
      const updated = [...prev];
      updated[screen] = next;
      return updated;
    });
  }, [screen]);

  const goNext = useCallback(async () => {
    if (screen === 3) {
      const chronotype = calcChronotype(answers);
      if (presentation === 'fullscreen') {
        try {
          await persistLatestChronotype(chronotype, user?.id);
          if (!user) {
            await savePreRegistrationQuizDone();
          }
          if (user) {
            await persistQuizResultRemotely({
              userId: user.id,
              chronotype,
              language: lang,
            });
          }
        } catch {
          // still leave quiz — navigation must not block on persistence errors
        }
        setScreen(0);
        setAnswers([[], [], [], []]);
        setResult(null);
        onComplete(chronotype);
        return;
      }
      setResult(chronotype);
      setScreen(4);
    } else {
      setScreen((s) => s + 1);
    }
  }, [screen, answers, presentation, user, lang, onComplete]);

  const goBack = useCallback(() => {
    setScreen((s) => Math.max(0, s - 1));
  }, []);

  const handleFinish = useCallback(async () => {
    if (!result) return;
    setSaving(true);

    const finalizedChronotype = result;
    setScreen(0);
    setAnswers([[], [], [], []]);
    setResult(null);
    setSaving(false);

    // Persist before navigation so post-signup home sees quiz + chronotype.
    await persistLatestChronotype(finalizedChronotype, user?.id);

    // Chave dedicada que /web/sono-plus lê para mostrar o banner de
    // personalização (independente da chave interna `quiz_latest_chronotype`,
    // que é consumida pelo app autenticado).
    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('gozzzz_chronotype', finalizedChronotype);
      } catch {
        // ignore — banner de personalização é best-effort
      }
    }

    if (!user) {
      await savePreRegistrationQuizDone();
    }

    // Navigate immediately for responsive UX.
    onComplete(finalizedChronotype);

    if (user) {
      void persistQuizResultRemotely({
        userId: user.id,
        chronotype: finalizedChronotype,
        language: lang,
      });
    }
  }, [result, user, lang, onComplete]);

  const chronoInfo = result ? CHRONOTYPE_DATA[result] : null;
  const scienceNote = result ? SCIENCE_NOTES[result] : null;

  useEffect(() => {
    if (!onQuestionIndexChange) return;
    if (screen >= 0 && screen <= 3) {
      onQuestionIndexChange(screen);
    }
  }, [screen, onQuestionIndexChange]);

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scienceGlow, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scienceGlow, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    glowLoop.start();
    return () => glowLoop.stop();
  }, [scienceGlow]);

  const gradientColors =
    presentation === 'fullscreen' ? (['#0c0e1a', '#0f1428'] as const) : (['#07070f', '#0f1a2e'] as const);

  const body = (
    <LinearGradient colors={gradientColors} style={styles.container}>
        {!isResultScreen ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top + 8, 56),
                paddingBottom: Math.max(insets.bottom + 16, 32),
              }
            ]}
            scrollEnabled={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {showProgressBar !== false && (
              <View style={styles.progressHeader}>
                <ProgressBar current={screen + 1} total={4} />
              </View>
            )}

            <Text style={styles.question}>
              {lang === 'pt' ? currentScreen.q_pt : currentScreen.q_en}
            </Text>
            <Text style={styles.subQuestion}>
              {lang === 'pt' ? currentScreen.sub_pt : currentScreen.sub_en}
            </Text>

            <View style={styles.optionsContainer}>
              {currentScreen.options.map((opt, index) => {
                const selected = currentAnswers.includes(opt.id);
                const colorMap: Record<number, string> = {
                  0: '#EF9F27',
                  1: '#1D9E75',
                  2: '#7F77DD',
                  3: '#378ADD',
                };
                const indicatorColor = colorMap[index] || '#6366f1';
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => toggleOption(opt.id)}
                    activeOpacity={0.75}
                  >
                    <View style={[styles.colorIndicator, { backgroundColor: indicatorColor }]} />
                    <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                    <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                      {lang === 'pt' ? opt.label_pt : opt.label_en}
                    </Text>
                    {selected && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !hasAnswer && styles.nextButtonDisabled]}
              onPress={goNext}
              disabled={!hasAnswer}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {screen === 3
                  ? (lang === 'pt' ? 'Ver meu resultado' : 'See my result')
                  : (lang === 'pt' ? 'Continuar' : 'Continue')}
              </Text>
            </TouchableOpacity>
            {screen > 0 && (
              <TouchableOpacity style={styles.secondaryButton} onPress={goBack} activeOpacity={0.8}>
                <Text style={styles.secondaryButtonText}>
                  {lang === 'pt' ? 'Voltar' : 'Back'}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top + 8, 56),
                paddingBottom: Math.max(insets.bottom + 16, 32),
              }
            ]}
            scrollEnabled={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultContainer}>
              <Text style={[styles.resultEmoji, isNarrow && styles.resultEmojiNarrow]}>{chronoInfo?.emoji}</Text>
              <Text style={[styles.resultName, isNarrow && styles.resultNameNarrow, { color: chronoInfo?.color }]}>
                {lang === 'pt'
                  ? `Seu cronotipo é ${chronoInfo?.name_pt ?? ''}`
                  : `Your chronotype is ${chronoInfo?.name_en ?? ''}`}
              </Text>
            </View>

            <Text style={[styles.resultDescription, isNarrow && styles.resultDescriptionNarrow]}>
              {lang === 'pt'
                ? 'Seu cronotipo foi identificado! O programa será personalizado para o seu ritmo biológico natural.'
                : 'Your chronotype has been identified! The program will be personalized to your natural biological rhythm.'}
            </Text>
            <Animated.View
              style={[
                styles.scienceCard,
                {
                  borderColor: scienceGlow.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(212,169,106,0.24)', 'rgba(212,169,106,0.42)'],
                  }),
                  transform: [
                    {
                      scale: scienceGlow.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.01],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.scienceHeader}>
                <Text style={styles.scienceIcon}>✦</Text>
                <Text style={styles.scienceLabel}>
                  {lang === 'pt' ? 'Nota cientifica' : 'Scientific note'}
                </Text>
              </View>
              <Text style={styles.scienceText}>
                {lang === 'pt' ? scienceNote?.pt ?? '' : scienceNote?.en ?? ''}
              </Text>
            </Animated.View>

            {Platform.OS === 'web' && (
              <View style={styles.emailGate}>
                <Text style={styles.emailGateLabel}>
                  {lang === 'pt'
                    ? 'Receba seu plano personalizado por e-mail'
                    : 'Get your personalized plan by email'}
                </Text>
                <View style={styles.emailGateRow}>
                  <TextInput
                    value={emailInput}
                    onChangeText={setEmailInput}
                    placeholder={lang === 'pt' ? 'seu@email.com' : 'your@email.com'}
                    placeholderTextColor="rgba(148,163,184,0.5)"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!emailSubmitted}
                    style={styles.emailGateInput}
                    onSubmitEditing={handleEmailSubmit}
                  />
                  <TouchableOpacity
                    onPress={handleEmailSubmit}
                    activeOpacity={0.85}
                    disabled={emailSubmitted}
                    style={[
                      styles.emailGateBtn,
                      emailSubmitted && styles.emailGateBtnDone,
                    ]}
                  >
                    <Text style={styles.emailGateBtnText}>
                      {emailSubmitted ? '✓' : lang === 'pt' ? 'Enviar' : 'Send'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {emailSubmitted && (
                  <Text style={styles.emailGateConfirm}>
                    {lang === 'pt'
                      ? 'Recebemos seu e-mail. Continue para o próximo passo.'
                      : "Got it. Continue to the next step."}
                  </Text>
                )}
              </View>
            )}

            <ShareableCard
              chronotypeName=""
              chronotypeEmoji=""
              title={lang === 'pt' ? 'Compartilhar resultado' : 'Share result'}
              message={lang === 'pt' ? 'Compartilhe seu cronotipo com elegancia' : 'Share your chronotype elegantly'}
              statPercent={Math.floor(Math.random() * 25) + 5}
            />

            <TouchableOpacity
              style={[styles.nextButton, saving && styles.nextButtonDisabled]}
              onPress={handleFinish}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {saving
                  ? (lang === 'pt' ? 'Salvando...' : 'Saving...')
                  : (lang === 'pt' ? 'Começar meu plano →' : 'Start my plan →')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen(3)} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>
                {lang === 'pt' ? 'Revisar respostas' : 'Review answers'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
    </LinearGradient>
  );

  if (presentation === 'fullscreen') {
    if (!visible) return null;
    return body;
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      {body}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 56,
    paddingBottom: 34,
    flexGrow: 1,
  },
  progressHeader: {
    marginBottom: 24,
    width: '100%',
  },
  question: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e8d5b7',
    lineHeight: 36,
    marginBottom: 10,
    paddingTop: 10,
    minHeight: 72,
    flexShrink: 1,
    letterSpacing: -0.2,
  },
  subQuestion: {
    fontSize: 15,
    color: '#8892a4',
    marginBottom: 26,
    lineHeight: 23,
    letterSpacing: 0.15,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    minHeight: Platform.OS === 'web' ? 48 : 56,
    width: '100%',
  },
  optionSelected: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.12)',
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    minWidth: 12,
    minHeight: 12,
  },
  optionEmoji: {
    fontSize: 24,
    minWidth: 32,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#8892a4',
    lineHeight: 22,
  },
  optionLabelSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 0,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    width: '100%',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.6,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 0,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    minHeight: 54,
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9d2e3',
    letterSpacing: 0.55,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 18,
    width: '100%',
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultEmojiNarrow: {
    fontSize: 64,
    marginBottom: 14,
  },
  resultLabel: {
    fontSize: 14,
    color: '#8892a4',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  resultName: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  resultNameNarrow: {
    fontSize: 30,
    lineHeight: 36,
  },
  resultDescription: {
    fontSize: 15,
    color: '#8892a4',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
    width: '100%',
  },
  resultDescriptionNarrow: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
    paddingHorizontal: 6,
  },
  scienceCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.32)',
    backgroundColor: 'rgba(212,169,106,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 14,
  },
  scienceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  scienceIcon: {
    color: '#e8d5b7',
    fontSize: 12,
    lineHeight: 14,
  },
  scienceLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: '#e8d5b7',
    marginBottom: 2,
  },
  scienceText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#d5deed',
    letterSpacing: 0.1,
  },
  emailGate: {
    width: '100%',
    backgroundColor: 'rgba(99,102,241,0.10)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.3)',
    padding: 16,
    marginBottom: 14,
  },
  emailGateLabel: {
    color: '#c4b5fd',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
  },
  emailGateRow: {
    flexDirection: 'row',
    gap: 8,
  },
  emailGateInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  emailGateBtn: {
    backgroundColor: '#6366f1',
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    minWidth: 64,
    alignItems: 'center',
  },
  emailGateBtnDone: {
    backgroundColor: '#22c55e',
  },
  emailGateBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  emailGateConfirm: {
    color: 'rgba(196,181,253,0.85)',
    fontSize: 12,
    marginTop: 8,
  },
});
