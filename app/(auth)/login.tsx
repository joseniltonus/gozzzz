import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Mail, Lock, ArrowRight, TriangleAlert } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { AUTH_CONFIG_INCOMPLETE, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setErrorMsg(t('auth.login.errorSupabaseEnv'));
    }
  }, [t]);

  const handleLogin = async () => {
    setErrorMsg('');
    if (!email || !password) {
      setErrorMsg(t('auth.login.errorEmpty'));
      return;
    }

    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        setLoading(false);
        if (error?.message === AUTH_CONFIG_INCOMPLETE) {
          setErrorMsg(t('auth.login.errorSupabaseEnv'));
          return;
        }
        const msg = error?.message?.toLowerCase() ?? '';
        if (msg.includes('email not confirmed') || msg.includes('email_not_confirmed')) {
          setErrorMsg(t('auth.login.errorEmailNotConfirmed'));
        } else if (msg.includes('invalid login credentials') || msg.includes('invalid_credentials') || msg.includes('wrong password')) {
          setErrorMsg(t('auth.login.errorMsg'));
        } else {
          setErrorMsg(error.message || t('auth.login.errorUnexpected'));
        }
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
      setErrorMsg(t('auth.login.errorUnexpected'));
    }
  };

  const handleSignUpNavigation = () => {
    router.replace('/(auth)/signup');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <LinearGradient
        colors={['#07070f', '#0d0d16']}
        style={styles.gradient}
      >
        <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.header}>
            <Moon size={56} color="#d4a96a" />
            <Text style={styles.appName}>
              <Text style={styles.appNameGo}>Go</Text>
              <Text style={styles.appNameZzzz}>Zzzz</Text>
            </Text>
            <Text style={styles.tagline}>{t('auth.tagline')}</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.formTitle}>{t('auth.login.title')}</Text>

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
                placeholder={t('auth.login.email')}
                placeholderTextColor="#5a5a6a"
                value={email}
                onChangeText={(v) => { setErrorMsg(''); setEmail(v); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Lock size={20} color="#d4a96a" />
              </View>
              <TextInput
                style={styles.input}
                placeholder={t('auth.login.password')}
                placeholderTextColor="#5a5a6a"
                value={password}
                onChangeText={(v) => { setErrorMsg(''); setPassword(v); }}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => router.replace('/(auth)/forgot-password')}>
              <Text style={styles.forgotPasswordText}>{t('auth.login.forgot')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? t('auth.login.loading') : t('auth.login.btn')}
              </Text>
              {!loading && <ArrowRight size={20} color="#0d0d16" />}
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{t('auth.login.divider')}</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.signupButton} onPress={handleSignUpNavigation}>
              <Text style={styles.signupButtonText}>{t('auth.login.signup')}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>{t('auth.login.footer')}</Text>
          <Text style={styles.companyName}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
        </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 44,
    fontWeight: '800',
    marginTop: 14,
    marginBottom: 6,
  },
  appNameGo: {
    color: '#ffffff',
  },
  appNameZzzz: {
    color: '#ffffff',
  },
  tagline: {
    fontSize: 15,
    color: '#8892a4',
    fontWeight: '500',
  },
  form: {
    marginBottom: 32,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 169, 106, 0.08)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(212, 169, 106, 0.2)',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#ffffff',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#d4a96a',
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    borderRadius: 12,
    paddingVertical: 18,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d0d16',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(212, 169, 106, 0.15)',
  },
  dividerText: {
    fontSize: 14,
    color: '#8892a4',
    marginHorizontal: 16,
    fontWeight: '600',
  },
  signupButton: {
    backgroundColor: 'rgba(212, 169, 106, 0.1)',
    borderRadius: 12,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: 'rgba(212, 169, 106, 0.3)',
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e8d5b7',
    textAlign: 'center',
  },
  footer: {
    fontSize: 12,
    color: '#4a4a5a',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 4,
  },
  companyName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8892a4',
    textAlign: 'center',
    marginTop: 6,
  },
  companyCnpj: {
    fontSize: 11,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 2,
  },
});
