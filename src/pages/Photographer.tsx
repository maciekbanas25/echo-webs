import { useEffect } from "react";

/**
 * The photographer demo is a standalone Next.js app, static-exported and served as
 * plain files from /public/photographer/. This SPA route only exists to catch in-app
 * client-side navigations (homepage reel, portfolio, footer) and hand them off to the
 * static demo via a full page load. Direct hits to /photographer/ are served straight
 * from the filesystem by Vercel and never reach React Router.
 */
const Photographer = () => {
  useEffect(() => {
    window.location.replace("/photographer/");
  }, []);

  return <div className="min-h-screen bg-[#080A0F]" aria-hidden />;
};

export default Photographer;
