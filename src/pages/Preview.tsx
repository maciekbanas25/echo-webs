import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PreviewSite from "@/components/preview/PreviewSite";
import type { PreviewData, PreviewTemplate } from "@/components/preview/themes";

const FN_BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const FN_HEADERS = { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string };
const TEMPLATES: PreviewTemplate[] = ["barber", "detailer", "cafe", "photographer", "generic"];

/** Keep only well-formed fields; anything odd is dropped rather than rendered. */
function clean(raw: unknown): PreviewData | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown, max = 200) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);
  const name = str(r.name, 120);
  const town = str(r.town, 80);
  if (!name || !town) return null;
  const maps = str(r.mapsUrl, 500);
  const from = (r.from && typeof r.from === "object" ? r.from : {}) as Record<string, unknown>;
  return {
    name,
    town,
    nicheLabel: str(r.nicheLabel, 60) ?? "Local business",
    services: Array.isArray(r.services) ? r.services.map((s) => str(s, 60)).filter((s): s is string => !!s).slice(0, 8) : [],
    address: str(r.address, 300),
    phone: str(r.phone, 30)?.replace(/[^\d+ ()-]/g, "") || null,
    mapsUrl: maps && /^https:\/\/(maps\.google\.com|www\.google\.com\/maps|maps\.app\.goo\.gl)\//.test(maps) ? maps : null,
    rating: typeof r.rating === "number" && r.rating > 0 && r.rating <= 5 ? r.rating : null,
    reviewCount: typeof r.reviewCount === "number" && r.reviewCount > 0 ? Math.floor(r.reviewCount) : null,
    palette: r.palette && typeof r.palette === "object" ? (r.palette as PreviewData["palette"]) : undefined,
    offer: str(r.offer, 200),
    from: { name: str(from.name, 80), email: str(from.email, 120), phone: str(from.phone, 30) },
  };
}

function useNoIndex(title: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      meta.remove();
    };
  }, [title]);
}

export default function Preview() {
  const { slug = "" } = useParams();
  const [state, setState] = useState<{ status: "loading" | "missing" | "ready"; template?: PreviewTemplate; data?: PreviewData }>({ status: "loading" });
  useNoIndex(state.data ? `${state.data.name} — website concept by EchoWebs` : "Website concept | EchoWebs");

  useEffect(() => {
    if (!/^[a-z0-9-]{8,80}$/.test(slug)) {
      setState({ status: "missing" });
      return;
    }
    // index.html starts this request before the bundle loads; reuse it when it's for this slug.
    const early = (window as unknown as { __ewPreview?: { slug: string; data: Promise<unknown> } }).__ewPreview;
    const request =
      early && early.slug === slug
        ? early.data
        : fetch(`${FN_BASE}/preview?slug=${encodeURIComponent(slug)}`, { headers: FN_HEADERS }).then((r) => {
            if (!r.ok) throw new Error(String(r.status));
            return r.json();
          });
    request
      .then((raw) => {
        const body = raw as { template?: string; data?: unknown };
        const data = clean(body.data);
        const template = TEMPLATES.includes(body.template as PreviewTemplate) ? (body.template as PreviewTemplate) : "generic";
        setState(data ? { status: "ready", template, data } : { status: "missing" });
      })
      .catch(() => setState({ status: "missing" }));
  }, [slug]);

  // Count a view only once the page has actually been on screen for a few seconds.
  useEffect(() => {
    if (state.status !== "ready") return;
    let sent = false;
    const send = () => {
      if (sent || document.visibilityState !== "visible") return;
      sent = true;
      fetch(`${FN_BASE}/preview`, {
        method: "POST",
        headers: { ...FN_HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        keepalive: true,
      }).catch(() => {});
    };
    const t = setTimeout(send, 4000);
    return () => clearTimeout(t);
  }, [state.status, slug]);

  if (state.status === "loading") return <div className="min-h-screen bg-[#0b0b0c]" />;
  if (state.status === "missing" || !state.data || !state.template) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground">
        <h1 className="font-clash text-3xl">This preview isn't available</h1>
        <p className="max-w-sm text-muted-foreground">The link may have expired. Want one for your business?</p>
        <Link to="/contact" className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground">
          Get a free mock-up
        </Link>
      </main>
    );
  }

  const { data, template } = state;
  const contactHref = `/contact?ref=preview&business=${encodeURIComponent(data.name)}`;
  return (
    <>
      <ConceptBanner name={data.name} href={contactHref} />
      <PreviewSite template={template} data={data} />
      <ConceptCloser data={data} href={contactHref} />
    </>
  );
}

function ConceptBanner({ name, href }: { name: string; href: string }) {
  return (
    <div className="sticky top-0 z-50 flex items-center gap-3 border-b border-white/10 bg-[#080A0F]/95 px-4 py-2.5 text-[13px] text-[#E8E4D9] backdrop-blur sm:px-6">
      <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#00CFFF]" aria-hidden />
      <p className="min-w-0 flex-1 leading-snug">
        <span className="font-semibold">A free concept by EchoWebs for {name}</span>
        <span className="hidden text-white/60 sm:inline"> — here's what your site could look like.</span>
      </p>
      <Link
        to={href}
        className="shrink-0 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#00CFFF] px-3.5 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-px"
      >
        Like it? Let's talk
      </Link>
    </div>
  );
}

function ConceptCloser({ data, href }: { data: PreviewData; href: string }) {
  const from = data.from ?? {};
  return (
    <section className="relative overflow-hidden bg-[#080A0F] px-5 pb-32 pt-20 text-[#E8E4D9] sm:px-10 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-[#1A6FD4] opacity-25 blur-[120px]" />
      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00CFFF]">About this concept</p>
        <h2 className="font-clash text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.02]">
          I built this for {data.name} from what's already on Google.
        </h2>
        <p className="mt-6 max-w-xl text-lg text-white/70">
          The real version would use your own photos, prices and booking, and it'd be yours to keep.
          {data.offer ? ` ${data.offer}` : ""}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to={href}
            className="rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#00CFFF] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Book a 15-minute call
          </Link>
          {from.email && (
            <a href={`mailto:${from.email}?subject=${encodeURIComponent(`Website concept for ${data.name}`)}`} className="text-sm underline underline-offset-4 text-white/80">
              or email {from.name ?? "me"}
            </a>
          )}
          {from.phone && (
            <a href={`tel:${from.phone.replace(/[^\d+]/g, "")}`} className="text-sm underline underline-offset-4 text-white/80">
              {from.phone}
            </a>
          )}
        </div>
        <p className="mt-12 text-xs text-white/40">
          Concept only — not affiliated with {data.name}. Ratings shown are from their public Google profile.
        </p>
      </div>
    </section>
  );
}
