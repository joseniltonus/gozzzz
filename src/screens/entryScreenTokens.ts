/**
 * Design tokens — alinhamento com variáveis Figma (cores, espaço 4px, tipo, ícones, elevação).
 * Altere aqui para manter consistência entre frames e código.
 *
 * Referência para designers: docs/figma-entry-screen-tokens.md
 * JSON (plugins / Tokens Studio): docs/figma-entry-screen-tokens.json
 */
export const entryTokens = {
  color: {
    canvas: '#080a15',
    star: '#ffffff',
    text: {
      primary: '#fafbff',
      secondary: '#9ca6cc',
      tertiary: '#8b96b8',
      quaternary: '#7a8498',
      inverse: '#ffffff',
      accent: '#c4b8ff',
      accentMuted: '#b8b0ff',
      emphasis: '#dce2f5',
      overline: '#7a85a8',
      label: '#6a7698',
      caption: '#5a6488',
      meta: '#8b96b8',
    },
    border: {
      hairline: 'rgba(255,255,255,0.085)',
      subtle: 'rgba(255,255,255,0.08)',
      default: 'rgba(255,255,255,0.12)',
      strong: 'rgba(255,255,255,0.14)',
      badge: 'rgba(189,179,255,0.22)',
      cta: 'rgba(255,255,255,0.14)',
    },
    icon: {
      muted: '#8e9ab8',
      dim: '#6a7698',
      chevron: 'rgba(255,255,255,0.42)',
    },
    glow: {
      primary: 'rgba(100,80,255,0.14)',
      secondary: 'rgba(70,120,255,0.075)',
    },
    gradient: {
      cta: ['#9080ff', '#6a5fff', '#4a90ff'] as const,
      brandWordmark: ['#b8b0ff', '#70d0ff'] as const,
      card: ['rgba(255,255,255,0.072)', 'rgba(255,255,255,0.02)', 'rgba(120,100,220,0.04)'] as const,
    },
    surface: {
      badgeFill: 'rgba(169,159,255,0.08)',
      badgeDot: '#a99fff',
      badgeShadow: '#6a50c0',
      pillLabel: '#d4cef8',
      dividerDot: 'rgba(255,255,255,0.08)',
      linkPill: 'rgba(255,255,255,0.035)',
      homeIndicator: 'rgba(255,255,255,0.12)',
      shimmer: 'rgba(255,255,255,0.09)',
      ctaHairline: 'rgba(255,255,255,0.32)',
      cardHairline: 'rgba(255,255,255,0.14)',
    },
    shadow: {
      cta: '#4030a8',
      card: '#020510',
      badge: '#6a50c0',
      check: '#0a1a12',
    },
    success: {
      fill: 'rgba(124,255,160,0.08)',
      border: 'rgba(140,255,185,0.32)',
      icon: '#8effb8',
    },
    headline: {
      glow: 'rgba(80,60,180,0.45)',
    },
  },
  /** Espaço 4px (Figma: spacing/1 = 4) */
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    10: 40,
    12: 48,
    14: 56,
    /** Layout da página */
    pageInline: 24,
    pageTop: 56,
    pageBottom: 48,
  },
  /** Raio (Figma: corner radius) */
  radius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    pill: 999,
    /** Metade de lg+2 para selos 22px */
    seal: 11,
    homeIndicator: 2,
  },
  /** Elevação (sombra + elevation Android) */
  elevation: {
    badge: {
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.22,
      shadowRadius: 16,
      elevation: 6,
    },
    cta: {
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.42,
      shadowRadius: 26,
      elevation: 14,
    },
    card: {
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: 0.65,
      shadowRadius: 22,
      elevation: 12,
    },
    check: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 4,
    },
  },
  /** Escala tipográfica (tamanho / entrelinha / tracking) */
  type: {
    overline: { fontSize: 11, lineHeight: 16, letterSpacing: 2.5, fontWeight: '500' as const },
    label: { fontSize: 10, lineHeight: 14, letterSpacing: 2.2, fontWeight: '600' as const },
    caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0.12, fontWeight: '500' as const },
    body: { fontSize: 16, lineHeight: 24, letterSpacing: 0.15, fontWeight: '400' as const },
    bodyEm: { fontSize: 16, lineHeight: 24, fontWeight: '600' as const },
    cta: { fontSize: 17, lineHeight: 24, letterSpacing: 0.2, fontWeight: '700' as const },
    display: { fontSize: 38, lineHeight: 44, letterSpacing: -1.1, fontWeight: '700' as const },
    logo: { fontSize: 32, lineHeight: 40, letterSpacing: -1, fontWeight: '700' as const },
    disclaimer: { fontSize: 10, lineHeight: 17, letterSpacing: 0.1, fontWeight: '400' as const },
    cardTitle: { fontSize: 12, lineHeight: 16, letterSpacing: -0.15, fontWeight: '600' as const },
    cardMeta: { fontSize: 10, lineHeight: 16, letterSpacing: 0.05, fontWeight: '400' as const },
    cardSpec: { fontSize: 9, lineHeight: 14, letterSpacing: 0.15, fontWeight: '400' as const },
    avatar: { fontSize: 10, lineHeight: 12, fontWeight: '700' as const },
    badge: { fontSize: 11, lineHeight: 14, letterSpacing: 1.4, fontWeight: '600' as const },
  },
  /** Ícones Lucide — escala única */
  icon: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 18,
    cta: 18,
  },
  strokeWidth: {
    hairline: 1.5,
    regular: 1.75,
    medium: 2,
    emphasis: 2.25,
    bold: 2.75,
  },
  borderWidth: {
    default: 1,
  },
  layout: {
    contentMax: 340,
    bridgeMax: 308,
    disclaimerMax: 296,
    gridCellPct: '48%' as const,
    avatar: 32,
    checkSeal: 22,
    homeBarW: 128,
    homeBarH: 3,
    glow1: { width: 380, height: 380, top: -120 },
    glow2: { width: 240, height: 240, top: 300, right: -72 },
    logoMaskMinW: 78,
  },
} as const;

export type ResearcherKey = 'MB' | 'MW' | 'AH' | 'CC';

/** Avatares — fills alinhados ao token, sem “hex solto” no componente */
export const researcherAvatar: Record<
  ResearcherKey,
  { fill: string; text: string; ring: string }
> = {
  MB: {
    fill: 'rgba(124,111,255,0.22)',
    text: '#d8d0ff',
    ring: 'rgba(255,255,255,0.1)',
  },
  MW: {
    fill: 'rgba(111,200,255,0.2)',
    text: '#b8e8ff',
    ring: 'rgba(255,255,255,0.1)',
  },
  AH: {
    fill: 'rgba(160,111,255,0.2)',
    text: '#dcc0ff',
    ring: 'rgba(255,255,255,0.1)',
  },
  CC: {
    fill: 'rgba(111,200,160,0.2)',
    text: '#b8ffe8',
    ring: 'rgba(255,255,255,0.1)',
  },
};
