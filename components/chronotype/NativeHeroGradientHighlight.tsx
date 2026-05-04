import { useId, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  Platform,
  type TextStyle,
  type StyleProp,
} from 'react-native';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Text as SvgText } from 'react-native-svg';

const androidText: TextStyle =
  Platform.OS === 'android' ? { includeFontPadding: false } : {};

type Props = {
  text: string;
  fontSize: number;
  lineHeight: number;
  fontWeight: '600' | '700' | '800';
  letterSpacing: number;
  maxFontSizeMultiplier?: number;
};

/** Destaque com gradiente em SVG (nítido em iOS/Android vs. MaskedView). */
export default function NativeHeroGradientHighlight({
  text,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  maxFontSizeMultiplier = 1.28,
}: Props) {
  const [measuredW, setMeasuredW] = useState(0);
  const reactId = useId();
  const gradId = `nhh_${(reactId.replace(/[^a-zA-Z0-9_-]/g, '') || 'g').slice(0, 48)}`;

  const fs = PixelRatio.roundToNearestPixel(fontSize);
  const lh = PixelRatio.roundToNearestPixel(lineHeight);

  const estW = useMemo(
    () => Math.ceil(Math.max(text.length, 2) * fs * 0.56),
    [text, fs],
  );
  const svgW = measuredW > 0 ? measuredW : estW;

  const measurerStyle: StyleProp<TextStyle> = useMemo(
    () => [
      styles.measurer,
      {
        fontSize: fs,
        lineHeight: lh,
        fontWeight,
        letterSpacing,
      },
      androidText,
    ],
    [fs, lh, fontWeight, letterSpacing],
  );

  const baselineY = PixelRatio.roundToNearestPixel(lh - (lh - fs) * 0.22 - 2);

  return (
    <View
      style={[styles.host, { height: lh, width: svgW }]}
      collapsable={false}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
    >
      <Text
        style={measurerStyle}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        onLayout={(e) => {
          const next = Math.ceil(PixelRatio.roundToNearestPixel(e.nativeEvent.layout.width));
          setMeasuredW((prev) => (next !== prev ? next : prev));
        }}
        accessible={false}
        importantForAccessibility="no-hide-descendants"
      >
        {text}
      </Text>
      <View style={styles.svgLayer} pointerEvents="none" accessible={false}>
        <Svg
          width={svgW}
          height={lh}
          viewBox={`0 0 ${svgW} ${lh}`}
          accessible={false}
          accessibilityElementsHidden
        >
          <Defs>
            <SvgLinearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#a855f7" />
              <Stop offset="0.48" stopColor="#818cf8" />
              <Stop offset="1" stopColor="#38bdf8" />
            </SvgLinearGradient>
          </Defs>
          <SvgText
            fill={`url(#${gradId})`}
            x={0}
            y={baselineY}
            fontSize={fs}
            fontWeight={fontWeight}
            letterSpacing={letterSpacing}
          >
            {text}
          </SvgText>
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    position: 'relative',
    justifyContent: 'center',
  },
  measurer: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    top: 0,
    color: '#fff',
    padding: 0,
    margin: 0,
  },
  svgLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
});
