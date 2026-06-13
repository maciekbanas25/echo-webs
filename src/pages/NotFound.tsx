import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import AuroraShader from "@/components/aurora/AuroraShader";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080A0F] px-6 font-satoshi text-[#E8E4D9]">
      <AuroraShader intensity={0.6} className="opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[#080A0F]/30" />

      <div className="relative text-center">
        <p className="font-clash text-[7rem] font-semibold leading-none obs-grad-text md:text-[11rem]">
          404
        </p>
        <h1 className="mt-2 font-clash text-3xl font-semibold tracking-tight text-[#E8E4D9] md:text-4xl">
          This page drifted off the map.
        </h1>
        <p className="mx-auto mt-4 max-w-md font-satoshi text-[#E8E4D9]/55">
          The link may be broken or the page may have moved. Let's get you back to
          something that exists.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E8E4D9] px-7 py-3.5 font-satoshi text-[15px] font-medium text-[#080A0F] transition-all duration-300 hover:bg-[#00CFFF]"
        >
          Back home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
