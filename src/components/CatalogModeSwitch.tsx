import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import type { CatalogViewMode } from "../types/radiology";

type CatalogModeSwitchProps = {
  counts: Record<CatalogViewMode, number>;
  value: CatalogViewMode;
  onChange: (next: CatalogViewMode) => void;
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
};

const labels: Record<CatalogViewMode, string> = {
  anatomy: "Anatomia",
  conditions: "Jednostki chorobowe",
  recent: "Ostatnie",
  pinned: "Przypięte"
};

export function CatalogModeSwitch({
  counts,
  value,
  onChange,
  sidebarCollapsed,
  onToggleSidebar
}: CatalogModeSwitchProps) {
  return (
    <section className="mode-switch-card" aria-label="Tryb katalogu">
      <div className="mode-switch-shell">
        <div className="mode-switch">
          {(Object.keys(labels) as CatalogViewMode[]).map((mode) => (
            <button
              key={mode}
              className={mode === value ? "mode-switch-button active" : "mode-switch-button"}
              type="button"
              onClick={() => onChange(mode)}
            >
              <span>{labels[mode]}</span>
              <strong>{counts[mode]}</strong>
            </button>
          ))}
        </div>
        <button
          className="topline-toggle"
          type="button"
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Pokaż nawigację" : "Ukryj nawigację"}
          title={sidebarCollapsed ? "Pokaż nawigację" : "Ukryj nawigację"}
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen size={18} aria-hidden="true" />
          ) : (
            <PanelLeftClose size={18} aria-hidden="true" />
          )}
        </button>
      </div>
    </section>
  );
}
