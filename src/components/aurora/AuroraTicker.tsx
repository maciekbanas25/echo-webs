import { motion } from "motion/react";

const items = [
  "Web Design",
  "Brand Identity",
  "E-Commerce",
  "SEO",
  "Web Applications",
  "UI/UX",
  "Performance",
];

/** Slim CSS-only marquee. The duplicate strip is hidden from screen readers. */
const AuroraTicker = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9 }}
    className="overflow-hidden border-y border-[#E8E4D9]/[0.07] py-3.5"
  >
    <div className="obs-ticker-track">
      {[0, 1].map((copy) => (
        <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
          {items.map((item) => (
            <span
              key={item}
              className="flex items-center font-satoshi text-sm font-medium uppercase tracking-[0.28em] text-[#00CFFF]/90"
            >
              <span className="px-8">{item}</span>
              <span className="h-1 w-1 rounded-full bg-[#00CFFF]/40" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </motion.div>
);

export default AuroraTicker;
