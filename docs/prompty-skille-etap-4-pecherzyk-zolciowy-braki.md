# Prompty robocze dla skilli - etap 4

Zakres tego etapu: `USG jamy brzusznej / Pęcherzyk żółciowy` dla brakujących wariantów z backlogu.

## Wzorzec promptu dla `radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- użyj aktualnych, wiarygodnych źródeł i podaj tylko konkretne linki faktycznie użyte do tego wariantu
- jeśli followUp jest potrzebny, oprzyj go wyłącznie o konkretne wytyczne lub publikacje
- napisz wynik w formalnym języku polskich opisów radiologicznych
- zachowaj placeholders w formacie {{...}}
- jeśli nie znajdziesz stabilnego i adekwatnego obrazu edukacyjnego, pomiń `imageRefs` zamiast zgadywać
```

## Wzorzec promptu dla `radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: <UZUPELNIJ>

Wymagania dodatkowe:
- dopasuj metadane do lokalnej taxonomy
- jeśli brakuje pozycji w taxonomy lub sources, uzupełnij je przed zapisaniem pliku
- do `content/sources.yaml` wpisuj tylko konkretne źródła faktycznie użyte dla danego szablonu
- ustaw status draft, version 0.1.0 i updatedAt na bieżącą datę
- uruchom npm run validate i popraw błędy, jeśli wystąpią
```

## Seria promptów do wykonania po kolei

### 1. Polip wymagający kontroli

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip wymagający kontroli

Wymagania dodatkowe:
- followUp oprzyj o aktualne wspólne wytyczne dla polipów pęcherzyka
- uwzględnij wielkość, liczbę, szeroką podstawę oraz czynniki ryzyka złośliwości
- odróżnij prawdziwy polip od pseudo-polipa z artefaktem comet-tail
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: polip wymagający kontroli
```

### 2. Przewlekłe zapalenie

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: przewlekłe zapalenie pęcherzyka żółciowego

Wymagania dodatkowe:
- opisz przewlekłe pogrubienie ściany, obkurczenie pęcherzyka i częste współistnienie kamicy
- odróżnij obraz od ostrego zapalenia przez brak jednoznacznych cech aktywnego procesu
- podkreśl nieswoistość samego pogrubienia ściany
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: przewlekłe zapalenie pęcherzyka żółciowego
```

### 3. Pęcherzyk porcelanowy

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: pęcherzyk porcelanowy

Wymagania dodatkowe:
- skup się na zwapnieniach ściany, cieniu akustycznym i ograniczeniach oceny światła
- ostrożnie opisz związek z ryzykiem nowotworu, bez jego wyolbrzymiania
- zaznacz, kiedy potrzebna jest dalsza charakterystyka przekrojowa
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: pęcherzyk porcelanowy
```

### 4. Rak pęcherzyka

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: rak pęcherzyka żółciowego

Wymagania dodatkowe:
- potraktuj USG jako badanie wykrywające zmianę podejrzaną, a nie rozstrzygające pełne zaawansowanie
- uwzględnij nieregularne pogrubienie ściany, masę lityczną i ewentualne szerzenie do wątroby
- followUp ogranicz do pilnej dalszej charakterystyki i kwalifikacji wielodyscyplinarnej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: pęcherzyk żółciowy
jednostka chorobowa: rak pęcherzyka żółciowego
```
