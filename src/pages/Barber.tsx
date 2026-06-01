import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";
const barberHero = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80&auto=format&fit=crop";
import { Scissors, Clock, MapPin, Star, CheckCircle } from "lucide-react";

const isOpenNow = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Sun, 1=Mon
  if (day === 0 || day === 1) return false;
  if (day === 6) return hour >= 8 && hour < 18; // Sat 8-6
  return hour >= 9 && hour < 19; // Tue-Fri 9-7
};

const Barber = () => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const services = [
    { name: "Classic Cut", price: "$35", description: "Traditional barbering at its finest", icon: "✂️" },
    { name: "Beard Trim", price: "$20", description: "Shape and style your facial hair", icon: "🪒" },
    { name: "Hot Towel Shave", price: "$40", description: "The ultimate grooming experience", icon: "🔥" },
    { name: "Cut & Beard Combo", price: "$50", description: "Complete transformation package", icon: "⭐" },
  ];

  const days = [
    { label: "Tue", date: "15 Jul" },
    { label: "Wed", date: "16 Jul" },
    { label: "Thu", date: "17 Jul" },
    { label: "Fri", date: "18 Jul" },
    { label: "Sat", date: "19 Jul" },
  ];

  const times = ["9:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];
  const bookedSlots: Record<number, string[]> = {
    0: ["10:00", "11:00"],
    1: ["9:00", "14:00"],
    2: [],
    3: ["11:00", "15:00", "16:00"],
    4: ["9:00", "10:00", "11:00", "14:00"],
  };

  const open = isOpenNow();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--barber-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${barberHero})` }} />
        <div className="absolute inset-0 bg-black/80" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, hsl(var(--barber-primary) / 0.2) 0%, transparent 100%)` }} />

        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-5xl mx-auto">
          <div className="mb-6">
            <Scissors className="w-20 h-20 mx-auto text-barber-primary" />
          </div>
          <h1 className="text-7xl md:text-9xl font-bold mb-4 tracking-tighter" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            letterSpacing: "0.05em",
            textShadow: `0 0 60px hsl(var(--barber-primary) / 0.5)`
          }}>
            Sharp Cuts
          </h1>
          {/* Live open/closed badge */}
          <div className="flex justify-center mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${open ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {open ? "Open Now" : "Currently Closed"}
            </span>
          </div>
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
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, hsl(var(--barber-bg)) 0%, hsl(var(--barber-dark)) 100%)` }} />
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 text-barber-primary fill-barber-primary" />)}
            </div>
            <h2 className="text-5xl font-bold mb-8 text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Master Barbers</h2>
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
            {services.map((service) => (
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
                    <h3 className="text-4xl md:text-5xl font-bold text-white uppercase transition-colors group-hover:text-barber-primary" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
                      {service.name}
                    </h3>
                    <p className="text-white/50 mt-1 text-sm uppercase tracking-widest">{service.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif", color: "hsl(var(--barber-primary))", letterSpacing: "0.05em" }}>
                    {service.price}
                  </span>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">Starting from</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Booking Widget */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--barber-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4 text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Book Appointment</h2>
            <p className="text-white/60 uppercase tracking-wider">Select a day and time</p>
          </div>

          {booked ? (
            <div className="max-w-md mx-auto text-center p-10 rounded-2xl border-2 animate-scale-in" style={{ backgroundColor: "hsl(var(--barber-dark))", borderColor: "hsl(var(--barber-primary))" }}>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-barber-primary" />
              <h3 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Appointment Requested!</h3>
              <p className="text-white/70 mb-2">{days[selectedDay!].label} {days[selectedDay!].date} at {selectedTime}</p>
              <p className="text-white/50 text-sm mb-6">We'll confirm via SMS within 30 minutes.</p>
              <Button onClick={() => { setBooked(false); setSelectedDay(null); setSelectedTime(null); }} variant="outline" style={{ borderColor: "hsl(var(--barber-primary))", color: "hsl(var(--barber-primary))" }}>
                Book Another
              </Button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border animate-fade-in" style={{ backgroundColor: "hsl(var(--barber-dark))", borderColor: "hsl(var(--barber-primary) / 0.3)" }}>
              {/* Day picker */}
              <div className="p-6 border-b" style={{ borderColor: "hsl(var(--barber-primary) / 0.2)" }}>
                <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Select Date</p>
                <div className="grid grid-cols-5 gap-2">
                  {days.map((d, i) => (
                    <button
                      key={d.label}
                      onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                      className="flex flex-col items-center py-3 px-2 rounded-xl border-2 transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: selectedDay === i ? "hsl(var(--barber-primary))" : "transparent",
                        borderColor: selectedDay === i ? "hsl(var(--barber-primary))" : "hsl(var(--barber-primary) / 0.2)",
                        color: selectedDay === i ? "hsl(var(--barber-bg))" : "white",
                      }}
                    >
                      <span className="text-xs uppercase tracking-wider opacity-80">{d.label}</span>
                      <span className="text-lg font-bold" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{d.date.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time picker */}
              {selectedDay !== null && (
                <div className="p-6 border-b" style={{ borderColor: "hsl(var(--barber-primary) / 0.2)" }}>
                  <p className="text-white/60 text-xs uppercase tracking-widest mb-4">Select Time</p>
                  <div className="grid grid-cols-4 gap-2">
                    {times.map((t) => {
                      const isBooked = bookedSlots[selectedDay]?.includes(t);
                      const isSelected = selectedTime === t;
                      return (
                        <button
                          key={t}
                          disabled={isBooked}
                          onClick={() => !isBooked && setSelectedTime(t)}
                          className="py-2.5 rounded-lg border text-sm font-semibold transition-all duration-200"
                          style={{
                            backgroundColor: isSelected ? "hsl(var(--barber-primary))" : isBooked ? "transparent" : "hsl(var(--barber-primary) / 0.05)",
                            borderColor: isSelected ? "hsl(var(--barber-primary))" : isBooked ? "hsl(0 0% 25%)" : "hsl(var(--barber-primary) / 0.2)",
                            color: isSelected ? "hsl(var(--barber-bg))" : isBooked ? "hsl(0 0% 35%)" : "white",
                            cursor: isBooked ? "not-allowed" : "pointer",
                            textDecoration: isBooked ? "line-through" : "none",
                          }}
                        >
                          {isBooked ? "Booked" : t}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Confirm */}
              <div className="p-6">
                {selectedDay !== null && selectedTime ? (
                  <Button
                    className="w-full py-6 font-bold tracking-wider text-lg"
                    style={{ backgroundColor: "hsl(var(--barber-primary))", color: "hsl(var(--barber-bg))", fontFamily: "'Bebas Neue', sans-serif" }}
                    onClick={() => setBooked(true)}
                  >
                    Confirm — {days[selectedDay].label} at {selectedTime}
                  </Button>
                ) : (
                  <div className="text-center text-white/30 text-sm py-2">Select a date and time above</div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--barber-dark))" }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="animate-fade-in">
              <div className="flex items-center gap-3 mb-8">
                <Clock className="w-10 h-10 text-barber-primary" />
                <h3 className="text-4xl font-bold uppercase text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Hours</h3>
                <span className={`ml-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${open ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
                  {open ? "Open" : "Closed"}
                </span>
              </div>
              <div className="space-y-4 text-lg">
                {[["Tue – Fri", "9am – 7pm"], ["Saturday", "8am – 6pm"], ["Sun – Mon", "Closed"]].map(([day, hrs]) => (
                  <div key={day} className="flex justify-between border-b pb-3" style={{ borderColor: "hsl(var(--barber-primary) / 0.15)" }}>
                    <span className="font-bold uppercase tracking-wider text-barber-primary text-sm">{day}</span>
                    <span className={hrs === "Closed" ? "text-white/30" : "text-white/80"}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-fade-in-up">
              <div className="flex items-center gap-3 mb-8">
                <MapPin className="w-10 h-10 text-barber-primary" />
                <h3 className="text-4xl font-bold uppercase text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>Find Us</h3>
              </div>
              <p className="text-white/80 mb-6">456 Old Compton Street, Soho, London W1D 4UJ</p>
              {/* Google Maps embed */}
              <div className="rounded-xl overflow-hidden border-2" style={{ borderColor: "hsl(var(--barber-primary) / 0.4)" }}>
                <iframe
                  src="https://maps.google.com/maps?q=Old+Compton+Street+Soho+London&z=15&output=embed"
                  width="100%"
                  height="260"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  title="Sharp Cuts Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <DemoPageCTA />
      <DemoPageBackButton />
      <Footer />
    </div>
  );
};

export default Barber;
