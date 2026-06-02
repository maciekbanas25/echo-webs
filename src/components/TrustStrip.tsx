import { Clock, Sparkles, ShieldCheck, Smartphone } from "lucide-react";
import Reveal from "@/components/Reveal";

const items = [
  { icon: Sparkles, label: "Free mock-up first" },
  { icon: Clock, label: "Replies within 24 hours" },
  { icon: ShieldCheck, label: "You own your site" },
  { icon: Smartphone, label: "Mobile-first, always" },
];

const TrustStrip = () => (
  <div className="border-b border-primary/10 bg-background/40">
    <div className="container mx-auto px-4 py-5">
      <Reveal className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <span key={item.label} className="flex items-center gap-2">
            <item.icon className="h-4 w-4 text-primary" />
            {item.label}
          </span>
        ))}
      </Reveal>
    </div>
  </div>
);

export default TrustStrip;
