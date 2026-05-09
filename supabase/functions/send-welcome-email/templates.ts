// Template do e-mail de boas-vindas pós-compra do Sono+ Lite (R$ 147).
//
// Estratégia de deliverability:
//   - HTML auto-contido com <style> no <head> + estilos inline críticos.
//   - Sem imagens, sem fontes externas, sem trackers, sem gradientes.
//     Renderiza igual em Gmail, Outlook 365, Apple Mail e em modo escuro.
//   - Multipart text/plain (fornecido por buildWelcomeEmail) — provedores
//     gostam quando há equilíbrio HTML+texto.
//   - Subject sem caps abusivo, sem emoji no assunto (passa melhor por
//     filtros corporativos brasileiros), nome do cliente quando disponível.
//   - Rodapé com nome legal do vendedor (CAN-SPAM / LGPD) e canal de suporte.
//
// Personalização de cronótipo:
//   - Se o e-mail tem cronótipo registrado em `chronotype_leads`, o bloco
//     mostra perfil específico (nome animal, característica, próximo passo).
//   - Se não tem, mostra CTA suave pro quiz (60s) com benefício claro.

export type Chronotype = "dolphin" | "lion" | "bear" | "wolf";

export interface WelcomeEmailInput {
  email: string;
  firstName?: string;
  chronotype?: Chronotype | null;
  programUrl?: string;
}

interface ChronotypeBlock {
  emoji: string;
  name: string;
  oneLiner: string;
  bedtimeWindow: string;
  startWith: string;
  researcher: string;
}

const CHRONOTYPE_BLOCKS: Record<Chronotype, ChronotypeBlock> = {
  dolphin: {
    emoji: "Golfinho",
    name: "Golfinho",
    oneLiner:
      "Sono leve e mente analítica. Cerca de 10% da população tem esse perfil.",
    bedtimeWindow: "23:30 — 00:00",
    startWith:
      "Comece pela Lição 4 (rotina de desaceleração mental) — vai resolver o problema mais comum no seu perfil: deitar cansado mas não conseguir desligar.",
    researcher:
      "Dr. Michael Breus, psicólogo clínico do sono diplomado pela American Board of Sleep Medicine, descreveu o perfil Golfinho a partir do trabalho dele com pacientes de insônia primária.",
  },
  lion: {
    emoji: "Leão",
    name: "Leão",
    oneLiner:
      "Acorda cedo com energia, perde o gás antes do anoitecer. Cerca de 15% das pessoas.",
    bedtimeWindow: "21:30 — 22:30",
    startWith:
      "Comece pela Lição 2 (proteção da janela matinal) — Leões respondem rápido a luz natural ao acordar e isso fortalece o ciclo inteiro do dia seguinte.",
    researcher:
      "Dr. Andrew Huberman, neurocientista da Stanford School of Medicine, publica extensamente sobre o impacto da exposição à luz nas primeiras horas do dia para tipos matutinos como o seu.",
  },
  bear: {
    emoji: "Urso",
    name: "Urso",
    oneLiner:
      "Sono alinhado com o ciclo solar. Cerca de 55% das pessoas — o perfil mais comum.",
    bedtimeWindow: "22:30 — 23:30",
    startWith:
      "Comece pela Lição 1 (regularidade circadiana) — pra Ursos, a constância dos horários é o fator que mais melhora qualidade do sono. Ganho rápido e duradouro.",
    researcher:
      "Dr. Charles Czeisler, professor de medicina do sono em Harvard Medical School, lidera há décadas pesquisas sobre regularidade circadiana — exatamente o que mais beneficia o seu perfil.",
  },
  wolf: {
    emoji: "Lobo",
    name: "Lobo",
    oneLiner:
      "Mais produtivo à noite, sofre com agendas matinais. Cerca de 15% das pessoas.",
    bedtimeWindow: "00:00 — 01:00",
    startWith:
      "Comece pela Lição 6 (atraso controlado de fase) — Lobos forçados a horários sociais matutinos acumulam jet lag silencioso. A lição 6 mostra como reduzir o atrito.",
    researcher:
      "Dr. Matthew Walker, professor de neurociência da UC Berkeley, escreve sobre o conflito entre cronótipos noturnos e a estrutura social diurna. Sua agenda biológica é normal — só está em contramão.",
  },
};

const PROGRAM_URL_DEFAULT = "https://gozzzz.app/web/programa";
const SUPPORT_EMAIL = "suporte@gozzzz.app";
const COMPANY_NAME = "MORFEU SAÚDE E TECNOLOGIA LTDA";
const QUIZ_URL = "https://gozzzz.app/web/sono-plus#quiz";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function chronotypeBlockHtml(c: Chronotype): string {
  const b = CHRONOTYPE_BLOCKS[c];
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#fafaf6;border:1px solid #e8e3d4;border-radius:10px;">
    <tr><td style="padding:20px 22px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9a7836;text-transform:uppercase;">
        Vi que você fez o teste · Cronótipo identificado
      </p>
      <p style="margin:0 0 12px;font-size:20px;font-weight:700;color:#1a1814;line-height:1.25;">
        Você é ${escape(b.name)}.
      </p>
      <p style="margin:0 0 14px;font-size:14px;color:#3f3a30;line-height:1.55;">
        ${escape(b.oneLiner)}
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:6px 0 14px;background:#ffffff;border:1px solid #e8e3d4;border-radius:8px;">
        <tr>
          <td style="padding:10px 14px;font-size:12px;color:#7a6a4a;font-weight:700;letter-spacing:0.6px;text-transform:uppercase;border-right:1px solid #e8e3d4;width:40%;">
            Sua janela ideal
          </td>
          <td style="padding:10px 14px;font-size:14px;color:#1a1814;font-weight:700;">
            ${escape(b.bedtimeWindow)}
          </td>
        </tr>
      </table>
      <p style="margin:0 0 12px;font-size:13px;color:#3f3a30;line-height:1.55;">
        <strong style="color:#1a1814;">Por onde começar:</strong> ${escape(b.startWith)}
      </p>
      <p style="margin:0;font-size:12px;color:#7a6a4a;line-height:1.5;font-style:italic;border-top:1px solid #e8e3d4;padding-top:12px;">
        ${escape(b.researcher)}
      </p>
    </td></tr>
  </table>`;
}

function quizPromoHtml(): string {
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;background:#fafaf6;border:1px solid #e8e3d4;border-radius:10px;">
    <tr><td style="padding:20px 22px;">
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9a7836;text-transform:uppercase;">
        Antes de começar · 60 segundos
      </p>
      <p style="margin:0 0 10px;font-size:18px;font-weight:700;color:#1a1814;line-height:1.3;">
        Você ainda não fez o teste de cronótipo.
      </p>
      <p style="margin:0 0 14px;font-size:14px;color:#3f3a30;line-height:1.55;">
        Cada pessoa pertence a um dos quatro perfis biológicos — <strong>Lobo</strong>,
        <strong>Leão</strong>, <strong>Urso</strong> ou <strong>Golfinho</strong>.
        Cada perfil tem janelas de sono diferentes e responde melhor a lições
        diferentes. O teste leva 60 segundos e ajusta toda a sequência das 21
        lições pra sua biologia.
      </p>
      <p style="margin:0;">
        <a href="${QUIZ_URL}" style="display:inline-block;padding:10px 18px;background:#1a1814;color:#fafaf6;font-size:13px;font-weight:700;text-decoration:none;border-radius:6px;">
          Fazer o teste agora →
        </a>
      </p>
    </td></tr>
  </table>`;
}

export function buildWelcomeEmail(input: WelcomeEmailInput): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = (input.firstName ?? "").trim();
  const programUrl = input.programUrl ?? PROGRAM_URL_DEFAULT;
  const greeting = firstName ? `Olá, ${escape(firstName)}.` : "Olá.";

  const subject = firstName
    ? `${firstName}, seu acesso ao GoZzzz está liberado`
    : "Seu acesso ao GoZzzz está liberado";

  const preheader =
    "Pagamento confirmado. Aqui estão seus próximos passos e o link de acesso ao programa.";

  const personalization = input.chronotype
    ? chronotypeBlockHtml(input.chronotype)
    : quizPromoHtml();

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${escape(subject)}</title>
  <style>
    body { margin:0; padding:0; background:#f4f1ea; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif; color:#1a1814; }
    table { border-collapse:collapse; }
    a { color:#9a7836; }
    @media (max-width:600px) {
      .outer { padding:18px 12px !important; }
      .card { padding:28px 22px !important; }
      .h1 { font-size:24px !important; line-height:1.2 !important; }
      .cta { padding:14px 22px !important; font-size:15px !important; }
    }
    @media (prefers-color-scheme: dark) {
      body { background:#0d0d10 !important; }
      .card { background:#16161a !important; color:#e8e5df !important; border-color:#2a2a30 !important; }
      .h1, .body p, .body strong, .footer p { color:#e8e5df !important; }
      .footer p { color:#7a7a82 !important; }
    }
  </style>
</head>
<body>
  <!-- preheader oculto -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#f4f1ea;">${escape(preheader)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
    <tr><td align="center" class="outer" style="padding:36px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Brand -->
        <tr><td align="center" style="padding-bottom:18px;">
          <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:6px;color:#9a7836;text-transform:uppercase;">
            GoZzzz
          </p>
        </td></tr>

        <!-- Card principal -->
        <tr><td>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" class="card" style="background:#ffffff;border:1px solid #e8e3d4;border-radius:14px;padding:40px 36px;">

            <tr><td>
              <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9a7836;text-transform:uppercase;">
                Pagamento confirmado
              </p>
              <h1 class="h1" style="margin:0 0 18px;font-size:28px;font-weight:800;color:#1a1814;line-height:1.2;letter-spacing:-0.4px;">
                ${greeting} Bem-vindo ao Sono+.
              </h1>

              <div class="body">
                <p style="margin:0 0 16px;font-size:15px;color:#3f3a30;line-height:1.65;">
                  Seu acesso ao programa de 21 lições foi liberado. As aulas
                  combinam neurociência do sono e medicina circadiana,
                  apresentadas em sequência prática — uma lição por noite, cinco
                  minutos cada.
                </p>

                <p style="margin:0 0 24px;font-size:15px;color:#3f3a30;line-height:1.65;">
                  Você ganhou também a garantia de 7 dias do CDC. Se em qualquer
                  momento dessa primeira semana não fizer sentido pra você,
                  devolvemos integralmente — sem questionamento.
                </p>
              </div>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td align="center" style="padding:8px 0 4px;">
                  <a href="${programUrl}" class="cta" style="display:inline-block;padding:16px 32px;background:#1a1814;color:#fafaf6;font-size:16px;font-weight:700;text-decoration:none;border-radius:8px;letter-spacing:0.2px;">
                    Acessar as 21 lições →
                  </a>
                </td></tr>
              </table>

              <p style="margin:14px 0 0;font-size:12px;color:#7a6a4a;text-align:center;line-height:1.5;">
                Salve este e-mail. Ele é a sua porta de entrada permanente.
              </p>

              <!-- Bloco personalizado: cronótipo OU promoção do quiz -->
              ${personalization}

              <!-- Sobre cronótipos -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;border-top:1px solid #e8e3d4;">
                <tr><td style="padding-top:24px;">
                  <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#9a7836;text-transform:uppercase;">
                    Por que isso importa
                  </p>
                  <p style="margin:0 0 14px;font-size:18px;font-weight:700;color:#1a1814;line-height:1.3;">
                    Não existe um único horário certo de dormir.
                  </p>
                  <p style="margin:0 0 12px;font-size:14px;color:#3f3a30;line-height:1.65;">
                    A pesquisa em cronobiologia identificou que cada pessoa tem
                    um padrão biológico próprio — chamado cronótipo — que
                    determina a janela em que o corpo libera melatonina, baixa
                    o cortisol e atinge sono profundo. Quem ignora esse padrão e
                    força horários "padronizados" acumula débito de sono mesmo
                    quando dorme oito horas.
                  </p>
                  <p style="margin:0 0 4px;font-size:14px;color:#3f3a30;line-height:1.65;">
                    O programa GoZzzz não te entrega "uma rotina universal" —
                    ele te ajuda a calibrar a sua, baseado no que dezenas de
                    estudos mostraram funcionar para o seu perfil.
                  </p>
                </td></tr>
              </table>

              <!-- Suporte -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;background:#fafaf6;border-radius:10px;">
                <tr><td style="padding:18px 20px;">
                  <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#1a1814;">
                    Precisa de algo?
                  </p>
                  <p style="margin:0;font-size:13px;color:#3f3a30;line-height:1.6;">
                    Responda este e-mail ou escreva pra
                    <a href="mailto:${SUPPORT_EMAIL}" style="color:#9a7836;text-decoration:underline;">${SUPPORT_EMAIL}</a>.
                    A gente lê e responde rápido.
                  </p>
                </td></tr>
              </table>

            </td></tr>
          </table>
        </td></tr>

        <!-- Rodapé -->
        <tr><td align="center" class="footer" style="padding:24px 12px 8px;">
          <p style="margin:0 0 4px;font-size:11px;color:#7a6a4a;line-height:1.6;">
            ${escape(COMPANY_NAME)}
          </p>
          <p style="margin:0;font-size:11px;color:#7a6a4a;line-height:1.6;">
            Você está recebendo este e-mail porque comprou o programa GoZzzz Sono+.
            Se não foi você, responda este e-mail.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  // Versão texto (multipart/alternative). Mantemos curta e pessoal — alguns
  // provedores (especialmente filtros corporativos) calculam o "score" de
  // ham/spam baseado no equilíbrio HTML/texto.
  const chronoLineText = input.chronotype
    ? `Vi que você fez o teste — seu cronótipo é ${CHRONOTYPE_BLOCKS[input.chronotype].name}. ${CHRONOTYPE_BLOCKS[input.chronotype].startWith}\n\nJanela ideal: ${CHRONOTYPE_BLOCKS[input.chronotype].bedtimeWindow}.\n\n`
    : `Você ainda não fez o teste de cronótipo. Faça em 60 segundos: ${QUIZ_URL}\n\n`;

  const text =
    `${firstName ? `Olá, ${firstName}.` : "Olá."} Bem-vindo ao Sono+.\n\n` +
    `Seu pagamento foi confirmado e o acesso ao programa de 21 lições está liberado. As aulas combinam neurociência do sono e medicina circadiana — uma lição por noite, cinco minutos cada.\n\n` +
    `Acesse aqui: ${programUrl}\n\n` +
    chronoLineText +
    `Por que cronótipo importa: a pesquisa em cronobiologia mostra que cada pessoa tem uma janela específica em que o corpo libera melatonina e atinge sono profundo. Forçar horários "padronizados" acumula débito de sono mesmo quando você dorme oito horas. As 21 lições calibram a sua rotina pro seu perfil biológico.\n\n` +
    `Garantia de 7 dias pelo CDC. Se não fizer sentido nos primeiros 7 dias, devolvemos integralmente.\n\n` +
    `Qualquer dúvida, responda este e-mail ou escreva pra ${SUPPORT_EMAIL}.\n\n` +
    `${COMPANY_NAME}\n`;

  return { subject, html, text };
}
