import Link from "next/link";
import Hero from "@/components/Hero";
import JourneyThread from "@/components/JourneyThread";
import ProjectBrowser from "@/components/ProjectBrowser";
import DraftTag from "@/components/DraftTag";
import Reveal from "@/components/Reveal";
import { projects, selected } from "@/data/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />
      <JourneyThread />
      <section
        id="selected"
        aria-labelledby="selected-title"
        className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
      >
        <Reveal className="max-w-3xl">
          <p className="folio">{selected.kicker}</p>
          <h2
            id="selected-title"
            className="display mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            {selected.title}
            <DraftTag show={selected.placeholder} />
          </h2>
          <p className="mt-4 text-lg text-ink-soft">{selected.lede}</p>
        </Reveal>

        <div className="mt-10">
          <ProjectBrowser projects={featured} variant="feature" />
        </div>

        <p className="mt-10 text-center">
          <Link href="/work" className="btn btn-solid">
            Interested? There is more — all work <span aria-hidden="true">→</span>
          </Link>
        </p>
      </section>
    </>
  );
}
