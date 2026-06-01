import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

const CallToAction = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Need a Website for Your Business?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
            Let's create something amazing together. Get a free mockup and quote for your project.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Magnetic>
              <Button
                asChild
                size="lg"
                className="shadow-glow hover:shadow-intense transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Link to="/contact" className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5" />
                  Get a Free Quote
                </Link>
              </Button>
            </Magnetic>
            <Magnetic>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-lg px-8 py-6 h-auto"
              >
                <Link to="/services" className="flex items-center gap-3">
                  View Pricing
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CallToAction;
