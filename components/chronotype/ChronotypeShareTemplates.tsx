import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { LocaleChronotypeBlock } from '@/data/chronotypesExperience';
import type { ShareImageVariant } from '@/lib/chronotypeMultiShare';
import { SHARE_BRAND_URL_TEXT } from '@/lib/shareBranding';
import { STORY_HEIGHT, STORY_WIDTH } from '@/lib/chronotypeStoryShare';

function themeFor(color: LocaleChronotypeBlock['color']) {
  switch (color) {
    case 'blue':
      return { colors: ['#0a1628', '#111f38', '#070d16'] as const, accent: '#7dd3fc', muted: 'rgba(203,213,225,0.92)' };
    case 'green':
      return { colors: ['#071a14', '#0d261c', '#05120e'] as const, accent: '#6ee7b7', muted: 'rgba(203,213,225,0.9)' };
    case 'orange':
      return { colors: ['#1a0f08', '#24180c', '#100804'] as const, accent: '#fdba74', muted: 'rgba(254,243,199,0.88)' };
    case 'purple':
    default:
      return { colors: ['#120818', '#1a0f22', '#080510'] as const, accent: '#d8b4fe', muted: 'rgba(237,233,254,0.88)' };
  }
}

type Props = {
  variant: ShareImageVariant;
  block: LocaleChronotypeBlock;
  locale: 'pt' | 'en';
};

/** Layout 1080×1920 para captura nativa (view-shot). */
export default function ChronotypeShareTemplates({ variant, block, locale }: Props) {
  const th = themeFor(block.color);

  if (variant === 'whatsapp') {
    /** Status 9:16: emoji + nome + frase + marca. */
    return (
      <LinearGradient colors={[...th.colors]} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.wEmoji}>{block.emoji}</Text>
        <Text style={[styles.wName, { color: th.accent }]}>{block.name}</Text>
        <Text style={[styles.wShort, { color: th.muted }]}>{block.story.short}</Text>
        <Text style={[styles.footer, { color: th.accent }]}>{SHARE_BRAND_URL_TEXT}</Text>
      </LinearGradient>
    );
  }

  if (variant === 'instagram1') {
    const head = locale === 'pt' ? `Eu sou ${block.name}` : `I'm ${block.name}`;
    return (
      <LinearGradient colors={[...th.colors]} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={[styles.igHead, { color: '#f8fafc' }]}>{head}</Text>
        <Text style={[styles.igBody, { color: th.muted }]}>{block.story.short}</Text>
        <Text style={[styles.footer, { color: th.accent }]}>{SHARE_BRAND_URL_TEXT}</Text>
      </LinearGradient>
    );
  }

  const cta =
    locale === 'pt'
      ? `Descubra o seu → ${SHARE_BRAND_URL_TEXT}`
      : `Find yours → ${SHARE_BRAND_URL_TEXT}`;
  return (
    <LinearGradient colors={[...th.colors]} style={styles.root} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <Text style={[styles.igBody, { color: th.muted, marginTop: 120 }]}>{block.story.curiosity}</Text>
      <Text style={[styles.igCta, { color: th.accent }]}>{cta}</Text>
      <Text style={[styles.footer, { color: th.accent }]}>{SHARE_BRAND_URL_TEXT}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
    paddingHorizontal: 72,
    paddingTop: 200,
  },
  wEmoji: {
    fontSize: 120,
    textAlign: 'center',
    marginBottom: 16,
  },
  wName: {
    fontSize: 34,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  wShort: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 54,
    paddingHorizontal: 8,
  },
  igHead: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 58,
    marginBottom: 28,
  },
  igBody: {
    fontSize: 40,
    fontWeight: '500',
    lineHeight: 54,
  },
  igCta: {
    fontSize: 36,
    fontWeight: '600',
    marginTop: 48,
    lineHeight: 48,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 96,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    opacity: 0.7,
    letterSpacing: 0.3,
  },
});
