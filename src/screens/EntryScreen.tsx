import { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import Animated from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChronotypePremiumNativeHero from '@/components/chronotype/ChronotypePremiumNativeHero';

/** Mesmo campo de estrelas discreto do funil cronótipo (parallax leve). */
const STARFIELD = [
  [10, 14, 0.18, 1.2],
  [82, 22, 0.15, 1],
  [48, 8, 0.12, 1.4],
  [24, 62, 0.14, 1],
  [90, 55, 0.16, 1.1],
  [16, 38, 0.1, 1],
] as const;

const SHELL = {
  colors: ['#050816', '#0a1028', '#0b0f2a'] as const,
  locations: [0, 0.52, 1] as const,
};

export default function EntryScreen() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  const goQuiz = useCallback(() => {
    router.push('/(auth)/quiz');
  }, [router]);

  const parallaxStars = useMemo(
    () => ({
      transform: [{ translateY: scrollY * 0.05 }],
    }),
    [scrollY],
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom', 'left', 'right']}>
      <LinearGradient {...SHELL} style={StyleSheet.absoluteFillObject} />
      <StatusBar style="light" />
      <Animated.View style={[styles.starsWrap, parallaxStars]} pointerEvents="none">
        {STARFIELD.map(([x, y, o, s], i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: `${x}%`,
                top: `${y}%`,
                opacity: o,
                width: s,
                height: s,
                borderRadius: s,
              },
            ]}
          />
        ))}
      </Animated.View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.scrollContentWeb]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <ChronotypePremiumNativeHero onPressCta={goQuiz} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#050816',
  },
  starsWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#e2e8f0',
  },
  scroll: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  scrollContentWeb: {
    minHeight: '100%' as unknown as number,
  },
});
