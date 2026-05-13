import { Stack, useRouter, useSegments } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, Modal } from 'react-native';
import { CookieConsent } from '@/components/CookieConsent';
import { EngagementNotificationSync } from '@/components/EngagementNotificationSync';
import { ToastContainer } from '@/components/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEffect, useRef, useState } from 'react';
import { saveQuizDoneLocal, readQuizDoneLocal } from '@/lib/quizDevicePersistence';
import { supabase } from '@/lib/supabase';

function AuthGate() {
  const { session, loading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const isNavigating = useRef(false);
  const [quizChecked, setQuizChecked] = useState(false);

  useEffect(() => {
    setQuizChecked(false);
  }, [user?.id]);

  useEffect(() => {
    if (loading) return;

    const currentSegment = segments?.[0] as string | undefined;
    const inAuthGroup = currentSegment === '(auth)';
    const inTabsGroup = currentSegment === '(tabs)';
    const inWebGroup = currentSegment === 'web' || currentSegment === 'sono';
    const isPublicPage = currentSegment === 'confirm-email' || currentSegment === 'reset-password';

    if (inWebGroup || isPublicPage) return;

    if (session && user) {
      if (inAuthGroup) {
        if (isNavigating.current) return;
        isNavigating.current = true;
        router.replace('/(tabs)/home');
        setTimeout(() => { isNavigating.current = false; }, 500);
      }
    } else {
      if (inTabsGroup) {
        if (isNavigating.current) return;
        isNavigating.current = true;
        router.replace('/(auth)/login');
        setTimeout(() => { isNavigating.current = false; }, 500);
      }
    }
  }, [session, loading, user, segments, router]);

  useEffect(() => {
    if (loading || !session || !user || quizChecked) return;

    const currentSegment = segments?.[0] as string | undefined;
    const inTabsGroup = currentSegment === '(tabs)';
    const currentTab = segments?.[1] as string | undefined;
    const inWebGroup = currentSegment === 'web' || currentSegment === 'sono';
    const isPublicPage = currentSegment === 'confirm-email' || currentSegment === 'reset-password';

    if (!inTabsGroup || inWebGroup || isPublicPage) return;

    setQuizChecked(true);

    (async () => {
      try {
        const localDone = await readQuizDoneLocal(user.id);

        if (localDone) {
          console.log('[QUIZ_GATE:LOCAL] Quiz already done locally');
          return;
        }

        const metaDone =
          (user?.user_metadata as { quiz_completed?: boolean } | undefined)?.quiz_completed === true;
        if (metaDone) {
          console.log('[QUIZ_GATE:AUTH_META] Quiz done in JWT metadata');
          await saveQuizDoneLocal(user.id);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('quiz_completed')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('[QUIZ_GATE:SUPABASE_ERROR]', error);
          return;
        }

        const profileData = profile as { quiz_completed?: boolean } | null;
        if (profileData?.quiz_completed === true) {
          console.log('[QUIZ_GATE:SUPABASE] Quiz already done, saving locally');
          await saveQuizDoneLocal(user.id);
          return;
        }

        if (currentTab !== 'home') {
          if (isNavigating.current) return;
          isNavigating.current = true;
          console.log('[QUIZ_GATE:REDIRECT] Quiz not done, forcing home quiz gate');
          router.replace('/(tabs)/home');
          setTimeout(() => { isNavigating.current = false; }, 500);
        }
      } catch (err) {
        console.error('[QUIZ_GATE:ERROR]', err);
      }
    })();
  }, [loading, session, user, quizChecked, segments, router]);

  return null;
}

function RootNavigator() {
  const { loading, sessionConflict, clearSessionConflict } = useAuth();
  const { isDark } = useTheme();

  return (
    <View style={styles.root}>
      <View style={[styles.navContainer, { backgroundColor: isDark ? '#0d0d16' : '#f8fafc' }]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="sono" />
          <Stack.Screen name="web" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="privacy" />
          <Stack.Screen name="terms" />
          <Stack.Screen name="qrcode" />
          <Stack.Screen name="business-card" />
          <Stack.Screen name="confirm-email" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen name="+not-found" />
        </Stack>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#7c5ce8" />
          </View>
        )}

        <Modal visible={sessionConflict} transparent animationType="fade" onRequestClose={clearSessionConflict}>
          <View style={styles.conflictOverlay}>
            <View style={styles.conflictBox}>
              <Text style={styles.conflictTitle}>Sessão encerrada</Text>
              <Text style={styles.conflictMessage}>
                Sua conta foi acessada em outro dispositivo.
              </Text>
              <TouchableOpacity style={styles.conflictButton} onPress={clearSessionConflict}>
                <Text style={styles.conflictButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <AuthGate />
      </View>
    </View>
  );
}

export default function AppLayout() {
  useFrameworkReady();

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <RootNavigator />
                <EngagementNotificationSync />
                <CookieConsent />
                <ToastContainer />
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  navContainer: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(10,10,26,0.85)',
    zIndex: 999,
  },
  conflictOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  conflictBox: {
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3040',
  },
  conflictTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8d5b7',
    marginBottom: 12,
    textAlign: 'center',
  },
  conflictMessage: {
    fontSize: 15,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  conflictButton: {
    backgroundColor: '#7c5ce8',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  conflictButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
