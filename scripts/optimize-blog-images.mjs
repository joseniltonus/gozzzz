/**
 * Comprime ilustrações do blog em WebP otimizado + gera thumbnails.
 *
 * Lê PNGs de `public/blog/` (ou `assets-source/blog/` se existir) e escreve:
 *   - <slug>.webp        (1200px wide, q82)  — hero do artigo
 *   - <slug>@thumb.webp  (600px wide, q80)   — card do índice
 *
 * Idempotente: se não houver PNG fonte, sai sem erro (assume que os webp
 * gerados já estão commitados — caso normal em CI). Pra regenerar:
 *   1) Coloque os PNGs originais em `public/blog/` ou `assets-source/blog/`
 *   2) Rode `npm run blog:optimize-images`
 *   3) Comite os .webp (PNGs podem ser apagados/gitignored).
 */

import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public', 'blog');
const ASSET_SRC = join(__dirname, '..', 'assets-source', 'blog');

// Prioridade: assets-source (não commitado) > public/blog (PNGs legados).
const DIR = existsSync(ASSET_SRC) ? ASSET_SRC : PUBLIC_DIR;
const OUT_DIR = PUBLIC_DIR;

const QUALITY_HERO = 82;
const QUALITY_THUMB = 80;
const WIDTH_HERO = 1200; // 1.5x a largura do conteúdo (720px) → nítido em retina
const WIDTH_THUMB = 600; // 1.5x do card (~360-400px) → nítido em retina

const files = existsSync(DIR) ? readdirSync(DIR).filter((f) => f.endsWith('.png')) : [];

if (!files.length) {
  console.log(
    `ℹ Nenhum PNG fonte em ${DIR} — pulando otimização (assumindo que os .webp já estão prontos em public/blog/).`,
  );
  process.exit(0);
}

let totalIn = 0;
let totalOut = 0;

for (const file of files) {
  const inPath = join(DIR, file);
  const slug = basename(file, '.png');
  const heroOut = join(OUT_DIR, `${slug}.webp`);
  const thumbOut = join(OUT_DIR, `${slug}@thumb.webp`);

  const inSize = statSync(inPath).size;
  totalIn += inSize;

  await sharp(inPath)
    .resize({ width: WIDTH_HERO, withoutEnlargement: true })
    .webp({ quality: QUALITY_HERO, effort: 6 })
    .toFile(heroOut);

  await sharp(inPath)
    .resize({ width: WIDTH_THUMB, withoutEnlargement: true })
    .webp({ quality: QUALITY_THUMB, effort: 6 })
    .toFile(thumbOut);

  const heroSize = statSync(heroOut).size;
  const thumbSize = statSync(thumbOut).size;
  totalOut += heroSize + thumbSize;

  const reduction = ((1 - heroSize / inSize) * 100).toFixed(1);
  console.log(
    `✓ ${slug}: ${(inSize / 1024).toFixed(0)} KB → ${(heroSize / 1024).toFixed(0)} KB (-${reduction}%)  ·  thumb ${(thumbSize / 1024).toFixed(0)} KB`,
  );
}

const totalReduction = ((1 - totalOut / totalIn) * 100).toFixed(1);
console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(1)} MB → ${(totalOut / 1024 / 1024).toFixed(1)} MB  (-${totalReduction}%)`,
);
console.log(
  `${files.length} hero (.webp) + ${files.length} thumb (@thumb.webp) gerados.`,
);
