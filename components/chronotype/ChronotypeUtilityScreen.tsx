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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { MessageCircle, Instagram, Music2, X } from 'lucide-react-native';
import type { LocaleChronotypeBlock } from '@/data/chronotypesExperience';
import { tiktokScriptText } from '@/data/chronotypesExperience';
import PrimaryButton from '@/src/components/PrimaryButton';
import ChronotypeEnergyBars from '@/components/chronotype/ChronotypeEnergyBars';
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
  const script = tiktokScriptText(block);

  return (
    <View style={styles.wrap}>
      <Animated.View entering={FadeInDown.duration(380)} style={styles.block}>
        <Text style={styles.section}>{block.sectionWhy}</Text>
        <ChronotypeEnergyBars
          morning={block.energy.morning}
          night={block.energy.night}
          accent={accent}
          morningLabel={labels.morning}
          nightLabel={labels.night}
        />
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
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                style={styles.solCard}
              >
                <TraitGlyph name={s.icon} color={accent} size={22} />
                <Text style={styles.solText}>{s.line}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(260).duration(400)} style={styles.finalBox}>
        <LinearGradient colors={[`${accent}22`, 'rgba(255,255,255,0.04)']} style={styles.finalInner}>
          <Text style={[styles.finalText, { color: accent }]}>{block.final}</Text>
        </LinearGradient>
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

      <Animated.View entering={FadeInDown.delay(400).duration(400)} style={styles.cta}>
        <PrimaryButton label={block.ctaDay1} onPress={onDay1} />
      </Animated.View>

      <Modal visible={tikOpen} transparent animationType="fade" onRequestClose={() => setTikOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setTikOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <TouchableOpacity style={styles.modalClose} onPress={() => setTikOpen(false)} hitSlop={12}>
              <X size={22} color="#94a3b8" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>TikTok (10–15s)</Text>
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalBody}>{script}</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 36,
    maxWidth: 520,
    width: '100%',
    alignSelf: 'center',
  },
  block: { marginBottom: 18 },
  section: {
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: 'rgba(148,163,184,0.85)',
    fontWeight: '700',
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(148,163,184,0.95)',
    textAlign: 'center',
    marginTop: 8,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
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
  solStack: { gap: 10 },
  solCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  solText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(241,245,249,0.96)',
  },
  finalBox: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
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
  cta: { marginTop: 8 },
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
