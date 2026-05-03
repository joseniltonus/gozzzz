import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Moon,
  ArrowLeft,
  Heart,
  BookOpen,
  Target,
  Users,
  Shield,
} from 'lucide-react-native';

import { WEB_OG_IMAGE_URL, WEB_OG_SITE_NAME, WEB_ORIGIN } from '@/lib/webOgConstants';

const isWeb = Platform.OS === 'web';

export default function WebSobrePage() {
  const router = useRouter();
  const { t } = useLanguage();

  const researcherNames = ['Matthew Walker', 'Andrew Huberman', 'Michael Breus', 'Charles Czeisler'];

  return (
    <>
      <Head>
        <title>{t('web.about.headTitle')}</title>
        <meta name="description" content={t('web.about.headDesc')} />
        <meta property="og:title" content={t('web.about.headTitle')} />
        <meta property="og:description" content={t('web.about.ogDesc')} />
        <meta property="og:image" content={WEB_OG_IMAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${WEB_ORIGIN}/web/sobre`} />
        <meta property="og:site_name" content={WEB_OG_SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={WEB_OG_IMAGE_URL} />
        <link rel="canonical" href="https://gozzzz.app/web/sobre" />
      </Head>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* NAV */}
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
              <Moon size={22} color="#fbbf24" strokeWidth={2} />
            </div>
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={18} color="#ffffff" />
            <Text style={styles.backBtnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* HERO */}
      <LinearGradient colors={['#0f172a', '#1e293b', '#334155']} style={styles.hero}>
        <Moon size={60} color="#fbbf24" />
        <Text style={styles.heroTitle}>{t('web.about.heroTitle')}</Text>
        <Text style={styles.heroSubtitle}>{t('web.about.heroSubtitle')}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.container}>

          {/* STORY */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heart size={24} color="#ec4899" />
              <Text style={styles.sectionTitle}>{t('web.about.storyTitle')}</Text>
            </View>
            <View style={styles.storyCard}>
              <Text style={styles.storyText}>{t('web.about.storyText1')}</Text>
              <Text style={styles.storyText}>{t('web.about.storyText2')}</Text>
              <Text style={styles.storyText}>{t('web.about.storyText3')}</Text>
              <View style={styles.storyHighlight}>
                <Text style={styles.storyHighlightText}>{t('web.about.storyHighlight')}</Text>
              </View>
              <Text style={styles.storyText}>{t('web.about.storyText4')}</Text>
            </View>
          </View>

          {/* SCIENCE SOURCES */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <BookOpen size={24} color="#d4a96a" />
              <Text style={styles.sectionTitle}>{t('about.references.title')}</Text>
            </View>
            <View style={styles.credibilityLineBox}>
              <Text style={styles.credibilityLineText}>Baseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores publicações científicas do mundo.</Text>
            </View>
            <View style={styles.researcherNames}>
              {researcherNames.map((name, i) => (
                <View key={i} style={styles.researcherTag}>
                  <Text style={styles.researcherTagText}>{name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.bibSection}>
              <Text style={styles.bibIntro}>{t('about.references.intro')}</Text>
              {['item1','item2','item3','item4','item5'].map((k, i) => (
                <View key={i} style={styles.bibItem}>
                  <Text style={styles.bibBullet}>—</Text>
                  <Text style={styles.bibText}>{t(`about.references.${k}`)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* MISSION */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Target size={24} color="#10b981" />
              <Text style={styles.sectionTitle}>{t('web.about.missionTitle')}</Text>
            </View>
            <View style={styles.missionCard}>
              <Text style={styles.missionText}>{t('web.about.missionText1')}</Text>
              <Text style={styles.missionText}>{t('web.about.missionText2')}</Text>
            </View>
          </View>

          {/* PROGRAM */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Users size={24} color="#d4a96a" />
              <Text style={styles.sectionTitle}>{t('web.about.programTitle')}</Text>
            </View>
            <View style={styles.programCard}>
              <Text style={styles.programText}>{t('web.about.programText')}</Text>
              <View style={styles.featuresList}>
                {[
                  t('web.about.programFeature1'),
                  t('web.about.programFeature2'),
                  t('web.about.programFeature3'),
                  t('web.about.programFeature4'),
                ].map((f, i) => (
                  <View key={i} style={styles.featureItem}>
                    <View style={styles.featureDot} />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* WHY */}
          <View style={styles.whyCard}>
            <Heart size={32} color="#ec4899" />
            <Text style={styles.whyTitle}>{t('web.about.whyTitle')}</Text>
            <Text style={styles.whyText}>{t('web.about.whyText')}</Text>
          </View>

          {/* DISCLAIMER */}
          <View style={styles.disclaimerBox}>
            <View style={styles.disclaimerHeader}>
              <Shield size={18} color="#64748b" />
              <Text style={styles.disclaimerTitle}>{t('web.about.disclaimerTitle')}</Text>
            </View>
            <Text style={styles.disclaimerText}>{t('web.about.disclaimerText1')}</Text>
            <Text style={styles.disclaimerText}>{t('web.about.disclaimerText2')}</Text>
            <Text style={styles.disclaimerText}>{t('web.about.disclaimerText3')}</Text>
            <View style={styles.affiliationDisclaimer}>
              <Text style={styles.affiliationDisclaimerText}>
                GoZzzz is not affiliated with, endorsed by, or associated with Matthew Walker, Andrew Huberman, Michael Breus, Charles Czeisler, or their respective universities, employers, or institutions. Any reference to these researchers constitutes citation of their independently published work only.
              </Text>
            </View>
          </View>

        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('web.about.footerText')}</Text>
        <Text style={styles.footerCopy}>{t('web.about.footerCopy')}</Text>
        <Text style={styles.footerCompany}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
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
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  hero: { paddingTop: 56, paddingBottom: 56, paddingHorizontal: 24, alignItems: 'center' },
  heroTitle: { fontSize: isWeb ? 48 : 32, fontWeight: '800', color: '#ffffff', marginTop: 20, marginBottom: 12, textAlign: 'center' },
  heroSubtitle: { fontSize: 18, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' },

  content: { paddingVertical: 64 },
  container: { maxWidth: 900, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },

  section: { marginBottom: 56 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 },
  sectionTitle: { fontSize: isWeb ? 30 : 24, fontWeight: '800', color: '#e8d5b7' },

  storyCard: {
    backgroundColor: '#12121e',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
  },
  storyText: { fontSize: 16, color: '#8892a4', lineHeight: 26, marginBottom: 18 },
  storyHighlight: {
    backgroundColor: 'rgba(16,185,129,0.1)',
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  storyHighlightText: { fontSize: 16, color: '#10b981', lineHeight: 24, fontWeight: '600', fontStyle: 'italic' },

  expertsGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 16,
  },
  expertCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    width: isWeb ? 410 : '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#d4a96a',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  expertTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  expertAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(212,169,106,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertInfo: { flex: 1 },
  expertName: { fontSize: 16, fontWeight: '700', color: '#e8d5b7', marginBottom: 2 },
  expertRole: { fontSize: 13, color: '#8892a4' },
  expertDetail: { fontSize: 14, color: '#8892a4', lineHeight: 22 },

  missionCard: {
    backgroundColor: '#12121e',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  missionText: { fontSize: 16, color: '#8892a4', lineHeight: 26, marginBottom: 16 },

  programCard: {
    backgroundColor: '#12121e',
    borderRadius: 20,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  programText: { fontSize: 16, color: '#8892a4', lineHeight: 26, marginBottom: 24 },
  featuresList: { gap: 12 },
  featureItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4a96a',
    marginTop: 7,
  },
  featureText: { flex: 1, fontSize: 15, color: '#8892a4', lineHeight: 22 },

  whyCard: {
    backgroundColor: 'rgba(212,169,106,0.1)',
    borderRadius: 20,
    padding: 36,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#d4a96a',
    marginBottom: 32,
  },
  whyTitle: { fontSize: 24, fontWeight: '800', color: '#e8d5b7', marginTop: 16, marginBottom: 14, textAlign: 'center' },
  whyText: { fontSize: 16, color: '#e8c99a', lineHeight: 26, textAlign: 'center', fontWeight: '500' },

  credibilityLineBox: {
    backgroundColor: 'rgba(212,169,106,0.06)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#d4a96a',
  },
  credibilityLineText: {
    fontSize: 15,
    color: '#e8c99a',
    lineHeight: 24,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  researcherNames: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  researcherTag: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  researcherTagText: {
    fontSize: 14,
    color: '#e8d5b7',
    fontWeight: '600',
  },
  bibSection: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
  },
  bibIntro: {
    fontSize: 14,
    color: '#8892a4',
    lineHeight: 22,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  bibItem: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
    alignItems: 'flex-start',
  },
  bibBullet: {
    fontSize: 14,
    color: '#d4a96a',
    fontWeight: '700',
    marginTop: 1,
  },
  bibText: {
    flex: 1,
    fontSize: 13,
    color: '#8892a4',
    lineHeight: 20,
  },
  affiliationDisclaimer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  affiliationDisclaimerText: {
    fontSize: 12,
    color: '#4a5568',
    lineHeight: 18,
  },
  disclaimerBox: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 16,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 16,
  },
  disclaimerHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8892a4',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  disclaimerText: { fontSize: 13, color: '#5a5a72', lineHeight: 20, marginBottom: 10 },

  footer: {
    backgroundColor: '#07070f',
    paddingVertical: 28,
    alignItems: 'center',
    gap: 6,
  },
  footerText: { fontSize: 13, color: '#8892a4' },
  footerCopy: { fontSize: 13, color: '#5a5a72' },
  footerCompany: { fontSize: 12, color: '#8892a4', fontWeight: '600' },
  footerCnpj: { fontSize: 12, color: '#64748b' },
});
