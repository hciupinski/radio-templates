## Etap 8: trzustka - guzy lite

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Trzustka / Guz neuroendokrynny`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Trzustka / Guz neuroendokrynny.

Wymagania:
- chodzi o praktyczny szablon dla przezbrzusznego USG jamy brzusznej
- opisz, co ocenić: lokalizację, wielkość, zarys, echogeniczność, jednorodność, cechy martwicy/krwawienia, szerokość przewodu Wirsunga, ucisk na otoczenie, przerzuty do wątroby
- podkreśl ograniczenia USG przezbrzusznego i potrzebę dalszej charakterystyki onkologicznej
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs mają zawierać wyłącznie konkretne wykorzystane publikacje lub guideline’y z linkami
- nie dodawaj imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL i dającego się uczciwie opisać
```

#### Prompt: `USG jamy brzusznej / Trzustka / Gruczolakorak`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Trzustka / Gruczolakorak.

Wymagania:
- chodzi o podejrzenie inwazyjnego raka przewodowego trzustki w przezbrzusznym USG
- opisz, co ocenić: lokalizację guza, wielkość, zarys, echogeniczność, przewód Wirsunga, drogi żółciowe, naciekanie naczyń, węzły, przerzuty wątroby, wodobrzusze
- podkreśl, że USG jest metodą wstępną i wymaga pilnej diagnostyki przekrojowej / EUS
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs mają zawierać wyłącznie konkretne wykorzystane publikacje lub guideline’y z linkami
- nie dodawaj imageRefs bez pewnego, bezpośredniego URL i bez możliwości rzetelnego opisu widocznych cech
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla `Guz neuroendokrynny`

```text
Zapisz gotowy szablon atlasowy jako plik YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Trzustka
- pathology: Guz neuroendokrynny
- target path: content/templates/usg/jama-brzuszna/trzustka/guz-neuroendokrynny.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```

#### Prompt: zapis YAML dla `Gruczolakorak`

```text
Zapisz gotowy szablon atlasowy jako plik YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Trzustka
- pathology: Gruczolakorak
- target path: content/templates/usg/jama-brzuszna/trzustka/gruczolakorak.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```
