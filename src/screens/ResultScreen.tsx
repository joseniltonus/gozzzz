import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import ChronotypeResultPremiumScreen from '@/components/chronotype/ChronotypeResultPremiumScreen';
import { normalizeChronotypeKey, type ChronotypeKey } from '@/data/chronotypesIntelligence';

export default function ResultScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { chronotype: raw } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const key: ChronotypeKey = normalizeChronotypeKey(raw) ?? 'bear';

  return (
    <ChronotypeResultPremiumScreen
      chronotypeKey={key}
      locale={isPt ? 'pt' : 'en'}
      onStartDay1={() =>
        router.push({
          pathname: '/(auth)/signup',
          params: { chronotype: key },
        })
      }
    />
  );
}
