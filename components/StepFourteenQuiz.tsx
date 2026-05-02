import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storage } from '@/lib/storage';

const BG = '#07080f';
const PURPLE = '#7c6fff';
const BLUE = '#4a8fff';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const STORAGE_KEY = 'gozzzz_step14_quiz';
const TOTAL = 4;

const Q1_OPTIONS = ['Sim, claramente', 'Um pouco', 'Ainda não'] as const;
const Q2_OPTIONS = [
  'Horário fixo de dormir',
  'Rotina noturna',
  'Controle de luz',
  'Respiração e relaxamento',
] as const;
const Q3_OPTIONS = [
  'Largar o celular',
  'Acordar no horário',
  'Manter a rotina no fim de semana',
  'Nenhum problema',
] as const;

export type StepFourteenQuizPayload = {
  q1: string;
  q2: string;
  q3: string;
  rating: number;
  savedAt: string;
};

export type StepFourteenQuizProps = {
  nextLessonId?: string;
  onSubmitted?: (payload: StepFourteenQuizPayload) => void;
};

function hexPair(n: number): string {
  const x = Math.max(0, Math.min(255, n));
  return x.toString(16).padStart(2, '0');
}

function lerpChannel(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function gradientStripColors(from: string, to: string, steps: number): string[] {
  const parse = (h: string) => {
    const s = h.replace('#', '');
    return [parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16)];
  };
  const [r0, g0, b0] = parse(from);
  const [r1, g1, b1] = parse(to);
  const out: string[] = [];
  for (let i = 0; i < steps; i++) {
    const t = steps <= 1 ? 0 : i / (steps - 1);
    out.push(
      `#${hexPair(lerpChannel(r0, r1, t))}${hexPair(lerpChannel(g0, g1, t))}${hexPair(lerpChannel(b0, b1, t))}`,
    );
  }
  return out;
}

function GradientButtonLabel({
  label,
  disabled,
  onPress,
  stripColors,
}: {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  stripColors: string[];
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.ctaOuter,
        disabled && styles.ctaDisabled,
        pressed && !disabled && styles.ctaPressed,
      ]}
    >
      <View style={styles.gradientTrack}>
        {stripColors.map((c, i) => (
          <View key={i} style={[styles.gradientSlice, { backgroundColor: c }]} />
        ))}
      </View>
      <Text style={styles.ctaLabel}>{label}</Text>
    </Pressable>
  );
}

export function StepFourteenQuiz({ nextLessonId = '15', onSubmitted }: StepFourteenQuizProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const stripColors = useMemo(() => gradientStripColors(PURPLE, BLUE, 14), []);

  const [index, setIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [phase, setPhase] = useState<'quiz' | 'thanks'>('quiz');
  const [submitting, setSubmitting] = useState(false);
  const thanksTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitLock = useRef(false);

  useEffect(() => {
    return () => {
      if (thanksTimer.current) clearTimeout(thanksTimer.current);
    };
  }, []);

  const canAdvance = useMemo(() => {
    if (index === 0) return q1 !== null;
    if (index === 1) return q2 !== null;
    if (index === 2) return q3 !== null;
    return rating >= 1;
  }, [index, q1, q2, q3, rating]);

  const goNext = useCallback(() => {
    if (!canAdvance) return;
    if (index < TOTAL - 1) {
      setIndex((i) => i + 1);
      return;
    }
    // última pergunta: enviar
    if (submitLock.current) return;
    if (q1 === null || q2 === null || q3 === null || rating < 1) return;
    submitLock.current = true;
    setSubmitting(true);
    const payload: StepFourteenQuizPayload = {
      q1,
      q2,
      q3,
      rating,
      savedAt: new Date().toISOString(),
    };
    void (async () => {
      try {
        await storage.setItem(STORAGE_KEY, JSON.stringify(payload));
        onSubmitted?.(payload);
        setPhase('thanks');
        thanksTimer.current = setTimeout(() => {
          router.replace(`/(tabs)/lesson/${nextLessonId}`);
        }, 1800);
      } catch {
        Alert.alert('Não foi possível guardar', 'Tenta de novo daqui a instantes.');
        submitLock.current = false;
        setSubmitting(false);
      }
    })();
  }, [canAdvance, index, q1, q2, q3, rating, nextLessonId, onSubmitted, router]);

  const progressLabel = `${index + 1} de ${TOTAL}`;
  const isLast = index === TOTAL - 1;
  const buttonLabel = isLast ? (submitting ? '…' : 'Enviar') : 'Próximo';

  if (phase === 'thanks') {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
        <View style={[styles.thanksCard, { marginHorizontal: 24 }]}>
          <Text style={styles.thanksTitle}>Obrigado</Text>
          <Text style={styles.thanksBody}>
            As suas respostas ajudam-nos a perceber o que está a funcionar na sua jornada.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.progress}>{progressLabel}</Text>

        {index === 0 && (
          <View style={styles.card}>
            <Text style={styles.question}>Você está dormindo melhor?</Text>
            {Q1_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ1(opt)}
                style={[styles.optionRow, q1 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q1 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {index === 1 && (
          <View style={styles.card}>
            <Text style={styles.question}>Qual dica foi mais útil até aqui?</Text>
            {Q2_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ2(opt)}
                style={[styles.optionRow, q2 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q2 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {index === 2 && (
          <View style={styles.card}>
            <Text style={styles.question}>Algo difícil de aplicar?</Text>
            {Q3_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ3(opt)}
                style={[styles.optionRow, q3 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q3 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {index === 3 && (
          <View style={styles.card}>
            <Text style={styles.question}>Sua nota geral até aqui</Text>
            <View style={styles.starsRow}>
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= rating;
                return (
                  <Pressable
                    key={star}
                    onPress={() => setRating(star)}
                    style={({ pressed }) => [styles.starHit, pressed && styles.starPressed]}
                    accessibilityRole="button"
                    accessibilityLabel={`${star} estrelas`}
                  >
                    <Text style={[styles.starGlyph, active ? styles.starOn : styles.starOff]}>★</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        <GradientButtonLabel
          label={buttonLabel}
          disabled={!canAdvance || submitting}
          onPress={goNext}
          stripColors={stripColors}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  progress: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  card: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  question: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 26,
    marginBottom: 16,
    letterSpacing: -0.2,
  },
  optionRow: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  optionRowActive: {
    borderColor: 'rgba(124, 111, 255, 0.45)',
    backgroundColor: 'rgba(124, 111, 255, 0.08)',
  },
  optionText: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 16,
    lineHeight: 22,
  },
  optionTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  starHit: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth: 44,
    alignItems: 'center',
  },
  starPressed: {
    opacity: 0.75,
  },
  starGlyph: {
    fontSize: 36,
    lineHeight: 40,
  },
  starOn: {
    color: '#c8bfff',
  },
  starOff: {
    color: 'rgba(255,255,255,0.22)',
  },
  ctaOuter: {
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  ctaDisabled: {
    opacity: 0.45,
  },
  ctaPressed: {
    opacity: 0.92,
  },
  gradientTrack: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  gradientSlice: {
    flex: 1,
  },
  ctaLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  thanksCard: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 16,
    padding: 24,
    backgroundColor: 'rgba(255,255,255,0.02)',
    alignSelf: 'stretch',
  },
  thanksTitle: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  thanksBody: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 16,
    lineHeight: 24,
  },
});
