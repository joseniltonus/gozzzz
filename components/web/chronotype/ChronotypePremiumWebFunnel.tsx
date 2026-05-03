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
import MaskedView from '@react-native-masked-view/masked-view';
import { useRouter } from 'expo-router';
import Animated, {
  FadeInDown,
  FadeIn,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Brain } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import { CHRONOTYPE_EXP_KEYS, getChronotypeExperience, type ChronotypeExpKey } from '@/data/chronotypesExperience';

const isWeb = Platform.OS === 'web';

const HERO_MAX = 420;

/** Estrelas discretas, baixa opacidade (spec: sparse, subtle). */
const STARFIELD = [
  [10, 14, 0.18, 1.2],
  [82, 22, 0.15, 1],
  [48, 8, 0.12, 1.4],
  [24, 62, 0.14, 1],
  [90, 55, 0.16, 1.1],
  [16, 38, 0.1, 1],
] as const;

type Props = {
  scrollY: number;
};

const webFont =
  Platform.OS === 'web'
    ? ({ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' } as const)
    : {};

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
        withTiming(0.52, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.34, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
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
      transform: [{ translateY: isWeb ? scrollY * 0.06 : 0 }],
    }),
    [scrollY],
  );

  useEffect(() => {
    if (scrollY > 32) setScienceVisible(true);
  }, [scrollY]);

  const goQuiz = () => router.push('/(auth)/signup');
  const goProgram = () => router.push('/web/programa');

  const cardBasis = width >= 640 ? '48%' : '100%';
  const maxCardW = width >= 900 ? 200 : 180;

  const shellExtra = isWeb ? ({ minHeight: '88vh' } as object) : { minHeight: 560 };

  const hlPre = t('web.chronoPremium.heroHeadlinePrefix');
  const hlHi = t('web.chronoPremium.heroHeadlineHighlight');
  const hlSuf = t('web.chronoPremium.heroHeadlineSuffix');

  return (
    <LinearGradient colors={['#050816', '#0b0f2a']} style={[styles.shell, shellExtra]}>
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

      <View style={styles.pageInner}>
        <View style={styles.heroColumn}>
          <View style={styles.logoBlock}>
            <GozzzzWordmark preset="funnelHero" />
          </View>

          <Animated.View entering={FadeInDown.duration(600).delay(40)} style={styles.headlineBlock}>
            <View style={styles.headlineRow}>
              <Text style={[styles.headlinePlain, webFont]}>{hlPre}</Text>
              <MaskedView style={styles.hlMaskHost} maskElement={
                <View style={styles.hlMaskBox}>
                  <Text style={[styles.hlMaskText, webFont]}>{hlHi}</Text>
                </View>
              }>
                <LinearGradient
                  colors={['#a855f7', '#6366f1', '#38bdf8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={StyleSheet.absoluteFill}
                />
              </MaskedView>
              <Text style={[styles.headlinePlain, webFont]}>{hlSuf}</Text>
            </View>
            <Text style={[styles.subhead, webFont]}>{t('web.chronoPremium.heroSub')}</Text>
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
                end={{ x: 1, y: 0 }}
                style={styles.ctaGrad}
              >
                <Text style={[styles.ctaText, webFont]}>
                  {'\u2192 '}
                  {t('web.chronoPremium.ctaQuiz')}
                </Text>
              </LinearGradient>
            </Pressable>
            <Text style={[styles.trust, webFont]}>{t('web.chronoPremium.trustLine')}</Text>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerStar}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          {scienceVisible ? (
            <Animated.View entering={FadeIn.duration(480)} style={styles.scienceBlock}>
              <View style={styles.scienceBrainWrap}>
                <Brain size={20} color="rgba(255,255,255,0.42)" strokeWidth={1.5} />
              </View>
              <Text style={[styles.scienceTitle, webFont]}>{t('web.chronoPremium.scienceTitle')}</Text>
              <Text style={[styles.scienceBullets, webFont]}>{t('web.chronoPremium.scienceBullets')}</Text>
              <Text style={[styles.scienceLead, webFont]}>{t('web.chronoPremium.scienceResearchersLead')}</Text>
              <Text style={[styles.scienceNames, webFont]}>{t('web.chronoPremium.scienceResearchersNames')}</Text>
              <Text style={[styles.heroPrivacy, webFont]}>{t('web.chronoPremium.heroPrivacyLine')}</Text>
            </Animated.View>
          ) : (
            <View style={styles.sciencePlaceholder} />
          )}
        </View>

        <Text style={[styles.gridLabel, webFont]}>{t('web.chronoPremium.gridLabel')}</Text>
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
          <Text style={[styles.valueTitle, webFont]}>{t('web.chronoPremium.valueTitle')}</Text>
          <TouchableOpacity style={styles.valueCta} onPress={goQuiz} activeOpacity={0.9}>
            <LinearGradient colors={['#7c3aed', '#4f46e5', '#0284c7']} style={styles.valueCtaGrad}>
              <Text style={[styles.valueCtaText, webFont]}>{t('web.chronoPremium.ctaStartFree')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goProgram} style={styles.valueLink}>
            <Text style={[styles.valueLinkText, webFont]}>{t('web.chronoPremium.linkProgram')}</Text>
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
  pageInner: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  heroColumn: {
    width: '100%',
    maxWidth: HERO_MAX,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoBlock: {
    marginTop: 48,
    marginBottom: 40,
    alignItems: 'center',
  },
  headlineBlock: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  headlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  headlinePlain: {
    fontSize: 35,
    lineHeight: 40,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  hlMaskHost: {
    height: 42,
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  hlMaskBox: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  hlMaskText: {
    fontSize: 35,
    lineHeight: 40,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.4,
  },
  subhead: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 4,
  },
  ctaBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  ctaOuter: {
    borderRadius: 24,
    overflow: 'visible',
    width: '100%',
    maxWidth: HERO_MAX,
    alignSelf: 'center',
    marginBottom: 24,
  },
  ctaGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    zIndex: 0,
  },
  ctaGrad: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...(isWeb
      ? ({
          boxShadow: '0 18px 48px rgba(79, 70, 229, 0.42)',
        } as object)
      : {
          shadowColor: '#4f46e5',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.38,
          shadowRadius: 22,
          elevation: 14,
        }),
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  trust: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 32,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: HERO_MAX,
    marginBottom: 32,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minHeight: 1,
  },
  dividerStar: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: 0,
  },
  sciencePlaceholder: {
    height: 120,
    marginBottom: 8,
  },
  scienceBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 4,
  },
  scienceBrainWrap: {
    marginBottom: 10,
  },
  scienceTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 10,
  },
  scienceBullets: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 16,
  },
  scienceLead: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 4,
  },
  scienceNames: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroPrivacy: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'rgba(148,163,184,0.85)',
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
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
    width: '100%',
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
