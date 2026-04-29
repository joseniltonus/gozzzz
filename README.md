# GoZzzz - App de Saúde do Sono e Saúde Mental

Um aplicativo completo voltado para a saúde do sono e saúde mental, baseado em pesquisas científicas de Andrew Huberman, Matt Walker e Charles Czeisler.

## Sobre o App

GoZzzz foi criado após 15 anos de luta contra insônia. A dor se transformou em propósito: ajudar pessoas a recuperarem seu superpoder através de um sono de qualidade.

### Características Principais

- **Programa de 21 Passos**: Transforme seus hábitos de sono em 21 dias
- **Dicas Diárias**: Conteúdo baseado em ciência, aplicável no dia a dia
- **Health Coach**: Consultoria 360° focada em saúde emocional
- **Multi-idioma**: Português, Inglês e Espanhol
- **Personagem Guia**: Mulher animada com cabelo preto para acompanhar sua jornada

## Tecnologias

- **Expo SDK 52** - Framework React Native
- **Expo Router** - Navegação baseada em arquivos
- **Supabase** - Backend, autenticação e banco de dados
- **TypeScript** - Type safety
- **Lucide Icons** - Ícones modernos

## Configuração do Projeto

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Supabase

1. Acesse [supabase.com](https://supabase.com) e crie um novo projeto
2. Vá em Settings > API para obter suas credenciais
3. Atualize o arquivo `.env` com suas credenciais:

```env
EXPO_PUBLIC_SUPABASE_URL=sua_url_do_supabase
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

### 3. Banco de Dados

O schema do banco de dados já foi criado automaticamente com as seguintes tabelas:

- `profiles` - Perfis de usuários
- `lessons` - Lições do programa de 21 passos
- `user_progress` - Progresso dos usuários
- `daily_tips` - Dicas diárias

As 21 lições e dicas diárias já foram populadas no banco.

### 4. Executar o Projeto

```bash
npm run dev
```

## Estrutura do Projeto

```
app/
├── (auth)/           # Telas de autenticação
│   ├── login.tsx
│   └── signup.tsx
├── (tabs)/           # Telas principais com navegação por tabs
│   ├── index.tsx     # Tela inicial com dicas diárias
│   ├── program.tsx   # Programa de 21 passos
│   ├── coach.tsx     # Health Coach e consultoria
│   ├── about.tsx     # História do criador
│   └── profile.tsx   # Perfil e configurações
├── index.tsx         # Tela de boas-vindas
└── _layout.tsx       # Layout principal com AuthProvider

contexts/
└── AuthContext.tsx   # Contexto de autenticação

lib/
└── supabase.ts       # Cliente Supabase

types/
└── database.ts       # Tipos TypeScript do banco
```

## Funcionalidades

### Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Integração com Supabase Auth
- Criação automática de perfis

### Tela Inicial
- Dicas diárias baseadas em ciência
- Categorias: higiene do sono, ritmo circadiano, saúde mental, nutrição, exercício, ambiente
- Fontes científicas citadas
- Refresh para atualizar conteúdo

### Programa de 21 Passos
- 21 lições progressivas
- Personagem animado como guia
- Sistema de bloqueio (primeiras 3 lições gratuitas)
- Badge premium para conteúdo exclusivo
- Indicador de progresso
- Acompanhamento de lições concluídas

### Health Coach
- Apresentação da consultoria 360°
- Foco em saúde emocional
- Serviços de medicina integrativa
- Planos de investimento
- Botões de ação (agendar, WhatsApp)

### Sobre
- História inspiradora do criador
- Apresentação dos 3 especialistas
- Andrew Huberman (Stanford)
- Matt Walker (UC Berkeley)
- Charles Czeisler (Harvard)
- Pilares do GoZzzz
- Impacto do sono na vida

### Perfil
- Gerenciamento de assinatura
- Configurações de idioma
- Notificações
- Modo escuro
- Formas de pagamento
- Gift cards

## Sistema de Pagamentos

### RevenueCat (Recomendado para Produção)

Para implementar pagamentos in-app no iOS e Android, você precisará:

1. **Exportar o projeto para desenvolvimento local**
   ```bash
   npx expo prebuild
   ```

2. **Instalar o RevenueCat SDK**
   ```bash
   npm install react-native-purchases
   ```

3. **Configurar RevenueCat**
   - Criar conta em [revenuecat.com](https://www.revenuecat.com)
   - Configurar produtos no App Store Connect (iOS) e Google Play Console (Android)
   - Integrar o SDK conforme documentação oficial

4. **Documentação Completa**
   - [RevenueCat + Expo Guide](https://www.revenuecat.com/docs/getting-started/installation/expo)

### Tipos de Assinatura

O app suporta 3 tipos de assinatura:
- `free` - Acesso limitado (3 primeiras lições)
- `premium` - Acesso completo via pagamento
- `gift` - Acesso via gift card

### Formas de Pagamento

- Cartão de crédito
- Cartão de débito
- PIX
- Gift cards

## Publicação

### iOS (App Store)

1. Configure o app no App Store Connect
2. Faça build do app:
   ```bash
   eas build --platform ios
   ```
3. Submeta para revisão

### Android (Google Play)

1. Configure o app no Google Play Console
2. Faça build do app:
   ```bash
   eas build --platform android
   ```
3. Submeta para revisão

## Multi-idioma

O app já está preparado para 3 idiomas:
- Português (pt)
- Inglês (en)
- Espanhol (es)

As lições e dicas estão armazenadas nas 3 línguas no banco de dados. Para implementar a troca de idioma, basta usar os campos correspondentes (ex: `title_pt`, `title_en`, `title_es`).

## Próximos Passos

1. **Adicionar URLs de vídeo e áudio** - Hospedar o conteúdo em uma CDN e atualizar as lições
2. **Implementar player de vídeo/áudio** - Usar `expo-av` para reproduzir mídia
3. **Integrar RevenueCat** - Para pagamentos in-app
4. **Implementar i18n completo** - Biblioteca como `i18next` para internacionalização
5. **Adicionar notificações push** - Lembretes de sono
6. **Analytics** - Acompanhar uso e engajamento
7. **Teste em dispositivos reais** - iOS e Android

## Suporte

Para dúvidas sobre o projeto, entre em contato através do WhatsApp configurado no app.

## Licença

© 2024 GoZzzz. Todos os direitos reservados.

---

Feito com carinho para transformar vidas através do sono de qualidade.
