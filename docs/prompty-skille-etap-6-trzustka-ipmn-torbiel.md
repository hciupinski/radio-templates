## Etap 6: trzustka - IPMN i torbiel

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Trzustka / IPMN`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Trzustka / IPMN.

Wymagania:
- tryb pracy: ostrożny klinicznie, bez wymyślania danych
- uwzględnij ograniczenia USG przezbrzusznego w rozpoznawaniu IPMN
- opisz, co ocenić: liczba i lokalizacja zmian torbielowatych, komunikacja z przewodem trzustkowym, szerokość przewodu Wirsunga, guzki przyścienne, komponenta lita, grubość ściany, cechy wysokiego ryzyka
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- użyj wyłącznie konkretnych źródeł z linkami
- nie podawaj ogólnych źródeł typu strona główna czasopisma
- jeżeli nie ma pewnego, bezpośredniego linku do wiarygodnego obrazu pasującego do jednostki, nie dodawaj imageRefs
```

#### Prompt: `USG jamy brzusznej / Trzustka / Torbiel`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Trzustka / Torbiel.

Wymagania:
- chodzi o nieswoistą zmianę torbielowatą trzustki wykrywaną w USG przezbrzusznym
- podkreśl, że samo USG zwykle nie pozwala na pełne różnicowanie typu zmiany
- opisz, co ocenić: wielkość, lokalizacja, ściana, przegrody, echy wewnętrzne, guzki przyścienne, związek z przewodem trzustkowym, szerokość Wirsunga, cechy alarmowe
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs mają zawierać tylko konkretne wykorzystane publikacje lub guideline’y z linkami
- nie dodawaj imageRefs bez pewnego, bezpośredniego URL do wiarygodnego obrazu
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla `IPMN`

```text
Zapisz gotowy szablon atlasowy jako plik YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Trzustka
- pathology: IPMN
- target path: content/templates/usg/jama-brzuszna/trzustka/ipmn.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```

#### Prompt: zapis YAML dla `Torbiel`

```text
Zapisz gotowy szablon atlasowy jako plik YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Trzustka
- pathology: Torbiel
- target path: content/templates/usg/jama-brzuszna/trzustka/torbiel.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```
