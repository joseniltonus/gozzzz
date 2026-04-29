import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, X, Check, Lock, Shield, BadgeCheck } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/lib/supabase';

interface PaywallScreenProps {
  onClose?: () => void;
  onRestore?: () => void;
  onCheckout?: (plan: 'annual') => Promise<void> | void;
  language?: 'pt' | 'en';
}

function TrustBlock({ language = 'pt' }: { language: 'pt' | 'en' }) {
  const label = language === 'pt' ? 'Um programa construído sobre pesquisas de:' : 'A program built on research from:';
  const researchers = [
    { name: 'Walker', subtitle: 'UC Berkeley' },
    { name: 'Breus', subtitle: 'Chronotype Specialist' },
    { name: 'Huberman', subtitle: 'Stanford' },
    { name: 'Czeisler', subtitle: 'Harvard' },
  ];

  return (
    <View style={trustStyles.container}>
      <Text style={trustStyles.label}>{label}</Text>
      <View style={trustStyles.namesRow}>
        {researchers.map((researcher, index) => (
          <View key={index} style={trustStyles.nameWrapper}>
            <Text style={trustStyles.nameText}>{researcher.name}</Text>
            <Text style={trustStyles.dash}>—</Text>
            <Text style={trustStyles.subtitleText}>{researcher.subtitle}</Text>
            {index < researchers.length - 1 && (
              <Text style={trustStyles.separator}>·</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
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

export default function PaywallScreen({
  onClose,
  onRestore,
  onCheckout,
  language = 'pt',
}: PaywallScreenProps) {
  const [selectedPlan] = useState<'annual'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isDark } = useTheme();
  const [pricing, setPricing] = useState<{ annualPrice: string; annualEquiv: string; annualNote: string } | null>(null);

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

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    border: isDark ? 'rgba(212,169,106,0.08)' : 'rgba(0,0,0,0.08)',
    gradientColors: (isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']) as [string, string],
    footerText: isDark ? '#4a5568' : '#64748b',
  };

  const BENEFITS = [c.b1, c.b2, c.b3, c.b4];
  const CHECKLIST = [c.cl1, c.cl2, c.cl3, c.cl4];

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

  return (
    <View style={[styles.root, { backgroundColor: tc.bg }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <LinearGradient colors={tc.gradientColors} style={styles.header}>
          <View style={styles.topBar}>
            <TouchableOpacity onPress={onClose} style={styles.topBarSide} activeOpacity={0.7}>
              <X size={20} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.topBarTitle}>GoZzzz</Text>
            <View style={[styles.topBarSide, styles.topBarRight]} />
          </View>

          <View style={styles.headerContent}>
            <View style={styles.moonWrap}>
              <Moon size={48} color="#ffffff" />
            </View>
            <Text style={styles.headline}>{c.headline}</Text>
            <Text style={styles.sub}>{c.sub}</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.chrono}>
            <Text style={styles.chronoText}>{c.chrono}</Text>
          </View>

          <TrustBlock language={language} />

          <View style={styles.benefits}>
            {BENEFITS.map((b, i) => (
              <View key={i} style={styles.benefitRow}>
                <View style={[styles.checkCircle, { backgroundColor: isDark ? 'rgba(212,169,106,0.1)' : 'rgba(212,169,106,0.12)', borderColor: isDark ? 'rgba(212,169,106,0.25)' : 'rgba(212,169,106,0.35)' }]}>
                  <Check size={12} color="#d4a96a" strokeWidth={3} />
                </View>
                <Text style={[styles.benefitText, { color: tc.textPrimary }]}>{b}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View
              style={[
                styles.planCard,
                { backgroundColor: tc.card, borderColor: '#d4a96a' },
                styles.planCardActive,
              ]}
            >
              <View style={styles.planRow}>
                <View style={styles.planInfo}>
                  <Text style={[styles.planName, { color: tc.textPrimary }]}>
                    {c.annual}
                  </Text>
                  <View style={styles.planPriceRow}>
                    <Text style={[styles.planPrice, { color: '#d4a96a' }]}>
                      {displayPricing.annualPrice}
                    </Text>
                  </View>
                  <Text style={[styles.planNote, { color: tc.textSecondary }]}>{displayPricing.annualEquiv} • {displayPricing.annualNote}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{c.sectionIncluded}</Text>
            <View style={[styles.checklistCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
              {CHECKLIST.map((item, i) => (
                <View key={i} style={styles.clRow}>
                  <View style={[styles.clCheck, { backgroundColor: isDark ? 'rgba(212,169,106,0.1)' : 'rgba(212,169,106,0.12)', borderColor: isDark ? 'rgba(212,169,106,0.25)' : 'rgba(212,169,106,0.35)' }]}>
                    <Check size={12} color="#d4a96a" strokeWidth={2.5} />
                  </View>
                  <Text style={[styles.clText, { color: tc.textSecondary }]}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={[styles.cta, loading && styles.ctaDisabled]}
            onPress={handleCta}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#0d0d16" />
            ) : (
              <Text style={styles.ctaText}>{c.cta}</Text>
            )}
          </TouchableOpacity>

          <Text style={[styles.guarantee, { color: '#555555' }]}>{c.guarantee}</Text>
          <Text style={[styles.terms, { color: '#333333' }]}>{c.terms}</Text>

          <View style={styles.securityRow}>
            <Lock size={12} color="#d4a96a" />
            <Text style={[styles.securityText, { color: tc.footerText }]}>{c.ssl}</Text>
            <Text style={[styles.securityDot, { color: tc.footerText }]}>·</Text>
            <Shield size={12} color="#d4a96a" />
            <Text style={[styles.securityText, { color: tc.footerText }]}>{c.pci}</Text>
            <Text style={[styles.securityDot, { color: tc.footerText }]}>·</Text>
            <BadgeCheck size={12} color="#d4a96a" />
            <Text style={[styles.securityText, { color: tc.footerText }]}>{c.secure}</Text>
          </View>

          <Text style={[styles.footer, { color: tc.textSecondary }]}>{c.footer}</Text>

          <View style={styles.companyFooter}>
            <Text style={[styles.companyText, { color: tc.textSecondary }]}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
            <Text style={[styles.companyCnpj, { color: tc.footerText }]}>CNPJ: 66.059.212/0001-52</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  header: {
    paddingTop: Platform.OS === 'ios' ? 56 : 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  topBarSide: {
    minWidth: 72,
    justifyContent: 'center',
  },
  topBarRight: {
    alignItems: 'flex-end',
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    flex: 1,
  },
  topBarRestore: {
    fontSize: 14,
    color: '#d4a96a',
    fontWeight: '600',
  },

  headerContent: {
    alignItems: 'center',
  },
  moonWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headline: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 10,
  },
  sub: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },

  content: {
    padding: 24,
  },

  chrono: {
    marginBottom: 24,
    alignItems: 'center',
  },
  chronoText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
  },

  statsRow: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 24,
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 18,
  },
  statLabel: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 3,
  },

  benefits: {
    gap: 12,
    marginBottom: 24,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  benefitText: {
    fontSize: 15,
    fontWeight: '500',
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },

  planCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
  },
  planCardActive: {
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 4,
  },
  planSavings: {
    backgroundColor: 'rgba(212,169,106,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  planSavingsText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#d4a96a',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planInfo: {
    flex: 1,
  },
  planName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  planPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginBottom: 4,
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  planNote: {
    fontSize: 13,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(212,169,106,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#d4a96a',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#d4a96a',
  },

  checklistCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    gap: 14,
  },
  clRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  clText: {
    fontSize: 14,
    flex: 1,
  },

  errorBox: {
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

  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaDisabled: {
    opacity: 0.65,
  },
  ctaText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0d0d16',
    letterSpacing: 0.2,
  },

  guarantee: {
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 16,
  },
  terms: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 14,
  },

  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  securityText: {
    fontSize: 11,
  },
  securityDot: {
    fontSize: 11,
  },

  footer: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 20,
    marginBottom: 24,
  },

  companyFooter: {
    alignItems: 'center',
    paddingBottom: 40,
    gap: 4,
  },
  companyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  companyCnpj: {
    fontSize: 11,
  },
});

const trustStyles = StyleSheet.create({
  container: {
    backgroundColor: '#0f0f1a',
    borderWidth: 1,
    borderColor: '#1a1a2e',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 12,
  },
  namesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  nameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nameText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  dash: {
    fontSize: 12,
    color: '#888888',
    marginHorizontal: 4,
  },
  subtitleText: {
    fontSize: 12,
    color: '#888888',
  },
  separator: {
    fontSize: 12,
    color: '#888888',
    marginLeft: 4,
  },
});
