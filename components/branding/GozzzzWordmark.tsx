import { useEffect, useId } from 'react';
import { View, Text, StyleSheet, PixelRatio, Platform } from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  /** Tamanho do logótipo */
  size?: 'sm' | 'md';
  /**
   * `funnelHero`: hero funil (Inter/SF, medium, tracking leve, margens 48/40, sem respiração).
   * `nativeHero`: mesmo estilo tipográfico; FS 20; respiração ~4s.
   */
  preset?: 'default' | 'funnelHero' | 'nativeHero';
};

const FONT = {
  sm: 15,
  md: 19,
} as const;

/** Inter no web; SF Pro / sistema no iOS; sans-serif no Android (próximo a Inter em stacks Expo). */
const WORDMARK_TEXT_FONT = Platform.select({
  web: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

const WORDMARK_SVG_FONT = Platform.select({
  web: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ios: 'System',
  android: 'sans-serif',
  default: 'sans-serif',
});

const HERO_LETTER = 0.35;

/**
 * "Go" (Text RN) + "Zzzz" (SVG com gradiente idêntico em Web / iOS / Android).
 * Respiração suave 4s (escala 1 → 1,05 → 1) — apenas fora do hero funil.
 */
function GradientZzzz({
  fontSize,
  gradId,
  fontWeight = '800',
  letterSpacing: letterSpacingProp,
  fontFamily,
}: {
  fontSize: number;
  gradId: string;
  fontWeight?: string;
  letterSpacing?: number;
  fontFamily?: string;
}) {
  const fs = PixelRatio.roundToNearestPixel(fontSize);
  const ls = letterSpacingProp ?? 0.4;
  const width = Math.ceil(fs * 2.75 + Math.max(0, ls) * fs * 0.35);
  const height = Math.ceil(fs * 1.32);
  const baseline = Math.ceil(fs * 0.95);

  return (
    <View style={{ width, height }} collapsable={false}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <SvgLinearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#a855f7" />
            <Stop offset="0.5" stopColor="#818cf8" />
            <Stop offset="1" stopColor="#38bdf8" />
          </SvgLinearGradient>
        </Defs>
        <SvgText
          fill={`url(#${gradId})`}
          fontSize={fs}
          fontWeight={fontWeight}
          fontFamily={fontFamily}
          x="0"
          y={baseline}
          letterSpacing={ls}
        >
          Zzzz
        </SvgText>
      </Svg>
    </View>
  );
}

const FUNNEL_HERO_FS = 23;
const NATIVE_HERO_FS = 20;

export default function GozzzzWordmark({ size = 'sm', preset = 'default' }: Props) {
  const fs =
    preset === 'funnelHero' ? FUNNEL_HERO_FS : preset === 'nativeHero' ? NATIVE_HERO_FS : FONT[size];
  const scale = useSharedValue(1);
  const reactId = useId();
  const gradId = `gzZ_${(reactId.replace(/[^a-zA-Z0-9_-]/g, '') || 'mark').slice(0, 48)}`;

  useEffect(() => {
    if (preset === 'funnelHero') return;
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [scale, preset]);

  const breath = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isHeroPreset = preset === 'funnelHero' || preset === 'nativeHero';
  const goWeight = isHeroPreset ? '500' : '800';
  const zFontWeight = isHeroPreset ? '500' : '800';
  const letterGo = isHeroPreset ? HERO_LETTER : PixelRatio.roundToNearestPixel(-0.5);
  const letterZ = isHeroPreset ? HERO_LETTER : undefined;
  const uiFont = isHeroPreset ? WORDMARK_TEXT_FONT : undefined;
  const svgFont = isHeroPreset ? WORDMARK_SVG_FONT : undefined;

  const inner = (
    <>
      <Text
        style={[
          styles.go,
          {
            fontSize: fs,
            fontWeight: goWeight,
            letterSpacing: letterGo,
            ...(uiFont ? { fontFamily: uiFont } : null),
          },
          Platform.OS === 'android' ? styles.goAndroid : null,
        ]}
        maxFontSizeMultiplier={1.25}
      >
        Go
      </Text>
      <GradientZzzz
        fontSize={fs}
        gradId={gradId}
        fontWeight={zFontWeight}
        letterSpacing={letterZ}
        fontFamily={svgFont}
      />
    </>
  );

  if (preset === 'funnelHero') {
    return (
      <View style={styles.heroWrap} collapsable={false}>
        <View style={styles.row} collapsable={false}>
          {inner}
        </View>
      </View>
    );
  }

  if (preset === 'nativeHero') {
    return (
      <View style={styles.heroWrap} collapsable={false}>
        <Animated.View style={[styles.row, breath]} collapsable={false}>
          {inner}
        </Animated.View>
      </View>
    );
  }

  return (
    <Animated.View style={[styles.row, breath]} collapsable={false}>
      {inner}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    marginTop: 48,
    marginBottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  go: {
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: PixelRatio.roundToNearestPixel(-0.5),
  },
  goAndroid: {
    includeFontPadding: false,
  },
});
