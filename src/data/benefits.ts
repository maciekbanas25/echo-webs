import { Zap, Smartphone, Search, Calendar, Wallet, Sparkles } from "lucide-react";

export interface Benefit {
  icon: typeof Zap;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: Zap,
    title: "Fast Development",
    description: "Get your website live in days, not months. Modern tools and efficient workflows mean rapid delivery.",
  },
  {
    icon: Smartphone,
    title: "Mobile-First Experience",
    description: "Every site is designed mobile-first, ensuring perfect experiences on all devices.",
  },
  {
    icon: Search,
    title: "SEO-Friendly",
    description: "Built with search engines in mind. Optimized code, fast loading, and proper structure for better rankings.",
  },
  {
    icon: Calendar,
    title: "Booking & Forms",
    description: "Integrated contact forms, booking systems, and lead capture to help you grow your business.",
  },
  {
    icon: Wallet,
    title: "Affordable Packages",
    description: "Premium quality at small business prices. No hidden fees, just great value for your investment.",
  },
  {
    icon: Sparkles,
    title: "Modern UI/UX",
    description: "Clean, contemporary designs that impress visitors and convert them into customers.",
  },
];
