import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Shield, Clock, Phone, Star, Sprout, TreePine, Scissors, Flower2, Users } from "lucide-react";
import { DemoPageCTA } from "@/components/DemoPageHeader";

const Tradesman = () => {
  const services = [
    { icon: Scissors, name: "Lawn Care", description: "Mowing, edging, fertilization & weed control", price: "From $55" },
    { icon: TreePine, name: "Tree & Shrub Care", description: "Pruning, trimming, removal & health treatments", price: "From $120" },
    { icon: Flower2, name: "Garden Design", description: "Planting, flower beds, mulching & seasonal color", price: "From $200" },
    { icon: Sprout, name: "Landscape Install", description: "Sod, irrigation, pathways & hardscaping", price: "Custom Quote" },
  ];

  const trustBadges = [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Clock, label: "Weekly Service Plans" },
    { icon: Star, label: "5-Star Rated" },
    { icon: Users, label: "15+ Years Experience" },
  ];

  const testimonials = [
    { name: "Mike R.", text: "My yard has never looked better. Reliable weekly service and great attention to detail.", rating: 5 },
    { name: "Sarah L.", text: "They redesigned our front garden and it's stunning. Truly transformed the curb appeal.", rating: 5 },
    { name: "John D.", text: "Honest pricing, on time every visit, and the crew is always friendly. Highly recommend.", rating: 5 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&q=80&auto=format&fit=crop")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ backgroundColor: "hsl(var(--tradesman-primary) / 0.1)", color: "hsl(var(--tradesman-primary))" }}
            >
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-semibold">Licensed & Insured Landscapers</span>
            </div>

            <h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              style={{ color: "hsl(var(--tradesman-dark))", fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
            >
              Your Yard,
              <span style={{ color: "hsl(var(--tradesman-primary))" }}> Beautifully </span>
              Transformed
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto" style={{ color: "hsl(var(--tradesman-dark) / 0.7)" }}>
              Professional lawn care, garden design & landscape installation. Free quotes within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 font-bold text-white"
                style={{ backgroundColor: "hsl(var(--tradesman-primary))" }}
              >
                <Phone className="mr-2 w-5 h-5" /> Call Now: (555) 987-6543
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6"
                style={{ borderColor: "hsl(var(--tradesman-primary))", color: "hsl(var(--tradesman-primary))" }}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12" style={{ backgroundColor: "hsl(var(--tradesman-primary))" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 text-white animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <badge.icon className="w-8 h-8" />
                <span className="font-semibold text-lg">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--tradesman-dark))", fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
              Our Services
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--tradesman-dark) / 0.6)" }}>
              Complete outdoor care for residential and commercial properties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="group p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: "hsl(var(--tradesman-primary) / 0.1)" }}>
                    <service.icon className="w-8 h-8" style={{ color: "hsl(var(--tradesman-primary))" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold" style={{ color: "hsl(var(--tradesman-dark))" }}>
                        {service.name}
                      </h3>
                      <span className="font-bold text-lg" style={{ color: "hsl(var(--tradesman-primary))" }}>
                        {service.price}
                      </span>
                    </div>
                    <p style={{ color: "hsl(var(--tradesman-dark) / 0.6)" }}>{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--tradesman-light))" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--tradesman-dark))", fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                Request a Free Quote
              </h2>
              <p className="text-xl" style={{ color: "hsl(var(--tradesman-dark) / 0.6)" }}>
                Tell us about your property and we'll respond within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-scale-in">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--tradesman-dark))" }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                      style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--tradesman-dark))" }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                      style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--tradesman-dark))" }}>
                    Service Needed
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                  >
                    <option>Select a service...</option>
                    <option>Lawn Care</option>
                    <option>Tree & Shrub Care</option>
                    <option>Garden Design</option>
                    <option>Landscape Installation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color: "hsl(var(--tradesman-dark))" }}>
                    Tell Us About Your Project
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none min-h-[120px]"
                    style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                    placeholder="Describe your yard, goals, and any specific ideas..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full py-6 text-lg font-bold text-white"
                  style={{ backgroundColor: "hsl(var(--tradesman-primary))" }}
                >
                  Get Free Quote
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--tradesman-dark))", fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
              What Our Customers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" style={{ color: "hsl(45 93% 47%)" }} />
                  ))}
                </div>
                <p className="text-lg mb-6 leading-relaxed" style={{ color: "hsl(var(--tradesman-dark) / 0.7)" }}>
                  "{testimonial.text}"
                </p>
                <p className="font-bold" style={{ color: "hsl(var(--tradesman-dark))" }}>
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal CTA */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--tradesman-primary))" }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white">
            <Leaf className="w-12 h-12" />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">Seasonal Cleanup & Maintenance Plans</h3>
              <p className="text-white/80">Book your spring or fall service today</p>
            </div>
            <Button size="lg" className="bg-white font-bold text-lg px-8" style={{ color: "hsl(var(--tradesman-primary))" }}>
              (555) 987-6543
            </Button>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--tradesman-primary))" />

      {/* Back to Portfolio */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
        <div className="container mx-auto px-4 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            style={{ borderColor: "hsl(var(--tradesman-primary))", color: "hsl(var(--tradesman-primary))" }}
          >
            <Link to="/portfolio">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tradesman;
