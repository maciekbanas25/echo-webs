import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import AuroraShader from "./AuroraShader";

/** The closer: the aurora returns, one invitation floats in it. */
const AuroraCloser = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-[#080A0F]">
      {/* Dawn after the storm — calm horizon variant, not the hero aurora. */}
      <AuroraShader variant="horizon" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgba(8,10,15,0.45),transparent_75%)]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 mx-auto max-w-4xl px-5 text-center"
      >
        <h2 className="font-clash text-[clamp(2.8rem,8vw,7rem)] font-semibold leading-[1.0] tracking-[-0.02em] text-[#E8E4D9]">
          Yours could be <span className="obs-grad-text">next.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-sm font-satoshi text-lg text-[#E8E4D9]/65">
          Free mock-up and quote within 24 hours.
        </p>
        <Link
          to="/contact"
          className="mt-10 inline-block rounded-full bg-[#E8E4D9] px-10 py-4 font-satoshi text-base font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF] hover:shadow-[0_0_48px_rgba(0,207,255,0.4)]"
        >
          Get a free quote
        </Link>
      </motion.div>
    </section>
  );
};

export default AuroraCloser;
