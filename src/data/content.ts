import Fuse from "fuse.js";
import { appContentBundleSchema, contentManifestSchema } from "./schema";
import type {
  AppContentBundle,
  ContentManifest,
  RadiologyTemplate,
  Taxonomy,
  TemplateWithSearch,
  UpdateResult
} from "../types/radiology";

const manifestUrl = resolvePublicPath("content-manifest.json");

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
    ...template.sections.assessmentChecklist
  ];

  const synonyms = terms.flatMap((term) => synonymLookup.get(term.toLocaleLowerCase("pl")) ?? []);
  return [...terms, ...synonyms].join(" ");
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
    })
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
