import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import WorkPreview from "@/components/WorkPreview";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import AnimatedBackground from "@/components/AnimatedBackground";
import GrainOverlay from "@/components/GrainOverlay";
import CursorGlow from "@/components/CursorGlow";
import Reveal from "@/components/Reveal";
import HeroShowcase from "@/components/HeroShowcase";
import RotatingWord from "@/components/RotatingWord";
import CountUp from "@/components/CountUp";
import Magnetic from "@/components/Magnetic";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Palette, Rocket, Zap } from "lucide-react";

const Index = () => {
  const scrollToWork = () => {
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      <GrainOverlay />
      <CursorGlow />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-screen flex items-center">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-glow" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-6 inline-block">
              <div className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase animate-pulse">
                Next-Gen Web Design
              </div>
            </div>
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-foreground">
              Stunning websites for{" "}
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
                className="bg-gradient-hero bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Built by <span className="font-semibold text-primary">EchoWebs</span> — Professional web design for small businesses that want to stand out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Magnetic>
                <Button
                  size="lg"
                  onClick={scrollToWork}
                  className="shadow-glow hover:shadow-intense transition-all duration-300 text-lg px-8 py-6 h-auto"
                >
                  View My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6 h-auto"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Get a Free Quote
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>

          <div className="animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <div className="border-y border-primary/10 bg-secondary/50">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {([
              { end: 8, suffix: "+", label: "Industry Templates" },
              { prefix: "£", end: 299, label: "Starting Price" },
              { end: 7, suffix: " Days", label: "Average Turnaround" },
              { text: "Free", label: "Mock-Up & Quote" },
            ] as { end?: number; prefix?: string; suffix?: string; text?: string; label: string }[]).map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.text ? (
                    stat.text
                  ) : (
                    <CountUp end={stat.end!} prefix={stat.prefix} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative">
          <Benefits />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          <WorkPreview />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          {/* How It Works */}
          <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
              <Reveal className="text-center mb-16">
                <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
                  How It Works
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  From idea to live website — a simple, stress-free process.
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  {
                    icon: MessageSquare,
                    step: "01",
                    title: "Tell Me About Your Business",
                    description: "Fill out a quick form with your goals, industry, and style preferences. I'll reply within 24 hours with a free mock-up concept.",
                  },
                  {
                    icon: Palette,
                    step: "02",
                    title: "I Design & Build",
                    description: "I create a fully custom site tailored to your brand — mobile-first, fast, and built to convert visitors into customers.",
                  },
                  {
                    icon: Rocket,
                    step: "03",
                    title: "You Go Live",
                    description: "After your approval and any revisions, I handle deployment and hand you a polished, live website ready to bring in clients.",
                  },
                ].map((item, index) => (
                  <Reveal
                    key={item.step}
                    delay={index * 0.15}
                    className="relative text-center p-8 rounded-2xl bg-card border border-primary/20 hover:border-primary/40 transition-all duration-300"
                  >
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-glow">
                      {item.step}
                    </div>
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 mt-2">
                      <item.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </Reveal>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  asChild
                  size="lg"
                  className="shadow-glow hover:shadow-intense transition-all duration-300"
                >
                  <a href="/contact" className="flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
            </div>
          </section>

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          <Testimonials />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          <CallToAction />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
