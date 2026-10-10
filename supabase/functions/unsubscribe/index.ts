// Public opt-out for outreach emails (echowebs.co.uk/unsubscribe/:token).
// Records the token immediately; the EchoWebs hub pulls opt-outs, marks the
// lead do-not-contact permanently, and re-checks right before any send.
// Unknown tokens are stored harmlessly — they match no lead.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = ["https://echowebs.co.uk", "https://www.echowebs.co.uk", "http://localhost:8080", "http://localhost:5173"];
const TOKEN = /^[A-Za-z0-9_-]{16,64}$/;

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors(req) });
  const reply = (status: number, body: unknown) =>
    new Response(JSON.stringify(body), { status, headers: { ...cors(req), "Content-Type": "application/json", "Cache-Control": "no-store" } });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  try {
    const body = await req.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token : "";
    if (!TOKEN.test(token)) return reply(400, { error: "Invalid link" });
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { error } = await supabase.from("outreach_optouts").upsert({ token }, { onConflict: "token", ignoreDuplicates: true });
    if (error) throw error;
    return reply(200, { ok: true });
  } catch (e) {
    console.error("unsubscribe error", e);
    return reply(500, { error: "Server error" });
  }
});
