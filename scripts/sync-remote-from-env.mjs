/**
 * Sincroniza configuração remota a partir do `.env` local (não commitado).
 *
 * O que faz (por ordem):
 *  A) GitHub Actions — `gh secret set` (Supabase público, ref, privacidade, tokens se existirem no .env)
 *  B) Supabase — `supabase secrets set PRIVACY_PROCESSOR_SECRET` + deploy de `process-privacy-requests` (Edge Functions)
 *  C) Expo EAS — `eas env:create --force` para ambiente production (EXPO_PUBLIC_*)
 *
 * Pré-requisitos (uma vez no Mac):
 *  1) brew install gh && gh auth login   (permissão para alterar secrets do repo)
 *  2) Token Supabase: https://supabase.com/dashboard/account/tokens
 *     → cola no .env: SUPABASE_ACCESS_TOKEN=sbp_...
 *  3) Token Expo: https://expo.dev/settings/access-tokens
 *     → cola no .env: EXPO_TOKEN=...   (serve para EAS e para o secret EXPO_TOKEN no GitHub)
 *  4) Opcional no .env (para o CI da Vercel): VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID
 *  5) PRIVACY_PROCESSOR_SECRET no .env — opcional; se faltar, gera-se um novo e usa-se em todo o lado
 *
 * Uso (na raiz do repo):
 *   npm run sync:remote
 *
 * Não imprime valores de segredos no log (só confirmações).
 */
import crypto from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`[sync:remote] Falta ${path.basename(filePath)} na raiz.`);
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

function githubRepoFromGit() {
  const u = execFileSync('git', ['-C', root, 'remote', 'get-url', 'origin'], {
    encoding: 'utf8',
  }).trim();
  const m = u.match(/github\.com[/:]([\w.-]+)\/([\w.-]+?)(?:\.git)?$/i);
  if (!m) throw new Error(`origin não aponta para github.com: ${u}`);
  return `${m[1]}/${m[2]}`;
}

function ghSecretSet(name, value) {
  const repo = githubRepoFromGit();
  const r = spawnSync('gh', ['secret', 'set', name, '--repo', repo], {
    cwd: root,
    input: String(value),
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
  });
  if (r.status !== 0) {
    const err = (r.stderr || r.stdout || '').toString().trim();
    throw new Error(`gh secret set ${name}: ${err || `exit ${r.status}`}`);
  }
  console.log(`[sync:remote] GitHub secret OK: ${name}`);
}

function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'pipe'],
    ...opts,
  });
  const out = `${r.stdout || ''}${r.stderr || ''}`.trim();
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(' ')} → exit ${r.status}\n${out}`);
  }
  return out;
}

function readExpoProjectId() {
  try {
    const appJson = JSON.parse(fs.readFileSync(path.join(root, 'app.json'), 'utf8'));
    return appJson?.expo?.extra?.eas?.projectId || '';
  } catch {
    return '';
  }
}

function main() {
  loadDotEnv(envPath);

  const expoProjectId = readExpoProjectId();
  const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL?.trim() || '';
  const supabaseAnon = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY?.trim() || '';
  const stripe = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim() || '';
  const projectRef = refFromSupabaseUrl(supabaseUrl);

  if (!projectRef || !supabaseUrl.startsWith('https://') || !supabaseAnon.startsWith('eyJ')) {
    console.error('[sync:remote] Preenche no .env: EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY válidos.');
    process.exit(1);
  }

  let privacySecret = (process.env.PRIVACY_PROCESSOR_SECRET || '').trim();
  if (!privacySecret || privacySecret.length < 24) {
    privacySecret = crypto.randomBytes(32).toString('hex');
    console.log(
      '[sync:remote] Gerado novo PRIVACY_PROCESSOR_SECRET (não estava no .env). Adiciona ao .env para manteres o mesmo nas próximas vezes:\n' +
        `  PRIVACY_PROCESSOR_SECRET=${privacySecret}\n`,
    );
  }

  const supabaseAccess = (process.env.SUPABASE_ACCESS_TOKEN || '').trim();
  const expoToken = (process.env.EXPO_TOKEN || '').trim();
  const vercelToken = (process.env.VERCEL_TOKEN || '').trim();
  const vercelProjectId = (process.env.VERCEL_PROJECT_ID || '').trim();
  const vercelOrgId = (process.env.VERCEL_ORG_ID || '').trim();

  console.log('[sync:remote] Repo GitHub:', githubRepoFromGit());
  console.log('[sync:remote] SUPABASE_PROJECT_REF:', projectRef);

  // --- A) GitHub ---
  try {
    run('gh', ['auth', 'status'], { stdio: ['pipe', 'inherit', 'inherit'] });
  } catch {
    console.error(
      '[sync:remote] Instala e autentica o GitHub CLI:\n  brew install gh\n  gh auth login\n',
    );
    process.exit(1);
  }

  try {
    ghSecretSet('SUPABASE_PROJECT_REF', projectRef);
    ghSecretSet('PRIVACY_PROCESSOR_SECRET', privacySecret);
    ghSecretSet('EXPO_PUBLIC_SUPABASE_URL', supabaseUrl);
    ghSecretSet('EXPO_PUBLIC_SUPABASE_ANON_KEY', supabaseAnon);
    if (stripe && stripe.length > 12 && !stripe.includes('...')) {
      ghSecretSet('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY', stripe);
    }
    if (expoToken) {
      ghSecretSet('EXPO_TOKEN', expoToken);
    } else {
      console.warn('[sync:remote] Sem EXPO_TOKEN no .env — secret EXPO_TOKEN no GitHub não foi atualizado.');
    }
    if (vercelToken) ghSecretSet('VERCEL_TOKEN', vercelToken);
    if (vercelProjectId) ghSecretSet('VERCEL_PROJECT_ID', vercelProjectId);
    if (vercelOrgId) ghSecretSet('VERCEL_ORG_ID', vercelOrgId);
  } catch (e) {
    console.error('[sync:remote] Falha ao definir secrets no GitHub:', e.message || e);
    process.exit(1);
  }

  // --- B) Supabase Edge secret ---
  if (!supabaseAccess) {
    console.warn(
      '[sync:remote] Sem SUPABASE_ACCESS_TOKEN no .env — salta Supabase CLI. Cria em:\n  https://supabase.com/dashboard/account/tokens\n',
    );
  } else {
    try {
      run(
        'npx',
        [
          '-y',
          'supabase',
          'secrets',
          'set',
          `PRIVACY_PROCESSOR_SECRET=${privacySecret}`,
          '--project-ref',
          projectRef,
        ],
        {
          env: { ...process.env, SUPABASE_ACCESS_TOKEN: supabaseAccess },
          stdio: ['pipe', 'inherit', 'inherit'],
        },
      );
      console.log('[sync:remote] Supabase: PRIVACY_PROCESSOR_SECRET definido no projeto.');
      try {
        run(
          'npx',
          ['-y', 'supabase', 'functions', 'deploy', 'process-privacy-requests', '--project-ref', projectRef],
          {
            env: { ...process.env, SUPABASE_ACCESS_TOKEN: supabaseAccess },
            stdio: ['pipe', 'inherit', 'inherit'],
          },
        );
        console.log('[sync:remote] Supabase: função process-privacy-requests deployada.');
      } catch (e2) {
        console.warn(
          '[sync:remote] Deploy da função falhou (ignora se já estiver atualizada ou sem permissão):',
          e2.message || e2,
        );
      }
    } catch (e) {
      console.error('[sync:remote] Falha Supabase secrets:', e.message || e);
      process.exit(1);
    }
  }

  // --- C) EAS production env ---
  if (!expoToken) {
    console.warn(
      '[sync:remote] Sem EXPO_TOKEN no .env — salta EAS. Cria em:\n  https://expo.dev/settings/access-tokens\n',
    );
  } else {
    const easBin = path.join(root, 'node_modules', '.bin', 'eas');
    const eas = fs.existsSync(easBin) ? easBin : 'npx';
    const easArgsPrefix = fs.existsSync(easBin) ? [] : ['eas-cli'];

    const pushEas = (name, value, visibility) => {
      const args = [
        ...easArgsPrefix,
        'env:create',
        '--name',
        name,
        '--value',
        value,
        '--environment',
        'production',
        '--force',
        '--non-interactive',
        '--visibility',
        visibility,
      ];
      run(eas, args, {
        env: { ...process.env, EXPO_TOKEN: expoToken },
        stdio: ['pipe', 'inherit', 'inherit'],
      });
      console.log(`[sync:remote] EAS production OK: ${name}`);
    };

    try {
      pushEas('EXPO_PUBLIC_SUPABASE_URL', supabaseUrl, 'sensitive');
      pushEas('EXPO_PUBLIC_SUPABASE_ANON_KEY', supabaseAnon, 'sensitive');
      if (stripe && stripe.length > 12 && !stripe.includes('...')) {
        pushEas('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY', stripe, 'sensitive');
      }
    } catch (e) {
      console.error('[sync:remote] Falha EAS env:', e.message || e);
      process.exit(1);
    }
  }

  console.log('\n[sync:remote] Concluído.');
  console.log('  GitHub secrets: https://github.com/' + githubRepoFromGit() + '/settings/secrets/actions');
  console.log(
    '  Supabase Edge secrets: https://supabase.com/dashboard/project/' + projectRef + '/functions/secrets',
  );
  if (expoProjectId) {
    console.log('  Expo (EAS): https://expo.dev/projects/' + expoProjectId);
  }
}

main();
