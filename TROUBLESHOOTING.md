# Troubleshooting - GoZzzz

Guia rápido para resolver problemas comuns no app.

## Problema: Botão não responde / Nada acontece ao clicar

### Causas Possíveis:

1. **App ainda está carregando**
   - Aguarde alguns segundos após abrir o app
   - Você deve ver "Carregando..." na tela

2. **Erro de navegação**
   - Verifique o console do navegador (F12 no Chrome)
   - Procure por erros em vermelho

3. **Supabase não configurado**
   - O app precisa das credenciais do Supabase no arquivo `.env`

### Soluções:

#### Solução 1: Verificar Console
```bash
# Abra o navegador e pressione F12
# Vá em "Console" e procure erros
# Compartilhe os erros para diagnóstico
```

#### Solução 2: Limpar Cache
```bash
# Pare o servidor
Ctrl + C

# Limpe o cache do Expo
npm start -- --clear

# Ou
npx expo start -c
```

#### Solução 3: Reinstalar Dependências
```bash
# Remova node_modules
rm -rf node_modules

# Reinstale
npm install

# Inicie novamente
npm run dev
```

#### Solução 4: Verificar Supabase
```bash
# Verifique se o .env existe
cat .env

# Deve mostrar:
# EXPO_PUBLIC_SUPABASE_URL=https://...
# EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## Problema: Tela branca / App não carrega

### Causas:
- Erro de JavaScript não capturado
- Problema com imports
- Supabase URL inválida

### Soluções:

1. **Verificar erros no console**
   - F12 → Console
   - Procure por erros

2. **Testar sem autenticação**
   - Comente temporariamente o AuthProvider no `app/_layout.tsx`

3. **Verificar imports**
   - Execute: `npm run typecheck`
   - Corrija erros de TypeScript

## Problema: "Cannot read property of undefined"

### Causa:
- Algum componente está tentando acessar dados antes de estarem disponíveis

### Solução:
```typescript
// Sempre verifique se os dados existem
const { data } = await supabase.from('table').select();

if (!data) {
  console.error('No data returned');
  return;
}

// Agora é seguro usar data
```

## Problema: Botões de navegação não funcionam

### Verificar:

1. **Router está configurado?**
```typescript
// Sempre importe assim:
import { useRouter } from 'expo-router';

// No componente:
const router = useRouter();

// Para navegar:
router.push('/caminho');
```

2. **Rotas existem?**
   - Verifique se o arquivo da rota existe em `app/`
   - Nome correto: `(tabs)/index.tsx` não `tabs/index.tsx`

## Problema: Erro "Module not found"

### Solução:
```bash
# Instale a dependência faltando
npm install [nome-do-modulo]

# Exemplo:
npm install @supabase/supabase-js

# Reinicie o servidor
npm run dev
```

## Problema: Supabase connection failed

### Verificar:

1. **Credenciais corretas no .env**
   ```
   EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

2. **URL é acessível**
   - Abra a URL no navegador
   - Deve mostrar uma página do Supabase

3. **Reiniciar servidor após mudar .env**
   ```bash
   # SEMPRE reinicie após mudar .env
   Ctrl + C
   npm run dev
   ```

## Problema: Erro "Invalid API key"

### Solução:
1. Vá no Supabase Dashboard
2. Settings → API
3. Copie novamente o `anon public` key
4. Cole no `.env`
5. Reinicie o servidor

## Problema: Página 404 / Not Found

### Causa:
- Tentando acessar uma rota que não existe

### Verificar:
```bash
# Liste todos os arquivos em app/
ls -la app/

# Certifique-se que a rota existe
# Exemplo: app/(tabs)/index.tsx para /(tabs)
```

## Problema: Build falha (npm run build:web)

### Soluções:

1. **Verificar erros de TypeScript**
```bash
npm run typecheck
```

2. **Limpar e reconstruir**
```bash
rm -rf .expo
rm -rf dist
npm run build:web
```

3. **Verificar variáveis de ambiente**
   - O build precisa das mesmas variáveis do .env

## Problema: App funciona local mas não na produção

### Verificar:

1. **Variáveis de ambiente**
   - Certifique-se que estão configuradas no serviço de hospedagem
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment

2. **URLs corretas**
   - Use URLs de produção do Supabase
   - Não use localhost

3. **Build de produção**
```bash
# Teste o build localmente
npm run build:web
npx serve dist
```

## Dicas Gerais

### 1. Sempre verifique o console
- F12 no navegador
- Procure erros em vermelho
- Leia as mensagens de erro

### 2. Reinicie após mudanças
- Mudou .env? → Reinicie
- Instalou pacote? → Reinicie
- Mudou configuração? → Reinicie

### 3. Limpe o cache quando estranho
```bash
# Limpe tudo
rm -rf node_modules
rm -rf .expo
npm install
npm run dev
```

### 4. Use TypeScript
```bash
# Sempre rode antes de commitar
npm run typecheck
```

### 5. Teste em navegador privado
- Elimina problemas de cache
- Simula usuário novo

## Ainda com problemas?

### Informações para compartilhar:

1. **Mensagem de erro completa**
   - Screenshot do console
   - Texto do erro

2. **O que estava fazendo**
   - Qual botão clicou
   - Qual tela estava

3. **Ambiente**
   - Navegador e versão
   - Sistema operacional
   - Node version: `node --version`
   - NPM version: `npm --version`

4. **Arquivos de configuração**
   ```bash
   # .env (sem revelar credenciais reais)
   cat .env | sed 's/=.*/=***/'

   # package.json
   cat package.json
   ```

## Comandos Úteis

```bash
# Verificar versões
node --version
npm --version

# Ver logs detalhados
npm run dev -- --verbose

# Limpar tudo
rm -rf node_modules .expo dist
npm install

# Testar TypeScript
npm run typecheck

# Ver erros de lint
npm run lint

# Build de produção
npm run build:web

# Verificar se porta está em uso
lsof -i :8081  # Porta do Metro
lsof -i :19000 # Porta do Expo
```

## Logs Importantes

### Onde encontrar:
- **Console do navegador**: F12 → Console
- **Terminal**: Onde rodou `npm run dev`
- **Expo DevTools**: Abre automaticamente no navegador

### O que procurar:
- ❌ Mensagens de erro (vermelho)
- ⚠️ Warnings (amarelo)
- ℹ️ Info sobre carregamento

## Prevenção

### Antes de desenvolver:
1. ✅ Instale dependências: `npm install`
2. ✅ Configure .env
3. ✅ Teste Supabase connection
4. ✅ Execute typecheck: `npm run typecheck`

### Antes de commit:
1. ✅ Typecheck passa
2. ✅ App funciona local
3. ✅ Sem erros no console
4. ✅ Testou em Chrome e Safari

### Antes de deploy:
1. ✅ Build funciona: `npm run build:web`
2. ✅ Variáveis de ambiente configuradas
3. ✅ Testou em produção similar

---

Se seguir este guia e ainda tiver problemas, há algo mais específico que precisamos investigar. Compartilhe os detalhes acima para diagnóstico.
