// Edge Function: send-chronotype-report
//
// Recebe o e-mail capturado no gate pós-quiz, registra o lead em
// `chronotype_leads` (service role · bypassa RLS), e dispara o relatório
// personalizado pelo cronótipo via Resend.
//
// Endpoint: POST /functions/v1/send-chronotype-report
// Body: { email, chronotype, language?, source?, quizAnswers? }
//
// Idempotência: se o mesmo (email, chronotype) já recebeu um envio bem
// sucedido nas últimas 24h, a função retorna 200 com `deduplicated: true`
// sem reenviar — protege contra clique duplo, retry de cliente, abuso leve.
//
// Variáveis de ambiente:
//   SUPABASE_URL                  (auto)
//   SUPABASE_SERVICE_ROLE_KEY     (auto)
//   RESEND_API_KEY                (já configurada no projeto)

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import { buildEmail, type Chronotype, type Language } from "./templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_CHRONOTYPES: Chronotype[] = ["dolphin", "lion", "bear", "wolf"];
const VALID_LANGUAGES: Language[] = ["pt", "en"];
const VALID_SOURCES = new Set([
  "web_quiz_inline",
  "web_quiz_inline_programa",
  "web_quiz_inline_sono",
  "modal_quiz",
  "web_funnel",
  "test",
]);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEDUPE_WINDOW_HOURS = 24;

interface RequestPayload {
  email?: string;
  chronotype?: string;
  language?: string;
  source?: string;
  quizAnswers?: unknown;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function truncateUa(ua: string | null): string | null {
  if (!ua) return null;
  return ua.slice(0, 240);
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: RequestPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const rawEmail = (payload.email ?? "").toString().trim();
  const email = rawEmail.toLowerCase();
  const chronotype = (payload.chronotype ?? "").toString().trim() as Chronotype;
  const language = (payload.language ?? "pt").toString().trim() as Language;
  const source = (payload.source ?? "web_quiz_inline").toString().trim();
  const quizAnswers = payload.quizAnswers ?? null;

  if (!email || !EMAIL_RE.test(email) || email.length > 254) {
    return jsonResponse({ error: "Invalid email" }, 400);
  }
  if (!VALID_CHRONOTYPES.includes(chronotype)) {
    return jsonResponse(
      { error: "Invalid chronotype", expected: VALID_CHRONOTYPES },
      400,
    );
  }
  if (!VALID_LANGUAGES.includes(language)) {
    return jsonResponse(
      { error: "Invalid language", expected: VALID_LANGUAGES },
      400,
    );
  }
  if (!VALID_SOURCES.has(source)) {
    return jsonResponse(
      { error: "Invalid source", expected: Array.from(VALID_SOURCES) },
      400,
    );
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (!supabaseUrl || !serviceRoleKey) {
    console.error(
      "send-chronotype-report: Supabase env vars missing (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)",
    );
    return jsonResponse({ error: "Service not configured" }, 500);
  }
  if (!resendApiKey) {
    console.error("send-chronotype-report: RESEND_API_KEY missing");
    return jsonResponse({ error: "Email provider not configured" }, 500);
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const ipHash = await sha256Hex(getClientIp(req));
  const userAgent = truncateUa(req.headers.get("user-agent"));

  // ─── Dedupe ─────────────────────────────────────────────────────────
  // Se a combinação (email, chronotype) já recebeu um envio confirmado
  // nas últimas 24h, retornamos sucesso idempotente — sem reenviar.
  const dedupeSince = new Date(
    Date.now() - DEDUPE_WINDOW_HOURS * 60 * 60 * 1000,
  ).toISOString();

  const { data: existing, error: existingErr } = await admin
    .from("chronotype_leads")
    .select("id, email_sent_at")
    .eq("email", email)
    .eq("chronotype", chronotype)
    .not("email_sent_at", "is", null)
    .gte("email_sent_at", dedupeSince)
    .order("email_sent_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingErr) {
    console.error("send-chronotype-report: dedupe query failed", existingErr);
    // não bloqueia: segue tentando o envio
  } else if (existing) {
    console.log(
      `send-chronotype-report: dedupe hit · email=${email} chronotype=${chronotype}`,
    );
    return jsonResponse(
      {
        success: true,
        deduplicated: true,
        leadId: existing.id,
      },
      200,
    );
  }

  // ─── Insert lead ────────────────────────────────────────────────────
  const insertPayload = {
    email,
    chronotype,
    language,
    source,
    quiz_answers: quizAnswers,
    ip_hash: ipHash,
    user_agent: userAgent,
  };

  const { data: lead, error: insertErr } = await admin
    .from("chronotype_leads")
    .insert(insertPayload)
    .select("id")
    .single();

  if (insertErr || !lead) {
    console.error("send-chronotype-report: insert failed", insertErr);
    return jsonResponse(
      { error: "Failed to register lead", detail: insertErr?.message },
      500,
    );
  }

  // ─── Build & send email via Resend ──────────────────────────────────
  const built = buildEmail(chronotype, language);

  const emailPayload = {
    from: "GoZzzz <noreply@support.gozzzz.app>",
    reply_to: "suporte@gozzzz.app",
    to: email,
    subject: built.subject,
    html: built.html,
    text: built.text,
    headers: {
      "List-Unsubscribe":
        "<mailto:unsubscribe@support.gozzzz.app?subject=unsubscribe>",
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      "X-Entity-Ref-ID": `gozzzz-chronotype-${chronotype}-${lead.id}`,
    },
  };

  let resendStatus = 0;
  let resendBody = "";
  try {
    const resendResp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });
    resendStatus = resendResp.status;
    resendBody = await resendResp.text();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("send-chronotype-report: Resend fetch threw", msg);
    await admin
      .from("chronotype_leads")
      .update({ email_error: `fetch_error: ${msg}` })
      .eq("id", lead.id);
    return jsonResponse(
      { error: "Failed to dispatch email", detail: msg, leadId: lead.id },
      502,
    );
  }

  if (resendStatus < 200 || resendStatus >= 300) {
    console.error(
      `send-chronotype-report: Resend rejected · status=${resendStatus} body=${resendBody}`,
    );
    await admin
      .from("chronotype_leads")
      .update({
        email_error: `resend_${resendStatus}: ${resendBody.slice(0, 500)}`,
      })
      .eq("id", lead.id);
    return jsonResponse(
      {
        error: "Email provider rejected request",
        status: resendStatus,
        leadId: lead.id,
      },
      502,
    );
  }

  let messageId: string | null = null;
  try {
    const parsed = JSON.parse(resendBody);
    messageId = typeof parsed?.id === "string" ? parsed.id : null;
  } catch {
    // resposta não-JSON do Resend é improvável em sucesso; segue sem id
  }

  const { error: updateErr } = await admin
    .from("chronotype_leads")
    .update({
      email_sent_at: new Date().toISOString(),
      email_message_id: messageId,
    })
    .eq("id", lead.id);

  if (updateErr) {
    console.error(
      "send-chronotype-report: post-send update failed (email was sent)",
      updateErr,
    );
    // não bloqueia a resposta de sucesso — e-mail saiu
  }

  return jsonResponse(
    {
      success: true,
      leadId: lead.id,
      messageId,
      chronotype,
    },
    200,
  );
});
