import { Stack } from 'expo-router';

/**
 * Pilha de autenticação / onboarding. Ordem alinhada ao fluxo: quiz → resultado → cadastro → passos.
 */
export default function AppNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="quiz" />
      <Stack.Screen name="result" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="steps" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
