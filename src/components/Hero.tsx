import Link from "next/link";
import { hero } from "@/data/site";
import DraftTag from "./DraftTag";
import { RobotArm } from "./art/Illustrations";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-14 pt-12 md:grid-cols-[1.15fr_1fr] md:gap-10 md:px-8 md:pb-24 md:pt-20">
        <div>
          <h1
            id="hero-title"
            className="display text-[clamp(3rem,8.6vw,6.8rem)] font-semibold"
          >
            {hero.headline.before}{" "}
            <em className="marker font-medium">{hero.headline.emphasis}</em>
            {hero.headline.after}
            <DraftTag show={hero.placeholder} />
          </h1>
          <p className="mt-6 max-w-md text-xl leading-snug text-ink-soft md:text-2xl">
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

        <figure className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="page-card tape p-3 md:rotate-1">
            <div className="bg-paper-deep/70 p-2">
              <RobotArm className="h-auto w-full" />
            </div>
          </div>
          <figcaption className="hand absolute -bottom-6 left-3 -rotate-2 text-2xl md:text-3xl">
            {hero.note}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
