export type Modality = "USG" | "CT" | "MR" | "RTG" | "MMG" | "DXA" | "INNE";

export type TemplateStatus = "draft" | "reviewed" | "deprecated";

export type Source = {
  id: string;
  title: string;
  url: string;
  type: "guideline" | "template-library" | "educational" | "local-standard";
  accessedAt: string;
  licenseNote: string;
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
  sources: Source[];
  templates: RadiologyTemplate[];
  contentVersion: string;
  contentHash: string;
  generatedAt: string;
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
