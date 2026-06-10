import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const CallToAction = () => {
  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      <div className="absolute inset-0 bg-gradient-glow" />
      {/* Static brand atmosphere anchoring the closing statement. */}
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#1A6FD4] opacity-[0.08] blur-[140px]" />

      <div className="container relative z-10 mx-auto px-4">
        <Reveal className="mx-auto max-w-5xl text-center">
          <span className="eyebrow mb-8 justify-center">Ready when you are</span>
          <h2 className="mb-8 font-syne text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground">
            Your business deserves
            <span className="text-gradient block">a better website.</span>
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground md:text-xl">
            Free mock-up and quote. A reply within 24 hours. Live in about
            seven days.
          </p>

          <div className="flex flex-col items-center gap-6">
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="brand"
                className="h-auto px-10 py-7 text-lg shadow-glow transition-all duration-300 hover:shadow-intense"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  Get a Free Quote
                </Link>
              </Button>
            </Magnetic>
            <Link
              to="/services"
              className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent"
            >
              View pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CallToAction;
