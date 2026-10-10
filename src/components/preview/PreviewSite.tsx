import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { THEMES, resolvePalette, telHref, type PreviewData, type PreviewTemplate, type Theme } from "./themes";

/**
 * The mock-up of the business's own site. Pure presentation: every string
 * comes from preview data and is rendered as text (never as HTML).
 */
export default function PreviewSite({ template, data }: { template: PreviewTemplate; data: PreviewData }) {
  const theme = THEMES[template] ?? THEMES.generic;
  const p = resolvePalette(theme, data.palette);
  const vars = { "--bg": p.bg, "--surface": p.surface, "--ink": p.ink, "--muted": p.muted, "--accent": p.accent } as CSSProperties;

  return (
    <div style={{ ...vars, background: p.bg, color: p.ink, fontFamily: theme.body }} className="relative min-h-screen">
      <SiteNav data={data} theme={theme} />
      {template === "barber" && <HeroFullBleed data={data} theme={theme} />}
      {template === "detailer" && <HeroAngled data={data} theme={theme} />}
      {template === "cafe" && <HeroArch data={data} theme={theme} />}
      {template === "photographer" && <HeroEditorial data={data} theme={theme} />}
      {template === "generic" && <HeroType data={data} theme={theme} />}
      <Services data={data} theme={theme} />
      {theme.gallery.length > 0 && <Gallery theme={theme} />}
      <Proof data={data} theme={theme} />
      <Visit data={data} theme={theme} />
      <footer className="px-5 pb-28 pt-10 text-xs sm:px-10 md:pb-10" style={{ color: p.muted }}>
        © {new Date().getFullYear()} {data.name} · {data.town}
      </footer>
      {data.phone && (
        <a
          href={telHref(data.phone)}
          className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-center rounded-full py-3.5 text-sm font-semibold shadow-lg md:hidden"
          style={{ background: p.accent, color: theme.dark ? "#0b0b0b" : "#fff" }}
        >
          Call {data.name}
        </a>
      )}
    </div>
  );
}

type Part = { data: PreviewData; theme: Theme };

/** Scroll reveal without an animation library (keeps previews light). Respects reduced motion. */
function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(28px)",
        transition: `opacity .7s cubic-bezier(.22,1,.36,1) ${delay}s, transform .7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Display({ theme, className = "", children, style }: { theme: Theme; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <h1 className={`${theme.displayClass} ${className}`} style={{ fontFamily: theme.display, ...style }}>
      {children}
    </h1>
  );
}

function PrimaryButton({ data, theme }: Part) {
  const href = data.phone ? telHref(data.phone) : "#visit";
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
      style={{ background: "var(--accent)", color: theme.dark ? "#0b0b0b" : "#fff" }}
    >
      {theme.bookLabel}
      <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
        →
      </span>
    </a>
  );
}

function SiteNav({ data, theme }: Part) {
  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 sm:px-10">
      <span className="text-lg" style={{ fontFamily: theme.display, color: theme.dark ? "var(--ink)" : "var(--ink)" }}>
        {data.name}
      </span>
      {data.phone && (
        <a href={telHref(data.phone)} className="hidden text-sm font-medium underline-offset-4 hover:underline sm:block">
          {data.phone}
        </a>
      )}
    </nav>
  );
}

function Rating({ data }: { data: PreviewData }) {
  if (!data.rating || !data.reviewCount) return null;
  return (
    <p className="text-sm" style={{ color: "var(--muted)" }}>
      <span style={{ color: "var(--accent)" }}>★</span> {data.rating.toFixed(1)} from {data.reviewCount} Google reviews
    </p>
  );
}

/* --------------------------------- Heroes -------------------------------- */

function HeroFullBleed({ data, theme }: Part) {
  return (
    <header className="relative flex min-h-[92svh] items-end overflow-hidden">
      <img src={theme.hero!} alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, var(--bg) 8%, rgba(0,0,0,.55) 55%, rgba(0,0,0,.2))" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(0deg, var(--bg), transparent 45%)" }} />
      <div className="relative z-10 w-full px-5 pb-14 sm:px-10 sm:pb-20">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--accent)" }}>
          {theme.kicker(data)}
        </p>
        <Display theme={theme} className="max-w-[12ch] text-[clamp(3.6rem,15vw,10.5rem)]">
          {theme.headline(data)}
        </Display>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <PrimaryButton data={data} theme={theme} />
          <Rating data={data} />
        </div>
      </div>
    </header>
  );
}

function HeroAngled({ data, theme }: Part) {
  return (
    <header className="relative grid min-h-[92svh] overflow-hidden md:grid-cols-[1.05fr_1fr]">
      <div className="relative z-10 flex flex-col justify-end px-5 pb-12 pt-28 sm:px-10 md:pb-20">
        <div className="mb-6 h-px w-24" style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }} />
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--muted)" }}>
          {theme.kicker(data)}
        </p>
        <Display theme={theme} className="text-[clamp(3.2rem,11vw,8rem)]">
          {theme.headline(data)}
        </Display>
        <p className="mt-6 max-w-md text-base" style={{ color: "var(--muted)" }}>
          {data.services.slice(0, 3).join(", ")} — done properly, around {data.town}.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <PrimaryButton data={data} theme={theme} />
          <Rating data={data} />
        </div>
      </div>
      <div className="relative h-[46svh] md:h-auto">
        <img
          src={theme.hero!}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover md:[clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)]"
        />
      </div>
    </header>
  );
}

function HeroArch({ data, theme }: Part) {
  return (
    <header className="relative grid min-h-[92svh] items-center gap-10 px-5 pb-14 pt-28 sm:px-10 md:grid-cols-[1.2fr_0.8fr]">
      <div>
        <p className="mb-5 text-sm italic" style={{ fontFamily: theme.display, color: "var(--accent)" }}>
          {theme.kicker(data)}
        </p>
        <Display theme={theme} className="text-[clamp(3.4rem,12vw,8.5rem)]">
          {theme.headline(data)}
        </Display>
        <p className="mt-6 max-w-md text-lg" style={{ color: "var(--muted)" }}>
          {data.services.slice(0, 2).join(" and ").toLowerCase()} — pull up a chair.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-6">
          <PrimaryButton data={data} theme={theme} />
          <Rating data={data} />
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-sm">
        <div className="absolute -inset-3 rounded-t-full border" style={{ borderColor: "var(--accent)", opacity: 0.35 }} />
        <img src={theme.hero!} alt="" fetchPriority="high" className="aspect-[3/4] w-full rounded-t-full object-cover" />
      </div>
    </header>
  );
}

function HeroEditorial({ data, theme }: Part) {
  return (
    <header className="relative grid min-h-[92svh] gap-8 px-5 pb-14 pt-28 sm:px-10 md:grid-cols-[1fr_0.9fr] md:items-end">
      <div>
        <p className="mb-6 text-[11px] uppercase tracking-[0.35em]" style={{ color: "var(--muted)" }}>
          {theme.kicker(data)}
        </p>
        <Display theme={theme} className="text-[clamp(3.2rem,11vw,8.5rem)] italic">
          {theme.headline(data)}
        </Display>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <PrimaryButton data={data} theme={theme} />
          <Rating data={data} />
        </div>
      </div>
      <img src={theme.hero!} alt="" fetchPriority="high" className="aspect-[4/5] w-full object-cover md:max-h-[78svh]" />
    </header>
  );
}

function HeroType({ data, theme }: Part) {
  return (
    <header className="relative flex min-h-[72svh] flex-col justify-end overflow-hidden px-5 pb-14 pt-28 sm:min-h-[88svh] sm:px-10">
      <div className="pointer-events-none absolute -right-16 top-14 h-40 w-40 rounded-full sm:-right-24 sm:top-16 sm:h-[28rem] sm:w-[28rem]" style={{ background: "var(--accent)", opacity: 0.9 }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-multiply" style={{ backgroundImage: GRAIN }} />
      <p className="relative mb-5 text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: "var(--muted)" }}>
        {theme.kicker(data)}
      </p>
      <Display theme={theme} className="relative max-w-[11ch] text-[clamp(3.4rem,13vw,9.5rem)]">
        {theme.headline(data)}
      </Display>
      <div className="relative mt-8 flex flex-wrap items-center gap-6">
        <PrimaryButton data={data} theme={theme} />
        <Rating data={data} />
      </div>
    </header>
  );
}

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* -------------------------------- Sections ------------------------------- */

function Services({ data, theme }: Part) {
  return (
    <section className="px-5 py-20 sm:px-10 md:py-28">
      <Reveal className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="text-[clamp(2.2rem,6vw,4rem)]" style={{ fontFamily: theme.display }}>
          What we do
        </h2>
        <ol>
          {data.services.map((s, i) => (
            <li
              key={s}
              className="group flex items-baseline gap-6 border-t py-5 transition-colors duration-300 last:border-b"
              style={{ borderColor: "color-mix(in srgb, var(--ink) 14%, transparent)" }}
            >
              <span className="w-8 text-xs tabular-nums" style={{ color: "var(--accent)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">{s}</span>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function Gallery({ theme }: { theme: Theme }) {
  return (
    <section className="grid grid-cols-2 gap-3 px-5 sm:px-10 md:grid-cols-4">
      {theme.gallery.map((src, i) => (
        <Reveal key={src} delay={i * 0.08}>
          <img src={src} alt="" loading="lazy" className={`w-full object-cover ${i % 2 ? "aspect-[4/5] md:mt-16" : "aspect-[3/4]"}`} />
        </Reveal>
      ))}
    </section>
  );
}

function Proof({ data, theme }: Part) {
  if (!data.rating || !data.reviewCount) return null;
  return (
    <section className="px-5 py-20 sm:px-10 md:py-28" style={{ background: "var(--surface)" }}>
      <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <p className="text-[clamp(5rem,20vw,12rem)] leading-none" style={{ fontFamily: theme.display, color: "var(--accent)" }}>
          {data.rating.toFixed(1)}
        </p>
        <p className="max-w-sm text-lg md:pb-6" style={{ color: "var(--muted)" }}>
          Average from {data.reviewCount} reviews on Google. Your best customers already said it — the site just needs to show it.
        </p>
      </Reveal>
    </section>
  );
}

function Visit({ data, theme }: Part) {
  return (
    <section id="visit" className="px-5 py-20 sm:px-10 md:py-28">
      <Reveal className="grid gap-8 md:grid-cols-2">
        <h2 className="text-[clamp(2rem,5vw,3.6rem)] leading-[1.05]" style={{ fontFamily: theme.display }}>
          Find us in {data.town}
        </h2>
        <div className="space-y-4 text-lg">
          {data.address && <p style={{ color: "var(--muted)" }}>{data.address}</p>}
          {data.phone && (
            <a href={telHref(data.phone)} className="block font-semibold underline-offset-4 hover:underline">
              {data.phone}
            </a>
          )}
          {data.mapsUrl && (
            <a href={data.mapsUrl} target="_blank" rel="noopener noreferrer nofollow" className="inline-block text-sm underline underline-offset-4" style={{ color: "var(--accent)" }}>
              Get directions
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
