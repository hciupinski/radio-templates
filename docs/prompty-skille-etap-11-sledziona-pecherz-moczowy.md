## Etap 11: śledziona i pęcherz moczowy - obrazy prawidłowe

### 1. `radiology-template-localizer`

#### Prompt: `USG jamy brzusznej / Śledziona / Obraz prawidłowy`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Śledziona / Obraz prawidłowy.

Wymagania:
- opisz zakres prawidłowej oceny śledziony w USG przezbrzusznym
- uwzględnij: pełną widoczność, długość i grubość, zarys, echostrukturę, zmiany ogniskowe, płyn okoł śledziony i ewentualną śledzionę dodatkową
- zaznacz, że interpretacja wymiarów wymaga uwzględnienia cech pacjenta i techniki pomiaru
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate i clinicalNotes
- sourceRefs mają prowadzić wyłącznie do konkretnych wykorzystanych publikacji lub wytycznych
- dodaj imageRef tylko dla pewnego bezpośredniego URL do obrazu oraz osobnego URL strony źródłowej
```

#### Prompt: `USG jamy brzusznej / Pęcherz moczowy / Obraz prawidłowy`

```text
Przygotuj polski szablon opisu dla: USG jamy brzusznej / Pęcherz moczowy / Obraz prawidłowy.

Wymagania:
- dotyczy przezbrzusznej oceny pęcherza moczowego u osoby dorosłej
- uwzględnij: stopień wypełnienia, objętość gdy wskazana, zarys i ścianę zależną od wypełnienia, zawartość światła, trójkąt, ujścia moczowodów oraz zaleganie po mikcji gdy oceniane
- nie stosuj bezkrytycznie progu grubości ściany bez podania stopnia wypełnienia
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate i clinicalNotes
- sourceRefs mają prowadzić wyłącznie do konkretnych wykorzystanych publikacji lub wytycznych
- nie dodawaj imageRef, jeśli nie ma pewnego bezpośredniego URL do właściwego obrazu
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla obu szablonów

```text
Zapisz gotowe szablony atlasowe jako pliki YAML dla:
- modality: USG
- examTypes: [USG jamy brzusznej]
- pathology: [Obraz prawidłowy]
- target paths:
  - content/templates/usg/jama-brzuszna/sledziona/prawidlowa.yaml
  - content/templates/usg/jama-brzuszna/pecherz-moczowy/prawidlowy.yaml

Wymagania repo:
- w razie potrzeby dodaj do taxonomy.yaml narządy Śledziona i Pęcherz moczowy
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-10"
- sourceRefs wyłącznie do rzeczywiście wykorzystanych, konkretnych źródeł
- imageRefs tylko przy bezpośrednim URL obrazu, osobnej stronie źródłowej i opisanej licencji lub trybie link-only
- uruchom npm run validate po zapisie
```
