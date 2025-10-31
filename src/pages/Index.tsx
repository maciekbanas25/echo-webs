import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";

const Index = () => {

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden min-h-[90vh] flex items-center">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-glow" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-6 inline-block">
              <div className="text-sm font-semibold text-primary mb-4 tracking-wider uppercase animate-pulse">
                Next-Gen Web Design
              </div>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent leading-tight">
              Modern, Fast, Affordable Websites
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Built by <span className="font-semibold text-primary">EchoWebs</span> — Modern efficiency meets cutting-edge design
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="shadow-glow hover:shadow-intense hover:scale-110 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <a href="#demos" className="relative z-10">
                  <span className="absolute inset-0 bg-gradient-to-r from-primary-glow via-primary to-primary-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                  <span className="relative">View My Work</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Continuous Background */}
      <div className="bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="relative">
          {/* About Section */}
          <About />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          {/* Portfolio Section */}
          <Portfolio />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          {/* Testimonials */}
          <Testimonials />

          <div className="max-w-5xl mx-auto">
            <div className="h-px bg-primary/20" />
          </div>

          {/* Contact Section */}
          <Contact />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
