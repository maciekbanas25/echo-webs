import AuroraNav from "@/components/aurora/AuroraNav";
import ScrollSnake from "@/components/aurora/ScrollSnake";
import AuroraHero from "@/components/aurora/AuroraHero";
import AuroraTicker from "@/components/aurora/AuroraTicker";
import AuroraWork from "@/components/aurora/AuroraWork";
import AuroraProcess from "@/components/aurora/AuroraProcess";
import AuroraServices from "@/components/aurora/AuroraServices";
import AuroraStats from "@/components/aurora/AuroraStats";
import AuroraCloser from "@/components/aurora/AuroraCloser";
import AuroraFooter from "@/components/aurora/AuroraFooter";

/**
 * Aurora homepage — deliberately minimal. One living shader hero, one
 * scroll-driven work reel, one services index, one line of proof, one
 * invitation. The quote builder lives on /services and reviews on /about.
 */
const Index = () => (
  <div className="relative isolate min-h-screen bg-[#080A0F] font-satoshi text-[#E8E4D9]">
    <ScrollSnake />
    <AuroraNav />
    <main>
      <AuroraHero />
      <AuroraTicker />
      <AuroraWork />
      <AuroraProcess />
      <AuroraServices />
      <AuroraStats />
      <AuroraCloser />
    </main>
    <AuroraFooter />
  </div>
);

export default Index;
