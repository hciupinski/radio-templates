import { z } from "zod";

export const modalitySchema = z.enum(["USG", "CT", "MR", "RTG", "MMG", "DXA", "INNE"]);
export const statusSchema = z.enum(["draft", "reviewed", "deprecated"]);
export const imageCategorySchema = z.enum([
  "typical",
  "variant",
  "doppler",
  "differential",
  "normal-reference",
  "pitfall"
]);
export const imageLicenseModeSchema = z.enum([
  "link-only",
  "cc-by",
  "cc-by-sa",
  "cc-by-nc",
  "public-domain",
  "unknown"
]);

export const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["guideline", "template-library", "educational", "local-standard"]),
  accessedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  licenseNote: z.string().min(1)
});

export const imageRefSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  imageUrl: z.string().url().startsWith("https://"),
  thumbnailUrl: z.string().url().startsWith("https://").optional(),
  sourceUrl: z.string().url().startsWith("https://"),
  sourceId: z.string().min(1).optional(),
  caption: z.string().min(1),
  alt: z.string().min(1),
  category: imageCategorySchema,
  findings: z.array(z.string().min(1)).min(1).max(4),
  attribution: z.string().min(1).optional(),
  licenseMode: imageLicenseModeSchema,
  lastCheckedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
});

export const taxonomyEntrySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  synonyms: z.array(z.string().min(1)).optional()
});

export const taxonomySchema = z.object({
  modalities: z.array(taxonomyEntrySchema).min(1),
  examTypes: z.array(taxonomyEntrySchema).min(1),
  bodySystems: z.array(taxonomyEntrySchema).min(1),
  bodyParts: z.array(taxonomyEntrySchema).min(1),
  organs: z.array(taxonomyEntrySchema).min(1),
  pathology: z.array(taxonomyEntrySchema).min(1),
  tags: z.array(taxonomyEntrySchema).min(1)
});

export const anatomySectionSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  pathology: z.array(z.string().min(1)).min(1),
  order: z.number().int().nonnegative()
});

export const conditionGroupSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
  organs: z.array(z.string().min(1)).min(1),
  pathology: z.array(z.string().min(1)).min(1),
  modalities: z.array(modalitySchema).optional(),
  order: z.number().int().nonnegative()
});

export const catalogSchema = z.object({
  anatomySections: z.record(z.string(), z.array(anatomySectionSchema).min(1)),
  conditionGroups: z.array(conditionGroupSchema).min(1)
});

export const templateSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  modality: modalitySchema,
  examTypes: z.array(z.string().min(1)).min(1),
  bodySystems: z.array(z.string().min(1)).min(1),
  bodyParts: z.array(z.string().min(1)).min(1),
  organs: z.array(z.string().min(1)).min(1),
  pathology: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
  status: statusSchema,
  version: z.string().min(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  sourceRefs: z.array(z.string().min(1)).min(1),
  imageRefs: z.array(imageRefSchema).max(12).optional(),
  sections: z.object({
    assessmentChecklist: z.array(z.string().min(1)).min(1),
    reportTemplate: z.string().min(1),
    impressionTemplate: z.string().min(1),
    clinicalNotes: z.array(z.string().min(1)).optional(),
    differential: z.array(z.string().min(1)).optional(),
    followUp: z.array(z.string().min(1)).optional()
  })
});

export const appContentBundleSchema = z.object({
  taxonomy: taxonomySchema,
  catalog: catalogSchema,
  sources: sourceSchema.array(),
  templates: templateSchema.array(),
  contentVersion: z.string().min(1),
  contentHash: z.string().regex(/^[a-f0-9]{12}$/),
  generatedAt: z.string().min(1)
});

export const contentManifestSchema = z.object({
  contentVersion: z.string().min(1),
  contentHash: z.string().regex(/^[a-f0-9]{12}$/),
  contentUrl: z.string().min(1),
  generatedAt: z.string().min(1)
});
