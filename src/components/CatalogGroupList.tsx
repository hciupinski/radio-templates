import { Search } from "lucide-react";
import { useMemo } from "react";
import type { CatalogGroupSummary } from "../types/radiology";
import { TemplateRowCompact } from "./TemplateRowCompact";

type CatalogGroupListProps = {
  title: string;
  groups: CatalogGroupSummary[];
  selectedId?: string;
  pinnedIds: Set<string>;
  onSelect: (id: string) => void;
  query: string;
};

export function CatalogGroupList({
  title,
  groups,
  selectedId,
  pinnedIds,
  onSelect,
  query
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
            {groups.reduce((sum, group) => sum + group.count, 0)} szablonów
          </span>
        </div>
      </div>

      <div className="group-list-scroll">
        {query ? (
          <div className="search-context-banner">
            <Search size={16} aria-hidden="true" />
            <span>Wyniki dla „{query}” są ustawione najwyżej.</span>
          </div>
        ) : null}

        {groups.length === 0 ? (
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
