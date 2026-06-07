import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/lenis";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lenis controls scroll via its own RAF loop; a native window.scrollTo gets
    // reverted on the next frame. Drive Lenis directly when it's active, and
    // fall back to native scrolling (reduced-motion / embedded) when it isn't.
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
