import { ChevronRight, FileText, Star } from "lucide-react";
import type { TemplateWithSearch } from "../types/radiology";

type TemplateRowCompactProps = {
  template: TemplateWithSearch;
  selected: boolean;
  pinned: boolean;
  onSelect: (id: string) => void;
  onTogglePinned: (id: string) => void;
};

export function TemplateRowCompact({
  template,
  selected,
  pinned,
  onSelect,
  onTogglePinned
}: TemplateRowCompactProps) {
  return (
    <div className={selected ? "template-row compact active" : "template-row compact"}>
      <span className="row-document-icon" aria-hidden="true">
        <FileText size={18} />
      </span>
      <button
        className="template-row-select"
        type="button"
        onClick={() => onSelect(template.id)}
      >
        <span className="row-main">
          <span className="row-topline">
            <span className="row-title">{template.title}</span>
          </span>
          <span className="row-meta-line">
            {template.examTypes[0] ?? template.modality}
          </span>
        </span>
      </button>
      <span className="row-side-meta">
        <button
          className={pinned ? "row-favorite row-favorite-button active" : "row-favorite row-favorite-button"}
          type="button"
          onClick={() => onTogglePinned(template.id)}
          aria-pressed={pinned}
          aria-label={pinned ? "Odepnij szablon" : "Przypnij szablon"}
          title={pinned ? "Odepnij szablon" : "Przypnij szablon"}
        >
          <Star size={18} aria-hidden="true" fill="currentColor" />
        </button>
        <ChevronRight size={16} aria-hidden="true" />
      </span>
    </div>
  );
}
