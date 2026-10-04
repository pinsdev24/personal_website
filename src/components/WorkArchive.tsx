"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import {
  categories,
  projects,
  selected,
  showPlaceholderMarkers,
  work,
  type CategoryId,
  type Project,
} from "@/data/site";
import DraftTag from "./DraftTag";
import { GridWorld } from "./art/Illustrations";

const ILLUSTRATIONS = { rl: GridWorld } as const;

const ordered: readonly Project[] = [
  ...selected.slugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p)),
  ...projects.filter((p) => !(selected.slugs as readonly string[]).includes(p.slug)),
];

function yearSpan(list: readonly Project[]) {
  const years = list.flatMap((p) => (p.year.match(/\d{4}/g) ?? []).map(Number));
  if (years.length === 0) return "";
  const lo = Math.min(...years);
  const hi = Math.max(...years);
  return lo === hi ? String(lo) : `${lo}–${hi}`;
}

export function WorkStats() {
  const drawers = new Set(projects.map((p) => p.category)).size;
  const live = projects.filter((p) => p.links.some((l) => l.label === "See it live")).length;
  const stats = [
    { label: work.stats.projects, value: String(projects.length) },
    { label: work.stats.drawers, value: String(drawers) },
    { label: work.stats.years, value: yearSpan(projects) },
    { label: work.stats.live, value: String(live) },
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden border border-ink/50 bg-ink/30">
      {stats.map((s) => (
        <div key={s.label} className="bg-paper px-4 py-4 md:px-5">
          <dt className="folio">{s.label}</dt>
          <dd className="display mt-1 whitespace-nowrap text-2xl font-semibold sm:text-3xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Visual({ project, wide }: { project: Project; wide: boolean }) {
  const ratio = "aspect-[16/10]";
  if (project.image) {
    return (
      <div className={`relative overflow-hidden border-b border-ink/50 ${wide ? "lg:border-b-0" : ""} ${ratio}`}>
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes={wide ? "(min-width: 1024px) 480px, 92vw" : "(min-width: 1024px) 380px, (min-width: 640px) 45vw, 92vw"}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          style={{ objectPosition: project.image.position ?? "50% 0%" }}
        />
      </div>
    );
  }
  const Art = project.illustration ? ILLUSTRATIONS[project.illustration] : null;
  if (Art) {
    return (
      <div className={`flex items-center justify-center border-b border-ink/50 bg-paper-deep p-4 ${ratio}`}>
        <Art className="h-full max-h-full w-auto" />
      </div>
    );
  }
  if (!showPlaceholderMarkers) return null;
  return (
    <div className={`slot-empty flex items-center justify-center border-b border-ink/50 p-3 text-center ${ratio}`}>
      <p className="folio !text-vermilion">Placeholder · image slot</p>
    </div>
  );
}

function Card({
  project,
  number,
  wide,
}: {
  project: Project;
  number: number;
  wide: boolean;
}) {
  const label = categories.find((c) => c.id === project.category)?.label;
  return (
    <li
      id={project.slug}
      className={`group scroll-mt-24 ${wide ? "sm:col-span-2" : ""}`}
    >
      <article
        className={`page-card flex h-full flex-col overflow-hidden ${wide ? "lg:grid lg:grid-cols-5" : ""}`}
      >
        <div className={wide ? "lg:col-span-3 lg:self-center" : ""}>
          <Visual project={project} wide={wide} />
        </div>
        <div className={`flex flex-1 flex-col p-5 md:p-6 ${wide ? "lg:col-span-2 lg:justify-center lg:border-l lg:border-ink/50" : ""}`}>
          <p className="folio">
            <span className="text-vermilion">{String(number).padStart(2, "0")}</span>
            {" / "}
            {label} · {project.year}
          </p>
          <h3
            className={`display mt-2 font-semibold leading-tight ${wide ? "text-3xl md:text-4xl" : "text-2xl"}`}
          >
            {project.title}
            <DraftTag show={project.placeholder} />
          </h3>
          <p className="mt-1 text-sm italic text-ink-soft">{project.kind}</p>
          <p className="mt-3 text-[0.97rem] text-ink-soft">{project.blurb}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-ink/50 px-2 py-0.5 text-[0.7rem] font-semibold"
              >
                {t}
              </li>
            ))}
          </ul>
          {project.links.length > 0 && (
            <ul className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-5 text-[0.95rem] font-semibold">
              {project.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="story-link"
                  >
                    {l.label} <span aria-hidden="true">↗</span>
                    <span className="sr-only">
                      {" "}
                      — {project.title} (opens in a new tab)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </li>
  );
}

export default function WorkArchive() {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const statusId = useId();

  const drawers = useMemo(
    () => [
      { id: "all" as const, label: "All", count: ordered.length },
      ...categories
        .map((c) => ({ ...c, count: ordered.filter((p) => p.category === c.id).length }))
        .filter((c) => c.count > 0),
    ],
    [],
  );
  const visible =
    active === "all" ? ordered : ordered.filter((p) => p.category === active);

  return (
    <div className="grid gap-10 md:grid-cols-12 md:gap-10">
      <aside className="md:col-span-4 lg:col-span-3">
        <div className="md:sticky md:top-20">
          <p className="folio" id={`${statusId}-drawers`}>
            {work.drawersTitle}
          </p>
          <div
            role="group"
            aria-labelledby={`${statusId}-drawers`}
            className="mt-3 flex flex-wrap gap-2 md:flex-col md:gap-0 md:border-t md:border-ink/40"
          >
            {drawers.map((d) => (
              <button
                key={d.id}
                type="button"
                aria-pressed={active === d.id}
                aria-describedby={statusId}
                onClick={() => setActive(d.id)}
                className="pill md:flex md:min-h-0 md:items-baseline md:justify-between md:rounded-none md:border-0 md:border-b md:border-ink/40 md:px-1 md:py-2.5 md:text-left md:text-base md:hover:bg-transparent md:hover:text-vermilion md:aria-pressed:bg-transparent md:aria-pressed:text-vermilion"
              >
                <span>{d.label}</span>
                <span className="ml-2 font-display italic opacity-70">
                  {String(d.count).padStart(2, "0")}
                </span>
              </button>
            ))}
          </div>
          <p id={statusId} role="status" className="sr-only">
            {visible.length} {visible.length === 1 ? "project" : "projects"} shown
          </p>

          <nav aria-label={work.contentsTitle} className="mt-8 hidden md:block">
            <p className="folio">{work.contentsTitle}</p>
            <ol className="mt-3 space-y-1.5 text-[0.95rem]">
              {visible.map((p, i) => (
                <li key={p.slug} className="flex gap-3">
                  <span className="w-6 shrink-0 font-display italic text-vermilion">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a href={`#${p.slug}`} className="story-link leading-snug">
                    {p.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </aside>

      <ol className="grid gap-6 sm:grid-cols-2 md:col-span-8 lg:col-span-9">
        {visible.map((p, i) => (
          <Card
            key={p.slug}
            project={p}
            number={i + 1}
            wide={active === "all" && i < selected.slugs.length}
          />
        ))}
      </ol>
    </div>
  );
}
