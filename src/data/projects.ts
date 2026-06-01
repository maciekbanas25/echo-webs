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
    title: "Cafe Prototype",
    description: "Warm, inviting design for coffee shops with modern aesthetics and menu integration",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80&auto=format&fit=crop",
    link: "/cafe",
    category: "food",
    features: ["Menu Display", "Hours & Location", "Online Ordering Ready", "Responsive Design"],
  },
  {
    id: "barber",
    title: "Barber Shop Prototype",
    description: "Bold, sophisticated style for grooming professionals with booking integration",
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop",
    link: "/barber",
    category: "beauty",
    features: ["Service Pricing", "Team Showcase", "Booking Ready", "Gallery"],
  },
  {
    id: "gym",
    title: "Gym Prototype",
    description: "Dynamic, motivational design for fitness centers with membership options",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
    link: "/gym",
    category: "fitness",
    features: ["Class Schedule", "Membership Tiers", "Trainer Profiles", "Contact Forms"],
  },
  {
    id: "photographer",
    title: "Photography Prototype",
    description: "Clean, artistic showcase for creative professionals with portfolio galleries",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80&auto=format&fit=crop",
    link: "/photographer",
    category: "creative",
    features: ["Portfolio Gallery", "Package Pricing", "Booking System", "Client Testimonials"],
  },
  {
    id: "car-detailer",
    title: "Car Detailing Prototype",
    description: "Dark, glossy automotive aesthetic with service packages and before/after galleries",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=80&auto=format&fit=crop",
    link: "/car-detailer",
    category: "automotive",
    features: ["Service Packages", "Before/After Gallery", "Online Booking", "Contact CTA"],
  },
  {
    id: "tradesman",
    title: "Landscaping Prototype",
    description: "Fresh, natural design for landscapers, gardeners, and outdoor maintenance pros",
    image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1200&q=80&auto=format&fit=crop",
    link: "/tradesman",
    category: "trades",
    features: ["Service List", "Quote Form", "Project Gallery", "Seasonal Care Plans"],
  },
  {
    id: "restaurant",
    title: "Restaurant Prototype",
    description: "Warm, appetite-stimulating design for restaurants and food trucks",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&auto=format&fit=crop",
    link: "/restaurant",
    category: "food",
    features: ["Menu Display", "Reservations", "Delivery Links", "Gallery"],
  },
  {
    id: "beauty-salon",
    title: "Beauty Salon Prototype",
    description: "Elegant, feminine design for nail salons, lash artists, and beauty professionals",
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
