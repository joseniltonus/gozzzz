import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  plan: "annual" | "monthly" | "yearly";
  language?: "pt" | "en";
  locale?: "BR" | "US";
  successUrl: string;
  cancelUrl: string;
}

const PRICES: Record<string, { amount: number; currency: string; name: string }> = {
  annual: {
    amount: 14700,
    currency: "brl",
    name: "GoZzzz Premium — Acesso Vitalício",
  },
  yearly: {
    amount: 29990,
    currency: "brl",
    name: "GoZzzz Premium — Anual",
  },
  monthly: {
    amount: 14700,
    currency: "brl",
    name: "GoZzzz Premium — Acesso Mensal",
  },
};

const PRICES_USD: Record<string, { amount: number; currency: string; name: string }> = {
  annual: {
    amount: 9480,
    currency: "usd",
    name: "GoZzzz Premium — Lifetime",
  },
  yearly: {
    amount: 9480,
    currency: "usd",
    name: "GoZzzz Premium — Annual",
  },
  monthly: {
    amount: 999,
    currency: "usd",
    name: "GoZzzz Premium — Monthly",
  },
};

function buildCheckoutParams(
  priceConfig: { amount: number; currency: string; name: string },
  stripeLocale: string,
  successUrl: string,
  cancelUrl: string
): URLSearchParams {
  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price_data][currency]": priceConfig.currency,
    "line_items[0][price_data][product_data][name]": priceConfig.name,
    "line_items[0][price_data][unit_amount]": priceConfig.amount.toString(),
    "line_items[0][quantity]": "1",
    success_url: successUrl,
    cancel_url: cancelUrl,
    locale: stripeLocale,
  });
  params.append("payment_method_types[]", "card");

  // Pix está temporariamente desativado no Stripe — provisionamento ainda
  // pendente do lado deles (ticket aberto). Enquanto isso, parcelamento via
  // Kiwify atende quem prefere Pix/Boleto. Para reativar quando a Stripe
  // liberar, descomentar o bloco abaixo.
  //
  // Stripe BR suporta Pix nativo em Checkout Sessions desde 2022.
  // Docs: https://stripe.com/docs/payments/pix
  if (priceConfig.currency === "brl" && false) {
    params.append("payment_method_types[]", "pix");

    // QR code do Pix expira em 30 minutos.
    // Padrão Stripe é 24h, mas pra compra de impulso (sono/saúde, ticket
    // baixo) janela curta cria urgência saudável e libera capital de giro
    // mais rápido. Se o usuário fechar a aba antes de pagar, o QR continua
    // válido nesse intervalo — o webhook vai capturar a confirmação.
    params.append(
      "payment_method_options[pix][expires_after_seconds]",
      "1800"
    );
  }

  return params;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");

    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body: CheckoutRequest = await req.json();
    const { plan, language, locale, successUrl, cancelUrl } = body;

    if (!successUrl || !cancelUrl) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: successUrl, cancelUrl",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const isUsd = locale === "US" || language === "en";
    const priceTable = isUsd ? PRICES_USD : PRICES;
    const normalizedPlan = plan === "yearly" ? "yearly" : (plan ?? "annual");
    const priceConfig = priceTable[normalizedPlan] ?? priceTable.annual;
    const stripeLocale = language === "en" ? "en" : "pt-BR";

    const sessionBody = buildCheckoutParams(
      priceConfig,
      stripeLocale,
      successUrl,
      cancelUrl
    );

    const sessionResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: sessionBody.toString(),
      }
    );

    const sessionData = await sessionResponse.json();

    if (!sessionResponse.ok || sessionData.error) {
      console.error("Stripe error:", JSON.stringify(sessionData.error));
      return new Response(
        JSON.stringify({
          error:
            sessionData.error?.message ?? "Failed to create checkout session",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ url: sessionData.url, sessionId: sessionData.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Checkout session error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create checkout session. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
