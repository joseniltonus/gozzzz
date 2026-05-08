import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, ArrowLeft, Crown, Check, Shield, Lock, BadgeCheck, CreditCard, CircleAlert as AlertCircle } from 'lucide-react-native';
import { supabase, SUPABASE_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';
import { KIWIFY_PARCELADO_URL } from '@/lib/payment-links';
const isWeb = Platform.OS === 'web';

interface PricingData {
  currency: string;
  symbol: string;
  annual: {
    price: number;
    label: string;
    equiv: string;
    note: string;
  };
}

const DEFAULT_PRICING: Record<'pt' | 'en', PricingData> = {
  pt: {
    currency: 'BRL',
    symbol: 'R$',
    annual: {
      price: 147,
      label: 'R$ 147',
      equiv: 'acesso vitalício',
      note: 'pagamento único',
    },
  },
  en: {
    currency: 'USD',
    symbol: '$',
    annual: {
      price: 24.99,
      label: '$24.99',
      equiv: 'lifetime access',
      note: 'one-time payment',
    },
  },
};

const CONTENT = {
  headerTitle: 'web.subscribe.headerTitle',
  headerSubtitle: 'web.subscribe.headerSubtitle',
  yearly: 'web.subscribe.annualPlan',
  monthly: 'web.subscribe.monthlyPlan',
  perMonth: 'web.subscribe.perMonth',
  disclaimer: 'web.subscribe.disclaimer',
  included: 'web.subscribe.included',
  successTitle: 'web.subscribe.successTitle',
  successDesc: 'web.subscribe.successDesc',
  successBtn: 'web.subscribe.successBtn',
  guaranteeTitle: 'web.subscribe.guaranteeTitle',
  guaranteeDesc: 'web.subscribe.guaranteeDesc',
  back: 'web.subscribe.back',
  redirecting: 'web.subscribe.redirecting',
  errorMsg: 'web.subscribe.errorMsg',
  features: [
    'web.subscribe.feature1',
    'web.subscribe.feature2',
    'web.subscribe.feature3',
    'web.subscribe.feature4',
    'web.subscribe.feature5',
    'web.subscribe.feature6',
    'web.subscribe.feature7',
    'web.subscribe.feature8',
  ],
  localeBadge: 'web.subscribe.localeBadge',
};

export default function WebAssinarPage() {
  const router = useRouter();
  const { t: translate } = useLanguage();
  const language: 'pt' = 'pt';
  const t = (key: string) => translate(key, 'pt');
  const [selectedPlan] = useState<'annual'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pricing, setPricing] = useState<PricingData>(DEFAULT_PRICING.pt);

  useEffect(() => {
    if (isWeb) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === 'true') {
        setSuccess(true);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const currency = 'BRL';
        const { data } = await (supabase.from('pricing') as any)
          .select('price, label, equiv, note')
          .eq('plan_type', 'annual')
          .eq('currency', currency)
          .maybeSingle();

        console.log('PRICING DATA:', data);

        if (data) {
          setPricing({
            currency,
            symbol: 'R$',
            annual: {
              price: data.price,
              label: data.label,
              equiv: data.equiv,
              note: data.note,
            },
          });
        }
      } catch (err) {
        console.error('Error fetching pricing:', err);
        setPricing(DEFAULT_PRICING.pt);
      }
    })();
  }, []);

  const c = CONTENT;
  const p = pricing;

  const handleAssinar = async () => {
    setLoading(true);
    setError(null);

    try {
      const origin = isWeb ? window.location.origin : 'https://gozzzz.app';
      const successUrl = `${origin}/web/assinar?success=true`;
      const cancelUrl = `${origin}/web/assinar`;

      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/process-payment`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: selectedPlan,
            locale: language === 'pt' ? 'BR' : 'US',
            language,
            successUrl,
            cancelUrl,
          }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        setError(`Error response: ${response.status}`);
        return;
      }

      if (!response.ok || data.error) {
        setError(data.error || c.errorMsg);
        return;
      }

      if (data.url && isWeb) {
        window.location.href = data.url;
      }
    } catch {
      setError(c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('web.subscribe.headTitle')}</title>
        <meta name="description" content={t('web.subscribe.headDesc')} />
        <meta property="og:title" content={t('web.subscribe.headTitle')} />
        <meta property="og:description" content={t('web.subscribe.ogDesc')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gozzzz.app/web/assinar" />
      </Head>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
              <Moon size={22} color="#fbbf24" strokeWidth={2} />
            </div>
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <View style={styles.navRight}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t(c.back)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.header}>
        <Crown size={52} color="#fbbf24" />
        <Text style={styles.headerTitle}>{t(c.headerTitle)}</Text>
        <Text style={styles.headerSubtitle}>{t(c.headerSubtitle)}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.container}>
          {success ? (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Check size={40} color="#10b981" />
              </View>
              <Text style={styles.successTitle}>{t(c.successTitle)}</Text>
              <Text style={styles.successDesc}>{t(c.successDesc)}</Text>
              <TouchableOpacity style={styles.successBtn} onPress={() => router.push('/web/programa')}>
                <Text style={styles.successBtnText}>{t(c.successBtn)}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.grid}>
              <View style={styles.checkoutCol}>
                <View style={[styles.planCard, styles.planCardSelected]}>
                  {/* Preço prominente: antes ficava com display:none — visitantes
                      não viam quanto custava antes do botão. Agora R$ 147 lidera
                      o card e o caption resume o modelo (one-time / lifetime). */}
                  <Text style={styles.planPriceHero}>{p.annual.label || 'R$ 147'}</Text>
                  <Text style={styles.planPriceCaption}>
                    {p.annual.note} · {p.annual.equiv}
                  </Text>
                </View>


                {error && (
                  <View style={styles.errorBox}>
                    <AlertCircle size={16} color="#ef4444" />
                    <Text style={styles.errorText}>{error || t(c.errorMsg)}</Text>
                  </View>
                )}

                {/* Modelo híbrido com hierarquia invertida: parcelado Kiwify
                    como primário + à vista Stripe como secundário. Quando
                    KIWIFY_PARCELADO_URL está vazio, cai pro layout antigo
                    (Stripe primário, sem Kiwify). */}
                {KIWIFY_PARCELADO_URL ? (
                  <>
                    <TouchableOpacity
                      style={styles.checkoutBtn}
                      onPress={() => Linking.openURL(KIWIFY_PARCELADO_URL)}
                      activeOpacity={0.85}
                    >
                      <CreditCard size={20} color="#0d0d16" />
                      <Text style={styles.checkoutBtnText}>
                        Parcelar em 6x — R$ 24,50/mês
                      </Text>
                    </TouchableOpacity>
                    <Text style={styles.kiwifyNote}>
                      via Kiwify · juros do cartão por conta do banco
                    </Text>

                    <View style={styles.payDivider}>
                      <View style={styles.payDividerLine} />
                      <Text style={styles.payDividerTxt}>ou</Text>
                      <View style={styles.payDividerLine} />
                    </View>

                    <TouchableOpacity
                      style={[styles.checkoutBtnAlt, loading && styles.checkoutBtnDisabled]}
                      onPress={handleAssinar}
                      activeOpacity={0.85}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <ActivityIndicator size="small" color="#d4a96a" />
                          <Text style={styles.checkoutBtnAltText}>{t(c.redirecting)}</Text>
                        </>
                      ) : (
                        <>
                          <Crown size={18} color="#d4a96a" />
                          <Text style={styles.checkoutBtnAltText}>
                            Pagar à vista — R$ 147
                          </Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    style={[styles.checkoutBtn, loading && styles.checkoutBtnDisabled]}
                    onPress={handleAssinar}
                    activeOpacity={0.85}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <ActivityIndicator size="small" color="#0d0d16" />
                        <Text style={styles.checkoutBtnText}>{t(c.redirecting)}</Text>
                      </>
                    ) : (
                      <>
                        <Crown size={20} color="#0d0d16" />
                        <Text style={styles.checkoutBtnText}>
                          Pagar à vista — R$ 147
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                )}

                <Text style={styles.disclaimer}>{t(c.disclaimer)}</Text>

                <View style={styles.securityBadges}>
                  <View style={styles.securityBadge}>
                    <Lock size={14} color="#10b981" />
                    <Text style={styles.securityBadgeText}>{t('payment.ssl')}</Text>
                  </View>
                  <View style={styles.securityBadge}>
                    <Shield size={14} color="#3b82f6" />
                    <Text style={styles.securityBadgeText}>Stripe Secure</Text>
                  </View>
                  <View style={styles.securityBadge}>
                    <BadgeCheck size={14} color="#f59e0b" />
                    <Text style={styles.securityBadgeText}>{t('payment.pciDss')}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.featuresCol}>
                <Text style={styles.colTitle}>{t(c.included)}</Text>
                <View style={styles.featuresCard}>
                  {c.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <View style={styles.featureCheck}>
                        <Check size={14} color="#10b981" />
                      </View>
                      <Text style={styles.featureText}>{t(feature)}</Text>
                    </View>
                  ))}
                </View>

                {/* Garantia CDC (substitui depoimentos fabricados — política
                    do prompt v4: zero prova social fabricada). É a mesma
                    proteção legal já citada na guaranteeCard abaixo, mas em
                    formato de selo destacado. */}
                <View style={styles.cdcGuarantee}>
                  <Text style={styles.cdcGuaranteeKicker}>
                    GARANTIA DE SATISFAÇÃO — 7 DIAS
                  </Text>
                  <Text style={styles.cdcGuaranteeBody}>
                    Se você não estiver satisfeito por qualquer motivo nos primeiros 7 dias, devolvemos 100% do valor — sem burocracia, sem questionamento. É seu direito garantido pelo Código de Defesa do Consumidor (CDC, Art. 49).
                  </Text>
                </View>

                <View style={styles.guaranteeCard}>
                  <BadgeCheck size={32} color="#10b981" />
                  <View style={styles.guaranteeText}>
                    <Text style={styles.guaranteeTitle}>{t(c.guaranteeTitle)}</Text>
                    <Text style={styles.guaranteeDesc}>{t(c.guaranteeDesc)}</Text>
                  </View>
                </View>

              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('web.footer.copyright')}</Text>
        <Text style={styles.footerCompany}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
        <Text style={styles.footerCnpj}>CNPJ: 66.059.212/0001-52</Text>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },

  nav: {},
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 16,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  localeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(251,191,36,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.25)',
  },
  localeBadgeText: { fontSize: 12, fontWeight: '700', color: '#fbbf24' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  header: { paddingTop: 56, paddingBottom: 48, paddingHorizontal: 24, alignItems: 'center' },
  headerTitle: {
    fontSize: isWeb ? 44 : 30,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: { fontSize: 17, color: '#94a3b8', textAlign: 'center', marginBottom: 16 },
  headerLocalePill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  headerLocalePillText: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },

  content: { paddingVertical: 56 },
  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },

  grid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 40,
    alignItems: 'flex-start',
  },
  checkoutCol: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  featuresCol: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  colTitle: { fontSize: 22, fontWeight: '800', color: '#e8d5b7', marginBottom: 20 },

  planCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  planCardSelected: {
    borderColor: '#d4a96a',
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  planSavings: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  planSavingsText: { fontSize: 12, fontWeight: '700', color: '#10b981' },
  planRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planInfo: { flex: 1 },
  planName: { fontSize: 17, fontWeight: '700', color: '#8892a4', marginBottom: 6 },
  planNameActive: { color: '#e8d5b7' },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 4 },
  planPrice: { fontSize: 36, fontWeight: '800', color: '#5a5a72' },
  planPriceActive: { color: '#d4a96a' },
  planPer: { fontSize: 15, color: '#8892a4', fontWeight: '500' },
  planTotal: { fontSize: 13, color: '#5a5a72' },
  planPriceHero: {
    fontSize: 52,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: 4,
  },
  planPriceCaption: {
    fontSize: 14,
    color: '#d4a96a',
    textAlign: 'center',
    fontWeight: '600',
  },
  radio: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: '#d4a96a' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#d4a96a' },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  errorText: { flex: 1, fontSize: 13, color: '#ef4444', lineHeight: 18 },

  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#d4a96a',
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 12,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutBtnDisabled: { opacity: 0.7 },
  checkoutBtnText: { fontSize: 18, fontWeight: '800', color: '#0d0d16' },

  payDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    marginBottom: 12,
  },
  payDividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(148,163,184,0.18)' },
  payDividerTxt: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  checkoutBtnAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#d4a96a',
    backgroundColor: 'rgba(212,169,106,0.06)',
  },
  checkoutBtnAltText: { fontSize: 16, fontWeight: '700', color: '#d4a96a' },
  kiwifyNote: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 8,
    fontStyle: 'italic',
  },

  disclaimer: { fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 18, marginBottom: 16 },

  securityBadges: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  securityBadgeText: { fontSize: 12, fontWeight: '700', color: '#8892a4' },

  featuresCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureCheck: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center', alignItems: 'center', flexShrink: 0,
  },
  featureText: { fontSize: 15, color: '#8892a4', flex: 1 },

  cdcGuarantee: {
    backgroundColor: 'rgba(212,169,106,0.06)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
    padding: 20,
    marginTop: 32,
    marginBottom: 8,
  },
  cdcGuaranteeKicker: {
    color: '#d4a96a',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 8,
  },
  cdcGuaranteeBody: {
    color: '#94a3b8',
    fontSize: 13,
    lineHeight: 21,
  },

  guaranteeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    marginTop: 4,
    marginBottom: 16,
  },
  guaranteeText: { flex: 1 },
  guaranteeTitle: { fontSize: 16, fontWeight: '700', color: '#e8d5b7', marginBottom: 6 },
  guaranteeDesc: { fontSize: 14, color: '#10b981', lineHeight: 20 },

  localeToggle: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    gap: 10,
  },
  localeToggleLabel: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  localeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  localeToggleBtnText: { fontSize: 13, fontWeight: '700', color: '#3b82f6' },

  successBox: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  successIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  successTitle: { fontSize: 28, fontWeight: '800', color: '#e8d5b7', textAlign: 'center', marginBottom: 12 },
  successDesc: { fontSize: 16, color: '#8892a4', textAlign: 'center', lineHeight: 26, marginBottom: 32 },
  successBtn: { backgroundColor: '#d4a96a', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 14 },
  successBtnText: { fontSize: 16, fontWeight: '800', color: '#0d0d16' },

  footer: { backgroundColor: '#07070f', paddingVertical: 24, alignItems: 'center', gap: 4 },
  footerText: { fontSize: 13, color: '#8892a4' },
  footerCompany: { fontSize: 12, color: '#8892a4', fontWeight: '600' },
  footerCnpj: { fontSize: 12, color: '#64748b' },

});
