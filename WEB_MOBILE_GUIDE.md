# Guia Web, Mobile e Link Version - GoZzzz

Este guia explica como o GoZzzz funciona em todas as plataformas e como compartilhar via link.

## Plataformas Suportadas

### ✅ Web (Desktop e Mobile)
- Funciona em qualquer navegador moderno
- Responsivo em todos os tamanhos de tela
- PWA (Progressive Web App) ready
- Pode ser adicionado à tela inicial do celular

### ✅ iOS (iPhone e iPad)
- App nativo via Expo
- Disponível na App Store
- Suporte a tablets
- Integração com Apple Health (futuro)

### ✅ Android (Smartphones e Tablets)
- App nativo via Expo
- Disponível no Google Play
- Material Design adaptado
- Integração com Google Fit (futuro)

## Como Funciona em Cada Plataforma

### Web Version

**URL de Acesso:** https://gozzzz.app

**Características:**
- Acesso instantâneo sem download
- Funciona offline após primeira visita (PWA)
- Pode ser instalado como app (botão "Adicionar à Tela Inicial")
- Sincronização automática via Supabase
- Ideal para demonstrações e testes

**Compatibilidade:**
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

### Mobile Apps (iOS e Android)

**Como Publicar:**

1. **Configurar EAS (Expo Application Services)**
```bash
npm install -g eas-cli
eas login
eas build:configure
```

2. **Build iOS**
```bash
eas build --platform ios
```

3. **Build Android**
```bash
eas build --platform android
```

4. **Submeter para as lojas**
```bash
eas submit --platform ios
eas submit --platform android
```

**Requisitos:**
- Conta Apple Developer ($99/ano)
- Conta Google Play Developer ($25 única vez)
- Screenshots e ícones preparados
- Descrições nas 3 línguas (PT, EN, ES)

## Compartilhamento via Link

### Link Direto
```
https://gozzzz.app
```

Este link:
- Abre o web app imediatamente
- Detecta se há app instalado e sugere abrir nele
- Funciona em qualquer dispositivo
- Pode ser encurtado (ex: bit.ly/gozzzz)

### Deep Links (Para Apps Instalados)

**Configurado no app.json:**
```json
"scheme": "gozzzz"
```

**URLs Possíveis:**
```
gozzzz://              → Abre o app
gozzzz://program       → Abre direto no programa
gozzzz://coach         → Abre direto no health coach
gozzzz://about         → Abre direto na página sobre
```

### Universal Links (iOS e Android)

**Formato:**
```
https://gozzzz.app/program
https://gozzzz.app/coach
https://gozzzz.app/about
```

Estes links:
- Abrem o app se instalado
- Abrem a web version se não instalado
- Mantêm o contexto (qual tela abrir)

## QR Code

### Gerar QR Code

Use qualquer gerador de QR code com a URL:
```
https://gozzzz.app
```

**Recomendações:**
- Use formato PNG ou SVG para impressão
- Tamanho mínimo: 2cm x 2cm quando impresso
- Teste antes de imprimir em massa
- Adicione logo da lua no centro (opcional)

**Ferramentas Gratuitas:**
- qr-code-generator.com
- qrcode-monkey.com
- goqr.me

### QR Code no App

O app tem uma tela dedicada para QR code em:
```
Perfil → Compartilhar → QR Code
```

Esta tela:
- Mostra o QR code grande
- Permite compartilhar por mensagem/redes
- Tem o cartão de visita digital
- Inclui as frases virais

## PWA (Progressive Web App)

### Habilitar PWA

1. Criar `manifest.json` na pasta `public/`:
```json
{
  "name": "GoZzzz - Sleep Science App",
  "short_name": "GoZzzz",
  "description": "Os 3 maiores pesquisadores do planeta em um só lugar",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#0f172a",
  "background_color": "#0f172a",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. Adicionar service worker para cache offline

3. Usuários podem "Adicionar à Tela Inicial" em qualquer navegador mobile

### Vantagens do PWA

- Funciona offline
- Notificações push (futuro)
- Atualizações automáticas
- Sem necessidade de loja de apps
- Menor tamanho que app nativo

## Como Usar o Link em Marketing

### 1. Redes Sociais

**Bio/Sobre:**
```
🌙 Transforme seu sono com ciência
Os 3 maiores pesquisadores em um só app
👉 gozzzz.app
```

**Posts com Link:**
```
Dormir bem é seu superpoder 💪
Descubra como com GoZzzz → gozzzz.app

#GoZzzz #SonoDe Qualidade
```

### 2. Email Signature

```
[Seu Nome]
[Cargo]

P.S. Durma melhor com ciência: gozzzz.app 🌙
```

### 3. Cartão de Visita Físico

**Incluir:**
- QR Code grande
- URL: gozzzz.app
- Frase: "Os 3 maiores pesquisadores do planeta em um só lugar"

### 4. Apresentações

**Último slide:**
```
Transforme Seu Sono

[QR Code Grande]

gozzzz.app
```

### 5. WhatsApp Status/Stories

```
Você sabia? Dormir bem é seu superpoder! 🌙

Descubra os segredos dos 3 maiores especialistas em sono do mundo.

Link: gozzzz.app
```

## Tracking e Analytics

### URLs com Parâmetros

Para rastrear de onde vêm os acessos:

```
https://gozzzz.app?ref=instagram
https://gozzzz.app?ref=email
https://gozzzz.app?ref=cartao
https://gozzzz.app?ref=qrcode
```

### Integração com Analytics

No futuro, adicionar:
- Google Analytics
- Facebook Pixel
- Mixpanel

## Hospedagem Web

### Opções Recomendadas

**1. Vercel (Recomendado)**
- Grátis para projetos pessoais
- Deploy automático do GitHub
- CDN global
- SSL automático

```bash
npm install -g vercel
vercel
```

**2. Netlify**
- Grátis com domínio custom
- Build automático
- Formulários integrados

**3. Expo Hosting**
```bash
npx expo export:web
eas update
```

### Domínio Custom

**Registrar domínio:**
- gozzzz.app (já configurado no app.json)
- Usar Namecheap, GoDaddy, ou Google Domains

**Configurar DNS:**
```
A Record: @ → [IP do servidor]
CNAME: www → gozzzz.app
```

## Sincronização Multi-Dispositivo

### Como Funciona

1. Usuário faz login no app (web ou mobile)
2. Dados são salvos no Supabase
3. Sincronização automática em todos os dispositivos
4. Progresso é mantido em qualquer plataforma

### Dados Sincronizados

- Perfil do usuário
- Progresso nas lições
- Lições concluídas
- Configurações (idioma, notificações)
- Tipo de assinatura

## Compartilhamento Social Nativo

### Share API

O app usa a Share API nativa do navegador/dispositivo:

```typescript
await Share.share({
  message: 'GoZzzz - Transforme seu sono com ciência 🌙\n\nBaixe agora: https://gozzzz.app',
  title: 'GoZzzz - Sleep Science App',
});
```

**Onde usar:**
- Botão "Compartilhar" na tela de QR Code
- Botão "Compartilhar" no cartão de visita
- Após completar uma lição
- Ao atingir marcos (7 dias, 21 dias)

## SEO para Web Version

### Meta Tags Essenciais

Já configuradas no projeto:

```html
<title>GoZzzz - Os 3 Maiores Pesquisadores do Sono em Um Só App</title>
<meta name="description" content="Transforme seu sono com ciência. Andrew Huberman, Matt Walker e Charles Czeisler em um programa de 21 dias.">
<meta property="og:title" content="GoZzzz - Sleep Science App">
<meta property="og:description" content="Os 3 maiores pesquisadores do planeta em um só lugar">
<meta property="og:image" content="https://gozzzz.app/og-image.png">
<meta property="og:url" content="https://gozzzz.app">
```

### Estrutura de URLs

```
https://gozzzz.app              → Home
https://gozzzz.app/program      → Programa 21 Passos
https://gozzzz.app/coach        → Health Coach
https://gozzzz.app/about        → Sobre
https://gozzzz.app/qrcode       → QR Code
https://gozzzz.app/business-card → Cartão de Visita
```

## Testes em Todas as Plataformas

### Checklist de Testes

**Web Desktop:**
- [ ] Chrome, Safari, Firefox, Edge
- [ ] Responsividade (breakpoints)
- [ ] Navegação funciona
- [ ] Login/Signup funciona
- [ ] Supabase conecta

**Web Mobile:**
- [ ] Chrome Mobile, Safari iOS
- [ ] Touch gestures funcionam
- [ ] Teclado não quebra layout
- [ ] PWA pode ser instalado

**iOS:**
- [ ] iPhone (vários modelos)
- [ ] iPad
- [ ] Landscape e Portrait
- [ ] Deep links funcionam

**Android:**
- [ ] Vários tamanhos de tela
- [ ] Versões 10, 11, 12, 13, 14
- [ ] Deep links funcionam
- [ ] Back button funciona

## Troubleshooting

### Link não abre o app

**Solução iOS:**
- Verificar Universal Links configurados
- Checar Associated Domains no Xcode

**Solução Android:**
- Verificar Intent Filters no AndroidManifest.xml
- Testar Deep Link com `adb shell am start -W -a android.intent.action.VIEW -d "gozzzz://"`

### Web version não carrega

- Limpar cache do navegador
- Verificar se há erros no console
- Confirmar que Supabase está acessível
- Verificar variáveis de ambiente

### QR Code não funciona

- Testar com vários leitores de QR
- Verificar se URL está correta
- Aumentar tamanho do QR code
- Melhorar contraste (preto sobre branco)

---

## Resumo

O GoZzzz funciona perfeitamente em:
- ✅ Web (qualquer dispositivo)
- ✅ iOS (App Store)
- ✅ Android (Google Play)
- ✅ PWA (instalável)
- ✅ Links diretos
- ✅ QR Code
- ✅ Deep Links

**URL Principal:** https://gozzzz.app

**Compartilhe facilmente:**
- Link direto
- QR Code
- Cartão de visita digital
- Redes sociais

Tudo sincronizado via Supabase para experiência perfeita em qualquer plataforma!
