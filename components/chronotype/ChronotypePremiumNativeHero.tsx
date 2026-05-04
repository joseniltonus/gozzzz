import { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Activity, Brain, Check, Clock, Dna, Lock, Shield, Zap } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import NativeHeroGradientHighlight from '@/components/chronotype/NativeHeroGradientHighlight';
import {
  CHRONOTYPE_HERO_MAX,
  CHRONOTYPE_HEADLINE_FS,
  CHRONOTYPE_HEADLINE_LH,
  CHRONOTYPE_HEADLINE_MAX_W,
  CHRONOTYPE_HEADLINE_TRACKING,
} from '@/components/chronotype/chronotypePremiumHeroConstants';

const androidText = Platform.OS === 'android' ? ({ includeFontPadding: false } as const) : {};

type Props = {
  onPressCta: () => void;
};

/**
 * Hero nativo com os mesmos tokens e hierarquia que `ChronotypePremiumWebFunnel` (bloco web).
 */
export default function ChronotypePremiumNativeHero({ onPressCta }: Props) {
  const { t } = useLanguage();
  const glow = useSharedValue(0.34);

  useEffect(() => {
    glow.value = withRepeat(
      withSequence(
        withTiming(0.52, {
          duration: Platform.OS === 'android' ? 1900 : 2200,
          easing: Easing.inOut(Easing.quad),
        }),
        withTiming(0.32, {
          duration: Platform.OS === 'android' ? 1900 : 2200,
          easing: Easing.inOut(Easing.quad),
        }),
      ),
      -1,
      false,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const hlPre = t('web.chronoPremium.heroHeadlinePrefix');
  const hlHi = t('web.chronoPremium.heroHeadlineHighlight');
  const hlSuf = t('web.chronoPremium.heroHeadlineSuffix');
  const subPre = t('web.chronoPremium.heroSubPrefix');
  const subHi = t('web.chronoPremium.heroSubHighlight');
  const subSuf = t('web.chronoPremium.heroSubSuffix');

  const headlineEnter =
    Platform.OS === 'ios'
      ? FadeInDown.duration(600).delay(32)
      : FadeInDown.duration(480).delay(24);
  const scienceEnter =
    Platform.OS === 'ios' ? FadeIn.duration(520).delay(140) : FadeIn.duration(420).delay(100);

  return (
    <View style={styles.column}>
      <View style={styles.logoBlock}>
        <GozzzzWordmark preset="funnelHero" />
      </View>

      <Animated.View entering={headlineEnter} style={styles.headlineBlock}>
        <View style={styles.headlineOuter}>
          <View
            style={styles.headlineRow}
            accessible
            accessibilityRole="header"
            accessibilityLabel={`${hlPre}${hlHi}${hlSuf}`.replace(/\s+/g, ' ').trim()}
          >
            <Text style={styles.headPlain} maxFontSizeMultiplier={1.28} accessible={false}>
              {hlPre}
            </Text>
            <NativeHeroGradientHighlight
              text={hlHi}
              fontSize={CHRONOTYPE_HEADLINE_FS}
              lineHeight={CHRONOTYPE_HEADLINE_LH}
              fontWeight="700"
              letterSpacing={CHRONOTYPE_HEADLINE_TRACKING}
              maxFontSizeMultiplier={1.28}
            />
            <Text style={styles.headPlain} maxFontSizeMultiplier={1.28} accessible={false}>
              {hlSuf}
            </Text>
          </View>
        </View>

        <Text style={styles.subheadWrap} maxFontSizeMultiplier={1.35}>
          <Text style={styles.subheadMuted}>{subPre}</Text>
          <Text style={styles.subheadAccent}>{subHi}</Text>
          <Text style={styles.subheadMuted}>{subSuf}</Text>
        </Text>
      </Animated.View>

      <View style={styles.ctaBlock}>
        <Pressable
          onPress={onPressCta}
          style={({ pressed }) => [
            styles.ctaOuter,
            { transform: [{ scale: pressed ? 0.97 : 1 }] },
          ]}
          android_ripple={{ color: 'rgba(255,255,255,0.12)', borderless: false }}
        >
          <Animated.View
            style={[styles.ctaGlow, glowStyle]}
            needsOffscreenAlphaCompositing={Platform.OS === 'ios'}
          />
          <LinearGradient
            colors={['#9333ea', '#6366f1', '#0ea5e9']}
            locations={[0, 0.52, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGrad}
          >
            <Text style={styles.ctaText} maxFontSizeMultiplier={1.25}>
              {'\u2192 '}
              {t('web.chronoPremium.ctaQuiz')}
            </Text>
          </LinearGradient>
        </Pressable>

        <View style={styles.trustRow}>
          <View style={styles.trustItem}>
            <Check size={15} color="#c4b5fd" strokeWidth={2.2} />
            <Text style={styles.trustItemText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.trustFree')}
            </Text>
          </View>
          <Text style={styles.trustSep}>·</Text>
          <View style={styles.trustItem}>
            <Zap size={15} color="#c4b5fd" strokeWidth={2.2} />
            <Text style={styles.trustItemText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.trustFast')}
            </Text>
          </View>
          <Text style={styles.trustSep}>·</Text>
          <View style={styles.trustItem}>
            <Lock size={15} color="#c4b5fd" strokeWidth={2.2} />
            <Text style={styles.trustItemText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.trustSignup')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.dividerRow}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerStar} allowFontScaling={false} maxFontSizeMultiplier={1}>
          ✦
        </Text>
        <View style={styles.dividerLine} />
      </View>

      <Animated.View entering={scienceEnter} style={styles.scienceBlock}>
        <View style={styles.brainRing}>
          <Brain size={18} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
        </View>
        <Text style={styles.scienceTitle} maxFontSizeMultiplier={1.35}>
          {t('web.chronoPremium.scienceTitle')}
        </Text>
        <View style={styles.pillarRow}>
          <View style={styles.pillarItem}>
            <Dna size={13} color="#c4b5fd" strokeWidth={2} />
            <Text style={styles.pillarText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.sciencePillar1')}
            </Text>
          </View>
          <Text style={styles.pillarPipe}>|</Text>
          <View style={styles.pillarItem}>
            <Clock size={13} color="#c4b5fd" strokeWidth={2} />
            <Text style={styles.pillarText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.sciencePillar2')}
            </Text>
          </View>
          <Text style={styles.pillarPipe}>|</Text>
          <View style={styles.pillarItem}>
            <Activity size={13} color="#c4b5fd" strokeWidth={2} />
            <Text style={styles.pillarText} maxFontSizeMultiplier={1.35}>
              {t('web.chronoPremium.sciencePillar3')}
            </Text>
          </View>
        </View>
        <Text style={styles.scienceLead} maxFontSizeMultiplier={1.35}>
          {t('web.chronoPremium.scienceResearchersLead')}
        </Text>
        <Text style={styles.scienceNames} maxFontSizeMultiplier={1.35}>
          {t('web.chronoPremium.scienceResearchersNames')}
        </Text>
        <View style={styles.privacyPill}>
          <Shield size={13} color="rgba(255,255,255,0.45)" strokeWidth={2} />
          <Text style={styles.privacyPillText} maxFontSizeMultiplier={1.35}>
            {t('web.chronoPremium.heroPrivacyLine')}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  column: {
    width: '100%',
    maxWidth: CHRONOTYPE_HERO_MAX,
    alignSelf: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingHorizontal: 24,
  },
  logoBlock: {
    alignItems: 'center',
  },
  headlineBlock: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  headlineOuter: {
    width: '100%',
    maxWidth: CHRONOTYPE_HEADLINE_MAX_W,
    alignSelf: 'center',
  },
  headlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  headPlain: {
    fontSize: CHRONOTYPE_HEADLINE_FS,
    lineHeight: CHRONOTYPE_HEADLINE_LH,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: CHRONOTYPE_HEADLINE_TRACKING,
    ...androidText,
    ...(Platform.OS === 'android' ? { textBreakStrategy: 'simple' as const } : {}),
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
    ...androidText,
  },
  subheadAccent: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#d8b4fe',
    ...androidText,
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
    maxWidth: CHRONOTYPE_HERO_MAX,
    alignSelf: 'center',
    marginBottom: 24,
    position: 'relative',
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
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.38,
    shadowRadius: 22,
    elevation: 14,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.2,
    ...androidText,
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
    ...androidText,
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
    maxWidth: CHRONOTYPE_HERO_MAX,
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
    ...androidText,
  },
  pillarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
    maxWidth: CHRONOTYPE_HERO_MAX,
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
    ...androidText,
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
    ...androidText,
  },
  scienceNames: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: 'rgba(216,180,254,0.95)',
    textAlign: 'center',
    marginBottom: 18,
    ...androidText,
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
    maxWidth: CHRONOTYPE_HERO_MAX,
  },
  privacyPillText: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '400',
    color: 'rgba(148,163,184,0.88)',
    textAlign: 'left',
    ...androidText,
  },
});
