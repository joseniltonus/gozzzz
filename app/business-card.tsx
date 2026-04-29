import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Share2, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function BusinessCardScreen() {
  const router = useRouter();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `GoZzzz - Programa científico de sono em 21 passos 🌙\n\nTransforme seu sono com ciência.\n\nBaixe agora: https://gozzzz.app`,
        title: 'GoZzzz - Sleep Science App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#0f172a', '#1e293b']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Cartão de Visita Digital</Text>
          </View>

          <View style={styles.cardsContainer}>
            <View style={styles.cardWrapper}>
              <Text style={styles.cardLabel}>Frente do Cartão</Text>
              <View style={styles.businessCardFront}>
                <LinearGradient
                  colors={['#1e293b', '#334155']}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardHeader}>
                    <Moon size={48} color="#fbbf24" />
                    <View style={styles.sparklesContainer}>
                      <Sparkles size={16} color="#fbbf24" style={styles.sparkle1} />
                      <Sparkles size={12} color="#fbbf24" style={styles.sparkle2} />
                      <Sparkles size={14} color="#fbbf24" style={styles.sparkle3} />
                    </View>
                  </View>

                  <Text style={styles.cardAppName}>GoZzzz</Text>

                  <View style={styles.cardTaglineBox}>
                    <Text style={styles.cardTagline}>
                      Programa científico{'\n'}
                      de sono em 21 passos
                    </Text>
                  </View>

                  <View style={styles.cardBadge}>
                    <Text style={styles.cardBadgeText}>🧠 BASEADO EM CIÊNCIA</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            <View style={styles.cardWrapper}>
              <Text style={styles.cardLabel}>Verso do Cartão</Text>
              <View style={styles.businessCardBack}>
                <LinearGradient
                  colors={['#12121e', '#0f1a2e']}
                  style={styles.cardGradient}
                >
                  <View style={styles.backContent}>
                    <View style={styles.qrMiniPlaceholder}>
                      <View style={styles.qrMiniPattern}>
                        <Moon size={24} color="#0f172a" />
                      </View>
                      <Text style={styles.qrMiniText}>Escaneie</Text>
                    </View>

                    <View style={styles.expertsBox}>
                      <Text style={styles.expertsTitle}>O que você vai aprender:</Text>
                      <Text style={styles.expertName}>• Arquitetura do sono</Text>
                      <Text style={styles.expertSubtitle}>Biologia circadiana</Text>

                      <Text style={styles.expertName}>• Exposição à luz</Text>
                      <Text style={styles.expertSubtitle}>Regulação de melatonina</Text>

                      <Text style={styles.expertName}>• Alimentação e exercício</Text>
                      <Text style={styles.expertSubtitle}>Protocolos baseados em ciência</Text>

                      <Text style={styles.expertName}>• Higiene do sono</Text>
                      <Text style={styles.expertSubtitle}>Rotinas e ambiente</Text>

                      <Text style={styles.cardUrl}>gozzzz.app</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </View>

          <View style={styles.viralPhrasesSection}>
            <Text style={styles.sectionTitle}>Frases Virais para Compartilhar</Text>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>🌙</Text>
                <Text style={styles.phraseNumber}>#1</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;Dormir bem não é luxo. É seu superpoder. GoZzzz.&quot;
              </Text>
            </View>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>🧠</Text>
                <Text style={styles.phraseNumber}>#2</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;3 gênios do sono. 1 app. Sua vida transformada. GoZzzz.&quot;
              </Text>
            </View>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>💪</Text>
                <Text style={styles.phraseNumber}>#3</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;15 anos de insônia viraram seu guia de sono. GoZzzz.&quot;
              </Text>
            </View>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>✨</Text>
                <Text style={styles.phraseNumber}>#4</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;21 passos. Ciência real. Sono transformado. GoZzzz.&quot;
              </Text>
            </View>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>🎯</Text>
                <Text style={styles.phraseNumber}>#5</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;21 dias. 3 especialistas. 1 sono transformado. GoZzzz.&quot;
              </Text>
            </View>

            <View style={styles.phraseCard}>
              <View style={styles.phraseHeader}>
                <Text style={styles.phraseEmoji}>🚀</Text>
                <Text style={styles.phraseNumber}>#6</Text>
              </View>
              <Text style={styles.phraseText}>
                &quot;Cansado de estar cansado? GoZzzz tem a ciência que você precisa.&quot;
              </Text>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color="#ffffff" />
              <Text style={styles.actionButtonText}>Compartilhar Cartão</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>Dicas para Compartilhar</Text>
            <Text style={styles.tipItem}>📱 Salve a imagem do cartão no seu celular</Text>
            <Text style={styles.tipItem}>🔗 Use as frases virais nas redes sociais</Text>
            <Text style={styles.tipItem}>✉️ Envie o QR code para clientes e amigos</Text>
            <Text style={styles.tipItem}>🎁 Use como presente digital</Text>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backButtonText: {
    fontSize: 24,
    color: '#ffffff',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
  },
  cardsContainer: {
    gap: 32,
    marginBottom: 40,
  },
  cardWrapper: {
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#8892a4',
    marginBottom: 12,
  },
  businessCardFront: {
    width: '100%',
    aspectRatio: 1.75,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  businessCardBack: {
    width: '100%',
    aspectRatio: 1.75,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    position: 'relative',
  },
  sparklesContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 60,
    height: 60,
  },
  sparkle1: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  sparkle2: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  sparkle3: {
    position: 'absolute',
    top: 10,
    right: 30,
  },
  cardAppName: {
    fontSize: 48,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 2,
  },
  cardTaglineBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  cardTagline: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fbbf24',
    textAlign: 'center',
    lineHeight: 24,
  },
  cardBadge: {
    alignSelf: 'center',
    backgroundColor: '#fbbf24',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  cardBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: 1,
  },
  backContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  qrMiniPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrMiniPattern: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  qrMiniText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0f172a',
  },
  expertsBox: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  expertsTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fbbf24',
    marginBottom: 8,
    textAlign: 'center',
  },
  expertName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 6,
  },
  expertSubtitle: {
    fontSize: 10,
    color: '#4a5568',
    marginBottom: 4,
  },
  cardUrl: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
    marginTop: 6,
  },
  viralPhrasesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 20,
  },
  phraseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  phraseEmoji: {
    fontSize: 28,
  },
  phraseNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fbbf24',
  },
  phraseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  actions: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  tipsBox: {
    backgroundColor: 'rgba(212,169,106,0.08)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#d4a96a',
    marginBottom: 16,
  },
  tipItem: {
    fontSize: 14,
    color: '#8892a4',
    lineHeight: 24,
    marginBottom: 8,
  },
});
