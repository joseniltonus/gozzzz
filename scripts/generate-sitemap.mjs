#!/usr/bin/env node
/**
 * Regenera public/sitemap.xml com lastmod = data atual.
 *
 * Roda automaticamente no `prebuild:web` (antes do `expo export`), então
 * todo deploy Vercel publica um sitemap fresco. Sem isso, o lastmod fica
 * congelado em uma data antiga e o Google trata o conteúdo como stale.
 *
 * Como adicionar uma nova rota: edite o array ROUTES abaixo.
 *
 * Saída esperada:
 *   ✓ sitemap.xml regenerated with lastmod=YYYY-MM-DD (N URLs)
 */

import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

/**
 * @typedef {{ loc: string; changefreq: string; priority: string }} Route
 */

/** @type {Route[]} */
const ROUTES = [
  { loc: 'https://gozzzz.app/web', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://gozzzz.app/web/sono-plus', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://gozzzz.app/web/programa', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://gozzzz.app/web/assinar', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://gozzzz.app/web/coach', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://gozzzz.app/web/sobre', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://gozzzz.app/web/obrigado', changefreq: 'yearly', priority: '0.3' },
];

const urls = ROUTES.map(
  (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`,
).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = resolve(PROJECT_ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');

console.log(`✓ sitemap.xml regenerated with lastmod=${today} (${ROUTES.length} URLs)`);
