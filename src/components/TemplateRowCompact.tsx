import { ChevronRight, ImageIcon, Pin } from "lucide-react";
import type { TemplateWithSearch } from "../types/radiology";
import { StatusPill } from "./StatusPill";

type TemplateRowCompactProps = {
  template: TemplateWithSearch;
  selected: boolean;
  pinned: boolean;
  onSelect: (id: string) => void;
};

export function TemplateRowCompact({
  template,
  selected,
  pinned,
  onSelect
}: TemplateRowCompactProps) {
  return (
    <button
      className={selected ? "template-row compact active" : "template-row compact"}
      type="button"
      onClick={() => onSelect(template.id)}
    >
      <span className="row-main">
        <span className="row-topline">
          <span className="row-title">{template.title}</span>
          {pinned ? (
            <span className="row-pin" aria-label="Przypięty">
              <Pin size={12} aria-hidden="true" />
            </span>
          ) : null}
        </span>
        <span className="chip-row">
          <span className="chip">{template.modality}</span>
          <span className="chip">{template.examTypes[0]}</span>
        </span>
      </span>
      <span className="row-side-meta">
        <span className="row-image-count">
          <ImageIcon size={14} aria-hidden="true" />
          {template.imageRefs?.length ?? 0}
        </span>
        <StatusPill status={template.status} />
        <ChevronRight size={16} aria-hidden="true" />
      </span>
    </button>
  );
}
