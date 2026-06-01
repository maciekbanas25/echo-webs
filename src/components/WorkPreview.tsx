import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

const WorkPreview = () => {
  // Show only first 4 projects
  const previewProjects = projects.slice(0, 4);

  return (
    <section id="demos" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Work
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore some of our live demos — every design built for speed, style, and simplicity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {previewProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden bg-secondary/50 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={project.link} className="block">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary/90 text-primary-foreground rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 group-hover:shadow-glow"
                  >
                    View Demo
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            className="border-primary/30 hover:border-primary hover:shadow-glow transition-all duration-300"
          >
            <Link to="/portfolio" className="flex items-center gap-2">
              View Full Portfolio
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkPreview;
