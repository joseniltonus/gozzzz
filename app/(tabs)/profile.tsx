import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { User, Crown, Globe, Bell, Moon, Circle as HelpCircle, Shield, LogOut, Gift, QrCode, ChevronRight, Trash2, Download, FileText } from 'lucide-react-native';
import { Modal } from '@/components/Modal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { useUserProfile } from '@/hooks/useUserProfile';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { BUILD_STAMP_LABEL } from '@/lib/buildStamp';

function ProfileContent() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { signOut, user, deleteAccount, requestDataExport, updateConsent } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const { showSuccess, showError } = useToast();
  const insets = useSafeAreaInsets();
  useUserProfile();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);
  const [subscriptionType] = useState<'free' | 'premium' | 'gift'>('free');

  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [giftModalVisible, setGiftModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [upgradeModalVisible, setUpgradeModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [dataRightsModalVisible, setDataRightsModalVisible] = useState(false);
  const [giftCode, setGiftCode] = useState('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const tc = {
    bg: isDark ? '#0d0d16' : '#f0f4f8',
    card: isDark ? '#12121e' : '#ffffff',
    textPrimary: isDark ? '#e8d5b7' : '#1a202c',
    textSecondary: isDark ? '#8892a4' : '#475569',
    border: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.08)',
    footerText: isDark ? '#4a5568' : '#64748b',
    footerSubtext: isDark ? '#374151' : '#94a3b8',
  };

  const getSubscriptionLabel = () => {
    const labels = {
      free: t('profile.free'),
      premium: t('profile.premium'),
      gift: t('profile.gift')
    };
    return labels[subscriptionType];
  };

  const getLanguageLabel = (lang: 'pt' | 'en') => {
    return lang === 'pt' ? t('lang.portuguese') : t('lang.english');
  };


  const handleSelectLanguage = (lang: 'pt' | 'en') => {
    setLanguage(lang);
    setLanguageModalVisible(false);
  };

  const handleRedeemGift = async () => {
    if (!giftCode.trim()) {
      showError(t('profile.giftAlert') || 'Please enter a gift code');
      return;
    }

    try {
      const { data: { session } } = await (await import('@/lib/supabase')).supabase.auth.getSession();
      if (!session) {
        showError('Not authenticated');
        return;
      }

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/redeem-gift-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ code: giftCode }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        showError(data.error || 'Failed to redeem gift code');
        return;
      }

      showSuccess(t('profile.giftAlert') || 'Gift code redeemed successfully!');
      setGiftCode('');
      setGiftModalVisible(false);
    } catch (err) {
      console.error('Redeem error:', err);
      showError('An error occurred. Please try again.');
    }
  };

  const handleRequestDataExport = async () => {
    const { error } = await requestDataExport();
    if (error) {
      showError(t('profile.gdpr.exportErrorMsg'));
    } else {
      showSuccess(t('profile.gdpr.exportSuccessMsg'));
    }
  };

  const handleDeleteAccount = async () => {
    const confirmText = deleteConfirmText.toLowerCase().trim();
    if (confirmText !== 'delete' && confirmText !== 'deletar') {
      showError(t('profile.gdpr.deleteConfirmErrorMsg'));
      return;
    }

    try {
      const result = await deleteAccount();
      const { error } = result;
      if (error) {
        showError(t('profile.gdpr.deleteErrorMsg'));
      } else {
        setDeleteAccountModalVisible(false);
        setDeleteConfirmText('');
        showSuccess(t('profile.gdpr.deleteSuccessMsg') || 'Conta deletada com sucesso');
        setTimeout(() => router.replace('/(auth)/login'), 1500);
      }
    } catch {
      showError(t('profile.gdpr.deleteErrorMsg'));
    }
  };

  const handleMarketingToggle = async (value: boolean) => {
    setMarketingEnabled(value);
    await updateConsent('marketing', value);
  };

  const settingItemStyle = [styles.settingItem, { backgroundColor: tc.card, borderColor: tc.border }];

  return (
    <View style={[styles.root, { backgroundColor: tc.bg }]}>
    <ScrollView style={[styles.container, { backgroundColor: tc.bg }]}>
      <LinearGradient
        colors={isDark ? ['#07070f', '#0f1a2e'] : ['#1a365d', '#2d5a8e']}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User size={48} color="#ffffff" />
            </View>
            {subscriptionType === 'premium' || subscriptionType === 'gift' ? (
              <View style={styles.crownBadge}>
                <Crown size={20} color="#fbbf24" />
              </View>
            ) : null}
          </View>
          <Text style={styles.userName}>{t('profile.title')}</Text>
          <Text style={styles.userEmail}>{user?.email ?? ''}</Text>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={[styles.subscriptionCard, { backgroundColor: tc.card }]}>
          <View style={styles.subscriptionHeader}>
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionLabel}>{t('profile.subscription')}</Text>
              <Text style={[styles.subscriptionType, { color: tc.textPrimary }]}>{getSubscriptionLabel()}</Text>
            </View>
            {subscriptionType !== 'premium' && subscriptionType !== 'gift' && (
              <Crown size={32} color="#fbbf24" />
            )}
          </View>

          {subscriptionType === 'free' && (
            <>
              <Text style={[styles.subscriptionDescription, { color: tc.textSecondary }]}>
                {t('profile.unlockContent')}
              </Text>
              <View style={styles.subscriptionButtons}>
                <TouchableOpacity style={styles.upgradeButton} onPress={() => setUpgradeModalVisible(true)}>
                  <Crown size={18} color="#ffffff" />
                  <Text style={styles.upgradeButtonText}>{t('profile.subscribePremium')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.giftButton} onPress={() => setGiftModalVisible(true)}>
                  <Gift size={18} color="#d4a96a" />
                  <Text style={styles.giftButtonText}>{t('profile.redeemGift')}</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {(subscriptionType === 'premium' || subscriptionType === 'gift') && (
            <View style={styles.premiumActive}>
              <Text style={styles.premiumActiveText}>
                {t('profile.premiumAccess')}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('profile.settings')}</Text>

          <TouchableOpacity style={settingItemStyle} onPress={() => setLanguageModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#dbeafe' }]}>
                <Globe size={20} color="#3b82f6" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.language')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>{getLanguageLabel(language)}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          <View style={settingItemStyle}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#fef3c7' }]}>
                <Bell size={20} color="#f59e0b" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.notifications')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>
                  {notificationsEnabled ? t('profile.enabled') : t('profile.disabled')}
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#e2e8f0', true: '#d4a96a' }}
              thumbColor="#ffffff"
            />
          </View>

          <View style={settingItemStyle}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#e0e7ff' }]}>
                <Moon size={20} color="#d4a96a" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.darkMode')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>
                  {isDark ? t('profile.enabled') : t('profile.disabled')}
                </Text>
              </View>
            </View>
            <Switch
              value={isDark}
              onValueChange={setIsDark}
              trackColor={{ false: '#e2e8f0', true: '#d4a96a' }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('profile.support')}</Text>

          <TouchableOpacity style={settingItemStyle} onPress={() => setHelpModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#e0e7ff' }]}>
                <HelpCircle size={20} color="#d4a96a" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.helpCenter')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={settingItemStyle} onPress={() => setPrivacyModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#f1f5f9' }]}>
                <Shield size={20} color="#64748b" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.privacy')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('profile.share')}</Text>

          <TouchableOpacity style={settingItemStyle} onPress={() => router.push('/qrcode')}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#dbeafe' }]}>
                <QrCode size={20} color="#3b82f6" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.qrcode')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: tc.textPrimary }]}>{t('profile.gdpr.title')}</Text>

          <View style={settingItemStyle}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#fef3c7' }]}>
                <Bell size={20} color="#f59e0b" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.gdpr.marketingConsent')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>{t('profile.gdpr.marketingConsentDesc')}</Text>
              </View>
            </View>
            <Switch
              value={marketingEnabled}
              onValueChange={handleMarketingToggle}
              trackColor={{ false: '#e2e8f0', true: '#22c55e' }}
              thumbColor="#ffffff"
            />
          </View>

          <TouchableOpacity style={settingItemStyle} onPress={() => setDataRightsModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#dbeafe' }]}>
                <FileText size={20} color="#3b82f6" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.gdpr.myRights')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>{t('profile.gdpr.myRightsDesc')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={settingItemStyle} onPress={handleRequestDataExport}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#dcfce7' }]}>
                <Download size={20} color="#10b981" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: tc.textPrimary }]}>{t('profile.gdpr.exportData')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>{t('profile.gdpr.exportDataDesc')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#94a3b8" />
          </TouchableOpacity>

          <TouchableOpacity style={[settingItemStyle, styles.dangerItem, { backgroundColor: '#1a1a2e' }]} onPress={() => setDeleteAccountModalVisible(true)}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: '#fee2e2' }]}>
                <Trash2 size={20} color="#ef4444" />
              </View>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: '#ef4444' }]}>{t('profile.gdpr.deleteAccount')}</Text>
                <Text style={[styles.settingValue, { color: tc.textSecondary }]}>{t('profile.gdpr.deleteAccountDesc')}</Text>
              </View>
            </View>
            <ChevronRight size={20} color="#ef4444" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: isDark ? '#1a1a2e' : '#1a1a2e', borderColor: 'rgba(239,68,68,0.3)' }]} onPress={() => setLogoutModalVisible(true)}>
          <LogOut size={20} color="#ef4444" />
          <Text style={styles.logoutButtonText}>{t('profile.logout')}</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: tc.footerText }]}>{t('app.version')}</Text>
          {BUILD_STAMP_LABEL ? (
            <Text style={[styles.footerBuildStamp, { color: tc.footerSubtext }]}>{BUILD_STAMP_LABEL}</Text>
          ) : __DEV__ ? (
            <Text style={[styles.footerBuildStamp, { color: tc.footerSubtext }]}>
              {Platform.OS === 'web' ? 'dev (bundle web local)' : 'dev (Metro — código neste computador)'}
            </Text>
          ) : null}
          <Text style={[styles.footerSubtext, { color: tc.footerSubtext }]}>
            {t('profile.footerSubtext')}
          </Text>
          <Text style={[styles.footerCompany, { color: tc.textSecondary }]}>MORFEU SAUDE E TECNOLOGIA LTDA</Text>
          <Text style={[styles.footerCnpj, { color: tc.footerText }]}>CNPJ: 66.059.212/0001-52</Text>
        </View>
      </View>

    </ScrollView>

      <Modal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        title={t('modal.selectLanguage')}
      >
        <TouchableOpacity style={styles.modalOption} onPress={() => handleSelectLanguage('pt')}>
          <Text style={styles.modalOptionText}>Português</Text>
          {language === 'pt' && <View style={styles.modalOptionCheck} />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalOption} onPress={() => handleSelectLanguage('en')}>
          <Text style={styles.modalOptionText}>English</Text>
          {language === 'en' && <View style={styles.modalOptionCheck} />}
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={giftModalVisible}
        onClose={() => setGiftModalVisible(false)}
        title={t('modal.redeemGift.title')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {t('modal.redeemGift.text')}
          </Text>
          <TextInput
            style={styles.modalInput}
            placeholder={t('gift.placeholder')}
            value={giftCode}
            onChangeText={setGiftCode}
            autoCapitalize="characters"
          />
          <TouchableOpacity style={styles.modalButton} onPress={handleRedeemGift}>
            <Text style={styles.modalButtonText}>{t('modal.redeemGift.redeem')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={helpModalVisible}
        onClose={() => setHelpModalVisible(false)}
        title={t('modal.help.title')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {t('modal.help.text')}
          </Text>
          <Text style={styles.modalHighlight}>{t('support.email')}</Text>
        </View>
      </Modal>

      <Modal
        visible={privacyModalVisible}
        onClose={() => setPrivacyModalVisible(false)}
        title={t('modal.privacy.title')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {t('modal.privacy.text')}
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setPrivacyModalVisible(false);
              router.push('/privacy');
            }}
          >
            <Text style={styles.modalButtonText}>{t('profile.privacyBtn')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modalButton, styles.modalButtonSecondary]}
            onPress={() => {
              setPrivacyModalVisible(false);
              router.push('/terms');
            }}
          >
            <Text style={styles.modalButtonTextSecondary}>{t('profile.termsBtn')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={logoutModalVisible}
        onClose={() => setLogoutModalVisible(false)}
        title={t('modal.logout.title')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {t('modal.logout.text')}
          </Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary]}
              onPress={() => setLogoutModalVisible(false)}
            >
              <Text style={styles.modalButtonTextSecondary}>{t('modal.logout.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonDanger]}
              onPress={async () => {
                setLogoutModalVisible(false);
                await signOut();
              }}
            >
              <Text style={styles.modalButtonText}>{t('modal.logout.confirm')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={upgradeModalVisible}
        onClose={() => setUpgradeModalVisible(false)}
        title={t('modal.upgrade.title')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            {t('modal.upgrade.text')}
          </Text>
          <View style={styles.modalFeatures}>
            <Text style={styles.modalFeature}>✓ {t('modal.upgrade.feature1')}</Text>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setUpgradeModalVisible(false);
              router.push('/checkout');
            }}
          >
            <Text style={styles.modalButtonText}>{t('modal.upgrade.viewPlans')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={dataRightsModalVisible}
        onClose={() => setDataRightsModalVisible(false)}
        title={t('profile.gdpr.myRights')}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{t('profile.gdpr.rightsIntro')}</Text>
          <View style={styles.modalList}>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right1')}</Text>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right2')}</Text>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right3')}</Text>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right4')}</Text>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right5')}</Text>
            <Text style={styles.modalListItem}>• {t('profile.gdpr.right6')}</Text>
          </View>
          <Text style={styles.modalText}>{t('profile.gdpr.rightsContact')}</Text>
          <Text style={styles.modalHighlight}>{t('privacy.email')}</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setDataRightsModalVisible(false);
              router.push('/privacy');
            }}
          >
            <Text style={styles.modalButtonText}>{t('profile.privacyBtn')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={deleteAccountModalVisible}
        onClose={() => { setDeleteAccountModalVisible(false); setDeleteConfirmText(''); }}
        title={t('profile.gdpr.deleteAccount')}
      >
        <View style={styles.modalContent}>
          <Text style={[styles.modalText, { color: '#ef4444', fontWeight: '700' }]}>{t('profile.gdpr.deleteWarning')}</Text>
          <Text style={styles.modalText}>{t('profile.gdpr.deleteDetail')}</Text>
          <Text style={styles.modalText}>{t('profile.gdpr.deleteInstruction')}</Text>
          <TextInput
            style={[styles.modalInput, { borderColor: '#fee2e2' }]}
            placeholder={t('profile.gdpr.deleteInputPlaceholder')}
            value={deleteConfirmText}
            onChangeText={setDeleteConfirmText}
            autoCapitalize="none"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonSecondary, { flex: 1 }]}
              onPress={() => { setDeleteAccountModalVisible(false); setDeleteConfirmText(''); }}
            >
              <Text style={styles.modalButtonTextSecondary}>{t('modal.logout.cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonDanger, { flex: 1 }]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.modalButtonText}>{t('profile.gdpr.deleteConfirmBtn')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 36,
    paddingHorizontal: 20,
  },
  headerContent: {
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  crownBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  userEmail: {
    fontSize: 15,
    color: '#d4a96a',
    fontWeight: '500',
  },
  content: {
    padding: 20,
  },
  subscriptionCard: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(212,169,106,0.3)',
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
    fontWeight: '600',
  },
  subscriptionType: {
    fontSize: 20,
    fontWeight: '800',
  },
  subscriptionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  subscriptionButtons: {
    gap: 8,
  },
  upgradeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fbbf24',
    borderRadius: 12,
    paddingVertical: 14,
    shadowColor: '#fbbf24',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  giftButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: '#d4a96a',
  },
  giftButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#d4a96a',
  },
  premiumActive: {
    backgroundColor: '#dcfce7',
    borderRadius: 8,
    padding: 12,
  },
  premiumActiveText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '600',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingValue: {
    fontSize: 13,
  },
  dangerItem: {
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  cancelItem: {
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.2)',
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ef4444',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerBuildStamp: {
    fontSize: 11,
    marginTop: 4,
    letterSpacing: 0.3,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
  },
  footerCompany: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
  footerCnpj: {
    fontSize: 11,
    textAlign: 'center',
    marginTop: 2,
  },
  modalContent: {
    gap: 16,
  },
  modalText: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },
  modalHighlight: {
    fontSize: 14,
    color: '#d4a96a',
    fontWeight: '600',
  },
  modalList: {
    gap: 8,
  },
  modalListItem: {
    fontSize: 15,
    color: '#64748b',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  modalButton: {
    backgroundColor: '#d4a96a',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  modalButtonSecondary: {
    backgroundColor: '#f1f5f9',
  },
  modalButtonTextSecondary: {
    color: '#64748b',
  },
  modalButtonDanger: {
    backgroundColor: '#ef4444',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#f8fafc',
    marginBottom: 8,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  modalOptionCheck: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#d4a96a',
  },
  modalFeatures: {
    gap: 12,
    paddingVertical: 8,
  },
  modalFeature: {
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '500',
  },
});

export default function ProfileScreen() {
  return (
    <ErrorBoundary>
      <ProfileContent />
    </ErrorBoundary>
  );
}
