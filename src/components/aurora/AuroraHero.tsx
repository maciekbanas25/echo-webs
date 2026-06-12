import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import AuroraShader from "./AuroraShader";

const line1 = ["Websites", "worth"];
const line2 = ["staring", "at."];

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
    <section className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-[#080A0F]">
      <AuroraShader />
      {/* Readability scrim behind the type, invisible at the edges. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_52%,rgba(8,10,15,0.5),transparent_75%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center">
        <motion.p
          className="mb-7 font-satoshi text-sm font-medium uppercase tracking-[0.32em] text-[#E8E4D9]/60"
          {...enter(0.15)}
        >
          EchoWebs · Web Design Studio
        </motion.p>

        <h1 className="font-clash text-[clamp(3.4rem,10vw,8.75rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-[#E8E4D9]">
          <span className="block space-x-[0.24em]">{line1.map((t) => word(t))}</span>
          <span className="block space-x-[0.24em]">{line2.map((t) => word(t, true))}</span>
        </h1>

        <motion.p
          className="mx-auto mt-8 max-w-md font-satoshi text-lg leading-relaxed text-[#E8E4D9]/65 md:text-xl"
          {...enter(0.75)}
        >
          Custom sites for small businesses. Live in seven days, from £299.
        </motion.p>

        <motion.div className="mt-11" {...enter(0.9)}>
          <Link
            to="/contact"
            className="inline-block rounded-full bg-[#E8E4D9] px-9 py-4 font-satoshi text-base font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF] hover:shadow-[0_0_48px_rgba(0,207,255,0.4)]"
          >
            Start a project
          </Link>
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
