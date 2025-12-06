import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageSquare } from "lucide-react";

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
  primaryColor: string;
}

export const DemoPageCTA = ({ primaryColor }: DemoPageCTAProps) => {
  return (
    <section className="py-20 bg-gradient-to-r from-black/90 to-black/80">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Like This Design?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Let's build something like this for your business.
          </p>
          <Button 
            asChild 
            size="lg"
            className="shadow-glow hover:shadow-intense transition-all duration-300"
            style={{ backgroundColor: primaryColor }}
          >
            <Link to="/contact" className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Let's Build Yours
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface DemoPageBackButtonProps {
  primaryColor: string;
}

export const DemoPageBackButton = ({ primaryColor }: DemoPageBackButtonProps) => {
  return (
    <section className="py-8 bg-black/90">
      <div className="container mx-auto px-4 text-center">
        <Button 
          asChild 
          variant="outline" 
          size="lg" 
          className="hover:text-white transition-all duration-300"
          style={{ borderColor: primaryColor, color: primaryColor }}
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
