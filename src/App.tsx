import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import RouteMeta from "./components/RouteMeta";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollProgress />
      <CustomCursor />
      <BrowserRouter>
        <ScrollToTop />
        <RouteMeta />
        <Routes>
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
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
