import Image from "next/image";
import { research, showPlaceholderMarkers } from "@/data/site";
import DraftTag from "./DraftTag";
import Reveal from "./Reveal";
import { SpeechEmbedding } from "./art/Illustrations";

export default function Research() {
  const { paper, photo } = research;
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
    >
      <Reveal>
        <div className="grid gap-8 border-y-[3px] border-double border-ink py-10 md:grid-cols-12 md:gap-12 md:py-14">
          <div className="md:col-span-7">
            <p className="folio">
              {research.kicker} · {research.degree}
            </p>
            <h2 id="research-title" className="sr-only">
              {research.heading}
            </h2>
            <p
              lang="fr"
              className="display mt-4 text-3xl font-medium italic sm:text-4xl md:text-[2.6rem]"
            >
              «&nbsp;{research.title}&nbsp;»
            </p>
            <p className="mt-3 text-base italic text-ink-soft">
              {research.titleEn}
              <DraftTag show={research.placeholder} />
            </p>
            <p className="mt-6 flex items-center gap-3 text-lg font-semibold">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-ink" />
              {research.institution}
            </p>
            <p className="mt-5 max-w-xl text-lg text-ink-soft">{research.abstract}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Keywords">
              {research.keywords.map((k) => (
                <li
                  key={k}
                  className="rounded-full border border-ink/60 px-3 py-0.5 text-sm font-semibold"
                >
                  {k}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-5 border-t border-ink/30 pt-6">
              <div className="min-w-0 flex-1">
                <p className="folio">{paper.label}</p>
                <h3 className="display mt-2 text-xl font-semibold leading-snug md:text-2xl">
                  {paper.title}
                </h3>
                <p className="mt-2 text-sm text-ink-soft">
                  {paper.authors}
                  <br />
                  {paper.venue}
                  <br />
                  {paper.proceedings}
                </p>
                <p className="mt-3 max-w-xl text-[0.97rem] text-ink-soft">
                  {paper.summary}
                </p>
                <dl
                  className="mt-4 flex flex-wrap items-end gap-x-6 gap-y-3"
                  aria-label={paper.resultsNote}
                >
                  {paper.results.map((r) => (
                    <div key={r.language}>
                      <dt className="folio">{r.language}</dt>
                      <dd className="display text-3xl font-semibold text-vermilion">
                        {r.wer}
                        <span className="ml-1 text-xs font-normal uppercase tracking-wider text-ink-soft">
                          WER
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] font-semibold">
                  {paper.sources.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="story-link"
                      >
                        {l.label} <span aria-hidden="true">↗</span>
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <SpeechEmbedding className="hidden h-auto w-40 shrink-0 self-start sm:block lg:w-44" />
            </div>
          </div>

          <div className="md:col-span-5">
            <figure className="page-card tape p-3 md:rotate-1">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 92vw"
                className="h-auto w-full"
              />
              <figcaption className="hand mt-2 text-center text-xl text-vermilion">
                {photo.caption}
              </figcaption>
            </figure>
            <dl className="mt-6 divide-y divide-ink/25 border-y border-ink/25">
              {research.details.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="folio">{d.label}</dt>
                  <dd className="text-right text-[0.97rem]">
                    {d.value ? (
                      d.value
                    ) : showPlaceholderMarkers ? (
                      <span className="draft-tag !ml-0" title="Fill this in src/data/site.ts">
                        to fill · {d.hint}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
