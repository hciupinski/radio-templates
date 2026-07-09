import Fuse from "fuse.js";
import type {
  AnatomyTreeBodySystem,
  AnatomyTreeExamType,
  AnatomyTreeModality,
  AnatomyTreeOrgan,
  AppContentBundle,
  CatalogConfig,
  CatalogGroupSummary,
  CatalogPath,
  RadiologyTemplate,
  Taxonomy,
  TemplateWithSearch,
  UpdateResult
} from "../types/radiology";
import { appContentBundleSchema, contentManifestSchema } from "./schema";

const manifestUrl = resolvePublicPath("content-manifest.json");

type SearchEntry = {
  label: string;
  synonyms: string[];
};

export type QueryContextMatch =
  | ({ type: "organ" } & Partial<CatalogPath> & { organ: string })
  | ({ type: "condition" } & { conditionGroupId: string })
  | ({ type: "examType" } & Partial<CatalogPath> & { examType: string })
  | ({ type: "modality" } & Partial<CatalogPath> & { modality: string });

function normalizePublicPath(pathname: string): string {
  return pathname.replace(/^\.?\//u, "");
}

export function resolvePublicPath(pathname: string): string {
  return `${import.meta.env.BASE_URL}${normalizePublicPath(pathname)}`;
}

async function parseResponseJson<T>(
  response: Response,
  parser: { parse: (value: unknown) => T },
  path: string
): Promise<T> {
  const parsed = await response.json();
  try {
    return parser.parse(parsed);
  } catch (error) {
    console.error(`Niepoprawny plik danych: ${path}`, error);
    throw error;
  }
}

async function readCachedJson<T>(
  url: string,
  parser: { parse: (value: unknown) => T }
): Promise<T | null> {
  if (!("caches" in window)) {
    return null;
  }

  const cached = await caches.match(url, { ignoreSearch: true });
  if (!cached) {
    return null;
  }

  return parseResponseJson(cached, parser, url);
}

async function fetchJson<T>(
  url: string,
  parser: { parse: (value: unknown) => T },
  options: RequestInit = {},
  allowCacheFallback = true
): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Nie udało się pobrać ${url} (${response.status})`);
    }
    return await parseResponseJson(response, parser, url);
  } catch (error) {
    if (allowCacheFallback) {
      const cached = await readCachedJson(url, parser);
      if (cached) {
        return cached;
      }
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error(`Nie udało się pobrać ${url}`);
  }
}

function resolveContentUrl(contentUrl: string): string {
  return resolvePublicPath(contentUrl);
}

async function loadBundleFromManifest(
  manifest: ContentManifest,
  allowCacheFallback: boolean
): Promise<AppContentBundle> {
  const bundle = await fetchJson(
    resolveContentUrl(manifest.contentUrl),
    appContentBundleSchema,
    { cache: "no-store" },
    allowCacheFallback
  );

  if (bundle.contentHash !== manifest.contentHash) {
    throw new Error("Manifest treści nie zgadza się z pobranym bundlem.");
  }

  return bundle;
}

function createSynonymLookup(taxonomy: Taxonomy): Map<string, string[]> {
  const synonymLookup = new Map<string, string[]>();

  for (const group of Object.values(taxonomy)) {
    for (const entry of group) {
      synonymLookup.set(entry.label.toLocaleLowerCase("pl"), entry.synonyms ?? []);
      synonymLookup.set(entry.id.toLocaleLowerCase("pl"), entry.synonyms ?? []);
    }
  }

  return synonymLookup;
}

function templateSearchText(
  template: RadiologyTemplate,
  synonymLookup: Map<string, string[]>
): string {
  const terms = [
    template.title,
    template.modality,
    ...template.examTypes,
    ...template.bodySystems,
    ...template.bodyParts,
    ...template.organs,
    ...template.pathology,
    ...template.tags,
    template.sections.reportTemplate,
    template.sections.impressionTemplate,
    ...template.sections.assessmentChecklist,
    ...(template.imageRefs?.flatMap((imageRef) => [
      imageRef.title,
      imageRef.caption,
      ...imageRef.findings
    ]) ?? [])
  ];

  const synonyms = terms.flatMap((term) => synonymLookup.get(term.toLocaleLowerCase("pl")) ?? []);
  return [...terms, ...synonyms].join(" ");
}

function createOrderLookup(entries: { label: string }[]): Map<string, number> {
  return new Map(entries.map((entry, index) => [entry.label, index]));
}

function sortByLookup<T extends { label: string }>(
  items: T[],
  orderLookup: Map<string, number>
): T[] {
  return [...items].sort((a, b) => {
    const aOrder = orderLookup.get(a.label) ?? Number.MAX_SAFE_INTEGER;
    const bOrder = orderLookup.get(b.label) ?? Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    return a.label.localeCompare(b.label, "pl");
  });
}

function toSummaryGroup(
  id: string,
  label: string,
  templates: TemplateWithSearch[],
  description?: string
): CatalogGroupSummary {
  return {
    id,
    label,
    description,
    count: templates.length,
    modalities: [...new Set(templates.map((template) => template.modality))],
    templates
  };
}

export function buildAnatomyTree(
  templates: TemplateWithSearch[],
  taxonomy: Taxonomy
): AnatomyTreeModality[] {
  const modalityLookup = createOrderLookup(taxonomy.modalities);
  const examTypeLookup = createOrderLookup(taxonomy.examTypes);
  const bodySystemLookup = createOrderLookup(taxonomy.bodySystems);
  const organLookup = createOrderLookup(taxonomy.organs);

  const modalityMap = new Map<
    string,
    {
      ids: Set<string>;
      examTypes: Map<
        string,
        {
          ids: Set<string>;
          bodySystems: Map<
            string,
            {
              ids: Set<string>;
              organs: Map<string, Set<string>>;
            }
          >;
        }
      >;
    }
  >();

  for (const template of templates) {
    const modalityEntry = modalityMap.get(template.modality) ?? {
      ids: new Set<string>(),
      examTypes: new Map()
    };

    modalityEntry.ids.add(template.id);
    modalityMap.set(template.modality, modalityEntry);

    for (const examType of template.examTypes) {
      const examTypeEntry = modalityEntry.examTypes.get(examType) ?? {
        ids: new Set<string>(),
        bodySystems: new Map()
      };

      examTypeEntry.ids.add(template.id);
      modalityEntry.examTypes.set(examType, examTypeEntry);

      for (const bodySystem of template.bodySystems) {
        const bodySystemEntry = examTypeEntry.bodySystems.get(bodySystem) ?? {
          ids: new Set<string>(),
          organs: new Map()
        };

        bodySystemEntry.ids.add(template.id);
        examTypeEntry.bodySystems.set(bodySystem, bodySystemEntry);

        for (const organ of template.organs) {
          const organEntry = bodySystemEntry.organs.get(organ) ?? new Set<string>();
          organEntry.add(template.id);
          bodySystemEntry.organs.set(organ, organEntry);
        }
      }
    }
  }

  return sortByLookup(
    Array.from(modalityMap.entries()).map(([label, modalityEntry]) => {
      const examTypes: AnatomyTreeExamType[] = sortByLookup(
        Array.from(modalityEntry.examTypes.entries()).map(([examLabel, examEntry]) => {
          const bodySystems: AnatomyTreeBodySystem[] = sortByLookup(
            Array.from(examEntry.bodySystems.entries()).map(([bodyLabel, bodyEntry]) => {
              const organs: AnatomyTreeOrgan[] = sortByLookup(
                Array.from(bodyEntry.organs.entries()).map(([organLabel, organIds]) => ({
                  label: organLabel,
                  count: organIds.size
                })),
                organLookup
              );

              return {
                label: bodyLabel,
                count: bodyEntry.ids.size,
                organs
              };
            }),
            bodySystemLookup
          );

          return {
            label: examLabel,
            count: examEntry.ids.size,
            bodySystems
          };
        }),
        examTypeLookup
      );

      return {
        label,
        count: modalityEntry.ids.size,
        examTypes
      };
    }),
    modalityLookup
  );
}

function findMatchingSectionId(template: TemplateWithSearch, sections: CatalogConfig["anatomySections"][string]) {
  return sections.find((section) =>
    section.pathology.some((pathology) => template.pathology.includes(pathology))
  )?.id;
}

export function buildAnatomyGroups(
  templates: TemplateWithSearch[],
  catalog: CatalogConfig,
  organ: string
): CatalogGroupSummary[] {
  const scopedTemplates = templates.filter((template) => template.organs.includes(organ));
  const sections = [...(catalog.anatomySections[organ] ?? [])].sort((a, b) => a.order - b.order);

  if (!scopedTemplates.length) {
    return [];
  }

  if (!sections.length) {
    return [toSummaryGroup(`anatomy:${organ}:remaining`, "Pozostałe", scopedTemplates)];
  }

  const grouped = new Map<string, TemplateWithSearch[]>();
  const ungrouped: TemplateWithSearch[] = [];

  for (const section of sections) {
    grouped.set(section.id, []);
  }

  for (const template of scopedTemplates) {
    const sectionId = findMatchingSectionId(template, sections);
    if (!sectionId) {
      ungrouped.push(template);
      continue;
    }

    grouped.get(sectionId)?.push(template);
  }

  const result = sections
    .map((section) => toSummaryGroup(
      `anatomy:${organ}:${section.id}`,
      section.label,
      grouped.get(section.id) ?? []
    ))
    .filter((group) => group.count > 0);

  if (ungrouped.length) {
    result.push(toSummaryGroup(`anatomy:${organ}:remaining`, "Pozostałe", ungrouped));
  }

  return result;
}

export function buildConditionGroups(
  templates: TemplateWithSearch[],
  catalog: CatalogConfig
): CatalogGroupSummary[] {
  const groupedTemplateIds = new Set<string>();

  const groups = [...catalog.conditionGroups]
    .sort((a, b) => a.order - b.order)
    .map((group) => {
      const matchingTemplates = templates.filter((template) => {
        const organMatch = group.organs.some((organ) => template.organs.includes(organ));
        const pathologyMatch = group.pathology.some((pathology) =>
          template.pathology.includes(pathology)
        );
        const modalityMatch = !group.modalities?.length || group.modalities.includes(template.modality);

        return organMatch && pathologyMatch && modalityMatch;
      });

      for (const template of matchingTemplates) {
        groupedTemplateIds.add(template.id);
      }

      return toSummaryGroup(group.id, group.label, matchingTemplates, group.description);
    })
    .filter((group) => group.count > 0);

  const remaining = templates.filter((template) => !groupedTemplateIds.has(template.id));

  if (remaining.length) {
    groups.push(
      toSummaryGroup(
        "conditions:remaining",
        "Pozostałe",
        remaining,
        "Szablony bez przypisanej jeszcze grupy chorobowej."
      )
    );
  }

  return groups;
}

function createSearchEntries(entries: { label: string; synonyms?: string[] }[]): SearchEntry[] {
  return entries.map((entry) => ({
    label: entry.label,
    synonyms: entry.synonyms ?? []
  }));
}

function matchesSearchEntry(entry: SearchEntry, normalizedQuery: string): boolean {
  const values = [entry.label, ...entry.synonyms];
  return values.some((value) => {
    const normalizedValue = value.toLocaleLowerCase("pl");
    return normalizedValue.includes(normalizedQuery) || normalizedQuery.includes(normalizedValue);
  });
}

export function resolveQueryContext(
  query: string,
  taxonomy: Taxonomy,
  catalog: CatalogConfig
): QueryContextMatch | null {
  const normalizedQuery = query.trim().toLocaleLowerCase("pl");
  if (!normalizedQuery) {
    return null;
  }

  const organEntry = createSearchEntries(taxonomy.organs).find((entry) =>
    matchesSearchEntry(entry, normalizedQuery)
  );
  if (organEntry) {
    return { type: "organ", organ: organEntry.label };
  }

  const pathologyEntry = createSearchEntries(taxonomy.pathology).find((entry) =>
    matchesSearchEntry(entry, normalizedQuery)
  );
  if (pathologyEntry) {
    const group = catalog.conditionGroups.find((candidate) =>
      candidate.pathology.includes(pathologyEntry.label)
    );
    if (group) {
      return { type: "condition", conditionGroupId: group.id };
    }
  }

  const examTypeEntry = createSearchEntries(taxonomy.examTypes).find((entry) =>
    matchesSearchEntry(entry, normalizedQuery)
  );
  if (examTypeEntry) {
    return { type: "examType", examType: examTypeEntry.label };
  }

  const modalityEntry = createSearchEntries(taxonomy.modalities).find((entry) =>
    matchesSearchEntry(entry, normalizedQuery)
  );
  if (modalityEntry) {
    return { type: "modality", modality: modalityEntry.label };
  }

  return null;
}

export function searchTemplates(
  query: string,
  templates: TemplateWithSearch[],
  searchIndex: Fuse<TemplateWithSearch>
): TemplateWithSearch[] {
  const normalized = query.trim();
  if (!normalized) return templates;

  const allowedIds = new Set(templates.map((template) => template.id));

  return searchIndex
    .search(normalized)
    .map((result) => result.item)
    .filter((template) => allowedIds.has(template.id));
}

export function prepareContent(bundle: AppContentBundle) {
  const synonymLookup = createSynonymLookup(bundle.taxonomy);
  const templatesWithSearch: TemplateWithSearch[] = bundle.templates.map((template) => ({
    ...template,
    searchText: templateSearchText(template, synonymLookup)
  }));

  return {
    templatesWithSearch,
    sourceMap: new Map(bundle.sources.map((source) => [source.id, source])),
    searchIndex: new Fuse(templatesWithSearch, {
      keys: [
        { name: "title", weight: 0.35 },
        { name: "modality", weight: 0.1 },
        { name: "examTypes", weight: 0.12 },
        { name: "bodyParts", weight: 0.12 },
        { name: "organs", weight: 0.14 },
        { name: "pathology", weight: 0.12 },
        { name: "tags", weight: 0.08 },
        { name: "searchText", weight: 0.2 }
      ],
      threshold: 0.34,
      ignoreLocation: true,
      shouldSort: true,
      includeScore: true
    }),
    anatomyTree: buildAnatomyTree(templatesWithSearch, bundle.taxonomy),
    conditionGroups: buildConditionGroups(templatesWithSearch, bundle.catalog)
  };
}

export async function loadContent(): Promise<AppContentBundle> {
  const cachedManifest = await readCachedJson(manifestUrl, contentManifestSchema);
  if (cachedManifest) {
    try {
      return await loadBundleFromManifest(cachedManifest, true);
    } catch (error) {
      console.warn("Nie udało się załadować bundla z cache, przełączam na sieć.", error);
    }
  }

  const manifest = await fetchJson(
    manifestUrl,
    contentManifestSchema,
    { cache: "no-store" },
    true
  );
  return loadBundleFromManifest(manifest, true);
}

export async function checkForContentUpdate(currentHash: string): Promise<UpdateResult> {
  try {
    const manifest = await fetchJson(
      manifestUrl,
      contentManifestSchema,
      { cache: "no-store" },
      false
    );

    if (manifest.contentHash === currentHash) {
      return { status: "up-to-date" };
    }

    const bundle = await loadBundleFromManifest(manifest, false);
    return {
      status: "updated",
      bundle,
      manifest
    };
  } catch (error) {
    return {
      status: "unavailable",
      error: error instanceof Error ? error : new Error("Nie udało się sprawdzić aktualizacji.")
    };
  }
}

type ContentManifest = {
  contentVersion: string;
  contentHash: string;
  contentUrl: string;
  generatedAt: string;
};
