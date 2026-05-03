import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import WebMarketingLanding from '@/components/web/WebMarketingLanding';

/**
 * Visitante (web + nativo): mesma landing marketing + funil cronótipo (`WebMarketingLanding`).
 * O antigo `EntryScreen` só era usado no nativo e por isso o Expo parecia “preso” no visual antigo.
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

  return <WebMarketingLanding />;
}

const styles = StyleSheet.create({
  boot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0e1a',
  },
});
