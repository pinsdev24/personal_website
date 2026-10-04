# Editorial portfolio

A personal portfolio set as a small magazine: paper-toned palette, strong
typography, numbered entries, margin notes, and a single **thread** that is
sewn down the page as you scroll.

Built on the stack that was already in the repo: **Next.js 16 (App Router) ·
React 19 · TypeScript · Tailwind CSS v4**. All motion is plain CSS, SVG and
`requestAnimationFrame`; the new pages do not use any animation library.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run lint     # ESLint
npm run build    # production build (type-checks too)
npm run start    # serve the production build
```

Node 20+ is recommended. Fonts (Fraunces, Instrument Sans, Caveat) are fetched
by `next/font` at build time, so the first build needs network access.

## Pages

| Route   | What it is                                                                                          |
| ------- | --------------------------------------------------------------------------------------------------- |
| `/`     | Cover (slim hero + robot-arm illustration), the thread with illustrated journey cards, field notes (control / robotics / RL), master's research with its published paper, selected work (sticky sidebar + scrolling projects), certifications |
| `/work` | "The back room": a darker, themed archive of every project, with filter pills and an exit link at both ends |

The selected-work section keeps a narrow sticky left column (heading, one line,
filter pills) while the three curated projects scroll on the right; it stacks on
mobile. Which projects appear, and in which order, is `selected.slugs` in the
data file. The work page follows a three-tier structure: those curated projects, a flat filterable archive one level deeper, and a pointer to the
full GitHub for everything else. Copy, art and palette are original.

## Editing the content

**Everything you are meant to edit lives in one file: [`src/data/site.ts`](src/data/site.ts).**
It covers contact details, nav, hero copy, the journey stops, field notes, the
master's research, certifications, the project list and the footer.

Placeholder content is clearly marked:

- Facts (names, links, dates, screenshots, certificates) come from the previous
  version of this portfolio (still in `src/legacy/`).
- Wording drafted for this redesign carries `placeholder: true` and shows a
  dashed red **draft** tag. Rewrite it, then set `placeholder` to `false`.
- To hide every draft tag at once, set `showPlaceholderMarkers = false`.

### Image slots

Each journey stop has an `image` slot: `{ src, suggestedPath, alt, caption, position? }`
(`position` is a CSS `object-position` for photos that get cropped).
While `src` is `null` the page shows a hatched dashed "Placeholder - image slot"
frame displaying the suggested path. To fill one: drop the file in
`public/images/journey/` (for example `01-valide.jpg`) and set
`src: "/images/journey/01-valide.jpg"`. Projects use `image: { src, alt }` the
same way (`null` shows a slot with the suggested `/images/projects/<slug>.png`).
Certifications use `image`. Photos live in `public/images/journey/` and `public/images/research/`,
project screenshots in `public/images/projects/` (WebP, about 1800px wide).

### Research and certifications

`research` holds the UY1 master's title (French, verbatim), a draft English
translation, abstract, keywords and a `details` list (year, supervisor, models,
thesis link). Leave a `value` empty and the page shows a "to fill" tag. Add or
remove certifications in `certifications.items`; an item with `href: null` and
`image: null` renders as a placeholder card.

## The thread (design note)

The metaphor is a **saddle stitch**: the single thread that binds a zine. Each
journey stop punches a "hole"; as you scroll, a vermilion twisted thread is
sewn through them by a small needle.

- `src/components/JourneyThread.tsx` measures the hole anchors, builds a cubic
  Bezier path through them and reveals it with an SVG mask (stroke-dashoffset)
  driven by a smoothed `requestAnimationFrame` loop that **only runs while the
  thread is catching up with the scroll**.
- Details: soft shadow and ply texture on the thread, a needle that follows the
  path tangent, a spool counter ("Page 03 / 07"), a cross-stitch knot and ripple
  when a hole is reached, cards that settle and image slots that wipe in, and
  parallax doodles driven by one CSS variable.
- On narrow screens the thread runs down the left margin and the cards stack.
- Without JavaScript, or with `prefers-reduced-motion: reduce`, the thread is
  fully drawn, every card is visible, and no scroll listener is attached.

### Illustrations

`src/components/art/Illustrations.tsx` contains original SVG drawings of a
robot arm, a control feedback loop with a step response, a LiDAR rover, an RL
grid world with a reward curve, and a speech-embedding diagram. They animate
with CSS only (transform, offset-path, stroke-dash) and are static under
`prefers-reduced-motion`.

## Accessibility

- Semantic landmarks, a skip link, one `h1` per page, and a keyboard-operable
  mobile menu (`aria-expanded`, closes with Escape).
- Filter pills are toggle buttons (`aria-pressed`) with a polite live count.
- The decorative SVG is `aria-hidden`; external links announce that they open
  in a new tab; visible focus rings throughout.
- Motion respects `prefers-reduced-motion` (reveals, thread, needle, illustrations).
- Illustrations are `role="img"` with labels; decorative parts are `aria-hidden`.

## Project layout

```
src/
  app/            routes (/, /work), layout, global styles, sitemap
  components/     SiteHeader, Hero, JourneyThread, FieldNotes, Research,
                  Certifications, SelectedWork, WorkArchive, ImageSlot, art/Illustrations
  data/site.ts    <- all editable content
  legacy/         previous portfolio components (voice agent, chat widget, ...)
  db/, app/api/   previous chat backend, untouched (db client is now lazy)
```

The previous site's components were moved to `src/legacy/` and are no longer
rendered. `/api/chat` and the database client are unchanged except that the
database connection is now created on first use, so `npm run build` works
without `DATABASE_URL`. Delete `src/legacy/` once you are sure you do not need
it.

## Deploying

Any Next.js host works; the project is set up for Vercel (analytics and speed
insights are kept from the previous site).
