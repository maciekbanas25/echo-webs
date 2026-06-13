import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Mail, ExternalLink } from "lucide-react";

const ContactPage = () => {
  const location = useLocation();
  // Prefill from the homepage "Build Your Quote" handoff, if present.
  const incoming = location.state as
    | { services?: string[]; projectDetails?: string }
    | null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to start your project? Fill out the form below or reach out directly.
              I'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Contact Form (shared component) */}
            <ContactForm
              initialServices={incoming?.services}
              initialProjectDetails={incoming?.projectDetails}
              className="lg:col-span-2 animate-fade-in"
            />

            {/* Contact Info Sidebar */}
            <div className="space-y-6 animate-fade-in-up">
              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a
                        href="mailto:contact@echowebs.co.uk"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        contact@echowebs.co.uk
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Contact</h3>
                  <div className="space-y-3">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full justify-start border-primary/30 hover:border-primary"
                    >
                      <a href="mailto:contact@echowebs.co.uk" className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        Send an Email
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-gradient-subtle">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
                  <p className="text-muted-foreground text-sm">
                    I typically respond within 24 hours during business days.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
