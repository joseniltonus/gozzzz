import { View, Text, StyleSheet, Platform } from 'react-native';
import { useLanguage } from '@/contexts/LanguageContext';

const isWeb = Platform.OS === 'web';

const RESEARCHERS = [
  { name: 'Walker', subtitle: 'UC Berkeley' },
  { name: 'Breus', subtitle: 'Chronotype Specialist' },
  { name: 'Huberman', subtitle: 'Stanford' },
  { name: 'Czeisler', subtitle: 'Harvard' },
] as const;

type Variant = 'paywall' | 'landing';

const GOLD = '#d4a96a';

/** Pesquisadores como no paywall mobile; `landing` usa cartão alinhado à web/assinar. */
export function ResearcherTrustBlock({
  variant = 'paywall',
  style,
}: {
  variant?: Variant;
  style?: object;
}) {
  const { language } = useLanguage();
  const label =
    language === 'pt'
      ? 'Um programa construído sobre pesquisas de:'
      : 'A program built on research from:';

  const s = variant === 'landing' ? landingStyles : paywallStyles;

  return (
    <View style={[s.container, style]}>
      <Text style={s.label}>{label}</Text>
      <View style={s.namesRow}>
        {RESEARCHERS.map((researcher, index) => (
          <View key={researcher.name} style={s.itemRow}>
            <Text style={s.nameText}>{researcher.name}</Text>
            <Text style={s.dash}>—</Text>
            <Text style={s.subtitleText}>{researcher.subtitle}</Text>
            {index < RESEARCHERS.length - 1 ? <Text style={s.between}>·</Text> : null}
          </View>
        ))}
      </View>
    </View>
  );
}

const paywallStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f1a',
    borderWidth: 1,
    borderColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 12,
  },
  namesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
  nameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dash: {
    fontSize: 12,
    color: '#888888',
  },
  subtitleText: {
    fontSize: 12,
    color: '#888888',
  },
  between: {
    fontSize: 12,
    color: '#666666',
    marginHorizontal: 6,
  },
});

const landingStyles = StyleSheet.create({
  container: {
    backgroundColor: '#12121e',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.22)',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: isWeb ? 24 : 16,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 14,
    paddingHorizontal: 8,
  },
  namesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 2,
    paddingHorizontal: 4,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 4,
  },
  nameText: {
    fontSize: isWeb ? 14 : 12,
    fontWeight: '700',
    color: '#e8e5df',
  },
  dash: {
    fontSize: 12,
    color: GOLD,
  },
  subtitleText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  between: {
    fontSize: 14,
    color: 'rgba(212,169,106,0.5)',
    marginHorizontal: isWeb ? 10 : 8,
    fontWeight: '300',
  },
});
