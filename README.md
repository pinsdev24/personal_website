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

| Route   | What it is                                                              |
| ------- | ----------------------------------------------------------------------- |
| `/`     | Cover (hero), the scroll-drawn thread with a timeline, selected work with filter pills |
| `/work` | The full archive of projects, same filter pills                         |

## Editing the content

**Everything you are meant to edit lives in one file: [`src/data/site.ts`](src/data/site.ts).**
That covers your name and contact details, nav, hero copy, the timeline
("pages" on the thread), the project list and its categories, and the footer.

Placeholder content is clearly marked:

- Facts such as names, links, dates and screenshots were carried over from the
  previous version of this portfolio (still available in `src/legacy/`).
- Wording that was drafted for this redesign carries `placeholder: true` in the
  data file and shows a dashed red **draft** tag next to it on the page.
  Rewrite the text, then set `placeholder` to `false` (or delete the key).
- To hide every draft tag at once, set `showPlaceholderMarkers = false`.

Project screenshots live in `public/images/`. Add a file there and point
`image.src` at it. Mark projects with `featured: true` to show them on the
home page.

## The thread (design note)

The metaphor is a **saddle stitch**: the single thread that binds a zine. A
dotted line of "punched holes" is pre-drawn; as you scroll, a vermilion thread
is sewn through it by a small needle, passing through one hole per chapter.

- `src/components/JourneyThread.tsx` measures the timeline anchors, builds an
  SVG path through them, and maps scroll position to a length along that path
  (`stroke-dashoffset` plus a `requestAnimationFrame`-throttled scroll handler).
- On narrow screens the thread runs down the left margin and the cards stack.
- Without JavaScript, or with `prefers-reduced-motion: reduce`, the thread is
  fully drawn and every card is visible; nothing animates.

## Accessibility

- Semantic landmarks, a skip link, one `h1` per page, and a keyboard-operable
  mobile menu (`aria-expanded`, closes with Escape).
- Filter pills are toggle buttons (`aria-pressed`) with a polite live count.
- The decorative SVG is `aria-hidden`; external links announce that they open
  in a new tab; visible focus rings throughout.
- Motion respects `prefers-reduced-motion` (reveals, needle, ping dot).

## Project layout

```
src/
  app/            routes (/, /work), layout, global styles, sitemap
  components/     SiteHeader, Hero, JourneyThread, ProjectBrowser, ...
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
