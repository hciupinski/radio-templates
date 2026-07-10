import { startTransition, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import {
  buildAnatomyGroups,
  buildAnatomyTree,
  buildConditionGroups,
  checkForContentUpdate,
  loadContent,
  prepareContent,
  resolveQueryContext,
  resolvePublicPath,
  searchTemplates
} from "./data/content";
import type {
  AnatomyTreeModality,
  AppContentBundle,
  CatalogGroupSummary,
  CatalogPath,
  CatalogViewMode,
  RelatedStudyOption,
  TemplateWithSearch
} from "./types/radiology";
import { Header } from "./components/Header";
import { CatalogModeSwitch } from "./components/CatalogModeSwitch";
import { CatalogSidebar } from "./components/CatalogSidebar";
import { CatalogGroupList } from "./components/CatalogGroupList";
import { TemplateDetail } from "./components/TemplateDetail";

type ThemeMode = "light" | "dark";
type MobilePane = "catalog" | "groups" | "detail";

const RECENT_STORAGE_KEY = "radio-templates-recent";
const PINNED_STORAGE_KEY = "radio-templates-pinned";

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

function readStoredIds(key: string): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((value): value is string => typeof value === "string") : [];
  } catch {
    return [];
  }
}

function scrollMobileToTop(): void {
  if (window.matchMedia("(max-width: 760px)").matches) {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

function pathFromTemplate(template: TemplateWithSearch): CatalogPath {
  return {
    modality: template.modality,
    examType: template.examTypes[0] ?? "",
    bodySystem: template.bodySystems[0] ?? "",
    organ: template.organs[0] ?? ""
  };
}

function findPathInTree(
  tree: AnatomyTreeModality[],
  hints: Partial<CatalogPath> = {}
): CatalogPath | null {
  for (const modality of tree) {
    if (hints.modality && modality.label !== hints.modality) {
      continue;
    }

    for (const examType of modality.examTypes) {
      if (hints.examType && examType.label !== hints.examType) {
        continue;
      }

      for (const bodySystem of examType.bodySystems) {
        if (hints.bodySystem && bodySystem.label !== hints.bodySystem) {
          continue;
        }

        for (const organ of bodySystem.organs) {
          if (hints.organ && organ.label !== hints.organ) {
            continue;
          }

          return {
            modality: modality.label,
            examType: examType.label,
            bodySystem: bodySystem.label,
            organ: organ.label
          };
        }
      }
    }
  }

  return null;
}

function getRecentTemplates(
  ids: string[],
  byId: Map<string, TemplateWithSearch>,
  visibleIds: Set<string>
): TemplateWithSearch[] {
  return ids
    .map((id) => byId.get(id))
    .filter((template): template is TemplateWithSearch => {
      return template !== undefined && visibleIds.has(template.id);
    });
}

function buildSearchGroup(templates: TemplateWithSearch[]): CatalogGroupSummary[] {
  if (!templates.length) {
    return [];
  }

  return [
    {
      id: "search-results",
      label: "Wyniki wyszukiwania",
      description: "Bezpośrednie trafienia z globalnej wyszukiwarki.",
      count: templates.length,
      modalities: [...new Set(templates.map((template) => template.modality))],
      templates
    }
  ];
}

function buildBreadcrumb(
  viewMode: CatalogViewMode,
  activePath: CatalogPath,
  activeGroup?: CatalogGroupSummary
): string {
  if (viewMode === "conditions" && activeGroup) {
    return `Jednostki chorobowe / ${activeGroup.label}`;
  }

  if (viewMode === "recent") {
    return "Ostatnie";
  }

  if (viewMode === "pinned") {
    return "Przypięte";
  }

  return [activePath.modality, activePath.examType, activePath.bodySystem, activePath.organ]
    .filter(Boolean)
    .join(" / ");
}

function hasSharedValue(first: string[], second: string[]): boolean {
  return first.some((value) => second.includes(value));
}

function buildRelatedStudies(
  template: TemplateWithSearch | undefined,
  templates: TemplateWithSearch[],
  modalityOrder: string[]
): RelatedStudyOption[] {
  if (!template) {
    return [];
  }

  const relatedTemplates = templates.filter((candidate) => {
    return (
      hasSharedValue(candidate.organs, template.organs) &&
      hasSharedValue(candidate.pathology, template.pathology)
    );
  });

  const byModality = new Map<string, TemplateWithSearch[]>();
  for (const candidate of relatedTemplates) {
    byModality.set(candidate.modality, [...(byModality.get(candidate.modality) ?? []), candidate]);
  }

  if (byModality.size < 2) {
    return [];
  }

  const orderLookup = new Map(modalityOrder.map((modality, index) => [modality, index]));

  return Array.from(byModality.entries())
    .sort(([first], [second]) => {
      const firstOrder = orderLookup.get(first) ?? Number.MAX_SAFE_INTEGER;
      const secondOrder = orderLookup.get(second) ?? Number.MAX_SAFE_INTEGER;
      if (firstOrder !== secondOrder) {
        return firstOrder - secondOrder;
      }
      return first.localeCompare(second, "pl");
    })
    .map(([modality, items]) => ({
      modality: modality as RelatedStudyOption["modality"],
      count: items.length,
      templateIds: items.map((item) => item.id),
      primaryTemplateId: items.find((item) => item.id !== template.id)?.id ?? items[0]?.id ?? "",
      isCurrent: modality === template.modality
    }))
    .filter((option) => option.primaryTemplateId);
}

export default function App() {
  const [bundle, setBundle] = useState<AppContentBundle | null>(null);
  const [loadState, setLoadState] = useState<"loading" | "ready" | "error">("loading");
  const [loadError, setLoadError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [syncMessage, setSyncMessage] = useState("");
  const [viewMode, setViewMode] = useState<CatalogViewMode>("anatomy");
  const [activePath, setActivePath] = useState<CatalogPath>({
    modality: "",
    examType: "",
    bodySystem: "",
    organ: ""
  });
  const [activeConditionGroupId, setActiveConditionGroupId] = useState("");
  const [mobilePane, setMobilePane] = useState<MobilePane>("catalog");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [recentTemplateIds, setRecentTemplateIds] = useState<string[]>(() => readStoredIds(RECENT_STORAGE_KEY));
  const [pinnedTemplateIds, setPinnedTemplateIds] = useState<string[]>(() => readStoredIds(PINNED_STORAGE_KEY));
  const deferredQuery = useDeferredValue(query);
  const updateInFlightRef = useRef(false);
  const detailPaneRef = useRef<HTMLDivElement>(null);

  const preparedContent = useMemo(() => (bundle ? prepareContent(bundle) : null), [bundle]);
  const pinnedTemplateSet = useMemo(() => new Set(pinnedTemplateIds), [pinnedTemplateIds]);

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

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentTemplateIds));
  }, [recentTemplateIds]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(PINNED_STORAGE_KEY, JSON.stringify(pinnedTemplateIds));
  }, [pinnedTemplateIds]);

  const filteredTemplates = useMemo(() => {
    if (!preparedContent) {
      return [];
    }

    return preparedContent.templatesWithSearch;
  }, [preparedContent]);

  const filteredTemplateIds = useMemo(
    () => new Set(filteredTemplates.map((template) => template.id)),
    [filteredTemplates]
  );

  const anatomyTree = useMemo(() => {
    if (!bundle) {
      return [];
    }

    return buildAnatomyTree(filteredTemplates, bundle.taxonomy);
  }, [bundle, filteredTemplates]);

  const allConditionGroups = useMemo(() => {
    if (!bundle) {
      return [];
    }

    return buildConditionGroups(filteredTemplates, bundle.catalog);
  }, [bundle, filteredTemplates]);

  const searchedTemplates = useMemo(() => {
    if (!preparedContent) {
      return [];
    }

    return searchTemplates(deferredQuery, filteredTemplates, preparedContent.searchIndex);
  }, [deferredQuery, filteredTemplates, preparedContent]);

  const activeConditionGroup = useMemo(
    () => allConditionGroups.find((group) => group.id === activeConditionGroupId),
    [activeConditionGroupId, allConditionGroups]
  );

  useEffect(() => {
    if (!preparedContent || !bundle) {
      return;
    }

    const queryContext = resolveQueryContext(deferredQuery, bundle.taxonomy, bundle.catalog);
    if (!queryContext) {
      return;
    }

    if (queryContext.type === "condition") {
      setViewMode("conditions");
      setActiveConditionGroupId(queryContext.conditionGroupId);
      return;
    }

    const nextPath = findPathInTree(anatomyTree, queryContext);
    if (nextPath) {
      setViewMode("anatomy");
      setActivePath(nextPath);
    }
  }, [anatomyTree, bundle, deferredQuery, preparedContent]);

  useEffect(() => {
    if (!anatomyTree.length) {
      return;
    }

    const nextPath = findPathInTree(anatomyTree, activePath) ?? findPathInTree(anatomyTree);
    if (!nextPath) {
      return;
    }

    if (
      nextPath.modality !== activePath.modality ||
      nextPath.examType !== activePath.examType ||
      nextPath.bodySystem !== activePath.bodySystem ||
      nextPath.organ !== activePath.organ
    ) {
      setActivePath(nextPath);
    }
  }, [activePath, anatomyTree]);

  useEffect(() => {
    if (!allConditionGroups.length) {
      if (activeConditionGroupId) {
        setActiveConditionGroupId("");
      }
      return;
    }

    if (allConditionGroups.some((group) => group.id === activeConditionGroupId)) {
      return;
    }

    setActiveConditionGroupId(allConditionGroups[0]?.id ?? "");
  }, [activeConditionGroupId, allConditionGroups]);

  const currentScopedTemplates = useMemo(() => {
    switch (viewMode) {
      case "conditions":
        return activeConditionGroup?.templates ?? [];
      case "recent":
        if (!preparedContent) {
          return [];
        }
        return getRecentTemplates(
          recentTemplateIds,
          new Map(preparedContent.templatesWithSearch.map((template) => [template.id, template])),
          filteredTemplateIds
        );
      case "pinned":
        if (!preparedContent) {
          return [];
        }
        return getRecentTemplates(
          pinnedTemplateIds,
          new Map(preparedContent.templatesWithSearch.map((template) => [template.id, template])),
          filteredTemplateIds
        );
      case "anatomy":
      default:
        return filteredTemplates.filter(
          (template) =>
            template.modality === activePath.modality &&
            template.examTypes.includes(activePath.examType) &&
            template.bodySystems.includes(activePath.bodySystem) &&
            template.organs.includes(activePath.organ)
        );
    }
  }, [
    activeConditionGroup?.templates,
    activePath.bodySystem,
    activePath.examType,
    activePath.modality,
    activePath.organ,
    filteredTemplateIds,
    filteredTemplates,
    pinnedTemplateIds,
    preparedContent,
    recentTemplateIds,
    viewMode
  ]);

  const scopedSearchTemplates = useMemo(() => {
    if (!deferredQuery) {
      return [];
    }

    const scopedIds = new Set(currentScopedTemplates.map((template) => template.id));
    return searchedTemplates.filter((template) => scopedIds.has(template.id));
  }, [currentScopedTemplates, deferredQuery, searchedTemplates]);

  const usesGlobalSearchFallback = Boolean(
    deferredQuery && searchedTemplates.length > 0 && scopedSearchTemplates.length === 0
  );

  const visibleSearchTemplates = useMemo(() => {
    if (!deferredQuery) {
      return [];
    }

    return usesGlobalSearchFallback ? searchedTemplates : scopedSearchTemplates;
  }, [deferredQuery, scopedSearchTemplates, searchedTemplates, usesGlobalSearchFallback]);

  const visibleGroups = useMemo(() => {
    if (!bundle) {
      return [];
    }

    const searchGroups = usesGlobalSearchFallback ? buildSearchGroup(visibleSearchTemplates) : [];

    switch (viewMode) {
      case "conditions": {
        const currentGroup = allConditionGroups.find((group) => group.id === activeConditionGroupId);
        const filteredGroupTemplates = deferredQuery
          ? currentGroup?.templates.filter((template) =>
              visibleSearchTemplates.some((searchTemplate) => searchTemplate.id === template.id)
            ) ?? []
          : currentGroup?.templates ?? [];

        const groups = currentGroup
          ? [
              {
                ...currentGroup,
                templates: filteredGroupTemplates,
                count: filteredGroupTemplates.length,
                modalities: [...new Set(filteredGroupTemplates.map((template) => template.modality))]
              }
            ].filter((group) => group.count > 0)
          : [];

        return deferredQuery ? (usesGlobalSearchFallback ? searchGroups : groups) : groups;
      }
      case "recent":
        return usesGlobalSearchFallback
          ? searchGroups
          : currentScopedTemplates.length
          ? [
              {
                id: "recent-group",
                label: "Ostatnio używane",
                description: "Najszybsza droga do szablonów, po które sięgasz regularnie.",
                count: deferredQuery ? visibleSearchTemplates.length : currentScopedTemplates.length,
                modalities: [...new Set(currentScopedTemplates.map((template) => template.modality))],
                templates: deferredQuery ? visibleSearchTemplates : currentScopedTemplates
              }
            ]
          : [];
      case "pinned":
        return usesGlobalSearchFallback
          ? searchGroups
          : currentScopedTemplates.length
          ? [
              {
                id: "pinned-group",
                label: "Przypięte szablony",
                description: "Stała, własna półka robocza do codziennego użycia.",
                count: deferredQuery ? visibleSearchTemplates.length : currentScopedTemplates.length,
                modalities: [...new Set(currentScopedTemplates.map((template) => template.modality))],
                templates: deferredQuery ? visibleSearchTemplates : currentScopedTemplates
              }
            ]
          : [];
      case "anatomy":
      default: {
        if (usesGlobalSearchFallback) {
          return searchGroups;
        }

        const baseTemplates = deferredQuery ? visibleSearchTemplates : currentScopedTemplates;
        const groups = buildAnatomyGroups(baseTemplates, bundle.catalog, activePath.organ);
        return groups;
      }
    }
  }, [
    activeConditionGroupId,
    activePath.organ,
    allConditionGroups,
    bundle,
    currentScopedTemplates,
    deferredQuery,
    usesGlobalSearchFallback,
    viewMode,
    visibleSearchTemplates
  ]);

  const selectedTemplate = useMemo(() => {
    const templates = visibleGroups.flatMap((group) => group.templates);
    return templates.find((template) => template.id === selectedId) ?? templates[0];
  }, [selectedId, visibleGroups]);

  const relatedStudies = useMemo(() => {
    return buildRelatedStudies(
      selectedTemplate,
      filteredTemplates,
      bundle?.taxonomy.modalities.map((entry) => entry.label) ?? []
    );
  }, [bundle?.taxonomy.modalities, filteredTemplates, selectedTemplate]);

  useEffect(() => {
    const nextId = selectedTemplate?.id ?? "";
    if (nextId && nextId !== selectedId) {
      setSelectedId(nextId);
    }
  }, [selectedId, selectedTemplate]);

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
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("radio-templates-theme", theme);
  }, [theme]);

  const breadcrumb = buildBreadcrumb(viewMode, activePath, activeConditionGroup);

  const groupTitle =
    viewMode === "conditions"
      ? activeConditionGroup?.label ?? "Jednostki chorobowe"
      : viewMode === "recent"
        ? "Ostatnio używane"
        : viewMode === "pinned"
          ? "Przypięte"
          : activePath.organ || "Katalog anatomii";

  const visibleTemplateCount = visibleGroups.reduce((sum, group) => sum + group.count, 0);

  const modeCounts = {
    anatomy: filteredTemplates.length,
    conditions: filteredTemplates.length,
    recent: getRecentTemplates(
      recentTemplateIds,
      new Map((preparedContent?.templatesWithSearch ?? []).map((template) => [template.id, template])),
      filteredTemplateIds
    ).length,
    pinned: getRecentTemplates(
      pinnedTemplateIds,
      new Map((preparedContent?.templatesWithSearch ?? []).map((template) => [template.id, template])),
      filteredTemplateIds
    ).length
  };

  function handleSelectTemplate(id: string): void {
    setSelectedId(id);
    setRecentTemplateIds((current) => [id, ...current.filter((value) => value !== id)].slice(0, 12));
    setMobilePane("detail");
    detailPaneRef.current?.scrollTo({ top: 0, behavior: "auto" });
    requestAnimationFrame(scrollMobileToTop);
  }

  function handleSelectRelatedStudy(option: RelatedStudyOption): void {
    const targetTemplate = filteredTemplates.find((template) => template.id === option.primaryTemplateId);
    if (!targetTemplate) {
      return;
    }

    setViewMode("anatomy");
    setActivePath(pathFromTemplate(targetTemplate));
    handleSelectTemplate(targetTemplate.id);
  }

  function handleTogglePinned(id: string): void {
    setPinnedTemplateIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [id, ...current]
    );
  }

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
        pdfUrl={resolvePublicPath("szablony-radiologiczne.pdf")}
        theme={theme}
        onToggleTheme={() => setTheme((current) => (current === "light" ? "dark" : "light"))}
      />

      {syncMessage ? (
        <div className="sync-banner" role="status" aria-live="polite">
          {syncMessage}
        </div>
      ) : null}

      <nav className="mobile-navigation catalog-mobile-navigation" aria-label="Widoki mobilne">
        <button
          className={mobilePane === "catalog" ? "mobile-nav-button active" : "mobile-nav-button"}
          type="button"
          onClick={() => {
            setMobilePane("catalog");
            requestAnimationFrame(scrollMobileToTop);
          }}
        >
          Katalog
        </button>
        <button
          className={mobilePane === "groups" ? "mobile-nav-button active" : "mobile-nav-button"}
          type="button"
          onClick={() => {
            setMobilePane("groups");
            requestAnimationFrame(scrollMobileToTop);
          }}
        >
          Lista ({visibleTemplateCount})
        </button>
        <button
          className={mobilePane === "detail" ? "mobile-nav-button active" : "mobile-nav-button"}
          type="button"
          onClick={() => {
            setMobilePane("detail");
            requestAnimationFrame(scrollMobileToTop);
          }}
        >
          Szczegóły
        </button>
      </nav>

      <section
        className={`catalog-workspace pane-${mobilePane} ${sidebarCollapsed ? "sidebar-collapsed" : "sidebar-open"}`}
        aria-label="Katalog szablonów"
      >
        <div className="catalog-pane catalog-pane-topline">
          <CatalogModeSwitch
            counts={modeCounts}
            value={viewMode}
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((current) => !current)}
            onChange={(next) => {
              setViewMode(next);
              setMobilePane(next === "anatomy" || next === "conditions" ? "catalog" : "groups");
            }}
          />
        </div>

        <div className="catalog-pane catalog-pane-sidebar">
          <CatalogSidebar
            viewMode={viewMode}
            anatomyTree={anatomyTree}
            conditionGroups={allConditionGroups}
            activePath={activePath}
            activeConditionGroupId={activeConditionGroupId}
            onSelectPath={(path) => {
              setViewMode("anatomy");
              setActivePath(path);
              setSidebarCollapsed(false);
              setMobilePane("groups");
              requestAnimationFrame(scrollMobileToTop);
            }}
            onSelectConditionGroup={(groupId) => {
              setViewMode("conditions");
              setActiveConditionGroupId(groupId);
              setSidebarCollapsed(false);
              setMobilePane("groups");
              requestAnimationFrame(scrollMobileToTop);
            }}
          />
        </div>

        <div className="catalog-pane catalog-pane-groups">
          <CatalogGroupList
            title={groupTitle}
            groups={visibleGroups}
            selectedId={selectedTemplate?.id}
            pinnedIds={pinnedTemplateSet}
            onSelect={handleSelectTemplate}
            onTogglePinned={handleTogglePinned}
          />
        </div>

        <div className="catalog-pane catalog-pane-detail" ref={detailPaneRef}>
          <TemplateDetail
            template={selectedTemplate}
            sourceMap={preparedContent.sourceMap}
            breadcrumb={breadcrumb}
            pinned={selectedTemplate ? pinnedTemplateSet.has(selectedTemplate.id) : false}
            relatedStudies={relatedStudies}
            onSelectRelatedStudy={handleSelectRelatedStudy}
            onTogglePinned={handleTogglePinned}
            onBackToList={() => {
              setMobilePane("groups");
              requestAnimationFrame(scrollMobileToTop);
            }}
          />
        </div>
      </section>

    </main>
  );
}
