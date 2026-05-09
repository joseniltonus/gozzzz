// Template do e-mail de boas-vindas pós-compra do Sono+ Lite (R$ 147).
//
// Mantém paridade visual com os arquivos standalone em
// `emails/gozzzz_email_fez_teste.html` e `gozzzz_email_nao_fez_teste.html`.
// Quando o cliente faz o quiz antes de comprar, o e-mail chega já
// personalizado com nome do cronótipo, descrição específica do perfil e
// janela ideal de sono. Quando não fez, o e-mail direciona pro quiz com CTA
// forte e antecipa que o link de acesso virá depois do teste.
//
// Estratégia de deliverability:
//   - HTML auto-contido com <style> no <head> + estilos inline críticos.
//   - Sem imagens externas, sem fontes externas, sem trackers.
//   - Tabelas em vez de flex/grid (compatível com Outlook 2016+).
//   - Botões VML pra Outlook desktop (mantém o cantos arredondados).
//   - Multipart text/plain (provedores corporativos pesam HTML/texto ratio).
//   - Subject sem caps abusivo, sem emoji no assunto.

export type Chronotype = "dolphin" | "lion" | "bear" | "wolf";

export interface WelcomeEmailInput {
  email: string;
  firstName?: string;
  chronotype?: Chronotype | null;
  programUrl?: string;
}

interface ChronotypeBlock {
  /** Nome do animal em português */
  name: string;
  /** Janela de sono ideal em formato curto pra UI ("21:30 — 22:30") */
  bedtimeWindow: string;
  /** Descrição empática e científica do perfil — usado no card principal */
  description: string;
  /** Pesquisador-referência citado no rodapé do card */
  researcher: string;
}

const CHRONOTYPE_BLOCKS: Record<Chronotype, ChronotypeBlock> = {
  dolphin: {
    name: "Golfinho",
    bedtimeWindow: "23:30 — 00:00",
    description:
      "Seu sono é leve e você acorda facilmente no meio da noite. É o perfil mais complexo e o que mais se beneficia do protocolo específico. O programa tem um módulo dedicado para você.",
    researcher:
      "Dr. Michael Breus, psicólogo clínico do sono diplomado pela American Board of Sleep Medicine, descreveu o perfil Golfinho a partir do trabalho com pacientes de insônia primária.",
  },
  lion: {
    name: "Leão",
    bedtimeWindow: "21:30 — 22:30",
    description:
      "Você acorda naturalmente cedo e tem mais energia nas primeiras horas do dia. O risco é acumular sono social aos fins de semana quebrando o ritmo. O programa te ajuda a manter a consistência.",
    researcher:
      "Dr. Andrew Huberman, neurocientista da Stanford School of Medicine, publica sobre o impacto da exposição à luz nas primeiras horas do dia para tipos matutinos.",
  },
  bear: {
    name: "Urso",
    bedtimeWindow: "22:30 — 23:30",
    description:
      "Você segue o ciclo solar — o perfil mais comum. Ainda assim, pequenas variações de rotina (luz, alimentação, telas) criam um débito silencioso. O programa identifica o que está quebrando o seu ciclo.",
    researcher:
      "Dr. Charles Czeisler, professor de medicina do sono em Harvard Medical School, lidera há décadas pesquisas sobre regularidade circadiana.",
  },
  wolf: {
    name: "Lobo",
    bedtimeWindow: "00:00 — 01:00",
    description:
      "Você tem pico de energia à noite e dificuldade com rotinas matutinas. Seu corpo naturalmente libera melatonina mais tarde — forçar dormir cedo cria resistência, não sono. O programa começa calibrando isso.",
    researcher:
      "Dr. Matthew Walker, professor de neurociência da UC Berkeley, escreve sobre o conflito entre cronótipos noturnos e a estrutura social diurna.",
  },
};

const PROGRAM_URL_DEFAULT = "https://gozzzz.app/web/programa";
const QUIZ_URL = "https://gozzzz.app/web/sono-plus#quiz";
const SUPPORT_EMAIL = "suporte@gozzzz.app";
const COMPANY_NAME = "MORFEU SAÚDE E TECNOLOGIA LTDA";

// Paleta da identidade (alinhada ao spec):
//   #7c5ce8  roxo primário        — links, labels, destaques
//   #f8f6ff  roxo claro           — backgrounds de cards
//   #1a1535  escuro               — títulos, botão principal
//   #4a4560  texto corpo          — parágrafos
//   #9590b0  texto suave          — notas, rodapé
//   #f0f0f4  fundo externo        — background do e-mail

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT_STACK =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

function chronotypeBlockHtml(c: Chronotype): string {
  const b = CHRONOTYPE_BLOCKS[c];
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card-soft" bgcolor="#f8f6ff" style="background:#f8f6ff;border:1px solid #e6e0ff;border-radius:12px;margin-bottom:24px;">
    <tr><td style="padding:24px 26px;">
      <p style="margin:0 0 8px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:1.5px;color:#7c5ce8;text-transform:uppercase;">
        Vi que você fez o teste · Cronótipo identificado
      </p>
      <h2 class="h2 text-dark" style="margin:0 0 14px;font-family:${FONT_STACK};font-size:22px;font-weight:700;color:#1a1535;line-height:1.25;">
        Você é ${escape(b.name)}.
      </h2>
      <p class="text-body" style="margin:0 0 18px;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.65;">
        ${escape(b.description)}
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e6e0ff;border-radius:8px;margin-bottom:16px;">
        <tr>
          <td style="padding:14px 16px;border-right:1px solid #e6e0ff;width:48%;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:0.6px;color:#7c5ce8;text-transform:uppercase;line-height:1.4;">
            Sua janela ideal de sono
          </td>
          <td style="padding:14px 16px;font-family:${FONT_STACK};font-size:15px;font-weight:700;color:#1a1535;line-height:1.4;">
            entre ${escape(b.bedtimeWindow)}
          </td>
        </tr>
      </table>
      <p class="text-soft" style="margin:0;font-family:${FONT_STACK};font-size:11px;color:#9590b0;line-height:1.5;font-style:italic;">
        ${escape(b.researcher)}
      </p>
    </td></tr>
  </table>`;
}

function quizPromoHtml(): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card-soft" bgcolor="#f8f6ff" style="background:#f8f6ff;border:1px solid #e6e0ff;border-radius:12px;margin-bottom:24px;">
    <tr><td style="padding:24px 26px;">
      <p style="margin:0 0 14px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:1.5px;color:#7c5ce8;text-transform:uppercase;text-align:center;">
        Os 4 perfis · Qual é o seu?
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center" style="padding:8px;width:25%;font-family:${FONT_STACK};">
            <div style="font-size:26px;line-height:1;margin-bottom:4px;">🐺</div>
            <p style="margin:0;font-size:13px;font-weight:700;color:#1a1535;line-height:1.3;">Lobo</p>
            <p style="margin:2px 0 0;font-size:11px;color:#9590b0;line-height:1.4;">noturno</p>
          </td>
          <td align="center" style="padding:8px;width:25%;font-family:${FONT_STACK};">
            <div style="font-size:26px;line-height:1;margin-bottom:4px;">🦁</div>
            <p style="margin:0;font-size:13px;font-weight:700;color:#1a1535;line-height:1.3;">Leão</p>
            <p style="margin:2px 0 0;font-size:11px;color:#9590b0;line-height:1.4;">matutino</p>
          </td>
          <td align="center" style="padding:8px;width:25%;font-family:${FONT_STACK};">
            <div style="font-size:26px;line-height:1;margin-bottom:4px;">🐻</div>
            <p style="margin:0;font-size:13px;font-weight:700;color:#1a1535;line-height:1.3;">Urso</p>
            <p style="margin:2px 0 0;font-size:11px;color:#9590b0;line-height:1.4;">solar</p>
          </td>
          <td align="center" style="padding:8px;width:25%;font-family:${FONT_STACK};">
            <div style="font-size:26px;line-height:1;margin-bottom:4px;">🐬</div>
            <p style="margin:0;font-size:13px;font-weight:700;color:#1a1535;line-height:1.3;">Golfinho</p>
            <p style="margin:2px 0 0;font-size:11px;color:#9590b0;line-height:1.4;">leve</p>
          </td>
        </tr>
      </table>
      <p class="text-body" style="margin:18px 0 0;font-family:${FONT_STACK};font-size:13px;color:#4a4560;line-height:1.6;text-align:center;">
        Sua janela ideal pode ser entre 21:30 e 22:30 — ou entre 00:00 e 01:00. A diferença muda tudo.
      </p>
    </td></tr>
  </table>

  <p class="text-body" style="margin:0 0 24px;font-family:${FONT_STACK};font-size:14px;color:#4a4560;line-height:1.65;">
    <strong style="color:#1a1535;">Por que vale fazer antes da Lição 1:</strong>
    descobrindo seu cronótipo agora, você começa pelos exercícios certos pra sua biologia e poupa de 1 a 2 semanas de tentativa-e-erro.
  </p>`;
}

/** Botão CTA com fallback VML pro Outlook (cantos arredondados). */
function ctaButton(href: string, label: string): string {
  return `
  <!--[if mso]>
  <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:54px;v-text-anchor:middle;width:320px;" arcsize="15%" stroke="f" fillcolor="#1a1535">
    <w:anchorlock/>
    <center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0.2px;">${label}</center>
  </v:roundrect>
  <![endif]-->
  <!--[if !mso]><!-->
  <a href="${href}" class="cta-btn" target="_blank" style="display:inline-block;padding:18px 36px;background:#1a1535;color:#ffffff;font-family:${FONT_STACK};font-size:16px;font-weight:700;text-decoration:none;border-radius:10px;letter-spacing:0.2px;mso-hide:all;">
    ${label}
  </a>
  <!--<![endif]-->`;
}

export function buildWelcomeEmail(input: WelcomeEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = (input.firstName ?? "").trim();
  const programUrl = input.programUrl ?? PROGRAM_URL_DEFAULT;
  const safeName = escape(firstName);

  // Subject: muda de tom se cliente já fez o teste (mais pessoal/identificado)
  // ou se ainda não fez (gancho de "uma coisa antes da Lição 1").
  const subject = input.chronotype
    ? firstName
      ? `${firstName}, seu plano de cronótipo ${CHRONOTYPE_BLOCKS[input.chronotype].name} está pronto`
      : `Seu plano de cronótipo ${CHRONOTYPE_BLOCKS[input.chronotype].name} está pronto`
    : firstName
      ? `Uma coisa antes de começar, ${firstName} (60 segundos)`
      : "Uma coisa antes da Lição 1 — 60 segundos";

  const preheader = input.chronotype
    ? "Seu perfil de sono foi identificado. Aqui está como começar pelas próximas 21 noites."
    : "Antes da primeira lição, faça o teste de cronótipo. 60 segundos. Muda toda a sequência.";

  // Greeting: usa o nome se disponível, senão genérico
  const greetingHtml = firstName
    ? `Olá, ${safeName}.<br>${input.chronotype ? "Bem-vindo ao GoZzzz." : "Uma coisa antes da Lição 1."}`
    : input.chronotype
      ? "Olá. Bem-vindo ao GoZzzz."
      : "Olá. Uma coisa antes da Lição 1.";

  const personalizationBlock = input.chronotype
    ? chronotypeBlockHtml(input.chronotype)
    : quizPromoHtml();

  const ctaHref = input.chronotype ? programUrl : QUIZ_URL;
  const ctaLabel = input.chronotype
    ? "Acessar minhas 21 lições →"
    : "Fazer o teste agora (60s) →";

  const ctaFootnote = input.chronotype
    ? `<p class="text-soft" style="margin:14px 0 0;font-family:${FONT_STACK};font-size:12px;color:#9590b0;text-align:center;line-height:1.5;">
        Salve este e-mail. Ele é a sua porta de entrada permanente.
      </p>`
    : `<p class="text-soft" style="margin:14px 0 0;font-family:${FONT_STACK};font-size:12px;color:#9590b0;text-align:center;line-height:1.6;">
        Gratuito · 4 perguntas · sem cadastro · resultado na hora.<br>
        Ou cole no navegador: <a href="${QUIZ_URL}" style="color:#7c5ce8;text-decoration:underline;">gozzzz.app/web/sono-plus#quiz</a>
      </p>`;

  const supportNote = input.chronotype
    ? `Responda este e-mail ou escreva pra <a href="mailto:${SUPPORT_EMAIL}" style="color:#7c5ce8;text-decoration:underline;">${SUPPORT_EMAIL}</a>. A gente lê e responde rápido.`
    : `Responda este e-mail ou escreva pra <a href="mailto:${SUPPORT_EMAIL}" style="color:#7c5ce8;text-decoration:underline;">${SUPPORT_EMAIL}</a>. Após o teste, te enviamos o link da área de membros automaticamente.`;

  const html = `<!DOCTYPE html>
<html lang="pt-BR" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>${escape(subject)}</title>
<!--[if mso]>
<noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
<style>table {border-collapse:collapse !important;} td, p, a, h1, h2 {font-family: Arial, sans-serif !important;}</style>
<![endif]-->
<style>
  body { margin:0; padding:0; background:#f0f0f4; -webkit-font-smoothing:antialiased; -webkit-text-size-adjust:100%; }
  table { border-collapse:collapse !important; mso-table-lspace:0pt; mso-table-rspace:0pt; }
  img { border:0; outline:none; text-decoration:none; -ms-interpolation-mode:bicubic; }
  a { color:#7c5ce8; text-decoration:none; }
  .ExternalClass { width:100%; }
  .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height:100%; }
  @media only screen and (max-width:600px) {
    .container { width:100% !important; max-width:100% !important; }
    .px-pad { padding-left:20px !important; padding-right:20px !important; }
    .card-pad { padding:28px 22px !important; }
    .h1 { font-size:24px !important; line-height:1.25 !important; }
    .h2 { font-size:20px !important; line-height:1.3 !important; }
    .cta-btn { padding:16px 28px !important; font-size:15px !important; }
  }
  @media (prefers-color-scheme: dark) {
    body, .body-bg { background:#0c0c14 !important; }
    .card-main { background:#16161e !important; border-color:#2a2a36 !important; }
    .card-soft { background:#1c1726 !important; border-color:#3a2f50 !important; }
    .text-dark { color:#f0f0f4 !important; }
    .text-body { color:#c8c4d8 !important; }
    .text-soft { color:#9590b0 !important; }
  }
</style>
</head>
<body class="body-bg" bgcolor="#f0f0f4" style="margin:0;padding:0;background:#f0f0f4;">

<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f0f0f4;">
${escape(preheader)}
&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f0f0f4" style="background:#f0f0f4;">
  <tr><td align="center" class="px-pad" style="padding:36px 16px;">

    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" class="container" style="max-width:600px;width:100%;">

      <tr><td align="center" style="padding-bottom:18px;">
        <p style="margin:0;font-family:${FONT_STACK};font-size:13px;font-weight:700;letter-spacing:6px;color:#7c5ce8;text-transform:uppercase;">
          GoZzzz
        </p>
      </td></tr>

      <tr><td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card-main" bgcolor="#ffffff" style="background:#ffffff;border:1px solid #e8e6f0;border-radius:14px;">
          <tr><td class="card-pad" style="padding:44px 40px 36px;">

            <p style="margin:0 0 8px;font-family:${FONT_STACK};font-size:11px;font-weight:700;letter-spacing:1.5px;color:#7c5ce8;text-transform:uppercase;">
              Pagamento confirmado${input.chronotype ? "" : " · Bem-vindo"}
            </p>

            <h1 class="h1 text-dark" style="margin:0 0 18px;font-family:${FONT_STACK};font-size:28px;font-weight:800;color:#1a1535;line-height:1.2;letter-spacing:-0.4px;">
              ${greetingHtml}
            </h1>

            <p class="text-body" style="margin:0 0 20px;font-family:${FONT_STACK};font-size:15px;color:#4a4560;line-height:1.65;">
              ${
                input.chronotype
                  ? "Seu acesso ao programa de 21 lições foi liberado. As aulas combinam neurociência do sono e medicina circadiana, em sequência prática — uma lição por noite, cinco minutos cada."
                  : "Seu acesso ao GoZzzz está garantido. Antes de você abrir a primeira lição, vale 60 segundos pra fazer uma coisa que muda toda a sequência das próximas 21 noites."
              }
            </p>

            <p class="text-body" style="margin:0 0 28px;font-family:${FONT_STACK};font-size:15px;color:#4a4560;line-height:1.65;">
              ${
                input.chronotype
                  ? "Você também tem garantia de 7 dias pelo CDC. Se em qualquer momento dessa primeira semana não fizer sentido pra você, devolvemos integralmente — sem questionamento."
                  : "A pesquisa em cronobiologia mostra que cada pessoa pertence a um dos quatro perfis biológicos. Cada perfil tem uma janela de sono diferente, responde melhor a hábitos diferentes, e o programa se adapta ao seu."
              }
            </p>

            ${personalizationBlock}

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td align="center" style="padding:6px 0;">
                ${ctaButton(ctaHref, ctaLabel)}
              </td></tr>
            </table>

            ${ctaFootnote}

            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="card-soft" bgcolor="#f8f6ff" style="background:#f8f6ff;border-radius:10px;margin-top:32px;">
              <tr><td style="padding:20px 22px;">
                <p class="text-dark" style="margin:0 0 6px;font-family:${FONT_STACK};font-size:13px;font-weight:700;color:#1a1535;">
                  Precisa de algo?
                </p>
                <p class="text-body" style="margin:0;font-family:${FONT_STACK};font-size:13px;color:#4a4560;line-height:1.6;">
                  ${supportNote}
                </p>
              </td></tr>
            </table>

          </td></tr>
        </table>
      </td></tr>

      <tr><td align="center" style="padding:28px 16px 8px;">
        <p class="text-soft" style="margin:0 0 6px;font-family:${FONT_STACK};font-size:11px;color:#9590b0;line-height:1.6;">
          ${COMPANY_NAME}
        </p>
        <p class="text-soft" style="margin:0;font-family:${FONT_STACK};font-size:11px;color:#9590b0;line-height:1.6;">
          Você está recebendo este e-mail porque comprou o programa GoZzzz Sono+. Se não foi você, responda este e-mail.
        </p>
      </td></tr>

    </table>

  </td></tr>
</table>

</body>
</html>`;

  // Versão texto (multipart/alternative): curta, pessoal, com URL clara.
  const text = input.chronotype
    ? buildTextWithChronotype(firstName, input.chronotype, programUrl)
    : buildTextWithoutChronotype(firstName);

  return { subject, html, text };
}

function buildTextWithChronotype(
  firstName: string,
  c: Chronotype,
  programUrl: string
): string {
  const b = CHRONOTYPE_BLOCKS[c];
  const hello = firstName ? `Olá, ${firstName}.` : "Olá.";
  return [
    `${hello} Bem-vindo ao GoZzzz.`,
    "",
    "Seu pagamento foi confirmado e o acesso ao programa de 21 lições está liberado.",
    "",
    `Acesse aqui: ${programUrl}`,
    "",
    `Vi que você fez o teste — seu cronótipo é ${b.name}.`,
    `${b.description}`,
    "",
    `Janela ideal de sono: entre ${b.bedtimeWindow}.`,
    "",
    `${b.researcher}`,
    "",
    "Garantia de 7 dias pelo CDC. Se não fizer sentido nos primeiros 7 dias, devolvemos integralmente — sem questionamento.",
    "",
    `Qualquer dúvida, responda este e-mail ou escreva pra ${SUPPORT_EMAIL}.`,
    "",
    COMPANY_NAME,
  ].join("\n");
}

function buildTextWithoutChronotype(firstName: string): string {
  const hello = firstName ? `Olá, ${firstName}.` : "Olá.";
  return [
    `${hello} Bem-vindo ao GoZzzz.`,
    "",
    "Seu acesso está garantido. Antes da primeira lição, faça o teste de cronótipo (60 segundos, sem cadastro). Saber seu perfil biológico antes de começar muda toda a sequência das próximas 21 noites e poupa 1-2 semanas de tentativa-e-erro.",
    "",
    `Fazer o teste agora: ${QUIZ_URL}`,
    "",
    "Os 4 perfis: Lobo (noturno), Leão (matutino), Urso (solar), Golfinho (sono leve). Cada um tem uma janela de sono diferente.",
    "",
    "Após o teste, te enviamos o link da área de membros automaticamente.",
    "",
    `Qualquer dúvida, responda este e-mail ou escreva pra ${SUPPORT_EMAIL}.`,
    "",
    COMPANY_NAME,
  ].join("\n");
}
