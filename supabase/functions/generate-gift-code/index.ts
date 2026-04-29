import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey, x-admin-secret",
};

function generateCode(length = 12): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    if (i > 0 && i % 4 === 0) code += "-";
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const adminSecret = Deno.env.get("ADMIN_SECRET");
    if (!adminSecret) {
      return new Response(
        JSON.stringify({ error: "Server misconfiguration: ADMIN_SECRET not set." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const providedSecret = req.headers.get("x-admin-secret");
    if (!providedSecret || providedSecret !== adminSecret) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: invalid admin secret." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => ({}));
    const count: number = Math.min(Math.max(parseInt(body.count ?? "1"), 1), 100);
    const duration_months: number = Math.max(parseInt(body.duration_months ?? "1"), 1);
    const expires_at: string | null = body.expires_at ?? null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      codes.push(generateCode());
    }

    const rows = codes.map((code) => ({
      code,
      duration_months,
      expires_at: expires_at ?? null,
    }));

    const { data, error } = await adminClient
      .from("gift_codes")
      .insert(rows)
      .select("code, duration_months, expires_at, created_at");

    if (error) {
      return new Response(
        JSON.stringify({ error: "Failed to create codes.", detail: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, codes: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("generate-gift-code error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
