import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ChronotypeQuizModal from '@/components/ChronotypeQuizModal';

/**
 * Ecrã dedicado ao quiz de cronótipo (reutiliza ChronotypeQuizModal em modo full).
 */
export default function QuizScreen() {
  const router = useRouter();

  const onComplete = useCallback((_chronotype: string) => {
    router.replace('/(auth)/signup');
  }, [router]);

  return (
    <View style={styles.root}>
      <ChronotypeQuizModal visible onComplete={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
});
