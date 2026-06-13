import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";

type PackageId = "starter" | "premium";

const PACKAGES: Record<
  PackageId,
  { label: string; now: number; was: number; blurb: string; features: string[] }
> = {
  starter: {
    label: "Starter Site",
    now: 299,
    was: 499,
    blurb: "Perfect for getting found and looking professional.",
    features: ["Single-page site", "Mobile-first design", "Contact form", "Basic SEO setup"],
  },
  premium: {
    label: "Premium Website",
    now: 599,
    was: 999,
    blurb: "A standout site built to turn visitors into customers.",
    features: [
      "Multi-page custom design",
      "Gallery & booking-ready",
      "Advanced SEO",
      "Animations & polish",
    ],
  },
};

const ECOMMERCE = { now: 399, was: 599 };
const BOOKING = { now: 199, was: 299 };
const MAINTENANCE = 49;

interface QuoteBuilderProps {
  /**
   * When provided, "Get this quote" calls this instead of navigating to
   * /contact — used by the homepage expandable panel to swap to the contact
   * form in place. Receives the chosen services + a ready-made summary.
   */
  onGetQuote?: (services: string[], summary: string) => void;
  /** Trims the outer section spacing when rendered inside the panel. */
  embedded?: boolean;
}

const QuoteBuilder = ({ onGetQuote, embedded = false }: QuoteBuilderProps) => {
  const [pkg, setPkg] = useState<PackageId>("premium");
  const [ecommerce, setEcommerce] = useState(false);
  const [booking, setBooking] = useState(false);
  const [maintenance, setMaintenance] = useState(false);

  const now =
    PACKAGES[pkg].now + (ecommerce ? ECOMMERCE.now : 0) + (booking ? BOOKING.now : 0);
  const was =
    PACKAGES[pkg].was + (ecommerce ? ECOMMERCE.was : 0) + (booking ? BOOKING.was : 0);
  const saved = was - now;

  // Hand the current selection over to the contact form so nothing is lost.
  const services = [
    pkg,
    ...(ecommerce ? ["ecommerce"] : []),
    ...(booking ? ["booking"] : []),
  ];
  const quoteSummary =
    `I'd like a quote for the ${PACKAGES[pkg].label}` +
    `${ecommerce ? " plus an online shop add-on" : ""}` +
    `${booking ? " plus booking integration" : ""}` +
    `${maintenance ? " with monthly maintenance" : ""}. ` +
    `Estimated total: £${now}${maintenance ? ` + £${MAINTENANCE}/mo maintenance` : ""} (launch pricing).`;

  return (
    <section id="quote" className={embedded ? "py-8" : "py-24 scroll-mt-20"}>
      <div className={embedded ? "px-6 md:px-8" : "container mx-auto px-4"}>
        <Reveal className="text-center mb-12">
          <h2 className="mb-4 text-4xl md:text-5xl font-bold text-foreground">
            Build Your Quote
          </h2>
          <p className="mx-auto mb-5 max-w-2xl text-xl text-muted-foreground">
            Pick what you need and see an instant estimate. No email required.
          </p>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            <Rocket className="h-4 w-4" />
            Launch pricing, first 10 clients
          </span>
        </Reveal>

        <Reveal
          className={
            embedded
              ? "grid gap-6 lg:grid-cols-[1fr_340px]"
              : "grid lg:grid-cols-[1fr_360px] gap-6 max-w-5xl mx-auto"
          }
        >
          {/* Options */}
          <div className="space-y-6">
            {/* Package choice */}
            <div className="grid sm:grid-cols-2 gap-4">
              {(Object.keys(PACKAGES) as PackageId[]).map((id) => {
                const p = PACKAGES[id];
                const active = pkg === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setPkg(id)}
                    className={`text-left rounded-2xl border p-6 transition-all ${
                      active
                        ? "border-primary bg-primary/5 shadow-glow"
                        : "border-border bg-card/40 hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-foreground">{p.label}</span>
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                          active ? "border-primary bg-primary" : "border-muted-foreground/40"
                        }`}
                      >
                        {active && <Check className="h-3 w-3 text-primary-foreground" />}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{p.blurb}</p>
                    <ul className="space-y-1.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>

            {/* Add-ons */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setEcommerce((v) => !v)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  ecommerce ? "border-primary bg-primary/5" : "border-border bg-card/40 hover:border-primary/40"
                }`}
              >
                <span className="text-left">
                  <span className="block font-semibold text-foreground">Add online shop</span>
                  <span className="text-sm text-muted-foreground">Products, cart & checkout</span>
                </span>
                <span className="font-semibold text-primary">+£{ECOMMERCE.now}</span>
              </button>

              <button
                type="button"
                onClick={() => setBooking((v) => !v)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  booking ? "border-primary bg-primary/5" : "border-border bg-card/40 hover:border-primary/40"
                }`}
              >
                <span className="text-left">
                  <span className="block font-semibold text-foreground">Add booking integration</span>
                  <span className="text-sm text-muted-foreground">Online appointments & reminders</span>
                </span>
                <span className="font-semibold text-primary">+£{BOOKING.now}</span>
              </button>

              <button
                type="button"
                onClick={() => setMaintenance((v) => !v)}
                className={`flex w-full items-center justify-between rounded-xl border p-4 transition-all ${
                  maintenance ? "border-primary bg-primary/5" : "border-border bg-card/40 hover:border-primary/40"
                }`}
              >
                <span className="text-left">
                  <span className="block font-semibold text-foreground">Monthly maintenance</span>
                  <span className="text-sm text-muted-foreground">Updates & changes, cancel anytime</span>
                </span>
                <span className="font-semibold text-primary">£{MAINTENANCE}/mo</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-2xl border border-primary/30 bg-card p-6 shadow-intense h-fit lg:sticky lg:top-24">
            <p className="text-sm uppercase tracking-wider text-muted-foreground">Your estimate</p>
            <div className="mt-2 flex items-end gap-3">
              <span className="bg-gradient-hero bg-clip-text text-5xl font-bold text-transparent">£{now}</span>
              <span className="mb-1 text-lg text-muted-foreground line-through">£{was}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-primary">You save £{saved} (launch offer)</p>
            {maintenance && (
              <p className="mt-3 text-muted-foreground">
                + <span className="font-semibold text-foreground">£{MAINTENANCE}/mo</span> maintenance
              </p>
            )}

            <div className="my-5 h-px bg-border" />
            <p className="text-sm text-muted-foreground mb-5">
              One-off price. You own the site. Free mock-up before you pay a penny.
            </p>

            {onGetQuote ? (
              <Button
                size="lg"
                variant="brand"
                onClick={() => onGetQuote(services, quoteSummary)}
                className="flex w-full items-center justify-center gap-2 shadow-glow hover:shadow-intense"
              >
                Get this quote <ArrowRight className="h-5 w-5" />
              </Button>
            ) : (
              <Button asChild size="lg" variant="brand" className="w-full shadow-glow hover:shadow-intense">
                <Link
                  to="/contact"
                  state={{ services, projectDetails: quoteSummary }}
                  className="flex items-center justify-center gap-2"
                >
                  Get this quote <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </Reveal>

        {/* Bespoke escape hatch — for anything the packages don't cover. */}
        <Reveal className="mx-auto mt-6 max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-card/40 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-semibold text-foreground">
                Something more specific in mind?
              </p>
              <p className="text-sm text-muted-foreground">
                Tell us what you need and we'll build a custom quote around it.
              </p>
            </div>
            {onGetQuote ? (
              <Button
                variant="outline"
                onClick={() =>
                  onGetQuote(
                    ["other"],
                    "I'd like a custom quote tailored to my business — happy to talk through the details."
                  )
                }
                className="shrink-0 border-primary/30 hover:border-primary"
              >
                Get a custom quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="shrink-0 border-primary/30 hover:border-primary"
              >
                <Link
                  to="/contact"
                  state={{
                    services: ["other"],
                    projectDetails:
                      "I'd like a custom quote tailored to my business — happy to talk through the details.",
                  }}
                  className="flex items-center"
                >
                  Get a custom quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default QuoteBuilder;
