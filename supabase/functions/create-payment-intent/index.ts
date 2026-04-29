import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PaymentIntentRequest {
  plan: "annual" | "monthly" | "yearly";
  currency?: "brl" | "usd";
}

const PRICES: Record<
  string,
  Record<string, { amount: number; currency: string; label: string }>
> = {
  brl: {
    annual: { amount: 14700, currency: "brl", label: "GoZzzz Premium" },
    yearly: { amount: 29990, currency: "brl", label: "GoZzzz Premium Anual" },
    monthly: { amount: 14700, currency: "brl", label: "GoZzzz Premium Mensal" },
  },
  usd: {
    annual: { amount: 9480, currency: "usd", label: "GoZzzz Premium" },
    yearly: { amount: 9480, currency: "usd", label: "GoZzzz Premium Annual" },
    monthly: { amount: 999, currency: "usd", label: "GoZzzz Premium Monthly" },
  },
};

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

    const body: PaymentIntentRequest = await req.json();
    const { plan, currency = "brl" } = body;
    const priceConfig = PRICES[currency]?.[plan] ?? PRICES.brl.annual;

    const intentBody = new URLSearchParams({
      amount: priceConfig.amount.toString(),
      currency: priceConfig.currency,
      "automatic_payment_methods[enabled]": "true",
      description: priceConfig.label,
    });

    const intentResponse = await fetch(
      "https://api.stripe.com/v1/payment_intents",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: intentBody.toString(),
      }
    );

    const intentData = await intentResponse.json();

    if (!intentResponse.ok || intentData.error) {
      console.error("Stripe PI error:", JSON.stringify(intentData.error));
      return new Response(
        JSON.stringify({
          error:
            intentData.error?.message ?? "Failed to create payment intent",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        clientSecret: intentData.client_secret,
        paymentIntentId: intentData.id,
        amount: priceConfig.amount,
        currency: priceConfig.currency,
        label: priceConfig.label,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Payment intent error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to create payment intent. Please try again.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
