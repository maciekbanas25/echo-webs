import { useEffect, useRef } from "react";

/**
 * A soft, blurred light that trails the cursor. Uses screen blending so it
 * adds glow over any background without blocking interaction. Disabled for
 * users who prefer reduced motion or are on touch (no fine pointer).
 */
const CursorGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || prefersReduced) return;

    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[600px] w-[600px] rounded-full opacity-50 blur-[120px] mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--primary) / 0.35), transparent 60%)",
      }}
    />
  );
};

export default CursorGlow;
