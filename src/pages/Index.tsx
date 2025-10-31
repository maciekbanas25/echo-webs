import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import DemoCard from "@/components/DemoCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import cafeHero from "@/assets/cafe-hero.jpg";
import barberHero from "@/assets/barber-hero.jpg";
import gymHero from "@/assets/gym-hero.jpg";
import photographerHero from "@/assets/photographer-hero.jpg";

const Index = () => {
  const demos = [
    {
      title: "Cozy Café",
      description: "Warm, inviting design for coffee shops and restaurants",
      image: cafeHero,
      link: "/cafe",
    },
    {
      title: "Modern Barber",
      description: "Bold, sophisticated style for grooming professionals",
      image: barberHero,
      link: "/barber",
    },
    {
      title: "Energetic Gym",
      description: "Dynamic, motivational design for fitness centers",
      image: gymHero,
      link: "/gym",
    },
    {
      title: "Elegant Photography",
      description: "Clean, artistic showcase for creative professionals",
      image: photographerHero,
      link: "/photographer",
    },
  ];

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

      {/* About Section */}
      <About />

      {/* Demo Gallery */}
      <section id="demos" className="py-32 bg-background relative">
        <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Portfolio Showcase
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore versatile designs across industries. Each demo showcases unique, tailored experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {demos.map((demo, index) => (
              <div key={demo.link} style={{ animationDelay: `${index * 0.1}s` }} className="animate-scale-in">
                <DemoCard {...demo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
