/**
 * Regra de marca em partilhas: gozzzz.app (ou GoZzzz em copy) visível, discreta, no fundo.
 */

/** Texto padrão em imagens 9:16 exportadas (Status / Stories). */
export const SHARE_BRAND_URL_TEXT = 'gozzzz.app';

/** Opacidade ~70% (discreto, não intrusivo). */
export const SHARE_BRAND_OPACITY = 0.7;

/** Tamanho pequeno no canvas 1080×1920. */
export const SHARE_BRAND_FONT_CANVAS = '500 28px system-ui, -apple-system, sans-serif';

export type ShareBrandCanvasAlign = 'center' | 'right';

/**
 * Desenha a marca no canvas (fundo, centro ou direita).
 */
export function drawShareBrandFooterCanvas(
  ctx: CanvasRenderingContext2D,
  opts: {
    canvasWidth: number;
    canvasHeight: number;
    accentColor: string;
    bottomPx?: number;
    align?: ShareBrandCanvasAlign;
    horizontalPad?: number;
  },
): void {
  const bottomPx = opts.bottomPx ?? opts.canvasHeight - 88;
  const align = opts.align ?? 'center';
  const pad = opts.horizontalPad ?? 56;
  ctx.save();
  ctx.globalAlpha = SHARE_BRAND_OPACITY;
  ctx.fillStyle = opts.accentColor;
  ctx.font = SHARE_BRAND_FONT_CANVAS;
  ctx.textAlign = align === 'right' ? 'right' : 'center';
  const x = align === 'right' ? opts.canvasWidth - pad : opts.canvasWidth / 2;
  ctx.fillText(SHARE_BRAND_URL_TEXT, x, bottomPx);
  ctx.restore();
}
