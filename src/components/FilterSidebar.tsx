import { RotateCcw } from "lucide-react";
import type { Taxonomy, TemplateStatus } from "../types/radiology";

export type Filters = {
  modality: string;
  examType: string;
  bodyPart: string;
  organ: string;
  pathology: string;
  status: TemplateStatus | "";
};

type FilterSidebarProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClear: () => void;
  taxonomy: Taxonomy;
  countsByStatus: Record<TemplateStatus, number>;
};

function updateFilter(filters: Filters, key: keyof Filters, value: string): Filters {
  return {
    ...filters,
    [key]: value
  };
}

function SelectFilter({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Wszystkie</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  onClear,
  taxonomy,
  countsByStatus
}: FilterSidebarProps) {
  return (
    <section className="header-filters" aria-label="Filtry">
      <div className="header-filters-heading">
        <div>
          <h2>Filtry</h2>
          <p>Zawężaj po badaniu, narządzie i patologii.</p>
        </div>
        <button className="icon-button" type="button" onClick={onClear} title="Wyczyść filtry">
          <RotateCcw size={17} aria-hidden="true" />
          <span className="sr-only">Wyczyść filtry</span>
        </button>
      </div>

      <div className="filter-stack">
        <SelectFilter
          label="Modalność"
          value={filters.modality}
          options={taxonomy.modalities.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange(updateFilter(filters, "modality", value))}
        />
        <SelectFilter
          label="Typ badania"
          value={filters.examType}
          options={taxonomy.examTypes.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange(updateFilter(filters, "examType", value))}
        />
        <SelectFilter
          label="Część ciała"
          value={filters.bodyPart}
          options={taxonomy.bodyParts.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange(updateFilter(filters, "bodyPart", value))}
        />
        <SelectFilter
          label="Narząd"
          value={filters.organ}
          options={taxonomy.organs.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange(updateFilter(filters, "organ", value))}
        />
        <SelectFilter
          label="Patologia"
          value={filters.pathology}
          options={taxonomy.pathology.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange(updateFilter(filters, "pathology", value))}
        />
        <SelectFilter
          label="Status"
          value={filters.status}
          options={["draft", "reviewed", "deprecated"]}
          onChange={(value) => onFiltersChange(updateFilter(filters, "status", value) as Filters)}
        />
      </div>

      <div className="status-summary" aria-label="Statusy szablonów">
        <span>draft: {countsByStatus.draft}</span>
        <span>reviewed: {countsByStatus.reviewed}</span>
        <span>deprecated: {countsByStatus.deprecated}</span>
      </div>
    </section>
  );
}
