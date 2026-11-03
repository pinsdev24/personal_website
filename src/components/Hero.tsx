import Image from "next/image";
import Link from "next/link";
import { hero, profile } from "@/data/site";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="cover">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="cover-masthead folio">
          <span>A personal field guide</span>
          <span>{profile.location} <span aria-hidden="true">↗</span></span>
        </div>
        <div className="cover-spread">
          <div className="cover-copy">
            <div className="cover-byline">
              <p><span>{profile.name}</span><br /><span className="text-ink-soft">{profile.role}</span></p>
            </div>
            <h1 id="hero-title" className="display cover-title font-semibold">
              <span>{hero.headline.before}</span>{" "}
              <em>{hero.headline.emphasis}</em>{" "}
              <span>{hero.headline.after}</span>
            </h1>
            <p className="cover-intro text-ink-soft">{hero.intro}</p>
            <div className="cover-actions">
              {hero.cta.map((c) => (
                <Link key={c.href} href={c.href} className={c.kind === "solid" ? "btn btn-solid" : "cover-work-link"}>
                  {c.label}<span aria-hidden="true">{c.kind === "solid" ? "↓" : "↗"}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="cover-portrait">
            <div className="cover-portrait-label folio"><span>Fig. 00</span><span>{hero.portraitLabel}</span></div>
            <figure className="cover-portrait-frame tape">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={800}
                height={1000}
                sizes="(min-width: 768px) 392px, (min-width: 480px) 336px, 80vw"
                priority
              />
              <figcaption className="cover-portrait-caption">
                <span className="hand">{hero.note}</span>
                <span aria-hidden="true">↗</span>
              </figcaption>
            </figure>
          </div>
        </div>
        <div className="cover-index">
          <span className="folio cover-index-label">Inside this field guide</span>
          <Link href="/#journey"><span>01</span> The thread <span aria-hidden="true">↓</span></Link>
          <Link href="/#selected"><span>02</span> Selected work <span aria-hidden="true">↓</span></Link>
          <Link href="/#field-notes"><span>03</span> Field notes <span aria-hidden="true">↓</span></Link>
        </div>
      </div>
    </section>
  );
}
