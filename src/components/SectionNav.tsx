import { useEffect, useState } from "react";

/**
 * A slim right-hand dot rail that lets visitors jump between the main sections
 * of the (long) homepage. The active section is tracked with an
 * IntersectionObserver; labels reveal on hover so the rail stays unobtrusive.
 * Desktop only — mobile keeps the existing top menu.
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

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => handleClick(id)}
            aria-label={`Go to ${label}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-2"
          >
            <span
              className={`pointer-events-none whitespace-nowrap rounded-md bg-card/90 px-2 py-1 text-xs font-medium opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
            <span
              className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
                isActive
                  ? "scale-125 border-primary bg-primary shadow-glow"
                  : "border-primary/40 bg-transparent group-hover:border-primary group-hover:bg-primary/40"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};

export default SectionNav;
