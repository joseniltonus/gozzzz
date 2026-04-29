import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

interface SignupSuccessScreenProps {
  email: string;
}

export default function SignupSuccessScreen({ email }: SignupSuccessScreenProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const handleLogin = () => {
    router.replace('/(auth)/login');
  };

  return (
    <>
      <View style={styles.container}>
        <LinearGradient colors={['#09061a', '#130b2e']} style={styles.gradient}>
          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <CheckCircle size={80} color="#10b981" strokeWidth={1.5} />
            </View>

            <Text style={styles.title}>{t('auth.success.title')}</Text>

            <View style={styles.messageBox}>
              <Text style={styles.mainMessage}>
                {t('auth.success.message')}
              </Text>
              <Text style={styles.subMessage}>
                {t('auth.success.accessWith')}
              </Text>
              <Text style={styles.emailText}>{email}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>{t('auth.success.button')}</Text>
              <ArrowRight size={20} color="#0d0d16" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
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
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#10b981',
    marginBottom: 24,
    textAlign: 'center',
  },
  messageBox: {
    width: '100%',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)',
    alignItems: 'center',
  },
  mainMessage: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 26,
  },
  subMessage: {
    fontSize: 14,
    color: '#8892a4',
    textAlign: 'center',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4a96a',
    textAlign: 'center',
  },
  button: {
    width: '100%',
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
  buttonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0d0d16',
  },
});
