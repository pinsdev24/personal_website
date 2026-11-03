"use client";

import { useId, useState, type PointerEvent } from "react";

const INITIAL = { x: 305, y: 158 };
const BASE = { x: 190, y: 375 };

function constrain(x: number, y: number) {
  const dx = x - BASE.x;
  const dy = y - BASE.y;
  const distance = Math.hypot(dx, dy);
  const radius = Math.min(276, Math.max(85, distance));
  const scale = radius / (distance || 1);
  return { x: BASE.x + dx * scale, y: BASE.y + dy * scale };
}

/** A two-link inverse-kinematics study. The needle and thread share one endpoint. */
export default function ThreadMachine() {
  const id = useId();
  const [target, setTarget] = useState(INITIAL);
  const dx = target.x - BASE.x;
  const dy = target.y - BASE.y;
  const distance = Math.hypot(dx, dy);
  const a = Math.acos(Math.max(-1, Math.min(1, (150 ** 2 + distance ** 2 - 140 ** 2) / (2 * 150 * distance))));
  const angle = Math.atan2(dy, dx) - a;
  const elbow = { x: BASE.x + 150 * Math.cos(angle), y: BASE.y + 150 * Math.sin(angle) };
  const arm = `M ${BASE.x} ${BASE.y} L ${elbow.x} ${elbow.y} L ${target.x} ${target.y}`;
  const thread = `M 376 359 C 426 311 445 392 395 410 C 340 430 319 368 354 345 C 383 326 405 367 368 379 C 315 397 305 311 347 283 C 405 245 407 187 ${target.x} ${target.y}`;

  function guideNeedle(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    setTarget(constrain(
      Math.max(75, Math.min(415, ((event.clientX - rect.left) / rect.width) * 480)),
      Math.max(95, Math.min(305, ((event.clientY - rect.top) / rect.height) * 460)),
    ));
  }

  return (
    <div
      className="thread-machine"
      role="group"
      tabIndex={0}
      aria-label="Interactive robot arm guiding a sewing needle"
      aria-describedby={`${id}-help`}
      onPointerMove={(event) => {
        if (event.pointerType === "touch") return;
        guideNeedle(event);
      }}
      onPointerDown={(event) => {
        if (event.pointerType === "touch") guideNeedle(event);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "touch") setTarget(INITIAL);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" || event.key === "Home") {
          event.preventDefault();
          setTarget(INITIAL);
          return;
        }
        if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        const x = target.x + (event.key === "ArrowLeft" ? -12 : event.key === "ArrowRight" ? 12 : 0);
        const y = target.y + (event.key === "ArrowUp" ? -12 : event.key === "ArrowDown" ? 12 : 0);
        setTarget(constrain(Math.max(75, Math.min(415, x)), Math.max(95, Math.min(305, y))));
      }}
    >
      <svg viewBox="0 0 480 460" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label="A mechanical arm holds a needle, pulling a vermilion thread from a spool">
        <defs>
          <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--color-ink)" opacity="0.18" />
          </pattern>
          <pattern id={`${id}-hatch`} width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <path d="M0 0V6" stroke="var(--color-ink)" opacity="0.25" />
          </pattern>
        </defs>
        <rect x="18" y="26" width="444" height="402" fill={`url(#${id}-grid)`} />
        <g stroke="var(--color-ink)" opacity="0.35">
          <path d="M18 44V26H36 M444 26H462V44 M18 410V428H36 M444 428H462V410" />
          <path d="M42 375A148 148 0 0 1 338 375 M-20 375A210 210 0 0 1 400 375" strokeDasharray="2 8" />
        </g>
        <path d="M54 402H298" stroke="var(--color-ink)" strokeWidth="1.5" />
        <rect x="54" y="405" width="244" height="10" fill={`url(#${id}-hatch)`} />
        <path d="M146 401L158 375H222L234 401Z" fill="var(--color-paper-deep)" stroke="var(--color-ink)" strokeWidth="2" />
        <path d={thread} stroke="var(--color-ink)" strokeOpacity="0.1" strokeWidth="5" transform="translate(1 2)" />
        <path d={thread} stroke="var(--color-vermilion)" strokeWidth="2.6" />
        <path d={arm} stroke="var(--color-ink)" strokeWidth="24" />
        <path d={arm} stroke="var(--color-card)" strokeWidth="20" />
        <path d={arm} stroke="var(--color-ink)" strokeOpacity="0.4" strokeWidth="1" strokeDasharray="1 5" />
        {[BASE, elbow].map((point, index) => (
          <g key={index}>
            <circle cx={point.x} cy={point.y} r="11" fill="var(--color-vermilion)" stroke="var(--color-ink)" strokeWidth="2" />
            <circle cx={point.x} cy={point.y} r="3" fill="var(--color-card)" />
          </g>
        ))}
        <g transform={`translate(${target.x} ${target.y}) rotate(-34)`}>
          <path d="M0 0V-43" stroke="var(--color-ink)" strokeWidth="2.6" />
          <ellipse cx="0" cy="-36" rx="2.8" ry="5" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.5" />
          <rect x="-8" y="-8" width="16" height="16" rx="4" fill="var(--color-paper-deep)" stroke="var(--color-ink)" strokeWidth="2" />
          <circle r="3" fill="var(--color-vermilion)" />
        </g>
        <g transform="translate(376 359) rotate(15)" stroke="var(--color-ink)" strokeWidth="1.5">
          <path d="M-17-19H17V19H-17Z" fill="var(--color-vermilion)" />
          <path d="M-17-12H17 M-17-5H17 M-17 2H17 M-17 9H17 M-17 16H17" stroke="var(--color-paper)" opacity="0.5" />
          <rect x="-22" y="-24" width="44" height="7" rx="2" fill="var(--color-paper-deep)" />
          <rect x="-22" y="17" width="44" height="7" rx="2" fill="var(--color-paper-deep)" />
        </g>
        <g fill="var(--color-vermilion)" fontFamily="var(--font-hand)" fontSize="24">
          <text x="46" y="110" transform="rotate(-7 46 110)">an idea → a little movement</text>
          <text x="312" y="447" transform="rotate(-4 312 447)">the common thread</text>
        </g>
        <path d="M335 425Q314 413 332 393" stroke="var(--color-vermilion)" strokeWidth="1.2" />
      </svg>
      <p id={`${id}-help`} className="thread-machine-help">Guide the needle <span aria-hidden="true">↗</span><span className="sr-only">. Move your cursor, tap the sketch, or use the arrow keys. Press Home to reset.</span></p>
    </div>
  );
}
