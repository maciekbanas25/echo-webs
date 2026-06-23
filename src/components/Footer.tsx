import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "@/assets/ew-logo.png";
import { isEmbedded } from "@/lib/embed";

const nav = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const demos = [
  { to: "/cafe", label: "Café" },
  { to: "/barber", label: "Barber" },
  { to: "/gym", label: "Gym" },
  { to: "/photographer", label: "Photographer" },
  { to: "/car-detailer", label: "Car Detailing" },
  { to: "/tradesman", label: "Landscaping" },
  { to: "/restaurant", label: "Restaurant" },
  { to: "/beauty-salon", label: "Beauty Salon" },
];

const linkCls =
  "font-satoshi text-sm text-[#E8E4D9]/55 transition-colors hover:text-[#00CFFF]";

const Footer = () => {
  // Hidden inside embedded previews (hero showcase iframes).
  if (isEmbedded) return null;

  return (
    <footer className="border-t border-[#E8E4D9]/[0.07] bg-[#080A0F]">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="mb-4 flex items-center gap-2.5">
              <img src={logo} alt="EchoWebs logo" className="h-9 w-9 object-contain" />
              <span className="font-clash text-xl font-semibold tracking-tight text-[#E8E4D9]">
                EchoWebs
              </span>
            </Link>
            <p className="mb-5 max-w-md font-satoshi text-[#E8E4D9]/55">
              Custom-built websites for small businesses — designed, built, and
              live in seven days.
            </p>
            <a
              href="mailto:contact@echowebs.co.uk"
              className="inline-flex items-center gap-2 font-satoshi text-sm text-[#E8E4D9]/70 transition-colors hover:text-[#00CFFF]"
            >
              <Mail className="h-4 w-4" />
              contact@echowebs.co.uk
            </a>
            <p className="mt-4 max-w-md font-satoshi text-xs leading-relaxed text-[#E8E4D9]/55">
              EchoWebs · United Kingdom · contact@echowebs.co.uk
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.25em] text-[#00CFFF]">
              Explore
            </h4>
            <div className="flex flex-col gap-2.5">
              {nav.map((l) => (
                <Link key={l.to} to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-satoshi text-xs font-medium uppercase tracking-[0.25em] text-[#00CFFF]">
              Demos
            </h4>
            <div className="flex flex-col gap-2.5">
              {demos.map((l) => (
                <Link key={l.to} to={l.to} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-[#E8E4D9]/[0.06] pt-8 sm:flex-row sm:items-center">
          <p className="font-satoshi text-xs text-[#E8E4D9]/55">
            © {new Date().getFullYear()} EchoWebs. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className={linkCls}>
              Privacy Policy
            </Link>
            <Link to="/terms" className={linkCls}>
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
