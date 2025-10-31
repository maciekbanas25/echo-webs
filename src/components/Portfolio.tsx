import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import cafeHero from "@/assets/cafe-hero.jpg";
import barberHero from "@/assets/barber-hero.jpg";
import gymHero from "@/assets/gym-hero.jpg";
import photographerHero from "@/assets/photographer-hero.jpg";

const Portfolio = () => {
  const projects = [
    {
      title: "Café Site",
      description: "Warm, inviting design for coffee shops with modern aesthetics",
      image: cafeHero,
      link: "/cafe",
    },
    {
      title: "Barber Shop",
      description: "Bold, sophisticated style for grooming professionals",
      image: barberHero,
      link: "/barber",
    },
    {
      title: "Gym Studio",
      description: "Dynamic, motivational design for fitness centers",
      image: gymHero,
      link: "/gym",
    },
    {
      title: "Photography Portfolio",
      description: "Clean, artistic showcase for creative professionals",
      image: photographerHero,
      link: "/photographer",
    },
  ];

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
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
          {projects.map((project, index) => (
            <Card
              key={project.link}
              className="group overflow-hidden bg-secondary/50 border-primary/20 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:scale-[1.02] animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={project.link} className="block">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
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

        <div className="mt-12 border-t border-primary/10" />
      </div>
    </section>
  );
};

export default Portfolio;
