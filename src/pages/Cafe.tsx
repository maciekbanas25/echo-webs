import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";
import { Coffee, Clock, MapPin, CheckCircle } from "lucide-react";

const cafeHero = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop";

const isOpenNow = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  if (day >= 1 && day <= 5) return hour >= 7 && hour < 19; // Mon-Fri 7-7
  if (day === 6) return hour >= 8 && hour < 20; // Sat 8-8
  return hour >= 8 && hour < 18; // Sun 8-6
};

const menuItems = [
  { name: "Espresso", price: "£2.80", category: "Coffee", description: "Single origin, double shot" },
  { name: "Flat White", price: "£3.50", category: "Coffee", description: "Velvety microfoam on espresso" },
  { name: "Oat Latte", price: "£4.20", category: "Coffee", description: "Creamy oat milk, house blend" },
  { name: "Iced Matcha", price: "£4.50", category: "Coffee", description: "Ceremonial grade, cold milk" },
  { name: "Pour Over", price: "£4.00", category: "Coffee", description: "Single origin filter, daily rotation" },
  { name: "Cortado", price: "£3.20", category: "Coffee", description: "Equal parts espresso and milk" },
  { name: "Almond Croissant", price: "£3.80", category: "Pastry", description: "Frangipane filled, toasted almonds" },
  { name: "Pain au Chocolat", price: "£3.20", category: "Pastry", description: "Dark chocolate, butter pastry" },
  { name: "Banana Bread", price: "£3.50", category: "Pastry", description: "Toasted with salted butter" },
  { name: "Cinnamon Roll", price: "£4.00", category: "Pastry", description: "Cream cheese glaze, warm served" },
  { name: "Avocado Toast", price: "£9.50", category: "Food", description: "Sourdough, chilli flakes, poached egg" },
  { name: "Shakshuka", price: "£11.00", category: "Food", description: "Baked eggs, spiced tomato, feta" },
  { name: "Granola Bowl", price: "£8.50", category: "Food", description: "House granola, seasonal fruit, honey" },
  { name: "Smashed Avo BLT", price: "£10.50", category: "Food", description: "Bacon, lettuce, tomato, avocado" },
];

const tabs = ["All", "Coffee", "Pastry", "Food"];

const Cafe = () => {
  const [activeTab, setActiveTab] = useState("All");
  const open = isOpenNow();

  const filtered = activeTab === "All" ? menuItems : menuItems.filter(i => i.category === activeTab);

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--cafe-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cafeHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-cafe-dark/90" />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <div className="mb-4">
            <Coffee className="w-16 h-16 mx-auto text-cafe-primary" />
          </div>
          <h1
            className="text-6xl md:text-8xl font-bold mb-4 tracking-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic" }}
          >
            The Daily Grind
          </h1>
          <p className="text-2xl md:text-3xl mb-6 font-light tracking-wide">
            Your neighbourhood coffee sanctuary
          </p>

          {/* Live Open/Closed badge */}
          <div className="flex justify-center mb-10">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm border ${
              open
                ? "bg-green-500/20 border-green-400/40 text-green-300"
                : "bg-red-500/20 border-red-400/40 text-red-300"
            }`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {open ? "Open Now" : "Currently Closed"}
            </div>
          </div>

          <Button
            size="lg"
            className="text-lg px-8 py-6"
            style={{ backgroundColor: "hsl(var(--cafe-primary))", color: "white" }}
          >
            View Full Menu
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--cafe-dark))" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center animate-fade-in-up">
            <h2
              className="text-5xl font-bold mb-8"
              style={{ color: "hsl(var(--cafe-primary))", fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Welcome Home
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              At The Daily Grind, we believe coffee is more than a drink — it's an experience.
              From our ethically sourced single-origin beans to our freshly baked pastries, every detail
              is crafted with care. Your morning ritual starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Tabbed Menu */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--cafe-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2
              className="text-5xl font-bold mb-4 text-cafe-dark"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Our Menu
            </h2>
            <p className="text-xl text-cafe-dark/70 mb-8">Handcrafted drinks & fresh bakes daily</p>

            {/* Tab bar */}
            <div className="inline-flex gap-2 p-1.5 rounded-2xl" style={{ backgroundColor: "hsl(var(--cafe-primary) / 0.1)" }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    activeTab === tab
                      ? { backgroundColor: "hsl(var(--cafe-primary))", color: "white" }
                      : { color: "hsl(var(--cafe-dark))" }
                  }
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {filtered.map((item, index) => (
              <div
                key={item.name}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-cafe-primary/10"
                style={{ animationDelay: `${index * 0.04}s` }}
              >
                <div className="text-xs font-bold mb-2 uppercase tracking-widest" style={{ color: "hsl(var(--cafe-secondary))" }}>
                  {item.category}
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-bold text-cafe-dark">{item.name}</h3>
                  <span className="text-lg font-bold ml-4 flex-shrink-0" style={{ color: "hsl(var(--cafe-primary))" }}>
                    {item.price}
                  </span>
                </div>
                <p className="text-sm text-cafe-dark/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--cafe-primary))" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 text-white">
            {/* Hours */}
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-8 h-8" />
                <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Hours</h3>
                <div className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  open ? "bg-green-400/20 text-green-200" : "bg-white/20 text-white/70"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-white/50"}`} />
                  {open ? "Open Now" : "Closed"}
                </div>
              </div>
              <div className="space-y-3 text-lg">
                <p className="flex justify-between">
                  <span className="font-semibold">Monday – Friday</span>
                  <span>7:00 am – 7:00 pm</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Saturday</span>
                  <span>8:00 am – 8:00 pm</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold">Sunday</span>
                  <span>8:00 am – 6:00 pm</span>
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-8 h-8" />
                <h3 className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Location</h3>
              </div>
              <p className="text-lg mb-4 leading-relaxed">
                14 Redchurch Street<br />
                Shoreditch, London<br />
                E2 7DJ
              </p>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-12 rounded-2xl overflow-hidden shadow-2xl" style={{ height: "320px" }}>
            <iframe
              title="The Daily Grind – Shoreditch"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.086%2C51.519%2C-0.064%2C51.527&layer=mapnik&marker=51.5228%2C-0.0752"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "contrast(1.05) saturate(0.9)" }}
              loading="lazy"
            />
          </div>
          <p className="text-center text-white/70 text-sm mt-3">
            📍 14 Redchurch Street, Shoreditch — 3 min walk from Shoreditch High Street Station
          </p>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA />

      <DemoPageBackButton />

      <Footer />
    </div>
  );
};

export default Cafe;
