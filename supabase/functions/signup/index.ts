import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

function buildWelcomeEmail(firstName: string, language: string): { subject: string; html: string; text: string } {
  const isPt = language !== "en";
  const greetingName = firstName ? ` ${firstName}` : "";

  const copy = isPt
    ? {
        subject: "Sua conta GoZzzz foi criada",
        hello: `Olá${greetingName}`,
        body: "Sua conta no GoZzzz está ativa.\nUma boa noite de sono começa com um primeiro passo.",
        cta: "Acesse sua conta",
        ctaUrl: "https://gozzzz.app/login",
        help: "Se precisar de ajuda, é só responder este e-mail.",
        signature: "Equipe GoZzzz",
        footer: "Se não foi você, ignore esta mensagem.",
      }
    : {
        subject: "Your GoZzzz account has been created",
        hello: `Hello${greetingName},`,
        body: "Your GoZzzz account has been created successfully. You can now sign in to the app and start using the program.",
        cta: "Access my account",
        ctaUrl: "https://gozzzz.app",
        help: "If you did not create this account, please disregard this email.",
        signature: "The GoZzzz Team",
        footer: "You are receiving this email because an account was created at gozzzz.app.",
      };

  const html = `<!DOCTYPE html>
<html lang="${isPt ? "pt-BR" : "en"}">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${copy.subject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;color:#222222;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:32px 16px;">
<tr><td align="center">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#ffffff;border:1px solid #e5e5e5;border-radius:6px;">
<tr><td style="padding:32px 32px 24px;">
<p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:#222222;">${copy.hello}</p>
<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#222222;">${copy.body}</p>
<p style="margin:0 0 24px;">
<a href="${copy.ctaUrl}" style="display:inline-block;background-color:#2f5bea;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:4px;font-size:15px;font-weight:600;">${copy.cta}</a>
</p>
<p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#555555;">${copy.help}</p>
<p style="margin:0;font-size:15px;line-height:1.6;color:#222222;">${copy.signature}</p>
</td></tr>
<tr><td style="padding:16px 32px 24px;border-top:1px solid #eeeeee;">
<p style="margin:0;font-size:12px;line-height:1.5;color:#888888;">${copy.footer}<br />&copy; 2026 GoZzzz Morfeu<br />MORFEU SA&Uacute;DE E TECNOLOGIA LTDA<br />CNPJ: 66.059.212/0001-52</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  const text = `${copy.hello}

${copy.body}

${copy.cta}: ${copy.ctaUrl}

${copy.help}

${copy.signature}

---
${copy.footer}
© 2026 GoZzzz Morfeu
MORFEU SAÚDE E TECNOLOGIA LTDA
CNPJ: 66.059.212/0001-52`;

  return { subject: copy.subject, html, text };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, password, fullName, consents, language } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: userData, error: createError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName },
    });

    if (createError || !userData?.user) {
      const msg = createError?.message ?? "Unable to create account";
      const lower = msg.toLowerCase();
      if (
        lower.includes("already registered") ||
        lower.includes("already exists") ||
        lower.includes("already been registered") ||
        lower.includes("duplicate")
      ) {
        return new Response(
          JSON.stringify({ error: "email_already_registered" }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (lower.includes("password")) {
        return new Response(
          JSON.stringify({ error: "weak_password", detail: msg }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      return new Response(
        JSON.stringify({ error: "signup_failed", detail: msg }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = userData.user.id;
    const userLanguage = language === "en" ? "en" : "pt";

    const { error: profileUpsertError } = await adminClient
      .from("profiles")
      .upsert(
        {
          id: userId,
          email,
          full_name: fullName ?? null,
          language: userLanguage,
          subscription_type: "free",
          quiz_completed: false,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (profileUpsertError) {
      console.error("Profile upsert error:", profileUpsertError);
    }

    if (consents) {
      const consentRecords = [
        { user_id: userId, consent_type: "terms", granted: !!consents.terms, policy_version: "1.0" },
        { user_id: userId, consent_type: "privacy", granted: !!consents.privacy, policy_version: "1.0" },
        { user_id: userId, consent_type: "data_processing", granted: !!(consents.terms && consents.privacy), policy_version: "1.0" },
        { user_id: userId, consent_type: "marketing", granted: !!consents.marketing, policy_version: "1.0" },
      ];
      const { error: consentError } = await adminClient.from("consent_records").insert(consentRecords);
      if (consentError) {
        console.error("Consent insert error:", consentError);
      }
    }

    let emailSent = false;
    let emailError: string | null = null;

    if (resendApiKey) {
      try {
        const firstName = fullName ? fullName.split(" ")[0] : "";
        const { subject, html, text } = buildWelcomeEmail(firstName, userLanguage);

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "GoZzzz <noreply@support.gozzzz.app>",
            reply_to: "suporte@gozzzz.app",
            to: email,
            subject,
            html,
            text,
            headers: {
              "List-Unsubscribe": "<mailto:unsubscribe@support.gozzzz.app?subject=unsubscribe>",
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
              "X-Entity-Ref-ID": `signup-${userId}-${Date.now()}`,
            },
          }),
        });

        if (emailResponse.ok) {
          emailSent = true;
        } else {
          const errorText = await emailResponse.text();
          emailError = `Email service returned ${emailResponse.status}: ${errorText}`;
          console.error("Welcome email failed:", emailError);
        }
      } catch (emailErr) {
        emailError = emailErr instanceof Error ? emailErr.message : String(emailErr);
        console.error("Welcome email error:", emailError);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        userId,
        emailSent,
        emailError: emailError || undefined,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Signup error:", errorMsg);
    return new Response(
      JSON.stringify({ error: "signup_failed", detail: errorMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
