import { useState, useMemo, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storage } from '@/lib/storage';

const BG = '#07080f';
const PURPLE = '#7c6fff';
const BLUE = '#4a8fff';
const CARD_BORDER = 'rgba(255,255,255,0.07)';
const STORAGE_KEY = 'gozzzz_step21_conclusion';
const TOTAL = 5;

const Q1_OPTIONS = ['Sim, muito melhor', 'Melhorei um pouco', 'Ainda estou no processo'] as const;
const Q2_OPTIONS = [
  'As dicas diárias',
  'Entender meu cronotipo',
  'A consistência da rotina',
  'Tudo junto',
] as const;
const Q3_OPTIONS = [
  'Mais conteúdo em vídeo',
  'Lembretes mais frequentes',
  'Mais personalização',
  'Nada, gostei assim',
] as const;
const Q4_OPTIONS = ['Com certeza', 'Provavelmente sim', 'Talvez', 'Não recomendaria'] as const;

export type StepTwentyOneConclusionPayload = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  testimonial: string;
  savedAt: string;
};

export type StepTwentyOneConclusionProps = {
  /** Rota após "Ver meu progresso" */
  progressHref?: Href;
  onSubmitted?: (payload: StepTwentyOneConclusionPayload) => void;
  onViewProgress?: () => void;
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

export function StepTwentyOneConclusion({
  progressHref = '/(tabs)/program' as Href,
  onSubmitted,
  onViewProgress,
}: StepTwentyOneConclusionProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const stripColors = useMemo(() => gradientStripColors(PURPLE, BLUE, 14), []);

  const [index, setIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [q2, setQ2] = useState<string | null>(null);
  const [q3, setQ3] = useState<string | null>(null);
  const [q4, setQ4] = useState<string | null>(null);
  const [testimonial, setTestimonial] = useState('');
  const [phase, setPhase] = useState<'quiz' | 'celebration'>('quiz');
  const [saving, setSaving] = useState(false);
  const submitLock = useRef(false);

  const canAdvanceMc = useMemo(() => {
    if (index === 0) return q1 !== null;
    if (index === 1) return q2 !== null;
    if (index === 2) return q3 !== null;
    if (index === 3) return q4 !== null;
    return true;
  }, [index, q1, q2, q3, q4]);

  const progressFraction = (index + 1) / TOTAL;

  const finishQuiz = useCallback(
    async (testimonialText: string) => {
      if (submitLock.current) return;
      if (q1 === null || q2 === null || q3 === null || q4 === null) return;
      submitLock.current = true;
      setSaving(true);
      const payload: StepTwentyOneConclusionPayload = {
        q1,
        q2,
        q3,
        q4,
        testimonial: testimonialText,
        savedAt: new Date().toISOString(),
      };
      try {
        await storage.setItem(STORAGE_KEY, JSON.stringify(payload));
        onSubmitted?.(payload);
        setPhase('celebration');
      } catch {
        Alert.alert('Não foi possível guardar', 'Tenta de novo daqui a instantes.');
        submitLock.current = false;
      } finally {
        setSaving(false);
      }
    },
    [q1, q2, q3, q4, onSubmitted],
  );

  const goNext = useCallback(() => {
    if (!canAdvanceMc) return;
    if (index < TOTAL - 1) {
      setIndex((i) => i + 1);
    }
  }, [canAdvanceMc, index]);

  const handleViewProgress = useCallback(() => {
    if (onViewProgress) {
      onViewProgress();
      return;
    }
    router.replace(progressHref);
  }, [onViewProgress, progressHref, router]);

  if (phase === 'celebration') {
    return (
      <View style={[styles.root, { paddingTop: insets.top + 32, paddingBottom: insets.bottom + 24 }]}>
        <ScrollView contentContainerStyle={styles.celebrationScroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.celebrationEmoji} accessibilityLabel="Celebração">
            🎉
          </Text>
          <Text style={styles.celebrationTitle}>Parabéns! Você completou os 21 passos</Text>
          <GradientButtonLabel label="Ver meu progresso" onPress={handleViewProgress} stripColors={stripColors} />
        </ScrollView>
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
        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressFraction * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            {index + 1} de {TOTAL}
          </Text>
        </View>

        {index === 0 && (
          <View style={styles.card}>
            <Text style={styles.question}>Você dormiu melhor ao longo dos 21 dias?</Text>
            {Q1_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ1(opt)}
                style={[styles.optionRow, q1 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q1 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
            <GradientButtonLabel label="Próximo" disabled={!canAdvanceMc} onPress={goNext} stripColors={stripColors} />
          </View>
        )}

        {index === 1 && (
          <View style={styles.card}>
            <Text style={styles.question}>O que mais te ajudou?</Text>
            {Q2_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ2(opt)}
                style={[styles.optionRow, q2 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q2 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
            <GradientButtonLabel label="Próximo" disabled={!canAdvanceMc} onPress={goNext} stripColors={stripColors} />
          </View>
        )}

        {index === 2 && (
          <View style={styles.card}>
            <Text style={styles.question}>O que poderia melhorar no GoZzzz?</Text>
            {Q3_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ3(opt)}
                style={[styles.optionRow, q3 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q3 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
            <GradientButtonLabel label="Próximo" disabled={!canAdvanceMc} onPress={goNext} stripColors={stripColors} />
          </View>
        )}

        {index === 3 && (
          <View style={styles.card}>
            <Text style={styles.question}>Você recomendaria o GoZzzz?</Text>
            {Q4_OPTIONS.map((opt) => (
              <Pressable
                key={opt}
                onPress={() => setQ4(opt)}
                style={[styles.optionRow, q4 === opt && styles.optionRowActive]}
              >
                <Text style={[styles.optionText, q4 === opt && styles.optionTextActive]}>{opt}</Text>
              </Pressable>
            ))}
            <GradientButtonLabel label="Próximo" disabled={!canAdvanceMc} onPress={goNext} stripColors={stripColors} />
          </View>
        )}

        {index === 4 && (
          <View style={styles.card}>
            <Text style={styles.question}>Quer deixar um depoimento?</Text>
            <TextInput
              style={styles.textarea}
              value={testimonial}
              onChangeText={setTestimonial}
              placeholder="Conte como foi sua experiência com o GoZzzz..."
              placeholderTextColor="rgba(255,255,255,0.35)"
              multiline
              maxLength={4000}
              textAlignVertical="top"
            />
            <GradientButtonLabel
              label={saving ? '…' : 'Enviar depoimento'}
              disabled={saving}
              onPress={() => void finishQuiz(testimonial.trim())}
              stripColors={stripColors}
            />
            <Pressable
              onPress={() => void finishQuiz('')}
              disabled={saving}
              style={({ pressed }) => [styles.skipWrap, pressed && styles.skipPressed]}
            >
              <Text style={styles.skipText}>Pular</Text>
            </Pressable>
          </View>
        )}
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
  progressBlock: {
    marginBottom: 20,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: PURPLE,
  },
  progressLabel: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  card: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 16,
    padding: 18,
    marginBottom: 8,
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
  textarea: {
    borderWidth: 1,
    borderColor: CARD_BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 120,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.03)',
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
  skipWrap: {
    alignSelf: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  skipPressed: {
    opacity: 0.7,
  },
  skipText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  celebrationScroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  celebrationEmoji: {
    fontSize: 56,
    textAlign: 'center',
    marginBottom: 20,
  },
  celebrationTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: -0.3,
  },
});
