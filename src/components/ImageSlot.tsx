import Image from "next/image";
import { showPlaceholderMarkers, type ImageSlot as Slot } from "@/data/site";

export default function ImageSlot({
  slot,
  sizes,
  className = "",
}: {
  slot: Slot;
  sizes: string;
  className?: string;
}) {
  if (!slot.src && !showPlaceholderMarkers) return null;
  return (
    <figure className={`slot tape ${className}`}>
      <div className="slot-frame relative aspect-[4/3] overflow-hidden border border-ink/70">
        <div className="slot-inner absolute inset-0">
          {slot.src ? (
            <Image
              src={slot.src}
              alt={slot.alt}
              fill
              sizes={sizes}
              className="object-cover"
              style={slot.position ? { objectPosition: slot.position } : undefined}
            />
          ) : (
            <div className="slot-empty flex h-full flex-col items-center justify-center gap-2 p-3 text-center">
              <svg
                aria-hidden="true"
                viewBox="0 0 48 40"
                className="h-9 w-11 text-vermilion"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="5" width="42" height="30" rx="3" />
                <circle cx="16" cy="16" r="4" />
                <path d="M3 30l12-10 9 8 7-6 14 10" />
              </svg>
              <p className="folio !text-vermilion">Placeholder · image slot</p>
              <p className="max-w-full break-all font-mono text-[0.7rem] leading-tight text-ink-soft">
                {slot.suggestedPath}
              </p>
            </div>
          )}
        </div>
      </div>
      {slot.caption && (
        <figcaption className="mt-2 text-xs italic text-ink-soft">
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
