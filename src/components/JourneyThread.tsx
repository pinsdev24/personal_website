"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { journey } from "@/data/site";
import DraftTag from "./DraftTag";

type Geometry = {
  d: string;
  width: number;
  height: number;
  length: number;
  /** y coordinate of the thread sampled at evenly spaced lengths. */
  ys: number[];
  stopYs: number[];
};

const SAMPLES = 240;

export default function JourneyThread() {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureRef = useRef<SVGPathElement>(null);
  const drawnRef = useRef<SVGPathElement>(null);
  const needleRef = useRef<SVGGElement>(null);
  const geoRef = useRef<Geometry | null>(null);
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
    const box = containerRef.current;
    if (!box) return;
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
    const sway = wide ? 70 : 11;
    let d = `M ${pts[0].x.toFixed(1)} 0 L ${pts[0].x.toFixed(1)} ${(pts[0].y - 40).toFixed(1)}`;
    let prev = { x: pts[0].x, y: pts[0].y - 40 };
    pts.forEach((p, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const dy = p.y - prev.y;
      d += ` C ${(prev.x + dir * sway).toFixed(1)} ${(prev.y + dy * 0.5).toFixed(1)}, ${(p.x - dir * sway).toFixed(1)} ${(p.y - dy * 0.5).toFixed(1)}, ${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
      prev = p;
    });

    const probe = measureRef.current;
    if (!probe) return;
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
      stopYs: pts.map((p) => p.y),
    };
    geoRef.current = next;
    setGeo(next);
  }, []);

  useEffect(() => {
    measure();
    const box = containerRef.current;
    if (!box) return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(box);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  const update = useCallback(() => {
    const g = geoRef.current;
    const box = containerRef.current;
    const path = drawnRef.current;
    const needle = needleRef.current;
    if (!g || !box || !path || !needle) return;

    const top = box.getBoundingClientRect().top;
    const targetY = window.innerHeight * 0.58 - top;

    let len: number;
    if (reduced) {
      len = g.length;
    } else if (targetY <= g.ys[0]) {
      len = 0;
    } else if (targetY >= g.ys[SAMPLES]) {
      len = g.length;
    } else {
      let lo = 0;
      let hi = SAMPLES;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (g.ys[mid] <= targetY) lo = mid;
        else hi = mid;
      }
      const span = g.ys[hi] - g.ys[lo] || 1;
      const t = (targetY - g.ys[lo]) / span;
      len = ((lo + t) / SAMPLES) * g.length;
    }

    path.style.strokeDashoffset = String(g.length - len);

    if (reduced || len <= 0) {
      needle.style.opacity = "0";
    } else {
      const p = path.getPointAtLength(len);
      const q = path.getPointAtLength(Math.min(g.length, len + 2));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      needle.setAttribute(
        "transform",
        `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`,
      );
      needle.style.opacity = len >= g.length - 1 ? "0" : "1";
    }

    let count = -1;
    g.stopYs.forEach((y, i) => {
      if (reduced || y <= targetY + 24) count = i;
    });
    if (count !== reachedRef.current) {
      reachedRef.current = count;
      setReached(count);
    }
  }, [reduced]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    schedule();
    if (!reduced) {
      window.addEventListener("scroll", schedule, { passive: true });
    }
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [update, geo, reduced]);

  const enhanced = geo !== null && !reduced;

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className={`relative border-y border-ink bg-paper-deep/60 ${enhanced ? "js-thread" : ""}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <header className="mx-auto max-w-2xl text-center">
          <p className="folio">{journey.kicker}</p>
          <h2
            id="journey-title"
            className="display mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl"
          >
            {journey.title}
            <DraftTag show={journey.placeholder} />
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-ink-soft">
            {journey.lede}
          </p>
        </header>

        <div ref={containerRef} className="relative mt-14 md:mt-20">
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
                <path
                  d={geo.d}
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="1 9"
                />
                <path
                  ref={drawnRef}
                  d={geo.d}
                  fill="none"
                  stroke="var(--color-vermilion)"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={geo.length}
                  strokeDashoffset={reduced ? 0 : geo.length}
                />
                <g ref={needleRef} style={{ opacity: 0 }}>
                  <g className="motion-safe:animate-[needle-bob_1.6s_ease-in-out_infinite]">
                    <path
                      d="M0 0 L-34 -1.6 L-34 1.6 Z"
                      fill="var(--color-ink)"
                    />
                    <ellipse
                      cx="-28"
                      cy="0"
                      rx="2.6"
                      ry="0.9"
                      fill="var(--color-paper)"
                    />
                  </g>
                </g>
              </>
            )}
          </svg>

          <ol className="relative z-10 space-y-10 md:space-y-4">
            {journey.stops.map((stop, i) => {
              const right = i % 2 === 0;
              return (
                <li
                  key={stop.page}
                  data-reached={reached >= i || !enhanced}
                  className="thread-stop relative pl-12 md:grid md:grid-cols-2 md:pb-10 md:pl-0"
                >
                  <span
                    ref={(el) => {
                      anchorRefs.current[i] = el;
                    }}
                    aria-hidden="true"
                    className={`absolute left-[7px] top-9 z-20 block h-[14px] w-[14px] rounded-full border-2 transition-colors duration-500 md:left-1/2 md:-ml-[7px] ${
                      reached >= i || !enhanced
                        ? "border-vermilion bg-marker"
                        : "border-ink bg-paper"
                    }`}
                  />
                  <article
                    className={`thread-card page-card relative p-6 md:p-7 ${
                      right
                        ? "md:col-start-2 md:ml-14"
                        : "md:col-start-1 md:mr-14"
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="folio">{stop.page}</p>
                      <p className="font-display text-3xl font-semibold italic text-vermilion">
                        {stop.year}
                      </p>
                    </div>
                    <h3 className="display mt-3 text-2xl font-semibold md:text-3xl">
                      {stop.title}
                      <DraftTag show={stop.placeholder} />
                    </h3>
                    <p className="mt-3 text-ink-soft">{stop.body}</p>
                    <p className="mt-4 inline-block border-t border-ink pt-2 text-sm font-semibold">
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
