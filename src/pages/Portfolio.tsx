import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";
import AuroraShader from "@/components/aurora/AuroraShader";
import { projects, categories } from "@/data/projects";

const ease = [0.19, 1, 0.22, 1] as const;

const PortfolioPage = () => {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
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
            The work
          </motion.p>
          <motion.h1 {...reveal(0.05)} className="font-clash text-5xl font-semibold tracking-tight text-[#E8E4D9] md:text-7xl">
            Live demos, built to convert.
          </motion.h1>
          <motion.p {...reveal(0.1)} className="mx-auto mt-6 max-w-xl font-satoshi text-lg text-[#E8E4D9]/60">
            Real, clickable sites across eight industries — each one designed for
            speed, beauty, and turning visitors into customers.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-5 pb-12 md:px-12">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-2.5">
          {categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 font-satoshi text-sm font-medium transition-all duration-300 ${
                  active
                    ? "border-[#00CFFF] bg-[#00CFFF]/[0.08] text-[#00CFFF]"
                    : "border-[#E8E4D9]/[0.12] text-[#E8E4D9]/60 hover:border-[#E8E4D9]/30 hover:text-[#E8E4D9]"
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <motion.div
          layout
          className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const [industry] = project.title.split(" — ");
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <Link
                    to={project.link}
                    className="group relative block h-full overflow-hidden rounded-3xl border border-[#E8E4D9]/10 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#00CFFF]/40 hover:shadow-[0_30px_70px_-30px_rgba(0,207,255,0.45)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/35 to-transparent" />

                      {/* Top row: index + category */}
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                        <span className="font-clash text-3xl font-semibold text-[#E8E4D9]/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full border border-[#E8E4D9]/20 bg-[#080A0F]/50 px-3 py-1 font-satoshi text-[11px] font-medium uppercase tracking-[0.18em] text-[#E8E4D9]/75 backdrop-blur-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Bottom caption */}
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <div className="flex items-end justify-between gap-4">
                          <h3 className="font-clash text-2xl font-semibold tracking-tight text-[#E8E4D9]">
                            {industry}
                          </h3>
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E8E4D9]/25 text-[#E8E4D9] transition-all duration-300 group-hover:border-[#00CFFF] group-hover:bg-[#00CFFF] group-hover:text-[#080A0F]">
                            <ArrowUpRight className="h-5 w-5" />
                          </span>
                        </div>
                        <p className="mt-3 max-h-0 overflow-hidden font-satoshi text-sm leading-relaxed text-[#E8E4D9]/65 opacity-0 transition-all duration-500 group-hover:max-h-28 group-hover:opacity-100">
                          {project.description}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.features.slice(0, 3).map((feature) => (
                            <span
                              key={feature}
                              className="rounded-full border border-[#E8E4D9]/[0.12] bg-[#080A0F]/40 px-2.5 py-1 font-satoshi text-[11px] text-[#E8E4D9]/70 backdrop-blur-sm"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="py-16 text-center font-satoshi text-[#E8E4D9]/50">
            No projects in this category yet. Check back soon.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#E8E4D9]/[0.06] px-5 py-28 md:px-12">
        <AuroraShader intensity={0.42} className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[#080A0F]/40" />
        <motion.div {...reveal(0)} className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
            Like what you see?
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-satoshi text-lg text-[#E8E4D9]/60">
            Every demo started as a blank page. Yours could be next — let's build
            something your customers remember.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#E8E4D9] px-7 py-3.5 font-satoshi text-[15px] font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF]"
          >
            Request a site like this
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <AuroraFooter />
    </div>
  );
};

export default PortfolioPage;
