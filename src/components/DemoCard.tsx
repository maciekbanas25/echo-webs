import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface DemoCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const DemoCard = ({ title, description, image, link }: DemoCardProps) => {
  return (
    <Link to={link} className="block perspective-1000">
      <Card className="group overflow-hidden hover:shadow-intense transition-all duration-500 animate-scale-in border-primary/20 hover:border-primary/60 relative hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(var(--primary-rgb),0.5)]">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/50 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className={`absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-500`}>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-shadow-glow transition-all duration-300">{title}</h3>
            <p className="text-white/90 group-hover:text-white transition-colors duration-300">{description}</p>
          </div>
        </div>

        <CardContent className="p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

          <div className="inline-flex items-center gap-2 font-semibold group-hover:gap-6 transition-all duration-300 group-hover:translate-x-2 text-primary">
            <span className="relative">
              View Demo
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-current group-hover:w-full transition-all duration-300" />
            </span>
            <span className="text-xl group-hover:animate-bounce-x inline-block">→</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DemoCard;
