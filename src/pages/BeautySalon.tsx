import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Clock, Phone, Star, Instagram, ChevronRight, Flower2 } from "lucide-react";
import { DemoPageCTA } from "@/components/DemoPageHeader";

const BeautySalon = () => {
  const services = [
    {
      category: "Nails",
      items: [
        { name: "Classic Manicure", price: "$35", duration: "45 min" },
        { name: "Gel Manicure", price: "$55", duration: "60 min" },
        { name: "Nail Art", price: "$15+", duration: "Add-on" },
        { name: "Full Set Acrylics", price: "$75", duration: "90 min" },
      ]
    },
    {
      category: "Lashes",
      items: [
        { name: "Classic Full Set", price: "$150", duration: "2 hrs" },
        { name: "Volume Full Set", price: "$200", duration: "2.5 hrs" },
        { name: "Lash Lift & Tint", price: "$85", duration: "60 min" },
        { name: "Fills (2 weeks)", price: "$65", duration: "60 min" },
      ]
    },
    {
      category: "Beauty",
      items: [
        { name: "Brow Lamination", price: "$75", duration: "60 min" },
        { name: "Brow Tint", price: "$25", duration: "20 min" },
        { name: "Facial Treatment", price: "$95", duration: "60 min" },
        { name: "Makeup Application", price: "$85", duration: "45 min" },
      ]
    },
  ];

  const gallery = [
    { title: "Nail Art Design", category: "Nails" },
    { title: "Volume Lashes", category: "Lashes" },
    { title: "Bridal Makeup", category: "Makeup" },
    { title: "Gel Extensions", category: "Nails" },
    { title: "Classic Lashes", category: "Lashes" },
    { title: "Brow Lamination", category: "Brows" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--beauty-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div 
          className="absolute inset-0"
          style={{ 
            background: `linear-gradient(180deg, hsl(var(--beauty-bg)) 0%, hsl(var(--beauty-light)) 50%, hsl(var(--beauty-bg)) 100%)`
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 20% 30%, hsl(var(--beauty-primary) / 0.3) 0%, transparent 40%),
                         radial-gradient(circle at 80% 70%, hsl(var(--beauty-accent) / 0.2) 0%, transparent 40%)`
          }}
        />

        <div className="relative z-10 text-center px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div 
              className="p-5 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                boxShadow: `0 0 60px hsl(var(--beauty-primary) / 0.4)`
              }}
            >
              <Flower2 className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
            style={{ 
              color: "hsl(var(--beauty-dark))",
              fontFamily: "'Georgia', serif"
            }}
          >
            Blush & Bloom
          </h1>
          <p 
            className="text-xl md:text-2xl mb-4 tracking-wide"
            style={{ color: "hsl(var(--beauty-primary))" }}
          >
            Nails • Lashes • Beauty
          </p>
          <p 
            className="text-lg mb-12 max-w-xl mx-auto"
            style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}
          >
            Where beauty meets artistry. Treat yourself to the glow you deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-semibold text-white"
              style={{
                background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                boxShadow: `0 10px 40px hsl(var(--beauty-primary) / 0.3)`
              }}
            >
              Book Appointment <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              style={{ 
                borderColor: "hsl(var(--beauty-primary))", 
                color: "hsl(var(--beauty-primary))" 
              }}
            >
              View Services
            </Button>
          </div>

          {/* Social proof */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-current" 
                    style={{ color: "hsl(var(--beauty-accent))" }} 
                  />
                ))}
              </div>
              <span style={{ color: "hsl(var(--beauty-dark) / 0.7)" }}>500+ 5-Star Reviews</span>
            </div>
            <div className="flex items-center gap-2" style={{ color: "hsl(var(--beauty-dark) / 0.7)" }}>
              <Instagram className="w-5 h-5" style={{ color: "hsl(var(--beauty-primary))" }} />
              <span>@blushandbloom</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-light))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Georgia', serif" }}
            >
              Our Services
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}>
              Expert treatments tailored just for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((category, catIndex) => (
              <div 
                key={category.category}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow animate-scale-in"
                style={{ animationDelay: `${catIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="p-3 rounded-full"
                    style={{ backgroundColor: "hsl(var(--beauty-primary) / 0.1)" }}
                  >
                    <Sparkles className="w-6 h-6" style={{ color: "hsl(var(--beauty-primary))" }} />
                  </div>
                  <h3 
                    className="text-2xl font-bold"
                    style={{ color: "hsl(var(--beauty-dark))" }}
                  >
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {category.items.map((item) => (
                    <div 
                      key={item.name} 
                      className="flex justify-between items-start pb-4 border-b last:border-0"
                      style={{ borderColor: "hsl(var(--beauty-primary) / 0.1)" }}
                    >
                      <div>
                        <h4 
                          className="font-semibold"
                          style={{ color: "hsl(var(--beauty-dark))" }}
                        >
                          {item.name}
                        </h4>
                        <p 
                          className="text-sm flex items-center gap-1"
                          style={{ color: "hsl(var(--beauty-dark) / 0.5)" }}
                        >
                          <Clock className="w-3 h-3" /> {item.duration}
                        </p>
                      </div>
                      <span 
                        className="font-bold text-lg"
                        style={{ color: "hsl(var(--beauty-primary))" }}
                      >
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Georgia', serif" }}
            >
              Our Work
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}>
              Before & after transformations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ 
                    background: `linear-gradient(135deg, hsl(var(--beauty-primary) / ${0.2 + index * 0.05}) 0%, hsl(var(--beauty-accent) / ${0.3 + index * 0.05}) 100%)`
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white/30" />
                </div>
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--beauty-primary) / 0.9)" }}
                >
                  <div className="text-center text-white">
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-sm text-white/80">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed Placeholder */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-light))" }}>
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Instagram className="w-8 h-8" style={{ color: "hsl(var(--beauty-primary))" }} />
              <h2 
                className="text-3xl md:text-4xl font-bold"
                style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Georgia', serif" }}
              >
                Follow Us on Instagram
              </h2>
            </div>
            <p style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}>@blushandbloom</p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 max-w-4xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg overflow-hidden animate-scale-in"
                style={{ 
                  background: `linear-gradient(135deg, hsl(var(--beauty-primary) / ${0.15 + index * 0.05}) 0%, hsl(var(--beauty-accent) / ${0.2 + index * 0.03}) 100%)`,
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Instagram className="w-6 h-6" style={{ color: "hsl(var(--beauty-primary) / 0.3)" }} />
                </div>
              </div>
            ))}
          </div>

          <Button
            className="mt-8 text-white"
            style={{ backgroundColor: "hsl(var(--beauty-primary))" }}
          >
            <Instagram className="mr-2 w-4 h-4" /> Follow @blushandbloom
          </Button>
        </div>
      </section>

      {/* Booking CTA */}
      <section 
        className="py-24"
        style={{ background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Georgia', serif" }}>
            Ready to Glow?
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-xl mx-auto">
            Book your appointment today and let us bring out your natural beauty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-semibold bg-white hover:bg-white/90"
              style={{ color: "hsl(var(--beauty-primary))" }}
            >
              Book Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
            >
              <Phone className="mr-2 w-5 h-5" /> (555) 456-7890
            </Button>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--beauty-primary))" />

      {/* Back to Portfolio */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--beauty-bg))" }}>
        <div className="container mx-auto px-4 text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            style={{ borderColor: "hsl(var(--beauty-primary))", color: "hsl(var(--beauty-primary))" }}
          >
            <Link to="/portfolio">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BeautySalon;