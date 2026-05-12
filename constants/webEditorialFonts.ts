/**
 * Editorial web typography — Fraunces (display) + Source Sans 3 (UI/body).
 * The href is injected in `app/+html.tsx`; stacks are used as `fontFamily` on web.
 */
export const WEB_EDITORIAL_GOOGLE_FONTS_HREF =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,500;0,600;0,700;0,800;1,500;1,600&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap';

export const WEB_EDITORIAL_FONT_FAMILY = {
  display: 'Fraunces, "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
  text: '"Source Sans 3", ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", sans-serif',
} as const;
