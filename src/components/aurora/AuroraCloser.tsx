import { motion, useReducedMotion } from "motion/react";
import QuoteDialog from "./QuoteDialog";

/**
 * The closer: a calm dark panel (no shader for now) holding the invitation in a
 * bordered glass card. The CTA is the expandable quote dialog — click it and it
 * morphs open into the quote builder, then the contact form.
 */
const AuroraCloser = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="start"
      className="relative flex min-h-[80vh] scroll-mt-20 items-center justify-center overflow-hidden bg-[#080A0F] px-5 py-28"
    >
      {/* Faint static brand glow so the dark panel isn't dead-flat. */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_55%,rgba(26,111,212,0.10),transparent_75%)]"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className="relative z-10 w-full max-w-2xl rounded-[2rem] border border-[#E8E4D9]/12 bg-[#0A0D14]/70 p-10 text-center shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl md:p-14"
      >
        <p className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
          Start here
        </p>
        <h2 className="font-clash text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.08] tracking-tight text-[#E8E4D9]">
          See your website before you pay a penny
        </h2>
        <p className="mx-auto mt-5 max-w-md font-satoshi text-lg leading-relaxed text-[#E8E4D9]/65">
          Build your quote in seconds, then tell us about your business — we'll
          send a free custom mock-up within 24 hours, no commitment.
        </p>

        <QuoteDialog
          triggerLabel="Get a free quote"
          triggerClassName="mt-9 inline-block rounded-full bg-[#E8E4D9] px-10 py-4 font-satoshi text-base font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF] hover:shadow-[0_0_48px_rgba(0,207,255,0.4)]"
        />
      </motion.div>
    </section>
  );
};

export default AuroraCloser;
