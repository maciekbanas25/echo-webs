import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";

/** A floating "Get a Free Quote" button that slides in once you scroll down. */
const FloatingQuoteButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      to="/contact"
      aria-label="Get a free quote"
      className={`fixed bottom-6 right-6 z-[90] flex items-center gap-2 rounded-full bg-gradient-hero px-5 py-3 font-semibold text-primary-foreground shadow-glow transition-all duration-300 hover:shadow-intense hover:brightness-110 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageSquare className="h-5 w-5" />
      <span className="hidden sm:inline">Get a Free Quote</span>
    </Link>
  );
};

export default FloatingQuoteButton;
