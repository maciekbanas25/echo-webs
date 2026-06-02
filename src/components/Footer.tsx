import { Link } from "react-router-dom";
import logo from "@/assets/ew-logo.png";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="EchoWebs Logo" className="h-10 w-10" />
              <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                EchoWebs
              </div>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              Building beautiful, high-performance websites for small businesses.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@echowebs.co.uk" className="hover:text-primary transition-colors">
                contact@echowebs.co.uk
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              <Link to="/portfolio" className="text-muted-foreground hover:text-primary transition-colors">Portfolio</Link>
              <Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Demos</h4>
            <div className="flex flex-col gap-2">
              <Link to="/cafe" className="text-muted-foreground hover:text-primary transition-colors">Café</Link>
              <Link to="/barber" className="text-muted-foreground hover:text-primary transition-colors">Barber</Link>
              <Link to="/gym" className="text-muted-foreground hover:text-primary transition-colors">Gym</Link>
              <Link to="/photographer" className="text-muted-foreground hover:text-primary transition-colors">Photographer</Link>
              <Link to="/car-detailer" className="text-muted-foreground hover:text-primary transition-colors">Car Detailer</Link>
              <Link to="/tradesman" className="text-muted-foreground hover:text-primary transition-colors">Landscaping</Link>
              <Link to="/restaurant" className="text-muted-foreground hover:text-primary transition-colors">Restaurant</Link>
              <Link to="/beauty-salon" className="text-muted-foreground hover:text-primary transition-colors">Beauty Salon</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-8 text-center">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EchoWebs. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
