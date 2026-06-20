import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * A browser-framed, auto-scrolling screenshot of a live demo site — it reads as
 * if someone is slowly scrolling the real page. The image is captured full-page
 * (tall), shown at frame width, and translated up to its bottom and back in a
 * smooth, continuous loop. Falls back to a static top-of-page view when the user
 * prefers reduced motion. No video required.
 */
const HeroSitePreview = () => {
  const reduce = useReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [scroll, setScroll] = useState(0);
  // The auto-scroll animation of a tall full-page image is janky on phones, so
  // on mobile we hold a static top-of-page (hero) view instead.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const measure = () => {
      const frame = frameRef.current;
      const img = imgRef.current;
      if (!frame || !img) return;
      const dist = img.offsetHeight - frame.clientHeight;
      setScroll(dist > 0 ? dist : 0);
    };
    const img = imgRef.current;
    if (img?.complete) measure();
    img?.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      img?.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#E8E4D9]/12 bg-[#0C0F16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] lg:rotate-[-1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-[#E8E4D9]/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
        <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
        <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
        <span className="ml-3 flex-1 rounded-md bg-[#080A0F]/70 px-3 py-1 font-satoshi text-xs text-[#E8E4D9]/40">
          yourbusiness.co.uk
        </span>
      </div>

      {/* Scrolling viewport */}
      <div ref={frameRef} className="relative aspect-[5/6] w-full overflow-hidden bg-[#fbfbf9]">
        <motion.img
          ref={imgRef}
          src="/car-detailer-fullpage.jpg"
          alt="A live website we built, scrolling through the page"
          draggable={false}
          className="absolute left-0 top-0 w-full select-none"
          animate={reduce || isMobile || !scroll ? { y: 0 } : { y: [0, -scroll, -scroll, 0, 0] }}
          transition={
            reduce || isMobile
              ? { duration: 0 }
              : {
                  duration: 24,
                  times: [0, 0.42, 0.5, 0.92, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                }
          }
        />
        {/* soft top/bottom fades so the scroll feels like a window */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#0C0F16]/15 to-transparent" />
      </div>
    </div>
  );
};

export default HeroSitePreview;
