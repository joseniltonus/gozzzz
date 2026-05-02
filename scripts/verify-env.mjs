/**
 * Valida variáveis necessárias para desenvolvimento e deploy.
 * Lê `.env` na raiz do projeto se existir (sem dependência extra).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

loadDotEnv(envPath);

const required = ['EXPO_PUBLIC_SUPABASE_URL', 'EXPO_PUBLIC_SUPABASE_ANON_KEY'];
const recommended = ['EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'];

let failed = false;

for (const key of required) {
  const v = process.env[key];
  if (!v || String(v).trim() === '') {
    console.error(`[verify-env] FALTA obrigatório: ${key}`);
    failed = true;
  } else {
    console.log(`[verify-env] OK ${key}`);
  }
}

for (const key of recommended) {
  const v = process.env[key];
  if (!v || String(v).trim() === '') {
    console.warn(`[verify-env] Aviso (pagamentos podem falhar): ${key} não definido`);
  } else {
    console.log(`[verify-env] OK ${key}`);
  }
}

if (process.env.EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS !== undefined) {
  console.log(
    `[verify-env] EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS=${process.env.EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS}`,
  );
}

if (failed) {
  console.error(
    '\n[verify-env] Preenche .env local ou define as variáveis. Para builds de loja/OTA, as mesmas chaves EXPO_PUBLIC_* ' +
      'também precisam existir no Expo (EAS → Environment variables → production). npm run verify:eas-env\n',
  );
  process.exit(1);
}

console.log('\n[verify-env] Variáveis principais OK.\n');
process.exit(0);
