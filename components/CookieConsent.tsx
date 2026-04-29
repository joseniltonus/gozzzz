import { Platform } from 'react-native';
import { CookieConsentBanner } from './CookieConsentBanner';

export function CookieConsent() {
  if (Platform.OS !== 'web') return null;
  return <CookieConsentBanner />;
}
