# Etap 24 — częste zmiany chorobowe w TK u dorosłych

Dla każdego bloku użyj obu umiejętności kolejno. Zachowaj [wspólne wymagania z etapu 23](prompty-skille-etap-23-tk-patologie.md#wymagania-wspólne).

## Klatka piersiowa

- `radiology-template-localizer`. Opracuj szablony dla wymienionych jednostek: Guz płuca podejrzany o nowotwór pierwotny, Obraz obrzęku płuc, Obraz zapalenia oskrzelików, Ropień płuca, Rozedma płuc, Rozstrzenie oskrzeli. Uwzględnij rozkład zmian i ich nasilenie, odróżnij obraz rozedmy i chorób dróg oddechowych od włóknienia. Przy podejrzeniu guza opisz stosunek do sąsiednich struktur oraz zasięg w granicach badania.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w ścieżkach `content/templates/ct/klatka-piersiowa/pluca/`. Użyj typów badań CT klatki piersiowej z kontrastem, CT klatki piersiowej, HRCT klatki piersiowej. Zaktualizuj katalog i backlog oraz sprawdź `npm run validate`.

## Jama brzuszna

- `radiology-template-localizer`. Opracuj szablony dla wymienionych jednostek: Aktywna choroba Leśniowskiego-Crohna jelita cienkiego, Kamica przewodu żółciowego wspólnego, Ostre zapalenie pęcherzyka żółciowego, Podejrzenie gruczolakoraka przewodowego trzustki, Podejrzenie raka wątrobowokomórkowego, Zakrzepica żyły wrotnej. Dobierz protokół do narządu. W zmianach trzustki opisz kontakt z poszczególnymi naczyniami. Rozróżnij tkankę nowotworową w żyle wrotnej od zakrzepu. Stosuj LI-RADS CT/MRI v2018 wyłącznie w odpowiedniej populacji.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w ścieżkach `content/templates/ct/jama-brzuszna/jelito-cienkie/`, `content/templates/ct/jama-brzuszna/drogi-zolciowe/`, `content/templates/ct/jama-brzuszna/pecherzyk-zolciowy/`, `content/templates/ct/jama-brzuszna/trzustka/`, `content/templates/ct/jama-brzuszna/watroba/`, `content/templates/ct/jama-brzuszna/zyla-wrotna/`. Użyj typów badań Enterografia CT, CT jamy brzusznej i miednicy, CT w protokole trzustkowym, Wielofazowa CT wątroby. Zaktualizuj katalog i backlog oraz sprawdź `npm run validate`.

## Układ moczowy i miednica

- `radiology-template-localizer`. Opracuj szablony dla wymienionych jednostek: Kamica moczowodu z zastojem, Lita zmiana nerki podejrzana o nowotwór, Ostre odmiedniczkowe zapalenie nerek, Torbielowata zmiana nerki w klasyfikacji Bosniak 2019, Zmiana pęcherza podejrzana o nowotwór, Zmiana przydatków podejrzana o nowotwór. W kamicy ustal poziom przeszkody i cechy zastoju. W zmianach nerek opisz wzmocnienie oraz stosuj Bosniak 2019 przy odpowiednich danych. W urografii i ocenie zasięgu zmian przydatków uwzględnij ograniczenia protokołu.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w ścieżkach `content/templates/ct/jama-brzuszna/moczowody/`, `content/templates/ct/jama-brzuszna/nerki/`, `content/templates/ct/miednica/pecherz-moczowy/`, `content/templates/ct/miednica/przydatki/`. Użyj typów badań CT jamy brzusznej i miednicy bez kontrastu, CT nerek w protokole guzowym, CT jamy brzusznej i miednicy, Urografia CT, CT klatki piersiowej, jamy brzusznej i miednicy. Zaktualizuj katalog i backlog oraz sprawdź `npm run validate`.
