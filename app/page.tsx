import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Career } from "@/components/Career";
import { Metrics } from "@/components/Metrics";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Career />
      <Metrics />
      <Skills />
    </main>
  );
}
