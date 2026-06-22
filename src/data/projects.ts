export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: "food" | "beauty" | "fitness" | "creative" | "automotive" | "trades";
  features: string[];
}

export const projects: Project[] = [
  {
    id: "cafe",
    title: "Café — The Daily Grind",
    description: "Warm, inviting design that turns browsers into regulars. Full menu showcase, hours, and location — everything a coffee shop needs online.",
    image: "/cafe-cover.jpg",
    link: "/cafe",
    category: "food",
    features: ["Menu Display", "Hours & Location", "Online Ordering Ready", "Responsive Design"],
  },
  {
    id: "barber",
    title: "Barber Shop — Sharp Cuts",
    description: "Bold, high-end aesthetic that commands attention. Service pricing, booking CTA, and a design that says 'best in the city' before a word is read.",
    image: "/barber-cover.jpg",
    link: "/barber",
    category: "beauty",
    features: ["Service Pricing", "Team Showcase", "Booking Ready", "Gallery"],
  },
  {
    id: "gym",
    title: "Gym — FitCore",
    description: "High-energy design built to motivate and convert. Membership tiers, class schedules, and a CTA that makes people want to sign up on the spot.",
    image: "/gym-cover.jpg",
    link: "/gym",
    category: "fitness",
    features: ["Class Schedule", "Membership Tiers", "Trainer Profiles", "Contact Forms"],
  },
  {
    id: "photographer",
    title: "Photographer — Sarah Chen",
    description: "Clean, editorial aesthetic that lets the work speak. A full gallery, service packages, and testimonials — a site that books clients on autopilot.",
    image: "/photographer-cover.jpg",
    link: "/photographer",
    category: "creative",
    features: ["Portfolio Gallery", "Package Pricing", "Booking System", "Client Testimonials"],
  },
  {
    id: "car-detailer",
    title: "Car Detailing — Car Detailer",
    description: "An editorial, gallery-grade studio site built around one idea: the flawless finish. A spinning 3D hero, paint-correction storytelling, before/after reveals, and a booking flow that turns lookers into appointments.",
    image: "/car-detailer-cover.jpg",
    link: "/car-detailer",
    category: "automotive",
    features: ["Service Packages", "Before/After Gallery", "Online Booking", "Contact CTA"],
  },
  {
    id: "tradesman",
    title: "Landscaping — GreenMark",
    description: "Clean, trustworthy design for trade businesses. Service breakdowns, social proof, and a quote form that turns local searches into paying customers.",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80&auto=format&fit=crop",
    link: "/tradesman",
    category: "trades",
    features: ["Service List", "Quote Form", "Project Gallery", "Seasonal Care Plans"],
  },
  {
    id: "restaurant",
    title: "Restaurant — Ember & Flame",
    description: "Rich, appetite-driven design with a real food gallery, tabbed menu, reservations, and delivery links. Exactly what a restaurant needs to fill tables.",
    image: "/restaurant-cover.jpg",
    link: "/restaurant",
    category: "food",
    features: ["Menu Display", "Reservations", "Delivery Links", "Gallery"],
  },
  {
    id: "beauty-salon",
    title: "Beauty Salon — Blush & Bloom",
    description: "Soft, elegant design tailored for nail techs, lash artists, and beauty pros. Service pricing, a photo gallery, and a booking CTA that keeps the diary full.",
    image: "/beauty-salon-cover.jpg",
    link: "/beauty-salon",
    category: "beauty",
    features: ["Service Pricing", "Before/After Gallery", "Instagram Feed", "Online Booking"],
  },
];

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "food", label: "Food & Beverage" },
  { id: "beauty", label: "Beauty & Grooming" },
  { id: "fitness", label: "Fitness" },
  { id: "creative", label: "Creative" },
  { id: "automotive", label: "Automotive" },
  { id: "trades", label: "Trades & Services" },
];
