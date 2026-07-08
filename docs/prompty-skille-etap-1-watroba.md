# Prompty robocze dla skilli - etap 1

Zakres tego etapu: `USG jamy brzusznej / Wątroba` dla brakujących pozycji z backlogu.

## Wzorzec promptu dla `radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- użyj aktualnych, wiarygodnych źródeł, preferując oficjalne wytyczne i biblioteki structured reporting
- jeśli nie ma oficjalnego szablonu dla tej jednostki, przygotuj praktyczny draft oparty o guideline completeness + źródła edukacyjne
- napisz wynik w formalnym języku polskich opisów radiologicznych
- zachowaj placeholders w formacie {{...}}
- zwróć wynik gotowy do mapowania na pola:
  title
  modality
  examTypes
  bodySystems
  bodyParts
  organs
  pathology
  tags
  sourceRefs
  sections.assessmentChecklist
  sections.reportTemplate
  sections.impressionTemplate
  optional sections.clinicalNotes
  optional sections.differential
  optional sections.followUp
```

## Wzorzec promptu dla `radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium na podstawie przygotowanego atlas-ready template.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- dopasuj metadane do lokalnej taxonomy
- jeśli brakuje pozycji w taxonomy lub sources, uzupełnij je przed zapisaniem pliku
- zapisz plik zgodnie z konwencją ścieżek repozytorium
- ustaw status draft, version 0.1.0 i updatedAt na bieżącą datę
- uruchom npm run validate i popraw błędy, jeśli wystąpią
```

## Seria promptów do wykonania po kolei

### 1. Nadciśnienie wrotne

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: nadciśnienie wrotne

Wymagania dodatkowe:
- skup się na cechach sonograficznych nadciśnienia wrotnego i ich opisie w raporcie
- uwzględnij żyłę wrotną, kierunek/prędkość przepływu, śledzionę, krążenie oboczne i wodobrzusze
- zaznacz ograniczenia USG wobec hemodynamicznej oceny zaawansowania
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: nadciśnienie wrotne
```

### 2. Torbiel prosta

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: torbiel prosta

Wymagania dodatkowe:
- skup się na klasycznych cechach prostej torbieli wątroby w USG
- uwzględnij ścianę, zawartość, wzmocnienie za tylną ścianą i brak cech złożoności
- dodaj krótką uwagę, kiedy sam obraz USG nie wystarcza do spokojnego rozpoznania
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: torbiel prosta
```

### 3. Torbiel złożona

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: torbiel złożona

Wymagania dodatkowe:
- opisz cechy złożoności: przegrody, echy wewnętrzne, pogrubienie ściany, nieregularność, komponent lity
- wyraźnie zaznacz, że rozpoznanie etiologiczne często wymaga dalszej diagnostyki
- w followUp podaj ogólne zalecenie dalszej charakterystyki zależnie od obrazu klinicznego
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: torbiel złożona
```

### 4. Naczyniak

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: naczyniak

Wymagania dodatkowe:
- skup się na typowym naczyniaku wątroby w B-mode
- odróżnij opis obrazu typowego od sytuacji atypowej wymagającej dalszej charakterystyki
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: naczyniak
```

### 5. FNH

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: FNH

Wymagania dodatkowe:
- potraktuj USG jako badanie wykrywające zmianę, a nie rozstrzygające rozpoznanie
- podkreśl potrzebę dalszej charakterystyki obrazowej przy braku cech jednoznacznych
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: FNH
```

### 6. Gruczolak

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: gruczolak

Wymagania dodatkowe:
- podkreśl ograniczoną swoistość samego USG
- uwzględnij ryzyko konieczności dalszej diagnostyki i korelacji klinicznej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: gruczolak
```

### 7. Ropień

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: ropień

Wymagania dodatkowe:
- uwzględnij nieregularność, echy wewnętrzne, ewentualny gaz i obwodowe unaczynienie
- w wnioskach zaznacz podejrzenie zmiany zapalnej i potrzebę pilnej korelacji klinicznej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: ropień
```

### 8. Przerzuty

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: przerzuty

Wymagania dodatkowe:
- uwzględnij liczbę, rozmieszczenie, echogeniczność i największy wymiar zmian
- zaznacz ograniczenia charakterystyki oraz potrzebę korelacji onkologicznej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: przerzuty
```

### 9. HCC

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: HCC

Wymagania dodatkowe:
- potraktuj USG jako badanie wykrywające zmianę podejrzaną o HCC, szczególnie w marskości
- uwzględnij wielkość, segment, echostrukturę, granice i ewentualny naciek naczyniowy
- nie formułuj nadmiernie kategorycznych wniosków, jeśli obraz nie jest swoisty
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: HCC
```

### 10. Poszerzenie dróg żółciowych

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: poszerzenie dróg żółciowych

Wymagania dodatkowe:
- skup się na ocenie dróg żółciowych wewnątrz- i zewnątrzwątrobowych w kontekście obrazu wątroby
- zaznacz potrzebę poszukiwania poziomu przeszkody i dalszej diagnostyki zależnie od obrazu
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: poszerzenie dróg żółciowych
```

### 11. Pneumobilia

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: pneumobilia

Wymagania dodatkowe:
- opisz typowy obraz hiperechogenicznych refleksów z artefaktami w drogach żółciowych
- odróżnij to od gazu w żyle wrotnej na poziomie opisu i uwag praktycznych
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: pneumobilia
```

### 12. Zmiany po cholecystektomii

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: zmiany po cholecystektomii

Wymagania dodatkowe:
- potraktuj to jako wariant stanu po zabiegu w zakresie układu wątrobowo-żółciowego
- uwzględnij lożę po pęcherzyku, drogi żółciowe i ewentualne płynowe pozostałości pooperacyjne
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: wątroba
jednostka chorobowa: zmiany po cholecystektomii
```
