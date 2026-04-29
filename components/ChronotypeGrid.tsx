import { View, Text, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';

const isWeb = Platform.OS === 'web';

interface Chronotype {
  emoji: string;
  name: { pt: string; en: string };
  color: string;
  population: string;
  wake: { pt: string; en: string };
  peak: { pt: string; en: string };
  sleep: { pt: string; en: string };
  summary: { pt: string; en: string };
}

const CHRONOTYPES: Chronotype[] = [
  {
    emoji: '\u{1F981}',
    name: { pt: 'Leão', en: 'Lion' },
    color: '#EF9F27',
    population: '15%',
    wake: { pt: 'acorda ~5h', en: 'wakes ~5 am' },
    peak: { pt: 'alerta antes do meio-dia', en: 'sharp before noon' },
    sleep: { pt: 'dorme 21h', en: 'sleeps 9 pm' },
    summary: { pt: 'Madrugador disciplinado.', en: 'Disciplined early bird.' },
  },
  {
    emoji: '\u{1F43B}',
    name: { pt: 'Urso', en: 'Bear' },
    color: '#1D9E75',
    population: '55%',
    wake: { pt: 'acorda ~7–7h30', en: 'wakes ~7–7:30 am' },
    peak: { pt: 'pico ao longo do dia seguindo o sol', en: 'peak throughout day following sun' },
    sleep: { pt: 'dorme 23h', en: 'sleeps 11 pm' },
    summary: { pt: 'Ritmo equilibrado.', en: 'Balanced, built for 9-to-5.' },
  },
  {
    emoji: '\u{1F43A}',
    name: { pt: 'Lobo', en: 'Wolf' },
    color: '#7F77DD',
    population: '15%',
    wake: { pt: 'acorda ~8h', en: 'wakes ~8 am' },
    peak: { pt: 'pico começa por volta do meio-dia', en: 'peak starts around midday' },
    sleep: { pt: 'dorme meia-noite', en: 'sleeps midnight' },
    summary: { pt: 'Coruja noturna criativa.', en: 'Creative night owl.' },
  },
  {
    emoji: '\u{1F42C}',
    name: { pt: 'Golfinho', en: 'Dolphin' },
    color: '#378ADD',
    population: '15%',
    wake: { pt: 'acorda irregular', en: 'wakes irregularly' },
    peak: { pt: 'pico 10h–14h', en: 'peak 10 am–2 pm' },
    sleep: { pt: 'dorme meia-noite', en: 'sleeps midnight' },
    summary: { pt: 'Insone ansioso.', en: 'Anxious light sleeper.' },
  },
];

interface Props {
  variant: 'dark' | 'light';
}

export function ChronotypeGrid({ variant }: Props) {
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const isDark = variant === 'dark';

  const t = (obj: { pt: string; en: string }) => (isPt ? obj.pt : obj.en);

  const wakeLabel = isPt ? 'Acorda' : 'Wake';
  const peakLabel = isPt ? 'Pico' : 'Peak';
  const sleepLabel = isPt ? 'Dorme' : 'Sleep';

  return (
    <View style={styles.grid}>
      {CHRONOTYPES.map((c) => (
        <View
          key={c.name.en}
          style={[
            styles.card,
            isDark ? styles.cardDark : styles.cardLight,
            { borderTopColor: c.color },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>{c.emoji}</Text>
            <Text style={[styles.name, isDark ? styles.nameDark : styles.nameLight]}>
              {t(c.name)}
            </Text>
          </View>

          <View style={[styles.badge, { backgroundColor: c.color + '18' }]}>
            <Text style={[styles.badgeText, { color: c.color }]}>{c.population}</Text>
          </View>

          <View style={styles.rows}>
            <View style={styles.row}>
              <Text style={[styles.rowLabel, isDark ? styles.rowLabelDark : styles.rowLabelLight]}>
                {wakeLabel}
              </Text>
              <Text style={[styles.rowValue, isDark ? styles.rowValueDark : styles.rowValueLight]}>
                {t(c.wake)}
              </Text>
            </View>
            <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />
            <View style={styles.row}>
              <Text style={[styles.rowLabel, isDark ? styles.rowLabelDark : styles.rowLabelLight]}>
                {peakLabel}
              </Text>
              <Text style={[styles.rowValue, isDark ? styles.rowValueDark : styles.rowValueLight]}>
                {t(c.peak)}
              </Text>
            </View>
            <View style={[styles.divider, isDark ? styles.dividerDark : styles.dividerLight]} />
            <View style={styles.row}>
              <Text style={[styles.rowLabel, isDark ? styles.rowLabelDark : styles.rowLabelLight]}>
                {sleepLabel}
              </Text>
              <Text style={[styles.rowValue, isDark ? styles.rowValueDark : styles.rowValueLight]}>
                {t(c.sleep)}
              </Text>
            </View>
          </View>

          <View style={[styles.summaryPill, { backgroundColor: c.color + '12', borderColor: c.color + '30' }]}>
            <Text style={[styles.summaryText, { color: c.color }]}>
              {t(c.summary)}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  card: {
    width: isWeb ? 'calc(50% - 6px)' as unknown as number : '100%' as unknown as number,
    borderTopWidth: 3,
    borderRadius: 12,
    borderWidth: 0.5,
    padding: 16,
  },
  cardDark: {
    backgroundColor: '#12121e',
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardLight: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  emoji: {
    fontSize: 24,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
  },
  nameDark: {
    color: '#e8d5b7',
  },
  nameLight: {
    color: '#0f172a',
  },

  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },

  rows: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  rowLabelDark: {
    color: '#4a5568',
  },
  rowLabelLight: {
    color: '#94a3b8',
  },
  rowValue: {
    fontSize: 13,
    fontWeight: '500',
  },
  rowValueDark: {
    color: '#8892a4',
  },
  rowValueLight: {
    color: '#475569',
  },
  divider: {
    height: 0.5,
  },
  dividerDark: {
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  dividerLight: {
    backgroundColor: '#f1f5f9',
  },

  summaryPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  summaryText: {
    fontSize: 12,
    fontWeight: '600',
    fontStyle: 'italic',
  },
});
