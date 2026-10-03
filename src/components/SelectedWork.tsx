"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useMemo, useState } from "react";
import {
  categories,
  projects,
  selected,
  type CategoryId,
  type Project,
} from "@/data/site";
import DraftTag from "./DraftTag";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";

function Entry({ project, number }: { project: Project; number: number }) {
  const label = categories.find((c) => c.id === project.category)?.label;
  const link = project.links[0];
  return (
    <Reveal as="article" className="group">
      <div className="relative">
        {project.image ? (
          <div className="page-card overflow-hidden">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1800}
              height={900}
              sizes="(min-width: 1152px) 740px, (min-width: 768px) 62vw, 92vw"
              className="aspect-[2/1] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        ) : (
          <ImageSlot
            slot={{
              src: null,
              suggestedPath: `/images/projects/${project.slug}.webp`,
              alt: "",
              caption: "",
            }}
            sizes="740px"
          />
        )}
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-solid absolute bottom-3 right-3 !min-h-0 !px-4 !py-1.5 !text-sm"
          >
            {link.label} <span aria-hidden="true">↗</span>
            <span className="sr-only">
              {" "}
              — {project.title} (opens in a new tab)
            </span>
          </a>
        )}
      </div>

      <div className="mt-5 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <p className="folio">
            <span className="text-vermilion">{String(number).padStart(2, "0")}</span>
            {" / "}
            {label} · {project.kind}
          </p>
          <h3 className="display mt-2 text-3xl font-semibold md:text-4xl">
            {project.title}
            <DraftTag show={project.placeholder} />
          </h3>
          <p className="mt-2 max-w-xl text-lg text-ink-soft">{project.blurb}</p>
        </div>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center border-[1.5px] border-ink text-xl transition-colors hover:bg-ink hover:text-paper sm:flex"
          >
            ↗
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function SelectedWork() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const statusId = useId();

  const picks = useMemo(
    () =>
      selected.slugs
        .map((slug) => projects.find((p) => p.slug === slug))
        .filter((p): p is Project => Boolean(p)),
    [],
  );
  const pills = useMemo(
    () => [
      { id: "all" as const, label: "All" },
      ...categories.filter((c) => picks.some((p) => p.category === c.id)),
    ],
    [picks],
  );
  const visible = active === "all" ? picks : picks.filter((p) => p.category === active);

  return (
    <section
      id="selected"
      aria-labelledby="selected-title"
      className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
    >
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-[3.4rem] md:flex md:h-[calc(100svh-3.4rem)] md:flex-col md:justify-center">
            <p className="folio">
              {selected.kicker}
              <DraftTag show={selected.placeholder} />
            </p>
            <h2
              id="selected-title"
              className="display mt-3 text-4xl font-semibold leading-[1.05] sm:text-5xl"
            >
              {selected.titleStart}{" "}
              <em className="font-medium">{selected.titleEmphasis}</em>
            </h2>
            <p className="mt-4 text-base text-ink-soft">{selected.lede}</p>

            <div className="mt-7">
              <p className="folio" id={`${statusId}-label`}>
                {selected.filterLabel}
              </p>
              <div
                role="group"
                aria-labelledby={`${statusId}-label`}
                className="mt-2 flex flex-wrap gap-2"
              >
                {pills.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    className="pill"
                    aria-pressed={active === p.id}
                    aria-describedby={statusId}
                    onClick={() => setActive(p.id)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <p id={statusId} role="status" className="sr-only">
                {visible.length} {visible.length === 1 ? "project" : "projects"} shown
              </p>
            </div>

            <p className="mt-8 hidden md:block">
              <Link href="/work" className="story-link text-[0.95rem] font-semibold">
                {selected.seeMore} <span aria-hidden="true">→</span>
              </Link>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-14 md:col-span-8 md:gap-20 md:pb-10">
          {visible.map((p, i) => (
            <Entry key={p.slug} project={p} number={i + 1} />
          ))}
          <p className="md:hidden">
            <Link href="/work" className="btn btn-solid">
              {selected.seeMore} <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
