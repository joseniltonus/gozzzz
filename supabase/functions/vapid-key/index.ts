import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: existing } = await supabase
      .from("vapid_keys")
      .select("public_key")
      .maybeSingle();

    if (existing?.public_key) {
      return new Response(
        JSON.stringify({ publicKey: existing.public_key }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const keys = webpush.generateVAPIDKeys();

    await supabase.from("vapid_keys").insert({
      public_key: keys.publicKey,
      private_key: keys.privateKey,
    });

    return new Response(
      JSON.stringify({ publicKey: keys.publicKey }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
