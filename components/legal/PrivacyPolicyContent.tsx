import { View, Text, StyleSheet } from 'react-native';
import { useLanguage, type Language } from '@/contexts/LanguageContext';

const LEGAL_ENTITY = 'MORFEU SAUDE E TECNOLOGIA LTDA';
const CNPJ_LINE = 'CNPJ: 66.059.212/0001-52';

type Props = { lang?: Language };

export function PrivacyPolicyContent({ lang }: Props) {
  const { t } = useLanguage();
  const tr = (key: string) => t(key, lang);

  return (
    <View style={styles.content}>
      <View style={styles.highlightBox}>
        <Text style={styles.highlightTitle}>{tr('privacy.summary.title')}</Text>
        <Text style={styles.highlightText}>{tr('privacy.summary.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.dataController.title')}</Text>
        <Text style={styles.text}>{tr('privacy.dataController.text')}</Text>
        <Text style={styles.companyName}>{LEGAL_ENTITY}</Text>
        <Text style={styles.companyCnpj}>{CNPJ_LINE}</Text>
        <Text style={styles.contactHighlight}>{tr('privacy.dataController.privacy')}</Text>
        <Text style={styles.text}>{tr('privacy.dataController.support')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.dataCollected.title')}</Text>
        <Text style={styles.text}>{tr('privacy.dataCollected.text')}</Text>
        <View style={styles.tableBox}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>{tr('privacy.dataCollected.tableData')}</Text>
            <Text style={styles.tableHeader}>{tr('privacy.dataCollected.tablePurpose')}</Text>
            <Text style={styles.tableHeader}>{tr('privacy.dataCollected.tableLegal')}</Text>
          </View>
          {[1, 2, 3, 4, 5].map((row) => (
            <View key={row} style={styles.tableRow}>
              <Text style={styles.tableCell}>{tr(`privacy.dataCollected.row${row}.data`)}</Text>
              <Text style={styles.tableCell}>{tr(`privacy.dataCollected.row${row}.purpose`)}</Text>
              <Text style={styles.tableCell}>{tr(`privacy.dataCollected.row${row}.legal`)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.serviceProviders.title')}</Text>
        <Text style={styles.text}>{tr('privacy.serviceProviders.text')}</Text>
        <View style={styles.processorBox}>
          <Text style={styles.processorName}>{tr('privacy.serviceProviders.supabase')}</Text>
          <Text style={styles.processorDesc}>{tr('privacy.serviceProviders.supabaseDesc')}</Text>
        </View>
        <View style={styles.processorBox}>
          <Text style={styles.processorName}>{tr('privacy.serviceProviders.stripe')}</Text>
          <Text style={styles.processorDesc}>{tr('privacy.serviceProviders.stripeDesc')}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.internationalTransfer.title')}</Text>
        <Text style={styles.text}>{tr('privacy.internationalTransfer.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.retention.title')}</Text>
        {[1, 2, 3, 4, 5].map((i) => (
          <Text key={i} style={styles.bulletPoint}>
            {tr(`privacy.retention.item${i}`)}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.rights.title')}</Text>
        <Text style={styles.text}>{tr('privacy.rights.text')}</Text>
        {(
          [
            'access',
            'rectification',
            'erasure',
            'portability',
            'restriction',
            'objection',
            'withdraw',
          ] as const
        ).map((k) => (
          <Text key={k} style={styles.bulletPoint}>
            {tr(`privacy.rights.${k}`)}
          </Text>
        ))}
        <Text style={styles.text}>{tr('privacy.rights.response')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.lgpd.title')}</Text>
        <Text style={styles.text}>{tr('privacy.lgpd.text')}</Text>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Text key={i} style={styles.bulletPoint}>
            {tr(`privacy.lgpd.item${i}`)}
          </Text>
        ))}
        <Text style={styles.text}>{tr('privacy.lgpd.response')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.exercise.title')}</Text>
        <Text style={styles.text}>{tr('privacy.exercise.text')}</Text>
        {[1, 2, 3].map((i) => (
          <Text key={i} style={styles.bulletPoint}>
            {tr(`privacy.exercise.item${i}`)}
          </Text>
        ))}
        <Text style={styles.text}>{tr('privacy.exercise.contact')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.security.title')}</Text>
        {[1, 2, 3, 4, 5].map((i) => (
          <Text key={i} style={styles.bulletPoint}>
            {tr(`privacy.security.item${i}`)}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.breach.title')}</Text>
        <Text style={styles.text}>{tr('privacy.breach.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.cookies.title')}</Text>
        <Text style={styles.text}>{tr('privacy.cookies.text')}</Text>
        <Text style={styles.bulletPoint}>{tr('privacy.cookies.item1')}</Text>
        <Text style={styles.bulletPoint}>{tr('privacy.cookies.item2')}</Text>
        <Text style={styles.text}>{tr('privacy.cookies.note')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.minors.title')}</Text>
        <Text style={styles.text}>{tr('privacy.minors.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.automated.title')}</Text>
        <Text style={styles.text}>{tr('privacy.automated.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.changes.title')}</Text>
        <Text style={styles.text}>{tr('privacy.changes.text')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{tr('privacy.contact.title')}</Text>
        <Text style={styles.text}>{tr('privacy.contact.text')}</Text>
        <Text style={styles.contactHighlight}>{tr('privacy.contact.email')}</Text>
        <Text style={styles.text}>{tr('privacy.contact.authorities')}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{tr('privacy.footer')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
