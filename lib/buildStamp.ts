/**
 * CI sets `EXPO_PUBLIC_GIT_SHA` to the full commit SHA (GitHub Actions / local export).
 * Local Metro: run `EXPO_PUBLIC_GIT_SHA=$(git rev-parse HEAD) npx expo start` to match CI.
 */
const raw = process.env.EXPO_PUBLIC_GIT_SHA?.trim() ?? '';

export const GIT_SHA_SHORT =
  raw.length >= 7 ? raw.slice(0, 7) : raw.length > 0 ? raw : '';

export const BUILD_STAMP_LABEL = GIT_SHA_SHORT ? `build · ${GIT_SHA_SHORT}` : '';
