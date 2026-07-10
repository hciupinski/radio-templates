## Etap 10: nerki - angiomyolipoma, odmiedniczkowe zapalenie, guz nerki

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Nerki / Angiomyolipoma`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Angiomyolipoma.

Wymagania:
- opisz typowy incydentalny obraz hiperechogenicznej zmiany korowej sugerującej AML
- zaznacz, że samo USG nie zawsze pozwala odróżnić atypowy AML od innych guzów litych
- uwzględnij: lokalizację, wielkość, echogeniczność, zarys, ewentualne unaczynienie, liczbę zmian i obustronność
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji z linkami
- nie dodawaj imageRefs bez pewnego, bezpośredniego URL
```

#### Prompt: `USG jamy brzusznej / Nerki / Odmiedniczkowe zapalenie`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Odmiedniczkowe zapalenie.

Wymagania:
- chodzi o obraz ostrego odmiedniczkowego zapalenia nerki w przezbrzusznym USG
- wyraźnie zaznacz niską czułość USG i rolę badania w wykrywaniu powikłań lub przeszkody
- uwzględnij: wielkość nerki, echogeniczność kory, zatarcie różnicowania korowo-rdzeniowego, ogniska zapalne, płyn okołonerkowy, ropień, zastój
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji z linkami
- imageRefs tylko przy pewnym, bezpośrednim URL
```

#### Prompt: `USG jamy brzusznej / Nerki / Guz nerki`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Nerki / Guz nerki.

Wymagania:
- chodzi o nieswoistą litą zmianę nerki podejrzaną onkologicznie w USG
- opisz: lokalizację, wielkość, zarys, echogeniczność, jednorodność, torbielowatą degenerację, zwapnienia, Doppler, wpływ na zarys nerki i UKM
- podkreśl, że USG nie służy do pełnej charakterystyki histologicznej i wymaga dalszej oceny przekrojowej
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential, followUp
- sourceRefs tylko do konkretnych wykorzystanych publikacji z linkami
- bez imageRefs, jeśli brak pewnego bezpośredniego URL
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla trzech szablonów

```text
Zapisz gotowe szablony atlasowe jako pliki YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- organ: Nerki
- pathology:
  - Angiomyolipoma
  - Odmiedniczkowe zapalenie
  - Guz nerki
- target paths:
  - content/templates/usg/jama-brzuszna/nerki/angiomyolipoma.yaml
  - content/templates/usg/jama-brzuszna/nerki/odmiedniczkowe-zapalenie.yaml
  - content/templates/usg/jama-brzuszna/nerki/guz-nerki.yaml

Wymagania repo:
- zgodność ze schematem projektu
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-09"
- sourceRefs tylko do konkretnych źródeł rzeczywiście użytych przy treści
- nie udawaj większej swoistości USG niż faktycznie wynika ze źródeł
```
