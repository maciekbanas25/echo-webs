import { Link } from "react-router-dom";

const Portfolio = () => {
  const projects = [
    {
      title: "Cafe Prototype",
      description: "Warm, inviting design for coffee shops with modern aesthetics",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80&auto=format&fit=crop",
      link: "/cafe",
    },
    {
      title: "Barber Shop Prototype",
      description: "Bold, sophisticated style for grooming professionals",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80&auto=format&fit=crop",
      link: "/barber",
    },
    {
      title: "Gym Prototype",
      description: "Dynamic, motivational design for fitness centers",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format&fit=crop",
      link: "/gym",
    },
    {
      title: "Photography Prototype",
      description: "Clean, artistic showcase for creative professionals",
      image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80&auto=format&fit=crop",
      link: "/photographer",
    },
  ];

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
      </div>
    </section>
  );
};

export default Portfolio;
