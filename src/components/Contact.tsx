import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 pb-56">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Get a Quote
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
            Ready to start your project? Let's talk about your website.
          </p>

          <Button
            asChild
            size="lg"
            className="shadow-glow hover:shadow-intense hover:scale-110 hover:-translate-y-1 transition-all duration-300 text-lg px-10 py-6 h-auto"
          >
            <a href="mailto:echowebs25@gmail.com" className="flex items-center gap-3">
              <Mail className="w-5 h-5" />
              <span>Contact Me</span>
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
