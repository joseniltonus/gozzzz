import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import ChronotypeResultFlow from '@/components/chronotype/ChronotypeResultFlow';
import { normalizeChronotypeExpKey, type ChronotypeExpKey } from '@/data/chronotypesExperience';

export default function ResultScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { chronotype: raw } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const key: ChronotypeExpKey = normalizeChronotypeExpKey(raw) ?? 'bear';

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ChronotypeResultFlow
        chronotypeKey={key}
        locale={isPt ? 'pt' : 'en'}
        onDay1={() =>
          router.push({
            pathname: '/(auth)/signup',
            params: { chronotype: key },
          })
        }
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
