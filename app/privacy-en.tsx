import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function PrivacyEnScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#ffffff" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Shield size={48} color="#fbbf24" />
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.headerSubtitle}>Last Updated: April 10, 2026</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>GDPR</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>LGPD</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>UK DPA</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.content}>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Quick Summary</Text>
          <Text style={styles.highlightText}>
            We collect the minimum personal data necessary to provide the GoZzzz service. Your data is encrypted, never sold, and you have full control over it.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Controller</Text>
          <Text style={styles.text}>
            GoZzzz is the data controller responsible for your personal information. We are committed to protecting your privacy and complying with all applicable data protection laws.
          </Text>
          <Text style={styles.companyName}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
          <Text style={styles.contactHighlight}>suporte@gozzzz.app</Text>
          <Text style={styles.text}>
            For support: suporte@gozzzz.app
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data We Collect</Text>
          <Text style={styles.text}>
            We collect information you provide directly and information automatically collected through GoZzzz use.
          </Text>
          <View style={styles.tableBox}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Data Type</Text>
              <Text style={styles.tableHeader}>Purpose</Text>
              <Text style={styles.tableHeader}>Legal Basis</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Email address</Text>
              <Text style={styles.tableCell}>Account creation and login</Text>
              <Text style={styles.tableCell}>Contract</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Password (encrypted)</Text>
              <Text style={styles.tableCell}>Account security</Text>
              <Text style={styles.tableCell}>Contract</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Learning progress</Text>
              <Text style={styles.tableCell}>Personalized experience</Text>
              <Text style={styles.tableCell}>Consent</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Device information</Text>
              <Text style={styles.tableCell}>App optimization</Text>
              <Text style={styles.tableCell}>Legitimate interest</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Payment data</Text>
              <Text style={styles.tableCell}>Process subscriptions</Text>
              <Text style={styles.tableCell}>Contract</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Providers</Text>
          <Text style={styles.text}>
            We use trusted third-party services to operate GoZzzz. These providers process your data only as instructed by us.
          </Text>
          <View style={styles.processorBox}>
            <Text style={styles.processorName}>Supabase</Text>
            <Text style={styles.processorDesc}>Cloud database and authentication infrastructure. All data is encrypted and stored securely.</Text>
          </View>
          <View style={styles.processorBox}>
            <Text style={styles.processorName}>Stripe</Text>
            <Text style={styles.processorDesc}>Payment processing for subscriptions. Never stores your credit card data on our servers.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>International Data Transfer</Text>
          <Text style={styles.text}>
            Your data may be processed in various countries. We implement safeguards such as encryption and Standard Contractual Clauses to protect your information during transfers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Retention</Text>
          <Text style={styles.bulletPoint}>• Account data: Retained while your account is active</Text>
          <Text style={styles.bulletPoint}>• Learning progress: Retained for personalization and analysis</Text>
          <Text style={styles.bulletPoint}>• Payment records: Retained for 7 years (legal requirement)</Text>
          <Text style={styles.bulletPoint}>• Deleted accounts: Anonymized within 30 days</Text>
          <Text style={styles.bulletPoint}>• Backup data: Retained for up to 60 days for recovery</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Privacy Rights</Text>
          <Text style={styles.text}>
            You have rights over your personal data under GDPR, LGPD and similar laws.
          </Text>
          <Text style={styles.bulletPoint}>• Right to access your data</Text>
          <Text style={styles.bulletPoint}>• Right to correct inaccurate data</Text>
          <Text style={styles.bulletPoint}>• Right to delete your data</Text>
          <Text style={styles.bulletPoint}>• Right to data portability</Text>
          <Text style={styles.bulletPoint}>• Right to restrict processing</Text>
          <Text style={styles.bulletPoint}>• Right to object to processing</Text>
          <Text style={styles.bulletPoint}>• Right to withdraw consent</Text>
          <Text style={styles.text}>
            To exercise these rights, email suporte@gozzzz.app. We respond within 30 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LGPD (Data Protection in Brazil)</Text>
          <Text style={styles.text}>
            We comply with Brazil&apos;s General Data Protection Law (LGPD). Your data processing is based on:
          </Text>
          <Text style={styles.bulletPoint}>• Contract execution (service provision)</Text>
          <Text style={styles.bulletPoint}>• Your explicit consent</Text>
          <Text style={styles.bulletPoint}>• Legitimate business interests</Text>
          <Text style={styles.bulletPoint}>• Legal or regulatory obligations</Text>
          <Text style={styles.bulletPoint}>• Protection of data subject</Text>
          <Text style={styles.bulletPoint}>• Credit protection</Text>
          <Text style={styles.bulletPoint}>• Public interest</Text>
          <Text style={styles.text}>
            Contact suporte@gozzzz.app to exercise LGPD rights. Response within 15 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercising Your Rights</Text>
          <Text style={styles.text}>
            You can manage your privacy settings directly in the app or contact us:
          </Text>
          <Text style={styles.bulletPoint}>• Download your data from Settings</Text>
          <Text style={styles.bulletPoint}>• Delete your account anytime (irreversible)</Text>
          <Text style={styles.bulletPoint}>• Adjust marketing communication preferences</Text>
          <Text style={styles.text}>
            Email suporte@gozzzz.app with your request and proof of identity. We respond within 30 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security Measures</Text>
          <Text style={styles.bulletPoint}>• End-to-end encryption for sensitive data</Text>
          <Text style={styles.bulletPoint}>• SSL/TLS encryption in transit</Text>
          <Text style={styles.bulletPoint}>• Regular security audits and penetration testing</Text>
          <Text style={styles.bulletPoint}>• Secure password hashing with bcrypt</Text>
          <Text style={styles.bulletPoint}>• Multi-factor authentication support</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Breach Notification</Text>
          <Text style={styles.text}>
            In case of a data breach, we will notify affected users within 72 hours by email. We will also report to competent authorities as required by law.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cookies and Tracking</Text>
          <Text style={styles.text}>
            We use minimal cookies only for essential functionality. No tracking pixels or third-party cookies.
          </Text>
          <Text style={styles.bulletPoint}>• Session cookies: Keep you logged in</Text>
          <Text style={styles.bulletPoint}>• Preference cookies: Remember your settings</Text>
          <Text style={styles.text}>
            You can disable cookies in your browser, but this may affect app functionality.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Children&apos;s Privacy</Text>
          <Text style={styles.text}>
            GoZzzz is intended for users over 18 years old. We do not knowingly collect data from minors. If we discover a child has created an account, we will delete it immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Automated Decision Making</Text>
          <Text style={styles.text}>
            We do not use automated decision-making that may produce legal or equally significant effects. Your data is never used for profiling or discrimination.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Policy Changes</Text>
          <Text style={styles.text}>
            We may update this policy. Material changes will be notified by email with 30 days&apos; notice. Continued use implies acceptance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            Questions about this policy or your privacy?
          </Text>
          <Text style={styles.contactHighlight}>suporte@gozzzz.app</Text>
          <Text style={styles.text}>
            You also have the right to lodge a complaint with your local data protection authority.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            We are committed to your privacy. This policy was last updated on April 10, 2026. Version 1.2
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 24,
  },
  backText: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(251, 191, 36, 0.4)',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fbbf24',
  },
  content: {
    padding: 24,
  },
  highlightBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d4ed8',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 22,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 12,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
    marginLeft: 8,
    marginBottom: 8,
  },
  contactHighlight: {
    fontSize: 15,
    color: '#3b82f6',
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 8,
  },
  companyName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  companyCnpj: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 10,
  },
  tableBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
    marginTop: 12,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  tableHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: '700',
    color: '#1e293b',
    padding: 10,
    backgroundColor: '#f1f5f9',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    color: '#475569',
    padding: 10,
    lineHeight: 18,
  },
  processorBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  processorName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  processorDesc: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
