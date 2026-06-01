import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import BrowserChrome from "@/components/BrowserChrome";
import Tilt from "@/components/Tilt";

const WorkPreview = () => {
  // Show only first 4 projects
  const previewProjects = projects.slice(0, 4);

  return (
    <section id="demos" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Work
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore some of our live demos — every design built for speed, style, and simplicity.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {previewProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.1}>
            <Tilt className="h-full">
            <Card
              className="group h-full overflow-hidden bg-secondary/50 border-primary/20 hover:border-primary/40 transition-colors duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.35)] cursor-pointer"
            >
              <Link to={project.link} className="block">
                <BrowserChrome url={`echo-webs.com${project.link}`} compact />
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </Link>
            </Card>
            </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
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
        </Reveal>
      </div>
    </section>
  );
};

export default WorkPreview;
