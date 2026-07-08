---
name: radiology-template-localizer
description: Build Polish radiology report templates from reliable medical sources for a specified study type, organ, and optional disease entity. Use when Codex needs to gather structured reporting guidance, adapt it into formal medical Polish used in Polish hospitals, and output an atlas-ready template or YAML-ready content for radiology reporting.
---

# Radiology Template Localizer

Build a radiology template from current, reliable sources. Translate concepts into concise, formal Polish medical language used in hospital reports. Do not produce a literal translation of any source.

## Inputs

Expect:

- `rodzaj badania` - required, for example `USG jamy brzusznej`, `MR przysadki`, `CT klatki piersiowej`
- `organ` - required, for example `wątroba`, `tarczyca`, `płuco`
- `jednostka chorobowa` - optional, for example `marskość`, `guzek TI-RADS 4`, `zapalenie`

If `jednostka chorobowa` is missing, build a template for the normal exam and add a short list of the most common pathology variants worth adding next.

## Workflow

1. Normalize the request into:
   - modality
   - examination scope
   - organ or anatomic region
   - pathology state: normal, suspected lesion, inflammatory, neoplastic, follow-up, or other
2. Browse the web for current primary sources. Prefer official societies, standards, and structured reporting libraries.
3. Use source priority:
   - official reporting systems and guidelines first, such as ACR RADS, AIUM, EFSUMB, society guidance, or organ-specific consensus statements
   - structured template libraries second, such as RSNA RadReport
   - educational references third, such as Radiopaedia or The Radiology Assistant, only to widen pathology coverage or clarify terminology
4. Extract:
   - what must be assessed in the exam
   - the required lexicon or classification system
   - typical findings for the requested entity
   - follow-up or management wording only when supported by a source
5. Search for candidate educational images that can be embedded directly from external links.
6. Accept an image candidate only if all are true:
   - the image has a direct `https` URL suitable for `<img src>`
   - the page with the case or article can be linked separately as `sourceUrl`
   - the image shows a characteristic finding relevant to the requested entity
   - you can describe 2 to 4 concrete findings visible on the image
   - the license or reuse status is at least understood well enough to classify as `link-only`, `cc-by`, `cc-by-sa`, `cc-by-nc`, `public-domain`, or `unknown`
7. Prefer image sources in this order:
   - open educational or media repositories with stable direct file URLs
   - open-access journal figures when the article and figure licensing are explicit
   - educational case libraries only when direct external embedding is technically possible and the source is stable enough
8. Rewrite the content into Polish hospital reporting style. Use Polish clinical phrasing, not English syntax translated word-for-word.
9. Produce a practical template with explicit placeholders in the form `{{nazwa_pola}}`.
10. Cite the sources used with links and dates accessed.

## Writing Rules

- Use concise, formal, depersonalized medical Polish.
- Prefer phrasing typical for a final report, for example: `Wątroba niepowiększona, o jednorodnej echostrukturze...`
- Avoid marketing language, patient education language, and speculative wording unsupported by the sources.
- Avoid copying source text verbatim. Synthesize and localize.
- Keep uncertainty explicit when the source is educational rather than normative.
- If the available sources conflict, say so and prefer the more authoritative and more recent source.
- If the source describes a classification, preserve the classification label exactly, for example `TI-RADS 4`, while the rest of the sentence remains in Polish.

## Output Format

Default to this structure unless the user asks for another one:

### Brief

- `Badanie`
- `Organ`
- `Jednostka chorobowa` or `Prawidłowy obraz`

### Co ocenić

List the required assessment points for the sonographer or radiologist.

### Szablon opisu

Provide a complete report body in Polish with placeholders, for example `{{wymiar_mm}}`, `{{lokalizacja}}`, `{{cechy_doppler}}`.

### Wnioski

Provide a concise impression section in Polish.

### Uwagi praktyczne

Add only when useful:

- optional differential points
- limitations of modality
- source-backed follow-up recommendations

### Źródła

List links with a short note on how each source was used.

### Obrazy edukacyjne

If you found acceptable image candidates, list `2` to `6` items. For each item include:

- `title`
- `imageUrl`
- `sourceUrl`
- `category`
- `caption`
- `findings`
- `licenseMode`
- `lastCheckedAt`

If you could not find embeddable and sufficiently stable image URLs, say so explicitly instead of inventing them.

## Atlas/YAML Mode

If the user asks to add the result to an atlas or repository, emit content ready to map into:

- `title`
- `modality`
- `examTypes`
- `bodySystems`
- `bodyParts`
- `organs`
- `pathology`
- `tags`
- `sourceRefs`
- optional `imageRefs`
- `sections.assessmentChecklist`
- `sections.reportTemplate`
- `sections.impressionTemplate`
- optional `sections.clinicalNotes`
- optional `sections.differential`
- optional `sections.followUp`

Preserve placeholders as `{{...}}`.

When emitting `imageRefs`, use this shape:

- `id`
- `title`
- `imageUrl`
- optional `thumbnailUrl`
- `sourceUrl`
- optional `sourceId`
- `caption`
- `alt`
- `category`
- `findings`
- optional `attribution`
- `licenseMode`
- `lastCheckedAt`

## Decision Rules

- If official guidance exists for the requested entity, center the template around that guidance.
- If no official template exists, combine guideline completeness criteria with educational pattern recognition and clearly state that the template is an adapted working draft.
- If pathology is too broad, narrow it to the most clinically common subtype and state that assumption.
- If the request concerns a high-stakes recommendation and no current primary source is available, say that verification is incomplete rather than inventing guidance.
- If image licensing or hotlink stability is unclear, keep the image out of `imageRefs` and mention it as a rejected candidate.
