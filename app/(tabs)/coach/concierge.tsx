import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Sparkles, MessageCircle, Calendar, ArrowRight, Lock, Shield, BadgeCheck, ArrowLeft } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { hasPremiumProgramAccess } from '@/lib/subscriptionAccess';
import { useState, useEffect } from 'react';

import { ErrorBoundary } from '@/components/ErrorBoundary';

function ConciergeContent() {
  const router = useRouter();
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [hasPremiumAccess, setHasPremiumAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setHasPremiumAccess(false);
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('subscription_type')
        .eq('id', user.id)
        .maybeSingle() as any;
      setHasPremiumAccess(hasPremiumProgramAccess(data?.subscription_type, user.email));
    };
    checkAccess();
  }, [user]);

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    border: isDark ? 'rgba(212,169,106,0.08)' : 'rgba(0,0,0,0.08)',
    gradientColors: (isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']) as [string, string],
    ctaBg: isDark ? '#07070f' : '#f8fafc',
    credentialsBg: isDark ? 'rgba(212,169,106,0.08)' : 'rgba(212,169,106,0.06)',
  };

  const handleBookConsultation = () => {
    Linking.openURL('https://wa.me/5511982820759');
  };

  const handleContactWhatsApp = () => {
    Linking.openURL('https://wa.me/5511982820759');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: tc.bg }]}>
      <LinearGradient
        colors={tc.gradientColors}
        style={[styles.header, { paddingTop: insets.top + 24 }]}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Heart size={48} color="#ffffff" />
          <Text style={styles.headerTitle}>{t('coach.title')}</Text>
          <Text style={styles.headerSubtitle}>
            {t('coach.subtitle')}
          </Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.introSection}>
          <Text style={[styles.introTitle, { color: tc.textPrimary }]}>{t('coach.intro.title')}</Text>
          <Text style={[styles.introText, { color: tc.textSecondary }]}>
            {t('coach.intro.text')}
          </Text>
        </View>

        <View style={styles.servicesSection}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('coach.services.title')}</Text>

          <View style={[styles.serviceCard, { backgroundColor: tc.card, borderColor: tc.border }]}>
            <View style={[styles.serviceIcon, { backgroundColor: 'rgba(212,169,106,0.12)' }]}>
              <Sparkles size={28} color="#d4a96a" />
            </View>
            <View style={styles.serviceContent}>
              <Text style={[styles.serviceTitle, { color: tc.textPrimary }]}>{t('coach.service2.title')}</Text>
              <Text style={[styles.serviceDescription, { color: tc.textSecondary }]}>
                {t('coach.service2.desc')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.processSection}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('coach.process.title')}</Text>

          <View style={[styles.stepCard, { backgroundColor: tc.card }]}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: tc.textPrimary }]}>{t('coach.step1.title')}</Text>
              <Text style={[styles.stepDescription, { color: tc.textSecondary }]}>
                {t('coach.step1.desc')}
              </Text>
            </View>
          </View>

          <View style={[styles.stepCard, { backgroundColor: tc.card }]}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: tc.textPrimary }]}>{t('coach.step2.title')}</Text>
              <Text style={[styles.stepDescription, { color: tc.textSecondary }]}>
                {t('coach.step2.desc')}
              </Text>
            </View>
          </View>

          <View style={[styles.stepCard, { backgroundColor: tc.card }]}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={[styles.stepTitle, { color: tc.textPrimary }]}>{t('coach.step3.title')}</Text>
              <Text style={[styles.stepDescription, { color: tc.textSecondary }]}>
                {t('coach.step3.desc')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.testimonialsSection}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('coach.trust.title')}</Text>
          <View style={[styles.credentialsBox, { backgroundColor: tc.credentialsBg }]}>
            <Text style={[styles.credentialsText, { color: tc.textSecondary }]}>
              {t('coach.trust.text1')}
            </Text>
            <Text style={[styles.credentialsText, { color: tc.textSecondary }]}>
              {t('coach.trust.text2')}
            </Text>
          </View>
        </View>

        <View style={[styles.ctaSection, { backgroundColor: tc.card, borderColor: tc.border }]}>
          <Text style={[styles.ctaTitle, { color: tc.textPrimary }]}>{t('coach.cta.title')}</Text>
          <Text style={[styles.ctaSubtitle, { color: tc.textSecondary }]}>
            {t('coach.cta.subtitle')}
          </Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handleBookConsultation}>
            <Calendar size={20} color="#ffffff" />
            <Text style={styles.primaryButtonText}>{t('coach.cta.book')}</Text>
            <ArrowRight size={20} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={handleContactWhatsApp}>
            <MessageCircle size={20} color="#d4a96a" />
            <Text style={styles.secondaryButtonText}>{t('coach.cta.whatsapp')}</Text>
          </TouchableOpacity>
        </View>

        {!hasPremiumAccess && (
        <View style={[styles.ctaBanner, { backgroundColor: tc.ctaBg, borderColor: tc.border }]}>
          <Text style={[styles.ctaBannerTitle, { color: tc.textPrimary }]}>{t('coach.ctaBannerTitle')}</Text>
          <TouchableOpacity style={styles.ctaFilledBtn} onPress={() => router.push('/payment')}>
            <Text style={styles.ctaFilledBtnText}>{t('coach.ctaSubscribe')}</Text>
          </TouchableOpacity>
          <View style={styles.ctaSecurityRow}>
            <Lock size={12} color="#d4a96a" />
            <Text style={styles.ctaSecurityText}>{t('payment.ssl')}</Text>
            <Text style={styles.ctaSecurityDot}>·</Text>
            <Shield size={12} color="#d4a96a" />
            <Text style={styles.ctaSecurityText}>{t('payment.pciDss')}</Text>
            <Text style={styles.ctaSecurityDot}>·</Text>
            <BadgeCheck size={12} color="#d4a96a" />
            <Text style={styles.ctaSecurityText}>{t('payment.secureCheckout')}</Text>
          </View>
        </View>
        )}

        <View style={[styles.disclaimerSection]}>
          <Text style={[styles.disclaimerText, { color: tc.textSecondary }]}>
            {t('coach.disclaimer')}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default function ConciergeScreen() {
  return (
    <ErrorBoundary>
      <ConciergeContent />
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 12,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  content: {
    padding: 24,
  },
  introSection: {
    marginBottom: 32,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 32,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
  },
  servicesSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  serviceCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  serviceContent: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  processSection: {
    marginBottom: 32,
  },
  stepCard: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a96a',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d4a96a',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#07070f',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  testimonialsSection: {
    marginBottom: 32,
  },
  credentialsBox: {
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#d4a96a',
  },
  credentialsText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  ctaSection: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    alignItems: 'center',
    borderWidth: 1,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 12,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: '100%',
    borderWidth: 2,
    borderColor: '#d4a96a',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#d4a96a',
  },
  ctaBanner: {
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
    borderWidth: 1,
    alignItems: 'center',
  },
  ctaBannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    textAlign: 'center',
  },
  ctaFilledBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d4a96a',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
  },
  ctaFilledBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  ctaSecurityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaSecurityText: {
    fontSize: 11,
    color: '#4a5568',
  },
  ctaSecurityDot: {
    fontSize: 11,
    color: '#374151',
  },
  disclaimerSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: 28,
    paddingBottom: 40,
  },
  disclaimerText: {
    fontSize: 12,
    lineHeight: 18,
  },
});
