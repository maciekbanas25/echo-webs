import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects, categories } from "@/data/projects";
import { ArrowRight, MessageSquare } from "lucide-react";

const PortfolioPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Our Portfolio
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore our collection of live demo sites. Each design is crafted for performance, 
              beauty, and conversion.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in-up">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className={`transition-all duration-300 ${
                  activeCategory === category.id 
                    ? "shadow-glow" 
                    : "border-primary/30 hover:border-primary"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group transform-gpu overflow-hidden bg-card border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] hover:-translate-y-2 animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link to={project.link} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden [transform:translateZ(0)]">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Category pill top-right */}
                    <div className="absolute top-4 right-4">
                      <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-sm text-white rounded-full border border-white/20">
                        {project.category}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 text-white font-semibold flex items-center gap-2 text-sm">
                        View Demo <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-xl">
                No projects in this category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Like What You See?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's build something amazing for your business. Get a custom website tailored to your needs.
            </p>
            <Button asChild size="lg" variant="brand" className="shadow-glow hover:shadow-intense transition-all duration-300">
              <Link to="/contact" className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Request a Website Like This
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
