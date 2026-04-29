import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function sendWelcomeEmail(
  resendApiKey: string,
  email: string,
  fullName: string
) {
  const firstName = fullName ? fullName.split(" ")[0] : "por aqui";

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bem-vindo ao GoZzzz!</title></head>
<body style="margin:0;padding:0;background-color:#eeedf2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eeedf2;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr>
          <td style="background-color:#09061a;border-radius:12px 12px 0 0;padding:40px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(212,169,106,0.12);border:1px solid rgba(212,169,106,0.35);border-radius:50%;width:60px;height:60px;line-height:60px;text-align:center;font-size:28px;margin-bottom:20px;">&#9790;</div>
            <h1 style="color:#f5f5f5;margin:0 0 8px 0;font-size:34px;font-weight:800;letter-spacing:-0.5px;">GoZzzz</h1>
            <p style="color:#8892a4;margin:0;font-size:14px;font-weight:500;letter-spacing:0.3px;">Sua jornada para o sono perfeito</p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="background-color:#ffffff;padding:48px 40px;">
            <!-- Success badge -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr><td align="center">
                <div style="display:inline-block;background:#f0fdf8;border:1px solid #a7f3d0;border-radius:100px;padding:8px 20px;">
                  <span style="color:#059669;font-size:13px;font-weight:700;letter-spacing:0.3px;">&#10003; Conta confirmada com sucesso</span>
                </div>
              </td></tr>
            </table>
            <h2 style="color:#09061a;margin:0 0 20px 0;font-size:24px;font-weight:700;line-height:1.3;">Bem-vindo, ${firstName}!</h2>
            <p style="color:#4a4a60;font-size:16px;line-height:28px;margin:0 0 32px 0;">
              Sua conta foi ativada. Agora você tem acesso completo ao programa <span style="color:#f5f5f5;">GoZzzz</span> e pode começar sua transformação do sono hoje mesmo.
            </p>
            <!-- Benefits -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
              <tr><td style="background-color:#faf9f7;border-radius:10px;padding:24px 28px;">
                <p style="color:#09061a;font-size:14px;font-weight:700;margin:0 0 16px 0;letter-spacing:0.3px;text-transform:uppercase;">O que você vai aprender:</p>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr><td style="padding:6px 0;color:#4a4a60;font-size:15px;line-height:22px;"><span style="color:#d4a96a;font-weight:700;margin-right:10px;">&#9679;</span>Fundamentos de um sono de qualidade</td></tr>
                  <tr><td style="padding:6px 0;color:#4a4a60;font-size:15px;line-height:22px;"><span style="color:#d4a96a;font-weight:700;margin-right:10px;">&#9679;</span>Rotinas que preparam corpo e mente para dormir</td></tr>
                  <tr><td style="padding:6px 0;color:#4a4a60;font-size:15px;line-height:22px;"><span style="color:#d4a96a;font-weight:700;margin-right:10px;">&#9679;</span>Como eliminar hábitos que sabotam seu descanso</td></tr>
                  <tr><td style="padding:6px 0;color:#4a4a60;font-size:15px;line-height:22px;"><span style="color:#d4a96a;font-weight:700;margin-right:10px;">&#9679;</span>Acordar descansado e cheio de energia todo dia</td></tr>
                </table>
              </td></tr>
            </table>
            <!-- CTA Button -->
            <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:0 0 40px 0;">
              <a href="https://gozzzz.app" style="display:inline-block;background-color:#d4a96a;color:#09061a;text-decoration:none;padding:18px 52px;border-radius:10px;font-weight:700;font-size:16px;letter-spacing:0.3px;">Acessar o Programa</a>
            </td></tr></table>
            <hr style="border:none;border-top:1px solid #e8e8f0;margin:0 0 32px 0;" />
            <p style="color:#a0a0b8;font-size:13px;text-align:center;margin:0;line-height:22px;">
              Qualquer dúvida, responda este e-mail — teremos prazer em ajudar.<br/>
              <span style="color:#f5f5f5;">GoZzzz</span> &mdash; Sua jornada para o sono perfeito
            </p>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#09061a;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
            <p style="color:#3d3a52;font-size:12px;margin:0;line-height:18px;">
              &copy; 2025 <span style="color:#f5f5f5;">GoZzzz</span>. Todos os direitos reservados.<br/>
              <a href="https://gozzzz.app" style="color:#d4a96a;text-decoration:none;">gozzzz.app</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "GoZzzz <noreply@support.gozzzz.app>",
      reply_to: "suporte@gozzzz.app",
      to: email,
      subject: "Bem-vindo ao GoZzzz - Sua conta esta ativa",
      html,
      text: `GoZzzz - Bem-vindo, ${firstName}!\n\nSua conta foi confirmada com sucesso.\n\nAgora voce tem acesso completo ao programa GoZzzz e pode comecar sua transformacao do sono hoje mesmo.\n\nO que voce vai aprender:\n- Fundamentos de um sono de qualidade\n- Rotinas que preparam corpo e mente para dormir\n- Como eliminar habitos que sabotam seu descanso\n- Acordar descansado e cheio de energia todo dia\n\nAcesse o programa em: https://gozzzz.app\n\nQualquer duvida, responda este e-mail.\n\n© 2025 GoZzzz. Todos os direitos reservados.\nhttps://gozzzz.app`,
      headers: {
        "List-Unsubscribe": "<mailto:unsubscribe@gozzzz.app?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `confirm-${email}-${Date.now()}`,
        "X-Priority": "3",
        "X-MSMail-Priority": "Normal",
        "Importance": "Normal",
        "Return-Path": "noreply@support.gozzzz.app",
      },
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Failed to send welcome email:", response.status, text);
  } else {
    console.log("Welcome email sent to", email);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ error: "Token inválido." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: tokenData, error: findError } = await adminClient
      .from("email_tokens")
      .select("user_id, email, expires_at, confirmed_at")
      .eq("token", token)
      .maybeSingle();

    if (findError || !tokenData) {
      return new Response(
        JSON.stringify({ error: "Token de confirmação não encontrado ou inválido." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (new Date(tokenData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "Este link de confirmação expirou. Solicite um novo." }),
        { status: 410, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (tokenData.confirmed_at) {
      return new Response(
        JSON.stringify({ success: true, message: "Seu e-mail já foi confirmado!" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: updateTokenError } = await adminClient
      .from("email_tokens")
      .update({ confirmed_at: new Date().toISOString() })
      .eq("token", token);

    if (updateTokenError) {
      return new Response(
        JSON.stringify({ error: "Erro ao confirmar token." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: adminError } = await adminClient.auth.admin.updateUserById(
      tokenData.user_id,
      { email_confirm: true }
    );

    if (adminError) {
      console.error("Admin updateUser error:", adminError);
    }

    const { data: profileData } = await adminClient
      .from("profiles")
      .select("full_name")
      .eq("id", tokenData.user_id)
      .maybeSingle();

    const fullName = profileData?.full_name ?? "";

    EdgeRuntime.waitUntil(sendWelcomeEmail(resendApiKey, tokenData.email, fullName));

    return new Response(
      JSON.stringify({ success: true, message: "Parabéns! Seu e-mail foi confirmado com sucesso." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error confirming email:", errorMsg);
    return new Response(
      JSON.stringify({ error: "Ocorreu um erro ao confirmar seu e-mail." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
