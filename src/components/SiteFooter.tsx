import Image from "next/image";
import { contact, profile } from "@/data/site";
import DraftTag from "./DraftTag";

export default function SiteFooter() {
  return (
    <footer id="contact" className="mt-24 border-t-[3px] border-double border-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[auto_1fr] md:gap-16 md:px-8 md:py-20">
        <div className="relative mx-auto w-44 -rotate-2 md:mx-0 md:w-56">
          <div className="page-card p-2 pb-8">
            <Image
              src={profile.portrait.src}
              alt={profile.portrait.alt}
              width={448}
              height={560}
              className="aspect-[4/5] w-full object-cover grayscale contrast-110"
            />
          </div>
          <span className="hand absolute -bottom-3 -right-4 rotate-3 text-2xl" aria-hidden="true">
            hi!
          </span>
        </div>

        <div>
          <p className="folio">{contact.kicker}</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl md:text-6xl">
            {contact.title}
            <DraftTag show={contact.placeholder} />
          </h2>
          <p className="mt-5 max-w-xl text-lg text-ink-soft">{contact.body}</p>
          <p className="mt-6">
            <a
              href={`mailto:${profile.email}`}
              className="story-link font-display text-2xl break-all sm:text-3xl"
            >
              {profile.email}
            </a>
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-semibold">
            {profile.links.map((l) => (
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
      </div>

      <div className="border-t border-ink/80">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 md:px-8">
          <p className="folio">
            © {new Date().getFullYear()} {profile.name} · Printed in {profile.location.split(" · ")[0]}
          </p>
          <a href="#main" className="folio story-link">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
