# GoZzzz — exportação estática do repositório

Documento gerado automaticamente para análise externa.

**Índice de secções com código completo (secções 2–3):** `app/web/index.tsx`, `app/web/sono-plus.tsx`, `ChronotypePremiumWebFunnel` (quiz/cronótipo na landing web), `ChronotypeResultPremiumScreen`, `app/_layout.tsx`, `app/web/_layout.tsx`, `app/payment.tsx`, `app/web/assinar.tsx`, Supabase `process-payment` e `create-payment-intent`, `contexts/LanguageContext.tsx`.

**Secção 4 (complemento):** rotas `app/(auth)/quiz.tsx` e `result.tsx`, `src/screens/QuizScreen.tsx`, `ResultScreen.tsx`, e o modal completo `components/ChronotypeQuizModal.tsx` (quiz nativo; na web o funil está no componente `ChronotypePremiumWebFunnel`).

---

## 1. Árvore completa de arquivos do projeto

Pastas omitidas da árvore: `node_modules/`, `.git/`, `dist/`, `.expo/`, builds Android/iOS.

```
project 5/
├── .bolt/
│   └── config.json
├── .claude/
│   ├── chronotype-quiz-persistence.md
│   ├── home-hero-banner.md
│   ├── home-screen-complete.md
│   ├── platform-check.md
│   ├── program-progress-fix.md
│   ├── progress-bar-platform-support.md
│   ├── shareable-cards-implementation.md
│   ├── sleep-concierge-legal-updates.md
│   ├── step18-jet-lag-rewrite.md
│   ├── step7-fixes.md
│   ├── step7-mobile-fix.md
│   └── what-science-says-sections.md
├── .github/
│   └── workflows/
│       ├── deploy-all-platforms.yml
│       ├── privacy-requests-cron.yml
│       ├── science-reference-check.yml
│       └── store-builds.yml
├── .vercel/
│   ├── project.json
│   └── README.txt
├── app/
│   ├── (auth)/
│   │   ├── _layout.tsx
│   │   ├── forgot-password.tsx
│   │   ├── login.tsx
│   │   ├── onboarding.tsx
│   │   ├── quiz.tsx
│   │   ├── result.tsx
│   │   ├── signup.tsx
│   │   └── steps.tsx
│   ├── (tabs)/
│   │   ├── coach/
│   │   │   ├── _layout.tsx
│   │   │   ├── concierge.tsx
│   │   │   └── index.tsx
│   │   ├── lesson/
│   │   │   ├── [id].tsx
│   │   │   ├── _layout.tsx
│   │   │   ├── step-fourteen-quiz.tsx
│   │   │   ├── step-seven-checkin.tsx
│   │   │   └── step-twenty-one-conclusion.tsx
│   │   ├── _layout.tsx
│   │   ├── about.tsx
│   │   ├── concierge.tsx
│   │   ├── home.tsx
│   │   ├── profile.tsx
│   │   └── program.tsx
│   ├── web/
│   │   ├── licao/
│   │   │   └── [id].tsx
│   │   ├── _layout.tsx
│   │   ├── assinar.tsx
│   │   ├── coach.tsx
│   │   ├── index.tsx
│   │   ├── programa.tsx
│   │   ├── sobre.tsx
│   │   └── sono-plus.tsx
│   ├── +not-found.tsx
│   ├── _layout.tsx
│   ├── business-card.tsx
│   ├── checkout.tsx
│   ├── confirm-email.tsx
│   ├── index.tsx
│   ├── payment.tsx
│   ├── privacy-en.tsx
│   ├── privacy.tsx
│   ├── qrcode.tsx
│   ├── reset-password.tsx
│   ├── terms-en.tsx
│   └── terms.tsx
├── assets/
│   └── images/
│       ├── favicon.png
│       └── icon.png
├── components/
│   ├── branding/
│   │   └── GozzzzWordmark.tsx
│   ├── chronotype/
│   │   ├── ChronotypeIntelligenceProfile.tsx
│   │   ├── chronotypePremiumHeroConstants.ts
│   │   ├── ChronotypePremiumNativeHero.tsx
│   │   ├── ChronotypeProfileExplainModal.tsx
│   │   ├── ChronotypeRefineOptionalBlock.tsx
│   │   ├── ChronotypeResultPremiumScreen.tsx
│   │   └── NativeHeroGradientHighlight.tsx
│   ├── legal/
│   │   └── PrivacyPolicyContent.tsx
│   ├── web/
│   │   ├── chronotype/
│   │   │   └── ChronotypePremiumWebFunnel.tsx
│   │   └── WebMarketingLanding.tsx
│   ├── ChronotypeGrid.tsx
│   ├── ChronotypeQuizModal.tsx
│   ├── ChronotypeResultDolphin.tsx
│   ├── CookieConsent.tsx
│   ├── CookieConsentBanner.tsx
│   ├── EngagementNotificationSync.tsx
│   ├── ErrorBoundary.tsx
│   ├── FreeTierPaywallModal.tsx
│   ├── Lesson1InteractiveCard.tsx
│   ├── Lesson1InteractiveCardWeb.tsx
│   ├── LessonInteractiveCard.tsx
│   ├── LessonInteractiveCardWeb.tsx
│   ├── Modal.tsx
│   ├── PaywallScreen.tsx
│   ├── ProgressBar.tsx
│   ├── ResearcherTrustBlock.tsx
│   ├── ShareableCard.tsx
│   ├── SignupSuccessScreen.tsx
│   ├── SleepLessonCard.tsx
│   ├── SleepLessonCardWeb.tsx
│   ├── StepFourteenQuiz.tsx
│   ├── StepSevenCheckIn.tsx
│   ├── StepTwentyOneConclusion.tsx
│   └── Toast.tsx
├── contexts/
│   ├── AuthContext.tsx
│   ├── LanguageContext.tsx
│   ├── ProgressContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── data/
│   ├── chronotypeOneLiner.ts
│   ├── chronotypeRefineOptional.ts
│   ├── chronotypeResultPremium.ts
│   ├── chronotypes.ts
│   ├── chronotypesExperience.ts
│   ├── chronotypesIntelligence.ts
│   ├── lessonEnhancements.ts
│   ├── lessons.ts
│   └── sleepLessonContent.ts
├── docs/
│   ├── figma-entry-screen-tokens.json
│   └── figma-entry-screen-tokens.md
├── hooks/
│   ├── useEffectiveChronotype.ts
│   ├── useFrameworkReady.ts
│   └── useUserProfile.ts
├── lib/
│   ├── appVersion.ts
│   ├── chronotypeStoryShare.ts
│   ├── engagementNotificationCopy.ts
│   ├── engagementNotifications.ts
│   ├── programProgressMerge.ts
│   ├── pushNotifications.ts
│   ├── quizDevicePersistence.ts
│   ├── sessionToken.ts
│   ├── storage.ts
│   ├── subscriptionAccess.ts
│   ├── supabase.ts
│   ├── syncQuizCompletion.ts
│   └── webOgConstants.ts
├── public/
│   ├── og/
│   │   └── sono-plus.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── sw.js
├── screens/
│   ├── EntryScreen.tsx
│   ├── QuizGate.tsx
│   └── QuizScreen.tsx
├── scripts/
│   ├── expo-qr.mjs
│   ├── git-add-origin-and-push.sh
│   ├── prepare-vercel-dist-deploy.mjs
│   ├── print-vercel-ci-ids.mjs
│   ├── setup-privacy-cron-secrets.mjs
│   ├── start-android-with-emulator.sh
│   ├── start-ios-simple.sh
│   ├── sync-dotenv-to-vercel.mjs
│   ├── sync-remote-from-env.mjs
│   ├── validate-science-references.mjs
│   ├── verify-eas-production-env.mjs
│   ├── verify-env.mjs
│   └── verify-vercel-project.mjs
├── src/
│   ├── components/
│   │   ├── GhostButton.tsx
│   │   ├── PrimaryButton.tsx
│   │   └── ProgressBar.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── screens/
│       ├── CadastroScreen.tsx
│       ├── ChronotypModal.tsx
│       ├── EntryScreen.tsx
│       ├── entryScreenTokens.ts
│       ├── QuizScreen.tsx
│       ├── ResultScreen.tsx
│       └── StepsScreen.tsx
├── supabase/
│   ├── .temp/
│   │   ├── cli-latest
│   │   ├── gotrue-version
│   │   ├── linked-project.json
│   │   ├── pooler-url
│   │   ├── postgres-version
│   │   ├── project-ref
│   │   ├── rest-version
│   │   ├── storage-migration
│   │   └── storage-version
│   ├── functions/
│   │   ├── confirm-email/
│   │   │   └── index.ts
│   │   ├── create-payment-intent/
│   │   │   └── index.ts
│   │   ├── forgot-password/
│   │   │   └── index.ts
│   │   ├── generate-gift-code/
│   │   │   └── index.ts
│   │   ├── process-payment/
│   │   │   └── index.ts
│   │   ├── process-privacy-requests/
│   │   │   └── index.ts
│   │   ├── push-subscribe/
│   │   │   └── index.ts
│   │   ├── redeem-gift-code/
│   │   │   └── index.ts
│   │   ├── reset-password/
│   │   │   └── index.ts
│   │   ├── send-email/
│   │   │   └── index.ts
│   │   ├── send-push-notifications/
│   │   │   └── index.ts
│   │   ├── send-welcome-email-test/
│   │   │   └── index.ts
│   │   ├── signup/
│   │   │   └── index.ts
│   │   ├── test-welcome-email/
│   │   │   └── index.ts
│   │   └── vapid-key/
│   │       └── index.ts
│   ├── migrations/
│   │   ├── 20260225104237_create_gozzzz_schema.sql
│   │   ├── 20260304132752_fix_rls_performance_and_security.sql
│   │   ├── 20260304133422_add_index_user_progress_lesson_id.sql
│   │   ├── 20260312150356_20260312_fix_security_issues.sql.sql
│   │   ├── 20260317180343_add_gdpr_lgpd_consent_tables.sql
│   │   ├── 20260317192517_fix_profiles_rls_and_storage.sql
│   │   ├── 20260318160257_fix_rls_performance_duplicate_policies_and_indexes.sql
│   │   ├── 20260318161745_fix_security_indexes_and_policies.sql
│   │   ├── 20260318175157_fix_security_definer_search_path_and_missing_fk_indexes.sql
│   │   ├── 20260318195551_fix_rls_performance_indexes_and_anon_policies.sql
│   │   ├── 20260318212713_fix_indexes_and_anonymous_policies.sql
│   │   ├── 20260402172253_add_email_confirmation_flow.sql
│   │   ├── 20260402202452_20260402_setup_email_confirmation_trigger.sql
│   │   ├── 20260402203549_20260402_create_email_tokens_table.sql
│   │   ├── 20260403221100_fix_email_tokens_anonymous_access.sql
│   │   ├── 20260404132936_drop_broken_signup_email_trigger.sql
│   │   ├── 20260404134352_add_email_tokens_insert_policy.sql
│   │   ├── 20260404150724_add_password_reset_tokens_table.sql
│   │   ├── 20260404152837_fix_rls_performance_indexes_and_policies.sql
│   │   ├── 20260404161730_fix_unindexed_fks_rls_policies_and_unused_indexes.sql
│   │   ├── 20260405172717_enforce_gift_code_single_use.sql
│   │   ├── 20260409185216_add_session_token_to_profiles.sql
│   │   ├── 20260416180319_delete_user_gozzzztest.sql
│   │   ├── 20260417192859_backfill_missing_profiles_and_ensure_trigger.sql
│   │   ├── 20260419122854_add_push_notifications_tables.sql
│   │   ├── 20260419123630_enable_rls_push_tables.sql
│   │   ├── 20260419123858_add_deny_all_policies_push_tables.sql
│   │   ├── 20260419150914_add_chronotype_to_profiles.sql
│   │   ├── 20260419180238_delete_gozzzztest_account.sql
│   │   ├── 20260419190143_delete_gozzzztest_gmail_account.sql
│   │   ├── 20260419204923_delete_lannaolliveira_account.sql
│   │   ├── 20260419205422_delete_jose_and_gozzzztest_accounts.sql
│   │   ├── 20260419231233_delete_georgeascaetano_account.sql
│   │   ├── 20260419232700_delete_georgeascaetano_all_user_data.sql
│   │   ├── 20260419233311_delete_lannaolliveira_all_user_data.sql
│   │   ├── 20260420194347_20260420_add_platform_to_push_subscriptions.sql
│   │   ├── 20260424210328_delete_gozzzztest_gmail_all_data.sql
│   │   ├── 20260425184537_delete_suporte_gozzzztest_complete_data.sql
│   │   ├── 20260426101101_20260426_add_quiz_completed_to_profiles.sql
│   │   ├── 20260426120842_add_quiz_progress_to_profiles.sql
│   │   ├── 20260426125129_create_pricing_table.sql
│   │   ├── 20260427214007_20260427_revoke_security_definer_execute_permissions.sql
│   │   ├── 20260428163305_20260428_add_unique_constraint_profiles_user_id.sql
│   │   ├── 20260428165027_20260428_fix_quiz_completion_persistence.sql
│   │   ├── 20260428181729_20260428_add_quiz_save_trigger.sql
│   │   ├── 20260428183049_20260428_ensure_chronotype_persistence.sql
│   │   ├── 20260428183154_20260428_verify_quiz_completion_persistence.sql
│   │   ├── 20260428185243_20260428_permanent_quiz_completion_mobile_first.sql
│   │   ├── 20260501210500_grant_full_access_to_gozzzztest.sql
│   │   └── 20260502173000_grant_gozzzztest_full_program_sql.sql
│   └── config.toml
├── types/
│   ├── chronotype-share-modules.d.ts
│   ├── database.ts
│   ├── env.d.ts
│   └── masked-view.d.ts
├── utils/
│   └── platform.ts
├── .env
├── .env.backup-20260501-192719
├── .env.backup-20260501-192755
├── .env.example
├── .gitignore
├── .prettierrc
├── app.json
├── babel.config.js
├── CHANGELOG.md
├── CORRECOES_FINAIS.md
├── DEPLOY_GUIDE.md
├── eas.json
├── eslint.config.js
├── expo-env.d.ts
├── expo-qr-android.png
├── expo-qr-ios.png
├── expo-qr.png
├── gozzzz-sono-plus-CONTEUDO.md
├── gozzzz-sono-plus-LEITURA.html
├── gozzzz-sono-plus-standalone.html
├── gozzzz-sono-plus.html
├── HANDLER_FIXES_SUMMARY.md
├── LEGAL_COMPLIANCE.md
├── LESSON1_FEATURES.md
├── LESSON1_INTERACTIVE_CARD.md
├── MARKETING_GUIDE.md
├── metro.config.js
├── NAVIGATION_FLOW_FIXED.md
├── package-lock.json
├── package.json
├── PAYMENTS_GUIDE.md
├── QUIZ_PERSISTENCE_PERMANENT_FIX.md
├── README.md
├── SOLUCOES_FINAIS.md
├── sono-plus-fetched.html
├── SUPABASE_SETUP.md
├── TONE_LANGUAGE_CORRECTIONS_SUMMARY.md
├── TRANSLATION_FIX_PROMPT.md
├── TROUBLESHOOTING.md
├── tsconfig.json
├── vercel.json
└── WEB_MOBILE_GUIDE.md
```

---

## 2 e 3. Conteúdo completo dos arquivos-alvo + metadados por arquivo

Para cada arquivo abaixo:

- **Caminho completo**: caminho relativo ao root do repo.
- **Stack**: Expo SDK + Expo Router (file-based routing), React Native + React Native Web para `/web/*`.
- **Estado global**: quando aplicável, indicado por arquivo (Contexts React — ver `app/_layout.tsx`).
- **Pagamento**: Stripe via Supabase Edge Functions (`process-payment`, `create-payment-intent`); telas chamam essas funções ou redirecionam para Checkout Session.

### `app/web/index.tsx`

**Descrição no pedido de exportação:** Rota /web — landing principal

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/web/index.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Consome `useAuth`, `useLanguage`, `useEffectiveChronotype`, possivelmente outros hooks de perfil — estado via Context providers em `app/_layout.tsx`.

**Como o pagamento está integrado (neste arquivo):** Links/navegação para `/web/assinar` onde o pagamento é concluído; esta landing não processa cartão inline.

**Existe no disco:** sim

```tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Moon,
  Brain,
  Sun,
  Coffee,
  ArrowRight,
  Check,
  Crown,
  BookOpen,
  Heart,
  Shield,
  Lock,
  BadgeCheck,
  Calendar,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useEffectiveChronotype } from '@/hooks/useEffectiveChronotype';
import ChronotypePremiumWebFunnel from '@/components/web/chronotype/ChronotypePremiumWebFunnel';

const isWeb = Platform.OS === 'web';

const GOLD = '#d4a96a';
const GOLD_LIGHT = '#e8c99a';

function WebNav() {
  const router = useRouter();
  const { t } = useLanguage();
  const { width } = useWindowDimensions();
  const [scrolled, setScrolled] = useState(false);
  const showLinks = width >= 768;

  useEffect(() => {
    if (!isWeb) return;
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <View style={[styles.nav, scrolled && styles.navScrolled]}>
      <View style={styles.navInner}>
        <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <Moon size={24} color="#fbbf24" strokeWidth={2} />
          </div>
          <Text style={styles.navBrandText}>GoZzzz</Text>
        </TouchableOpacity>

        {showLinks ? (
          <View style={styles.navLinks}>
            <TouchableOpacity onPress={() => router.push('/web/programa')}>
              <Text style={styles.navLink}>{t('web.nav.program')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/coach')}>
              <Text style={styles.navLink}>{t('web.nav.coach')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sono-plus')}>
              <Text style={styles.navLink}>Sono+</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sobre')}>
              <Text style={styles.navLink}>{t('web.nav.about')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/assinar')} style={styles.navCta}>
              <Text style={styles.navCtaText}>{t('web.nav.subscribe')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => router.push('/web/assinar')} style={styles.navCta}>
            <Text style={styles.navCtaText}>{t('web.nav.subscribe')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default function WebLandingPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { profile } = useUserProfile();
  const chronotype = useEffectiveChronotype();
  const [hoveredPricingBtn, setHoveredPricingBtn] = useState<number | null>(null);
  const [hoveredCtaBtn, setHoveredCtaBtn] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const isDesktop = windowWidth >= 1024;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const testimonials = [
    {
      name: 'Ana Paula M.',
      role: t('web.testimonial.ana.role'),
      text: t('web.testimonial.ana.text'),
      result: t('web.testimonial.ana.result'),
      stars: 5,
    },
    {
      name: 'Carlos R.',
      role: t('web.testimonial.carlos.role'),
      text: t('web.testimonial.carlos.text'),
      result: t('web.testimonial.carlos.result'),
      stars: 5,
    },
  ];

  const steps = language === 'pt'
    ? [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Entenda Sua Biologia', desc: 'Aprenda como o ritmo circadiano funciona e por que o sono importa' },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Domine a Exposição à Luz', desc: 'Controle sua exposição à luz para otimizar seu relógio biológico' },
        { num: 3, icon: Coffee, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Otimize Seus Horários', desc: 'Aprenda quando comer, exercitar e descansar para dormir melhor' },
      ]
    : [
        { num: 1, icon: Brain, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Understand Your Biology', desc: 'Learn how your circadian rhythm works and why sleep matters' },
        { num: 2, icon: Sun, color: '#d4a96a', bg: 'rgba(212,169,106,0.12)', title: 'Master Light Exposure', desc: 'Control your light exposure to optimize your body clock' },
        { num: 3, icon: Coffee, color: '#10b981', bg: 'rgba(16,185,129,0.12)', title: 'Optimize Timing', desc: 'Learn when to eat, exercise, and rest for better sleep' },
      ];

  const sciencePillars = language === 'pt'
    ? [
        { icon: Brain, title: 'Arquitetura do Sono', desc: 'Baseado em pesquisas revisadas por pares sobre estágios do sono, biologia circadiana e consolidação da memória' },
        { icon: Sun, title: 'Ciência Circadiana', desc: 'Fundamentado em estudos publicados sobre exposição à luz, regulação da melatonina e otimização do relógio biológico' },
        { icon: Moon, title: 'Distúrbios do Sono', desc: 'Informado por pesquisas clínicas sobre insônia, privação de sono e medicina comportamental do sono' },
        { icon: Heart, title: 'Protocolos de Estilo de Vida', desc: 'Sintetiza evidências de ciência nutricional, fisiologia do exercício e literatura de gerenciamento do estresse' },
      ]
    : [
        { icon: Brain, title: 'Sleep Architecture', desc: 'Built on peer-reviewed research covering sleep stages, circadian biology, and memory consolidation' },
        { icon: Sun, title: 'Circadian Science', desc: 'Grounded in published studies on light exposure, melatonin regulation, and body-clock optimization' },
        { icon: Moon, title: 'Sleep Disorders', desc: 'Informed by clinical research on insomnia, sleep deprivation, and behavioral sleep medicine' },
        { icon: Heart, title: 'Lifestyle Protocols', desc: 'Synthesizes evidence from nutrition science, exercise physiology, and stress management literature' },
      ];

  const founderContent = language === 'pt'
    ? {
        label: 'HISTÓRIA DO FUNDADOR',
        headline: 'Por que eu criei o GoZzzz',
        paragraphs: [
          'Por quase 10 anos, eu mal conseguia dormir.\nTentei remédios, melatonina, meditação.\nNada funcionou de verdade.',
          'Então passei mais 10 anos estudando a ciência do sono — pesquisa por pesquisa, estudo por estudo. Walker, Huberman, Czeisler, Breus — mergulhei fundo em cada descoberta publicada.',
          'O GoZzzz é o programa que eu gostaria\nde ter encontrado no início dessa jornada.',
        ],
        signature: 'José Nilton, Fundador do GoZzzz',
        result: 'Hoje durmo 7-8 horas praticamente todas as noites.\nE você também pode.',
      }
    : {
        label: "FOUNDER'S STORY",
        headline: 'Why I Created GoZzzz',
        paragraphs: [
          'For almost 10 years, I could barely sleep.\nI tried medication, melatonin, meditation.\nNothing truly worked.',
          'Then I spent another 10 years studying the science of sleep — research by research, study by study. Walker, Huberman, Czeisler, Breus — I dove deep into every published finding.',
          'GoZzzz is the program I wish I had found\nat the beginning of that journey.',
        ],
        signature: 'José Nilton, Founder of GoZzzz',
        result: 'Today I sleep 7–8 hours on virtually every night.\nAnd you can too.',
      };

  const dynamicStyles = useMemo(() => {
    const contentMax = 1100;
    const pad = 48;
    const usable = Math.min(windowWidth - pad, contentMax);

    return {
      problemItemWidth: isDesktop
        ? (usable - 32) / 3
        : isTablet
          ? (usable - 16) / 2
          : windowWidth - pad,
      stepCardWidth: isDesktop
        ? (usable - 40) / 3
        : isTablet
          ? (usable - 20) / 2
          : windowWidth - pad,
      expertCardWidth: isDesktop
        ? (usable - 60) / 4
        : isTablet
          ? (usable - 40) / 3
          : windowWidth - pad,
    };
  }, [windowWidth, isDesktop, isTablet]);

  return (
    <>
      <Head>
        <title>{t('web.meta.home.title')}</title>
        <meta name="description" content={t('web.meta.home.description')} />
        <meta name="keywords" content="sono, insônia, dormir melhor, sono profundo, ciência do sono, programa de sono, higiene do sono" />
        <meta property="og:title" content={t('web.meta.home.title')} />
        <meta property="og:description" content={t('web.meta.home.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozzzz.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('web.meta.home.title')} />
        <meta name="twitter:description" content={t('web.meta.home.description')} />
        <link rel="canonical" href="https://gozzzz.app" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GoZzzz",
          "url": "https://gozzzz.app",
          "description": t('web.meta.home.description'),
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gozzzz.app/web/programa"
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Course",
          "name": t('web.meta.home.title'),
          "description": t('web.meta.home.description'),
          "provider": {
            "@type": "Organization",
            "name": "GoZzzz",
            "url": "https://gozzzz.app"
          },
          "numberOfCredits": "21"
        })}</script>
      </Head>
      <ScrollView
        style={styles.page}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrollY(e.nativeEvent.contentOffset.y)}
        scrollEventThrottle={16}
      >
        <WebNav />

        {chronotype &&
          (() => {
            const badges: Record<string, { pt: string; en: string }> = {
              dolphin: { pt: 'Plano 🐬 Golfinho', en: '🐬 Dolphin Plan' },
              lion: { pt: 'Plano 🦁 Leão', en: '🦁 Lion Plan' },
              bear: { pt: 'Plano 🐻 Urso', en: '🐻 Bear Plan' },
              wolf: { pt: 'Plano 🐺 Lobo', en: '🐺 Wolf Plan' },
            };
            const label = badges[chronotype]?.[language] ?? null;
            if (!label) return null;
            return (
              <View style={styles.chronotypeBanner}>
                <Text style={styles.chronotypeBadgeText}>{label}</Text>
              </View>
            );
          })()}

        <ChronotypePremiumWebFunnel scrollY={scrollY} />

      {/* PROBLEM */}
      <View style={styles.problemSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.problem.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.problem.title')}</Text>
          <View style={styles.problemGrid}>
            {[
              t('web.problem.item1'),
              t('web.problem.item2'),
              t('web.problem.item3'),
              t('web.problem.item4'),
              t('web.problem.item5'),
              t('web.problem.item6'),
            ].map((item, i) => (
              <View key={i} style={[styles.problemItem, { width: dynamicStyles.problemItemWidth }]}>
                <Text style={styles.problemDot}>✕</Text>
                <Text style={styles.problemText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* SOLUTION */}
      <LinearGradient colors={['#07070f', '#0d0d16']} style={styles.solutionSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.solution.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.solution.title')}</Text>
          <Text style={styles.sectionDesc}>{t('web.solution.desc')}</Text>

          <View style={styles.stepsGrid}>
            {steps.map((step) => (
              <View key={step.num} style={[styles.stepCard, { width: dynamicStyles.stepCardWidth }]}>
                <View style={[styles.stepIcon, { backgroundColor: step.bg }]}>
                  <step.icon size={28} color={step.color} />
                </View>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{language === 'pt' ? 'Passo' : 'Step'} {step.num}</Text>
                </View>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
                <TouchableOpacity
                  style={styles.stepLink}
                  onPress={() => router.push('/web/programa')}
                >
                  <Text style={styles.stepLinkText}>{language === 'pt' ? 'Ver Mais' : 'View More'}</Text>
                  <ArrowRight size={14} color="#d4a96a" />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/web/programa')}>
            <BookOpen size={18} color="#07070f" />
            <Text style={styles.viewAllBtnText}>{t('web.solution.viewAll')}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* SCIENCE METHODOLOGY */}
      <View style={styles.expertsSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{language === 'pt' ? 'NOSSA METODOLOGIA' : 'OUR METHODOLOGY'}</Text>
          <Text style={styles.sectionTitle}>{language === 'pt' ? 'Baseado em Ciência Publicada' : 'Built on Published Science'}</Text>
          <Text style={styles.sectionDesc}>{t('about.credibilityLine')}</Text>
          <View style={styles.expertsGrid}>
            {sciencePillars.map((p, i) => (
              <View key={i} style={[styles.expertCard, { width: dynamicStyles.expertCardWidth }]}>
                <View style={styles.expertAvatar}>
                  <p.icon size={24} color="#fbbf24" />
                </View>
                <Text style={styles.expertName}>{p.title}</Text>
                <Text style={styles.expertRole}>{p.desc}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push('/web/sobre')}>
            <BookOpen size={18} color="#07070f" />
            <Text style={styles.viewAllBtnText}>{language === 'pt' ? 'Sobre Nossa Metodologia' : 'About Our Methodology'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* TESTIMONIALS */}
      <LinearGradient colors={['#0a0a12', '#0f0f1a']} style={styles.testimonialsSection}>
        <View style={styles.container}>
          <Text style={styles.testimonialsSectionLabel}>{t('web.testimonials.label')}</Text>
          <Text style={styles.testimonialsSectionTitle}>{t('web.testimonials.title')}</Text>
          <View style={[styles.testimonialsGrid, !isDesktop && !isTablet && { flexDirection: 'column' as const }]}>
            {testimonials.map((item, i) => (
              <View key={i} style={styles.testimonialCard}>
                <Text style={styles.testimonialBigQuote}>&quot;</Text>
                <Text style={styles.testimonialText}>{item.text}</Text>
                <View style={styles.testimonialDivider} />
                <View style={styles.testimonialFooter}>
                  <View style={styles.testimonialAuthorBlock}>
                    <View style={styles.testimonialAvatar}>
                      <Text style={styles.testimonialAvatarText}>{item.name[0]}</Text>
                    </View>
                    <View>
                      <Text style={styles.testimonialName}>{item.name}</Text>
                      <Text style={styles.testimonialRole}>{item.role}</Text>
                    </View>
                  </View>
                  <View style={styles.testimonialResultBadge}>
                    <Text style={styles.testimonialResultText}>{item.result}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      {/* PRICING */}
      <View style={styles.pricingSection}>
        <View style={styles.container}>
          <Text style={styles.sectionLabel}>{t('web.pricing.label')}</Text>
          <Text style={styles.sectionTitle}>{t('web.pricing.title')}</Text>

          <View style={styles.pricingGrid}>
            <View style={[styles.pricingCard, styles.pricingCardFeatured]}>
              <View style={styles.pricingBadge}>
                <Crown size={12} color="#ffffff" />
                <Text style={styles.pricingBadgeText}>{language === 'pt' ? 'ACESSO VITALÍCIO' : 'LIFETIME ACCESS'}</Text>
              </View>
              <Text style={[styles.pricingPlanName, { color: '#ffffff' }]}>{language === 'pt' ? 'Acesso Completo' : 'Complete Access'}</Text>
              <View style={styles.pricingAmount}>
                <Text style={[styles.pricingCurrency, { color: GOLD }]}>{t('web.pricing.annual.currency')}</Text>
                <Text style={[styles.pricingPrice, { color: '#ffffff' }]}>{t('web.pricing.annual.amount')}{t('web.pricing.annual.cents')}</Text>
              </View>
              <Text style={[styles.pricingPeriod, { color: 'rgba(255,255,255,0.65)' }]}>{language === 'pt' ? 'pagamento único' : 'one-time payment'}</Text>
              <TouchableOpacity
                style={[
                  styles.pricingFilledBtn,
                  hoveredPricingBtn === 1 && styles.pricingFilledBtnHovered,
                ]}
                onPress={() => router.push('/web/assinar')}
                {...(isWeb ? {
                  onMouseEnter: () => setHoveredPricingBtn(1),
                  onMouseLeave: () => setHoveredPricingBtn(null),
                } : {})}
              >
                <Text style={styles.pricingFilledBtnText}>
                  {t('web.hero.startNow')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.pricingFeatures}>
            {[
              t('web.pricing.feature1'),
              t('web.pricing.feature2'),
              t('web.pricing.feature3'),
              t('web.pricing.feature5'),
            ].map((f, i) => (
              <View key={i} style={styles.pricingFeatureItem}>
                <View style={styles.pricingFeatureCheck}>
                  <Check size={14} color="#10b981" />
                </View>
                <Text style={styles.pricingFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* DISCLAIMER */}
      <View style={styles.disclaimerSection}>
        <View style={styles.container}>
          <View style={styles.disclaimerBox}>
            <Shield size={20} color="#64748b" />
            <Text style={styles.disclaimerTitle}>{t('web.disclaimer.title')}</Text>
            <Text style={styles.disclaimerText}>{t('web.disclaimer.text')}</Text>
          </View>
        </View>
      </View>

      {/* FINAL CTA */}
      <View style={styles.ctaSection}>
        {isWeb && <View style={styles.ctaRadialGlow} />}
        <View style={styles.container}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.ctaTitle}>{t('web.cta.title')}</Text>
            <Text style={styles.ctaSubtitle}>{t('web.cta.subtitle')}</Text>
            <TouchableOpacity
              style={[styles.ctaBtn, hoveredCtaBtn && styles.ctaBtnHovered]}
              onPress={() => router.push('/web/assinar')}
              {...(isWeb ? {
                onMouseEnter: () => setHoveredCtaBtn(true),
                onMouseLeave: () => setHoveredCtaBtn(false),
              } : {})}
            >
              <Calendar size={20} color="#1e293b" />
              <Text style={styles.ctaBtnText}>{t('web.cta.btn')}</Text>
              <ArrowRight size={20} color="#1e293b" />
            </TouchableOpacity>
            <View style={styles.securityBadgesRow}>
              <Lock size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>{t('payment.ssl')}</Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <Shield size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>{t('payment.pciDss')}</Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <BadgeCheck size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>
                {t('payment.secureCheckout')}
              </Text>
              <Text style={styles.securityBadgeDot}>·</Text>
              <Heart size={13} color={GOLD} />
              <Text style={styles.securityBadgeText}>
                {language === 'pt' ? 'Garantia de 7 Dias' : '7-Day Satisfaction Guarantee'}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* FOUNDER MOMENT */}
      <View style={styles.founderSection}>
        <View style={styles.container}>
          <View style={styles.founderCard}>
            <Text style={styles.founderLabel}>{founderContent.label}</Text>
            <Text style={styles.founderHeadline}>{founderContent.headline}</Text>

            <View style={styles.founderDividerTop} />

            <View style={styles.founderBody}>
              {founderContent.paragraphs.map((para, i) => (
                <Text key={i} style={styles.founderParagraph}>{para}</Text>
              ))}
            </View>

            <View style={styles.founderSignatureRow}>
              <View style={styles.founderAvatarCircle}>
                <Text style={styles.founderAvatarInitial}>J</Text>
              </View>
              <View style={styles.founderSignatureBlock}>
                <Text style={styles.founderSignature}>{founderContent.signature}</Text>
              </View>
            </View>

            <View style={styles.founderResultBox}>
              <Text style={styles.founderResultText}>{founderContent.result}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerInner}>
          <Text style={styles.footerBrandText}>GoZzzz</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => router.push('/web/programa')}>
              <Text style={styles.footerLink}>{t('web.nav.program')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/coach')}>
              <Text style={styles.footerLink}>{t('web.nav.coach')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/sobre')}>
              <Text style={styles.footerLink}>{t('web.nav.about')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/web/assinar')}>
              <Text style={styles.footerLink}>{t('web.nav.subscribe')}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerLegalLinks}>
            <TouchableOpacity onPress={() => router.push(language === 'pt' ? '/privacy' : '/privacy-en')}>
              <Text style={styles.footerLegalLink}>{language === 'pt' ? 'Privacidade' : 'Privacy'}</Text>
            </TouchableOpacity>
            <Text style={styles.footerLegalSep}>·</Text>
            <TouchableOpacity onPress={() => router.push(language === 'pt' ? '/terms' : '/terms-en')}>
              <Text style={styles.footerLegalLink}>{language === 'pt' ? 'Termos' : 'Terms'}</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.footerCopy}>
            {t('web.footer.copyright')}
          </Text>
        </View>
      </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#07070f' },

  nav: {
    position: isWeb ? ('fixed' as any) : 'relative',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
    transition: isWeb ? 'background-color 0.4s ease, box-shadow 0.4s ease' : undefined,
  } as any,
  navScrolled: {
    backgroundColor: 'rgba(15,23,42,0.96)',
    boxShadow: isWeb ? '0 2px 20px rgba(0,0,0,0.3)' : undefined,
    backdropFilter: isWeb ? 'blur(12px)' : undefined,
  } as any,
  navInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
    paddingVertical: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  navBrand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBrandText: { fontSize: 22, fontWeight: '800', color: '#ffffff', letterSpacing: 1 },
  navLinks: { flexDirection: 'row', alignItems: 'center', gap: 32 },
  navLink: {
    fontSize: 15,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  navCta: {
    backgroundColor: '#fbbf24',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    transition: isWeb ? 'transform 0.3s ease, opacity 0.3s ease' : undefined,
  } as any,
  navCtaText: { fontSize: 14, fontWeight: '700', color: '#1e293b' },

  chronotypeBanner: {
    backgroundColor: '#7c6fff',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  chronotypeBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },

  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },

  problemSection: { paddingVertical: 80, backgroundColor: '#0d0d16' },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#d4a96a',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: isWeb ? 48 : 36,
  },
  sectionDesc: {
    fontSize: 17,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 680,
    alignSelf: 'center',
    marginBottom: 48,
  },
  problemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 40,
    justifyContent: 'center',
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  problemItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#12121e',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    transition: isWeb ? 'box-shadow 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  problemDot: { fontSize: 16, color: '#ef4444', fontWeight: '700' },
  problemText: { fontSize: 15, color: '#8892a4', lineHeight: 22, flex: 1 },

  solutionSection: { paddingVertical: 80 },
  stepsGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  stepCard: {
    backgroundColor: '#12121e',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepBadge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  stepBadgeText: { fontSize: 12, fontWeight: '700', color: '#d4a96a' },
  stepTitle: { fontSize: 20, fontWeight: '700', color: '#e8d5b7', marginBottom: 10 },
  stepDesc: { fontSize: 15, color: '#8892a4', lineHeight: 22, marginBottom: 20 },
  stepLink: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  stepLinkText: { fontSize: 14, fontWeight: '600', color: '#d4a96a' },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#d4a96a',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 40,
    transition: isWeb ? 'transform 0.3s ease' : undefined,
  } as any,
  viewAllBtnText: { fontSize: 16, fontWeight: '700', color: '#07070f' },

  expertsSection: { paddingVertical: 80, backgroundColor: '#0d0d16' },
  expertsGrid: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 40,
    width: '100%',
    maxWidth: 1100,
    alignSelf: 'center',
  },
  expertCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.15)',
    borderTopWidth: 3,
    borderTopColor: '#d4a96a',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  expertAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(212,169,106,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  expertName: { fontSize: 16, fontWeight: '700', color: '#e8d5b7', textAlign: 'center', marginBottom: 6 },
  expertRole: { fontSize: 13, color: '#8892a4', textAlign: 'center', lineHeight: 18 },

  testimonialsSection: { paddingVertical: 88 },
  testimonialsSectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 12,
    textAlign: 'center',
  },
  testimonialsSectionTitle: {
    fontSize: isWeb ? 40 : 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: isWeb ? 50 : 36,
  },
  testimonialsGrid: {
    flexDirection: 'row',
    gap: 24,
    maxWidth: 1100,
    alignSelf: 'center',
    width: '100%',
  },
  testimonialCard: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 36,
    borderWidth: 1,
    borderColor: `rgba(212,169,106,0.18)`,
    transition: isWeb ? 'border-color 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  testimonialBigQuote: {
    fontSize: 80,
    color: GOLD,
    lineHeight: 60,
    fontWeight: '800',
    opacity: 0.45,
    marginBottom: 8,
  },
  testimonialText: {
    fontSize: isWeb ? 18 : 16,
    color: '#c8b89a',
    lineHeight: 30,
    fontStyle: 'italic',
    marginBottom: 28,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  testimonialDivider: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.2)',
    marginBottom: 20,
  },
  testimonialFooter: {
    flexDirection: isWeb ? 'row' : 'column',
    alignItems: isWeb ? 'center' : 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  } as any,
  testimonialAuthorBlock: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  testimonialAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialAvatarText: { fontSize: 18, fontWeight: '800', color: '#07070f' },
  testimonialName: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  testimonialRole: { fontSize: 13, color: '#8892a4' },
  testimonialResultBadge: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.28)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  testimonialResultText: { fontSize: 12, color: GOLD_LIGHT, fontWeight: '600' },

  pricingSection: { paddingVertical: 80 },
  pricingGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    flexWrap: 'wrap',
  } as any,
  pricingCard: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 32,
    width: isWeb ? 400 : '100%',
    maxWidth: 440,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  pricingCardFeatured: {
    backgroundColor: '#0f172a',
    borderColor: GOLD,
    boxShadow: isWeb ? `0 8px 32px rgba(212,169,106,0.18)` : undefined,
    transform: [{ scale: isWeb ? 1.05 : 1 }],
  } as any,
  pricingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: GOLD,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 20,
  },
  pricingBadgeText: { fontSize: 12, fontWeight: '700', color: '#07070f' },
  pricingPlanName: { fontSize: 18, fontWeight: '700', color: '#e8d5b7', marginBottom: 12 },
  pricingAmount: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 4 },
  pricingCurrency: { fontSize: 20, fontWeight: '700', color: '#d4a96a', marginBottom: 6 },
  pricingPrice: { fontSize: 56, fontWeight: '800', color: '#e8d5b7', lineHeight: 60 },
  pricingCents: { fontSize: 24, fontWeight: '700', color: '#d4a96a', marginBottom: 8 },
  pricingPeriod: { fontSize: 14, color: '#8892a4', marginBottom: 20, textAlign: 'center' },
  pricingSavings: {
    backgroundColor: 'rgba(212,169,106,0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.25)',
  },
  pricingSavingsText: { fontSize: 13, fontWeight: '700', color: '#d4a96a' },

  pricingGhostBtn: {
    borderWidth: 1.5,
    borderColor: GOLD,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    transition: isWeb ? 'background-color 0.3s ease' : undefined,
  } as any,
  pricingGhostBtnHovered: {
    backgroundColor: GOLD,
  },
  pricingGhostBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: GOLD,
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  pricingGhostBtnTextHovered: {
    color: '#07070f',
  },
  pricingFilledBtn: {
    backgroundColor: GOLD,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    transition: isWeb ? 'opacity 0.3s ease, transform 0.3s ease' : undefined,
  } as any,
  pricingFilledBtnHovered: {
    opacity: 0.88,
    transform: [{ scale: 1.02 }],
  },
  pricingFilledBtnText: { fontSize: 15, fontWeight: '700', color: '#07070f' },

  pricingFeatures: { marginTop: 40, gap: 12, maxWidth: 400, alignSelf: 'center', width: '100%' },
  pricingFeatureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  pricingFeatureCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingFeatureText: { fontSize: 15, color: '#8892a4' },

  disclaimerSection: { paddingVertical: 32, backgroundColor: '#07070f' },
  disclaimerBox: {
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: '#12121e',
    alignItems: 'center',
    gap: 8,
  },
  disclaimerTitle: { fontSize: 13, fontWeight: '700', color: '#4a5568', textTransform: 'uppercase', letterSpacing: 1 },
  disclaimerText: { fontSize: 12, color: '#8892a4', lineHeight: 20, textAlign: 'center', maxWidth: 700 },

  ctaSection: {
    paddingVertical: 100,
    alignItems: 'center',
    backgroundColor: '#07070f',
    overflow: 'hidden',
    position: 'relative',
  },
  ctaRadialGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 800,
    height: 800,
    borderRadius: 400,
    transform: [{ translateX: -400 }, { translateY: -400 }],
    backgroundImage: isWeb ? 'radial-gradient(ellipse at center, rgba(212,169,106,0.1) 0%, rgba(212,169,106,0.04) 40%, transparent 68%)' : undefined,
    pointerEvents: 'none',
  } as any,
  ctaTitle: {
    fontSize: isWeb ? 48 : 32,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: isWeb ? 58 : 42,
    marginBottom: 18,
    maxWidth: 680,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  ctaSubtitle: {
    fontSize: 18,
    color: '#8892a4',
    textAlign: 'center',
    marginBottom: 44,
    lineHeight: 28,
    maxWidth: 520,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingHorizontal: 44,
    paddingVertical: 20,
    borderRadius: 14,
    marginBottom: 28,
    transition: isWeb ? 'transform 0.3s ease, box-shadow 0.3s ease' : undefined,
  } as any,
  ctaBtnHovered: {
    transform: [{ scale: 1.04 }],
    boxShadow: isWeb ? `0 8px 32px rgba(212,169,106,0.4)` : undefined,
  } as any,
  ctaBtnText: { fontSize: 18, fontWeight: '800', color: '#07070f' },

  securityBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  securityBadgeText: { fontSize: 13, color: '#8892a4' },
  securityBadgeDot: { fontSize: 13, color: '#4a5568' },

  founderSection: {
    paddingVertical: 80,
    backgroundColor: '#080810',
  },
  founderCard: {
    backgroundColor: '#0e0e1c',
    borderRadius: 24,
    padding: isWeb ? 56 : 32,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.18)',
    maxWidth: 780,
    alignSelf: 'center',
    width: '100%',
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    boxShadow: isWeb ? '0 4px 60px rgba(212,169,106,0.07)' : undefined,
  } as any,
  founderLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: GOLD,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 18,
    textAlign: 'center',
  },
  founderHeadline: {
    fontSize: isWeb ? 36 : 26,
    fontWeight: '800',
    color: '#e8d5b7',
    textAlign: 'center',
    lineHeight: isWeb ? 46 : 34,
    marginBottom: 32,
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
  } as any,
  founderDividerTop: {
    height: 1,
    backgroundColor: 'rgba(212,169,106,0.15)',
    marginBottom: 36,
  },
  founderBody: {
    gap: 20,
    marginBottom: 40,
  },
  founderParagraph: {
    fontSize: isWeb ? 18 : 16,
    color: '#a8b3c4',
    lineHeight: isWeb ? 30 : 26,
    textAlign: 'center',
    fontFamily: isWeb ? 'Georgia, "Times New Roman", serif' : undefined,
    fontStyle: 'italic',
  } as any,
  founderSignatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 36,
  },
  founderAvatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: GOLD,
    justifyContent: 'center',
    alignItems: 'center',
  },
  founderAvatarInitial: {
    fontSize: 22,
    fontWeight: '800',
    color: '#07070f',
  },
  founderSignatureBlock: {
    gap: 2,
  },
  founderSignature: {
    fontSize: isWeb ? 22 : 18,
    color: GOLD,
    fontFamily: isWeb ? '"Brush Script MT", "Segoe Script", cursive' : undefined,
    letterSpacing: 0.5,
  } as any,
  founderResultBox: {
    backgroundColor: 'rgba(212,169,106,0.07)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.2)',
    paddingVertical: 20,
    paddingHorizontal: 28,
    alignItems: 'center',
  },
  founderResultText: {
    fontSize: isWeb ? 18 : 16,
    color: '#e8d5b7',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: isWeb ? 28 : 24,
  },

  footer: { backgroundColor: '#07070f', paddingVertical: 44, borderTopWidth: 1, borderTopColor: 'rgba(212,169,106,0.12)' },
  footerInner: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24, alignItems: 'center', gap: 20 },
  footerBrandText: { fontSize: 22, fontWeight: '800', color: GOLD, letterSpacing: 1.5 },
  footerLinks: { flexDirection: 'row', gap: 24, flexWrap: 'wrap', justifyContent: 'center' },
  footerLink: {
    fontSize: 14,
    color: '#8892a4',
    fontWeight: '500',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  footerLegalLinks: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' },
  footerLegalLink: {
    fontSize: 13,
    color: '#4a5568',
    fontWeight: '500',
    transition: isWeb ? 'color 0.3s ease' : undefined,
  } as any,
  footerLegalSep: { fontSize: 13, color: '#374151' },
  footerCopy: { fontSize: 12, color: '#374151', textAlign: 'center', letterSpacing: 0.3 },
});
```

---

### `app/web/sono-plus.tsx`

**Descrição no pedido de exportação:** Rota /web/sono-plus

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/web/sono-plus.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** `useLanguage`, `useRouter`, estado local React (`useState`) para pricing; Supabase read opcional para preço.

**Como o pagamento está integrado (neste arquivo):** Links/navegação para `/web/assinar` onde o pagamento é concluído; esta landing não processa cartão inline.

**Existe no disco:** sim

```tsx
import { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import Head from 'expo-router/head';
import { useRouter, Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calendar,
  Check,
  Crown,
  MessageCircle,
  Moon,
  Lock,
  BadgeCheck,
  Shield,
  Sparkles,
  Sunrise,
  Zap,
} from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import { LESSONS_DATA } from '@/data/lessons';
import { supabase } from '@/lib/supabase';
import { ResearcherTrustBlock } from '@/components/ResearcherTrustBlock';

const isWeb = Platform.OS === 'web';
const WHATSAPP = 'https://wa.me/5511982820759?text=SONO';

const GOLD = '#d4a96a';
const GOLD_DIM = 'rgba(212,169,106,0.14)';
const BG = '#07070f';
const BG_CARD = '#12121e';
const TEXT_MAIN = '#e8e5df';
const TEXT_MUTED = '#94a3b8';
const NAV_H = 56;

interface PricingAnnual {
  price: number;
  label: string;
  equiv: string;
  note: string;
}
interface PricingData {
  currency: string;
  symbol: string;
  annual: PricingAnnual;
}
const DEFAULT_WEB_PRICING: Record<'pt' | 'en', PricingData> = {
  pt: {
    currency: 'BRL',
    symbol: 'R$',
    annual: { price: 147, label: 'R$ 147', equiv: 'acesso vitalício', note: 'pagamento único' },
  },
  en: {
    currency: 'USD',
    symbol: '$',
    annual: { price: 24.99, label: '$24.99', equiv: 'lifetime access', note: 'one-time payment' },
  },
};

/** Landing web: programa 21 passos como produto principal; Sono+ como opcional premium. Sem depoimentos inventados. */
export default function SonoPlusLandingPage() {
  const router = useRouter();
  const { t: translate } = useLanguage();
  const language: 'pt' = 'pt';
  const t = (key: string) => translate(key, 'pt');
  const isPt = true;
  const [pricing, setPricing] = useState<PricingData>(DEFAULT_WEB_PRICING[language]);

  const openWhatsApp = () => Linking.openURL(WHATSAPP);

  useEffect(() => {
    (async () => {
      try {
        const currencyMap = { pt: 'BRL', en: 'USD' } as const;
        const currency = currencyMap[language];
        const { data } = await (supabase.from('pricing') as any)
          .select('price, label, equiv, note')
          .eq('plan_type', 'annual')
          .eq('currency', currency)
          .maybeSingle();
        if (data) {
          setPricing({
            currency,
            symbol: language === 'pt' ? 'R$' : '$',
            annual: {
              price: data.price,
              label: data.label,
              equiv: data.equiv,
              note: data.note,
            },
          });
        }
      } catch {
        setPricing(DEFAULT_WEB_PRICING[language]);
      }
    })();
  }, [language]);

  const headTitle = isPt
    ? 'Programa de Sono em 21 Passos | GoZzzz — Baseado em Neurociência'
    : 'GoZzzz | 21-step sleep program — structured, evidence-guided';

  const headDesc = isPt
    ? 'Trilha de 21 passos para reorganizar sono, ritmo circadiano e rotina — com base em pesquisa de Walker, Huberman, Czeisler e Breus. 3 primeiras lições gratuitas. Acesso vitalício por R$ 147.'
    : 'A 21-step path to reorganize sleep, rhythm, and routine — start with 3 free lessons. Sono+: optional live consulting.';

  const headOgDesc = isPt
    ? '21 passos baseados em neurociência para quem quer parar de adivinhar e começar a dormir de verdade. 3 lições grátis. R$ 147 pagamento único.'
    : 'A 21-step path to reorganize sleep, rhythm, and routine — 3 free lessons.';

  const headTwitterDesc = isPt
    ? '21 passos baseados em neurociência. 3 lições grátis. R$ 147 acesso vitalício.'
    : '21-step program. 3 free lessons. Lifetime access.';

  const previewLessons = useMemo(() => {
    return [...LESSONS_DATA]
      .sort((a, b) => a.step_number - b.step_number)
      .slice(0, 8)
      .map((l) => ({
        id: l.id,
        num: l.step_number,
        title: language === 'pt' ? l.title_pt : l.title_en,
        free: l.step_number <= 3,
      }));
  }, [language]);

  const faq = [
    {
      question: 'O que são exatamente os 21 passos?',
      answer:
        'Uma sequência guiada: cada passo traduz princípios de ciência do sono em ações concretas para o dia seguinte — em blocos que cobrem entender o seu padrão, reconstruir hábitos e consolidar resultados.',
    },
    {
      question: 'Posso experimentar antes de assinar?',
      answer:
        'Sim. As 3 primeiras lições são gratuitas para você sentir o ritmo e a clareza do método.',
    },
    {
      question: 'O que é Sono+ em relação ao programa?',
      answer:
        'O programa cobre o percurso completo na app/web. Sono+ é a linha opcional de acompanhamento ao vivo — uma sessão de diagnóstico de 60 minutos com plano personalizado e relatório entregue em 72h.',
    },
    {
      question: 'Isso substitui acompanhamento médico?',
      answer:
        'Não. Conteúdo e consultoria comportamental são educativos — não fazem diagnóstico nem prescrevem tratamento médico.',
    },
  ];

  const socialImageUrl = 'https://gozzzz.app/og/sono-plus.png';

  // Combined @graph schema: Product (with offer + price), FAQPage, BreadcrumbList.
  // priceValidUntil is required by Google's Merchant Listings; bumped yearly.
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: 'Programa de Sono em 21 Passos — GoZzzz',
        description:
          'Trilha de 21 passos para reorganizar sono, ritmo circadiano e rotina com base em neurociência do sono.',
        url: 'https://gozzzz.app/web/sono-plus',
        image: socialImageUrl,
        brand: { '@type': 'Brand', name: 'GoZzzz' },
        offers: {
          '@type': 'Offer',
          price: '147.00',
          priceCurrency: 'BRL',
          availability: 'https://schema.org/InStock',
          priceValidUntil: '2026-12-31',
          url: 'https://gozzzz.app/web/sono-plus',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'GoZzzz', item: 'https://gozzzz.app/web' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Programa 21 Passos',
            item: 'https://gozzzz.app/web/sono-plus',
          },
        ],
      },
    ],
  };

  const heroProof = [
    `21 ${t('web.program.steps')}`,
    `3 ${t('web.program.freeLessons')}`,
    isPt ? '~5 min por passo' : t('web.program.pillApproxStep'),
    isPt ? 'R$ 147 acesso vitalício' : t('web.badge.scienceBased'),
  ];

  const programPathSteps = [
    t('web.program.path1'),
    t('web.program.path2'),
    t('web.program.path3'),
  ];

  const curiosity = isPt
    ? [
        {
          Ico: Brain,
          title: 'Por que a mente não “desliga”?',
          sub: 'Pressão do sono, alerta noturno e ritmo circadiano — em linguagem que você aplica na rotina.',
        },
        {
          Ico: Zap,
          title: 'O que realmente muda o seu descanso',
          sub: 'Passos pequenos, repetíveis, com foco no que a literatura costuma priorizar primeiro.',
        },
        {
          Ico: Sunrise,
          title: 'Manhã que puxa a noite',
          sub: 'Luz, horários e transição — encadeados para você sentir diferença sem virar fanatismo.',
        },
        {
          Ico: Shield,
          title: 'Sem promessa mágica',
          sub: 'Método + consistência. Educação de sono, não substituto de avaliação clínica quando necessário.',
        },
      ]
    : [
        {
          Ico: Brain,
          title: 'Why your mind will not switch off',
          sub: 'Sleep pressure, nighttime vigilance, and circadian timing — translated into daily moves.',
        },
        {
          Ico: Zap,
          title: 'What actually moves the needle',
          sub: 'Small, repeatable steps aligned with what sleep science usually prioritizes first.',
        },
        {
          Ico: Sunrise,
          title: 'Morning shapes the night',
          sub: 'Light, timing, and wind-down — chained so change feels realistic, not extreme.',
        },
        {
          Ico: Shield,
          title: 'No fairy-tale promises',
          sub: 'Method + consistency. Sleep education — not a replacement for clinical care when needed.',
        },
      ];

  const acts = [
    { range: '1–7', title: 'Ato 1 · Mapear', desc: 'Entender ciclos, cronotipo, dívida de sono e o que fragmenta o seu descanso.' },
    { range: '8–14', title: 'Ato 2 · Reconstruir', desc: 'Protocolos práticos — luz, temperatura, rotina e hábitos — um de cada vez.' },
    { range: '15–21', title: 'Ato 3 · Consolidar', desc: 'Fechar o ciclo: manter ganhos, ajustar o que falha e fixar um ritmo sustentável.' },
  ];

  const benefitLines = [
    'Menos fragmentação durante a noite',
    'Rotina guiada dia a dia',
    'Ciência aplicada ao que você faz em casa',
    'Clareza para ajustar o que não funciona',
  ];

  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content={headDesc} />
        <meta
          name="keywords"
          content={
            isPt
              ? 'programa sono 21 passos, como dormir melhor, insônia solução, ritmo circadiano, cronotipo, dívida de sono, neurociência do sono, sono profundo, GoZzzz'
              : '21 step sleep program, insomnia, sleep better, sleep science, gozzzz, optional sono plus'
          }
        />
        <meta property="og:title" content={isPt ? 'Programa de Sono em 21 Passos | GoZzzz' : headTitle} />
        <meta property="og:description" content={headOgDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gozzzz.app/web/sono-plus" />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:alt" content="GoZzzz - Programa de Sono em 21 Passos baseado em neurociência" />
        <meta property="og:locale" content={isPt ? 'pt_BR' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isPt ? 'Programa de Sono em 21 Passos | GoZzzz' : headTitle} />
        <meta name="twitter:description" content={headTwitterDesc} />
        <meta name="twitter:image" content={socialImageUrl} />
        <meta
          name="robots"
          content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        />
        <link rel="canonical" href="https://gozzzz.app/web/sono-plus" />
        <link rel="alternate" hrefLang="pt-BR" href="https://gozzzz.app/web/sono-plus" />
        <link rel="alternate" hrefLang="x-default" href="https://gozzzz.app/web/sono-plus" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Head>

      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* Nav — alinhado a /web/assinar */}
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.navGrad}>
          <View style={styles.navInner}>
            <Link href="/web" asChild>
              <TouchableOpacity style={styles.brand} accessibilityRole="link">
                <Moon size={22} color="#fbbf24" strokeWidth={2} />
                <Text style={styles.brandText}>GoZzzz</Text>
              </TouchableOpacity>
            </Link>
            <View style={styles.navRight}>
              <Link href="/web/sono-plus" asChild>
                <TouchableOpacity style={styles.navGhost} accessibilityRole="link">
                  <BookOpen size={16} color="#fbbf24" />
                  <Text style={styles.navGhostTxt}>Programa 21 Passos</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/web/assinar" asChild>
                <TouchableOpacity style={styles.navGold} accessibilityRole="link">
                  <Text style={styles.navGoldTxt}>{t('coach.ctaSubscribe')}</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </LinearGradient>

        {/* Hero — faixa igual ao header do checkout (slate + coroa) */}
        <LinearGradient colors={['#1e293b', '#0f172a', '#07070f']} style={styles.heroGradTop}>
          <View style={styles.heroGlow} />
          <View style={[styles.heroInner, { paddingTop: 28, paddingBottom: 8 }]}>
            <Crown size={52} color="#fbbf24" strokeWidth={1.75} />
            <Text role="heading" aria-level={1} style={styles.heroH1}>
              {isPt ? 'Programa de Sono em 21 Passos' : t('web.program.title')}
            </Text>
            <Text style={styles.heroKicker}>
              {isPt ? 'Baseado em Neurociência' : t('web.program.subtitle')}
            </Text>
            <Text style={styles.heroLead}>
              {isPt
                ? 'Você dorme, mas não descansa. Essa trilha de 21 passos reorganiza seu sono, seu ritmo e sua rotina — com base em pesquisa real, sem promessa mágica.'
                : 'A 21-step path for people who want to stop guessing and start moving — with clarity, rhythm, and evidence-informed structure.'}
            </Text>

            <View style={styles.heroBtns}>
              <TouchableOpacity style={styles.btnGoldFill} onPress={() => router.push('/web/programa')}>
                <BookOpen size={18} color="#0f172a" />
                <Text style={styles.btnGoldFillTxt}>
                  {isPt ? 'Começar grátis → ver as 3 primeiras lições' : 'Start free → see the 3 first lessons'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.btnGhost} onPress={() => router.push('/web/assinar')}>
                <Text style={styles.btnGhostTxt}>
                  {isPt ? 'Ou desbloqueie todos os 21 passos por R$ 147' : 'Unlock all 21 steps'}
                </Text>
                <ArrowRight size={18} color={GOLD} />
              </TouchableOpacity>
            </View>

            <View style={styles.pillWrap}>
              {heroProof.map((label, i) => (
                <View key={i} style={styles.pill}>
                  <Sparkles size={12} color={GOLD} />
                  <Text style={styles.pillTxt}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </LinearGradient>

        {/* Âncoras científicas — promovidas para acima da dobra (Walker, Huberman, Czeisler, Breus) */}
        <View style={styles.researchStripe}>
          <ResearcherTrustBlock variant="landing" />
        </View>

        {/* Prévia horizontal — lições gratuitas */}
        <View style={styles.previewSection}>
          <View style={styles.previewHead}>
            <Text style={styles.sectionKicker}>Antes de assinar</Text>
            <Text role="heading" aria-level={2} style={styles.h2Tight}>Os primeiros tópicos da sua trilha</Text>
            <Text style={styles.previewSub}>
              Arraste para o lado — estes são títulos reais das lições.
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.previewScroll}
          >
            {previewLessons.map((lesson) => (
              <View key={lesson.id} style={styles.previewCard}>
                <View style={styles.previewCardTop}>
                  <Text style={styles.previewNum}>#{lesson.num}</Text>
                  {lesson.free ? (
                    <View style={styles.freePill}>
                      <Text style={styles.freePillTxt}>{t('web.program.free')}</Text>
                    </View>
                  ) : (
                    <View style={styles.lockPill}>
                      <Crown size={10} color={GOLD} />
                      <Text style={styles.lockPillTxt}>{t('web.program.premium')}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.previewTitle} numberOfLines={3}>
                  {lesson.title}
                </Text>
                <TouchableOpacity onPress={() => router.push('/web/programa')} style={styles.previewLink}>
                  <Text style={styles.previewLinkTxt}>{t('web.program.viewLesson')} →</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.body}>
          {/* Ganchos visuais */}
          <View style={styles.block}>
            <Text style={styles.sectionKicker}>Por que abrir o próximo bloco?</Text>
            <Text role="heading" aria-level={2} style={styles.h2}>Feito para leitura curiosa, não enrolação</Text>
            <View style={styles.bentoGrid}>
              {curiosity.map((c, idx) => {
                const { Ico } = c;
                return (
                  <View key={idx} style={styles.bentoCard}>
                    <LinearGradient colors={['rgba(212,169,106,0.12)', 'rgba(255,255,255,0.02)']} style={styles.bentoIcon}>
                      <Ico size={22} color={GOLD} strokeWidth={2} />
                    </LinearGradient>
                    <Text style={styles.bentoTitle}>{c.title}</Text>
                    <Text style={styles.bentoSub}>{c.sub}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Três atos */}
          <LinearGradient colors={[BG_CARD, '#0a0a14']} style={styles.actsBand}>
            <Text style={styles.sectionKicker}>Estrutura</Text>
            <Text role="heading" aria-level={2} style={styles.h2}>21 passos em três movimentos</Text>
            {acts.map((act, idx) => (
              <View key={idx} style={styles.actRow}>
                <View style={styles.actBullet}>
                  <Text style={styles.actBulletTxt}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.actMeta}>
                    <Text style={styles.actRange}>{act.range}</Text>
                    <Text style={styles.actTitle}>{act.title}</Text>
                  </View>
                  <Text style={styles.actDesc}>{act.desc}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.btnGhostWideBand} onPress={() => router.push('/web/programa')}>
              <BookOpen size={18} color={GOLD} />
              <Text style={styles.btnGhostTxt}>Explorar todas as etapas</Text>
            </TouchableOpacity>
          </LinearGradient>

          {/* Programa — textos próprios (evita misturar com passos da consultoria Sono+) */}
          <View style={[styles.block, styles.sectionBand]}>
            <Text style={styles.sectionKicker}>Na prática</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 22 }]}>{t('web.program.pathTitle')}</Text>
            {programPathSteps.map((desc, idx) => (
              <View key={idx} style={styles.stepRow}>
                <View style={styles.stepNumWrap}>
                  <Text style={styles.stepNum}>{idx + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.stepDesc}>{desc}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Stats + bridge */}
          <View style={[styles.sectionBandMuted, styles.block]}>
            <Text style={styles.sectionKicker}>{t('web.program.title')}</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 12 }]}>Números que definem o ritual</Text>
            <Text style={[styles.para, { marginBottom: 20 }]}>{webProgramBridgePt}</Text>
            <View style={styles.statRow}>
              <View style={styles.stat}>
                <Text style={styles.statNum}>21</Text>
                <Text style={styles.statLbl}>{t('web.program.steps')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNum}>3</Text>
                <Text style={styles.statLbl}>{t('web.program.freeLessons')}</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNum}>~5 min</Text>
                <Text style={styles.statLbl}>{t('web.program.stat3')}</Text>
              </View>
            </View>
          </View>

          {/* Benefícios */}
          <View style={[styles.block, styles.sectionBand]}>
            <Text style={styles.sectionKicker}>Ao seguir os passos</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 16 }]}>O que você treina ao longo do programa</Text>
            <View style={styles.benefGrid}>
              {benefitLines.map((line, idx) => (
                <View key={idx} style={styles.benefCard}>
                  <Check size={16} color="#22c55e" />
                  <Text style={styles.benefTxt}>{line}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Checkout (layout espelho de /web/assinar, desktop — CTA leva ao Stripe na página certa) */}
          <View style={[styles.block, styles.sectionBand, styles.checkoutSection]}>
            <Text style={styles.sectionKicker}>Assinar Premium</Text>
            <Text role="heading" aria-level={2} style={[styles.h2, { marginBottom: 8 }]}>
              Acesse o programa completo
            </Text>
            <View style={styles.checkoutGrid}>
              <View style={styles.checkoutCol}>
                <View style={[styles.planCardCk, styles.planCardCkSelected]}>
                  <Text style={styles.priceHeadline}>{pricing.annual.label}</Text>
                  <Text style={styles.priceCaption}>
                    {pricing.annual.note} · {pricing.annual.equiv}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.checkoutBtnL}
                  activeOpacity={0.88}
                  onPress={() => router.push('/web/assinar')}
                >
                  <Crown size={20} color="#0d0d16" />
                  <Text style={styles.checkoutBtnLTxt}>{t('web.subscribe.subscribe')}</Text>
                </TouchableOpacity>
                <Text style={styles.disclaimerCk}>
                  Pagamento único. Sem mensalidade. Sem renovação automática.
                </Text>
                <View style={styles.securityBadgesCk}>
                  <View style={styles.securityBadgeCk}>
                    <Lock size={14} color="#10b981" />
                    <Text style={styles.securityBadgeCkTxt}>{t('payment.ssl')}</Text>
                  </View>
                  <View style={styles.securityBadgeCk}>
                    <Shield size={14} color="#3b82f6" />
                    <Text style={styles.securityBadgeCkTxt}>Stripe Secure</Text>
                  </View>
                  <View style={styles.securityBadgeCk}>
                    <BadgeCheck size={14} color="#f59e0b" />
                    <Text style={styles.securityBadgeCkTxt}>{t('payment.pciDss')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.featuresColCk}>
                <Text style={styles.colTitleCk}>O que está incluído</Text>
                <View style={styles.featuresCardCk}>
                  {[
                    '21 lições completas desbloqueadas imediatamente',
                    'Cada passo com ação concreta para o dia seguinte',
                    'Baseado em pesquisas de Walker, Huberman, Czeisler e Breus',
                    'Neurociência do sono e medicina circadiana',
                    'Atualizações gratuitas para sempre',
                    'Acesso imediato após pagamento — sem app, sem download',
                  ].map((feature, i) => (
                    <View key={i} style={styles.featureItemCk}>
                      <View style={styles.featureCheckCk}>
                        <Check size={14} color="#10b981" />
                      </View>
                      <Text style={styles.featureTextCk}>{feature}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.guaranteeCardCk}>
                  <BadgeCheck size={28} color="#10b981" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guaranteeTitleCk}>Garantia de 7 dias por lei</Text>
                    <Text style={styles.guaranteeDescCk}>
                      Se não estiver satisfeito por qualquer motivo nos primeiros 7 dias, basta enviar um e-mail e devolvemos 100% — sem burocracia, sem questionamento. É seu direito pelo CDC.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Sono+ — opcional, secundário */}
          <LinearGradient colors={['#120f0a', '#1a1610']} style={styles.sonoPlusBand}>
            <View style={styles.sonoPlusRow}>
              <Crown size={28} color={GOLD} />
              <View style={{ flex: 1 }}>
                <Text style={styles.sonoPlusKicker}>Opcional · Sono+</Text>
                <Text role="heading" aria-level={2} style={styles.sonoPlusTitle}>
                  Coaching Individual
                </Text>
                <Text style={styles.sonoPlusBody}>
                  Para quem quer resultado mais rápido com acompanhamento ao vivo. Uma sessão com especialista de sono custa entre R$ 400–800. Sono+ entrega diagnóstico + plano personalizado + 30 dias Premium por R$ 497 — sem lista de espera, de onde você estiver.
                </Text>
              </View>
            </View>
            <View style={styles.priceCard}>
              <View style={styles.priceHead}>
                <View style={styles.onlineTag}>
                  <Text style={styles.onlineTagTxt}>100% online</Text>
                </View>
                <Text style={styles.priceLabel}>Coaching Individual de Sono</Text>
              </View>
              <View style={styles.priceAmtRow}>
                <Text style={styles.priceAmt}>R$ 497</Text>
                <Text style={styles.priceSub}>sessão única</Text>
              </View>
              <Text style={styles.priceFmt}>60 minutos online, de onde você estiver.</Text>
              <View style={styles.divider} />
              {[
                'Sessão online de 60 minutos — de onde você estiver',
                'Mapeamento completo de hábitos, rotina e ambiente de sono',
                'Relatório personalizado com diagnóstico e próximos passos — entregue em 72h',
                'Suporte via WhatsApp por 30 dias — acesso direto, sem IA',
                '30 dias de acesso Premium com todos os 21 passos desbloqueados',
              ].map((feature, idx) => (
                <View key={idx} style={styles.priceRow}>
                  <View style={styles.bulletWrap}>
                    <Check size={16} color={GOLD} strokeWidth={2.5} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.priceLineTitle}>{feature}</Text>
                  </View>
                </View>
              ))}
              <TouchableOpacity style={styles.btnGoldFillWide} onPress={openWhatsApp}>
                <MessageCircle size={18} color="#0f172a" />
                <Text style={styles.btnGoldFillTxt}>Agendar minha sessão →</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          {/* FAQ */}
          <View style={styles.block}>
            <Text role="heading" aria-level={2} style={styles.h2}>Perguntas frequentes</Text>
            <View style={{ marginTop: 16 }}>
              {faq.map((item, i) => (
                <View key={i} style={styles.faqCard}>
                  <Text style={styles.faqQ}>{item.question}</Text>
                  <Text style={styles.faqA}>{item.answer}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* CTA final — programa primeiro */}
          <View style={styles.ctaPanel}>
            <Moon size={24} color={GOLD} />
            <Text style={styles.ctaTitle}>Pronto para atravessar os 21 passos?</Text>
            <Text style={styles.ctaSub}>
              Comece pelas lições gratuitas ou desbloqueie o percurso completo. Sono+ fica disponível quando quiser refinamento ao vivo.
            </Text>
            <TouchableOpacity style={styles.btnGoldFillWide} onPress={() => router.push('/web/assinar')}>
              <Crown size={20} color="#0f172a" />
              <Text style={styles.btnGoldFillTxt}>{t('coach.ctaSubscribe')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnOutlineGold} onPress={() => router.push('/web/programa')}>
              <BookOpen size={20} color={GOLD} />
              <Text style={styles.btnOutlineGoldTxt}>{t('web.program.allLessons')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnGhostFinal} onPress={openWhatsApp}>
              <Calendar size={18} color={TEXT_MUTED} />
              <Text style={styles.btnGhostFinalTxt}>Falar sobre Sono+ (WhatsApp)</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            {/* Internal linking para SEO — Google entende hierarquia entre as páginas */}
            <View style={styles.footerNav}>
              <Link href="/web" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>GoZzzz — Início</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/sono-plus" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Programa 21 Passos</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/programa" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Todas as lições</Text>
                </TouchableOpacity>
              </Link>
              <Text style={styles.footerSep}>·</Text>
              <Link href="/web/assinar" asChild>
                <TouchableOpacity accessibilityRole="link">
                  <Text style={styles.footerLink}>Assinar</Text>
                </TouchableOpacity>
              </Link>
            </View>
            <Text style={styles.footerCopy}>{t('web.footer.copyright')}</Text>
            <Text style={styles.footerCo}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
            <Text style={styles.footerCn}>CNPJ: 66.059.212/0001-52</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const webProgramBridgePt =
  'Cada etapa sintetiza o que a literatura de sono recomenda aplicar no dia seguinte — no mesmo formato em que já confia na app.';
const webProgramBridgeEn =
  'Each step condenses sleep-science protocols into moves you repeat the next day — aligned with how the app teaches.';

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: BG },
  navGrad: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  navInner: {
    maxWidth: 1100,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    minHeight: NAV_H,
  },
  brand: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  brandText: { fontSize: 20, fontWeight: '800', color: '#ffffff' },
  navRight: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  navGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  navGhostTxt: { color: '#94a3b8', fontWeight: '600', fontSize: 13 },
  navGold: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: GOLD },
  navGoldTxt: { color: '#0f172a', fontWeight: '800', fontSize: 13 },

  heroGradTop: { width: '100%', paddingBottom: 40, overflow: 'hidden' },
  heroGlow: {
    position: 'absolute',
    top: -120,
    left: '20%',
    right: '20%',
    height: 280,
    borderRadius: 200,
    backgroundColor: 'rgba(212,169,106,0.08)',
  },
  heroInner: { maxWidth: 720, width: '100%', alignSelf: 'center', paddingHorizontal: 24, alignItems: 'center', zIndex: 1 },
  heroH1: {
    marginTop: 16,
    fontSize: isWeb ? 34 : 28,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: isWeb ? 40 : 34,
    letterSpacing: -0.5,
  },
  heroKicker: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: GOLD,
    textAlign: 'center',
  },
  heroLead: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.88)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 560,
    paddingHorizontal: 8,
  },
  heroBtns: {
    marginTop: 24,
    flexDirection: isWeb ? 'row' : 'column',
    gap: 10,
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  btnGoldFill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: GOLD,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 14,
    minWidth: isWeb ? 220 : undefined,
  },
  btnGoldFillTxt: { color: '#0f172a', fontWeight: '800', fontSize: 15 },
  btnGhost: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: GOLD,
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: 'transparent',
  },
  btnGhostTxt: { color: GOLD, fontWeight: '700', fontSize: 15 },
  pillWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 22 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.22)',
    borderRadius: 999,
    paddingHorizontal: 11,
    paddingVertical: 7,
  },
  pillTxt: { color: TEXT_MUTED, fontSize: 11, fontWeight: '600', maxWidth: 240 },

  researchStripe: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 4,
    maxWidth: 1100,
    alignSelf: 'center',
    backgroundColor: BG,
  },
  previewSection: {
    paddingTop: 28,
    paddingBottom: 8,
    backgroundColor: BG,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212,169,106,0.06)',
  },
  previewHead: { paddingHorizontal: 24, maxWidth: 1100, width: '100%', alignSelf: 'center', marginBottom: 16 },
  previewSub: { marginTop: 8, color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },
  previewScroll: { paddingHorizontal: 24, gap: 12, paddingBottom: 12 },
  previewCard: {
    width: 260,
    backgroundColor: BG_CARD,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.18)',
    marginRight: 4,
  },
  previewCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  previewNum: { fontSize: 13, fontWeight: '800', color: GOLD },
  freePill: { backgroundColor: 'rgba(34,197,94,0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  freePillTxt: { color: '#86efac', fontSize: 10, fontWeight: '800' },
  lockPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: GOLD_DIM,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  lockPillTxt: { color: GOLD, fontSize: 10, fontWeight: '800' },
  previewTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', lineHeight: 21, minHeight: 63 },
  previewLink: { marginTop: 14 },
  previewLinkTxt: { color: GOLD, fontSize: 13, fontWeight: '700' },

  body: { maxWidth: 1100, width: '100%', alignSelf: 'center', paddingHorizontal: 24, paddingBottom: 48 },
  block: { marginTop: 36 },
  sectionBand: { paddingTop: 8, borderTopWidth: 1, borderTopColor: 'rgba(212,169,106,0.08)' },
  sectionBandMuted: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: '#0c0c16',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212,169,106,0.06)',
  },
  sectionKicker: { color: GOLD, fontSize: 11, fontWeight: '800', letterSpacing: 1.2, marginBottom: 8, textTransform: 'uppercase' },
  h2: { color: TEXT_MAIN, fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h2Tight: { color: TEXT_MAIN, fontSize: 22, fontWeight: '700', lineHeight: 28 },
  para: { marginTop: 14, color: TEXT_MUTED, fontSize: 15, lineHeight: 24 },

  bentoGrid: {
    marginTop: 18,
    flexDirection: isWeb ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: 12,
  },
  bentoCard: {
    width: isWeb ? '48%' : '100%',
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  bentoIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  bentoTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 6 },
  bentoSub: { color: TEXT_MUTED, fontSize: 13, lineHeight: 20 },

  actsBand: {
    marginTop: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212,169,106,0.06)',
    position: 'relative',
  },
  actRow: { flexDirection: 'row', gap: 14, marginTop: 18, alignItems: 'flex-start' },
  actBullet: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212,169,106,0.18)',
    borderWidth: 1,
    borderColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actBulletTxt: { color: GOLD, fontWeight: '900', fontSize: 14 },
  actMeta: { flexDirection: 'row', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginBottom: 6 },
  actRange: { color: GOLD, fontSize: 12, fontWeight: '800' },
  actTitle: { color: TEXT_MAIN, fontSize: 16, fontWeight: '700' },
  actDesc: { color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },
  btnGhostWideBand: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.35)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },

  stepRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
    backgroundColor: BG_CARD,
    padding: 18,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: GOLD,
  },
  stepNumWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: { fontSize: 18, fontWeight: '900', color: '#07070f' },
  stepTitle: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 5 },
  stepDesc: { color: TEXT_MUTED, fontSize: 15, lineHeight: 23 },

  statRow: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: isWeb ? 0 : 10,
    marginTop: 6,
    backgroundColor: BG_CARD,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.12)',
    paddingVertical: isWeb ? 18 : 14,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  stat: { flex: 1, alignItems: 'center', minWidth: isWeb ? 110 : undefined },
  statDivider: {
    width: isWeb ? StyleSheet.hairlineWidth : '80%',
    height: isWeb ? undefined : StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(212,169,106,0.2)',
    alignSelf: 'stretch',
  },
  statNum: { color: TEXT_MAIN, fontSize: 26, fontWeight: '800' },
  statLbl: { color: TEXT_MUTED, fontSize: 11, marginTop: 4, textAlign: 'center' },

  benefGrid: { flexDirection: isWeb ? 'row' : 'column', flexWrap: 'wrap', gap: 10, marginTop: 8 },
  benefCard: {
    width: isWeb ? '48%' : '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
    backgroundColor: BG_CARD,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  benefTxt: { flex: 1, color: TEXT_MUTED, fontSize: 14, lineHeight: 21 },

  checkoutSection: { marginTop: 8 },
  checkoutGrid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: isWeb ? 36 : 24,
    alignItems: 'flex-start',
    marginTop: 20,
    width: '100%',
  },
  checkoutCol: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  featuresColCk: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  planCardCk: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  planCardCkSelected: {
    borderColor: GOLD,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  planTotalCk: { fontSize: 15, color: '#8892a4', fontWeight: '600', lineHeight: 22 },
  priceHeadline: {
    fontSize: isWeb ? 44 : 36,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: -1,
    lineHeight: isWeb ? 50 : 42,
  },
  priceCaption: {
    marginTop: 6,
    fontSize: 14,
    color: '#cbd1de',
    fontWeight: '500',
    textAlign: 'center',
  },
  checkoutBtnL: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutBtnLTxt: { fontSize: 17, fontWeight: '800', color: '#0d0d16' },
  disclaimerCk: { fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 18, marginBottom: 16 },
  securityBadgesCk: { flexDirection: 'row', gap: 8, justifyContent: 'center', flexWrap: 'wrap' },
  securityBadgeCk: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  securityBadgeCkTxt: { fontSize: 11, fontWeight: '700', color: '#8892a4' },
  colTitleCk: { fontSize: 20, fontWeight: '800', color: '#e8d5b7', marginBottom: 16 },
  featuresCardCk: {
    backgroundColor: BG_CARD,
    borderRadius: 16,
    padding: 22,
    gap: 13,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  featureItemCk: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  featureCheckCk: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  featureTextCk: { fontSize: 14, color: '#94a3b8', flex: 1, lineHeight: 21 },
  guaranteeCardCk: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    marginTop: 20,
  },
  guaranteeTitleCk: { fontSize: 15, fontWeight: '700', color: '#e8d5b7', marginBottom: 6 },
  guaranteeDescCk: { fontSize: 13, color: '#10b981', lineHeight: 20 },

  sonoPlusBand: {
    marginTop: 32,
    marginHorizontal: -24,
    paddingHorizontal: 24,
    paddingVertical: 26,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(212,169,106,0.14)',
    borderRadius: 0,
  },
  sonoPlusRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start', marginBottom: 20 },
  sonoPlusKicker: { color: GOLD, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 4 },
  sonoPlusTitle: { color: TEXT_MAIN, fontSize: 17, fontWeight: '700', marginBottom: 8 },
  sonoPlusBody: { color: TEXT_MUTED, fontSize: 14, lineHeight: 22 },
  priceCard: {
    marginTop: 6,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.28)',
  },
  priceHead: { marginBottom: 10 },
  onlineTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,169,106,0.15)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  onlineTagTxt: { color: GOLD, fontSize: 9, fontWeight: '800', letterSpacing: 0.6 },
  priceLabel: { color: TEXT_MAIN, fontSize: 18, fontWeight: '800' },
  tagLineStack: { marginVertical: 12, gap: 3 },
  tagLine: { color: GOLD, fontSize: 13, fontWeight: '600' },
  priceAmtRow: { flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 6 },
  priceAmt: { fontSize: 32, fontWeight: '900', color: GOLD },
  priceSub: { color: TEXT_MUTED, fontSize: 13, fontWeight: '600' },
  priceFmt: { color: TEXT_MUTED, fontSize: 13, marginBottom: 10 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: 'rgba(212,169,106,0.15)', marginVertical: 14 },
  priceRow: { flexDirection: 'row', gap: 10, marginBottom: 12, alignItems: 'flex-start' },
  bulletWrap: { paddingTop: 2 },
  priceLineTitle: { color: TEXT_MAIN, fontSize: 13, fontWeight: '600', lineHeight: 20 },
  priceLineSub: { color: TEXT_MUTED, fontSize: 12, marginTop: 2, lineHeight: 17 },
  btnGoldFillWide: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: GOLD,
    paddingVertical: 15,
    borderRadius: 14,
  },

  faqCard: {
    backgroundColor: BG_CARD,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    marginBottom: 10,
  },
  faqQ: { color: TEXT_MAIN, fontSize: 15, fontWeight: '700', marginBottom: 8 },
  faqA: { color: TEXT_MUTED, fontSize: 13, lineHeight: 20 },

  ctaPanel: {
    marginTop: 36,
    alignItems: 'center',
    backgroundColor: '#0f1624',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.22)',
    gap: 10,
  },
  ctaTitle: { fontSize: 21, fontWeight: '800', color: TEXT_MAIN, textAlign: 'center', marginTop: 4 },
  ctaSub: { fontSize: 14, lineHeight: 21, color: TEXT_MUTED, textAlign: 'center', marginBottom: 6, paddingHorizontal: 4 },

  btnOutlineGold: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: GOLD,
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 2,
  },
  btnOutlineGoldTxt: { color: GOLD, fontWeight: '800', fontSize: 15 },
  btnGhostFinal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
    paddingVertical: 10,
  },
  btnGhostFinalTxt: { color: TEXT_MUTED, fontWeight: '600', fontSize: 14 },

  footer: { marginTop: 36, paddingVertical: 22, alignItems: 'center', gap: 6 },
  footerNav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  footerLink: { color: '#cbd1de', fontSize: 13, fontWeight: '600' },
  footerSep: { color: 'rgba(203,209,222,0.4)', fontSize: 12 },
  footerCopy: { fontSize: 12, color: TEXT_MUTED, textAlign: 'center', paddingHorizontal: 16 },
  footerCo: { color: TEXT_MUTED, fontSize: 11, fontWeight: '600' },
  footerCn: { color: TEXT_MUTED, fontSize: 10 },
});
```

---

### `components/web/chronotype/ChronotypePremiumWebFunnel.tsx`

**Descrição no pedido de exportação:** Funil web — quiz / cronótipo na landing /web

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/components/web/chronotype/ChronotypePremiumWebFunnel.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Estado local React; pode persistir cronótipo via SecureStore/localStorage e sincronizar perfil.

**Como o pagamento está integrado (neste arquivo):** Este arquivo não integra pagamento diretamente.

**Existe no disco:** sim

```tsx
import { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { TextStyle } from 'react-native';
import { Activity, Brain, Check, Clock, Dna, Lock, Shield, Zap } from 'lucide-react-native';
import { useLanguage } from '@/contexts/LanguageContext';
import GozzzzWordmark from '@/components/branding/GozzzzWordmark';
import ChronotypePremiumNativeHero from '@/components/chronotype/ChronotypePremiumNativeHero';
import {
  CHRONOTYPE_HERO_MAX,
  CHRONOTYPE_HEADLINE_FS,
  CHRONOTYPE_HEADLINE_LH,
  CHRONOTYPE_HEADLINE_MAX_W,
  CHRONOTYPE_HEADLINE_TRACKING,
} from '@/components/chronotype/chronotypePremiumHeroConstants';
import { CHRONOTYPE_EXP_KEYS, getChronotypeExperience, type ChronotypeExpKey } from '@/data/chronotypesExperience';

const isWeb = Platform.OS === 'web';

const HERO_MAX = CHRONOTYPE_HERO_MAX;

/** Estrelas discretas, baixa opacidade (spec: sparse, subtle). */
const STARFIELD = [
  [10, 14, 0.18, 1.2],
  [82, 22, 0.15, 1],
  [48, 8, 0.12, 1.4],
  [24, 62, 0.14, 1],
  [90, 55, 0.16, 1.1],
  [16, 38, 0.1, 1],
] as const;

type Props = {
  scrollY: number;
};

const webFont =
  Platform.OS === 'web'
    ? ({ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' } as const)
    : {};

/** Na web, MaskedView + Reanimated `entering` falham em vários browsers — gradiente via CSS + View estável. */
const headlineHighlightWeb = {
  color: 'transparent',
  backgroundImage: 'linear-gradient(90deg, #a855f7 0%, #6366f1 52%, #38bdf8 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
} as unknown as TextStyle;

export default function ChronotypePremiumWebFunnel({ scrollY }: Props) {
  const { t, language } = useLanguage();
  const locale = language === 'pt' ? 'pt' : 'en';
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [ctaHover, setCtaHover] = useState(false);
  const [ctaPressed, setCtaPressed] = useState(false);
  const ctaScale = ctaPressed ? 0.97 : ctaHover && isWeb ? 1.05 : 1;
  const glow = useSharedValue(0.35);

  useEffect(() => {
    if (!isWeb) return;
    glow.value = withRepeat(
      withSequence(
        withTiming(0.52, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.34, { duration: 2200, easing: Easing.inOut(Easing.quad) }),
      ),
      -1,
      false,
    );
  }, [glow]);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glow.value,
  }));

  const parallaxStars = useMemo(
    () => ({
      transform: [{ translateY: scrollY * (isWeb ? 0.06 : 0.05) }],
    }),
    [scrollY],
  );

  const goQuiz = () => router.push('/(auth)/signup');
  const goProgram = () => router.push('/web/programa');

  const cardBasis = width >= 640 ? '48%' : '100%';
  const maxCardW = width >= 900 ? 200 : 180;

  const shellExtra = isWeb ? ({ minHeight: '88vh' } as object) : { minHeight: 560 };

  const shellGradient = isWeb
    ? ({ colors: ['#050508', '#0c0c12'] as const } as const)
    : ({
        colors: ['#050816', '#0a1028', '#0b0f2a'] as const,
        locations: [0, 0.52, 1] as const,
      } as const);

  const hlPre = t('web.chronoPremium.heroHeadlinePrefix');
  const hlHi = t('web.chronoPremium.heroHeadlineHighlight');
  const hlSuf = t('web.chronoPremium.heroHeadlineSuffix');

  const subPre = t('web.chronoPremium.heroSubPrefix');
  const subHi = t('web.chronoPremium.heroSubHighlight');
  const subSuf = t('web.chronoPremium.heroSubSuffix');

  return (
    <LinearGradient {...shellGradient} style={[styles.shell, shellExtra]}>
      <Animated.View style={[styles.starsWrap, parallaxStars]} pointerEvents="none">
        {STARFIELD.map(([x, y, o, s], i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: `${x}%`,
                top: `${y}%`,
                opacity: o,
                width: s,
                height: s,
                borderRadius: s,
              },
            ]}
          />
        ))}
      </Animated.View>

      <View style={styles.pageInner} {...(isWeb ? ({ nativeID: 'chronotype-hero-root' } as object) : {})}>
        <View style={styles.heroColumn}>
          {isWeb ? (
            <>
              <View style={styles.logoBlock}>
                <GozzzzWordmark preset="funnelHero" />
              </View>

              <View style={styles.headlineBlock} testID="chronotype-hero-headline">
                <Text style={[styles.headlineWebWrap, webFont]}>
                  <Text style={[styles.headlinePlain, webFont]}>{hlPre}</Text>
                  <Text style={[styles.headlinePlain, headlineHighlightWeb, webFont]}>{hlHi}</Text>
                  {hlSuf ? <Text style={[styles.headlinePlain, webFont]}>{hlSuf}</Text> : null}
                </Text>
                <Text style={[styles.subheadWrap, webFont]}>
                  <Text style={[styles.subheadMuted, webFont]}>{subPre}</Text>
                  <Text style={[styles.subheadAccent, webFont]}>{subHi}</Text>
                  <Text style={[styles.subheadMuted, webFont]}>{subSuf}</Text>
                </Text>
              </View>

              <View style={styles.ctaBlock}>
                <Pressable
                  onPress={goQuiz}
                  onPressIn={() => setCtaPressed(true)}
                  onPressOut={() => setCtaPressed(false)}
                  {...({
                    onMouseEnter: () => setCtaHover(true),
                    onMouseLeave: () => {
                      setCtaHover(false);
                      setCtaPressed(false);
                    },
                  } as object)}
                  style={[styles.ctaOuter, { transform: [{ scale: ctaScale }] }]}
                >
                  <Animated.View style={[styles.ctaGlow, glowStyle]} />
                  <LinearGradient
                    colors={['#9333ea', '#6366f1', '#0ea5e9']}
                    locations={[0, 0.52, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaGrad}
                  >
                    <Text style={[styles.ctaText, webFont]}>
                      {'\u2192 '}
                      {t('web.chronoPremium.ctaQuiz')}
                    </Text>
                  </LinearGradient>
                </Pressable>
                <View style={styles.trustRow}>
                  <View style={styles.trustItem}>
                    <Check size={15} color="#c4b5fd" strokeWidth={2.2} />
                    <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustFree')}</Text>
                  </View>
                  <Text style={styles.trustSep}>·</Text>
                  <View style={styles.trustItem}>
                    <Zap size={15} color="#c4b5fd" strokeWidth={2.2} />
                    <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustFast')}</Text>
                  </View>
                  <Text style={styles.trustSep}>·</Text>
                  <View style={styles.trustItem}>
                    <Lock size={15} color="#c4b5fd" strokeWidth={2.2} />
                    <Text style={[styles.trustItemText, webFont]}>{t('web.chronoPremium.trustSignup')}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerStar}>✦</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.scienceBlock} testID="chronotype-hero-science">
                <View style={styles.brainRing}>
                  <Brain size={18} color="rgba(255,255,255,0.55)" strokeWidth={1.6} />
                </View>
                <Text style={[styles.scienceTitle, webFont]}>{t('web.chronoPremium.scienceTitle')}</Text>
                <View style={styles.pillarRow}>
                  <View style={styles.pillarItem}>
                    <Dna size={13} color="#c4b5fd" strokeWidth={2} />
                    <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar1')}</Text>
                  </View>
                  <Text style={[styles.pillarPipe, webFont]}>|</Text>
                  <View style={styles.pillarItem}>
                    <Clock size={13} color="#c4b5fd" strokeWidth={2} />
                    <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar2')}</Text>
                  </View>
                  <Text style={[styles.pillarPipe, webFont]}>|</Text>
                  <View style={styles.pillarItem}>
                    <Activity size={13} color="#c4b5fd" strokeWidth={2} />
                    <Text style={[styles.pillarText, webFont]}>{t('web.chronoPremium.sciencePillar3')}</Text>
                  </View>
                </View>
                <Text style={[styles.scienceLead, webFont]}>{t('web.chronoPremium.scienceResearchersLead')}</Text>
                <Text style={[styles.scienceNames, webFont]}>{t('web.chronoPremium.scienceResearchersNames')}</Text>
                <View style={styles.privacyPill}>
                  <Shield size={13} color="rgba(255,255,255,0.45)" strokeWidth={2} />
                  <Text style={[styles.privacyPillText, webFont]}>{t('web.chronoPremium.heroPrivacyLine')}</Text>
                </View>
              </View>
            </>
          ) : (
            <ChronotypePremiumNativeHero onPressCta={goQuiz} />
          )}
        </View>

        <Text style={[styles.gridLabel, webFont]}>{t('web.chronoPremium.gridLabel')}</Text>
        <View style={[styles.grid, { gap: width >= 640 ? 14 : 12 }]}>
          {CHRONOTYPE_EXP_KEYS.map((key: ChronotypeExpKey) => {
            const b = getChronotypeExperience(key, locale);
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.9}
                style={[styles.gridCard, { flexBasis: cardBasis, maxWidth: maxCardW }]}
                onPress={() => router.push('/web/assinar')}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)']}
                  style={styles.gridCardInner}
                >
                  <Text style={styles.gridEmoji}>{b.emoji}</Text>
                  <Text style={styles.gridName} numberOfLines={2}>
                    {b.name}
                  </Text>
                  <Text style={styles.gridTag} numberOfLines={2}>
                    {b.landingTagline}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.valueBlock}>
          <Text style={[styles.valueTitle, webFont]}>{t('web.chronoPremium.valueTitle')}</Text>
          <TouchableOpacity style={styles.valueCta} onPress={goQuiz} activeOpacity={0.9}>
            <LinearGradient colors={['#7c3aed', '#4f46e5', '#0284c7']} style={styles.valueCtaGrad}>
              <Text style={[styles.valueCtaText, webFont]}>{t('web.chronoPremium.ctaStartFree')}</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={goProgram} style={styles.valueLink}>
            <Text style={[styles.valueLinkText, webFont]}>{t('web.chronoPremium.linkProgram')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  shell: {
    paddingBottom: 48,
    overflow: 'hidden',
  },
  starsWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  star: {
    position: 'absolute',
    backgroundColor: '#e2e8f0',
  },
  pageInner: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  heroColumn: {
    width: '100%',
    maxWidth: HERO_MAX,
    alignSelf: 'center',
    alignItems: 'center',
  },
  logoBlock: {
    alignItems: 'center',
  },
  headlineBlock: {
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  headlineWebWrap: {
    width: '100%',
    maxWidth: CHRONOTYPE_HEADLINE_MAX_W,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  headlineRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
  },
  headlinePlain: {
    fontSize: CHRONOTYPE_HEADLINE_FS,
    lineHeight: CHRONOTYPE_HEADLINE_LH,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: CHRONOTYPE_HEADLINE_TRACKING,
  },
  subheadWrap: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 28,
    paddingHorizontal: 4,
    flexWrap: 'wrap',
  },
  subheadMuted: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: 'rgba(226,232,240,0.78)',
  },
  subheadAccent: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#d8b4fe',
  },
  ctaBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 0,
  },
  ctaOuter: {
    borderRadius: 24,
    overflow: 'visible',
    width: '100%',
    maxWidth: HERO_MAX,
    alignSelf: 'center',
    marginBottom: 24,
  },
  ctaGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 28,
    backgroundColor: '#6366f1',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    zIndex: 0,
  },
  ctaGrad: {
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    ...(isWeb
      ? ({
          boxShadow: '0 18px 48px rgba(79, 70, 229, 0.42)',
        } as object)
      : {
          shadowColor: '#4f46e5',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.38,
          shadowRadius: 22,
          elevation: 14,
        }),
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.2,
  },
  trustRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
    paddingHorizontal: 4,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  trustItemText: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(196,181,253,0.92)',
  },
  trustSep: {
    fontSize: 13,
    color: 'rgba(148,163,184,0.45)',
    marginHorizontal: 2,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: HERO_MAX,
    marginBottom: 32,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255,255,255,0.2)',
    minHeight: 1,
  },
  dividerStar: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: 0,
  },
  scienceBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 4,
  },
  brainRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  scienceTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.92)',
    textAlign: 'center',
    marginBottom: 12,
  },
  pillarRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 18,
    maxWidth: HERO_MAX,
  },
  pillarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pillarText: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(196,181,253,0.95)',
    letterSpacing: 0.2,
  },
  pillarPipe: {
    fontSize: 11,
    color: 'rgba(148,163,184,0.35)',
    marginHorizontal: 2,
  },
  scienceLead: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '400',
    color: 'rgba(148,163,184,0.85)',
    textAlign: 'center',
    marginBottom: 6,
  },
  scienceNames: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: 'rgba(216,180,254,0.95)',
    textAlign: 'center',
    marginBottom: 18,
  },
  privacyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    maxWidth: HERO_MAX,
  },
  privacyPillText: {
    flexShrink: 1,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '400',
    color: 'rgba(148,163,184,0.88)',
    textAlign: 'left',
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: 'rgba(148,163,184,0.85)',
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 40,
    width: '100%',
  },
  gridCard: {
    flexGrow: 1,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  gridCardInner: {
    paddingVertical: 18,
    paddingHorizontal: 14,
    minHeight: 140,
  },
  gridEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  gridName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#f8fafc',
    marginBottom: 4,
  },
  gridTag: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.95)',
    lineHeight: 16,
  },
  valueBlock: {
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
    paddingBottom: 8,
    width: '100%',
  },
  valueTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 18,
    letterSpacing: -0.4,
  },
  valueCta: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'stretch',
    maxWidth: 360,
    width: '100%',
    marginBottom: 12,
  },
  valueCtaGrad: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  valueCtaText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  valueLink: {
    paddingVertical: 8,
  },
  valueLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(148,163,184,0.95)',
    textDecorationLine: 'underline',
  },
});
```

---

### `components/chronotype/ChronotypeResultPremiumScreen.tsx`

**Descrição no pedido de exportação:** Tela / componente de resultado do cronótipo (premium)

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/components/chronotype/ChronotypeResultPremiumScreen.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Componente de apresentação; cronótipo vem via props.

**Como o pagamento está integrado (neste arquivo):** Este arquivo não integra pagamento diretamente.

**Existe no disco:** sim

```tsx
import { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  ZoomIn,
  useReducedMotion,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { ChronotypeKey } from '@/data/chronotypesIntelligence';
import {
  getChronotypeResultPremium,
  getChronotypeProfileExplain,
  type ChronotypeResultLocale,
} from '@/data/chronotypeResultPremium';
import GhostButton from '@/src/components/GhostButton';
import ChronotypeProfileExplainModal from '@/components/chronotype/ChronotypeProfileExplainModal';
import ChronotypeRefineOptionalBlock from '@/components/chronotype/ChronotypeRefineOptionalBlock';

const STAGGER_MS = 150;
const CONTENT_MAX = 420;
const BG_TOP = '#050816';
const BG_BOTTOM = '#0b0f2a';

type Props = {
  chronotypeKey: ChronotypeKey;
  locale?: ChronotypeResultLocale;
  onStartDay1: () => void;
  onUnderstandMore?: () => void;
};

function EnergyCurve({
  values,
  accentBar,
  accentMuted,
  morningLabel,
  nightLabel,
}: {
  values: readonly [number, number, number, number, number];
  accentBar: string;
  accentMuted: string;
  morningLabel: string;
  nightLabel: string;
}) {
  const maxH = 52;
  return (
    <View style={styles.curveBlock}>
      <View style={styles.curveRow}>
        {values.map((v, i) => (
          <View key={i} style={styles.curveCol}>
            <View style={[styles.curveBarTrack, { backgroundColor: accentMuted }]}>
              <View style={[styles.curveBarFill, { height: Math.max(6, v * maxH), backgroundColor: accentBar }]} />
            </View>
          </View>
        ))}
      </View>
      <View style={styles.curveLabels}>
        <Text style={styles.curveLabel}>{morningLabel}</Text>
        <Text style={styles.curveLabel}>{nightLabel}</Text>
      </View>
    </View>
  );
}

export default function ChronotypeResultPremiumScreen({
  chronotypeKey,
  locale = 'pt',
  onStartDay1,
  onUnderstandMore,
}: Props) {
  const reduceMotion = useReducedMotion();
  const [explainOpen, setExplainOpen] = useState(false);

  const data = useMemo(() => getChronotypeResultPremium(chronotypeKey, locale), [chronotypeKey, locale]);
  const explain = useMemo(() => getChronotypeProfileExplain(chronotypeKey, locale), [chronotypeKey, locale]);
  const { accent } = data;

  const heroEmojiEntering = useMemo(
    () => (reduceMotion ? FadeIn.duration(280) : ZoomIn.springify().damping(16).stiffness(140).mass(0.85)),
    [reduceMotion],
  );

  const heroTitleEntering = useMemo(
    () => (reduceMotion ? FadeIn.duration(320) : FadeInUp.delay(80).duration(420).springify()),
    [reduceMotion],
  );

  const cardEntering = useCallback(
    (index: number) =>
      reduceMotion
        ? FadeIn.duration(260)
        : FadeInDown.delay(STAGGER_MS * index).duration(420).springify(),
    [reduceMotion],
  );

  const handleSecondary = useCallback(() => {
    if (onUnderstandMore) {
      onUnderstandMore();
      return;
    }
    setExplainOpen(true);
  }, [onUnderstandMore]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      <LinearGradient colors={[BG_TOP, BG_BOTTOM]} locations={[0, 1]} style={StyleSheet.absoluteFillObject} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.column}>
          <Animated.View entering={heroEmojiEntering} style={styles.heroEmojiWrap}>
            <Text style={styles.heroEmoji} allowFontScaling={false}>
              {data.emoji}
            </Text>
          </Animated.View>
          <Animated.View entering={heroTitleEntering}>
            <Text style={styles.heroTitle}>{data.name}</Text>
            <Text style={styles.heroSubtitle}>{data.subtitle}</Text>
          </Animated.View>

          <Text style={styles.sectionLabel}>{data.sections.mind}</Text>
          <View style={styles.cardStack}>
            {data.mindCards.map((line, i) => (
              <Animated.View
                key={`mind-${i}`}
                entering={cardEntering(i)}
                style={[styles.mindCard, { borderColor: accent.primarySoft, backgroundColor: 'rgba(255,255,255,0.04)' }]}
              >
                <Text style={styles.mindCardText}>{line}</Text>
              </Animated.View>
            ))}
          </View>

          <View>
            <Text style={styles.sectionLabel}>{data.sections.why}</Text>
            <Text style={styles.body}>{data.whyBody}</Text>
            <EnergyCurve
              values={data.curve}
              accentBar={accent.bar}
              accentMuted={accent.barMuted}
              morningLabel={data.sections.curveMorning}
              nightLabel={data.sections.curveNight}
            />
          </View>

          <Text style={styles.sectionLabel}>{data.sections.effects}</Text>
          <View style={[styles.listBlock, { borderLeftColor: accent.primary }]}>
            {data.effects.map((item) => (
              <View key={item} style={styles.bulletRow}>
                <View style={[styles.bullet, { backgroundColor: accent.primary }]} />
                <Text style={styles.bulletText}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionLabel}>{data.sections.solutions}</Text>
          <View style={styles.cardStack}>
            {data.solutions.map((item, i) => (
              <Animated.View
                key={item}
                entering={cardEntering(i)}
                style={[styles.solutionCard, { borderColor: accent.primarySoft }]}
              >
                <Text style={styles.solutionText}>{item}</Text>
              </Animated.View>
            ))}
          </View>

          <View style={[styles.insightWrap, { borderColor: accent.primarySoft }]}>
            <Text style={styles.insight}>{data.insight}</Text>
          </View>

          <ChronotypeRefineOptionalBlock chronotypeKey={chronotypeKey} locale={locale} accent={accent} />

          <TouchableOpacity activeOpacity={0.92} onPress={onStartDay1} style={styles.primaryTouch}>
            <LinearGradient
              colors={['rgba(255,255,255,0.22)', accent.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryGrad}
            >
              <Text style={styles.primaryLabel}>{data.ctaPrimary}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <GhostButton label={data.ctaSecondary} onPress={handleSecondary} style={styles.secondaryGhost} />

          <Text style={styles.scienceFoot}>{data.scienceFoot}</Text>
        </View>
      </ScrollView>
      <ChronotypeProfileExplainModal
        visible={explainOpen}
        onClose={() => setExplainOpen(false)}
        explain={explain}
        accent={accent}
        emoji={data.emoji}
        profileName={data.name}
        onStartDay1={onStartDay1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: BG_TOP,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 36 : 28,
  },
  column: {
    width: '100%',
    maxWidth: CONTENT_MAX,
    alignSelf: 'center',
  },
  heroEmojiWrap: {
    alignItems: 'center',
    marginBottom: 12,
  },
  heroEmoji: {
    fontSize: 72,
    lineHeight: 80,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: '#f8fafc',
    textAlign: 'center',
    letterSpacing: -0.8,
    marginBottom: 10,
    ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
    letterSpacing: 0.1,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#cbd5e1',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 8,
  },
  cardStack: {
    gap: 10,
    marginBottom: 8,
  },
  mindCard: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  mindCardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#94a3b8',
    marginBottom: 16,
  },
  curveBlock: {
    marginBottom: 28,
  },
  curveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 56,
    gap: 8,
  },
  curveCol: {
    flex: 1,
    alignItems: 'center',
  },
  curveBarTrack: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  curveBarFill: {
    width: '100%',
    borderRadius: 8,
  },
  curveLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  curveLabel: {
    fontSize: 11,
    color: '#64748b',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  listBlock: {
    borderLeftWidth: 3,
    paddingLeft: 14,
    gap: 10,
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 7,
    opacity: 0.9,
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#cbd5e1',
  },
  solutionCard: {
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  solutionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#e2e8f0',
  },
  insightWrap: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    marginTop: 12,
    marginBottom: 28,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  insight: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '600',
    color: '#f1f5f9',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
  primaryTouch: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  primaryGrad: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.25,
  },
  secondaryGhost: {
    marginBottom: 28,
  },
  scienceFoot: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748b',
    textAlign: 'center',
    letterSpacing: 0.2,
    marginBottom: 8,
  },
});
```

---

### `app/_layout.tsx`

**Descrição no pedido de exportação:** Raiz Expo Router — providers e navegação global

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/_layout.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** `AuthProvider`, `LanguageProvider`, `ProgressProvider`, `ToastProvider`, etc.

**Como o pagamento está integrado (neste arquivo):** Este arquivo não integra pagamento diretamente.

**Existe no disco:** sim

```tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, Modal } from 'react-native';
import { CookieConsent } from '@/components/CookieConsent';
import { EngagementNotificationSync } from '@/components/EngagementNotificationSync';
import { ToastContainer } from '@/components/Toast';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEffect, useRef, useState } from 'react';
import { saveQuizDoneLocal, readQuizDoneLocal } from '@/lib/quizDevicePersistence';
import { supabase } from '@/lib/supabase';

function AuthGate() {
  const { session, loading, user } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const isNavigating = useRef(false);
  const [quizChecked, setQuizChecked] = useState(false);

  useEffect(() => {
    setQuizChecked(false);
  }, [user?.id]);

  useEffect(() => {
    if (loading) return;

    const currentSegment = segments?.[0] as string | undefined;
    const inAuthGroup = currentSegment === '(auth)';
    const inTabsGroup = currentSegment === '(tabs)';
    const inWebGroup = currentSegment === 'web';
    const isPublicPage = currentSegment === 'confirm-email' || currentSegment === 'reset-password';

    if (inWebGroup || isPublicPage) return;

    if (session && user) {
      if (inAuthGroup) {
        if (isNavigating.current) return;
        isNavigating.current = true;
        router.replace('/(tabs)/home');
        setTimeout(() => { isNavigating.current = false; }, 500);
      }
    } else {
      if (inTabsGroup) {
        if (isNavigating.current) return;
        isNavigating.current = true;
        router.replace('/(auth)/login');
        setTimeout(() => { isNavigating.current = false; }, 500);
      }
    }
  }, [session, loading, user, segments, router]);

  useEffect(() => {
    if (loading || !session || !user || quizChecked) return;

    const currentSegment = segments?.[0] as string | undefined;
    const inTabsGroup = currentSegment === '(tabs)';
    const currentTab = segments?.[1] as string | undefined;
    const inWebGroup = currentSegment === 'web';
    const isPublicPage = currentSegment === 'confirm-email' || currentSegment === 'reset-password';

    if (!inTabsGroup || inWebGroup || isPublicPage) return;

    setQuizChecked(true);

    (async () => {
      try {
        const localDone = await readQuizDoneLocal(user.id);

        if (localDone) {
          console.log('[QUIZ_GATE:LOCAL] Quiz already done locally');
          return;
        }

        const metaDone =
          (user?.user_metadata as { quiz_completed?: boolean } | undefined)?.quiz_completed === true;
        if (metaDone) {
          console.log('[QUIZ_GATE:AUTH_META] Quiz done in JWT metadata');
          await saveQuizDoneLocal(user.id);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('quiz_completed')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('[QUIZ_GATE:SUPABASE_ERROR]', error);
          return;
        }

        const profileData = profile as { quiz_completed?: boolean } | null;
        if (profileData?.quiz_completed === true) {
          console.log('[QUIZ_GATE:SUPABASE] Quiz already done, saving locally');
          await saveQuizDoneLocal(user.id);
          return;
        }

        if (currentTab !== 'home') {
          if (isNavigating.current) return;
          isNavigating.current = true;
          console.log('[QUIZ_GATE:REDIRECT] Quiz not done, forcing home quiz gate');
          router.replace('/(tabs)/home');
          setTimeout(() => { isNavigating.current = false; }, 500);
        }
      } catch (err) {
        console.error('[QUIZ_GATE:ERROR]', err);
      }
    })();
  }, [loading, session, user, quizChecked, segments, router]);

  return null;
}

function RootNavigator() {
  const { loading, sessionConflict, clearSessionConflict } = useAuth();
  const { isDark } = useTheme();

  return (
    <View style={styles.root}>
      <View style={[styles.navContainer, { backgroundColor: isDark ? '#0d0d16' : '#f8fafc' }]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="web" />
          <Stack.Screen name="payment" />
          <Stack.Screen name="checkout" />
          <Stack.Screen name="privacy" />
          <Stack.Screen name="terms" />
          <Stack.Screen name="qrcode" />
          <Stack.Screen name="business-card" />
          <Stack.Screen name="confirm-email" />
          <Stack.Screen name="reset-password" />
          <Stack.Screen name="+not-found" />
        </Stack>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#d4a96a" />
          </View>
        )}

        <Modal visible={sessionConflict} transparent animationType="fade" onRequestClose={clearSessionConflict}>
          <View style={styles.conflictOverlay}>
            <View style={styles.conflictBox}>
              <Text style={styles.conflictTitle}>Sessão encerrada</Text>
              <Text style={styles.conflictMessage}>
                Sua conta foi acessada em outro dispositivo.
              </Text>
              <TouchableOpacity style={styles.conflictButton} onPress={clearSessionConflict}>
                <Text style={styles.conflictButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <AuthGate />
      </View>
    </View>
  );
}

export default function AppLayout() {
  useFrameworkReady();

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <ToastProvider>
                <RootNavigator />
                <EngagementNotificationSync />
                <CookieConsent />
                <ToastContainer />
              </ToastProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  navContainer: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(7,7,15,0.85)',
    zIndex: 999,
  },
  conflictOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  conflictBox: {
    backgroundColor: '#1a1f2e',
    borderRadius: 16,
    padding: 28,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a3040',
  },
  conflictTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e8d5b7',
    marginBottom: 12,
    textAlign: 'center',
  },
  conflictMessage: {
    fontSize: 15,
    color: '#8892a4',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  conflictButton: {
    backgroundColor: '#d4a96a',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 10,
  },
  conflictButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
});
```

---

### `app/web/_layout.tsx`

**Descrição no pedido de exportação:** Stack /web — Expo Router

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/web/_layout.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Stack Navigator Expo Router para prefixo `/web`.

**Como o pagamento está integrado (neste arquivo):** Este arquivo não integra pagamento diretamente.

**Existe no disco:** sim

```tsx
import { Stack, Redirect } from 'expo-router';
import { Platform } from 'react-native';
import { ProgressProvider } from '@/contexts/ProgressContext';

export default function WebLayout() {
  if (Platform.OS !== 'web') {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <ProgressProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="programa" />
        <Stack.Screen name="coach" />
        <Stack.Screen name="sobre" />
        <Stack.Screen name="assinar" />
        <Stack.Screen name="licao/[id]" />
      </Stack>
    </ProgressProvider>
  );
}
```

---

### `app/payment.tsx`

**Descrição no pedido de exportação:** Tela de pagamento no app (Stripe / fluxo nativo)

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/payment.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Fluxo de checkout; chama Supabase functions ou Stripe; pode usar `useAuth`.

**Como o pagamento está integrado (neste arquivo):** Integração Stripe: chamadas às Edge Functions Supabase para criar sessão Checkout ou Payment Intent; redirecionamento ao Stripe Hosted Checkout ou fluxo de cartão conforme implementação.

**Existe no disco:** sim

```tsx
import { Platform, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import PaywallScreen from '@/components/PaywallScreen';

export default function PaymentScreen() {
  const router = useRouter();
  const { language } = useLanguage();

  const handleCheckout = async (plan: 'annual') => {
    const origin =
      Platform.OS === 'web' && typeof window !== 'undefined'
        ? window.location.origin
        : 'https://gozzzz.app';
    const successUrl = `${origin}/web/assinar?success=true`;
    const cancelUrl = `${origin}/web/assinar`;

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/process-payment`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan, language, successUrl, cancelUrl }),
      }
    );

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error(`Error response: ${response.status}`);
    }

    if (!response.ok || data.error) {
      throw new Error(data.error || 'Payment failed. Please try again.');
    }

    if (data.url) {
      if (Platform.OS === 'web') {
        window.location.href = data.url;
      } else {
        await Linking.openURL(data.url);
      }
    }
  };

  return (
    <PaywallScreen
      language={language}
      onClose={() => router.back()}
      onCheckout={handleCheckout}
    />
  );
}
```

---

### `app/web/assinar.tsx`

**Descrição no pedido de exportação:** Checkout web — integração Stripe na rota /web/assinar

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/web/assinar.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Fluxo de checkout; chama Supabase functions ou Stripe; pode usar `useAuth`.

**Como o pagamento está integrado (neste arquivo):** Integração Stripe: chamadas às Edge Functions Supabase para criar sessão Checkout ou Payment Intent; redirecionamento ao Stripe Hosted Checkout ou fluxo de cartão conforme implementação.

**Existe no disco:** sim

```tsx
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import Head from 'expo-router/head';
import { useLanguage } from '@/contexts/LanguageContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Moon, ArrowLeft, Crown, Check, Shield, Lock, BadgeCheck, Star, CircleAlert as AlertCircle } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';
const isWeb = Platform.OS === 'web';

interface PricingData {
  currency: string;
  symbol: string;
  annual: {
    price: number;
    label: string;
    equiv: string;
    note: string;
  };
}

const DEFAULT_PRICING: Record<'pt' | 'en', PricingData> = {
  pt: {
    currency: 'BRL',
    symbol: 'R$',
    annual: {
      price: 147,
      label: 'R$ 147',
      equiv: 'acesso vitalício',
      note: 'pagamento único',
    },
  },
  en: {
    currency: 'USD',
    symbol: '$',
    annual: {
      price: 24.99,
      label: '$24.99',
      equiv: 'lifetime access',
      note: 'one-time payment',
    },
  },
};

const CONTENT = {
  headerTitle: 'web.subscribe.headerTitle',
  headerSubtitle: 'web.subscribe.headerSubtitle',
  yearly: 'web.subscribe.annualPlan',
  monthly: 'web.subscribe.monthlyPlan',
  perMonth: 'web.subscribe.perMonth',
  disclaimer: 'web.subscribe.disclaimer',
  included: 'web.subscribe.included',
  testimonials: 'web.subscribe.testimonials',
  successTitle: 'web.subscribe.successTitle',
  successDesc: 'web.subscribe.successDesc',
  successBtn: 'web.subscribe.successBtn',
  guaranteeTitle: 'web.subscribe.guaranteeTitle',
  guaranteeDesc: 'web.subscribe.guaranteeDesc',
  back: 'web.subscribe.back',
  redirecting: 'web.subscribe.redirecting',
  errorMsg: 'web.subscribe.errorMsg',
  features: [
    'web.subscribe.feature1',
    'web.subscribe.feature2',
    'web.subscribe.feature3',
    'web.subscribe.feature4',
    'web.subscribe.feature5',
    'web.subscribe.feature6',
    'web.subscribe.feature7',
    'web.subscribe.feature8',
  ],
  testimonialData: [
    { name: 'web.subscribe.testimonial1Name', text: 'web.subscribe.testimonial1Text', stars: 5 },
    { name: 'web.subscribe.testimonial2Name', text: 'web.subscribe.testimonial2Text', stars: 5 },
    { name: 'web.subscribe.testimonial3Name', text: 'web.subscribe.testimonial3Text', stars: 5 },
  ],
  localeBadge: 'web.subscribe.localeBadge',
};

export default function WebAssinarPage() {
  const router = useRouter();
  const { t: translate } = useLanguage();
  const language: 'pt' = 'pt';
  const t = (key: string) => translate(key, 'pt');
  const [selectedPlan] = useState<'annual'>('annual');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pricing, setPricing] = useState<PricingData>(DEFAULT_PRICING.pt);

  useEffect(() => {
    if (isWeb) {
      const params = new URLSearchParams(window.location.search);
      if (params.get('success') === 'true') {
        setSuccess(true);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const currency = 'BRL';
        const { data } = await (supabase.from('pricing') as any)
          .select('price, label, equiv, note')
          .eq('plan_type', 'annual')
          .eq('currency', currency)
          .maybeSingle();

        console.log('PRICING DATA:', data);

        if (data) {
          setPricing({
            currency,
            symbol: 'R$',
            annual: {
              price: data.price,
              label: data.label,
              equiv: data.equiv,
              note: data.note,
            },
          });
        }
      } catch (err) {
        console.error('Error fetching pricing:', err);
        setPricing(DEFAULT_PRICING.pt);
      }
    })();
  }, []);

  const c = CONTENT;
  const p = pricing;

  const handleAssinar = async () => {
    setLoading(true);
    setError(null);

    try {
      const origin = isWeb ? window.location.origin : 'https://gozzzz.app';
      const successUrl = `${origin}/web/assinar?success=true`;
      const cancelUrl = `${origin}/web/assinar`;

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/process-payment`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: selectedPlan,
            locale: language === 'pt' ? 'BR' : 'US',
            language,
            successUrl,
            cancelUrl,
          }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch {
        setError(`Error response: ${response.status}`);
        return;
      }

      if (!response.ok || data.error) {
        setError(data.error || c.errorMsg);
        return;
      }

      if (data.url && isWeb) {
        window.location.href = data.url;
      }
    } catch {
      setError(c.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{t('web.subscribe.headTitle')}</title>
        <meta name="description" content={t('web.subscribe.headDesc')} />
        <meta property="og:title" content={t('web.subscribe.headTitle')} />
        <meta property="og:description" content={t('web.subscribe.ogDesc')} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://gozzzz.app/web/assinar" />
      </Head>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#0f172a', '#1e293b']} style={styles.nav}>
        <View style={styles.navInner}>
          <TouchableOpacity onPress={() => router.push('/web')} style={styles.navBrand}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22 }}>
              <Moon size={22} color="#fbbf24" strokeWidth={2} />
            </div>
            <Text style={styles.navBrandText}>GoZzzz</Text>
          </TouchableOpacity>
          <View style={styles.navRight}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ArrowLeft size={18} color="#94a3b8" />
              <Text style={styles.backBtnText}>{t(c.back)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      <LinearGradient colors={['#1e293b', '#0f172a']} style={styles.header}>
        <Crown size={52} color="#fbbf24" />
        <Text style={styles.headerTitle}>{t(c.headerTitle)}</Text>
        <Text style={styles.headerSubtitle}>{t(c.headerSubtitle)}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.container}>
          {success ? (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Check size={40} color="#10b981" />
              </View>
              <Text style={styles.successTitle}>{t(c.successTitle)}</Text>
              <Text style={styles.successDesc}>{t(c.successDesc)}</Text>
              <TouchableOpacity style={styles.successBtn} onPress={() => router.push('/web/programa')}>
                <Text style={styles.successBtnText}>{t(c.successBtn)}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.grid}>
              <View style={styles.checkoutCol}>
                <View style={[styles.planCard, styles.planCardSelected]}>
                  <View style={styles.planRow}>
                    <View style={styles.planInfo}>
                      <View style={styles.planPriceRow}>
                        <Text style={[styles.planPrice, styles.planPriceActive, { display: 'none' }]}>
                          {p.annual.label}
                        </Text>
                      </View>
                      <Text style={styles.planTotal}>{p.annual.equiv} - {p.annual.note}</Text>
                    </View>
                  </View>
                </View>


                {error && (
                  <View style={styles.errorBox}>
                    <AlertCircle size={16} color="#ef4444" />
                    <Text style={styles.errorText}>{error || t(c.errorMsg)}</Text>
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.checkoutBtn, loading && styles.checkoutBtnDisabled]}
                  onPress={handleAssinar}
                  activeOpacity={0.85}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator size="small" color="#0d0d16" />
                      <Text style={styles.checkoutBtnText}>{t(c.redirecting)}</Text>
                    </>
                  ) : (
                    <>
                      <Crown size={20} color="#0d0d16" />
                      <Text style={styles.checkoutBtnText}>
                        {t('web.subscribe.subscribe')}
                      </Text>
                    </>
                  )}
                </TouchableOpacity>

                <Text style={styles.disclaimer}>{t(c.disclaimer)}</Text>

                <View style={styles.securityBadges}>
                  <View style={styles.securityBadge}>
                    <Lock size={14} color="#10b981" />
                    <Text style={styles.securityBadgeText}>{t('payment.ssl')}</Text>
                  </View>
                  <View style={styles.securityBadge}>
                    <Shield size={14} color="#3b82f6" />
                    <Text style={styles.securityBadgeText}>Stripe Secure</Text>
                  </View>
                  <View style={styles.securityBadge}>
                    <BadgeCheck size={14} color="#f59e0b" />
                    <Text style={styles.securityBadgeText}>{t('payment.pciDss')}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.featuresCol}>
                <Text style={styles.colTitle}>{t(c.included)}</Text>
                <View style={styles.featuresCard}>
                  {c.features.map((feature, i) => (
                    <View key={i} style={styles.featureItem}>
                      <View style={styles.featureCheck}>
                        <Check size={14} color="#10b981" />
                      </View>
                      <Text style={styles.featureText}>{t(feature)}</Text>
                    </View>
                  ))}
                </View>

                <Text style={[styles.colTitle, { marginTop: 32 }]}>{t(c.testimonials)}</Text>
                {[
                  { name: t(c.testimonialData[0].name), text: t(c.testimonialData[0].text), stars: 5 },
                  { name: t(c.testimonialData[1].name), text: t(c.testimonialData[1].text), stars: 5 },
                  { name: t(c.testimonialData[2].name), text: t(c.testimonialData[2].text), stars: 5 },
                ].map((testimonial, i) => (
                  <View key={i} style={styles.testimonialCard}>
                    <View style={styles.testimonialStars}>
                      {Array.from({ length: testimonial.stars }).map((_, s) => (
                        <Star key={s} size={13} color="#fbbf24" fill="#fbbf24" />
                      ))}
                    </View>
                    <Text style={styles.testimonialText}>&quot;{t(testimonial.text)}&quot;</Text>
                    <Text style={styles.testimonialName}>— {t(testimonial.name)}</Text>
                  </View>
                ))}

                <View style={styles.guaranteeCard}>
                  <BadgeCheck size={32} color="#10b981" />
                  <View style={styles.guaranteeText}>
                    <Text style={styles.guaranteeTitle}>{t(c.guaranteeTitle)}</Text>
                    <Text style={styles.guaranteeDesc}>{t(c.guaranteeDesc)}</Text>
                  </View>
                </View>

              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{t('web.footer.copyright')}</Text>
        <Text style={styles.footerCompany}>MORFEU SAÚDE E TECNOLOGIA LTDA</Text>
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
  navRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  localeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(251,191,36,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(251,191,36,0.25)',
  },
  localeBadgeText: { fontSize: 12, fontWeight: '700', color: '#fbbf24' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backBtnText: { fontSize: 14, color: '#94a3b8', fontWeight: '500' },

  header: { paddingTop: 56, paddingBottom: 48, paddingHorizontal: 24, alignItems: 'center' },
  headerTitle: {
    fontSize: isWeb ? 44 : 30,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  headerSubtitle: { fontSize: 17, color: '#94a3b8', textAlign: 'center', marginBottom: 16 },
  headerLocalePill: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  headerLocalePillText: { fontSize: 12, fontWeight: '600', color: '#94a3b8' },

  content: { paddingVertical: 56 },
  container: { maxWidth: 1100, alignSelf: 'center', width: '100%', paddingHorizontal: 24 },

  grid: {
    flexDirection: isWeb ? 'row' : 'column',
    gap: 40,
    alignItems: 'flex-start',
  },
  checkoutCol: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  featuresCol: { flex: isWeb ? 1 : undefined, width: isWeb ? undefined : '100%' },
  colTitle: { fontSize: 22, fontWeight: '800', color: '#e8d5b7', marginBottom: 20 },

  planCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  planCardSelected: {
    borderColor: '#d4a96a',
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
  },
  planSavings: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  planSavingsText: { fontSize: 12, fontWeight: '700', color: '#10b981' },
  planRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planInfo: { flex: 1 },
  planName: { fontSize: 17, fontWeight: '700', color: '#8892a4', marginBottom: 6 },
  planNameActive: { color: '#e8d5b7' },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: 4 },
  planPrice: { fontSize: 36, fontWeight: '800', color: '#5a5a72' },
  planPriceActive: { color: '#d4a96a' },
  planPer: { fontSize: 15, color: '#8892a4', fontWeight: '500' },
  planTotal: { fontSize: 13, color: '#5a5a72' },
  radio: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  radioActive: { borderColor: '#d4a96a' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#d4a96a' },

  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  errorText: { flex: 1, fontSize: 13, color: '#ef4444', lineHeight: 18 },

  checkoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#d4a96a',
    paddingVertical: 20,
    borderRadius: 16,
    marginTop: 24,
    marginBottom: 12,
    shadowColor: '#d4a96a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  checkoutBtnDisabled: { opacity: 0.7 },
  checkoutBtnText: { fontSize: 18, fontWeight: '800', color: '#0d0d16' },
  disclaimer: { fontSize: 12, color: '#94a3b8', textAlign: 'center', lineHeight: 18, marginBottom: 16 },

  securityBadges: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  securityBadgeText: { fontSize: 12, fontWeight: '700', color: '#8892a4' },

  featuresCard: {
    backgroundColor: '#12121e',
    borderRadius: 16,
    padding: 24,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureCheck: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center', alignItems: 'center', flexShrink: 0,
  },
  featureText: { fontSize: 15, color: '#8892a4', flex: 1 },

  testimonialCard: {
    backgroundColor: '#12121e',
    borderRadius: 14,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  testimonialStars: { flexDirection: 'row', gap: 3, marginBottom: 10 },
  testimonialText: { fontSize: 14, color: '#8892a4', lineHeight: 22, fontStyle: 'italic', marginBottom: 8 },
  testimonialName: { fontSize: 13, color: '#5a5a72', fontWeight: '600' },

  guaranteeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.2)',
    marginTop: 4,
    marginBottom: 16,
  },
  guaranteeText: { flex: 1 },
  guaranteeTitle: { fontSize: 16, fontWeight: '700', color: '#e8d5b7', marginBottom: 6 },
  guaranteeDesc: { fontSize: 14, color: '#10b981', lineHeight: 20 },

  localeToggle: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    gap: 10,
  },
  localeToggleLabel: { fontSize: 13, color: '#64748b', textAlign: 'center' },
  localeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  localeToggleBtnText: { fontSize: 13, fontWeight: '700', color: '#3b82f6' },

  successBox: {
    backgroundColor: '#12121e',
    borderRadius: 24,
    padding: 48,
    alignItems: 'center',
    maxWidth: 500,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  successIcon: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: 'rgba(16,185,129,0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: 24,
  },
  successTitle: { fontSize: 28, fontWeight: '800', color: '#e8d5b7', textAlign: 'center', marginBottom: 12 },
  successDesc: { fontSize: 16, color: '#8892a4', textAlign: 'center', lineHeight: 26, marginBottom: 32 },
  successBtn: { backgroundColor: '#d4a96a', paddingHorizontal: 40, paddingVertical: 16, borderRadius: 14 },
  successBtnText: { fontSize: 16, fontWeight: '800', color: '#0d0d16' },

  footer: { backgroundColor: '#07070f', paddingVertical: 24, alignItems: 'center', gap: 4 },
  footerText: { fontSize: 13, color: '#8892a4' },
  footerCompany: { fontSize: 12, color: '#8892a4', fontWeight: '600' },
  footerCnpj: { fontSize: 12, color: '#64748b' },

});
```

---

### `supabase/functions/process-payment/index.ts`

**Descrição no pedido de exportação:** Edge Function — Stripe Checkout Sessions

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/supabase/functions/process-payment/index.ts`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Fluxo de checkout; chama Supabase functions ou Stripe; pode usar `useAuth`.

**Como o pagamento está integrado (neste arquivo):** Integração Stripe: chamadas às Edge Functions Supabase para criar sessão Checkout ou Payment Intent; redirecionamento ao Stripe Hosted Checkout ou fluxo de cartão conforme implementação.

**Existe no disco:** sim

```tsx
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  plan: "annual" | "monthly" | "yearly";
  language?: "pt" | "en";
  locale?: "BR" | "US";
  successUrl: string;
  cancelUrl: string;
}

const PRICES: Record<string, { amount: number; currency: string; name: string }> = {
  annual: {
    amount: 14700,
    currency: "brl",
    name: "GoZzzz Premium — Acesso Vitalício",
  },
  yearly: {
    amount: 29990,
    currency: "brl",
    name: "GoZzzz Premium — Anual",
  },
  monthly: {
    amount: 14700,
    currency: "brl",
    name: "GoZzzz Premium — Acesso Mensal",
  },
};

const PRICES_USD: Record<string, { amount: number; currency: string; name: string }> = {
  annual: {
    amount: 9480,
    currency: "usd",
    name: "GoZzzz Premium — Lifetime",
  },
  yearly: {
    amount: 9480,
    currency: "usd",
    name: "GoZzzz Premium — Annual",
  },
  monthly: {
    amount: 999,
    currency: "usd",
    name: "GoZzzz Premium — Monthly",
  },
};

function buildCheckoutParams(
  priceConfig: { amount: number; currency: string; name: string },
  stripeLocale: string,
  successUrl: string,
  cancelUrl: string
): URLSearchParams {
  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price_data][currency]": priceConfig.currency,
    "line_items[0][price_data][product_data][name]": priceConfig.name,
    "line_items[0][price_data][unit_amount]": priceConfig.amount.toString(),
    "line_items[0][quantity]": "1",
    success_url: successUrl,
    cancel_url: cancelUrl,
    locale: stripeLocale,
  });
  params.append("payment_method_types[]", "card");

  return params;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body: CheckoutRequest = await req.json();
    const { plan, language, locale, successUrl, cancelUrl } = body;

    if (!successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: successUrl, cancelUrl",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const isUsd = locale === "US" || language === "en";
    const priceTable = isUsd ? PRICES_USD : PRICES;
    const normalizedPlan = plan === "yearly" ? "yearly" : (plan ?? "annual");
    const priceConfig = priceTable[normalizedPlan] ?? priceTable.annual;
    const stripeLocale = language === "en" ? "en" : "pt-BR";

    const sessionBody = buildCheckoutParams(
      priceConfig,
      stripeLocale,
      successUrl,
      cancelUrl
    );

    const sessionResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: sessionBody.toString(),
      }
    );

    const sessionData = await sessionResponse.json();

    if (!sessionResponse.ok || sessionData.error) {
      console.error("Stripe error:", JSON.stringify(sessionData.error));
      return new Response(
        JSON.stringify({
          error:
            sessionData.error?.message ?? "Failed to create checkout session",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ url: sessionData.url, sessionId: sessionData.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout session error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create checkout session. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
```

---

### `supabase/functions/create-payment-intent/index.ts`

**Descrição no pedido de exportação:** Edge Function — Stripe Payment Intents

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/supabase/functions/create-payment-intent/index.ts`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Fluxo de checkout; chama Supabase functions ou Stripe; pode usar `useAuth`.

**Como o pagamento está integrado (neste arquivo):** Integração Stripe: chamadas às Edge Functions Supabase para criar sessão Checkout ou Payment Intent; redirecionamento ao Stripe Hosted Checkout ou fluxo de cartão conforme implementação.

**Existe no disco:** sim

```tsx
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentIntentRequest {
  plan: "annual" | "monthly" | "yearly";
  currency?: "brl" | "usd";
}

const PRICES: Record<
  string,
  Record<string, { amount: number; currency: string; label: string }>
> = {
  brl: {
    annual: { amount: 14700, currency: "brl", label: "GoZzzz Premium" },
    yearly: { amount: 29990, currency: "brl", label: "GoZzzz Premium Anual" },
    monthly: { amount: 14700, currency: "brl", label: "GoZzzz Premium Mensal" },
  },
  usd: {
    annual: { amount: 9480, currency: "usd", label: "GoZzzz Premium" },
    yearly: { amount: 9480, currency: "usd", label: "GoZzzz Premium Annual" },
    monthly: { amount: 999, currency: "usd", label: "GoZzzz Premium Monthly" },
  },
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body: PaymentIntentRequest = await req.json();
    const { plan, currency = "brl" } = body;
    const priceConfig = PRICES[currency]?.[plan] ?? PRICES.brl.annual;

    const intentBody = new URLSearchParams({
      amount: priceConfig.amount.toString(),
      currency: priceConfig.currency,
      "automatic_payment_methods[enabled]": "true",
      description: priceConfig.label,
    });

    const intentResponse = await fetch(
      "https://api.stripe.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: intentBody.toString(),
      }
    );

    const intentData = await intentResponse.json();

    if (!intentResponse.ok || intentData.error) {
      console.error("Stripe PI error:", JSON.stringify(intentData.error));
      return new Response(
        JSON.stringify({
          error:
            intentData.error?.message ?? "Failed to create payment intent",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        clientSecret: intentData.client_secret,
        paymentIntentId: intentData.id,
        amount: priceConfig.amount,
        currency: priceConfig.currency,
        label: priceConfig.label,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Payment intent error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create payment intent. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
```

---

### `contexts/LanguageContext.tsx`

**Descrição no pedido de exportação:** i18n — traduções pt/en inline no Context

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/contexts/LanguageContext.tsx`

**Stack:** Expo Router · React Native · React Native Web (rotas em `app/web/*`) · Supabase client · lucide-react-native

**Estado global (Context / etc.):** Este arquivo **é** o provider de i18n (`LanguageProvider`) — estado global de idioma + mapa `translations`.

**Como o pagamento está integrado (neste arquivo):** Este arquivo não integra pagamento diretamente.

**Existe no disco:** sim

```tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Platform } from 'react-native';
import * as Localization from 'expo-localization';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, lang?: Language) => string;
  languageSelected: boolean;
  confirmLanguage: () => void;
}

const translations = {
  pt: {
    // Tabs
    'tab.home': 'Início',
    'tab.program': 'Programa',
    'tab.coach': 'Sono+',
    'tab.about': 'Sobre',
    'tab.profile': 'Perfil',

    // Onboarding
    'onboarding.headline1': 'Sono profundo.',
    'onboarding.headline2': 'De forma consistente.',
    'onboarding.subheadline': 'Ciência do sono, aplicada à sua rotina.',
    'onboarding.cta': 'Começar — acesso gratuito por 3 dias',
    'onboarding.login': 'Entrar na minha conta',

    // Home
    'home.welcome': 'Bem-vindo ao GoZzzz',
    'home.subtitle': 'Melhore seu sono com 21 passos baseados em ciência',
    'home.startNow': 'Começar Agora',
    'home.dailyTips': 'Dicas do Dia',
    'home.step': 'Passo',
    'home.minutes': 'minutos',
    'home.steps': 'passos',

    // Welcome Screen
    'welcome.title': 'Durma Melhor,\nviva melhor.',
    'welcome.tagline': 'O problema não é que você não consegue dormir. É que ninguém te ensinou como.',
    'welcome.tagline2': 'Melatonina não resolve. Chá não resolve. A ciência explica por quê — e o que realmente funciona.',
    'welcome.credibility': 'Baseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores revistas científicas do mundo.',
    'welcome.brand': 'GoZzzz',
    'welcome.brandSub': 'Sleep Science App',
    'welcome.startFree': 'Começar Grátis',
    'welcome.microcopy': '3 lições gratuitas, sem cartão de crédito',
    'welcome.logIn': 'Entrar',
    'welcome.biometric': 'Ou use Face ID',
    'welcome.privacy': 'Seus dados são criptografados e seguros',
    'welcome.founderNote': '"O sono não é um luxo, é a fundação." — Sleep Science Team',
    'welcome.shareGoZzzz': 'Compartilhar GoZzzz',
    'welcome.leftTitle': 'Melhor sono,\ntodas as noites.',
    'welcome.leftSub': 'Protocolos de sono baseados em ciência\ne publicações científicas revisadas por pares.',

    // Program
    'program.title': 'Programa de 21 Passos',
    'program.subtitle': 'Seu caminho para um sono melhor',
    'program.startProgram': 'Iniciar Programa de 21 Passos',
    'program.yourProgress': 'Seu Progresso',
    'program.completedSteps': 'passos concluídos de',
    'program.locked': 'Disponível no plano Premium',
    'program.loading': 'Carregando programa...',
    'program.noLessons': 'Nenhuma lição disponível no momento.',
    'program.retry': 'Recarregar',

    // Lesson Detail
    'lesson.step': 'Passo',
    'lesson.watchVideo': 'Assistir Vídeo',
    'lesson.listenAudio': 'Ouvir Áudio',
    'lesson.about': 'Sobre esta lição',
    'lesson.keyPoints': 'Pontos Principais',
    'lesson.markComplete': 'Marcar como Concluída',
    'lesson.continuing': 'Próxima Lição...',
    'lesson.completed': 'Lição Concluída',
    'lesson.loading': 'Carregando lição...',
    'lesson.notFound': 'Lição não encontrada',
    'lesson.back': 'Voltar',
    'lesson.goBack': 'Voltar',
    'lesson.premiumContent': 'Conteúdo Premium',
    'lesson.premiumSubtitle': 'Esta lição está disponível apenas para assinantes. Assine para desbloquear todas as 21 lições.',
    'lesson.subscribeNow': 'Assinar Agora',
    'lesson.teaserBadge': 'PRÉVIA GRATUITA',
    'lesson.teaserUnlockTitle': 'Desbloqueie este passo completo',
    'lesson.teaserUnlockSub': '21 lições interativas que guiam você passo a passo para noites melhores\n\nCada etapa fundamentada nas pesquisas das melhores universidades e publicações científicas dos EUA\n\nAvance no seu próprio ritmo — sem pressa, com propósito\n\nJá disponível para iOS e Android, com acesso pela Web disponível',
    'lesson.teaserCta': 'Assinar Premium Agora',
    'lesson.teaserAlreadySub': 'Já sou assinante — Entrar',
    'lesson.expertContent': 'Conteúdo dos Especialistas',
    'lesson.youtubeVideo': 'Vídeo no YouTube',
    'lesson.videoCaptions': 'Com legendas em português',
    'lesson.spotifyPodcast': 'Podcast Spotify',
    'lesson.scientificInsights': 'Insights Científicos',
    'lesson.minutes': 'minutos',
    'lesson.errorOpeningVideo': 'Erro ao abrir vídeo',
    'lesson.errorOpeningPodcast': 'Erro ao abrir podcast',

    // Coach
    'coach.title': 'Consultoria Sono+',
    'coach.subtitle': 'Uma sessão de diagnóstico e um plano concreto para começar a dormir melhor.',
    'coach.intro.title': '',
    'coach.intro.text':
      'A maioria das soluções para insônia trata o sintoma. Esta consultoria trata a causa — mapeando seus hábitos, rotina, ambiente e padrões de sono para construir um protocolo que funciona no seu contexto, não no de outra pessoa.',
    'coach.pain.title': 'Você já tentou de tudo.',
    'coach.pain.body':
      'Dormir mais cedo. Evitar o celular. Chá antes de dormir. Aplicativos de meditação.\n\nTalvez tenha funcionado por alguns dias. Depois voltou tudo como antes.\n\nNão é falta de disciplina. É que nenhuma dessas soluções foi feita para o seu caso — elas foram feitas para todo mundo, e todo mundo é ninguém.',
    'coach.cause.title': 'O sono tem causa. E ela é diferente para cada pessoa.',
    'coach.cause.body':
      'A ciência do sono mostra que dificuldades para dormir raramente têm uma causa única. Elas são resultado de uma combinação de fatores — comportamentais, ambientais, emocionais e biológicos — que variam de pessoa para pessoa.\n\nÉ por isso que receitas genéricas não funcionam de forma consistente. O que resolve para uma pessoa pode ser irrelevante para outra.\n\nUm diagnóstico individualizado não é um luxo. É o ponto de partida para qualquer mudança real.',
    'coach.services.title': 'O que inclui',
    'coach.service1.title': 'Saúde Emocional',
    'coach.service1.desc': 'Trabalho profundo com suas emoções, ansiedade, estresse e padrões emocionais que afetam seu bem-estar.',
    'coach.service2.title': 'Otimização do Sono',
    'coach.service2.desc':
      'Protocolo personalizado baseado no seu estilo de vida, cronótipo e desafios específicos — com estratégias que você consegue colocar em prática.',
    'coach.service3.title': 'Medicina Integrativa',
    'coach.service3.desc': 'Abordagem holística incluindo nutrição, movimento, suplementação e práticas integrativas.',
    'coach.service4.title': 'Plano Personalizado',
    'coach.service4.desc': 'Protocolo único desenvolvido para você, considerando sua história, objetivos e desafios.',
    'coach.process.title': 'Como funciona',
    'coach.step1.title': 'Diagnóstico Completo',
    'coach.step1.desc':
      '60 minutos para mapear sua história de sono, rotina diária, ambiente e padrões comportamentais. Saímos com um retrato claro do que está impedindo você de dormir bem.',
    'coach.step2.title': 'Protocolo Personalizado',
    'coach.step2.desc':
      'Um plano estruturado com mudanças de comportamento, higiene do sono e ajustes de rotina baseados em evidências. Inclui também os fatores emocionais e cognitivos que sabotam o sono — porque ignorá-los raramente funciona.',
    'coach.step3.title': 'Suporte Contínuo',
    'coach.step3.desc':
      'Acesso direto via WhatsApp para ajustes em tempo real conforme você coloca o plano em prática. O sono muda — o acompanhamento também.',
    'coach.trust.title': 'Por que confiar em mim?',
    'coach.trust.text1':
      'Por 10 anos convivi com insônia e sono fragmentado. Tentei de tudo — e aprendi, na prática, o que funciona e o que não funciona. Essa experiência me levou a estudar neurociência e medicina do sono com seriedade. Hoje não trabalho com receitas genéricas: trabalho com o que a ciência comprova e com o que vivi na pele.',
    'coach.trust.text2': '',
    'coach.cta.title': 'Pronto para entender de verdade por que você não dorme bem?',
    'coach.cta.subtitle':
      'Agende sua sessão de diagnóstico e saia com um plano concreto — não com mais tentativas no escuro.',
    'coach.cta.book': 'Agendar minha sessão',
    'coach.cta.whatsapp': 'Falar no WhatsApp',
    'coach.investment.title': 'Preço',
    'coach.price1.label': 'Coaching Individual de Sono',
    'coach.price1.badge': 'Mais Popular',
    'coach.price1.amount': 'R$ 497',
    'coach.price1.desc': 'Sessão inicial de 90 minutos + Plano personalizado',
    // About
    'about.title': 'Sobre o GoZzzz',
    'about.mission.title': 'Nossa Missão',
    'about.mission.text': 'Democratizar o acesso ao conhecimento científico sobre sono de qualidade, tornando as descobertas de pesquisadores de referência acessíveis a todos.',
    'about.science.title': 'Baseado em Ciência',
    'about.science.text': 'Cada passo do programa foi desenvolvido com base em pesquisas dos principais neurocientistas e especialistas em sono do mundo.',
    'about.experts.title': 'Pesquisas Citadas no Programa',
    'about.expert1': 'Matthew Walker',
    'about.expert2': 'Andrew Huberman',
    'about.expert3': 'Michael Breus',
    'about.expert4': 'Charles Czeisler',
    'about.program.title': 'O Programa de 21 Passos',
    'about.program.text': 'Desenvolvido a partir de 10 anos de pesquisa pessoal e estudo da literatura científica sobre sono. Cada passo é uma aplicação prática de descobertas publicadas em pesquisas revisadas por pares.',
    'about.why.title': 'Por que o GoZzzz?',
    'about.why.text': 'Porque sono de qualidade não é luxo, é necessidade. É a base para saúde física, mental, emocional e desempenho em todas as áreas da vida. O GoZzzz condensa 10 anos de estudo em um programa simples, prático e baseado em ciência.',
    'about.contact': 'Contato: suporte@gozzzz.app',
    'about.version': 'Versão',

    // Profile
    'profile.title': 'Meu Perfil',
    'profile.subscription': 'Assinatura Atual',
    'profile.free': 'Plano Gratuito',
    'profile.premium': 'Plano Premium',
    'profile.gift': 'Código-presente ativado',
    'profile.unlockContent': 'Desbloqueie o programa completo de 21 passos e todo o conteúdo premium',
    'profile.subscribePremium': 'Assinar Premium',
    'profile.redeemGift': 'Resgatar código-presente',
    'profile.premiumAccess': 'Você tem acesso completo a todo o conteúdo premium!',
    'profile.settings': 'Configurações',
    'profile.language': 'Idioma',
    'profile.notifications': 'Notificações',
    'profile.notificationsPermissionDenied': 'Permissão negada. Ative notificações nas definições do sistema para lembretes de rotina.',
    'profile.darkMode': 'Modo Escuro',
    'profile.enabled': 'Ativado',
    'profile.disabled': 'Desativado',
    'profile.payment': 'Pagamento',
    'profile.paymentMethods': 'Formas de Pagamento',
    'profile.giftCards': 'Códigos-presente',
    'profile.manageSubscription': 'Gerenciar / Cancelar Assinatura',
    'profile.manageSubscriptionDesc': 'Cancele ou altere sua assinatura a qualquer momento',
    'profile.support': 'Suporte',
    'profile.helpCenter': 'Central de Ajuda',
    'profile.privacy': 'Privacidade e Termos',
    'profile.share': 'Compartilhar',
    'profile.qrcode': 'QR Code',
    'profile.businessCard': 'Cartão de Visita',
    'profile.logout': 'Sair da Conta',

    // Modals
    'modal.selectLanguage': 'Selecionar Idioma',
    'modal.paymentMethods.title': 'Formas de Pagamento',
    'modal.paymentMethods.text': 'Aceitamos as seguintes formas de pagamento:',
    'modal.paymentMethods.item1': 'Cartão de Crédito',
    'modal.paymentMethods.item3': 'PIX',
    'modal.redeemGift.title': 'Resgatar código-presente',
    'modal.redeemGift.text': 'Digite seu código-presente para desbloquear o acesso premium.',
    'modal.redeemGift.redeem': 'Resgatar',
    'modal.help.title': 'Central de Ajuda',
    'modal.help.text': 'Para qualquer dúvida em relação ao app por favor entre em contato conosco:',
    'modal.privacy.title': 'Privacidade e Termos',
    'modal.privacy.text': 'Consulte a Política de Privacidade e os Termos e Condições completos nas páginas dedicadas:',
    'modal.logout.title': 'Sair da Conta',
    'modal.logout.text': 'Tem certeza que deseja sair da sua conta?',
    'modal.logout.cancel': 'Cancelar',
    'modal.logout.confirm': 'Sair',

    // Program CTA
    'program.activateTest': 'Ativar Premium (Teste)',
    'program.premiumActivated': 'Premium Ativado!',
    'program.premiumActivatedMsg': 'Agora você tem acesso a todo o conteúdo.',
    'program.modal.badge': 'Acesso Premium',
    'program.modal.title': 'Desbloqueie o Conteúdo Premium',
    'program.modal.desc': 'Tenha acesso a todas as lições, técnicas avançadas e sessões de coaching pessoal para transformar a qualidade do seu sono.',
    'program.modal.feature1': 'Programa completo de 21 passos',
    'program.modal.feature2': 'Sessões de coaching com especialistas',
    'program.modal.feature3': 'Análise personalizada do sono',
    'program.modal.feature4': 'Acesso vitalício a atualizações',
    'program.modal.priceLabel': '',
    'program.modal.perMonth': 'por mês',
    'program.modal.cta': 'Desbloquear Agora',
    'program.modal.alreadySub': 'Já é assinante? Entrar',
    'program.ctaTitle': 'Desbloqueie os 21 Passos',
    'program.ctaSub': 'R$ 147',
    'program.ctaCard': 'Cartão',
    'program.ctaSubscribe': 'Assinar Premium Agora',
    'program.ctaSecurity': 'SSL 256-bit · PCI DSS · Pagamento seguro',

    // Coach CTA banner
    'coach.ctaBannerTitle': 'Assine o Programa Premium',
    'coach.ctaBannerSub': '',
    'coach.ctaSubscribe': 'Assinar Premium Agora',
    'coach.ctaSecurity': 'SSL 256-bit · PCI DSS · Pagamento seguro',
    'coach.disclaimer': 'Este serviço é exclusivamente educacional e de coaching comportamental do sono. Não realizamos diagnósticos, não prescrevemos tratamentos e não substituímos consulta médica, psicológica ou de qualquer profissional de saúde regulamentado pelo CFM, CFP ou outros conselhos profissionais.',

    // About hardcoded
    'about.headerSubtitle': 'Da insônia à clareza — com método, rigor e humanidade',
    'about.storyTitle': 'Minha História',
    'about.story1': 'Por quase 10 anos, vivi uma batalha silenciosa que poucos compreendiam. Noites intermináveis olhando para o teto, sonos fragmentados que me deixavam exausto, dias nebulosos onde mal conseguia funcionar. A insônia não era apenas sobre não dormir - era sobre perder a essência de quem eu era.',
    'about.story2': 'Tentei de tudo. Medicamentos que me deixavam como um zumbi. Chás e melatonina que não faziam diferença. Meditações que só aumentavam minha frustração. Cada noite era uma nova esperança que se transformava em decepção.',
    'about.story3': 'Foi quando percebi que precisava parar de procurar soluções rápidas e começar a entender a ciência por trás do sono. Mergulhei nas pesquisas revisadas por pares de neurocientistas e especialistas em medicina do sono.',
    'about.expert1Desc': '',
    'about.expert2Desc': '',
    'about.expert3Desc': '',
    'about.expert4Desc': '',
    'about.credibilityLine': 'Baseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores revistas científicas do mundo.',
    'about.references.title': 'Referências Científicas',
    'about.references.intro': 'O GoZzzz é baseado em estudos publicados nas maiores revistas científicas do mundo, incluindo:',
    'about.references.item1': 'Walker, M. (2017). Why We Sleep. Scribner.',
    'about.references.item2': 'Huberman, A.D. et al. (2022). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine.',
    'about.references.item3': 'Breus, M. (2016). The Power of When. Little, Brown and Company.',
    'about.references.item4': 'Czeisler, C.A. et al. (1999). Stability, precision, and near-24-hour period of the human circadian pacemaker. Science, 284(5423).',
    'about.references.item5': 'Xie, L. et al. (2013). Sleep drives metabolite clearance from the adult brain. Science, 342(6156).',
    'about.missionHighlight': 'Depois de 10 anos de sofrimento e estudos intensivos, recuperei meu sono. Hoje consigo dormir 7 a 8 horas tranquilamente praticamente todas as noites. É necessário disciplina — o corpo gosta de rotina.',
    'about.missionStory': 'O GoZzzz nasceu desta transformação. É o programa que eu gostaria de ter encontrado quando comecei minha jornada. Cada passo representa uma descoberta científica que implementei e que funcionou.',
    'about.feature1': 'Baseado em pesquisas científicas revisadas por pares',
    'about.feature2': 'Passos incrementais e sustentáveis',
    'about.feature3': 'Foco em mudanças comportamentais, não medicamentos',
    'about.feature4': 'Acessível a todos, sem custo proibitivo',
    'about.disclaimerTitle': 'Aviso de Saúde',
    'about.disclaimer1': 'O conteúdo disponibilizado pelo GoZzzz tem fins exclusivamente educacionais e informativos. As informações, técnicas e recomendações apresentadas neste aplicativo não constituem aconselhamento médico, diagnóstico ou tratamento de qualquer condição de saúde.',
    'about.disclaimer2': 'Antes de iniciar qualquer programa de mudança de hábitos relacionados ao sono, consulte um médico ou profissional de saúde qualificado, especialmente se você apresentar condições como apneia do sono, insônia crônica, transtornos do humor, uso de medicamentos ou outras condições médicas.',
    'about.disclaimer3': 'Os resultados descritos são experiências individuais e podem variar de pessoa para pessoa. O GoZzzz não garante resultados específicos. Em caso de sintomas persistentes ou agravamento de qualquer condição, procure atendimento médico imediatamente.',
    'about.disclaimer4': 'Este aplicativo não substitui o cuidado médico profissional.',
    'about.brandLine': 'Sobre nós',
    'about.heroEyebrow': 'Programa premium de sono',
    'about.heroKicker': 'Ciência aplicável, hábitos realistas e uma trilha clara — para quem quer resultados sem achismo.',
    'about.stat1Value': '21',
    'about.stat1Label': 'dias estruturados',
    'about.stat2Value': '21',
    'about.stat2Label': 'passos práticos',
    'about.stat3Value': '4',
    'about.stat3Label': 'cronótipos guiados',
    'about.manifesto': 'Sono excelente não é sorte — é uma sequência de decisões pequenas, repetidas, apoiadas por evidência.',
    'about.manifestoAuthor': 'Filosofia GoZzzz',
    'about.trustTitle': 'Por que isso é confiável',
    'about.trustBody': 'Referências a pesquisadores e publicações de referência. Linguagem responsável: educamos e motivamos — não substituímos seu médico nem prometemos curas.',
    'about.pillar1Title': 'Evidência, não moda',
    'about.pillar1Body': 'Cada tema liga-se a literatura revisada por pares ou manuais reconhecidos — sem "life hack" vazio.',
    'about.pillar2Title': 'Cronótipo com nuance',
    'about.pillar2Body': 'Leão, Urso, Lobo e Golfinho organizam o dia — sempre com o aviso de que são modelos educativos, não etiquetas clínicas.',
    'about.pillar3Title': 'Do conhecimento ao hábito',
    'about.pillar3Body': 'Vinte e um passos para sair da teoria e instalar rotinas que o relógio biológico reconhece.',
    'about.unlockTitle': 'Desbloquear o programa completo',
    'about.unlockSubtitle': 'Premium com todos os passos, atualizações de conteúdo e experiência sem limitações.',
    'about.unlockCta': 'Quero Premium',

    // Profile hardcoded
    'profile.footerSubtext': 'Feito com dedicação para apoiar seu sono',
    'profile.paymentValue': 'Cartão, PIX, Boleto',
    'profile.privacyBtn': 'Política de Privacidade',
    'profile.termsBtn': 'Termos e Condições',
    'profile.giftAlert': 'Seu código será validado em breve!',
    'profile.giftCodeRequired': 'Digite um código-presente.',
    'profile.notAuthenticated': 'Você precisa estar autenticado para resgatar o código.',
    'profile.giftRedeemError': 'Não foi possível resgatar o código-presente.',
    'profile.giftRedeemSuccess': 'Código-presente resgatado com sucesso!',

    // Web pages
    'web.nav.program': 'Programa',
    'web.nav.coach': 'Sono+',
    'web.nav.about': 'Sobre',
    'web.nav.subscribe': 'Assinar',
    'web.nav.back': 'Voltar',
    'web.badge.scienceBased': 'Baseado em neurociência',
    'web.hero.title': 'O problema não é que você não consegue dormir. É que ninguém te ensinou como.',
    'web.hero.titleSub': 'Melatonina não resolve. Chá não resolve. A ciência explica por quê — e o que realmente funciona.',
    'web.hero.subtitle': 'O programa que condensa 10 anos de estudo da literatura científica sobre sono — em etapas simples, práticas e baseadas em evidências.',
    'web.hero.startNow': 'Começar Agora',
    'web.hero.viewProgram': 'Ver o Programa',
    'web.hero.stat1': 'Passos científicos',
    'web.hero.stat2': 'Anos de pesquisa',
    'web.hero.stat3': 'Pesquisadores de referência',
    'web.problem.label': 'Você se reconhece?',
    'web.problem.title': 'O ciclo que rouba sua energia todo dia',
    'web.problem.item1': 'Acorda cansado mesmo dormindo horas suficientes',
    'web.problem.item2': 'Mente acelerada quando tenta dormir',
    'web.problem.item3': 'Acorda no meio da noite e não consegue voltar a dormir',
    'web.problem.item4': 'Depende de cafeína para funcionar durante o dia',
    'web.problem.item5': 'Fim de semana tenta "recuperar" o sono, mas não adianta',
    'web.problem.item6': 'Produtividade e humor impactados pela qualidade do sono',
    'web.solution.label': 'A solução',
    'web.solution.title': '21 passos baseados em ciência real',
    'web.solution.desc': 'Cada passo do programa GoZzzz é baseado em pesquisas publicadas por neurocientistas e especialistas em sono. Sem soluções mágicas — só ciência aplicada de forma prática.',
    'web.solution.viewAll': 'Ver todos os 21 passos',
    'web.experts.label': 'Baseado em',
    'web.experts.title': 'Pesquisadores de referência em sono',
    'web.testimonials.label': 'Resultados reais',
    'web.testimonials.title': 'Relatos de quem usa o programa',
    'web.pricing.label': 'Investimento',
    'web.pricing.title': 'Escolha seu plano',
    'web.pricing.monthly': 'Plano Mensal',
    'web.pricing.annual': 'Plano Anual',
    'web.pricing.perMonth': 'por mês',
    'web.pricing.perMonthAnnual': 'por mês · cobrado anualmente',
    'web.pricing.save': 'Economize 33%',
    'web.pricing.popular': 'Mais popular',
    'web.pricing.subscribeMonthly': 'Assinar Mensal',
    'web.pricing.subscribeAnnual': 'Assinar Anual',
    'web.pricing.feature1': '21 passos completos do programa',
    'web.pricing.feature2': 'Programa estruturado em 21 passos com base em ciência',
    'web.pricing.feature3': 'Baseado em ciência de 4 pesquisadores de referência',
    'web.pricing.feature4': 'Atualizações gratuitas incluídas',
    'web.pricing.feature5': 'Cancele a qualquer momento',
    'web.disclaimer.title': 'Aviso de Saúde',
    'web.disclaimer.text': 'O conteúdo do GoZzzz tem fins exclusivamente educacionais e informativos. Não constitui aconselhamento médico, diagnóstico ou tratamento. Consulte um profissional de saúde antes de iniciar qualquer programa, especialmente se você tiver condições de saúde preexistentes. Resultados individuais podem variar.',
    'web.cta.title': 'Pronto para melhorar\nseu sono?',
    'web.cta.subtitle': 'Criado por quem viveu 10 anos de insônia e transformou esse aprendizado em um programa baseado em ciência.',
    'web.cta.btn': 'Começar Agora',
    'web.footer.copy': 'suporte@gozzzz.app · © 2025 GoZzzz. Todos os direitos reservados.',

    // Web coach page
    'web.coach.navBtn': 'Agendar Sessão',
    'web.coach.heroTitle': 'Consultoria de sono baseada em ciência',
    'web.coach.heroSubtitleNew': 'Como especialista em sono, ofereço uma abordagem integrada que vai além das técnicas de sono. Trabalho com medicina integrativa, com foco especial na saúde emocional e no bem-estar integral.',
    'web.coach.heroBtn1': 'Agendar Sessão Inicial',
    'web.coach.heroBtn2': 'Descobrir o Programa',
    'web.coach.storyLabel': 'Por que confiar em mim',
    'web.coach.storyTitle': 'Uma jornada pessoal que se tornou propósito',
    'web.coach.storyText': 'Passei 10 anos enfrentando insônia e sono fragmentado. Essa jornada pessoal me motivou a estudar profundamente a ciência do sono através de pesquisas sobre neurociência e medicina do sono.',
    'web.coach.storyQuote': 'Hoje, aplico o conhecimento científico que adquiri para ajudar pessoas a melhorarem a qualidade do sono de forma sustentável.',
    'web.coach.storyEnd': 'Hoje, aplico o conhecimento científico que adquiri para ajudar pessoas a melhorarem a qualidade do sono de forma sustentável.',
    'web.coach.heroSubtitle': 'Você acorda cansado, mesmo dormindo horas suficientes?',
    'web.coach.heroDesc': 'Recupere sua energia, foco e bem-estar com uma abordagem que vai até a raiz do problema.',
    'web.coach.painPoints': 'Insônia, sono fragmentado, ansiedade noturna, acordar às 3h sem conseguir voltar a dormir... Isso não é frescura. É seu corpo pedindo socorro — e afetando seu trabalho, seus relacionamentos e sua saúde.',
    'web.coach.processLabel': 'Como funciona',
    'web.coach.processTitle': '3 etapas da consultoria',
    'web.coach.step1.title': 'Sessão Inicial Focada',
    'web.coach.step1.desc': '60 minutos para mapear sua história, desafios e objetivos de sono. Sem atalhos — cada etapa tem base científica.',
    'web.coach.step1.detail': '60 minutos · Online ou Presencial',
    'web.coach.step2.title': 'Plano Personalizado 360°',
    'web.coach.step2.desc': 'Desenvolvimento do seu protocolo integrado combinando sono, estilo de vida e saúde emocional. Você sai com um caminho claro e prático.',
    'web.coach.step2.detail': 'Entregue em 48 horas',
    'web.coach.step3.title': 'Acompanhamento Contínuo',
    'web.coach.step3.desc': 'Sessões regulares, ajustes no plano e suporte ao longo da sua evolução — porque mudanças de comportamento sustentáveis acontecem com consistência.',
    'web.coach.step3.detail': 'Suporte via WhatsApp incluído',
    'web.coach.includedLabel': 'O que inclui',
    'web.coach.includedTitle': 'Uma abordagem completa para sua vida',
    'web.coach.card1.title': 'Otimização do Sono',
    'web.coach.card1.desc': 'Estratégias personalizadas baseadas em seu cronótipo, estilo de vida e necessidades específicas — fundamentadas em protocolos da literatura científica.',
    'web.coach.card2.title': 'Medicina Integrativa',
    'web.coach.card2.desc': 'Uma abordagem que combina ciência do sono, saúde emocional e bem-estar com base em evidências, para mudanças sustentáveis.',
    'web.coach.card3.title': 'Acompanhamento Contínuo',
    'web.coach.card3.desc': 'Acompanhamento próximo via WhatsApp com ajustes em tempo real no seu plano conforme você evolui.',
    'web.coach.servicesLabel': 'O que inclui',
    'web.coach.servicesTitle': 'Consultoria completa de saúde',
    'web.coach.service1.title': 'Saúde Emocional',
    'web.coach.service1.desc': 'Trabalho profundo com suas emoções, ansiedade, estresse e padrões emocionais que afetam seu bem-estar e sono.',
    'web.coach.service2.title': 'Otimização do Sono',
    'web.coach.service2.desc': 'Estratégias personalizadas baseadas em seu estilo de vida, cronótipo e necessidades específicas.',
    'web.coach.service3.title': 'Medicina Integrativa',
    'web.coach.service3.desc': 'Abordagem holística incluindo nutrição, movimento, suplementação e práticas integrativas.',
    'web.coach.service4.title': 'Plano Personalizado',
    'web.coach.service4.desc': 'Protocolo único desenvolvido para você, considerando sua história, objetivos e desafios.',
    'web.coach.trustLabel': 'Prova Social',
    'web.coach.trustTitle': 'Relatos de clientes',
    'web.coach.trustText1': 'Experiências de clientes que aplicaram as estratégias do programa.',
    'web.coach.trustText2': 'Relatos individuais. Os resultados podem variar de pessoa para pessoa.',
    'web.coach.testimonial1': '"Consegui dormir 7 horas seguidas pela primeira vez em muito tempo."',
    'web.coach.testimonial1Author': 'Mariana S., 38 anos — São Paulo',
    'web.coach.testimonial2': '"Notei melhora no sono e na ansiedade ao longo das primeiras semanas seguindo o programa."',
    'web.coach.testimonial2Author': 'Carlos R., 45 anos — Rio de Janeiro',
    'web.coach.testimonial3': '"Percebo mais foco e disposição desde que melhorei minha rotina de sono."',
    'web.coach.testimonial3Author': 'Ana P., 32 anos, São Paulo',
    'web.coach.priceAnchor': 'Quantos anos você já perdeu produtividade, energia e saúde por não dormir bem? Qual o custo disso na sua carreira, nos seus relacionamentos, na sua vida?',
    'web.coach.scarcity': 'Atendo no máximo 8 clientes por mês para garantir atenção individualizada. Vagas limitadas.',
    'web.coach.promise': 'Com consistência ao longo do programa, você aplicará estratégias baseadas em ciência para melhorar gradualmente a qualidade do seu sono.',
    'web.coach.pricingLabel': 'Investimento',
    'web.coach.pricingTitle': 'Escolha sua jornada',
    'web.coach.mostPopular': 'Mais Popular',
    'web.coach.perMonth': '/mês',
    'web.coach.price1.label': 'Coaching Individual de Sono',
    'web.coach.price1.popular': 'Mais Popular',
    'web.coach.price1.tagline1': 'Uma sessão de diagnóstico.',
    'web.coach.price1.tagline2': 'Um plano feito para você.',
    'web.coach.price1.tagline3': 'Resultados que você sente.',
    'web.coach.price1.desc': '60 minutos online, de onde você estiver.',
    'web.coach.price1.f1': 'Mapeamento completo dos seus hábitos, rotina e ambiente de sono',
    'web.coach.price1.f1sub': '',
    'web.coach.price1.f2': 'Sessão online de 60 minutos — de onde você estiver, sem julgamentos',
    'web.coach.price1.f2sub': '',
    'web.coach.price1.f3':
      'Relatório personalizado com diagnóstico, estratégias e próximos passos — entregue em até 72h',
    'web.coach.price1.f3sub': '',
    'web.coach.price1.f4': 'Suporte via WhatsApp para dúvidas pontuais — acesso direto, sem IA',
    'web.coach.price1.f4sub': '',
    'web.coach.price1.f5': '30 dias de GoZzzz Premium com todos os recursos desbloqueados',
    'web.coach.price1.f5sub': '',
    'web.coach.price1.btn': 'Agendar minha sessão',
    'web.coach.price3.label': 'Comunidade Premium',
    'web.coach.price3.desc': 'Conteúdo exclusivo e grupo privado com acompanhamento mensal',
    'web.coach.price3.f1': 'Conteúdo semanal exclusivo',
    'web.coach.price3.f2': 'Grupo privado',
    'web.coach.price3.f3': 'Live em grupo mensal',
    'web.coach.price3.f4': 'Biblioteca de protocolos de sono',
    'web.coach.priceBtn': 'Quero Começar',
    'web.coach.ctaFinalTitle': 'Pronto para melhorar seu sono com ciência?',
    'web.coach.ctaFinalSubtitle': 'Agende sua sessão inicial e dê o primeiro passo com um plano baseado em evidências.',
    'web.coach.ctaFinalBtn': 'Agendar Sessão Inicial',
    'web.coach.securePayment': 'Pagamento Seguro',
    'web.coach.satisfaction': 'Satisfação Garantida',
    'web.coach.footerPrivacy': 'Política de Privacidade',
    'web.coach.footerTerms': 'Termos de Uso',
    'web.coach.footerCopy': 'MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52 · Todos os direitos reservados',
    'web.coach.headTitle': 'Coach GoZzzz - Consultoria Personalizada em Sono',
    'web.coach.headDesc': 'Consultoria personalizada em sono com estratégias baseadas em evidências. Avaliação individual, plano personalizado e acompanhamento contínuo.',
    'web.coach.ctaTitle': 'Pronto para melhorar seu sono com base em ciência?',
    'web.coach.ctaDesc': 'Agende uma sessão inicial e descubra como podemos trabalhar juntos para melhorar seu sono, energia e bem-estar.',
    'web.coach.ctaBtn1': 'Quero melhorar meu sono',
    'web.coach.ctaBtn2': 'Começar agora',
    'web.coach.subCtaTitle': 'Desbloqueie o Programa Completo',
    'web.coach.subCtaDesc': '21 passos científicos para melhorar seu sono. A partir de R$ 19,90/mês.',
    'web.coach.subCtaBtn': 'Assinar Premium Agora',

    // Web sobre page
    'web.sobre.heroTitle': 'Sobre o GoZzzz',
    'web.sobre.heroSubtitle': 'Quando a dor se transforma em propósito',
    'web.sobre.storyTitle': 'Minha História',
    'web.sobre.story1': 'Por quase 10 anos, vivi uma batalha silenciosa que poucos compreendiam. Noites intermináveis olhando para o teto, sonos fragmentados que me deixavam exausto, dias nebulosos onde mal conseguia funcionar. A insônia não era apenas sobre não dormir — era sobre perder a essência de quem eu era.',
    'web.sobre.story2': 'Tentei de tudo. Medicamentos que me deixavam como um zumbi. Chás e melatonina que não faziam diferença. Meditações que só aumentavam minha frustração. Cada noite era uma nova esperança que se transformava em decepção.',
    'web.sobre.story3': 'Foi quando percebi que precisava parar de procurar soluções rápidas e começar a entender a ciência por trás do sono. Mergulhei nas pesquisas revisadas por pares de neurocientistas e especialistas em medicina do sono.',
    'web.sobre.storyQuote': '"Depois de 10 anos de sofrimento e estudos intensivos, recuperei meu sono. Hoje consigo dormir 7 a 8 horas tranquilamente praticamente todas as noites. É necessário disciplina — o corpo gosta de rotina."',
    'web.sobre.story4': 'O GoZzzz nasceu desta transformação. É o programa que eu gostaria de ter encontrado quando comecei minha jornada. Cada passo representa uma descoberta científica que implementei e que funcionou.',
    'web.sobre.expertsTitle': 'Pesquisas Publicadas Citadas no Programa',
    'web.sobre.expert1.role': 'Pesquisador de sono · Autor de "Why We Sleep"',
    'web.sobre.expert1.detail': 'Autor do bestseller "Why We Sleep". Seus estudos publicados sobre os estágios do sono e o sono REM são amplamente citados na literatura científica.',
    'web.sobre.expert2.role': 'Neurocientista · Huberman Lab',
    'web.sobre.expert2.detail': 'Pesquisador e criador do Huberman Lab. Seus protocolos publicados sobre luz solar matinal e ritmo circadiano são referência na área.',
    'web.sobre.expert3.role': 'Especialista em Sono · The Sleep Doctor',
    'web.sobre.expert3.detail': 'Pioneiro em cronobiologia e descobridor dos 4 cronotipos. Seus estudos sobre consistência de horários de sono são amplamente citados.',
    'web.sobre.expert4.role': 'Pesquisador · Medicina do Sono',
    'web.sobre.expert4.detail': 'Pesquisador de ritmos circadianos com publicações em revistas revisadas por pares. Suas descobertas sobre luz artificial e melatonina são amplamente estudadas.',
    'web.sobre.missionTitle': 'Nossa Missão',
    'web.sobre.mission1': 'Democratizar o acesso ao conhecimento científico sobre sono de qualidade, tornando as descobertas de pesquisadores de referência acessíveis a todos.',
    'web.sobre.mission2': 'O GoZzzz nasceu desta transformação. É o programa que eu gostaria de ter encontrado quando comecei minha jornada. Cada passo representa uma descoberta científica que implementei e que funcionou.',
    'web.sobre.programTitle': 'O Programa de 21 Passos',
    'web.sobre.programText': 'Desenvolvido a partir de 10 anos de pesquisa pessoal e estudo da literatura científica sobre sono. Cada passo é uma aplicação prática de descobertas publicadas em pesquisas revisadas por pares.',
    'web.sobre.feature1': 'Baseado em pesquisas científicas revisadas por pares',
    'web.sobre.feature2': 'Passos incrementais e sustentáveis',
    'web.sobre.feature3': 'Foco em mudanças comportamentais, não medicamentos',
    'web.sobre.feature4': 'Acessível a todos, sem custo proibitivo',
    'web.sobre.whyTitle': 'Por que o GoZzzz?',
    'web.sobre.whyText': 'Porque sono de qualidade não é luxo, é necessidade. É a base para saúde física, mental, emocional e desempenho em todas as áreas da vida. O GoZzzz condensa 10 anos de estudo em um programa simples, prático e baseado em ciência.',
    'web.sobre.disclaimer1': 'O conteúdo disponibilizado pelo GoZzzz tem fins exclusivamente educacionais e informativos. As informações, técnicas e recomendações apresentadas não constituem aconselhamento médico, diagnóstico ou tratamento de qualquer condição de saúde.',

    // Web programa page
    'web.program.headTitle': 'Programa GoZzzz - 21 Passos para Melhorar seu Sono',
    'web.program.headDesc': 'Explore as 21 lições baseadas em ciência do programa GoZzzz. Cada passo é fundamentado em pesquisas revisadas por pares sobre neurociência do sono e ciência circadiana.',
    'web.program.ogDesc': 'Lições baseadas em ciência para transformar seu sono para sempre.',
    'web.program.title': 'O Programa de 21 Passos',
    'web.program.subtitle': 'Lições completas respaldadas por pesquisa científica do sono',
    'web.program.steps': 'Passos',
    'web.program.freeLessons': 'Lições Gratuitas',
    'web.program.eachStep': 'Cada passo',
    'web.program.pillApproxStep': '~5 min · passo',
    'web.program.stat3': 'Por passo',
    'web.program.allLessons': 'Todas as Lições',
    'web.program.learnScience': 'Aprenda a ciência do sono com nosso programa abrangente',
    'web.program.free': 'Gratuito',
    'web.program.premium': 'Premium',
    'web.program.video': 'Vídeo',
    'web.program.audio': 'Áudio',
    'web.program.viewLesson': 'Ver Lição',
    'web.program.unlockPremium': 'Desbloquear Premium',
    'web.program.ctaTitle': 'Desbloqueie Todas as 21 Lições',
    'web.program.ctaDesc': 'Obtenha acesso ao programa completo com conteúdo exclusivo',
    'web.program.feature1': 'Programa completo de 21 passos',
    'web.program.feature2': 'Lições escritas e passos práticos',
    'web.program.feature3': 'Coaching de especialista incluído',
    'web.program.subscribeNow': 'Assinar Agora',
    'web.program.pathTitle': 'Como o programa funciona na prática',
    'web.program.path1':
      'Cada lição traduz ciência do sono em um movimento que você repete no dia seguinte — sem enrolação.',
    'web.program.path2':
      'As 3 primeiras etapas são gratuitas; depois, desbloqueie o restante com um pagamento único (acesso vitalício).',
    'web.program.path3':
      'Você percorre 21 passos em três blocos: entender o padrão, aplicar protocolos e fixar o ritmo.',

    // Web sobre page
    'web.about.headTitle': 'Sobre o GoZzzz - Nossa Missão e Metodologia',
    'web.about.headDesc': 'Descubra GoZzzz: democratizando o acesso à ciência do sono. Desenvolvido com base em pesquisas de especialistas líderes mundiais em neurociência e medicina do sono.',
    'web.about.ogDesc': 'Veja como o GoZzzz combina neurociência de ponta com acessibilidade para transformar o sono de milhares de pessoas.',
    'web.about.heroTitle': 'Sobre o GoZzzz',
    'web.about.heroSubtitle': 'Nossa missão é democratizar a ciência do sono',
    'web.about.storyTitle': 'Nossa História',
    'web.about.storyText1': 'Sono de qualidade não deveria ser um luxo. No entanto, para milhões, entender a ciência por trás do sono melhor parece fora do alcance. A maioria dos conselhos sobre sono é contraditória, avassaladora ou simplesmente não funciona.',
    'web.about.storyText2': 'É por isso que criamos o GoZzzz. Queríamos trazer a pesquisa do sono mais avançada diretamente para as pessoas que mais precisam — apresentada de forma clara, científica e prática.',
    'web.about.storyText3': 'Nosso programa é construído sobre décadas de pesquisa dos maiores cientistas do sono do mundo. Cada passo, cada lição, cada recomendação é fundamentada em neurociência revisada por pares.',
    'web.about.storyHighlight': 'O sono não é um luxo. É uma necessidade biológica que afeta cada aspecto da sua saúde. Estamos tornando a ciência acessível a todos.',
    'web.about.storyText4': 'Hoje, milhares de pessoas em todo o mundo estão usando o GoZzzz para recuperar seu sono, melhorar sua energia e transformar suas vidas.',
    'web.about.expertsTitle': 'Nossos Especialistas',
    'web.about.missionTitle': 'Nossa Missão',
    'web.about.missionText1': 'Democratizar o acesso à ciência do sono de classe mundial. A melhoria do sono não deveria exigir consultas caras ou anos de tentativa e erro. Tornamos a otimização de sono baseada em evidências disponível para todos.',
    'web.about.missionText2': 'Acreditamos que o sono de qualidade é fundamental para a saúde e felicidade humanas. Ao combinar a neurociência mais recente com orientação prática e acionável, estamos ajudando as pessoas a recuperar seu sono e transformar suas vidas.',
    'web.about.programTitle': 'Nosso Programa',
    'web.about.programText': 'GoZzzz é um programa completo de 21 passos projetado para melhorar sistematicamente todos os aspectos do seu sono. Cada passo se baseia no anterior, criando uma compreensão abrangente da ciência do sono.',
    'web.about.programFeature1': 'Construído por cientistas e pesquisadores de sono',
    'web.about.programFeature2': 'Respaldado por neurociência revisada por pares',
    'web.about.programFeature3': 'Coaching e suporte personalizados',
    'web.about.programFeature4': 'Acesso contínuo ao conteúdo do programa e atualizações',
    'web.about.whyTitle': 'Por que GoZzzz?',
    'web.about.whyText': 'Porque o sono merece a mesma atenção científica que damos à nutrição, condicionamento físico e saúde mental. O sono de qualidade é a base de tudo mais.',
    'web.about.disclaimerTitle': 'Aviso Médico',
    'web.about.disclaimerText1': 'O GoZzzz fornece informações educacionais sobre ciência do sono e não substitui aconselhamento médico profissional.',
    'web.about.disclaimerText2': 'Sempre consulte um profissional de saúde para distúrbios graves do sono, insônia ou outras condições médicas.',
    'web.about.disclaimerText3': 'Nosso programa é projetado para indivíduos saudáveis que buscam otimizar seu sono com base na ciência baseada em evidências.',
    'web.about.footerText': 'Para dúvidas, entre em contato: support@gozzzz.app',
    'web.about.footerCopy': '© 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52',

    // Web subscribe page
    'web.subscribe.headTitle': 'Assine o GoZzzz - Planos do Programa de Sono',
    'web.subscribe.headDesc': 'Escolha seu plano GoZzzz e acesse 21 passos de melhoria do sono baseados em ciência. Plano anual com pagamento único e acesso vitalício.',
    'web.subscribe.ogDesc': 'Acesse o programa completo de 21 passos com planos flexíveis. Otimização do sono baseada em ciência. Cancele quando quiser.',
    'web.subscribe.headerTitle': 'Assinar Premium',
    'web.subscribe.headerSubtitle': 'Acesse o programa completo — 21 passos baseados em ciência',
    'web.subscribe.successTitle': 'Assinatura Confirmada!',
    'web.subscribe.successDesc': 'Bem-vindo ao GoZzzz Premium. O acesso a todos os 21 passos do programa agora está desbloqueado.',
    'web.subscribe.successBtn': 'Ir para o Programa',
    'web.subscribe.choosePlan': 'Escolha seu plano',
    'web.subscribe.annualPlan': 'Plano Anual',
    'web.subscribe.monthlyPlan': 'Plano Mensal',
    'web.subscribe.yearlyBadge': 'Economize 37%',
    'web.subscribe.annually': 'faturado anualmente',
    'web.subscribe.billedMonthly': 'faturado mensalmente',
    'web.subscribe.subscribe': 'Assinar',
    'web.subscribe.annual': 'Anual',
    'web.subscribe.monthly': 'Mensal',
    'web.subscribe.redirecting': 'Redirecionando para pagamento seguro...',
    'web.subscribe.errorMsg': 'Falha ao iniciar pagamento. Por favor, tente novamente.',
    'web.subscribe.disclaimer': 'Cancele quando quiser. Sem taxas ocultas. Acesso imediato após confirmação.',
    'web.subscribe.included': 'O que está incluído',
    'web.subscribe.feature1': 'Programa completo de 21 passos',
    'web.subscribe.feature2': 'Resumos e ações claras em cada passo',
    'web.subscribe.feature3': 'Baseado em pesquisas científicas revisadas por pares',
    'web.subscribe.feature4': 'Neurociência do sono',
    'web.subscribe.feature5': 'Medicina e ritmos circadianos',
    'web.subscribe.feature6': 'Atualizações gratuitas incluídas',
    'web.subscribe.feature7': 'Acesso imediato após pagamento',
    'web.subscribe.feature8': 'Cancele quando quiser',
    'web.subscribe.testimonials': 'O que dizem os usuários',
    'web.subscribe.testimonial1Name': 'M.A.',
    'web.subscribe.testimonial1Text': 'Programa bem estruturado e baseado em ciência. Notei melhorias progressivas seguindo os passos consistentemente.',
    'web.subscribe.testimonial2Name': 'R.C.',
    'web.subscribe.testimonial2Text': 'Entendi a base fisiológica da minha fadiga matinal. O passo 2 sobre ritmo circadiano foi especialmente útil.',
    'web.subscribe.testimonial3Name': 'L.F.',
    'web.subscribe.testimonial3Text': 'O programa é muito bem estruturado; cada passo traduz ciência em hábitos concretos.',
    'web.subscribe.guaranteeTitle': 'Garantia de satisfação',
    'web.subscribe.guaranteeDesc': 'Se você não estiver satisfeito nos primeiros 7 dias, oferecemos reembolso de 100% do seu dinheiro. Sem perguntas.',
    'web.subscribe.perMonth': '/mês',
    'web.subscribe.back': 'Voltar',
    'web.subscribe.localeBadge': 'Brasil · BRL',

    // Web footer
    'web.footer.copyright': '© 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52',

    // Cronótipo premium (funil web + hero nativo)
    'web.chronoPremium.heroHeadlinePrefix': 'Você acorda cansado mesmo dormindo ',
    'web.chronoPremium.heroHeadlineHighlight': '8 horas',
    'web.chronoPremium.heroHeadlineSuffix': '?',
    'web.chronoPremium.nativeHeroHeadlineHighlight': '8 horas',
    'web.chronoPremium.nativeHeroHeadlineSuffix': '?',
    'web.chronoPremium.heroSubPrefix': 'Descubra em ',
    'web.chronoPremium.heroSubHighlight': '60 segundos',
    'web.chronoPremium.heroSubSuffix': ' seu cronótipo biológico',
    'web.chronoPremium.heroSub': 'Descubra em 60 segundos seu cronótipo biológico',
    'web.chronoPremium.ctaQuiz': 'Fazer o teste grátis',
    'web.chronoPremium.trustFree': 'Gratuito',
    'web.chronoPremium.trustFast': '60 segundos',
    'web.chronoPremium.trustSignup': 'Sem cadastro',
    'web.chronoPremium.trustLine': 'Gratuito • 60 segundos • Sem cadastro',
    'web.chronoPremium.scienceTitle': 'Baseado em ciência do sono',
    'web.chronoPremium.sciencePillar1': 'Cronobiologia',
    'web.chronoPremium.sciencePillar2': 'Ritmo circadiano',
    'web.chronoPremium.sciencePillar3': 'Arquitetura do sono',
    'web.chronoPremium.scienceBullets': 'Cronobiologia • Ritmo circadiano • Arquitetura do sono',
    'web.chronoPremium.scienceResearchersLead': 'Inspirado em pesquisas de',
    'web.chronoPremium.scienceResearchersNames': 'Matthew Walker • Michael Breus • Andrew Huberman',
    'web.chronoPremium.heroPrivacyLine': 'Privacidade 100% segura • Seus dados não são armazenados',
    'web.chronoPremium.gridLabel': 'Seu tipo de energia',
    'web.chronoPremium.valueTitle': 'Pronto para dormir melhor?',
    'web.chronoPremium.ctaStartFree': 'Começar grátis',
    'web.chronoPremium.linkProgram': 'Ver programa completo',

    'web.sobre.disclaimer2': 'Antes de iniciar qualquer programa de mudança de hábitos relacionados ao sono, consulte um médico ou profissional de saúde qualificado, especialmente se você apresentar condições como apneia do sono, insônia crônica, transtornos do humor, uso de medicamentos ou outras condições médicas.',
    'web.sobre.disclaimer3': 'Os resultados descritos são experiências individuais e podem variar de pessoa para pessoa. O GoZzzz não garante resultados específicos. Em caso de sintomas persistentes ou agravamento de qualquer condição, procure atendimento médico imediatamente. Este aplicativo não substitui o cuidado médico profissional.',
    'web.sobre.footerContact': 'Contato: suporte@gozzzz.app · Versão 1.0.0',
    'web.sobre.footerCopy': '© 2025 GoZzzz. Todos os direitos reservados.',

    // App entry (primeira tela)
    'entry.learnMore': 'Saiba mais',

    // Auth screens
    'auth.tagline': 'A ciência do sono aplicada ao seu cotidiano',
    'auth.login.title': 'Bem-vindo de volta',
    'auth.login.email': 'Email',
    'auth.login.password': 'Senha',
    'auth.login.forgot': 'Esqueceu a senha?',
    'auth.login.btn': 'Entrar',
    'auth.login.loading': 'Entrando...',
    'auth.login.divider': 'ou',
    'auth.login.signup': 'Criar nova conta',
    'auth.login.test': 'Acesso Rápido (Teste)',
    'auth.login.footer': 'Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade',
    'auth.login.errorTitle': 'Erro ao fazer login',
    'auth.login.errorEmpty': 'Por favor, preencha todos os campos',
    'auth.login.errorMsg': 'E-mail ou senha incorretos. Verifique e tente novamente.',
    'auth.login.errorEmailNotConfirmed': 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada e clique no link de confirmação.',
    'auth.login.errorUnexpected': 'Ocorreu um erro inesperado. Tente novamente.',
    'auth.login.errorSupabaseEnv':
      'O site não está ligado ao servidor (Supabase). No painel da Vercel, em Environment Variables, defina EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY com os valores do projeto Supabase (Settings → API) e faça um novo deploy.',
    'auth.signup.title': 'Criar Conta',
    'auth.signup.name': 'Nome completo',
    'auth.signup.email': 'Email',
    'auth.signup.password': 'Senha',
    'auth.signup.confirmPassword': 'Confirmar senha',
    'auth.signup.btn': 'Criar Conta',
    'auth.signup.loading': 'Criando...',
    'auth.signup.login': 'Já tenho uma conta',
    'auth.signup.footer': 'Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade',
    'auth.signup.errorTitle': 'Erro',
    'auth.signup.errorEmpty': 'Por favor, preencha todos os campos',
    'auth.signup.errorPassword': 'As senhas não coincidem',
    'auth.signup.errorLength': 'A senha deve ter pelo menos 6 caracteres',
    'auth.signup.errorSignup': 'Erro ao criar conta',
    'auth.signup.errorMsg': 'Verifique os dados e tente novamente.',
    'auth.signup.successTitle': 'Conta criada com sucesso!',
    'auth.signup.successMsg': 'Bem-vindo ao GoZzzz! Vamos começar.',
    'auth.signup.tagline': 'Comece sua jornada de sono baseada em ciência',
    'auth.signup.formTitle': 'Criar nova conta',
    'auth.signup.passwordPlaceholder': 'Senha (mínimo 6 caracteres)',
    'auth.signup.benefitsTitle': 'O que você terá:',
    'auth.signup.benefit1': '3 lições gratuitas — sem cartão de crédito',
    'auth.signup.benefit2': 'Como funciona o Sono+: uma consultoria personalizada para o seu padrão de sono',
    'auth.signup.benefit3': 'Sua conta fica ativa imediatamente após o cadastro',
    'auth.signup.btnFree': 'Criar Conta Gratuita',
    'auth.signup.loginLink': 'Já tem uma conta?',
    'auth.signup.loginLinkBold': 'Entrar',
    'auth.signup.agreements': 'Acordos',
    'auth.signup.ageConfirm': 'Confirmo que tenho 18 anos ou mais',
    'auth.signup.termsLabel': 'Termos de Serviço',
    'auth.signup.privacyLabel': 'Política de Privacidade',
    'auth.signup.newsletter': 'Gostaria de receber atualizações e ofertas',
    'auth.signup.optional': '(opcional)',
    'auth.signup.disclaimer': 'Levamos sua privacidade a sério. Seus dados estão seguros e criptografados.',
    'auth.signup.creating': 'Criando conta...',

    // Web lesson page
    'web.lesson.program': 'Programa',
    'web.lesson.step': 'Passo',
    'web.lesson.premiumContent': 'Conteúdo Premium',
    'web.lesson.premiumSubtitle': 'Esta lição está disponível apenas para assinantes. Assine para desbloquear todas as 21 lições do programa.',
    'web.lesson.subscribeNow': 'Assinar Agora',
    'web.lesson.backToProgram': 'Voltar ao Programa',
    'web.lesson.notFound': 'Lição não encontrada.',
    'web.lesson.viewProgram': 'Ver Programa',
    'web.lesson.expertContent': 'Conteúdo dos Especialistas',
    'web.lesson.youtubeVideo': 'Vídeo no YouTube',
    'web.lesson.videoSource': 'Vídeo de referência científica',
    'web.lesson.spotifyPodcast': 'Podcast Spotify',
    'web.lesson.keyPoints': 'Pontos-Chave',
    'web.lesson.aboutStep': 'Sobre este Passo',
    'web.lesson.readingTime': 'Tempo de leitura:',
    'web.lesson.minutes': 'minutos',
    'web.lesson.scientificInsights': 'Insights Científicos',
    'web.lesson.previousStep': 'Passo anterior',
    'web.lesson.viewFullProgram': 'Ver Programa Completo',
    'web.lesson.footer': 'suporte@gozzzz.app',

    // GDPR/LGPD Profile
    'profile.gdpr.title': 'Privacidade e Proteção de Dados',
    'profile.gdpr.marketingConsent': 'E-mails de Marketing',
    'profile.gdpr.marketingConsentDesc': 'Comunicações promocionais e novidades',
    'profile.gdpr.myRights': 'Meus Direitos (GDPR/LGPD)',
    'profile.gdpr.myRightsDesc': 'Acesse, corrija ou apague seus dados',
    'profile.gdpr.exportData': 'Exportar Meus Dados',
    'profile.gdpr.exportDataDesc': 'Portabilidade de dados (GDPR Art. 20 / LGPD Art. 18)',
    'profile.gdpr.deleteAccount': 'Excluir Conta',
    'profile.gdpr.deleteAccountDesc': 'Solicitação de exclusão permanente',
    'profile.gdpr.exportErrorTitle': 'Erro',
    'profile.gdpr.exportErrorMsg': 'Não foi possível solicitar a exportação. Tente novamente ou entre em contato: suporte@gozzzz.app',
    'profile.gdpr.exportSuccessTitle': 'Solicitação Enviada',
    'profile.gdpr.exportSuccessMsg': 'Sua solicitação de exportação de dados foi registrada. Você receberá os dados em até 30 dias no e-mail cadastrado.',
    'profile.gdpr.deleteConfirmError': 'Confirmação incorreta',
    'profile.gdpr.deleteConfirmErrorMsg': 'Digite "deletar" para confirmar a exclusão.',
    'profile.gdpr.deleteErrorTitle': 'Erro',
    'profile.gdpr.deleteErrorMsg': 'Não foi possível processar a solicitação. Entre em contato: suporte@gozzzz.app',
    'profile.gdpr.deleteWarning': 'Atenção: esta ação é irreversível',
    'profile.gdpr.deleteDetail': 'Ao excluir sua conta, todos os seus dados pessoais e progresso serão permanentemente apagados em até 30 dias, conforme o GDPR (Art. 17) e a LGPD (Art. 18).',
    'profile.gdpr.deleteInstruction': 'Para confirmar, digite "deletar" abaixo:',
    'profile.gdpr.deleteInputPlaceholder': 'Digite: deletar',
    'profile.gdpr.deleteConfirmBtn': 'Excluir Definitivamente',
    'profile.gdpr.deleteSuccessMsg': 'Conta deletada com sucesso',
    'profile.gdpr.rightsIntro': 'Conforme o GDPR (UE/Reino Unido) e a LGPD (Brasil), você tem os seguintes direitos sobre seus dados pessoais:',
    'profile.gdpr.right1': 'Acesso — ver quais dados coletamos',
    'profile.gdpr.right2': 'Correção — corrigir dados imprecisos',
    'profile.gdpr.right3': 'Apagamento — excluir seus dados (direito ao esquecimento)',
    'profile.gdpr.right4': 'Portabilidade — exportar seus dados em formato legível',
    'profile.gdpr.right5': 'Oposição — opor-se ao tratamento por interesse legítimo',
    'profile.gdpr.right6': 'Retirar consentimento — a qualquer momento, sem penalidades',
    'profile.gdpr.rightsContact': 'Para exercer qualquer direito, use os botões acima ou envie e-mail para:',
    'profile.gdpr.modalInputPlaceholder': 'Digite: deletar',

    // Signup consent keys
    'auth.signup.consentTitle': 'Consentimento e Privacidade',
    'auth.signup.consentTerms': 'Concordo com os',
    'auth.signup.consentTermsLink': 'Termos de Uso',
    'auth.signup.consentAnd': 'e a',
    'auth.signup.consentPrivacyLink': 'Política de Privacidade',
    'auth.signup.consentRequired': '(obrigatório)',
    'auth.signup.consentMarketing': 'Aceito receber novidades, promoções e conteúdo por e-mail.',
    'auth.signup.consentOptional': '(opcional)',
    'auth.signup.consentNote': 'Seus dados são protegidos conforme o GDPR e a LGPD. Você pode retirar seu consentimento a qualquer momento nas configurações do perfil.',
    'auth.signup.consentAge': 'Confirmo que tenho 18 anos ou mais.',
    'auth.signup.errorAge': 'Você deve ter 18 anos ou mais para criar uma conta.',
    'auth.signup.errorConsent': 'Você deve aceitar os Termos de Uso e a Política de Privacidade para criar uma conta.',

    // Forgot password
    'auth.forgot.title': 'Esqueceu a senha?',
    'auth.forgot.subtitle': 'Informe seu e-mail e enviaremos um link para redefinir sua senha.',
    'auth.forgot.placeholder': 'Seu e-mail',
    'auth.forgot.btnSend': 'Enviar link de redefinição',
    'auth.forgot.sending': 'Enviando...',
    'auth.forgot.backButton': 'Voltar',
    'auth.forgot.errorEmail': 'Informe seu e-mail.',
    'auth.forgot.errorGeneric': 'Ocorreu um erro. Tente novamente.',
    'auth.forgot.successTitle': 'E-mail enviado!',
    'auth.forgot.successMsg': 'Se existe uma conta com este e-mail, você receberá as instruções para redefinir sua senha em instantes.',
    'auth.forgot.returnButton': 'Voltar para o login',

    // Reset password
    'auth.reset.successTitle': 'Senha redefinida!',
    'auth.reset.successButton': 'Ir para o login',
    'auth.reset.errorInvalid': 'Link inválido. Solicite um novo.',
    'auth.reset.errorEmpty': 'Informe a nova senha.',
    'auth.reset.errorShort': 'A senha deve ter pelo menos 6 caracteres.',
    'auth.reset.errorMismatch': 'As senhas não coincidem.',
    'auth.reset.errorSave': 'Erro ao redefinir senha.',
    'auth.reset.errorGeneric': 'Ocorreu um erro. Tente novamente.',
    'auth.reset.btnSave': 'Salvar nova senha',
    'auth.reset.saving': 'Salvando...',

    // Email confirmation
    'auth.confirm.title': 'E-mail Confirmado!',
    'auth.confirm.button': 'Fazer Login',
    'auth.confirm.errorTitle': 'Erro na Confirmação',
    'auth.confirm.errorButton': 'Voltar',
    'auth.confirm.loadingText': 'Confirmando seu e-mail...',
    'auth.confirm.errorInvalid': 'Token de confirmação inválido.',
    'auth.confirm.errorGeneric': 'Erro ao confirmar e-mail. Tente novamente.',
    'auth.confirm.errorFinal': 'Ocorreu um erro ao confirmar seu e-mail.',
    'auth.confirm.successMsg': 'Parabéns! Seu e-mail foi confirmado com sucesso.',

    // Signup success
    'auth.success.title': 'Conta Criada!',
    'auth.success.message': 'Sua conta foi criada com sucesso.',
    'auth.success.accessWith': 'Acesse com o e-mail:',
    'auth.success.button': 'Fazer Login',
    'auth.success.confirmHint':
      'Enviamos um link de confirmação para o seu email. Abra a mensagem e toque no link para ativar a conta — depois pode entrar com o seu email e senha.',
    'auth.success.continuePlan': 'Continuar para o plano de 21 passos →',

    // Cookie consent
    'cookie.title': 'Usamos cookies essenciais',
    'cookie.text': 'Usamos apenas cookies essenciais para manter sua sessão ativa e preferências de idioma. Nenhum cookie de rastreamento ou publicidade.',
    'cookie.accept': 'Entendi',
    'cookie.learnMore': 'Política de Privacidade',

    // Modal inputs
    'modal.input.placeholder': 'Digite aqui...',
    'modal.list.bullet': '•',
    'modal.buttons.ok': 'OK',

    // Web program steps titles
    'web.step4.title': 'Temperatura do Ambiente',
    'web.step5.title': 'Janela de Escuridão',
    'web.step6.title': 'Exercício e Sono',
    'web.step7.title': 'Alimentação Noturna',
    'web.step8.title': 'Protocolo de Desaceleração',
    'web.step9.title': 'Gerenciamento do Estresse',
    'web.step10.title': 'Rotina de Acordar',
    'web.step11.title': 'Power Nap Estratégico',
    'web.step12.title': 'Redução da Luz Artificial',
    'web.step13.title': 'Suplementação Inteligente',
    'web.step14.title': 'Sono e Performance Cognitiva',
    'web.step15.title': 'Álcool e Sono',
    'web.step16.title': 'Sono e Sistema Imune',
    'web.step17.title': 'Recuperação do Jet Lag',
    'web.step18.title': 'Sono e Hormônios',
    'web.step19.title': 'Otimização do Quarto',
    'web.step20.title': 'Ritmo Circadiano Avançado',
    'web.step21.title': 'Manutenção do Sono Perfeito',

    // Landing Page
    'home.or': 'ou',
    'home.share': 'Compartilhar GoZzzz',
    'home.sleepQuality': 'Sono de\nqualidade\nnoite.',
    'home.scienceBacked': 'Protocolos de sono baseados em publicações científicas revisadas por pares.',
    'home.sleepApp': 'App de Ciência do Sono',
    'home.tagline': 'Respire, relaxe e durma — com ajuda da ciência',
    'home.credibility': 'Baseado em pesquisas publicadas por Matthew Walker, Andrew Huberman, Charles Czeisler e Michael Breus — nas maiores revistas científicas do mundo.',
    'home.ctaMain': 'Começar o programa',
    'home.login': 'Já tenho uma conta',
    'home.biometric': 'Entrar com Face ID',
    'home.privacy': 'Seus dados ficam no seu dispositivo. Nunca vendemos suas informações.',
    'home.founder': 'Criado com base em 10 anos de estudo da ciência do sono',

    // Language Settings
    'lang.portuguese': 'Português',
    'lang.english': 'English',

    // App Branding
    'app.name': 'GoZzzz',
    'app.version': 'GoZzzz v1.0.0',

    // Support & Contact
    'support.email': 'suporte@gozzzz.app',
    'privacy.email': 'suporte@gozzzz.app',

    // Gift Card
    'gift.placeholder': 'XXXX-XXXX-XXXX-XXXX',

    // Security Badges
    'security.ssl': 'SSL 256-bit',
    'security.pci': 'PCI DSS',

    // Payment & Premium
    'payment.premium': 'Assine Premium',
    'payment.transform': 'Transforme seu sono em 21 passos científicos',
    'payment.choosePlan': 'Escolha seu plano',
    'payment.save': 'Economize 37%',
    'payment.annual': 'Plano Anual',
    'payment.monthly': 'Plano Mensal',
    'payment.method': 'Forma de pagamento',
    'payment.card': 'Cartão',
    'payment.pix': 'Pagamento instantâneo. QR Code gerado pelo Stripe.',
    'payment.loading': 'Abrindo pagamento...',
    'payment.subscribe': 'Assinar Agora',
    'payment.alreadySub': 'Já sou assinante — Entrar',
    'payment.redirect': 'Você será redirecionado ao Stripe...',
    'payment.whatIncluded': 'O que está incluído',
    'payment.feature1': '21 passos completos do programa',
    'payment.feature2': 'Orientações práticas em cada passo',
    'payment.feature3': 'Conteúdo baseado em neurociência do sono',
    'payment.feature4': 'Protocolos de medicina circadiana',
    'payment.feature5': 'Atualizações gratuitas incluídas',
    'payment.feature6': 'Acesso imediato após pagamento',
    'payment.feature7': 'Cancele a qualquer momento',
    'payment.annualPrice': 'R$ 24,99',
    'payment.annualPerMonth': '/mês',
    'payment.annualTotal': 'R$ 299,90 cobrado anualmente',
    'payment.monthlyPrice': 'R$ 147',
    'payment.monthlyPer': '/mês',
    'payment.paymentMethod': 'Forma de pagamento',
    'payment.cardOption': 'Cartão',
    'payment.pixInfo': 'Pagamento instantâneo. QR Code gerado pelo Stripe.',
    'payment.loadingText': 'Abrindo pagamento...',
    'payment.subscribeAnnual': 'Assinar Plano Anual',
    'payment.subscribeMonthly': 'Assinar Plano Mensal',
    'payment.monthlyTotal': 'R$ 147 pagamento único',
    'payment.payWithPix': 'Pagar com PIX',

    // Program/Lesson Premium Modal
    'program.premiumAccess': 'ACESSO PREMIUM',
    'program.premiumTitle': 'Este passo faz parte do plano Premium',
    'program.premiumDesc': 'Desbloqueie todos os 21 passos do programa completo, com atualizações de conteúdo e experiência premium no app.',
    'program.feature1': 'Todos os 21 passos',
    'program.feature2': 'Lições escritas passo a passo',
    'program.feature3': 'Acompanhamento de progresso no app',
    'program.feature4': 'Certificado final',
    'program.startingFrom': 'A partir de',
    'program.perMonth': '/mês',
    'program.unlockNow': 'Desbloquear Agora',
    'program.alreadySubscribed': 'Já tenho uma subscrição',
    'payment.disclaimer': 'Você será redirecionado ao Stripe para concluir o pagamento com segurança.',
    'payment.unlockAllLessons': 'Desbloquear Todas as Lições',
    'payment.premiumAccess': 'Obtenha acesso premium ao programa completo',
    'payment.ssl': 'SSL 256-bit',
    'payment.pciDss': 'PCI DSS',
    'payment.secureCheckout': 'Checkout Seguro',

    // Web Pages
    'web.viewMore': 'Ver mais',
    'web.startNow': 'Quero Começar',
    'web.securePayment': 'Pagamento Seguro',
    'web.satisfactionGuaranteed': 'Satisfação Garantida',

    // Web Testimonials
    'web.testimonial.ana.role': 'Executiva, 38 anos',
    'web.testimonial.ana.text': 'Consegui dormir 7 horas seguidas pela primeira vez em muito tempo. Apliquei as estratégias do programa de forma consistente.',
    'web.testimonial.ana.result': '7h de sono ininterrupto',
    'web.testimonial.carlos.role': 'Empreendedor, 45 anos',
    'web.testimonial.carlos.text': 'Notei melhora gradual no sono e na ansiedade ao aplicar as técnicas do programa. Os resultados variaram ao longo das semanas.',
    'web.testimonial.carlos.result': 'Melhora gradual no sono',

    // Web Steps
    'web.step.1.title': 'Entendendo o Sono',
    'web.step.1.desc': 'Como funcionam os ciclos de sono e a importância de cada estágio para a saúde.',
    'web.step.2.title': 'Luz Solar Matinal',
    'web.step.2.desc': 'O papel da exposição à luz matinal na regulação do ritmo circadiano.',
    'web.step.3.title': 'Timing da Cafeína',
    'web.step.3.desc': 'Como o timing do consumo de cafeína pode afetar a qualidade do sono noturno.',

    // Web Coach Page
    'web.coach.testimonial1Result': '7 horas de sono ininterrupto',
    'web.coach.testimonial2Result': 'Ansiedade reduzida em 3 semanas',
    'web.coach.price1': 'R$497',
    'web.coach.price1Sub': 'sessão única',
    'web.coach.price2': 'R$ 117',

    // Web Pricing
    'web.pricing.monthly.currency': 'R$',
    'web.pricing.monthly.amount': '39',
    'web.pricing.monthly.cents': ',90',
    'web.pricing.annual.currency': 'R$',
    'web.pricing.annual.amount': '24',
    'web.pricing.annual.cents': ',99',

    // Footer
    'footer.privacy': 'Política de Privacidade',
    'footer.terms': 'Termos de Uso',
    'footer.copyright': 'Feito com propósito · Todos os direitos reservados',
    'footer.support': 'suporte',

    // Testimonials
    'testimonial.1.text': 'GoZzzz mudou completamente minha vida. Passei anos com insônia e aqui encontrei soluções baseadas em ciência real.',
    'testimonial.2.text': 'O programa é prático e fácil de seguir. Recomendo para qualquer pessoa que quer melhorar seu sono.',

    // QR Code Page
    'qrcode.title': 'Compartilhar App',
    'qrcode.tagline': 'Transforme seu sono com ciência',
    'qrcode.scan': 'Escaneie para baixar',
    'qrcode.badge': 'Os 3 maiores pesquisadores do planeta em um só lugar',
    'qrcode.shareLink': 'Compartilhar Link',
    'qrcode.openLink': 'Abrir Link',
    'qrcode.infoTitle': 'Compartilhe a Transformação',
    'qrcode.infoText': 'Ajude outras pessoas a descobrirem o poder de um sono de qualidade. Compartilhe o GoZzzz com amigos e familiares!',
    'qrcode.share': 'GoZzzz - Transforme seu sono com ciência\n\nPrograma de sono em 21 passos baseado em ciência.\n\nBaixe agora:',

    // Business Card Page
    'card.title': 'Cartão de Visita Digital',
    'card.front': 'Frente do Cartão',
    'card.back': 'Verso do Cartão',
    'card.tagline': 'Programa científico\nde sono em 21 passos',
    'card.badge': '🧠 BASEADO EM CIÊNCIA',
    'card.scan': 'Escaneie',
    'card.experts': 'O que você vai aprender:',
    'card.share': 'Compartilhar Cartão',
    'card.viralTitle': 'Frases Virais para Compartilhar',
    'card.viral1': 'Dormir bem não é luxo. É seu superpoder. GoZzzz.',
    'card.viral2': '21 passos. 1 app. Sua vida transformada. GoZzzz.',
    'card.viral3': '15 anos de insônia viraram seu guia de sono. GoZzzz.',
    'card.viral4': '21 passos. Ciência real. Sono transformado. GoZzzz.',
    'card.viral5': '21 dias. 1 programa. 1 sono transformado. GoZzzz.',
    'card.viral6': 'Cansado de estar cansado? GoZzzz tem a ciência que você precisa.',
    'card.tips': 'Dicas para Compartilhar',
    'card.shareMsg': 'GoZzzz - Programa científico de sono em 21 passos 🌙\n\nTransforme seu sono com ciência.\n\nBaixe agora: https://gozzzz.app',

    // Error Messages
    'error.paymentFailed': 'Erro ao iniciar pagamento.',
    'error.connectionFailed': 'Erro na conexão. Tente novamente.',
    'error.couldNotOpenPodcast': 'Não foi possível abrir o podcast',

    // Podcast/Audio
    'audio.podcast': 'Podcast',

    // Privacy Policy
    'privacy.back': 'Voltar',
    'privacy.title': 'Política de Privacidade',
    'privacy.updated': 'Atualizada em 4 de maio de 2026',
    'privacy.ukDpa': 'UK DPA 2018',
    'privacy.summary.title': 'Resumo',
    'privacy.summary.text': 'O GoZzzz é um programa educativo de sono; referencias a pesquisadores e publicacoes servem apenas para contexto científico, sem afiliação ou endosso. Coletamos apenas os dados necessários para prestar o serviço. Nunca vendemos seus dados. Você pode acessar, corrigir, exportar ou excluir seus dados a qualquer momento. Esta política está em conformidade com o GDPR (UE/Reino Unido) e a LGPD (Brasil).',
    'privacy.dataController.title': '1. Controlador de Dados',
    'privacy.dataController.text': 'GoZzzz é o controlador dos seus dados pessoais. Para exercer seus direitos ou dúvidas sobre privacidade, entre em contato pelo e-mail:',
    'privacy.dataController.privacy': 'suporte@gozzzz.app',
    'privacy.dataController.support': 'Suporte geral: suporte@gozzzz.app',
    'privacy.dataCollected.title': '2. Dados que Coletamos',
    'privacy.dataCollected.text': 'Coletamos apenas os dados estritamente necessários para a prestação do serviço:',
    'privacy.dataCollected.tableData': 'Dado',
    'privacy.dataCollected.tablePurpose': 'Finalidade',
    'privacy.dataCollected.tableLegal': 'Base Legal',
    'privacy.dataCollected.row1.data': 'Nome, E-mail',
    'privacy.dataCollected.row1.purpose': 'Criar e gerir conta',
    'privacy.dataCollected.row1.legal': 'Contrato',
    'privacy.dataCollected.row2.data': 'Progresso nas lições',
    'privacy.dataCollected.row2.purpose': 'Personalizar experiência',
    'privacy.dataCollected.row2.legal': 'Contrato',
    'privacy.dataCollected.row3.data': 'Preferência de idioma',
    'privacy.dataCollected.row3.purpose': 'Interface no idioma correto',
    'privacy.dataCollected.row3.legal': 'Interesse legítimo',
    'privacy.dataCollected.row4.data': 'Dados de pagamento',
    'privacy.dataCollected.row4.purpose': 'Processar transações',
    'privacy.dataCollected.row4.legal': 'Contrato / Obrigação legal',
    'privacy.dataCollected.row5.data': 'E-mail marketing',
    'privacy.dataCollected.row5.purpose': 'Comunicações promocionais',
    'privacy.dataCollected.row5.legal': 'Consentimento (opt-in)',
    'privacy.serviceProviders.title': '3. Prestadores de Serviço (Subprocessadores)',
    'privacy.serviceProviders.text': 'Compartilhamos dados apenas com prestadores de serviço necessários para operar o GoZzzz:',
    'privacy.serviceProviders.supabase': 'Supabase, Inc.',
    'privacy.serviceProviders.supabaseDesc': 'Banco de dados e autenticação — AWS us-east-1. Conforme GDPR e cláusulas contratuais padrão (SCCs).',
    'privacy.serviceProviders.stripe': 'Stripe, Inc.',
    'privacy.serviceProviders.stripeDesc': 'Processamento de pagamentos — certificado PCI-DSS Nível 1. Conforme GDPR. Nenhum dado de cartão é armazenado pelo GoZzzz.',
    'privacy.internationalTransfer.title': '4. Transferências Internacionais de Dados',
    'privacy.internationalTransfer.text': 'Seus dados são armazenados em servidores nos Estados Unidos (AWS us-east-1, operado pela Supabase). Para usuários da UE/Reino Unido, a transferência é amparada pelas Cláusulas Contratuais Padrão (SCCs) da Comissão Europeia. Para usuários brasileiros, a transferência cumpre os arts. 33-36 da LGPD, com garantias contratuais equivalentes.',
    'privacy.retention.title': '5. Retenção de Dados',
    'privacy.retention.item1': '• Perfil e progresso: pelo período em que a conta estiver ativa',
    'privacy.retention.item2': '• Dados de pagamento: 7 anos (obrigação fiscal e legal)',
    'privacy.retention.item3': '• Registros de consentimento: 5 anos após retirada do consentimento',
    'privacy.retention.item4': '• Solicitações de exclusão: concluídas em até 30 dias',
    'privacy.retention.item5': '• Logs de sistema (IPs): máximo de 90 dias',
    'privacy.rights.title': '6. Seus Direitos — GDPR (UE/Reino Unido)',
    'privacy.rights.text': 'Nos termos do GDPR, você tem os seguintes direitos sobre seus dados pessoais:',
    'privacy.rights.access': '• Acesso (Art. 15): obter uma cópia dos seus dados',
    'privacy.rights.rectification': '• Retificação (Art. 16): corrigir dados imprecisos',
    'privacy.rights.erasure': '• Apagamento (Art. 17): solicitar exclusão da conta e dados',
    'privacy.rights.portability': '• Portabilidade (Art. 20): exportar seus dados em formato legível',
    'privacy.rights.restriction': '• Limitação (Art. 18): restringir o tratamento dos seus dados',
    'privacy.rights.objection': '• Oposição (Art. 21): opor-se ao tratamento baseado em interesse legítimo',
    'privacy.rights.withdraw': '• Retirar consentimento: a qualquer momento, sem prejuízo dos tratamentos anteriores',
    'privacy.rights.response': 'Responderemos às solicitações em até 30 dias. Você também pode apresentar reclamação à autoridade supervisora do seu país (ICO no Reino Unido; CNIL na França; AEPD na Espanha).',

    // LGPD Rights
    'privacy.lgpd.title': '7. Seus Direitos — LGPD (Brasil)',
    'privacy.lgpd.text': 'Nos termos da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), você tem os seguintes direitos:',
    'privacy.lgpd.item1': '• Confirmação de tratamento (Art. 18, I): confirmar que tratamos seus dados',
    'privacy.lgpd.item2': '• Acesso (Art. 18, II): acessar seus dados',
    'privacy.lgpd.item3': '• Correção (Art. 18, III): corrigir dados incompletos ou imprecisos',
    'privacy.lgpd.item4': '• Anonimização ou eliminação (Art. 18, IV): quando desnecessários ou excessivos',
    'privacy.lgpd.item5': '• Portabilidade (Art. 18, V): obter seus dados em formato portável',
    'privacy.lgpd.item6': '• Eliminação dos dados tratados com consentimento (Art. 18, VI)',
    'privacy.lgpd.item7': '• Revogação do consentimento (Art. 18, IX): a qualquer momento',
    'privacy.lgpd.response': 'Responderemos às solicitações em até 15 dias. Você pode exercer seus direitos em: suporte@gozzzz.app ou apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).',

    // How to Exercise Rights
    'privacy.exercise.title': '8. Como Exercer Seus Direitos',
    'privacy.exercise.text': 'Você pode exercer seus direitos diretamente no aplicativo:',
    'privacy.exercise.item1': '• Perfil > Privacidade e Proteção de Dados > Meus Dados (exportar)',
    'privacy.exercise.item2': '• Perfil > Privacidade e Proteção de Dados > Excluir Conta',
    'privacy.exercise.item3': '• Perfil > Privacidade e Proteção de Dados > Consentimento Marketing',
    'privacy.exercise.contact': 'Para outras solicitações, envie um e-mail para suporte@gozzzz.app com o assunto "Solicitação LGPD" ou "GDPR Request".',

    // Data Security
    'privacy.security.title': '9. Segurança dos Dados',
    'privacy.security.item1': '• Criptografia em trânsito (TLS 1.3) e em repouso (AES-256)',
    'privacy.security.item2': '• Autenticação segura via Supabase Auth (senhas com hash bcrypt)',
    'privacy.security.item3': '• Acesso restrito a dados pessoais por controles de função (RLS)',
    'privacy.security.item4': '• Pagamentos processados exclusivamente pela Stripe (PCI-DSS Nível 1)',
    'privacy.security.item5': '• Nenhum dado de cartão é armazenado pelo GoZzzz',

    // Data Breach
    'privacy.breach.title': '10. Violação de Dados',
    'privacy.breach.text': 'Em caso de violação de dados que represente risco aos seus direitos e liberdades, notificaremos a autoridade supervisora competente em até 72 horas (conforme GDPR) e 2 dias úteis (conforme LGPD) após a detecção. Notificaremos você diretamente quando a violação puder resultar em alto risco.',

    // Cookies
    'privacy.cookies.title': '11. Cookies e Armazenamento Local',
    'privacy.cookies.text': 'O GoZzzz utiliza armazenamento local apenas para:',
    'privacy.cookies.item1': '• Sessão de autenticação (essencial — necessário para o funcionamento)',
    'privacy.cookies.item2': '• Preferência de idioma (funcional — pode ser rejeitado)',
    'privacy.cookies.note': 'Não utilizamos cookies de rastreamento, publicidade ou analytics de terceiros.',

    // Minors
    'privacy.minors.title': '12. Menores de Idade',
    'privacy.minors.text': 'O GoZzzz é destinado a maiores de 18 anos. Não coletamos intencionalmente dados de menores. Se você acredita que coletamos dados de um menor, entre em contato imediatamente: suporte@gozzzz.app',

    // Automated Decisions
    'privacy.automated.title': '13. Decisões Automatizadas',
    'privacy.automated.text': 'O GoZzzz não realiza tomadas de decisão automatizadas com efeito legal ou similar significativo sobre os utilizadores (art. 22 GDPR / art. 20 LGPD). O desbloqueio de conteúdo premium é baseado exclusivamente no status de assinatura verificado manualmente.',

    // Policy Changes
    'privacy.changes.title': '14. Alterações nesta Política',
    'privacy.changes.text': 'Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças materiais por e-mail ou por aviso no aplicativo, com pelo menos 15 dias de antecedência. A data de atualização é sempre indicada no topo desta página.',

    // Contact
    'privacy.contact.title': '15. Contato e Reclamações',
    'privacy.contact.text': 'Para exercer seus direitos, tirar dúvidas ou apresentar reclamações:',
    'privacy.contact.email': 'suporte@gozzzz.app',
    'privacy.contact.authorities': 'Autoridades supervisoras:\n• Brasil: ANPD — anpd.gov.br\n• UE: autoridade do país de residência\n• Reino Unido: ICO — ico.org.uk',

    // Footer
    'privacy.footer': 'Ao usar o GoZzzz, você reconhece ter lido e compreendido esta Política de Privacidade. Versão 1.3 — 4 de maio de 2026',

    // Terms & Conditions
    'terms.back': 'Voltar',
    'terms.title': 'Termos e Condições',
    'terms.updated': 'Atualizado em 4 de maio de 2026',
    'terms.acceptance.title': '1. Aceitação dos Termos',
    'terms.acceptance.text': 'Ao criar uma conta e usar o GoZzzz, você concorda com estes Termos e Condições. O serviço é educativo e de coaching comportamental do sono; não substitui cuidados de saúde regulamentados. Se você não concordar com qualquer parte destes termos, não deve usar nossos serviços.',
    'terms.service.title': '2. Descrição do Serviço',
    'terms.service.text': 'O GoZzzz é um aplicativo de bem-estar focado em melhorar a qualidade do sono através de um programa estruturado de 21 passos. Oferecemos:',
    'terms.service.item1': '• Programa educacional de 21 lições sobre higiene do sono',
    'terms.service.item2': '• Lições escritas e orientações práticas baseadas em pesquisas científicas',
    'terms.service.item3': '• Ferramentas de acompanhamento de progresso',
    'terms.service.item4': '• Acesso a recursos premium mediante assinatura',

    // Web Metadata
    'web.meta.home.title': 'GoZzzz - Melhore seu Sono com Ciência | Programa de 21 Passos',
    'web.meta.home.description': 'Programa de sono em 21 passos baseado em pesquisas científicas revisadas por pares. Estratégias baseadas em evidências para melhorar o sono com neurociência e medicina circadiana.',
    'web.meta.programa.title': 'Programa de 21 Passos | GoZzzz',
    'web.meta.programa.description': 'Siga o programa de 21 passos estruturado com base em evidências científicas para melhorar sua qualidade de sono.',
    'web.meta.sobre.title': 'Sobre GoZzzz | Saúde do Sono Baseada em Ciência',
    'web.meta.sobre.description': 'Conheça a história do GoZzzz, inspirada em 10 anos de pesquisa sobre insônia e ciência do sono.',
  },
  en: {
    // Tabs
    'tab.home': 'Home',
    'tab.program': 'Program',
    'tab.coach': 'Sono+',
    'tab.about': 'About',
    'tab.profile': 'Profile',

    // Onboarding
    'onboarding.headline1': 'Deep sleep.',
    'onboarding.headline2': 'Real results.',
    'onboarding.subheadline': 'Sleep science applied to your routine.',
    'onboarding.cta': 'Start — 3 days free',
    'onboarding.login': 'Already have an account',

    // Home
    'home.welcome': 'Welcome to GoZzzz',
    'home.subtitle': 'Improve your sleep with 21 evidence-based steps',
    'home.startNow': 'Start Now',
    'home.dailyTips': 'Daily Tips',
    'home.step': 'Step',
    'home.minutes': 'minutes',
    'home.steps': 'steps',

    // Welcome Screen
    'welcome.title': 'Better sleep,\nevery night.',
    'welcome.tagline': 'The problem isn\'t that you can\'t sleep. It\'s that nobody ever taught you how.',
    'welcome.tagline2': 'Melatonin doesn\'t fix it. Tea doesn\'t fix it. Science explains why — and what actually works.',
    'welcome.credibility': 'Based on published research by Matthew Walker, Andrew Huberman, Charles Czeisler, and Michael Breus — in the world\'s leading peer-reviewed journals.',
    'welcome.brand': 'GoZzzz',
    'welcome.brandSub': 'Sleep Science App',
    'welcome.startFree': 'Start Free',
    'welcome.microcopy': '3 free lessons, no credit card required',
    'welcome.logIn': 'Log In',
    'welcome.biometric': 'Or use Face ID',
    'welcome.privacy': 'Your data is encrypted and secure',
    'welcome.founderNote': '"Sleep is not a luxury, it\'s a foundation." — Sleep Science Team',
    'welcome.shareGoZzzz': 'Share GoZzzz',
    'welcome.leftTitle': 'Better sleep,\nevery night.',
    'welcome.leftSub': 'Science-backed sleep protocols\ngrounded in peer-reviewed research.',

    // Program
    'program.title': '21-Step Program',
    'program.subtitle': 'Your path to better sleep',
    'program.startProgram': 'Start 21-Step Program',
    'program.yourProgress': 'Your Progress',
    'program.completedSteps': 'steps completed of',
    'program.locked': 'Available in Premium plan',
    'program.loading': 'Loading program...',
    'program.noLessons': 'No lessons available at the moment.',
    'program.retry': 'Reload',

    // Lesson Detail
    'lesson.step': 'Step',
    'lesson.watchVideo': 'Watch Video',
    'lesson.listenAudio': 'Listen Audio',
    'lesson.about': 'About this lesson',
    'lesson.keyPoints': 'Key Points',
    'lesson.markComplete': 'Mark as Complete',
    'lesson.continuing': 'Next Lesson...',
    'lesson.completed': 'Lesson Completed',
    'lesson.loading': 'Loading lesson...',
    'lesson.notFound': 'Lesson not found',
    'lesson.back': 'Back',
    'lesson.goBack': 'Go Back',
    'lesson.premiumContent': 'Premium Content',
    'lesson.premiumSubtitle': 'This lesson is available for subscribers only. Subscribe to unlock all 21 lessons.',
    'lesson.subscribeNow': 'Subscribe Now',
    'lesson.teaserBadge': 'FREE PREVIEW',
    'lesson.teaserUnlockTitle': 'Unlock this full step',
    'lesson.teaserUnlockSub': '21 interactive lessons that guide you step by step to better nights\n\nEach step based on research from leading universities and scientific publications\n\nProgress at your own pace — no rush, with purpose\n\nAlready available on iOS, Android, and Web',
    'lesson.teaserCta': 'Subscribe Premium Now',
    'lesson.teaserAlreadySub': 'Already subscribed — Sign In',
    'lesson.expertContent': 'Expert Content',
    'lesson.youtubeVideo': 'YouTube Video',
    'lesson.videoCaptions': 'With English captions',
    'lesson.spotifyPodcast': 'Spotify Podcast',
    'lesson.scientificInsights': 'Scientific Insights',
    'lesson.minutes': 'minutes',
    'lesson.errorOpeningVideo': 'Error opening video',
    'lesson.errorOpeningPodcast': 'Error opening podcast',

    // Coach
    'coach.title': 'Sono+ Consulting',
    'coach.subtitle': 'One diagnostic session and a concrete plan to start sleeping better.',
    'coach.intro.title': '',
    'coach.intro.text':
      'Most approaches to insomnia treat the symptom. This consulting treats the cause — mapping your habits, routine, environment, and sleep patterns to build a protocol that works in your context, not someone else\'s.',
    'coach.pain.title': 'You\'ve already tried everything.',
    'coach.pain.body':
      'Earlier bedtime. Avoiding your phone. Tea before bed. Meditation apps.\n\nMaybe it worked for a few days. Then everything went back to how it was.\n\nIt\'s not a lack of discipline. None of those solutions were built for your case — they were built for everyone, and everyone is no one.',
    'coach.cause.title': 'Sleep has a cause. And it\'s different for each person.',
    'coach.cause.body':
      'Sleep science shows that difficulty sleeping rarely has a single cause. It\'s usually a mix of behavioral, environmental, emotional, and biological factors — and they vary from person to person.\n\nThat\'s why generic recipes don\'t work consistently. What helps one person may mean nothing to another.\n\nIndividual assessment isn\'t a luxury. It\'s the starting point for any real change.',
    'coach.services.title': 'What\'s included',
    'coach.service1.title': 'Emotional Health',
    'coach.service1.desc': 'Deep work with your emotions, anxiety, stress and emotional patterns that affect your well-being.',
    'coach.service2.title': 'Sleep Optimization',
    'coach.service2.desc':
      'A personalized protocol based on your lifestyle, chronotype, and specific challenges — with strategies you can actually put into practice.',
    'coach.service3.title': 'Integrative Medicine',
    'coach.service3.desc': 'Holistic approach including nutrition, movement, supplementation and integrative practices.',
    'coach.service4.title': 'Personalized Plan',
    'coach.service4.desc': 'Unique protocol developed for you, considering your history, goals and challenges.',
    'coach.process.title': 'How it works',
    'coach.step1.title': 'Full Diagnostic',
    'coach.step1.desc':
      '60 minutes to map your sleep history, daily routine, environment, and behavioral patterns. You leave with a clear picture of what is keeping you from sleeping well.',
    'coach.step2.title': 'Personalized Protocol',
    'coach.step2.desc':
      'A structured plan with behavior change, sleep hygiene, and routine adjustments grounded in evidence — including emotional and cognitive factors that undermine sleep, because ignoring them rarely works.',
    'coach.step3.title': 'Ongoing Support',
    'coach.step3.desc':
      'Direct WhatsApp access for real-time adjustments as you put the plan into practice. Sleep changes — and the support changes with you.',
    'coach.trust.title': 'Why trust me?',
    'coach.trust.text1':
      'For 10 years I lived with insomnia and fragmented sleep. I tried everything — and learned in practice what works and what doesn\'t. That led me to study neuroscience and sleep medicine seriously. Today I don\'t work with generic recipes: I work with what science supports and what I lived through.',
    'coach.trust.text2': '',
    'coach.cta.title': 'Ready to truly understand why you don\'t sleep well?',
    'coach.cta.subtitle':
      'Book your diagnostic session and leave with a concrete plan — not more shots in the dark.',
    'coach.cta.book': 'Book my session',
    'coach.cta.whatsapp': 'Chat on WhatsApp',
    'coach.investment.title': 'Pricing',
    'coach.price1.label': 'Individual Sleep Coaching',
    'coach.price1.badge': 'Most Popular',
    'coach.price1.amount': '$ 497',
    'coach.price1.desc': '90-minute initial session + Personalized plan',
    // About
    'about.title': 'About GoZzzz',
    'about.mission.title': 'Our Mission',
    'about.mission.text': 'Democratize access to scientific knowledge about quality sleep, making research findings from sleep scientists accessible to everyone.',
    'about.science.title': 'Science-Based',
    'about.science.text': 'Each step of the program was developed based on research from the world\'s leading neuroscientists and sleep experts.',
    'about.experts.title': 'Published Research Cited in the Program',
    'about.expert1': 'Matthew Walker',
    'about.expert2': 'Andrew Huberman',
    'about.expert3': 'Michael Breus',
    'about.expert4': 'Charles Czeisler',
    'about.program.title': 'The 21-Step Program',
    'about.program.text': 'Developed over 10 years of personal research and study of peer-reviewed sleep science. Each step is a practical application of published scientific findings.',
    'about.why.title': 'Why GoZzzz?',
    'about.why.text': 'Because quality sleep is not a luxury, it\'s a necessity. It\'s the foundation for physical, mental, emotional health and performance in all areas of life. GoZzzz condenses 10 years of study into a simple, practical and science-based program.',
    'about.contact': 'Contact: support@gozzzz.app',
    'about.version': 'Version',

    // Profile
    'profile.title': 'My Profile',
    'profile.subscription': 'Current Subscription',
    'profile.free': 'Free Plan',
    'profile.premium': 'Premium Plan',
    'profile.gift': 'Gift Card Activated',
    'profile.unlockContent': 'Unlock the complete 21-step program and all premium content',
    'profile.subscribePremium': 'Subscribe Premium',
    'profile.redeemGift': 'Redeem Gift Card',
    'profile.premiumAccess': 'You have full access to all premium content!',
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.notificationsPermissionDenied': 'Permission denied. Enable notifications in system settings for gentle routine reminders.',
    'profile.darkMode': 'Dark Mode',
    'profile.enabled': 'Enabled',
    'profile.disabled': 'Disabled',
    'profile.payment': 'Payment',
    'profile.paymentMethods': 'Payment Methods',
    'profile.giftCards': 'Gift Cards',
    'profile.manageSubscription': 'Manage / Cancel Subscription',
    'profile.manageSubscriptionDesc': 'Cancel or change your subscription anytime',
    'profile.support': 'Support',
    'profile.helpCenter': 'Help Center',
    'profile.privacy': 'Privacy and Terms',
    'profile.share': 'Share',
    'profile.qrcode': 'QR Code',
    'profile.businessCard': 'Business Card',
    'profile.logout': 'Sign Out',

    // Modals
    'modal.selectLanguage': 'Select Language',
    'modal.paymentMethods.title': 'Payment Methods',
    'modal.paymentMethods.text': 'We accept the following payment methods:',
    'modal.paymentMethods.item1': 'Credit Card',
    'modal.paymentMethods.item3': 'PIX',
    'modal.redeemGift.title': 'Redeem Gift Card',
    'modal.redeemGift.text': 'Enter your gift card code to unlock premium access.',
    'modal.redeemGift.redeem': 'Redeem',
    'modal.help.title': 'Help Center',
    'modal.help.text': 'For any questions about the app, please contact us:',
    'modal.privacy.title': 'Privacy and Terms',
    'modal.privacy.text': 'Read the full Privacy Policy and Terms & Conditions on the dedicated pages:',
    'modal.logout.title': 'Sign Out',
    'modal.logout.text': 'Are you sure you want to sign out?',
    'modal.logout.cancel': 'Cancel',
    'modal.logout.confirm': 'Sign Out',

    // Program CTA
    'program.activateTest': 'Activate Premium (Test)',
    'program.premiumActivated': 'Premium Activated!',
    'program.premiumActivatedMsg': 'You now have access to all content.',
    'program.modal.badge': 'Premium Access',
    'program.modal.title': 'Unlock Premium Content',
    'program.modal.desc': 'Get access to all lessons, advanced techniques, and personal coaching sessions to transform your sleep quality.',
    'program.modal.feature1': 'Complete 21-step sleep program',
    'program.modal.feature2': 'Expert coaching sessions',
    'program.modal.feature3': 'Personalized sleep analysis',
    'program.modal.feature4': 'Lifetime access to updates',
    'program.modal.priceLabel': '',
    'program.modal.perMonth': 'per month',
    'program.modal.cta': 'Unlock Now',
    'program.modal.alreadySub': 'Already subscribed? Sign in',
    'program.ctaTitle': 'Unlock All 21 Steps',
    'program.ctaSub': 'From $11.90/month',
    'program.ctaCard': 'Card',
    'program.ctaSubscribe': 'Subscribe Premium Now',
    'program.ctaSecurity': 'SSL 256-bit · PCI DSS · Secure payment',

    // Coach CTA banner
    'coach.ctaBannerTitle': 'Subscribe to Premium Program',
    'coach.ctaBannerSub': '',
    'coach.ctaSubscribe': 'Subscribe Premium Now',
    'coach.ctaSecurity': 'SSL 256-bit · PCI DSS · Secure payment',

    // About hardcoded
    'about.headerSubtitle': 'From insomnia to clarity — method, rigor, and humanity',
    'about.storyTitle': 'My Story',
    'about.story1': 'For almost 10 years, I lived a silent battle that few understood. Endless nights staring at the ceiling, fragmented sleep that left me exhausted, foggy days where I could barely function. Insomnia was not just about not sleeping — it was about losing the essence of who I was.',
    'about.story2': 'I tried everything. Medications that left me like a zombie. Teas and melatonin that made no difference. Meditations that only increased my frustration. Every night was a new hope that turned into disappointment.',
    'about.story3': 'That\'s when I realized I needed to stop looking for quick fixes and start understanding the science behind sleep. I dove into peer-reviewed research from neuroscientists and sleep medicine specialists.',
    'about.expert1Desc': '',
    'about.expert2Desc': '',
    'about.expert3Desc': '',
    'about.expert4Desc': '',
    'about.credibilityLine': 'Based on published research by Matthew Walker, Andrew Huberman, Charles Czeisler, and Michael Breus — in the world\'s leading peer-reviewed journals.',
    'about.references.title': 'Scientific References',
    'about.references.intro': 'GoZzzz is based on peer-reviewed research published in the world\'s leading scientific journals, including:',
    'about.references.item1': 'Walker, M. (2017). Why We Sleep. Scribner.',
    'about.references.item2': 'Huberman, A.D. et al. (2022). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine.',
    'about.references.item3': 'Breus, M. (2016). The Power of When. Little, Brown and Company.',
    'about.references.item4': 'Czeisler, C.A. et al. (1999). Stability, precision, and near-24-hour period of the human circadian pacemaker. Science, 284(5423).',
    'about.references.item5': 'Xie, L. et al. (2013). Sleep drives metabolite clearance from the adult brain. Science, 342(6156).',
    'about.missionHighlight': 'After 10 years of suffering and intensive study, I recovered my sleep. Today I can sleep 7 to 8 hours comfortably almost every night. It takes discipline — the body loves routine.',
    'about.missionStory': 'GoZzzz was born from this transformation. It\'s the program I wish I had found when I started my journey. Each step represents a scientific discovery I implemented that worked.',
    'about.feature1': 'Based on peer-reviewed scientific research',
    'about.feature2': 'Incremental and sustainable steps',
    'about.feature3': 'Focus on behavioral changes, not medications',
    'about.feature4': 'Accessible to everyone, no prohibitive cost',
    'about.disclaimerTitle': 'Health Disclaimer',
    'about.disclaimer1': 'Content provided by GoZzzz is for educational and informational purposes only. The information, techniques and recommendations presented in this app do not constitute medical advice, diagnosis or treatment of any health condition.',
    'about.disclaimer2': 'Before starting any sleep habit change program, consult a doctor or qualified health professional, especially if you have conditions such as sleep apnea, chronic insomnia, mood disorders, medication use or other medical conditions.',
    'about.disclaimer3': 'Results described are individual experiences and may vary from person to person. GoZzzz does not guarantee specific results. If symptoms persist or any condition worsens, seek medical attention immediately.',
    'about.disclaimer4': 'This app does not replace professional medical care.',
    'about.brandLine': 'About us',
    'about.heroEyebrow': 'Premium sleep program',
    'about.heroKicker': 'Actionable science, realistic habits, and a clear path — for people who want progress without guesswork.',
    'about.stat1Value': '21',
    'about.stat1Label': 'structured days',
    'about.stat2Value': '21',
    'about.stat2Label': 'practical steps',
    'about.stat3Value': '4',
    'about.stat3Label': 'guided chronotypes',
    'about.manifesto': 'Great sleep is not luck — it is a chain of small decisions, repeated, grounded in evidence.',
    'about.manifestoAuthor': 'GoZzzz philosophy',
    'about.trustTitle': 'Why this is credible',
    'about.trustBody': 'We cite leading sleep and circadian researchers and publications. We use responsible language: we educate and motivate — we do not replace your clinician or promise cures.',
    'about.pillar1Title': 'Evidence over trends',
    'about.pillar1Body': 'Each theme maps to peer-reviewed science or established manuals — no empty "life hacks".',
    'about.pillar2Title': 'Chronotype with nuance',
    'about.pillar2Body': 'Lion, Bear, Wolf, and Dolphin help structure your day — always framed as teaching models, not clinical labels.',
    'about.pillar3Title': 'From knowledge to habit',
    'about.pillar3Body': 'Twenty-one steps designed to turn insight into routines your biology can recognize.',
    'about.unlockTitle': 'Unlock the full program',
    'about.unlockSubtitle': 'Premium access to every step, content updates, and the full experience.',
    'about.unlockCta': 'Get Premium',

    // Profile hardcoded
    'profile.footerSubtext': 'Made with dedication to support your sleep',
    'profile.paymentValue': 'Card, PayPal, Apple Pay',
    'profile.privacyBtn': 'Privacy Policy',
    'profile.termsBtn': 'Terms & Conditions',
    'profile.giftAlert': 'Your code will be validated shortly!',
    'profile.giftCodeRequired': 'Please enter a gift code.',
    'profile.notAuthenticated': 'You must be authenticated to redeem the code.',
    'profile.giftRedeemError': 'Failed to redeem gift code.',
    'profile.giftRedeemSuccess': 'Gift code redeemed successfully!',

    // Web pages
    'web.nav.program': 'Program',
    'web.nav.coach': 'Sono+',
    'web.nav.about': 'About',
    'web.nav.subscribe': 'Subscribe',
    'web.nav.back': 'Back',
    'web.badge.scienceBased': 'Neuroscience-based',
    'web.hero.title': 'The problem isn\'t that you can\'t sleep. It\'s that nobody ever taught you how.',
    'web.hero.titleSub': 'Melatonin doesn\'t fix it. Tea doesn\'t fix it. Science explains why — and what actually works.',
    'web.hero.subtitle': 'The program that condenses 10 years of sleep science research — in simple, practical, evidence-based steps.',
    'web.hero.startNow': 'Get Started',
    'web.hero.viewProgram': 'View the Program',
    'web.hero.stat1': 'Scientific steps',
    'web.hero.stat2': 'Years of research',
    'web.hero.stat3': 'Reference researchers',
    'web.problem.label': 'Do you recognize yourself?',
    'web.problem.title': 'The cycle that drains your energy every day',
    'web.problem.item1': 'Wake up tired even after sleeping enough hours',
    'web.problem.item2': 'Racing mind when trying to fall asleep',
    'web.problem.item3': 'Wake up in the middle of the night and can\'t fall back asleep',
    'web.problem.item4': 'Depend on caffeine to function during the day',
    'web.problem.item5': 'Try to "catch up" on sleep on weekends, but it doesn\'t help',
    'web.problem.item6': 'Productivity and mood impacted by sleep quality',
    'web.solution.label': 'The solution',
    'web.solution.title': '21 steps based on real science',
    'web.solution.desc': 'Each step in the GoZzzz program is based on published research by sleep neuroscientists. No magic solutions — only science applied in a practical way.',
    'web.solution.viewAll': 'See all 21 steps',
    'web.experts.label': 'Based on',
    'web.experts.title': 'Reference researchers in sleep science',
    'web.testimonials.label': 'Real results',
    'web.testimonials.title': 'What program users are saying',
    'web.pricing.label': 'Investment',
    'web.pricing.title': 'Choose your plan',
    'web.pricing.monthly': 'Monthly Plan',
    'web.pricing.annual': 'Annual Plan',
    'web.pricing.perMonth': 'per month',
    'web.pricing.perMonthAnnual': 'per month · billed annually',
    'web.pricing.save': 'Save 33%',
    'web.pricing.popular': 'Most popular',
    'web.pricing.subscribeMonthly': 'Subscribe Monthly',
    'web.pricing.subscribeAnnual': 'Subscribe Annual',
    'web.pricing.feature1': '21 complete program steps',
    'web.pricing.feature2': 'Science-based 21-step structured program',
    'web.pricing.feature3': 'Based on research from 4 sleep scientists',
    'web.pricing.feature4': 'Free updates included',
    'web.pricing.feature5': 'Cancel anytime',
    'web.disclaimer.title': 'Health Disclaimer',
    'web.disclaimer.text': 'GoZzzz content is for educational and informational purposes only. It does not constitute medical advice, diagnosis or treatment. Consult a health professional before starting any program, especially if you have pre-existing health conditions. Individual results may vary.',
    'web.cta.title': 'Ready to improve\nyour sleep?',
    'web.cta.subtitle': 'Created by someone who lived through 10 years of insomnia and turned that learning into a science-based program.',
    'web.cta.btn': 'Get Started',
    'web.footer.copy': 'support@gozzzz.app · © 2025 GoZzzz. All rights reserved.',

    // Web program page
    'web.program.badge': '10 years of research condensed',
    'web.program.headTitle': 'GoZzzz Program — 21 Steps to Sleep Better',
    'web.program.headDesc':
      'Explore 21 science-based lessons in GoZzzz. Each step draws on peer-reviewed sleep and circadian research.',
    'web.program.ogDesc': 'Science-based lessons to upgrade your sleep for good.',
    'web.program.steps': 'Steps',
    'web.program.freeLessons': 'Free lessons',
    'web.program.eachStep': 'Per step',
    'web.program.pillApproxStep': '~5 min · step',
    'web.program.allLessons': 'All lessons',
    'web.program.learnScience': 'Learn sleep science with our complete step-by-step program',
    'web.program.title': '21-Step Program',
    'web.program.subtitle': 'Each step is an applied scientific finding. Based on peer-reviewed sleep research.',
    'web.program.stat1': 'Steps',
    'web.program.stat2': 'Free',
    'web.program.stat3': 'Per step',
    'web.program.sectionTitle': 'The 21 Steps',
    'web.program.sectionDesc': 'The first 3 steps are free. Subscribe to unlock all of them.',
    'web.program.free': 'Free',
    'web.program.premium': 'Premium',
    'web.program.video': 'Video',
    'web.program.audio': 'Audio',
    'web.program.viewLesson': 'View Lesson',
    'web.program.unlock': 'Unlock',
    'web.program.lockedDesc': 'Premium content. Subscribe to unlock this step and access the full program.',
    'web.program.ctaTitle': 'Unlock all 21 steps',
    'web.program.ctaDesc': 'From $11.90/month. Access the full program, written lessons, and free updates.',
    'web.program.ctaFeature1': '21 complete steps',
    'web.program.ctaFeature2': 'Written lessons and practical steps',
    'web.program.ctaFeature3': 'Science-based',
    'web.program.ctaFeature4': 'Cancel anytime',
    'web.program.ctaBtn': 'Subscribe Premium Now',
    'web.program.pathTitle': 'How the program works in practice',
    'web.program.path1':
      'Each lesson turns sleep science into one move you repeat the next day — no filler.',
    'web.program.path2':
      'The first three steps are free; then unlock the rest with a one-time lifetime purchase.',
    'web.program.path3':
      'You move through 21 steps in three blocks: map your pattern, apply protocols, lock in rhythm.',

    // Web coach page
    'web.coach.navBtn': 'Book a Session',
    'web.coach.heroTitle': 'Evidence-based sleep consulting',
    'web.coach.heroSubtitleNew': 'As a specialized Sleep Coach, I offer an integrated approach that goes beyond sleep techniques. I work with integrative medicine focusing especially on emotional health and complete well-being.',
    'web.coach.heroBtn1': 'Book Initial Session',
    'web.coach.heroBtn2': 'Discover the Program',
    'web.coach.storyLabel': 'Why trust me',
    'web.coach.storyTitle': 'A personal journey that became a purpose',
    'web.coach.storyText': 'I spent 10 years facing insomnia and fragmented sleep. This personal journey motivated me to deeply study sleep science through research in neuroscience and sleep medicine.',
    'web.coach.storyQuote': 'Today, I apply the scientific knowledge I gained to help people improve their sleep quality in a sustainable way.',
    'web.coach.storyEnd': 'Today, I apply the scientific knowledge I gained to help people improve their sleep quality in a sustainable way.',
    'web.coach.heroSubtitle': 'Wake up tired, even after sleeping enough hours?',
    'web.coach.heroDesc': 'Recover your energy, focus and well-being with an approach that gets to the root of the problem.',
    'web.coach.painPoints': 'Insomnia, fragmented sleep, nighttime anxiety, waking at 3am unable to fall back asleep... This is not frivolous. Your body is calling for help — and it\'s affecting your work, your relationships and your health.',
    'web.coach.processLabel': 'How it works',
    'web.coach.processTitle': '3 consulting steps',
    'web.coach.step1.title': 'Focused Initial Session',
    'web.coach.step1.desc': '60 minutes to map your sleep history, challenges and goals. No shortcuts — each step is grounded in science.',
    'web.coach.step1.detail': '60 minutes · Online or In-Person',
    'web.coach.step2.title': '360° Personalized Plan',
    'web.coach.step2.desc': 'Development of your integrated protocol combining sleep, lifestyle and emotional health. You leave with a clear and practical path forward.',
    'web.coach.step2.detail': 'Delivered within 48 hours',
    'web.coach.step3.title': 'Continuous Support',
    'web.coach.step3.desc': 'Regular sessions, plan adjustments and support throughout your progress — because sustainable behavioral change happens with consistency.',
    'web.coach.step3.detail': 'WhatsApp support included',
    'web.coach.includedLabel': 'What\'s included',
    'web.coach.includedTitle': 'A complete approach to your life',
    'web.coach.card1.title': 'Sleep Optimization',
    'web.coach.card1.desc': 'Personalized strategies based on your chronotype, lifestyle and specific needs — grounded in published sleep science protocols.',
    'web.coach.card2.title': 'Integrative Medicine',
    'web.coach.card2.desc': 'An approach that combines sleep science, emotional health and well-being based on evidence, for sustainable change.',
    'web.coach.card3.title': 'Continuous Support',
    'web.coach.card3.desc': 'Close follow-up via WhatsApp with real-time adjustments to your plan as you evolve.',
    'web.coach.servicesLabel': 'What\'s included',
    'web.coach.servicesTitle': 'Complete health consulting',
    'web.coach.service1.title': 'Emotional Health',
    'web.coach.service1.desc': 'Deep work with your emotions, anxiety, stress and emotional patterns that affect your well-being and sleep.',
    'web.coach.service2.title': 'Sleep Optimization',
    'web.coach.service2.desc': 'Personalized strategies based on your lifestyle, chronotype and specific needs.',
    'web.coach.service3.title': 'Integrative Medicine',
    'web.coach.service3.desc': 'Holistic approach including nutrition, movement, supplementation and integrative practices.',
    'web.coach.service4.title': 'Personalized Plan',
    'web.coach.service4.desc': 'Unique protocol developed for you, considering your history, goals and challenges.',
    'web.coach.trustLabel': 'Social Proof',
    'web.coach.trustTitle': 'Client experiences',
    'web.coach.trustText1': 'Experiences from clients who applied the program strategies.',
    'web.coach.trustText2': 'Individual accounts. Results may vary from person to person.',
    'web.coach.testimonial1': '"I managed to sleep 7 straight hours for the first time in a long while."',
    'web.coach.testimonial1Author': 'Sarah M., 38 — New York',
    'web.coach.testimonial2': '"I noticed improvements in sleep and anxiety over the first weeks following the program."',
    'web.coach.testimonial2Author': 'James T., 45 — Los Angeles',
    'web.coach.testimonial3': '"I notice more focus and energy since improving my sleep routine."',
    'web.coach.testimonial3Author': 'Emma L., 32 years old, Chicago',
    'web.coach.priceAnchor': 'How many years have you already lost to poor sleep? How much has it cost you in your career, your relationships, your life?',
    'web.coach.scarcity': 'I see a maximum of 8 clients per month to guarantee individualized attention. Limited spots available.',
    'web.coach.promise': 'With consistent application of the program, you will implement science-based strategies to gradually improve your sleep quality.',
    'web.coach.pricingLabel': 'Investment',
    'web.coach.pricingTitle': 'Choose your journey',
    'web.coach.mostPopular': 'Most Popular',
    'web.coach.perMonth': '/month',
    'web.coach.price1.label': 'Individual Sleep Coaching',
    'web.coach.price1.popular': 'Most Popular',
    'web.coach.price1.tagline1': 'One diagnostic session.',
    'web.coach.price1.tagline2': 'A plan made for you.',
    'web.coach.price1.tagline3': 'Results you can feel.',
    'web.coach.price1.desc': '60 minutes online, from wherever you are.',
    'web.coach.price1.f1': 'Complete mapping of your habits, routine, and sleep environment',
    'web.coach.price1.f1sub': '',
    'web.coach.price1.f2': '60-minute online session — from wherever you are, without judgment',
    'web.coach.price1.f2sub': '',
    'web.coach.price1.f3':
      'Personalized report with diagnosis, strategies, and next steps — delivered within 72h',
    'web.coach.price1.f3sub': '',
    'web.coach.price1.f4': 'WhatsApp support for quick questions — direct access, no AI',
    'web.coach.price1.f4sub': '',
    'web.coach.price1.f5': '30 days of GoZzzz Premium with all features unlocked',
    'web.coach.price1.f5sub': '',
    'web.coach.price1.btn': 'Book my session',
    'web.coach.price3.label': 'Premium Community',
    'web.coach.price3.desc': 'Exclusive content and private group with monthly group session',
    'web.coach.price3.f1': 'Exclusive weekly content',
    'web.coach.price3.f2': 'Private group',
    'web.coach.price3.f3': 'Monthly live group session',
    'web.coach.price3.f4': 'Sleep protocol library',
    'web.coach.priceBtn': 'I Want to Start',
    'web.coach.ctaFinalTitle': 'Ready to improve your sleep with science?',
    'web.coach.ctaFinalSubtitle': 'Book your initial session and take the first step with an evidence-based plan.',
    'web.coach.ctaFinalBtn': 'Book Initial Session',
    'web.coach.securePayment': 'Secure Payment',
    'web.coach.satisfaction': 'Satisfaction Guaranteed',
    'web.coach.footerPrivacy': 'Privacy Policy',
    'web.coach.footerTerms': 'Terms of Use',
    'web.coach.footerCopy': 'MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52 · All rights reserved',
    'web.coach.ctaTitle': 'Ready to improve your sleep with science?',
    'web.coach.ctaDesc': 'Schedule an initial session and discover how we can work together to improve your sleep, energy and well-being.',
    'web.coach.ctaBtn1': 'I want to improve my sleep',
    'web.coach.ctaBtn2': 'Get started now',
    'web.coach.subCtaTitle': 'Unlock the Complete Program',
    'web.coach.subCtaDesc': '21 scientific steps to improve your sleep. From $11.90/month.',
    'web.coach.subCtaBtn': 'Subscribe Premium Now',
    'web.coach.headTitle': 'Coach GoZzzz - Personal Sleep Consulting',
    'web.coach.headDesc': 'Personalized sleep consulting with evidence-based strategies. Individual assessment, personalized plan and continuous follow-up.',

    // Web sobre page
    'web.sobre.heroTitle': 'About GoZzzz',
    'web.sobre.heroSubtitle': 'When pain becomes purpose',
    'web.sobre.storyTitle': 'My Story',
    'web.sobre.story1': 'For almost 10 years, I lived a silent battle that few understood. Endless nights staring at the ceiling, fragmented sleep that left me exhausted, foggy days where I could barely function. Insomnia was not just about not sleeping — it was about losing the essence of who I was.',
    'web.sobre.story2': 'I tried everything. Medications that left me like a zombie. Teas and melatonin that made no difference. Meditations that only increased my frustration. Every night was a new hope that turned into disappointment.',
    'web.sobre.story3': 'That\'s when I realized I needed to stop looking for quick fixes and start understanding the science behind sleep. I dove into peer-reviewed research from neuroscientists and sleep medicine specialists.',
    'web.sobre.storyQuote': '"After 10 years of suffering and intensive study, I recovered my sleep. Today I can sleep 7 to 8 hours comfortably almost every night. It takes discipline — the body loves routine."',
    'web.sobre.story4': 'GoZzzz was born from this transformation. It\'s the program I wish I had found when I started my journey. Each step represents a scientific discovery I implemented that worked.',
    'web.sobre.expertsTitle': 'Published Research Cited in the Program',
    'web.sobre.expert1.role': 'Sleep Researcher · Author of "Why We Sleep"',
    'web.sobre.expert1.detail': 'Bestselling author of "Why We Sleep". His published studies on sleep stages and REM sleep are widely cited in the scientific community.',
    'web.sobre.expert2.role': 'Neuroscientist · Huberman Lab',
    'web.sobre.expert2.detail': 'Researcher and creator of Huberman Lab. His published protocols on morning sunlight and circadian rhythm are key references in sleep science.',
    'web.sobre.expert3.role': 'Sleep Specialist · The Sleep Doctor',
    'web.sobre.expert3.detail': 'Pioneer in chronobiology and discoverer of the 4 chronotypes. His studies on sleep schedule consistency are widely referenced.',
    'web.sobre.expert4.role': 'Researcher · Sleep Medicine',
    'web.sobre.expert4.detail': 'Sleep medicine researcher with publications in peer-reviewed journals. His studies on artificial light and melatonin suppression are widely referenced.',
    'web.sobre.missionTitle': 'Our Mission',
    'web.sobre.mission1': 'Democratize access to scientific knowledge about quality sleep, making research findings from sleep scientists accessible to everyone.',
    'web.sobre.mission2': 'GoZzzz was born from this transformation. It\'s the program I wish I had found when I started my journey. Each step represents a scientific discovery I implemented that worked.',
    'web.sobre.programTitle': 'The 21-Step Program',
    'web.sobre.programText': 'Developed over 10 years of personal research and study of peer-reviewed sleep science. Each step is a practical application of published scientific findings.',
    'web.sobre.feature1': 'Based on peer-reviewed scientific research',
    'web.sobre.feature2': 'Incremental and sustainable steps',
    'web.sobre.feature3': 'Focus on behavioral changes, not medications',
    'web.sobre.feature4': 'Accessible to everyone, no prohibitive cost',
    'web.sobre.whyTitle': 'Why GoZzzz?',
    'web.sobre.whyText': 'Because quality sleep is not a luxury, it\'s a necessity. It\'s the foundation for physical, mental, emotional health and performance in all areas of life. GoZzzz condenses 10 years of study into a simple, practical and science-based program.',
    'web.sobre.disclaimer1': 'Content provided by GoZzzz is for educational and informational purposes only. The information, techniques and recommendations presented do not constitute medical advice, diagnosis or treatment of any health condition.',
    'web.sobre.disclaimer2': 'Before starting any sleep habit change program, consult a doctor or qualified health professional, especially if you have conditions such as sleep apnea, chronic insomnia, mood disorders, medication use or other medical conditions.',
    'web.sobre.disclaimer3': 'Results described are individual experiences and may vary from person to person. GoZzzz does not guarantee specific results. If symptoms persist or any condition worsens, seek medical attention immediately. This app does not replace professional medical care.',
    'web.sobre.footerContact': 'Contact: support@gozzzz.app · Version 1.0.0',
    'web.sobre.footerCopy': '© 2025 GoZzzz. All rights reserved.',

    // App entry (first screen)
    'entry.learnMore': 'Learn more',

    // Auth screens
    'auth.tagline': 'Sleep science applied to your daily life',
    'auth.login.title': 'Welcome back',
    'auth.login.email': 'Email',
    'auth.login.password': 'Password',
    'auth.login.forgot': 'Forgot password?',
    'auth.login.btn': 'Sign In',
    'auth.login.loading': 'Signing in...',
    'auth.login.divider': 'or',
    'auth.login.signup': 'Create new account',
    'auth.login.test': 'Quick Access (Test)',
    'auth.login.footer': 'By continuing, you agree to our Terms of Use and Privacy Policy',
    'auth.login.errorTitle': 'Login error',
    'auth.login.errorEmpty': 'Please fill in all fields',
    'auth.login.errorMsg': 'Incorrect email or password. Please try again.',
    'auth.login.errorEmailNotConfirmed': 'Your email has not been confirmed yet. Please check your inbox and click the confirmation link.',
    'auth.login.errorUnexpected': 'An unexpected error occurred. Please try again.',
    'auth.login.errorSupabaseEnv':
      'This site is not connected to the backend (Supabase). In the Vercel dashboard, set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY under Environment Variables (use your Supabase project: Settings → API), then redeploy.',
    'auth.signup.title': 'Create Account',
    'auth.signup.name': 'Full name',
    'auth.signup.email': 'Email',
    'auth.signup.password': 'Password',
    'auth.signup.confirmPassword': 'Confirm password',
    'auth.signup.btn': 'Create Account',
    'auth.signup.loading': 'Creating...',
    'auth.signup.login': 'I already have an account',
    'auth.signup.footer': 'By creating an account, you agree to our Terms of Use and Privacy Policy',
    'auth.signup.errorTitle': 'Error',
    'auth.signup.errorEmpty': 'Please fill in all fields',
    'auth.signup.errorPassword': 'Passwords do not match',
    'auth.signup.errorLength': 'Password must be at least 6 characters',
    'auth.signup.errorSignup': 'Error creating account',
    'auth.signup.errorMsg': 'Check your information and try again.',
    'auth.signup.successTitle': 'Account created successfully!',
    'auth.signup.successMsg': 'Welcome to GoZzzz! Let\'s start your journey.',
    'auth.signup.tagline': 'Start your transformation today',
    'auth.signup.formTitle': 'Create new account',
    'auth.signup.passwordPlaceholder': 'Password (minimum 6 characters)',
    'auth.signup.benefitsTitle': 'What you\'ll get:',
    'auth.signup.benefit1': '3 free lessons — no credit card required',
    'auth.signup.benefit2': 'How Sono+ works: personalized consulting for your sleep pattern',
    'auth.signup.benefit3': 'Your account is active immediately after signup',
    'auth.signup.btnFree': 'Create Free Account',
    'auth.signup.loginLink': 'Already have an account?',
    'auth.signup.loginLinkBold': 'Sign In',
    'auth.signup.agreements': 'Agreements',
    'auth.signup.ageConfirm': 'I confirm that I am 18 years or older',
    'auth.signup.termsLabel': 'Terms of Service',
    'auth.signup.privacyLabel': 'Privacy Policy',
    'auth.signup.newsletter': 'I\'d like to receive updates and offers',
    'auth.signup.optional': '(optional)',
    'auth.signup.disclaimer': 'We take your privacy seriously. Your data is secure and encrypted.',
    'auth.signup.creating': 'Creating account...',

    // Web lesson page
    'web.lesson.program': 'Program',
    'web.lesson.step': 'Step',
    'web.lesson.premiumContent': 'Premium Content',
    'web.lesson.premiumSubtitle': 'This lesson is available for subscribers only. Subscribe to unlock all 21 lessons.',
    'web.lesson.subscribeNow': 'Subscribe Now',
    'web.lesson.backToProgram': 'Back to Program',
    'web.lesson.notFound': 'Lesson not found.',
    'web.lesson.viewProgram': 'View Program',
    'web.lesson.expertContent': 'Expert Content',
    'web.lesson.youtubeVideo': 'YouTube Video',
    'web.lesson.videoSource': 'Referenced scientific video',
    'web.lesson.spotifyPodcast': 'Spotify Podcast',
    'web.lesson.keyPoints': 'Key Points',
    'web.lesson.aboutStep': 'About this Step',
    'web.lesson.readingTime': 'Reading time:',
    'web.lesson.minutes': 'minutes',
    'web.lesson.scientificInsights': 'Scientific Insights',
    'web.lesson.previousStep': 'Previous Step',
    'web.lesson.viewFullProgram': 'View Full Program',
    'web.lesson.footer': 'support@gozzzz.app',

    // GDPR/LGPD Profile
    'profile.gdpr.title': 'Privacy & Data Protection',
    'profile.gdpr.marketingConsent': 'Marketing Emails',
    'profile.gdpr.marketingConsentDesc': 'Promotional communications and updates',
    'profile.gdpr.myRights': 'My Rights (GDPR/LGPD)',
    'profile.gdpr.myRightsDesc': 'Access, correct or delete your data',
    'profile.gdpr.exportData': 'Export My Data',
    'profile.gdpr.exportDataDesc': 'Data portability (GDPR Art. 20 / LGPD Art. 18)',
    'profile.gdpr.deleteAccount': 'Delete Account',
    'profile.gdpr.deleteAccountDesc': 'Permanent deletion request',
    'profile.gdpr.exportErrorTitle': 'Error',
    'profile.gdpr.exportErrorMsg': 'Unable to submit export request. Please try again or contact: suporte@gozzzz.app',
    'profile.gdpr.exportSuccessTitle': 'Request Submitted',
    'profile.gdpr.exportSuccessMsg': 'Your data export request has been logged. You will receive your data within 30 days to your registered email address.',
    'profile.gdpr.deleteConfirmError': 'Incorrect confirmation',
    'profile.gdpr.deleteConfirmErrorMsg': 'Type "delete" to confirm deletion.',
    'profile.gdpr.deleteErrorTitle': 'Error',
    'profile.gdpr.deleteErrorMsg': 'Unable to process the request. Please contact: suporte@gozzzz.app',
    'profile.gdpr.deleteWarning': 'Warning: this action is irreversible',
    'profile.gdpr.deleteDetail': 'By deleting your account, all your personal data and progress will be permanently erased within 30 days, as required by GDPR (Art. 17) and LGPD (Art. 18).',
    'profile.gdpr.deleteInstruction': 'To confirm, type "delete" below:',
    'profile.gdpr.deleteInputPlaceholder': 'Type: delete',
    'profile.gdpr.deleteConfirmBtn': 'Delete Permanently',
    'profile.gdpr.deleteSuccessMsg': 'Account deleted successfully',
    'profile.gdpr.rightsIntro': 'Under the GDPR (EU/UK) and LGPD (Brazil), you have the following rights over your personal data:',
    'profile.gdpr.right1': 'Access — view what data we hold about you',
    'profile.gdpr.right2': 'Rectification — correct inaccurate data',
    'profile.gdpr.right3': 'Erasure — delete your data (right to be forgotten)',
    'profile.gdpr.right4': 'Portability — export your data in a readable format',
    'profile.gdpr.right5': 'Objection — object to processing based on legitimate interest',
    'profile.gdpr.right6': 'Withdraw consent — at any time, without penalties',
    'profile.gdpr.rightsContact': 'To exercise any right, use the buttons above or email:',
    'profile.gdpr.modalInputPlaceholder': 'Type: delete',

    // Signup consent keys
    'auth.signup.consentTitle': 'Consent & Privacy',
    'auth.signup.consentTerms': 'I agree to the',
    'auth.signup.consentTermsLink': 'Terms of Use',
    'auth.signup.consentAnd': 'and',
    'auth.signup.consentPrivacyLink': 'Privacy Policy',
    'auth.signup.consentRequired': '(required)',
    'auth.signup.consentMarketing': 'I agree to receive news, promotions and content by email.',
    'auth.signup.consentOptional': '(optional)',
    'auth.signup.consentNote': 'Your data is protected under GDPR and LGPD. You can withdraw consent at any time in profile settings.',
    'auth.signup.consentAge': 'I confirm I am 18 years of age or older.',
    'auth.signup.errorAge': 'You must be 18 years or older to create an account.',
    'auth.signup.errorConsent': 'You must accept the Terms of Use and Privacy Policy to create an account.',

    // Forgot password
    'auth.forgot.title': 'Forgot Password?',
    'auth.forgot.subtitle': 'Provide your email and we\'ll send you a link to reset your password.',
    'auth.forgot.placeholder': 'Your email',
    'auth.forgot.btnSend': 'Send reset link',
    'auth.forgot.sending': 'Sending...',
    'auth.forgot.backButton': 'Back',
    'auth.forgot.errorEmail': 'Please provide your email.',
    'auth.forgot.errorGeneric': 'An error occurred. Try again.',
    'auth.forgot.successTitle': 'Email sent!',
    'auth.forgot.successMsg': 'If an account exists with this email, you\'ll receive instructions to reset your password shortly.',
    'auth.forgot.returnButton': 'Return to login',

    // Reset password
    'auth.reset.successTitle': 'Password reset!',
    'auth.reset.successButton': 'Go to login',
    'auth.reset.errorInvalid': 'Invalid link. Request a new one.',
    'auth.reset.errorEmpty': 'Please provide a new password.',
    'auth.reset.errorShort': 'Password must be at least 6 characters.',
    'auth.reset.errorMismatch': 'Passwords do not match.',
    'auth.reset.errorSave': 'Error resetting password.',
    'auth.reset.errorGeneric': 'An error occurred. Try again.',
    'auth.reset.btnSave': 'Save new password',
    'auth.reset.saving': 'Saving...',

    // Email confirmation
    'auth.confirm.title': 'Email Confirmed!',
    'auth.confirm.button': 'Sign In',
    'auth.confirm.errorTitle': 'Confirmation Error',
    'auth.confirm.errorButton': 'Back',
    'auth.confirm.loadingText': 'Confirming your email...',
    'auth.confirm.errorInvalid': 'Invalid confirmation token.',
    'auth.confirm.errorGeneric': 'Error confirming email. Try again.',
    'auth.confirm.errorFinal': 'An error occurred while confirming your email.',
    'auth.confirm.successMsg': 'Congratulations! Your email was confirmed successfully.',

    // Signup success
    'auth.success.title': 'Account Created!',
    'auth.success.message': 'Your account was created successfully.',
    'auth.success.accessWith': 'Access with the email:',
    'auth.success.button': 'Sign In',
    'auth.success.confirmHint':
      'We sent a confirmation link to your email. Open the message and tap the link to activate your account — then you can sign in with your email and password.',
    'auth.success.continuePlan': 'Continue to your 21-step plan →',

    // Cookie consent
    'cookie.title': 'We use essential cookies',
    'cookie.text': 'We only use essential cookies to keep your session active and language preferences. No tracking or advertising cookies.',
    'cookie.accept': 'Got it',
    'cookie.learnMore': 'Privacy Policy',

    // Modal inputs
    'modal.input.placeholder': 'Type here...',
    'modal.list.bullet': '•',
    'modal.buttons.ok': 'OK',

    // Web program steps titles
    'web.step4.title': 'Room Temperature',
    'web.step5.title': 'Darkness Window',
    'web.step6.title': 'Exercise and Sleep',
    'web.step7.title': 'Nighttime Eating',
    'web.step8.title': 'Wind-Down Protocol',
    'web.step9.title': 'Stress Management',
    'web.step10.title': 'Morning Routine',
    'web.step11.title': 'Strategic Power Nap',
    'web.step12.title': 'Artificial Light Reduction',
    'web.step13.title': 'Smart Supplementation',
    'web.step14.title': 'Sleep and Cognitive Performance',
    'web.step15.title': 'Alcohol and Sleep',
    'web.step16.title': 'Sleep and Immune System',
    'web.step17.title': 'Jet Lag Recovery',
    'web.step18.title': 'Sleep and Hormones',
    'web.step19.title': 'Room Optimization',
    'web.step20.title': 'Advanced Circadian Rhythm',
    'web.step21.title': 'Perfect Sleep Maintenance',

    // Landing Page
    'home.or': 'or',
    'home.share': 'Share GoZzzz',
    'home.sleepQuality': 'Quality\nsleep every\nnight.',
    'home.scienceBacked': 'Science-backed sleep protocols grounded in peer-reviewed research.',
    'home.sleepApp': 'Sleep Science App',
    'home.tagline': 'Breathe, relax and sleep — with the help of science',
    'home.credibility': 'Based on published research by Matthew Walker, Andrew Huberman, Charles Czeisler, and Michael Breus — in the world\'s leading peer-reviewed journals.',
    'home.ctaMain': 'Start the program — for free',
    'home.ctaSubtext': 'Answer 5 questions · 2 minutes · free',
    'home.login': 'I already have an account',
    'home.biometric': 'Sign in with Face ID',
    'home.privacy': 'Your data stays on your device. We never sell your information.',
    'home.founder': 'Created based on 10 years of sleep science research',

    // Language Settings
    'lang.portuguese': 'Português',
    'lang.english': 'English',

    // App Branding
    'app.name': 'GoZzzz',
    'app.version': 'GoZzzz v1.0.0',

    // Support & Contact
    'support.email': 'support@gozzzz.app',
    'privacy.email': 'suporte@gozzzz.app',

    // Gift Card
    'gift.placeholder': 'XXXX-XXXX-XXXX-XXXX',

    // Security Badges
    'security.ssl': 'SSL 256-bit',
    'security.pci': 'PCI DSS',

    // Payment & Premium
    'payment.premium': 'Subscribe Premium',
    'payment.transform': 'Transform your sleep in 21 scientific steps',
    'payment.choosePlan': 'Choose your plan',
    'payment.save': 'Save 39%',
    'payment.annual': 'Annual Plan',
    'payment.monthly': 'Monthly Plan',
    'payment.method': 'Payment Method',
    'payment.card': 'Card',
    'payment.pix': 'Instant payment. QR Code generated by Stripe.',
    'payment.loading': 'Opening payment...',
    'payment.subscribe': 'Subscribe Now',
    'payment.alreadySub': 'Already a subscriber — Sign In',
    'payment.redirect': 'You will be redirected to Stripe...',
    'payment.whatIncluded': 'What\'s included',
    'payment.feature1': '21 complete program steps',
    'payment.feature2': 'Practical guidance in every step',
    'payment.feature3': 'Content grounded in sleep neuroscience',
    'payment.feature4': 'Circadian medicine protocols',
    'payment.feature5': 'Free updates included',
    'payment.feature6': 'Immediate access after payment',
    'payment.feature7': 'Cancel anytime',
    'payment.annualPrice': '$7.90',
    'payment.annualPerMonth': '/mo',
    'payment.annualTotal': '$94.80 billed annually',
    'payment.monthlyPrice': '$9.99',
    'payment.monthlyPer': '/mo',
    'payment.paymentMethod': 'Payment Method',
    'payment.cardOption': 'Card',
    'payment.pixInfo': 'Instant payment. QR Code generated by Stripe.',
    'payment.loadingText': 'Opening payment...',
    'payment.subscribeAnnual': 'Subscribe Annual Plan',
    'payment.subscribeMonthly': 'Subscribe Monthly Plan',
    'payment.monthlyTotal': '$9.99 billed monthly',

    // Program/Lesson Premium Modal
    'program.premiumAccess': 'PREMIUM ACCESS',
    'program.premiumTitle': 'This step is part of the Premium plan',
    'program.premiumDesc': 'Unlock all 21 steps of the full program, with content updates and the premium in-app experience.',
    'program.feature1': 'All 21 steps',
    'program.feature2': 'Written step-by-step lessons',
    'program.feature3': 'In-app progress tracking',
    'program.feature4': 'Final certificate',
    'program.startingFrom': 'Starting at',
    'program.perMonth': '/month',
    'program.unlockNow': 'Unlock Now',
    'program.alreadySubscribed': 'I already have a subscription',
    'payment.disclaimer': 'You will be redirected to Stripe to securely complete your payment.',
    'payment.unlockAllLessons': 'Unlock All Lessons',
    'payment.premiumAccess': 'Get premium access to the full program',
    'payment.ssl': 'SSL 256-bit',
    'payment.pciDss': 'PCI DSS',
    'payment.secureCheckout': 'Secure Checkout',

    // Web Pages
    'web.viewMore': 'See more',
    'web.startNow': 'I Want to Start',
    'web.securePayment': 'Secure Payment',
    'web.satisfactionGuaranteed': 'Satisfaction Guaranteed',

    // Web Testimonials
    'web.testimonial.ana.role': 'Executive, 38 years',
    'web.testimonial.ana.text': 'I managed to sleep 7 straight hours for the first time in a long while. I applied the program strategies consistently.',
    'web.testimonial.ana.result': '7 straight hours of sleep',
    'web.testimonial.carlos.role': 'Entrepreneur, 45 years',
    'web.testimonial.carlos.text': 'I noticed gradual improvement in sleep and anxiety by applying the program techniques. Results varied over the weeks.',
    'web.testimonial.carlos.result': 'Gradual sleep improvement',

    // Web Steps
    'web.step.1.title': 'Understanding Sleep',
    'web.step.1.desc': 'How sleep cycles work and the importance of each stage for health.',
    'web.step.2.title': 'Morning Sunlight',
    'web.step.2.desc': 'The role of morning light exposure in regulating the circadian rhythm.',
    'web.step.3.title': 'Caffeine Timing',
    'web.step.3.desc': 'How the timing of caffeine intake can affect the quality of nighttime sleep.',

    // Web Coach Page
    'web.coach.testimonial1Result': '7 straight hours of sleep',
    'web.coach.testimonial2Result': 'Anxiety reduced in 3 weeks',
    'web.coach.price1': 'US$497',
    'web.coach.price1Sub': 'one-time',
    'web.coach.price2': '$ 117',

    // Web Pricing
    'web.pricing.monthly.currency': '$',
    'web.pricing.monthly.amount': '11',
    'web.pricing.monthly.cents': '.90',
    'web.pricing.annual.currency': '$',
    'web.pricing.annual.amount': '7',
    'web.pricing.annual.cents': '.90',

    // Footer
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.copyright': 'Made with purpose · All rights reserved',
    'footer.support': 'support',

    // Testimonials
    'testimonial.1.text': 'GoZzzz completely changed my life. I spent years with insomnia and found real science-based solutions here.',
    'testimonial.2.text': 'The program is practical and easy to follow. I recommend it to anyone who wants to improve their sleep.',

    // QR Code Page
    'qrcode.title': 'Share App',
    'qrcode.tagline': 'Transform your sleep with science',
    'qrcode.scan': 'Scan to download',
    'qrcode.badge': 'The 3 biggest sleep researchers on the planet in one place',
    'qrcode.shareLink': 'Share Link',
    'qrcode.openLink': 'Open Link',
    'qrcode.infoTitle': 'Share the Transformation',
    'qrcode.infoText': 'Help others discover the power of quality sleep. Share GoZzzz with friends and family!',
    'qrcode.share': 'GoZzzz - Transform your sleep with science\n\nScience-based sleep program in 21 steps.\n\nDownload now:',

    // Business Card Page
    'card.title': 'Digital Business Card',
    'card.front': 'Card Front',
    'card.back': 'Card Back',
    'card.tagline': 'Science-based sleep program\nin 21 steps',
    'card.badge': '🧠 SCIENCE-BACKED',
    'card.scan': 'Scan',
    'card.experts': 'What you will learn:',
    'card.share': 'Share Card',
    'card.viralTitle': 'Viral Phrases to Share',
    'card.viral1': 'Quality sleep is not a luxury. It\'s your superpower. GoZzzz.',
    'card.viral2': '21 steps. 1 app. Your life transformed. GoZzzz.',
    'card.viral3': '15 years of insomnia became your sleep guide. GoZzzz.',
    'card.viral4': '21 steps. Real science. Transformed sleep. GoZzzz.',
    'card.viral5': '21 days. 1 program. 1 transformed sleep. GoZzzz.',
    'card.viral6': 'Tired of being tired? GoZzzz has the science you need.',
    'card.tips': 'Sharing Tips',
    'card.shareMsg': 'GoZzzz - Science-based sleep program in 21 steps 🌙\n\nTransform your sleep with science.\n\nDownload now: https://gozzzz.app',

    // Error Messages
    'error.paymentFailed': 'Failed to start payment.',
    'error.connectionFailed': 'Connection error. Try again.',
    'error.couldNotOpenPodcast': 'Could not open podcast',

    // Podcast/Audio
    'audio.podcast': 'Podcast',

    // Privacy Policy
    'privacy.back': 'Back',
    'privacy.title': 'Privacy Policy',
    'privacy.updated': 'Updated May 4, 2026',
    'privacy.ukDpa': 'UK DPA 2018',
    'privacy.summary.title': 'Summary',
    'privacy.summary.text': 'GoZzzz is an educational sleep program; references to researchers and publications are for scientific context only, without affiliation or endorsement. We collect only the data necessary to provide the service. We never sell your data. You can access, correct, export or delete your data at any time. This policy complies with the GDPR (EU/UK) and the LGPD (Brazil).',
    'privacy.dataController.title': '1. Data Controller',
    'privacy.dataController.text': 'GoZzzz is the controller of your personal data. To exercise your rights or for privacy questions, contact us at:',
    'privacy.dataController.privacy': 'suporte@gozzzz.app',
    'privacy.dataController.support': 'General support: support@gozzzz.app',
    'privacy.dataCollected.title': '2. Data We Collect',
    'privacy.dataCollected.text': 'We collect only data strictly necessary for providing the service:',
    'privacy.dataCollected.tableData': 'Data',
    'privacy.dataCollected.tablePurpose': 'Purpose',
    'privacy.dataCollected.tableLegal': 'Legal Basis',
    'privacy.dataCollected.row1.data': 'Name, Email',
    'privacy.dataCollected.row1.purpose': 'Account creation',
    'privacy.dataCollected.row1.legal': 'Contract',
    'privacy.dataCollected.row2.data': 'Lesson progress',
    'privacy.dataCollected.row2.purpose': 'Personalise experience',
    'privacy.dataCollected.row2.legal': 'Contract',
    'privacy.dataCollected.row3.data': 'Language preference',
    'privacy.dataCollected.row3.purpose': 'Correct language UI',
    'privacy.dataCollected.row3.legal': 'Legitimate interest',
    'privacy.dataCollected.row4.data': 'Payment data',
    'privacy.dataCollected.row4.purpose': 'Process transactions',
    'privacy.dataCollected.row4.legal': 'Contract / Legal obligation',
    'privacy.dataCollected.row5.data': 'Marketing emails',
    'privacy.dataCollected.row5.purpose': 'Promotional communications',
    'privacy.dataCollected.row5.legal': 'Consent (opt-in)',
    'privacy.serviceProviders.title': '3. Service Providers (Sub-processors)',
    'privacy.serviceProviders.text': 'We share data only with service providers necessary to operate GoZzzz:',
    'privacy.serviceProviders.supabase': 'Supabase, Inc.',
    'privacy.serviceProviders.supabaseDesc': 'Database and authentication — AWS us-east-1. GDPR compliant via Standard Contractual Clauses (SCCs).',
    'privacy.serviceProviders.stripe': 'Stripe, Inc.',
    'privacy.serviceProviders.stripeDesc': 'Payment processing — PCI-DSS Level 1 certified. GDPR compliant. No card data is stored by GoZzzz.',
    'privacy.internationalTransfer.title': '4. International Data Transfers',
    'privacy.internationalTransfer.text': 'Your data is stored on servers in the United States (AWS us-east-1, operated by Supabase). For EU/UK users, the transfer is covered by the European Commission\'s Standard Contractual Clauses (SCCs). For Brazilian users, the transfer complies with arts. 33-36 of the LGPD, with equivalent contractual safeguards.',
    'privacy.retention.title': '5. Data Retention',
    'privacy.retention.item1': '• Profile and progress: while account is active',
    'privacy.retention.item2': '• Payment data: 7 years (fiscal and legal obligation)',
    'privacy.retention.item3': '• Consent records: 5 years after consent withdrawal',
    'privacy.retention.item4': '• Deletion requests: completed within 30 days',
    'privacy.retention.item5': '• System logs (IPs): maximum 90 days',
    'privacy.rights.title': '6. Your Rights — GDPR (EU/UK)',
    'privacy.rights.text': 'Under the GDPR, you have the following rights regarding your personal data:',
    'privacy.rights.access': '• Access (Art. 15): obtain a copy of your data',
    'privacy.rights.rectification': '• Rectification (Art. 16): correct inaccurate data',
    'privacy.rights.erasure': '• Erasure (Art. 17): request deletion of your account and data',
    'privacy.rights.portability': '• Portability (Art. 20): export your data in a readable format',
    'privacy.rights.restriction': '• Restriction (Art. 18): restrict processing of your data',
    'privacy.rights.objection': '• Objection (Art. 21): object to processing based on legitimate interest',
    'privacy.rights.withdraw': '• Withdraw consent: at any time, without affecting prior processing',
    'privacy.rights.response': 'We will respond to requests within 30 days. You may also file a complaint with the supervisory authority of your country (ICO in the UK; CNIL in France; AEPD in Spain).',

    // LGPD Rights
    'privacy.lgpd.title': '7. Your Rights — LGPD (Brazil)',
    'privacy.lgpd.text': 'Under the Lei Geral de Proteção de Dados Pessoais (Law no. 13,709/2018), you have the following rights:',
    'privacy.lgpd.item1': '• Confirmation of processing (Art. 18, I): confirm we process your data',
    'privacy.lgpd.item2': '• Access (Art. 18, II): access your data',
    'privacy.lgpd.item3': '• Correction (Art. 18, III): correct incomplete or inaccurate data',
    'privacy.lgpd.item4': '• Anonymisation or deletion (Art. 18, IV): when unnecessary or excessive',
    'privacy.lgpd.item5': '• Portability (Art. 18, V): obtain your data in a portable format',
    'privacy.lgpd.item6': '• Deletion of data processed by consent (Art. 18, VI)',
    'privacy.lgpd.item7': '• Consent withdrawal (Art. 18, IX): at any time',
    'privacy.lgpd.response': 'We will respond to requests within 15 days. You may exercise your rights at: suporte@gozzzz.app or file a complaint with the Autoridade Nacional de Proteção de Dados (ANPD).',

    // How to Exercise Rights
    'privacy.exercise.title': '8. How to Exercise Your Rights',
    'privacy.exercise.text': 'You can exercise your rights directly within the app:',
    'privacy.exercise.item1': '• Profile > Privacy & Data Protection > My Data (export)',
    'privacy.exercise.item2': '• Profile > Privacy & Data Protection > Delete Account',
    'privacy.exercise.item3': '• Profile > Privacy & Data Protection > Marketing Consent',
    'privacy.exercise.contact': 'For other requests, send an email to suporte@gozzzz.app with the subject "LGPD Request" or "GDPR Request".',

    // Data Security
    'privacy.security.title': '9. Data Security',
    'privacy.security.item1': '• Encryption in transit (TLS 1.3) and at rest (AES-256)',
    'privacy.security.item2': '• Secure authentication via Supabase Auth (bcrypt password hashing)',
    'privacy.security.item3': '• Restricted access to personal data via row-level security (RLS)',
    'privacy.security.item4': '• Payments processed exclusively by Stripe (PCI-DSS Level 1)',
    'privacy.security.item5': '• No card data is stored by GoZzzz',

    // Data Breach
    'privacy.breach.title': '10. Data Breach',
    'privacy.breach.text': 'In the event of a data breach that poses a risk to your rights and freedoms, we will notify the competent supervisory authority within 72 hours (per GDPR) and 2 business days (per LGPD) of detection. We will notify you directly when the breach is likely to result in a high risk.',

    // Cookies
    'privacy.cookies.title': '11. Cookies and Local Storage',
    'privacy.cookies.text': 'GoZzzz uses local storage only for:',
    'privacy.cookies.item1': '• Authentication session (essential — required for functionality)',
    'privacy.cookies.item2': '• Language preference (functional — can be rejected)',
    'privacy.cookies.note': 'We do not use tracking, advertising or third-party analytics cookies.',

    // Minors
    'privacy.minors.title': '12. Minors',
    'privacy.minors.text': 'GoZzzz is intended for users aged 18 and over. We do not knowingly collect data from minors. If you believe we have collected data from a minor, please contact us immediately: suporte@gozzzz.app',

    // Automated Decisions
    'privacy.automated.title': '13. Automated Decisions',
    'privacy.automated.text': 'GoZzzz does not carry out automated decision-making with a legal or similarly significant effect on users (GDPR Art. 22 / LGPD Art. 20). Premium content unlocking is based solely on manually verified subscription status.',

    // Policy Changes
    'privacy.changes.title': '14. Changes to this Policy',
    'privacy.changes.text': 'We may update this policy periodically. We will notify you of material changes by email or in-app notice at least 15 days in advance. The update date is always indicated at the top of this page.',

    // Contact
    'privacy.contact.title': '15. Contact and Complaints',
    'privacy.contact.text': 'To exercise your rights, ask questions or file complaints:',
    'privacy.contact.email': 'suporte@gozzzz.app',
    'privacy.contact.authorities': 'Supervisory authorities:\n• Brazil: ANPD — anpd.gov.br\n• EU: authority in your country of residence\n• UK: ICO — ico.org.uk',

    // Footer
    'privacy.footer': 'By using GoZzzz, you acknowledge that you have read and understood this Privacy Policy. Version 1.3 — May 4, 2026',

    // Terms & Conditions
    'terms.back': 'Back',
    'terms.title': 'Terms & Conditions',
    'terms.updated': 'Updated May 4, 2026',
    'terms.acceptance.title': '1. Acceptance of Terms',
    'terms.acceptance.text': 'By creating an account and using GoZzzz, you agree to these Terms and Conditions. The service is educational sleep and behavioral coaching; it does not replace regulated healthcare. If you do not agree with any part of these terms, you should not use our services.',
    'terms.service.title': '2. Service Description',
    'terms.service.text': 'GoZzzz is a wellness application focused on improving sleep quality through a structured 21-step program. We offer:',
    'terms.service.item1': '• Educational program of 21 lessons on sleep hygiene',
    'terms.service.item2': '• Written lessons and practical guidance based on scientific research',
    'terms.service.item3': '• Progress tracking tools',
    'terms.service.item4': '• Access to premium resources through subscription',

    // Web Metadata
    'web.meta.home.title': 'GoZzzz - Improve Your Sleep with Science | 21-Step Program',
    'web.meta.home.description': '21-step sleep program based on peer-reviewed scientific research. Evidence-based strategies to improve sleep with sleep neuroscience and circadian medicine.',
    'web.meta.programa.title': '21-Step Program | GoZzzz',
    'web.meta.programa.description': 'Follow our evidence-based 21-step program to improve your sleep quality with scientific guidance.',
    'web.meta.sobre.title': 'About GoZzzz | Sleep Health Based on Science',
    'web.meta.sobre.description': 'Learn the story of GoZzzz, inspired by 10 years of research on insomnia and sleep science.',

    // Web sobre page
    'web.about.headTitle': 'About GoZzzz - Our Mission and Methodology',
    'web.about.headDesc': 'Discover GoZzzz: democratizing access to sleep science. Developed based on research from world-leading experts in neuroscience and sleep medicine.',
    'web.about.ogDesc': 'See how GoZzzz combines cutting-edge neuroscience with accessibility to transform sleep for thousands of people.',
    'web.about.heroTitle': 'About GoZzzz',
    'web.about.heroSubtitle': 'Our mission is to democratize sleep science',
    'web.about.storyTitle': 'Our Story',
    'web.about.storyText1': 'Good sleep shouldn\'t be a luxury. Yet for millions, understanding the science behind better sleep feels out of reach. Most sleep advice is contradictory, overwhelming, or just doesn\'t work.',
    'web.about.storyText2': 'That\'s why we created GoZzzz. We wanted to bring the most cutting-edge sleep research directly to people who need it most — presented clearly, scientifically, and practically.',
    'web.about.storyText3': 'Our program is built on decades of research from the world\'s leading sleep scientists. Every step, every lesson, every recommendation is grounded in peer-reviewed neuroscience.',
    'web.about.storyHighlight': 'Sleep is not a luxury. It\'s a biological necessity that affects every aspect of your health. We\'re making the science accessible to everyone.',
    'web.about.storyText4': 'Today, thousands of people worldwide are using GoZzzz to reclaim their sleep, improve their energy, and transform their lives.',
    'web.about.expertsTitle': 'Our Experts',
    'web.about.missionTitle': 'Our Mission',
    'web.about.missionText1': 'To democratize access to world-class sleep science. Sleep improvement shouldn\'t require expensive consultations or years of trial-and-error. We make evidence-based sleep optimization available to everyone.',
    'web.about.missionText2': 'We believe that quality sleep is fundamental to human health and happiness. By combining the latest neuroscience with practical, actionable guidance, we\'re helping people reclaim their sleep and transform their lives.',
    'web.about.programTitle': 'Our Program',
    'web.about.programText': 'GoZzzz is a complete 21-step program designed to systematically improve every aspect of your sleep. Each step builds on the last, creating a comprehensive understanding of sleep science.',
    'web.about.programFeature1': 'Built by sleep scientists and researchers',
    'web.about.programFeature2': 'Backed by peer-reviewed neuroscience',
    'web.about.programFeature3': 'Personalized coaching and support',
    'web.about.programFeature4': 'Ongoing access to program content and updates',
    'web.about.whyTitle': 'Why GoZzzz?',
    'web.about.whyText': 'Because sleep deserves the same scientific attention we give to nutrition, fitness, and mental health. Quality sleep is the foundation of everything else.',
    'web.about.disclaimerTitle': 'Medical Disclaimer',
    'web.about.disclaimerText1': 'GoZzzz provides educational information about sleep science and does not replace professional medical advice.',
    'web.about.disclaimerText2': 'Always consult with a healthcare provider for serious sleep disorders, insomnia, or other medical conditions.',
    'web.about.disclaimerText3': 'Our program is designed for healthy individuals seeking to optimize their sleep based on evidence-based science.',
    'web.about.footerText': 'For questions, contact: support@gozzzz.app',
    'web.about.footerCopy': '© 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52',

    // Web subscribe page
    'web.subscribe.headTitle': 'Subscribe to GoZzzz - Sleep Program Plans',
    'web.subscribe.headDesc': 'Choose your GoZzzz plan and access 21 science-based sleep improvement steps. Monthly and annual plans available.',
    'web.subscribe.ogDesc': 'Access the complete 21-step program with flexible plans. Science-based sleep optimization. Cancel anytime.',
    'web.subscribe.headerTitle': 'Subscribe Premium',
    'web.subscribe.headerSubtitle': 'Access the full program — 21 science-based steps',
    'web.subscribe.successTitle': 'Subscription Confirmed!',
    'web.subscribe.successDesc': 'Welcome to GoZzzz Premium. Access to all 21 program steps is now unlocked.',
    'web.subscribe.successBtn': 'Go to Program',
    'web.subscribe.choosePlan': 'Choose your plan',
    'web.subscribe.annualPlan': 'Annual Plan',
    'web.subscribe.monthlyPlan': 'Monthly Plan',
    'web.subscribe.yearlyBadge': 'Save 37%',
    'web.subscribe.annually': 'billed annually',
    'web.subscribe.billedMonthly': 'billed monthly',
    'web.subscribe.subscribe': 'Subscribe',
    'web.subscribe.annual': 'Annual',
    'web.subscribe.monthly': 'Monthly',
    'web.subscribe.redirecting': 'Redirecting to secure payment...',
    'web.subscribe.errorMsg': 'Failed to start payment. Please try again.',
    'web.subscribe.disclaimer': 'Cancel anytime. No hidden fees. Immediate access after confirmation.',
    'web.subscribe.included': 'What\'s included',
    'web.subscribe.feature1': 'Complete 21-step program',
    'web.subscribe.feature2': 'Clear summaries and actions in each step',
    'web.subscribe.feature3': 'Based on peer-reviewed sleep science research',
    'web.subscribe.feature4': 'Sleep neuroscience',
    'web.subscribe.feature5': 'Circadian medicine',
    'web.subscribe.feature6': 'Free updates included',
    'web.subscribe.feature7': 'Immediate access after payment',
    'web.subscribe.feature8': 'Cancel anytime',
    'web.subscribe.testimonials': 'What users say',
    'web.subscribe.testimonial1Name': 'M.A.',
    'web.subscribe.testimonial1Text': 'Well-structured, science-based program. I noticed progressive improvements following the steps consistently.',
    'web.subscribe.testimonial2Name': 'R.C.',
    'web.subscribe.testimonial2Text': 'I understood the physiological basis of my morning fatigue. Step 2 on circadian rhythm was especially useful.',
    'web.subscribe.testimonial3Name': 'L.F.',
    'web.subscribe.testimonial3Text': 'The program is very well structured; each step turns science into concrete habits.',
    'web.subscribe.guaranteeTitle': 'Satisfaction guarantee',
    'web.subscribe.guaranteeDesc': 'If you\'re not satisfied in the first 7 days, we refund 100% of your money. No questions asked.',
    'web.subscribe.perMonth': '/month',
    'web.subscribe.back': 'Back',
    'web.subscribe.localeBadge': 'United States · USD',

    // Web footer
    'web.footer.copyright': '© 2026 GoZzzz · MORFEU SAÚDE E TECNOLOGIA LTDA · CNPJ: 66.059.212/0001-52',

    // Chronotype premium funnel / native hero
    'web.chronoPremium.heroHeadlinePrefix': 'You wake up tired even after sleeping ',
    'web.chronoPremium.heroHeadlineHighlight': '8 hours',
    'web.chronoPremium.heroHeadlineSuffix': '?',
    'web.chronoPremium.nativeHeroHeadlineHighlight': '8 hours',
    'web.chronoPremium.nativeHeroHeadlineSuffix': ' of sleep?',
    'web.chronoPremium.heroSubPrefix': 'Discover in ',
    'web.chronoPremium.heroSubHighlight': '60 seconds',
    'web.chronoPremium.heroSubSuffix': ' your biological chronotype',
    'web.chronoPremium.heroSub': 'Discover in 60 seconds your biological chronotype',
    'web.chronoPremium.ctaQuiz': 'Take the free test',
    'web.chronoPremium.trustFree': 'Free',
    'web.chronoPremium.trustFast': '60 seconds',
    'web.chronoPremium.trustSignup': 'No sign-up',
    'web.chronoPremium.trustLine': 'Free • 60 seconds • No sign-up',
    'web.chronoPremium.scienceTitle': 'Based on sleep science',
    'web.chronoPremium.sciencePillar1': 'Chronobiology',
    'web.chronoPremium.sciencePillar2': 'Circadian rhythm',
    'web.chronoPremium.sciencePillar3': 'Sleep architecture',
    'web.chronoPremium.scienceBullets': 'Chronobiology • Circadian rhythm • Sleep architecture',
    'web.chronoPremium.scienceResearchersLead': 'Inspired by research from',
    'web.chronoPremium.scienceResearchersNames': 'Matthew Walker • Michael Breus • Andrew Huberman',
    'web.chronoPremium.heroPrivacyLine': '100% secure privacy • Your data is not stored',
    'web.chronoPremium.gridLabel': 'Your energy type',
    'web.chronoPremium.valueTitle': 'Ready to sleep better?',
    'web.chronoPremium.ctaStartFree': 'Start free',
    'web.chronoPremium.linkProgram': 'View full program',
  },
};
const STORAGE_KEY = 'gozzzz_language';
const SELECTED_KEY = 'gozzzz_language_selected';

function detectBrowserLanguage(): Language {
  try {
    let detectedLanguages: string[] = [];

    if (Platform.OS === 'web' && typeof navigator !== 'undefined') {
      // Chrome/Firefox: Check navigator.languages array (all preferred languages in order)
      if (navigator.languages && navigator.languages.length > 0) {
        detectedLanguages = Array.from(navigator.languages).map(lang => lang.toLowerCase());
        console.log('Navigator.languages array detected on web:', detectedLanguages);
      } else {
        // Fallback to navigator.language if languages array not available
        const lang = (navigator.language || (navigator as any).userLanguage || '').toLowerCase();
        if (lang) {
          detectedLanguages = [lang];
          console.log('Navigator.language detected on web:', lang);
        }
      }
    } else {
      // For native, try getLocales() first (newer API), then fall back to locale
      try {
        if (typeof Localization.getLocales === 'function') {
          const locales = Localization.getLocales();
          if (Array.isArray(locales) && locales.length > 0) {
            detectedLanguages = locales
              .map(loc => (loc.languageCode || loc.languageTag || '').toLowerCase())
              .filter(Boolean);
            console.log('Localization.getLocales() detected:', detectedLanguages);
          }
        }
      } catch {
        console.log('getLocales failed, trying locale property');
      }

      // Fall back to locale property if getLocales failed
      if (detectedLanguages.length === 0 && typeof (Localization as any).locale === 'string') {
        const locale = ((Localization as any).locale || '').toLowerCase();
        if (locale) {
          detectedLanguages = [locale];
          console.log('Localization.locale detected:', locale);
        }
      }
    }

    // Check all detected languages for Portuguese first, then English
    for (const lang of detectedLanguages) {
      if (lang.startsWith('pt')) {
        console.log('Language set to Portuguese');
        return 'pt';
      }
    }

    for (const lang of detectedLanguages) {
      if (lang.startsWith('en')) {
        console.log('Language set to English');
        return 'en';
      }
    }

    // Default to Portuguese for any unrecognized language
    console.log('No language match found, defaulting to Portuguese. Detected:', detectedLanguages);
  } catch (error) {
    console.error('Error detecting language:', error);
  }
  return 'pt';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // FIRST: Always detect browser language as the default
    const detected = detectBrowserLanguage();
    console.log('Initial language state - Detected browser language:', detected);

    // For web, clear old localStorage and use detected language
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(SELECTED_KEY);
        console.log('Cleared old localStorage preferences');
      }
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }

    // Return the detected language
    return detected;
  });
  const [languageSelected, setLanguageSelected] = useState<boolean>(() => {
    try {
      if (Platform.OS === 'web' && typeof window !== 'undefined') {
        return localStorage.getItem(SELECTED_KEY) === 'true';
      }
    } catch {}
    return false;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setLanguageSelected(true);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem(SELECTED_KEY, 'true');
    }
  };

  const confirmLanguage = () => {
    setLanguageSelected(true);
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      localStorage.setItem(SELECTED_KEY, 'true');
    }
  };

  const t = (key: string, lang?: Language): string => {
    const loc = lang ?? language;
    const dict = translations[loc] as Record<string, string>;
    // Distinguish "missing key" (fallback to key for visibility during dev) from
    // "explicitly empty value" (some entries are intentionally '' so consumers
    // can opt-out via a length gate or render a blank slot). Using `||` would
    // collapse both cases and leak the raw key into the UI for empty entries.
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : key;
  };

  useEffect(() => {
    // Empty - no correction needed since we detect correctly on init
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languageSelected, confirmLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

const defaultLanguageContext: LanguageContextType = {
  language: 'pt',
  setLanguage: () => {},
  t: (key: string, _lang?: Language) => key,
  languageSelected: true,
  confirmLanguage: () => {},
};

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context ?? defaultLanguageContext;
}
```

---


---

## 4. Complemento — fluxo nativo de quiz `/(auth)/quiz` e modal completo

Na web `/web`, o funil de cronótipo está em `ChronotypePremiumWebFunnel` (secção 2). No app nativo, o quiz está na rota `/(auth)/quiz` (`app/(auth)/quiz.tsx` → `QuizScreen` → `ChronotypeQuizModal`). Abaixo segue o código dessas rotas finas + modal integral.

### `app/(auth)/quiz.tsx`

**Descrição:** Rota Expo Router `/(auth)/quiz` — reexport da QuizScreen

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/(auth)/quiz.tsx`

**Stack:** Expo Router · React Native · ChronotypeQuizModal

**Estado global:** `QuizScreen` usa estado local; `ResultScreen` usa `useLanguage`. Modal com estado local.

**Pagamento:** não integra pagamento.

```tsx
export { default } from '@/screens/QuizScreen';
```

---

### `app/(auth)/result.tsx`

**Descrição:** Rota Expo Router `/(auth)/result` — reexport do ResultScreen

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/app/(auth)/result.tsx`

**Stack:** Expo Router · React Native · ChronotypeQuizModal

**Estado global:** `QuizScreen` usa estado local; `ResultScreen` usa `useLanguage`. Modal com estado local.

**Pagamento:** não integra pagamento.

```tsx
export { default } from '@/src/screens/ResultScreen';
```

---

### `src/screens/QuizScreen.tsx`

**Descrição:** Tela do quiz de cronótipo (fullscreen + ChronotypeQuizModal)

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/src/screens/QuizScreen.tsx`

**Stack:** Expo Router · React Native · ChronotypeQuizModal

**Estado global:** `QuizScreen` usa estado local; `ResultScreen` usa `useLanguage`. Modal com estado local.

**Pagamento:** não integra pagamento.

```tsx
import { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ChronotypeQuizModal from '@/components/ChronotypeQuizModal';
import ProgressBar from '@/src/components/ProgressBar';

/**
 * Quiz de cronótipo em ecrã completo; barra de progresso no topo (reutilizável).
 */
export default function QuizScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [questionIndex, setQuestionIndex] = useState(1);

  const onComplete = useCallback(
    (chronotype: string) => {
      router.push({ pathname: '/(auth)/result', params: { chronotype } });
    },
    [router],
  );

  return (
    <View style={styles.root}>
      <View style={[styles.progressPad, { paddingTop: Math.max(insets.top, 12) }]}>
        <ProgressBar current={questionIndex} total={4} />
      </View>
      <View style={styles.quizBody}>
        <ChronotypeQuizModal
          visible
          presentation="fullscreen"
          onComplete={onComplete}
          showProgressBar={false}
          onQuestionIndexChange={(i) => setQuestionIndex(i + 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0c0e1a',
  },
  progressPad: {
    paddingHorizontal: 18,
    paddingBottom: 8,
    zIndex: 2,
  },
  quizBody: {
    flex: 1,
  },
});
```

---

### `src/screens/ResultScreen.tsx`

**Descrição:** Resultado do cronótipo — usa ChronotypeResultPremiumScreen

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/src/screens/ResultScreen.tsx`

**Stack:** Expo Router · React Native · ChronotypeQuizModal

**Estado global:** `QuizScreen` usa estado local; `ResultScreen` usa `useLanguage`. Modal com estado local.

**Pagamento:** não integra pagamento.

```tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useLanguage } from '@/contexts/LanguageContext';
import ChronotypeResultPremiumScreen from '@/components/chronotype/ChronotypeResultPremiumScreen';
import { normalizeChronotypeKey, type ChronotypeKey } from '@/data/chronotypesIntelligence';

export default function ResultScreen() {
  const router = useRouter();
  const { language } = useLanguage();
  const isPt = language === 'pt';
  const { chronotype: raw } = useLocalSearchParams<{ chronotype?: string | string[] }>();
  const key: ChronotypeKey = normalizeChronotypeKey(raw) ?? 'bear';

  return (
    <ChronotypeResultPremiumScreen
      chronotypeKey={key}
      locale={isPt ? 'pt' : 'en'}
      onStartDay1={() =>
        router.push({
          pathname: '/(auth)/signup',
          params: { chronotype: key },
        })
      }
    />
  );
}
```

---

### `components/ChronotypeQuizModal.tsx`

**Descrição:** Componente principal do questionário de cronótipo (4 perguntas)

**Caminho completo:** `/Users/joseniltonsilvadeoliveira/Downloads/project 5/components/ChronotypeQuizModal.tsx`

**Stack:** Expo Router · React Native · ChronotypeQuizModal

**Estado global:** `QuizScreen` usa estado local; `ResultScreen` usa `useLanguage`. Modal com estado local.

**Pagamento:** não integra pagamento.

```tsx
import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Animated,
  Easing,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/lib/supabase';
import { syncQuizCompletionFromServer } from '@/lib/syncQuizCompletion';
import { savePreRegistrationQuizDone } from '@/lib/quizDevicePersistence';
import { ShareableCard } from './ShareableCard';
import * as SecureStore from 'expo-secure-store';
import ProgressBar from '@/src/components/ProgressBar';

type Chronotype = 'dolphin' | 'lion' | 'bear' | 'wolf';

const SCREENS = [
  {
    q_pt: 'O que rouba seu sono?',
    q_en: 'What steals your sleep?',
    sub_pt: 'Escolha o que mais te afeta',
    sub_en: 'Pick the one that affects you most',
    multi: false,
    options: [
      { id: 'mind', emoji: '🌀', label_pt: 'Mente não para', label_en: "Mind won't stop" },
      { id: 'cantfall', emoji: '🌙', label_pt: 'Não consigo dormir', label_en: "Can't fall asleep" },
      { id: 'wakenight', emoji: '⚡', label_pt: 'Acordo à noite', label_en: 'Wake up at night' },
      { id: 'exhausted', emoji: '😮‍💨', label_pt: 'Acordo exausto', label_en: 'Wake up exhausted' },
    ],
  },
  {
    q_pt: 'Sem alarme, que horas você acordaria?',
    q_en: 'Without an alarm, when would you wake up?',
    sub_pt: 'Seu ritmo natural de despertar',
    sub_en: 'Your natural wake rhythm',
    multi: false,
    options: [
      { id: 'before6', emoji: '🌅', label_pt: 'Antes das 6h', label_en: 'Before 6am' },
      { id: '6to8', emoji: '☀️', label_pt: '6h – 8h', label_en: '6am – 8am' },
      { id: '8to10', emoji: '🌤️', label_pt: '8h – 10h', label_en: '8am – 10am' },
      { id: 'after10', emoji: '🌑', label_pt: 'Depois das 10h', label_en: 'After 10am' },
    ],
  },
  {
    q_pt: 'Quando você tem mais energia?',
    q_en: 'When do you have the most energy?',
    sub_pt: 'Seu pico natural de rendimento',
    sub_en: 'Your natural performance peak',
    multi: false,
    options: [
      { id: 'morning', emoji: '🏃', label_pt: 'Cedo pela manhã', label_en: 'Early morning' },
      { id: 'midday', emoji: '📈', label_pt: 'Ao meio-dia', label_en: 'Midday' },
      { id: 'afternoon', emoji: '🌆', label_pt: 'Final da tarde', label_en: 'Late afternoon' },
      { id: 'night', emoji: '🦉', label_pt: 'À noite', label_en: 'At night' },
    ],
  },
  {
    q_pt: 'O que atrapalha sua noite?',
    q_en: 'What disrupts your night?',
    sub_pt: 'Escolha até 2 opções',
    sub_en: 'Choose up to 2 options',
    multi: true,
    options: [
      { id: 'screens', emoji: '📱', label_pt: 'Telas', label_en: 'Screens' },
      { id: 'thoughts', emoji: '💭', label_pt: 'Pensamentos', label_en: 'Thoughts' },
      { id: 'environment', emoji: '🔊', label_pt: 'Ambiente', label_en: 'Environment' },
      { id: 'irregular', emoji: '⏰', label_pt: 'Horários irregulares', label_en: 'Irregular schedules' },
    ],
  },
];

const CHRONOTYPE_DATA: Record<Chronotype, { emoji: string; name_pt: string; name_en: string; color: string }> = {
  dolphin: { emoji: '🐬', name_pt: 'Golfinho', name_en: 'Dolphin', color: '#4a9eff' },
  lion: { emoji: '🦁', name_pt: 'Leão', name_en: 'Lion', color: '#f59e0b' },
  bear: { emoji: '🐻', name_pt: 'Urso', name_en: 'Bear', color: '#a78bfa' },
  wolf: { emoji: '🐺', name_pt: 'Lobo', name_en: 'Wolf', color: '#64748b' },
};

const SCIENCE_NOTES: Record<Chronotype, { pt: string; en: string }> = {
  dolphin: {
    pt: 'Baseado na cronobiologia: perfis Golfinho tendem a ter sono mais leve e maior reatividade ao estresse, com melhor rendimento cognitivo no meio da tarde.',
    en: 'Chronobiology-based: Dolphin profiles tend to have lighter sleep and higher stress reactivity, with better cognitive performance in mid-afternoon.',
  },
  lion: {
    pt: 'Baseado na cronobiologia: perfis Leao costumam ter maior alerta nas primeiras horas do dia e queda natural de energia no fim da noite.',
    en: 'Chronobiology-based: Lion profiles usually show stronger alertness in early morning and a natural drop in energy at night.',
  },
  bear: {
    pt: 'Baseado na cronobiologia: perfis Urso seguem mais de perto o ciclo claro-escuro, com melhor estabilidade quando mantem horarios regulares.',
    en: 'Chronobiology-based: Bear profiles align more closely with the light-dark cycle and improve with regular schedules.',
  },
  wolf: {
    pt: 'Baseado na cronobiologia: perfis Lobo tendem a apresentar fase circadiana mais tardia, com maior desempenho no fim do dia.',
    en: 'Chronobiology-based: Wolf profiles tend to show a later circadian phase and better performance later in the day.',
  },
};

function calcChronotype(answers: string[][]): Chronotype {
  const [a0, a1, a2, a3] = answers;
  const scores: Record<Chronotype, number> = { dolphin: 0, lion: 0, bear: 0, wolf: 0 };
  if (a0.includes('mind')) scores.dolphin += 2;
  if (a0.includes('cantfall')) scores.lion += 2;
  if (a0.includes('wakenight')) scores.dolphin += 3;
  if (a0.includes('exhausted')) { scores.dolphin += 2; scores.bear += 1; }
  if (a1.includes('before6')) scores.lion += 3;
  if (a1.includes('6to8')) scores.bear += 3;
  if (a1.includes('8to10')) scores.bear += 1;
  if (a1.includes('after10')) { scores.dolphin += 2; scores.wolf += 3; }
  if (a2.includes('morning')) scores.lion += 3;
  if (a2.includes('midday')) scores.bear += 3;
  if (a2.includes('afternoon')) scores.bear += 2;
  if (a2.includes('night')) scores.wolf += 3;
  if (a3.includes('thoughts')) scores.dolphin += 3;
  if (a3.includes('screens')) scores.lion += 2;
  if (a3.includes('environment')) scores.dolphin += 2;
  if (a3.includes('irregular')) scores.wolf += 3;
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as Chronotype;
}

interface Props {
  visible: boolean;
  onComplete: (chronotype: string) => void;
  /** Use on a Stack screen (/quiz): no RN Modal wrapper (avoids double sheet / web glitches). */
  presentation?: 'modal' | 'fullscreen';
  /** When false, parent (e.g. QuizScreen) renders the progress bar. Default true. */
  showProgressBar?: boolean;
  /** Fires with 0–3 while answering questions (fullscreen sync with external bar). */
  onQuestionIndexChange?: (questionIndex: number) => void;
}

async function persistLatestChronotype(chronotype: Chronotype, userId?: string) {
  const latestKey = 'quiz_latest_chronotype';
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem(latestKey, chronotype);
      if (userId) {
        localStorage.setItem(`quiz_chronotype_${userId}`, chronotype);
      }
      return;
    }
    await SecureStore.setItemAsync(latestKey, chronotype);
    if (userId) {
      await SecureStore.setItemAsync(`quiz_chronotype_${userId}`, chronotype);
    }
  } catch (err) {
    console.error('[QUIZ:LOCAL_CHRONOTYPE_SAVE_ERROR]', err);
  }
}

async function persistQuizResultRemotely(params: {
  userId: string;
  chronotype: Chronotype;
  language: 'pt' | 'en';
}) {
  const { userId, chronotype, language } = params;
  try {
    const { error: authErr } = await supabase.auth.updateUser({
      data: {
        quiz_completed: true,
        chronotype,
        language,
      },
    });
    if (authErr) {
      console.warn('[QUIZ:AUTH_META:ERROR]', authErr.message ?? authErr);
    }

    const sb = supabase as any;
    const rowPayload = {
      chronotype,
      language,
      quiz_completed: true,
      quiz_progress: null,
      quiz_completed_at: new Date().toISOString(),
    };

    const { data: updatedRows, error: updateErr } = await sb
      .from('profiles')
      .update(rowPayload)
      .eq('id', userId)
      .select('id');

    const updated =
      Array.isArray(updatedRows) && updatedRows.length > 0;

    if (updateErr) {
      if ((updateErr as any)?.code === '42501') {
        console.warn('[QUIZ:PROFILE_UPDATE:RLS_BLOCKED]', (updateErr as any)?.message ?? 'blocked');
      } else {
        console.warn('[QUIZ:PROFILE_UPDATE:ERROR]', updateErr);
      }
    }

    if (!updated || updateErr) {
      const { data: authUserResp } = await supabase.auth.getUser();
      const email = authUserResp?.user?.email ?? '';

      const { error: upsertErr } = await sb
        .from('profiles')
        .upsert(
          {
            id: userId,
            email,
            subscription_type: 'free',
            ...rowPayload,
          },
          { onConflict: 'id' }
        );
      if (upsertErr && (upsertErr as any)?.code !== '42501') {
        console.warn('[QUIZ:PROFILE_UPSERT:ERROR]', upsertErr);
      }
    }

    const { data: freshAuth } = await supabase.auth.getUser();
    await syncQuizCompletionFromServer(freshAuth?.user ?? null);
  } catch (err) {
    // Never block UX on transient network/server failures.
    console.warn('[QUIZ:PERSIST_REMOTE:EXCEPTION]', err);
  }
}

export default function ChronotypeQuizModal({
  visible,
  onComplete,
  presentation = 'modal',
  showProgressBar = true,
  onQuestionIndexChange,
}: Props) {
  const { user } = useAuth();
  const { language } = useLanguage();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const isNarrow = width < 380;
  const lang = language as 'pt' | 'en';
  const [screen, setScreen] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([[], [], [], []]);
  const [result, setResult] = useState<Chronotype | null>(null);
  const [saving, setSaving] = useState(false);
  const scienceGlow = useRef(new Animated.Value(0)).current;

  const currentScreen = SCREENS[Math.min(screen, 3)];
  const currentAnswers = answers[screen] ?? [];
  const hasAnswer = currentAnswers.length > 0;
  const isResultScreen = screen === 4 && result !== null;

  const toggleOption = useCallback((id: string) => {
    setAnswers(prev => {
      const curr = prev[screen];
      const isMulti = SCREENS[screen].multi;
      let next: string[];
      if (curr.includes(id)) {
        next = curr.filter(x => x !== id);
      } else if (isMulti) {
        next = curr.length >= 2 ? curr : [...curr, id];
      } else {
        next = [id];
      }
      const updated = [...prev];
      updated[screen] = next;
      return updated;
    });
  }, [screen]);

  const goNext = useCallback(async () => {
    if (screen === 3) {
      const chronotype = calcChronotype(answers);
      if (presentation === 'fullscreen') {
        try {
          await persistLatestChronotype(chronotype, user?.id);
          if (!user) {
            await savePreRegistrationQuizDone();
          }
          if (user) {
            await persistQuizResultRemotely({
              userId: user.id,
              chronotype,
              language: lang,
            });
          }
        } catch {
          // still leave quiz — navigation must not block on persistence errors
        }
        setScreen(0);
        setAnswers([[], [], [], []]);
        setResult(null);
        onComplete(chronotype);
        return;
      }
      setResult(chronotype);
      setScreen(4);
    } else {
      setScreen((s) => s + 1);
    }
  }, [screen, answers, presentation, user, lang, onComplete]);

  const goBack = useCallback(() => {
    setScreen((s) => Math.max(0, s - 1));
  }, []);

  const handleFinish = useCallback(async () => {
    if (!result) return;
    setSaving(true);

    const finalizedChronotype = result;
    setScreen(0);
    setAnswers([[], [], [], []]);
    setResult(null);
    setSaving(false);

    // Persist before navigation so post-signup home sees quiz + chronotype.
    await persistLatestChronotype(finalizedChronotype, user?.id);
    if (!user) {
      await savePreRegistrationQuizDone();
    }

    // Navigate immediately for responsive UX.
    onComplete(finalizedChronotype);

    if (user) {
      void persistQuizResultRemotely({
        userId: user.id,
        chronotype: finalizedChronotype,
        language: lang,
      });
    }
  }, [result, user, lang, onComplete]);

  const chronoInfo = result ? CHRONOTYPE_DATA[result] : null;
  const scienceNote = result ? SCIENCE_NOTES[result] : null;

  useEffect(() => {
    if (!onQuestionIndexChange) return;
    if (screen >= 0 && screen <= 3) {
      onQuestionIndexChange(screen);
    }
  }, [screen, onQuestionIndexChange]);

  useEffect(() => {
    const glowLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(scienceGlow, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scienceGlow, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    glowLoop.start();
    return () => glowLoop.stop();
  }, [scienceGlow]);

  const gradientColors =
    presentation === 'fullscreen' ? (['#0c0e1a', '#0f1428'] as const) : (['#07070f', '#0f1a2e'] as const);

  const body = (
    <LinearGradient colors={gradientColors} style={styles.container}>
        {!isResultScreen ? (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top + 8, 56),
                paddingBottom: Math.max(insets.bottom + 16, 32),
              }
            ]}
            scrollEnabled={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {showProgressBar !== false && (
              <View style={styles.progressHeader}>
                <ProgressBar current={screen + 1} total={4} />
              </View>
            )}

            <Text style={styles.question}>
              {lang === 'pt' ? currentScreen.q_pt : currentScreen.q_en}
            </Text>
            <Text style={styles.subQuestion}>
              {lang === 'pt' ? currentScreen.sub_pt : currentScreen.sub_en}
            </Text>

            <View style={styles.optionsContainer}>
              {currentScreen.options.map((opt, index) => {
                const selected = currentAnswers.includes(opt.id);
                const colorMap: Record<number, string> = {
                  0: '#EF9F27',
                  1: '#1D9E75',
                  2: '#7F77DD',
                  3: '#378ADD',
                };
                const indicatorColor = colorMap[index] || '#6366f1';
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[styles.option, selected && styles.optionSelected]}
                    onPress={() => toggleOption(opt.id)}
                    activeOpacity={0.75}
                  >
                    <View style={[styles.colorIndicator, { backgroundColor: indicatorColor }]} />
                    <Text style={styles.optionEmoji}>{opt.emoji}</Text>
                    <Text style={[styles.optionLabel, selected && styles.optionLabelSelected]}>
                      {lang === 'pt' ? opt.label_pt : opt.label_en}
                    </Text>
                    {selected && (
                      <View style={styles.checkmark}>
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity
              style={[styles.nextButton, !hasAnswer && styles.nextButtonDisabled]}
              onPress={goNext}
              disabled={!hasAnswer}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {screen === 3
                  ? (lang === 'pt' ? 'Ver meu resultado' : 'See my result')
                  : (lang === 'pt' ? 'Continuar' : 'Continue')}
              </Text>
            </TouchableOpacity>
            {screen > 0 && (
              <TouchableOpacity style={styles.secondaryButton} onPress={goBack} activeOpacity={0.8}>
                <Text style={styles.secondaryButtonText}>
                  {lang === 'pt' ? 'Voltar' : 'Back'}
                </Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              {
                paddingTop: Math.max(insets.top + 8, 56),
                paddingBottom: Math.max(insets.bottom + 16, 32),
              }
            ]}
            scrollEnabled={true}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.resultContainer}>
              <Text style={[styles.resultEmoji, isNarrow && styles.resultEmojiNarrow]}>{chronoInfo?.emoji}</Text>
              <Text style={[styles.resultName, isNarrow && styles.resultNameNarrow, { color: chronoInfo?.color }]}>
                {lang === 'pt'
                  ? `Seu cronotipo é ${chronoInfo?.name_pt ?? ''}`
                  : `Your chronotype is ${chronoInfo?.name_en ?? ''}`}
              </Text>
            </View>

            <Text style={[styles.resultDescription, isNarrow && styles.resultDescriptionNarrow]}>
              {lang === 'pt'
                ? 'Seu cronotipo foi identificado! O programa será personalizado para o seu ritmo biológico natural.'
                : 'Your chronotype has been identified! The program will be personalized to your natural biological rhythm.'}
            </Text>
            <Animated.View
              style={[
                styles.scienceCard,
                {
                  borderColor: scienceGlow.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['rgba(212,169,106,0.24)', 'rgba(212,169,106,0.42)'],
                  }),
                  transform: [
                    {
                      scale: scienceGlow.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.01],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.scienceHeader}>
                <Text style={styles.scienceIcon}>✦</Text>
                <Text style={styles.scienceLabel}>
                  {lang === 'pt' ? 'Nota cientifica' : 'Scientific note'}
                </Text>
              </View>
              <Text style={styles.scienceText}>
                {lang === 'pt' ? scienceNote?.pt ?? '' : scienceNote?.en ?? ''}
              </Text>
            </Animated.View>

            <ShareableCard
              chronotypeName=""
              chronotypeEmoji=""
              title={lang === 'pt' ? 'Compartilhar resultado' : 'Share result'}
              message={lang === 'pt' ? 'Compartilhe seu cronotipo com elegancia' : 'Share your chronotype elegantly'}
              statPercent={Math.floor(Math.random() * 25) + 5}
            />

            <TouchableOpacity
              style={[styles.nextButton, saving && styles.nextButtonDisabled]}
              onPress={handleFinish}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Text style={styles.nextButtonText}>
                {saving
                  ? (lang === 'pt' ? 'Salvando...' : 'Saving...')
                  : (lang === 'pt' ? 'Começar meu plano →' : 'Start my plan →')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setScreen(3)} activeOpacity={0.8}>
              <Text style={styles.secondaryButtonText}>
                {lang === 'pt' ? 'Revisar respostas' : 'Review answers'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
    </LinearGradient>
  );

  if (presentation === 'fullscreen') {
    if (!visible) return null;
    return body;
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      {body}
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 56,
    paddingBottom: 34,
    flexGrow: 1,
  },
  progressHeader: {
    marginBottom: 24,
    width: '100%',
  },
  question: {
    fontSize: 28,
    fontWeight: '800',
    color: '#e8d5b7',
    lineHeight: 36,
    marginBottom: 10,
    paddingTop: 10,
    minHeight: 72,
    flexShrink: 1,
    letterSpacing: -0.2,
  },
  subQuestion: {
    fontSize: 15,
    color: '#8892a4',
    marginBottom: 26,
    lineHeight: 23,
    letterSpacing: 0.15,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 32,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 15,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    minHeight: Platform.OS === 'web' ? 48 : 56,
    width: '100%',
  },
  optionSelected: {
    borderColor: '#6366f1',
    backgroundColor: 'rgba(99,102,241,0.12)',
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    minWidth: 12,
    minHeight: 12,
  },
  optionEmoji: {
    fontSize: 24,
    minWidth: 32,
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#8892a4',
    lineHeight: 22,
  },
  optionLabelSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 24,
  },
  checkmarkText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  nextButton: {
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 0,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    width: '100%',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.6,
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 0,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    minHeight: 54,
    width: '100%',
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#c9d2e3',
    letterSpacing: 0.55,
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 18,
    paddingVertical: 18,
    width: '100%',
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultEmojiNarrow: {
    fontSize: 64,
    marginBottom: 14,
  },
  resultLabel: {
    fontSize: 14,
    color: '#8892a4',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  resultName: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  resultNameNarrow: {
    fontSize: 30,
    lineHeight: 36,
  },
  resultDescription: {
    fontSize: 15,
    color: '#8892a4',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 18,
    paddingHorizontal: 10,
    width: '100%',
  },
  resultDescriptionNarrow: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 22,
    paddingHorizontal: 6,
  },
  scienceCard: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.32)',
    backgroundColor: 'rgba(212,169,106,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 14,
  },
  scienceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  scienceIcon: {
    color: '#e8d5b7',
    fontSize: 12,
    lineHeight: 14,
  },
  scienceLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    color: '#e8d5b7',
    marginBottom: 2,
  },
  scienceText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#d5deed',
    letterSpacing: 0.1,
  },
});
```

---

