/**
 * Validates Vercel token + org/project pair via REST API (no secrets printed).
 * Env: VERCEL_TOKEN, VERCEL_ORG_ID (team or user id), VERCEL_PROJECT_ID
 */
const token = process.env.VERCEL_TOKEN?.trim();
const orgId = process.env.VERCEL_ORG_ID?.trim();
const projectId = process.env.VERCEL_PROJECT_ID?.trim();

function mask(s) {
  if (!s || s.length < 8) return '(too short)';
  return `${s.slice(0, 4)}…${s.slice(-4)} (${s.length} chars)`;
}

if (!token || !orgId || !projectId) {
  console.error('[vercel:verify] Missing env: VERCEL_TOKEN, VERCEL_ORG_ID, or VERCEL_PROJECT_ID');
  process.exit(1);
}

const url = `https://api.vercel.com/v9/projects/${encodeURIComponent(projectId)}?teamId=${encodeURIComponent(orgId)}`;

const res = await fetch(url, {
  headers: { Authorization: `Bearer ${token}` },
});

const text = await res.text();
let body;
try {
  body = JSON.parse(text);
} catch {
  body = { raw: text.slice(0, 500) };
}

if (!res.ok) {
  console.error('[vercel:verify] Vercel API error');
  console.error(`  HTTP ${res.status}`);
  console.error(`  orgId: ${mask(orgId)}`);
  console.error(`  projectId: ${mask(projectId)}`);
  if (body?.error?.message) console.error(`  message: ${body.error.message}`);
  else console.error(`  body: ${JSON.stringify(body).slice(0, 800)}`);
  console.error('');
  console.error('Fix: run locally `npx vercel link` then `npm run vercel:print-ci-ids` and paste BOTH values again.');
  console.error('Also ensure VERCEL_TOKEN was created on the SAME Vercel account/team that owns the project.');
  process.exit(1);
}

console.log('[vercel:verify] OK — project exists for this org + token.');
console.log(`  name: ${body?.name ?? '(unknown)'}`);
console.log(`  id: ${mask(projectId)}`);
