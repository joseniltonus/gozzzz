import Constants from 'expo-constants';

/** Semver from `app.json` → `expo.version` (same value native builds use when in sync). */
export function getAppVersion(): string {
  const v = Constants.expoConfig?.version ?? Constants.nativeAppVersion;
  return (v && String(v).trim()) || '—';
}
