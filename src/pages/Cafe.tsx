import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const cafeHero = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80&auto=format&fit=crop";
import { Coffee, Clock, MapPin } from "lucide-react";

const Cafe = () => {
  const menuItems = [
    { name: "Espresso", price: "$3.50", category: "Coffee" },
    { name: "Cappuccino", price: "$4.50", category: "Coffee" },
    { name: "Latte", price: "$4.75", category: "Coffee" },
    { name: "Americano", price: "$3.75", category: "Coffee" },
    { name: "Mocha", price: "$5.00", category: "Coffee" },
    { name: "Croissant", price: "$3.25", category: "Pastry" },
    { name: "Blueberry Muffin", price: "$3.50", category: "Pastry" },
    { name: "Avocado Toast", price: "$8.50", category: "Food" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--cafe-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${cafeHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-cafe-dark/90" />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in">
          <div className="mb-4">
            <Coffee className="w-16 h-16 mx-auto text-cafe-primary" />
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">The Daily Grind</h1>
          <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide">Your neighborhood coffee sanctuary</p>
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
      <section className="py-32" style={{ backgroundColor: "hsl(var(--cafe-dark))" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-5xl font-bold mb-8" style={{ color: "hsl(var(--cafe-primary))" }}>
              Welcome Home
            </h2>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              At The Daily Grind, we believe coffee is more than a drink—it's an experience.
              From our ethically sourced beans to our cozy atmosphere, every detail is crafted
              with care. Join us for your morning ritual or afternoon escape.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="py-32 bg-cafe-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-6 text-cafe-dark">Our Menu</h2>
            <p className="text-xl text-cafe-dark/70">Handcrafted beverages & fresh pastries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {menuItems.map((item, index) => (
              <div
                key={item.name}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border border-cafe-primary/20"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="text-sm font-semibold mb-2 text-cafe-secondary uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-cafe-dark">{item.name}</h3>
                <span className="text-2xl font-bold text-cafe-primary">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--cafe-primary))" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16 text-white">
            <div className="animate-fade-in text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <Clock className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Hours</h3>
              </div>
              <div className="space-y-3 text-lg">
                <p className="flex justify-between md:justify-start md:gap-4">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>7am - 7pm</span>
                </p>
                <p className="flex justify-between md:justify-start md:gap-4">
                  <span className="font-semibold">Saturday:</span>
                  <span>8am - 8pm</span>
                </p>
                <p className="flex justify-between md:justify-start md:gap-4">
                  <span className="font-semibold">Sunday:</span>
                  <span>8am - 6pm</span>
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up text-center md:text-left">
              <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                <MapPin className="w-8 h-8" />
                <h3 className="text-3xl font-bold">Location</h3>
              </div>
              <p className="text-lg mb-6 leading-relaxed">
                123 Coffee Street<br />
                Downtown District<br />
                City, State 12345
              </p>
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-cafe-primary font-semibold"
              >
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16 bg-cafe-dark">
        <div className="container mx-auto px-4 text-center">
          <Button asChild variant="outline" size="lg" className="border-cafe-primary text-cafe-primary hover:bg-cafe-primary hover:text-white">
            <Link to="/">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cafe;
