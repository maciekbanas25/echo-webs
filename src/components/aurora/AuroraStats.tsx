import { motion, useReducedMotion } from "motion/react";
import CountUp from "@/components/CountUp";

const stats: { end?: number; prefix?: string; suffix?: string; label: string }[] = [
  { prefix: "£", end: 299, label: "from" },
  { end: 7, label: "days to launch" },
  { end: 8, suffix: "+", label: "industries" },
  { end: 24, suffix: "h", label: "reply time" },
];

/** One quiet line of proof between the big moments. */
const AuroraStats = () => {
  const reduce = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className="border-y border-[#E8E4D9]/[0.07] py-14"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 px-5 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <span className="obs-grad-text font-clash text-4xl font-semibold md:text-5xl">
              <CountUp end={stat.end!} prefix={stat.prefix} suffix={stat.suffix} />
            </span>
            <span className="mt-1 block font-satoshi text-xs uppercase tracking-[0.25em] text-[#E8E4D9]/50">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AuroraStats;
