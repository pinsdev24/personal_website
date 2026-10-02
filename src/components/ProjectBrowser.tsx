"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import {
  categories,
  showPlaceholderMarkers,
  type CategoryId,
  type Project,
} from "@/data/site";
import DraftTag from "./DraftTag";
import ImageSlot from "./ImageSlot";

type Variant = "feature" | "archive";

function ProjectLinks({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem] font-semibold">
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
  );
}

function FeatureEntry({
  project,
  number,
}: {
  project: Project;
  number: number;
}) {
  const flip = number % 2 === 0;
  const label = categories.find((c) => c.id === project.category)?.label;
  return (
    <article className="grid items-center gap-6 border-t border-ink py-8 md:grid-cols-12 md:gap-10 md:py-12">
      <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
        {project.image ? (
          <div className="page-card overflow-hidden p-2">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1200}
              height={750}
              sizes="(min-width: 1152px) 640px, (min-width: 768px) 55vw, 92vw"
              className="aspect-[16/10] w-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="page-card p-2">
            <ImageSlot
              slot={{
                src: null,
                suggestedPath: `/images/projects/${project.slug}.png`,
                alt: "",
                caption: "",
              }}
              sizes="640px"
            />
          </div>
        )}
      </div>
      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <p className="folio flex items-center gap-3">
          <span className="font-display text-3xl normal-case tracking-normal text-vermilion">
            {String(number).padStart(2, "0")} /
          </span>
          <span>
            {label} · {project.year}
          </span>
        </p>
        <h3 className="display mt-3 text-4xl font-semibold md:text-5xl">
          {project.title}
          <DraftTag show={project.placeholder} />
        </h3>
        <p className="mt-4 text-lg text-ink-soft">{project.blurb}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full border border-ink/60 px-2.5 py-0.5 text-xs font-semibold"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}

function ArchiveRow({ project, number }: { project: Project; number: number }) {
  const label = categories.find((c) => c.id === project.category)?.label;
  return (
    <li className="archive-row flex gap-4 border-t border-ink/40 px-1 py-6 sm:gap-6 sm:px-3 md:py-7">
      <p className="font-display w-9 shrink-0 pt-1 text-2xl italic text-vermilion sm:w-12 sm:text-3xl">
        {String(number).padStart(2, "0")}
      </p>
      <div className="relative hidden aspect-[4/3] w-32 shrink-0 self-start overflow-hidden border border-ink/60 sm:block md:w-40">
        {project.image ? (
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="160px"
            className="object-cover object-top"
          />
        ) : (
          showPlaceholderMarkers && (
            <div className="slot-empty flex h-full items-center justify-center p-1 text-center">
              <p className="folio !text-[0.6rem] !text-vermilion">
                Placeholder · image slot
              </p>
            </div>
          )
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="folio">
          {label} · {project.kind} · {project.year}
        </p>
        <h3 className="display mt-1 text-2xl font-semibold md:text-3xl">
          {project.title}
          <DraftTag show={project.placeholder} />
        </h3>
        <p className="mt-1.5 max-w-2xl text-ink-soft">{project.blurb}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
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
          <div className="mt-3">
            <ProjectLinks project={project} />
          </div>
        )}
      </div>
    </li>
  );
}

export default function ProjectBrowser({
  projects,
  variant,
}: {
  projects: readonly Project[];
  variant: Variant;
}) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const statusId = useId();

  const available = useMemo(
    () => categories.filter((c) => projects.some((p) => p.category === c.id)),
    [projects],
  );
  const visible = useMemo(
    () =>
      active === "all" ? projects : projects.filter((p) => p.category === active),
    [projects, active],
  );

  const pills = [{ id: "all" as const, label: "All" }, ...available];

  return (
    <div>
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap items-center gap-2"
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
        <p
          id={statusId}
          role="status"
          className="folio ml-1 w-full sm:ml-3 sm:w-auto"
        >
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {variant === "feature" ? (
        <div className="mt-8 border-b border-ink">
          {visible.map((p, i) => (
            <FeatureEntry key={p.slug} project={p} number={i + 1} />
          ))}
        </div>
      ) : (
        <ol className="mt-8 border-b border-ink/40">
          {visible.map((p, i) => (
            <ArchiveRow key={p.slug} project={p} number={i + 1} />
          ))}
        </ol>
      )}
    </div>
  );
}
