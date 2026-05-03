import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import PrimaryButton from '@/src/components/PrimaryButton';
import GhostButton from '@/src/components/GhostButton';
import ChronotypModal from '@/src/screens/ChronotypModal';

const BG = '#0c0e1a';

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

            <Text style={styles.logoLine}>
              <Text style={styles.logoGo}>Go</Text>
              <Text style={styles.logoZzz}>Zzz</Text>
            </Text>
            <Text style={styles.logoSub}>PROGRAMA DE SONO EM 21 PASSOS</Text>
            <View style={styles.logoRule} />

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

            <PrimaryButton label="→ Fazer o teste" onPress={goQuiz} />
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
  logoLine: {
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '500',
  },
  logoGo: {
    color: '#ffffff',
  },
  logoZzz: {
    color: '#a99fff',
  },
  logoSub: {
    marginTop: 6,
    fontSize: 10,
    color: '#4a5275',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  logoRule: {
    width: 32,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 24,
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
