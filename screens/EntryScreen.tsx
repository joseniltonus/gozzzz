import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

const BG = '#0c0e1a';
const GLOW_PURPLE = 'rgba(124,111,255,0.15)';
const BADGE_BORDER = 'rgba(169,159,255,0.35)';
const BADGE_BG = 'rgba(169,159,255,0.07)';
const DOT = '#a99fff';
const CTA = '#7c6fff';

const RESEARCHERS = [
  {
    initials: 'MB',
    avatarBg: 'rgba(124,111,255,0.25)',
    avatarColor: '#c8c0ff',
    name: 'Dr. Michael Breus, PhD',
    institution: 'American Board of Sleep Medicine',
    specialty: 'Cronobiologia circadiana',
  },
  {
    initials: 'MW',
    avatarBg: 'rgba(111,200,255,0.20)',
    avatarColor: '#a8d8ff',
    name: 'Dr. Matthew Walker, PhD',
    institution: 'UC Berkeley',
    specialty: 'Neurociência do sono',
  },
  {
    initials: 'AH',
    avatarBg: 'rgba(160,111,255,0.20)',
    avatarColor: '#c8a8ff',
    name: 'Dr. Andrew Huberman, PhD',
    institution: 'Stanford University',
    specialty: 'Neurobiologia aplicada',
  },
] as const;

function makeStarField() {
  const stars: { key: number; leftPct: number; top: number; size: number; opacity: number }[] = [];
  for (let i = 0; i < 45; i++) {
    const leftPct = 4 + ((i * 47 + (i % 7) * 13) % 88);
    const top = 6 + ((i * 29 + (i % 5) * 17) % 200);
    const size = 1 + (i % 3);
    const opacity = 0.22 + ((i * 17) % 55) / 100;
    stars.push({ key: i, leftPct, top, size, opacity });
  }
  return stars;
}

function AnimatedStarField() {
  const pulse = useRef(new Animated.Value(0.78)).current;
  const stars = useMemo(() => makeStarField(), []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.72,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.starField, { opacity: pulse, height: 220 }]}
    >
      {stars.map((s) => (
        <View
          key={s.key}
          style={[
            styles.starDot,
            {
              left: `${s.leftPct}%`,
              top: s.top,
              width: s.size,
              height: s.size,
              borderRadius: s.size,
              opacity: s.opacity,
            },
          ]}
        />
      ))}
    </Animated.View>
  );
}

function PulsingBadgeDot() {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.badgeDot, { opacity }]}
    />
  );
}

export default function EntryScreen() {
  const router = useRouter();
  const [infoOpen, setInfoOpen] = useState(false);

  const goQuiz = useCallback(() => {
    router.push('/(auth)/quiz');
  }, [router]);

  const goLogin = useCallback(() => {
    router.push('/(auth)/login');
  }, [router]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, Platform.OS === 'web' && styles.scrollContentWeb]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.canvas}>
          <View style={styles.glowWrap} pointerEvents="none">
            <View style={styles.glowCircle} />
          </View>

          <AnimatedStarField />

          <View style={styles.inner}>
            <View style={styles.notch} />

            <View style={styles.brandWrap}>
              <Text style={styles.brandTitle}>
                <Text style={styles.brandGo}>Go</Text>
                <Text style={styles.brandZzz}>Zzz</Text>
              </Text>
              <Text style={styles.brandSub}>Programa de sono em 21 passos</Text>
              <View style={styles.brandDivider} />
            </View>

            <View style={styles.badgePill}>
              <PulsingBadgeDot />
              <Text style={styles.badgeText}>CIÊNCIA DO SONO</Text>
            </View>

            <Text style={styles.headline}>
              Por que você acorda{'\n'}
              <Text style={styles.headlineAccent}>exausto</Text>
              {' todo dia?'}
            </Text>

            <Text style={styles.subtitle}>
              {'Não é fraqueza. Não é disciplina.\nÉ o seu "'}
              <Text style={styles.subtitleAccent}>cronotipo biológico</Text>
              {'"\ntrabalhando contra você.'}
            </Text>

            <Text style={styles.sectionLabel}>FUNDAMENTADO EM</Text>

            <View style={styles.cardsColumn}>
              {RESEARCHERS.map((r) => (
                <View key={r.initials} style={styles.researcherCard}>
                  <View style={[styles.avatar, { backgroundColor: r.avatarBg }]}>
                    <Text style={[styles.avatarText, { color: r.avatarColor }]}>{r.initials}</Text>
                  </View>
                  <View style={styles.researcherInfo}>
                    <Text style={styles.researcherName}>{r.name}</Text>
                    <Text style={styles.researcherInst}>{r.institution}</Text>
                    <Text style={styles.researcherSpec}>{r.specialty}</Text>
                  </View>
                  <View style={styles.checkBubble}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={styles.disclaimer}>
              Conceitos aplicados de forma independente.{'\n'}
              Não somos afiliados nem endossados por esses pesquisadores.
            </Text>

            <Pressable
              onPress={goQuiz}
              style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            >
              <Text style={styles.ctaText}>Descobrir meu cronotipo →</Text>
            </Pressable>

            <Text style={styles.meta}>Gratuito · 60 segundos · Sem cadastro</Text>

            <Pressable onPress={() => setInfoOpen(true)} style={styles.linkWrap}>
              <Text style={styles.linkText}>O que é um cronotipo? →</Text>
            </Pressable>

            <Pressable onPress={goLogin} style={styles.loginLinkWrap}>
              <Text style={styles.loginLinkText}>Já tenho conta · Entrar</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={infoOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setInfoOpen(false)}
      >
        <Pressable style={styles.modalBackdrop} onPress={() => setInfoOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.modalTitle}>O que é um cronotipo?</Text>
            <Text style={styles.modalBody}>
              Cronotipo é o seu padrão natural de sono e vigília: a tendência do corpo a querer dormir e
              acordar em determinados horários. Conhecê-lo ajuda a alinhar rotina, luz e descanso — em vez de
              lutar contra a biologia.
            </Text>
            <Pressable onPress={() => setInfoOpen(false)} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>Fechar</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentWeb: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  canvas: {
    flex: 1,
    position: 'relative',
    minHeight: 720,
  },
  glowWrap: {
    position: 'absolute',
    top: -60,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 0,
  },
  glowCircle: {
    width: 280,
    height: 280,
    borderRadius: 9999,
    backgroundColor: GLOW_PURPLE,
  },
  starField: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  starDot: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  inner: {
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 32,
    zIndex: 2,
  },
  notch: {
    width: 100,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 36,
  },
  brandWrap: {
    alignItems: 'center',
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 34,
    fontWeight: '500',
  },
  brandGo: {
    color: '#ffffff',
  },
  brandZzz: {
    color: '#a99fff',
  },
  brandSub: {
    fontSize: 10,
    color: '#4a5275',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 4,
  },
  brandDivider: {
    width: 32,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 4,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: BADGE_BORDER,
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 24,
    backgroundColor: BADGE_BG,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 99,
    backgroundColor: DOT,
  },
  badgeText: {
    fontSize: 10,
    color: DOT,
    letterSpacing: 1.5,
    fontWeight: '500',
  },
  headline: {
    fontSize: 28,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  headlineAccent: {
    color: '#b8afff',
  },
  subtitle: {
    fontSize: 14,
    color: '#8b92b8',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  subtitleAccent: {
    color: '#b0b8d8',
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 10,
    color: '#5a6080',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  cardsColumn: {
    gap: 8,
    marginBottom: 0,
  },
  researcherCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '600',
  },
  researcherInfo: {
    flex: 1,
  },
  researcherName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#dde0f5',
    marginBottom: 3,
  },
  researcherInst: {
    fontSize: 11,
    color: '#7a80a8',
  },
  researcherSpec: {
    fontSize: 10,
    color: '#5a6080',
    fontStyle: 'italic',
    marginTop: 2,
  },
  checkBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(124,255,160,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(124,255,160,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    fontSize: 10,
    color: '#7cffa0',
  },
  disclaimer: {
    fontSize: 10,
    color: '#3a4060',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 10,
    marginBottom: 24,
  },
  cta: {
    width: '100%',
    backgroundColor: CTA,
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  meta: {
    fontSize: 11,
    color: '#6a7090',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 20,
  },
  linkWrap: {
    alignSelf: 'center',
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#4a5275',
    textAlign: 'center',
  },
  loginLinkWrap: {
    alignSelf: 'center',
    paddingVertical: 12,
    marginTop: 4,
  },
  loginLinkText: {
    fontSize: 13,
    color: '#6a7090',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    padding: 24,
  },
  modalCard: {
    backgroundColor: '#15182a',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.10)',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 12,
  },
  modalBody: {
    fontSize: 14,
    color: '#8b92b8',
    lineHeight: 22,
    marginBottom: 20,
  },
  modalClose: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  modalCloseText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#b8afff',
  },
});
