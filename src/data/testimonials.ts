export interface StaticTestimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
  avatar?: string;
}

export const staticTestimonials: StaticTestimonial[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    company: "Brew & Bean Café",
    text: "EchoWebs transformed our online presence. The site is beautiful, fast, and our online orders have increased by 40%!",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    company: "Elite Barber Studio",
    text: "Professional, responsive, and delivered exactly what we needed. Our booking requests have doubled since launch.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emma Clarke",
    company: "FitZone Gym",
    text: "The website perfectly captures our brand energy. New member sign-ups through the site exceeded our expectations.",
    rating: 5,
  },
  {
    id: "4",
    name: "David Chen",
    company: "Lens & Light Photography",
    text: "Finally a portfolio site that showcases my work beautifully. The galleries are stunning and load incredibly fast.",
    rating: 5,
  },
];
