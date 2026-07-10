import { useMemo } from "react";
import type { CatalogGroupSummary } from "../types/radiology";
import { TemplateRowCompact } from "./TemplateRowCompact";

type CatalogGroupListProps = {
  title: string;
  groups: CatalogGroupSummary[];
  selectedId?: string;
  pinnedIds: Set<string>;
  onSelect: (id: string) => void;
  onTogglePinned: (id: string) => void;
};

export function CatalogGroupList({
  title,
  groups,
  selectedId,
  pinnedIds,
  onSelect,
  onTogglePinned
}: CatalogGroupListProps) {
  const flatTemplates = useMemo(() => {
    return groups.flatMap((group) => group.templates);
  }, [groups]);

  return (
    <section className="catalog-groups" aria-label="Lista szablonów">
      <div className="result-heading catalog-groups-heading">
        <div className="catalog-groups-title-row">
          <h2>{title}</h2>
          <span className="catalog-count-pill">
            {flatTemplates.length}
          </span>
        </div>
      </div>

      <div className="group-list-scroll">
        {groups.length === 0 || flatTemplates.length === 0 ? (
          <div className="empty-state">
            <h3>Brak wyników</h3>
            <p>Zmień kontekst nawigacji albo wyczyść część filtrów.</p>
          </div>
        ) : null}

        <div className="template-list">
          {flatTemplates.map((template) => (
            <TemplateRowCompact
              key={template.id}
              template={template}
              selected={template.id === selectedId}
              pinned={pinnedIds.has(template.id)}
              onSelect={onSelect}
              onTogglePinned={onTogglePinned}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
