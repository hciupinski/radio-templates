## Etap 7: trzustka - torbiel rzekoma

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Trzustka / Torbiel rzekoma`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Trzustka / Torbiel rzekoma.

Wymagania:
- opieraj się tylko na konkretnych, rzeczywiście wykorzystanych publikacjach z linkami
- uwzględnij, że rozpoznanie torbieli rzekomej wymaga korelacji z wywiadem ostrego lub przewlekłego zapalenia trzustki
- opisz, co ocenić: lokalizację, wielkość, grubość ściany, echy wewnętrzne, wzmocnienie za tylną ścianą, związek z trzustką i przewodem, ewentualny efekt masy oraz powikłania
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- jeżeli brak pewnego, bezpośredniego URL do wiarygodnego obrazu pasującego do jednostki, nie dodawaj imageRefs
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla `Torbiel rzekoma`

```text
Zapisz gotowy szablon atlasowy jako plik YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Trzustka
- pathology: Torbiel rzekoma
- target path: content/templates/usg/jama-brzuszna/trzustka/torbiel-rzekoma.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```
