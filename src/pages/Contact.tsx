import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare, Send, ExternalLink } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  business: z.string().max(100).optional(),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().max(20).optional(),
  websiteType: z.string().min(1, "Please select a website type"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
});

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    phone: "",
    websiteType: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validated = contactSchema.parse(formData);
      
      // For MVP, create mailto link with form data
      const subject = encodeURIComponent(`New Website Inquiry from ${validated.name}`);
      const body = encodeURIComponent(
        `Name: ${validated.name}\n` +
        `Business: ${validated.business || "Not provided"}\n` +
        `Email: ${validated.email}\n` +
        `Phone: ${validated.phone || "Not provided"}\n` +
        `Website Type: ${validated.websiteType}\n\n` +
        `Message:\n${validated.message}`
      );
      
      window.location.href = `mailto:echowebs25@gmail.com?subject=${subject}&body=${body}`;
      
      toast({
        title: "Opening your email client",
        description: "Your message is ready to send!",
      });

      setFormData({
        name: "",
        business: "",
        email: "",
        phone: "",
        websiteType: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {/* Contact Form */}
            <Card className="lg:col-span-2 border-primary/20 animate-fade-in">
              <CardHeader>
                <h2 className="text-2xl font-bold text-foreground">Send a Message</h2>
                <p className="text-muted-foreground">Tell me about your project and I'll provide a free quote.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={errors.name ? "border-destructive" : ""}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business">Business Name</Label>
                      <Input
                        id="business"
                        name="business"
                        value={formData.business}
                        onChange={handleChange}
                        placeholder="Your Business Ltd"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+44 7123 456789"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="websiteType">What type of website do you need? *</Label>
                    <Select
                      value={formData.websiteType}
                      onValueChange={(value) => {
                        setFormData(prev => ({ ...prev, websiteType: value }));
                        if (errors.websiteType) {
                          setErrors(prev => ({ ...prev, websiteType: "" }));
                        }
                      }}
                    >
                      <SelectTrigger className={errors.websiteType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select a website type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter Site (Single Page)</SelectItem>
                        <SelectItem value="premium">Premium Website (Multi-page)</SelectItem>
                        <SelectItem value="ecommerce">E-Commerce Website</SelectItem>
                        <SelectItem value="redesign">Website Redesign</SelectItem>
                        <SelectItem value="other">Other / Not Sure</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.websiteType && <p className="text-sm text-destructive">{errors.websiteType}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell me about your project *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your business, what you're looking for, and any specific features you need..."
                      rows={5}
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full shadow-glow hover:shadow-intense transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

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
                        href="mailto:echowebs25@gmail.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        echowebs25@gmail.com
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
                      <a 
                        href="mailto:echowebs25@gmail.com" 
                        className="flex items-center gap-3"
                      >
                        <Mail className="w-5 h-5" />
                        Send an Email
                        <ExternalLink className="w-4 h-4 ml-auto" />
                      </a>
                    </Button>
                    <Button 
                      asChild
                      variant="outline" 
                      className="w-full justify-start border-primary/30 hover:border-primary"
                    >
                      <a 
                        href={`https://wa.me/447000000000?text=${encodeURIComponent("Hi! I'm interested in getting a website built by EchoWebs.")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <MessageSquare className="w-5 h-5" />
                        WhatsApp
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
