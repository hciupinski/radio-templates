---
name: radiology-atlas-yaml-writer
description: Generate and save ready radiology atlas template files under `content/templates/*.yaml` for this repository. Use when Codex needs to take a study type, organ, and optional disease entity, gather or adapt the reporting content, map it to the repository taxonomy, write a valid YAML template file, update taxonomy or sources when required, and validate the atlas content.
---

# Radiology Atlas YAML Writer

Write a complete atlas template file directly into this repository. Produce content in formal Polish medical reporting language and keep the file valid against the local schema.

## Required Inputs

Expect:

- `rodzaj badania` - required
- `organ` - required
- `jednostka chorobowa` - optional

If `jednostka chorobowa` is missing, create the normal-study variant and map pathology to `Obraz prawidłowy`.

## Read Before Writing

Read these repository files first:

- `content/taxonomy.yaml`
- `content/sources.yaml`
- `src/data/schema.ts`
- `scripts/validate-content.mjs`
- one or two nearby examples in `content/templates/**`

Use them to determine:

- allowed labels for metadata fields
- required YAML shape
- current source ids
- naming and phrasing conventions

## Workflow

1. Normalize the request into modality, exam type, body system, body part, organ, and pathology.
2. Check whether the needed labels already exist in `content/taxonomy.yaml`.
3. If a needed label is missing:
   - add the taxonomy entry first when the new concept clearly belongs in the atlas
   - otherwise stop and explain what is missing
4. Check whether planned `sourceRefs` already exist in `content/sources.yaml`.
5. If a source is missing, add a new source entry before referencing it from the template.
6. Create the YAML file under `content/templates/...`.
7. Run `npm run validate`.
8. If validation fails, fix the file or related taxonomy/source entries before finishing.

## Path Rules

Build the file path from normalized slug-like folder names:

- modality folder: use lowercase modality family, for example `usg`, `ct`, `mr`
- body part folder: use the taxonomy id when possible, for example `jama-brzuszna`
- organ folder: use the taxonomy id when possible, for example `watroba`
- file name:
  - use pathology id when present, for example `marskosc.yaml`
  - use `prawidlowa.yaml` for the normal variant

Preferred pattern:

`content/templates/<modality>/<body-part-id>/<organ-id>/<pathology-or-normal>.yaml`

Match the repository's existing path style instead of inventing a new layout.

## YAML Rules

Write fields required by the local schema:

- `id`
- `title`
- `modality`
- `examTypes`
- `bodySystems`
- `bodyParts`
- `organs`
- `pathology`
- `tags`
- `status`
- `version`
- `updatedAt`
- `sourceRefs`
- `sections.assessmentChecklist`
- `sections.reportTemplate`
- `sections.impressionTemplate`
- optional `sections.clinicalNotes`
- optional `sections.differential`
- optional `sections.followUp`

Use labels from `content/taxonomy.yaml`, not taxonomy ids, inside metadata arrays.

## Content Rules

- Use concise, formal Polish hospital reporting language.
- Preserve placeholders as `{{nazwa_pola}}`.
- Prefer `draft` for new files unless the user explicitly asks for a reviewed internal standard.
- Start new files with version `0.1.0`.
- Set `updatedAt` to the current date.
- Keep `assessmentChecklist` specific to the modality and organ.
- Keep `impressionTemplate` shorter than `reportTemplate`.
- Add `clinicalNotes`, `differential`, or `followUp` only when they add real value.

## Source Rules

- Prefer current primary sources and official guidance.
- Use existing source ids when available.
- If adding a source, include:
  - `id`
  - `title`
  - `url`
  - `type`
  - `accessedAt`
  - `licenseNote`
- Do not reference a source id that does not exist in `content/sources.yaml`.

## Decision Rules

- If official structured reporting guidance exists, center the YAML content around it.
- If only educational references exist, still generate the file, but keep status as `draft`.
- If pathology wording is broad, narrow it to the most common clinically useful variant and state that assumption in the final message.
- If the taxonomy is too narrow for the requested concept, extend taxonomy carefully instead of forcing a wrong label.

## Completion Criteria

Finish only when all are true:

- the target YAML file exists in `content/templates/**`
- any required taxonomy additions are saved
- any required source additions are saved
- `npm run validate` passes, or you clearly report why it could not be run

## Final Response

Report:

- the created file path
- whether taxonomy or sources were updated
- whether validation passed
