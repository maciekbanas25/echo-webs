import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import BrowserChrome from "@/components/BrowserChrome";

/**
 * A browser-window mockup in the hero that auto-cycles through the live demo
 * sites, so visitors see real work the moment they land. Pauses on hover and
 * lets you step through demos with the arrows or dots.
 */
const HeroShowcase = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = (index: number) =>
    setActive((index + projects.length) % projects.length);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Auto-advance; resets whenever `active` changes so manual nav gets a full
  // interval before the next automatic step.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3200);
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
        <BrowserChrome url={`echo-webs.com${current.link}`} />

        {/* Screenshot viewport — cross-fades between demos */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Link to={current.link} className="absolute inset-0 block">
            {projects.map((p, i) => (
              <img
                key={p.id}
                src={p.image}
                alt={p.title}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
              <div>
                <span className="mb-2 inline-block rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
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
          </Link>

          {/* Prev / next arrows (siblings of the link so they don't navigate) */}
          <button
            type="button"
            aria-label="Previous demo"
            onClick={prev}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next demo"
            onClick={next}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-primary hover:text-primary-foreground"
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
