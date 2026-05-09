/**
 * Acesso ao programa completo (21 lições em texto) via URL com query `key`.
 * Defina EXPO_PUBLIC_PROGRAM_ACCESS_KEY no Vercel/EAS (mesmo valor que você
 * cola no e-mail do Kiwify e no redirect). Não é segredo militar — só evita
 * curiosos; quem tem o link comprou ou recebeu de você.
 */
export function getPublicProgramAccessKey(): string {
  return process.env.EXPO_PUBLIC_PROGRAM_ACCESS_KEY ?? '';
}

export function isProgramAccessConfigured(): boolean {
  const k = getPublicProgramAccessKey().trim();
  return k.length >= 8;
}

/** Path relativo com query (para router.push). */
export function getProgramCompletoPath(): string {
  const k = encodeURIComponent(getPublicProgramAccessKey());
  return `/web/programa-completo?key=${k}`;
}

/** URL absoluta para colar no Kiwify (redirect / e-mail). */
export function buildProgramCompletoAbsoluteUrl(origin: string): string {
  const path = getProgramCompletoPath();
  return `${origin.replace(/\/$/, "")}${path}`;
}
