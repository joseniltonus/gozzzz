// Edge Function: kiwify-webhook
//
// Recebe o postback (webhook) do Kiwify quando uma compra é aprovada e dispara
// o e-mail de boas-vindas customizado via Resend, com link de acesso ao
// programa. Substitui a dependência do e-mail automático do Kiwify (que não
// é customizável no plano gratuito).
//
// Endpoint: POST /functions/v1/kiwify-webhook
//
// Configuração no painel Kiwify (Apps → Webhooks):
//   URL base:
//     https://<projeto>.supabase.co/functions/v1/kiwify-webhook
//
//   Autenticação — escolha UM dos métodos abaixo (a função aceita todos):
//
//   A) Token na URL (mais simples se o painel não mostrar token):
//      Gere um segredo (ex.: openssl rand -hex 24), salve como
//      KIWIFY_WEBHOOK_SECRET no Supabase e use a URL:
//      .../kiwify-webhook?token=SEU_SEGREDO_AQUI
//
//   B) Token no corpo JSON:
//      A API da Kiwify devolve um campo `token` ao criar o webhook — esse
//      mesmo valor costuma vir em cada POST. Copie do painel "Ver logs"
//      (teste do webhook) ou da resposta da API e use como KIWIFY_WEBHOOK_SECRET.
//
//   C) Assinatura HMAC (se a Kiwify enviar ?signature= ou header):
//      Mantemos verificação HMAC-SHA1 do body com o mesmo secret.
//
// Variáveis de ambiente:
//   KIWIFY_WEBHOOK_SECRET — obrigatório (um dos métodos acima)
//   RESEND_API_KEY        — obrigatório

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { buildPurchaseConfirmationEmail } from "./templates.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey, X-Kiwify-Signature",
};

const FROM_NAME = "GoZzzz";
const FROM_EMAIL = "compra@support.gozzzz.app";
const REPLY_TO = "suporte@gozzzz.app";

const PROGRAM_URL_WITH_KEY =
  "https://gozzzz.app/web/programa?key=044471cbfb3f96fae4db57f7271f89c9";

// Status que indicam pagamento confirmado no Kiwify. Pode variar entre
// versões da API — listamos os mais comuns. Se chegar um status diferente
// ignoramos (não é erro — pode ser "pending", "refunded", etc).
const APPROVED_STATUSES = new Set([
  "paid",
  "approved",
  "completed",
  "compra aprovada",
  "pago",
  "aprovado",
  "aprovada",
]);

/** Evento explícito da Kiwify (webhook de e-commerce) */
const APPROVED_EVENT_TYPES = new Set([
  "compra_aprovada",
  "compra aprovada",
  "order_paid",
  "order.paid",
]);

interface KiwifyCustomer {
  email?: string;
  first_name?: string;
  full_name?: string;
  name?: string;
}

interface KiwifyProduct {
  product_id?: string;
  product_name?: string;
  name?: string;
}

interface KiwifyCommissions {
  product_base_price?: number;
  charge_amount?: number;
  net_amount?: number;
}

// Kiwify usa nomes inconsistentes entre versões da API. Capturamos os mais
// comuns como opcionais.
interface KiwifyPayload {
  order_id?: string;
  id?: string;
  order_status?: string;
  status?: string;
  /** Token de autenticação do webhook (API Kiwify — vem em cada POST) */
  token?: string;
  webhook_event_type?: string;
  event?: string;
  type?: string;
  Customer?: KiwifyCustomer;
  customer?: KiwifyCustomer;
  Product?: KiwifyProduct;
  product?: KiwifyProduct;
  Commissions?: KiwifyCommissions;
  commissions?: KiwifyCommissions;
}

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function pickStringField(...candidates: Array<string | undefined>): string | undefined {
  for (const c of candidates) {
    if (typeof c === "string" && c.trim().length > 0) return c.trim();
  }
  return undefined;
}

function extractFirstName(c?: KiwifyCustomer): string | undefined {
  if (!c) return undefined;
  if (c.first_name && c.first_name.trim()) return c.first_name.trim();
  const full = c.full_name ?? c.name;
  if (full && full.trim()) return full.trim().split(/\s+/)[0];
  return undefined;
}

function formatCents(amount: number | undefined): string | undefined {
  if (typeof amount !== "number" || !Number.isFinite(amount)) return undefined;
  // Kiwify pode mandar valores em centavos OU em reais. Heurística: se o
  // valor for maior que 1000, assumimos centavos. Cobre R$ 10+ em centavos
  // e qualquer coisa abaixo de R$ 1000 em reais.
  const reais = amount > 1000 ? amount / 100 : amount;
  return reais.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

async function verifyKiwifySignature(
  rawBody: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  // Algumas integrações enviam assinatura HMAC-SHA1 do body com o secret.
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      enc.encode(secret),
      { name: "HMAC", hash: "SHA-1" },
      false,
      ["sign"],
    );
    const macBuf = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
    const computed = Array.from(new Uint8Array(macBuf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (computed.length !== signature.length) return false;
    let diff = 0;
    for (let i = 0; i < computed.length; i++) {
      diff |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return diff === 0;
  } catch (err) {
    console.error("HMAC verification failed:", err);
    return false;
  }
}

/** Comparação em tempo constante para strings (tokens). */
function timingSafeEqualString(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

function extractBodyToken(payload: Record<string, unknown>): string | undefined {
  const keys = ["token", "webhook_token", "WebhookToken", "signature_token"];
  for (const k of keys) {
    const v = payload[k];
    if (typeof v === "string" && v.trim().length > 0) return v.trim();
  }
  return undefined;
}

/**
 * A Kiwify não documenta um único método de auth no painel gratuito.
 * Aceitamos: token na query (?token=), token no JSON, ou HMAC (?signature=).
 */
async function verifyWebhookRequest(
  req: Request,
  rawBody: string,
  payload: Record<string, unknown>,
  secret: string,
): Promise<boolean> {
  const url = new URL(req.url);

  const qpToken = url.searchParams.get("token");
  if (qpToken && timingSafeEqualString(qpToken.trim(), secret)) {
    console.log("Webhook auth: OK (query param token)");
    return true;
  }

  const bodyToken = extractBodyToken(payload);
  if (bodyToken && timingSafeEqualString(bodyToken, secret)) {
    console.log("Webhook auth: OK (JSON body token)");
    return true;
  }

  const signature =
    url.searchParams.get("signature") ??
    req.headers.get("x-kiwify-signature") ??
    "";

  if (signature) {
    const ok = await verifyKiwifySignature(rawBody, signature, secret);
    if (ok) console.log("Webhook auth: OK (HMAC signature)");
    return ok;
  }

  return false;
}

function isApprovedPurchase(payload: KiwifyPayload): boolean {
  const status = (
    payload.order_status ??
    payload.status ??
    ""
  )
    .toString()
    .toLowerCase()
    .trim();

  if (APPROVED_STATUSES.has(status)) return true;

  const evt = (
    payload.webhook_event_type ??
    payload.event ??
    payload.type ??
    ""
  )
    .toString()
    .toLowerCase()
    .trim();

  if (APPROVED_EVENT_TYPES.has(evt)) return true;

  return false;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const webhookSecret = Deno.env.get("KIWIFY_WEBHOOK_SECRET")?.trim();
  const resendKey = Deno.env.get("RESEND_API_KEY");

  if (!webhookSecret) {
    console.error("KIWIFY_WEBHOOK_SECRET not configured");
    return jsonResponse({ error: "Server not configured" }, 500);
  }
  if (!resendKey) {
    console.error("RESEND_API_KEY not configured");
    return jsonResponse({ error: "Email provider not configured" }, 500);
  }

  const rawBody = await req.text();

  let payload: KiwifyPayload;
  try {
    payload = JSON.parse(rawBody) as KiwifyPayload;
  } catch (err) {
    console.error("Failed to parse Kiwify webhook body:", err);
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const authorized = await verifyWebhookRequest(
    req,
    rawBody,
    payload as Record<string, unknown>,
    webhookSecret,
  );

  if (!authorized) {
    console.warn(
      "Webhook unauthorized — configure one of: " +
        "(1) append ?token=<same as KIWIFY_WEBHOOK_SECRET> to the webhook URL in Kiwify, " +
        "(2) set KIWIFY_WEBHOOK_SECRET to the `token` field inside the POST body (see Ver logs → payload), " +
        "(3) or use HMAC ?signature= if your integration sends it.",
    );
    return jsonResponse(
      {
        error: "Unauthorized",
        hint:
          "Use ?token= on the webhook URL matching KIWIFY_WEBHOOK_SECRET, or set secret to the token field from webhook JSON.",
      },
      401,
    );
  }

  if (!isApprovedPurchase(payload)) {
    const status =
      (payload.order_status ?? payload.status ?? "").toString();
    const evt =
      (payload.webhook_event_type ?? payload.event ?? "").toString();
    console.log(
      `Skipping webhook — not an approved purchase (status="${status}", event="${evt}")`,
    );
    return jsonResponse(
      {
        ok: true,
        skipped: true,
        order_status: status || null,
        webhook_event_type: evt || null,
      },
      200,
    );
  }

  const customer = payload.Customer ?? payload.customer;
  const email = pickStringField(customer?.email)?.toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    console.error("Webhook missing valid customer email", { payload });
    return jsonResponse({ error: "Missing customer email" }, 400);
  }

  const product = payload.Product ?? payload.product;
  const productName = pickStringField(product?.product_name, product?.name);
  const orderId = pickStringField(payload.order_id, payload.id);

  const commissions = payload.Commissions ?? payload.commissions;
  const amountFormatted =
    formatCents(commissions?.charge_amount) ??
    formatCents(commissions?.product_base_price);

  const emailContent = buildPurchaseConfirmationEmail({
    email,
    firstName: extractFirstName(customer),
    orderId,
    amountFormatted,
    productName,
    programUrl: PROGRAM_URL_WITH_KEY,
  });

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
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
      tags: [
        { name: "type", value: "purchase_confirmation" },
        { name: "source", value: "kiwify" },
        ...(orderId ? [{ name: "order_id", value: orderId.slice(0, 64) }] : []),
      ],
    }),
  });

  const resendData = await resendResponse.json().catch(() => ({}));

  if (!resendResponse.ok) {
    console.error(
      "Resend error",
      resendResponse.status,
      JSON.stringify(resendData),
    );
    // Retornamos 502 pra Kiwify retentar — o erro é nosso (Resend),
    // pode ser temporário e o cliente merece o e-mail.
    return jsonResponse(
      {
        error: "Failed to send email",
        provider: resendData,
      },
      502,
    );
  }

  console.log(
    `Sent purchase confirmation to ${email} (order=${orderId ?? "n/a"}, msgId=${
      resendData?.id ?? "n/a"
    })`,
  );

  return jsonResponse(
    {
      ok: true,
      sentTo: email,
      orderId: orderId ?? null,
      messageId: resendData?.id ?? null,
    },
    200,
  );
});
