import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { staticTestimonials } from "@/data/testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const TestimonialsCarousel = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            What Clients Say
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full shadow-glow" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from businesses who trusted EchoWebs with their online presence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {staticTestimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full border-primary/20 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-8 flex flex-col h-full">
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                        ))}
                      </div>

                      <blockquote className="text-lg text-muted-foreground mb-8 leading-relaxed flex-grow">
                        "{testimonial.text}"
                      </blockquote>

                      <div className="border-t border-primary/10 pt-6">
                        <p className="font-semibold text-foreground text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-muted-foreground">
                          {testimonial.company}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
