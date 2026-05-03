import { Stack, Redirect } from 'expo-router';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { BUILD_STAMP_LABEL } from '@/lib/buildStamp';

export default function WebLayout() {
  if (Platform.OS !== 'web') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="programa" />
        <Stack.Screen name="coach" />
        <Stack.Screen name="sobre" />
        <Stack.Screen name="assinar" />
        <Stack.Screen name="licao/[id]" />
      </Stack>
      {BUILD_STAMP_LABEL ? (
        <View style={webBuildStamp.wrap} pointerEvents="none">
          <Text style={webBuildStamp.text}>{BUILD_STAMP_LABEL}</Text>
        </View>
      ) : null}
    </>
  );
}

const webBuildStamp = StyleSheet.create({
  wrap: {
    position: 'fixed',
    right: 10,
    bottom: 8,
    zIndex: 99999,
  },
  text: {
    fontSize: 10,
    color: 'rgba(148, 163, 184, 0.9)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
});
