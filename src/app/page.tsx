import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certification from "@/components/Certification";
import Contact from "@/components/Contact";
import BuildAIAgent from "@/components/BuildAIAgent";
import MoreProject from "@/components/MoreProject";

export default function Home() {
  return (
    <div className="layout-container flex h-full grow flex-col">
      <Header />
      <main className="flex-1">
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 flex flex-1 justify-center py-6 sm:py-10">
          <div
            className="layout-content-container flex flex-col max-w-[1200px] flex-1 gap-8 sm:gap-12 md:gap-16"
          >
            <Hero />
            <About />
            <BuildAIAgent />
            <FeaturedProjects />
            <MoreProject />
            <Skills />
            <Certification />
            <Contact />
          </div>
        </div>
      </main>
    </div>
  );
}
