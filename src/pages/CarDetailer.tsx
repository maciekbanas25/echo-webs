import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Car, Sparkles, Shield, Clock, Phone, Star, ChevronRight } from "lucide-react";
import { DemoPageCTA } from "@/components/DemoPageHeader";

const CarDetailer = () => {
  const packages = [
    {
      name: "Basic Wash",
      price: "$49",
      description: "Essential exterior clean",
      features: ["Exterior Hand Wash", "Tire & Wheel Clean", "Window Cleaning", "Air Freshener"],
      popular: false,
    },
    {
      name: "Pro Detail",
      price: "$149",
      description: "Complete interior & exterior",
      features: ["Full Exterior Wash", "Interior Vacuum", "Dashboard & Console Clean", "Leather Conditioning", "Tire Dressing"],
      popular: true,
    },
    {
      name: "Premium Package",
      price: "$299",
      description: "The ultimate treatment",
      features: ["Clay Bar Treatment", "Paint Correction", "Ceramic Coating", "Engine Bay Clean", "Headlight Restoration", "6-Month Protection"],
      popular: false,
    },
  ];

  const gallery = [
    { src: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&auto=format&fit=crop", title: "Sports Car Detail", category: "Exterior" },
    { src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&auto=format&fit=crop", title: "Luxury Interior", category: "Interior" },
    { src: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&auto=format&fit=crop", title: "Classic Restoration", category: "Full Detail" },
    { src: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&auto=format&fit=crop", title: "Paint Correction", category: "Exterior" },
    { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600&q=80&auto=format&fit=crop", title: "Ceramic Coating", category: "Protection" },
    { src: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80&auto=format&fit=crop", title: "Engine Bay Clean", category: "Detail" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--detailer-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 50%, hsl(var(--detailer-accent) / 0.3) 0%, transparent 50%),
                         radial-gradient(circle at 70% 50%, hsl(var(--detailer-primary) / 0.2) 0%, transparent 50%)`
          }}
        />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-6 flex justify-center">
            <div 
              className="p-4 rounded-full"
              style={{ 
                background: `linear-gradient(135deg, hsl(var(--detailer-primary)) 0%, hsl(var(--detailer-accent)) 100%)`,
                boxShadow: `0 0 60px hsl(var(--detailer-accent) / 0.5)`
              }}
            >
              <Car className="w-12 h-12" />
            </div>
          </div>
          <h1 
            className="text-6xl md:text-8xl font-bold mb-6 tracking-tight"
            style={{ textShadow: `0 0 60px hsl(var(--detailer-accent) / 0.5)` }}
          >
            Elite Auto Spa
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-2xl mx-auto">
            Premium car detailing services that bring out the showroom shine in every vehicle
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 font-bold"
              style={{
                background: `linear-gradient(135deg, hsl(var(--detailer-primary)) 0%, hsl(var(--detailer-accent)) 100%)`,
                boxShadow: `0 0 30px hsl(var(--detailer-accent) / 0.4)`
              }}
            >
              Book Now <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2"
              style={{ borderColor: "hsl(var(--detailer-accent))", color: "hsl(var(--detailer-accent))" }}
            >
              View Packages
            </Button>
          </div>
        </div>

        {/* Animated gradient line */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, hsl(var(--detailer-accent)), hsl(var(--detailer-primary)), transparent)` }}
        />
      </section>

      {/* Trust Badges */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--detailer-dark))" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Sparkles, label: "Premium Products", value: "100%" },
              { icon: Shield, label: "Satisfaction", value: "Guaranteed" },
              { icon: Clock, label: "Same Day", value: "Service" },
              { icon: Star, label: "5-Star", value: "Reviews" },
            ].map((item, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <item.icon className="w-10 h-10 mx-auto mb-3" style={{ color: "hsl(var(--detailer-accent))" }} />
                <div className="text-2xl font-bold text-white">{item.value}</div>
                <div className="text-white/60 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Packages */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--detailer-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Packages</h2>
            <p className="text-xl text-white/60">Choose the perfect detail for your vehicle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 animate-scale-in ${
                  pkg.popular ? 'scale-105' : ''
                }`}
                style={{
                  backgroundColor: pkg.popular ? "hsl(var(--detailer-dark))" : "hsl(0 0% 8%)",
                  borderColor: pkg.popular ? "hsl(var(--detailer-accent))" : "hsl(0 0% 20%)",
                  animationDelay: `${index * 0.1}s`,
                  boxShadow: pkg.popular ? `0 0 40px hsl(var(--detailer-accent) / 0.3)` : 'none'
                }}
              >
                {pkg.popular && (
                  <div 
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-black"
                    style={{ background: `linear-gradient(135deg, hsl(var(--detailer-primary)) 0%, hsl(var(--detailer-accent)) 100%)` }}
                  >
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-white/60 mb-4">{pkg.description}</p>
                <div className="mb-6">
                  <span 
                    className="text-5xl font-bold"
                    style={{ color: "hsl(var(--detailer-accent))" }}
                  >
                    {pkg.price}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/80">
                      <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--detailer-accent))" }} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full py-6 font-bold"
                  style={{
                    background: pkg.popular 
                      ? `linear-gradient(135deg, hsl(var(--detailer-primary)) 0%, hsl(var(--detailer-accent)) 100%)`
                      : 'transparent',
                    border: pkg.popular ? 'none' : '2px solid hsl(var(--detailer-accent))',
                    color: pkg.popular ? 'black' : 'hsl(var(--detailer-accent))'
                  }}
                >
                  Book Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--detailer-dark))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">The Transformation</h2>
            <p className="text-xl text-white/60">See the difference our detail makes</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div
              className="relative aspect-video rounded-2xl overflow-hidden border-2"
              style={{ borderColor: "hsl(0 0% 30%)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1542362567-b07e54358753?w=900&q=80&auto=format&fit=crop"
                alt="Before detailing"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-black/80 text-white text-sm font-bold px-3 py-1 rounded uppercase tracking-wider">Before</span>
              </div>
            </div>
            <div
              className="relative aspect-video rounded-2xl overflow-hidden border-2"
              style={{ borderColor: "hsl(var(--detailer-accent))" }}
            >
              <img
                src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900&q=80&auto=format&fit=crop"
                alt="After detailing"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="text-sm font-bold px-3 py-1 rounded uppercase tracking-wider" style={{ backgroundColor: "hsl(var(--detailer-accent))", color: "black" }}>After</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--detailer-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Work</h2>
            <p className="text-xl text-white/60">Browse our portfolio of transformations</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {gallery.map((item, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="text-sm" style={{ color: "hsl(var(--detailer-accent))" }}>{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--detailer-dark))" }}>
        <div className="container mx-auto px-4 text-center">
          <div 
            className="max-w-3xl mx-auto p-12 rounded-3xl animate-fade-in"
            style={{ 
              background: `linear-gradient(135deg, hsl(0 0% 10%) 0%, hsl(0 0% 5%) 100%)`,
              border: `2px solid hsl(var(--detailer-accent) / 0.3)`
            }}
          >
            <Phone className="w-16 h-16 mx-auto mb-6" style={{ color: "hsl(var(--detailer-accent))" }} />
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Shine?</h2>
            <p className="text-xl text-white/70 mb-8">Book your appointment today and experience the difference</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-bold"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--detailer-primary)) 0%, hsl(var(--detailer-accent)) 100%)`
                }}
              >
                <Phone className="mr-2 w-5 h-5" /> Call (555) 123-4567
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                style={{ borderColor: "hsl(var(--detailer-accent))", color: "hsl(var(--detailer-accent))" }}
              >
                Book Online
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--detailer-accent))" />

      {/* Back to Portfolio */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--detailer-bg))" }}>
        <div className="container mx-auto px-4 text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            style={{ borderColor: "hsl(var(--detailer-accent))", color: "hsl(var(--detailer-accent))" }}
          >
            <Link to="/portfolio">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CarDetailer;