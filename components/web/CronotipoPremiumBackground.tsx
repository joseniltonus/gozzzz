import { useMemo, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  scrollY: Animated.Value;
};

/** Navy → roxo profundo, poucas estrelas discretas, parallax vertical lento. */
export default function CronotipoPremiumBackground({ scrollY }: Props) {
  const stars = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        key: i,
        leftPct: 4 + ((i * 37 + (i % 5) * 19) % 88),
        top: 40 + ((i * 23) % 320),
        s: 1 + (i % 2),
        o: 0.12 + ((i * 13) % 22) / 100,
      })),
    [],
  );

  const parallax = useRef(
    scrollY.interpolate({
      inputRange: [0, 420],
      outputRange: [0, -42],
      extrapolate: 'clamp',
    }),
  ).current;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={['#070b14', '#0f1024', '#150a22', '#0a0812']}
        locations={[0, 0.35, 0.65, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[styles.stars, { transform: [{ translateY: parallax }] }]} collapsable={false}>
        {stars.map((st) => (
          <View
            key={st.key}
            style={[
              styles.star,
              {
                left: `${st.leftPct}%`,
                top: st.top,
                width: st.s,
                height: st.s,
                borderRadius: st.s,
                opacity: st.o,
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stars: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#e2e8f0',
  },
});
