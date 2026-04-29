import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const emailRequest: EmailRequest = await req.json();
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Sending email to ${emailRequest.to} with subject: ${emailRequest.subject}`);

    const emailPayload: Record<string, unknown> = {
      from: "GoZzzz <noreply@support.gozzzz.app>",
      reply_to: "suporte@gozzzz.app",
      to: emailRequest.to,
      subject: emailRequest.subject,
      html: emailRequest.html,
      headers: {
        "List-Unsubscribe": "<mailto:unsubscribe@support.gozzzz.app?subject=unsubscribe>",
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        "X-Entity-Ref-ID": `gozzzz-${emailRequest.to}-${Date.now()}`,
      },
    };

    if (emailRequest.text) {
      emailPayload.text = emailRequest.text;
    } else {
      emailPayload.text = emailRequest.html
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#(\d+);/g, (_: string, n: string) => String.fromCharCode(parseInt(n)))
        .replace(/\s+/g, " ")
        .trim();
    }

    console.log("Email payload prepared:", { to: emailRequest.to, subject: emailRequest.subject });

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify(emailPayload),
    });

    const responseText = await resendResponse.text();
    console.log(`Resend API response status: ${resendResponse.status}`);
    console.log(`Resend API response: ${responseText}`);

    if (!resendResponse.ok) {
      throw new Error(`Resend API error: ${resendResponse.status} - ${responseText}`);
    }

    const data = JSON.parse(responseText);

    return new Response(
      JSON.stringify({ success: true, messageId: data.id }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Error sending email:", errorMsg);
    return new Response(
      JSON.stringify({ error: errorMsg }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
