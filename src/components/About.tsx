import logo from "@/assets/ew-logo.png";

const About = () => {
  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Why Choose EchoWebs?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in-up">
            <div className="flex-shrink-0">
              <img
                src={logo}
                alt="EchoWebs Logo"
                className="w-48 h-48 md:w-56 md:h-56 object-contain"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                At EchoWebs, I build high-performance websites for small businesses with sleek, modern design. Every site is fast, mobile-ready, and optimized for growth. Whether you're a café, salon, gym, or creative professional, I craft digital experiences that elevate your brand and drive results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
