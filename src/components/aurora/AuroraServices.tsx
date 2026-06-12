import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const services = [
  {
    title: "Web Design",
    note: "Custom-designed, never a template",
  },
  {
    title: "E-Commerce",
    note: "Shops that make buying effortless",
  },
  {
    title: "SEO & Speed",
    note: "Found on Google, loads instantly",
  },
  {
    title: "Bookings & Forms",
    note: "Enquiries straight to your inbox",
  },
];

/**
 * Services as a sleek editorial index — four huge rows, no card clutter.
 * Each row links to the pricing page.
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
      <div className="mx-auto max-w-none">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
          >
            <Link
              to="/services"
              className="group flex items-center justify-between gap-6 border-b border-[#E8E4D9]/10 py-7 transition-colors first:border-t hover:border-[#00CFFF]/40 md:py-9"
            >
              <h3 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9]/90 transition-colors duration-300 group-hover:text-transparent md:text-7xl [&]:group-hover:bg-gradient-to-r [&]:group-hover:from-[#1A6FD4] [&]:group-hover:to-[#00CFFF] [&]:group-hover:bg-clip-text">
                {service.title}
              </h3>
              <div className="flex shrink-0 items-center gap-5">
                <span className="hidden font-satoshi text-sm text-[#E8E4D9]/50 sm:inline">
                  {service.note}
                </span>
                <ArrowUpRight className="h-6 w-6 text-[#E8E4D9]/35 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#00CFFF] md:h-8 md:w-8" />
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
