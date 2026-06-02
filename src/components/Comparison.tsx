import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";

const rows = [
  {
    label: "The design",
    diy: "A template thousands of other businesses also use",
    us: "A custom design built around your brand",
  },
  {
    label: "Your time",
    diy: "Hours of dragging, fiddling and watching tutorials",
    us: "Done for you — ready in around 7 days",
  },
  {
    label: "Speed & SEO",
    diy: "Bloated builders that load slowly",
    us: "Fast, optimised and mobile-first by default",
  },
  {
    label: "What it costs",
    diy: "£15–30/month forever (£180–360+ a year)",
    us: "A one-off from £299 — and you own it",
  },
  {
    label: "When you need help",
    diy: "Help docs, forums and chatbots",
    us: "A real person who actually built your site",
  },
  {
    label: "The end result",
    diy: "Looks DIY",
    us: "Looks like a brand customers trust",
  },
];

const Comparison = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Why not just use Wix or Squarespace?
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          DIY builders are fine — until you value your time and your brand.
        </p>
      </Reveal>

      <Reveal className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* DIY */}
        <div className="rounded-2xl border border-border bg-card/40 p-8">
          <h3 className="text-xl font-bold text-muted-foreground mb-6">
            DIY Website Builder
          </h3>
          <ul className="space-y-4">
            {rows.map((row) => (
              <li key={row.label} className="flex gap-3">
                <X className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground/60" />
                <span className="text-muted-foreground">{row.diy}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* EchoWebs */}
        <div className="rounded-2xl border border-primary/40 bg-primary/5 p-8 shadow-glow">
          <h3 className="mb-6 text-xl font-bold text-primary">EchoWebs</h3>
          <ul className="space-y-4">
            {rows.map((row) => (
              <li key={row.label} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-foreground">{row.us}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Comparison;
