import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeIn, Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { useLanguage } from '@/contexts/LanguageContext';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import { CHRONOTYPE_EXP_KEYS, getChronotypeExperience, type ChronotypeExpKey } from '@/data/chronotypesExperience';

const isWeb = Platform.OS === 'web';

/** Estrelas mínimas (pontos), posições fixas — sem ruído visual. */
const STARFIELD = [
  [8, 12, 0.35, 1.5],
  [22, 28, 0.25, 1],
  [78, 8, 0.3, 1.2],
  [88, 42, 0.22, 1],
  [14, 55, 0.28, 1.3],
  [92, 68, 0.2, 1.1],
  [45, 18, 0.32, 1.4],
  [62, 32, 0.26, 1],
  [33, 72, 0.24, 1.2],
  [70, 58, 0.3, 1],
] as const;

type Props = {
  /** Scroll vertical da página (web) para parallax suave. */
  scrollY: number;
};

/**
 * Funil premium cronótipo (web): hero + grelha + valor + CTA.
 * React Native + Reanimated (equivalente a Framer Motion no web).
 */
export default function ChronotypePremiumWebFunnel({ scrollY }: Props) {
  const { t, language } = useLanguage();
  const locale = language === 'pt' ? 'pt' : 'en';
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [ctaHover, setCtaHover] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  const ctaScale = ctaPressed ? 0.97 : ctaHover && isWeb ? 1.05 : 1;
  const [scienceVisible, setScienceVisible] = useState(false);
  const glow = useSharedValue(0.35);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(0.55, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.35, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const parallaxStars = useMemo(
    () => ({
      transform: [{ translateY: isWeb ? scrollY * 0.08 : 0 }],
    }),
    [scrollY],
  );

  useEffect(() => {
    if (scrollY > 80) setScienceVisible(true);
  }, [scrollY]);

  const goQuiz = () => router.push('/(auth)/signup');
  const goProgram = () => router.push('/web/programa');

  const cardBasis = width >= 640 ? '48%' : '100%';
  const maxCardW = width >= 900 ? 200 : 180;

  const shellExtra = isWeb ? ({ minHeight: '88vh' } as object) : { minHeight: 560 };

  return (
    <LinearGradient colors={['#0a0e1a', '#12102a', '#0f0822']} style={[styles.shell, shellExtra]}>
      <Animated.View style={[styles.starsWrap, parallaxStars]} pointerEvents="none">
        {STARFIELD.map(([x, y, o, s], i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: `${x}%`,
                top: `${y}%`,
                opacity: o,
                width: s,
                height: s,
                borderRadius: s,
              },
            ]}
          />
        ))}
      </Animated.View>

      <View style={styles.inner}>
        <View style={styles.wordmarkWrap}>
          <GozzzzWordmark size="sm" />
        </View>

        <Animated.View entering={FadeInDown.duration(520).delay(40).springify()} style={styles.heroCopy}>
          <Text style={styles.headline}>{t('web.chronoPremium.heroHeadline')}</Text>
          <Text style={styles.subhead}>{t('web.chronoPremium.heroSub')}</Text>
        </Animated.View>

        <View style={styles.ctaBlock}>
          <Pressable
            onPress={goQuiz}
            onPressIn={() => setCtaPressed(true)}
            onPressOut={() => setCtaPressed(false)}
            {...(isWeb
              ? ({
                  onMouseEnter: () => setCtaHover(true),
                  onMouseLeave: () => {
                    setCtaHover(false);
                    setCtaPressed(false);
                  },
                } as object)
              : {})}
            style={[styles.ctaOuter, { transform: [{ scale: ctaScale }] }]}
          >
            <Animated.View style={[styles.ctaGlow, glowStyle]} />
            <LinearGradient
              colors={['#9333ea', '#6366f1', '#0ea5e9']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGrad}
            >
              <Text style={styles.ctaText}>{t('web.chronoPremium.ctaQuiz')}</Text>
            </LinearGradient>
          </Pressable>
          <Text style={styles.trust}>{t('web.chronoPremium.trustLine')}</Text>
        </View>

        {scienceVisible ? (
          <Animated.View entering={FadeIn.duration(480)} style={styles.science}>
            <Text style={styles.scienceTitle}>{t('web.chronoPremium.scienceTitle')}</Text>
            <Text style={styles.scienceBullets}>{t('web.chronoPremium.scienceBullets')}</Text>
            <Text style={styles.scienceFoot}>{t('web.chronoPremium.scienceFoot')}</Text>
          </Animated.View>
        ) : (
          <View style={styles.sciencePlaceholder} />
        )}

        <Text style={styles.gridLabel}>{t('web.chronoPremium.gridLabel')}</Text>
        <View style={[styles.grid, { gap: width >= 640 ? 14 : 12 }]}>
          {CHRONOTYPE_EXP_KEYS.map((key: ChronotypeExpKey) => {
            const b = getChronotypeExperience(key, locale);
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                style={[styles.gridCard, { flexBasis: cardBasis, maxWidth: maxCardW }]}
                onPress={() => router.push('/web/assinar')}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)']}
                  style={styles.gridCardInner}
                >
                  <Text style={styles.gridEmoji}>{b.emoji}</Text>
                  <Text style={styles.gridName} numberOfLines={2}>
                    {b.name}
                  </Text>
                  <Text style={styles.gridTag} numberOfLines={2}>
                    {b.landingTagline}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.valueBlock}>
          <Text style={styles.valueTitle}>{t('web.chronoPremium.valueTitle')}</Text>
          <TouchableOpacity style={styles.valueCta} onPress={goQuiz} activeOpacity={0.9}>
            <LinearGradient colors={['#7c3aed', '#4f46e5', '#0284c7']} style={styles.valueCtaGrad}>
              <Text style={styles.valueCtaText}>{t('web.chronoPremium.ctaStartFree')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goProgram} style={styles.valueLink}>
            <Text style={styles.valueLinkText}>{t('web.chronoPremium.linkProgram')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: {
    paddingBottom: 48,
    overflow: 'hidden',
  },
  starsWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#e2e8f0',
  },
  inner: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  wordmarkWrap: {
    alignItems: 'center',
    marginBottom: 28,
  },
  heroCopy: {
    marginBottom: 28,
  },
  headline: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 14,
  },
  subhead: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  ctaBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  ctaOuter: {
    borderRadius: 22,
    overflow: 'visible',
    alignSelf: 'stretch',
    maxWidth: 400,
    width: '100%',
  },
  ctaGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 26,
    backgroundColor: '#6366f1',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    zIndex: 0,
  },
  ctaGrad: {
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    zIndex: 1,
    ...(isWeb
      ? ({
          boxShadow: '0 12px 40px rgba(79,70,229,0.45)',
        } as object)
      : {}),
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.2,
  },
  trust: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  sciencePlaceholder: { height: 8 },
  science: {
    marginBottom: 36,
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  scienceTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: 'rgba(255,255,255,0.7)',
    textTransform: 'uppercase',
    marginBottom: 8,
    textAlign: 'center',
  },
  scienceBullets: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.65)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 10,
  },
  scienceFoot: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.58)',
    textAlign: 'center',
    lineHeight: 18,
    fontStyle: 'italic',
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'rgba(148,163,184,0.85)',
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
  },
  gridCard: {
    flexGrow: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  gridCardInner: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    minHeight: 140,
  },
  gridEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  gridName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  gridTag: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.95)',
    lineHeight: 16,
  },
  valueBlock: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 8,
  },
  valueTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: -0.4,
  },
  valueCta: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'stretch',
    maxWidth: 360,
    width: '100%',
    marginBottom: 12,
  },
  valueCtaGrad: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  valueCtaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  valueLink: {
    paddingVertical: 8,
  },
  valueLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.95)',
    textDecorationLine: 'underline',
  },
});
