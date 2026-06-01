import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Clock, Phone, Star, Instagram, ChevronRight, Flower2, CheckCircle, MapPin } from "lucide-react";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";

const isOpenNow = () => {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Sun, 6=Sat
  if (day === 0) return false; // Closed Sunday
  if (day === 6) return hour >= 10 && hour < 17; // Sat 10-5
  return hour >= 9 && hour < 19; // Mon-Fri 9-7
};

const BeautySalon = () => {
  const open = isOpenNow();

  const services = [
    {
      category: "Nails",
      items: [
        { name: "Classic Manicure", price: "£35", duration: "45 min" },
        { name: "Gel Manicure", price: "£55", duration: "60 min" },
        { name: "Nail Art", price: "£15+", duration: "Add-on" },
        { name: "Full Set Acrylics", price: "£75", duration: "90 min" },
      ]
    },
    {
      category: "Lashes",
      items: [
        { name: "Classic Full Set", price: "£150", duration: "2 hrs" },
        { name: "Volume Full Set", price: "£200", duration: "2.5 hrs" },
        { name: "Lash Lift & Tint", price: "£85", duration: "60 min" },
        { name: "Fills (2 weeks)", price: "£65", duration: "60 min" },
      ]
    },
    {
      category: "Beauty",
      items: [
        { name: "Brow Lamination", price: "£75", duration: "60 min" },
        { name: "Brow Tint", price: "£25", duration: "20 min" },
        { name: "Facial Treatment", price: "£95", duration: "60 min" },
        { name: "Makeup Application", price: "£85", duration: "45 min" },
      ]
    },
  ];

  const gallery = [
    { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80&auto=format&fit=crop", title: "Nail Art Design", category: "Nails" },
    { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80&auto=format&fit=crop", title: "Volume Lashes", category: "Lashes" },
    { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80&auto=format&fit=crop", title: "Bridal Makeup", category: "Makeup" },
    { src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=600&q=80&auto=format&fit=crop", title: "Gel Extensions", category: "Nails" },
    { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80&auto=format&fit=crop", title: "Classic Lashes", category: "Lashes" },
    { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80&auto=format&fit=crop", title: "Brow Lamination", category: "Brows" },
  ];

  // Booking widget state
  const bookingDays = [
    { label: "Mon", date: "Jun 2" },
    { label: "Tue", date: "Jun 3" },
    { label: "Wed", date: "Jun 4" },
    { label: "Thu", date: "Jun 5" },
    { label: "Fri", date: "Jun 6" },
    { label: "Sat", date: "Jun 7" },
  ];

  const timeSlots = [
    { time: "9:00 AM", booked: false },
    { time: "10:00 AM", booked: true },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: true },
    { time: "1:00 PM", booked: false },
    { time: "2:00 PM", booked: false },
    { time: "3:00 PM", booked: true },
    { time: "4:00 PM", booked: false },
    { time: "5:00 PM", booked: false },
    { time: "6:00 PM", booked: true },
  ];

  const bookingServices = ["Classic Manicure", "Gel Manicure", "Classic Lashes Full Set", "Volume Lashes Full Set", "Lash Lift & Tint", "Brow Lamination", "Facial Treatment"];

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const canConfirm = selectedDay && selectedTime && selectedService;

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
            className="text-5xl md:text-7xl mb-6"
            style={{
              color: "hsl(var(--beauty-dark))",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              letterSpacing: "0.1em"
            }}
          >
            Blush & Bloom
          </h1>
          <p
            className="text-xl md:text-2xl mb-4 tracking-wide"
            style={{ color: "hsl(var(--beauty-primary))" }}
          >
            Nails · Lashes · Beauty
          </p>

          {/* Live badge */}
          <div className="flex justify-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${
              open
                ? "bg-green-100 border-green-300 text-green-700"
                : "bg-gray-100 border-gray-300 text-gray-500"
            }`}>
              <span className={`w-2 h-2 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
              {open ? "Open Now — Walk-ins Welcome" : "Currently Closed"}
            </div>
          </div>

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
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
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
              style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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

      {/* Interactive Booking Widget */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-bg))" }}>
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12 animate-fade-in">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Book Your Appointment
            </h2>
            <p className="text-xl" style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}>
              Pick your service, date, and time
            </p>
          </div>

          <div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
            style={{ border: `1px solid hsl(var(--beauty-primary) / 0.15)` }}
          >
            {confirmed ? (
              <div className="p-12 text-center">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                  style={{ background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)` }}
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: "hsl(var(--beauty-dark))" }}>
                  Appointment Requested!
                </h3>
                <p className="text-lg mb-1" style={{ color: "hsl(var(--beauty-primary))" }}>{selectedService}</p>
                <p style={{ color: "hsl(var(--beauty-dark) / 0.6)" }}>
                  {selectedDay} at {selectedTime}
                </p>
                <p className="text-sm mt-4 mb-8" style={{ color: "hsl(var(--beauty-dark) / 0.5)" }}>
                  We'll send a confirmation to your number shortly.
                </p>
                <Button
                  onClick={() => { setConfirmed(false); setSelectedDay(null); setSelectedTime(null); setSelectedService(null); }}
                  variant="outline"
                  style={{ borderColor: "hsl(var(--beauty-primary))", color: "hsl(var(--beauty-primary))" }}
                >
                  Book Another
                </Button>
              </div>
            ) : (
              <div className="p-8 space-y-8">
                {/* Service picker */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(var(--beauty-primary))" }}>
                    1. Choose Service
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {bookingServices.map(s => (
                      <button
                        key={s}
                        onClick={() => setSelectedService(s)}
                        className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-2"
                        style={
                          selectedService === s
                            ? {
                                background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                                color: "white",
                                borderColor: "transparent"
                              }
                            : {
                                borderColor: "hsl(var(--beauty-primary) / 0.3)",
                                color: "hsl(var(--beauty-dark))"
                              }
                        }
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Day picker */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(var(--beauty-primary))" }}>
                    2. Pick a Date
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {bookingDays.map(d => (
                      <button
                        key={d.label}
                        onClick={() => { setSelectedDay(`${d.label} ${d.date}`); setSelectedTime(null); }}
                        className="flex flex-col items-center w-16 py-3 rounded-2xl border-2 transition-all duration-200"
                        style={
                          selectedDay === `${d.label} ${d.date}`
                            ? {
                                background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                                color: "white",
                                borderColor: "transparent"
                              }
                            : {
                                borderColor: "hsl(var(--beauty-primary) / 0.2)",
                                color: "hsl(var(--beauty-dark))"
                              }
                        }
                      >
                        <span className="text-xs font-bold">{d.label}</span>
                        <span className="text-xs opacity-75">{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time picker */}
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: "hsl(var(--beauty-primary))" }}>
                    3. Select Time
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        key={slot.time}
                        onClick={() => !slot.booked && setSelectedTime(slot.time)}
                        disabled={slot.booked}
                        className="py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 border-2"
                        style={
                          slot.booked
                            ? { borderColor: "transparent", backgroundColor: "hsl(var(--beauty-dark) / 0.06)", color: "hsl(var(--beauty-dark) / 0.3)", textDecoration: "line-through", cursor: "not-allowed" }
                            : selectedTime === slot.time
                            ? {
                                background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                                color: "white",
                                borderColor: "transparent"
                              }
                            : {
                                borderColor: "hsl(var(--beauty-primary) / 0.2)",
                                color: "hsl(var(--beauty-dark))"
                              }
                        }
                      >
                        {slot.booked ? "Booked" : slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => canConfirm && setConfirmed(true)}
                  disabled={!canConfirm}
                  size="lg"
                  className="w-full py-6 text-lg font-semibold text-white"
                  style={
                    canConfirm
                      ? {
                          background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)`,
                          boxShadow: `0 8px 30px hsl(var(--beauty-primary) / 0.3)`
                        }
                      : { opacity: 0.5 }
                  }
                >
                  Confirm Appointment <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-light))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Cormorant Garamond', Georgia, serif" }}
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
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{ backgroundColor: "hsl(var(--beauty-primary) / 0.85)" }}
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

      {/* Hours & Location */}
      <section className="py-24" style={{ backgroundColor: "hsl(var(--beauty-bg))" }}>
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-7 h-7" style={{ color: "hsl(var(--beauty-primary))" }} />
                <h3 className="text-2xl font-bold" style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Opening Hours</h3>
                <div className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  open ? "border-green-300 text-green-700 bg-green-50" : "border-gray-200 text-gray-500 bg-gray-50"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${open ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
                  {open ? "Open" : "Closed"}
                </div>
              </div>
              <div className="space-y-2 text-base" style={{ color: "hsl(var(--beauty-dark) / 0.7)" }}>
                <p className="flex justify-between"><span className="font-semibold">Mon – Fri</span><span>9:00 am – 7:00 pm</span></p>
                <p className="flex justify-between"><span className="font-semibold">Saturday</span><span>10:00 am – 5:00 pm</span></p>
                <p className="flex justify-between"><span className="font-semibold">Sunday</span><span>Closed</span></p>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-7 h-7" style={{ color: "hsl(var(--beauty-primary))" }} />
                  <h3 className="text-2xl font-bold" style={{ color: "hsl(var(--beauty-dark))", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Location</h3>
                </div>
                <p style={{ color: "hsl(var(--beauty-dark) / 0.7)" }}>
                  32 Carnaby Street<br />
                  Soho, London<br />
                  W1F 9PS
                </p>
                <p className="text-sm mt-2" style={{ color: "hsl(var(--beauty-dark) / 0.5)" }}>
                  Oxford Circus Station — 4 min walk
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: "340px", border: `1px solid hsl(var(--beauty-primary) / 0.2)` }}>
              <iframe
                title="Blush & Bloom – Soho"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-0.145%2C51.511%2C-0.130%2C51.518&layer=mapnik&marker=51.5145%2C-0.1385"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section
        className="py-24"
        style={{ background: `linear-gradient(135deg, hsl(var(--beauty-primary)) 0%, hsl(var(--beauty-accent)) 100%)` }}
      >
        <div className="container mx-auto px-4 text-center text-white">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
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
              <Phone className="mr-2 w-5 h-5" /> 020 7456 7890
            </Button>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA />

      <DemoPageBackButton />

      <Footer />
    </div>
  );
};

export default BeautySalon;
