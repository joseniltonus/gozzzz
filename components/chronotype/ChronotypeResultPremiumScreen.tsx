import { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  useReducedMotion,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ChronotypeKey } from '@/data/chronotypesIntelligence';
import {
  getChronotypeResultPremium,
  getChronotypeProfileExplain,
  type ChronotypeResultLocale,
} from '@/data/chronotypeResultPremium';
import GhostButton from '@/src/components/GhostButton';
import ChronotypeProfileExplainModal from '@/components/chronotype/ChronotypeProfileExplainModal';
import ChronotypeRefineOptionalBlock from '@/components/chronotype/ChronotypeRefineOptionalBlock';

const STAGGER_MS = 150;
const CONTENT_MAX = 420;
const BG_TOP = '#050816';
const BG_BOTTOM = '#0b0f2a';

type Props = {
  chronotypeKey: ChronotypeKey;
  locale?: ChronotypeResultLocale;
  onStartDay1: () => void;
  onUnderstandMore?: () => void;
};

function EnergyCurve({
  values,
  accentBar,
  accentMuted,
  morningLabel,
  nightLabel,
}: {
  values: readonly [number, number, number, number, number];
  accentBar: string;
  accentMuted: string;
  morningLabel: string;
  nightLabel: string;
}) {
  const maxH = 52;
  return (
    <View style={styles.curveBlock}>
      <View style={styles.curveRow}>
        {values.map((v, i) => (
          <View key={i} style={styles.curveCol}>
            <View style={[styles.curveBarTrack, { backgroundColor: accentMuted }]}>
              <View style={[styles.curveBarFill, { height: Math.max(6, v * maxH), backgroundColor: accentBar }]} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.curveLabels}>
        <Text style={styles.curveLabel}>{morningLabel}</Text>
        <Text style={styles.curveLabel}>{nightLabel}</Text>
      </View>
    </View>
  );
}

export default function ChronotypeResultPremiumScreen({
  chronotypeKey,
  locale = 'pt',
  onStartDay1,
  onUnderstandMore,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [explainOpen, setExplainOpen] = useState(false);

  const data = useMemo(() => getChronotypeResultPremium(chronotypeKey, locale), [chronotypeKey, locale]);
  const explain = useMemo(() => getChronotypeProfileExplain(chronotypeKey, locale), [chronotypeKey, locale]);
  const { accent } = data;

  const heroEmojiEntering = useMemo(
    () => (reduceMotion ? FadeIn.duration(280) : ZoomIn.springify().damping(16).stiffness(140).mass(0.85)),
    [reduceMotion],
  );

  const heroTitleEntering = useMemo(
    () => (reduceMotion ? FadeIn.duration(320) : FadeInUp.delay(80).duration(420).springify()),
    [reduceMotion],
  );

  const cardEntering = useCallback(
    (index: number) =>
      reduceMotion
        ? FadeIn.duration(260)
        : FadeInDown.delay(STAGGER_MS * index).duration(420).springify(),
    [reduceMotion],
  );

  const handleSecondary = useCallback(() => {
    if (onUnderstandMore) {
      onUnderstandMore();
      return;
    }
    setExplainOpen(true);
  }, [onUnderstandMore]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <LinearGradient colors={[BG_TOP, BG_BOTTOM]} locations={[0, 1]} style={StyleSheet.absoluteFillObject} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.column}>
          <Animated.View entering={heroEmojiEntering} style={styles.heroEmojiWrap}>
            <Text style={styles.heroEmoji} allowFontScaling={false}>
              {data.emoji}
            </Text>
          </Animated.View>
          <Animated.View entering={heroTitleEntering}>
            <Text style={styles.heroTitle}>{data.name}</Text>
            <Text style={styles.heroSubtitle}>{data.subtitle}</Text>
          </Animated.View>

          <Text style={styles.sectionLabel}>{data.sections.mind}</Text>
          <View style={styles.cardStack}>
            {data.mindCards.map((line, i) => (
              <Animated.View
                key={`mind-${i}`}
                entering={cardEntering(i)}
                style={[styles.mindCard, { borderColor: accent.primarySoft, backgroundColor: 'rgba(255,255,255,0.04)' }]}
              >
                <Text style={styles.mindCardText}>{line}</Text>
              </Animated.View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionLabel}>{data.sections.why}</Text>
            <Text style={styles.body}>{data.whyBody}</Text>
            <EnergyCurve
              values={data.curve}
              accentBar={accent.bar}
              accentMuted={accent.barMuted}
              morningLabel={data.sections.curveMorning}
              nightLabel={data.sections.curveNight}
            />
          </View>

          <Text style={styles.sectionLabel}>{data.sections.effects}</Text>
          <View style={[styles.listBlock, { borderLeftColor: accent.primary }]}>
            {data.effects.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: accent.primary }]} />
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>{data.sections.solutions}</Text>
          <View style={styles.cardStack}>
            {data.solutions.map((item, i) => (
              <Animated.View
                key={item}
                entering={cardEntering(i)}
                style={[styles.solutionCard, { borderColor: accent.primarySoft }]}
              >
                <Text style={styles.solutionText}>{item}</Text>
              </Animated.View>
            ))}
          </View>

          <View style={[styles.insightWrap, { borderColor: accent.primarySoft }]}>
            <Text style={styles.insight}>{data.insight}</Text>
          </View>

          <ChronotypeRefineOptionalBlock chronotypeKey={chronotypeKey} locale={locale} accent={accent} />

          <TouchableOpacity activeOpacity={0.92} onPress={onStartDay1} style={styles.primaryTouch}>
            <LinearGradient
              colors={['rgba(255,255,255,0.22)', accent.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryGrad}
            >
              <Text style={styles.primaryLabel}>{data.ctaPrimary}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <GhostButton label={data.ctaSecondary} onPress={handleSecondary} style={styles.secondaryGhost} />

          <Text style={styles.scienceFoot}>{data.scienceFoot}</Text>
        </View>
      </ScrollView>
      <ChronotypeProfileExplainModal
        visible={explainOpen}
        onClose={() => setExplainOpen(false)}
        explain={explain}
        accent={accent}
        emoji={data.emoji}
        profileName={data.name}
        onStartDay1={onStartDay1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_TOP,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 36 : 28,
  },
  column: {
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
  },
  heroEmojiWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  heroEmoji: {
    fontSize: 72,
    lineHeight: 80,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    letterSpacing: -0.8,
    marginBottom: 10,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 0.1,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },
  cardStack: {
    gap: 10,
    marginBottom: 8,
  },
  mindCard: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  mindCardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#94a3b8',
    marginBottom: 16,
  },
  curveBlock: {
    marginBottom: 28,
  },
  curveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 56,
    gap: 8,
  },
  curveCol: {
    flex: 1,
    alignItems: 'center',
  },
  curveBarTrack: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  curveBarFill: {
    width: '100%',
    borderRadius: 8,
  },
  curveLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  curveLabel: {
    fontSize: 11,
    color: '#64748b',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  listBlock: {
    borderLeftWidth: 3,
    paddingLeft: 14,
    gap: 10,
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    opacity: 0.9,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#cbd5e1',
  },
  solutionCard: {
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  solutionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#e2e8f0',
  },
  insightWrap: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginTop: 12,
    marginBottom: 28,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  insight: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  primaryTouch: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  primaryGrad: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.25,
  },
  secondaryGhost: {
    marginBottom: 28,
  },
  scienceFoot: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
});
