import { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { storage } from '@/lib/storage';

const BG = '#07080f';
const PURPLE = '#7c6fff';
const BLUE = '#4a8fff';
const STORAGE_KEY = 'gozzzz_step7_check_in';

export type StepSevenCheckInPayload = {
  rating: number;
  note: string;
  savedAt: string;
};

export type StepSevenCheckInProps = {
  /** Expo route segment, e.g. `"8"` for `/lesson/8` */
  nextLessonId?: string;
  /** Called after persistence; default still navigates when omitted */
  onSaved?: (payload: StepSevenCheckInPayload) => void;
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

export function StepSevenCheckIn({ nextLessonId = '8', onSaved }: StepSevenCheckInProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const stripColors = useMemo(() => gradientStripColors(PURPLE, BLUE, 14), []);

  const handleContinue = useCallback(async () => {
    if (rating < 1 || saving) return;
    setSaving(true);
    const payload: StepSevenCheckInPayload = {
      rating,
      note: note.trim(),
      savedAt: new Date().toISOString(),
    };
    try {
      await storage.setItem(STORAGE_KEY, JSON.stringify(payload));
      onSaved?.(payload);
      router.replace(`/(tabs)/lesson/${nextLessonId}`);
    } catch {
      Alert.alert('Não foi possível guardar', 'Tenta de novo daqui a instantes.');
    } finally {
      setSaving(false);
    }
  }, [rating, note, nextLessonId, onSaved, router, saving]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Como você está se sentindo até aqui?</Text>

        <View style={styles.starsRow} accessibilityRole="radiogroup" accessibilityLabel="Avaliação de 1 a 5 estrelas">
          {[1, 2, 3, 4, 5].map((star) => {
            const active = star <= rating;
            return (
              <Pressable
                key={star}
                onPress={() => setRating(star)}
                style={({ pressed }) => [styles.starHit, pressed && styles.starPressed]}
                accessibilityRole="radio"
                accessibilityState={{ checked: active }}
                accessibilityLabel={`${star} estrela${star > 1 ? 's' : ''}`}
              >
                <Text style={[styles.starGlyph, active ? styles.starOn : styles.starOff]}>★</Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Quer nos contar algo? (opcional)"
          placeholderTextColor="rgba(255,255,255,0.35)"
          multiline
          maxLength={2000}
          textAlignVertical="top"
        />

        <Pressable
          onPress={handleContinue}
          disabled={rating < 1 || saving}
          style={({ pressed }) => [
            styles.continueOuter,
            (rating < 1 || saving) && styles.continueDisabled,
            pressed && rating >= 1 && !saving && styles.continuePressed,
          ]}
        >
          <View style={styles.gradientTrack}>
            {stripColors.map((c, i) => (
              <View key={i} style={[styles.gradientSlice, { backgroundColor: c }]} />
            ))}
          </View>
          <Text style={styles.continueLabel}>{saving ? '…' : 'Continuar'}</Text>
        </Pressable>
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
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 30,
    marginBottom: 28,
    letterSpacing: -0.2,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
  },
  starHit: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 100,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 28,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  continueOuter: {
    borderRadius: 14,
    overflow: 'hidden',
    minHeight: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueDisabled: {
    opacity: 0.45,
  },
  continuePressed: {
    opacity: 0.92,
  },
  gradientTrack: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  gradientSlice: {
    flex: 1,
  },
  continueLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
