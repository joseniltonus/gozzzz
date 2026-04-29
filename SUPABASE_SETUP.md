# Configuração do Supabase para GoZzzz

Este documento explica como configurar o Supabase para o app GoZzzz.

## Passo 1: Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e faça login ou crie uma conta
2. Clique em "New Project"
3. Preencha os detalhes:
   - **Nome**: GoZzzz
   - **Database Password**: Escolha uma senha forte (guarde-a)
   - **Region**: Escolha a região mais próxima dos seus usuários
4. Clique em "Create new project"
5. Aguarde alguns minutos enquanto o projeto é criado

## Passo 2: Obter as Credenciais

1. No painel do seu projeto, vá em **Settings** (ícone de engrenagem)
2. Clique em **API** no menu lateral
3. Você verá duas informações importantes:
   - **Project URL**: Sua URL do Supabase
   - **anon public**: Sua chave pública (API Key)

## Passo 3: Configurar o Arquivo .env

1. Abra o arquivo `.env` na raiz do projeto
2. Substitua os valores pelas suas credenciais:

```env
EXPO_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

3. Salve o arquivo

## Passo 4: Verificar o Banco de Dados

O schema do banco já foi criado automaticamente. Para verificar:

1. No Supabase, vá em **Table Editor**
2. Você deve ver 4 tabelas:
   - `profiles` - Perfis de usuários
   - `lessons` - 21 lições do programa
   - `user_progress` - Progresso dos usuários
   - `daily_tips` - Dicas diárias

3. Verifique se as lições foram populadas:
   - Clique na tabela `lessons`
   - Você deve ver 21 registros (lições 1 a 21)

4. Verifique as dicas:
   - Clique na tabela `daily_tips`
   - Você deve ver 6 dicas diárias

## Passo 5: Configurar Autenticação

1. No Supabase, vá em **Authentication** > **Settings**
2. Em **Auth Providers**, garanta que "Email" está habilitado
3. **Importante**: Em **Email Templates**, desabilite "Confirm email" se você não quiser confirmação de email

### Desabilitar Confirmação de Email (Recomendado para Desenvolvimento)

1. Vá em **Authentication** > **Settings**
2. Role até "Email Auth"
3. Desmarque a opção "Enable email confirmations"
4. Clique em "Save"

Isso permitirá que usuários se cadastrem e façam login imediatamente.

## Passo 6: Configurar Row Level Security (RLS)

O RLS já está configurado automaticamente! Mas você pode verificar:

1. Vá em **Table Editor**
2. Clique em uma tabela (ex: `profiles`)
3. Clique em "RLS" no topo
4. Você verá as políticas de segurança ativas

### Políticas Configuradas

- **profiles**: Usuários podem ver e editar apenas seu próprio perfil
- **lessons**: Todos usuários autenticados podem ver as lições
- **user_progress**: Usuários podem gerenciar apenas seu próprio progresso
- **daily_tips**: Todos usuários autenticados podem ver as dicas

## Passo 7: Testar a Conexão

1. Execute o app: `npm run dev`
2. Abra o app no navegador ou simulador
3. Tente criar uma conta
4. Se tudo estiver certo, você será redirecionado para o app

### Verificar no Supabase

1. Vá em **Authentication** > **Users**
2. Você deve ver o usuário que acabou de criar
3. Vá em **Table Editor** > **profiles**
4. Você deve ver o perfil do usuário criado

## Problemas Comuns

### Erro: "Invalid API Key"
- Verifique se as credenciais no `.env` estão corretas
- Reinicie o app após alterar o `.env`

### Erro: "New row violates row-level security policy"
- Verifique se as políticas RLS estão ativas
- Confirme que o usuário está autenticado

### Usuário não aparece na tabela profiles
- Verifique se o trigger de criação de perfil está funcionando
- Tente criar um novo usuário

### Não consigo fazer login
- Verifique se a confirmação de email está desabilitada
- Confirme que o email e senha estão corretos

## Dados de Exemplo

O banco já vem populado com:
- 21 lições do programa (steps 1-21)
- 6 dicas diárias sobre sono
- Todas as lições e dicas estão em 3 idiomas (PT, EN, ES)

## Próximos Passos

Após configurar o Supabase:

1. **Adicionar Conteúdo**: Edite as lições e dicas no Table Editor
2. **Adicionar Mídia**: Adicione URLs de vídeos e áudios às lições
3. **Customizar**: Ajuste as políticas RLS conforme necessário
4. **Produção**: Crie um projeto separado para produção

## Segurança

**IMPORTANTE**:
- Nunca compartilhe sua `service_role` key publicamente
- Use apenas a `anon` key no código do app
- Mantenha o RLS sempre habilitado em produção
- Use variáveis de ambiente diferentes para dev/prod

## Recursos Úteis

- [Documentação Supabase](https://supabase.com/docs)
- [Guia de RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase + React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)

---

Se você tiver problemas, revise este documento ou consulte a documentação oficial do Supabase.
