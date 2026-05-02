/**
 * Ensures EAS-hosted environment variables exist for store / OTA builds.
 * GitHub Actions env is NOT passed to EAS Build workers — vars must live on Expo.
 *
 * @see https://docs.expo.dev/eas/environment-variables/faq/
 *
 * Env: EXPO_TOKEN (required)
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const REQUIRED = ['EXPO_PUBLIC_SUPABASE_URL', 'EXPO_PUBLIC_SUPABASE_ANON_KEY'];
const STRIPE = 'EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY';

function easBin() {
  const local = path.join(root, 'node_modules', '.bin', 'eas');
  if (fs.existsSync(local)) return local;
  return null;
}

function easEnvGet(variableName) {
  const bin = easBin();
  const args = [
    'env:get',
    'production',
    '--variable-name',
    variableName,
    '--non-interactive',
    '--format',
    'short',
  ];
  if (bin) {
    execFileSync(bin, args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
    return;
  }
  execFileSync('npx', ['eas-cli', ...args], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

if (!process.env.EXPO_TOKEN?.trim()) {
  console.error('[verify:eas-env] Defina EXPO_TOKEN (token em https://expo.dev/settings/access-tokens ).');
  process.exit(1);
}

let failed = false;

for (const key of REQUIRED) {
  try {
    easEnvGet(key);
    console.log(`[verify:eas-env] OK ${key}`);
  } catch {
    console.error(`[verify:eas-env] FALTA no EAS (production): ${key}`);
    failed = true;
  }
}

try {
  easEnvGet(STRIPE);
  console.log(`[verify:eas-env] OK ${STRIPE}`);
} catch {
  console.warn(
    `[verify:eas-env] Aviso: ${STRIPE} não está no EAS production — pagamentos na loja podem falhar.`,
  );
}

if (failed) {
  console.error(
    '\nCrie as variáveis no Expo: https://expo.dev → projeto → Environment variables → environment "production".\n' +
      'Documentação: https://docs.expo.dev/eas/environment-variables/\n',
  );
  process.exit(1);
}

console.log('\n[verify:eas-env] Ambiente EAS production OK para build/OTA.\n');
