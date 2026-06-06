/**
 * TEMPORARY showreel page for recording a promo video.
 * Stacks every demo (as same-origin iframes, sized to full height) so you can
 * do one slow scroll top-to-bottom, with branded label bands + soft fades
 * between each demo.
 *
 * TO DELETE: remove the `/showreel` route + import in App.tsx, then delete
 * this file. Nothing else depends on it.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import logo from "@/assets/ew-logo.png";

const demos = [
  { path: "/cafe", label: "Cafés" },
  { path: "/barber", label: "Barbers" },
  { path: "/gym", label: "Gyms" },
  { path: "/beauty-salon", label: "Salons" },
  { path: "/restaurant", label: "Restaurants" },
  { path: "/photographer", label: "Photographers" },
  { path: "/car-detailer", label: "Detailers" },
  { path: "/tradesman", label: "Tradesmen" },
];

// Masked blur so the blur itself fades out (no hard seam) — strongest at the
// screen edge, gone toward the middle of the demo. Combined with the dark
// gradient it makes each demo melt into the next.
const fadeMask = (dir: "top" | "bottom") => ({
  WebkitMaskImage: `linear-gradient(to ${dir === "top" ? "bottom" : "top"}, black, transparent)`,
  maskImage: `linear-gradient(to ${dir === "top" ? "bottom" : "top"}, black, transparent)`,
});

const Showreel = () => {
  // Cinematic weighted scrolling for the recording (matches the main site's
  // Lenis feel, a touch slower). This temp page is excluded from the global
  // SmoothScroll in App.tsx, so this is the only instance.
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.5, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Same-origin iframe: size it to its full content height so this page's
  // scroll runs through the whole demo. Re-measures as images/animations load.
  const fit = (e: React.SyntheticEvent<HTMLIFrameElement>) => {
    const frame = e.currentTarget;
    try {
      const doc = frame.contentWindow?.document;
      if (!doc) return;

      // An iframe's own rendered height IS the viewport its `vh` units resolve
      // against. Because we grow each frame to its full content height below,
      // the demos' `h-[85vh]`/`min-h-screen` hero sections would balloon to a
      // fraction of the ENTIRE stacked demo (and feed back into the height),
      // blowing their `bg-cover` images up enormously. Pin every vh-based /
      // screen-height box to the real screen height so heroes render normally.
      const vp = window.innerHeight;
      const style = doc.createElement("style");
      style.textContent =
        // The demos reveal each section on scroll (IntersectionObserver). A
        // fitted iframe never actually scrolls, so force the reveal content
        // visible — otherwise only the hero shows.
        '[class*="opacity-0"][class*="translate-y"],[class*="opacity-0"][class*="scale-9"]{opacity:1 !important;transform:none !important;}' +
        // Kill parallax/fixed backgrounds — in a full-height fitted iframe they
        // stretch to cover everything and look hugely zoomed.
        '*{background-attachment:scroll !important;}' +
        // Resolve hero `vh` heights against the real screen, not the giant frame.
        `[class*="vh]"]{height:${vp}px !important;}` +
        `.min-h-screen{min-height:${vp}px !important;}`;
      doc.head.appendChild(style);

      const apply = () => {
        frame.style.height = `${doc.documentElement.scrollHeight}px`;
      };
      apply();
      new ResizeObserver(apply).observe(doc.documentElement);
      // Re-measure as images/fonts finish loading.
      [400, 1200, 2500].forEach((t) => setTimeout(apply, t));
    } catch {
      /* ignore – same-origin only */
    }
  };

  return (
    <div className="bg-[#0b0b0e]">
      {/* Extra lead-in space (same bg) so the scroll has room to ramp up
          before anything appears. */}
      <div className="h-screen" />

      {/* Intro */}
      <div className="flex h-screen flex-col items-center justify-center gap-6 px-4 text-center">
        <img
          src={logo}
          alt="EchoWebs"
          className="h-24 w-24 object-contain md:h-28 md:w-28"
        />
        <div className="bg-gradient-hero bg-clip-text font-jakarta text-6xl md:text-7xl font-bold text-transparent">
          EchoWebs
        </div>
        <p className="font-jakarta text-lg text-muted-foreground md:text-xl">
          Websites I design for small businesses
        </p>
      </div>

      {demos.map((d) => (
        <section key={d.path}>
          {/* Branded label / transition band */}
          <div className="relative flex h-[45vh] items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl" />
            <span className="relative bg-gradient-hero bg-clip-text font-jakarta text-5xl md:text-7xl font-bold text-transparent">
              {d.label}
            </span>
          </div>

          {/* The live demo, sized to its full height, with soft edge fades +
              masked blur so each demo melts into the next. */}
          <div className="relative">
            <iframe
              src={d.path}
              title={d.label}
              onLoad={fit}
              scrolling="no"
              className="pointer-events-none block w-full border-0"
              style={{ height: "100vh" }}
            />
            {/* top edge */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#0b0b0e] via-[#0b0b0e]/80 to-transparent" />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-56 backdrop-blur-md"
              style={fadeMask("top")}
            />
            {/* bottom edge */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/80 to-transparent" />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-56 backdrop-blur-md"
              style={fadeMask("bottom")}
            />
          </div>
        </section>
      ))}

      {/* Outro / CTA */}
      <div className="flex h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="bg-gradient-hero bg-clip-text font-jakarta text-5xl md:text-6xl font-bold text-transparent">
          Get a free quote
        </div>
        <p className="font-jakarta text-xl text-muted-foreground">echowebs.co.uk</p>
      </div>
    </div>
  );
};

export default Showreel;
