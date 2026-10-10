// Private sync endpoint for the EchoWebs hub (server-to-server, no CORS).
// Auth: header x-outreach-secret must equal the OUTREACH_SYNC_SECRET function
// secret (constant-time compare). One POST both pushes and pulls:
//   body { upsert?: [{ slug, template, data }], delete?: [slug] }
//   -> { views: [{ slug, views_count, first_viewed_at, last_viewed_at }], optouts: [{ token, created_at }] }
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const SLUG = /^[a-z0-9-]{8,80}$/;
const TEMPLATES = ["barber", "detailer", "cafe", "photographer", "generic"];

function safeEqual(a: string, b: string) {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } });

Deno.serve(async (req) => {
  const secret = Deno.env.get("OUTREACH_SYNC_SECRET") ?? "";
  if (secret.length < 32) return reply(503, { error: "Sync not configured" });
  if (!safeEqual(req.headers.get("x-outreach-secret") ?? "", secret)) return reply(401, { error: "Unauthorised" });
  if (req.method !== "POST") return reply(405, { error: "Method not allowed" });

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return reply(400, { error: "Bad body" });
    const upsert = Array.isArray(body.upsert) ? body.upsert : [];
    const del = Array.isArray(body.delete) ? body.delete : [];
    if (upsert.length > 200 || del.length > 500) return reply(400, { error: "Too many items" });

    const rows = [];
    for (const p of upsert) {
      if (!p || typeof p.slug !== "string" || !SLUG.test(p.slug) || !TEMPLATES.includes(p.template) || typeof p.data !== "object" || p.data === null) {
        return reply(400, { error: "Invalid preview" });
      }
      if (JSON.stringify(p.data).length > 20000) return reply(400, { error: "Preview data too large" });
      rows.push({ slug: p.slug, template: p.template, data: p.data, updated_at: new Date().toISOString() });
    }
    if (del.some((s: unknown) => typeof s !== "string" || !SLUG.test(s))) return reply(400, { error: "Invalid slug" });

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    if (rows.length) {
      const { error } = await supabase.from("outreach_previews").upsert(rows, { onConflict: "slug" });
      if (error) throw error;
    }
    if (del.length) {
      const { error } = await supabase.from("outreach_previews").delete().in("slug", del);
      if (error) throw error;
    }
    const [views, optouts] = await Promise.all([
      supabase.from("outreach_previews").select("slug, views_count, first_viewed_at, last_viewed_at").gt("views_count", 0),
      supabase.from("outreach_optouts").select("token, created_at"),
    ]);
    if (views.error) throw views.error;
    if (optouts.error) throw optouts.error;
    return reply(200, { views: views.data, optouts: optouts.data });
  } catch (e) {
    console.error("outreach-sync error", e);
    return reply(500, { error: "Server error" });
  }
});
