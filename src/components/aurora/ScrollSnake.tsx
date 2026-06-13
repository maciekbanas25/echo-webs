import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

type Pt = { x: number; y: number };

/**
 * Convert a list of points into a smooth path using a Catmull-Rom spline
 * expressed as cubic beziers (tension 1/6). Gives the line its organic,
 * snake-like flow instead of hard corners.
 */
function smooth(pts: Pt[]): string {
  if (pts.length < 2) return "";
  const f = (n: number) => n.toFixed(1);
  let d = `M ${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${f(c1x)} ${f(c1y)}, ${f(c2x)} ${f(c2y)}, ${f(p2.x)} ${f(p2.y)}`;
  }
  return d;
}

/**
 * One continuous neon line that runs the full height of the homepage and is
 * scrubbed by scroll. The path is generated from the live positions of any
 * element marked `data-snake-anchor`, so it always weaves behind those boxes
 * on every breakpoint. Gentle sine sways fill the gaps between anchors so the
 * line is never dead-straight. `pathLength` is bound to whole-document scroll
 * progress (lightly sprung) — it draws on scroll-down, retracts on scroll-up,
 * stops when you stop, and tracks scroll speed.
 */
const ScrollSnake = () => {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [d, setD] = useState("");
  const [dim, setDim] = useState({ w: 0, h: 0 });

  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.4,
  });

  useEffect(() => {
    const root = svgRef.current?.parentElement;
    if (!root) return;

    const build = () => {
      const w = root.clientWidth;
      const h = root.scrollHeight;
      if (!w || !h) return;
      const cx = w / 2;
      const amp = Math.min(w * 0.16, 150);
      const rootTop = root.getBoundingClientRect().top + window.scrollY;

      const anchors: Pt[] = Array.from(
        root.querySelectorAll<HTMLElement>("[data-snake-anchor]"),
      )
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            x: r.left + r.width / 2,
            y: r.top + window.scrollY - rootTop + r.height / 2,
          };
        })
        .sort((a, b) => a.y - b.y);

      // Top-centre → each anchor → bottom-centre, with sways between.
      const key: Pt[] = [{ x: cx, y: 0 }, ...anchors, { x: cx, y: h }];
      const pts: Pt[] = [];
      let dir = 1;
      for (let i = 0; i < key.length - 1; i++) {
        const a = key[i];
        const b = key[i + 1];
        pts.push(a);
        const gap = b.y - a.y;
        const segs = Math.floor(gap / 480);
        for (let s = 1; s < segs; s++) {
          const t = s / segs;
          pts.push({
            x: cx + dir * amp * Math.sin(t * Math.PI),
            y: a.y + gap * t,
          });
          dir *= -1;
        }
      }
      pts.push(key[key.length - 1]);

      setDim({ w, h });
      setD(smooth(pts));
    };

    build();
    const ro = new ResizeObserver(() => requestAnimationFrame(build));
    ro.observe(root);
    window.addEventListener("resize", build);
    window.addEventListener("load", build);
    // Re-measure once fonts/images settle and shift layout.
    const t = window.setTimeout(build, 600);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", build);
      window.removeEventListener("load", build);
      window.clearTimeout(t);
    };
  }, []);

  // First paint: empty svg so the ref mounts and we can measure the parent.
  if (!d) {
    return (
      <svg
        ref={svgRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />
    );
  }

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      width={dim.w}
      height={dim.h}
      viewBox={`0 0 ${dim.w} ${dim.h}`}
      fill="none"
      style={{
        filter:
          "drop-shadow(0 0 9px rgba(0,207,255,0.7)) drop-shadow(0 0 3px rgba(61,139,250,0.75))",
      }}
    >
      <defs>
        <linearGradient
          id="snake-grad"
          x1="0"
          y1="0"
          x2="0"
          y2={dim.h}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1A6FD4" />
          <stop offset="100%" stopColor="#00CFFF" />
        </linearGradient>
      </defs>

      {/* Faint full-length track — hints the route before you scroll. */}
      <path
        d={d}
        stroke="#E8E4D9"
        strokeOpacity="0.1"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Bright gradient line that draws in on scroll. */}
      <motion.path
        d={d}
        stroke="url(#snake-grad)"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: reduce ? 1 : drawn }}
      />
    </svg>
  );
};

export default ScrollSnake;
