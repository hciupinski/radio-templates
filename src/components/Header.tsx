import {
  Download,
  FileText,
  Menu,
  Moon,
  Search,
  Sun
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
type ThemeMode = "light" | "dark";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  pdfUrl: string;
  theme: ThemeMode;
  onToggleTheme: () => void;
};

export function Header({
  query,
  onQueryChange,
  pdfUrl,
  theme,
  onToggleTheme
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!mobileMenuRef.current?.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className="topbar">
      <div className="topbar-main">
        <div className="brand">
          <div className="mobile-menu" ref={mobileMenuRef}>
            <button
              className={mobileMenuOpen ? "topbar-icon-button menu-button active" : "topbar-icon-button menu-button"}
              type="button"
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
            >
              <Menu size={19} aria-hidden="true" />
            </button>

            <div
              id="mobile-nav-menu"
              className={mobileMenuOpen ? "mobile-menu-panel open" : "mobile-menu-panel"}
            >
              <a
                className="mobile-menu-action"
                href={pdfUrl}
                download
                onClick={() => setMobileMenuOpen(false)}
              >
                <Download size={18} aria-hidden="true" />
                <span>Pobierz PDF</span>
              </a>
              <button
                className="mobile-menu-action"
                type="button"
                onClick={() => {
                  onToggleTheme();
                  setMobileMenuOpen(false);
                }}
              >
                {theme === "light" ? (
                  <Moon size={18} aria-hidden="true" />
                ) : (
                  <Sun size={18} aria-hidden="true" />
                )}
                <span>{theme === "light" ? "Tryb ciemny" : "Tryb jasny"}</span>
              </button>
            </div>
          </div>
          <span className="brand-mark" aria-hidden="true">
            <FileText size={21} strokeWidth={2.2} />
          </span>
          <div className="brand-copy">
            <h1>Atlas szablonów radiologicznych</h1>
            <p>Szablony i narzędzia do diagnostyki radiologicznej</p>
          </div>
        </div>

        <label className="search-box">
          <Search size={20} aria-hidden="true" />
          <span className="sr-only">Szukaj szablonów</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Szukaj szablonów, jednostek, opisów..."
            type="search"
          />
        </label>

        <div className="topbar-actions">
          <a className="topbar-icon-button" href={pdfUrl} download aria-label="Pobierz PDF">
            <Download size={18} aria-hidden="true" />
          </a>
          <button
            className="topbar-icon-button"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"}
            title={theme === "light" ? "Włącz tryb ciemny" : "Włącz tryb jasny"}
          >
            {theme === "light" ? (
              <Moon size={18} aria-hidden="true" />
            ) : (
              <Sun size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
