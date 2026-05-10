/**
 * /blog/[slug] — página de artigo do blog GoZzzz.
 *
 * Renderiza BlogPost por blocos estruturados (BlogBlock), com:
 * - Hero com gradiente + emoji estilizado (substitui ilustração).
 * - Botão "Escutar artigo" usando Web Speech API (gratuito, no browser).
 * - JSON-LD: BlogPosting + WebPage(Speakable) + FAQPage + Breadcrumb.
 * - CTA pro programa + posts relacionados (internal linking pra SEO).
 *
 * Static export do Expo Router: este arquivo é uma SPA-route compilada
 * em dist/blog/[slug].html. O conteúdo é servido via JS hidratação após
 * o crawler rodar JS (Google faz isso). Pra YMYL, o ideal seria SSG por
 * slug — fica como possível upgrade futuro.
 */

import { useEffect, useMemo, useState } from 'react';
import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Head from 'expo-router/head';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Pause,
  Volume2,
} from 'lucide-react-native';
import {
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getPostBySlug,
  getPostPlainText,
  getRelatedPosts,
  type BlogBlock,
  type BlogPost,
} from '@/data/posts';
import { buildBlogPostSchemaGraph } from '@/lib/seo-blog-schema';

const ACCENT = '#7c5ce8';
const ACCENT_LIGHT = '#a5b4fc';
const ACCENT_DEEP = '#1e1b4b';
const BG = '#0a0a1a';
const BG_CARD = '#14122e';
const TEXT_MAIN = '#e8e5df';
const TEXT_MUTED = '#94a3b8';

// expo-router static export precisa saber as rotas estáticas que esse [slug]
// vai gerar (cada artigo vira um HTML pré-renderizado em build).
export function generateStaticParams(): { slug: string }[] {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default function BlogPostPage() {
  const router = useRouter();
  const { slug: rawSlug } = useLocalSearchParams<{ slug?: string | string[] }>();
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug ?? '';
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  if (!post) return <BlogPostNotFound />;

  const cat = BLOG_CATEGORIES[post.category];
  const related = useMemo(() => getRelatedPosts(post), [post]);
  const schemaGraph = useMemo(() => buildBlogPostSchemaGraph(post), [post]);

  return (
    <>
      <Head>
        <title>{`${post.title} · Blog GoZzzz`}</title>
        <meta name="description" content={post.metaDescription} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://gozzzz.app/blog/${post.slug}`} />
        <meta property="og:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="800" />
        <meta property="og:site_name" content="GoZzzz" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <meta property="article:section" content={cat.label} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <meta name="twitter:image" content="https://gozzzz.app/og/sono-plus.png" />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1"
        />
        <link rel="canonical" href={`https://gozzzz.app/blog/${post.slug}`} />
        <link rel="alternate" hrefLang="pt-BR" href={`https://gozzzz.app/blog/${post.slug}`} />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Head>

      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0c0a1f', ACCENT_DEEP]} style={styles.nav}>
          <View style={styles.navInner}>
            <Link href="/web" asChild>
              <TouchableOpacity accessibilityRole="link">
                <Text style={styles.brand}>GoZzzz</Text>
              </TouchableOpacity>
            </Link>
            <Link href="/blog" asChild>
              <TouchableOpacity style={styles.navGhost} accessibilityRole="link">
                <ArrowLeft size={16} color={ACCENT_LIGHT} />
                <Text style={styles.navGhostTxt}>Todos os artigos</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </LinearGradient>

        <LinearGradient colors={[ACCENT_DEEP, '#0c0a1f', BG]} style={styles.hero}>
          <View style={styles.heroInner}>
            <View
              style={[
                styles.heroEmojiWrap,
                { backgroundColor: cat.color + '22', borderColor: cat.color + '55' },
              ]}
            >
              <Text style={styles.heroEmoji}>{post.emoji}</Text>
            </View>

            <View style={styles.breadcrumbs}>
              <Link href="/blog" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.breadcrumbLink}>Blog</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.breadcrumbSep}>·</Text>
              <Text style={[styles.breadcrumbCat, { color: cat.color }]}>{cat.label}</Text>
            </View>

            <Text role="heading" aria-level={1} nativeID="post-headline" style={styles.h1}>
              {post.title}
            </Text>

            <View style={styles.metaRow}>
              <Clock size={13} color={TEXT_MUTED} />
              <Text style={styles.metaTxt}>{post.readingMinutes} min de leitura</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaTxt}>Atualizado em {formatDateBR(post.updatedAt)}</Text>
            </View>

            <AudioPlayer post={post} />
          </View>
        </LinearGradient>

        <View style={styles.contentWrap}>
          <Text nativeID="post-intro" style={styles.intro}>
            {post.intro}
          </Text>

          {post.body.map((block, i) => (
            <RenderBlock key={i} block={block} accent={cat.color} />
          ))}

          {post.faq.length > 0 && (
            <View style={styles.faqSection}>
              <Text role="heading" aria-level={2} style={styles.h2}>
                Perguntas frequentes
              </Text>
              {post.faq.map((f, i) => (
                <View key={i} style={styles.faqItem}>
                  <Text style={styles.faqQ}>{f.question}</Text>
                  <Text style={styles.faqA}>{f.answer}</Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.disclaimer}>
            <Text style={styles.disclaimerTxt}>
              Conteúdo educativo baseado em literatura pública. As referências a pesquisadores têm fim educativo —
              GoZzzz não possui afiliação com pesquisadores ou instituições citadas.
              Não substitui avaliação médica individualizada.
            </Text>
          </View>

          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Quer aplicar isso de forma estruturada?</Text>
            <Text style={styles.ctaSub}>
              O Programa de 21 Passos transforma esses conceitos em uma trilha guiada — com diagnóstico de cronótipo,
              protocolos práticos e acompanhamento.
            </Text>
            <TouchableOpacity
              style={styles.ctaBtn}
              onPress={() => router.push('/web/sono-plus')}
              accessibilityRole="link"
            >
              <BookOpen size={18} color="#ffffff" />
              <Text style={styles.ctaBtnTxt}>Ver o programa completo</Text>
              <ArrowRight size={16} color="#ffffff" />
            </TouchableOpacity>
            <Text style={styles.ctaHint}>3 primeiras lições gratuitas · acesso vitalício por R$ 147</Text>
          </View>

          {related.length > 0 && (
            <View style={styles.relatedSection}>
              <Text role="heading" aria-level={2} style={styles.h2}>
                Continue lendo
              </Text>
              <View style={styles.relatedGrid}>
                {related.map((r) => {
                  const rcat = BLOG_CATEGORIES[r.category];
                  return (
                    <TouchableOpacity
                      key={r.slug}
                      style={styles.relatedCard}
                      onPress={() => router.push(`/blog/${r.slug}`)}
                      activeOpacity={0.85}
                      accessibilityRole="link"
                    >
                      <View
                        style={[
                          styles.relatedEmojiWrap,
                          { backgroundColor: rcat.color + '22', borderColor: rcat.color + '44' },
                        ]}
                      >
                        <Text style={styles.relatedEmoji}>{r.emoji}</Text>
                      </View>
                      <Text style={styles.relatedTitle} numberOfLines={3}>{r.title}</Text>
                      <View style={styles.relatedMeta}>
                        <Clock size={11} color={TEXT_MUTED} />
                        <Text style={styles.relatedMetaTxt}>{r.readingMinutes} min</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.footerNav}>
              <Link href="/web" asChild>
                <TouchableOpacity accessibilityRole="link"><Text style={styles.footerLink}>Início</Text></TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/blog" asChild>
                <TouchableOpacity accessibilityRole="link"><Text style={styles.footerLink}>Blog</Text></TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/sono-plus" asChild>
                <TouchableOpacity accessibilityRole="link"><Text style={styles.footerLink}>Programa 21 Passos</Text></TouchableOpacity>
              </Link>
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
          </View>
        </View>
      </ScrollView>
    </>
  );
}

function BlogPostNotFound() {
  const router = useRouter();
  return (
    <ScrollView style={[styles.page, { padding: 32 }]}>
      <Head>
        <title>Artigo não encontrado · Blog GoZzzz</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <Text style={styles.h1}>Artigo não encontrado</Text>
      <Text style={[styles.metaTxt, { marginTop: 12 }]}>
        O link pode estar incorreto ou o artigo foi movido.
      </Text>
      <TouchableOpacity
        style={[styles.ctaBtn, { marginTop: 20, alignSelf: 'flex-start' }]}
        onPress={() => router.push('/blog')}
        accessibilityRole="link"
      >
        <Text style={styles.ctaBtnTxt}>Ver todos os artigos</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── Renderer dos blocos do corpo do artigo ──────────────────────────────

function RenderBlock({ block, accent }: { block: BlogBlock; accent: string }) {
  switch (block.type) {
    case 'h2':
      return (
        <Text role="heading" aria-level={2} style={styles.h2}>
          {block.text}
        </Text>
      );
    case 'h3':
      return (
        <Text role="heading" aria-level={3} style={styles.h3}>
          {block.text}
        </Text>
      );
    case 'p':
      return <Text style={styles.p}>{block.text}</Text>;
    case 'ul':
      return (
        <View style={styles.list}>
          {block.items.map((it, i) => (
            <View key={i} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: accent }]} />
              <Text style={styles.listText}>{it}</Text>
            </View>
          ))}
        </View>
      );
    case 'ol':
      return (
        <View style={styles.list}>
          {block.items.map((it, i) => (
            <View key={i} style={styles.listItem}>
              <Text style={[styles.olNum, { color: accent }]}>{i + 1}.</Text>
              <Text style={styles.listText}>{it}</Text>
            </View>
          ))}
        </View>
      );
    case 'callout':
      return (
        <View
          style={[
            styles.callout,
            block.tone === 'warning' && { backgroundColor: 'rgba(239,68,68,0.08)', borderColor: 'rgba(239,68,68,0.3)' },
            block.tone === 'tip' && { backgroundColor: 'rgba(16,185,129,0.08)', borderColor: 'rgba(16,185,129,0.3)' },
            block.tone === 'info' && { backgroundColor: 'rgba(124,92,232,0.08)', borderColor: 'rgba(124,92,232,0.3)' },
          ]}
        >
          <Text style={styles.calloutText}>{block.text}</Text>
        </View>
      );
    case 'quote':
      return (
        <View style={styles.quote}>
          <Text style={styles.quoteText}>“{block.text}”</Text>
          {block.cite && <Text style={styles.quoteCite}>— {block.cite}</Text>}
        </View>
      );
    default:
      return null;
  }
}

// ─── Botão de áudio (Web Speech API, gratuito) ───────────────────────────

function AudioPlayer({ post }: { post: BlogPost }) {
  const [supported, setSupported] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    if (typeof window === 'undefined') return;
    if (!('speechSynthesis' in window)) return;
    setSupported(true);
    return () => {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    };
  }, []);

  if (!supported) return null;

  const handleToggle = () => {
    if (Platform.OS !== 'web' || typeof window === 'undefined') return;
    const synth = window.speechSynthesis;
    if (playing) {
      synth.cancel();
      setPlaying(false);
      return;
    }
    try {
      const utter = new SpeechSynthesisUtterance(getPostPlainText(post));
      utter.lang = 'pt-BR';
      utter.rate = 1.0;
      utter.pitch = 1.0;
      const voices = synth.getVoices();
      const ptVoice = voices.find((v) => v.lang?.toLowerCase().startsWith('pt'));
      if (ptVoice) utter.voice = ptVoice;
      utter.onend = () => setPlaying(false);
      utter.onerror = () => setPlaying(false);
      synth.cancel();
      synth.speak(utter);
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.audioBtn}
      onPress={handleToggle}
      accessibilityRole="button"
      accessibilityLabel={playing ? 'Pausar leitura em áudio' : 'Escutar artigo em áudio'}
    >
      {playing ? (
        <Pause size={16} color={ACCENT_LIGHT} />
      ) : (
        <Volume2 size={16} color={ACCENT_LIGHT} />
      )}
      <Text style={styles.audioBtnTxt}>
        {playing ? 'Pausar leitura' : 'Escutar artigo'}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────

function formatDateBR(iso: string): string {
  try {
    const d = new Date(`${iso}T00:00:00Z`);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },
  nav: { paddingTop: 16, paddingBottom: 16, paddingHorizontal: 16 },
  navInner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { color: '#ffffff', fontSize: 20, fontWeight: '800' },
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
  hero: { paddingTop: 36, paddingBottom: 32, paddingHorizontal: 24 },
  heroInner: { maxWidth: 720, width: '100%', alignSelf: 'center' },
  heroEmojiWrap: {
    width: 64,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroEmoji: { fontSize: 32 },
  breadcrumbs: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  breadcrumbLink: { color: ACCENT_LIGHT, fontSize: 12, fontWeight: '700' },
  breadcrumbSep: { color: 'rgba(255,255,255,0.3)', fontSize: 12 },
  breadcrumbCat: { fontSize: 12, fontWeight: '800', letterSpacing: 0.4 },
  h1: { color: TEXT_MAIN, fontSize: 32, fontWeight: '800', lineHeight: 38, letterSpacing: -0.3 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 14, flexWrap: 'wrap' },
  metaTxt: { color: TEXT_MUTED, fontSize: 12 },
  metaSep: { color: 'rgba(148,163,184,0.4)', fontSize: 12 },
  audioBtn: {
    marginTop: 20,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: 'rgba(124,92,232,0.14)',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.4)',
  },
  audioBtnTxt: { color: ACCENT_LIGHT, fontSize: 13, fontWeight: '700' },
  contentWrap: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 64,
  },
  intro: {
    color: TEXT_MAIN,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    marginBottom: 24,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT,
  },
  h2: {
    color: TEXT_MAIN,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 28,
    marginTop: 32,
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  h3: {
    color: TEXT_MAIN,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 6,
  },
  p: { color: TEXT_MUTED, fontSize: 15, lineHeight: 25, marginBottom: 14 },
  list: { marginBottom: 14, gap: 10 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  bullet: { width: 5, height: 5, borderRadius: 3, marginTop: 10 },
  olNum: { fontSize: 15, fontWeight: '800', minWidth: 22, lineHeight: 25 },
  listText: { flex: 1, color: TEXT_MUTED, fontSize: 15, lineHeight: 25 },
  callout: {
    marginVertical: 14,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  calloutText: { color: TEXT_MAIN, fontSize: 14, lineHeight: 22, fontWeight: '500' },
  quote: {
    marginVertical: 18,
    paddingLeft: 16,
    borderLeftWidth: 3,
    borderLeftColor: ACCENT_LIGHT,
  },
  quoteText: { color: TEXT_MAIN, fontSize: 16, lineHeight: 26, fontStyle: 'italic' },
  quoteCite: { color: TEXT_MUTED, fontSize: 12, marginTop: 6, fontWeight: '600' },
  faqSection: { marginTop: 40 },
  faqItem: {
    backgroundColor: BG_CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.15)',
    padding: 16,
    marginTop: 12,
  },
  faqQ: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  faqA: { color: TEXT_MUTED, fontSize: 14, lineHeight: 22 },
  disclaimer: {
    marginTop: 28,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(148,163,184,0.2)',
  },
  disclaimerTxt: { color: TEXT_MUTED, fontSize: 12, lineHeight: 18, fontStyle: 'italic' },
  ctaCard: {
    marginTop: 32,
    backgroundColor: 'rgba(124,92,232,0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.25)',
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: { color: TEXT_MAIN, fontSize: 20, fontWeight: '800', textAlign: 'center' },
  ctaSub: { color: TEXT_MUTED, fontSize: 14, lineHeight: 21, marginTop: 8, textAlign: 'center' },
  ctaBtn: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: ACCENT,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 12,
  },
  ctaBtnTxt: { color: '#ffffff', fontSize: 15, fontWeight: '800' },
  ctaHint: { color: TEXT_MUTED, fontSize: 12, marginTop: 10 },
  relatedSection: { marginTop: 40 },
  relatedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 12 },
  relatedCard: {
    flexBasis: 200,
    flexGrow: 1,
    flexShrink: 1,
    minWidth: 180,
    maxWidth: 240,
    backgroundColor: BG_CARD,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(124,92,232,0.15)',
    padding: 14,
  },
  relatedEmojiWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  relatedEmoji: { fontSize: 18 },
  relatedTitle: { color: TEXT_MAIN, fontSize: 13, fontWeight: '700', lineHeight: 18 },
  relatedMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  relatedMetaTxt: { color: TEXT_MUTED, fontSize: 11 },
  footer: { paddingTop: 40, alignItems: 'center', gap: 6 },
  footerNav: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  footerLink: { color: '#cbd1de', fontSize: 13, fontWeight: '600' },
  footerSep: { color: 'rgba(203,209,222,0.4)', fontSize: 12 },
  footerCopy: { color: TEXT_MUTED, fontSize: 12, textAlign: 'center', marginTop: 8 },
});
