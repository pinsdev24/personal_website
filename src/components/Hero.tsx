import Link from "next/link";
import { hero, profile } from "@/data/site";
import DraftTag from "./DraftTag";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto max-w-6xl px-5 pt-8 md:px-8 md:pt-10">
        <div className="flex items-center justify-between gap-4 border-b-[3px] border-double border-ink pb-3">
          <p className="folio">{hero.issue}</p>
          <p className="folio hidden sm:block">{profile.role}</p>
          <p className="folio">{profile.location.split(" · ")[0]}</p>
        </div>

        <div className="relative pb-10 pt-10 md:pb-16 md:pt-16">
          <p className="inline-flex items-center gap-2 text-sm font-semibold">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-vermilion opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermilion" />
            </span>
            {hero.availability}
          </p>

          <h1
            id="hero-title"
            className="display mt-6 max-w-5xl text-[clamp(2.7rem,8.2vw,6.6rem)] font-semibold"
          >
            {hero.headline.before}{" "}
            <em className="marker font-medium">{hero.headline.emphasis}</em>{" "}
            {hero.headline.after}
            <DraftTag show={hero.placeholder} />
          </h1>

          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr] md:gap-16">
            <div>
              <p className="max-w-xl text-lg leading-relaxed text-ink-soft md:text-xl">
                {hero.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {hero.cta.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className={`btn ${c.kind === "solid" ? "btn-solid" : "btn-ghost"}`}
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-4 border-t border-ink pt-4 md:grid-cols-1 md:gap-0 md:border-t-0 md:pt-0">
              {hero.facts.map((f) => (
                <div
                  key={f.label}
                  className="md:flex md:items-baseline md:justify-between md:border-b md:border-ink/25 md:py-3"
                >
                  <dt className="folio">{f.label}</dt>
                  <dd className="mt-1 font-display text-lg leading-tight md:mt-0 md:text-xl">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <p
            className="hand absolute bottom-0 right-1 hidden -rotate-3 text-3xl md:block"
            aria-hidden="true"
          >
            {hero.note}
          </p>
        </div>
      </div>
    </section>
  );
}
