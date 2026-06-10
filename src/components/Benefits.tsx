import { benefits } from "@/data/benefits";
import Reveal from "@/components/Reveal";

const Benefits = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <Reveal className="mb-16 max-w-3xl">
          <span className="eyebrow mb-5">What you get</span>
          <h2 className="mb-5 font-syne text-4xl font-bold text-foreground md:text-6xl">
            Why Choose EchoWebs?
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to succeed online, without the agency price tag.
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <Reveal key={benefit.title} delay={index * 0.1}>
              <div className="card-stroke group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20">
                  <benefit.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mb-3 font-syne text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-accent">
                  {benefit.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
