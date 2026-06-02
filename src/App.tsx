import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import RouteMeta from "./components/RouteMeta";
import ScrollProgress from "./components/ScrollProgress";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cafe from "./pages/Cafe";
import Barber from "./pages/Barber";
import Gym from "./pages/Gym";
import Photographer from "./pages/Photographer";
import CarDetailer from "./pages/CarDetailer";
import Tradesman from "./pages/Tradesman";
import Restaurant from "./pages/Restaurant";
import BeautySalon from "./pages/BeautySalon";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Re-keys on each navigation so the page replays a gentle enter animation.
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page-in">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cafe" element={<Cafe />} />
        <Route path="/barber" element={<Barber />} />
        <Route path="/gym" element={<Gym />} />
        <Route path="/photographer" element={<Photographer />} />
        <Route path="/car-detailer" element={<CarDetailer />} />
        <Route path="/tradesman" element={<Tradesman />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="/beauty-salon" element={<BeautySalon />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// True when the app is running inside an iframe (e.g. the homepage hero
// preview), so we can skip global overlays that don't belong in a preview.
const isEmbedded = typeof window !== "undefined" && window.self !== window.top;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {!isEmbedded && (
        <>
          <Preloader />
          <SmoothScroll />
          <ScrollProgress />
        </>
      )}
      <BrowserRouter>
        <ScrollToTop />
        <RouteMeta />
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
