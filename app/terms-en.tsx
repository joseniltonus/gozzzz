import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function TermsEnScreen() {
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
        <FileText size={48} color="#fbbf24" />
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <Text style={styles.headerSubtitle}>Last Updated: April 10, 2026</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>GDPR</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>LGPD</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. What is GoZzzz</Text>
          <Text style={styles.text}>
            GoZzzz is a 21-step digital sleep improvement program based on scientific sleep health principles. We are not a medical service and do not replace guidance from health professionals.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By accessing and using GoZzzz, you agree to be bound by these Terms of Service. If you do not agree with any part, please stop using the service immediately.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Service Description</Text>
          <Text style={styles.text}>
            GoZzzz is an educational application that provides content and protocols based on sleep science.
          </Text>
          <Text style={styles.bulletPoint}>• Video lessons based on peer-reviewed scientific research on sleep</Text>
          <Text style={styles.bulletPoint}>• Sleep monitoring and progress tracking</Text>
          <Text style={styles.bulletPoint}>• Expert coaching and sleep strategies</Text>
          <Text style={styles.bulletPoint}>• Community resources and support</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scientific Foundation</Text>
          <Text style={styles.text}>
            GoZzzz content is grounded in research by:
          </Text>
          <Text style={styles.bulletPoint}>• Matthew Walker, Ph.D. — UC Berkeley, author of Why We Sleep</Text>
          <Text style={styles.bulletPoint}>• Michael Breus, Ph.D. — Sleep chronotype specialist, author of The Power of When</Text>
          <Text style={styles.bulletPoint}>• Andrew Huberman, Ph.D. — Stanford University, Huberman Lab</Text>
          <Text style={styles.bulletPoint}>• Charles Czeisler, Ph.D., M.D. — Harvard Medical School</Text>
          <Text style={styles.text}>
            GoZzzz applies these concepts independently. We are not affiliated, sponsored, or endorsed by any of the researchers or their respective institutions. None of the researchers have reviewed or approved this content.
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Eligibility</Text>
          <Text style={styles.text}>
            You must be at least 18 years old to use GoZzzz. By creating an account, you declare that:
          </Text>
          <Text style={styles.bulletPoint}>• You are 18 years or older</Text>
          <Text style={styles.bulletPoint}>• All information provided is accurate and true</Text>
          <Text style={styles.bulletPoint}>• You will keep your information updated</Text>
          <Text style={styles.bulletPoint}>• You are responsible for account security</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Account Types</Text>
          <Text style={styles.text}>
            We offer the following plans:
          </Text>
          <Text style={styles.bulletPoint}>• Free Plan: Access to 3 initial lessons</Text>
          <Text style={styles.bulletPoint}>• Premium Plan: Complete access to all 21 lessons and exclusive features</Text>
          <Text style={styles.bulletPoint}>• Gift Card: Premium access via promotional code</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Payments and Subscriptions</Text>
          <Text style={styles.text}>
            When purchasing the Premium Plan:
          </Text>
          <Text style={styles.bulletPoint}>• Payments are processed by Stripe</Text>
          <Text style={styles.bulletPoint}>• One-time payment for lifetime access</Text>
          <Text style={styles.bulletPoint}>• You can contact support at suporte@gozzzz.app for assistance</Text>
          <Text style={styles.bulletPoint}>• Prices are fixed at the time of purchase</Text>
          <Text style={styles.bulletPoint}>• No refunds after the 7-day guarantee period</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Refund Policy</Text>
          <Text style={styles.text}>
            We offer a 7-day refund guarantee for new purchases. After this period, refunds are not granted for:
          </Text>
          <Text style={styles.bulletPoint}>• Dissatisfaction with content</Text>
          <Text style={styles.bulletPoint}>• Change of mind</Text>
          <Text style={styles.bulletPoint}>• Technical issues on user devices</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Acceptable Use</Text>
          <Text style={styles.text}>
            You agree NOT to:
          </Text>
          <Text style={styles.bulletPoint}>• Share your account with third parties</Text>
          <Text style={styles.bulletPoint}>• Copy, distribute or reproduce app content</Text>
          <Text style={styles.bulletPoint}>• Reverse engineer the app</Text>
          <Text style={styles.bulletPoint}>• Use the service for illegal purposes</Text>
          <Text style={styles.bulletPoint}>• Attempt to access restricted areas</Text>
          <Text style={styles.bulletPoint}>• Overload or interfere with our servers</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Intellectual Property</Text>
          <Text style={styles.text}>
            All GoZzzz content, including texts, videos, audios, graphics and software, is owned by GoZzzz or its licensors and protected by copyright law. You receive only a limited and non-exclusive license for personal use.
          </Text>
          <Text style={styles.text}>
            References to researchers, scientists and their published work are for educational purposes only. Such references do not imply endorsement or affiliation. All content is based on published scientific research.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Medical Disclaimer</Text>
          <Text style={styles.text}>
            IMPORTANT: GoZzzz provides educational information on sleep hygiene and does NOT replace professional medical advice. You should:
          </Text>
          <Text style={styles.bulletPoint}>• Consult a doctor before making significant sleep changes</Text>
          <Text style={styles.bulletPoint}>• Not use this app to diagnose or treat medical conditions</Text>
          <Text style={styles.bulletPoint}>• Seek medical help for severe sleep disorders</Text>
          <Text style={styles.bulletPoint}>• Inform your doctor about any supplements mentioned</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>11. Account Suspension</Text>
          <Text style={styles.text}>
            We may suspend or terminate your account if:
          </Text>
          <Text style={styles.bulletPoint}>• You violate these Terms of Service</Text>
          <Text style={styles.bulletPoint}>• We detect fraudulent activity</Text>
          <Text style={styles.bulletPoint}>• You provide false information</Text>
          <Text style={styles.bulletPoint}>• Payment fails</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Service Continuity</Text>
          <Text style={styles.text}>
            Access is conditioned upon the active operation of the platform. In case of service termination, the user will be notified with 30 days&apos; notice in advance.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Limitation of Liability</Text>
          <Text style={styles.text}>
            GoZzzz is provided &quot;as is&quot;. The app does not guarantee specific results. We do not guarantee:
          </Text>
          <Text style={styles.bulletPoint}>• That the service will be uninterrupted or error-free</Text>
          <Text style={styles.bulletPoint}>• That you will obtain expected results</Text>
          <Text style={styles.bulletPoint}>• That content will always be up to date</Text>
          <Text style={styles.bulletPoint}>• That the application will work on all devices</Text>
          <Text style={styles.text}>
            We are not responsible for indirect, incidental or consequential damages arising from app use.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Modification of Terms</Text>
          <Text style={styles.text}>
            We reserve the right to alter these terms and conditions with prior notice. Significant changes will be notified by email with 30 days&apos; notice. Continued use of the service after notification implies acceptance of the modifications.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>15. Service Modifications</Text>
          <Text style={styles.text}>
            We reserve the right to modify or discontinue any part of the service. We will make reasonable efforts to notify you about significant changes.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>16. Jurisdiction</Text>
          <Text style={styles.text}>
            These Terms of Service and Conditions are governed by the laws of the Federative Republic of Brazil. Any disputes will be resolved in the courts of São Paulo, Brazil.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>17. LGPD (Data Protection in Brazil)</Text>
          <Text style={styles.text}>
            GoZzzz processes personal data in compliance with the LGPD (Law No. 13,709/2018). By creating an account, you consent to data processing as described in our Privacy Policy.
          </Text>
          <Text style={styles.text}>
            Legal bases: (i) contract execution; (ii) consent; (iii) legitimate interest; (iv) legal obligations.
          </Text>
          <Text style={styles.text}>
            To exercise LGPD rights: suporte@gozzzz.app. Response within 15 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>18. GDPR (EU/UK Data Protection)</Text>
          <Text style={styles.text}>
            For users in the EEA or United Kingdom, data processing complies with GDPR and the UK Data Protection Act of 2018.
          </Text>
          <Text style={styles.text}>
            You have the right to lodge complaints with your local data protection authority. To exercise GDPR rights: suporte@gozzzz.app. Response within 30 days.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>19. Contact</Text>
          <Text style={styles.companyName}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
          <Text style={styles.text}>
            Questions about these terms?
          </Text>
          <Text style={styles.contact}>Privacy / GDPR / LGPD: suporte@gozzzz.app</Text>
          <Text style={styles.contact}>General Support: suporte@gozzzz.app</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By using GoZzzz, you acknowledge that you have read, understood and agreed to be bound by these Terms and Conditions. Version 1.2 — April 10, 2026
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
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
  divider: {
    height: 1,
    backgroundColor: '#1a1a2e',
    marginVertical: 24,
  },
  contact: {
    fontSize: 15,
    color: '#6366f1',
    fontWeight: '600',
    marginTop: 8,
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
  footer: {
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
