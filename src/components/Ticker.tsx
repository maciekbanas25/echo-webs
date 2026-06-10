const items = [
  "Web Design",
  "Brand Identity",
  "E-Commerce",
  "SEO",
  "Web Applications",
  "UI/UX",
];

/**
 * CSS-only marquee strip between the hero and first content section.
 * Two copies of the list slide left forever; the second copy is decorative
 * so screen readers hear the services exactly once.
 */
const Ticker = () => (
  <div className="relative overflow-hidden border-y border-accent/15 bg-secondary/40 py-4">
    <div className="ticker-track">
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center font-syne text-sm font-bold uppercase tracking-[0.22em] text-accent md:text-base"
            >
              <span className="px-6">{item}</span>
              <span className="text-accent/40">·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Ticker;
