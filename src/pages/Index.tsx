import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Benefits from "@/components/Benefits";
import WorkPreview from "@/components/WorkPreview";

import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const scrollToWork = () => {
    document.getElementById("demos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Modern, Fast, Affordable Websites
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
              Built by <span className="font-semibold text-primary">EchoWebs</span> — Professional web design for small businesses that want to stand out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToWork}
                className="shadow-glow hover:shadow-intense hover:scale-105 transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                View My Work
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

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
