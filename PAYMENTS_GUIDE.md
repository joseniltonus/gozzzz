# Guia de Implementação de Pagamentos - GoZzzz

Este guia explica como implementar o sistema de pagamentos e assinaturas no GoZzzz usando RevenueCat.

## Por que RevenueCat?

RevenueCat é a solução recomendada para apps mobile porque:
- Funciona com Apple App Store e Google Play Store
- Gerencia assinaturas automaticamente
- Sincroniza compras entre dispositivos
- Fornece analytics detalhados
- Simplifica a gestão de produtos e preços
- Suporta gift cards e promoções

## Tipos de Assinatura no GoZzzz

O app suporta 3 tipos de acesso:

### 1. Free (Gratuito)
- Acesso às 3 primeiras lições do programa
- Todas as dicas diárias não-premium
- Perfil básico

### 2. Premium (Pago)
- Acesso completo às 21 lições
- Todo o conteúdo premium
- Vídeos e áudios de todas as lições
- Consultoria com desconto

### 3. Gift (Gift Card)
- Acesso premium via código de presente
- Mesmos benefícios do Premium
- Válido por período específico

## Estrutura de Preços Sugerida

### Brasil (BRL)
- **Mensal**: R$ 29,90/mês
- **Trimestral**: R$ 74,90 (R$ 24,97/mês - economia de 17%)
- **Anual**: R$ 249,90 (R$ 20,83/mês - economia de 30%)
- **Gift Card 3 meses**: R$ 89,90
- **Gift Card 12 meses**: R$ 299,90

### Internacional (USD)
- **Monthly**: $7.99/month
- **Quarterly**: $19.99 ($6.66/month - 17% off)
- **Yearly**: $59.99 ($5.00/month - 37% off)

## Passo 1: Exportar o Projeto

Como o app está em Expo, você precisa exportar para adicionar código nativo:

```bash
npx expo prebuild
```

Isso criará as pastas `ios/` e `android/` necessárias.

## Passo 2: Instalar RevenueCat

```bash
npm install react-native-purchases
```

Para iOS, instale os pods:
```bash
cd ios && pod install && cd ..
```

## Passo 3: Configurar RevenueCat

### 3.1 Criar Conta no RevenueCat

1. Acesse [app.revenuecat.com](https://app.revenuecat.com)
2. Crie uma conta gratuita
3. Crie um novo app
4. Escolha "Expo" como plataforma

### 3.2 Configurar App Store (iOS)

1. Acesse [App Store Connect](https://appstoreconnect.apple.com)
2. Vá em "Meu App" > "Assinaturas"
3. Crie um novo grupo de assinaturas: "GoZzzz Premium"
4. Adicione os produtos:
   - `gozzzz_monthly` - Mensal
   - `gozzzz_quarterly` - Trimestral
   - `gozzzz_yearly` - Anual
5. No RevenueCat, vá em "Apps" > "iOS" > "App Store Connect"
6. Siga as instruções para conectar

### 3.3 Configurar Google Play (Android)

1. Acesse [Google Play Console](https://play.google.com/console)
2. Vá em "Produtos" > "Assinaturas"
3. Crie os mesmos produtos do iOS
4. No RevenueCat, conecte o Google Play

### 3.4 Obter API Key

1. No RevenueCat, vá em "API Keys"
2. Copie a "Public API key"
3. Adicione no `.env`:

```env
EXPO_PUBLIC_REVENUECAT_API_KEY=sua_api_key_aqui
```

## Passo 4: Implementar no Código

### 4.1 Criar Contexto de Pagamentos

Crie `contexts/PaymentsContext.tsx`:

```typescript
import { createContext, useContext, useEffect, useState } from 'react';
import Purchases, { CustomerInfo, PurchasesPackage } from 'react-native-purchases';

interface PaymentsContextType {
  packages: PurchasesPackage[];
  purchasePackage: (pkg: PurchasesPackage) => Promise<void>;
  restorePurchases: () => Promise<void>;
  customerInfo: CustomerInfo | null;
  isSubscribed: boolean;
}

const PaymentsContext = createContext<PaymentsContextType | undefined>(undefined);

export function PaymentsProvider({ children }: { children: React.ReactNode }) {
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const initPurchases = async () => {
      await Purchases.configure({
        apiKey: process.env.EXPO_PUBLIC_REVENUECAT_API_KEY!,
      });

      const offerings = await Purchases.getOfferings();
      if (offerings.current) {
        setPackages(offerings.current.availablePackages);
      }

      const info = await Purchases.getCustomerInfo();
      setCustomerInfo(info);
      setIsSubscribed(info.entitlements.active['premium'] !== undefined);
    };

    initPurchases();
  }, []);

  const purchasePackage = async (pkg: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pkg);
      setCustomerInfo(customerInfo);
      setIsSubscribed(customerInfo.entitlements.active['premium'] !== undefined);
    } catch (error) {
      console.error('Purchase error:', error);
      throw error;
    }
  };

  const restorePurchases = async () => {
    try {
      const info = await Purchases.restorePurchases();
      setCustomerInfo(info);
      setIsSubscribed(info.entitlements.active['premium'] !== undefined);
    } catch (error) {
      console.error('Restore error:', error);
      throw error;
    }
  };

  return (
    <PaymentsContext.Provider value={{ packages, purchasePackage, restorePurchases, customerInfo, isSubscribed }}>
      {children}
    </PaymentsContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentsContext);
  if (!context) throw new Error('usePayments must be used within PaymentsProvider');
  return context;
}
```

### 4.2 Adicionar Provider no App

No `app/_layout.tsx`:

```typescript
import { PaymentsProvider } from '@/contexts/PaymentsContext';

// Dentro do return:
<AuthProvider>
  <PaymentsProvider>
    {/* resto do código */}
  </PaymentsProvider>
</AuthProvider>
```

### 4.3 Criar Tela de Upgrade

Crie `app/upgrade.tsx`:

```typescript
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { usePayments } from '@/contexts/PaymentsContext';
import { Crown } from 'lucide-react-native';

export default function UpgradeScreen() {
  const { packages, purchasePackage } = usePayments();

  return (
    <ScrollView>
      <Text>Escolha seu plano</Text>
      {packages.map((pkg) => (
        <TouchableOpacity
          key={pkg.identifier}
          onPress={() => purchasePackage(pkg)}
        >
          <Text>{pkg.product.title}</Text>
          <Text>{pkg.product.priceString}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
```

### 4.4 Atualizar Tela de Perfil

No `app/(tabs)/profile.tsx`, use o hook:

```typescript
import { usePayments } from '@/contexts/PaymentsContext';

// Dentro do componente:
const { isSubscribed } = usePayments();

// Use isSubscribed para mostrar o status
```

## Passo 5: Configurar Entitlements

No RevenueCat Dashboard:

1. Vá em "Entitlements"
2. Crie um entitlement chamado "premium"
3. Associe todos os produtos a este entitlement
4. Isso permite verificar `customerInfo.entitlements.active['premium']`

## Passo 6: Implementar Gift Cards

### No RevenueCat

1. Vá em "Products" > "Promotional"
2. Crie códigos promocionais com duração específica
3. Distribua esses códigos como gift cards

### No App

```typescript
const redeemGiftCard = async (code: string) => {
  try {
    const info = await Purchases.restorePurchases();
    // O usuário deve inserir o código na App Store/Play Store
    // O RevenueCat detectará automaticamente
  } catch (error) {
    console.error('Redeem error:', error);
  }
};
```

## Passo 7: Sincronizar com Supabase

Atualize a tabela `profiles` quando o status de assinatura mudar:

```typescript
useEffect(() => {
  if (customerInfo) {
    const updateProfile = async () => {
      const subscriptionType = isSubscribed ? 'premium' : 'free';
      await supabase
        .from('profiles')
        .update({ subscription_type: subscriptionType })
        .eq('id', user.id);
    };
    updateProfile();
  }
}, [customerInfo, isSubscribed]);
```

## Passo 8: Testar Compras

### iOS
1. Configure sandbox tester no App Store Connect
2. Use esse account no simulador
3. Faça compras de teste (não são cobradas)

### Android
1. Configure license testers no Google Play Console
2. Use esses emails para testar
3. Compras de teste não são cobradas

## Formas de Pagamento

### Suportadas Automaticamente
- **iOS**: Cartão de crédito, débito, Apple Pay, saldo da conta Apple
- **Android**: Cartão de crédito, débito, Google Pay, saldo Google Play
- **PIX**: Não suportado diretamente pelas stores

### Para PIX (Alternativa)
Se você quiser oferecer PIX, considere:
1. Usar Stripe ou outro gateway de pagamento web
2. Criar uma webview no app
3. Após pagamento, atualizar manualmente o Supabase
4. Usar tipo de assinatura 'gift' para esses usuários

**Nota**: Pagamentos fora das stores violam as políticas da Apple/Google e podem resultar em rejeição do app.

## Melhores Práticas

1. **Sempre use RevenueCat em produção**
   - Gerencia complexidade de assinaturas
   - Sincroniza entre dispositivos
   - Fornece analytics

2. **Ofereça trial gratuito**
   - 7 dias é o padrão
   - Aumenta conversões

3. **Destaque o plano anual**
   - Maior valor percebido
   - Reduz churn

4. **Implemente restore purchases**
   - Essencial para usuários que trocam de dispositivo

5. **Teste extensivamente**
   - Use sandbox antes de produção
   - Teste todos os fluxos

## Recursos

- [RevenueCat Docs](https://docs.revenuecat.com)
- [Expo + RevenueCat Guide](https://www.revenuecat.com/docs/getting-started/installation/expo)
- [App Store Guidelines](https://developer.apple.com/app-store/subscriptions/)
- [Google Play Policies](https://support.google.com/googleplay/android-developer/answer/140504)

## Custos

### RevenueCat
- Gratuito até $2,500 em receita mensal
- 1% da receita acima de $2,500
- Planos enterprise disponíveis

### App Store (iOS)
- 30% dos primeiros $1M de receita anual
- 15% após $1M (Small Business Program)

### Google Play (Android)
- 15% dos primeiros $1M de receita anual
- 30% após $1M

---

Com este guia, você terá um sistema completo de pagamentos para o GoZzzz!
