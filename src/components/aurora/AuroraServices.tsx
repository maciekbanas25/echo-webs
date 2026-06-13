import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, PenTool, ShoppingBag, Gauge, CalendarCheck } from "lucide-react";

const services = [
  {
    title: "Web Design",
    note: "Custom-designed, never a template.",
    Icon: PenTool,
  },
  {
    title: "E-Commerce",
    note: "Shops that make buying effortless.",
    Icon: ShoppingBag,
  },
  {
    title: "SEO & Speed",
    note: "Found on Google, loads instantly.",
    Icon: Gauge,
  },
  {
    title: "Bookings & Forms",
    note: "Enquiries straight to your inbox.",
    Icon: CalendarCheck,
  },
];

/**
 * Services as a 2×2 card grid — each tile bordered and icon-led so the four
 * offerings read as distinct things, not a stack of identical rows.
 */
const AuroraServices = () => {
  const reduce = useReducedMotion();

  return (
    <section id="services" className="scroll-mt-20 px-5 py-28 md:px-12 md:py-36">
      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]"
      >
        What we do
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: reduce ? 0 : 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
        className="mb-12 font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl"
      >
        Everything your business needs online.
      </motion.h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.07, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link
              to="/services"
              className="group relative flex h-full flex-col justify-between gap-10 overflow-hidden rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-8 transition-all duration-300 hover:border-[#00CFFF]/40 hover:bg-[#E8E4D9]/[0.04] md:p-10"
            >
              {/* Brand glow that wakes up on hover. */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#00CFFF]/0 blur-3xl transition-all duration-500 group-hover:bg-[#1A6FD4]/20" />

              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E8E4D9]/10 bg-[#080A0F]/60 text-[#00CFFF] transition-colors duration-300 group-hover:border-[#00CFFF]/40">
                  <service.Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <ArrowUpRight className="h-6 w-6 text-[#E8E4D9]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#00CFFF]" />
              </div>

              <div className="relative">
                <h3 className="font-clash text-2xl font-semibold tracking-tight text-[#E8E4D9] md:text-3xl">
                  {service.title}
                </h3>
                <p className="mt-2 font-satoshi text-base text-[#E8E4D9]/55">
                  {service.note}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-8 font-satoshi text-sm text-[#E8E4D9]/50"
      >
        Full pricing on the{" "}
        <Link to="/services" className="text-[#00CFFF] underline-offset-4 hover:underline">
          services page
        </Link>
        . Sites from £299.
      </motion.p>
    </section>
  );
};

export default AuroraServices;
