import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

const isWeb = Platform.OS === 'web';
const BG = '#070B18';
const CTA = '#6B68E0';

function ResearchersBlock() {
  const { language } = useLanguage();
  const label = language === 'pt' ? 'Fundamentado em pesquisas de:' : 'Grounded in research by:';
  const researchers = [
    { name: 'Walker' },
    { name: 'Breus' },
    { name: 'Huberman' },
    { name: 'Czeisler' },
  ];

  return (
    <View style={researcherStyles.container}>
      <Text style={researcherStyles.label}>{label}</Text>
      <View style={researcherStyles.namesRow}>
        {researchers.map((r, i) => (
          <View key={i} style={researcherStyles.nameWrapper}>
            <Text style={researcherStyles.nameText}>{r.name}</Text>
            {i < researchers.length - 1 && (
              <Text style={researcherStyles.separator}>·</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const researcherStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  label: {
    fontSize: 11,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 4,
  },
  namesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  separator: {
    fontSize: 11,
    color: '#666666',
    fontWeight: '700',
  },
});

function Star({ size, opacity }: { size: number; opacity: number }) {
  const halfSize = size / 2;
  const innerRadius = size * 0.35;
  const outerRadius = halfSize;

  return (
    <View
      style={{
        width: size,
        height: size,
        opacity,
      }}
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 0,
            height: 0,
            borderLeftWidth: innerRadius,
            borderRightWidth: innerRadius,
            borderBottomWidth: outerRadius * 0.7,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'white',
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeftWidth: innerRadius,
            borderRightWidth: innerRadius,
            borderTopWidth: outerRadius * 0.7,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderTopColor: 'white',
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderTopWidth: innerRadius,
            borderBottomWidth: innerRadius,
            borderRightWidth: outerRadius * 0.7,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderRightColor: 'white',
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderTopWidth: innerRadius,
            borderBottomWidth: innerRadius,
            borderLeftWidth: outerRadius * 0.7,
            borderTopColor: 'transparent',
            borderBottomColor: 'transparent',
            borderLeftColor: 'white',
          }}
        />
      </View>
    </View>
  );
}

function CrescentMoon({ size }: { size: number }) {
  return (
    <View
      style={[
        moonStyles.wrapper,
        { width: size, height: size },
      ]}
    >
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        <View
          style={{
            position: 'absolute',
            width: size * 0.65,
            height: size * 0.65,
            borderRadius: size * 0.325,
            backgroundColor: CTA,
            left: size * 0.175,
            top: size * 0.175,
            transform: [{ rotateZ: '-30deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: size * 0.55,
            height: size * 0.55,
            borderRadius: size * 0.275,
            backgroundColor: BG,
            left: size * 0.31,
            top: size * 0.24,
            transform: [{ rotateZ: '-30deg' }],
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: size * 0.67,
            top: size * 0.04,
          }}
        >
          <Star size={size * 0.15} opacity={0.95} />
        </View>
        <View
          style={{
            position: 'absolute',
            left: size * 0.05,
            top: size * 0.68,
          }}
        >
          <Star size={size * 0.09} opacity={0.75} />
        </View>
        <View
          style={{
            position: 'absolute',
            left: size * 0.81,
            top: size * 0.43,
          }}
        >
          <Star size={size * 0.06} opacity={0.6} />
        </View>
      </View>
    </View>
  );
}

const moonStyles = StyleSheet.create({
  wrapper: {
    ...(isWeb
      ? ({ filter: 'drop-shadow(0 0 22px rgba(107,104,224,0.6))' } as any)
      : {
          shadowColor: CTA,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.7,
          shadowRadius: 22,
        }),
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();

  const moonSize = Math.max(Math.min(Math.round(width * 0.35), 140), 70);

  return (
    <SafeAreaView style={styles.root}>
      <ExpoStatusBar style="light" />
      <View
        style={[
          styles.inner,
          isWeb && ({
            maxWidth: 420,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
            height: '100%',
          } as any),
        ]}
      >
        <CrescentMoon size={moonSize} />

        <View style={styles.logoSection}>
          <Text style={styles.logoText}>
            <Text style={styles.logoGo}>Go</Text>
            <Text style={styles.logoZzzz}>Zzzz</Text>
          </Text>
        </View>

        <View style={styles.contentSection}>
          <Text style={styles.headlineWhite}>{t('onboarding.headline1')}</Text>
          <Text style={styles.headlineAccent}>{t('onboarding.headline2')}</Text>
          <Text style={styles.subheadline}>{t('onboarding.subheadline')}</Text>
        </View>

        <ResearchersBlock />

        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/signup')}
            activeOpacity={0.85}
            style={[styles.ctaButton, isWeb && (styles.ctaButtonWeb as any)]}
          >
            <Text style={styles.ctaText}>Começar — 3 etapas gratuitas</Text>
          </TouchableOpacity>

          <Text style={styles.subtextCta}>
            21 etapas guiadas para melhorar seu sono
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/(auth)/login')}
            activeOpacity={0.75}
            style={[styles.loginButton, isWeb && (styles.loginButtonWeb as any)]}
          >
            <Text style={styles.loginButtonText}>{t('onboarding.login')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#070B18',
    ...(isWeb ? ({ height: '100dvh' } as any) : {}),
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  logoSection: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: 0.4,
    color: '#F5F5F5',
  },
  logoGo: {
    color: '#F5F5F5',
  },
  logoZzzz: {
    color: '#F5F5F5',
  },
  contentSection: {
    alignItems: 'center',
    width: '100%',
    gap: 8,
  },
  headlineWhite: {
    fontSize: 22,
    fontWeight: '700',
    color: '#EDEFFF',
    textAlign: 'center',
    lineHeight: 28,
  },
  headlineAccent: {
    fontSize: 22,
    fontWeight: '700',
    color: '#7B78E8',
    textAlign: 'center',
    lineHeight: 28,
  },
  subheadline: {
    fontSize: 13,
    color: '#7A8195',
    textAlign: 'center',
    lineHeight: 19,
  },
  bottomSection: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  ctaButton: {
    width: '100%',
    minHeight: 44,
    borderRadius: 32,
    backgroundColor: '#6B68E0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#6B68E0',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 8,
  },
  ctaButtonWeb: {
    boxShadow: '0 6px 20px rgba(107, 104, 224, 0.45)',
  } as any,
  ctaText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.15,
    textAlign: 'center',
  },
  loginButton: {
    width: '100%',
    minHeight: 44,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#6B68E0',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  loginButtonWeb: {
    transition: 'all 0.3s ease',
  } as any,
  loginButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B68E0',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  subtextCta: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});
