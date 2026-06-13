import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { Check, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import AuroraNav from "@/components/aurora/AuroraNav";
import AuroraFooter from "@/components/aurora/AuroraFooter";
import AuroraShader from "@/components/aurora/AuroraShader";
import { mainTiers, addOns, type ServicePlan } from "@/data/services";

const ease = [0.19, 1, 0.22, 1] as const;

const steps = [
  { step: "01", title: "Discovery", description: "We talk through your business, goals, and vision for the site." },
  { step: "02", title: "Design", description: "I craft a custom mockup tailored to your brand — never a template." },
  { step: "03", title: "Development", description: "Built with modern, fast, secure tech and tuned for speed." },
  { step: "04", title: "Launch", description: "We go live, and I'm on hand for support after you launch." },
];

const faqs = [
  { q: "How long does it take to build a website?", a: "Most starter sites are completed within 1–2 weeks. Premium websites typically take 2–4 weeks depending on complexity." },
  { q: "Do I need to provide content?", a: "Ideally, yes — you know your business best. But I can help with copywriting and source stock imagery if needed." },
  { q: "What about hosting and domain?", a: "I'll guide you through setting up hosting and your domain. These are separate costs, but I'll recommend affordable, reliable options." },
  { q: "Can I update the website myself?", a: "Premium packages include a CMS, so you can easily update text, images, and more — no coding required." },
];

/** One full pricing column. Premium is centered, raised, gradient-bordered. */
const TierCard = ({ plan, featured }: { plan: ServicePlan; featured: boolean }) => {
  const isMonthly = plan.id === "maintenance";

  const inner = (
    <div className="flex h-full flex-col rounded-[calc(1.5rem-1.5px)] bg-[#0A0E16] p-8 md:p-9">
      {featured && (
        <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-[#1A6FD4] to-[#00CFFF] px-3.5 py-1 font-satoshi text-[11px] font-semibold uppercase tracking-[0.18em] text-[#080A0F]">
          Most popular
        </span>
      )}

      <h3 className="font-clash text-2xl font-semibold tracking-tight text-[#E8E4D9]">
        {plan.name}
      </h3>
      <p className="mt-2 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/55">
        {plan.description}
      </p>

      <div className="mt-6 flex items-end gap-2">
        {plan.originalPrice && (
          <span className="mb-1 font-satoshi text-base text-[#E8E4D9]/35 line-through">
            {plan.originalPrice}
          </span>
        )}
        <span
          className={`font-clash text-5xl font-semibold leading-none ${
            featured ? "obs-grad-text" : "text-[#E8E4D9]"
          }`}
        >
          {plan.price}
        </span>
        {isMonthly && (
          <span className="mb-1 font-satoshi text-sm text-[#E8E4D9]/50">/mo</span>
        )}
      </div>
      {plan.originalPrice && (
        <span className="mt-3 w-fit rounded-full border border-[#00CFFF]/30 bg-[#00CFFF]/[0.06] px-3 py-1 font-satoshi text-[11px] font-medium text-[#00CFFF]">
          Limited launch offer
        </span>
      )}

      <ul className="mt-7 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#00CFFF]" strokeWidth={2.4} />
            <span className="font-satoshi text-sm leading-snug text-[#E8E4D9]/75">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to="/contact"
        className={`mt-8 flex items-center justify-center gap-2 rounded-full px-5 py-3 font-satoshi text-[15px] font-medium transition-all duration-300 ${
          featured
            ? "bg-gradient-to-r from-[#1A6FD4] to-[#00CFFF] text-[#080A0F] hover:shadow-[0_0_36px_-6px_rgba(0,207,255,0.6)]"
            : "border border-[#E8E4D9]/15 text-[#E8E4D9] hover:border-[#00CFFF]/50 hover:text-[#00CFFF]"
        }`}
      >
        Get started
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );

  return (
    <div
      className={`h-full ${
        featured
          ? "rounded-3xl bg-gradient-to-br from-[#1A6FD4] to-[#00CFFF] p-[1.5px] shadow-[0_0_70px_-20px_rgba(0,207,255,0.45)] md:-translate-y-4"
          : "rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-[1.5px]"
      }`}
    >
      {inner}
    </div>
  );
};

const Services = () => {
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
        <div className="relative mx-auto max-w-3xl text-center">
          <motion.p {...reveal(0)} className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
            Services &amp; Pricing
          </motion.p>
          <motion.h1 {...reveal(0.05)} className="font-clash text-5xl font-semibold tracking-tight text-[#E8E4D9] md:text-7xl">
            Honest pricing.<br />No surprises.
          </motion.h1>
          <motion.p {...reveal(0.1)} className="mx-auto mt-6 max-w-xl font-satoshi text-lg text-[#E8E4D9]/60">
            Premium web design at a small-business price. Pick a package, add what
            you need, and you'll see the site before you pay a penny.
          </motion.p>
        </div>
      </section>

      {/* Main tiers */}
      <section className="px-5 pb-8 md:px-12">
        <div className="mx-auto grid max-w-6xl items-stretch gap-5 md:grid-cols-3 md:gap-6 md:pt-6">
          {mainTiers.map((plan, i) => (
            <motion.div key={plan.id} {...reveal(i * 0.08)} className="h-full">
              <TierCard plan={plan} featured={!!plan.popular} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Add-ons strip */}
      <section className="px-5 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal(0)} className="mb-7 flex items-center gap-4">
            <span className="font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
              Add to any package
            </span>
            <span className="h-px flex-1 bg-[#E8E4D9]/10" />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {addOns.map((plan, i) => (
              <motion.div
                key={plan.id}
                {...reveal(i * 0.08)}
                className="group flex flex-col gap-5 rounded-3xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-7 transition-all duration-300 hover:border-[#00CFFF]/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#E8E4D9]/10 bg-[#080A0F]/60 text-[#00CFFF]">
                    <plan.icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                        {plan.name}
                      </h3>
                      <span className="flex items-center gap-1 font-satoshi text-sm font-medium text-[#00CFFF]">
                        <Plus className="h-3.5 w-3.5" />
                        {plan.price}
                      </span>
                    </div>
                    <p className="mt-1.5 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/55">
                      {plan.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {plan.features.slice(0, 3).map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-[#E8E4D9]/10 px-2.5 py-1 font-satoshi text-[11px] text-[#E8E4D9]/55"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to="/contact"
                  aria-label={`Add ${plan.name}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-full border border-[#E8E4D9]/15 text-[#E8E4D9] transition-all duration-300 group-hover:border-[#00CFFF] group-hover:bg-[#00CFFF] group-hover:text-[#080A0F] sm:self-auto"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-[#E8E4D9]/[0.06] px-5 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.p {...reveal(0)} className="mb-3 font-satoshi text-xs font-medium uppercase tracking-[0.3em] text-[#00CFFF]">
            How it works
          </motion.p>
          <motion.h2 {...reveal(0.05)} className="mb-14 font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-5xl">
            A simple path from idea to launch.
          </motion.h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((item, i) => (
              <motion.div key={item.step} {...reveal(i * 0.08)}>
                <div className="font-clash text-5xl font-semibold text-[#E8E4D9]/[0.12]">
                  {item.step}
                </div>
                <h3 className="mt-3 font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                  {item.title}
                </h3>
                <p className="mt-2 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/55">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 pb-24 md:px-12 md:pb-32">
        <div className="mx-auto max-w-3xl">
          <motion.h2 {...reveal(0)} className="mb-12 text-center font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-5xl">
            Questions, answered.
          </motion.h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.q}
                {...reveal(i * 0.06)}
                className="rounded-2xl border border-[#E8E4D9]/10 bg-[#E8E4D9]/[0.02] p-6 transition-colors duration-300 hover:border-[#00CFFF]/30"
              >
                <h3 className="font-clash text-lg font-semibold tracking-tight text-[#E8E4D9]">
                  {faq.q}
                </h3>
                <p className="mt-2 font-satoshi text-sm leading-relaxed text-[#E8E4D9]/60">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-[#E8E4D9]/[0.06] px-5 py-28 md:px-12">
        <AuroraShader intensity={0.42} className="opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-[#080A0F]/40" />
        <motion.div {...reveal(0)} className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] md:text-6xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-5 max-w-lg font-satoshi text-lg text-[#E8E4D9]/60">
            Tell me about your project and I'll send a free, no-obligation quote
            within 24 hours.
          </p>
          <Link
            to="/contact"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#E8E4D9] px-7 py-3.5 font-satoshi text-[15px] font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF]"
          >
            Get a free quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      <AuroraFooter />
    </div>
  );
};

export default Services;
