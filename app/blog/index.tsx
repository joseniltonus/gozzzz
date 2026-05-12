/**
 * /blog — índice de artigos.
 *
 * Static-friendly: lê BLOG_POSTS no build, agrupa por categoria. JSON-LD
 * inclui CollectionPage + ItemList + Breadcrumb pra Google entender o hub.
 */

import { useMemo } from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, BookOpen, Clock } from 'lucide-react-native';
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  type BlogCategoryId,
  type BlogPost,
} from '@/data/posts';
import { buildBlogIndexSchemaGraph } from '@/lib/seo-blog-schema';

const ACCENT = '#7c5ce8';
const ACCENT_LIGHT = '#a5b4fc';
const ACCENT_DEEP = '#1e1b4b';
const BG = '#0a0a1a';
const BG_CARD = '#14122e';
const TEXT_MAIN = '#e8e5df';
const TEXT_MUTED = '#94a3b8';

const HEAD_TITLE = 'Blog GoZzzz · Ciência do sono em português';
const HEAD_DESC =
  'Artigos sobre sono, cronótipo, ritmo circadiano e neurociência aplicada — em português, com fundamento e leitura rápida.';

export default function BlogIndexPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const contentPadH = width < 400 ? 16 : 24;
  const navStacked = width < 560;
  const navShort = width < 420;

  const sortedPosts = useMemo(
    () => [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1)),
    [],
  );

  const grouped = useMemo(() => {
    const out = {} as Record<BlogCategoryId, BlogPost[]>;
    (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).forEach((c) => {
      out[c] = [];
    });
    sortedPosts.forEach((p) => out[p.category].push(p));
    return out;
  }, [sortedPosts]);

  const schemaGraph = useMemo(() => buildBlogIndexSchemaGraph(sortedPosts), [sortedPosts]);

  return (
    <>
      <Head>
        <title>{HEAD_TITLE}</title>
        <meta name="description" content={HEAD_DESC} />
        <meta property="og:title" content={HEAD_TITLE} />
        <meta property="og:description" content={HEAD_DESC} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozzzz.app/blog" />
        <meta property="og:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:site_name" content="GoZzzz" />
        <meta property="og:locale" content="pt_BR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={HEAD_TITLE} />
        <meta name="twitter:description" content={HEAD_DESC} />
        <meta name="twitter:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1"
        />
        <link rel="canonical" href="https://gozzzz.app/blog" />
        <link rel="alternate" hrefLang="pt-BR" href="https://gozzzz.app/blog" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Head>

      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0c0a1f', ACCENT_DEEP]} style={styles.nav}>
          <View style={[styles.navInner, navStacked && styles.navInnerStacked, { paddingHorizontal: contentPadH }]}>
            <TouchableOpacity accessibilityRole="link" onPress={() => router.push('/web')}>
              <Text style={styles.brand}>GoZzzz</Text>
            </TouchableOpacity>
            <View style={[styles.navRight, navStacked && styles.navRightStacked]}>
              <TouchableOpacity
                style={styles.navGhost}
                accessibilityRole="link"
                onPress={() => router.push('/web/sono-plus')}
              >
                <BookOpen size={16} color={ACCENT_LIGHT} />
                <Text style={styles.navGhostTxt}>
                  {navShort ? '21 passos' : 'Programa 21 Passos'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        <LinearGradient colors={[ACCENT_DEEP, '#0c0a1f', BG]} style={styles.hero}>
          <View style={[styles.heroInner, { paddingHorizontal: contentPadH }]}>
            <Text style={styles.kicker}>· BLOG GOZZZZ</Text>
            <Text role="heading" aria-level={1} style={styles.h1}>
              Ciência do sono, em português
            </Text>
            <Text style={styles.lead}>
              Artigos curtos, práticos e com fundamento. Cronótipo, ritmo circadiano, sono profundo e o que a literatura diz —
              sem promessa mágica.
            </Text>
          </View>
        </LinearGradient>

        <View style={[styles.contentWrap, { paddingHorizontal: contentPadH }]}>
          {(Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).map((catId) => {
            const cat = BLOG_CATEGORIES[catId];
            const posts = grouped[catId];
            if (!posts.length) return null;
            return (
              <View key={catId} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.categoryLabel}>{cat.label}</Text>
                    <Text style={styles.categoryDesc}>{cat.description}</Text>
                  </View>
                </View>

                <View style={styles.cardsGrid}>
                  {posts.map((p) => (
                    <TouchableOpacity
                      key={p.slug}
                      style={styles.card}
                      onPress={() => router.push(`/blog/${p.slug}`)}
                      activeOpacity={0.85}
                      accessibilityRole="link"
                    >
                      {p.heroImage ? (
                        <View style={[styles.cardImageWrap, { borderColor: cat.color + '44' }]}>
                          <Image
                            source={{ uri: p.heroImage.replace('.webp', '@thumb.webp') }}
                            accessibilityLabel={`Ilustração do artigo: ${p.title}`}
                            resizeMode="cover"
                            style={styles.cardImage}
                          />
                        </View>
                      ) : (
                        <View style={[styles.cardEmojiWrap, { backgroundColor: cat.color + '22', borderColor: cat.color + '44' }]}>
                          <Text style={styles.cardEmoji}>{p.emoji}</Text>
                        </View>
                      )}
                      <Text style={styles.cardTitle} numberOfLines={3}>{p.title}</Text>
                      <Text style={styles.cardExcerpt} numberOfLines={3}>{p.excerpt}</Text>
                      <View style={styles.cardMeta}>
                        <Clock size={12} color={TEXT_MUTED} />
                        <Text style={styles.cardMetaTxt}>{p.readingMinutes} min de leitura</Text>
                        <ArrowRight size={14} color={ACCENT_LIGHT} style={{ marginLeft: 'auto' }} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            );
          })}

          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Pronto para um plano completo?</Text>
            <Text style={styles.ctaSub}>
              O Programa de 21 Passos transforma essas leituras em uma trilha guiada, dia a dia.
            </Text>
            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={() => router.push('/web/sono-plus')}
              accessibilityRole="link"
            >
              <Text style={styles.ctaBtnTxt}>Conhecer o programa</Text>
              <ArrowRight size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <View style={styles.footerNav}>
              <TouchableOpacity accessibilityRole="link" onPress={() => router.push('/web')}>
                <Text style={styles.footerLink}>Início</Text>
              </TouchableOpacity>
              <Text style={styles.footerSep}>·</Text>
              <TouchableOpacity accessibilityRole="link" onPress={() => router.push('/web/sono-plus')}>
                <Text style={styles.footerLink}>Programa 21 Passos</Text>
              </TouchableOpacity>
              <Text style={styles.footerSep}>·</Text>
              <TouchableOpacity
                accessibilityRole="link"
                onPress={() => Platform.OS === 'web' && Linking.openURL('mailto:suporte@gozzzz.app')}
              >
                <Text style={styles.footerLink}>Suporte</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.footerCopy}>
              MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ 66.059.212/0001-52
            </Text>
            <Text style={styles.footerDisclaimer}>
              Conteúdo educativo. Não substitui avaliação médica individualizada.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG, maxWidth: '100%', alignSelf: 'stretch' },
  nav: { paddingTop: 16, paddingBottom: 16 },
  navInner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  navInnerStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  brand: { color: '#ffffff', fontSize: 20, fontWeight: '800' },
  navRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 1,
    minWidth: 0,
    justifyContent: 'flex-end',
  },
  navRightStacked: {
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  navGhost: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  navGhostTxt: { color: '#94a3b8', fontWeight: '600', fontSize: 13 },
  hero: { paddingTop: 48, paddingBottom: 40 },
  heroInner: { maxWidth: 800, width: '100%', alignSelf: 'center' },
  kicker: {
    color: ACCENT_LIGHT,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  h1: { color: TEXT_MAIN, fontSize: 36, fontWeight: '800', lineHeight: 42, letterSpacing: -0.5 },
  lead: { color: TEXT_MUTED, fontSize: 16, lineHeight: 24, marginTop: 16 },
  contentWrap: { maxWidth: 1100, width: '100%', alignSelf: 'center', paddingVertical: 32 },
  categorySection: { marginBottom: 40 },
  categoryHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  categoryDot: { width: 8, height: 8, borderRadius: 4 },
  categoryLabel: {
    color: TEXT_MAIN,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  categoryDesc: { color: TEXT_MUTED, fontSize: 13, marginTop: 2 },
  cardsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  card: {
    flexBasis: '100%',
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 0,
    maxWidth: 360,
    backgroundColor: BG_CARD,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.15)',
    padding: 18,
  },
  cardEmojiWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  cardEmoji: { fontSize: 22 },
  cardImageWrap: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 12,
    marginHorizontal: -2,
    backgroundColor: '#0c0a1f',
  },
  cardImage: { width: '100%', height: '100%' },
  cardTitle: { color: TEXT_MAIN, fontSize: 16, fontWeight: '700', lineHeight: 22 },
  cardExcerpt: { color: TEXT_MUTED, fontSize: 13, lineHeight: 19, marginTop: 8 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14 },
  cardMetaTxt: { color: TEXT_MUTED, fontSize: 12, fontWeight: '500' },
  ctaCard: {
    marginTop: 8,
    backgroundColor: 'rgba(124,92,232,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.25)',
    padding: 28,
    alignItems: 'center',
  },
  ctaTitle: { color: TEXT_MAIN, fontSize: 22, fontWeight: '800', textAlign: 'center' },
  ctaSub: { color: TEXT_MUTED, fontSize: 14, lineHeight: 21, marginTop: 8, textAlign: 'center', maxWidth: 480 },
  ctaBtn: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: ACCENT,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaBtnTxt: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  footer: { paddingTop: 40, alignItems: 'center', gap: 6 },
  footerNav: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  footerLink: { color: '#cbd1de', fontSize: 13, fontWeight: '600' },
  footerSep: { color: 'rgba(203,209,222,0.4)', fontSize: 12 },
  footerCopy: { color: TEXT_MUTED, fontSize: 12, textAlign: 'center', marginTop: 8 },
  footerDisclaimer: { color: TEXT_MUTED, fontSize: 11, textAlign: 'center', marginTop: 4 },
});
