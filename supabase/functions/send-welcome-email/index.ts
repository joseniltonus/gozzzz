// Edge Function: send-welcome-email
//
// Dispara o e-mail de boas-vindas pós-compra do Sono+ Lite. Pode ser chamada
// manualmente (curl/admin tool) após cada venda no Kiwify, ou via webhook
// futuramente. Faz lookup automático de cronótipo na tabela chronotype_leads
// quando o cliente fez o quiz antes de comprar — assim o e-mail já chega
// personalizado.
//
// Endpoint: POST /functions/v1/send-welcome-email
// Body:
//   {
//     "email":      "cliente@gmail.com",     (obrigatório)
//     "firstName":  "Maria",                 (opcional)
//     "chronotype": "wolf",                  (opcional — detecta auto se ausente)
//     "source":     "kiwify"                 (opcional — só pra log)
//   }
//
// Resposta (200):
//   { ok: true, sentTo: "...", chronotype: "wolf"|null, messageId: "..." }
//
// Variáveis de ambiente (auto):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY
//   RESEND_API_KEY
//
// Auth: a função aceita ANON_KEY como Bearer token (igual ao resto). Em
// produção, considere adicionar uma checagem de header `X-Admin-Token` extra
// se for expor a função pra ser chamada de painéis externos.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import {
  buildWelcomeEmail,
  type Chronotype,
  type WelcomeEmailInput,
} from "./templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_CHRONOTYPES: Chronotype[] = ["dolphin", "lion", "bear", "wolf"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Domínio verificado no Resend é `support.gozzzz.app` (DKIM/SPF/DMARC ok).
// Usamos o local-part `bemvindo@` — passa pelo SPF do mesmo jeito que `noreply@`
// já usado em send-chronotype-report, mas tem ar mais humano. Reply-To aponta
// pra inbox real.
const FROM_NAME = "GoZzzz";
const FROM_EMAIL = "bemvindo@support.gozzzz.app";
const REPLY_TO = "suporte@gozzzz.app";

interface RequestPayload {
  email?: string;
  firstName?: string;
  chronotype?: string;
  source?: string;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !serviceKey) {
      console.error("Supabase env vars missing");
      return jsonResponse({ error: "Server not configured" }, 500);
    }
    if (!resendKey) {
      console.error("RESEND_API_KEY not set");
      return jsonResponse({ error: "Email provider not configured" }, 500);
    }

    let payload: RequestPayload;
    try {
      payload = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid JSON body" }, 400);
    }

    const email = (payload.email ?? "").trim().toLowerCase();
    if (!email || !EMAIL_RE.test(email)) {
      return jsonResponse({ error: "Invalid or missing email" }, 400);
    }

    const firstName = payload.firstName?.trim() || undefined;

    // Cronótipo: prioriza payload.chronotype; se ausente ou inválido, busca
    // o último registro do email em chronotype_leads. Se também não existir,
    // o e-mail vai sem personalização (usa o bloco "faça o quiz").
    let chronotype: Chronotype | null = null;
    const explicit = (payload.chronotype ?? "").toLowerCase();
    if (VALID_CHRONOTYPES.includes(explicit as Chronotype)) {
      chronotype = explicit as Chronotype;
    } else {
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });
      const { data, error: lookupErr } = await supabase
        .from("chronotype_leads")
        .select("chronotype")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (lookupErr) {
        console.warn("chronotype_leads lookup failed:", lookupErr.message);
      } else if (data?.chronotype && VALID_CHRONOTYPES.includes(data.chronotype as Chronotype)) {
        chronotype = data.chronotype as Chronotype;
      }
    }

    const emailInput: WelcomeEmailInput = {
      email,
      firstName,
      chronotype,
    };

    const { subject, html, text } = buildWelcomeEmail(emailInput);

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [email],
        reply_to: REPLY_TO,
        subject,
        html,
        text,
        // Tags ajudam a filtrar no painel do Resend e isolar deliverability
        // por origem (kiwify vs stripe vs teste).
        tags: [
          { name: "type", value: "welcome" },
          { name: "source", value: payload.source ?? "manual" },
          { name: "chronotype", value: chronotype ?? "none" },
        ],
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error(
        "Resend error",
        resendResponse.status,
        JSON.stringify(resendData)
      );
      return jsonResponse(
        {
          error: "Failed to send email",
          provider: resendData,
        },
        502
      );
    }

    return jsonResponse(
      {
        ok: true,
        sentTo: email,
        chronotype,
        firstName: firstName ?? null,
        messageId: resendData?.id ?? null,
      },
      200
    );
  } catch (err) {
    console.error("send-welcome-email crashed:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return jsonResponse({ error: msg }, 500);
  }
});
