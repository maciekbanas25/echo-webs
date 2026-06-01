import { useEffect, useState } from "react";

/** A thin gradient bar at the very top that fills as the page scrolls. */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(Math.max(el.scrollTop / max, 0), 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-1">
      <div
        className="h-full origin-left bg-gradient-hero"
        style={{ transform: `scaleX(${progress})`, transition: "transform 75ms linear" }}
      />
    </div>
  );
};

export default ScrollProgress;
