# Prompty robocze dla skilli - etap 3

Zakres tego etapu: `USG szyi / Tarczyca` dla brakujących pozycji z backlogu.

## Wzorzec promptu dla `radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- użyj aktualnych, wiarygodnych źródeł, preferując konkretne guideline'y i publikacje dotyczące USG tarczycy
- podaj tylko konkretne, rzeczywiście użyte linki do publikacji, guideline'ów albo badań; nie podawaj ogólnych stron typu katalog źródeł
- jeśli dla danej jednostki nie ma wystarczająco konkretnego źródła do zaleceń, nie dopisuj zaleceń z pamięci
- jeżeli używasz klasyfikacji TI-RADS, wpisz jej nazwę dokładnie i oddziel ją od lokalnego opisu po polsku
- jeśli znajdziesz stabilne, bezpośrednie linki do obrazów edukacyjnych pasujących do jednostki, zwróć także `imageRefs`
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
  optional imageRefs
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

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- dopasuj metadane do lokalnej taxonomy
- jeśli brakuje pozycji w taxonomy lub sources, uzupełnij je przed zapisaniem pliku
- do `content/sources.yaml` wpisuj tylko konkretne źródła faktycznie użyte dla danego szablonu
- jeśli dodajesz obraz, podawaj tylko bezpośredni `https` URL do pliku oraz osobny `sourceUrl`
- zapisz plik zgodnie z konwencją ścieżek repozytorium
- ustaw status draft, version 0.1.0 i updatedAt na bieżącą datę
- uruchom npm run validate i popraw błędy, jeśli wystąpią
```

## Seria promptów do wykonania po kolei

### 1. Guzek łagodny

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: guzek łagodny tarczycy

Wymagania dodatkowe:
- zawęź wariant do łagodnie wyglądających guzków TR2-TR3, jeśli to potrzebne do uzyskania praktycznego szablonu
- uwzględnij cechy takie jak budowa spongiformna, torbielowata lub artefakt comet-tail
- followUp oprzyj wyłącznie o konkretne progi ACR TI-RADS
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: guzek łagodny tarczycy
```

### 2. Graves-Basedow

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: Graves-Basedow

Wymagania dodatkowe:
- skup się na rozlanym powiększeniu, obniżonej lub prawidłowej echogeniczności oraz wzmożonym unaczynieniu
- wyraźnie odróżnij ten wariant od Hashimoto z dominującym włóknieniem i pseudoguzkami
- nie dopisuj zaleceń terapeutycznych poza tym, co wynika wprost ze źródła
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: Graves-Basedow
```

### 3. Torbiel

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: torbiel tarczycy

Wymagania dodatkowe:
- opisz wariant prosty lub koloidowy bez cech podejrzanych
- uwzględnij tylne wzmocnienie akustyczne, echa wewnętrzne i ewentualny artefakt comet-tail
- zaznacz, kiedy przestaje to być typowa torbiel i wymaga klasyfikacji jak zmiana złożona lub guzek
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: torbiel tarczycy
```

### 4. Zwapnienia

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: zwapnienia w guzku tarczycy

Wymagania dodatkowe:
- nie traktuj zwapnień jako samodzielnej jednostki, tylko jako wariant opisu guzka wymagający klasyfikacji TI-RADS
- odróżnij duże zwapnienia z cieniem od drobnych punktowych echogenicznych ognisk
- followUp i wnioski powiąż z całościową kategorią TI-RADS, a nie z samą obecnością zwapnień
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG szyi
organ: tarczyca
jednostka chorobowa: zwapnienia w guzku tarczycy
```
