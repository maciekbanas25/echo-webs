import logo from "@/assets/ew-logo.png";
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 mt-24 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo} alt="EchoWebs Logo" className="h-12 w-12" />
            <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              EchoWebs
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
            Building beautiful, high-performance websites for small businesses.
          </p>

          <div className="flex items-center justify-center gap-2 mb-6 text-muted-foreground">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:echowebs25@gmail.com"
              className="hover:text-primary transition-colors text-lg"
            >
              echowebs25@gmail.com
            </a>
          </div>

          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} EchoWebs. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
