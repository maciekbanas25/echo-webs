import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll } from "motion/react";

const steps = [
  {
    n: "01",
    title: "Tell us about your business",
    body: "A quick, no-jargon chat about what you do and who you serve.",
  },
  {
    n: "02",
    title: "We design & build it",
    body: "Custom, on-brand, and mobile-first — you review a real mock-up, not a template.",
  },
  {
    n: "03",
    title: "You go live",
    body: "Online within seven days, fully set up and looked after after launch.",
  },
];

/**
 * Asymmetric break in the page rhythm: process copy hard-left, a browser
 * mock-up of real demo work floating right. Deliberately off-centre.
 */
const AuroraProcess = () => {
  const reduce = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement>(null);

  // Draw the spine as the steps scroll through the viewport.
  const { scrollYProgress } = useScroll({
    target: stepsRef,
    offset: ["start 0.85", "end 0.55"],
  });

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  return (
    <section className="overflow-hidden px-5 py-28 md:px-12 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* Left: the pitch, left-aligned. */}
        <div className="max-w-xl">
          <motion.p
            {...reveal(0)}
            className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]"
          >
            How it works
          </motion.p>
          <motion.h2
            {...reveal(0.05)}
            className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl"
          >
            From first chat to live in seven days.
          </motion.h2>

          <div ref={stepsRef} className="relative mt-12 pl-10">
            {/* Scroll-drawn brand spine connecting the three steps. */}
            <svg
              aria-hidden
              className="pointer-events-none absolute left-[5px] top-2 h-[calc(100%-1rem)] w-2"
              viewBox="0 0 2 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="aurora-spine"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#1A6FD4" />
                  <stop offset="100%" stopColor="#00CFFF" />
                </linearGradient>
              </defs>
              {/* Faint full-length track. */}
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="#E8E4D9"
                strokeOpacity="0.08"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {/* The bright gradient that draws in on scroll. */}
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100"
                stroke="url(#aurora-spine)"
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: reduce ? 1 : scrollYProgress }}
              />
            </svg>

            <div className="space-y-2">
              {steps.map((step, i) => (
                <motion.div
                  key={step.n}
                  {...reveal(0.1 + i * 0.08)}
                  className="flex gap-6 py-5"
                >
                  <span className="font-clash text-lg font-semibold text-[#00CFFF]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-satoshi text-base leading-relaxed text-[#E8E4D9]/55">
                      {step.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...reveal(0.35)} className="mt-10">
            <Link
              to="/services"
              className="font-satoshi text-sm text-[#E8E4D9]/70 underline-offset-4 transition-colors hover:text-[#00CFFF]"
            >
              See how it works in detail →
            </Link>
          </motion.div>
        </div>

        {/* Right: a browser mock-up of real demo work, tilted off-axis. */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative"
        >
          {/* Brand glow bed. */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(60%_60%_at_60%_40%,rgba(26,111,212,0.28),transparent_70%)] blur-2xl" />

          <div className="overflow-hidden rounded-2xl border border-[#E8E4D9]/12 bg-[#0C0F16] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] lg:rotate-[1.5deg] lg:transition-transform lg:duration-500 lg:hover:rotate-0">
            {/* Browser chrome. */}
            <div className="flex items-center gap-2 border-b border-[#E8E4D9]/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="h-3 w-3 rounded-full bg-[#E8E4D9]/20" />
              <span className="ml-3 flex-1 rounded-md bg-[#080A0F]/70 px-3 py-1 font-satoshi text-xs text-[#E8E4D9]/40">
                yourbusiness.co.uk
              </span>
            </div>
            <img
              src="/cafe.jpg"
              alt="Example of a custom small-business website we built"
              loading="lazy"
              className="aspect-[16/11] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AuroraProcess;
