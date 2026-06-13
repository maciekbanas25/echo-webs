import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import AuroraShader from "./AuroraShader";

const line1 = ["Big-agency", "websites,"];
const line2 = ["without", "the", "big-agency", "price."];

/**
 * The wow: a fullscreen living aurora rendered in WebGL, with one billboard
 * statement floating in it. Nothing else competes for attention.
 */
const AuroraHero = () => {
  const reduce = useReducedMotion();
  let w = 0;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  const word = (text: string, gradient = false) => {
    const delay = 0.3 + w * 0.08;
    w += 1;
    return (
      <motion.span
        key={text}
        className={`inline-block ${gradient ? "obs-grad-text" : ""}`}
        {...enter(delay)}
      >
        {text}
      </motion.span>
    );
  };

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden px-5 pb-24 pt-32 md:px-12">
      {/* Living shader + readability scrim — kept below the scroll-snake layer. */}
      <div className="absolute inset-0 -z-20">
        <AuroraShader />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60%_55%_at_38%_50%,rgba(8,10,15,0.62),transparent_78%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        {/* Left: the billboard statement + pitch, left-aligned. */}
        <div className="text-left">
          <motion.p
            className="mb-5 font-satoshi text-sm font-medium uppercase tracking-[0.32em] text-[#E8E4D9]/60"
            {...enter(0.15)}
          >
            EchoWebs · Web Design Studio
          </motion.p>

          <h1 className="font-clash text-[clamp(2.4rem,5.5vw,4.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-[#E8E4D9]">
            <span className="block space-x-[0.22em]">
              {line1.map((t) => word(t))}
            </span>
            <span className="block space-x-[0.22em]">
              {line2.map((t) => word(t, true))}
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-md font-satoshi text-lg leading-relaxed text-[#E8E4D9]/65 md:text-xl"
            {...enter(0.75)}
          >
            Custom-built websites for small businesses. Designed, built, and live in seven days.
          </motion.p>

          <motion.div className="mt-9" {...enter(0.9)}>
            <Link
              to="/contact"
              className="inline-block rounded-full bg-[#E8E4D9] px-9 py-4 font-satoshi text-base font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF] hover:shadow-[0_0_48px_rgba(0,207,255,0.4)]"
            >
              Start a project
            </Link>
          </motion.div>
        </div>

        {/* Right: a browser mock-up the snake line weaves behind. */}
        <motion.div
          data-snake-anchor
          data-snake-side="right"
          className="relative mx-auto w-full max-w-lg lg:mx-0"
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* Brand glow bed. */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(60%_60%_at_55%_45%,rgba(0,207,255,0.22),transparent_70%)] blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-[#E8E4D9]/12 bg-[#0C0F16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)] lg:rotate-[-1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            <div className="flex items-center gap-2 border-b border-[#E8E4D9]/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="ml-3 flex-1 rounded-md bg-[#080A0F]/70 px-3 py-1 font-satoshi text-xs text-[#E8E4D9]/40">
                yourbusiness.co.uk
              </span>
            </div>
            <img
              src="/car-detailing.jpg"
              alt="Example of a custom small-business website we built"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Quiet scroll cue. */}
      <motion.div
        className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2"
        {...enter(1.5)}
      >
        <div className="obs-bounce h-9 w-px bg-gradient-to-b from-transparent via-[#E8E4D9]/50 to-[#00CFFF]" />
      </motion.div>
    </section>
  );
};

export default AuroraHero;
