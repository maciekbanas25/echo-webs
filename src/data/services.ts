import { Zap, Rocket, ShoppingCart, Wrench, CalendarCheck } from "lucide-react";

export interface ServicePlan {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: typeof Zap;
}

export const servicePlans: ServicePlan[] = [
  {
    id: "starter",
    name: "Starter Site",
    price: "£299",
    originalPrice: "£499",
    description: "Perfect for new businesses needing a professional online presence",
    icon: Zap,
    features: [
      "Single-page responsive website",
      "Mobile-first design",
      "Contact form integration",
      "Basic SEO optimization",
      "Social media links",
      "1 round of revisions",
      "Hosting setup guidance",
    ],
  },
  {
    id: "premium",
    name: "Premium Website",
    price: "£599",
    originalPrice: "£999",
    description: "Full-featured website for established businesses ready to grow",
    icon: Rocket,
    popular: true,
    features: [
      "Up to 5 custom pages",
      "Advanced responsive design",
      "SEO & analytics integration",
      "Blog or news section",
      "Booking/contact forms",
      "3 rounds of revisions",
      "CMS for easy updates",
      "Speed optimization",
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Add-on",
    price: "from £399",
    originalPrice: "£599",
    description: "Add online selling capabilities to any website package",
    icon: ShoppingCart,
    features: [
      "Product catalog setup",
      "Shopping cart integration",
      "Secure payment gateway",
      "Order management",
      "Inventory tracking basics",
      "Customer accounts",
    ],
  },
  {
    id: "booking",
    name: "Booking Integration",
    price: "from £199",
    originalPrice: "£299",
    description: "Let customers book appointments or tables directly on your site",
    icon: CalendarCheck,
    features: [
      "Online booking calendar",
      "Automated email confirmations",
      "Availability management",
      "Reminders to cut no-shows",
      "Syncs to your calendar",
      "Works on mobile",
    ],
  },
  {
    id: "maintenance",
    name: "Monthly Maintenance",
    price: "£49/mo",
    description: "Keep your website secure, fast, and up-to-date",
    icon: Wrench,
    features: [
      "Regular security updates",
      "Weekly backups",
      "Performance monitoring",
      "Content updates (2hrs/mo)",
      "Priority email support",
      "Monthly health report",
    ],
  },
];
