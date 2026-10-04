import Image from "next/image";
import type { ImageSlot as Slot } from "@/data/site";

export default function ImageSlot({
  slot,
  sizes,
  className = "",
  captionClassName = "mt-2 text-xs italic text-ink-soft",
  aspect = "aspect-[4/3]",
}: {
  slot: Slot;
  sizes: string;
  className?: string;
  captionClassName?: string;
  aspect?: string;
}) {
  return (
    <figure className={`slot tape ${className}`}>
      <div className={`slot-frame relative ${aspect} overflow-hidden border border-ink/70`}>
        <div className={`slot-inner absolute inset-0 ${slot.fit === "contain" ? "bg-white" : ""}`}>
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes}
            className={slot.fit === "contain" ? "object-contain" : "object-cover"}
            style={slot.position ? { objectPosition: slot.position } : undefined}
          />
        </div>
      </div>
      {slot.caption && (
        <figcaption className={captionClassName}>
          {slot.caption}
        </figcaption>
      )}
    </figure>
  );
}
