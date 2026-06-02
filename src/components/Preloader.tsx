import { useEffect, useState } from "react";
import logo from "@/assets/ew-logo.png";

/** A short branded intro overlay shown on first load, then fades away. */
const Preloader = () => {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const showFor = prefersReduced ? 150 : 1300;
    const t1 = setTimeout(() => setHidden(true), showFor);
    const t2 = setTimeout(() => setRemoved(true), showFor + 550);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        hidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <img src={logo} alt="" className="mb-5 h-16 w-16 animate-scale-in" />
      <div className="mb-6 bg-gradient-hero bg-clip-text font-playfair text-2xl font-bold text-transparent">
        EchoWebs
      </div>
      <div className="h-0.5 w-40 overflow-hidden rounded-full bg-border">
        <div className="h-full w-full bg-gradient-hero animate-preload-bar" />
      </div>
    </div>
  );
};

export default Preloader;
