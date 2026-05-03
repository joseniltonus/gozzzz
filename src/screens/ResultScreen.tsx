import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MessageCircle } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import PrimaryButton from '@/src/components/PrimaryButton';
import { useLanguage } from '@/contexts/LanguageContext';

type ChronoKey = 'dolphin' | 'lion' | 'bear' | 'wolf';

const CHRONO: Record<
  ChronoKey,
  { emoji: string; namePt: string; nameEn: string; color: string; popPct: number; sciencePt: string; scienceEn: string }
> = {
  dolphin: {
    emoji: '🐬',
    namePt: 'Golfinho',
    nameEn: 'Dolphin',
    color: '#4a9eff',
    popPct: 10,
    sciencePt:
      'Apenas 10% da população tem esse perfil. Golfinhos têm cortisol elevado à noite — o oposto dos outros cronotipos. Não é fraqueza. É biologia circadiana.',
    scienceEn:
      'Only about 10% of people share this profile. Dolphins often have higher evening cortisol — the opposite of other chronotypes. Not weakness — circadian biology.',
  },
  lion: {
    emoji: '🦁',
    namePt: 'Leão',
    nameEn: 'Lion',
    color: '#f59e0b',
    popPct: 15,
    sciencePt:
      'Apenas 15% da população é Leão. Pico de energia entre 8h e 12h. Queda de desempenho abrupta após as 17h.',
    scienceEn:
      'About 15% are Lions. Energy peaks between 8am–12pm, with a sharper performance drop after 5pm.',
  },
  bear: {
    emoji: '🐻',
    namePt: 'Urso',
    nameEn: 'Bear',
    color: '#a78bfa',
    popPct: 50,
    sciencePt:
      'Cerca de 50% da população é Urso. Ritmo alinhado ao ciclo solar. Pico entre 10h e 14h.',
    scienceEn:
      'Roughly 50% are Bears. Rhythm tracks the solar cycle; peak focus is often between 10am–2pm.',
  },
  wolf: {
    emoji: '🐺',
    namePt: 'Lobo',
    nameEn: 'Wolf',
    color: '#64748b',
    popPct: 25,
    sciencePt:
      'Cerca de 25% da população é Lobo. Energia real começa após as 18h. Dificuldade crônica de acordar cedo é biológica.',
    scienceEn:
      'About 25% are Wolves. Real energy often starts after 6pm; struggling to wake early is often biological.',
  },
};

function parseChronotypeParam(raw?: string | string[]): ChronoKey {
  const v = (Array.isArray(raw) ? raw[0] : raw)?.trim().toLowerCase() ?? '';
  if (v === 'dolphin' || v === 'golfinho') return 'dolphin';
  if (v === 'lion' || v === 'leão' || v === 'leao') return 'lion';
  if (v === 'bear' || v === 'urso') return 'bear';
  if (v === 'wolf' || v === 'lobo') return 'wolf';
  return 'bear';
}

export default function ResultScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { chronotype: raw } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const key = parseChronotypeParam(raw);
  const row = CHRONO[key];

  const displayName = isPt ? row.namePt : row.nameEn;
  const science = isPt ? row.sciencePt : row.scienceEn;

  const shareMessage = isPt
    ? `Sou cronotipo ${row.namePt} ${row.emoji} — descobri no GoZzzz.`
    : `I'm a ${row.nameEn} chronotype ${row.emoji} — found with GoZzzz.`;

  const openWhatsApp = () => {
    const text = encodeURIComponent(`${shareMessage}\n\nhttps://gozzzz.app`);
    void Linking.openURL(`https://wa.me/?text=${text}`);
  };

  const openX = () => {
    const text = encodeURIComponent(`${shareMessage} #GoZzzz`);
    void Linking.openURL(`https://twitter.com/intent/tweet?text=${text}`);
  };

  const openInstagram = async () => {
    const fallback = 'https://www.instagram.com/';
    const appUrl = Platform.OS === 'web' ? fallback : 'instagram://app';
    const supported = await Linking.canOpenURL(appUrl);
    void Linking.openURL(supported ? appUrl : fallback);
  };

  const openTikTok = async () => {
    const fallback = 'https://www.tiktok.com/';
    const appUrl = Platform.OS === 'web' ? fallback : 'tiktok://';
    const supported = await Linking.canOpenURL(appUrl);
    void Linking.openURL(supported ? appUrl : fallback);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.badgePill}>
          <Text style={styles.badgeText}>{isPt ? 'Resultado do teste' : 'Test result'}</Text>
        </View>

        <Text style={[styles.emoji, { textAlign: 'center' }]}>{row.emoji}</Text>
        <Text style={[styles.animalName, { color: row.color, textAlign: 'center' }]}>{displayName}</Text>

        <View style={styles.scienceCard}>
          <Text style={styles.scienceLabel}>DADO CIENTÍFICO</Text>
          <Text style={styles.scienceBody}>{science}</Text>
        </View>

        <View style={styles.shareCard}>
          <Text style={styles.shareTitle}>
            {isPt ? 'Compartilhe seu cronotipo' : 'Share your chronotype'}
          </Text>
          <View style={styles.chip}>
            <Text style={styles.chipText}>
              {isPt
                ? `Apenas ${row.popPct}% da população tem esse perfil`
                : `Only about ${row.popPct}% of people share this profile`}
            </Text>
          </View>
          <View style={styles.shareRow}>
            <TouchableOpacity style={[styles.shareBtn, styles.whatsAppBtn]} onPress={openWhatsApp} activeOpacity={0.85}>
              <MessageCircle size={18} color="#ffffff" />
              <Text style={styles.shareBtnText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.xBtn]} onPress={openX} activeOpacity={0.85}>
              <Text style={[styles.shareBtnText, styles.xMark]}>𝕏</Text>
              <Text style={styles.shareBtnText}>{isPt ? 'Twitter' : 'X / Twitter'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.instaBtn]} onPress={() => void openInstagram()} activeOpacity={0.85}>
              <FontAwesome5 name="instagram" size={16} color="#ffffff" />
              <Text style={styles.shareBtnText}>Instagram</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.shareBtn, styles.tiktokBtn]} onPress={() => void openTikTok()} activeOpacity={0.85}>
              <FontAwesome5 name="tiktok" size={15} color="#ffffff" />
              <Text style={styles.shareBtnText}>TikTok</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PrimaryButton
          label={isPt ? 'Ver meu plano de 21 passos →' : 'See my 21-step plan →'}
          onPress={() =>
            router.push({
              pathname: '/(auth)/signup',
              params: { chronotype: key },
            })
          }
        />

        <Text style={styles.footerAttr}>
          {isPt
            ? 'Baseado em Michael Breus, PhD — American Board of Sleep Medicine'
            : 'Based on work by Michael Breus, PhD — American Board of Sleep Medicine'}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
  scroll: {
    paddingHorizontal: 22,
    paddingBottom: 32,
    paddingTop: 12,
  },
  badgePill: {
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 99,
    backgroundColor: 'rgba(111,224,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(111,224,255,0.18)',
    marginBottom: 20,
  },
  badgeText: {
    fontSize: 10,
    color: '#6fe0ff',
    fontWeight: '600',
  },
  emoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  animalName: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
  },
  scienceCard: {
    backgroundColor: 'rgba(169,159,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(169,159,255,0.15)',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  scienceLabel: {
    fontSize: 9,
    color: '#a99fff',
    letterSpacing: 1.6,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
  },
  scienceBody: {
    fontSize: 14,
    color: '#b0b5d5',
    lineHeight: 22,
  },
  shareCard: {
    backgroundColor: 'rgba(255,255,255,0.025)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#b0b5d5',
    textAlign: 'center',
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    backgroundColor: 'rgba(111,224,255,0.07)',
    marginBottom: 16,
  },
  chipText: {
    fontSize: 11,
    color: '#6fe0ff',
    fontWeight: '600',
    textAlign: 'center',
  },
  shareRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    minHeight: 44,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  shareBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
  xMark: {
    fontSize: 16,
    fontWeight: '800',
  },
  whatsAppBtn: {
    backgroundColor: '#1FAE57',
  },
  xBtn: {
    backgroundColor: '#161616',
  },
  instaBtn: {
    backgroundColor: '#9B3A74',
  },
  tiktokBtn: {
    backgroundColor: '#1A1A1A',
  },
  footerAttr: {
    fontSize: 10,
    color: '#252830',
    textAlign: 'center',
    marginTop: 16,
  },
});
