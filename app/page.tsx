import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Career } from "@/components/Career";
import { Metrics } from "@/components/Metrics";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Career />
      <Metrics />
      <Skills />
      <Projects />
    </main>
  );
}
