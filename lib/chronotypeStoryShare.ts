/**
 * Gera imagem 9:16 (1080×1920) para Instagram Stories e partilha / descarga.
 * Web: Canvas 2D (sem dependência nativa).
 * iOS/Android: react-native-view-shot sobre uma View já montada com o layout do story.
 */

import { Platform, Share, Alert } from 'react-native';
import type { RefObject } from 'react';
import type { View } from 'react-native';
import type { ChronotypeIntel, ChronotypeKey } from '@/data/chronotypesIntelligence';
import { chronotypes } from '@/data/chronotypesIntelligence';

export const STORY_WIDTH = 1080;
export const STORY_HEIGHT = 1920;

type CanvasTheme = {
  top: string;
  mid: string;
  bottom: string;
  accent: string;
  text: string;
  muted: string;
};

function canvasThemeForProfile(c: ChronotypeIntel['color']): CanvasTheme {
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

/**
 * Gera PNG (object URL) no browser a partir do perfil atual.
 */
export async function generateStoryImageWeb(intel: ChronotypeIntel): Promise<string | null> {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = STORY_WIDTH;
  canvas.height = STORY_HEIGHT;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const t = canvasThemeForProfile(intel.color);
  const grd = ctx.createLinearGradient(0, 0, STORY_WIDTH, STORY_HEIGHT);
  grd.addColorStop(0, t.top);
  grd.addColorStop(0.45, t.mid);
  grd.addColorStop(1, t.bottom);
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, STORY_WIDTH, STORY_HEIGHT);

  ctx.strokeStyle = t.accent;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 2;
  ctx.strokeRect(48, 120, STORY_WIDTH - 96, STORY_HEIGHT - 240);
  ctx.globalAlpha = 1;

  const { story } = intel;
  ctx.fillStyle = t.text;
  ctx.font = '600 52px system-ui, -apple-system, sans-serif';
  const titleLines = wrapCanvasText(ctx, story.title, STORY_WIDTH - 120);
  let y = 220;
  for (const ln of titleLines) {
    ctx.fillText(ln, 72, y);
    y += 64;
  }

  ctx.fillStyle = t.muted;
  ctx.font = '500 40px system-ui, -apple-system, sans-serif';
  y += 40;
  for (const ln of wrapCanvasText(ctx, story.line1, STORY_WIDTH - 120)) {
    ctx.fillText(ln, 72, y);
    y += 52;
  }
  y += 24;
  for (const ln of wrapCanvasText(ctx, story.line2, STORY_WIDTH - 120)) {
    ctx.fillText(ln, 72, y);
    y += 52;
  }

  ctx.fillStyle = t.accent;
  ctx.font = '700 36px system-ui, -apple-system, sans-serif';
  ctx.fillText('gozzzz.app', 72, STORY_HEIGHT - 120);

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

/**
 * Nativo: captura a View de story (já com 1080×1920 lógico) em ficheiro temporário.
 */
export async function generateStoryImageFromRef(viewRef: RefObject<View | null>): Promise<string | undefined> {
  if (Platform.OS === 'web') return undefined;
  if (!viewRef.current) return undefined;
  try {
    const { captureRef } = await import('react-native-view-shot');
    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
      width: STORY_WIDTH,
      height: STORY_HEIGHT,
    });
    return typeof uri === 'string' ? uri : undefined;
  } catch (e) {
    console.warn('[chronotypeStoryShare] captureRef failed', e);
    return undefined;
  }
}

/**
 * Partilha ficheiro PNG (Stories / sistema) ou descarrega na web.
 */
export async function handleShare(uri: string, opts?: { dialogTitle?: string }): Promise<void> {
  const title = opts?.dialogTitle ?? 'GoZzzz — Stories';

  if (Platform.OS === 'web') {
    const isBlob = uri.startsWith('blob:');
    try {
      const res = await fetch(uri);
      const blob = await res.blob();
      const file = new File([blob], 'gozzzz-story.png', { type: 'image/png' });
      const wNav = navigator as Navigator & {
        canShare?: (data: ShareData) => boolean;
        share?: (data: ShareData) => Promise<void>;
      };
      const shareFn = wNav.share;
      const canShareFn = wNav.canShare;
      let canFiles = false;
      try {
        canFiles =
          typeof shareFn === 'function' &&
          typeof canShareFn === 'function' &&
          canShareFn.call(wNav, { files: [file] });
      } catch {
        canFiles = false;
      }
      if (canFiles && typeof shareFn === 'function') {
        await shareFn.call(wNav, { files: [file], title });
        if (isBlob) URL.revokeObjectURL(uri);
        return;
      }
      const a = document.createElement('a');
      a.href = uri;
      a.download = 'gozzzz-story.png';
      a.click();
      if (isBlob) {
        setTimeout(() => URL.revokeObjectURL(uri), 4000);
      }
    } catch {
      Alert.alert('Partilha', 'Não foi possível partilhar. Tente descarregar a imagem.');
      if (isBlob) URL.revokeObjectURL(uri);
    }
    return;
  }

  try {
    const Sharing = await import('expo-sharing');
    const can = await Sharing.isAvailableAsync();
    if (can) {
      await Sharing.shareAsync(uri, {
        mimeType: 'image/png',
        dialogTitle: title,
        UTI: 'public.png',
      });
      return;
    }
  } catch {
    // fall through
  }

  try {
    await Share.share({ url: uri, title });
  } catch {
    Alert.alert('Partilha', 'Abra a imagem guardada e escolha Instagram → Stories.');
  }
}

export async function generateStoryImage(
  chronotypeKey: ChronotypeKey,
  viewRef: RefObject<View | null>,
): Promise<string | undefined> {
  const intel = chronotypes[chronotypeKey];
  if (Platform.OS === 'web') {
    const url = await generateStoryImageWeb(intel);
    return url ?? undefined;
  }
  return generateStoryImageFromRef(viewRef);
}
