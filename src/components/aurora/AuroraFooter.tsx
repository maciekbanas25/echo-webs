import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import logo from "@/assets/ew-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/privacy", label: "Privacy" },
];

/** Single-breath footer. Everything else lives on its own page. */
const AuroraFooter = () => (
  <footer className="border-t border-[#E8E4D9]/[0.07]">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-12 md:flex-row md:items-center md:px-8"
    >
      <Link to="/" className="flex items-center gap-2.5">
        <img src={logo} alt="EchoWebs logo" className="h-8 w-8 object-contain" />
        <span className="font-clash text-lg font-semibold tracking-tight text-[#E8E4D9]">
          EchoWebs
        </span>
      </Link>

      <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="font-satoshi text-sm text-[#E8E4D9]/55 transition-colors hover:text-[#00CFFF]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <a
        href="mailto:contact@echowebs.co.uk"
        aria-label="Email EchoWebs"
        className="flex items-center gap-2 font-satoshi text-sm text-[#E8E4D9]/55 transition-colors hover:text-[#00CFFF]"
      >
        <Mail className="h-4 w-4" />
        contact@echowebs.co.uk
      </a>
    </motion.div>
    <div className="border-t border-[#E8E4D9]/[0.05] py-5 text-center font-satoshi text-xs text-[#E8E4D9]/35">
      © {new Date().getFullYear()} EchoWebs. All rights reserved.
    </div>
  </footer>
);

export default AuroraFooter;
