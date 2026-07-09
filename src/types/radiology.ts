export type Modality = "USG" | "CT" | "MR" | "RTG" | "MMG" | "DXA" | "INNE";
export type CatalogViewMode = "anatomy" | "conditions" | "recent" | "pinned";

export type TemplateStatus = "draft" | "reviewed" | "deprecated";
export type ImageCategory =
  | "typical"
  | "variant"
  | "doppler"
  | "differential"
  | "normal-reference"
  | "pitfall";

export type ImageLicenseMode =
  | "link-only"
  | "cc-by"
  | "cc-by-sa"
  | "cc-by-nc"
  | "public-domain"
  | "unknown";

export type Source = {
  id: string;
  title: string;
  url: string;
  type: "guideline" | "template-library" | "educational" | "local-standard";
  accessedAt: string;
  licenseNote: string;
};

export type ImageRef = {
  id: string;
  title: string;
  imageUrl: string;
  thumbnailUrl?: string;
  sourceUrl: string;
  sourceId?: string;
  caption: string;
  alt: string;
  category: ImageCategory;
  findings: string[];
  attribution?: string;
  licenseMode: ImageLicenseMode;
  lastCheckedAt: string;
};

export type TaxonomyEntry = {
  id: string;
  label: string;
  synonyms?: string[];
};

export type Taxonomy = {
  modalities: TaxonomyEntry[];
  examTypes: TaxonomyEntry[];
  bodySystems: TaxonomyEntry[];
  bodyParts: TaxonomyEntry[];
  organs: TaxonomyEntry[];
  pathology: TaxonomyEntry[];
  tags: TaxonomyEntry[];
};

export type AnatomySection = {
  id: string;
  label: string;
  pathology: string[];
  order: number;
};

export type ConditionGroup = {
  id: string;
  label: string;
  description: string;
  organs: string[];
  pathology: string[];
  modalities?: Modality[];
  order: number;
};

export type CatalogConfig = {
  anatomySections: Record<string, AnatomySection[]>;
  conditionGroups: ConditionGroup[];
};

export type RadiologyTemplate = {
  id: string;
  title: string;
  modality: Modality;
  examTypes: string[];
  bodySystems: string[];
  bodyParts: string[];
  organs: string[];
  pathology: string[];
  tags: string[];
  status: TemplateStatus;
  version: string;
  updatedAt: string;
  sourceRefs: string[];
  imageRefs?: ImageRef[];
  sections: {
    assessmentChecklist: string[];
    reportTemplate: string;
    impressionTemplate: string;
    clinicalNotes?: string[];
    differential?: string[];
    followUp?: string[];
  };
};

export type TemplateWithSearch = RadiologyTemplate & {
  searchText: string;
};

export type AppContentBundle = {
  taxonomy: Taxonomy;
  catalog: CatalogConfig;
  sources: Source[];
  templates: RadiologyTemplate[];
  contentVersion: string;
  contentHash: string;
  generatedAt: string;
};

export type CatalogPath = {
  modality: string;
  examType: string;
  bodySystem: string;
  organ: string;
};

export type AnatomyTreeOrgan = {
  label: string;
  count: number;
};

export type AnatomyTreeBodySystem = {
  label: string;
  count: number;
  organs: AnatomyTreeOrgan[];
};

export type AnatomyTreeExamType = {
  label: string;
  count: number;
  bodySystems: AnatomyTreeBodySystem[];
};

export type AnatomyTreeModality = {
  label: string;
  count: number;
  examTypes: AnatomyTreeExamType[];
};

export type CatalogGroupSummary = {
  id: string;
  label: string;
  description?: string;
  count: number;
  modalities: string[];
  templates: TemplateWithSearch[];
};

export type ContentManifest = {
  contentVersion: string;
  contentHash: string;
  contentUrl: string;
  generatedAt: string;
};

export type UpdateResult =
  | {
      status: "up-to-date";
    }
  | {
      status: "updated";
      bundle: AppContentBundle;
      manifest: ContentManifest;
    }
  | {
      status: "unavailable";
      error: Error;
    };
