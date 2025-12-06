import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wrench, Shield, Clock, Phone, Star, CheckCircle, Zap, Droplets, Hammer, Users } from "lucide-react";
import { DemoPageCTA } from "@/components/DemoPageHeader";

const Tradesman = () => {
  const services = [
    { icon: Droplets, name: "Plumbing", description: "Leak repairs, installations, drain cleaning & more", price: "From $75" },
    { icon: Zap, name: "Electrical", description: "Wiring, outlets, panel upgrades & lighting", price: "From $85" },
    { icon: Hammer, name: "General Repairs", description: "Drywall, doors, fixtures & handyman services", price: "From $65" },
    { icon: Wrench, name: "Appliance Install", description: "Dishwashers, disposals, water heaters", price: "From $95" },
  ];

  const trustBadges = [
    { icon: Shield, label: "Licensed & Insured" },
    { icon: Clock, label: "Same Day Service" },
    { icon: Star, label: "5-Star Rated" },
    { icon: Users, label: "20+ Years Experience" },
  ];

  const testimonials = [
    { name: "Mike R.", text: "Fast, professional, and fair pricing. Fixed my leak in under an hour!", rating: 5 },
    { name: "Sarah L.", text: "Best electrician in town. Very clean and explained everything clearly.", rating: 5 },
    { name: "John D.", text: "Called for emergency plumbing at 9pm. They came within 30 minutes!", rating: 5 },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative py-32 overflow-hidden" style={{ backgroundColor: "hsl(var(--tradesman-bg))" }}>
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L30 60M0 30L60 30' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E")`
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ backgroundColor: "hsl(var(--tradesman-primary) / 0.1)", color: "hsl(var(--tradesman-primary))" }}
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Licensed & Insured Professionals</span>
            </div>
            
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
              style={{ color: "hsl(var(--tradesman-dark))" }}
            >
              Your Local
              <span style={{ color: "hsl(var(--tradesman-primary))" }}> Trusted </span>
              Tradesman
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-tradesman-dark/70 max-w-2xl mx-auto">
              Quality plumbing, electrical & handyman services. Available 24/7 for emergencies.
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
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--tradesman-dark))" }}
            >
              Our Services
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--tradesman-dark) / 0.6)" }}>
              Professional solutions for all your home repair needs
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
                  <div 
                    className="p-4 rounded-xl"
                    style={{ backgroundColor: "hsl(var(--tradesman-primary) / 0.1)" }}
                  >
                    <service.icon className="w-8 h-8" style={{ color: "hsl(var(--tradesman-primary))" }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 
                        className="text-2xl font-bold"
                        style={{ color: "hsl(var(--tradesman-dark))" }}
                      >
                        {service.name}
                      </h3>
                      <span 
                        className="font-bold text-lg"
                        style={{ color: "hsl(var(--tradesman-primary))" }}
                      >
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
              <h2 
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ color: "hsl(var(--tradesman-dark))" }}
              >
                Request a Free Quote
              </h2>
              <p className="text-xl" style={{ color: "hsl(var(--tradesman-dark) / 0.6)" }}>
                Tell us about your project and we'll get back to you within 2 hours
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl animate-scale-in">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "hsl(var(--tradesman-dark))" }}
                    >
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
                    <label 
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "hsl(var(--tradesman-dark))" }}
                    >
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
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "hsl(var(--tradesman-dark))" }}
                  >
                    Service Needed
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none"
                    style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                  >
                    <option>Select a service...</option>
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>General Repairs</option>
                    <option>Appliance Installation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label 
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "hsl(var(--tradesman-dark))" }}
                  >
                    Describe Your Problem
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border-2 transition-colors focus:outline-none min-h-[120px]"
                    style={{ borderColor: "hsl(var(--tradesman-primary) / 0.2)" }}
                    placeholder="Tell us what you need help with..."
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
            <h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--tradesman-dark))" }}
            >
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
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: "hsl(45 93% 47%)" }} 
                    />
                  ))}
                </div>
                <p 
                  className="text-lg mb-6 leading-relaxed"
                  style={{ color: "hsl(var(--tradesman-dark) / 0.7)" }}
                >
                  "{testimonial.text}"
                </p>
                <p 
                  className="font-bold"
                  style={{ color: "hsl(var(--tradesman-dark))" }}
                >
                  — {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--tradesman-primary))" }}>
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white">
            <Phone className="w-12 h-12" />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold">24/7 Emergency Service Available</h3>
              <p className="text-white/80">Call now for immediate assistance</p>
            </div>
            <Button
              size="lg"
              className="bg-white font-bold text-lg px-8"
              style={{ color: "hsl(var(--tradesman-primary))" }}
            >
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