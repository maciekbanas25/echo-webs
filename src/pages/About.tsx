import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/ew-logo.png";
import { Code, Palette, Zap, Heart, ArrowRight, CheckCircle } from "lucide-react";

const AboutPage = () => {
  const skills = [
    "React & Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "PostgreSQL",
    "SEO Optimization",
    "UI/UX Design",
    "Responsive Design",
  ];

  const values = [
    {
      icon: Zap,
      title: "Speed & Efficiency",
      description: "I believe in delivering quality work quickly. Modern tools and streamlined processes mean you get results faster.",
    },
    {
      icon: Palette,
      title: "Design Excellence",
      description: "Every pixel matters. I create visually stunning websites that capture your brand essence and impress visitors.",
    },
    {
      icon: Code,
      title: "Clean Code",
      description: "Built with best practices and modern technology. Your site will be fast, secure, and easy to maintain.",
    },
    {
      icon: Heart,
      title: "Client-Focused",
      description: "Your success is my priority. I listen, adapt, and deliver websites that truly serve your business goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in">
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-hero rounded-full blur-2xl opacity-30" />
                  <img
                    src={logo}
                    alt="EchoWebs Logo"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain relative z-10"
                  />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
                  About EchoWebs
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  I'm a passionate web developer dedicated to helping small businesses 
                  establish a powerful online presence. EchoWebs was founded with a simple 
                  mission: to make professional, high-performance websites accessible and 
                  affordable for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto animate-fade-in-up">
            <h2 className="text-4xl font-bold mb-8 text-center text-foreground">
              The Story
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                After years of working with various businesses, I noticed a gap in the market. 
                Small businesses often had to choose between expensive agency work or generic 
                template sites that didn't capture their unique identity.
              </p>
              <p>
                EchoWebs was born to bridge that gap. I combine modern technology with 
                personalized service to deliver websites that look like they cost thousands 
                but are priced for small business budgets.
              </p>
              <p>
                Every project starts with understanding your business, your customers, and 
                your goals. From there, I craft a digital experience that not only looks 
                beautiful but actually drives results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              My Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="flex gap-6 p-6 rounded-2xl bg-card border border-primary/20 hover:border-primary/40 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Skills & Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern technologies for modern websites
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-card border border-primary/20 hover:border-primary hover:shadow-glow transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client reviews (moved here from the homepage). */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to take your business to the next level with a stunning website?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="brand" className="shadow-glow hover:shadow-intense transition-all duration-300">
              <Link to="/contact" className="flex items-center gap-2">
                Get In Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:border-primary">
              <Link to="/portfolio">View My Work</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
