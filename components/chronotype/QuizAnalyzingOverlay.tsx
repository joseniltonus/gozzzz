import { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  visible: boolean;
  locale: 'pt' | 'en';
};

/**
 * Estado "Analisando seu perfil..." com barra a encher em ~2s (easing suave).
 */
export default function QuizAnalyzingOverlay({ visible, locale }: Props) {
  const p = useSharedValue(0);

  useEffect(() => {
    if (!visible) {
      p.value = 0;
      return;
    }
    p.value = 0;
    p.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.cubic) });
  }, [visible, p]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${p.value * 100}%`,
  }));

  const title = locale === 'pt' ? 'Analisando seu perfil…' : 'Analyzing your profile…';

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.track}>
            <Animated.View style={[styles.fillWrap, barStyle]}>
              <LinearGradient
                colors={['#a78bfa', '#6366f1', '#38bdf8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.fill}
              />
            </Animated.View>
          </View>
          <Text style={styles.hint}>gozzzz.app</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(5, 6, 13, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 20,
    padding: 28,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 0 40px rgba(99,102,241,0.25)' } as object)
      : {}),
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 22,
    letterSpacing: -0.2,
  },
  track: {
    height: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
    marginBottom: 18,
  },
  fillWrap: {
    height: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
    height: 6,
    borderRadius: 6,
  },
  hint: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.55)',
    letterSpacing: 2,
  },
});
