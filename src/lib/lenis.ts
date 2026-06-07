import type Lenis from "lenis";

// Shared handle to the active Lenis instance so components outside SmoothScroll
// (e.g. ScrollToTop, which lives inside the router) can drive it directly.
// Lenis owns its own scroll position via a RAF loop, so native window.scrollTo
// gets overwritten on the next frame — callers must go through Lenis instead.
let lenisInstance: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

export const getLenis = () => lenisInstance;
