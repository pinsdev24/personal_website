import Header from "@/components/Header";
import FeaturedProjects from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certification from "@/components/Certification";
import Contact from "@/components/Contact";
import BuildAIAgent from "@/components/BuildAIAgent";
import MoreProject from "@/components/MoreProject";
import VoiceConversation from "@/components/VoiceConversation";

export default function Home() {
  return (
    <div className="flex h-full grow flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <VoiceConversation />
        <BuildAIAgent />
        <FeaturedProjects />
        <MoreProject />
        <Skills />
        <Certification />
        <Contact />
      </main>
    </div>
  );
}
