import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import ChronotypeIntelligenceProfile from '@/components/chronotype/ChronotypeIntelligenceProfile';
import { normalizeChronotypeKey, type ChronotypeKey } from '@/data/chronotypesIntelligence';

export default function ResultScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { chronotype: raw } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const key: ChronotypeKey = normalizeChronotypeKey(raw) ?? 'bear';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ChronotypeIntelligenceProfile
        chronotypeKey={key}
        locale={isPt ? 'pt' : 'en'}
        onContinuePlan={() =>
          router.push({
            pathname: '/(auth)/signup',
            params: { chronotype: key },
          })
        }
        continuePlanLabel={isPt ? 'Ver meu plano de 21 passos →' : 'See my 21-step plan →'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#05060d',
  },
});
