import {
  Clock3,
  FileText,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
  ShieldCheck
} from "lucide-react";
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

const icons: Record<CatalogViewMode, typeof FileText> = {
  anatomy: ShieldCheck,
  conditions: FileText,
  recent: Clock3,
  pinned: Heart
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
        <div className="mode-switch-rail" role="toolbar" aria-label="Nawigacja katalogu">
          <div className="mode-switch">
            {(Object.keys(labels) as CatalogViewMode[]).map((mode) => {
              const Icon = icons[mode];
              return (
                <button
                  key={mode}
                  className={mode === value ? "mode-switch-button active" : "mode-switch-button"}
                  type="button"
                  onClick={() => onChange(mode)}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>{labels[mode]}</span>
                  <strong>{counts[mode]}</strong>
                </button>
              );
            })}
          </div>
        </div>
        <button
          className="topline-toggle mode-switch-utility"
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
