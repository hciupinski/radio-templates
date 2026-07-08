import { ChevronDown, Download, FileText, Moon, Search, SlidersHorizontal, Sun } from "lucide-react";
import { FilterSidebar, type Filters } from "./FilterSidebar";
import type { Taxonomy, TemplateStatus } from "../types/radiology";

type ThemeMode = "light" | "dark";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  contentVersion: string;
  totalTemplates: number;
  pdfUrl: string;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onClearFilters: () => void;
  taxonomy: Taxonomy;
  countsByStatus: Record<TemplateStatus, number>;
  activeFilterCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
};

export function Header({
  query,
  onQueryChange,
  contentVersion,
  totalTemplates,
  pdfUrl,
  filtersOpen,
  onToggleFilters,
  filters,
  onFiltersChange,
  onClearFilters,
  taxonomy,
  countsByStatus,
  activeFilterCount,
  theme,
  onToggleTheme
}: HeaderProps) {
  return (
    <header className={filtersOpen ? "topbar filters-open" : "topbar"}>
      <div className="topbar-main">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            <FileText size={21} strokeWidth={2.2} />
          </span>
          <div className="brand-copy">
            <h1>Atlas opisów radiologicznych</h1>
            <p>
              {totalTemplates} szablonów roboczych · {contentVersion}
            </p>
            <div className="brand-actions">
              <a className="brand-link" href={pdfUrl} download>
                <Download size={15} aria-hidden="true" />
                Pobierz PDF
              </a>
              <button
                className="theme-toggle"
                type="button"
                onClick={onToggleTheme}
                aria-label={theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"}
                title={theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"}
              >
                {theme === "light" ? (
                  <Moon size={15} aria-hidden="true" />
                ) : (
                  <Sun size={15} aria-hidden="true" />
                )}
                <span>{theme === "light" ? "Ciemny" : "Jasny"}</span>
              </button>
            </div>
          </div>
        </div>

        <label className="search-box">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">Szukaj szablonów</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Szukaj: USG, wątroba, TI-RADS..."
            type="search"
          />
        </label>

        <button
          className={filtersOpen ? "header-action open" : "header-action"}
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="header-filters-panel"
          onClick={onToggleFilters}
        >
          <SlidersHorizontal size={17} aria-hidden="true" />
          <span>{filtersOpen ? "Ukryj filtry" : "Pokaż filtry"}</span>
          {activeFilterCount ? <strong>{activeFilterCount}</strong> : null}
          <ChevronDown size={17} aria-hidden="true" />
        </button>
      </div>

      <div
        id="header-filters-panel"
        className={filtersOpen ? "topbar-filters" : "topbar-filters hidden"}
        hidden={!filtersOpen}
      >
        <div className="topbar-filters-meta">
          <p>
            {activeFilterCount
              ? `Aktywne filtry: ${activeFilterCount}`
              : "Wybierz kryteria, aby zawęzić listę szablonów."}
          </p>
        </div>
        <FilterSidebar
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClear={onClearFilters}
          taxonomy={taxonomy}
          countsByStatus={countsByStatus}
        />
      </div>
    </header>
  );
}
