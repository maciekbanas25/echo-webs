/**
 * A faint film-grain texture over the whole page for depth. Pure CSS/SVG,
 * non-interactive, sits above content but never blocks clicks.
 */
const GrainOverlay = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    }}
  />
);

export default GrainOverlay;
