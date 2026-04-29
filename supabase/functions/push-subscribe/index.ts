import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { subscription, chronotype, lang, onboarding_date, utc_offset, platform } = await req.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (platform && (platform === 'ios' || platform === 'android')) {
      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          endpoint: `${platform}-${Date.now()}`,
          p256dh: `${platform}-push`,
          auth: `${platform}-auth`,
          chronotype: chronotype || "bear",
          lang: lang || "pt",
          onboarding_date: onboarding_date || 0,
          utc_offset: utc_offset || 0,
          platform: platform,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "endpoint" }
      );

      if (error) throw error;
    } else if (subscription?.endpoint && subscription?.keys?.p256dh && subscription?.keys?.auth) {
      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          endpoint: subscription.endpoint,
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
          chronotype: chronotype || "bear",
          lang: lang || "pt",
          onboarding_date: onboarding_date || 0,
          utc_offset: utc_offset || 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "endpoint" }
      );

      if (error) throw error;
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid subscription data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
