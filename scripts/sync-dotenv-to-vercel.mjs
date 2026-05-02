/**
 * Lê `.env` na raiz, valida Supabase, envia EXPO_PUBLIC_* para a Vercel (Production)
 * e corre `vercel deploy --prod`.
 *
 * A chave anon só existe no painel Supabase (Settings → API). Não pode ser gerada aqui.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`[deploy:vercel] Falta o ficheiro ${path.basename(filePath)} na raiz do projeto.`);
    process.exit(1);
  }
  const text = fs.readFileSync(filePath, 'utf8');
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = val;
  }
}

function isUsableSupabaseUrl(url) {
  const u = String(url || '').trim();
  try {
    const parsed = new URL(u);
    if (parsed.protocol !== 'https:') return false;
    const host = parsed.hostname;
    if (!host.includes('.')) return false;
    if (/^xxxx\./i.test(host) || host === 'xxxx.supabase.co') return false;
    return true;
  } catch {
    return false;
  }
}

function isUsableSupabaseAnonKey(key) {
  const k = String(key || '').trim();
  if (k.length < 120) return false;
  if (k.includes('...')) return false;
  return k.startsWith('eyJ');
}

function vercelEnvSet(name, value, environment) {
  const r = spawnSync('npx', ['vercel', 'env', 'add', name, environment, '--force'], {
    cwd: root,
    input: value,
    encoding: 'utf8',
    stdio: ['pipe', 'inherit', 'inherit'],
    env: { ...process.env },
  });
  if (r.status !== 0) {
    console.error(`[deploy:vercel] Falha ao definir ${name} na Vercel (exit ${r.status}).`);
    process.exit(r.status ?? 1);
  }
}

function main() {
  loadDotEnv(envPath);

  const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || '';
  const anon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';
  const stripe = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || '';

  if (!isUsableSupabaseUrl(url)) {
    console.error(
      '[deploy:vercel] EXPO_PUBLIC_SUPABASE_URL inválida ou em falta. Usa https://<ref>.supabase.co (sem /rest/v1/).',
    );
    process.exit(1);
  }

  if (!isUsableSupabaseAnonKey(anon)) {
    console.error(
      [
        '[deploy:vercel] EXPO_PUBLIC_SUPABASE_ANON_KEY inválida ou ainda é o exemplo (…).',
        '',
        'Passo único (manual): Supabase → Project Settings → API → copia "anon public" COMPLETA para o .env:',
        '  EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ... (sem reticências)',
        '',
        'Guarda o .env e volta a correr:  npm run deploy:vercel',
      ].join('\n'),
    );
    process.exit(1);
  }

  console.log('[deploy:vercel] A enviar variáveis para Vercel (Production)…');
  vercelEnvSet('EXPO_PUBLIC_SUPABASE_URL', url, 'production');
  vercelEnvSet('EXPO_PUBLIC_SUPABASE_ANON_KEY', anon, 'production');

  if (stripe && (stripe.startsWith('pk_live_') || stripe.startsWith('pk_test_')) && stripe.length > 20 && !stripe.includes('...')) {
    vercelEnvSet('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY', stripe, 'production');
  } else if (stripe) {
    console.warn('[deploy:vercel] Stripe key ignorada (inválida ou exemplo).');
  }

  console.log('[deploy:vercel] A fazer deploy de produção…');
  const deploy = spawnSync('npx', ['vercel', 'deploy', '--prod', '--yes'], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env },
  });
  if (deploy.status !== 0) process.exit(deploy.status ?? 1);
  console.log('[deploy:vercel] Concluído.');
}

main();
