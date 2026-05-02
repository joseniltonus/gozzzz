import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function ResultScreen() {
  const router = useRouter();
  const { chronotype } = useLocalSearchParams<{ chronotype?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu resultado</Text>
      <Text style={styles.value}>{chronotype ?? '—'}</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.replace('/(auth)/signup')} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#07070f',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#a99fff',
    marginBottom: 28,
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#7c6fff',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 22,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
