import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, CircleAlert as AlertCircle, ArrowRight } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';

export default function ConfirmEmailScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const { t } = useLanguage();

  const confirmEmail = useCallback(async () => {
    try {
      if (!token || typeof token !== 'string') {
        setStatus('error');
        setMessage(t('auth.confirm.errorInvalid'));
        return;
      }

      const response = await fetch(`${SUPABASE_URL}/functions/v1/confirm-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        setStatus('error');
        setMessage(`Error response: ${response.status}`);
        return;
      }

      if (!response.ok || result.error) {
        setStatus('error');
        setMessage(result.error || t('auth.confirm.errorGeneric'));
        return;
      }

      setStatus('success');
      setMessage(result.message || t('auth.confirm.successMsg'));
    } catch (err) {
      console.error('Error confirming email:', err);
      setStatus('error');
      setMessage(t('auth.confirm.errorFinal'));
    }
  }, [token, t]);

  useEffect(() => {
    confirmEmail();
  }, [confirmEmail]);

  const handleContinue = () => {
    if (status === 'success') {
      router.replace('/(auth)/login');
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#09061a', '#130b2e']} style={styles.gradient}>
        <View style={styles.content}>
          {status === 'loading' && (
            <>
              <ActivityIndicator size="large" color="#10b981" />
              <Text style={styles.loadingText}>{t('auth.confirm.loadingText')}</Text>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircle size={80} color="#10b981" strokeWidth={1.5} />
              <Text style={styles.title}>{t('auth.confirm.title')}</Text>
              <Text style={styles.message}>{message}</Text>
              <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>{t('auth.confirm.button')}</Text>
                <ArrowRight size={20} color="#ffffff" />
              </TouchableOpacity>
            </>
          )}

          {status === 'error' && (
            <>
              <AlertCircle size={80} color="#ef4444" strokeWidth={1.5} />
              <Text style={styles.title}>{t('auth.confirm.errorTitle')}</Text>
              <Text style={styles.message}>{message}</Text>
              <TouchableOpacity style={[styles.button, styles.buttonError]} onPress={handleContinue}>
                <Text style={styles.buttonText}>{t('auth.confirm.errorButton')}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  loadingText: {
    fontSize: 16,
    color: '#9988bb',
    marginTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#9988bb',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    minWidth: 200,
  },
  buttonError: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
});
