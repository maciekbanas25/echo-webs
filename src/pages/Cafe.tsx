import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Coffee, Clock, MapPin, Star, ArrowUpRight } from "lucide-react";
import {
  DemoBar,
  DemoNav,
  DemoFooter,
  type DemoNavLink,
} from "@/components/demo/DemoChrome";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";

const heroImg = "/cafe.jpg";
const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const isOpenNow = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Sun
  if (day >= 1 && day <= 5) return hour >= 7 && hour < 19;
  if (day === 6) return hour >= 8 && hour < 20;
  return hour >= 8 && hour < 18;
};

type MenuItem = {
  name: string;
  price: string;
  category: "Coffee" | "Pastry" | "Kitchen";
  description: string;
  fav?: boolean;
};

const menu: MenuItem[] = [
  { name: "Flat White", price: "3.50", category: "Coffee", description: "Velvety microfoam, our house espresso blend.", fav: true },
  { name: "Filter / Pour Over", price: "4.00", category: "Coffee", description: "This week's single origin, brewed to order." },
  { name: "Oat Latte", price: "4.20", category: "Coffee", description: "Minor Figures oat, no upcharge." },
  { name: "Cortado", price: "3.20", category: "Coffee", description: "Equal espresso and steamed milk." },
  { name: "Iced Matcha", price: "4.50", category: "Coffee", description: "Ceremonial grade, cold whole milk." },
  { name: "Espresso", price: "2.80", category: "Coffee", description: "Single or double. Chocolatey, low acidity." },
  { name: "Almond Croissant", price: "3.80", category: "Pastry", description: "Frangipane filled, baked before sunrise.", fav: true },
  { name: "Pain au Chocolat", price: "3.20", category: "Pastry", description: "Two batons of dark chocolate, all butter." },
  { name: "Cinnamon Roll", price: "4.00", category: "Pastry", description: "Cream cheese glaze, served warm." },
  { name: "Banana Bread", price: "3.50", category: "Pastry", description: "Toasted, with salted butter." },
  { name: "Smashed Avo on Sourdough", price: "9.50", category: "Kitchen", description: "Chilli, lemon, poached egg.", fav: true },
  { name: "Shakshuka", price: "11.00", category: "Kitchen", description: "Baked eggs, spiced tomato, feta, toast." },
  { name: "Granola Bowl", price: "8.50", category: "Kitchen", description: "House granola, seasonal fruit, honey." },
];

const tabs = ["All", "Coffee", "Pastry", "Kitchen"] as const;

const gallery = [
  { src: img("1442512595331-e89e73853f31", 800), alt: "Flat white on a cafe table" },
  { src: img("1554118811-1e0d58224f24", 800), alt: "Light cafe interior with stools" },
  { src: img("1509440159596-0249088772ff", 800), alt: "Fresh-baked croissants" },
];

const Cafe = () => {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const open = isOpenNow();
  const filtered = tab === "All" ? menu : menu.filter((m) => m.category === tab);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  const navLinks: DemoNavLink[] = [
    { label: "Menu", href: "#menu" },
    { label: "Our story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#visit" },
  ];

  const OpenBadge = ({ dark = false }: { dark?: boolean }) => (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-satoshi text-xs font-semibold ${
        open
          ? "bg-emerald-500/15 text-emerald-700"
          : dark
            ? "bg-white/10 text-white/70"
            : "bg-[hsl(var(--cafe-dark))]/10 text-[hsl(var(--cafe-dark))]/70"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-500" : "bg-current opacity-60"}`} />
      {open ? "Open now" : "Closed"}
    </span>
  );

  return (
    <div
      id="top"
      className="min-h-screen bg-[hsl(var(--cafe-bg))] text-[hsl(var(--cafe-dark))]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      <DemoBar />
      <DemoNav
        name="The Daily Grind"
        icon={<Coffee className="h-5 w-5 text-[hsl(var(--cafe-primary))]" />}
        links={navLinks}
        cta={{ label: "See the menu", href: "#menu" }}
        rightSlot={<OpenBadge />}
        brandClass="font-playfair font-bold italic"
        overlayClass="text-white"
        scrolledClass="bg-[hsl(var(--cafe-bg))]/95 text-[hsl(var(--cafe-dark))] backdrop-blur-md border-b border-[hsl(var(--cafe-dark))]/10 shadow-sm"
        ctaClass="rounded-full bg-[hsl(var(--cafe-primary))] px-5 py-2 font-satoshi text-sm font-semibold text-white transition hover:brightness-110"
      />

      {/* Hero */}
      <section className="relative -mt-[72px] flex min-h-[92vh] items-end overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--cafe-dark))] via-[hsl(var(--cafe-dark))]/45 to-[hsl(var(--cafe-dark))]/25" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 md:px-10 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="max-w-2xl text-white"
          >
            <p className="mb-4 flex items-center gap-3 font-satoshi text-sm font-medium uppercase tracking-[0.28em] text-white/75">
              Shoreditch · Specialty coffee
            </p>
            <h1 className="font-playfair text-[clamp(3rem,8vw,6.5rem)] font-bold italic leading-[0.95]">
              Coffee worth
              <br />
              the walk.
            </h1>
            <p className="mt-6 max-w-md font-satoshi text-lg leading-relaxed text-white/85">
              Single-origin espresso, milk steamed the way it should be, and pastries
              baked out back before sunrise. Pull up a stool.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full bg-[hsl(var(--cafe-primary))] px-7 py-3.5 font-satoshi text-base font-semibold text-white transition hover:brightness-110"
              >
                See the menu
              </button>
              <button
                onClick={() => document.querySelector("#visit")?.scrollIntoView({ behavior: "smooth" })}
                className="rounded-full border border-white/35 px-7 py-3.5 font-satoshi text-base font-medium text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Find us
              </button>
              <span className="font-satoshi text-sm text-white/70">
                Mon–Fri 7–7 · 14 Redchurch St
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <motion.p {...reveal(0)} className="mb-3 font-satoshi text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--cafe-primary))]">
              Our story
            </motion.p>
            <motion.h2 {...reveal(0.05)} className="font-playfair text-4xl font-bold italic leading-tight md:text-6xl">
              Not a chain. Never will be.
            </motion.h2>
            <motion.p {...reveal(0.1)} className="mt-6 max-w-lg font-satoshi text-lg leading-relaxed text-[hsl(var(--cafe-dark))]/75">
              We opened on Redchurch Street in 2019 with one espresso machine and a
              stubborn idea: that a neighbourhood deserves coffee roasted by people who
              know its name. We pour a new single origin every week and bake everything
              in the kitchen behind you.
            </motion.p>
            <motion.p {...reveal(0.15)} className="mt-4 max-w-lg font-satoshi text-lg leading-relaxed text-[hsl(var(--cafe-dark))]/75">
              No syrups pretending to be flavour. No queue that outlasts your lunch break.
            </motion.p>
          </div>

          <motion.div {...reveal(0.1)} className="grid grid-cols-2 gap-4">
            {[
              { big: "2019", small: "Roasting on Redchurch St since" },
              { big: "4.9★", small: "320+ Google reviews" },
              { big: "60 sec", small: "Average flat white" },
              { big: "1 / wk", small: "New single origin on rotation" },
            ].map((s) => (
              <div key={s.small} className="rounded-2xl border border-[hsl(var(--cafe-dark))]/10 bg-white/60 p-6">
                <div className="font-playfair text-4xl font-bold italic text-[hsl(var(--cafe-primary))]">{s.big}</div>
                <div className="mt-2 font-satoshi text-sm leading-snug text-[hsl(var(--cafe-dark))]/65">{s.small}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="scroll-mt-20 bg-[hsl(var(--cafe-dark))] px-5 py-24 text-[hsl(var(--cafe-bg))] md:px-10 md:py-32">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <motion.p {...reveal(0)} className="mb-3 font-satoshi text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--cafe-primary))]">
                The menu
              </motion.p>
              <motion.h2 {...reveal(0.05)} className="font-playfair text-4xl font-bold italic md:text-6xl">
                Made fresh, priced fair.
              </motion.h2>
              <motion.p {...reveal(0.1)} className="mt-3 font-satoshi text-sm text-[hsl(var(--cafe-bg))]/55">
                Oat, almond and soy on the house. Prices in £.
              </motion.p>
            </div>
            <motion.div {...reveal(0.1)} className="inline-flex gap-1 rounded-full border border-[hsl(var(--cafe-bg))]/15 p-1">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-4 py-2 font-satoshi text-sm font-medium transition ${
                    tab === t
                      ? "bg-[hsl(var(--cafe-primary))] text-white"
                      : "text-[hsl(var(--cafe-bg))]/70 hover:text-[hsl(var(--cafe-bg))]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="mt-12 grid gap-x-14 gap-y-1 md:grid-cols-2">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                {...reveal(Math.min(i * 0.03, 0.2))}
                className="flex items-baseline gap-3 border-b border-[hsl(var(--cafe-bg))]/10 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-satoshi text-lg font-semibold text-[hsl(var(--cafe-bg))]">{item.name}</h3>
                    {item.fav && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--cafe-primary))]/20 px-2 py-0.5 font-satoshi text-[10px] font-semibold uppercase tracking-wide text-[hsl(var(--cafe-primary))]">
                        <Star className="h-2.5 w-2.5 fill-current" /> Favourite
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-satoshi text-sm text-[hsl(var(--cafe-bg))]/55">{item.description}</p>
                </div>
                <div className="font-playfair text-xl font-bold italic text-[hsl(var(--cafe-primary))]">{item.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="scroll-mt-20 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2 {...reveal(0)} className="mb-10 max-w-xl font-playfair text-4xl font-bold italic leading-tight md:text-5xl">
            A room you won't want to leave.
          </motion.h2>
          <div className="grid gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <motion.div
                key={g.src}
                {...reveal(i * 0.08)}
                className={`overflow-hidden rounded-2xl ${i === 0 ? "md:row-span-2 md:h-full" : ""}`}
              >
                <img
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  className="h-full min-h-[240px] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="scroll-mt-20 bg-[hsl(var(--cafe-primary))] px-5 py-24 text-white md:px-10 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.div {...reveal(0)} className="mb-6 flex items-center gap-3">
              <Clock className="h-7 w-7" />
              <h2 className="font-playfair text-3xl font-bold italic md:text-4xl">Opening hours</h2>
              <OpenBadge dark />
            </motion.div>
            <motion.div {...reveal(0.05)} className="space-y-3 font-satoshi text-lg">
              {[
                ["Monday – Friday", "7:00am – 7:00pm"],
                ["Saturday", "8:00am – 8:00pm"],
                ["Sunday", "8:00am – 6:00pm"],
              ].map(([d, h]) => (
                <div key={d} className="flex items-center justify-between border-b border-white/15 pb-3">
                  <span className="font-semibold">{d}</span>
                  <span className="text-white/85">{h}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...reveal(0.1)} className="mt-8">
              <div className="flex items-center gap-2 font-satoshi font-semibold">
                <MapPin className="h-5 w-5" /> 14 Redchurch Street, Shoreditch, London E2 7DJ
              </div>
              <p className="mt-2 font-satoshi text-white/80">3 minutes from Shoreditch High Street station.</p>
              <a
                href="https://maps.google.com/?q=14+Redchurch+Street+London+E2+7DJ"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-3 font-satoshi text-sm font-semibold text-[hsl(var(--cafe-dark))] transition hover:bg-white/90"
              >
                Get directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div {...reveal(0.1)} className="overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <iframe
              title="The Daily Grind, Shoreditch"
              src="https://maps.google.com/maps?q=14%20Redchurch%20Street%20London%20E2%207DJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-[360px] w-full"
              style={{ border: 0, filter: "saturate(0.9) contrast(1.05)" }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <DemoFooter
        name="The Daily Grind"
        blurb="Neighbourhood specialty coffee on Redchurch Street, Shoreditch. Roasted with care, served without the fuss."
        className="bg-[hsl(var(--cafe-dark))] text-[hsl(var(--cafe-bg))]"
        brandClass="font-playfair font-bold italic"
        accentClass="text-[hsl(var(--cafe-primary))]"
        columns={[
          {
            title: "Menu",
            items: [
              <button key="c" onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>Coffee</button>,
              <button key="p" onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>Pastry</button>,
              <button key="k" onClick={() => document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })}>Kitchen</button>,
            ],
          },
          {
            title: "Visit",
            items: ["14 Redchurch Street", "Shoreditch, London", "E2 7DJ"],
          },
          {
            title: "Follow",
            items: ["Instagram", "Hello@dailygrind.test", "Mon–Sun, 7am"],
          },
        ]}
      />

      <DemoPageCTA />
      <DemoPageBackButton />
    </div>
  );
};

export default Cafe;
