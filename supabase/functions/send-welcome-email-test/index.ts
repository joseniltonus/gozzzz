import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function buildWelcomeEmail(firstName: string, language: string): { subject: string; html: string; text: string } {
  const isPt = language !== "en";

  const copy = isPt
    ? {
        subject: "Bem-vindo ao GoZzzz",
        tagline: "",
        headline: "Durma Melhor, Viva Melhor",
        subtitle: "Baseado em pesquisas científicas dos maiores especialistas do mundo",
        welcomeBadge: firstName ? `✓ Bem-vindo, ${firstName}!` : "✓ Bem-vindo!",
        accountActive: "Sua conta está ativa",
        ctaText: "Acessar o Programa",
        footerHelp: "Qualquer dúvida, responda este e-mail — teremos prazer em ajudar.",
        copyright: "Todos os direitos reservados.",
        privacyLabel: "Privacidade",
        termsLabel: "Termos",
      }
    : {
        subject: "Welcome to GoZzzz",
        tagline: "YOUR PERFECT SLEEP",
        headline: "Sleep Better, Live Better",
        subtitle: "Based on scientific research from the world's top sleep experts",
        welcomeBadge: firstName ? `✓ Welcome, ${firstName}!` : "✓ Welcome!",
        accountActive: "Your account is active",
        ctaText: "Access the Program",
        footerHelp: "Any questions? Reply to this email — we're happy to help.",
        copyright: "All rights reserved.",
        privacyLabel: "Privacy",
        termsLabel: "Terms",
      };

  const html = `<!DOCTYPE html>
<html lang="${isPt ? "pt-BR" : "en"}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${copy.subject}</title>
  <style>
    body { margin:0; padding:0; background-color:#0b0d1e; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Roboto,Arial,sans-serif; }
    table { border-collapse:collapse; }
    img { border:0; display:block; }
    a { text-decoration:none; }
    @media only screen and (max-width:600px) {
      .outer-pad { padding:24px 12px !important; }
      .card-pad { padding:24px 24px 40px !important; }
      .headline { font-size:24px !important; }
      .cta-btn { padding:14px 36px !important; font-size:14px !important; }
      .moon-cell { padding:24px 24px 0 !important; }
    }
  </style>
</head>
<body>
<div class="outer-pad" style="background-color:#0b0d1e;padding:40px 16px;">

  <!-- Card -->
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto;background-color:#12152b;border-radius:22px;overflow:hidden;">

    <!-- Main content -->
    <tr>
      <td class="card-pad" style="padding:22px 48px 52px;text-align:center;">

        <!-- Moon centered above title -->
        <svg style="margin:0 0 14px;width:100px;height:100px;display:block;margin-left:auto;margin-right:auto;filter:drop-shadow(0 0 20px rgba(107,104,224,0.5));" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-30, 80, 80)">
            <circle cx="80" cy="80" r="52" fill="#6B68E0"/>
            <circle cx="102" cy="74" r="44" fill="#0b0d1e"/>
          </g>
          <g transform="translate(130, 18)">
            <path d="M0,-9 L1.6,-1.6 L9,0 L1.6,1.6 L0,9 L-1.6,1.6 L-9,0 L-1.6,-1.6 Z" fill="white" opacity="0.95"/>
            <circle cx="0" cy="0" r="1.2" fill="white" opacity="0.9"/>
          </g>
          <g transform="translate(20, 132)">
            <path d="M0,-6 L1,-1 L6,0 L1,1 L0,6 L-1,1 L-6,0 L-1,-1 Z" fill="white" opacity="0.75"/>
            <circle cx="0" cy="0" r="0.8" fill="white" opacity="0.8"/>
          </g>
          <g transform="translate(151, 90)">
            <path d="M0,-4 L0.7,-0.7 L4,0 L0.7,0.7 L0,4 L-0.7,0.7 L-4,0 L-0.7,-0.7 Z" fill="white" opacity="0.6"/>
          </g>
        </svg>

        <!-- GoZzzz -->
        <h1 style="color:#F5F5F5;margin:0 0 12px;font-size:56px;font-weight:700;letter-spacing:0.4px;line-height:1;font-style:normal;mso-line-height-rule:exactly;">
          <span style="color:#F5F5F5;">Go</span><span style="color:#F5F5F5;">Zzzz</span>
        </h1>

        <!-- Tagline -->
        <p style="color:#8a93b8;margin:0 0 20px;font-size:11px;font-weight:600;letter-spacing:7px;text-transform:uppercase;line-height:1;">${copy.tagline}</p>

        <!-- Headline -->
        <h2 class="headline" style="color:#ffffff;margin:0 0 14px;font-size:28px;font-weight:800;line-height:1.3;letter-spacing:-0.2px;">${copy.headline}</h2>

        <!-- Italic subtitle -->
        <p style="color:#a9b0cc;margin:0 0 30px;font-size:14px;font-style:italic;line-height:1.65;max-width:380px;display:inline-block;">${copy.subtitle}</p>

        <!-- Welcome badge (no border/box) -->
        <p style="color:#e8eaf0;margin:0 0 20px;font-size:15px;font-weight:600;letter-spacing:0.2px;line-height:1;">${copy.welcomeBadge}</p>

        <!-- Account active -->
        <h3 style="color:#ffffff;margin:0 0 34px;font-size:22px;font-weight:800;line-height:1.3;letter-spacing:-0.2px;">${copy.accountActive}</h3>

        <!-- CTA Button -->
        <a href="https://gozzzz.app" class="cta-btn" style="display:inline-block;background:linear-gradient(135deg,#5b6ef5 0%,#7b8cff 100%);color:#ffffff;text-decoration:none;padding:16px 56px;border-radius:100px;font-weight:700;font-size:15px;letter-spacing:0.3px;box-shadow:0 10px 32px rgba(91,110,245,0.35);">${copy.ctaText} &rarr;</a>

        <!-- Footer help -->
        <p style="color:#9aa2c2;margin:32px 0 0;font-size:13px;line-height:1.6;">${copy.footerHelp}</p>

      </td>
    </tr>

  </table>

  <!-- Below-card footer -->
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;margin:0 auto;">
    <tr>
      <td style="text-align:center;padding:22px 16px 20px;">
        <p style="color:#F5F5F5;margin:0 0 10px;font-size:15px;font-weight:700;letter-spacing:1px;line-height:1;">GoZzzz</p>
        <p style="color:#7a82a3;margin:0 0 10px;font-size:12px;line-height:20px;">
          &copy; 2026 GoZzzz Morfeu. ${copy.copyright}<br />
          <a href="https://gozzzz.app/privacy" style="color:#7a82a3;text-decoration:underline;">${copy.privacyLabel}</a>
          &nbsp;&middot;&nbsp;
          <a href="https://gozzzz.app/terms" style="color:#7a82a3;text-decoration:underline;">${copy.termsLabel}</a>
          &nbsp;&middot;&nbsp;
          <a href="https://gozzzz.app" style="color:#8ea0ff;text-decoration:none;">gozzzz.app</a>
        </p>
        <p style="color:#7a82a3;margin:0;font-size:11px;line-height:18px;">
          MORFEU SAÚDE E TECNOLOGIA LTDA<br />
          CNPJ: 66.059.212/0001-52
        </p>
      </td>
    </tr>
  </table>

</div>
</body>
</html>`;

  const text = isPt
    ? `GoZzzz — ${copy.headline}\n\n${copy.welcomeBadge}\n${copy.accountActive}\n\n${copy.subtitle}\n\nAcesse o programa em: https://gozzzz.app\n\n${copy.footerHelp}\n\n© 2025 GoZzzz. ${copy.copyright}\nhttps://gozzzz.app/privacy | https://gozzzz.app/terms`
    : `GoZzzz — ${copy.headline}\n\n${copy.welcomeBadge}\n${copy.accountActive}\n\n${copy.subtitle}\n\nAccess the program at: https://gozzzz.app\n\n${copy.footerHelp}\n\n© 2025 GoZzzz. ${copy.copyright}\nhttps://gozzzz.app/privacy | https://gozzzz.app/terms`;

  return { subject: copy.subject, html, text };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, firstName = "Test User", language = "pt" } = await req.json().catch(() => ({}));

    // In test mode, send to verified email address
    const sendToEmail = email || "jose.nilton.us@gmail.com";

    const { subject, html, text } = buildWelcomeEmail(firstName, language);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "onboarding@resend.dev",
        reply_to: "suporte@gozzzz.app",
        to: sendToEmail,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": "<mailto:unsubscribe@gozzzz.app?subject=unsubscribe>",
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-Entity-Ref-ID": `welcome-test-${Date.now()}`,
          "X-Priority": "3",
          "X-MSMail-Priority": "Normal",
          "Importance": "Normal",
          "X-Mailer": "GoZzzz",
          "X-Originating-IP": "[0.0.0.0]",
          "Return-Path": "onboarding@resend.dev",
        },
      }),
    });

    if (emailResponse.ok) {
      const result = await emailResponse.json();
      console.log("Welcome email sent successfully to:", sendToEmail);
      return new Response(
        JSON.stringify({
          success: true,
          message: `Welcome email sent to ${sendToEmail}`,
          resendId: result.id,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } else {
      const errorText = await emailResponse.text();
      console.error("Welcome email failed:", errorText);
      return new Response(
        JSON.stringify({
          success: false,
          error: `Email service returned ${emailResponse.status}: ${errorText}`,
        }),
        { status: emailResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Send welcome email error:", errorMsg);
    return new Response(
      JSON.stringify({ error: errorMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
