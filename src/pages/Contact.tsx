import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Clock, ArrowUpRight } from "lucide-react";
import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";
import AuroraShader from "@/components/aurora/AuroraShader";
import ContactForm from "@/components/ContactForm";

const ease = [0.19, 1, 0.22, 1] as const;

const ContactPage = () => {
  const location = useLocation();
  const reduce = useReducedMotion();
  // Prefill from the homepage / quote-builder handoff, if present.
  const incoming = location.state as
    | { services?: string[]; projectDetails?: string }
    | null;

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <div className="min-h-screen bg-[#080A0F] font-satoshi text-[#E8E4D9]">
      <AuroraNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-36 md:px-12 md:pt-44">
        <AuroraShader intensity={0.5} className="opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0F]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p {...reveal(0)} className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
            Get in touch
          </motion.p>
          <motion.h1 {...reveal(0.05)} className="font-clash text-5xl font-semibold tracking-tight text-[#E8E4D9] md:text-7xl">
            Let's start your project.
          </motion.h1>
          <motion.p {...reveal(0.1)} className="mx-auto mt-6 max-w-xl font-satoshi text-lg text-[#E8E4D9]/60">
            Tell me about your business and what you need. I'll come back with a
            free, no-obligation quote within 24 hours.
          </motion.p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
          <motion.div {...reveal(0)} className="lg:col-span-2">
            <ContactForm
              initialServices={incoming?.services}
              initialProjectDetails={incoming?.projectDetails}
            />
          </motion.div>

          <motion.div {...reveal(0.1)} className="space-y-4">
            <a
              href="mailto:contact@echowebs.co.uk"
              className="group flex items-center justify-between gap-4 rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-6 transition-all duration-300 hover:border-[#00CFFF]/40"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E8E4D9]/10 bg-[#080A0F]/60 text-[#00CFFF]">
                  <Mail className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-clash text-base font-semibold tracking-tight text-[#E8E4D9]">
                    Email
                  </h3>
                  <p className="font-satoshi text-sm text-[#E8E4D9]/55">
                    contact@echowebs.co.uk
                  </p>
                </div>
              </div>
              <ArrowUpRight className="h-5 w-5 text-[#E8E4D9]/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#00CFFF]" />
            </a>

            <div className="rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-6">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-[#00CFFF]" strokeWidth={1.6} />
                <h3 className="font-clash text-base font-semibold tracking-tight text-[#E8E4D9]">
                  Response time
                </h3>
              </div>
              <p className="mt-3 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/55">
                I typically reply within 24 hours on business days. Prefer to talk
                specifics? Drop the details in the form and I'll do the rest.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#00CFFF]/20 bg-gradient-to-br from-[#1A6FD4]/[0.12] to-[#00CFFF]/[0.06] p-6">
              <h3 className="font-clash text-base font-semibold tracking-tight text-[#E8E4D9]">
                See it before you pay
              </h3>
              <p className="mt-2 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/65">
                Every project comes with a design preview first — you only commit
                once you love what you see.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <AuroraFooter />
    </div>
  );
};

export default ContactPage;
