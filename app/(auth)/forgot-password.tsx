import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Mail, ArrowLeft, CircleCheck as CheckCircle, TriangleAlert } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();
  const { t } = useLanguage();

  const handleSubmit = async () => {
    setErrorMsg('');
    if (!email.trim()) {
      setErrorMsg(t('auth.forgot.errorEmail'));
      return;
    }

    setLoading(true);
    try {
      const origin = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.origin : 'https://gozzzz.app';
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${origin}/reset-password`,
      });
      if (error) {
        setErrorMsg(error.message || t('auth.forgot.errorGeneric'));
        return;
      }

      setSent(true);
    } catch {
      setErrorMsg(t('auth.forgot.errorGeneric'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient colors={['#07070f', '#0d0d16']} style={styles.gradient}>
        <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
        <View style={styles.content}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/(auth)/login')}>
            <ArrowLeft size={20} color="#d4a96a" />
            <Text style={styles.backButtonText}>{t('auth.forgot.backButton')}</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <Moon size={56} color="#d4a96a" />
            <Text style={styles.appName}>GoZzzz</Text>
          </View>

          {sent ? (
            <View style={styles.successContainer}>
              <CheckCircle size={56} color="#d4a96a" style={styles.successIcon} />
              <Text style={styles.successTitle}>{t('auth.forgot.successTitle')}</Text>
              <Text style={styles.successMessage}>
                {t('auth.forgot.successMsg')}
              </Text>
              <TouchableOpacity style={styles.returnButton} onPress={() => router.replace('/(auth)/login')}>
                <Text style={styles.returnButtonText}>{t('auth.forgot.returnButton')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <Text style={styles.formTitle}>{t('auth.forgot.title')}</Text>
              <Text style={styles.formSubtitle}>
                {t('auth.forgot.subtitle')}
              </Text>

              {errorMsg ? (
                <View style={styles.errorBanner}>
                  <TriangleAlert size={16} color="#ef4444" />
                  <Text style={styles.errorBannerText}>{errorMsg}</Text>
                </View>
              ) : null}

              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Mail size={20} color="#d4a96a" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.forgot.placeholder')}
                  placeholderTextColor="#5a5a6a"
                  value={email}
                  onChangeText={(v) => { setErrorMsg(''); setEmail(v); }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <TouchableOpacity
                style={[styles.submitButton, loading && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? t('auth.forgot.sending') : t('auth.forgot.btnSend')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.companyFooter}>
            <Text style={styles.companyFooterName}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
            <Text style={styles.companyFooterCnpj}>CNPJ: 66.059.212/0001-52</Text>
          </View>
        </View>
        </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 32,
  },
  backButtonText: {
    fontSize: 15,
    color: '#d4a96a',
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  formSubtitle: {
    fontSize: 15,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 23,
    marginBottom: 32,
    fontWeight: '500',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.25)',
  },
  errorBannerText: {
    flex: 1,
    fontSize: 14,
    color: '#ef4444',
    fontWeight: '500',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 169, 106, 0.08)',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 169, 106, 0.2)',
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#d4a96a',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#09061a',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: { marginBottom: 24 },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 15,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    fontWeight: '500',
  },
  returnButton: {
    backgroundColor: 'rgba(212, 169, 106, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: 'rgba(212, 169, 106, 0.3)',
  },
  returnButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e8d5b7',
  },
  companyFooter: {
    alignItems: 'center',
    paddingTop: 24,
    marginTop: 16,
  },
  companyFooterName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8892a4',
    textAlign: 'center',
  },
  companyFooterCnpj: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
});
