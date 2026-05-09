import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { email, origin } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "E-mail é obrigatório." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY")!;

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    let user = null;
    let page = 1;
    while (!user) {
      const { data: users, error: listError } = await adminClient.auth.admin.listUsers({ perPage: 1000, page });
      if (listError) {
        console.error("listUsers error:", listError.message);
        break;
      }
      user = users.users.find((u) => u.email?.toLowerCase() === email.toLowerCase()) ?? null;
      if (users.users.length < 1000) break;
      page++;
    }

    if (!user) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const tokenArray = new Uint8Array(32);
    crypto.getRandomValues(tokenArray);
    const tokenHex = Array.from(tokenArray).map((b) => b.toString(16).padStart(2, "0")).join("");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    const { error: insertTokenError } = await adminClient.from("password_reset_tokens").insert({
      user_id: user.id,
      email: user.email,
      token: tokenHex,
      expires_at: expiresAt,
    });

    if (insertTokenError) {
      console.error("insert password_reset_tokens failed:", insertTokenError.message);
      return new Response(
        JSON.stringify({ error: "Não foi possível iniciar a recuperação de senha." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data: profileData } = await adminClient
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .maybeSingle();

    const firstName = profileData?.full_name ? profileData.full_name.split(" ")[0] : "";
    const resetUrl = `${origin}/reset-password?token=${tokenHex}`;

    const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Redefinir senha - GoZzzz</title></head>
<body style="margin:0;padding:0;background-color:#eeedf2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#eeedf2;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background-color:#09061a;border-radius:12px 12px 0 0;padding:40px 32px;text-align:center;">
            <div style="display:inline-block;background:rgba(212,169,106,0.12);border:1px solid rgba(212,169,106,0.35);border-radius:50%;width:60px;height:60px;line-height:60px;text-align:center;font-size:28px;margin-bottom:20px;">&#9790;</div>
            <h1 style="color:#d4a96a;margin:0 0 8px 0;font-size:34px;font-weight:800;letter-spacing:-0.5px;">GoZzzz</h1>
            <p style="color:#8892a4;margin:0;font-size:14px;font-weight:500;letter-spacing:0.3px;">Sua jornada para o sono perfeito</p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#ffffff;padding:48px 40px;">
            <h2 style="color:#09061a;margin:0 0 20px 0;font-size:24px;font-weight:700;line-height:1.3;">${firstName ? `Olá, ${firstName}!` : "Olá!"}</h2>
            <p style="color:#4a4a60;font-size:16px;line-height:28px;margin:0 0 12px 0;">
              Recebemos uma solicitação para redefinir a senha da sua conta GoZzzz.
            </p>
            <p style="color:#4a4a60;font-size:16px;line-height:28px;margin:0 0 36px 0;">
              Clique no botão abaixo para criar uma nova senha. Este link é válido por <strong style="color:#09061a;">1 hora</strong>.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:0 0 40px 0;">
              <a href="${resetUrl}" style="display:inline-block;background-color:#d4a96a;color:#09061a;text-decoration:none;padding:18px 52px;border-radius:10px;font-weight:700;font-size:16px;letter-spacing:0.3px;">Redefinir minha senha</a>
            </td></tr></table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:36px;">
              <tr><td style="background-color:#faf9f7;border-left:3px solid #d4a96a;border-radius:0 8px 8px 0;padding:16px 20px;">
                <p style="color:#6b7080;font-size:13px;line-height:21px;margin:0;">
                  Se você não solicitou a redefinição de senha, pode ignorar este e-mail. Sua senha não será alterada.
                </p>
              </td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e8e8f0;margin:0 0 32px 0;" />
            <p style="color:#a0a0b8;font-size:13px;text-align:center;margin:0;line-height:22px;">
              GoZzzz &mdash; Sua jornada para o sono perfeito<br/>
              <a href="https://gozzzz.app" style="color:#d4a96a;text-decoration:none;font-weight:600;">gozzzz.app</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#09061a;border-radius:0 0 12px 12px;padding:20px 32px;text-align:center;">
            <p style="color:#3d3a52;font-size:12px;margin:0;line-height:18px;">
              &copy; 2026 GoZzzz. Todos os direitos reservados.<br/>
              MORFEU SA&Uacute;DE E TECNOLOGIA LTDA &middot; CNPJ 66.059.212/0001-52<br/>
              <a href="https://gozzzz.app" style="color:#d4a96a;text-decoration:none;">gozzzz.app</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "GoZzzz <noreply@support.gozzzz.app>",
        reply_to: "suporte@gozzzz.app",
        to: email,
        subject: "Redefinir senha - GoZzzz",
        html,
        text: `GoZzzz - Redefinir senha\n\n${firstName ? `Ola, ${firstName}!` : "Ola!"}\n\nRecebemos uma solicitacao para redefinir a senha da sua conta GoZzzz.\n\nClique no link abaixo para criar uma nova senha. Este link e valido por 1 hora.\n\n${resetUrl}\n\nSe voce nao solicitou a redefinicao de senha, pode ignorar este e-mail. Sua senha nao sera alterada.\n\n© 2026 GoZzzz. Todos os direitos reservados.\nMORFEU SAUDE E TECNOLOGIA LTDA · CNPJ 66.059.212/0001-52\nhttps://gozzzz.app`,
        headers: {
          "List-Unsubscribe": "<mailto:unsubscribe@gozzzz.app?subject=unsubscribe>",
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          "X-Entity-Ref-ID": `reset-${user.id}-${Date.now()}`,
          "X-Priority": "3",
          "X-MSMail-Priority": "Normal",
          "Importance": "Normal",
          "Return-Path": "noreply@support.gozzzz.app",
        },
      }),
    });

    if (!sendRes.ok) {
      const sendErr = await sendRes.text();
      console.error("send-email failed:", sendRes.status, sendErr);
      return new Response(
        JSON.stringify({ error: "Não foi possível enviar o e-mail de redefinição agora. Tente novamente em instantes." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Forgot password error:", errorMsg);
    return new Response(
      JSON.stringify({ error: "Falha ao processar recuperação de senha. Tente novamente em instantes." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
