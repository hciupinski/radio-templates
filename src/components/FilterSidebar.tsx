import { RotateCcw } from "lucide-react";
import type { Taxonomy, TemplateStatus } from "../types/radiology";

export type Filters = {
  modality: string;
  examType: string;
  status: TemplateStatus | "";
  hasImages: boolean;
  pinnedOnly: boolean;
};

type FilterSidebarProps = {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClear: () => void;
  taxonomy: Taxonomy;
  countsByStatus: Record<TemplateStatus, number>;
};

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

function ToggleFilter({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="toggle-filter">
      <input checked={checked} onChange={(event) => onChange(event.target.checked)} type="checkbox" />
      <span>{label}</span>
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
          <p>Proste zawężanie, a kontekst narządu i patologii wynika z katalogu.</p>
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
          onChange={(value) => onFiltersChange({ ...filters, modality: value })}
        />
        <SelectFilter
          label="Typ badania"
          value={filters.examType}
          options={taxonomy.examTypes.map((entry) => entry.label)}
          onChange={(value) => onFiltersChange({ ...filters, examType: value })}
        />
        <SelectFilter
          label="Status"
          value={filters.status}
          options={["draft", "reviewed", "deprecated"]}
          onChange={(value) => onFiltersChange({ ...filters, status: value as Filters["status"] })}
        />
        <ToggleFilter
          label="Tylko z ilustracjami"
          checked={filters.hasImages}
          onChange={(checked) => onFiltersChange({ ...filters, hasImages: checked })}
        />
        <ToggleFilter
          label="Tylko przypięte"
          checked={filters.pinnedOnly}
          onChange={(checked) => onFiltersChange({ ...filters, pinnedOnly: checked })}
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
