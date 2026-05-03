import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useState, useEffect } from 'react';
import {
  Moon,
  Star,
  Check,
  Lock,
  Shield,
  BadgeCheck,
  Calendar,
  ArrowRight,
  Heart,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { WEB_OG_IMAGE_URL, WEB_OG_SITE_NAME, WEB_ORIGIN } from '@/lib/webOgConstants';

const isWeb = Platform.OS === 'web';

const GOLD = '#d4a96a';
const GOLD_LIGHT = '#e8c99a';
const BG = '#0a0a12';
const BG2 = '#0f0f1a';
const BG3 = '#141425';
const TEXT_PRIMARY = '#f0ece3';
const TEXT_MUTED = '#8a8aaa';

export default function WebCoachPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredPriceBtn, setHoveredPriceBtn] = useState<number | null>(null);
  const [hoveredCtaBtn, setHoveredCtaBtn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isWeb) return;
    const timer = setTimeout(() => setVisible(true), 50);
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScheduleCall = () => {
    router.push('/web/assinar');
  };

  const fadeStyle = (delay: number) =>
    isWeb
      ? ({
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0px)' : 'translateY(28px)',
          transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        } as any)
      : {};

  const cards = [
    { emoji: '🌙', title: t('web.coach.card1.title'), desc: t('web.coach.card1.desc') },
    { emoji: '🧬', title: t('web.coach.card2.title'), desc: t('web.coach.card2.desc') },
    { emoji: '💬', title: t('web.coach.card3.title'), desc: t('web.coach.card3.desc') },
  ];

  const steps = [
    { num: '01', title: t('web.coach.step1.title'), desc: t('web.coach.step1.desc'), detail: t('web.coach.step1.detail') },
    { num: '02', title: t('web.coach.step2.title'), desc: t('web.coach.step2.desc'), detail: t('web.coach.step2.detail') },
    { num: '03', title: t('web.coach.step3.title'), desc: t('web.coach.step3.desc'), detail: t('web.coach.step3.detail') },
  ];

  const testimonials = [
    {
      quote: t('web.coach.testimonial1'),
      author: t('web.coach.testimonial1Author'),
      result: 'Sleeping 8+ hours',
    },
    {
      quote: t('web.coach.testimonial2'),
      author: t('web.coach.testimonial2Author'),
      result: 'More focused at work',
    },
  ];

  return (
    <>
      <Head>
        <title>{t('web.coach.headTitle')}</title>
        <meta name="description" content={t('web.coach.headDesc')} />
        <meta property="og:title" content={t('web.coach.headTitle')} />
        <meta property="og:description" content={t('web.coach.headDesc')} />
        <meta property="og:image" content={WEB_OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${WEB_ORIGIN}/web/coach`} />
        <meta property="og:site_name" content={WEB_OG_SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={WEB_OG_IMAGE_URL} />
        <link rel="canonical" href="https://gozzzz.app/web/coach" />
      </Head>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>

        {/* NAVBAR */}
      <View
        style={[
          styles.navbar,
          isWeb && scrolled && styles.navbarScrolled,
        ]}
      >
        <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
            <Moon size={20} color={GOLD} strokeWidth={2} />
          </div>
          <Text style={styles.navBrandText}>GoZzzz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => Linking.openURL('https://wa.me/5511982820759')}
        >
          <Text style={styles.navBtnText}>{t('web.coach.navBtn')}</Text>
        </TouchableOpacity>
      </View>

      {/* HERO */}
      <View style={styles.hero}>
        <View style={[styles.heroStars, fadeStyle(0)]}>
          {[...Array(6)].map((_, i) => (
            <Star key={i} size={10} color={GOLD} fill={GOLD} style={{ opacity: 0.3 + (i % 3) * 0.2 }} />
          ))}
        </View>
        <Text style={[styles.heroTitle, fadeStyle(100)]}>{t('web.coach.heroTitle')}</Text>
        <Text style={[styles.heroSubtitleNew, fadeStyle(200)]}>{t('web.coach.heroSubtitleNew')}</Text>
        <View style={[styles.heroBtns, fadeStyle(300)]}>
          <TouchableOpacity
            style={styles.heroBtnPrimary}
            onPress={() => Linking.openURL('https://wa.me/5511982820759')}
          >
            <Text style={styles.heroBtnPrimaryText}>{t('web.coach.heroBtn1')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.heroBtnGhost} onPress={handleScheduleCall}>
            <Text style={styles.heroBtnGhostText}>{t('web.coach.heroBtn2')}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* STORY SECTION */}
      <View style={styles.section}>
        <View style={styles.container}>
          <View style={styles.storyRow}>
            <View style={styles.storyLeft}>
              <Text style={styles.sectionLabel}>{t('web.coach.storyLabel')}</Text>
              <Text style={styles.sectionTitle}>{t('web.coach.storyTitle')}</Text>
              <Text style={styles.storyText}>{t('web.coach.storyText')}</Text>
              <View style={styles.expertTags}>
                <View style={styles.expertTag}>
                  <Text style={styles.expertTagText}>Science-Based</Text>
                </View>
                <View style={styles.expertTag}>
                  <Text style={styles.expertTagText}>Personalized</Text>
                </View>
                <View style={styles.expertTag}>
                  <Text style={styles.expertTagText}>Proven Results</Text>
                </View>
              </View>
              <Text style={styles.storyEnd}>{t('web.coach.storyEnd')}</Text>
            </View>
            <View style={styles.storyRight}>
              <View style={styles.quoteCard}>
                <Text style={styles.quoteIcon}>&quot;</Text>
                <Text style={styles.quoteText}>{t('web.coach.storyQuote')}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* HOW IT WORKS */}
      <View style={[styles.section, { backgroundColor: BG2 }]}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.coach.processLabel')}</Text>
          <Text style={styles.sectionTitle}>{t('web.coach.processTitle')}</Text>
          <View style={styles.stepsList}>
            {steps.map((s, i) => (
              <View
                key={i}
                style={[
                  styles.stepRow,
                  hoveredStep === i && styles.stepRowHovered,
                ]}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredStep(i),
                  onMouseLeave: () => setHoveredStep(null),
                } : {})}
              >
                {isWeb && (
                  <View
                    style={[
                      styles.stepAccentLine,
                      hoveredStep === i && styles.stepAccentLineVisible,
                    ]}
                  />
                )}
                <Text style={[
                  styles.stepNum,
                  hoveredStep === i && styles.stepNumHovered,
                ]}>{s.num}</Text>
                <View style={styles.stepContent}>
                  <Text style={styles.stepTitle}>{s.title}</Text>
                  <Text style={styles.stepDesc}>{s.desc}</Text>
                  <View style={styles.stepDetailBadge}>
                    <Text style={styles.stepDetailText}>{s.detail}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* WHAT'S INCLUDED */}
      <View style={styles.section}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.coach.includedLabel')}</Text>
          <Text style={styles.sectionTitle}>{t('web.coach.includedTitle')}</Text>
          <View style={styles.cardsGrid}>
            {cards.map((c, i) => (
              <View
                key={i}
                style={[
                  styles.featureCard,
                  hoveredCard === i && styles.featureCardHovered,
                ]}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredCard(i),
                  onMouseLeave: () => setHoveredCard(null),
                } : {})}
              >
                <Text style={styles.featureEmoji}>{c.emoji}</Text>
                <Text style={styles.featureTitle}>{c.title}</Text>
                <Text style={styles.featureDesc}>{c.desc}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* PRICING */}
      <View style={[styles.section, { backgroundColor: BG2 }]}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.coach.pricingLabel')}</Text>
          <Text style={styles.sectionTitle}>{t('web.coach.pricingTitle')}</Text>
          <View style={styles.pricingRow}>

            {/* Card 1 — Individual */}
            <View style={styles.priceCardFeaturedNew}>
              <View style={styles.priceCardHeader}>
                <View style={styles.price1OnlineBadge}>
                  <Text style={styles.price1OnlineText}>100% ONLINE</Text>
                </View>
                <Text style={styles.priceCardLabelFeatured}>{t('web.coach.price1.label')}</Text>
              </View>
              <View style={styles.price1Taglines}>
                <Text style={styles.price1TaglineText}>{t('web.coach.price1.tagline1')}</Text>
                <Text style={styles.price1TaglineText}>{t('web.coach.price1.tagline2')}</Text>
                <Text style={styles.price1TaglineText}>{t('web.coach.price1.tagline3')}</Text>
              </View>
              <View style={styles.price1AmountRow}>
                <Text style={styles.price1Amount}>{t('web.coach.price1')}</Text>
                <Text style={styles.price1AmountSub}>{t('web.coach.price1Sub')}</Text>
              </View>
              <Text style={styles.price1Desc}>{t('web.coach.price1.desc')}</Text>
              <View style={styles.price1Divider} />
              <View style={styles.price1Features}>
                {[
                  { icon: '🔍', title: t('web.coach.price1.f1'), sub: t('web.coach.price1.f1sub') },
                  { icon: '🎥', title: t('web.coach.price1.f2'), sub: t('web.coach.price1.f2sub') },
                  { icon: '📄', title: t('web.coach.price1.f3'), sub: t('web.coach.price1.f3sub') },
                  { icon: '💬', title: t('web.coach.price1.f4'), sub: t('web.coach.price1.f4sub') },
                  { icon: '⭐', title: t('web.coach.price1.f5'), sub: t('web.coach.price1.f5sub') },
                ].map((item, fi) => (
                  <View key={fi} style={styles.price1FeatureRow}>
                    <Text style={styles.price1FeatureIcon}>{item.icon}</Text>
                    <View style={styles.price1FeatureContent}>
                      <Text style={styles.price1FeatureTitle}>{item.title}</Text>
                      <Text style={styles.price1FeatureSub}>{item.sub}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  styles.priceBtnGold,
                  hoveredPriceBtn === 0 && styles.priceBtnGoldHovered,
                ]}
                onPress={() => Linking.openURL('https://wa.me/5511982820759')}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredPriceBtn(0),
                  onMouseLeave: () => setHoveredPriceBtn(null),
                } : {})}
              >
                <Text style={styles.priceBtnGoldText}>{t('web.coach.price1.btn')}</Text>
              </TouchableOpacity>
            </View>

            {/* Card 2 — Community */}
            <View style={styles.priceCard}>
              <Text style={styles.priceCardLabel}>{t('web.coach.price3.label')}</Text>
              <Text style={styles.priceCardAmount}>
                $99
                <Text style={styles.priceCardPer}>/month</Text>
              </Text>
              <Text style={styles.priceCardDesc}>{t('web.coach.price3.desc')}</Text>
              <View style={styles.priceFeatures}>
                {[
                  t('web.coach.price3.f1'),
                  t('web.coach.price3.f2'),
                  t('web.coach.price3.f3'),
                  t('web.coach.price3.f4'),
                ].map((f, fi) => (
                  <View key={fi} style={styles.priceFeatureRow}>
                    <Check size={14} color={GOLD} />
                    <Text style={styles.priceFeatureText}>{f}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={[
                  styles.priceBtnGhost,
                  hoveredPriceBtn === 1 && styles.priceBtnGhostHovered,
                ]}
                onPress={() => Linking.openURL('https://wa.me/5511982820759')}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredPriceBtn(1),
                  onMouseLeave: () => setHoveredPriceBtn(null),
                } : {})}
              >
                <Text style={[
                  styles.priceBtnGhostText,
                  hoveredPriceBtn === 1 && styles.priceBtnGhostTextHovered,
                ]}>{t('web.coach.priceBtn')}</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </View>

      {/* TESTIMONIALS */}
      <View style={styles.section}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.coach.trustLabel')}</Text>
          <Text style={styles.sectionTitle}>{t('web.coach.trustTitle')}</Text>
          <View style={styles.testimonialsGrid}>
            {testimonials.map((item, i) => (
              <View key={i} style={styles.testimonialCard}>
                <View style={styles.testimonialQuoteRow}>
                  <Text style={styles.testimonialBigQuote}>&quot;</Text>
                </View>
                <Text style={styles.testimonialText}>{item.quote.replace(/^"|"$/g, '')}</Text>
                <View style={styles.testimonialDivider} />
                <View style={styles.testimonialFooter}>
                  <Text style={styles.testimonialAuthor}>{item.author}</Text>
                  <View style={styles.testimonialResultBadge}>
                    <Text style={styles.testimonialResultText}>{item.result}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* FINAL CTA */}
      <View style={styles.ctaSection}>
        {isWeb && <View style={styles.ctaRadialBg} />}
        <View style={[styles.container, { alignItems: 'center' }]}>
          <Text style={styles.ctaTitle}>{t('web.coach.ctaFinalTitle')}</Text>
          <Text style={styles.ctaSubtitle}>{t('web.coach.ctaFinalSubtitle')}</Text>
          <TouchableOpacity
            style={[
              styles.ctaGoldBtn,
              hoveredCtaBtn && styles.ctaGoldBtnHovered,
            ]}
            onPress={() => Linking.openURL('https://wa.me/5511982820759')}
            {...(isWeb ? {
              onMouseEnter: () => setHoveredCtaBtn(true),
              onMouseLeave: () => setHoveredCtaBtn(false),
            } : {})}
          >
            <Calendar size={18} color={BG} />
            <Text style={styles.ctaGoldBtnText}>{t('web.coach.ctaFinalBtn')}</Text>
            <ArrowRight size={18} color={BG} />
          </TouchableOpacity>
          <View style={styles.securityRow}>
            <Lock size={13} color={GOLD} />
            <Text style={styles.securityText}>Secure</Text>
            <Text style={styles.securityDot}>·</Text>
            <Shield size={13} color={GOLD} />
            <Text style={styles.securityText}>Private</Text>
            <Text style={styles.securityDot}>·</Text>
            <BadgeCheck size={13} color={GOLD} />
            <Text style={styles.securityText}>{t('web.coach.securePayment')}</Text>
            <Text style={styles.securityDot}>·</Text>
            <Heart size={13} color={GOLD} />
            <Text style={styles.securityText}>{t('web.coach.satisfaction')}</Text>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerBrand}>GoZzzz</Text>
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => router.push('/privacy')}>
            <Text style={styles.footerLink}>{t('web.coach.footerPrivacy')}</Text>
          </TouchableOpacity>
          <Text style={styles.footerDot}>·</Text>
          <TouchableOpacity onPress={() => router.push('/terms')}>
            <Text style={styles.footerLink}>{t('web.coach.footerTerms')}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCopy}>{t('web.coach.footerCopy')}</Text>
        <Text style={styles.footerCompany}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
        <Text style={styles.footerCnpj}>CNPJ: 66.059.212/0001-52</Text>
      </View>

      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerText}>{t('coach.disclaimer')}</Text>
      </View>

      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },

  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: isWeb ? 48 : 24,
    paddingVertical: 18,
    backgroundColor: 'rgba(10,10,18,0.6)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,169,106,0.1)',
    position: isWeb ? 'sticky' : 'relative',
    top: 0,
    zIndex: 100,
    transition: isWeb ? 'background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease' : undefined,
    backdropFilter: isWeb ? 'blur(12px)' : undefined,
  } as any,
  navbarScrolled: {
    backgroundColor: 'rgba(10,10,18,0.96)',
    borderBottomColor: 'rgba(212,169,106,0.2)',
    boxShadow: isWeb ? '0 4px 30px rgba(0,0,0,0.4)' : undefined,
  } as any,
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 22, fontWeight: '800', color: GOLD, letterSpacing: 1 },
  navBtn: {
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingHorizontal: 20,
    paddingVertical: 9,
    borderRadius: 8,
    transition: isWeb ? 'background-color 0.3s ease' : undefined,
  } as any,
  navBtnText: { fontSize: 14, fontWeight: '600', color: GOLD },

  hero: {
    paddingTop: isWeb ? 110 : 70,
    paddingBottom: isWeb ? 110 : 70,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: BG,
    overflow: 'hidden',
  },
  heroStars: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: isWeb ? 58 : 36,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: isWeb ? 68 : 44,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  heroSubtitleNew: {
    fontSize: isWeb ? 18 : 15,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 600,
    marginBottom: 40,
  },
  heroBtns: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 14,
    alignItems: 'center',
  },
  heroBtnPrimary: {
    backgroundColor: GOLD,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  heroBtnPrimaryText: { fontSize: 16, fontWeight: '700', color: BG },
  heroBtnGhost: {
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    transition: isWeb ? 'background-color 0.3s ease' : undefined,
  } as any,
  heroBtnGhostText: { fontSize: 16, fontWeight: '600', color: GOLD },

  section: { paddingVertical: isWeb ? 80 : 56, paddingHorizontal: 0 },
  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: isWeb ? 48 : 24 },

  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: isWeb ? 38 : 26,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    marginBottom: 40,
    lineHeight: isWeb ? 46 : 34,
  },

  storyRow: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 48,
    alignItems: isWeb ? 'flex-start' : 'stretch',
  },
  storyLeft: { flex: isWeb ? 1 : undefined },
  storyText: { fontSize: 16, color: TEXT_MUTED, lineHeight: 28, marginBottom: 24 },
  expertTags: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  expertTag: {
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.4)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(212,169,106,0.08)',
  },
  expertTagText: { fontSize: 13, color: GOLD_LIGHT, fontWeight: '600' },
  storyEnd: { fontSize: 16, color: TEXT_MUTED, lineHeight: 28, fontStyle: 'italic' },
  storyRight: { width: isWeb ? 340 : '100%' },
  quoteCard: {
    backgroundColor: BG3,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  quoteIcon: { fontSize: 60, color: GOLD, lineHeight: 60, marginBottom: 8, fontWeight: '800' },
  quoteText: { fontSize: 18, color: TEXT_PRIMARY, lineHeight: 30, fontStyle: 'italic' },

  stepsList: { gap: 0 },
  stepRow: {
    flexDirection: 'row',
    gap: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
    transition: isWeb ? 'background 0.3s ease' : undefined,
  } as any,
  stepRowHovered: {
    backgroundColor: 'rgba(212,169,106,0.04)',
  },
  stepAccentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: GOLD,
    borderRadius: 3,
    opacity: 0,
    transition: isWeb ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
    transform: [{ scaleY: 0 }],
  } as any,
  stepAccentLineVisible: {
    opacity: 1,
    transform: [{ scaleY: 1 }],
  },
  stepNum: {
    fontSize: 56,
    fontWeight: '800',
    color: 'rgba(212,169,106,0.18)',
    lineHeight: 60,
    width: 72,
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  stepNumHovered: {
    color: 'rgba(212,169,106,0.5)',
  },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 20, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 8 },
  stepDesc: { fontSize: 15, color: TEXT_MUTED, lineHeight: 26, marginBottom: 12 },
  stepDetailBadge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(212,169,106,0.07)',
  },
  stepDetailText: { fontSize: 12, color: GOLD, fontWeight: '600' },

  cardsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 20,
  },
  featureCard: {
    flex: 1,
    backgroundColor: BG3,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    transition: isWeb ? 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  featureCardHovered: {
    borderColor: 'rgba(212,169,106,0.6)',
    boxShadow: isWeb ? '0 0 24px rgba(212,169,106,0.15), 0 0 48px rgba(212,169,106,0.08)' : undefined,
    transform: [{ translateY: -4 }],
  } as any,
  featureEmoji: { fontSize: 32, marginBottom: 14 },
  featureTitle: { fontSize: 18, fontWeight: '700', color: TEXT_PRIMARY, marginBottom: 10 },
  featureDesc: { fontSize: 14, color: TEXT_MUTED, lineHeight: 24 },

  pricingRow: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 20,
    alignItems: isWeb ? 'flex-start' : 'stretch',
  },
  priceCard: {
    flex: 1,
    backgroundColor: BG3,
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  priceCardFeaturedNew: {
    flex: 1,
    backgroundColor: '#0c0c1e',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1.5,
    borderColor: GOLD,
    boxShadow: isWeb ? '0 0 40px rgba(212,169,106,0.12), 0 0 80px rgba(212,169,106,0.06)' : undefined,
  } as any,
  priceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceCardLabelFeatured: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT_MUTED,
    textTransform: 'uppercase' as any,
    letterSpacing: 1.5,
  },
  price1OnlineBadge: {
    backgroundColor: 'rgba(212,169,106,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  price1OnlineText: {
    fontSize: 10,
    fontWeight: '800',
    color: GOLD,
    letterSpacing: 1.5,
  },
  price1Taglines: {
    marginBottom: 24,
    gap: 2,
  },
  price1TaglineText: {
    fontSize: isWeb ? 28 : 22,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    lineHeight: isWeb ? 36 : 30,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  price1AmountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginBottom: 10,
  },
  price1Amount: {
    fontSize: 48,
    fontWeight: '800',
    color: GOLD,
    lineHeight: 52,
  },
  price1AmountSub: {
    fontSize: 15,
    color: TEXT_MUTED,
    fontWeight: '500',
    paddingBottom: 6,
  },
  price1Desc: {
    fontSize: 14,
    color: TEXT_MUTED,
    lineHeight: 22,
    marginBottom: 24,
  },
  price1Divider: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.2)',
    marginBottom: 24,
  },
  price1Features: {
    gap: 20,
    marginBottom: 32,
  },
  price1FeatureRow: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  price1FeatureIcon: {
    fontSize: 22,
    lineHeight: 26,
    width: 28,
    textAlign: 'center' as any,
  },
  price1FeatureContent: {
    flex: 1,
    gap: 4,
  },
  price1FeatureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    lineHeight: 22,
  },
  price1FeatureSub: {
    fontSize: 13,
    color: TEXT_MUTED,
    lineHeight: 20,
  },
  priceCardFeatured: {
    flex: 1,
    backgroundColor: '#0e0e20',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1.5,
    borderColor: GOLD,
  },
  popularBadge: {
    backgroundColor: GOLD,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  popularBadgeText: { fontSize: 11, fontWeight: '800', color: BG, textTransform: 'uppercase', letterSpacing: 1 },
  priceCardLabel: { fontSize: 18, fontWeight: '700', color: TEXT_MUTED, marginBottom: 8 },
  priceCardAmount: { fontSize: 42, fontWeight: '800', color: TEXT_PRIMARY, marginBottom: 6 },
  priceCardPer: { fontSize: 16, fontWeight: '500', color: TEXT_MUTED },
  priceCardDesc: { fontSize: 14, color: TEXT_MUTED, lineHeight: 22, marginBottom: 20 },
  priceFeatures: { gap: 10, marginBottom: 28 },
  priceFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  priceFeatureText: { fontSize: 14, color: TEXT_MUTED },

  priceBtnGhost: {
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    transition: isWeb ? 'background-color 0.3s ease' : undefined,
  } as any,
  priceBtnGhostHovered: {
    backgroundColor: GOLD,
  },
  priceBtnGhostText: {
    fontSize: 15,
    fontWeight: '700',
    color: GOLD,
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  priceBtnGhostTextHovered: {
    color: BG,
  },
  priceBtnGold: {
    backgroundColor: GOLD,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    transition: isWeb ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  priceBtnGoldHovered: {
    opacity: 0.88,
    transform: [{ scale: 1.02 }],
  },
  priceBtnGoldText: { fontSize: 15, fontWeight: '700', color: BG },

  testimonialsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 24,
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: BG3,
    borderRadius: 16,
    padding: 32,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
  },
  testimonialQuoteRow: {
    marginBottom: 4,
  },
  testimonialBigQuote: {
    fontSize: 72,
    color: GOLD,
    lineHeight: 56,
    fontWeight: '800',
    opacity: 0.5,
  },
  testimonialText: {
    fontSize: isWeb ? 18 : 16,
    color: TEXT_PRIMARY,
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: 24,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  testimonialDivider: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.15)',
    marginBottom: 16,
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  testimonialAuthor: { fontSize: 14, color: GOLD, fontWeight: '700' },
  testimonialResultBadge: {
    backgroundColor: 'rgba(212,169,106,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  testimonialResultText: { fontSize: 12, color: GOLD_LIGHT, fontWeight: '600' },

  ctaSection: {
    paddingVertical: isWeb ? 100 : 72,
    paddingHorizontal: 24,
    alignItems: 'center',
    backgroundColor: '#07070f',
    overflow: 'hidden',
    position: 'relative',
  },
  ctaRadialBg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 700,
    height: 700,
    borderRadius: 350,
    transform: [{ translateX: -350 }, { translateY: -350 }],
    backgroundImage: isWeb ? 'radial-gradient(ellipse at center, rgba(75,0,130,0.22) 0%, rgba(55,0,100,0.12) 40%, transparent 70%)' : undefined,
    pointerEvents: 'none',
  } as any,
  ctaTitle: {
    fontSize: isWeb ? 48 : 30,
    fontWeight: '800',
    color: TEXT_PRIMARY,
    textAlign: 'center',
    lineHeight: isWeb ? 58 : 40,
    marginBottom: 18,
    maxWidth: 680,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  ctaSubtitle: {
    fontSize: 17,
    color: TEXT_MUTED,
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 520,
    marginBottom: 44,
  },
  ctaGoldBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingHorizontal: 44,
    paddingVertical: 19,
    borderRadius: 10,
    marginBottom: 32,
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease' : undefined,
  } as any,
  ctaGoldBtnHovered: {
    transform: [{ scale: 1.04 }],
    boxShadow: isWeb ? '0 8px 32px rgba(212,169,106,0.35)' : undefined,
  } as any,
  ctaGoldBtnText: { fontSize: 17, fontWeight: '700', color: BG },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  securityText: { fontSize: 13, color: TEXT_MUTED },
  securityDot: { fontSize: 13, color: TEXT_MUTED },

  footer: {
    backgroundColor: BG,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,169,106,0.1)',
    paddingVertical: 36,
    alignItems: 'center',
    gap: 12,
  },
  footerBrand: { fontSize: 20, fontWeight: '800', color: GOLD, letterSpacing: 1.5 },
  footerLinks: { flexDirection: 'row', gap: 14, alignItems: 'center' },
  footerLink: {
    fontSize: 13,
    color: TEXT_MUTED,
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  footerDot: { fontSize: 13, color: 'rgba(138,138,170,0.4)' },
  footerCopy: { fontSize: 12, color: 'rgba(138,138,170,0.45)', letterSpacing: 0.3 },
  footerCompany: { fontSize: 12, color: '#8892a4', fontWeight: '600' },
  footerCnpj: { fontSize: 12, color: '#64748b' },
  disclaimerSection: {
    paddingHorizontal: isWeb ? 48 : 24,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderTopColor: 'rgba(212,169,106,0.1)',
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
    color: TEXT_MUTED,
  },
});
