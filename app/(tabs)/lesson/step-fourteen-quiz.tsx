import { View, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { StepFourteenQuiz } from '@/components/StepFourteenQuiz';

export default function StepFourteenQuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.wrapper}>
      <StepFourteenQuiz />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar à lição anterior"
        onPress={() => router.back()}
        style={[styles.back, { top: insets.top + 10, left: 16 }]}
        hitSlop={12}
      >
        <ArrowLeft size={24} color="#ffffff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  back: {
    position: 'absolute',
    zIndex: 2,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
