import { Link } from "react-router-dom";
import logo from "@/assets/ew-logo.png";
import { Mail } from "lucide-react";
import { isEmbedded } from "@/lib/embed";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const demoLinks = [
  { to: "/cafe", label: "Café" },
  { to: "/barber", label: "Barber" },
  { to: "/gym", label: "Gym" },
  { to: "/photographer", label: "Photographer" },
  { to: "/car-detailer", label: "Car Detailer" },
  { to: "/tradesman", label: "Landscaping" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/beauty-salon", label: "Beauty Salon" },
];

const Footer = () => {
  // Hidden inside embedded previews (hero showcase iframes).
  if (isEmbedded) return null;

  return (
    <footer className="border-t border-border/60 py-14">
      <div className="container mx-auto px-4">
        {/* Top row — logo left, primary nav right. */}
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="EchoWebs Logo" className="h-9 w-9 object-contain" />
            <span className="bg-gradient-hero bg-clip-text font-syne text-xl font-bold text-transparent">
              EchoWebs
            </span>
          </Link>

          <nav className="flex flex-wrap items-center gap-x-7 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Demo links — compact single strip. */}
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/40 pt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Demos
          </span>
          {demoLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-xs text-muted-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom row — contact + legal. */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 text-sm text-muted-foreground md:flex-row md:items-center">
          <a
            href="mailto:contact@echowebs.co.uk"
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Mail className="h-4 w-4" />
            contact@echowebs.co.uk
          </a>
          <div>
            © {new Date().getFullYear()} EchoWebs. All Rights Reserved.
            {" · "}
            <Link to="/privacy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
