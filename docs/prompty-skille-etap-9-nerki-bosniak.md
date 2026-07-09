## Etap 9: nerki - torbiele Bosniak w zakresie możliwym do oceny w USG

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Nerki / Torbiel Bosniak I`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Torbiel Bosniak I.

Wymagania:
- chodzi o zmianę jednoznacznie prostą w B-mode
- opisz, co ocenić: lokalizację, wielkość, cienką ścianę, bezechowość, brak przegród i guzków, wzmocnienie za tylną ścianą
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential
- sourceRefs mają zawierać wyłącznie konkretne wykorzystane publikacje z linkami
- jeśli znajdziesz pewny, bezpośredni obraz pasujący do jednostki, można dodać imageRefs
```

#### Prompt: `USG jamy brzusznej / Nerki / Torbiel Bosniak II`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Torbiel Bosniak II.

Wymagania:
- podkreśl, że przezbrzuszne USG pozwala jedynie zasugerować minimalnie złożony charakter zmiany
- opisz, co ocenić: cienkie przegrody, drobne zwapnienia, brak guzków przyściennych, brak litej składowej
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji
- bez imageRefs, jeśli brak pewnego obrazu z bezpośrednim URL
```

#### Prompt: `USG jamy brzusznej / Nerki / Torbiel Bosniak IIF`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Torbiel Bosniak IIF.

Wymagania:
- opisz zmianę torbielowatą bardziej złożoną, potencjalnie wymagającą obserwacji
- podkreśl ograniczenia pełnej klasyfikacji Bosniak w samym USG
- opisz, co ocenić: liczbę i grubość przegród, nieregularność ściany, zwapnienia, ewentualny guzek, wymiar, porównanie z wcześniejszymi badaniami
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji
```

#### Prompt: `USG jamy brzusznej / Nerki / Torbiel Bosniak III-IV`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Torbiel Bosniak III-IV.

Wymagania:
- chodzi o złożoną torbielowatą zmianę nerki podejrzaną onkologicznie
- opisz, co ocenić: grubość i nieregularność ściany, przegrody, guzki przyścienne, lita składowa, unaczynienie jeśli widoczne, wpływ na zarys nerki
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji
- imageRefs dodaj tylko przy pewnym bezpośrednim URL i rzetelnym źródle
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla wariantów Bosniak

```text
Zapisz gotowe szablony atlasowe jako pliki YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Nerki
- pathology: Torbiel Bosniak I / II / IIF / III-IV
- target paths:
  - content/templates/usg/jama-brzuszna/nerki/torbiel-bosniak-i.yaml
  - content/templates/usg/jama-brzuszna/nerki/torbiel-bosniak-ii.yaml
  - content/templates/usg/jama-brzuszna/nerki/torbiel-bosniak-iif.yaml
  - content/templates/usg/jama-brzuszna/nerki/torbiel-bosniak-iii-iv.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- nie udawaj pełnej klasyfikacji Bosniak w samym USG, jeśli źródła tego nie wspierają
```
