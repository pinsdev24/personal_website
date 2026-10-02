import { fieldNotes } from "@/data/site";
import DraftTag from "./DraftTag";
import Reveal from "./Reveal";
import { ControlLoop, GridWorld, RoverLidar } from "./art/Illustrations";

const ART = {
  control: ControlLoop,
  rover: RoverLidar,
  rl: GridWorld,
} as const;

export default function FieldNotes() {
  return (
    <section
      id="field-notes"
      aria-labelledby="notes-title"
      className="mx-auto max-w-6xl px-5 pt-20 md:px-8 md:pt-28"
    >
      <Reveal className="max-w-3xl">
        <p className="folio">{fieldNotes.kicker}</p>
        <h2
          id="notes-title"
          className="display mt-3 text-4xl font-semibold sm:text-5xl md:text-6xl"
        >
          {fieldNotes.title}
          <DraftTag show={fieldNotes.placeholder} />
        </h2>
      </Reveal>

      <ul className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
        {fieldNotes.figures.map((f, i) => {
          const Art = ART[f.id];
          return (
            <li key={f.id}>
              <Reveal delay={i * 90}>
                <figure className="page-card h-full p-4">
                  <div className="bg-paper-deep/70 p-2">
                    <Art className="h-auto w-full" />
                  </div>
                  <figcaption className="mt-4">
                    <p className="folio">{f.fig}</p>
                    <p className="display mt-1 text-2xl font-semibold">
                      {f.title}
                      <DraftTag show={f.placeholder} />
                    </p>
                    <p className="mt-2 text-[0.97rem] text-ink-soft">{f.body}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
