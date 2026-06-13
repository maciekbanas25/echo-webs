import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";

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

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  return (
    <section className="overflow-hidden px-5 py-28 md:px-12 md:py-36">
      <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Left: a browser mock-up the snake line weaves behind. */}
        <motion.div
          data-snake-anchor
          data-snake-side="left"
          initial={{ opacity: 0, y: reduce ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          className="relative order-2 lg:order-1"
        >
          {/* Brand glow bed. */}
          <div className="pointer-events-none absolute -inset-8 -z-10 bg-[radial-gradient(60%_60%_at_45%_40%,rgba(26,111,212,0.28),transparent_70%)] blur-2xl" />

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

        {/* Right: the pitch + steps. */}
        <div className="order-1 max-w-xl lg:order-2 lg:ml-auto">
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

          <div className="mt-12 space-y-2">
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

          <motion.div {...reveal(0.35)} className="mt-10">
            <Link
              to="/services"
              className="font-satoshi text-sm text-[#E8E4D9]/70 underline-offset-4 transition-colors hover:text-[#00CFFF]"
            >
              See how it works in detail →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuroraProcess;
