import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

// Validation schema for form fields
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  business: z.string().max(100).optional(),
  email: z.string().email("Please enter a valid email address").max(255),
  serviceType: z.string().min(1, "Please select at least one service"),
  projectDetails: z.string().min(10, "Project details must be at least 10 characters").max(2000),
});

// Selectable services — visitors can pick more than one.
const SERVICES = [
  { id: "starter", label: "Starter Site (Single Page)" },
  { id: "premium", label: "Premium Website (Multi-page)" },
  { id: "ecommerce", label: "E-Commerce Website" },
  { id: "booking", label: "Booking Integration" },
  { id: "redesign", label: "Website Redesign" },
  { id: "other", label: "Not Sure Yet" },
];

interface ContactFormProps {
  /** Pre-selected services handed over from the quote builder. */
  initialServices?: string[];
  /** Pre-filled project details handed over from the quote builder. */
  initialProjectDetails?: string;
  className?: string;
}

/**
 * The full quote/contact form — validation, Supabase edge submission, and the
 * success state — extracted so it can live on /contact AND inside the homepage
 * expandable quote panel without duplicating any logic.
 */
const ContactForm = ({
  initialServices,
  initialProjectDetails,
  className = "",
}: ContactFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketRef, setTicketRef] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initialServices ?? []
  );
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
    projectDetails: initialProjectDetails ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
    if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: "" }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Combine the chosen services into one readable string for storage/email.
      const serviceType = selectedServices
        .map((id) => SERVICES.find((s) => s.id === id)?.label ?? id)
        .join(", ");

      // Validate form data
      const validated = contactSchema.parse({ ...formData, serviceType });

      // Submit to edge function
      const { data, error } = await supabase.functions.invoke("submit-quote", {
        body: {
          name: validated.name,
          email: validated.email,
          business: validated.business || undefined,
          serviceType: validated.serviceType,
          projectDetails: validated.projectDetails,
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to submit quote request");
      }

      // Success - show confirmation
      setTicketRef(data.ticketRef);
      setIsSubmitted(true);

      toast({
        title: "Quote request sent!",
        description: "I'll get back to you within 24 hours.",
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
      } else {
        console.error("Submission error:", error);
        toast({
          title: "Something went wrong",
          description: "Please try again or email me directly.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form to submit another request
  const handleNewRequest = () => {
    setIsSubmitted(false);
    setTicketRef(null);
    setSelectedServices([]);
    setFormData({ name: "", business: "", email: "", projectDetails: "" });
  };

  return (
    <Card className={`border-primary/20 ${className}`}>
      {isSubmitted ? (
        // Success state after form submission
        <CardContent className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Thank You!</h2>
          <p className="text-xl text-muted-foreground mb-6">
            Your request has been submitted successfully.
          </p>

          {ticketRef && (
            <div className="inline-block bg-primary/10 border border-primary/20 rounded-lg px-6 py-4 mb-8">
              <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
              <p className="text-2xl font-mono font-bold text-primary">{ticketRef}</p>
            </div>
          )}

          <p className="text-muted-foreground mb-8">
            I'll get back to you within 24 hours.
          </p>

          <Button
            onClick={handleNewRequest}
            variant="outline"
            className="border-primary/30 hover:border-primary"
          >
            Submit Another Request
          </Button>
        </CardContent>
      ) : (
        // Form state
        <>
          <CardHeader>
            <h2 className="text-2xl font-bold text-foreground">Send a Message</h2>
            <p className="text-muted-foreground">
              Tell me about your project and I'll provide a free quote.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name field - required */}
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

                {/* Business name - optional */}
                <div className="space-y-2">
                  <Label htmlFor="business">
                    Business Name <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    placeholder="Your Business Ltd"
                  />
                </div>
              </div>

              {/* Email field - required */}
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

              {/* Service type — pick one or more */}
              <div className="space-y-2">
                <Label>
                  Service Type *{" "}
                  <span className="font-normal text-muted-foreground">
                    (select all that apply)
                  </span>
                </Label>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => {
                    const active = selectedServices.includes(s.id);
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        aria-pressed={active}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          active
                            ? "border-primary bg-primary/10 text-primary shadow-glow"
                            : "border-border bg-card/40 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {s.label}
                      </button>
                    );
                  })}
                </div>
                {errors.serviceType && (
                  <p className="text-sm text-destructive">{errors.serviceType}</p>
                )}
              </div>

              {/* Project details textarea - required */}
              <div className="space-y-2">
                <Label htmlFor="projectDetails">Project Details *</Label>
                <Textarea
                  id="projectDetails"
                  name="projectDetails"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Describe your business, what you're looking for, and any specific features you need..."
                  rows={5}
                  className={errors.projectDetails ? "border-destructive" : ""}
                />
                {errors.projectDetails && (
                  <p className="text-sm text-destructive">{errors.projectDetails}</p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                variant="brand"
                className="w-full shadow-glow hover:shadow-intense transition-all duration-300"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default ContactForm;
