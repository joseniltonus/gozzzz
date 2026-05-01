/**
 * Optional client allowlist so QA accounts unlock the program even when
 * `profiles.subscription_type` in the linked project lags or points at another DB.
 *
 * - If `EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS` is unset: defaults to `gozzzztest@gmail.com`.
 * - If set to empty string: no email bypass (only DB subscription_type counts).
 * - Multiple: comma-separated lowercasing applied at runtime.
 */
function programAccessAllowlist(): Set<string> {
  const raw = process.env.EXPO_PUBLIC_PROGRAM_ACCESS_EMAILS;
  const csv = raw === undefined || raw === null ? 'gozzzztest@gmail.com' : String(raw).trim();
  if (!csv) return new Set();
  return new Set(csv.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean));
}

const allowlistedProgramEmails = programAccessAllowlist();

/**
 * Full program access: `premium` / `gift` in `profiles`, or allowlisted login email.
 */
export function hasPremiumProgramAccess(
  subscriptionType: string | null | undefined,
  userEmail?: string | null,
): boolean {
  const mail = userEmail?.trim().toLowerCase();
  if (mail && allowlistedProgramEmails.has(mail)) return true;

  const normalized = subscriptionType?.trim().toLowerCase();
  return normalized === 'premium' || normalized === 'gift';
}
