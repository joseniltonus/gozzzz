import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ProgressBarProps = {
  current: number;
  total: number;
  /** Anima a largura quando o passo muda (quiz). */
  animated?: boolean;
};

export default function ProgressBar({ current, total, animated = false }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const target = Math.min(Math.max(current / safeTotal, 0), 1);
  const progress = useSharedValue(animated ? 0 : target);

  useEffect(() => {
    if (animated) {
      progress.value = withTiming(target, {
        duration: 420,
        easing: Easing.out(Easing.cubic),
      });
    } else {
      progress.value = target;
    }
  }, [target, animated, progress]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fill, fillStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 4,
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  fill: {
    height: 4,
    borderRadius: 4,
    backgroundColor: '#818cf8',
  },
});
