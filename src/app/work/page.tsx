import type { Metadata } from "next";
import Link from "next/link";
import WorkArchive, { WorkStats } from "@/components/WorkArchive";
import { githubArchive, work } from "@/data/site";

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

        <header className="grid items-end gap-8 py-12 md:grid-cols-12 md:gap-10 md:py-16">
          <div className="md:col-span-7">
            <h1 className="display text-5xl font-semibold sm:text-6xl md:text-7xl">
              {work.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">{work.lede}</p>
          </div>
          <div className="md:col-span-5">
            <WorkStats />
          </div>
        </header>

        <WorkArchive />

        <section
          aria-labelledby="github-title"
          className="page-card mt-16 flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center md:p-8"
        >
          <div>
            <h2 id="github-title" className="display text-3xl font-semibold">
              {work.githubTitle}
            </h2>
            <p className="mt-2 text-ink-soft">{work.githubBody}</p>
          </div>
          <a
            href={githubArchive}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid shrink-0"
          >
            {work.githubCta} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>

        <p className="mt-10 text-right">
          <Link href="/" className="folio story-link">
            <span aria-hidden="true">↑</span> {work.exitBottom}
          </Link>
        </p>
      </div>
    </div>
  );
}
