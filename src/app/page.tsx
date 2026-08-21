import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Certification from "@/components/Certification";
import Contact from "@/components/Contact";
import BuildAIAgent from "@/components/BuildAIAgent";

export default function Home() {
  return (
    <div className="flex h-full grow flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <BuildAIAgent />
        <FeaturedProjects />
        <Experience />
        <Skills />
        <Certification />
        <Contact />
      </main>
    </div>
  );
}
