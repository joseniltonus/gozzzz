import { Stack, Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function WebLayout() {
  if (Platform.OS !== 'web') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="programa" />
      <Stack.Screen name="coach" />
      <Stack.Screen name="sobre" />
      <Stack.Screen name="assinar" />
      <Stack.Screen name="licao/[id]" />
    </Stack>
  );
}
