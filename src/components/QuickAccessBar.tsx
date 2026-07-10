import { Clock3, FilterX, ImageIcon, Pin } from "lucide-react";

type QuickAccessBarProps = {
  recentCount: number;
  pinnedCount: number;
  hasImagesActive: boolean;
  onOpenRecent: () => void;
  onOpenPinned: () => void;
  onToggleImages: () => void;
  onClearContext: () => void;
};

export function QuickAccessBar({
  recentCount,
  pinnedCount,
  hasImagesActive,
  onOpenRecent,
  onOpenPinned,
  onToggleImages,
  onClearContext
}: QuickAccessBarProps) {
  return (
    <section className="quick-access-card" aria-label="Skróty katalogu">
      <button className="quick-access-button" type="button" onClick={onOpenRecent}>
        <Clock3 size={16} aria-hidden="true" />
        <span>Ostatnie</span>
        <strong>{recentCount}</strong>
      </button>
      <button className="quick-access-button" type="button" onClick={onOpenPinned}>
        <Pin size={16} aria-hidden="true" />
        <span>Przypięte</span>
        <strong>{pinnedCount}</strong>
      </button>
      <button
        className={hasImagesActive ? "quick-access-button active" : "quick-access-button"}
        type="button"
        onClick={onToggleImages}
      >
        <ImageIcon size={16} aria-hidden="true" />
        <span>Z ilustracjami</span>
      </button>
      <button className="quick-access-button subtle" type="button" onClick={onClearContext}>
        <FilterX size={16} aria-hidden="true" />
        <span>Wyczyść kontekst</span>
      </button>
    </section>
  );
}
