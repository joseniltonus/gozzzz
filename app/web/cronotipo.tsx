import { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  Pressable,
  Animated as RNAnimated,
  PixelRatio,
  type TextProps,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import AnimatedRN, {
  Easing,
  FadeIn,
  SlideInUp,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  CHRONOTYPE_EXP_KEYS,
  getChronotypeExperience,
  type ChronotypeExpKey,
} from '@/data/chronotypesExperience';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import CronotipoPremiumBackground from '@/components/web/CronotipoPremiumBackground';

const isWeb = Platform.OS === 'web';
const OG_IMAGE = 'https://gozzzz.app/og-image.png';

/** Props de texto consistentes (Android: sem padding extra; iOS/Android: escala máx. do sistema). */
function textFine(overrides: Partial<TextProps> = {}): TextProps {
  return {
    maxFontSizeMultiplier: 1.35,
    ...(Platform.OS === 'android' ? ({ includeFontPadding: false } as TextProps) : {}),
    ...overrides,
  };
}

const ReanimatedPressable = AnimatedRN.createAnimatedComponent(Pressable);

function HeroCta({ label, onPress }: { label: string; onPress: () => void }) {
  const scale = useSharedValue(1);
  const glow = useSharedValue(0.34);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(0.52, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.3, { duration: 1800, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const btnStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.ctaWrap}>
      <AnimatedRN.View style={[styles.ctaGlow, glowStyle]} pointerEvents="none" />
      <ReanimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.97, { damping: 16, stiffness: 380 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 14, stiffness: 320 });
        }}
        style={[styles.heroCtaOuter, btnStyle, isWeb && ({ cursor: 'pointer' } as object)]}
        hitSlop={12}
      >
        <LinearGradient
          colors={['#a855f7', '#6366f1', '#2563eb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.heroCtaGrad, { minHeight: PixelRatio.roundToNearestPixel(52) }]}
        >
          <Text style={styles.heroCtaText} {...textFine()}>
            {label}
          </Text>
          <ArrowRight size={20} color="#f8fafc" strokeWidth={2.2} />
        </LinearGradient>
      </ReanimatedPressable>
    </View>
  );
}

export default function CronotipoLandingPage() {
  const router = useRouter();
  const { language } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isWide = width >= 640;
  const pt = language === 'pt';
  const scrollY = useRef(new RNAnimated.Value(0)).current;
  const heroTitleSize = width >= 400 ? 28 : 24;

  const heroTitle = pt
    ? 'Você acorda cansado mesmo dormindo 8 horas?'
    : 'You wake up tired even after 8 hours of sleep?';
  const heroSub = pt
    ? 'Descubra em 60 segundos seu cronotipo biológico'
    : 'Discover your biological chronotype in 60 seconds';
  const ctaQuiz = pt ? 'Fazer o teste grátis' : 'Take the free test';
  const trust = pt ? 'Gratuito • 60 segundos • Sem cadastro' : 'Free • 60 seconds • No sign-up';
  const sciTitle = pt ? 'Baseado em ciência do sono' : 'Grounded in sleep science';
  const sciLine = pt
    ? 'Cronobiologia • Ritmo circadiano • Arquitetura do sono • Melatonina'
    : 'Chronobiology • Circadian rhythm • Sleep architecture • Melatonin';
  const sciNote = pt
    ? 'Inspirado em pesquisas de Matthew Walker, Michael Breus e Andrew Huberman.'
    : 'Inspired by research from Matthew Walker, Michael Breus, and Andrew Huberman.';
  const value = pt ? 'Reprograme o seu sono em 21 dias' : 'Reset your sleep in 21 days';
  const ctaFinal = pt ? 'Começar grátis' : 'Start free';
  const gridTitle = pt ? 'Os quatro perfis' : 'The four profiles';

  const ogTitle = pt ? 'Descubra seu cronótipo — GoZzzz' : 'Discover your chronotype — GoZzzz';
  const ogDesc = pt ? 'Entenda por que você não dorme bem' : 'Understand why you are not sleeping well';

  const sciOpacity = scrollY.interpolate({
    inputRange: [80, 260],
    outputRange: [0.45, 1],
    extrapolate: 'clamp',
  });

  return (
    <>
      <Head>
        <title>{ogTitle}</title>
        <meta name="description" content={ogDesc} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDesc} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:url" content="https://gozzzz.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDesc} />
        <meta name="twitter:image" content={OG_IMAGE} />
        <link rel="canonical" href="https://gozzzz.app/web/cronotipo" />
      </Head>
      <SafeAreaView style={styles.page} edges={['top', 'left', 'right']}>
        <CronotipoPremiumBackground scrollY={scrollY} />
        <RNAnimated.ScrollView
          contentContainerStyle={[
            styles.pageInner,
            { paddingBottom: PixelRatio.roundToNearestPixel(56 + Math.max(insets.bottom, 8)) },
          ]}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={!isWeb}
          overScrollMode="never"
          onScroll={RNAnimated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })}
        >
          <View style={styles.topBar}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.brandTap}>
              <GozzzzWordmark size="sm" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.back} hitSlop={10}>
              <Text style={styles.backText} {...textFine()}>
                {pt ? 'Início' : 'Home'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroBlock}>
            <AnimatedRN.View entering={FadeIn.duration(520).delay(40)}>
              <AnimatedRN.View entering={SlideInUp.duration(480).delay(40)}>
                <Text
                  style={[styles.heroTitle, { fontSize: heroTitleSize, lineHeight: heroTitleSize + 8 }]}
                  {...textFine()}
                >
                  {heroTitle}
                </Text>
              </AnimatedRN.View>
            </AnimatedRN.View>
            <AnimatedRN.View entering={FadeIn.duration(480).delay(120)}>
              <Text style={styles.heroSub} {...textFine()}>
                {heroSub}
              </Text>
            </AnimatedRN.View>
            <AnimatedRN.View entering={FadeIn.duration(500).delay(200)}>
              <HeroCta label={ctaQuiz} onPress={() => router.push('/(auth)/quiz')} />
            </AnimatedRN.View>
            <AnimatedRN.View entering={FadeIn.duration(420).delay(280)}>
              <Text style={styles.trust} {...textFine()}>
                {trust}
              </Text>
            </AnimatedRN.View>
          </View>

          <RNAnimated.View style={[styles.sciBlock, { opacity: sciOpacity }]}>
            <Text style={styles.sciTitle} {...textFine()}>
              {sciTitle}
            </Text>
            <Text style={styles.sciLine} {...textFine()}>
              {sciLine}
            </Text>
            <Text style={styles.sciNote} {...textFine()}>
              {sciNote}
            </Text>
          </RNAnimated.View>

          <Text style={styles.sectionLabel} {...textFine()}>
            {gridTitle}
          </Text>
          <View style={[styles.grid, isWide && styles.gridWide]}>
            {CHRONOTYPE_EXP_KEYS.map((k: ChronotypeExpKey) => {
              const b = getChronotypeExperience(k, pt ? 'pt' : 'en');
              return (
                <LinearGradient
                  key={k}
                  colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)']}
                  style={[styles.card, isWide && styles.cardWide]}
                >
                  <Text
                    style={styles.cardEmoji}
                    {...textFine({ maxFontSizeMultiplier: 1.2, allowFontScaling: false })}
                  >
                    {b.emoji}
                  </Text>
                  <Text style={styles.cardName} {...textFine()}>
                    {b.name}
                  </Text>
                  <Text style={styles.cardLine} {...textFine()}>
                    {b.landingTagline}
                  </Text>
                </LinearGradient>
              );
            })}
          </View>

          <View style={styles.valueBox}>
            <Text style={styles.valueText} {...textFine()}>
              {value}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.finalCta}
            onPress={() => router.push('/(auth)/quiz')}
            activeOpacity={0.92}
            hitSlop={6}
          >
            <LinearGradient
              colors={['#a855f7', '#4f46e5', '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.finalCtaGrad, { minHeight: PixelRatio.roundToNearestPixel(52) }]}
            >
              <Text style={styles.finalCtaText} {...textFine()}>
                {ctaFinal}
              </Text>
              <ArrowRight size={20} color="#f8fafc" strokeWidth={2.2} />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footerMark}>
            <GozzzzWordmark size="sm" />
            <Text style={styles.footerBrand} {...textFine()}>
              gozzzz.app
            </Text>
          </View>
        </RNAnimated.ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },
  pageInner: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: isWeb ? 24 : 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
  },
  brandTap: { paddingVertical: 4 },
  back: { paddingVertical: 6, paddingHorizontal: 10 },
  backText: { color: 'rgba(248,250,252,0.65)', fontWeight: '600', fontSize: 14 },
  heroBlock: {
    marginBottom: 32,
    paddingTop: 8,
  },
  heroTitle: {
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 14,
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  heroSub: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  ctaWrap: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  ctaGlow: {
    position: 'absolute',
    left: -12,
    right: -12,
    top: -10,
    bottom: -10,
    borderRadius: 22,
    backgroundColor: '#6366f1',
    opacity: 0.45,
  },
  heroCtaOuter: {
    borderRadius: 18,
    overflow: 'hidden',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 12px 40px rgba(79,70,229,0.45)' } as object)
      : {
          shadowColor: '#6366f1',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.45,
          shadowRadius: 20,
          elevation: 12,
        }),
  },
  heroCtaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 18,
  },
  heroCtaText: { fontSize: 16, fontWeight: '800', color: '#f8fafc', letterSpacing: 0.2 },
  trust: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 0.2,
  },
  sciBlock: {
    marginBottom: 32,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  sciTitle: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
  },
  sciLine: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: '500',
  },
  sciNote: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
  },
  grid: { gap: 12, marginBottom: 28 },
  gridWide: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  card: {
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    width: '100%',
  },
  cardWide: {
    width: '47%',
    flexGrow: 1,
    maxWidth: 340,
    minWidth: 260,
  },
  cardEmoji: { fontSize: 34, marginBottom: 6, textAlign: 'center' },
  cardName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#f1f5f9',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardLine: { fontSize: 13, color: 'rgba(248,250,252,0.65)', textAlign: 'center', fontWeight: '500' },
  valueBox: {
    backgroundColor: 'rgba(99,102,241,0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(99,102,241,0.22)',
    marginBottom: 22,
  },
  valueText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(224,231,255,0.95)',
    textAlign: 'center',
    lineHeight: 26,
  },
  finalCta: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 28,
    alignSelf: 'stretch',
  },
  finalCtaGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    borderRadius: 18,
  },
  finalCtaText: { fontSize: 16, fontWeight: '800', color: '#f8fafc' },
  footerMark: {
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  footerBrand: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.5)',
    letterSpacing: 2,
  },
});
