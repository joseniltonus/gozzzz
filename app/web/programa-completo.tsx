/**
 * Rota legada — manda o cliente direto pra trilha oficial `/web/programa`
 * preservando o `?key=` da URL. Mantemos esta página só pra não quebrar
 * links antigos que possam ter sido enviados antes da unificação. Pode
 * ser removida no futuro.
 */
import { useEffect } from 'react';
import { Platform, View, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Head from 'expo-router/head';

const isWeb = Platform.OS === 'web';

export default function ProgramaCompletoLegacy() {
  const router = useRouter();
  const params = useLocalSearchParams<{ key?: string | string[] }>();
  const rawKey = params.key;
  const k = (Array.isArray(rawKey) ? rawKey[0] : rawKey ?? '').trim();

  useEffect(() => {
    const target = k ? `/web/programa?key=${encodeURIComponent(k)}` : '/web/programa';
    router.replace(target);
  }, [k, router]);

  return (
    <>
      <Head>
        <title>Carregando — GoZzzz</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <View style={styles.page}>
        <ActivityIndicator size="large" color="#fbbf24" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#07070f',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: isWeb ? 0 : 80,
  },
});
