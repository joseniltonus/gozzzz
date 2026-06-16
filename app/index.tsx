import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import EntryScreen from '@/src/screens/EntryScreen';
import WebMarketingLanding from '@/components/web/WebMarketingLanding';

/**
 * Mobile (guest): EntryScreen.
 * Web (guest): landing marketing em gozzzz.app (separada de /sono).
 * Autenticados: home nas tabs.
 */
export default function Index() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.boot}>
        <ActivityIndicator size="large" color="#7c6fff" />
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  if (Platform.OS === 'web') {
    return <WebMarketingLanding />;
  }

  return <EntryScreen />;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0e1a',
  },
});
