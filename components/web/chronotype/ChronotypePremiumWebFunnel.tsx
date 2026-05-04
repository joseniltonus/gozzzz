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
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { TextStyle } from 'react-native';
import { Activity, Brain, Check, Clock, Dna, Lock, Shield, Zap } from 'lucide-react-native';
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

/** Na web, MaskedView + Reanimated `entering` falham em vários browsers — gradiente via CSS + View estável. */
const headlineHighlightWeb = {
  color: 'transparent',
  backgroundImage: 'linear-gradient(90deg, #a855f7 0%, #6366f1 52%, #38bdf8 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
} as unknown as TextStyle;

export default function ChronotypePremiumWebFunnel({ scrollY }: Props) {
  const { t, language } = useLanguage();
  const locale = language === 'pt' ? 'pt' : 'en';
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [ctaHover, setCtaHover] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  const ctaScale = ctaPressed ? 0.97 : ctaHover && isWeb ? 1.05 : 1;
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

  const goQuiz = () => router.push('/(auth)/signup');
  const goProgram = () => router.push('/web/programa');

  const cardBasis = width >= 640 ? '48%' : '100%';
  const maxCardW = width >= 900 ? 200 : 180;

  const shellExtra = isWeb ? ({ minHeight: '88vh' } as object) : { minHeight: 560 };

  const hlPre = t('web.chronoPremium.heroHeadlinePrefix');
  const hlHi = t('web.chronoPremium.heroHeadlineHighlight');
  const hlSuf = t('web.chronoPremium.heroHeadlineSuffix');

  const subPre = t('web.chronoPremium.heroSubPrefix');
  const subHi = t('web.chronoPremium.heroSubHighlight');
  const subSuf = t('web.chronoPremium.heroSubSuffix');

  return (
    <LinearGradient colors={['#050508', '#0c0c12']} style={[styles.shell, shellExtra]}>
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

      <View style={styles.pageInner} {...(isWeb ? ({ nativeID: 'chronotype-hero-root' } as object) : {})}>
        <View style={styles.heroColumn}>
          <View style={styles.logoBlock}>
            <GozzzzWordmark preset="funnelHero" />
          </View>

          {isWeb ? (
            <View style={styles.headlineBlock} testID="chronotype-hero-headline">
              <Text style={[styles.headlineWebWrap, webFont]}>
                <Text style={[styles.headlinePlain, webFont]}>{hlPre}</Text>
                <Text style={[styles.headlinePlain, headlineHighlightWeb, webFont]}>{hlHi}</Text>
                {hlSuf ? <Text style={[styles.headlinePlain, webFont]}>{hlSuf}</Text> : null}
              </Text>
              <Text style={[styles.subheadWrap, webFont]}>
                <Text style={[styles.subheadMuted, webFont]}>{subPre}</Text>
                <Text style={[styles.subheadAccent, webFont]}>{subHi}</Text>
                <Text style={[styles.subheadMuted, webFont]}>{subSuf}</Text>
              </Text>
            </View>
          ) : (
            <Animated.View entering={FadeInDown.duration(600).delay(40)} style={styles.headlineBlock}>
              <View style={styles.headlineRow}>
                <Text style={[styles.headlinePlain, webFont]}>{hlPre}</Text>
                <MaskedView
                  style={[styles.hlMaskHost, { minWidth: Math.min(HERO_MAX - 24, hlHi.length * 11) }]}
                  maskElement={
                    <View style={styles.hlMaskBox}>
                      <Text style={[styles.hlMaskText, webFont]}>{hlHi}</Text>
                    </View>
                  }
                >
                  <LinearGradient
                    colors={['#a855f7', '#6366f1', '#38bdf8']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={StyleSheet.absoluteFill}
                  />
                </MaskedView>
                {hlSuf ? <Text style={[styles.headlinePlain, webFont]}>{hlSuf}</Text> : null}
              </View>
              <Text style={[styles.subheadWrap, webFont]}>
                <Text style={[styles.subheadMuted, webFont]}>{subPre}</Text>
                <Text style={[styles.subheadAccent, webFont]}>{subHi}</Text>
                <Text style={[styles.subheadMuted, webFont]}>{subSuf}</Text>
              </Text>
            </Animated.View>
          )}

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
            <View style={styles.trustRow}>
              <View style={styles.trustItem}>
                <Check size={15} color="#c4b5fd" strokeWidth={2.2} />
                <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustFree')}</Text>
              </View>
              <Text style={styles.trustSep}>·</Text>
              <View style={styles.trustItem}>
                <Zap size={15} color="#c4b5fd" strokeWidth={2.2} />
                <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustFast')}</Text>
              </View>
              <Text style={styles.trustSep}>·</Text>
              <View style={styles.trustItem}>
                <Lock size={15} color="#c4b5fd" strokeWidth={2.2} />
                <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustSignup')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerStar}>✦</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.scienceBlock} testID="chronotype-hero-science">
            <View style={styles.brainRing}>
              <Brain size={18} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
            </View>
            <Text style={[styles.scienceTitle, webFont]}>{t('web.chronoPremium.scienceTitle')}</Text>
            <View style={styles.pillarRow}>
              <View style={styles.pillarItem}>
                <Dna size={13} color="#c4b5fd" strokeWidth={2} />
                <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar1')}</Text>
              </View>
              <Text style={[styles.pillarPipe, webFont]}>|</Text>
              <View style={styles.pillarItem}>
                <Clock size={13} color="#c4b5fd" strokeWidth={2} />
                <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar2')}</Text>
              </View>
              <Text style={[styles.pillarPipe, webFont]}>|</Text>
              <View style={styles.pillarItem}>
                <Activity size={13} color="#c4b5fd" strokeWidth={2} />
                <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar3')}</Text>
              </View>
            </View>
            <Text style={[styles.scienceLead, webFont]}>{t('web.chronoPremium.scienceResearchersLead')}</Text>
            <Text style={[styles.scienceNames, webFont]}>{t('web.chronoPremium.scienceResearchersNames')}</Text>
            <View style={styles.privacyPill}>
              <Shield size={13} color="rgba(255,255,255,0.45)" strokeWidth={2} />
              <Text style={[styles.privacyPillText, webFont]}>{t('web.chronoPremium.heroPrivacyLine')}</Text>
            </View>
          </View>
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
  headlineWebWrap: {
    width: '100%',
    maxWidth: 352,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
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
    minHeight: 44,
    maxHeight: 120,
    justifyContent: 'center',
    marginHorizontal: 0,
    alignSelf: 'center',
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
  subheadWrap: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
    flexWrap: 'wrap',
  },
  subheadMuted: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: 'rgba(226,232,240,0.78)',
  },
  subheadAccent: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#d8b4fe',
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
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(196,181,253,0.92)',
  },
  trustSep: {
    fontSize: 13,
    color: 'rgba(148,163,184,0.45)',
    marginHorizontal: 2,
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
  scienceBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 4,
  },
  brainRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  scienceTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    marginBottom: 12,
  },
  pillarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
    maxWidth: HERO_MAX,
  },
  pillarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pillarText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(196,181,253,0.95)',
    letterSpacing: 0.2,
  },
  pillarPipe: {
    fontSize: 11,
    color: 'rgba(148,163,184,0.35)',
    marginHorizontal: 2,
  },
  scienceLead: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    color: 'rgba(148,163,184,0.85)',
    textAlign: 'center',
    marginBottom: 6,
  },
  scienceNames: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: 'rgba(216,180,254,0.95)',
    textAlign: 'center',
    marginBottom: 18,
  },
  privacyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    maxWidth: HERO_MAX,
  },
  privacyPillText: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '400',
    color: 'rgba(148,163,184,0.88)',
    textAlign: 'left',
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
