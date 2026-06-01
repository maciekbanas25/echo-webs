import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { UtensilsCrossed, Clock, MapPin, Phone, Star, ChevronRight, Flame } from "lucide-react";
import { DemoPageCTA } from "@/components/DemoPageHeader";

const Restaurant = () => {
  const menuCategories = [
    {
      name: "Starters",
      items: [
        { name: "Crispy Calamari", price: "$14", description: "Lemon aioli, marinara" },
        { name: "Bruschetta Trio", price: "$12", description: "Tomato, olive, mushroom" },
        { name: "Loaded Nachos", price: "$16", description: "Cheese, jalapeño, guac" },
      ]
    },
    {
      name: "Mains",
      items: [
        { name: "Signature Burger", price: "$18", description: "Angus beef, bacon, cheddar", popular: true },
        { name: "Grilled Salmon", price: "$26", description: "Herb butter, vegetables" },
        { name: "Pasta Carbonara", price: "$20", description: "Pancetta, parmesan, egg" },
      ]
    },
    {
      name: "Desserts",
      items: [
        { name: "Churros", price: "$10", description: "Chocolate dipping sauce" },
        { name: "Tiramisu", price: "$12", description: "Classic Italian recipe" },
        { name: "Ice Cream Sundae", price: "$9", description: "Three scoops, toppings" },
      ]
    }
  ];

  const gallery = [
    { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80&auto=format&fit=crop", label: "Signature Dish" },
    { src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop", label: "Interior" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop", label: "Chef's Special" },
    { src: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80&auto=format&fit=crop", label: "Desserts" },
    { src: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=600&q=80&auto=format&fit=crop", label: "Atmosphere" },
    { src: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80&auto=format&fit=crop", label: "Fresh Ingredients" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--restaurant-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(135deg, hsl(var(--restaurant-dark)) 0%, hsl(15 60% 10%) 100%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 30% 70%, hsl(var(--restaurant-primary) / 0.4) 0%, transparent 50%),
                         radial-gradient(circle at 70% 30%, hsl(var(--restaurant-accent) / 0.3) 0%, transparent 50%)`
          }}
        />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div 
              className="p-4 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, hsl(var(--restaurant-primary)) 0%, hsl(var(--restaurant-accent)) 100%)`
              }}
            >
              <Flame className="w-12 h-12" />
            </div>
          </div>
          
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ 
              fontFamily: "'Georgia', serif",
              textShadow: `0 0 60px hsl(var(--restaurant-primary) / 0.5)`
            }}
          >
            Ember & Flame
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-white/90 tracking-wide uppercase">
            Wood-Fired Kitchen & Bar
          </p>
          <p className="text-lg mb-12 text-white/60 max-w-xl mx-auto">
            Bold flavors, fresh ingredients, and an atmosphere that brings people together
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-bold text-white"
              style={{
                background: `linear-gradient(135deg, hsl(var(--restaurant-primary)) 0%, hsl(var(--restaurant-accent)) 100%)`
              }}
            >
              Reserve a Table <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 text-white"
              style={{ borderColor: "hsl(var(--restaurant-primary))" }}
            >
              View Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section 
        className="py-6"
        style={{ background: `linear-gradient(90deg, hsl(var(--restaurant-primary)), hsl(var(--restaurant-accent)))` }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white text-center">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Mon-Sun: 11am - 11pm</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>123 Food Street, Downtown</span>
            </div>
            <div className="hidden md:block w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              <span>(555) 321-9876</span>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--restaurant-bg))" }}>
        <div className="container mx-auto px-4 max-w-4xl text-center animate-fade-in">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-8"
            style={{ color: "hsl(var(--restaurant-dark))", fontFamily: "'Georgia', serif" }}
          >
            Our Story
          </h2>
          <p 
            className="text-xl leading-relaxed"
            style={{ color: "hsl(var(--restaurant-dark) / 0.7)" }}
          >
            Born from a passion for bold flavors and community gathering, Ember & Flame brings 
            the warmth of wood-fired cooking to every dish. Our chefs craft each plate using 
            locally-sourced ingredients and time-honored techniques that make every bite memorable.
          </p>
        </div>
      </section>

      {/* Menu */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--restaurant-light))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--restaurant-dark))", fontFamily: "'Georgia', serif" }}
            >
              Our Menu
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--restaurant-dark) / 0.6)" }}>
              Fresh, flavorful, and made with love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {menuCategories.map((category, catIndex) => (
              <div 
                key={category.name}
                className="bg-white rounded-2xl p-8 shadow-lg animate-scale-in"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <h3 
                  className="text-2xl font-bold mb-6 pb-4 border-b-2"
                  style={{ 
                    color: "hsl(var(--restaurant-primary))",
                    borderColor: "hsl(var(--restaurant-primary) / 0.2)" 
                  }}
                >
                  {category.name}
                </h3>
                <div className="space-y-6">
                  {category.items.map((item) => (
                    <div key={item.name} className="group">
                      <div className="flex justify-between items-start mb-1">
                        <h4 
                          className="font-bold flex items-center gap-2"
                          style={{ color: "hsl(var(--restaurant-dark))" }}
                        >
                          {item.name}
                          {item.popular && (
                            <span 
                              className="text-xs px-2 py-0.5 rounded-full text-white"
                              style={{ backgroundColor: "hsl(var(--restaurant-primary))" }}
                            >
                              Popular
                            </span>
                          )}
                        </h4>
                        <span 
                          className="font-bold"
                          style={{ color: "hsl(var(--restaurant-primary))" }}
                        >
                          {item.price}
                        </span>
                      </div>
                      <p 
                        className="text-sm"
                        style={{ color: "hsl(var(--restaurant-dark) / 0.5)" }}
                      >
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 text-white"
              style={{ backgroundColor: "hsl(var(--restaurant-primary))" }}
            >
              View Full Menu
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--restaurant-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--restaurant-dark))", fontFamily: "'Georgia', serif" }}
            >
              Gallery
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-bold text-lg">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Online */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--restaurant-dark))" }}>
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Order Online
            </h2>
            <p className="text-xl text-white/70 mb-12">
              Enjoy our food from the comfort of your home
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              {["UberEats", "DoorDash", "JustEat", "Grubhub"].map((service, index) => (
                <Button
                  key={service}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 text-white hover:text-restaurant-dark animate-scale-in"
                  style={{ 
                    borderColor: "hsl(var(--restaurant-primary))",
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {service}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reservation CTA */}
      <section 
        className="py-24"
        style={{ background: `linear-gradient(135deg, hsl(var(--restaurant-primary)) 0%, hsl(var(--restaurant-accent)) 100%)` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Make a Reservation
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Book your table and experience the warmth of Ember & Flame
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-bold bg-white hover:bg-white/90"
              style={{ color: "hsl(var(--restaurant-primary))" }}
            >
              <Phone className="mr-2 w-5 h-5" /> Call (555) 321-9876
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
            >
              Book Online
            </Button>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--restaurant-primary))" />

      {/* Back to Portfolio */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--restaurant-bg))" }}>
        <div className="container mx-auto px-4 text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            style={{ borderColor: "hsl(var(--restaurant-primary))", color: "hsl(var(--restaurant-primary))" }}
          >
            <Link to="/portfolio">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Restaurant;