import Image from "next/image";
import { research } from "@/data/site";
import Reveal from "./Reveal";
import { SpeechEmbedding } from "./art/Illustrations";

export default function Research() {
  const { method, photo } = research;
  return (
    <section
      id="research"
      aria-labelledby="research-title"
      className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
    >
      <Reveal>
        <div className="border-y-[3px] border-double border-ink py-10 md:py-14">
          <div className="grid gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <p className="folio">
                {research.kicker} · {research.label}
              </p>
              <h2
                id="research-title"
                className="display mt-4 text-3xl font-semibold leading-tight sm:text-4xl md:text-[2.6rem]"
              >
                {research.title}
              </h2>
              <p className="mt-4 text-[0.97rem] font-semibold">{research.authors}</p>
              <p className="mt-1 text-[0.97rem] text-ink-soft">{research.venue}</p>

              <p className="mt-6 max-w-xl text-lg text-ink-soft">{research.lede}</p>

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

              <ul className="mt-7 flex flex-wrap gap-3">
                {research.links.map((l, i) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${i === 0 ? "btn-solid" : "btn-ghost"}`}
                    >
                      {l.label} <span aria-hidden="true">↗</span>
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
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
                <figcaption className="hand mt-2 text-center text-xl">
                  {photo.caption}
                </figcaption>
              </figure>
              <dl className="mt-6 divide-y divide-ink/25 border-y border-ink/25">
                {research.details.map((d) => (
                  <div
                    key={d.label}
                    className="flex items-baseline justify-between gap-4 py-2.5"
                  >
                    <dt className="folio">{d.label}</dt>
                    <dd className="text-right text-[0.97rem]">{d.value}</dd>
                  </div>
                ))}
                <div className="py-2.5">
                  <dt className="folio">Master&apos;s thesis</dt>
                  <dd lang="fr" className="mt-1 text-[0.97rem] italic">
                    «&nbsp;{research.thesisTitle}&nbsp;»
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <figure
            aria-labelledby="method-title"
            className="mt-12 grid gap-8 border-t border-ink/30 pt-10 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-7">
              <div className="page-card p-4 md:p-6">
                <SpeechEmbedding numbered className="h-auto w-full" />
              </div>
              <p className="mt-2 text-xs italic text-ink-soft">{method.note}</p>
            </div>
            <figcaption className="md:col-span-5">
              <p className="folio">{method.fig}</p>
              <p id="method-title" className="display mt-2 text-2xl font-semibold">
                {method.title}
              </p>
              <ol className="mt-5 space-y-5">
                {method.steps.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-card"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{s.title}</p>
                      <p className="mt-1 text-[0.97rem] text-ink-soft">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </figcaption>
          </figure>
        </div>
      </Reveal>
    </section>
  );
}
