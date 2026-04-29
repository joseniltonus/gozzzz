import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyScreen() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1e293b', '#334155']}
        style={styles.header}
      >
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#ffffff" />
          <Text style={styles.backText}>{t('privacy.back')}</Text>
        </TouchableOpacity>
        <Shield size={48} color="#fbbf24" />
        <Text style={styles.headerTitle}>{t('privacy.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('privacy.updated')}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>GDPR</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>LGPD</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>{t('privacy.ukDpa')}</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.content}>

        <View style={styles.highlightBox}>
          <Text style={styles.highlightTitle}>Resumo Rápido</Text>
          <Text style={styles.highlightText}>
            Coletamos o mínimo de dados pessoais necessários para fornecer o serviço GoZzzz. Seus dados são criptografados, nunca vendidos, e você tem controle total sobre eles.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controlador de Dados</Text>
          <Text style={styles.text}>
            O GoZzzz é o controlador de dados responsável pelas suas informações pessoais. Estamos comprometidos em proteger sua privacidade e cumprir todas as leis de proteção de dados aplicáveis.
          </Text>
          <Text style={styles.companyName}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
          <Text style={styles.contactHighlight}>suporte@gozzzz.app</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dados que Coletamos</Text>
          <Text style={styles.text}>
            Coletamos informações que você fornece diretamente e informações coletadas automaticamente pelo uso do GoZzzz.
          </Text>
          <View style={styles.tableBox}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Tipo de Dado</Text>
              <Text style={styles.tableHeader}>Finalidade</Text>
              <Text style={styles.tableHeader}>Base Legal</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Endereço de e-mail</Text>
              <Text style={styles.tableCell}>Criação de conta e login</Text>
              <Text style={styles.tableCell}>Contrato</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Senha (criptografada)</Text>
              <Text style={styles.tableCell}>Segurança da conta</Text>
              <Text style={styles.tableCell}>Contrato</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Progresso de aprendizado</Text>
              <Text style={styles.tableCell}>Experiência personalizada</Text>
              <Text style={styles.tableCell}>Consentimento</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Informações do dispositivo</Text>
              <Text style={styles.tableCell}>Otimização do app</Text>
              <Text style={styles.tableCell}>Interesse legítimo</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Dados de pagamento</Text>
              <Text style={styles.tableCell}>Processar assinaturas</Text>
              <Text style={styles.tableCell}>Contrato</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Provedores de Serviço</Text>
          <Text style={styles.text}>
            Utilizamos serviços terceirizados confiáveis para operar o GoZzzz. Esses provedores processam seus dados apenas conforme nossas instruções.
          </Text>
          <View style={styles.processorBox}>
            <Text style={styles.processorName}>Supabase</Text>
            <Text style={styles.processorDesc}>Infraestrutura de banco de dados e autenticação na nuvem. Todos os dados são criptografados e armazenados com segurança.</Text>
          </View>
          <View style={styles.processorBox}>
            <Text style={styles.processorName}>Stripe</Text>
            <Text style={styles.processorDesc}>Processamento de pagamentos para assinaturas. Nunca armazena seus dados de cartão de crédito em nossos servidores.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transferência Internacional de Dados</Text>
          <Text style={styles.text}>
            Seus dados podem ser processados em vários países. Implementamos salvaguardas como criptografia e Cláusulas Contratuais Padrão para proteger suas informações durante as transferências.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Retenção de Dados</Text>
          <Text style={styles.bulletPoint}>• Dados da conta: Retidos enquanto sua conta estiver ativa</Text>
          <Text style={styles.bulletPoint}>• Progresso de aprendizado: Retido para personalização e análise</Text>
          <Text style={styles.bulletPoint}>• Registros de pagamento: Retidos por 7 anos (exigência legal)</Text>
          <Text style={styles.bulletPoint}>• Contas excluídas: Anonimizadas em até 30 dias</Text>
          <Text style={styles.bulletPoint}>• Dados de backup: Retidos por até 60 dias para recuperação</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seus Direitos de Privacidade</Text>
          <Text style={styles.text}>
            Você tem direitos sobre seus dados pessoais ao amparo do GDPR, LGPD e leis similares.
          </Text>
          <Text style={styles.bulletPoint}>• Direito de acessar seus dados</Text>
          <Text style={styles.bulletPoint}>• Direito de corrigir dados imprecisos</Text>
          <Text style={styles.bulletPoint}>• Direito de excluir seus dados</Text>
          <Text style={styles.bulletPoint}>• Direito à portabilidade de dados</Text>
          <Text style={styles.bulletPoint}>• Direito de restringir o processamento</Text>
          <Text style={styles.bulletPoint}>• Direito de se opor ao processamento</Text>
          <Text style={styles.bulletPoint}>• Direito de retirar o consentimento</Text>
          <Text style={styles.text}>
            Para exercer esses direitos, envie um e-mail para suporte@gozzzz.app. Respondemos em até 30 dias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>LGPD (Proteção de Dados no Brasil)</Text>
          <Text style={styles.text}>
            Cumprimos a Lei Geral de Proteção de Dados (LGPD) do Brasil. O processamento dos seus dados é baseado em:
          </Text>
          <Text style={styles.bulletPoint}>• Execução de contrato (prestação de serviço)</Text>
          <Text style={styles.bulletPoint}>• Seu consentimento explícito</Text>
          <Text style={styles.bulletPoint}>• Interesses legítimos do negócio</Text>
          <Text style={styles.bulletPoint}>• Obrigações legais ou regulatórias</Text>
          <Text style={styles.bulletPoint}>• Proteção do titular dos dados</Text>
          <Text style={styles.bulletPoint}>• Proteção ao crédito</Text>
          <Text style={styles.bulletPoint}>• Interesse público</Text>
          <Text style={styles.text}>
            Entre em contato com suporte@gozzzz.app para exercer direitos da LGPD. Resposta em até 15 dias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como Exercer Seus Direitos</Text>
          <Text style={styles.text}>
            Você pode gerenciar suas configurações de privacidade diretamente no app ou nos contatar:
          </Text>
          <Text style={styles.bulletPoint}>• Baixe seus dados no menu de Configurações</Text>
          <Text style={styles.bulletPoint}>• Exclua sua conta a qualquer momento (irreversível)</Text>
          <Text style={styles.bulletPoint}>• Ajuste suas preferências de comunicação de marketing</Text>
          <Text style={styles.text}>
            Envie um e-mail para suporte@gozzzz.app com sua solicitação e comprovante de identidade. Respondemos em até 30 dias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medidas de Segurança</Text>
          <Text style={styles.bulletPoint}>• Criptografia de ponta a ponta para dados sensíveis</Text>
          <Text style={styles.bulletPoint}>• Criptografia SSL/TLS em trânsito</Text>
          <Text style={styles.bulletPoint}>• Auditorias de segurança e testes de penetração regulares</Text>
          <Text style={styles.bulletPoint}>• Hash seguro de senhas com bcrypt</Text>
          <Text style={styles.bulletPoint}>• Suporte à autenticação multifator</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificação de Violação de Dados</Text>
          <Text style={styles.text}>
            Em caso de violação de dados, notificaremos os usuários afetados em até 72 horas por e-mail. Também reportaremos às autoridades competentes conforme exigido por lei.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cookies e Rastreamento</Text>
          <Text style={styles.text}>
            Usamos o mínimo de cookies apenas para funcionalidades essenciais. Sem pixels de rastreamento ou cookies de terceiros.
          </Text>
          <Text style={styles.bulletPoint}>• Cookies de sessão: Mantêm você conectado</Text>
          <Text style={styles.bulletPoint}>• Cookies de preferência: Lembram suas configurações</Text>
          <Text style={styles.text}>
            Você pode desativar cookies no seu navegador, mas isso pode afetar a funcionalidade do app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade de Crianças</Text>
          <Text style={styles.text}>
            O GoZzzz é destinado a usuários maiores de 18 anos. Não coletamos dados de menores conscientemente. Se descobrirmos que uma criança criou uma conta, a excluiremos imediatamente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tomada de Decisão Automatizada</Text>
          <Text style={styles.text}>
            Não utilizamos tomada de decisão automatizada que possa produzir efeitos legais ou igualmente significativos. Seus dados nunca são usados para criação de perfis ou discriminação.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alterações na Política</Text>
          <Text style={styles.text}>
            Podemos atualizar esta política. Mudanças materiais serão notificadas por e-mail com 30 dias de antecedência. O uso continuado implica aceitação.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fale Conosco</Text>
          <Text style={styles.text}>
            Dúvidas sobre esta política ou sua privacidade?
          </Text>
          <Text style={styles.contactHighlight}>suporte@gozzzz.app</Text>
          <Text style={styles.text}>
            Você também tem o direito de registrar uma reclamação junto à sua autoridade local de proteção de dados.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Estamos comprometidos com sua privacidade. Esta política foi atualizada pela última vez em 28 de março de 2026. Versão 1.1
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
