// Public preview data for echowebs.co.uk/preview/:slug (outreach mock-ups).
//   GET  ?slug=...   -> { template, data }   (read-only, no counting)
//   POST { slug }    -> records one view      (sent by the page after it has been
//                       visible a few seconds, so email link scanners and bots
//                       don't count as views)
// Tables are RLS-locked; this function uses the service role.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const ALLOWED_ORIGINS = ["https://echowebs.co.uk", "https://www.echowebs.co.uk", "http://localhost:8080", "http://localhost:5173"];
const SLUG = /^[a-z0-9-]{8,80}$/;
const BOT_UA = /bot|crawl|spider|slurp|preview|scanner|fetch|curl|wget|python|headless|lighthouse|safelinks|proofpoint|mimecast|barracuda|google-read-aloud/i;

function cors(req: Request) {
  const origin = req.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    Vary: "Origin",
  };
}

const json = (req: Request, status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...cors(req), "Content-Type": "application/json", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: cors(req) });
  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    if (req.method === "GET") {
      const slug = new URL(req.url).searchParams.get("slug") ?? "";
      if (!SLUG.test(slug)) return json(req, 404, { error: "Not found" });
      const { data, error } = await supabase.from("outreach_previews").select("template, data").eq("slug", slug).maybeSingle();
      if (error) throw error;
      if (!data) return json(req, 404, { error: "Not found" });
      return json(req, 200, data);
    }

    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      const slug = typeof body?.slug === "string" ? body.slug : "";
      if (!SLUG.test(slug)) return json(req, 400, { error: "Bad slug" });
      if (!BOT_UA.test(req.headers.get("user-agent") ?? "")) {
        const { error } = await supabase.rpc("outreach_record_view", { p_slug: slug });
        if (error) throw error;
      }
      return json(req, 200, { ok: true });
    }

    return json(req, 405, { error: "Method not allowed" });
  } catch (e) {
    console.error("preview error", e);
    return json(req, 500, { error: "Server error" });
  }
});
