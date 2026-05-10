// Template do e-mail de confirmação de compra disparado pelo webhook do Kiwify.
//
// Diferenças em relação ao send-welcome-email/templates.ts:
//   - Aqui o cliente já PAGOU. O foco é entregar o link de acesso, não nutrir lead.
//   - Inclui dados do pedido (orderId, valor) pra servir de comprovante.
//   - O link principal vai DIRETO pro programa com `?key=` — assim o cliente
//     destrava o conteúdo no primeiro clique do email.
//
// Estratégia de deliverability (igual aos outros templates do projeto):
//   - HTML auto-contido com <style> + estilos inline críticos.
//   - Sem imagens externas, sem fontes externas, sem trackers.
//   - Tabelas em vez de flex/grid (compatível com Outlook 2016+).
//   - Botões VML pra Outlook desktop (mantém os cantos arredondados).
//   - Multipart text/plain (provedores corporativos pesam HTML/texto ratio).
//   - Subject sem caps abusivo, sem emoji no assunto.

export interface PurchaseEmailInput {
  email: string;
  firstName?: string;
  orderId?: string;
  amountFormatted?: string;
  productName?: string;
  programUrl: string;
}

const PROGRAM_URL_DEFAULT =
  "https://gozzzz.app/web/programa?key=044471cbfb3f96fae4db57f7271f89c9";
const SUPPORT_EMAIL = "suporte@gozzzz.app";
const COMPANY_NAME = "MORFEU SAÚDE E TECNOLOGIA LTDA";
const COMPANY_CNPJ = "66.059.212/0001-52";
const PRODUCT_DEFAULT = "GoZzzz — Programa de Sono em 21 Passos";

const FONT_STACK =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ctaButton(url: string, label: string): string {
  // VML wrapper pro Outlook desktop. Browsers ignoram comentários condicionais
  // <!--[if mso]> e leem só a versão <a> abaixo.
  return `
  <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
      href="${escape(url)}" style="height:54px;v-text-anchor:middle;width:280px;" arcsize="20%" stroke="f"
      fillcolor="#1a1535">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:${FONT_STACK};font-size:16px;font-weight:700;">
        ${escape(label)}
      </center>
    </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-- -->
    <a href="${escape(url)}"
       style="display:inline-block;padding:16px 32px;background:#1a1535;color:#ffffff;
              text-decoration:none;font-family:${FONT_STACK};font-weight:700;font-size:16px;
              border-radius:10px;letter-spacing:0.2px;mso-hide:all;">
      ${escape(label)}
    </a>
  <!--<![endif]-->
  `;
}

export function buildPurchaseConfirmationEmail(input: PurchaseEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const greeting = input.firstName
    ? `Olá ${escape(input.firstName)},`
    : "Olá,";

  const programUrl = input.programUrl || PROGRAM_URL_DEFAULT;
  const product = escape(input.productName ?? PRODUCT_DEFAULT);
  const orderInfo = input.orderId
    ? `<tr><td style="padding:8px 0;color:#9590b0;font-size:13px;">Pedido</td><td style="padding:8px 0;color:#1a1535;font-size:13px;text-align:right;font-weight:600;font-family:'SF Mono',Menlo,Monaco,Consolas,monospace;">#${escape(
        input.orderId,
      )}</td></tr>`
    : "";
  const amountInfo = input.amountFormatted
    ? `<tr><td style="padding:8px 0;color:#9590b0;font-size:13px;">Valor</td><td style="padding:8px 0;color:#1a1535;font-size:13px;text-align:right;font-weight:600;">${escape(
        input.amountFormatted,
      )}</td></tr>`
    : "";

  const subject = "Acesso liberado: GoZzzz Programa de 21 Passos";

  // Preheader oculto — aparece no preview da inbox antes do usuário abrir.
  const preheader =
    "Seu pagamento foi confirmado. Clique pra acessar as 21 lições agora.";

  const html = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="format-detection" content="telephone=no,address=no,email=no,date=no">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escape(subject)}</title>
<style>
  body { margin:0; padding:0; background:#f0f0f4; }
  table { border-collapse:collapse; }
  img { display:block; border:0; outline:none; text-decoration:none; }
  a { text-decoration:none; }
  .preheader { display:none !important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; mso-hide:all; }
  @media (prefers-color-scheme: dark) {
    body { background:#0d0d16 !important; }
    .card { background:#12121e !important; border-color:#27273f !important; }
    .text-body { color:#cbd5e1 !important; }
    .text-title { color:#ffffff !important; }
    .text-soft { color:#9590b0 !important; }
    .receipt { background:#0d0d16 !important; border-color:#27273f !important; }
    .receipt td { color:#cbd5e1 !important; }
  }
  @media (max-width: 600px) {
    .container { width:100% !important; }
    .card { padding:28px 22px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#f0f0f4;">
<div class="preheader">${escape(preheader)}\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0f0f4;">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding:0 0 20px 0;font-family:${FONT_STACK};font-size:20px;font-weight:800;color:#1a1535;letter-spacing:-0.3px;">
            GoZzzz
          </td>
        </tr>

        <!-- Card principal -->
        <tr>
          <td class="card" style="background:#ffffff;border:1px solid #e7e5f0;border-radius:16px;padding:40px 36px;">

            <!-- Badge sucesso -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
              <tr>
                <td style="padding:6px 12px;background:#e8f9ef;border-radius:999px;font-family:${FONT_STACK};font-size:12px;font-weight:700;color:#0f7a3f;letter-spacing:0.4px;">
                  ✓ PAGAMENTO CONFIRMADO
                </td>
              </tr>
            </table>

            <h1 class="text-title" style="margin:0 0 12px 0;font-family:${FONT_STACK};font-size:28px;line-height:1.25;font-weight:800;color:#1a1535;letter-spacing:-0.4px;">
              ${greeting}<br>
              Seu acesso ao GoZzzz está liberado.
            </h1>

            <p class="text-body" style="margin:0 0 28px 0;font-family:${FONT_STACK};font-size:15px;line-height:1.6;color:#4a4560;">
              Você acaba de garantir acesso vitalício ao programa de 21 lições baseadas em neurociência do sono. Clique no botão abaixo pra começar agora.
            </p>

            <!-- CTA principal -->
            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 18px 0;">
              <tr>
                <td>${ctaButton(programUrl, "Abrir as 21 lições agora")}</td>
              </tr>
            </table>

            <p class="text-soft" style="margin:0 0 32px 0;font-family:${FONT_STACK};font-size:12px;line-height:1.5;color:#9590b0;">
              ⚑ Salve este link nos favoritos. É seu acesso vitalício — funciona em qualquer dispositivo.
            </p>

            <!-- Recibo da compra -->
            <table role="presentation" class="receipt" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f6ff;border:1px solid #e7e1f5;border-radius:10px;padding:4px 16px;margin:0 0 28px 0;">
              <tr><td colspan="2" style="padding:14px 0 8px 0;font-family:${FONT_STACK};font-size:11px;font-weight:700;color:#7c5ce8;letter-spacing:1.2px;text-transform:uppercase;">Recibo</td></tr>
              <tr><td style="padding:8px 0;color:#9590b0;font-size:13px;font-family:${FONT_STACK};">Produto</td><td style="padding:8px 0;color:#1a1535;font-size:13px;text-align:right;font-weight:600;font-family:${FONT_STACK};">${product}</td></tr>
              ${orderInfo}
              ${amountInfo}
              <tr><td colspan="2" style="padding-bottom:14px;"></td></tr>
            </table>

            <!-- O que você tem -->
            <h2 class="text-title" style="margin:0 0 14px 0;font-family:${FONT_STACK};font-size:18px;font-weight:700;color:#1a1535;letter-spacing:-0.2px;">
              O que você tem agora
            </h2>

            <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin:0 0 28px 0;">
              <tr><td style="padding:6px 0;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.6;" class="text-body">
                <span style="color:#7c5ce8;font-weight:700;">✓</span> &nbsp;21 lições baseadas em neurociência do sono
              </td></tr>
              <tr><td style="padding:6px 0;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.6;" class="text-body">
                <span style="color:#7c5ce8;font-weight:700;">✓</span> &nbsp;Trilha personalizada pelo seu cronótipo
              </td></tr>
              <tr><td style="padding:6px 0;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.6;" class="text-body">
                <span style="color:#7c5ce8;font-weight:700;">✓</span> &nbsp;Acesso pelo navegador — qualquer dispositivo
              </td></tr>
              <tr><td style="padding:6px 0;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.6;" class="text-body">
                <span style="color:#7c5ce8;font-weight:700;">✓</span> &nbsp;Sem prazo de validade — é vitalício
              </td></tr>
            </table>

            <!-- Como começar -->
            <h2 class="text-title" style="margin:0 0 14px 0;font-family:${FONT_STACK};font-size:18px;font-weight:700;color:#1a1535;letter-spacing:-0.2px;">
              Como começar (5 minutos)
            </h2>

            <p class="text-body" style="margin:0 0 8px 0;font-family:${FONT_STACK};font-size:14px;line-height:1.7;color:#4a4560;">
              <strong style="color:#1a1535;">1.</strong> Clique no botão dourado acima e abra o programa.<br>
              <strong style="color:#1a1535;">2.</strong> Comece pela <strong>Lição 1 — Cronótipos</strong>. Se ainda não fez o quiz, faça lá (2 min) — destrava a personalização.<br>
              <strong style="color:#1a1535;">3.</strong> Faça uma lição por dia. Aplique o protocolo da noite ainda hoje.
            </p>

            <!-- Garantia -->
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8f6ff;border-left:3px solid #7c5ce8;padding:14px 18px;margin:28px 0 0 0;border-radius:0 10px 10px 0;">
              <tr><td style="font-family:${FONT_STACK};font-size:13px;line-height:1.6;color:#4a4560;" class="text-body">
                <strong style="color:#1a1535;">Garantia de 7 dias.</strong> Se não estiver satisfeito por qualquer motivo, devolvemos 100% do valor — sem questionamento. Direito garantido pelo CDC, Art. 49. Basta responder este e-mail com "quero reembolso".
              </td></tr>
            </table>

            <!-- Suporte -->
            <p class="text-soft" style="margin:28px 0 0 0;font-family:${FONT_STACK};font-size:13px;line-height:1.6;color:#9590b0;">
              Dúvidas? Responda este e-mail ou escreva pra
              <a href="mailto:${SUPPORT_EMAIL}" style="color:#7c5ce8;text-decoration:underline;">${SUPPORT_EMAIL}</a>.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:24px 16px;text-align:center;font-family:${FONT_STACK};font-size:11px;line-height:1.6;color:#9590b0;">
            © GoZzzz · ${COMPANY_NAME} · CNPJ ${COMPANY_CNPJ}<br>
            Este e-mail foi enviado porque você comprou o produto. Não é uma comunicação de marketing.
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>`;

  // Versão texto puro — provedores corporativos pesam ratio HTML/texto.
  const orderLine = input.orderId ? `Pedido: #${input.orderId}\n` : "";
  const amountLine = input.amountFormatted
    ? `Valor: ${input.amountFormatted}\n`
    : "";

  const text = [
    `${input.firstName ? `Olá ${input.firstName},` : "Olá,"}`,
    "",
    "Seu acesso ao GoZzzz está liberado.",
    "",
    "Você acaba de garantir acesso vitalício ao programa de 21 lições baseadas em neurociência do sono.",
    "",
    "ABRIR AS 21 LIÇÕES AGORA:",
    programUrl,
    "",
    "(Salve este link nos favoritos — é seu acesso vitalício)",
    "",
    "---",
    "RECIBO",
    `Produto: ${input.productName ?? PRODUCT_DEFAULT}`,
    orderLine.trim(),
    amountLine.trim(),
    "---",
    "",
    "O QUE VOCÊ TEM AGORA",
    "✓ 21 lições baseadas em neurociência do sono",
    "✓ Trilha personalizada pelo seu cronótipo",
    "✓ Acesso pelo navegador — qualquer dispositivo",
    "✓ Sem prazo de validade — é vitalício",
    "",
    "COMO COMEÇAR (5 minutos)",
    "1. Clique no link acima e abra o programa.",
    "2. Comece pela Lição 1 — Cronótipos. Se ainda não fez o quiz, faça lá (2 min) — destrava a personalização.",
    "3. Faça uma lição por dia. Aplique o protocolo da noite ainda hoje.",
    "",
    "GARANTIA DE 7 DIAS",
    "Se não estiver satisfeito por qualquer motivo, devolvemos 100% do valor — sem questionamento. Direito garantido pelo CDC, Art. 49. Basta responder este e-mail com 'quero reembolso'.",
    "",
    `Dúvidas? Responda este e-mail ou escreva pra ${SUPPORT_EMAIL}.`,
    "",
    "—",
    `${COMPANY_NAME}`,
    `CNPJ ${COMPANY_CNPJ}`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  return { subject, html, text };
}
