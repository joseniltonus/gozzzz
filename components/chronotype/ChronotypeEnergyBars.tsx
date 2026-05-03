import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  morning: number;
  night: number;
  accent: string;
  morningLabel: string;
  nightLabel: string;
};

export default function ChronotypeEnergyBars({ morning, night, accent, morningLabel, nightLabel }: Props) {
  const maxH = 140;
  const hM = Math.max(16, (morning / 100) * maxH);
  const hN = Math.max(16, (night / 100) * maxH);

  return (
    <View style={styles.wrap}>
      <View style={styles.col}>
        <LinearGradient
          colors={[accent, `${accent}66`]}
          style={[styles.bar, { height: hM }]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <Text style={styles.lab}>{morningLabel}</Text>
      </View>
      <View style={styles.col}>
        <LinearGradient
          colors={['#6366f1aa', '#312e81']}
          style={[styles.bar, { height: hN }]}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
        />
        <Text style={styles.lab}>{nightLabel}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 36,
    paddingVertical: 20,
  },
  col: { alignItems: 'center', width: 100 },
  bar: {
    width: 56,
    borderRadius: 14,
    marginBottom: 10,
  },
  lab: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(148,163,184,0.95)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
});
