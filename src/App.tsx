import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import RouteMeta from "./components/RouteMeta";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import { isEmbedded } from "./lib/embed";
import { lazy, Suspense } from "react";
// Outreach previews load with the main bundle (no extra round trip): they're the
// first page a cold lead sees, on a phone, so they must be fast.
import Preview from "./pages/Preview";
const Index = lazy(() => import("./pages/Index"));

// Every route is code-split, so each page only loads
// what it needs (outreach previews must stay fast on mobile).
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Cafe = lazy(() => import("./pages/Cafe"));
const Barber = lazy(() => import("./pages/Barber"));
const Gym = lazy(() => import("./pages/Gym"));
const Photographer = lazy(() => import("./pages/Photographer"));
const CarDetailer = lazy(() => import("./pages/CarDetailer"));
const Tradesman = lazy(() => import("./pages/Tradesman"));
const Restaurant = lazy(() => import("./pages/Restaurant"));
const BeautySalon = lazy(() => import("./pages/BeautySalon"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));

const queryClient = new QueryClient();

// Re-keys on each navigation so the page replays a gentle enter animation.
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page-in">
      <Suspense fallback={<div className="min-h-screen" />}>
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
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/preview/:slug" element={<Preview />} />
        <Route path="/unsubscribe/:token" element={<Unsubscribe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {!isEmbedded && (
        <>
          <SmoothScroll />
          <ScrollProgress />
        </>
      )}
      <BrowserRouter>
        <ScrollToTop />
        <RouteMeta />
        <AnimatedRoutes />
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
