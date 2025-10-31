import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/ew-logo.png";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="EchoWebs Logo" className="h-12 w-12 object-contain" />
            <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              EchoWebs
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/cafe" className="text-foreground hover:text-primary transition-colors">
              Café
            </Link>
            <Link to="/barber" className="text-foreground hover:text-primary transition-colors">
              Barber
            </Link>
            <Link to="/gym" className="text-foreground hover:text-primary transition-colors">
              Gym
            </Link>
            <Link to="/photographer" className="text-foreground hover:text-primary transition-colors">
              Photographer
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
