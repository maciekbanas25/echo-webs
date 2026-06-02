import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-10">Last updated: June 2026</p>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <p>
                This Privacy Policy explains how <strong className="text-foreground">EchoWebs</strong>{" "}
                ("we", "us") collects, uses, and protects your personal information when you use
                this website and our quote/contact forms.
              </p>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Information we collect</h2>
                <p>
                  When you submit a quote request or contact us, we collect the information you
                  provide: your name, email address, business name (optional), the services you're
                  interested in, and the project details you describe. We also collect your IP
                  address for basic spam prevention and rate limiting.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">How we use it</h2>
                <p>
                  We use your information solely to respond to your enquiry, prepare a quote, and
                  communicate with you about your project. We do not sell your data, and we do not
                  use it for marketing unless you ask us to.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Where it's stored & who processes it</h2>
                <p>Your information is handled by a small number of trusted service providers:</p>
                <ul className="mt-3 space-y-1.5 list-disc pl-5">
                  <li><strong className="text-foreground">Supabase</strong> — securely stores your submitted enquiries.</li>
                  <li><strong className="text-foreground">Resend</strong> — delivers email notifications and confirmations.</li>
                  <li><strong className="text-foreground">Vercel</strong> — hosts this website.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Data retention</h2>
                <p>
                  We keep enquiry information only as long as needed to handle your request and for
                  our reasonable business records. You can ask us to delete it at any time.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Your rights</h2>
                <p>
                  Under UK GDPR you have the right to access, correct, or request deletion of your
                  personal data, and to object to its processing. To exercise any of these rights,
                  email us at{" "}
                  <a href="mailto:contact@echowebs.co.uk" className="text-primary hover:underline">
                    contact@echowebs.co.uk
                  </a>
                  .
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Cookies & analytics</h2>
                <p>
                  We use privacy-friendly, aggregated analytics to understand how visitors use the
                  site (such as page views). This data is anonymised and is not used to identify you
                  personally.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-foreground mb-3">Contact</h2>
                <p>
                  Questions about this policy or your data? Email{" "}
                  <a href="mailto:contact@echowebs.co.uk" className="text-primary hover:underline">
                    contact@echowebs.co.uk
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;
