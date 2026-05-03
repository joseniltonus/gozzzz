import { View, StyleSheet } from 'react-native';

type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const safeTotal = Math.max(total, 1);
  const ratio = Math.min(Math.max(current / safeTotal, 0), 1);

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${ratio * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 3,
    width: '100%',
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    overflow: 'hidden',
  },
  fill: {
    height: 3,
    borderRadius: 2,
    backgroundColor: '#7c6fff',
  },
});
