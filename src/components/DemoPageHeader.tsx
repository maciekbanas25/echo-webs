import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare, ArrowRight, Image } from "lucide-react";

interface DemoPageHeaderProps {
  title: string;
  subtitle: string;
  icon?: ReactNode;
  backgroundImage: string;
  primaryColor: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const DemoPageHeader = ({
  title,
  subtitle,
  icon,
  backgroundImage,
  primaryColor,
  buttonText = "Book Now",
  buttonAction,
}: DemoPageHeaderProps) => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        {icon && (
          <div className="mb-4">
            {icon}
          </div>
        )}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">{title}</h1>
        <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide">{subtitle}</p>
        <Button
          size="lg"
          className="text-lg px-8 py-6"
          style={{ backgroundColor: primaryColor, color: "white" }}
          onClick={buttonAction}
        >
          {buttonText}
        </Button>
      </div>
    </section>
  );
};

interface DemoPageCTAProps {
  primaryColor?: string;
}

export const DemoPageCTA = ({ primaryColor }: DemoPageCTAProps) => {
  return (
    <section className="py-16 relative overflow-hidden bg-background border-t border-primary/20">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 0%, hsl(217 91% 60% / 0.07) 0%, transparent 65%)'
      }} />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">

          {/* EchoWebs badge — always platform-branded, never demo-coloured */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold uppercase tracking-wider">EchoWebs Demo</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Like This Design?
          </h2>

          {/* Placeholder disclaimer */}
          <div className="flex items-start gap-2 bg-secondary/60 border border-border rounded-xl px-4 py-3 mb-6 text-left">
            <Image className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Demo only.</span> Images shown are placeholders. Your site would use your real photos, branding, copy, and content — built completely from scratch for your business.
            </p>
          </div>

          <p className="text-muted-foreground mb-8">
            You're not locked into this layout either. Every EchoWebs site is a custom build — not a template.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="shadow-glow hover:shadow-intense transition-all duration-300"
            >
              <Link to="/contact" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Get Your Custom Website
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary transition-colors">
              <Link to="/services" className="flex items-center gap-2">
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

interface DemoPageBackButtonProps {
  primaryColor?: string;
}

export const DemoPageBackButton = ({ primaryColor }: DemoPageBackButtonProps) => {
  return (
    <section className="py-6 bg-background border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <Button
          asChild
          variant="ghost"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link to="/portfolio" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default DemoPageHeader;
