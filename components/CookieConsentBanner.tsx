import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Shield } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { storage } from '@/lib/storage';

const COOKIE_KEY = 'gozzzz_cookie_consent';

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const router = useRouter();
  const { language } = useLanguage();

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    storage.getItem(COOKIE_KEY).then((accepted) => {
      if (!accepted) {
        setVisible(true);
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay: 1500,
          // Web: useNativeDriver com opacity em Animated.View pode acionar caminhos
          // de estilo que quebram em alguns Chrome (CSSStyleDeclaration).
          useNativeDriver: Platform.OS !== 'web',
        }).start();
      }
    });
  }, [opacity]);

  const handleAccept = () => {
    storage.setItem(COOKIE_KEY, 'true');
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: Platform.OS !== 'web',
    }).start(() => setVisible(false));
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <View style={styles.inner}>
        <View style={styles.iconRow}>
          <Shield size={18} color="#fbbf24" />
          <Text style={styles.title}>{language === 'pt' ? 'Consentimento de Cookies' : 'Cookie Consent'}</Text>
        </View>
        <Text style={styles.text}>
          {language === 'pt'
            ? 'Usamos cookies para melhorar sua experiência e analisar o desempenho do site. Ao continuar navegando, você consente com nosso uso de cookies.'
            : 'We use cookies to enhance your experience and analyze site performance. By continuing to browse, you consent to our use of cookies.'}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.learnMoreBtn}
            onPress={() => router.push(language === 'pt' ? '/web/sobre' : '/privacy')}
          >
            <Text style={styles.learnMoreText}>{language === 'pt' ? 'Saiba Mais' : 'Learn More'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptBtn} onPress={handleAccept}>
            <Text style={styles.acceptText}>{language === 'pt' ? 'Aceitar' : 'Accept'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? ('fixed' as any) : 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    zIndex: 9999,
    maxWidth: 560,
    alignSelf: 'center',
  },
  inner: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#ffffff',
  },
  text: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-end',
  },
  learnMoreBtn: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  learnMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  acceptBtn: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
  },
  acceptText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
  },
});
