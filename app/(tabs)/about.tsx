import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Heart,
  BookOpen,
  Users,
  Target,
  Moon,
  Crown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Compass,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { useUserProfile } from '@/hooks/useUserProfile';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getAppVersion } from '@/lib/appVersion';

function AboutContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { profile } = useUserProfile();
  const hasPremiumAccess = hasPremiumProgramAccess(profile?.subscription_type ?? null, user?.email ?? null);

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    border: isDark ? 'rgba(212,169,106,0.08)' : 'rgba(0,0,0,0.08)',
    gradientColors: (isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']) as [string, string],
    footerBg: isDark ? '#07070f' : '#f8fafc',
    disclaimerBg: isDark ? '#0d0d16' : '#f8fafc',
    disclaimerText: isDark ? '#374151' : '#64748b',
    disclaimerTitle: isDark ? '#4a5568' : '#64748b',
    bibBg: isDark ? '#12121e' : '#ffffff',
    whyBg: isDark ? '#1a1408' : 'rgba(212,169,106,0.08)',
    whyText: isDark ? '#c8a876' : '#92702e',
    credibilityBg: isDark ? 'rgba(212,169,106,0.06)' : 'rgba(212,169,106,0.06)',
    manifestoBg: isDark ? 'rgba(15,15,24,0.92)' : 'rgba(255,255,255,0.97)',
    pillarIconBg: isDark ? 'rgba(212,169,106,0.12)' : 'rgba(212,169,106,0.18)',
  };

  const statKeys = [
    { valueKey: 'about.stat1Value', labelKey: 'about.stat1Label' },
    { valueKey: 'about.stat2Value', labelKey: 'about.stat2Label' },
    { valueKey: 'about.stat3Value', labelKey: 'about.stat3Label' },
  ] as const;

  const pillarConfig = [
    { icon: ShieldCheck, titleKey: 'about.pillar1Title', bodyKey: 'about.pillar1Body' },
    { icon: Compass, titleKey: 'about.pillar2Title', bodyKey: 'about.pillar2Body' },
    { icon: Sparkles, titleKey: 'about.pillar3Title', bodyKey: 'about.pillar3Body' },
  ] as const;

  return (
    <ScrollView style={[styles.container, { backgroundColor: tc.bg }]} showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={tc.gradientColors}
        style={[styles.header, { paddingTop: insets.top + 24 }]}
      >
        <View style={styles.headerContent}>
          <Text style={[styles.heroEyebrow, { color: 'rgba(255,255,255,0.72)' }]}>{t('about.heroEyebrow')}</Text>
          <Moon size={56} color="#ffffff" />
          <Text style={styles.headerTitle}>
            <Text style={styles.headerTitleGo}>Go</Text>
            <Text style={styles.headerTitleZzzz}>Zzzz</Text>
          </Text>
          <Text style={styles.headerBrandLine}>{t('about.brandLine')}</Text>
          <Text style={styles.headerSubtitle}>{t('about.headerSubtitle')}</Text>
          <Text style={styles.heroKicker}>{t('about.heroKicker')}</Text>
          <View style={styles.statStrip}>
            {statKeys.map((sk, i) => (
              <View
                key={i}
                style={[styles.statCell, { borderColor: 'rgba(255,255,255,0.18)', backgroundColor: 'rgba(0,0,0,0.2)' }]}
              >
                <Text style={styles.statValue}>{t(sk.valueKey)}</Text>
                <Text style={styles.statLabel}>{t(sk.labelKey)}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={[styles.manifestoCard, { backgroundColor: tc.manifestoBg, borderColor: tc.border }]}>
          <Text style={[styles.manifestoQuote, { color: tc.textPrimary }]}>“{t('about.manifesto')}”</Text>
          <Text style={[styles.manifestoAuthor, { color: tc.textSecondary }]}>{t('about.manifestoAuthor')}</Text>
        </View>

        <View style={[styles.trustCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
          <View style={styles.trustHeader}>
            <ShieldCheck size={22} color="#d4a96a" />
            <Text style={[styles.trustTitle, { color: tc.textPrimary }]}>{t('about.trustTitle')}</Text>
          </View>
          <Text style={[styles.trustBody, { color: tc.textSecondary }]}>{t('about.trustBody')}</Text>
        </View>

        <View style={styles.pillarsRow}>
          {pillarConfig.map((p, i) => {
            const Icon = p.icon;
            return (
              <View key={i} style={[styles.pillarItem, { backgroundColor: tc.card, borderColor: tc.border }]}>
                <View style={[styles.pillarIconWrap, { backgroundColor: tc.pillarIconBg }]}>
                  <Icon size={22} color="#d4a96a" />
                </View>
                <Text style={[styles.pillarTitle, { color: tc.textPrimary }]}>{t(p.titleKey)}</Text>
                <Text style={[styles.pillarBody, { color: tc.textSecondary }]}>{t(p.bodyKey)}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.storySection}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#d4a96a" />
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('about.storyTitle')}</Text>
          </View>

          <View style={[styles.storyCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <Text style={[styles.storyParagraph, { color: tc.textSecondary }]}>{t('about.story1')}</Text>
            <Text style={[styles.storyParagraph, { color: tc.textSecondary }]}>{t('about.story2')}</Text>
            <Text style={[styles.storyParagraph, { color: tc.textSecondary }]}>{t('about.story3')}</Text>
          </View>
        </View>

        <View style={styles.expertsSection}>
          <View style={styles.sectionHeader}>
            <BookOpen size={24} color="#d4a96a" />
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('about.references.title')}</Text>
          </View>

          <View style={[styles.credibilityLineBox, { backgroundColor: tc.credibilityBg }]}>
            <Text style={styles.credibilityLineText}>{t('about.credibilityLine')}</Text>
          </View>

          <View style={styles.researcherNames}>
            {['about.expert1','about.expert2','about.expert3','about.expert4'].map((key, i) => (
              <View key={i} style={styles.researcherTag}>
                <Text style={[styles.researcherTagText, { color: tc.textPrimary }]}>{t(key)}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.bibSection, { backgroundColor: tc.bibBg, borderColor: tc.border }]}>
            <Text style={[styles.bibIntro, { color: tc.textSecondary }]}>{t('about.references.intro')}</Text>
            {['item1','item2','item3','item4','item5'].map((k, i) => (
              <View key={i} style={styles.bibItem}>
                <Text style={styles.bibBullet}>—</Text>
                <Text style={[styles.bibText, { color: tc.textSecondary }]}>{t(`about.references.${k}`)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.missionSection}>
          <View style={styles.sectionHeader}>
            <Target size={24} color="#10b981" />
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('about.mission.title')}</Text>
          </View>

          <View style={[styles.missionCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <Text style={[styles.missionText, { color: tc.textSecondary }]}>
              {t('about.mission.text')}
            </Text>
            <View style={styles.missionHighlight}>
              <Text style={styles.highlightText}>{t('about.missionHighlight')}</Text>
            </View>
            <Text style={[styles.missionText, { color: tc.textSecondary }]}>{t('about.missionStory')}</Text>
          </View>
        </View>

        <View style={styles.programSection}>
          <View style={styles.sectionHeader}>
            <Users size={24} color="#d4a96a" />
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('about.program.title')}</Text>
          </View>

          <View style={[styles.programCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <Text style={[styles.programText, { color: tc.textSecondary }]}>
              {t('about.program.text')}
            </Text>

            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={[styles.featureText, { color: tc.textSecondary }]}>{t('about.feature1')}</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={[styles.featureText, { color: tc.textSecondary }]}>{t('about.feature2')}</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={[styles.featureText, { color: tc.textSecondary }]}>{t('about.feature3')}</Text>
              </View>
              <View style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={[styles.featureText, { color: tc.textSecondary }]}>{t('about.feature4')}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.whySection}>
          <View style={styles.sectionHeader}>
            <Heart size={24} color="#d4a96a" />
            <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('about.why.title')}</Text>
          </View>

          <View style={[styles.whyCard, { backgroundColor: tc.whyBg }]}>
            <Text style={[styles.whyText, { color: tc.whyText }]}>
              {t('about.why.text')}
            </Text>
          </View>
        </View>

        {!hasPremiumAccess && (
        <View style={[styles.unlockSection, { backgroundColor: tc.card, borderColor: tc.border }]}>
          <View style={styles.unlockHeader}>
            <Crown size={28} color="#d4a96a" />
            <View style={styles.unlockContent}>
              <Text style={[styles.unlockTitle, { color: tc.textPrimary }]}>{t('about.unlockTitle')}</Text>
              <Text style={[styles.unlockSubtitle, { color: tc.textSecondary }]}>{t('about.unlockSubtitle')}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.unlockButton} onPress={() => router.push('/payment')}>
            <Crown size={18} color="#0f172a" />
            <Text style={styles.unlockButtonText}>{t('about.unlockCta')}</Text>
            <ArrowRight size={18} color="#0f172a" />
          </TouchableOpacity>
        </View>
        )}

        <View style={[styles.disclaimerSection, { backgroundColor: tc.disclaimerBg }]}>
          <Text style={[styles.disclaimerTitle, { color: tc.disclaimerTitle }]}>{t('about.disclaimerTitle')}</Text>
          <Text style={[styles.disclaimerText, { color: tc.disclaimerText }]}>{t('about.disclaimer1')}</Text>
          <Text style={[styles.disclaimerText, { color: tc.disclaimerText }]}>{t('about.disclaimer2')}</Text>
          <Text style={[styles.disclaimerText, { color: tc.disclaimerText }]}>{t('about.disclaimer3')}</Text>
          <Text style={[styles.disclaimerText, { color: tc.disclaimerText }]}>{t('about.disclaimer4')}</Text>
        </View>

        <View style={[styles.footer, { backgroundColor: tc.footerBg }]}>
          <Text style={styles.footerBrand}>GoZzzz</Text>
          <Text style={[styles.footerVersion, { color: tc.textPrimary }]}>
            {t('about.version')} {getAppVersion()}
          </Text>
          <Text style={styles.footerCompany}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.footerCnpj}>CNPJ: 66.059.212/0001-52</Text>
          <Text style={styles.footerText}>{t('about.contact')}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function AboutScreen() {
  return (
    <ErrorBoundary>
      <AboutContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  headerTitleGo: {
    color: '#ffffff',
  },
  headerTitleZzzz: {
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#f5e7c9',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  heroEyebrow: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
  },
  headerBrandLine: {
    fontSize: 13,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.88)',
    marginTop: 6,
    marginBottom: 6,
    letterSpacing: 0.4,
  },
  heroKicker: {
    fontSize: 14,
    lineHeight: 21,
    color: 'rgba(255,255,255,0.82)',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 6,
    fontWeight: '500',
  },
  statStrip: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 22,
    width: '100%',
    paddingHorizontal: 2,
  },
  statCell: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.78)',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 13,
  },
  manifestoCard: {
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  manifestoQuote: {
    fontSize: 17,
    lineHeight: 28,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  manifestoAuthor: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 14,
    letterSpacing: 0.3,
  },
  trustCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  trustHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  trustTitle: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
    flex: 1,
  },
  trustBody: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
  },
  pillarsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 28,
  },
  pillarItem: {
    flexGrow: 1,
    flexBasis: '47%',
    minWidth: 148,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  pillarIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  pillarTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  pillarBody: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  storySection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  storyCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
  },
  storyParagraph: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  expertsSection: {
    marginBottom: 32,
  },
  credibilityLineBox: {
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    borderLeftWidth: 3,
    borderLeftColor: '#d4a96a',
  },
  credibilityLineText: {
    fontSize: 14,
    color: '#e8c99a',
    lineHeight: 22,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  researcherNames: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  researcherTag: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  researcherTagText: {
    fontSize: 13,
    fontWeight: '600',
  },
  bibSection: {
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
  },
  bibIntro: {
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  bibItem: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  bibBullet: {
    fontSize: 13,
    color: '#d4a96a',
    fontWeight: '700',
  },
  bibText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
  missionSection: {
    marginBottom: 32,
  },
  missionCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
  },
  missionText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 16,
  },
  missionHighlight: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  highlightText: {
    fontSize: 15,
    color: '#10b981',
    lineHeight: 22,
    fontWeight: '600',
  },
  programSection: {
    marginBottom: 32,
  },
  programCard: {
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
  },
  programText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 20,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4a96a',
    marginTop: 6,
  },
  featureText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  whySection: {
    marginBottom: 32,
  },
  whyCard: {
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a96a',
  },
  whyText: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '600',
  },
  unlockSection: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  unlockHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 20,
  },
  unlockContent: {
    flex: 1,
  },
  unlockTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 4,
  },
  unlockSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  unlockButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  unlockButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  disclaimerSection: {
    marginBottom: 24,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  disclaimerTitle: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 28,
    paddingHorizontal: 20,
    gap: 8,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.14)',
  },
  footerBrand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#d4a96a',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  footerVersion: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  footerCompany: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8892a4',
    textAlign: 'center',
  },
  footerCnpj: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 13,
    color: '#475569',
  },
});
