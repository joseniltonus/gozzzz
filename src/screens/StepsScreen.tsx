import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PrimaryButton from '@/src/components/PrimaryButton';

/**
 * Ponto de entrada do plano após cadastro — encaminha para a área principal do app.
 */
export default function StepsScreen() {
  const router = useRouter();
  const { chronotype } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const label = Array.isArray(chronotype) ? chronotype[0] : chronotype;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.inner}>
        <Text style={styles.title}>Plano de 21 passos</Text>
        <Text style={styles.body}>
          {label
            ? `Seu cronotipo (${label}) foi guardado. Continue no app para seguir o programa dia a dia.`
            : 'Continue no app para seguir o programa dia a dia.'}
        </Text>
        <PrimaryButton label="Ir para o início →" onPress={() => router.replace('/(tabs)/home')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  body: {
    fontSize: 14,
    color: '#8b92b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
});
