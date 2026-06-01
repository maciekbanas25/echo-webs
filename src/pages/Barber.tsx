import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";
const barberHero = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80&auto=format&fit=crop";
import { Scissors, Clock, MapPin, Star } from "lucide-react";

const Barber = () => {
  const services = [
    { name: "Classic Cut", price: "$35", description: "Traditional barbering at its finest", icon: "✂️" },
    { name: "Beard Trim", price: "$20", description: "Shape and style your facial hair", icon: "🪒" },
    { name: "Hot Towel Shave", price: "$40", description: "The ultimate grooming experience", icon: "🔥" },
    { name: "Cut & Beard Combo", price: "$50", description: "Complete transformation package", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--barber-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${barberHero})` }}
        />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, hsl(var(--barber-primary) / 0.2) 0%, transparent 100%)`
        }} />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-6">
            <Scissors className="w-20 h-20 mx-auto text-barber-primary" />
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-6 tracking-tighter" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.05em",
            textShadow: `0 0 60px hsl(var(--barber-primary) / 0.5)`
          }}>
            Sharp Cuts
          </h1>
          <p className="text-2xl md:text-3xl mb-12 tracking-widest uppercase text-barber-primary font-light">
            Where tradition meets modern style
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-7 font-bold tracking-wider"
            style={{
              backgroundColor: "hsl(var(--barber-primary))",
              color: "hsl(var(--barber-bg))",
              boxShadow: `0 0 40px hsl(var(--barber-primary) / 0.5)`
            }}
          >
            BOOK APPOINTMENT
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(180deg, hsl(var(--barber-bg)) 0%, hsl(var(--barber-dark)) 100%)`
        }} />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Star className="w-6 h-6 text-barber-primary fill-barber-primary" />
              <Star className="w-6 h-6 text-barber-primary fill-barber-primary" />
              <Star className="w-6 h-6 text-barber-primary fill-barber-primary" />
            </div>
            <h2 className="text-5xl font-bold mb-8 text-white uppercase tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Master Barbers</h2>
            <p className="text-xl text-white/70 leading-relaxed">
              With over 20 years of combined experience, our team of master barbers delivers
              precision cuts and classic grooming services. We combine time-honored techniques
              with contemporary styles to give you the look you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--barber-dark))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-barber-primary uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Our Services</h2>
            <p className="text-xl text-white/60 uppercase tracking-wider">Premium grooming for the modern gentleman</p>
          </div>

          <div className="max-w-4xl mx-auto" style={{ borderTop: "1px solid hsl(var(--barber-primary) / 0.3)" }}>
            {services.map((service, index) => (
              <div
                key={service.name}
                className="group flex items-center justify-between py-8 border-b transition-all duration-300 cursor-pointer hover:px-4"
                style={{ borderColor: "hsl(var(--barber-primary) / 0.3)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--barber-primary))";
                  e.currentTarget.style.backgroundColor = "hsl(var(--barber-primary) / 0.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "hsl(var(--barber-primary) / 0.3)";
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div className="flex items-center gap-8">
                  <span className="text-2xl">{service.icon}</span>
                  <div>
                    <h3
                      className="text-4xl md:text-5xl font-bold text-white uppercase transition-colors group-hover:text-barber-primary"
                      style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}
                    >
                      {service.name}
                    </h3>
                    <p className="text-white/50 mt-1 text-sm uppercase tracking-widest">{service.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className="text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: "'Bebas Neue', sans-serif", color: "hsl(var(--barber-primary))", letterSpacing: "0.05em" }}
                  >
                    {service.price}
                  </span>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Starting from</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Contact */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--barber-bg))" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20 text-white">
            <div className="animate-fade-in text-center md:text-left">
              <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                <Clock className="w-10 h-10 text-barber-primary" />
                <h3 className="text-4xl font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Hours</h3>
              </div>
              <div className="space-y-4 text-lg">
                <p className="flex justify-between md:justify-start md:gap-6">
                  <span className="font-bold uppercase tracking-wider text-barber-primary">Tue - Fri:</span>
                  <span className="text-white/80">9am - 7pm</span>
                </p>
                <p className="flex justify-between md:justify-start md:gap-6">
                  <span className="font-bold uppercase tracking-wider text-barber-primary">Saturday:</span>
                  <span className="text-white/80">8am - 6pm</span>
                </p>
                <p className="flex justify-between md:justify-start md:gap-6">
                  <span className="font-bold uppercase tracking-wider text-barber-primary">Sun - Mon:</span>
                  <span className="text-white/80">Closed</span>
                </p>
              </div>
            </div>

            <div className="animate-fade-in-up text-center md:text-left">
              <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
                <MapPin className="w-10 h-10 text-barber-primary" />
                <h3 className="text-4xl font-bold uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Visit Us</h3>
              </div>
              <p className="text-lg mb-8 text-white/80 leading-relaxed">
                456 Grooming Avenue<br />
                Historic Quarter<br />
                City, State 12345
              </p>
              <Button
                size="lg"
                className="font-bold tracking-wider"
                style={{
                  backgroundColor: "hsl(var(--barber-primary))",
                  color: "hsl(var(--barber-bg))"
                }}
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--barber-primary))" />

      {/* Back to Portfolio */}
      <DemoPageBackButton primaryColor="hsl(var(--barber-primary))" />

      <Footer />
    </div>
  );
};

export default Barber;
