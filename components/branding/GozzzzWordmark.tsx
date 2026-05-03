import { useEffect, useId } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
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
};

const FONT = {
  sm: 15,
  md: 19,
} as const;

/**
 * "Go" (Text RN) + "Zzzz" (SVG com gradiente idêntico em Web / iOS / Android).
 * Respiração suave 4s (escala 1 → 1,05 → 1).
 */
function GradientZzzz({ fontSize, gradId }: { fontSize: number; gradId: string }) {
  const fs = PixelRatio.roundToNearestPixel(fontSize);
  const width = Math.ceil(fs * 2.65);
  const height = Math.ceil(fs * 1.32);
  const baseline = Math.ceil(fs * 0.95);

  return (
    <View style={{ width, height }} collapsable={false}>
      <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <SvgLinearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#c084fc" />
            <Stop offset="0.5" stopColor="#818cf8" />
            <Stop offset="1" stopColor="#38bdf8" />
          </SvgLinearGradient>
        </Defs>
        <SvgText
          fill={`url(#${gradId})`}
          fontSize={fs}
          fontWeight="800"
          x="0"
          y={baseline}
          letterSpacing={-0.5}
        >
          Zzzz
        </SvgText>
      </Svg>
    </View>
  );
}

export default function GozzzzWordmark({ size = 'sm' }: Props) {
  const fs = FONT[size];
  const scale = useSharedValue(1);
  const reactId = useId();
  const gradId = `gzZ_${(reactId.replace(/[^a-zA-Z0-9_-]/g, '') || 'mark').slice(0, 48)}`;

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [scale]);

  const breath = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.row, breath]} collapsable={false}>
      <Text style={[styles.go, { fontSize: fs }]} maxFontSizeMultiplier={1.25}>
        Go
      </Text>
      <GradientZzzz fontSize={fs} gradId={gradId} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
});
