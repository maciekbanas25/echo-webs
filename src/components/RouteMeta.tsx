import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Per-route <title> and meta description, set centrally on navigation. */
const META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "EchoWebs | Professional Web Design for Small Businesses",
    description:
      "Stunning, high-performance websites for small businesses — starting at £299. Free mock-up included. Ready in 7 days.",
  },
  "/portfolio": {
    title: "Portfolio | EchoWebs",
    description:
      "Explore live website demos built by EchoWebs across cafés, barbers, gyms, salons, restaurants and more.",
  },
  "/services": {
    title: "Services & Pricing | EchoWebs",
    description:
      "Clear, affordable web design packages for small businesses. See what's included and get a free quote.",
  },
  "/about": {
    title: "About | EchoWebs",
    description: "The story behind EchoWebs and how we build websites that win customers.",
  },
  "/contact": {
    title: "Contact | EchoWebs",
    description: "Get a free mock-up and quote for your business website. We reply within 24 hours.",
  },
  "/cafe": { title: "Café Demo | EchoWebs", description: "A warm, inviting website demo for cafés and coffee shops." },
  "/barber": { title: "Barber Demo | EchoWebs", description: "A bold, high-end website demo for barber shops." },
  "/gym": { title: "Gym Demo | EchoWebs", description: "A high-energy website demo for gyms and fitness studios." },
  "/photographer": { title: "Photographer Demo | EchoWebs", description: "A clean, editorial website demo for photographers." },
  "/car-detailer": { title: "Car Detailing Demo | EchoWebs", description: "A premium website demo for car detailing businesses." },
  "/tradesman": { title: "Landscaping Demo | EchoWebs", description: "A trustworthy website demo for trades and landscaping." },
  "/restaurant": { title: "Restaurant Demo | EchoWebs", description: "An appetite-driven website demo for restaurants." },
  "/beauty-salon": { title: "Beauty Salon Demo | EchoWebs", description: "An elegant website demo for beauty and nail salons." },
};

const DEFAULT_TITLE = "EchoWebs | Professional Web Design for Small Businesses";

const RouteMeta = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = META[pathname];
    document.title = meta?.title ?? DEFAULT_TITLE;
    if (meta?.description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", meta.description);
    }
  }, [pathname]);

  return null;
};

export default RouteMeta;
