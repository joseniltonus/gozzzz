import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

type DeletionRequest = {
  id: string;
  user_id: string;
  reason?: string | null;
};

type ExportRequest = {
  id: string;
  user_id: string;
};

function jsonResponse(status: number, payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getBearerToken(req: Request): string {
  const auth = req.headers.get("Authorization") ?? "";
  if (!auth.startsWith("Bearer ")) return "";
  return auth.slice("Bearer ".length).trim();
}

function buildExportHtml(email: string, data: Record<string, unknown>) {
  const pretty = JSON.stringify(data, null, 2)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Exportacao de dados - GoZzzz</title></head>
<body style="margin:0;padding:24px;background:#f5f5f5;font-family:Arial,sans-serif;">
  <div style="max-width:760px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:10px;padding:24px;">
    <h1 style="margin:0 0 12px;font-size:22px;color:#111827;">Exportacao de dados</h1>
    <p style="margin:0 0 18px;color:#4b5563;">Solicitacao processada para <strong>${email}</strong>.</p>
    <p style="margin:0 0 12px;color:#4b5563;">Abaixo esta a copia dos seus dados em formato JSON.</p>
    <pre style="white-space:pre-wrap;word-break:break-word;background:#0b1020;color:#e5e7eb;padding:16px;border-radius:8px;font-size:12px;line-height:1.5;">${pretty}</pre>
  </div>
</body>
</html>`;
}

async function sendEmail(
  resendApiKey: string | undefined,
  to: string,
  subject: string,
  html: string,
  text: string
) {
  if (!resendApiKey) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify({
      from: "GoZzzz <noreply@support.gozzzz.app>",
      reply_to: "suporte@gozzzz.app",
      to,
      subject,
      html,
      text,
    }),
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    const processSecret = Deno.env.get("PRIVACY_PROCESSOR_SECRET");
    const providedSecret = getBearerToken(req);

    if (!processSecret || providedSecret !== processSecret) {
      return jsonResponse(401, { error: "Unauthorized" });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const { data: exportRequests, error: exportErr } = await adminClient
      .from("data_export_requests")
      .select("id,user_id")
      .eq("status", "pending")
      .order("requested_at", { ascending: true })
      .limit(20);

    if (exportErr) {
      return jsonResponse(500, { error: "Failed to read export requests", detail: exportErr.message });
    }

    let exportsProcessed = 0;
    for (const request of (exportRequests ?? []) as ExportRequest[]) {
      const { error: markProcessingErr } = await adminClient
        .from("data_export_requests")
        .update({ status: "processing" })
        .eq("id", request.id)
        .eq("status", "pending");

      if (markProcessingErr) continue;

      try {
        const { data: authUser } = await adminClient.auth.admin.getUserById(request.user_id);
        const email = authUser?.user?.email;
        if (!email) throw new Error("User email not found");

        const payload: Record<string, unknown> = {};

        const profileRes = await adminClient.from("profiles").select("*").eq("id", request.user_id).maybeSingle();
        if (!profileRes.error) payload.profile = profileRes.data;

        const progressRes = await adminClient.from("user_progress").select("*").eq("user_id", request.user_id);
        if (!progressRes.error) payload.user_progress = progressRes.data ?? [];

        const consentRes = await adminClient.from("consent_records").select("*").eq("user_id", request.user_id);
        if (!consentRes.error) payload.consent_records = consentRes.data ?? [];

        const feedbackRes = await adminClient.from("lesson_feedback").select("*").eq("user_id", request.user_id);
        if (!feedbackRes.error) payload.lesson_feedback = feedbackRes.data ?? [];

        const exportText = `Exportacao de dados GoZzzz\n\nEmail: ${email}\nData: ${new Date().toISOString()}\n\n${JSON.stringify(payload, null, 2)}`;
        await sendEmail(
          resendApiKey,
          email,
          "GoZzzz - Exportacao de dados solicitada",
          buildExportHtml(email, payload),
          exportText
        );

        await adminClient
          .from("data_export_requests")
          .update({ status: "completed", completed_at: new Date().toISOString() })
          .eq("id", request.id);

        exportsProcessed += 1;
      } catch (_err) {
        await adminClient.from("data_export_requests").update({ status: "pending" }).eq("id", request.id);
      }
    }

    const { data: deletionRequests, error: deletionErr } = await adminClient
      .from("data_deletion_requests")
      .select("id,user_id,reason")
      .eq("status", "pending")
      .order("requested_at", { ascending: true })
      .limit(20);

    if (deletionErr) {
      return jsonResponse(500, { error: "Failed to read deletion requests", detail: deletionErr.message });
    }

    let deletionsProcessed = 0;
    for (const request of (deletionRequests ?? []) as DeletionRequest[]) {
      const { error: markProcessingErr } = await adminClient
        .from("data_deletion_requests")
        .update({ status: "processing" })
        .eq("id", request.id)
        .eq("status", "pending");

      if (markProcessingErr) continue;

      try {
        const { data: authUser } = await adminClient.auth.admin.getUserById(request.user_id);
        const email = authUser?.user?.email ?? "";

        // Best-effort delete from user-owned tables before deleting auth user.
        await adminClient.from("user_progress").delete().eq("user_id", request.user_id);
        await adminClient.from("consent_records").delete().eq("user_id", request.user_id);
        await adminClient.from("data_export_requests").delete().eq("user_id", request.user_id);
        await adminClient.from("email_tokens").delete().eq("user_id", request.user_id);
        await adminClient.from("password_reset_tokens").delete().eq("user_id", request.user_id);
        await adminClient.from("lesson_feedback").delete().eq("user_id", request.user_id);
        await adminClient.from("profiles").delete().eq("id", request.user_id);

        const { error: deleteAuthErr } = await adminClient.auth.admin.deleteUser(request.user_id);
        if (deleteAuthErr) throw deleteAuthErr;

        await adminClient
          .from("data_deletion_requests")
          .update({ status: "completed", completed_at: new Date().toISOString() })
          .eq("id", request.id);

        if (email) {
          await sendEmail(
            resendApiKey,
            email,
            "GoZzzz - Confirmacao de exclusao de conta",
            `<p>Sua solicitacao de exclusao de conta foi concluida com sucesso.</p><p>Data: ${new Date().toISOString()}</p>`,
            `Sua solicitacao de exclusao de conta GoZzzz foi concluida.`
          );
        }

        deletionsProcessed += 1;
      } catch (_err) {
        await adminClient.from("data_deletion_requests").update({ status: "pending" }).eq("id", request.id);
      }
    }

    return jsonResponse(200, {
      success: true,
      exportsProcessed,
      deletionsProcessed,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    return jsonResponse(500, { error: "Processor failed", detail: msg });
  }
});

