import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChronotypeQuizModal from '@/components/ChronotypeQuizModal';
import ProgressBar from '@/src/components/ProgressBar';

/**
 * Quiz de cronótipo em ecrã completo; barra de progresso no topo (reutilizável).
 */
export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [questionIndex, setQuestionIndex] = useState(1);

  const onComplete = useCallback(
    (chronotype: string) => {
      router.push({ pathname: '/(auth)/result', params: { chronotype } });
    },
    [router],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.progressPad, { paddingTop: Math.max(insets.top, 12) }]}>
        <ProgressBar current={questionIndex} total={4} />
      </View>
      <View style={styles.quizBody}>
        <ChronotypeQuizModal
          visible
          presentation="fullscreen"
          onComplete={onComplete}
          showProgressBar={false}
          onQuestionIndexChange={(i) => setQuestionIndex(i + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
  progressPad: {
    paddingHorizontal: 18,
    paddingBottom: 8,
    zIndex: 2,
  },
  quizBody: {
    flex: 1,
  },
});
