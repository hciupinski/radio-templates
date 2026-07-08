import { ChevronRight } from "lucide-react";
import type { RadiologyTemplate } from "../types/radiology";
import { StatusPill } from "./StatusPill";

type TemplateListProps = {
  templates: RadiologyTemplate[];
  selectedId?: string;
  onSelect: (id: string) => void;
  query: string;
};

export function TemplateList({ templates, selectedId, onSelect, query }: TemplateListProps) {
  return (
    <section className="result-column" aria-label="Lista szablonów">
      <div className="result-heading">
        <div>
          <h2>Szablony</h2>
          <p>
            {templates.length} wyników{query ? ` dla „${query}”` : ""}
          </p>
        </div>
      </div>

      <div className="result-list">
        {templates.map((template) => (
          <button
            key={template.id}
            className={template.id === selectedId ? "template-row active" : "template-row"}
            type="button"
            onClick={() => onSelect(template.id)}
          >
            <span className="row-main">
              <span className="row-title">{template.title}</span>
              <span className="row-meta">
                {template.modality} · {template.examTypes[0]} · {template.organs.join(", ")}
              </span>
              <span className="chip-row">
                {template.imageRefs?.length ? (
                  <span className="chip gallery-chip" aria-label={`Galeria: ${template.imageRefs.length} zdjęć`}>
                    📷 {template.imageRefs.length}
                  </span>
                ) : null}
                {template.pathology.slice(0, 2).map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
                <StatusPill status={template.status} />
              </span>
            </span>
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        ))}

        {templates.length === 0 ? (
          <div className="empty-state">
            <h3>Brak wyników</h3>
            <p>Zmień zapytanie lub wyczyść część filtrów.</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
