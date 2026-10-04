"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { journey } from "@/data/site";
import ImageSlot from "./ImageSlot";

type Geometry = {
  d: string;
  width: number;
  height: number;
  length: number;
  /** y coordinate of the thread sampled at evenly spaced lengths. */
  ys: number[];
  stopLens: number[];
};

const SAMPLES = 280;

function lengthAtY(ys: number[], length: number, y: number) {
  if (y <= ys[0]) return 0;
  if (y >= ys[SAMPLES]) return length;
  let lo = 0;
  let hi = SAMPLES;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (ys[mid] <= y) lo = mid;
    else hi = mid;
  }
  const span = ys[hi] - ys[lo] || 1;
  return ((lo + (y - ys[lo]) / span) / SAMPLES) * length;
}

const DOODLES = [
  { cls: "-left-20 top-[9%]", depth: -70, spin: 220, kind: "star" },
  { cls: "-right-20 top-[27%]", depth: -120, spin: -90, kind: "disc" },
  { cls: "-left-16 top-[56%]", depth: -50, spin: 60, kind: "squiggle" },
  { cls: "-right-16 top-[72%]", depth: -90, spin: 140, kind: "flag" },
] as const;

function Doodle({ kind }: { kind: (typeof DOODLES)[number]["kind"] }) {
  const common = {
    viewBox: "0 0 60 60",
    className: "h-12 w-12 lg:h-16 lg:w-16",
    fill: "none",
    stroke: "var(--color-ink)",
    strokeWidth: 2.2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (kind === "star")
    return (
      <svg {...common}>
        <path d="M30 6v48M8 18l44 24M8 42l44-24" />
        <circle cx="30" cy="30" r="5" fill="var(--color-marker)" />
      </svg>
    );
  if (kind === "disc")
    return (
      <svg {...common}>
        <circle cx="30" cy="30" r="22" fill="var(--color-marker)" />
        <path d="M14 22c10-8 22-8 32 0M12 34c12 8 24 8 36 0" opacity="0.6" />
      </svg>
    );
  if (kind === "squiggle")
    return (
      <svg {...common}>
        <path d="M6 36c6-14 10-14 14 0s10 14 14 0 10-14 14 0 6 8 6 8" stroke="var(--color-vermilion)" strokeWidth={3} />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M16 54V8" />
      <path d="M16 8l32 10-32 12z" fill="var(--color-vermilion)" />
    </svg>
  );
}

export default function JourneyThread() {
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureRef = useRef<SVGPathElement>(null);
  const revealRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const spoolRef = useRef<SVGGElement>(null);
  const geoRef = useRef<Geometry | null>(null);
  const motion = useRef({ cur: 0, target: 0, raf: 0, last: 0 });
  const reachedRef = useRef(-1);

  const [geo, setGeo] = useState<Geometry | null>(null);
  const [reached, setReached] = useState(-1);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const measure = useCallback(() => {
    const box = rootRef.current;
    const probe = measureRef.current;
    if (!box || !probe) return;
    const rect = box.getBoundingClientRect();
    const pts = anchorRefs.current
      .filter((el): el is HTMLSpanElement => el !== null)
      .map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rect.left + r.width / 2,
          y: r.top - rect.top + r.height / 2,
        };
      });
    if (pts.length < 2) return;

    const wide = rect.width >= 768;
    const sway = wide ? 110 : 12;
    const lead = { x: pts[0].x, y: pts[0].y - 56 };
    let d = `M ${lead.x.toFixed(1)} 0 L ${lead.x.toFixed(1)} ${lead.y.toFixed(1)}`;
    let prev = lead;
    pts.forEach((p, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const dy = p.y - prev.y;
      d += ` C ${(prev.x + dir * sway).toFixed(1)} ${(prev.y + dy * 0.5).toFixed(1)}, ${(p.x - dir * sway).toFixed(1)} ${(p.y - dy * 0.5).toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      prev = p;
    });

    probe.setAttribute("d", d);
    const length = probe.getTotalLength();
    const ys: number[] = [];
    for (let i = 0; i <= SAMPLES; i++) {
      ys.push(probe.getPointAtLength((length * i) / SAMPLES).y);
    }
    const next: Geometry = {
      d,
      width: rect.width,
      height: rect.height,
      length,
      ys,
      stopLens: pts.map((p) => lengthAtY(ys, length, p.y)),
    };
    geoRef.current = next;
    setGeo(next);
  }, []);

  useEffect(() => {
    measure();
    const box = rootRef.current;
    if (!box) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(box);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  const render = useCallback(
    (len: number) => {
      const g = geoRef.current;
      const box = rootRef.current;
      const reveal = revealRef.current;
      const needle = needleRef.current;
      if (!g || !box || !reveal || !needle) return;

      reveal.style.strokeDashoffset = String(g.length - len);
      box.style.setProperty("--p", (len / g.length).toFixed(4));
      spoolRef.current?.setAttribute(
        "transform",
        `rotate(${(len * 0.55).toFixed(1)} 16 16)`,
      );

      if (reduced || len <= 0.5 || len >= g.length - 0.5) {
        needle.style.opacity = "0";
      } else {
        const p = reveal.getPointAtLength(len);
        const q = reveal.getPointAtLength(Math.min(g.length, len + 3));
        const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
        needle.setAttribute(
          "transform",
          `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`,
        );
        needle.style.opacity = "1";
      }

      let count = -1;
      g.stopLens.forEach((l, i) => {
        if (len >= l - 2) count = i;
      });
      if (count !== reachedRef.current) {
        reachedRef.current = count;
        setReached(count);
      }
    },
    [reduced],
  );

  const targetLength = useCallback(() => {
    const g = geoRef.current;
    const box = rootRef.current;
    if (!g || !box) return 0;
    if (reduced) return g.length;
    const y = window.innerHeight * 0.58 - box.getBoundingClientRect().top;
    return lengthAtY(g.ys, g.length, y);
  }, [reduced]);

  useEffect(() => {
    if (!geo) return;
    const m = motion.current;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - m.last) / 1000);
      m.last = now;
      const k = 1 - Math.exp(-dt * 7);
      m.cur += (m.target - m.cur) * k;
      if (Math.abs(m.target - m.cur) < 0.4) m.cur = m.target;
      render(m.cur);
      m.raf = m.cur === m.target ? 0 : requestAnimationFrame(tick);
    };

    const kick = () => {
      m.target = targetLength();
      if (reduced) {
        m.cur = m.target;
        render(m.cur);
        return;
      }
      if (!m.raf) {
        m.last = performance.now();
        m.raf = requestAnimationFrame(tick);
      }
    };

    m.target = targetLength();
    m.cur = m.target;
    render(m.cur);

    if (!reduced) window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      if (m.raf) cancelAnimationFrame(m.raf);
      m.raf = 0;
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [geo, reduced, render, targetLength]);

  const enhanced = geo !== null && !reduced;
  const total = journey.stops.length;
  const page = Math.max(0, reached) + 1;

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className={`relative overflow-hidden border-y border-ink bg-paper-deep/60 ${enhanced ? "js-thread" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="folio">{journey.kicker}</p>
          <h2
            id="journey-title"
            className="display mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            {journey.title}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-soft">
            {journey.lede}
          </p>
        </header>

        <div ref={rootRef} className="relative mt-14 md:mt-20">
          {/* Sticky page counter with a spool that unwinds as you scroll */}
          <div
            aria-hidden="true"
            className="pointer-events-none sticky top-[4.6rem] z-30 -mt-4 mb-4 flex h-0 justify-end overflow-visible md:justify-center"
          >
            <div className="flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3 py-1 shadow-[2px_2px_0_var(--color-vermilion)]">
              <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="var(--color-ink)" strokeWidth="1.8" strokeLinecap="round">
                <g ref={spoolRef}>
                  <circle cx="16" cy="16" r="11" fill="var(--color-card)" />
                  <circle cx="16" cy="16" r="3" fill="var(--color-vermilion)" />
                  <path d="M16 5v6M16 21v6M5 16h6M21 16h6" />
                </g>
              </svg>
              <span className="folio !text-ink">
                Page {String(page).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Parallax doodles in the page margins (wide screens) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
            {DOODLES.map((dd) => (
              <div
                key={dd.kind}
                className={`doodle absolute ${dd.cls}`}
                style={
                  {
                    "--depth": `${dd.depth}px`,
                    "--spin": `${dd.spin}deg`,
                  } as React.CSSProperties
                }
              >
                <Doodle kind={dd.kind} />
              </div>
            ))}
          </div>

          <svg
            aria-hidden="true"
            focusable="false"
            className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
            width={geo?.width ?? 0}
            height={geo?.height ?? 0}
          >
            <path ref={measureRef} fill="none" stroke="none" />
            {geo && (
              <>
                <defs>
                  <mask
                    id="thread-reveal"
                    maskUnits="userSpaceOnUse"
                    x={-60}
                    y={-60}
                    width={geo.width + 120}
                    height={geo.height + 120}
                  >
                    <path
                      ref={revealRef}
                      d={geo.d}
                      fill="none"
                      stroke="#fff"
                      strokeWidth="16"
                      strokeLinecap="butt"
                      strokeDasharray={geo.length}
                      strokeDashoffset={reduced ? 0 : geo.length}
                    />
                  </mask>
                </defs>

                {/* punched holes: the path that is still to be sewn */}
                <path
                  d={geo.d}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />

                <g mask="url(#thread-reveal)" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d={geo.d} stroke="var(--color-ink)" strokeOpacity="0.22" strokeWidth="6" transform="translate(2 4)" />
                  <path d={geo.d} stroke="var(--color-vermilion)" strokeWidth="3.4" />
                  <path d={geo.d} stroke="var(--color-card)" strokeOpacity="0.7" strokeWidth="1.2" strokeDasharray="2 7" />
                </g>

                <g ref={needleRef} style={{ opacity: 0 }}>
                  <g className="needle-sway">
                    <path d="M0 0 L-38 -1.9 L-38 1.9 Z" fill="var(--color-ink)" />
                    <path d="M-8 -1.1 L-30 -1.5" stroke="var(--color-card)" strokeOpacity="0.5" strokeWidth="0.7" />
                    <ellipse cx="-32" cy="0" rx="3" ry="1" fill="var(--color-paper)" />
                    <circle cx="0" cy="0" r="2.2" fill="var(--color-vermilion)" />
                  </g>
                </g>
              </>
            )}
          </svg>

          <ol className="relative z-10 space-y-12 md:space-y-28">
            {journey.stops.map((stop, i) => {
              const right = i % 2 === 0;
              const on = reached >= i || !enhanced;
              const bigYear = (
                <p
                  aria-hidden="true"
                  className={`spread-year hidden md:block ${right ? "" : "md:text-right"}`}
                >
                  {stop.year}
                </p>
              );
              return (
                <li
                  key={stop.page}
                  data-reached={on}
                  style={
                    { "--tilt": `${right ? 1.4 : -1.4}deg` } as React.CSSProperties
                  }
                  className="thread-stop relative pl-12 md:grid md:min-h-[26rem] md:grid-cols-2 md:items-center md:pl-0"
                >
                  <span
                    ref={(el) => {
                      anchorRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="stop-hole absolute left-[3px] top-9 z-20 block h-[22px] w-[22px] md:left-1/2 md:top-1/2 md:-ml-[11px] md:-mt-[11px]"
                  >
                    <svg viewBox="0 0 22 22" className="h-full w-full" fill="none" strokeLinecap="round">
                      <circle className="hole-ring" cx="11" cy="11" r="10" />
                      <circle className="hole-dot" cx="11" cy="11" r="4.5" />
                      <path className="hole-x" d="M5 5l12 12M17 5L5 17" pathLength={1} />
                    </svg>
                  </span>

                  <div
                    className={`spread-photo hidden md:row-start-1 md:block ${
                      right ? "md:col-start-1 md:mr-20" : "md:col-start-2 md:ml-20"
                    }`}
                  >
                    {stop.image ? (
                      <div className="page-card p-3 pb-4">
                        <ImageSlot
                          slot={stop.image}
                          aspect="aspect-[5/4]"
                          sizes="(min-width: 1152px) 460px, 40vw"
                          captionClassName="hand mt-3 text-center text-2xl"
                        />
                      </div>
                    ) : (
                      bigYear
                    )}
                  </div>

                  <article
                    className={`thread-card page-card relative p-5 md:row-start-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none ${
                      right ? "md:col-start-2 md:ml-20" : "md:col-start-1 md:mr-20 md:text-right"
                    }`}
                  >
                    {stop.image && (
                      <ImageSlot
                        slot={stop.image}
                        sizes="80vw"
                        className="mb-5 md:hidden"
                      />
                    )}
                    {stop.image && bigYear}
                    <div className="flex items-baseline justify-between gap-4 md:hidden">
                      <p className="folio">{stop.page}</p>
                      <p className="font-display text-3xl font-semibold italic text-vermilion">
                        {stop.year}
                      </p>
                    </div>
                    <p className="folio hidden md:mt-4 md:block">
                      {stop.page} · {stop.year}
                    </p>
                    <h3 className="display mt-3 text-2xl font-semibold md:mt-2 md:text-4xl lg:text-[2.75rem]">
                      {stop.title}
                    </h3>
                    <p
                      className={`mt-3 text-ink-soft md:mt-4 md:max-w-md md:text-lg ${right ? "" : "md:ml-auto"}`}
                    >
                      {stop.body}
                    </p>
                    <p className="mt-4 inline-block border-t border-ink pt-2 text-sm font-semibold md:mt-5 md:border-t-2 md:border-vermilion md:text-base">
                      {stop.tag}
                    </p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
