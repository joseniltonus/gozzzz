import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const projectJsonPath = path.join(root, '.vercel', 'project.json');

if (!fs.existsSync(projectJsonPath)) {
  console.error(
    [
      '[vercel:ids] Não encontrei .vercel/project.json.',
      '',
      'Faça uma vez no seu Mac (na pasta do projeto):',
      '  npx vercel link',
      '',
      'Depois rode de novo:',
      '  npm run vercel:print-ci-ids',
      '',
      'Isso gera os IDs corretos para colar em:',
      '  VERCEL_ORG_ID',
      '  VERCEL_PROJECT_ID',
    ].join('\n'),
  );
  process.exit(1);
}

const raw = fs.readFileSync(projectJsonPath, 'utf8');
const parsed = JSON.parse(raw);
const orgId = parsed.orgId;
const projectId = parsed.projectId;

if (!orgId || !projectId) {
  console.error('[vercel:ids] project.json sem orgId/projectId. Rode `npx vercel link` novamente.');
  process.exit(1);
}

console.log('[vercel:ids] Copie estes valores para GitHub Actions → Repository secrets:\n');
console.log(`VERCEL_ORG_ID=${orgId}`);
console.log(`VERCEL_PROJECT_ID=${projectId}`);
console.log('\n[vercel:ids] Dica: o token continua em VERCEL_TOKEN (Vercel → Account tokens).');
