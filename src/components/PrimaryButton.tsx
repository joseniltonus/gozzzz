import { useEffect, useRef } from 'react';
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
  Animated,
  Easing,
} from 'react-native';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

const SHIMMER_DURATION_MS = 3500;

export default function PrimaryButton({ label, onPress, style }: PrimaryButtonProps) {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: SHIMMER_DURATION_MS,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-160, 360],
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.outer, pressed && styles.outerPressed, style]}
    >
      <View style={styles.clip}>
        <Animated.View
          pointerEvents="none"
          style={[styles.shimmerBand, { transform: [{ translateX }] }]}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#7c6fff',
    overflow: 'hidden',
  },
  outerPressed: {
    opacity: 0.92,
  },
  clip: {
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shimmerBand: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 120,
    backgroundColor: 'rgba(255,255,255,0.22)',
    opacity: 0.35,
    transform: [{ skewX: '-18deg' }],
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});
