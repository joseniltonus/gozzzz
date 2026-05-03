import { useLayoutEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ChronotypeIdentityScreen from '@/components/chronotype/ChronotypeIdentityScreen';
import ChronotypeUtilityScreen, {
  type UtilityShareLabels,
} from '@/components/chronotype/ChronotypeUtilityScreen';
import ChronotypeShareTemplates from '@/components/chronotype/ChronotypeShareTemplates';
import {
  getChronotypeExperience,
  type ChronotypeExpKey,
  tiktokScriptText,
} from '@/data/chronotypesExperience';
import { generateShareImageWeb, shareTikTokScript, type ShareImageVariant } from '@/lib/chronotypeMultiShare';
import { generateStoryImageFromRef, handleShare, STORY_HEIGHT, STORY_WIDTH } from '@/lib/chronotypeStoryShare';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';

const SHARE_LABELS: Record<'pt' | 'en', UtilityShareLabels> = {
  pt: {
    morning: 'Manhã',
    night: 'Noite',
    shareTitle: 'Partilhar',
    whatsapp: 'Status',
    instagram1: 'Stories 1',
    instagram2: 'Stories 2',
    tiktok: 'TikTok',
    close: 'Fechar',
    copyShare: 'Copiar / partilhar roteiro',
  },
  en: {
    morning: 'Morning',
    night: 'Night',
    shareTitle: 'Share',
    whatsapp: 'Status',
    instagram1: 'Stories 1',
    instagram2: 'Stories 2',
    tiktok: 'TikTok',
    close: 'Close',
    copyShare: 'Copy / share script',
  },
};

function bgFor(color: ReturnType<typeof getChronotypeExperience>['color']): readonly [string, string, string] {
  switch (color) {
    case 'blue':
      return ['#060d18', '#0c1524', '#05060d'] as const;
    case 'green':
      return ['#05120e', '#0a1a12', '#05060d'] as const;
    case 'orange':
      return ['#120804', '#1a0f08', '#05060d'] as const;
    case 'purple':
    default:
      return ['#0a0610', '#120818', '#05060d'] as const;
  }
}

type Props = {
  chronotypeKey: ChronotypeExpKey;
  locale: 'pt' | 'en';
  onDay1: () => void;
};

export default function ChronotypeResultFlow({ chronotypeKey, locale, onDay1 }: Props) {
  const block = getChronotypeExperience(chronotypeKey, locale);
  const labels = SHARE_LABELS[locale];
  const bg = bgFor(block.color);

  const [step, setStep] = useState<0 | 1>(0);
  const [sharing, setSharing] = useState(false);
  const captureRef = useRef<View>(null);
  const [cap, setCap] = useState<{ v: ShareImageVariant } | null>(null);

  useLayoutEffect(() => {
    if (!cap || Platform.OS === 'web') return;
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        void (async () => {
          try {
            const uri = await generateStoryImageFromRef(captureRef);
            if (uri) await handleShare(uri, { dialogTitle: 'GoZzzz — Stories' });
          } finally {
            setCap(null);
            setSharing(false);
          }
        })();
      });
    });
    return () => cancelAnimationFrame(id);
  }, [cap]);

  const shareVariant = (v: ShareImageVariant) => {
    if (Platform.OS === 'web') {
      setSharing(true);
      void (async () => {
        try {
          const uri = await generateShareImageWeb(block, v, locale);
          if (uri) await handleShare(uri, { dialogTitle: 'GoZzzz' });
        } finally {
          setSharing(false);
        }
      })();
      return;
    }
    setSharing(true);
    setCap({ v });
  };

  const onTiktok = async () => {
    await shareTikTokScript(tiktokScriptText(block, locale), locale);
  };

  return (
    <View style={styles.root}>
      <LinearGradient colors={[bg[0], bg[1], bg[2]]} style={StyleSheet.absoluteFillObject} pointerEvents="none" />
      <View style={styles.pager}>
        <View style={[styles.dot, step === 0 && styles.dotOn]} />
        <View style={[styles.dot, step === 1 && styles.dotOn]} />
      </View>
      <View style={styles.kicker}>
        <GozzzzWordmark size="sm" />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {step === 0 ? (
          <ChronotypeIdentityScreen block={block} onNext={() => setStep(1)} />
        ) : (
          <ChronotypeUtilityScreen
            chronotypeKey={chronotypeKey}
            locale={locale}
            block={block}
            labels={labels}
            sharing={sharing}
            onShareWhatsapp={() => shareVariant('whatsapp')}
            onShareInstagram1={() => shareVariant('instagram1')}
            onShareInstagram2={() => shareVariant('instagram2')}
            onShareTiktokScript={onTiktok}
            onDay1={onDay1}
          />
        )}
      </ScrollView>

      <View ref={captureRef} collapsable={false} style={styles.captureHost} pointerEvents="none">
        <View style={{ width: STORY_WIDTH, height: STORY_HEIGHT }}>
          <ChronotypeShareTemplates variant={cap?.v ?? 'whatsapp'} block={block} locale={locale} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#05060d',
  },
  pager: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    paddingTop: 6,
    paddingBottom: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(148,163,184,0.4)',
  },
  dotOn: {
    backgroundColor: 'rgba(248,250,252,0.85)',
    width: 14,
  },
  kicker: {
    alignItems: 'center',
    marginBottom: 6,
  },
  scroll: {
    paddingTop: 4,
    paddingBottom: 32,
  },
  captureHost: {
    position: 'absolute',
    left: -12000,
    top: 0,
    opacity: 1,
    width: STORY_WIDTH,
    height: STORY_HEIGHT,
  },
});
