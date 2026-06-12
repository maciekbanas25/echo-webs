import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

/**
 * The work reel: a hover-expand gallery (skiper-ui HoverExpand_001, rebuilt for
 * the Aurora brand). Hover — or tap on touch — to grow a panel; clicking the
 * already-open panel opens the demo. No vertical scroll is ever captured.
 */
const AuroraWork = () => {
  const reduce = useReducedMotion();
  const navigate = useNavigate();
  const [active, setActive] = useState(1);

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  const open = (index: number, link: string) => {
    if (active === index) navigate(link);
    else setActive(index);
  };

  return (
    <section id="demos" className="scroll-mt-20 overflow-hidden py-28 md:py-36">
      <motion.div className="mb-12 px-5 md:px-12" {...reveal(0)}>
        <p className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
          Live demos
        </p>
        <h2 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
          The work speaks.
        </h2>
      </motion.div>

      <motion.div
        className="hide-scrollbar w-full overflow-x-auto px-5 md:overflow-visible md:px-12"
        {...reveal(0.1)}
      >
        <div className="flex w-max min-w-full items-center justify-start gap-1.5 md:justify-center">
          {projects.map((project, i) => {
            const [industry] = project.title.split(" — ");
            const isActive = active === i;
            return (
              <motion.div
                key={project.id}
                className="group relative cursor-pointer overflow-hidden rounded-3xl"
                initial={false}
                animate={{ width: isActive ? "26rem" : "4.5rem" }}
                style={{ height: "clamp(22rem, 56vh, 30rem)" }}
                transition={{
                  duration: reduce ? 0 : 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onHoverStart={() => setActive(i)}
                onClick={() => open(i, project.link)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  draggable={false}
                  loading={i < 3 ? "eager" : "lazy"}
                  className="h-full w-full select-none object-cover"
                />

                {/* Collapsed-state spine label */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-[#080A0F]/45"
                    >
                      <span className="font-satoshi text-xs font-medium uppercase tracking-[0.25em] text-[#E8E4D9]/70 [writing-mode:vertical-rl] rotate-180">
                        {industry}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Expanded-state caption */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#080A0F]/85 via-[#080A0F]/10 to-transparent p-7"
                    >
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="mb-1 font-satoshi text-xs font-medium uppercase tracking-[0.25em] text-[#00CFFF]">
                            {String(i + 1).padStart(2, "0")} · {project.category}
                          </p>
                          <h3 className="font-clash text-3xl font-semibold tracking-tight text-[#E8E4D9]">
                            {industry}
                          </h3>
                        </div>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#E8E4D9]/25 text-[#E8E4D9] transition-all duration-300 group-hover:border-[#00CFFF] group-hover:bg-[#00CFFF] group-hover:text-[#080A0F]">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="mx-5 mt-10 flex items-center justify-between md:mx-12"
        {...reveal(0.2)}
      >
        <p className="font-satoshi text-xs uppercase tracking-[0.25em] text-[#E8E4D9]/40">
          Hover to expand
        </p>
        <Link
          to="/portfolio"
          className="font-satoshi text-sm text-[#E8E4D9]/60 underline-offset-4 transition-colors hover:text-[#00CFFF]"
        >
          View all work
        </Link>
      </motion.div>
    </section>
  );
};

export default AuroraWork;
