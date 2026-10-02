import type { Metadata } from "next";
import Link from "next/link";
import ProjectBrowser from "@/components/ProjectBrowser";
import DraftTag from "@/components/DraftTag";
import { projects, work } from "@/data/site";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Every project in the archive: agents, ML systems, products and client sites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8 md:pt-10">
      <div className="flex items-center justify-between gap-4 border-b-[3px] border-double border-ink pb-3">
        <p className="folio">The archive</p>
        <Link href="/" className="folio story-link">
          ← Back to the cover
        </Link>
      </div>

      <header className="max-w-3xl py-12 md:py-16">
        <p className="folio">{work.kicker}</p>
        <h1 className="display mt-3 text-5xl font-semibold sm:text-6xl md:text-7xl">
          {work.title}
          <DraftTag show={work.placeholder} />
        </h1>
        <p className="mt-5 text-lg text-ink-soft">{work.lede}</p>
      </header>

      <ProjectBrowser projects={projects} variant="index" />
    </div>
  );
}
