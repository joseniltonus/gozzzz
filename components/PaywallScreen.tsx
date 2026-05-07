import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Animated,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

interface PaywallScreenProps {
  onClose?: () => void;
  onRestore?: () => void;
  onCheckout?: (plan: 'annual') => Promise<void> | void;
  language?: 'pt' | 'en';
}

const COPY = {
  pt: {
    restore: 'Restaurar',
    headline: 'Você nunca foi ensinado a dormir.',
    sub: 'O programa baseado em ciência que muda isso.',
    b1: 'Entenda seu sono', b2: 'Durma mais rápido',
    b3: 'Reduza a ansiedade noturna', b4: 'Acorde revigorado',
    chrono: 'Seu cronotipo foi identificado. Agora complete seu programa.',
    trustLabel: 'Um programa construído sobre pesquisas de:',
    annual: 'Acesso Completo',
    annualPrice: 'R$ 147', annualEquiv: 'pagamento único', annualNote: 'acesso vitalício',
    priceLabel: 'Acesso completo — pagamento único',
    cl1: '21 lições interativas que guiam você passo a passo para noites melhores',
    cl2: 'Cada etapa fundamentada nas pesquisas das melhores universidades e publicações científicas dos EUA',
    cl3: 'Avance no seu próprio ritmo — sem pressa, com propósito',
    cl4: 'Já disponível para iOS e Android, com versão Web chegando em breve',
    cta: 'Quero dormir melhor →',
    guarantee: '7 dias de garantia. Sem perguntas.',
    terms: 'Ao continuar você concorda com nossos Termos de Uso → /terms',
    footer: '7 dias de garantia  •  Seus dados ficam no seu dispositivo  •  Pagamento seguro via Stripe',
    errorFallback: 'Algo deu errado. Tente novamente.',
    sectionIncluded: 'O que está incluído',
    ssl: 'Criptografia SSL',
    pci: 'PCI DSS',
    secure: 'Checkout seguro',
  },
  en: {
    restore: 'Restore',
    headline: 'You were never taught how to sleep.',
    sub: 'The science-based program that changes that.',
    b1: 'Understand your sleep', b2: 'Fall asleep faster',
    b3: 'Reduce nighttime anxiety', b4: 'Wake up refreshed',
    chrono: 'Your chronotype has been identified. Now complete your program.',
    trustLabel: 'A program built on research from:',
    annual: 'Complete Access',
    annualPrice: '$24.99', annualEquiv: 'one-time payment', annualNote: 'lifetime access',
    priceLabel: 'Full access — one-time payment',
    cl1: '21 interactive lessons that guide you step by step to better nights',
    cl2: 'Each step based on research from the best universities and scientific publications in the USA',
    cl3: 'Progress at your own pace — no rush, with purpose',
    cl4: 'Already available for iOS and Android, with Web version coming soon',
    cta: 'I want to sleep better →',
    guarantee: '7-day guarantee. No questions asked.',
    terms: 'By continuing you agree to our Terms of Use → /terms',
    footer: '7-day guarantee  •  Your data stays on your device  •  Secure payment via Stripe',
    errorFallback: 'Something went wrong. Please try again.',
    sectionIncluded: "What's included",
    ssl: 'SSL Encryption',
    pci: 'PCI DSS',
    secure: 'Secure checkout',
  },
};

const STAR_COUNT = 30;

export default function PaywallScreen({
  onClose,
  onRestore,
  onCheckout,
  language = 'pt',
}: PaywallScreenProps) {
  const [selectedPlan] = useState<'annual'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pricing, setPricing] = useState<{ annualPrice: string; annualEquiv: string; annualNote: string } | null>(null);

  const starOpacities = useRef(
    Array.from({ length: STAR_COUNT }, () => new Animated.Value(0.12 + Math.random() * 0.35)),
  ).current;

  const shimmerAnim = useRef(new Animated.Value(-200)).current;

  const starsLayout = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }, (_, i) => ({
        key: i,
        leftPct: Math.random() * 100,
        top: Math.random() * 520,
        size: 0.5 + Math.random() * 1.5,
      })),
    [],
  );

  useEffect(() => {
    const loops = starOpacities.map((anim) => {
      const initial = 0.1 + Math.random() * 0.42;
      anim.setValue(initial);
      const duration = 3000 + Math.random() * 4000;
      return Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue: 0.08,
            duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: initial,
            duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      );
    });
    loops.forEach((l) => l.start());
    return () => {
      loops.forEach((l) => l.stop());
    };
  }, [starOpacities]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 500,
          duration: 3000,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: -200,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  useEffect(() => {
    (async () => {
      try {
        const currencyMap = { pt: 'BRL', en: 'USD' };
        const currency = currencyMap[language as keyof typeof currencyMap];
        const { data } = await (supabase.from('pricing') as any)
          .select('label, equiv, note')
          .eq('plan_type', 'annual')
          .eq('currency', currency)
          .maybeSingle();

        console.log('PRICING DATA (mobile):', data);

        if (data) {
          setPricing({
            annualPrice: data.label,
            annualEquiv: data.equiv,
            annualNote: data.note,
          });
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      }
    })();
  }, [language]);

  const c = COPY[language];
  const displayPricing = pricing || {
    annualPrice: c.annualPrice,
    annualEquiv: c.annualEquiv,
    annualNote: c.annualNote,
  };

  const handleCta = async () => {
    if (!onCheckout || loading) return;
    setLoading(true);
    setError(null);
    try {
      await onCheckout(selectedPlan);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : c.errorFallback;
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const priceStr = displayPricing.annualPrice;
  const priceDigitIdx = priceStr.search(/\d/);
  const priceCurrencySymbol = priceDigitIdx > 0 ? priceStr.slice(0, priceDigitIdx).trim() : '';
  const priceNumericPart =
    priceDigitIdx >= 0 ? priceStr.slice(priceDigitIdx).replace(/\s/g, '') : priceStr;

  const isPt = language === 'pt';
  const subHeadline = `${c.sub}\n${c.cl1}`;
  const benefitRows = isPt
    ? [
        {
          title: '21 passos completos desbloqueados',
          desc: 'Acesso imediato a todo o programa — sem limitações',
        },
        {
          title: 'Baseado em ciência real',
          desc: 'Cada passo fundamentado em pesquisas de Walker, Breus, Huberman e Czeisler',
        },
        {
          title: 'No seu ritmo, para sempre',
          desc: 'Acesso vitalício — sem mensalidade, sem renovação automática',
        },
        {
          title: 'iOS, Android e Web',
          desc: 'Uma compra, todos os dispositivos',
        },
      ]
    : [
        {
          title: 'All 21 steps unlocked',
          desc: 'Immediate access to the full program — no limits',
        },
        {
          title: 'Grounded in real science',
          desc: 'Each step draws on research from Walker, Breus, Huberman, and Czeisler',
        },
        {
          title: 'Your pace, forever',
          desc: 'Lifetime access — no subscription, no auto-renewal',
        },
        {
          title: 'iOS, Android & Web',
          desc: 'One purchase, all your devices',
        },
      ];

  const accessLabel = isPt ? 'ACESSO COMPLETO' : 'FULL ACCESS';
  const headlineLine1 = isPt ? 'Você já descobriu seu cronotipo.\nAgora ' : "You've found your chronotype.\nNow ";
  const headlineLine2 = isPt ? ' seu sono.' : ' your sleep.';
  const transformWord = isPt ? 'transforme' : 'transform';
  const lifetimeLabel = isPt ? 'ACESSO VITALÍCIO' : 'LIFETIME ACCESS';
  const badgePayOnce = isPt ? 'Pagamento único' : 'One-time pay';
  const anchorLine = isPt
    ? 'Equivale a R$7 por passo — menos que um café'
    : '~$1 per step — less than a coffee';
  const pill1 = isPt ? 'Sem mensalidade' : 'No subscription';
  const pill2 = isPt ? 'Sem renovação' : 'No renewal';
  const pill3 = isPt ? 'Para sempre' : 'Forever';
  const guaranteeTitle = isPt ? 'Garantia de 7 dias' : '7-day guarantee';
  const guaranteeDesc = isPt
    ? 'Se não gostar, devolvemos 100% do valor. Sem perguntas, sem burocracia.'
    : "If you're not satisfied, we refund 100%. No questions, no hassle.";
  const ctaSub = isPt
    ? 'Pagamento seguro via Stripe · Acesso imediato'
    : 'Secure payment via Stripe · Instant access';
  const fundLabel = isPt ? 'FUNDAMENTADO EM' : 'ROOTED IN';
  const disclaimer = isPt
    ? 'Conceitos aplicados de forma independente.\nNão somos afiliados nem endossados por esses pesquisadores.'
    : 'Concepts applied independently.\nWe are not affiliated with or endorsed by these researchers.';

  const researcherPills = isPt
    ? [
        { initials: 'MB', label: 'Dr. Breus · Sleep Medicine', avatar: styles.pillAvatarMb, initial: styles.pillInitialMb },
        { initials: 'MW', label: 'Dr. Walker · UC Berkeley', avatar: styles.pillAvatarMw, initial: styles.pillInitialMw },
        { initials: 'AH', label: 'Dr. Huberman · Stanford', avatar: styles.pillAvatarAh, initial: styles.pillInitialAh },
        { initials: 'CC', label: 'Dr. Czeisler · Harvard Medical', avatar: styles.pillAvatarCc, initial: styles.pillInitialCc },
      ]
    : [
        { initials: 'MB', label: 'Dr. Breus · Sleep Medicine', avatar: styles.pillAvatarMb, initial: styles.pillInitialMb },
        { initials: 'MW', label: 'Dr. Walker · UC Berkeley', avatar: styles.pillAvatarMw, initial: styles.pillInitialMw },
        { initials: 'AH', label: 'Dr. Huberman · Stanford', avatar: styles.pillAvatarAh, initial: styles.pillInitialAh },
        { initials: 'CC', label: 'Dr. Czeisler · Harvard Medical', avatar: styles.pillAvatarCc, initial: styles.pillInitialCc },
      ];

  return (
    <View style={styles.screenRoot}>
      <View style={styles.bgGlow} pointerEvents="none" />
      <View style={styles.starsLayer} pointerEvents="none">
        {starsLayout.map((s, i) => (
          <Animated.View
            key={s.key}
            style={[
              styles.starDot,
              {
                left: `${s.leftPct}%`,
                top: s.top,
                width: s.size,
                height: s.size,
                borderRadius: s.size / 2,
                opacity: starOpacities[i],
              },
            ]}
          />
        ))}
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {onClose ? (
          <View style={styles.closeRow}>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7} hitSlop={12}>
              <X size={22} color="#b8c0d8" />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.closeRowSpacer} />
        )}

        <View style={styles.iconTopOuter}>
          <LinearGradient
            colors={['rgba(255,190,50,0.20)', 'rgba(255,150,20,0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconTopGradient}
          >
            <Text style={styles.iconTopEmoji}>👑</Text>
          </LinearGradient>
        </View>

        <Text style={styles.headlineEyebrow}>{accessLabel}</Text>

        <Text style={styles.headlineMain}>
          {headlineLine1}
          <Text style={styles.headlineAccent}>{transformWord}</Text>
          {headlineLine2}
        </Text>

        <Text style={styles.subtitle}>{subHeadline}</Text>

        <View style={styles.benefitsWrap}>
          {benefitRows.map((row) => (
            <View key={row.title} style={styles.benefitRow}>
              <View style={styles.benefitIcon}>
                <Text style={styles.benefitCheck}>✓</Text>
              </View>
              <View style={styles.benefitTextCol}>
                <Text style={styles.benefitTitle}>{row.title}</Text>
                <Text style={styles.benefitDesc}>{row.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceCardTopLight} />
          <View style={styles.priceTopRow}>
            <Text style={styles.priceLifetimeLabel}>{lifetimeLabel}</Text>
            <View style={styles.badgeOnce}>
              <Text style={styles.badgeOnceText}>{badgePayOnce}</Text>
            </View>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceCurrency}>{priceCurrencySymbol}</Text>
            <Text style={styles.priceAmount}>{priceNumericPart}</Text>
          </View>
          <Text style={styles.priceAnchor}>{anchorLine}</Text>
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{pill1}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{pill2}</Text>
            </View>
            <View style={styles.pill}>
              <Text style={styles.pillText}>{pill3}</Text>
            </View>
          </View>
        </View>

        <View style={styles.guaranteeCard}>
          <Text style={styles.guaranteeEmoji}>🛡️</Text>
          <View style={styles.guaranteeTextCol}>
            <Text style={styles.guaranteeTitle}>{guaranteeTitle}</Text>
            <Text style={styles.guaranteeDesc}>{guaranteeDesc}</Text>
          </View>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        <TouchableOpacity
          style={[styles.ctaOuter, loading && styles.ctaOuterDisabled]}
          onPress={handleCta}
          activeOpacity={0.88}
          disabled={loading}
        >
          <LinearGradient
            colors={['#ffd060', '#ffb020']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaGradient}
          >
            <View style={styles.ctaTopLight} />
            <Animated.View
              style={[
                styles.ctaShimmer,
                {
                  transform: [{ skewX: '-20deg' }, { translateX: shimmerAnim }],
                },
              ]}
            />
            {loading ? (
              <ActivityIndicator size="small" color="#080a15" />
            ) : (
              <Text style={styles.ctaLabel}>{c.cta}</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.ctaSub}>{ctaSub}</Text>

        <Text style={styles.fundTitle}>{fundLabel}</Text>
        <View style={styles.researchersRow}>
          {researcherPills.map((p) => (
            <View key={p.initials} style={styles.researcherPill}>
              <View style={[styles.pillAvatar, p.avatar]}>
                <Text style={[styles.pillAvatarText, p.initial]}>{p.initials}</Text>
              </View>
              <Text style={styles.researcherPillLabel}>{p.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.disclaimer}>{disclaimer}</Text>

        <Text style={styles.termsSmall}>{c.terms}</Text>
        <Text style={styles.footerSmall}>{c.footer}</Text>

        {onRestore ? (
          <TouchableOpacity onPress={onRestore} style={styles.restoreWrap} activeOpacity={0.75}>
            <Text style={styles.restoreText}>{c.restore}</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.companyFooter}>
          <Text style={styles.companyText}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenRoot: {
    flex: 1,
    backgroundColor: '#080a15',
  },
  bgGlow: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(180,140,40,0.12)',
  },
  starsLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  starDot: {
    position: 'absolute',
    backgroundColor: '#ffffff',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#080a15',
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 48 : 40,
    paddingBottom: 40,
    alignItems: 'center',
    backgroundColor: '#080a15',
  },
  closeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  closeRowSpacer: {
    height: 8,
    width: '100%',
  },
  closeBtn: {
    padding: 8,
  },
  iconTopOuter: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginBottom: 20,
    backgroundColor: 'rgba(255,190,50,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTopGradient: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.30)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTopEmoji: {
    fontSize: 20,
  },
  headlineEyebrow: {
    fontSize: 10,
    color: '#8a7040',
    letterSpacing: 2.0,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 10,
  },
  headlineMain: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headlineAccent: {
    color: '#ffc84a',
  },
  subtitle: {
    fontSize: 14,
    color: '#8090b0',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    maxWidth: 290,
  },
  benefitsWrap: {
    width: '100%',
    marginBottom: 22,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  benefitIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255,190,50,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitCheck: {
    fontSize: 10,
    color: '#ffc84a',
    fontWeight: '700',
  },
  benefitTextCol: {
    flex: 1,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#dde0f8',
    marginBottom: 1,
  },
  benefitDesc: {
    fontSize: 11,
    color: '#6a7090',
    lineHeight: 16,
  },
  priceCard: {
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'rgba(255,190,50,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.20)',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  priceCardTopLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,190,50,0.35)',
  },
  priceTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLifetimeLabel: {
    fontSize: 10,
    color: '#8a7040',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  badgeOnce: {
    backgroundColor: 'rgba(255,190,50,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,190,50,0.30)',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeOnceText: {
    fontSize: 9,
    color: '#ffc84a',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 4,
  },
  priceCurrency: {
    fontSize: 16,
    color: '#ffc84a',
    fontWeight: '500',
    marginTop: 6,
  },
  priceAmount: {
    fontSize: 42,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -1,
  },
  priceAnchor: {
    fontSize: 11,
    color: '#505878',
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    width: '100%',
  },
  pill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pillText: {
    fontSize: 10,
    color: '#7a80a8',
    textAlign: 'center',
  },
  guaranteeCard: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'rgba(124,255,160,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(124,255,160,0.15)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  guaranteeEmoji: {
    fontSize: 22,
    flexShrink: 0,
  },
  guaranteeTextCol: {
    flex: 1,
  },
  guaranteeTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7cffa0',
    marginBottom: 2,
  },
  guaranteeDesc: {
    fontSize: 11,
    color: '#4a6050',
    lineHeight: 16,
  },
  errorBox: {
    width: '100%',
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  errorText: {
    fontSize: 13,
    color: '#ef4444',
    textAlign: 'center',
    lineHeight: 18,
  },
  ctaOuter: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#ffb020',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 14,
  },
  ctaOuterDisabled: {
    opacity: 0.65,
  },
  ctaGradient: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  ctaTopLight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.30)',
  },
  ctaShimmer: {
    position: 'absolute',
    width: 80,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.20)',
  },
  ctaLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#080a15',
    letterSpacing: 0.3,
  },
  ctaSub: {
    fontSize: 11,
    color: '#3a4060',
    textAlign: 'center',
    marginBottom: 20,
  },
  fundTitle: {
    fontSize: 9,
    color: '#3a4060',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  researchersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
    width: '100%',
  },
  researcherPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    borderRadius: 99,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  pillAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillAvatarMb: {
    backgroundColor: 'rgba(124,111,255,0.30)',
  },
  pillAvatarMw: {
    backgroundColor: 'rgba(111,200,255,0.25)',
  },
  pillAvatarAh: {
    backgroundColor: 'rgba(160,111,255,0.25)',
  },
  pillAvatarCc: {
    backgroundColor: 'rgba(111,200,160,0.25)',
  },
  pillAvatarText: {
    fontSize: 8,
    fontWeight: '800',
  },
  pillInitialMb: {
    color: '#c8c0ff',
  },
  pillInitialMw: {
    color: '#a8d8ff',
  },
  pillInitialAh: {
    color: '#c8a8ff',
  },
  pillInitialCc: {
    color: '#a8ffd8',
  },
  researcherPillLabel: {
    fontSize: 10,
    color: '#6a7090',
  },
  disclaimer: {
    fontSize: 9,
    color: '#252a38',
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 14,
  },
  restoreWrap: {
    marginTop: 16,
    paddingVertical: 8,
  },
  restoreText: {
    fontSize: 13,
    color: '#6a7090',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  companyFooter: {
    alignItems: 'center',
    paddingTop: 28,
    gap: 4,
  },
  companyText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3a4060',
    textAlign: 'center',
  },
  companyCnpj: {
    fontSize: 10,
    color: '#252a38',
    textAlign: 'center',
  },
  termsSmall: {
    fontSize: 10,
    color: '#252a38',
    textAlign: 'center',
    lineHeight: 15,
    marginTop: 12,
    paddingHorizontal: 8,
  },
  footerSmall: {
    fontSize: 10,
    color: '#3a4060',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
