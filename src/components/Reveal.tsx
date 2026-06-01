import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealAnimation = "fade-in" | "fade-in-up" | "scale-in";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Which keyframe to play when the element scrolls into view. */
  animation?: RevealAnimation;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Portion of the element that must be visible before revealing (0–1). */
  threshold?: number;
  /** Replay every time it enters the viewport instead of only once. */
  repeat?: boolean;
}

// Full literal class names so Tailwind's content scanner keeps them in the build.
const animateClass: Record<RevealAnimation, string> = {
  "fade-in": "animate-fade-in",
  "fade-in-up": "animate-fade-in-up",
  "scale-in": "animate-scale-in",
};

const hiddenClass: Record<RevealAnimation, string> = {
  "fade-in": "opacity-0 translate-y-[10px]",
  "fade-in-up": "opacity-0 translate-y-5",
  "scale-in": "opacity-0 scale-95",
};

/**
 * Wraps content so it animates in only once it scrolls into view, rather than
 * on page load. Falls back to instantly visible when the user prefers reduced
 * motion. Renders a plain <div> wrapper (becomes the grid/flex child).
 */
const Reveal = ({
  children,
  className,
  animation = "fade-in-up",
  delay = 0,
  threshold = 0.15,
  repeat = false,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!repeat) observer.unobserve(entry.target);
        } else if (repeat) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, repeat]);

  return (
    <div
      ref={ref}
      className={cn(
        inView ? animateClass[animation] : hiddenClass[animation],
        className
      )}
      style={{
        animationDelay: inView && delay ? `${delay}s` : undefined,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
