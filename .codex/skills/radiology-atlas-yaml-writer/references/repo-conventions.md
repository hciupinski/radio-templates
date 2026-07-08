# Repo Conventions

Use this file as a quick map before writing a new atlas template.

## Canonical Files

- `content/taxonomy.yaml`: allowed labels and ids
- `content/sources.yaml`: allowed `sourceRefs`
- `src/data/schema.ts`: required YAML structure
- `scripts/validate-content.mjs`: repository validation rules

## Path Pattern

Prefer:

`content/templates/<modality>/<body-part-id>/<organ-id>/<file>.yaml`

Examples:

- `content/templates/usg/jama-brzuszna/watroba/prawidlowa.yaml`
- `content/templates/usg/jama-brzuszna/watroba/marskosc.yaml`

## Metadata Pattern

- `modality` uses display labels such as `USG`
- arrays such as `examTypes`, `bodySystems`, `bodyParts`, `organs`, `pathology`, and `tags` use taxonomy labels, not ids
- `sourceRefs` use source ids
- new templates should usually start as `draft`
- new templates should usually start at version `0.1.0`

## Content Pattern

- `assessmentChecklist` is a short operational list
- `reportTemplate` is the main narrative body
- `impressionTemplate` is brief and conclusive
- placeholders must remain in `{{snake_case}}`

## Validation

After saving:

1. run `npm run validate`
2. fix taxonomy, sources, or YAML shape errors
3. finish only after validation succeeds or the failure is explained
