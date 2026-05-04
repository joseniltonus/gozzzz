import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';

const CARDS = [
  {
    icon: '🧠',
    title: 'Radar Mental',
    body: 'Detecta detalhes invisíveis para outros. Pensamento rápido e analítico.',
  },
  {
    icon: '🌙',
    title: 'Sono Fragmentado',
    body: 'Sono leve, acorda com facilidade.',
  },
  {
    icon: '⚡',
    title: 'Alerta Constante',
    body: 'Alta percepção, mas pode gerar sobrecarga.',
  },
  {
    icon: '🎯',
    title: 'Precisão Extrema',
    body: 'Perfeccionismo que gera qualidade.',
  },
] as const;

/**
 * Ecrã premium de resultado — cronótipo Golfinho (desperto).
 * Estilo gamificado / minimal; dark-first; animações subtis (fade-in).
 */
export default function ChronotypeResultDolphin() {
  return (
    <LinearGradient colors={['#080816', '#0c1024', '#0a0e1c']} style={styles.root} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View entering={FadeIn.duration(500)} style={styles.hero}>
          <LinearGradient
            colors={['rgba(99,102,241,0.35)', 'rgba(56,189,248,0.12)', 'transparent']}
            style={styles.heroGlow}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
          />
          <Text style={styles.title}>🐬 Golfinho Desperto</Text>
          <Text style={styles.subtitle}>
            Você joga no modo vigilância. Enquanto outros desligam, sua mente continua ativa.
          </Text>
        </Animated.View>

        <View style={styles.grid}>
          {CARDS.map((c, i) => (
            <Animated.View
              key={c.title}
              entering={FadeInDown.duration(420).delay(90 + i * 70)}
              style={styles.cardWrap}
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.card}
              >
                <View style={styles.cardTop}>
                  <LinearGradient colors={['#6366f1', '#38bdf8']} style={styles.iconBubble} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                    <Text style={styles.iconEmoji}>{c.icon}</Text>
                  </LinearGradient>
                  <Text style={styles.cardTitle}>{c.title}</Text>
                </View>
                <Text style={styles.cardBody}>{c.body}</Text>
              </LinearGradient>
            </Animated.View>
          ))}
        </View>

        <Animated.View entering={FadeInDown.duration(480).delay(400)} style={styles.tipWrap}>
          <LinearGradient
            colors={['rgba(251,191,36,0.14)', 'rgba(245,158,11,0.06)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.tipInner}
          >
            <Text style={styles.tipLabel}>Upgrade tip</Text>
            <Text style={styles.tipText}>
              Crie rituais de desaceleração à noite. Seu desempenho depende mais de desligar bem do que de fazer mais.
            </Text>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    minHeight: Platform.OS === 'web' ? ('100%' as unknown as number) : undefined,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  hero: {
    marginBottom: 28,
    position: 'relative',
    overflow: 'visible',
  },
  heroGlow: {
    position: 'absolute',
    left: -24,
    right: -24,
    top: -40,
    height: 160,
    borderRadius: 80,
    opacity: 0.9,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(148,163,184,0.95)',
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 4,
  },
  grid: {
    gap: 12,
  },
  cardWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  card: {
    borderRadius: 17,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  iconBubble: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 22,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: -0.2,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(148,163,184,0.92)',
    fontWeight: '500',
  },
  tipWrap: {
    marginTop: 24,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.22)',
  },
  tipInner: {
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  tipLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: 'rgba(251,191,36,0.95)',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 23,
    color: 'rgba(226,232,240,0.95)',
    fontWeight: '500',
  },
});
