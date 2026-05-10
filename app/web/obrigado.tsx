import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Moon,
  Check,
  Mail,
  MessageCircle,
  BookOpen,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react-native';
import {
  getProgramCompletoPath,
  isProgramAccessConfigured,
} from '@/lib/program-access';
import { useProgramUnlock } from '@/lib/program-unlock';

const isWeb = Platform.OS === 'web';

const SUPPORT_EMAIL = 'suporte@gozzzz.app';
const SUPPORT_WHATSAPP = 'https://wa.me/5511982820759?text=Acabei%20de%20pagar%20no%20Sono%2B%20e%20preciso%20do%20link%20de%20acesso';

export default function WebObrigadoPage() {
  const router = useRouter();
  // Aceita tanto ?source=kiwify quanto ?source=stripe (e ?orderId=...) para
  // facilitar tracking e diferenciar mensagem se quisermos no futuro.
  const params = useLocalSearchParams<{ source?: string; orderId?: string }>();
  const source = (Array.isArray(params.source) ? params.source[0] : params.source) ?? 'kiwify';

  // Importante: chamamos o hook só pelo efeito colateral de salvar o `?key=`
  // no localStorage. Se o cliente fechar esta página sem clicar em nada, o
  // próximo acesso a /web/programa ainda destrava porque a chave já está
  // gravada. Resolve o cenário "Kiwify não enviou e-mail / cliente fechou
  // o navegador antes de clicar".
  useProgramUnlock();

  // Dispara um evento de conversão simples no GA/pixel quando a página carrega.
  // (Sem dependência de SDK extra — usa window.dataLayer se existir.)
  useEffect(() => {
    if (isWeb && typeof window !== 'undefined') {
      const w = window as unknown as { dataLayer?: unknown[] };
      if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({
          event: 'purchase_confirmed',
          source,
          orderId: params.orderId ?? null,
          value: 147,
          currency: 'BRL',
        });
      }
    }
  }, [source, params.orderId]);

  return (
    <>
      <Head>
        <title>Pagamento confirmado — GoZzzz</title>
        <meta name="description" content="Pagamento confirmado. Em instantes você receberá o acesso completo ao programa de 21 lições no seu e-mail." />
        {/* Página privada — não indexar */}
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://gozzzz.app/web/obrigado" />
      </Head>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
                <Moon size={22} color="#fbbf24" strokeWidth={2} />
              </div>
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.hero}>
          <View style={styles.successBadge}>
            <Check size={42} color="#10b981" strokeWidth={3} />
          </View>

          <Text role="heading" aria-level={1} style={styles.title}>
            Pagamento confirmado
          </Text>

          <Text style={styles.subtitle}>
            Obrigado por confiar no GoZzzz. Você acaba de garantir acesso vitalício ao programa de 21 lições.
          </Text>

          <TouchableOpacity
            style={styles.heroCta}
            activeOpacity={0.88}
            onPress={() => {
              if (isProgramAccessConfigured()) {
                router.push(getProgramCompletoPath());
              } else {
                Linking.openURL(
                  `mailto:${SUPPORT_EMAIL}?subject=GoZzzz%20-%20link%20do%20programa`,
                );
              }
            }}
          >
            <BookOpen size={20} color="#0d0d16" />
            <Text style={styles.heroCtaTxt}>Abrir as 21 lições agora</Text>
            <ExternalLink size={16} color="#0d0d16" />
          </TouchableOpacity>
          <Text style={styles.heroCtaHint}>
            {isProgramAccessConfigured()
              ? 'Guarde esta página nos favoritos — é o seu acesso vitalício ao texto completo.'
              : `Peça para configurarem EXPO_PUBLIC_PROGRAM_ACCESS_KEY na Vercel — ou escreva ${SUPPORT_EMAIL}.`}
          </Text>

          <View style={styles.steps}>
            <View style={styles.step}>
              <View style={styles.stepIconWrap}>
                <Mail size={20} color="#d4a96a" />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>1. Verifique o seu e-mail</Text>
                <Text style={styles.stepDesc}>
                  Você receberá o recibo da compra por e-mail (Kiwify). O texto completo das 21 lições está no botão dourado acima — salve esse link.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepIconWrap}>
                <Clock size={20} color="#d4a96a" />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>2. Não chegou em 30 minutos?</Text>
                <Text style={styles.stepDesc}>
                  Mande uma mensagem pra gente — respondemos rápido e liberamos o acesso na hora.
                </Text>
                <View style={styles.contactRow}>
                  <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=Preciso%20do%20acesso%20ao%20Sono%2B`)}
                  >
                    <Mail size={14} color="#94a3b8" />
                    <Text style={styles.contactBtnTxt}>{SUPPORT_EMAIL}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.contactBtn}
                    onPress={() => Linking.openURL(SUPPORT_WHATSAPP)}
                  >
                    <MessageCircle size={14} color="#10b981" />
                    <Text style={styles.contactBtnTxt}>WhatsApp</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.step}>
              <View style={styles.stepIconWrap}>
                <BookOpen size={20} color="#d4a96a" />
              </View>
              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>3. Quer dar uma espiada nas lições gratuitas?</Text>
                <Text style={styles.stepDesc}>
                  As 3 primeiras lições estão sempre disponíveis no nosso site, sem precisar de login.
                </Text>
                <TouchableOpacity
                  style={styles.secondaryBtn}
                  activeOpacity={0.88}
                  onPress={() => router.push('/web/programa')}
                >
                  <Text style={styles.secondaryBtnTxt}>Ver as 3 primeiras lições</Text>
                  <ArrowRight size={16} color="#d4a96a" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.footnote}>
            Compra feita via {source === 'stripe' ? 'Stripe' : 'Kiwify'} · Garantia de 7 dias (CDC, Art. 49) ·{' '}
            <Text style={styles.footnoteLink} onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}>
              suporte
            </Text>
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },
  pageContent: { flexGrow: 1, paddingBottom: 64 },
  nav: { paddingTop: isWeb ? 16 : 50, paddingBottom: 16, paddingHorizontal: 20 },
  navInner: {
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 20, fontWeight: '800', color: '#ffffff', letterSpacing: -0.5 },
  hero: {
    maxWidth: 720,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
    alignItems: 'center',
  },
  successBadge: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16,185,129,0.10)',
    borderWidth: 1.5,
    borderColor: 'rgba(16,185,129,0.35)',
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#e8e5df',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 540,
    marginBottom: 36,
  },
  steps: {
    width: '100%',
    gap: 18,
    marginTop: 8,
  },
  step: {
    flexDirection: 'row',
    gap: 14,
    backgroundColor: '#12121e',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 18,
  },
  stepIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212,169,106,0.10)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBody: { flex: 1, gap: 6 },
  stepTitle: { fontSize: 15, fontWeight: '700', color: '#e8e5df' },
  stepDesc: { fontSize: 13, color: '#94a3b8', lineHeight: 20 },
  contactRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 10 },
  contactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  contactBtnTxt: { fontSize: 12, color: '#cbd5e1', fontWeight: '600' },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  primaryBtnTxt: { fontSize: 14, fontWeight: '800', color: '#0d0d16' },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#d4a96a',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 12,
    alignSelf: 'flex-start',
  },
  secondaryBtnTxt: { fontSize: 14, fontWeight: '700', color: '#d4a96a' },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#d4a96a',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#d4a96a',
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 6,
  },
  heroCtaTxt: { fontSize: 17, fontWeight: '800', color: '#0d0d16', letterSpacing: -0.2 },
  heroCtaHint: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 28,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginTop: 32,
    marginBottom: 18,
  },
  footnote: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 18,
  },
  footnoteLink: { color: '#d4a96a', textDecorationLine: 'underline' },
});
