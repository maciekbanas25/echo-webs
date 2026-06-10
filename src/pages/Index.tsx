import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import WorkPreview from "@/components/WorkPreview";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import FAQ from "@/components/FAQ";
import Comparison from "@/components/Comparison";
import QuoteBuilder from "@/components/QuoteBuilder";
import TrustStrip from "@/components/TrustStrip";
import AnimatedBackground from "@/components/AnimatedBackground";
import GrainOverlay from "@/components/GrainOverlay";
import FloatingQuoteButton from "@/components/FloatingQuoteButton";
import Reveal from "@/components/Reveal";
import HeroShowcase from "@/components/HeroShowcase";
import SectionNav from "@/components/SectionNav";
import RotatingWord from "@/components/RotatingWord";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import Ticker from "@/components/Ticker";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, MessageSquare, Palette, Rocket } from "lucide-react";

const heroWords = ["Stunning", "websites", "for"];

const Index = () => {
  const reduceMotion = useReducedMotion();

  const scrollToWork = () => {
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  // Word-by-word entrance for the hero headline; collapses to a plain render
  // when the visitor prefers reduced motion.
  const wordEnter = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="min-h-screen">
      <GrainOverlay />
      <FloatingQuoteButton />
      <Navigation />
      <SectionNav />

      {/* Hero — fullscreen, editorial, left-aligned */}
      <section
        id="top"
        className="relative flex min-h-[100dvh] items-center overflow-hidden pb-24 pt-32 scroll-mt-20"
      >
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-glow" />
        {/* Static brand-colour atmosphere — no looping animation here. */}
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-[#1A6FD4] opacity-[0.07] blur-[140px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-[#00CFFF] opacity-[0.06] blur-[140px]" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-6xl">
            <motion.span className="eyebrow mb-8" {...wordEnter(0.05)}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              EchoWebs · Web Design Studio
            </motion.span>

            <h1 className="mb-8 font-syne text-[clamp(3rem,9vw,7.5rem)] font-extrabold leading-[0.98] tracking-tight text-foreground">
              {heroWords.map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block"
                  {...wordEnter(0.2 + i * 0.1)}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
              <motion.span className="block" {...wordEnter(0.2 + heroWords.length * 0.1)}>
                <RotatingWord
                  words={[
                    "Cafés",
                    "Barbers",
                    "Gyms",
                    "Salons",
                    "Restaurants",
                    "Photographers",
                    "Tradesmen",
                    "Detailers",
                  ]}
                  className="text-gradient"
                />
              </motion.span>
            </h1>

            <motion.p
              className="mb-12 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
              {...wordEnter(0.65)}
            >
              Custom websites for small businesses. Designed, built and live in
              about seven days, from £299.
            </motion.p>

            <motion.div
              className="flex flex-col items-start gap-6 sm:flex-row sm:items-center"
              {...wordEnter(0.78)}
            >
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="brand"
                  className="h-auto px-8 py-6 text-lg shadow-glow transition-all duration-300 hover:shadow-intense"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Get a Free Quote
                  </Link>
                </Button>
              </Magnetic>
              <button
                type="button"
                onClick={scrollToWork}
                className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
              >
                See the work
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
          {...wordEnter(1.1)}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Scroll
          </span>
          <span className="h-12 w-px bg-gradient-to-b from-[#1A6FD4] to-[#00CFFF]" />
        </motion.div>
      </section>

      {/* Services ticker — the only looping animation on the page */}
      <Ticker />

      {/* Live demo showcase */}
      <section className="relative pb-8">
        <div className="container mx-auto px-4">
          <HeroShowcase />
        </div>
      </section>

      {/* Stats — large gradient numbers, no cards */}
      <div className="border-y border-border/60">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
            {([
              { end: 8, suffix: "+", label: "Industry Templates" },
              { prefix: "£", end: 299, label: "Starting Price" },
              { end: 7, suffix: " Days", label: "Average Turnaround" },
              { text: "Free", label: "Mock-Up & Quote" },
            ] as { end?: number; prefix?: string; suffix?: string; text?: string; label: string }[]).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-gradient font-syne text-4xl font-bold md:text-6xl">
                  {stat.text ? (
                    stat.text
                  ) : (
                    <CountUp end={stat.end!} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TrustStrip />

      {/* Main Content */}
      <div className="relative overflow-hidden bg-background">
        <div className="relative">
          <Benefits />

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <WorkPreview />

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <Comparison />

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          {/* How It Works */}
          <section id="process" className="py-24 scroll-mt-20">
            <div className="container mx-auto px-4">
              <Reveal className="mb-16 max-w-3xl">
                <span className="eyebrow mb-5">Process</span>
                <h2 className="mb-5 font-syne text-4xl font-bold text-foreground md:text-6xl">
                  How It Works
                </h2>
                <p className="text-xl text-muted-foreground">
                  From idea to live website. Simple, stress-free, fast.
                </p>
              </Reveal>

              <div className="grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    icon: MessageSquare,
                    step: "01",
                    title: "Tell Me About Your Business",
                    description:
                      "Fill out a quick form with your goals, industry, and style preferences. I'll reply within 24 hours with a free mock-up concept.",
                  },
                  {
                    icon: Palette,
                    step: "02",
                    title: "I Design & Build",
                    description:
                      "I create a fully custom site tailored to your brand — mobile-first, fast, and built to convert visitors into customers.",
                  },
                  {
                    icon: Rocket,
                    step: "03",
                    title: "You Go Live",
                    description:
                      "After your approval and any revisions, I handle deployment and hand you a polished, live website ready to bring in clients.",
                  },
                ].map((item, index) => (
                  <Reveal
                    key={item.step}
                    delay={index * 0.15}
                    className="card-stroke group rounded-2xl p-8 transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    <div className="mb-6 flex items-start justify-between">
                      <span className="text-gradient font-syne text-5xl font-bold">
                        {item.step}
                      </span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-6 w-6 text-accent" />
                      </div>
                    </div>
                    <h3 className="mb-3 font-syne text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="leading-relaxed text-muted-foreground">{item.description}</p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-12">
                <Button
                  asChild
                  size="lg"
                  variant="brand"
                  className="shadow-glow transition-all duration-300 hover:shadow-intense"
                >
                  <a href="/contact" className="flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <QuoteBuilder />

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <div id="reviews" className="scroll-mt-20">
            <Testimonials />
          </div>

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <div id="faq" className="scroll-mt-20">
            <FAQ />
          </div>

          <div className="mx-auto max-w-5xl px-4">
            <div className="divider-soft" />
          </div>

          <CallToAction />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
