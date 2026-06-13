import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Code, Palette, Zap, Heart, ArrowRight, Check } from "lucide-react";
import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";
import AuroraShader from "@/components/aurora/AuroraShader";
import Testimonials from "@/components/Testimonials";
import logo from "@/assets/ew-logo.png";

const ease = [0.19, 1, 0.22, 1] as const;

const skills = [
  "React & Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "PostgreSQL",
  "SEO Optimization",
  "UI/UX Design",
  "Responsive Design",
];

const values = [
  {
    icon: Zap,
    title: "Speed & Efficiency",
    description: "Quality work, delivered quickly. Modern tooling and a tight process mean you get results faster.",
  },
  {
    icon: Palette,
    title: "Design Excellence",
    description: "Every pixel matters. Visually striking sites that capture your brand and impress visitors.",
  },
  {
    icon: Code,
    title: "Clean Code",
    description: "Built with best practices and modern tech. Fast, secure, and easy to maintain.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description: "Your success is the priority. I listen, adapt, and build sites that serve your goals.",
  },
];

const AboutPage = () => {
  const reduce = useReducedMotion();
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
      <section className="relative overflow-hidden px-5 pb-16 pt-36 md:px-12 md:pt-44">
        <AuroraShader intensity={0.5} className="opacity-70" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080A0F]" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          <motion.div {...reveal(0)} className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1A6FD4] to-[#00CFFF] opacity-25 blur-3xl" />
            <img
              src={logo}
              alt="EchoWebs logo"
              className="relative z-10 h-40 w-40 object-contain md:h-56 md:w-56"
            />
          </motion.div>
          <div className="text-center md:text-left">
            <motion.p {...reveal(0.05)} className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
              About EchoWebs
            </motion.p>
            <motion.h1 {...reveal(0.1)} className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
              Premium sites, without the agency price tag.
            </motion.h1>
            <motion.p {...reveal(0.15)} className="mt-6 max-w-xl font-satoshi text-lg leading-relaxed text-[#E8E4D9]/60">
              I'm a web developer helping small businesses build a powerful online
              presence — professional, high-performance websites made accessible
              and affordable.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-t border-[#E8E4D9]/[0.06] px-5 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal(0)} className="mb-10 font-clash text-3xl font-semibold tracking-tight text-[#E8E4D9] md:text-5xl">
            The story.
          </motion.h2>
          <div className="space-y-6 font-satoshi text-lg leading-relaxed text-[#E8E4D9]/65">
            {[
              "After years working with all kinds of businesses, I kept seeing the same gap. Small businesses had to choose between expensive agency work or generic template sites that didn't capture who they are.",
              "EchoWebs exists to bridge that gap — modern technology paired with personal service, delivering sites that look like they cost thousands but are priced for real budgets.",
              "Every project starts by understanding your business, your customers, and your goals. From there I craft a digital experience that doesn't just look beautiful — it drives results.",
            ].map((para, i) => (
              <motion.p key={i} {...reveal(i * 0.06)}>
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-6xl">
          <motion.p {...reveal(0)} className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
            What I value
          </motion.p>
          <motion.h2 {...reveal(0.05)} className="mb-12 font-clash text-3xl font-semibold tracking-tight text-[#E8E4D9] md:text-5xl">
            The principles behind every build.
          </motion.h2>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                {...reveal(i * 0.07)}
                className="group flex gap-5 rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-7 transition-all duration-300 hover:border-[#00CFFF]/40 md:p-8"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E8E4D9]/10 bg-[#080A0F]/60 text-[#00CFFF] transition-colors duration-300 group-hover:border-[#00CFFF]/40">
                  <value.icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/55">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-t border-[#E8E4D9]/[0.06] px-5 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p {...reveal(0)} className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
            Skills &amp; tools
          </motion.p>
          <motion.h2 {...reveal(0.05)} className="mb-10 font-clash text-3xl font-semibold tracking-tight text-[#E8E4D9] md:text-5xl">
            Modern tech for modern websites.
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                {...reveal(i * 0.04)}
                className="flex items-center gap-2 rounded-full border border-[#E8E4D9]/[0.12] bg-[#E8E4D9]/[0.02] px-4 py-2.5 font-satoshi text-sm font-medium text-[#E8E4D9]/80 transition-colors duration-300 hover:border-[#00CFFF]/50 hover:text-[#E8E4D9]"
              >
                <Check className="h-4 w-4 text-[#00CFFF]" strokeWidth={2.4} />
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* Client reviews (shared component, Aurora-styled) */}
      <Testimonials />

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#E8E4D9]/[0.06] px-5 py-28 md:px-12">
        <AuroraShader intensity={0.42} className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[#080A0F]/40" />
        <motion.div {...reveal(0)} className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
            Let's work together.
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-satoshi text-lg text-[#E8E4D9]/60">
            Ready to take your business to the next level with a website worth
            staring at?
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8E4D9] px-7 py-3.5 font-satoshi text-[15px] font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF]"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-[#E8E4D9]/15 px-7 py-3.5 font-satoshi text-[15px] font-medium text-[#E8E4D9] transition-all duration-300 hover:border-[#00CFFF]/50 hover:text-[#00CFFF]"
            >
              View my work
            </Link>
          </div>
        </motion.div>
      </section>

      <AuroraFooter />
    </div>
  );
};

export default AboutPage;
