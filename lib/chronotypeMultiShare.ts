/**
 * Imagens 9:16 para WhatsApp Status e Instagram Stories (frames 1 e 2).
 * Web: Canvas 2D. Nativo: ver ChronotypeShareCapture + view-shot.
 */

import { Platform, Share, Alert } from 'react-native';
import type { ChronotypeColor } from '@/data/chronotypesExperience';
import type { LocaleChronotypeBlock } from '@/data/chronotypesExperience';
import { drawShareBrandFooterCanvas, SHARE_BRAND_URL_TEXT } from '@/lib/shareBranding';
import { STORY_HEIGHT, STORY_WIDTH } from '@/lib/chronotypeStoryShare';

export type ShareImageVariant = 'whatsapp' | 'instagram1' | 'instagram2';

type CanvasTheme = {
  top: string;
  mid: string;
  bottom: string;
  accent: string;
  text: string;
  muted: string;
};

function canvasTheme(c: ChronotypeColor): CanvasTheme {
  switch (c) {
    case 'blue':
      return {
        top: '#0b1224',
        mid: '#111b32',
        bottom: '#070d18',
        accent: '#7dd3fc',
        text: '#f8fafc',
        muted: 'rgba(148,163,184,0.95)',
      };
    case 'green':
      return {
        top: '#071a14',
        mid: '#0c241c',
        bottom: '#051510',
        accent: '#6ee7b7',
        text: '#f8fafc',
        muted: 'rgba(148,163,184,0.95)',
      };
    case 'orange':
      return {
        top: '#1a0f08',
        mid: '#24160c',
        bottom: '#120a05',
        accent: '#fdba74',
        text: '#fffbeb',
        muted: 'rgba(253,230,138,0.85)',
      };
    case 'purple':
    default:
      return {
        top: '#120818',
        mid: '#1a0f24',
        bottom: '#0a0610',
        accent: '#d8b4fe',
        text: '#faf5ff',
        muted: 'rgba(216,180,254,0.75)',
      };
  }
}

function wrapCanvasText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = w;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function fillGradient(ctx: CanvasRenderingContext2D, t: CanvasTheme) {
  const grd = ctx.createLinearGradient(0, 0, STORY_WIDTH, STORY_HEIGHT);
  grd.addColorStop(0, t.top);
  grd.addColorStop(0.45, t.mid);
  grd.addColorStop(1, t.bottom);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);
}

function canvasToObjectUrl(canvas: HTMLCanvasElement): Promise<string | null> {
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          resolve(null);
          return;
        }
        resolve(URL.createObjectURL(blob));
      },
      'image/png',
      1,
    );
  });
}

export async function generateShareImageWeb(
  block: LocaleChronotypeBlock,
  variant: ShareImageVariant,
  locale: 'pt' | 'en',
): Promise<string | null> {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const t = canvasTheme(block.color);
  fillGradient(ctx, t);
  ctx.textAlign = 'left';

  const pad = 72;
  const maxW = STORY_WIDTH - pad * 2;
  let y = 200;

  if (variant === 'whatsapp') {
    ctx.fillStyle = t.text;
    ctx.font = '120px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(block.emoji, STORY_WIDTH / 2, y);
    y += 100;
    ctx.fillStyle = t.accent;
    ctx.font = '700 36px system-ui, -apple-system, sans-serif';
    for (const ln of wrapCanvasText(ctx, block.name, maxW)) {
      ctx.fillText(ln, STORY_WIDTH / 2, y);
      y += 46;
    }
    y += 16;
    ctx.fillStyle = t.muted;
    ctx.font = '500 34px system-ui, -apple-system, sans-serif';
    for (const line of wrapCanvasText(ctx, block.story.short, maxW)) {
      ctx.fillText(line, STORY_WIDTH / 2, y);
      y += 48;
    }
    ctx.textAlign = 'left';
    drawShareBrandFooterCanvas(ctx, {
      canvasWidth: STORY_WIDTH,
      canvasHeight: STORY_HEIGHT,
      accentColor: t.accent,
      align: 'center',
    });
    return canvasToObjectUrl(canvas);
  }

  if (variant === 'instagram1') {
    const headline = locale === 'pt' ? `Eu sou ${block.name}` : `I'm ${block.name}`;
    ctx.fillStyle = t.text;
    ctx.font = '700 48px system-ui, -apple-system, sans-serif';
    for (const ln of wrapCanvasText(ctx, headline, maxW)) {
      ctx.fillText(ln, pad, y);
      y += 58;
    }
    y += 36;
    ctx.fillStyle = t.muted;
    ctx.font = '500 40px system-ui, -apple-system, sans-serif';
    for (const ln of wrapCanvasText(ctx, block.story.short, maxW)) {
      ctx.fillText(ln, pad, y);
      y += 50;
    }
    drawShareBrandFooterCanvas(ctx, {
      canvasWidth: STORY_WIDTH,
      canvasHeight: STORY_HEIGHT,
      accentColor: t.accent,
      align: 'center',
    });
    return canvasToObjectUrl(canvas);
  }

  /* instagram2 */
  ctx.fillStyle = t.muted;
  ctx.font = '500 40px system-ui, -apple-system, sans-serif';
  for (const ln of wrapCanvasText(ctx, block.story.curiosity, maxW)) {
    ctx.fillText(ln, pad, y);
    y += 50;
  }
  y += 60;
  ctx.fillStyle = t.accent;
  ctx.font = '600 36px system-ui, -apple-system, sans-serif';
  const cta =
    locale === 'pt'
      ? `Descubra o seu → ${SHARE_BRAND_URL_TEXT}`
      : `Find yours → ${SHARE_BRAND_URL_TEXT}`;
  for (const ln of wrapCanvasText(ctx, cta, maxW)) {
    ctx.fillText(ln, pad, y);
    y += 48;
  }
  drawShareBrandFooterCanvas(ctx, {
    canvasWidth: STORY_WIDTH,
    canvasHeight: STORY_HEIGHT,
    accentColor: t.accent,
    bottomPx: STORY_HEIGHT - 90,
    align: 'center',
  });
  return canvasToObjectUrl(canvas);
}

export async function generateShareImage(
  block: LocaleChronotypeBlock,
  variant: ShareImageVariant,
  locale: 'pt' | 'en',
  viewRef: import('react').RefObject<import('react-native').View | null>,
): Promise<string | undefined> {
  if (Platform.OS === 'web') {
    const url = await generateShareImageWeb(block, variant, locale);
    return url ?? undefined;
  }
  const { generateStoryImageFromRef } = await import('@/lib/chronotypeStoryShare');
  return generateStoryImageFromRef(viewRef);
}

export async function shareTikTokScript(script: string, locale: 'pt' | 'en' = 'pt'): Promise<void> {
  if (Platform.OS === 'web' && typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(script);
      Alert.alert('GoZzzz', locale === 'pt' ? 'Roteiro copiado.' : 'Script copied.');
      return;
    } catch {
      // fall through
    }
  }
  try {
    await Share.share({ message: script, title: 'GoZzzz — TikTok' });
  } catch {
    /* user dismissed */
  }
}
