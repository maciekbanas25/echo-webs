import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { servicePlans } from "@/data/services";
import { Check, ArrowRight } from "lucide-react";

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight pb-2 bg-gradient-hero bg-clip-text text-transparent">
              Services & Pricing
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transparent pricing for premium web design. Choose the package that fits your business needs.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
            {servicePlans.map((plan, index) => (
              <Card
                key={plan.id}
                className={`w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] relative overflow-hidden transition-all duration-500 animate-fade-in hover:shadow-glow ${
                  plan.popular 
                    ? "border-primary shadow-glow scale-105 z-10" 
                    : "border-primary/20 hover:border-primary/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-hero py-2 text-center">
                    <span className="text-sm font-semibold text-primary-foreground uppercase tracking-wider">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <CardHeader className={`text-center ${plan.popular ? "pt-14" : "pt-6"} pb-4`}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <plan.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <div className="flex flex-col items-center gap-1">
                    {plan.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                    <div className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                    {plan.originalPrice && (
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                        Limited Launch Offer
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    asChild
                    className={`w-full ${
                      plan.popular 
                        ? "shadow-glow" 
                        : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link to="/contact" className="flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A simple, transparent process from start to launch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: "01", title: "Discovery", description: "We discuss your business, goals, and vision for your website" },
              { step: "02", title: "Design", description: "I create a custom design mockup tailored to your brand" },
              { step: "03", title: "Development", description: "Your site is built with modern, fast, and secure technology" },
              { step: "04", title: "Launch", description: "We go live with your new site and provide support" },
            ].map((item, index) => (
              <div 
                key={item.step} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: "How long does it take to build a website?", a: "Most starter sites are completed within 1-2 weeks. Premium websites typically take 2-4 weeks depending on complexity." },
              { q: "Do I need to provide content?", a: "Ideally, yes! You know your business best. However, I can help with copywriting and source stock images if needed." },
              { q: "What about hosting and domain?", a: "I'll guide you through setting up hosting and your domain. These are separate costs but I'll recommend affordable, reliable options." },
              { q: "Can I update the website myself?", a: "Premium packages include a content management system (CMS) so you can easily update text, images, and more without coding knowledge." },
            ].map((faq, index) => (
              <Card 
                key={index} 
                className="border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and find the perfect solution for your business.
          </p>
          <Button asChild size="lg" className="shadow-glow hover:shadow-intense transition-all duration-300">
            <Link to="/contact" className="flex items-center gap-2">
              Get a Free Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
