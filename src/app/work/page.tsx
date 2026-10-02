import type { Metadata } from "next";
import Link from "next/link";
import ProjectBrowser from "@/components/ProjectBrowser";
import DraftTag from "@/components/DraftTag";
import { githubArchive, projects, work } from "@/data/site";

export const metadata: Metadata = {
  title: "All work",
  description:
    "Every project in the archive: agents, ML systems, research, products and client sites.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="theme-night min-h-screen">
      <div className="work-curtain" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-8 md:px-8 md:pt-10">
        <div className="flex items-center justify-between gap-4 border-b-[3px] border-double border-ink pb-3">
          <p className="folio">{work.kicker}</p>
          <Link href="/" className="folio story-link">
            <span aria-hidden="true">↑</span> {work.exitTop}
          </Link>
        </div>

        <header className="max-w-3xl py-12 md:py-16">
          <h1 className="display text-5xl font-semibold sm:text-6xl md:text-7xl">
            {work.title}
            <DraftTag show={work.placeholder} />
          </h1>
          <p className="mt-5 text-lg text-ink-soft">{work.lede}</p>
        </header>

        <ProjectBrowser projects={projects} variant="archive" />

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t-[3px] border-double border-ink pt-6 sm:flex-row sm:items-center">
          <a
            href={githubArchive}
            target="_blank"
            rel="noreferrer"
            className="btn btn-solid"
          >
            {work.githubCta} <span aria-hidden="true">↗</span>
          </a>
          <Link href="/" className="folio story-link">
            <span aria-hidden="true">↑</span> {work.exitBottom}
          </Link>
        </div>
      </div>
    </div>
  );
}
