import { showPlaceholderMarkers } from "@/data/site";

export default function DraftTag({ show }: { show?: boolean }) {
  if (!show || !showPlaceholderMarkers) return null;
  return (
    <span className="draft-tag" title="Placeholder copy — edit it in src/data/site.ts">
      draft
    </span>
  );
}
