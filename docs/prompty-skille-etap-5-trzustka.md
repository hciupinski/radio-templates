# Prompty dla skilli - etap 5

Zakres tego etapu: `USG jamy brzusznej / Trzustka` dla pierwszych trzech pozycji z backlogu.

## 1. Obraz prawidłowy

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: trzustka

Wymagania dodatkowe:
- opisz prawidłową trzustkę w badaniu przezbrzusznym z podziałem na głowę, trzon i ogon, jeśli są widoczne
- uwzględnij typowe ograniczenia widoczności zależne od gazów jelitowych
- zaznacz, że przewód Wirsunga powinien być nieposzerzony
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: trzustka
```

## 2. Ostre zapalenie

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: trzustka
jednostka chorobowa: ostre zapalenie trzustki

Wymagania dodatkowe:
- skup się na obrzęku i powiększeniu gruczołu, obniżeniu echogeniczności oraz płynie okołotrzustkowym
- podkreśl ograniczenia czułości USG i rolę badania w poszukiwaniu przyczyny żółciowej
- nie dopisuj zaleceń terapeutycznych poza korelacją kliniczno-laboratoryjną i dalszą diagnostyką obrazową, jeśli obraz jest niejednoznaczny lub powikłany
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: trzustka
jednostka chorobowa: ostre zapalenie trzustki
```

## 3. Przewlekłe zapalenie

`radiology-template-localizer`

```text
Przygotuj atlas-ready template w trybie Atlas/YAML.

rodzaj badania: USG jamy brzusznej
organ: trzustka
jednostka chorobowa: przewlekłe zapalenie trzustki

Wymagania dodatkowe:
- uwzględnij zanik lub nieregularność zarysu, wzrost echogeniczności, zwapnienia oraz poszerzenie lub nieregularność przewodu Wirsunga
- odróżnij wariant przewlekły od ostrego obrzękowego zapalenia i od zmiany nowotworowej z wtórnym poszerzeniem przewodu
- followUp ogranicz do korelacji z objawami, niewydolnością zewnątrz- i wewnątrzwydzielniczą oraz ewentualnego pogłębienia diagnostyki przekrojowej
```

`radiology-atlas-yaml-writer`

```text
Utwórz i zapisz plik YAML w repozytorium.

rodzaj badania: USG jamy brzusznej
organ: trzustka
jednostka chorobowa: przewlekłe zapalenie trzustki
```
