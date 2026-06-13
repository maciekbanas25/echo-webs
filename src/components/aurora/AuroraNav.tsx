import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/ew-logo.png";

const links = [
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Pricing" },
  { to: "/about", label: "About" },
];

/** Minimal nav: transparent over the hero, frosted #080A0F once scrolled. */
const AuroraNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#E8E4D9]/[0.07] bg-[#080A0F]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo} alt="EchoWebs logo" className="h-8 w-8 object-contain" />
          <span className="font-clash text-lg font-semibold tracking-tight text-[#E8E4D9]">
            EchoWebs
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-satoshi text-[15px] transition-colors ${
                location.pathname === link.to
                  ? "text-[#00CFFF]"
                  : "text-[#E8E4D9]/70 hover:text-[#E8E4D9]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() =>
              document.getElementById("start")?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full bg-[#E8E4D9] px-5 py-2 font-satoshi text-[15px] font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF]"
          >
            Get a quote
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center text-[#E8E4D9] md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col justify-center bg-[#080A0F]/95 px-8 backdrop-blur-2xl md:hidden"
          >
            {[{ to: "/", label: "Home" }, ...links, { to: "/contact", label: "Contact" }].map(
              (link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: reduce ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 + i * 0.06 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="block py-3.5 font-clash text-4xl font-semibold tracking-tight text-[#E8E4D9] transition-colors hover:text-[#00CFFF]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AuroraNav;
