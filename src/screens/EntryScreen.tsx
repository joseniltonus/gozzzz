import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Reanimated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import GhostButton from '@/src/components/GhostButton';
import ChronotypModal from '@/src/screens/ChronotypModal';

const BG = '#0c0e1a';

const SCI_ROWS = [
  { initials: 'MB', name: 'Dr. Breus', inst: 'Sleep Medicine', color: 'rgba(124,111,255,0.25)', textColor: '#c8c0ff' },
  { initials: 'MW', name: 'Dr. Walker', inst: 'UC Berkeley', color: 'rgba(111,200,255,0.20)', textColor: '#a8d8ff' },
  { initials: 'AH', name: 'Dr. Huberman', inst: 'Stanford', color: 'rgba(160,111,255,0.20)', textColor: '#c8a8ff' },
  { initials: 'CC', name: 'Dr. Czeisler', inst: 'Harvard Medical', color: 'rgba(111,200,160,0.20)', textColor: '#a8ffd8' },
] as const;

function makeStarField() {
  const stars: { key: number; leftPct: number; top: number; size: number; opacity: number }[] = [];
  for (let i = 0; i < 45; i++) {
    const leftPct = 4 + ((i * 47 + (i % 7) * 13) % 88);
    const top = 6 + ((i * 29 + (i % 5) * 17) % 214);
    const size = 1 + (i % 3);
    const opacity = 0.22 + ((i * 17) % 55) / 100;
    stars.push({ key: i, leftPct, top, size, opacity });
  }
  return stars;
}

function AnimatedStarField() {
  const pulse = useRef(new Animated.Value(0.78)).current;
  const stars = useMemo(() => makeStarField(), []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.72,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View pointerEvents="none" style={[styles.starField, { opacity: pulse, height: 220 }]}>
      {stars.map((s) => (
        <View
          key={s.key}
          style={[
            styles.starDot,
            {
              left: `${s.leftPct}%`,
              top: s.top,
              width: s.size,
              height: s.size,
              borderRadius: s.size,
              opacity: s.opacity,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

function LogoBlock() {
  const useMask = Platform.OS !== 'web';

  if (!useMask) {
    return (
      <View style={styles.logoWrap}>
        <Text style={styles.logoTextFallback}>GoZzz</Text>
        <Text style={styles.logoSub}>PROGRAMA DE SONO EM 21 PASSOS</Text>
        <View style={styles.logoLine} />
      </View>
    );
  }

  return (
    <View style={styles.logoWrap}>
      <MaskedView
        style={styles.maskedLogo}
        maskElement={
          <View style={styles.maskInner}>
            <Text style={styles.logoText}>GoZzz</Text>
          </View>
        }
      >
        <LinearGradient colors={['#ffffff', '#c8c0ff']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <Text style={[styles.logoText, styles.logoTextHidden]}>GoZzz</Text>
        </LinearGradient>
      </MaskedView>
      <Text style={styles.logoSub}>PROGRAMA DE SONO EM 21 PASSOS</Text>
      <View style={styles.logoLine} />
    </View>
  );
}

function ResearcherGrid() {
  return (
    <View style={styles.sciWrap}>
      <Text style={styles.sciLabel}>Fundamentado em</Text>
      <View style={styles.sciGrid}>
        {SCI_ROWS.map((r) => (
          <View key={r.initials} style={styles.sciPill}>
            <View style={[styles.sciAv, { backgroundColor: r.color }]}>
              <Text style={[styles.sciAvText, { color: r.textColor }]}>{r.initials}</Text>
            </View>
            <View>
              <Text style={styles.sciName}>{r.name}</Text>
              <Text style={styles.sciInst}>{r.inst}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function CtaButton({ onPress }: { onPress: () => void }) {
  const shimmer = useSharedValue(-1);

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(withTiming(1, { duration: 1200 }), withTiming(-1, { duration: 1 })),
      -1,
      false,
    );
  }, [shimmer]);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmer.value * 300 }],
  }));

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <LinearGradient
        colors={['#8b7fff', '#6a5fff', '#5a8fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ctaGradient}
      >
        <View style={styles.ctaTopLine} />
        <Reanimated.View style={[styles.ctaShimmer, shimmerStyle]} />
        <Text style={styles.ctaText}>→ Fazer o teste</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function EntryScreen() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const goQuiz = useCallback(() => {
    router.push('/(auth)/quiz');
  }, [router]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.scrollContentWeb]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.canvas}>
          <View style={styles.glowWrap} pointerEvents="none">
            <View style={styles.glowCircle} />
          </View>

          <AnimatedStarField />

          <View style={styles.inner}>
            <View style={styles.notch} />

            <LogoBlock />

            <ResearcherGrid />

            <View style={styles.moonOuter}>
              <View style={styles.moonMid}>
                <View style={styles.moonCore}>
                  <Text style={styles.moonEmoji}>🌙</Text>
                </View>
              </View>
            </View>

            <Text style={styles.headline}>
              Você sabe por que acorda cansado{'\n'}mesmo dormindo 8 horas?
            </Text>
            <Text style={styles.subtitle}>
              Descubra em 60 segundos qual é o{'\n'}seu tipo biológico de sono.
            </Text>

            <CtaButton onPress={goQuiz} />
            <GhostButton label="Saiba mais" onPress={() => setShowModal(true)} style={styles.ghostAfterPrimary} />

            <Text style={styles.meta}>Gratuito · 60 segundos · Sem cadastro</Text>
          </View>
        </View>
      </ScrollView>

      <ChronotypModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onStartQuiz={() => {
          setShowModal(false);
          goQuiz();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentWeb: {
    minHeight: '100%' as unknown as number,
  },
  canvas: {
    flex: 1,
    minHeight: 560,
    position: 'relative',
  },
  glowWrap: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  glowCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: 'rgba(124,111,255,0.15)',
  },
  starField: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  starDot: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  inner: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 28,
    zIndex: 2,
  },
  notch: {
    width: 100,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.10)',
    alignSelf: 'center',
    marginBottom: 28,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 22,
  },
  maskedLogo: {
    alignSelf: 'center',
  },
  maskInner: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    fontWeight: '300',
    letterSpacing: -1.5,
    color: '#fff',
  },
  logoTextHidden: {
    opacity: 0,
  },
  logoTextFallback: {
    fontSize: 40,
    fontWeight: '300',
    letterSpacing: -1.5,
    color: '#e8e4ff',
  },
  logoSub: {
    fontSize: 10,
    color: '#3a4060',
    letterSpacing: 2.4,
    textTransform: 'uppercase',
    marginTop: 6,
  },
  logoLine: {
    width: 32,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    marginTop: 14,
  },
  sciWrap: {
    width: '100%',
    marginBottom: 22,
  },
  sciLabel: {
    fontSize: 9,
    color: '#3a4060',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  sciGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sciPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 9,
    width: '48%',
  },
  sciAv: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sciAvText: {
    fontSize: 9,
    fontWeight: '600',
  },
  sciName: {
    fontSize: 10,
    color: '#c0c5e0',
    fontWeight: '500',
  },
  sciInst: {
    fontSize: 8,
    color: '#40465a',
    marginTop: 1,
  },
  moonOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(169,159,255,0.12)',
    backgroundColor: 'rgba(169,159,255,0.06)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  moonMid: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(169,159,255,0.20)',
    backgroundColor: 'rgba(169,159,255,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonCore: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#7c6fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moonEmoji: {
    fontSize: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#8b92b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 36,
  },
  ctaGradient: {
    width: '100%',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#7c6fff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  ctaTopLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  ctaShimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: 'rgba(255,255,255,0.10)',
    transform: [{ skewX: '-20deg' }],
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.3,
  },
  ghostAfterPrimary: {
    marginTop: 8,
  },
  meta: {
    fontSize: 11,
    color: '#4a5275',
    textAlign: 'center',
    marginTop: 20,
  },
});
