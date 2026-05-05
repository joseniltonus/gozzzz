import { Modal, View, Text, StyleSheet, Pressable, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ChronotypeProfileExplainCopy, ChronotypeResultAccent } from '@/data/chronotypeResultPremium';
import GhostButton from '@/src/components/GhostButton';

const BG_SHEET_TOP = '#0a0e1a';
const BG_SHEET_BOTTOM = '#050816';

type Props = {
  visible: boolean;
  onClose: () => void;
  explain: ChronotypeProfileExplainCopy;
  accent: ChronotypeResultAccent;
  emoji: string;
  profileName: string;
  onStartDay1: () => void;
};

export default function ChronotypeProfileExplainModal({
  visible,
  onClose,
  explain,
  accent,
  emoji,
  profileName,
  onStartDay1,
}: Props) {
  const handleStart = () => {
    onClose();
    onStartDay1();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onClose} accessibilityRole="button" accessibilityLabel={explain.closeLabel} />
        <SafeAreaView style={styles.sheetSafe} edges={['bottom', 'left', 'right']}>
          <View style={[styles.sheetOuter, { borderTopColor: accent.primary }]}>
            <LinearGradient colors={[BG_SHEET_TOP, BG_SHEET_BOTTOM]} style={styles.sheetGrad}>
              <View style={styles.handle} />
              <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollInner}
                showsVerticalScrollIndicator={false}
                bounces={false}
              >
                <View style={styles.headerRow}>
                  <Text style={styles.headerEmoji} allowFontScaling={false}>
                    {emoji}
                  </Text>
                  <View style={styles.headerTextCol}>
                    <Text style={styles.headerTitle}>{explain.title}</Text>
                    <Text style={styles.headerName}>{profileName}</Text>
                  </View>
                  <Pressable onPress={onClose} hitSlop={14} style={styles.closeBtn} accessibilityRole="button">
                    <Text style={styles.closeGlyph}>✕</Text>
                  </Pressable>
                </View>
                <View style={[styles.accentLine, { backgroundColor: accent.primary }]} />
                {explain.paragraphs.map((p, i) => (
                  <Text key={i} style={styles.paragraph}>
                    {p}
                  </Text>
                ))}
                <Text style={styles.disclaimer}>{explain.disclaimer}</Text>
              </ScrollView>
              <View style={styles.actions}>
                <Pressable
                  onPress={handleStart}
                  style={({ pressed }) => [styles.primaryBtn, pressed && styles.primaryBtnPressed]}
                >
                  <LinearGradient
                    colors={['rgba(255,255,255,0.2)', accent.primary]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryGrad}
                  >
                    <Text style={styles.primaryLabel}>{explain.startCtaLabel}</Text>
                  </LinearGradient>
                </Pressable>
                <GhostButton label={explain.closeLabel} onPress={onClose} style={styles.ghost} />
              </View>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(2,4,12,0.72)',
  },
  sheetSafe: {
    maxHeight: '88%',
    zIndex: 2,
  },
  sheetOuter: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderTopWidth: 3,
    overflow: 'hidden',
  },
  sheetGrad: {
    paddingBottom: Platform.OS === 'ios' ? 8 : 12,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    marginTop: 10,
    marginBottom: 6,
  },
  scroll: {
    maxHeight: 420,
  },
  scrollInner: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 12,
  },
  headerEmoji: {
    fontSize: 40,
    lineHeight: 44,
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  headerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f1f5f9',
    letterSpacing: -0.3,
  },
  closeBtn: {
    padding: 8,
    marginTop: -4,
  },
  closeGlyph: {
    fontSize: 18,
    color: '#64748b',
  },
  accentLine: {
    height: 2,
    borderRadius: 1,
    opacity: 0.85,
    marginBottom: 16,
    width: 48,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 25,
    color: '#cbd5e1',
    marginBottom: 14,
  },
  disclaimer: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    marginTop: 4,
    letterSpacing: 0.15,
  },
  actions: {
    paddingHorizontal: 22,
    paddingTop: 8,
    gap: 10,
  },
  primaryBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  primaryBtnPressed: {
    opacity: 0.92,
  },
  primaryGrad: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  primaryLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  ghost: {
    marginBottom: 4,
  },
});
