import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MessageCircle, Instagram, Music2, X } from 'lucide-react-native';
import type { ChronotypeExpKey, LocaleChronotypeBlock } from '@/data/chronotypesExperience';
import { getChronotypeContentPack } from '@/lib/chronotypeContentPack';
import PrimaryButton from '@/src/components/PrimaryButton';
import ChronotypeEnergyLineChart from '@/components/chronotype/ChronotypeEnergyLineChart';
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

export type UtilityShareLabels = {
  morning: string;
  night: string;
  shareTitle: string;
  whatsapp: string;
  instagram1: string;
  instagram2: string;
  tiktok: string;
  close: string;
  copyShare: string;
};

type Props = {
  chronotypeKey: ChronotypeExpKey;
  locale: 'pt' | 'en';
  block: LocaleChronotypeBlock;
  labels: UtilityShareLabels;
  sharing: boolean;
  onShareWhatsapp: () => void;
  onShareInstagram1: () => void;
  onShareInstagram2: () => void;
  onShareTiktokScript: () => Promise<void>;
  onDay1: () => void;
};

export default function ChronotypeUtilityScreen({
  chronotypeKey,
  locale,
  block,
  labels,
  sharing,
  onShareWhatsapp,
  onShareInstagram1,
  onShareInstagram2,
  onShareTiktokScript,
  onDay1,
}: Props) {
  const accent = accentFor(block.color);
  const [tikOpen, setTikOpen] = useState(false);
  const pack = getChronotypeContentPack(chronotypeKey, locale);
  const script = pack.tiktok.scriptText;
  const { width: winW } = useWindowDimensions();
  const maxWrap = Math.min(390, winW);

  const bump = () => {
    if (Platform.OS === 'web') return;
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <View style={[styles.wrap, { maxWidth: maxWrap }]}>
      <Animated.View entering={FadeInDown.duration(380)} style={styles.block}>
        <Text style={styles.section}>{block.sectionWhy}</Text>
        <ChronotypeEnergyLineChart morning={block.energy.morning} night={block.energy.night} accent={accent} />
        <View style={styles.axisRow}>
          <Text style={styles.axisLab}>{labels.morning}</Text>
          <Text style={styles.axisLab}>{labels.night}</Text>
        </View>
        <Text style={styles.caption}>{block.energyCaption}</Text>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(80).duration(380)} style={styles.block}>
        <Text style={styles.section}>{block.sectionCauses}</Text>
        <View style={styles.iconGrid}>
          {block.cause.map((c, i) => (
            <Animated.View
              key={c.line}
              entering={FadeInDown.duration(360).delay(100 + i * 90)}
              style={styles.iconCell}
            >
              <TraitGlyph name={c.icon} color={accent} size={26} />
              <Text style={styles.iconLabel}>{c.line}</Text>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(140).duration(380)} style={styles.block}>
        <Text style={styles.section}>{block.sectionFixes}</Text>
        <View style={styles.solStack}>
          {block.solutions.map((s, i) => (
            <Animated.View key={s.line} entering={FadeInDown.duration(360).delay(120 + i * 100)}>
              <Pressable
                onPress={bump}
                style={({ pressed }) => [pressed && styles.solPressed]}
                accessibilityRole="button"
                accessibilityLabel={s.line}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.02)']}
                  style={styles.solCard}
                >
                  <TraitGlyph name={s.icon} color={accent} size={22} />
                  <Text style={styles.solText}>{s.line}</Text>
                </LinearGradient>
              </Pressable>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.finalBox}>
        <LinearGradient colors={[`${accent}28`, 'rgba(255,255,255,0.04)']} style={styles.finalInner}>
          <Text style={[styles.finalText, { color: accent }]}>{block.final}</Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(400)} style={styles.cta}>
        <PrimaryButton label={block.ctaDay1} onPress={onDay1} />
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(320).duration(360)}>
        <Text style={styles.shareHead}>{labels.shareTitle}</Text>
      </Animated.View>
      <View style={styles.shareRow}>
        <TouchableOpacity
          style={[styles.sharePill, { borderColor: `${accent}55` }]}
          onPress={onShareWhatsapp}
          disabled={sharing}
          activeOpacity={0.85}
        >
          <MessageCircle size={18} color={accent} />
          <Text style={styles.sharePillText}>{labels.whatsapp}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sharePill, { borderColor: `${accent}55` }]}
          onPress={onShareInstagram1}
          disabled={sharing}
          activeOpacity={0.85}
        >
          <Instagram size={18} color={accent} />
          <Text style={styles.sharePillText}>{labels.instagram1}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.shareRow}>
        <TouchableOpacity
          style={[styles.sharePill, { borderColor: `${accent}55` }]}
          onPress={onShareInstagram2}
          disabled={sharing}
          activeOpacity={0.85}
        >
          <Instagram size={18} color={accent} />
          <Text style={styles.sharePillText}>{labels.instagram2}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sharePill, { borderColor: `${accent}55` }]}
          onPress={() => setTikOpen(true)}
          disabled={sharing}
          activeOpacity={0.85}
        >
          <Music2 size={18} color={accent} />
          <Text style={styles.sharePillText}>{labels.tiktok}</Text>
        </TouchableOpacity>
      </View>

      {sharing ? (
        <View style={styles.busy}>
          <ActivityIndicator color={accent} />
        </View>
      ) : null}

      <Modal visible={tikOpen} transparent animationType="fade" onRequestClose={() => setTikOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setTikOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setTikOpen(false)} hitSlop={12}>
              <X size={22} color="#94a3b8" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>TikTok ({pack.tiktok.suggestedDurationLabel})</Text>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {(locale === 'pt'
                ? [
                    ['Gancho', pack.tiktok.hook],
                    ['Identificar', pack.tiktok.identify],
                    ['Explicar', pack.tiktok.explain],
                    ['CTA', pack.tiktok.cta],
                  ]
                : [
                    ['Hook', pack.tiktok.hook],
                    ['ID', pack.tiktok.identify],
                    ['Explain', pack.tiktok.explain],
                    ['CTA', pack.tiktok.cta],
                  ]
              ).map(([label, text], i) => (
                <View key={label}>
                  <Text style={[styles.modalSegHead, i === 0 && styles.modalSegHeadFirst]}>{label}</Text>
                  <Text style={styles.modalBody}>{text}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.modalBtn, { backgroundColor: accent }]}
              onPress={() => {
                void onShareTiktokScript().then(() => setTikOpen(false));
              }}
            >
              <Text style={styles.modalBtnText}>{labels.copyShare}</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
    paddingBottom: 36,
    width: '100%',
    alignSelf: 'center',
  },
  block: { marginBottom: 22 },
  section: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.85)',
    fontWeight: '700',
    marginBottom: 10,
  },
  axisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 2,
    marginBottom: 4,
  },
  axisLab: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.75)',
  },
  caption: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(148,163,184,0.95)',
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  iconCell: {
    width: '31%',
    minWidth: 100,
    flexGrow: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(226,232,240,0.95)',
    textAlign: 'center',
    lineHeight: 16,
  },
  solStack: { gap: 12 },
  solPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  solCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  solText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(241,245,249,0.96)',
  },
  finalBox: {
    marginBottom: 20,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  finalInner: { padding: 18 },
  finalText: {
    fontSize: 17,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.2,
  },
  shareHead: {
    fontSize: 11,
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.75)',
    fontWeight: '700',
    marginBottom: 10,
  },
  shareRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  sharePill: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  sharePillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e2e8f0',
  },
  busy: { alignItems: 'center', marginVertical: 8 },
  cta: { marginTop: 4, marginBottom: 16 },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#0f172a',
    borderRadius: 20,
    padding: 20,
    maxHeight: 420,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  modalClose: { position: 'absolute', right: 14, top: 14, zIndex: 2 },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f1f5f9',
    marginBottom: 12,
    paddingRight: 32,
  },
  modalScroll: { maxHeight: 280, marginBottom: 16 },
  modalSegHead: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.4,
    color: 'rgba(148,163,184,0.85)',
    textTransform: 'uppercase',
    marginTop: 10,
    marginBottom: 4,
  },
  modalSegHeadFirst: { marginTop: 0 },
  modalBody: {
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(203,213,225,0.95)',
    fontWeight: '500',
  },
  modalBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  modalBtnText: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
});
