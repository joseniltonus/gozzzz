import { View, Text, StyleSheet, TouchableOpacity, Share, Platform, Image, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, Share2, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function QRCodeScreen() {
  const router = useRouter();
  const appUrl = 'https://gozzzz.app';
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(appUrl)}&bgcolor=ffffff&color=0f172a&margin=1`;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `GoZzzz - Transforme seu sono com ciência\n\nBaseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores publicações científicas do mundo.\n\nBaixe agora: ${appUrl}`,
        title: 'GoZzzz - Sleep Science App',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleOpenLink = () => {
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(appUrl, '_blank');
    }
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.headerTitle}>Compartilhar App</Text>
          </View>

          <View style={styles.qrContainer}>
            <View style={styles.qrCard}>
              <Moon size={64} color="#fbbf24" />
              <Text style={styles.appName}>GoZzzz</Text>
              <Text style={styles.tagline}>
                Transforme seu sono com ciência
              </Text>

              <View style={styles.qrCodePlaceholder}>
                {!imageLoaded && !imageError && (
                  <View style={styles.qrLoadingOverlay}>
                    <ActivityIndicator size="large" color="#0f172a" />
                  </View>
                )}
                {imageError ? (
                  <View style={styles.qrErrorBox}>
                    <Text style={styles.qrErrorText}>gozzzz.app</Text>
                  </View>
                ) : (
                  <Image
                    source={{ uri: qrApiUrl }}
                    style={[styles.qrImage, !imageLoaded && styles.qrImageHidden]}
                    resizeMode="contain"
                    onLoad={() => setImageLoaded(true)}
                    onError={() => { setImageError(true); setImageLoaded(true); }}
                  />
                )}
              </View>
              <Text style={styles.qrNote}>Escaneie para baixar</Text>

              <Text style={styles.urlText}>{appUrl}</Text>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  Baseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores publicações científicas do mundo.
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Share2 size={20} color="#0f172a" />
              <Text style={styles.actionButtonText}>Compartilhar Link</Text>
            </TouchableOpacity>

            {Platform.OS === 'web' && (
              <TouchableOpacity
                style={styles.actionButtonSecondary}
                onPress={handleOpenLink}
              >
                <ExternalLink size={20} color="#fbbf24" />
                <Text style={styles.actionButtonTextSecondary}>
                  Abrir Link
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Compartilhe a Transformação</Text>
            <Text style={styles.infoText}>
              Ajude outras pessoas a descobrirem o poder de um sono de qualidade.
              Compartilhe o GoZzzz com amigos e familiares!
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
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
    flex: 1,
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
  qrContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  qrCard: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  appName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#e8d5b7',
    marginTop: 16,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#8892a4',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '600',
  },
  qrCodePlaceholder: {
    width: 220,
    height: 220,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrLoadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  qrImage: {
    width: 220,
    height: 220,
  },
  qrImageHidden: {
    opacity: 0,
  },
  qrErrorBox: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12121e',
    borderRadius: 12,
  },
  qrErrorText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e8d5b7',
    textAlign: 'center',
  },
  qrNote: {
    fontSize: 13,
    color: '#8892a4',
    fontWeight: '600',
    marginBottom: 16,
  },
  urlText: {
    fontSize: 16,
    color: '#d4a96a',
    fontWeight: '700',
    marginBottom: 16,
  },
  badge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  badgeText: {
    fontSize: 13,
    color: '#d4a96a',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
  },
  actions: {
    gap: 12,
    marginBottom: 24,
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
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 18,
    borderWidth: 2,
    borderColor: 'rgba(251, 191, 36, 0.4)',
  },
  actionButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  actionButtonTextSecondary: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fbbf24',
  },
  infoBox: {
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.3)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fbbf24',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: '#8892a4',
    lineHeight: 22,
  },
});
