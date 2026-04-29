import { View, StyleSheet } from 'react-native';

interface QuizGateProps {
  onComplete: (destination?: string) => void;
}

export function QuizGate({ onComplete }: QuizGateProps) {
  return (
    <View style={styles.container} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#08081a',
  },
});
