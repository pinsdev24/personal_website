import type { SVGProps } from "react";

type ArtProps = Omit<SVGProps<SVGSVGElement>, "children"> & { label: string };

const INK = "var(--color-ink)";
const RED = "var(--color-vermilion)";
const MARK = "var(--color-marker)";
const CARD = "var(--color-card)";
const DEEP = "var(--color-paper-deep)";

function Svg({ label, children, ...rest }: ArtProps & { children: React.ReactNode }) {
  return (
    <svg role="img" aria-label={label} fill="none" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}

function Hatch({ id, gap = 6, opacity = 0.45 }: { id: string; gap?: number; opacity?: number }) {
  return (
    <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2={gap} stroke={INK} strokeWidth="1.2" opacity={opacity} />
    </pattern>
  );
}

/** Two-link robot arm reaching for a target. Hero illustration. */
export function RobotArm(props: Omit<ArtProps, "label"> & { label?: string }) {
  const { label = "Illustration of a two-joint robot arm reaching for a target", ...rest } = props;
  return (
    <Svg viewBox="0 0 480 440" label={label} {...rest}>
      <defs>
        <Hatch id="hatch-arm" gap={7} />
      </defs>
      {/* reach envelope */}
      <path d="M-30 360 A270 270 0 0 1 510 360" stroke={INK} strokeWidth="1.5" strokeDasharray="2 9" opacity="0.55" />
      <path d="M60 360 A180 180 0 0 1 420 360" stroke={INK} strokeWidth="1" strokeDasharray="1 7" opacity="0.35" />
      {/* ground */}
      <path d="M20 400 H460" stroke={INK} strokeWidth="2.5" />
      <rect x="20" y="404" width="440" height="16" fill="url(#hatch-arm)" stroke="none" />
      {/* target */}
      <g className="art-pulse">
        <circle cx="310" cy="100" r="16" fill={MARK} stroke={INK} strokeWidth="2" />
        <path d="M310 70v18M310 112v18M280 100h18M322 100h18" stroke={INK} strokeWidth="1.5" />
      </g>
      {/* base */}
      <path d="M190 400 L204 366 H276 L290 400 Z" fill={DEEP} stroke={INK} strokeWidth="2.5" />
      <rect x="212" y="352" width="56" height="16" rx="3" fill={CARD} stroke={INK} strokeWidth="2.5" />
      {/* link 1 + link 2 */}
      <g className="art-arm-1">
        <rect x="227" y="203" width="26" height="164" rx="13" fill={CARD} stroke={INK} strokeWidth="2.5" />
        <path d="M240 225 V345" stroke={INK} strokeWidth="1.2" strokeDasharray="1 6" opacity="0.6" />
        <g className="art-arm-2">
          <rect x="228" y="73" width="24" height="144" rx="12" fill={CARD} stroke={INK} strokeWidth="2.5" />
          <path d="M240 95 V195" stroke={INK} strokeWidth="1.2" strokeDasharray="1 6" opacity="0.6" />
          <g className="art-grip-l">
            <path d="M238 76 L226 40 L233 38 L244 72 Z" fill={DEEP} stroke={INK} strokeWidth="2" />
          </g>
          <g className="art-grip-r">
            <path d="M242 76 L254 40 L247 38 L236 72 Z" fill={DEEP} stroke={INK} strokeWidth="2" />
          </g>
          <circle cx="240" cy="78" r="9" fill={RED} stroke={INK} strokeWidth="2.5" />
          <circle cx="240" cy="78" r="2.5" fill={CARD} stroke="none" />
          <circle cx="240" cy="210" r="11" fill={RED} stroke={INK} strokeWidth="2.5" />
          <circle cx="240" cy="210" r="3" fill={CARD} stroke="none" />
        </g>
        <circle cx="240" cy="360" r="12" fill={RED} stroke={INK} strokeWidth="2.5" />
        <circle cx="240" cy="360" r="3" fill={CARD} stroke="none" />
      </g>
      {/* annotations */}
      <g fontFamily="var(--font-caveat)" fontSize="26" fill={RED} stroke="none">
        <text x="120" y="338">θ₁</text>
        <text x="136" y="196">θ₂</text>
        <text x="352" y="86" transform="rotate(-6 352 86)">goal</text>
      </g>
      <path d="M118 322 q-18 -12 -2 -30" stroke={RED} strokeWidth="1.5" />
      <path d="M343 80 q-8 8 -20 14" stroke={RED} strokeWidth="1.5" />
    </Svg>
  );
}

/** Feedback control loop with a step response underneath. */
export function ControlLoop(props: Omit<ArtProps, "label"> & { label?: string }) {
  const { label = "Block diagram of a feedback control loop and its step response", ...rest } = props;
  return (
    <Svg viewBox="0 0 420 300" label={label} {...rest}>
      <g stroke={INK} strokeWidth="2">
        <path d="M14 66 H64" />
        <circle cx="80" cy="66" r="16" fill={CARD} />
        <path d="M96 66 H128" />
        <rect x="128" y="42" width="72" height="48" rx="4" fill={CARD} />
        <path d="M200 66 H238" />
        <rect x="238" y="42" width="76" height="48" rx="4" fill={DEEP} />
        <path d="M314 66 H400" />
        <path d="M348 66 V118 H80 V82" />
        <path d="M76 90 l4 -8 l4 8" fill={INK} />
        <path d="M124 62 l6 4 l-6 4 M234 62 l6 4 l-6 4 M392 62 l8 4 l-8 4" strokeWidth="1.6" />
      </g>
      <circle cx="348" cy="66" r="4" fill={RED} stroke="none" />
      <g fontFamily="var(--font-fraunces)" fontStyle="italic" fontSize="17" fill={INK} stroke="none">
        <text x="20" y="56">r(t)</text>
        <text x="102" y="56">e</text>
        <text x="158" y="72">C</text>
        <text x="270" y="72">P</text>
        <text x="368" y="56">y(t)</text>
        <text x="96" y="136" fill={RED}>feedback</text>
      </g>
      <g fontFamily="var(--font-instrument)" fontWeight="700" fontSize="15" fill={INK} stroke="none">
        <text x="55" y="58">+</text>
        <text x="86" y="104">−</text>
      </g>
      {/* step response plot */}
      <g stroke={INK} strokeWidth="1.6">
        <path d="M40 150 V282 H404" />
        <path d="M40 188 H404" strokeDasharray="3 6" opacity="0.6" strokeWidth="1.2" />
      </g>
      <path
        className="art-draw"
        d="M40 282 C70 282, 88 168, 132 168 S190 202, 232 192 S290 186, 404 188"
        stroke={RED}
        strokeWidth="3"
        pathLength={1}
      />
      <circle r="5.5" fill={MARK} stroke={INK} strokeWidth="2" className="art-ride" />
      <g fontFamily="var(--font-caveat)" fontSize="22" fill={RED} stroke="none">
        <text x="136" y="158">overshoot</text>
        <text x="300" y="176">settled</text>
      </g>
      <text x="360" y="298" fontFamily="var(--font-instrument)" fontSize="11" fontWeight="600" letterSpacing="1.5" fill={INK} stroke="none">
        TIME →
      </text>
    </Svg>
  );
}

/** Top-down robot with a lidar sweep planning a path around an obstacle. */
export function RoverLidar(props: Omit<ArtProps, "label"> & { label?: string }) {
  const { label = "Top-down illustration of a rover scanning an obstacle with lidar and planning a path to a flag", ...rest } = props;
  const cx = 260;
  const cy = 156;
  const hits = Array.from({ length: 11 }, (_, i) => {
    const a = ((115 + i * 13) * Math.PI) / 180;
    return { x: cx + 40 * Math.cos(a), y: cy + 40 * Math.sin(a) };
  });
  return (
    <Svg viewBox="0 0 420 300" label={label} {...rest}>
      <defs>
        <Hatch id="hatch-rover" gap={6} />
      </defs>
      {/* floor ticks */}
      <g stroke={INK} strokeWidth="1" opacity="0.25">
        <path d="M0 250 H420 M0 200 H420 M0 150 H420 M0 100 H420 M0 50 H420" strokeDasharray="1 9" />
      </g>
      {/* obstacle */}
      <circle cx={cx} cy={cy} r="40" fill="url(#hatch-rover)" stroke={INK} strokeWidth="2.5" />
      <path d="M330 232 H400 V258 H330 Z" fill="url(#hatch-rover)" stroke={INK} strokeWidth="2.5" />
      {/* lidar rays + hits */}
      <g stroke={RED} strokeWidth="1" opacity="0.5">
        {hits.map((h, i) => (
          <path key={i} d={`M104 204 L${h.x.toFixed(1)} ${h.y.toFixed(1)}`} />
        ))}
      </g>
      {hits.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r="3.2" fill={RED} stroke="none" />
      ))}
      {/* planned path */}
      <path
        className="art-march"
        d="M104 204 C150 200, 170 84, 252 84 S338 62, 372 62"
        stroke={INK}
        strokeWidth="2.5"
        strokeDasharray="2 9"
      />
      {/* goal */}
      <path d="M372 62 V30" stroke={INK} strokeWidth="2.5" />
      <path d="M372 30 L398 38 L372 48 Z" fill={MARK} stroke={INK} strokeWidth="2.5" />
      {/* rover */}
      <g transform="translate(104 204) rotate(-14)">
        <g className="art-sweep">
          <path d="M0 0 L120 -30 A124 124 0 0 1 120 30 Z" fill={RED} opacity="0.16" stroke="none" />
        </g>
        <rect x="-26" y="-20" width="52" height="40" rx="9" fill={CARD} stroke={INK} strokeWidth="2.5" />
        <rect x="-20" y="-29" width="18" height="9" rx="3" fill={INK} stroke="none" />
        <rect x="-20" y="20" width="18" height="9" rx="3" fill={INK} stroke="none" />
        <rect x="6" y="-29" width="18" height="9" rx="3" fill={INK} stroke="none" />
        <rect x="6" y="20" width="18" height="9" rx="3" fill={INK} stroke="none" />
        <circle cx="0" cy="0" r="9" fill={RED} stroke={INK} strokeWidth="2.5" />
        <circle cx="0" cy="0" r="2.5" fill={CARD} stroke="none" />
        <path d="M14 -6 L24 0 L14 6" stroke={INK} strokeWidth="2" />
      </g>
      <g fontFamily="var(--font-caveat)" fontSize="22" fill={RED} stroke="none">
        <text x="40" y="250">lidar</text>
        <text x="300" y="104" transform="rotate(-4 300 104)">plan</text>
      </g>
    </Svg>
  );
}

/** Grid world: an agent learns a path to a reward. */
export function GridWorld(props: Omit<ArtProps, "label"> & { label?: string }) {
  const { label = "Grid world where a learning agent finds a path to a star reward around walls", ...rest } = props;
  const ox = 30;
  const oy = 16;
  const s = 48;
  const cols = 6;
  const rows = 5;
  const walls = new Set(["2,1", "2,2", "2,3", "4,2", "4,3", "4,4"]);
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) cells.push({ x, y });
  const value = (x: number, y: number) => {
    const d = Math.abs(5 - x) + Math.abs(0 - y);
    return Math.max(0, 1 - d / 9);
  };
  const c = (x: number, y: number) => [ox + s * x + s / 2, oy + s * y + s / 2] as const;
  const path = [c(0, 4), c(1, 4), c(1, 0), c(5, 0)].map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const miss = [c(0, 4), c(3, 4), c(3, 2)].map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const [gx, gy] = c(5, 0);
  const [mx, my] = c(3, 2);
  return (
    <Svg viewBox="0 0 360 310" label={label} {...rest}>
      <defs>
        <Hatch id="hatch-grid" gap={6} opacity={0.55} />
      </defs>
      {cells.map(({ x, y }) =>
        walls.has(`${x},${y}`) ? (
          <rect key={`${x}${y}`} x={ox + s * x} y={oy + s * y} width={s} height={s} fill="url(#hatch-grid)" stroke={INK} strokeWidth="1.5" />
        ) : (
          <rect
            key={`${x}${y}`}
            x={ox + s * x}
            y={oy + s * y}
            width={s}
            height={s}
            fill={MARK}
            fillOpacity={value(x, y) * 0.7}
            stroke={INK}
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        ),
      )}
      <rect x={ox} y={oy} width={s * cols} height={s * rows} stroke={INK} strokeWidth="2.5" />
      {/* failed attempt */}
      <path d={miss} stroke={INK} strokeWidth="2" strokeDasharray="3 6" opacity="0.55" />
      <path d={`M${mx - 7} ${my - 7} l14 14 M${mx + 7} ${my - 7} l-14 14`} stroke={INK} strokeWidth="2.5" />
      {/* learned path */}
      <path className="art-draw art-draw-slow" d={path} stroke={RED} strokeWidth="3.5" pathLength={1} />
      {/* goal star */}
      <path
        transform={`translate(${gx} ${gy})`}
        d="M0 -15 L4.4 -4.8 L15 -4.6 L6.6 2.2 L9.4 12.6 L0 6.6 L-9.4 12.6 L-6.6 2.2 L-15 -4.6 L-4.4 -4.8 Z"
        fill={RED}
        stroke={INK}
        strokeWidth="2"
      />
      {/* agent */}
      <g className="art-agent">
        <circle r="11" fill={CARD} stroke={INK} strokeWidth="2.5" />
        <circle cx="-3.5" cy="-2" r="2" fill={INK} stroke="none" />
        <circle cx="3.5" cy="-2" r="2" fill={INK} stroke="none" />
        <path d="M-12 -12 l-4 -6 M12 -12 l4 -6" stroke={INK} strokeWidth="2" />
      </g>
      {/* reward curve */}
      <g stroke={INK} strokeWidth="1.5">
        <path d="M30 300 H190 M30 300 V272" />
      </g>
      <path d="M32 296 C46 292, 52 296, 62 288 S84 292, 96 282 S116 286, 128 278 S158 276, 188 272" stroke={RED} strokeWidth="2.2" />
      <g fontFamily="var(--font-caveat)" fontSize="21" fill={RED} stroke="none">
        <text x="200" y="298">reward / episode</text>
      </g>
    </Svg>
  );
}

/** Speech waveform encoded into multilingual embedding clusters. */
export function SpeechEmbedding(props: Omit<ArtProps, "label"> & { label?: string }) {
  const { label = "A speech waveform encoded into clusters of embeddings for several languages", ...rest } = props;
  const bars = Array.from({ length: 44 }, (_, i) => {
    const env = Math.sin((i / 43) * Math.PI) ** 0.8;
    const h = 8 + env * (26 + 22 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.6)));
    return { x: 18 + i * 5.6, h };
  });
  const seeded = (seed: number) => {
    let t = seed;
    return () => {
      t = (t * 1664525 + 1013904223) % 4294967296;
      return t / 4294967296;
    };
  };
  const r1 = seeded(7);
  const clusters = [
    { cx: 392, cy: 62, kind: "circle" },
    { cx: 442, cy: 128, kind: "square" },
    { cx: 372, cy: 160, kind: "tri" },
  ] as const;
  return (
    <Svg viewBox="0 0 500 220" label={label} {...rest}>
      <g stroke={INK} strokeWidth="2.6">
        {bars.map((b, i) => (
          <path
            key={i}
            className="art-bar"
            style={{ animationDelay: `${(i % 11) * 0.12}s` }}
            d={`M${b.x} ${110 - b.h} V${110 + b.h}`}
            opacity={0.85}
          />
        ))}
      </g>
      <path d="M266 110 H300" stroke={INK} strokeWidth="2" />
      <path d="M294 103 l8 7 l-8 7" stroke={INK} strokeWidth="2" />
      <path d="M300 74 L330 88 V132 L300 146 Z" fill={DEEP} stroke={INK} strokeWidth="2.5" />
      <path d="M330 110 H352" stroke={INK} strokeWidth="2" />
      {clusters.map((k, ci) =>
        Array.from({ length: 9 }, (_, i) => {
          const x = k.cx + (r1() - 0.5) * 70;
          const y = k.cy + (r1() - 0.5) * 56;
          if (k.kind === "circle")
            return <circle key={`${ci}${i}`} cx={x} cy={y} r="4.6" fill={RED} stroke={INK} strokeWidth="1.5" />;
          if (k.kind === "square")
            return <rect key={`${ci}${i}`} x={x - 4.4} y={y - 4.4} width="8.8" height="8.8" fill={INK} stroke="none" />;
          return (
            <path key={`${ci}${i}`} d={`M${x} ${y - 5.5} L${x + 5.2} ${y + 4} H${x - 5.2} Z`} fill={MARK} stroke={INK} strokeWidth="1.5" />
          );
        }),
      )}
      <g fontFamily="var(--font-caveat)" fontSize="22" fill={RED} stroke="none">
        <text x="14" y="206">waveform</text>
        <text x="296" y="64">f(θ)</text>
        <text x="410" y="205">no labels needed</text>
      </g>
    </Svg>
  );
}
