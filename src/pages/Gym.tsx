import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { DemoPageCTA, DemoPageBackButton } from "@/components/DemoPageHeader";
const gymHero = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop";
import { Dumbbell, Zap, TrendingUp, Users } from "lucide-react";

const Gym = () => {
  const classes = [
    { name: "HIIT Training", time: "Mon, Wed, Fri - 6:00 AM", intensity: "High" },
    { name: "Yoga Flow", time: "Tue, Thu - 7:00 AM", intensity: "Medium" },
    { name: "Strength & Conditioning", time: "Mon, Wed, Fri - 5:30 PM", intensity: "High" },
    { name: "Spin Class", time: "Tue, Thu - 6:00 PM", intensity: "High" },
    { name: "Boxing Bootcamp", time: "Sat - 9:00 AM", intensity: "Extreme" },
    { name: "Pilates Core", time: "Sat - 10:30 AM", intensity: "Medium" },
  ];

  const memberships = [
    {
      name: "Basic",
      price: "$29",
      period: "/mo",
      features: ["Gym Access", "Locker Room", "Free Weights"],
      popular: false
    },
    {
      name: "Pro",
      price: "$49",
      period: "/mo",
      features: ["All Basic Features", "Group Classes", "Cardio Equipment"],
      popular: true
    },
    {
      name: "Elite",
      price: "$79",
      period: "/mo",
      features: ["All Pro Features", "Personal Training", "Nutrition Plan"],
      popular: false
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--gym-bg))" }}>
      <Navigation />

      {/* Hero */}
      <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${gymHero})` }}
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, hsl(var(--gym-primary) / 0.9) 0%, hsl(var(--gym-bg) / 0.95) 100%)`
        }} />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "hsl(var(--gym-primary))" }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: "hsl(var(--gym-accent))" }} />
        </div>

        <div className="relative z-10 text-center text-white px-4 animate-fade-in max-w-6xl mx-auto">
          <div className="mb-6">
            <Dumbbell className="w-24 h-24 mx-auto text-gym-accent animate-pulse" />
          </div>
          <h1 className="text-8xl md:text-9xl font-black mb-6 tracking-tighter uppercase"
            style={{ textShadow: `4px 4px 0 hsl(var(--gym-primary))` }}>
            FitCore
          </h1>
          <p className="text-3xl md:text-4xl mb-12 font-bold tracking-wide uppercase text-gym-accent">
            Transform • Elevate • Dominate
          </p>
          <Button
            size="lg"
            className="text-xl px-12 py-8 font-black uppercase tracking-wider transform hover:scale-110 transition-transform"
            style={{
              backgroundColor: "hsl(var(--gym-accent))",
              color: "black",
              boxShadow: `0 10px 40px hsl(var(--gym-accent) / 0.5)`
            }}
          >
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-20" style={{ backgroundColor: "hsl(var(--gym-primary))" }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, label: "Members", value: "2,500+" },
              { icon: Dumbbell, label: "Equipment", value: "150+" },
              { icon: TrendingUp, label: "Success Rate", value: "95%" },
              { icon: Zap, label: "Classes/Week", value: "60+" },
            ].map((stat, i) => (
              <div key={i} className="text-center text-white animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <stat.icon className="w-12 h-12 mx-auto mb-3" />
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-lg uppercase tracking-wider opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--gym-bg))" }}>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center animate-fade-in-up">
            <h2 className="text-6xl font-black mb-8 text-white uppercase tracking-tighter">
              Your Fitness Journey Starts Here
            </h2>
            <p className="text-2xl text-white/80 leading-relaxed">
              FitCore Gym is more than just a place to work out—it's a community dedicated to
              helping you achieve your fitness goals. With state-of-the-art equipment, expert trainers,
              and motivating group classes, we're here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--gym-bg) / 0.5)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-6xl font-black mb-4 text-white uppercase tracking-tighter">Class Schedule</h2>
            <p className="text-2xl text-white/70 uppercase tracking-wider">Find your perfect workout</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {classes.map((cls, index) => (
              <div
                key={cls.name}
                className="p-8 rounded-none border-l-8 transition-all duration-300 hover:translate-x-2 animate-scale-in"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  borderColor: "hsl(var(--gym-primary))",
                  animationDelay: `${index * 0.05}s`
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{cls.name}</h3>
                  <span
                    className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: "hsl(var(--gym-accent))",
                      color: "black"
                    }}
                  >
                    {cls.intensity}
                  </span>
                </div>
                <p className="text-white/70 text-lg">{cls.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="py-32" style={{ backgroundColor: "hsl(var(--gym-bg))" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-6xl font-black mb-4 text-white uppercase tracking-tighter">Membership Plans</h2>
            <p className="text-2xl text-white/70 uppercase tracking-wider">Choose your path to greatness</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {memberships.map((plan, index) => (
              <div
                key={plan.name}
                className={`p-10 rounded-none border-4 transition-all duration-300 hover:-translate-y-4 animate-scale-in relative overflow-hidden ${
                  plan.popular ? 'transform scale-105' : ''
                }`}
                style={{
                  backgroundColor: plan.popular ? "hsl(var(--gym-primary))" : "rgba(0, 0, 0, 0.6)",
                  borderColor: plan.popular ? "hsl(var(--gym-accent))" : "hsl(var(--gym-primary))",
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute top-4 right-4 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider"
                    style={{
                      backgroundColor: "hsl(var(--gym-accent))",
                      color: "black"
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl font-black mb-4 text-white uppercase tracking-tight">{plan.name}</h3>
                <div className="mb-8">
                  <span className="text-6xl font-black text-gym-accent">{plan.price}</span>
                  <span className="text-2xl text-white/80">{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white text-lg">
                      <Zap className="w-5 h-5 text-gym-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full py-6 font-black text-lg uppercase tracking-wider"
                  style={{
                    backgroundColor: plan.popular ? "black" : "hsl(var(--gym-accent))",
                    color: plan.popular ? "hsl(var(--gym-accent))" : "black"
                  }}
                >
                  Join Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0" style={{
          background: `linear-gradient(135deg, hsl(var(--gym-primary)) 0%, hsl(var(--gym-accent)) 100%)`
        }} />
        <div className="container mx-auto px-4 text-center text-black relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-7xl font-black mb-8 uppercase tracking-tighter">Ready to Transform?</h2>
            <p className="text-3xl mb-12 font-bold">
              Join FitCore today and get your first week free. No commitment required.
            </p>
            <Button
              size="lg"
              className="text-2xl px-16 py-8 font-black uppercase tracking-wider transform hover:scale-110 transition-transform"
              style={{
                backgroundColor: "black",
                color: "hsl(var(--gym-accent))"
              }}
            >
              Claim Free Trial
            </Button>
          </div>
        </div>
      </section>

      {/* Demo CTA */}
      <DemoPageCTA primaryColor="hsl(var(--gym-accent))" />

      {/* Back to Portfolio */}
      <DemoPageBackButton primaryColor="hsl(var(--gym-accent))" />

      <Footer />
    </div>
  );
};

export default Gym;
