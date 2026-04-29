import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal as RNModal } from 'react-native';
import { Crown, X, ArrowRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

interface FreeTierPaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FreeTierPaywallModal({ visible, onClose }: FreeTierPaywallModalProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const { isDark } = useTheme();

  const handleUpgrade = () => {
    onClose();
    router.push('/payment');
  };

  const tc = {
    modalBg: isDark ? '#12121e' : '#ffffff',
    modalBorder: isDark ? 'rgba(212,169,106,0.2)' : 'rgba(0,0,0,0.1)',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    accentBg: isDark ? 'rgba(212,169,106,0.05)' : 'rgba(212,169,106,0.08)',
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable
          style={[styles.modal, { backgroundColor: tc.modalBg, borderColor: tc.modalBorder }]}
          onPress={() => {}}
        >
          <View style={[styles.header, { borderBottomColor: isDark ? 'rgba(212,169,106,0.1)' : 'rgba(0,0,0,0.08)' }]}>
            <View style={styles.headerLeft}>
              <Crown size={22} color="#d4a96a" />
              <Text style={styles.headerLabel}>
                {language === 'pt' ? 'ACESSO PREMIUM' : 'PREMIUM ACCESS'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' }]}
              onPress={onClose}
            >
              <X size={24} color="#64748b" />
            </TouchableOpacity>
          </View>

          <View style={styles.body}>
            <View style={styles.iconSection}>
              <Crown size={56} color="#d4a96a" />
            </View>

            <Text style={[styles.title, { color: isDark ? '#ffffff' : '#1a202c' }]}>
              {language === 'pt' ? 'Desbloqueie os 18 Passos Restantes' : 'Unlock the Remaining 18 Steps'}
            </Text>

            <Text style={[styles.subtitle, { color: tc.textSecondary }]}>
              {language === 'pt'
                ? 'Você completou as 3 primeiras lições. Agora acesse o programa completo de 21 dias.'
                : 'You completed the first 3 lessons. Now access the complete 21-day program.'}
            </Text>

            <View style={[styles.features, { backgroundColor: tc.accentBg }]}>
              {[
                language === 'pt'
                  ? '18 lições adicionais com protocolos avançados'
                  : '18 additional lessons with advanced protocols',
                language === 'pt'
                  ? 'Técnicas de otimização personalizadas pelo seu cronotipo'
                  : 'Optimization techniques personalized by your chronotype',
                language === 'pt'
                  ? 'Acesso vitalício — assista quantas vezes quiser'
                  : 'Lifetime access — watch as many times as you want',
                language === 'pt'
                  ? 'Suporte contínuo e atualizações futuras incluídas'
                  : 'Ongoing support and future updates included',
              ].map((text, idx) => (
                <View key={idx} style={styles.featureItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={[styles.featureText, { color: tc.textPrimary }]}>
                    {text}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.priceSection}>
              <Text style={styles.price}>R$ 147</Text>
              <Text style={[styles.priceDesc, { color: tc.textSecondary }]}>
                {language === 'pt' ? 'pagamento único' : 'one-time payment'}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={handleUpgrade}
            >
              <Crown size={18} color="#0f172a" />
              <Text style={styles.ctaBtnText}>
                {language === 'pt' ? 'Desbloquear Agora' : 'Unlock Now'}
              </Text>
              <ArrowRight size={18} color="#0f172a" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={onClose}
            >
              <Text style={[styles.secondaryBtnText, { color: tc.textSecondary }]}>
                {language === 'pt' ? 'Continuar assistindo lições grátis' : 'Continue watching free lessons'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    borderRadius: 24,
    width: '100%',
    maxWidth: 420,
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    alignItems: 'center',
  },
  iconSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  features: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkmark: {
    fontSize: 16,
    color: '#10b981',
    fontWeight: '800',
    marginTop: 2,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    lineHeight: 20,
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 40,
    fontWeight: '800',
    color: '#d4a96a',
    marginBottom: 4,
  },
  priceDesc: {
    fontSize: 13,
  },
  ctaBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  ctaBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  secondaryBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
