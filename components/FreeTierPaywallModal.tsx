import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal as RNModal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

interface FreeTierPaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FreeTierPaywallModal({ visible, onClose }: FreeTierPaywallModalProps) {
  const router = useRouter();
  const { language } = useLanguage();

  const handleUpgrade = () => {
    onClose();
    router.push('/payment');
  };

  const isPt = language === 'pt';
  const headline = isPt ? 'Você completou os 3 passos gratuitos 🎉' : "You've completed the 3 free steps 🎉";
  const subtitle = isPt
    ? 'Desbloqueie os 21 passos completos e transforme seu sono definitivamente.'
    : 'Unlock all 21 steps and transform your sleep for good.';
  const benefits = isPt
    ? ['21 passos completos', 'Acesso vitalício', 'Garantia de 7 dias']
    : ['All 21 steps', 'Lifetime access', '7-day guarantee'];
  const accessLabel = isPt ? 'Acesso completo' : 'Full access';
  const priceMain = isPt ? 'R$ 147' : '$24.99';
  const badgePay = isPt ? 'Pagamento único' : 'One-time';
  const ctaLabel = isPt ? 'Quero dormir melhor →' : 'I want to sleep better →';
  const secondaryLabel = isPt ? 'Agora não' : 'Not now';

  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.topLight} />
          <View style={styles.handleBar} />

          <View style={styles.crownCircle}>
            <Text style={styles.crownEmoji}>👑</Text>
          </View>

          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>

          {benefits.map((line) => (
            <View key={line} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Text style={styles.benefitCheck}>✓</Text>
              </View>
              <Text style={styles.benefitText}>{line}</Text>
            </View>
          ))}

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceAccessLabel}>{accessLabel}</Text>
              <Text style={styles.priceAmount}>{priceMain}</Text>
            </View>
            <View style={styles.priceBadge}>
              <Text style={styles.priceBadgeText}>{badgePay}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.ctaWrap} onPress={handleUpgrade} activeOpacity={0.88}>
            <LinearGradient
              colors={['#ffd060', '#ffb020']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.ctaGradient}
            >
              <Text style={styles.ctaText}>{ctaLabel}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.secondaryBtn} activeOpacity={0.75}>
            <Text style={styles.secondaryText}>{secondaryLabel}</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0d0f1e',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.15)',
    position: 'relative',
  },
  topLight: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 1,
    backgroundColor: 'rgba(255,190,50,0.30)',
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignSelf: 'center',
    marginBottom: 24,
  },
  crownCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,190,50,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.25)',
    alignSelf: 'center',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crownEmoji: {
    fontSize: 22,
    textAlign: 'center',
  },
  headline: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8090b0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  benefitIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,190,50,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitCheck: {
    fontSize: 8,
    color: '#ffc84a',
    fontWeight: '700',
  },
  benefitText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#dde0f8',
  },
  priceRow: {
    backgroundColor: 'rgba(255,190,50,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.20)',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceAccessLabel: {
    fontSize: 11,
    color: '#8a7040',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  priceAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },
  priceBadge: {
    backgroundColor: 'rgba(255,190,50,0.12)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  priceBadgeText: {
    fontSize: 10,
    color: '#ffc84a',
  },
  ctaWrap: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#ffb020',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#080a15',
  },
  secondaryBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  secondaryText: {
    fontSize: 13,
    color: '#3a4060',
    textAlign: 'center',
  },
});
