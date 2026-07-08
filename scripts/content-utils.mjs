import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";
import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const modalitySchema = z.enum(["USG", "CT", "MR", "RTG", "MMG", "DXA", "INNE"]);
const statusSchema = z.enum(["draft", "reviewed", "deprecated"]);

const sourceSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  type: z.enum(["guideline", "template-library", "educational", "local-standard"]),
  accessedAt: dateSchema,
  licenseNote: z.string().min(1)
});

const taxonomyEntrySchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  synonyms: z.array(z.string().min(1)).optional()
});

const taxonomySchema = z.object({
  modalities: z.array(taxonomyEntrySchema).min(1),
  examTypes: z.array(taxonomyEntrySchema).min(1),
  bodySystems: z.array(taxonomyEntrySchema).min(1),
  bodyParts: z.array(taxonomyEntrySchema).min(1),
  organs: z.array(taxonomyEntrySchema).min(1),
  pathology: z.array(taxonomyEntrySchema).min(1),
  tags: z.array(taxonomyEntrySchema).min(1)
});

const templateSchema = z.object({
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
  updatedAt: dateSchema,
  sourceRefs: z.array(z.string().min(1)).min(1),
  sections: z.object({
    assessmentChecklist: z.array(z.string().min(1)).min(1),
    reportTemplate: z.string().min(1),
    impressionTemplate: z.string().min(1),
    clinicalNotes: z.array(z.string().min(1)).optional(),
    differential: z.array(z.string().min(1)).optional(),
    followUp: z.array(z.string().min(1)).optional()
  })
});

function readYaml(filePath) {
  return yaml.load(fs.readFileSync(filePath, "utf8"));
}

function walkYaml(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkYaml(entryPath));
    } else if (entry.name.endsWith(".yaml") || entry.name.endsWith(".yml")) {
      result.push(entryPath);
    }
  }
  return result;
}

function assertUnique(items, key, label) {
  const seen = new Set();
  for (const item of items) {
    const value = item[key];
    if (seen.has(value)) {
      throw new Error(`Duplikat ${label}: ${value}`);
    }
    seen.add(value);
  }
}

function assertKnownValues(values, allowed, field, templateId) {
  for (const value of values) {
    if (!allowed.has(value)) {
      throw new Error(`Nieznana wartość "${value}" w ${field} dla szablonu ${templateId}`);
    }
  }
}

function sortTemplates(templates) {
  return templates.toSorted((a, b) => {
    const modality = a.modality.localeCompare(b.modality, "pl");
    if (modality !== 0) return modality;
    const bodyPart = a.bodyParts.join(" ").localeCompare(b.bodyParts.join(" "), "pl");
    if (bodyPart !== 0) return bodyPart;
    return a.title.localeCompare(b.title, "pl");
  });
}

export function getContentVersion(templates) {
  const latest = templates.reduce((date, template) => {
    return template.updatedAt > date ? template.updatedAt : date;
  }, "");
  return `${templates.length} szablonów, aktualizacja ${latest}`;
}

export function loadValidatedContent(rootDir = process.cwd()) {
  const contentDir = path.join(rootDir, "content");
  const templateDir = path.join(contentDir, "templates");
  const taxonomy = taxonomySchema.parse(readYaml(path.join(contentDir, "taxonomy.yaml")));
  const sources = sourceSchema.array().parse(readYaml(path.join(contentDir, "sources.yaml")));

  assertUnique(sources, "id", "źródła");

  for (const [groupName, group] of Object.entries(taxonomy)) {
    assertUnique(group, "id", `id taksonomii ${groupName}`);
    assertUnique(group, "label", `etykiety taksonomii ${groupName}`);
  }

  const allowed = {
    modalities: new Set(taxonomy.modalities.map((entry) => entry.label)),
    examTypes: new Set(taxonomy.examTypes.map((entry) => entry.label)),
    bodySystems: new Set(taxonomy.bodySystems.map((entry) => entry.label)),
    bodyParts: new Set(taxonomy.bodyParts.map((entry) => entry.label)),
    organs: new Set(taxonomy.organs.map((entry) => entry.label)),
    pathology: new Set(taxonomy.pathology.map((entry) => entry.label)),
    tags: new Set(taxonomy.tags.map((entry) => entry.label)),
    sources: new Set(sources.map((source) => source.id))
  };

  const templateFiles = walkYaml(templateDir);
  const templates = templateFiles.map((filePath) => {
    try {
      return templateSchema.parse(readYaml(filePath));
    } catch (error) {
      throw new Error(`${path.relative(rootDir, filePath)}: ${error.message}`);
    }
  });

  assertUnique(templates, "id", "id szablonu");

  for (const template of templates) {
    assertKnownValues([template.modality], allowed.modalities, "modality", template.id);
    assertKnownValues(template.examTypes, allowed.examTypes, "examTypes", template.id);
    assertKnownValues(template.bodySystems, allowed.bodySystems, "bodySystems", template.id);
    assertKnownValues(template.bodyParts, allowed.bodyParts, "bodyParts", template.id);
    assertKnownValues(template.organs, allowed.organs, "organs", template.id);
    assertKnownValues(template.pathology, allowed.pathology, "pathology", template.id);
    assertKnownValues(template.tags, allowed.tags, "tags", template.id);
    assertKnownValues(template.sourceRefs, allowed.sources, "sourceRefs", template.id);
  }

  return {
    taxonomy,
    sources,
    templates: sortTemplates(templates)
  };
}

export function buildContentBundle(rootDir = process.cwd()) {
  const { taxonomy, sources, templates } = loadValidatedContent(rootDir);
  const generatedAt = new Date().toISOString();
  const contentVersion = getContentVersion(templates);
  const serialized = JSON.stringify({
    taxonomy,
    sources,
    templates,
    contentVersion,
    generatedAt
  });
  const contentHash = crypto.createHash("sha256").update(serialized).digest("hex").slice(0, 12);

  return {
    taxonomy,
    sources,
    templates,
    contentVersion,
    contentHash,
    generatedAt
  };
}

export function writeGeneratedContent(rootDir = process.cwd()) {
  const publicDir = path.join(rootDir, "public");
  const bundle = buildContentBundle(rootDir);
  const contentFileName = `content-${bundle.contentHash}.json`;
  const manifest = {
    contentVersion: bundle.contentVersion,
    contentHash: bundle.contentHash,
    contentUrl: `./${contentFileName}`,
    generatedAt: bundle.generatedAt
  };

  fs.mkdirSync(publicDir, { recursive: true });

  for (const entry of fs.readdirSync(publicDir)) {
    if (/^content-[a-f0-9]{12}\.json$/u.test(entry)) {
      fs.unlinkSync(path.join(publicDir, entry));
    }
  }

  fs.writeFileSync(
    path.join(publicDir, contentFileName),
    `${JSON.stringify(bundle, null, 2)}\n`,
    "utf8"
  );
  fs.writeFileSync(
    path.join(publicDir, "content-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
    "utf8"
  );

  return {
    bundle,
    manifest,
    contentFileName
  };
}
