import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Reveal from "@/components/Reveal";

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Starter sites begin at £299 and premium sites at £599 (current launch pricing for the first 10 clients). Need a shop? The e-commerce add-on is £399. Every project starts with a free mock-up and quote — no commitment.",
  },
  {
    q: "How long until my site is live?",
    a: "Most sites are ready in around 7 days from the moment we lock in your content and direction. I'll give you a clear timeline with your quote.",
  },
  {
    q: "Do I actually own my website?",
    a: "Yes — 100%. Once it's paid for, the site and its code are yours. No lock-in, no holding your site hostage.",
  },
  {
    q: "What about hosting and my domain?",
    a: "I'll handle deployment and walk you through connecting a domain (or help you buy one). Hosting for these sites is typically free or very low cost, and I'll point you to the right option.",
  },
  {
    q: "Can you maintain the site after launch?",
    a: "Optional maintenance is £49/month — covering updates, small content changes, and keeping everything running smoothly. It's entirely optional; you can also manage the site yourself.",
  },
  {
    q: "Will it look good on phones?",
    a: "Always. Every site is built mobile-first, so it looks sharp and loads fast on phones, tablets, and desktops alike.",
  },
  {
    q: "Do I need to be technical?",
    a: "Not at all. You tell me about your business and what you want; I handle all the technical work and hand you a finished, easy-to-share website.",
  },
];

const FAQ = () => (
  <section className="py-24">
    <div className="container mx-auto px-4">
      <Reveal className="text-center mb-16">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Everything you need to know before getting started.
        </p>
      </Reveal>

      <Reveal className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-primary/15"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </div>
  </section>
);

export default FAQ;
