import cafeHero from "@/assets/cafe-hero.jpg";
import barberHero from "@/assets/barber-hero.jpg";
import gymHero from "@/assets/gym-hero.jpg";
import photographerHero from "@/assets/photographer-hero.jpg";

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
    title: "The Daily Grind",
    description: "Warm, inviting design for coffee shops with modern aesthetics and menu integration",
    image: cafeHero,
    link: "/cafe",
    category: "food",
    features: ["Menu Display", "Hours & Location", "Online Ordering Ready", "Responsive Design"],
  },
  {
    id: "barber",
    title: "Elite Cuts",
    description: "Bold, sophisticated style for grooming professionals with booking integration",
    image: barberHero,
    link: "/barber",
    category: "beauty",
    features: ["Service Pricing", "Team Showcase", "Booking Ready", "Gallery"],
  },
  {
    id: "gym",
    title: "Iron Forge Fitness",
    description: "Dynamic, motivational design for fitness centers with membership options",
    image: gymHero,
    link: "/gym",
    category: "fitness",
    features: ["Class Schedule", "Membership Tiers", "Trainer Profiles", "Contact Forms"],
  },
  {
    id: "photographer",
    title: "Lens & Light Studio",
    description: "Clean, artistic showcase for creative professionals with portfolio galleries",
    image: photographerHero,
    link: "/photographer",
    category: "creative",
    features: ["Portfolio Gallery", "Package Pricing", "Booking System", "Client Testimonials"],
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
