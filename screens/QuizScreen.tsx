import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ChronotypeQuizModal from '@/components/ChronotypeQuizModal';

/**
 * Ecrã dedicado ao quiz de cronótipo (reutiliza ChronotypeQuizModal em modo full).
 */
export default function QuizScreen() {
  const router = useRouter();

  const onComplete = useCallback((chronotype: string) => {
    router.push({ pathname: '/(auth)/result', params: { chronotype } });
  }, [router]);

  return (
    <View style={styles.root}>
      <ChronotypeQuizModal visible presentation="fullscreen" onComplete={onComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
});
