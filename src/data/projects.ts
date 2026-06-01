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
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80&auto=format&fit=crop",
    link: "/cafe",
    category: "food",
    features: ["Menu Display", "Hours & Location", "Online Ordering Ready", "Responsive Design"],
  },
  {
    id: "barber",
    title: "Barber Shop — Sharp Cuts",
    description: "Bold, high-end aesthetic that commands attention. Service pricing, booking CTA, and a design that says 'best in the city' before a word is read.",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop",
    link: "/barber",
    category: "beauty",
    features: ["Service Pricing", "Team Showcase", "Booking Ready", "Gallery"],
  },
  {
    id: "gym",
    title: "Gym — FitCore",
    description: "High-energy design built to motivate and convert. Membership tiers, class schedules, and a CTA that makes people want to sign up on the spot.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
    link: "/gym",
    category: "fitness",
    features: ["Class Schedule", "Membership Tiers", "Trainer Profiles", "Contact Forms"],
  },
  {
    id: "photographer",
    title: "Photographer — Sarah Chen",
    description: "Clean, editorial aesthetic that lets the work speak. Real gallery, service packages, and testimonials — a site that books clients on autopilot.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80&auto=format&fit=crop",
    link: "/photographer",
    category: "creative",
    features: ["Portfolio Gallery", "Package Pricing", "Booking System", "Client Testimonials"],
  },
  {
    id: "car-detailer",
    title: "Car Detailing — Prestige Auto",
    description: "Dark, premium aesthetic that screams quality. Service packages with clear pricing, before/after sections, and a booking flow that gets calls coming in.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
    link: "/restaurant",
    category: "food",
    features: ["Menu Display", "Reservations", "Delivery Links", "Gallery"],
  },
  {
    id: "beauty-salon",
    title: "Beauty Salon — Blush & Bloom",
    description: "Soft, elegant design tailored for nail techs, lash artists, and beauty pros. Service pricing, a photo gallery, and a booking CTA that keeps the diary full.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80&auto=format&fit=crop",
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
