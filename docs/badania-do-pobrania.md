# Lista badań do pobrania

Podstawa: `docs/requirements.md` oraz aktualny stan `content/templates/**`.

## Jakich skilli używać

Dla każdej pozycji rekomendowany pipeline jest stały:

1. `radiology-template-localizer` - pobranie i zlokalizowanie merytoryki do polskiego szablonu opisu.
2. `radiology-atlas-yaml-writer` - zapisanie wyniku jako pliku YAML w strukturze repozytorium.

## Już istnieje w repo

- `USG jamy brzusznej / Wątroba / Obraz prawidłowy`
- `USG jamy brzusznej / Wątroba / Stłuszczenie`
- `USG jamy brzusznej / Wątroba / Marskość`
- `USG jamy brzusznej / Wątroba / Nadciśnienie wrotne`
- `USG jamy brzusznej / Wątroba / Torbiel prosta`
- `USG jamy brzusznej / Wątroba / Torbiel złożona`
- `USG jamy brzusznej / Wątroba / Naczyniak`
- `USG jamy brzusznej / Wątroba / FNH`
- `USG jamy brzusznej / Wątroba / Gruczolak`
- `USG jamy brzusznej / Wątroba / Ropień`
- `USG jamy brzusznej / Wątroba / Przerzuty`
- `USG jamy brzusznej / Wątroba / HCC`
- `USG jamy brzusznej / Wątroba / Poszerzenie dróg żółciowych`
- `USG jamy brzusznej / Wątroba / Pneumobilia`
- `USG jamy brzusznej / Wątroba / Zmiany po cholecystektomii`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Obraz prawidłowy`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Kamica`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Zapalenie`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Złóg zaklinowany w szyi`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Błoto żółciowe`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Polip cholesterolowy`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Gruczolakowatość`
- `USG jamy brzusznej / Nerki / Obraz prawidłowy`
- `USG jamy brzusznej / Nerki / Wodonercze`
- `USG szyi / Tarczyca / Obraz prawidłowy`
- `USG szyi / Tarczyca / Hashimoto`
- `USG szyi / Tarczyca / Guzek TI-RADS`
- `USG szyi / Tarczyca / Guzek łagodny`
- `USG szyi / Węzły chłonne / Odczynowe`
- `USG szyi / Węzły chłonne / Podejrzane`
- `USG tkanek miękkich / Tkanka podskórna / Tłuszczak`
- `USG tkanek miękkich / Tkanka podskórna / Ropień`

## Priorytet 1: brakujące pozycje z głównego zakresu atlasu

### Pęcherzyk żółciowy

- `USG jamy brzusznej / Pęcherzyk żółciowy / Polip wymagający kontroli`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Przewlekłe zapalenie`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Pęcherzyk porcelanowy`
- `USG jamy brzusznej / Pęcherzyk żółciowy / Rak pęcherzyka`

### Trzustka

- `USG jamy brzusznej / Trzustka / Obraz prawidłowy`
- `USG jamy brzusznej / Trzustka / Ostre zapalenie`
- `USG jamy brzusznej / Trzustka / Przewlekłe zapalenie`
- `USG jamy brzusznej / Trzustka / IPMN`
- `USG jamy brzusznej / Trzustka / Torbiel`
- `USG jamy brzusznej / Trzustka / Torbiel rzekoma`
- `USG jamy brzusznej / Trzustka / Guz neuroendokrynny`
- `USG jamy brzusznej / Trzustka / Gruczolakorak`

### Nerki

- `USG jamy brzusznej / Nerki / Torbiel Bosniak I`
- `USG jamy brzusznej / Nerki / Torbiel Bosniak II`
- `USG jamy brzusznej / Nerki / Torbiel Bosniak IIF`
- `USG jamy brzusznej / Nerki / Torbiel Bosniak III-IV`
- `USG jamy brzusznej / Nerki / Angiomyolipoma`
- `USG jamy brzusznej / Nerki / Kamica`
- `USG jamy brzusznej / Nerki / Odmiedniczkowe zapalenie`
- `USG jamy brzusznej / Nerki / Guz nerki`

### Śledziona

- `USG jamy brzusznej / Śledziona / Obraz prawidłowy`

### Pęcherz moczowy

- `USG jamy brzusznej / Pęcherz moczowy / Obraz prawidłowy`

### Tarczyca

- `USG szyi / Tarczyca / Graves-Basedow`
- `USG szyi / Tarczyca / Torbiel`
- `USG szyi / Tarczyca / Zwapnienia`

### Węzły chłonne

- `USG szyi / Węzły chłonne / Obraz prawidłowy`
- `USG szyi / Węzły chłonne / Chłoniak`
- `USG szyi / Węzły chłonne / Przerzutowe`
- `USG szyi / Węzły chłonne / Gruźlicze`
- `USG szyi / Węzły chłonne / Martwicze`

### Tkanki miękkie

- `USG tkanek miękkich / Tkanka podskórna / Torbiel`
- `USG tkanek miękkich / Tkanka podskórna / Kaszak`
- `USG tkanek miękkich / Tkanka podskórna / Torbiel naskórkowa`
- `USG tkanek miękkich / Tkanka podskórna / Krwiak`
- `USG tkanek miękkich / Tkanka podskórna / Ciało obce`
- `USG tkanek miękkich / Tkanka podskórna / Ganglion`
- `USG tkanek miękkich / Tkanka podskórna / Zmiana podejrzana o mięsak`

## Priorytet 2: rozbić lub doprecyzować istniejące szablony

- `USG jamy brzusznej / Wątroba / Stłuszczenie`: rozbić na `łagodne`, `umiarkowane`, `znaczne`, jeśli chcesz zachować zgodność z opisem z `requirements.md`.
- `USG jamy brzusznej / Pęcherzyk żółciowy / Kamica`: doprecyzować, czy obecny plik ma pokrywać tylko `złogi ruchome`, czy wymaga osobnego wariantu dla `złogu zaklinowanego w szyi`.
- `USG jamy brzusznej / Pęcherzyk żółciowy / Zapalenie`: rozdzielić na `ostre` i `przewlekłe`, jeśli obecny plik jest zbyt ogólny.
- `USG szyi / Tarczyca / Guzek TI-RADS`: uzupełnić o sekcję `TI-RADS krok po kroku` oraz źródłowo uzasadnione kryteria, kiedy zalecić biopsję.
- `USG szyi / Węzły chłonne / Podejrzane`: rozważyć zastąpienie ogólnego wariantu osobnymi szablonami `przerzutowe`, `chłoniak`, `gruźlicze`, `martwicze`.

## Priorytet 3: dodatkowe obszary wymienione na końcu dokumentu

Te pozycje nie są jeszcze rozpisane na poziomie jednostek chorobowych w `requirements.md`, ale dokument wskazuje je jako naturalny kolejny etap rozbudowy atlasu:

- `USG moszny`
- `USG piersi`
- `USG ślinianek`
- `USG Doppler żył`
- `USG Doppler tętnic`

## Proponowana kolejność pracy

1. Domknąć `USG jamy brzusznej`, bo dokument najpełniej opisuje ten zakres.
2. Uzupełnić `USG szyi` o brakujące warianty tarczycy i węzłów chłonnych.
3. Rozszerzyć `USG tkanek miękkich`.
4. Dopiero potem wejść w nowe obszary z Priorytetu 3.
