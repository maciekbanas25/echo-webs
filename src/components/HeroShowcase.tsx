import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/**
 * A browser-window mockup in the hero that auto-cycles through the live demo
 * sites, so visitors see real work the moment they land. Pauses on hover and
 * lets you step through demos with the arrows or dots.
 */
const HeroShowcase = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [frameLoaded, setFrameLoaded] = useState(false);
  // On phones, live demo iframes don't sit well in the small frame (and are
  // heavy), so we show the clean preview image there instead and keep the
  // live previews for larger screens.
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 639px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const goTo = (index: number) =>
    setActive((index + projects.length) % projects.length);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Reset the live-frame fade whenever we switch demos so the stock image
  // covers the gap while the new demo loads.
  useEffect(() => setFrameLoaded(false), [active]);

  // Auto-advance; resets whenever `active` changes so manual nav gets a full
  // interval before the next automatic step. Slower than a plain image
  // carousel because each step loads a real site.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, active]);

  const current = projects[active];

  return (
    <div className="mt-16 max-w-4xl mx-auto [perspective:1500px]">
      <div
        className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card/80 shadow-intense backdrop-blur-sm transition-transform duration-500 [transform:rotateX(5deg)] hover:[transform:rotateX(0deg)]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Live demo viewport — preview image on mobile, live site on top for
            larger screens. */}
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          {/* Preview image (always present; the only layer shown on mobile,
              and the instant fallback while the live frame loads elsewhere). */}
          <img
            src={current.image}
            alt={current.title}
            className="absolute inset-0 z-0 h-full w-full object-cover object-top"
          />

          {/* Loading state (desktop): blurs the preview image and shows a
              spinner while the live demo loads, then fades out as it appears. */}
          {!isMobile && (
            <div
              className={`pointer-events-none absolute inset-0 z-[15] flex flex-col items-center justify-center gap-3 bg-secondary/50 backdrop-blur-md transition-opacity duration-500 ${
                frameLoaded ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Loading preview
              </span>
            </div>
          )}

          {/* The actual live demo, faded in once loaded; click-through.
              Skipped on mobile where it doesn't render cleanly. */}
          {!isMobile && (
            <iframe
              key={active}
              src={current.link}
              title={`Live preview — ${current.title}`}
              loading="lazy"
              scrolling="no"
              tabIndex={-1}
              aria-hidden="true"
              onLoad={() => setFrameLoaded(true)}
              className={`absolute inset-0 z-10 h-full w-full border-0 transition-opacity duration-500 ${
                frameLoaded ? "opacity-100" : "opacity-0"
              }`}
              style={{ pointerEvents: "none" }}
            />
          )}

          {/* Gradient + caption (visual only, never blocks clicks) */}
          <div className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex items-end justify-between p-5">
            <div>
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                Live Demo
              </span>
              <h3 className="text-lg font-bold text-white drop-shadow md:text-xl">
                {current.title}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              Visit <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>

          {/* Transparent click layer → opens the full demo */}
          <Link
            to={current.link}
            aria-label={`Visit ${current.title}`}
            className="absolute inset-0 z-20 block"
          />

          {/* Prev / next arrows */}
          <button
            type="button"
            aria-label="Previous demo"
            onClick={prev}
            className="absolute left-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next demo"
            onClick={next}
            className="absolute right-3 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 border-t border-primary/15 bg-secondary/60 py-3">
          {projects.map((p, i) => (
            <button
              key={p.id}
              aria-label={`Show ${p.title}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-primary" : "w-1.5 bg-primary/30 hover:bg-primary/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroShowcase;
