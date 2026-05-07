import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FileText, ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';

const QUIZ_DISCLAIMER =
  'O questionário de identificação de cronotipo do GoZzzz foi desenvolvido ' +
  'de forma independente e não reproduz o quiz original do Dr. Breus ' +
  'disponível em thepowerofwhenquiz.com.';

const CHRONOTYPE_NAMES =
  'Os nomes dos cronotipos (Golfinho, Leão, Urso e Lobo) são utilizados ' +
  'como termos descritivos de categorias científicas, com atribuição ao ' +
  'modelo original do Dr. Michael J. Breus, PhD, conforme publicado em ' +
  '"O Poder do Quando" (The Power of When, 2016).';

export default function TermsScreen() {
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
          <Text style={styles.backText}>{t('terms.back')}</Text>
        </TouchableOpacity>
        <FileText size={48} color="#fbbf24" />
        <Text style={styles.headerTitle}>{t('terms.title')}</Text>
        <Text style={styles.headerSubtitle}>{t('terms.updated')}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.badge}><Text style={styles.badgeText}>GDPR</Text></View>
          <View style={styles.badge}><Text style={styles.badgeText}>LGPD</Text></View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. O que é o GoZzzz</Text>
          <Text style={styles.text}>
            GoZzzz é um programa digital de 21 etapas para melhora do sono, baseado em princípios científicos de saúde do sono. Não somos um serviço médico e não substituímos orientação de profissionais de saúde.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Aceitação dos Termos</Text>
          <Text style={styles.text}>{t('terms.acceptance.text')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Descrição do Serviço</Text>
          <Text style={styles.text}>{t('terms.service.text')}</Text>
          <Text style={styles.bulletPoint}>{t('terms.service.item1')}</Text>
          <Text style={styles.bulletPoint}>{t('terms.service.item2')}</Text>
          <Text style={styles.bulletPoint}>{t('terms.service.item3')}</Text>
          <Text style={styles.bulletPoint}>{t('terms.service.item4')}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Base Científica</Text>
          <Text style={styles.text}>
            O conteúdo do GoZzzz é fundamentado em pesquisas de:
          </Text>
          <Text style={styles.bulletPoint}>• Matthew Walker, Ph.D. — UC Berkeley, autor de Por Que Dormimos</Text>
          <Text style={styles.bulletPoint}>• Michael Breus, Ph.D. — Especialista em cronotipos, autor de O Poder do Quando</Text>
          <Text style={styles.bulletPoint}>• Andrew Huberman, Ph.D. — Stanford University, Huberman Lab</Text>
          <Text style={styles.bulletPoint}>• Charles Czeisler, Ph.D., M.D. — Harvard Medical School</Text>
          <Text style={styles.text}>
            GoZzzz aplica esses conceitos de forma independente. Não somos afiliados, patrocinados ou endossados por nenhum dos pesquisadores ou suas respectivas instituições. Nenhum dos pesquisadores revisou ou aprovou este conteúdo.
          </Text>
          <Text style={styles.disclaimerText}>
            {QUIZ_DISCLAIMER}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Elegibilidade</Text>
          <Text style={styles.text}>
            Você deve ter pelo menos 18 anos para usar o GoZzzz. Ao criar uma conta, você declara que:
          </Text>
          <Text style={styles.bulletPoint}>• Tem 18 anos ou mais</Text>
          <Text style={styles.bulletPoint}>• Todas as informações fornecidas são precisas e verdadeiras</Text>
          <Text style={styles.bulletPoint}>• Manterá suas informações atualizadas</Text>
          <Text style={styles.bulletPoint}>• É responsável pela segurança da conta</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Tipos de Conta</Text>
          <Text style={styles.text}>
            Oferecemos os seguintes planos:
          </Text>
          <Text style={styles.bulletPoint}>• Plano Gratuito: Acesso a 3 aulas iniciais</Text>
          <Text style={styles.bulletPoint}>• Plano Premium: Acesso completo a todas as 21 aulas e recursos exclusivos</Text>
          <Text style={styles.bulletPoint}>• Cartão Presente: Acesso premium via código promocional</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Pagamentos e Assinaturas</Text>
          <Text style={styles.text}>
            Ao assinar o Plano Premium:
          </Text>
          <Text style={styles.bulletPoint}>• Os pagamentos são processados pelo Stripe</Text>
          <Text style={styles.bulletPoint}>• As assinaturas renovam automaticamente até o cancelamento</Text>
          <Text style={styles.bulletPoint}>• Você pode cancelar a qualquer momento nas configurações do app</Text>
          <Text style={styles.bulletPoint}>• Os cancelamentos entram em vigor no final do período de cobrança atual</Text>
          <Text style={styles.bulletPoint}>• Sem reembolsos proporcionais por cancelamentos antecipados</Text>
          <Text style={styles.bulletPoint}>• Os preços podem ser alterados com 30 dias de aviso prévio</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. Política de Reembolso</Text>
          <Text style={styles.text}>
            Oferecemos garantia de reembolso de 7 dias para novas assinaturas. Após esse período, reembolsos não são concedidos para:
          </Text>
          <Text style={styles.bulletPoint}>• Meses parcialmente utilizados</Text>
          <Text style={styles.bulletPoint}>• Mudanças de plano</Text>
          <Text style={styles.bulletPoint}>• Insatisfação com o conteúdo</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. Uso Aceitável</Text>
          <Text style={styles.text}>
            Você concorda em NÃO:
          </Text>
          <Text style={styles.bulletPoint}>• Compartilhar sua conta com terceiros</Text>
          <Text style={styles.bulletPoint}>• Copiar, distribuir ou reproduzir conteúdo do app</Text>
          <Text style={styles.bulletPoint}>• Fazer engenharia reversa do app</Text>
          <Text style={styles.bulletPoint}>• Usar o serviço para fins ilegais</Text>
          <Text style={styles.bulletPoint}>• Tentar acessar áreas restritas</Text>
          <Text style={styles.bulletPoint}>• Sobrecarregar ou interferir nos nossos servidores</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. Propriedade Intelectual</Text>
          <Text style={styles.text}>
            Todo o conteúdo do GoZzzz, incluindo textos, layout, gráficos e software, é propriedade do GoZzzz ou de seus licenciadores e protegido pela lei de direitos autorais. Você recebe apenas uma licença limitada e não exclusiva para uso pessoal.
          </Text>
          <Text style={styles.text}>
            Referências a pesquisadores, cientistas e seus trabalhos publicados são apenas para fins educativos. Tais referências não implicam endosso ou afiliação. Todo o conteúdo é baseado em pesquisas científicas publicadas.
          </Text>
          <Text style={styles.disclaimerText}>
            {CHRONOTYPE_NAMES}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Aviso Médico</Text>
          <Text style={styles.text}>
            IMPORTANTE: O GoZzzz fornece informações educativas sobre higiene do sono e NÃO substitui o aconselhamento médico profissional. Você deve:
          </Text>
          <Text style={styles.bulletPoint}>• Consultar um médico antes de fazer mudanças significativas no sono</Text>
          <Text style={styles.bulletPoint}>• Não usar este app para diagnosticar ou tratar condições médicas</Text>
          <Text style={styles.bulletPoint}>• Buscar ajuda médica para distúrbios graves do sono</Text>
          <Text style={styles.bulletPoint}>• Informar seu médico sobre quaisquer suplementos mencionados</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>12. Suspensão de Conta</Text>
          <Text style={styles.text}>
            Podemos suspender ou encerrar sua conta se:
          </Text>
          <Text style={styles.bulletPoint}>• Você violar estes Termos de Serviço</Text>
          <Text style={styles.bulletPoint}>• Detectarmos atividade fraudulenta</Text>
          <Text style={styles.bulletPoint}>• Você fornecer informações falsas</Text>
          <Text style={styles.bulletPoint}>• O pagamento falhar</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>13. Continuidade do Serviço</Text>
          <Text style={styles.text}>
            O acesso está condicionado à operação ativa da plataforma. Em caso de encerramento, o usuário será notificado com sucesso 30 dias de antecedência.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>14. Limitação de Responsabilidade</Text>
          <Text style={styles.text}>
            O GoZzzz é fornecido &quot;como está&quot;. O app não garante resultados específicos. Não garantimos:
          </Text>
          <Text style={styles.bulletPoint}>• Que o serviço será ininterrupto ou livre de erros</Text>
          <Text style={styles.bulletPoint}>• Que você obterá os resultados esperados</Text>
          <Text style={styles.bulletPoint}>• Que o conteúdo estará sempre atualizado</Text>
          <Text style={styles.bulletPoint}>• Que o aplicativo funcionará em todos os dispositivos</Text>
          <Text style={styles.text}>
            Não somos responsáveis por danos indiretos, incidentais ou consequenciais decorrentes do uso do app.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>15. Modificações nos Termos</Text>
          <Text style={styles.text}>
            Reservamo-nos o direito de alterar estes termos e condições com aviso prévio. As alterações significativas serão notificadas por e-mail com 30 dias de antecedência. O uso continuado do serviço após a notificação implica aceitação das modificações.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>16. Modificações no Serviço</Text>
          <Text style={styles.text}>
            Reservamo-nos o direito de modificar ou descontinuar qualquer parte do serviço. Faremos esforços razoáveis para notificá-lo sobre mudanças significativas.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>17. Jurisdição</Text>
          <Text style={styles.text}>
            Estes Termos de Serviço e Condições são regidos pelas leis da República Federativa do Brasil. Quaisquer disputas serão resolvidas nos tribunais da comarca de São Paulo, Brasil.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>18. LGPD (Proteção de Dados no Brasil)</Text>
          <Text style={styles.text}>
            O GoZzzz processa dados pessoais em conformidade com a LGPD (Lei nº 13.709/2018). Ao criar uma conta, você consente com o processamento de dados conforme descrito em nossa Política de Privacidade.
          </Text>
          <Text style={styles.text}>
            Bases legais: (i) execução de contrato; (ii) consentimento; (iii) interesse legítimo; (iv) obrigações legais.
          </Text>
          <Text style={styles.text}>
            Para exercer direitos da LGPD: suporte@gozzzz.app. Resposta em até 15 dias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>19. GDPR (Proteção de Dados da UE/RU)</Text>
          <Text style={styles.text}>
            Para usuários no EEE ou no Reino Unido, o processamento de dados está em conformidade com o GDPR e a Lei de Proteção de Dados do Reino Unido de 2018.
          </Text>
          <Text style={styles.text}>
            Você tem o direito de registrar reclamações junto à sua autoridade local de proteção de dados. Para exercer direitos do GDPR: suporte@gozzzz.app. Resposta em até 30 dias.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>20. Contato</Text>
          <Text style={styles.companyName}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
          <Text style={styles.companyCnpj}>CNPJ: 66.059.212/0001-52</Text>
          <Text style={styles.text}>
            Dúvidas sobre estes termos?
          </Text>
          <Text style={styles.contact}>Privacidade / GDPR / LGPD: suporte@gozzzz.app</Text>
          <Text style={styles.contact}>Suporte geral: suporte@gozzzz.app</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ao usar o GoZzzz, você reconhece que leu, compreendeu e concordou em se vincular a estes Termos e Condições. Versão 1.3 — 4 de maio de 2026
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
  disclaimerText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 8,
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
