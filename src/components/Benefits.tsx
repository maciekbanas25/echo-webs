import { Card, CardContent } from "@/components/ui/card";
import { benefits } from "@/data/benefits";
import Reveal from "@/components/Reveal";

const Benefits = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Reveal className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Choose EchoWebs?
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed online, without the agency price tag.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.1}>
            <Card
              className="group h-full border-primary/20 bg-card/50 hover:border-primary/50 hover:shadow-glow transition-all duration-500"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
