import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useMemo, type ReactNode } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, ArrowLeft, Lock, BookOpen } from 'lucide-react-native';
import { LESSONS_DATA } from '@/data/lessons';
import {
  getPublicProgramAccessKey,
  isProgramAccessConfigured,
} from '@/lib/program-access';

const isWeb = Platform.OS === 'web';

const SUPPORT_EMAIL = 'suporte@gozzzz.app';

function BoldParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Text style={styles.bodyPara}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text key={i} style={styles.bodyBold}>
              {part.slice(2, -2)}
            </Text>
          );
        }
        return <Text key={i}>{part}</Text>;
      })}
    </Text>
  );
}

export default function ProgramaCompletoPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{ key?: string | string[] }>();
  const rawKey = params.key;
  const providedKey = Array.isArray(rawKey) ? rawKey[0] : rawKey ?? '';

  const expectedKey = getPublicProgramAccessKey().trim();
  const configured = isProgramAccessConfigured();
  const unlocked =
    configured && providedKey.trim() === expectedKey;

  const sorted = useMemo(
    () =>
      [...LESSONS_DATA].sort((a, b) => a.step_number - b.step_number),
    [],
  );

  if (!configured) {
    return (
      <>
        <Head>
          <title>Acesso ao programa — GoZzzz</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <LockedShell onBack={() => router.push('/web')}>
          <Lock size={40} color="#94a3b8" />
          <Text style={styles.lockedTitle}>Acesso ainda não configurado</Text>
          <Text style={styles.lockedDesc}>
            Peça ao desenvolvedor para definir EXPO_PUBLIC_PROGRAM_ACCESS_KEY no
            painel da Vercel e fazer um novo deploy.
          </Text>
        </LockedShell>
      </>
    );
  }

  if (!unlocked) {
    return (
      <>
        <Head>
          <title>Acesso ao programa — GoZzzz</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        <LockedShell onBack={() => router.push('/web')}>
          <Lock size={40} color="#94a3b8" />
          <Text style={styles.lockedTitle}>Link inválido ou incompleto</Text>
          <Text style={styles.lockedDesc}>
            Use o link completo que você recebeu por e-mail após a compra (ele
            termina com ?key=…). Se perdeu, fale com o suporte.
          </Text>
          <TouchableOpacity
            style={styles.lockedBtn}
            onPress={() =>
              Linking.openURL(
                `mailto:${SUPPORT_EMAIL}?subject=Acesso%20ao%20programa%20GoZzzz`,
              )
            }
          >
            <Text style={styles.lockedBtnTxt}>{SUPPORT_EMAIL}</Text>
          </TouchableOpacity>
        </LockedShell>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Programa completo — 21 passos — GoZzzz</title>
        <meta
          name="description"
          content="Programa GoZzzz Sono+ — 21 lições em texto, acesso vitalício."
        />
        <meta name="robots" content="noindex,nofollow" />
        <link rel="canonical" href="https://gozzzz.app/web/programa-completo" />
      </Head>
      <ScrollView
        style={styles.page}
        contentContainerStyle={styles.pageContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
          <View style={styles.navInner}>
            <TouchableOpacity
              onPress={() => router.push('/web')}
              style={styles.navBrand}
            >
              <Moon size={22} color="#fbbf24" />
              <Text style={styles.navBrandText}>GoZzzz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/web/programa')}
              style={styles.backBtn}
            >
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>Trilha pública</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={styles.hero}>
          <View style={styles.heroBadge}>
            <BookOpen size={14} color="#fbbf24" />
            <Text style={styles.heroBadgeText}>Acesso vitalício · texto</Text>
          </View>
          <Text style={styles.heroTitle}>Programa completo — 21 passos</Text>
          <Text style={styles.heroSubtitle}>
            Todas as lições abaixo são as mesmas da trilha do app, em formato de
            leitura. Guarde esta página nos favoritos para voltar quando quiser.
          </Text>
        </View>

        <View style={styles.lessonsWrap}>
          {sorted.map((lesson) => (
            <View
              key={lesson.id}
              style={styles.lessonCard}
              nativeID={`passo-${lesson.step_number}`}
            >
              <Text style={styles.lessonKicker}>
                Passo {lesson.step_number} de {sorted.length}
              </Text>
              <Text style={styles.lessonTitle}>{lesson.title_pt}</Text>
              <Text style={styles.lessonMeta}>
                ~{lesson.duration_minutes} min de leitura
              </Text>
              <View style={styles.lessonBody}>
                {lesson.description_pt.split(/\n\n+/).map((block, bi) => (
                  <BoldParagraph key={bi} text={block.trim()} />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dúvidas?{' '}
            <Text
              style={styles.footerLink}
              onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)}
            >
              {SUPPORT_EMAIL}
            </Text>
          </Text>
          <Text style={styles.footerLegal}>
            © 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ:
            66.059.212/0001-52
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

function LockedShell({
  children,
  onBack,
}: {
  children: ReactNode;
  onBack: () => void;
}) {
  return (
    <ScrollView style={styles.page} contentContainerStyle={styles.lockedPage}>
      <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={onBack} style={styles.navBrand}>
            <Moon size={22} color="#fbbf24" />
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.lockedInner}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },
  pageContent: { paddingBottom: 48 },
  nav: { paddingTop: isWeb ? 16 : 50 },
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { color: '#94a3b8', fontSize: 14, fontWeight: '600' },
  hero: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(251,191,36,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 14,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fbbf24',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e8e5df',
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#94a3b8',
    lineHeight: 23,
  },
  lessonsWrap: {
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 20,
    gap: 20,
  },
  lessonCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    padding: 20,
  },
  lessonKicker: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#e8e5df',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  lessonMeta: { fontSize: 12, color: '#64748b', marginBottom: 16 },
  lessonBody: { gap: 14 },
  bodyPara: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  bodyBold: { fontWeight: '700', color: '#f1f5f9' },
  footer: {
    marginTop: 36,
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
    gap: 8,
    maxWidth: 900,
    alignSelf: 'center',
    width: '100%',
  },
  footerText: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  footerLink: { color: '#d4a96a', fontWeight: '600' },
  footerLegal: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 16,
  },
  lockedPage: { flexGrow: 1, backgroundColor: '#07070f' },
  lockedInner: {
    padding: 28,
    maxWidth: 520,
    alignSelf: 'center',
    alignItems: 'center',
    gap: 14,
  },
  lockedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#e8e5df',
    textAlign: 'center',
  },
  lockedDesc: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 23,
  },
  lockedBtn: {
    marginTop: 8,
    backgroundColor: 'rgba(212,169,106,0.15)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.35)',
  },
  lockedBtnTxt: { color: '#d4a96a', fontWeight: '700', fontSize: 14 },
});
