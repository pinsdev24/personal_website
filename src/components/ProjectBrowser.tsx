"use client";

import Image from "next/image";
import { useId, useMemo, useState } from "react";
import {
  categories,
  type CategoryId,
  type Project,
} from "@/data/site";
import DraftTag from "./DraftTag";

type Variant = "feature" | "index";

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
      <div
        className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}
      >
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

function IndexCard({ project, number }: { project: Project; number: number }) {
  const label = categories.find((c) => c.id === project.category)?.label;
  return (
    <article className="page-card flex h-full flex-col p-3 pb-5">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        width={800}
        height={500}
        sizes="(min-width: 1152px) 360px, (min-width: 640px) 45vw, 92vw"
        className="aspect-[16/10] w-full border border-ink/70 object-cover object-top"
      />
      <div className="flex flex-1 flex-col px-2 pt-4">
        <p className="folio flex justify-between gap-2">
          <span>
            {String(number).padStart(2, "0")} · {label}
          </span>
          <span>{project.year}</span>
        </p>
        <h3 className="display mt-2 text-2xl font-semibold md:text-3xl">
          {project.title}
          <DraftTag show={project.placeholder} />
        </h3>
        <p className="mt-2 flex-1 text-[0.97rem] text-ink-soft">
          {project.blurb}
        </p>
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
        <div className="mt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
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
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <IndexCard key={p.slug} project={p} number={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
