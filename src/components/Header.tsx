import { Download, FileText, Search } from "lucide-react";

type HeaderProps = {
  query: string;
  onQueryChange: (value: string) => void;
  contentVersion: string;
  totalTemplates: number;
  pdfUrl: string;
};

export function Header({ query, onQueryChange, contentVersion, totalTemplates, pdfUrl }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <FileText size={21} strokeWidth={2.2} />
        </span>
        <div>
          <h1>Atlas opisów radiologicznych</h1>
          <p>
            {totalTemplates} szablonów roboczych · {contentVersion}
          </p>
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

      <a className="pdf-button" href={pdfUrl} download>
        <Download size={18} aria-hidden="true" />
        Pobierz PDF
      </a>
    </header>
  );
}
