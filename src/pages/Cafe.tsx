import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Coffee, MapPin, ArrowUpRight, ArrowDown } from "lucide-react";
import {
  DemoBar,
  DemoNav,
  DemoFooter,
  type DemoNavLink,
} from "@/components/demo/DemoChrome";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";

const heroImg = "/cafe.jpg";
const img = (id: string, w = 1000) =>
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

const gallery = [
  { src: img("1442512595331-e89e73853f31"), cap: "The counter" },
  { src: img("1509440159596-0249088772ff"), cap: "6am bake" },
  { src: img("1554118811-1e0d58224f24"), cap: "Window seats" },
];

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Count-up stat, animates once when scrolled into view. */
const Stat = ({ value, decimals = 0, prefix = "", suffix = "", label }: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(easeOut(p) * value);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <div ref={ref}>
      <div className="font-bricolage text-5xl font-semibold tracking-tight text-[#E0A04B] md:text-6xl">
        {prefix}
        {n.toFixed(decimals)}
        {suffix}
      </div>
      <div className="mt-3 font-hanken text-sm uppercase tracking-[0.16em] text-[#ECE3D5]/45">{label}</div>
    </div>
  );
};

const Cafe = () => {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const open = isOpenNow();
  const cats: Cat[] = tab === "All" ? ["Coffee", "Pastry", "Kitchen"] : [tab];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: reduce ? 0 : 28 },
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

  const StatusPill = () => (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#ECE3D5]/15 px-3 py-1 font-hanken text-xs font-medium">
      <span className={`h-1.5 w-1.5 rounded-full ${open ? "bg-emerald-400" : "bg-[#E0A04B]"}`} />
      {open ? "Open · till 7" : "Closed · back 7am"}
    </span>
  );

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-x-hidden bg-[#120D0A] font-hanken text-[#ECE3D5]"
    >
      <div className="grain-overlay fixed z-[20] opacity-[0.06]" aria-hidden />

      <DemoBar />
      <DemoNav
        name="The Daily Grind"
        icon={<Coffee className="h-5 w-5 text-[#E0A04B]" />}
        links={navLinks}
        cta={{ label: "See the menu", href: "#menu" }}
        rightSlot={<StatusPill />}
        brandClass="font-bricolage font-semibold tracking-tight"
        linkClass="font-hanken text-[13px] uppercase tracking-[0.16em]"
        overlayClass="text-[#ECE3D5]"
        scrolledClass="bg-[#120D0A]/90 text-[#ECE3D5] backdrop-blur-md border-b border-[#ECE3D5]/10"
        ctaClass="rounded-full bg-[#E0A04B] px-5 py-2 font-hanken text-[13px] font-semibold text-[#120D0A] transition hover:bg-[#eab063]"
      />

      {/* ───────── Hero ───────── */}
      <section ref={heroRef} className="relative -mt-[68px] flex min-h-[100svh] items-end overflow-hidden">
        <motion.div
          style={reduce ? undefined : { y: heroY, scale: heroScale }}
          className="absolute inset-0 bg-cover bg-center"
          aria-hidden
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#120D0A] via-[#120D0A]/70 to-[#120D0A]/35" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_15%_100%,rgba(224,160,75,0.18),transparent_55%)]" />
        <div className="grain-overlay opacity-[0.1]" aria-hidden />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-36 md:px-12 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mb-6 font-hanken text-sm uppercase tracking-[0.3em] text-[#E0A04B]"
          >
            Shoreditch · Specialty coffee since 2019
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: reduce ? 0 : 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            className="font-bricolage text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.02em]"
          >
            Coffee worth
            <br />
            the early start.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-[#ECE3D5]/75"
          >
            Single-origin espresso, milk steamed the way it should be, and pastries baked out back before sunrise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button onClick={() => scroll("#menu")} className="group inline-flex items-center gap-2 rounded-full bg-[#E0A04B] px-7 py-4 font-hanken text-base font-semibold text-[#120D0A] transition hover:bg-[#eab063]">
              See the menu
              <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </button>
            <button onClick={() => scroll("#visit")} className="rounded-full border border-[#ECE3D5]/30 px-7 py-4 font-hanken text-base font-medium text-[#ECE3D5] backdrop-blur-sm transition hover:bg-[#ECE3D5]/10">
              Find us
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────── Stats ───────── */}
      <section className="border-y border-[#ECE3D5]/10 bg-[#0C0A08] px-5 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-4">
          <Stat value={2019} label="Roasting since" />
          <Stat value={4.9} decimals={1} suffix="★" label="320+ Google reviews" />
          <Stat value={60} suffix="s" label="Average flat white" />
          <Stat value={1} suffix="/wk" label="New single origin" />
        </div>
      </section>

      {/* ───────── Story ───────── */}
      <section id="story" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal(0)} className="mb-4 font-hanken text-sm uppercase tracking-[0.28em] text-[#E0A04B]">
            01 — Our story
          </motion.div>
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <motion.h2 {...reveal(0.05)} className="font-bricolage text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.02em]">
              Not a chain. Never will be.
            </motion.h2>
            <motion.div {...reveal(0.12)} className="space-y-4 text-base leading-relaxed text-[#ECE3D5]/65">
              <p>We opened on Redchurch Street with one espresso machine and a stubborn idea: a neighbourhood deserves coffee roasted by people who know its name.</p>
              <p>A new single origin every week. Everything baked in the kitchen behind you. No syrups pretending to be flavour.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── Menu (sticky heading) ───────── */}
      <section id="menu" className="scroll-mt-24 bg-[#0C0A08] px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div {...reveal(0)} className="mb-4 font-hanken text-sm uppercase tracking-[0.28em] text-[#E0A04B]">
              02 — The menu
            </motion.div>
            <motion.h2 {...reveal(0.05)} className="font-bricolage text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
              Made fresh, priced fair.
            </motion.h2>
            <motion.div {...reveal(0.1)} className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`font-hanken text-sm uppercase tracking-[0.14em] transition ${tab === t ? "text-[#E0A04B] underline underline-offset-8" : "text-[#ECE3D5]/45 hover:text-[#ECE3D5]"}`}
                >
                  {t}
                </button>
              ))}
            </motion.div>
            <motion.p {...reveal(0.15)} className="mt-8 max-w-xs text-sm leading-relaxed text-[#ECE3D5]/45">
              Oat, almond and soy on the house. Beans to take home at the counter.
            </motion.p>
          </div>

          <div>
            {cats.map((cat) => (
              <div key={cat} className="mb-12 last:mb-0">
                <div className="mb-2 font-hanken text-xs uppercase tracking-[0.3em] text-[#ECE3D5]/35">{cat}</div>
                <div>
                  {menu.filter((m) => m.category === cat).map((item, i) => (
                    <motion.div
                      key={item.name}
                      {...reveal(Math.min(i * 0.04, 0.2))}
                      className="group flex items-baseline gap-4 border-b border-[#ECE3D5]/10 py-5 transition-colors hover:border-[#E0A04B]/40"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-bricolage text-xl font-medium transition-colors group-hover:text-[#E0A04B]">{item.name}</h3>
                          {item.fav && <span className="font-hanken text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E0A04B]">★ fav</span>}
                        </div>
                        <p className="mt-1 text-sm text-[#ECE3D5]/45">{item.description}</p>
                      </div>
                      <div className="font-bricolage text-lg font-semibold tabular-nums text-[#E0A04B]">£{item.price}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Gallery (clip-path reveal) ───────── */}
      <section id="gallery" className="scroll-mt-24 px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal(0)} className="mb-4 font-hanken text-sm uppercase tracking-[0.28em] text-[#E0A04B]">
            03 — The room
          </motion.div>
          <motion.h2 {...reveal(0.05)} className="mb-14 max-w-2xl font-bricolage text-[clamp(2.2rem,5.5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
            A room you won't want to leave.
          </motion.h2>
          <div className="grid gap-5 md:grid-cols-3">
            {gallery.map((g, i) => (
              <motion.figure
                key={g.src}
                initial={{ opacity: 0, y: reduce ? 0 : 34, scale: reduce ? 1 : 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] }}
                className={`group overflow-hidden rounded-xl ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden ${i === 0 ? "h-[300px] md:h-[460px]" : "h-[300px] md:h-[460px]"}`}>
                  <img src={g.src} alt={g.cap} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105" />
                  <figcaption className="absolute bottom-4 left-4 font-hanken text-xs uppercase tracking-[0.18em] text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{g.cap}</figcaption>
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Visit ───────── */}
      <section id="visit" className="scroll-mt-24 bg-[#0C0A08] px-5 py-24 md:px-12 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.div {...reveal(0)} className="mb-4 font-hanken text-sm uppercase tracking-[0.28em] text-[#E0A04B]">
              04 — Visit
            </motion.div>
            <motion.h2 {...reveal(0.05)} className="font-bricolage text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.02em]">
              Pull up a stool.
            </motion.h2>

            <motion.div {...reveal(0.1)} className="mt-10 space-y-3 font-hanken">
              {[
                ["Mon – Fri", "07:00 — 19:00"],
                ["Saturday", "08:00 — 20:00"],
                ["Sunday", "08:00 — 18:00"],
              ].map(([d, h]) => (
                <div key={d} className="flex items-center justify-between border-b border-[#ECE3D5]/10 pb-3">
                  <span className="text-[#ECE3D5]/70">{d}</span>
                  <span className="tabular-nums">{h}</span>
                </div>
              ))}
            </motion.div>

            <motion.div {...reveal(0.15)} className="mt-8">
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E0A04B]" />
                <span>14 Redchurch Street, Shoreditch, London E2 7DJ<br /><span className="text-[#ECE3D5]/55">3 minutes from Shoreditch High Street station.</span></span>
              </div>
              <a
                href="https://maps.google.com/?q=14+Redchurch+Street+London+E2+7DJ"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#E0A04B] px-6 py-3 font-hanken text-sm font-semibold text-[#120D0A] transition hover:bg-[#eab063]"
              >
                Get directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div {...reveal(0.1)} className="overflow-hidden rounded-2xl border border-[#ECE3D5]/15">
            <iframe
              title="The Daily Grind, Shoreditch"
              src="https://maps.google.com/maps?q=14%20Redchurch%20Street%20London%20E2%207DJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-full min-h-[400px] w-full"
              style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.7) brightness(0.95)" }}
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      <DemoFooter
        name="The Daily Grind"
        blurb="Neighbourhood specialty coffee on Redchurch Street, Shoreditch. Roasted with care, served without the fuss."
        className="bg-[#0C0A08] text-[#ECE3D5]"
        brandClass="font-bricolage font-semibold tracking-tight"
        accentClass="text-[#E0A04B]"
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
