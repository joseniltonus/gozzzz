import { View, Text, StyleSheet, TouchableOpacity, Linking, Animated, Easing, Platform, useWindowDimensions } from 'react-native';
import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@/contexts/ThemeContext';
import { WEB_PUBLIC_LANDING_URL } from '@/lib/webOgConstants';

interface ShareableCardProps {
  chronotypeName: string;
  chronotypeEmoji: string;
  title: string;
  message: string;
  statPercent: number;
  onShare?: (message: string) => void;
}

export function ShareableCard({
  chronotypeName,
  chronotypeEmoji,
  title,
  message,
  statPercent,
  onShare,
}: ShareableCardProps) {
  const { isDark } = useTheme();
  const { width } = useWindowDimensions();
  const isNarrow = width < 380;
  const pulseAnim = useRef(new Animated.Value(0)).current;

  const tc = {
    bg: isDark ? 'rgba(13, 19, 35, 0.92)' : 'rgba(22, 30, 52, 0.94)',
    text: isDark ? '#f0ece3' : '#ffffff',
    textMuted: isDark ? '#8892a4' : '#cbd5e1',
    accent: '#d4a96a',
  };

  const handleWhatsAppShare = async () => {
    const text = encodeURIComponent(`${message}\n\nDescobri no GoZzzz 🌙\n${WEB_PUBLIC_LANDING_URL}`);
    const url = `https://wa.me/?text=${text}`;
    await Linking.openURL(url);
    onShare?.(message);
  };

  const handleXShare = async () => {
    const text = encodeURIComponent(`${message} 🌙 #GoZzzz #SonoMelhor`);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    await Linking.openURL(url);
    onShare?.(message);
  };

  const handleInstagramShare = async () => {
    const fallback = 'https://www.instagram.com/';
    const appUrl = Platform.OS === 'web' ? fallback : 'instagram://app';
    const supported = await Linking.canOpenURL(appUrl);
    await Linking.openURL(supported ? appUrl : fallback);
    onShare?.(message);
  };

  const handleTikTokShare = async () => {
    const fallback = 'https://www.tiktok.com/';
    const appUrl = Platform.OS === 'web' ? fallback : 'tiktok://';
    const supported = await Linking.canOpenURL(appUrl);
    await Linking.openURL(supported ? appUrl : fallback);
    onShare?.(message);
  };

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const floatingStyle = {
    transform: [
      {
        translateY: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -2],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: tc.bg,
            borderColor: tc.accent,
          },
        ]}
      >
        <View style={styles.cardGlow} />
        <View style={styles.content}>
          <Text style={[styles.title, { color: tc.text }]}>{title}</Text>
          <Text style={[styles.message, { color: tc.textMuted }]}>{message}</Text>
          <Text style={[styles.stat, { color: tc.accent }]}>
            Apenas {statPercent}% das pessoas compartilham seu cronótipo
          </Text>
        </View>
      </View>

      {/* Share Buttons */}
      <View style={styles.shareButtons}>
        <Animated.View style={floatingStyle}>
          <TouchableOpacity
            style={[styles.shareBtn, isNarrow && styles.shareBtnNarrow, styles.whatsAppBtn]}
            onPress={handleWhatsAppShare}
          >
            <MessageCircle size={20} color="#ffffff" />
            <Text style={[styles.shareBtnTextLight, isNarrow && styles.shareBtnTextNarrow]}>WhatsApp</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={floatingStyle}>
          <TouchableOpacity
            style={[styles.shareBtn, isNarrow && styles.shareBtnNarrow, styles.xBtn]}
            onPress={handleXShare}
          >
            <Text style={[styles.shareBtnTextLight, { fontSize: 18, fontWeight: '800' }]}>𝕏</Text>
            <Text style={[styles.shareBtnTextLight, isNarrow && styles.shareBtnTextNarrow]}>X/Twitter</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={floatingStyle}>
          <TouchableOpacity
            style={[styles.shareBtn, isNarrow && styles.shareBtnNarrow, styles.instagramBtn]}
            onPress={handleInstagramShare}
          >
            <FontAwesome5 name="instagram" size={18} color="#ffffff" />
            <Text style={[styles.shareBtnTextLight, isNarrow && styles.shareBtnTextNarrow]}>Instagram</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={floatingStyle}>
          <TouchableOpacity
            style={[styles.shareBtn, isNarrow && styles.shareBtnNarrow, styles.tiktokBtn]}
            onPress={handleTikTokShare}
          >
            <FontAwesome5 name="tiktok" size={17} color="#ffffff" />
            <Text style={[styles.shareBtnTextLight, isNarrow && styles.shareBtnTextNarrow]}>TikTok</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 18,
  },
  card: {
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.24)',
    overflow: 'hidden',
  },
  cardGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    right: -28,
    top: -34,
    backgroundColor: 'rgba(212,169,106,0.14)',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
    textAlign: 'center',
    lineHeight: 23,
    letterSpacing: 0.35,
  },
  message: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
    lineHeight: 19,
    letterSpacing: 0.15,
  },
  stat: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 1,
    textAlign: 'center',
    lineHeight: 15,
    letterSpacing: 0.25,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 0,
    paddingHorizontal: 14,
    borderRadius: 14,
    minWidth: 112,
    minHeight: 54,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  shareBtnNarrow: {
    minWidth: 96,
    minHeight: 50,
    paddingHorizontal: 10,
  },
  whatsAppBtn: {
    backgroundColor: '#1FAE57',
  },
  xBtn: {
    backgroundColor: '#161616',
  },
  instagramBtn: {
    backgroundColor: '#9B3A74',
  },
  tiktokBtn: {
    backgroundColor: '#1A1A1A',
  },
  shareBtnTextLight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.35,
  },
  shareBtnTextNarrow: {
    fontSize: 12,
  },
});
