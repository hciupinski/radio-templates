# Prompty robocze dla skilli - etap 2

Zakres tego etapu: `USG jamy brzusznej / Pęcherzyk żółciowy` dla brakujących pozycji z backlogu.

## Wzorzec promptu dla `radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- użyj aktualnych, wiarygodnych źródeł, preferując oficjalne wytyczne i konkretne publikacje dotyczące USG pęcherzyka żółciowego
- podaj tylko konkretne, rzeczywiście użyte linki do publikacji, guideline'ów albo badań; nie podawaj ogólnych stron typu katalog źródeł
- jeśli nie znajdziesz wystarczająco konkretnego źródła dla danego wariantu, nie podstawiaj źródła ogólnego; oznacz taki szablon jako wymagający osobnego passu źródłowego
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
organ: pęcherzyk żółciowy
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- dopasuj metadane do lokalnej taxonomy
- jeśli brakuje pozycji w taxonomy lub sources, uzupełnij je przed zapisaniem pliku
- do `content/sources.yaml` wpisuj tylko konkretne źródła faktycznie użyte dla danego szablonu
- zapisz plik zgodnie z konwencją ścieżek repozytorium
- ustaw status draft, version 0.1.0 i updatedAt na bieżącą datę
- uruchom npm run validate i popraw błędy, jeśli wystąpią
```

## Seria promptów do wykonania po kolei

### 1. Złóg zaklinowany w szyi

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: złóg zaklinowany w szyi pęcherzyka

Wymagania dodatkowe:
- skup się na lokalizacji złogu w szyi lub zachyłku Hartmanna oraz na braku jego ruchomości
- odróżnij wariant bez cech zapalenia od obrazu sugerującego ostre zapalenie
- uwzględnij ocenę ściany pęcherzyka, objawu sonograficznego Murphy'ego i płynu okołopęcherzykowego
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: złóg zaklinowany w szyi pęcherzyka
```

### 2. Błoto żółciowe

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: błoto żółciowe

Wymagania dodatkowe:
- opisz niskoechogeniczną lub drobnoechową treść zalegającą w świetle pęcherzyka bez cienia akustycznego
- uwzględnij zmianę położenia treści przy zmianie pozycji ciała, jeśli jest oceniana
- zaznacz, kiedy obraz przestaje być typowy i wymaga ostrożniejszej interpretacji
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: błoto żółciowe
```

### 3. Polip cholesterolowy

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip cholesterolowy

Wymagania dodatkowe:
- skup się na małej przyściennej zmianie bez cienia akustycznego i bez ruchomości
- zaznacz cechy przemawiające za łagodnym charakterem
- nie formułuj nadmiernie kategorycznych zaleceń, jeśli sama morfologia jest niejednoznaczna
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip cholesterolowy
```

### 4. Polip wymagający kontroli

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip wymagający kontroli

Wymagania dodatkowe:
- oprzyj followUp wyłącznie o konkretne wytyczne dotyczące nadzoru nad polipami pęcherzyka
- uwzględnij wielkość zmiany, liczbę polipów, szeroką podstawę i inne cechy ryzyka, jeśli są obecne
- wnioski mają być ostrożne i praktyczne, bez dopisywania zaleceń niepodpartych źródłami
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip wymagający kontroli
```

### 5. Gruczolakowatość

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: gruczolakowatość pęcherzyka

Wymagania dodatkowe:
- uwzględnij pogrubienie ściany z zatokami Rokitansky'ego-Aschoffa i artefaktami comet-tail, jeśli są obecne
- odróżnij obraz typowy od zmian wymagających dalszej charakterystyki
- zaznacz ograniczenia samego USG przy obrazie nietypowym
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: gruczolakowatość pęcherzyka
```

### 6. Przewlekłe zapalenie

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: przewlekłe zapalenie pęcherzyka żółciowego

Wymagania dodatkowe:
- opisz cechy przewlekłych zmian ściany i ewentualne współistnienie kamicy
- odróżnij ten wariant od ostrego zapalenia przez brak lub skąpość cech ostrego procesu
- unikaj nadmiernie pewnych zaleceń terapeutycznych, jeśli nie wynikają wprost ze źródła
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: przewlekłe zapalenie pęcherzyka żółciowego
```

### 7. Pęcherzyk porcelanowy

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: pęcherzyk porcelanowy

Wymagania dodatkowe:
- skup się na zwapnieniach ściany i ich konsekwencjach dla oceny światła pęcherzyka
- zaznacz ograniczenia diagnostyczne wynikające z cienia akustycznego
- nie wyolbrzymiaj ryzyka nowotworu, jeśli źródła nie pozwalają na mocniejszą tezę
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: pęcherzyk porcelanowy
```

### 8. Rak pęcherzyka

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: rak pęcherzyka żółciowego

Wymagania dodatkowe:
- potraktuj USG jako badanie wykrywające zmianę podejrzaną, a nie rozstrzygające pełne zaawansowanie
- uwzględnij ogniskowe lub rozlane pogrubienie ściany, masę wpuklającą się do światła oraz naciekanie loży lub wątroby, jeśli obecne
- we wnioskach zaznacz potrzebę dalszej diagnostyki obrazowej i korelacji kliniczno-onkologicznej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: rak pęcherzyka żółciowego
```
