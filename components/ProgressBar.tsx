import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const { isDark } = useTheme();
  const percentage = (current / total) * 100;

  const tc = {
    containerBg: isDark ? 'rgba(15, 26, 46, 0.8)' : 'rgba(255,255,255,0.9)',
    containerBorder: isDark ? 'rgba(100, 116, 139, 0.3)' : 'rgba(0,0,0,0.1)',
    phaseLabel: isDark ? '#94a3b8' : '#475569',
    phaseDesc: isDark ? '#64748b' : '#94a3b8',
    percentage: isDark ? '#f1f5f9' : '#1a202c',
    barBg: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(0,0,0,0.08)',
    stepText: isDark ? '#cbd5e1' : '#475569',
    stepBold: isDark ? '#f1f5f9' : '#1a202c',
    indicatorBg: isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(0,0,0,0.04)',
    indicatorBorder: isDark ? 'rgba(100, 116, 139, 0.2)' : 'rgba(0,0,0,0.08)',
    indicatorActiveBg: isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
    indicatorActiveBorder: isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.4)',
    indicatorText: isDark ? '#94a3b8' : '#475569',
  };

  const getPhaseInfo = () => {
    if (current <= 7) {
      return {
        phase: 'Fundamentos',
        color: '#3b82f6',
        description: 'Steps 1-7',
      };
    } else if (current <= 14) {
      return {
        phase: 'Aprofundamento',
        color: '#8b5cf6',
        description: 'Steps 8-14',
      };
    } else {
      return {
        phase: 'Otimizacao',
        color: '#10b981',
        description: 'Steps 15-21',
      };
    }
  };

  const phaseInfo = getPhaseInfo();

  return (
    <View style={[styles.container, { backgroundColor: tc.containerBg, borderColor: tc.containerBorder }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.phaseLabel, { color: tc.phaseLabel }]}>{phaseInfo.phase}</Text>
          <Text style={[styles.phaseDescription, { color: tc.phaseDesc }]}>{phaseInfo.description}</Text>
        </View>
        <Text style={[styles.percentage, { color: tc.percentage }]}>{Math.round(percentage)}%</Text>
      </View>

      <View style={[styles.barContainer, { backgroundColor: tc.barBg }]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: phaseInfo.color
            },
          ]}
        />
      </View>

      <View style={styles.stepCounter}>
        <Text style={[styles.stepText, { color: tc.stepText }]}>
          <Text style={[styles.stepBold, { color: tc.stepBold }]}>{current}</Text> of{' '}
          <Text style={[styles.stepBold, { color: tc.stepBold }]}>{total}</Text> steps
        </Text>
      </View>

      <View style={styles.phaseIndicators}>
        <View style={[
          styles.phaseIndicator,
          { backgroundColor: tc.indicatorBg, borderColor: tc.indicatorBorder },
          current >= 1 && { backgroundColor: tc.indicatorActiveBg, borderColor: tc.indicatorActiveBorder },
        ]}>
          <Text style={[styles.phaseIndicatorText, { color: tc.indicatorText }]}>1-7</Text>
        </View>
        <View style={[
          styles.phaseIndicator,
          { backgroundColor: tc.indicatorBg, borderColor: tc.indicatorBorder },
          current >= 8 && { backgroundColor: tc.indicatorActiveBg, borderColor: tc.indicatorActiveBorder },
        ]}>
          <Text style={[styles.phaseIndicatorText, { color: tc.indicatorText }]}>8-14</Text>
        </View>
        <View style={[
          styles.phaseIndicator,
          { backgroundColor: tc.indicatorBg, borderColor: tc.indicatorBorder },
          current >= 15 && { backgroundColor: tc.indicatorActiveBg, borderColor: tc.indicatorActiveBorder },
        ]}>
          <Text style={[styles.phaseIndicatorText, { color: tc.indicatorText }]}>15-21</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  phaseLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 12,
  },
  percentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  barContainer: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  stepCounter: {
    marginBottom: 12,
  },
  stepText: {
    fontSize: 13,
  },
  stepBold: {
    fontWeight: '700',
  },
  phaseIndicators: {
    flexDirection: 'row',
    gap: 8,
  },
  phaseIndicator: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  phaseIndicatorText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
