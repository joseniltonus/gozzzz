/**
 * Validates Vercel token + project access. Tries team scope first, then personal (no teamId).
 * Writes .vercel/project.json for the Vercel CLI when successful.
 *
 * Env:
 *   VERCEL_TOKEN (required)
 *   VERCEL_PROJECT_ID (required)
 *   VERCEL_ORG_ID (optional — team or user id from dashboard / vercel link)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const token = process.env.VERCEL_TOKEN?.trim();
const orgIdRaw = process.env.VERCEL_ORG_ID?.trim();
const projectId = process.env.VERCEL_PROJECT_ID?.trim();

function mask(s) {
  if (!s || s.length < 8) return '(too short)';
  return `${s.slice(0, 4)}…${s.slice(-4)} (${s.length} chars)`;
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = { raw: text.slice(0, 500) };
  }
  return { res, body };
}

if (!token || !projectId) {
  console.error('[vercel:verify] Missing env: VERCEL_TOKEN or VERCEL_PROJECT_ID');
  process.exit(1);
}

// 1) Ping token
const who = await fetchJson('https://api.vercel.com/v2/user');
if (!who.res.ok) {
  console.error('[vercel:verify] Invalid or unauthorized VERCEL_TOKEN');
  console.error(`  HTTP ${who.res.status}`);
  if (who.body?.error?.message) console.error(`  message: ${who.body.error.message}`);
  process.exit(1);
}

let resolvedOrgId = orgIdRaw || '';
let projectBody;
let mode = 'unknown';

// 2) If org id provided, try team-scoped lookup
if (resolvedOrgId) {
  const scoped = await fetchJson(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}?teamId=${encodeURIComponent(resolvedOrgId)}`,
  );
  if (scoped.res.ok) {
    projectBody = scoped.body;
    mode = 'teamId';
  }
}

// 3) Fallback: personal account / wrong teamId — lookup without teamId
if (!projectBody) {
  const plain = await fetchJson(`https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}`);
  if (!plain.res.ok) {
    console.error('[vercel:verify] Project not found with this token.');
    console.error(`  projectId: ${mask(projectId)}`);
    if (resolvedOrgId) console.error(`  tried teamId: ${mask(resolvedOrgId)} → HTTP (see above) and no-team lookup → HTTP ${plain.res.status}`);
    else console.error(`  no-team lookup → HTTP ${plain.res.status}`);
    if (plain.body?.error?.message) console.error(`  message: ${plain.body.error.message}`);
    console.error('');
    console.error('Common fixes:');
    console.error('- Run locally: npx vercel link && npm run vercel:print-ci-ids');
    console.error('- Ensure VERCEL_TOKEN is from the SAME Vercel user that owns the project');
    console.error('- For Hobby/personal projects, try leaving VERCEL_ORG_ID empty in GitHub secrets');
    process.exit(1);
  }
  projectBody = plain.body;
  mode = projectBody?.teamId ? 'team-from-project' : 'personal';
  if (projectBody?.teamId) {
    resolvedOrgId = projectBody.teamId;
  } else if (projectBody?.accountId) {
    resolvedOrgId = projectBody.accountId;
  } else {
    resolvedOrgId = orgIdRaw || '';
  }
}

const vercelDir = path.join(root, '.vercel');
fs.mkdirSync(vercelDir, { recursive: true });
const projectJson = {
  projectId,
  orgId: resolvedOrgId,
};
fs.writeFileSync(path.join(vercelDir, 'project.json'), `${JSON.stringify(projectJson, null, 2)}\n`, 'utf8');

console.log('[vercel:verify] OK');
console.log(`  mode: ${mode}`);
console.log(`  project: ${projectBody?.name ?? '(unknown)'}`);
console.log(`  projectId: ${mask(projectId)}`);
console.log(`  orgId used: ${resolvedOrgId ? mask(resolvedOrgId) : '(empty)'}`);
console.log(`  wrote: .vercel/project.json`);
