import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Moon } from 'lucide-react-native';
import Svg, { Path } from 'react-native-svg';

function StarIcon({ size = 12, color = '#FFFFFF' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color} />
    </Svg>
  );
}

export default function OnboardingScreen() {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/(auth)/signup');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.moonSection}>
        <View style={styles.glowWrapper}>
          <View style={styles.glow} />
          <View style={styles.moonContainer}>
            <Moon
              size={90}
              color="#7B78FF"
              strokeWidth={1.5}
              style={styles.moon}
            />
            <View style={[styles.star, styles.star1]}>
              <StarIcon size={16} color="#FFFFFF" />
            </View>
            <View style={[styles.star, styles.star2]}>
              <StarIcon size={10} color="#AAAACC" />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.logoSection}>
        <Text style={styles.logo}>GoZzzz</Text>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.headlineSection}>
          <Text style={styles.headlineWhite}>Sono profundo.</Text>
          <Text style={styles.headlineWhite}>De forma consistente.</Text>
        </View>

        <Text style={styles.subheadline}>
          Ciência do sono, aplicada à sua rotina.
        </Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={handleSignup}
          activeOpacity={0.85}
          style={styles.ctaWrapper}
        >
          <LinearGradient
            colors={['#7B78FF', '#9B8FFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <View style={styles.ctaInner}>
              <View style={styles.ctaIconWrapper}>
                <StarIcon size={18} color="#FFFFFF" />
              </View>
              <Text style={styles.ctaButtonText}>
                Começar — acesso gratuito por 3 dias
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleLogin}
          activeOpacity={0.7}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>Entrar na minha conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080C1A',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 24,
  },
  moonSection: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  glowWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  glow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(100, 90, 255, 0.18)',
    shadowColor: '#6B65FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 60,
    elevation: 20,
  },
  moonContainer: {
    position: 'relative',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moon: {
    transform: [{ rotate: '15deg' }],
  },
  star: {
    position: 'absolute',
  },
  star1: {
    top: 8,
    right: 4,
  },
  star2: {
    bottom: 16,
    left: 8,
  },
  logoSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 28,
  },
  logo: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#F5F5F5',
  },
  contentSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  headlineSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  headlineWhite: {
    fontSize: 36,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 12,
  },
  headlineAccent: {
    fontSize: 26,
    fontWeight: '600',
    color: '#7B78FF',
    textAlign: 'center',
    lineHeight: 32,
  },
  subheadline: {
    fontSize: 16,
    color: '#8892A4',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16,
  },
  bottomSection: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 48,
    gap: 24,
    alignItems: 'center',
  },
  ctaWrapper: {
    width: '100%',
    shadowColor: '#7B78FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  ctaGradient: {
    borderRadius: 50,
    height: 62,
    overflow: 'hidden',
  },
  ctaInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
  },
  ctaIconWrapper: {
    opacity: 0.9,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  loginLinkText: {
    fontSize: 15,
    color: '#8892A4',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
