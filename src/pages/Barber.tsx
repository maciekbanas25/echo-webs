import { useEffect } from "react";

/**
 * The barber demo is a standalone Next.js app, static-exported and served as plain
 * files from /public/barber/. This SPA route only exists to catch in-app client-side
 * navigations (homepage reel, portfolio, footer) and hand them off to the static
 * demo via a full page load. Direct hits to /barber/ are served straight from the
 * filesystem by Vercel and never reach React Router.
 */
const Barber = () => {
  useEffect(() => {
    window.location.replace("/barber/");
  }, []);

  return <div className="min-h-screen bg-[#080A0F]" aria-hidden />;
};

export default Barber;
