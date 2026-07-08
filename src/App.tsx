import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { checkForContentUpdate, loadContent, prepareContent, resolvePublicPath } from "./data/content";
import type { AppContentBundle, RadiologyTemplate, TemplateStatus } from "./types/radiology";
import { Header } from "./components/Header";
import { type Filters } from "./components/FilterSidebar";
import { TemplateList } from "./components/TemplateList";
import { TemplateDetail } from "./components/TemplateDetail";

type ThemeMode = "light" | "dark";

const emptyFilters: Filters = {
  modality: "",
  examType: "",
  bodyPart: "",
  organ: "",
  pathology: "",
  status: ""
};

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem("radio-templates-theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function matchesFilter(value: string, selected: string): boolean {
  return !selected || value === selected;
}

function filterTemplates(templates: RadiologyTemplate[], filters: Filters): RadiologyTemplate[] {
  return templates.filter((template) => {
    return (
      matchesFilter(template.modality, filters.modality) &&
      (!filters.examType || template.examTypes.includes(filters.examType)) &&
      (!filters.bodyPart || template.bodyParts.includes(filters.bodyPart)) &&
      (!filters.organ || template.organs.includes(filters.organ)) &&
      (!filters.pathology || template.pathology.includes(filters.pathology)) &&
      (!filters.status || template.status === filters.status)
    );
  });
}

function searchTemplates(
  query: string,
  templates: RadiologyTemplate[],
  searchIndex: ReturnType<typeof prepareContent>["searchIndex"]
): RadiologyTemplate[] {
  const normalized = query.trim();
  if (!normalized) return templates;
  return searchIndex.search(normalized).map((result) => result.item);
}

function scrollMobileToTop(): void {
  if (window.matchMedia("(max-width: 760px)").matches) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

export default function App() {
  const [bundle, setBundle] = useState<AppContentBundle | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [loadError, setLoadError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [selectedId, setSelectedId] = useState("");
  const [activePane, setActivePane] = useState<"list" | "detail">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [syncMessage, setSyncMessage] = useState("");
  const deferredQuery = useDeferredValue(query);
  const updateInFlightRef = useRef(false);

  const preparedContent = useMemo(() => (bundle ? prepareContent(bundle) : null), [bundle]);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      setLoadState("loading");
      setLoadError("");

      try {
        const nextBundle = await loadContent();
        if (cancelled) {
          return;
        }

        startTransition(() => {
          setBundle(nextBundle);
          setLoadState("ready");
        });
      } catch (error) {
        if (cancelled) {
          return;
        }

        setLoadState("error");
        setLoadError(
          error instanceof Error
            ? error.message
            : "Nie udało się załadować treści aplikacji. Sprawdź połączenie i spróbuj ponownie."
        );
      }
    }

    void initialize();

    return () => {
      cancelled = true;
    };
  }, [loadAttempt]);

  const filteredTemplates = useMemo(() => {
    if (!preparedContent) {
      return [];
    }

    const searched = searchTemplates(
      deferredQuery,
      preparedContent.templatesWithSearch,
      preparedContent.searchIndex
    );
    return filterTemplates(searched, filters);
  }, [deferredQuery, filters, preparedContent]);

  const selectedTemplate = useMemo(() => {
    return (
      filteredTemplates.find((template) => template.id === selectedId) ??
      filteredTemplates[0] ??
      preparedContent?.templatesWithSearch[0]
    );
  }, [filteredTemplates, preparedContent, selectedId]);

  const countsByStatus = useMemo(() => {
    return (preparedContent?.templatesWithSearch ?? []).reduce<Record<TemplateStatus, number>>(
      (counts, template) => {
        counts[template.status] += 1;
        return counts;
      },
      { draft: 0, reviewed: 0, deprecated: 0 }
    );
  }, [preparedContent]);

  useEffect(() => {
    if (!preparedContent?.templatesWithSearch.length) {
      return;
    }

    setSelectedId((current) => {
      if (
        current &&
        preparedContent.templatesWithSearch.some((template) => template.id === current)
      ) {
        return current;
      }

      return preparedContent.templatesWithSearch[0]?.id ?? "";
    });
  }, [preparedContent]);

  useEffect(() => {
    if (!bundle) {
      return;
    }

    const currentHash = bundle.contentHash;
    let cancelled = false;

    async function refreshContent() {
      if (updateInFlightRef.current || cancelled) {
        return;
      }

      updateInFlightRef.current = true;

      try {
        const result = await checkForContentUpdate(currentHash);
        if (cancelled || result.status !== "updated") {
          return;
        }

        startTransition(() => {
          setBundle(result.bundle);
          setSyncMessage("Zaktualizowano bazę szablonów do najnowszej wersji.");
        });
      } finally {
        updateInFlightRef.current = false;
      }
    }

    const handleOnline = () => {
      void refreshContent();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        void refreshContent();
      }
    };

    void refreshContent();

    window.addEventListener("online", handleOnline);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      window.removeEventListener("online", handleOnline);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [bundle]);

  useEffect(() => {
    if (!syncMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSyncMessage("");
    }, 4200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [syncMessage]);

  useEffect(() => {
    const isMobileViewport = window.matchMedia("(max-width: 760px)").matches;
    if (!filtersOpen || !isMobileViewport) {
      return;
    }

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [filtersOpen]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("radio-templates-theme", theme);
  }, [theme]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (loadState === "error") {
    return (
      <main className="app-shell app-state">
        <section className="loading-card error-card" aria-live="assertive">
          <h1>Nie udało się uruchomić aplikacji</h1>
          <p>{loadError}</p>
          <button
            className="retry-button"
            type="button"
            onClick={() => setLoadAttempt((value) => value + 1)}
          >
            Spróbuj ponownie
          </button>
        </section>
      </main>
    );
  }

  if (loadState === "loading" || !bundle || !preparedContent) {
    return (
      <main className="app-shell app-state">
        <section className="loading-card" aria-live="polite">
          <h1>Atlas opisów radiologicznych</h1>
          <p>Ładowanie danych aplikacji i ostatniej zapisanej wersji offline…</p>
        </section>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <Header
        query={query}
        onQueryChange={setQuery}
        contentVersion={bundle.contentVersion}
        totalTemplates={preparedContent.templatesWithSearch.length}
        pdfUrl={resolvePublicPath("szablony-radiologiczne.pdf")}
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((isOpen) => !isOpen)}
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters(emptyFilters)}
        taxonomy={bundle.taxonomy}
        countsByStatus={countsByStatus}
        activeFilterCount={activeFilterCount}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
      />

      {syncMessage ? (
        <div className="sync-banner" role="status" aria-live="polite">
          {syncMessage}
        </div>
      ) : null}

      <nav className="mobile-navigation" aria-label="Widoki aplikacji mobilnej">
        <button
          className={activePane === "list" ? "mobile-nav-button active" : "mobile-nav-button"}
          type="button"
          onClick={() => {
            setActivePane("list");
            setFiltersOpen(false);
            requestAnimationFrame(scrollMobileToTop);
          }}
        >
          Lista ({filteredTemplates.length})
        </button>
        <button
          className={activePane === "detail" ? "mobile-nav-button active" : "mobile-nav-button"}
          type="button"
          onClick={() => {
            setActivePane("detail");
            setFiltersOpen(false);
            requestAnimationFrame(scrollMobileToTop);
          }}
        >
          Szczegóły
        </button>
      </nav>

      <section className={`workspace pane-${activePane}`} aria-label="Przeglądarka szablonów">
        <TemplateList
          templates={filteredTemplates}
          selectedId={selectedTemplate?.id}
          onSelect={(id) => {
            setSelectedId(id);
            setActivePane("detail");
            setFiltersOpen(false);
            requestAnimationFrame(scrollMobileToTop);
          }}
          query={deferredQuery}
        />

        <TemplateDetail
          template={selectedTemplate}
          sourceMap={preparedContent.sourceMap}
          onBackToList={() => {
            setActivePane("list");
            requestAnimationFrame(scrollMobileToTop);
          }}
        />
      </section>
    </main>
  );
}
