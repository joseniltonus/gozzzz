import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Mail, Lock, User, ArrowRight, ArrowLeft, Check } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import { AUTH_CONFIG_INCOMPLETE } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useToast } from '@/contexts/ToastContext';
import { storage } from '@/lib/storage';
import SignupSuccessScreen from '@/components/SignupSuccessScreen';
const CHRONO_NAMES: Record<'dolphin' | 'lion' | 'bear' | 'wolf', { pt: string; en: string }> = {
  dolphin: { pt: 'Golfinho', en: 'Dolphin' },
  lion: { pt: 'Leão', en: 'Lion' },
  bear: { pt: 'Urso', en: 'Bear' },
  wolf: { pt: 'Lobo', en: 'Wolf' },
};

const CHRONO_EMOJI: Record<'dolphin' | 'lion' | 'bear' | 'wolf', string> = {
  dolphin: '🐬',
  lion: '🦁',
  bear: '🐻',
  wolf: '🐺',
};

function parseChronoKey(raw?: string | string[]): 'dolphin' | 'lion' | 'bear' | 'wolf' | null {
  const v = (Array.isArray(raw) ? raw[0] : raw)?.trim().toLowerCase() ?? '';
  if (v === 'dolphin' || v === 'golfinho') return 'dolphin';
  if (v === 'lion' || v === 'leão' || v === 'leao') return 'lion';
  if (v === 'bear' || v === 'urso') return 'bear';
  if (v === 'wolf' || v === 'lobo') return 'wolf';
  return null;
}

export default function CadastroScreen() {
  const { t, language } = useLanguage();
  const { showError } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentMarketing, setConsentMarketing] = useState(false);
  const [consentAge, setConsentAge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState('');
  const { signUp } = useAuth();
  const router = useRouter();
  const routeParams = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const chronoKey = parseChronoKey(routeParams.chronotype);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      showError(t('auth.signup.errorEmpty'));
      return;
    }

    if (password !== confirmPassword) {
      showError(t('auth.signup.errorPassword'));
      return;
    }

    if (password.length < 6) {
      showError(t('auth.signup.errorLength'));
      return;
    }

    if (!consentAge) {
      showError(t('auth.signup.errorAge'));
      return;
    }

    if (!consentTerms) {
      showError(t('auth.signup.errorConsent'));
      return;
    }

    setLoading(true);

    try {
      const { error } = await signUp(email, password, fullName, {
        terms: consentTerms,
        privacy: consentTerms,
        marketing: consentMarketing,
      }, language);

      if (error) {
        setLoading(false);
        if ((error as any)?.message === AUTH_CONFIG_INCOMPLETE) {
          showError(t('auth.login.errorSupabaseEnv'));
          return;
        }
        const code = (error as any)?.code;
        const msgLower = (error as any)?.message?.toLowerCase?.() ?? '';
        let msg = t('auth.signup.errorMsg');
        if (code === 'email_already_registered' || msgLower.includes('already registered') || msgLower.includes('already been registered')) {
          msg = language === 'pt'
            ? 'Este e-mail já está cadastrado. Faça login ou recupere sua senha.'
            : 'This email is already registered. Please sign in or recover your password.';
        } else if (code === 'weak_password' || msgLower.includes('password')) {
          msg = language === 'pt'
            ? 'A senha é muito fraca. Use pelo menos 8 caracteres, com letras e números.'
            : 'The password is too weak. Use at least 8 characters with letters and numbers.';
        }
        showError(msg);
      } else {
        await storage.setItem('just_signed_up', 'true');
        setLoading(false);
        setSuccessEmail(email);
        setShowSuccess(true);
      }
    } catch {
      setLoading(false);
      showError(t('auth.login.errorUnexpected'));
    }
  };

  const handleBackToLogin = () => {
    router.replace('/(auth)/login');
  };

  if (showSuccess) {
    return (
      <SignupSuccessScreen
        email={successEmail}
        chronotypeKey={chronoKey ?? undefined}
      />
    );
  }

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
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={styles.content}>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
              <ArrowLeft size={24} color="#e8d5b7" />
            </TouchableOpacity>

            {chronoKey ? (
              <View style={styles.chronoContext}>
                <Text style={styles.chronoEmoji}>{CHRONO_EMOJI[chronoKey]}</Text>
                <Text style={styles.chronoSub}>
                  {language === 'pt'
                    ? `Salve seu resultado e comece seu plano de 21 passos como ${CHRONO_NAMES[chronoKey].pt}.`
                    : `Save your result and start your 21-step plan as a ${CHRONO_NAMES[chronoKey].en}.`}
                </Text>
              </View>
            ) : null}

            <View style={styles.header}>
              <Moon size={56} color="#d4a96a" />
              <Text style={styles.appName}>
                <Text style={styles.appNameGo}>Go</Text>
                <Text style={styles.appNameZzzz}>Zzzz</Text>
              </Text>
              <Text style={styles.tagline}>{t('welcome.tagline')}</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.formTitle}>{t('auth.signup.title')}</Text>

              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <User size={20} color="#d4a96a" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.signup.name')}
                  placeholderTextColor="#5a5a6a"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Mail size={20} color="#d4a96a" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.signup.email')}
                  placeholderTextColor="#5a5a6a"
                  value={email}
                  onChangeText={setEmail}
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
                  placeholder={t('auth.signup.password')}
                  placeholderTextColor="#5a5a6a"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputIcon}>
                  <Lock size={20} color="#d4a96a" />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder={t('auth.signup.confirmPassword')}
                  placeholderTextColor="#5a5a6a"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.benefitsBox}>
                <Text style={styles.benefitsTitle}>{t('auth.signup.benefitsTitle')}</Text>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitBullet}>✓</Text>
                  <Text style={styles.benefitText}>{t('auth.signup.benefit1')}</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitBullet}>✓</Text>
                  <Text style={styles.benefitText}>{t('auth.signup.benefit2')}</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitBullet}>✓</Text>
                  <Text style={styles.benefitText}>{t('auth.signup.benefit3')}</Text>
                </View>
              </View>

              <View style={styles.consentSection}>
                <Text style={styles.consentSectionTitle}>{t('auth.signup.agreements')}</Text>

                <TouchableOpacity
                  style={styles.consentRow}
                  onPress={() => setConsentAge(!consentAge)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, consentAge && styles.checkboxChecked]}>
                    {consentAge && <Check size={14} color="#0d0d16" />}
                  </View>
                  <Text style={styles.consentText}>
                    {t('auth.signup.ageConfirm')}{' '}
                    <Text style={styles.consentRequired}>*</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.consentRow}
                  onPress={() => setConsentTerms(!consentTerms)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, consentTerms && styles.checkboxChecked]}>
                    {consentTerms && <Check size={14} color="#0d0d16" />}
                  </View>
                  <Text style={styles.consentText}>
                    {t('auth.signup.consentTerms')}{' '}
                    <Text style={styles.consentLink} onPress={() => router.replace('/terms')}>
                      {t('auth.signup.termsLabel')}
                    </Text>
                    {' '}{t('auth.signup.consentAnd')}{' '}
                    <Text style={styles.consentLink} onPress={() => router.replace('/privacy')}>
                      {t('auth.signup.privacyLabel')}
                    </Text>
                    {' '}<Text style={styles.consentRequired}>{t('auth.signup.consentRequired')}</Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.consentRow}
                  onPress={() => setConsentMarketing(!consentMarketing)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkbox, consentMarketing && styles.checkboxChecked]}>
                    {consentMarketing && <Check size={14} color="#0d0d16" />}
                  </View>
                  <Text style={styles.consentText}>
                    {t('auth.signup.newsletter')}{' '}
                    <Text style={styles.consentOptional}>{t('auth.signup.optional')}</Text>
                  </Text>
                </TouchableOpacity>

                <Text style={styles.consentNote}>{t('auth.signup.disclaimer')}</Text>
              </View>

              <TouchableOpacity
                style={[styles.signupButton, (loading || !consentTerms || !consentAge) && styles.signupButtonDisabled]}
                onPress={handleSignUp}
                disabled={loading || !consentTerms || !consentAge}
              >
                <Text style={styles.signupButtonText}>
                  {loading ? t('auth.signup.creating') : t('auth.signup.btnFree')}
                </Text>
                {!loading && <ArrowRight size={20} color="#0d0d16" />}
              </TouchableOpacity>

              <TouchableOpacity style={styles.loginLink} onPress={handleBackToLogin}>
                <Text style={styles.loginLinkText}>
                  {t('auth.signup.loginLink')}{' '}
                  <Text style={styles.loginLinkTextBold}>{t('auth.signup.loginLinkBold')}</Text>
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.footer}>{t('auth.signup.footer')}</Text>
            <Text style={styles.companyName}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
            <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212, 169, 106, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  chronoContext: {
    marginBottom: 24,
    alignItems: 'center',
  },
  chronoEmoji: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 8,
  },
  chronoSub: {
    fontSize: 13,
    color: '#8b92b8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    fontSize: 40,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  appNameGo: {
    color: '#ffffff',
  },
  appNameZzzz: {
    color: '#ffffff',
  },
  tagline: {
    fontSize: 16,
    color: '#8892a4',
    fontWeight: '500',
  },
  form: {
    flex: 1,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 169, 106, 0.08)',
    borderRadius: 12,
    marginBottom: 12,
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
  benefitsBox: {
    backgroundColor: 'rgba(212, 169, 106, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 169, 106, 0.25)',
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#d4a96a',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  benefitBullet: {
    fontSize: 16,
    color: '#d4a96a',
    marginRight: 8,
    fontWeight: '700',
  },
  benefitText: {
    flex: 1,
    fontSize: 13,
    color: '#8892a4',
    lineHeight: 18,
  },
  consentSection: {
    backgroundColor: 'rgba(212, 169, 106, 0.06)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(212, 169, 106, 0.15)',
  },
  consentSectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8892a4',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 14,
  },
  consentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#3a3a52',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#d4a96a',
    borderColor: '#d4a96a',
  },
  consentText: {
    flex: 1,
    fontSize: 13,
    color: '#8892a4',
    lineHeight: 19,
  },
  consentLink: {
    color: '#d4a96a',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  consentOptional: {
    color: '#4a4a5a',
    fontStyle: 'italic',
  },
  consentRequired: {
    color: '#ef4444',
  },
  consentNote: {
    fontSize: 11,
    color: '#4a4a5a',
    lineHeight: 16,
    marginTop: 4,
  },
  signupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: 16,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  signupButtonDisabled: {
    opacity: 0.5,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d0d16',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginLinkText: {
    fontSize: 14,
    color: '#8892a4',
  },
  loginLinkTextBold: {
    fontWeight: '700',
    color: '#d4a96a',
  },
  footer: {
    fontSize: 12,
    color: '#4a4a5a',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 20,
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
