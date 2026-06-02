import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * A slim right-hand dot rail that lets visitors jump between the main sections
 * of the (long) homepage. The active section is tracked with an
 * IntersectionObserver; its label stays visible while the others reveal on
 * hover. Shown on all screen sizes (dots sit at the right edge).
 */
const sections = [
  { id: "top", label: "Top" },
  { id: "demos", label: "Our Work" },
  { id: "process", label: "How It Works" },
  { id: "quote", label: "Free Quote" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
];

const SectionNav = () => {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band across the vertical middle of the viewport decides which
      // section is "current".
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Rendered through a portal to <body> so it's never trapped inside a
  // transformed ancestor (which would break position:fixed).
  return createPortal(
    <nav
      aria-label="Page sections"
      className="fixed right-3 top-1/2 z-50 -translate-y-1/2 sm:right-4"
    >
      <div className="flex flex-col items-end gap-2 rounded-2xl border border-border/60 bg-card/75 px-1.5 py-2.5 shadow-lg backdrop-blur-md sm:gap-3">
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex items-center p-1.5"
          >
            {/* Label sits to the left of the dot, out of the tap area. */}
            <span
              className={`pointer-events-none absolute right-full mr-2 whitespace-nowrap rounded-md bg-card/95 px-2 py-1 text-xs font-medium shadow-md backdrop-blur-sm transition-opacity duration-200 ${
                isActive
                  ? "text-primary opacity-100"
                  : "text-muted-foreground opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "h-3 w-3 scale-110 border-primary bg-primary shadow-glow"
                  : "h-3 w-3 border-primary/50 bg-primary/20 group-hover:border-primary group-hover:bg-primary/60"
              }`}
            />
          </button>
        );
      })}
      </div>
    </nav>,
    document.body
  );
};

export default SectionNav;
