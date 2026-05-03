import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import type { LocaleChronotypeBlock } from '@/data/chronotypesExperience';
import PrimaryButton from '@/src/components/PrimaryButton';
import { TraitGlyph } from '@/components/chronotype/chronotypeTraitIcons';

function accentFor(color: LocaleChronotypeBlock['color']): string {
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
  block: LocaleChronotypeBlock;
  onNext: () => void;
};

const STAGGER_MS = 150;

export default function ChronotypeIdentityScreen({ block, onNext }: Props) {
  const accent = accentFor(block.color);

  return (
    <View style={styles.wrap}>
      <View style={styles.hero}>
        <Animated.View
          entering={ZoomIn.springify().damping(14).stiffness(180)}
          style={styles.emojiWrap}
        >
          <Text style={styles.emoji}>{block.emoji}</Text>
        </Animated.View>
        <Animated.View entering={FadeIn.duration(420).delay(180)}>
          <Text style={[styles.name, { color: accent }]}>{block.name}</Text>
        </Animated.View>
        <Animated.View entering={FadeIn.duration(400).delay(260)}>
          <Text style={styles.sub}>{block.subtitle}</Text>
        </Animated.View>
      </View>

      <Animated.View entering={FadeIn.duration(380).delay(120)}>
        <Text style={styles.section}>{block.sectionIdentity}</Text>
      </Animated.View>
      <View style={styles.traitRow}>
        {block.traits.map((tr, i) => (
          <Animated.View
            key={tr.title}
            entering={FadeInDown.duration(380).delay(200 + i * STAGGER_MS)}
            style={styles.traitCard}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.03)']}
              style={styles.traitInner}
            >
              <TraitGlyph name={tr.icon} color={accent} size={24} />
              <Text style={styles.traitTitle}>{tr.title}</Text>
            </LinearGradient>
          </Animated.View>
        ))}
      </View>

      <Animated.View entering={FadeInDown.delay(200 + STAGGER_MS * 3).duration(400)} style={styles.insightBox}>
        <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} style={styles.insightInner}>
          <Text style={styles.insightText}>{block.insight}</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View entering={FadeIn.delay(380 + STAGGER_MS * 3).duration(400)} style={styles.cta}>
        <PrimaryButton label={block.ctaUnderstand} onPress={onNext} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emojiWrap: {
    marginBottom: 8,
  },
  emoji: {
    fontSize: 72,
    textAlign: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  sub: {
    marginTop: 12,
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(203,213,225,0.95)',
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.85)',
    fontWeight: '700',
    marginBottom: 12,
  },
  traitRow: {
    gap: 10,
    marginBottom: 20,
  },
  traitCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  traitInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  traitTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(241,245,249,0.98)',
  },
  insightBox: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  insightInner: {
    padding: 16,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 23,
    color: 'rgba(226,232,240,0.95)',
    fontWeight: '600',
    textAlign: 'center',
  },
  cta: {
    marginTop: 4,
  },
});
