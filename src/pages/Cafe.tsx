import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Coffee, MapPin, ArrowUpRight, ArrowDown } from "lucide-react";
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
  const h = now.getHours();
  const d = now.getDay();
  if (d >= 1 && d <= 5) return h >= 7 && h < 19;
  if (d === 6) return h >= 8 && h < 20;
  return h >= 8 && h < 18;
};

type Cat = "Coffee" | "Pastry" | "Kitchen";
type MenuItem = { name: string; price: string; category: Cat; description: string; fav?: boolean };

const menu: MenuItem[] = [
  { name: "Flat White", price: "3.50", category: "Coffee", description: "Velvety microfoam, house espresso blend.", fav: true },
  { name: "Filter / Pour Over", price: "4.00", category: "Coffee", description: "This week's single origin, brewed to order." },
  { name: "Oat Latte", price: "4.20", category: "Coffee", description: "Minor Figures oat, no upcharge." },
  { name: "Cortado", price: "3.20", category: "Coffee", description: "Equal espresso and steamed milk." },
  { name: "Iced Matcha", price: "4.50", category: "Coffee", description: "Ceremonial grade, cold whole milk." },
  { name: "Espresso", price: "2.80", category: "Coffee", description: "Single or double. Chocolatey, low acidity." },
  { name: "Almond Croissant", price: "3.80", category: "Pastry", description: "Frangipane filled, baked before sunrise.", fav: true },
  { name: "Pain au Chocolat", price: "3.20", category: "Pastry", description: "Two batons of dark chocolate, all butter." },
  { name: "Cinnamon Roll", price: "4.00", category: "Pastry", description: "Cream cheese glaze, served warm." },
  { name: "Banana Bread", price: "3.50", category: "Pastry", description: "Toasted, with salted butter." },
  { name: "Smashed Avo, Sourdough", price: "9.50", category: "Kitchen", description: "Chilli, lemon, poached egg.", fav: true },
  { name: "Shakshuka", price: "11.00", category: "Kitchen", description: "Baked eggs, spiced tomato, feta, toast." },
  { name: "Granola Bowl", price: "8.50", category: "Kitchen", description: "House granola, seasonal fruit, honey." },
];

const tabs = ["All", "Coffee", "Pastry", "Kitchen"] as const;
const marquee = ["Single origin", "Baked at dawn", "Oat on the house", "No queue by 9", "Roasted in Shoreditch", "Dog friendly", "Est. 2019"];

const gallery = [
  { src: img("1442512595331-e89e73853f31", 800), cap: "Fig. 01 — The counter", span: "md:col-span-7", h: "h-[280px] md:h-[420px]", rot: "md:-rotate-2" },
  { src: img("1509440159596-0249088772ff", 800), cap: "Fig. 02 — 6am bake", span: "md:col-span-5", h: "h-[280px] md:h-[300px]", rot: "md:rotate-2 md:translate-y-8" },
  { src: img("1554118811-1e0d58224f24", 800), cap: "Fig. 03 — Window seats", span: "md:col-span-6 md:col-start-4", h: "h-[280px] md:h-[340px]", rot: "md:-rotate-1 md:-translate-y-4" },
];

const Cafe = () => {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const open = isOpenNow();
  const cats: Cat[] = tab === "All" ? ["Coffee", "Pastry", "Kitchen"] : [tab];

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, delay, ease: [0.19, 1, 0.22, 1] as const },
  });

  const navLinks: DemoNavLink[] = [
    { label: "Menu", href: "#menu" },
    { label: "Story", href: "#story" },
    { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#visit" },
  ];

  const scroll = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[hsl(var(--cafe-bg))] text-[hsl(var(--cafe-dark))]"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >
      {/* page-wide film grain */}
      <div className="grain-overlay fixed z-[20] opacity-[0.05]" aria-hidden />

      <DemoBar />
      <DemoNav
        name="The Daily Grind"
        icon={<Coffee className="h-5 w-5 text-[hsl(var(--cafe-primary))]" />}
        links={navLinks}
        cta={{ label: "See the menu", href: "#menu" }}
        brandClass="font-fraunces font-semibold italic"
        linkClass="font-monojb text-[12px] uppercase tracking-[0.18em]"
        overlayClass="text-[hsl(var(--cafe-bg))]"
        scrolledClass="bg-[hsl(var(--cafe-bg))]/95 text-[hsl(var(--cafe-dark))] backdrop-blur-md border-b border-[hsl(var(--cafe-dark))]/10"
        ctaClass="rounded-full bg-[hsl(var(--cafe-primary))] px-5 py-2 font-monojb text-[12px] uppercase tracking-[0.14em] text-white transition hover:brightness-110"
      />

      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative -mt-[68px] flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0 scale-105 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--cafe-dark))] via-[hsl(var(--cafe-dark))]/55 to-[hsl(var(--cafe-dark))]/30" />
        <div className="grain-overlay opacity-[0.12]" aria-hidden />

        {/* vertical edge label */}
        <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 md:block" style={{ writingMode: "vertical-rl" }}>
          <span className="font-monojb text-[11px] uppercase tracking-[0.4em] text-[hsl(var(--cafe-bg))]/55">
            N°01 — Shoreditch, London
          </span>
        </div>

        {/* wax stamp */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.6, rotate: -18 }}
          animate={{ opacity: 1, scale: 1, rotate: -8 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
          className="absolute right-6 top-24 hidden md:right-12 md:top-28 md:block"
        >
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed border-[hsl(var(--cafe-bg))]/60 text-center text-[hsl(var(--cafe-bg))]">
            <div>
              <div className="font-monojb text-[10px] tracking-[0.25em]">{open ? "OPEN" : "CLOSED"}</div>
              <div className="font-fraunces text-xl font-semibold italic leading-none">{open ? "till 7" : "back 7"}</div>
              <div className="mt-1 font-monojb text-[8px] tracking-[0.2em] opacity-70">EST. 2019</div>
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36 md:px-12 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-5 font-monojb text-xs uppercase tracking-[0.32em] text-[hsl(var(--cafe-bg))]/70"
          >
            Specialty coffee · Redchurch Street
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="font-fraunces text-[hsl(var(--cafe-bg))]"
          >
            <span className="block text-[clamp(3.2rem,11vw,9rem)] font-semibold leading-[0.86]">Coffee worth</span>
            <span className="block text-[clamp(3.2rem,11vw,9rem)] font-light italic leading-[0.86]">the walk.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-md font-jakarta text-lg leading-relaxed text-[hsl(var(--cafe-bg))]/85"
          >
            Single-origin espresso, milk steamed the way it should be, and pastries baked out back before sunrise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button onClick={() => scroll("#menu")} className="group inline-flex items-center gap-2 rounded-full bg-[hsl(var(--cafe-primary))] px-7 py-3.5 font-monojb text-[13px] uppercase tracking-[0.14em] text-white transition hover:brightness-110">
              See the menu
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button onClick={() => scroll("#visit")} className="rounded-full border border-[hsl(var(--cafe-bg))]/35 px-7 py-3.5 font-monojb text-[13px] uppercase tracking-[0.14em] text-[hsl(var(--cafe-bg))] backdrop-blur-sm transition hover:bg-[hsl(var(--cafe-bg))]/10">
              Find us
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── Marquee ───────────────────────── */}
      <div className="overflow-hidden border-y border-[hsl(var(--cafe-dark))]/15 bg-[hsl(var(--cafe-dark))] py-4 text-[hsl(var(--cafe-bg))]">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-8 font-fraunces text-2xl italic">
              {m}
              <span className="text-[hsl(var(--cafe-primary))]">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ───────────────────────── Story ───────────────────────── */}
      <section id="story" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal(0)} className="mb-3 font-monojb text-xs uppercase tracking-[0.3em] text-[hsl(var(--cafe-primary))]">
            01 — Our story
          </motion.div>
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.h2 {...reveal(0.05)} className="font-fraunces text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95]">
              Not a chain.
              <br />
              <span className="italic font-light">Never will be.</span>
            </motion.h2>
            <motion.div {...reveal(0.12)} className="space-y-4 font-jakarta text-base leading-relaxed text-[hsl(var(--cafe-dark))]/75">
              <p>
                We opened on Redchurch Street in 2019 with one espresso machine and a stubborn idea: a
                neighbourhood deserves coffee roasted by people who know its name.
              </p>
              <p>We pour a new single origin every week and bake everything in the kitchen behind you. No syrups pretending to be flavour.</p>
            </motion.div>
          </div>

          <motion.div {...reveal(0.15)} className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[hsl(var(--cafe-dark))]/12 bg-[hsl(var(--cafe-dark))]/12 md:grid-cols-4">
            {[
              { big: "2019", small: "On Redchurch St since" },
              { big: "4.9★", small: "320+ Google reviews" },
              { big: "60s", small: "Average flat white" },
              { big: "1/wk", small: "New single origin" },
            ].map((s) => (
              <div key={s.small} className="bg-[hsl(var(--cafe-bg))] p-6 md:p-8">
                <div className="font-fraunces text-4xl font-semibold text-[hsl(var(--cafe-primary))] md:text-5xl">{s.big}</div>
                <div className="mt-2 font-monojb text-[11px] uppercase tracking-[0.12em] leading-snug text-[hsl(var(--cafe-dark))]/55">{s.small}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────────────────────── Menu ───────────────────────── */}
      <section id="menu" className="relative scroll-mt-24 overflow-hidden bg-[hsl(var(--cafe-dark))] px-5 py-24 text-[hsl(var(--cafe-bg))] md:px-12 md:py-36">
        <div className="grain-overlay opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-6 border-b border-[hsl(var(--cafe-bg))]/15 pb-8 md:flex-row md:items-end">
            <div>
              <motion.div {...reveal(0)} className="mb-3 font-monojb text-xs uppercase tracking-[0.3em] text-[hsl(var(--cafe-primary))]">
                02 — The menu
              </motion.div>
              <motion.h2 {...reveal(0.05)} className="font-fraunces text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none">
                Made fresh,
                <span className="italic font-light"> priced fair.</span>
              </motion.h2>
            </div>
            <motion.div {...reveal(0.1)} className="flex flex-wrap gap-x-6 gap-y-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-monojb text-[12px] uppercase tracking-[0.14em] transition ${
                    tab === t ? "text-[hsl(var(--cafe-primary))] underline underline-offset-8" : "text-[hsl(var(--cafe-bg))]/55 hover:text-[hsl(var(--cafe-bg))]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </motion.div>
          </div>

          {cats.map((cat) => (
            <div key={cat} className="mt-12">
              <motion.div {...reveal(0)} className="mb-5 font-monojb text-[11px] uppercase tracking-[0.3em] text-[hsl(var(--cafe-bg))]/45">
                — {cat}
              </motion.div>
              <div className="grid gap-x-14 gap-y-6 md:grid-cols-2">
                {menu.filter((m) => m.category === cat).map((item, i) => (
                  <motion.div key={item.name} {...reveal(Math.min(i * 0.03, 0.18))} className="group flex items-baseline gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <h3 className="font-fraunces text-xl font-medium text-[hsl(var(--cafe-bg))]">{item.name}</h3>
                        {item.fav && <span className="font-monojb text-[9px] uppercase tracking-[0.15em] text-[hsl(var(--cafe-primary))]">★ fav</span>}
                      </div>
                      <p className="mt-1 font-jakarta text-sm text-[hsl(var(--cafe-bg))]/50">{item.description}</p>
                    </div>
                    <span className="hidden flex-1 translate-y-[-3px] border-b border-dotted border-[hsl(var(--cafe-bg))]/25 sm:block" />
                    <div className="font-monojb text-base text-[hsl(var(--cafe-primary))]">£{item.price}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
          <p className="mt-12 font-monojb text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--cafe-bg))]/45">
            Oat · almond · soy on the house
          </p>
        </div>
      </section>

      {/* ───────────────────────── Gallery ───────────────────────── */}
      <section id="gallery" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal(0)} className="mb-3 font-monojb text-xs uppercase tracking-[0.3em] text-[hsl(var(--cafe-primary))]">
            03 — The room
          </motion.div>
          <motion.h2 {...reveal(0.05)} className="mb-14 max-w-2xl font-fraunces text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[0.95]">
            A room you won't want <span className="italic font-light">to leave.</span>
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-12">
            {gallery.map((g, i) => (
              <motion.figure key={g.src} {...reveal(i * 0.1)} className={`${g.span} ${g.rot} group`}>
                <div className={`overflow-hidden rounded-xl ${g.h}`}>
                  <img src={g.src} alt={g.cap} loading="lazy" className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105" />
                </div>
                <figcaption className="mt-3 font-monojb text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--cafe-dark))]/45">{g.cap}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── Visit ───────────────────────── */}
      <section id="visit" className="scroll-mt-24 bg-[hsl(var(--cafe-primary))] px-5 py-24 text-[hsl(var(--cafe-bg))] md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div {...reveal(0)} className="mb-3 font-monojb text-xs uppercase tracking-[0.3em] text-[hsl(var(--cafe-bg))]/70">
              04 — Visit
            </motion.div>
            <motion.h2 {...reveal(0.05)} className="font-fraunces text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-none">
              Pull up <span className="italic font-light">a stool.</span>
            </motion.h2>

            <motion.div {...reveal(0.1)} className="mt-10 space-y-3 font-monojb text-sm">
              {[
                ["MON – FRI", "07:00 — 19:00"],
                ["SATURDAY", "08:00 — 20:00"],
                ["SUNDAY", "08:00 — 18:00"],
              ].map(([d, h]) => (
                <div key={d} className="flex items-center justify-between border-b border-[hsl(var(--cafe-bg))]/25 pb-3 tracking-[0.1em]">
                  <span>{d}</span>
                  <span className="tabular-nums opacity-90">{h}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...reveal(0.15)} className="mt-8">
              <div className="flex items-start gap-2 font-jakarta">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
                <span>14 Redchurch Street, Shoreditch, London E2 7DJ<br /><span className="opacity-75">3 minutes from Shoreditch High Street station.</span></span>
              </div>
              <a
                href="https://maps.google.com/?q=14+Redchurch+Street+London+E2+7DJ"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[hsl(var(--cafe-bg))] px-6 py-3 font-monojb text-[12px] uppercase tracking-[0.14em] text-[hsl(var(--cafe-dark))] transition hover:bg-white"
              >
                Get directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div {...reveal(0.1)} className="relative">
            <div className="absolute -top-3 left-6 z-10 rotate-[-3deg] bg-[hsl(var(--cafe-dark))] px-3 py-1 font-monojb text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--cafe-bg))]">
              You are here
            </div>
            <div className="overflow-hidden rounded-xl border-4 border-[hsl(var(--cafe-bg))] shadow-2xl">
              <iframe
                title="The Daily Grind, Shoreditch"
                src="https://maps.google.com/maps?q=14%20Redchurch%20Street%20London%20E2%207DJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="h-full min-h-[380px] w-full"
                style={{ border: 0, filter: "saturate(0.85) sepia(0.15) contrast(1.05)" }}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <DemoFooter
        name="The Daily Grind"
        blurb="Neighbourhood specialty coffee on Redchurch Street, Shoreditch. Roasted with care, served without the fuss."
        className="bg-[hsl(var(--cafe-dark))] text-[hsl(var(--cafe-bg))]"
        brandClass="font-fraunces font-semibold italic"
        accentClass="text-[hsl(var(--cafe-primary))]"
        columns={[
          { title: "Menu", items: [
            <button key="c" onClick={() => scroll("#menu")}>Coffee</button>,
            <button key="p" onClick={() => scroll("#menu")}>Pastry</button>,
            <button key="k" onClick={() => scroll("#menu")}>Kitchen</button>,
          ] },
          { title: "Visit", items: ["14 Redchurch Street", "Shoreditch, London E2 7DJ", "Mon–Sun from 7am"] },
          { title: "Follow", items: ["Instagram", "hello@dailygrind.test", "+44 20 7946 0100"] },
        ]}
      />

      <DemoPageCTA />
      <DemoPageBackButton />
    </div>
  );
};

export default Cafe;
