import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import EntryScreen from '@/src/screens/EntryScreen';
import WebLandingPage from './web/index';

/**
 * Mobile (guest): EntryScreen (quiz / entrada nativa).
 * Web (guest): mesma landing que `/web` (funil cronótipo na primeira página de gozzzz.app).
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
    return <WebLandingPage />;
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
