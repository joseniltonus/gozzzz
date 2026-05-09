/**
 * Acesso ao programa completo (21 lições em texto) via URL com query `key`.
 *
 * Esta chave NÃO é um segredo criptográfico. Ela aparece na URL pública que
 * o cliente recebe por e-mail após a compra (Kiwify) — qualquer pessoa que
 * tem o link consegue ler. O objetivo é apenas evitar descoberta acidental
 * (Google indexar, alguém adivinhar a URL). Por isso fica hardcoded mesmo,
 * sem env var: simplifica deploy e o JS bundle público teria o valor inlined
 * de qualquer jeito.
 *
 * Para invalidar acessos antigos no futuro, basta trocar a string abaixo
 * por outra (gerada com `openssl rand -hex 16`) e reenviar o link novo aos
 * compradores. Os links antigos param de funcionar automaticamente.
 */
const PROGRAM_ACCESS_KEY = '044471cbfb3f96fae4db57f7271f89c9';

export function getPublicProgramAccessKey(): string {
  // Permite override por env var (ex.: pra QA com chave diferente), mas o
  // valor padrão hardcoded acima é o que vai pra produção.
  const fromEnv = process.env.EXPO_PUBLIC_PROGRAM_ACCESS_KEY?.trim();
  if (fromEnv && fromEnv.length >= 8) return fromEnv;
  return PROGRAM_ACCESS_KEY;
}

export function isProgramAccessConfigured(): boolean {
  const k = getPublicProgramAccessKey().trim();
  return k.length >= 8;
}

/**
 * Path relativo com query (para router.push). Aponta direto pra trilha
 * `/web/programa` — a página oficial onde o cliente vê as 21 lições.
 * O `?key=` é validado via lib/program-unlock e salvo no localStorage,
 * então links internos seguintes (lições) funcionam sem o `?key=`.
 */
export function getProgramCompletoPath(): string {
  const k = encodeURIComponent(getPublicProgramAccessKey());
  return `/web/programa?key=${k}`;
}

/** URL absoluta para colar no Kiwify (redirect / e-mail). */
export function buildProgramCompletoAbsoluteUrl(origin: string): string {
  const path = getProgramCompletoPath();
  return `${origin.replace(/\/$/, "")}${path}`;
}
