/**
 * Prepara `dist/` para `vercel deploy` a partir da pasta estática (CI).
 * O CLI da Vercel não envia ficheiros em `.gitignore` — `dist/` é ignorado,
 * por isso um `vercel deploy` na raiz faz rebuild na nuvem sem as env do GitHub.
 *
 * Uso (CI): node scripts/prepare-vercel-dist-deploy.mjs
 * Saída: dist/vercel.json (só rotas/headers), dist/.vercel/project.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const rootVercel = path.join(root, 'vercel.json');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error('[prepare-vercel-dist] dist/index.html não existe. Correr npm run build:web primeiro.');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(rootVercel, 'utf8'));
const slim = { ...raw };
delete slim.buildCommand;
delete slim.installCommand;
delete slim.outputDirectory;

// HTML não deve ficar preso em CDN antiga após cada deploy
slim.headers = [
  ...(Array.isArray(slim.headers) ? slim.headers : []),
  {
    source: '/:path*.html',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
  },
  {
    source: '/index.html',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
  },
];

fs.writeFileSync(path.join(dist, 'vercel.json'), JSON.stringify(slim, null, 2));

const projectId = process.env.VERCEL_PROJECT_ID?.trim();
if (!projectId) {
  console.error('[prepare-vercel-dist] VERCEL_PROJECT_ID em falta.');
  process.exit(1);
}

const orgId = process.env.VERCEL_ORG_ID?.trim();
const project = orgId ? { projectId, orgId } : { projectId };
const vercelDir = path.join(dist, '.vercel');
fs.mkdirSync(vercelDir, { recursive: true });
fs.writeFileSync(path.join(vercelDir, 'project.json'), JSON.stringify(project, null, 2));

console.log('[prepare-vercel-dist] OK — dist pronto para vercel deploy (upload do export estático).');
