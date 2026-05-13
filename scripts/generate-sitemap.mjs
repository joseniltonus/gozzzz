#!/usr/bin/env node
/**
 * Regenera public/sitemap.xml com lastmod = data atual.
 *
 * Roda automaticamente no `prebuild:web` (antes do `expo export`), então
 * todo deploy Vercel publica um sitemap fresco. Sem isso, o lastmod fica
 * congelado em uma data antiga e o Google trata o conteúdo como stale.
 *
 * Cobre rotas estáticas (ROUTES) + posts do blog (lê data/posts.ts via
 * regex simples — evita rodar TS no script). Cada post entra com
 * lastmod = updatedAt do post.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..');
const today = new Date().toISOString().slice(0, 10);

/** @type {{ loc: string; changefreq: string; priority: string; lastmod?: string }[]} */
const ROUTES = [
  { loc: 'https://gozzzz.app/web', changefreq: 'weekly', priority: '1.0' },
  { loc: 'https://gozzzz.app/sono', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://gozzzz.app/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: 'https://gozzzz.app/web/programa', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://gozzzz.app/web/assinar', changefreq: 'weekly', priority: '0.9' },
  { loc: 'https://gozzzz.app/web/coach', changefreq: 'monthly', priority: '0.8' },
  { loc: 'https://gozzzz.app/web/sobre', changefreq: 'monthly', priority: '0.7' },
  { loc: 'https://gozzzz.app/web/obrigado', changefreq: 'yearly', priority: '0.3' },
];

/**
 * Extrai posts do blog parseando data/posts.ts via regex (slug + updatedAt).
 * É frágil de propósito: se a estrutura mudar, melhor falhar visivelmente
 * do que gerar sitemap silenciosamente errado.
 */
function readBlogPosts() {
  const path = resolve(PROJECT_ROOT, 'data/posts.ts');
  const src = readFileSync(path, 'utf8');
  const posts = [];
  const regex = /slug:\s*'([^']+)'[\s\S]*?updatedAt:\s*'([^']+)'/g;
  let match;
  while ((match = regex.exec(src)) !== null) {
    posts.push({ slug: match[1], updatedAt: match[2] });
  }
  return posts;
}

const blogPosts = readBlogPosts();
for (const p of blogPosts) {
  ROUTES.push({
    loc: `https://gozzzz.app/blog/${p.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: p.updatedAt,
  });
}

const urls = ROUTES.map(
  (r) => `  <url>
    <loc>${r.loc}</loc>
    <lastmod>${r.lastmod ?? today}</lastmod>
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

console.log(
  `✓ sitemap.xml regenerated · ${ROUTES.length} URLs (${blogPosts.length} posts) · lastmod default ${today}`,
);
