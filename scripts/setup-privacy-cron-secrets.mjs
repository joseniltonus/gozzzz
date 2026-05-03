/**
 * Gera PRIVACY_PROCESSOR_SECRET e mostra SUPABASE_PROJECT_REF a partir do .env local.
 * Não grava segredos em ficheiros — só imprime instruções e valores para copiar.
 *
 * 1) Cola os dois valores em GitHub → Settings → Secrets → Actions
 * 2) Define o segredo no projeto Supabase (Edge Function já valida no código)
 *
 * Uso: npm run privacy:setup-cron
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) return;
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

function refFromSupabaseUrl(urlStr) {
  const u = String(urlStr || '').trim();
  if (!u) return '';
  try {
    const host = new URL(u).hostname;
    const sub = host.split('.')[0];
    if (host.endsWith('.supabase.co') && sub) return sub;
  } catch {
    return '';
  }
  return '';
}

loadDotEnv(envPath);

const url = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim();
const projectRef = refFromSupabaseUrl(url);

if (!projectRef) {
  console.error(
    '[privacy:setup-cron] Não encontrei o project ref. Define EXPO_PUBLIC_SUPABASE_URL no .env (ex.: https://abcdefgh.supabase.co).',
  );
  process.exit(1);
}

const privacySecret = crypto.randomBytes(32).toString('hex');

console.log('\n=== Valores para GitHub Actions (Repository secrets) ===\n');
console.log('Nome: SUPABASE_PROJECT_REF');
console.log('Valor:');
console.log(projectRef);
console.log('\nNome: PRIVACY_PROCESSOR_SECRET');
console.log('Valor:');
console.log(privacySecret);
console.log('\n=== Comando Supabase CLI (define o segredo na cloud) ===\n');
console.log(
  `npx supabase secrets set PRIVACY_PROCESSOR_SECRET="${privacySecret}" --project-ref "${projectRef}"`,
);
console.log('\n=== Deploy da função (inclui verify_jwt=false em supabase/config.toml) ===\n');
console.log(`npx supabase functions deploy process-privacy-requests --project-ref "${projectRef}"`);
console.log(
  '\nDepois: GitHub → Settings → Secrets and variables → Actions → New repository secret (os dois nomes acima).\n',
);
