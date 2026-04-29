import { Stack } from 'expo-router/stack';

export default function CoachLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="concierge" />
    </Stack>
  );
}
