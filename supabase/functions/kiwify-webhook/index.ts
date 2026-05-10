// Edge Function: kiwify-webhook
//
// Recebe o postback (webhook) do Kiwify quando uma compra é aprovada e dispara
// o e-mail de boas-vindas customizado via Resend, com link de acesso ao
// programa. Substitui a dependência do e-mail automático do Kiwify (que não
// é customizável no plano gratuito).
//
// Endpoint: POST /functions/v1/kiwify-webhook
//
// Configuração no painel Kiwify:
//   1. Apps → API → Webhook (ou similar)
//   2. URL: https://<seu-projeto>.supabase.co/functions/v1/kiwify-webhook
//   3. Eventos: order.paid (ou "Compra aprovada")
//   4. Salva o "token"/"secret" gerado pelo Kiwify e configura como
//      KIWIFY_WEBHOOK_SECRET nos Secrets do Supabase.
//
// Variáveis de ambiente:
//   KIWIFY_WEBHOOK_SECRET  (obrigatório — usado pra validar assinatura HMAC)
//   RESEND_API_KEY         (obrigatório — envio de email)
//
// Segurança:
//   - Valida assinatura HMAC-SHA1 do Kiwify (formato `?signature=` na URL).
//   - Aceita apenas POST.
//   - Retorna 200 mesmo em "não fiz nada" (Kiwify retry behavior — só queremos
//     que ele não retente quando deu pra processar).

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
  webhook_event_type?: string;
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
  // Kiwify usa HMAC-SHA1 do body cru com o secret compartilhado, e envia
  // o digest em hex via `?signature=…` (ou header similar). Comparamos
  // em tempo constante pra evitar timing attacks.
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const webhookSecret = Deno.env.get("KIWIFY_WEBHOOK_SECRET");
  const resendKey = Deno.env.get("RESEND_API_KEY");

  if (!webhookSecret) {
    console.error("KIWIFY_WEBHOOK_SECRET not configured");
    return jsonResponse({ error: "Server not configured" }, 500);
  }
  if (!resendKey) {
    console.error("RESEND_API_KEY not configured");
    return jsonResponse({ error: "Email provider not configured" }, 500);
  }

  // Lê o body cru ANTES de fazer parse, pra computar HMAC sobre os bytes
  // exatos que o Kiwify enviou (parsing+stringify mudaria espaços/ordem).
  const rawBody = await req.text();

  // Assinatura: prioriza query param, fallback pra header.
  const url = new URL(req.url);
  const signature =
    url.searchParams.get("signature") ??
    req.headers.get("x-kiwify-signature") ??
    "";

  if (!signature) {
    console.warn("Missing signature on Kiwify webhook request");
    return jsonResponse({ error: "Missing signature" }, 401);
  }

  const valid = await verifyKiwifySignature(rawBody, signature, webhookSecret);
  if (!valid) {
    console.warn("Invalid signature on Kiwify webhook request");
    return jsonResponse({ error: "Invalid signature" }, 401);
  }

  let payload: KiwifyPayload;
  try {
    payload = JSON.parse(rawBody) as KiwifyPayload;
  } catch (err) {
    console.error("Failed to parse Kiwify webhook body:", err);
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const status = (
    payload.order_status ??
    payload.status ??
    ""
  )
    .toString()
    .toLowerCase()
    .trim();

  const isApproved = APPROVED_STATUSES.has(status);

  // Não enviar e-mail pra status diferentes (pending, refused, refunded, etc).
  // Retornamos 200 pra Kiwify não retentar — recebemos o webhook, só não
  // tinha ação a tomar nesse status.
  if (!isApproved) {
    console.log(`Skipping webhook with status="${status}" (not approved)`);
    return jsonResponse({ ok: true, skipped: true, status }, 200);
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
