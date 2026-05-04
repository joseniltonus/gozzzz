import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import PrimaryButton from '@/src/components/PrimaryButton';
import {
  chronotypes,
  getOtherChronotypeKeys,
  type ChronotypeKey,
  type ChronotypeIntel,
} from '@/data/chronotypesIntelligence';
import { generateStoryImage, handleShare, STORY_HEIGHT, STORY_WIDTH } from '@/lib/chronotypeStoryShare';

const COPY = {
  pt: {
    intelligenceTitle: 'GoZzzz Intelligence Profile',
    cognitiveSignature: 'Assinatura cognitiva',
    funFact: 'Fun fact',
    performance: 'Diretriz de alta performance',
    insight: 'GoZzzz insight',
    spectrumTitle: 'Outros perfis no espectro',
    shareStories: 'Compartilhar nos Stories',
    shareHint: 'Abra o Instagram e publique nos Stories com a imagem gerada.',
    busy: 'A gerar imagem…',
  },
  en: {
    intelligenceTitle: 'GoZzzz Intelligence Profile',
    cognitiveSignature: 'Cognitive signature',
    funFact: 'Fun fact',
    performance: 'High-performance guideline',
    insight: 'GoZzzz insight',
    spectrumTitle: 'Other profiles on the spectrum',
    shareStories: 'Share to Stories',
    shareHint: 'Open Instagram and post to Stories using the generated image.',
    busy: 'Generating image…',
  },
} as const;

function profileGradients(color: ChronotypeIntel['color']): readonly [string, string, string] {
  switch (color) {
    case 'blue':
      return ['#0a1628', '#111f38', '#070d16'] as const;
    case 'green':
      return ['#071a14', '#0d261c', '#05120e'] as const;
    case 'orange':
      return ['#1a0f08', '#24180c', '#100804'] as const;
    case 'purple':
    default:
      return ['#120818', '#1a0f22', '#080510'] as const;
  }
}

function accentFor(color: ChronotypeIntel['color']): string {
  switch (color) {
    case 'blue':
      return '#7dd3fc';
    case 'green':
      return '#6ee7b7';
    case 'orange':
      return '#fdba74';
    case 'purple':
    default:
      return '#d8b4fe';
  }
}

type Props = {
  chronotypeKey: ChronotypeKey;
  onContinuePlan: () => void;
  continuePlanLabel?: string;
  locale?: 'pt' | 'en';
};

function StoryCaptureFrame({ intel }: { intel: ChronotypeIntel }) {
  const g = profileGradients(intel.color);
  const accent = accentFor(intel.color);
  const { story } = intel;

  return (
    <LinearGradient colors={[g[0], g[1], g[2]]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={storyFrame.root}>
      <View style={[storyFrame.border, { borderColor: accent }]} />
      <Text style={storyFrame.title}>{story.title}</Text>
      <Text style={storyFrame.line}>{story.line1}</Text>
      <Text style={storyFrame.line}>{story.line2}</Text>
      <Text style={[storyFrame.footer, { color: accent }]}>gozzzz.app</Text>
    </LinearGradient>
  );
}

export default function ChronotypeIntelligenceProfile({
  chronotypeKey,
  onContinuePlan,
  continuePlanLabel = 'Ver meu plano de 21 passos →',
  locale = 'pt',
}: Props) {
  const t = COPY[locale];
  const intel = chronotypes[chronotypeKey];
  const storyRef = useRef<View>(null);
  const [sharing, setSharing] = useState(false);

  const others = useMemo(() => getOtherChronotypeKeys(chronotypeKey), [chronotypeKey]);
  const accent = accentFor(intel.color);

  const onShareStories = useCallback(async () => {
    setSharing(true);
    try {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
      const uri = await generateStoryImage(chronotypeKey, storyRef);
      if (uri) {
        await handleShare(uri, { dialogTitle: 'GoZzzz — Stories' });
      }
    } finally {
      setSharing(false);
    }
  }, [chronotypeKey]);

  const bg = profileGradients(intel.color);

  return (
    <View style={styles.wrap}>
      <LinearGradient
        pointerEvents="none"
        colors={[bg[0], bg[1], bg[2]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bgGradient}
      />
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeIn.duration(420)} style={styles.hero}>
          <Text style={styles.kicker}>{t.intelligenceTitle}</Text>
          <Text style={styles.heroEmoji}>{intel.emoji}</Text>
          <Text style={[styles.heroName, { color: accent }]}>{intel.name}</Text>
          <Text style={styles.heroSub}>{intel.subtitle}</Text>
        </Animated.View>

        <Text style={styles.sectionLabel}>{t.cognitiveSignature}</Text>
        <View style={styles.sigGrid}>
          {intel.signature.map((line, i) => (
            <Animated.View
              key={line}
              entering={FadeInDown.duration(380).delay(60 + i * 55)}
              style={styles.sigCard}
            >
              <LinearGradient colors={['rgba(255,255,255,0.09)', 'rgba(255,255,255,0.02)']} style={styles.sigInner}>
                <View style={[styles.sigDot, { backgroundColor: accent }]} />
                <Text style={styles.sigText}>{line}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeInDown.delay(280).duration(400)} style={styles.block}>
          <Text style={styles.sectionLabel}>{t.funFact}</Text>
          <LinearGradient colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)']} style={styles.blockInner}>
            <Text style={styles.blockBody}>{intel.funFact}</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(340).duration(400)} style={styles.block}>
          <Text style={styles.sectionLabel}>{t.performance}</Text>
          <LinearGradient colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)']} style={styles.blockInner}>
            <Text style={styles.blockBody}>{intel.performance}</Text>
          </LinearGradient>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.block}>
          <Text style={styles.sectionLabel}>{t.insight}</Text>
          <LinearGradient colors={['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)']} style={styles.blockInner}>
            <Text style={styles.blockBody}>{intel.insight}</Text>
          </LinearGradient>
        </Animated.View>

        <Text style={[styles.sectionLabel, styles.spectrumHeading]}>{t.spectrumTitle}</Text>
        <View style={styles.spectrumRow}>
          {others.map((k) => {
            const o = chronotypes[k];
            return (
              <View key={k} style={styles.spectrumCard}>
                <Text style={styles.spectrumEmoji}>{o.emoji}</Text>
                <Text style={styles.spectrumName}>{o.name}</Text>
                <Text style={styles.spectrumShort}>— {o.spectrumLabel}</Text>
              </View>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.storiesBtn, { shadowColor: accent }]}
          onPress={() => void onShareStories()}
          activeOpacity={0.88}
          disabled={sharing}
        >
          <LinearGradient colors={[accent, `${accent}99`]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.storiesGrad}>
            {sharing ? (
              <ActivityIndicator color="#0f172a" />
            ) : (
              <Text style={styles.storiesBtnText}>{t.shareStories}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.shareHint}>{t.shareHint}</Text>

        <View style={styles.primarySpacer}>
          <PrimaryButton label={continuePlanLabel} onPress={onContinuePlan} />
        </View>

        <Text style={styles.footer}>
          {locale === 'pt'
            ? 'Baseado em literatura de cronobiologia e sono — sem estatísticas inventadas.'
            : 'Grounded in chronobiology and sleep science — no invented statistics.'}
        </Text>
      </ScrollView>

      {/* Frame 9:16 off-screen para captura nativa (view-shot) */}
      <View
        ref={storyRef}
        collapsable={false}
        style={styles.captureHost}
        pointerEvents="none"
      >
        <View style={{ width: STORY_WIDTH, height: STORY_HEIGHT }}>
          <StoryCaptureFrame intel={intel} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#05060d',
  },
  bgGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.45,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 8,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    marginBottom: 22,
    alignItems: 'center',
  },
  kicker: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.85)',
    fontWeight: '600',
    marginBottom: 10,
  },
  heroEmoji: {
    fontSize: 44,
    marginBottom: 6,
  },
  heroName: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
    textAlign: 'center',
  },
  heroSub: {
    marginTop: 10,
    fontSize: 15,
    lineHeight: 22,
    color: 'rgba(203,213,225,0.92)',
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 10,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.75)',
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 6,
  },
  spectrumHeading: {
    marginTop: 18,
  },
  sigGrid: {
    gap: 10,
    marginBottom: 8,
  },
  sigCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  sigInner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  sigDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  sigText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(226,232,240,0.95)',
    fontWeight: '500',
  },
  block: {
    marginBottom: 14,
  },
  blockInner: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  blockBody: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(203,213,225,0.95)',
    fontWeight: '500',
  },
  spectrumRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  spectrumCard: {
    flexGrow: 1,
    minWidth: '30%',
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  spectrumEmoji: {
    fontSize: 22,
    marginBottom: 4,
  },
  spectrumName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#e2e8f0',
    textAlign: 'center',
  },
  spectrumShort: {
    fontSize: 10,
    color: 'rgba(148,163,184,0.9)',
    marginTop: 2,
    textAlign: 'center',
  },
  storiesBtn: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  storiesGrad: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storiesBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: 0.2,
  },
  shareHint: {
    fontSize: 12,
    color: 'rgba(148,163,184,0.85)',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 18,
  },
  primarySpacer: {
    marginTop: 4,
  },
  footer: {
    fontSize: 11,
    color: 'rgba(100,116,139,0.9)',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  captureHost: {
    position: 'absolute',
    left: -10000,
    top: 0,
    opacity: 1,
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
  },
});

const storyFrame = StyleSheet.create({
  root: {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    paddingHorizontal: 72,
    paddingTop: 200,
    justifyContent: 'flex-start',
  },
  border: {
    position: 'absolute',
    left: 48,
    right: 48,
    top: 120,
    bottom: 120,
    borderWidth: 2,
    borderRadius: 4,
    opacity: 0.4,
  },
  title: {
    fontSize: 52,
    fontWeight: '700',
    color: '#f8fafc',
    marginBottom: 36,
    letterSpacing: -1,
  },
  line: {
    fontSize: 40,
    fontWeight: '500',
    color: 'rgba(203,213,225,0.95)',
    lineHeight: 54,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    left: 72,
    bottom: 120,
    fontSize: 36,
    fontWeight: '700',
  },
});
