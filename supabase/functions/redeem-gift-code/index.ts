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
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const code: string = (body.code ?? "").trim().toUpperCase();
    if (!code) {
      return new Response(
        JSON.stringify({ error: "Gift code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const adminClient = createClient(supabaseUrl, serviceKey);

    const { data: giftCode, error: codeError } = await adminClient
      .from("gift_codes")
      .select("id, code, duration_months, used_by, used_at, expires_at")
      .eq("code", code)
      .maybeSingle();

    if (codeError || !giftCode) {
      return new Response(
        JSON.stringify({ error: "Invalid or already used code." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (giftCode.used_by !== null) {
      return new Response(
        JSON.stringify({ error: "This code has already been redeemed." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (giftCode.expires_at && new Date(giftCode.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: "This gift code has expired." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const now = new Date();
    const subscriptionExpiresAt = new Date(now);
    subscriptionExpiresAt.setMonth(subscriptionExpiresAt.getMonth() + giftCode.duration_months);

    const { data: updatedRows, error: updateCodeError } = await adminClient
      .from("gift_codes")
      .update({ used_by: user.id, used_at: now.toISOString() })
      .eq("id", giftCode.id)
      .is("used_by", null)
      .select("id");

    if (updateCodeError) {
      return new Response(
        JSON.stringify({ error: "Failed to redeem code. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!updatedRows || updatedRows.length === 0) {
      return new Response(
        JSON.stringify({ error: "This code has already been redeemed." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { error: profileError } = await adminClient
      .from("profiles")
      .update({
        subscription_type: "gift",
        subscription_expires_at: subscriptionExpiresAt.toISOString(),
        updated_at: now.toISOString(),
      })
      .eq("id", user.id);

    if (profileError) {
      return new Response(
        JSON.stringify({ error: "Failed to activate subscription. Please contact support." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        subscription_expires_at: subscriptionExpiresAt.toISOString(),
        duration_months: giftCode.duration_months,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Redeem gift code error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
