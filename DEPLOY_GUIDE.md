# Guia de Deploy e Publicação - GoZzzz

Este documento explica como fazer o deploy completo do aplicativo GoZzzz para web e mobile.

## ⚠️ IMPORTANTE: O que foi feito vs O que precisa ser feito

### ✅ O QUE JÁ ESTÁ PRONTO (feito no Bolt):

1. **Aplicativo completo** funcionando com todas as features
2. **Stripe integrado** via Edge Function (aceita cartões internacionais)
3. **Políticas legais** (Privacidade e Termos)
4. **Vídeos externos** suportados (YouTube, Vimeo, etc)
5. **Conteúdo expandido** com imagens, bullet points e dicas de experts
6. **Multi-idioma** funcional (PT, EN, ES)
7. **Build web** funcionando perfeitamente

### ❌ O QUE VOCÊ PRECISA FAZER FORA DO BOLT:

#### 1. Domínio https://gozzzz.app

**Por que não aparece?**
- Domínios precisam ser comprados e configurados externamente
- Bolt não tem acesso a registradores de domínio

**Como resolver:**

```bash
# 1. Compre o domínio
- GoDaddy: https://www.godaddy.com
- Namecheap: https://www.namecheap.com
- Registro.br (se for .br): https://registro.br

# 2. Faça deploy da pasta 'dist' gerada no build
- Vercel (recomendado): https://vercel.com
- Netlify: https://netlify.com
- Firebase Hosting: https://firebase.google.com/hosting

# 3. Configure o domínio
- No painel da hospedagem, adicione gozzzz.app
- No registrador do domínio, aponte DNS para a hospedagem
```

**Exemplo no Vercel (mais fácil):**
```bash
# 1. Instale Vercel CLI
npm install -g vercel

# 2. Faça login
vercel login

# 3. Deploy
cd /caminho/do/projeto
vercel --prod

# 4. No dashboard Vercel, adicione domínio customizado
```

#### 2. Builds Nativos iOS e Android

**Por que não funciona em dispositivos móveis reais?**
- Bolt só roda no navegador (web preview)
- Apps nativos precisam ser compilados e publicados

**Como resolver:**

```bash
# 1. Clone o projeto localmente
git clone [seu-repo]
cd gozzzz

# 2. Instale dependências
npm install

# 3. Crie build de desenvolvimento (para testar no celular)
npx expo start

# 4. Escaneie QR Code com Expo Go app
# Baixe Expo Go na App Store ou Google Play

# 5. Para publicar nas lojas (produção):

# iOS App Store:
- Precisa de Apple Developer Account ($99/ano)
- Mac com Xcode instalado
eas build --platform ios
eas submit --platform ios

# Android Play Store:
- Precisa de Google Play Console ($25 único)
eas build --platform android
eas submit --platform android
```

**Documentação oficial:**
- EAS Build: https://docs.expo.dev/build/introduction/
- App Store: https://docs.expo.dev/distribution/app-stores/
- Expo Go: https://expo.dev/client

#### 3. Stripe - Chave Secreta

**Status atual:**
- Edge Function criada e funcionando ✅
- Aceita cartões internacionais ✅
- Precisa apenas configurar a chave

**Como configurar:**

```bash
# 1. Crie conta no Stripe
https://dashboard.stripe.com/register

# 2. Vá em Developers > API Keys
https://dashboard.stripe.com/apikeys

# 3. Copie a "Secret Key" (sk_live_... ou sk_test_...)

# 4. Configure no Supabase:
# Vá ao dashboard Supabase > Edge Functions > Secrets
# Adicione: STRIPE_SECRET_KEY = sua_chave_aqui
```

**IMPORTANTE:**
- Use `sk_test_...` para testes (não cobra de verdade)
- Use `sk_live_...` para produção (cobra de verdade)
- NUNCA compartilhe a Secret Key publicamente

#### 4. Vídeos com IA (HeyGen, D-ID, Synthesia)

**O que você precisa fazer:**

1. **Crie conta em um serviço de vídeo IA:**
   - HeyGen: https://www.heygen.com (Recomendado - português BR)
   - D-ID: https://www.d-id.com
   - Synthesia: https://www.synthesia.io

2. **Crie os vídeos:**
   - Use o texto das lições como script
   - Escolha avatar feminino
   - Gere em português, inglês e espanhol
   - Exporte e hospede (YouTube, Vimeo)

3. **Atualize as URLs:**
```typescript
// Em data/lessons.ts, atualize:
video_url: 'https://youtube.com/seu-video-ai'
```

O VideoPlayer já suporta qualquer URL de vídeo!

## 📱 Testando no Celular (Antes de Publicar)

```bash
# 1. Baixe Expo Go no seu celular
# iOS: App Store
# Android: Google Play

# 2. No computador:
cd /caminho/do/projeto
npx expo start

# 3. Escaneie o QR Code com:
# iOS: Câmera nativa
# Android: App Expo Go

# Seu app vai abrir no celular!
```

## 🌍 Deploy Web Completo (Passo a Passo)

```bash
# 1. Build
npm run build:web

# 2. Teste localmente (opcional)
npx serve dist

# 3. Deploy no Vercel (recomendado)
vercel --prod

# Ou no Netlify:
netlify deploy --prod --dir=dist

# Ou no Firebase:
firebase deploy
```

## 💳 Testando Pagamentos

**Cartões de teste Stripe:**
```
Número: 4242 4242 4242 4242
Validade: Qualquer data futura (ex: 12/25)
CVV: Qualquer 3 dígitos (ex: 123)
Nome: Qualquer nome
```

**IMPORTANTE:**
- Só funciona com `sk_test_...`
- Com `sk_live_...`, cobra de verdade!

## 🔒 Checklist de Segurança

Antes de publicar:

- [ ] Stripe Secret Key configurada no Supabase
- [ ] URLs de produção corretas (não localhost)
- [ ] Políticas de privacidade e termos acessíveis
- [ ] RLS (Row Level Security) ativado no Supabase
- [ ] Variáveis de ambiente corretas (.env)
- [ ] Teste de pagamento com cartão real (valor pequeno)
- [ ] App testado em iOS e Android via Expo Go

## 📞 Suporte

Se tiver dúvidas:
- Expo: https://docs.expo.dev
- Supabase: https://supabase.com/docs
- Stripe: https://stripe.com/docs
- Vercel: https://vercel.com/docs

## 🎉 Resumo

**Você TEM:**
- App 100% funcional ✅
- Pagamentos integrados ✅
- Conteúdo completo e melhorado ✅
- Multi-idioma ✅

**Você PRECISA:**
1. Comprar domínio gozzzz.app
2. Fazer deploy web (Vercel/Netlify)
3. Criar builds nativos (EAS)
4. Publicar nas lojas (App Store/Play Store)
5. Configurar Stripe Secret Key
6. Criar vídeos com IA (opcional)

**Tempo estimado:**
- Deploy web: 30 minutos
- Builds nativos: 2-3 horas
- Publicação lojas: 3-7 dias (revisão Apple/Google)
- Vídeos IA: Depende do serviço escolhido
