import Hero from "@/components/Hero";
import JourneyThread from "@/components/JourneyThread";
import FieldNotes from "@/components/FieldNotes";
import Research from "@/components/Research";
import Certifications from "@/components/Certifications";
import SelectedWork from "@/components/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <JourneyThread />
      <FieldNotes />
      <Research />
      <SelectedWork />
      <Certifications />
    </>
  );
}
