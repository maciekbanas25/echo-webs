import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import photographerHero from "@/assets/photographer-hero.jpg";
import { Camera, Heart, Sparkles } from "lucide-react";

const Photographer = () => {
  const services = [
    {
      name: "Portrait Sessions",
      description: "Personal and professional headshots that capture your essence",
      icon: "👤"
    },
    {
      name: "Wedding Photography",
      description: "Your special day preserved in timeless, elegant images",
      icon: "💍"
    },
    {
      name: "Event Coverage",
      description: "Corporate events, parties, and celebrations documented beautifully",
      icon: "🎉"
    },
    {
      name: "Product Photography",
      description: "Showcase your products with stunning commercial imagery",
      icon: "📦"
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--photographer-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${photographerHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-photographer-bg/90" />

        <div className="relative z-10 text-center px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-6">
            <Camera className="w-16 h-16 mx-auto text-photographer-primary" strokeWidth={1.5} />
          </div>
          <h1 className="text-7xl md:text-8xl font-light mb-6 tracking-wide text-photographer-dark">
            Sarah Chen
          </h1>
          <p className="text-3xl md:text-4xl mb-12 font-light tracking-widest text-photographer-primary italic">
            Photography
          </p>
          <p className="text-xl text-photographer-dark/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            Capturing moments that last forever
          </p>
          <Button
            size="lg"
            className="text-lg px-10 py-6 rounded-full font-light tracking-wider"
            style={{
              backgroundColor: "hsl(var(--photographer-primary))",
              color: "white"
            }}
          >
            View Portfolio
          </Button>
        </div>
      </section>

      {/* About */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-photographer-primary" />
              <h2 className="text-5xl font-light mb-2 text-photographer-dark tracking-wide">About Sarah</h2>
              <Sparkles className="w-6 h-6 text-photographer-primary" />
            </div>
            <div className="w-24 h-1 mx-auto mb-8 bg-photographer-secondary" />
            <p className="text-xl text-photographer-dark/70 leading-relaxed mb-8 font-light">
              With over a decade of experience in portrait and wedding photography, I specialize
              in creating authentic, emotive images that tell your unique story. My approach combines
              artistic vision with technical precision to deliver photographs you'll treasure forever.
            </p>
            <p className="text-lg text-photographer-dark/60 leading-relaxed font-light italic">
              Based in the heart of the city, available for local and destination shoots.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--photographer-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-light mb-4 text-photographer-dark tracking-wide">Services</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-photographer-primary" />
            <p className="text-xl text-photographer-dark/60 font-light italic">Professional photography for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.name}
                className="bg-white p-12 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-6 text-center">{service.icon}</div>
                <h3 className="text-3xl font-light mb-4 text-photographer-primary text-center tracking-wide">
                  {service.name}
                </h3>
                <div className="w-16 h-0.5 mx-auto mb-4 bg-photographer-secondary" />
                <p className="text-photographer-dark/70 leading-relaxed text-center font-light">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl font-light mb-4 text-photographer-dark tracking-wide">Recent Work</h2>
            <div className="w-24 h-1 mx-auto mb-6 bg-photographer-primary" />
            <p className="text-xl text-photographer-dark/60 font-light italic">A glimpse of my latest projects</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-gradient-to-br from-photographer-primary/20 to-photographer-secondary/20 rounded-2xl animate-scale-in hover:scale-105 transition-transform duration-500 cursor-pointer relative overflow-hidden group"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="absolute inset-0 bg-photographer-primary/0 group-hover:bg-photographer-primary/20 transition-colors duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--photographer-bg))" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16 animate-fade-in">
            <Heart className="w-12 h-12 mx-auto mb-4 text-photographer-primary" />
            <h2 className="text-5xl font-light mb-4 text-photographer-dark tracking-wide">Client Love</h2>
            <div className="w-24 h-1 mx-auto bg-photographer-primary" />
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-12 rounded-3xl shadow-lg animate-fade-in-up">
              <p className="text-photographer-dark/70 italic mb-6 text-lg leading-relaxed font-light">
                "Sarah captured our wedding day perfectly. Every photo tells a story and brings back
                the emotions of that special day. We couldn't be happier!"
              </p>
              <div className="w-16 h-0.5 bg-photographer-primary mb-4" />
              <p className="font-light text-photographer-dark">— Emily & James</p>
            </div>

            <div className="bg-white p-12 rounded-3xl shadow-lg animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <p className="text-photographer-dark/70 italic mb-6 text-lg leading-relaxed font-light">
                "Professional, creative, and incredibly talented. Sarah's portraits exceeded all
                expectations. Highly recommend!"
              </p>
              <div className="w-16 h-0.5 bg-photographer-primary mb-4" />
              <p className="font-light text-photographer-dark">— Michael Rodriguez</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-photographer-primary" />
            <h2 className="text-6xl font-light mb-8 text-photographer-dark tracking-wide">Let's Create Together</h2>
            <div className="w-32 h-1 mx-auto mb-8 bg-photographer-primary" />
            <p className="text-xl text-photographer-dark/70 mb-12 leading-relaxed font-light">
              Ready to book your session? Get in touch to discuss your vision and check availability.
            </p>
            <Button
              size="lg"
              className="text-lg px-12 py-6 rounded-full font-light tracking-wider"
              style={{
                backgroundColor: "hsl(var(--photographer-primary))",
                color: "white"
              }}
            >
              Book a Session
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Portfolio */}
      <section className="py-16" style={{ backgroundColor: "hsl(var(--photographer-bg))" }}>
        <div className="container mx-auto px-4 text-center">
          <Button asChild variant="outline" size="lg" className="border-photographer-primary text-photographer-primary hover:bg-photographer-primary hover:text-white rounded-full font-light">
            <Link to="/">← Back to Portfolio</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Photographer;
