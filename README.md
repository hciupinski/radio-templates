# Atlas opisów radiologicznych

Statyczna aplikacja do utrzymywania, wyszukiwania i eksportowania szablonów opisów radiologicznych. MVP obejmuje szablony USG, ale model danych obsługuje także CT, MR, RTG, MMG, DXA i inne modalności.

## Komendy

```bash
npm install
npm run validate
npm run generate:content
npm run dev
npm run build
npm run export:pdf
```

`npm run generate:content` waliduje YAML i generuje `public/content-manifest.json` oraz wersjonowany bundle danych dla aplikacji i PWA.

`npm run export:pdf` buduje aplikację i zapisuje `dist/szablony-radiologiczne.pdf`.

## Hosting i PWA

- GitHub Pages: workflow w `.github/workflows/deploy-pages.yml` publikuje `dist/` po każdym pushu do `main`.
- `VITE_BASE_PATH` kontroluje ścieżkę bazową dla GitHub Project Pages, domyślnie `/`.
- PWA używa service workera i cache offline dla shella aplikacji oraz wygenerowanego bundle'a treści.

## Treści

Szablony są w `content/templates/**/*.yaml`. Wspólne słowniki są w `content/taxonomy.yaml`, a katalog źródeł w `content/sources.yaml`.

Każdy szablon ma metadane wyszukiwania i sekcje:

- `assessmentChecklist` - co ocenić w badaniu,
- `reportTemplate` - właściwy opis,
- `impressionTemplate` - wnioski,
- opcjonalnie `clinicalNotes`, `differential`, `followUp`.

Placeholdery danych pacjenta lub pomiarów zapisuj jawnie w postaci `{{nazwa_pola}}`, np. `{{wymiary_mm}}`.

## Statusy

- `draft` - materiał roboczy wymagający recenzji.
- `reviewed` - szablon po recenzji merytorycznej.
- `deprecated` - szablon wycofany, pozostawiony dla historii.

Projekt jest narzędziem edukacyjno-organizacyjnym i nie zastępuje lokalnych standardów pracowni ani oceny klinicznej.
