import { Platform } from 'react-native';
import { WEB_EDITORIAL_FONT_FAMILY } from '@/constants/webEditorialFonts';

/**
 * Editorial “fine stationery” — warm paper, ink, brass accent.
 * Web: stacks em `WEB_EDITORIAL_FONT_FAMILY` (Fraunces + Source Sans 3), carregadas em `app/+html.tsx`.
 * Native: sem família custom — mantém sistema.
 */
export const LESSON_PAPER = {
  page: '#e4ddd3',
  canvas: '#f0ebe2',
  elevated: '#faf7f0',
  inset: '#e2dcd2',
  /** Hairlines read softer than flat hex borders */
  divider: 'rgba(36, 30, 22, 0.09)',
  border: 'rgba(36, 30, 22, 0.13)',
  borderStrong: 'rgba(36, 30, 22, 0.18)',
  shadow: '#100c08',
  /** Brass / foil — rules, progress, keylines */
  foil: '#b8925a',
  foilSoft: 'rgba(184, 146, 90, 0.35)',
} as const;

export const LESSON_INK = {
  display: '#12100e',
  body: '#2a2620',
  muted: '#575249',
  label: '#6f695e',
  wash: '#8a8478',
} as const;

/** Primeiro nome = família carregada no HTML (web). */
export const LESSON_FONT = {
  display: Platform.OS === 'web' ? WEB_EDITORIAL_FONT_FAMILY.display : undefined,
  text: Platform.OS === 'web' ? WEB_EDITORIAL_FONT_FAMILY.text : undefined,
} as const;
