import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

interface BeforeAfterProps {
  /** "After" image (the good one). */
  afterSrc: string;
  /** Optional separate "before" image. Defaults to a degraded afterSrc. */
  beforeSrc?: string;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Draggable before/after comparison. If no beforeSrc is given, the after image
 * is shown degraded (grayscale/blur) as an illustrative "generic" version.
 */
const BeforeAfter = ({
  afterSrc,
  beforeSrc,
  beforeLabel = "Generic template",
  afterLabel = "EchoWebs build",
}: BeforeAfterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [pos, setPos] = useState(50);

  const setFromClientX = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/9] w-full select-none overflow-hidden rounded-2xl border border-primary/20 shadow-intense"
      onMouseDown={(e) => {
        dragging.current = true;
        setFromClientX(e.clientX);
      }}
      onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => setFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
    >
      {/* After (full) */}
      <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Before (clipped to the left of the handle) */}
      <img
        src={beforeSrc ?? afterSrc}
        alt={beforeLabel}
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover ${
          beforeSrc ? "" : "[filter:grayscale(1)_blur(1px)_brightness(0.65)]"
        }`}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      <span
        className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
        style={{ opacity: pos > 12 ? 1 : 0 }}
      >
        {beforeLabel}
      </span>

      {/* Handle */}
      <div className="absolute inset-y-0 z-10 w-0.5 bg-white/90" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-primary text-primary-foreground shadow-glow">
          <MoveHorizontal className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default BeforeAfter;
