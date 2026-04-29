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
