import Image from "next/image";
import { certifications } from "@/data/site";
import DraftTag from "./DraftTag";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section
      id="certifications"
      aria-labelledby="certs-title"
      className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
    >
      <Reveal className="max-w-3xl">
        <p className="folio">{certifications.kicker}</p>
        <h2
          id="certs-title"
          className="display mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl"
        >
          {certifications.title}
          <DraftTag show={certifications.placeholder} />
        </h2>
        <p className="mt-4 text-lg text-ink-soft">{certifications.lede}</p>
      </Reveal>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.items.map((c, i) => {
          const body = (
            <>
              <div className="relative aspect-[4/3] overflow-hidden border border-ink/70 bg-paper-deep">
                <Image
                  src={c.image}
                  alt={`${c.title} certificate`}
                  fill
                  sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 90vw"
                  className="object-contain p-2"
                />
              </div>
              <p className="folio mt-4">{c.issuer}</p>
              <p className="display mt-1 text-xl font-semibold leading-tight">
                {c.title}
              </p>
              <p className="mt-3 text-sm font-semibold">
                <span className="story-link">
                  Verify <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {c.title} (opens in a new tab)</span>
                </span>
              </p>
            </>
          );
          return (
            <li key={c.title}>
              <Reveal delay={i * 80} className="h-full">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-card block h-full p-3 pb-5 transition-transform hover:-translate-y-1"
                >
                  {body}
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
