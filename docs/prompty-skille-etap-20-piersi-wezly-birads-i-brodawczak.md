## Etap 20: USG piersi - węzeł wewnątrzsutkowy, brodawczak i kategorie BI-RADS

### 1. `radiology-template-localizer`

```text
Przygotuj pięć polskich, atlas-ready szablonów USG piersi dla: węzła chłonnego wewnątrzsutkowego o typowej morfologii, brodawczaka wewnątrzprzewodowego, zmiany BI-RADS 3, zmiany BI-RADS 4 i zmiany BI-RADS 5. Dla każdej pozycji uwzględnij pełną morfologię USG, Doppler, porównanie z poprzednimi badaniami oraz zwięzły, źródłowo uzasadniony wniosek. Wykorzystaj wyłącznie konkretne źródła: ACR BI-RADS Breast Ultrasound Reporting (https://www.acr.org/-/media/ACR/Files/RADS/BI-RADS/US-Reporting.pdf), "Intramammary lymph nodes: normal and abnormal multimodality imaging features" (https://pmc.ncbi.nlm.nih.gov/articles/PMC6849673/) i "Spectrum of imaging findings of papillary breast disease" (https://pubmed.ncbi.nlm.nih.gov/33879660/). Podaj tylko użyte źródła. Wyszukaj obrazy, ale nie generuj imageRef bez bezpośredniego URL HTTPS do pliku, sourceUrl i możliwego do określenia statusu licencji.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz pięć zwalidowanych szablonów YAML w content/templates/usg/piersi/piersi/: wezel-chlonny-wewnatrzsutkowy.yaml, brodawczak-wewnatrzprzewodowy.yaml, zmiana-birads-3.yaml, zmiana-birads-4.yaml i zmiana-birads-5.yaml. Uzupełnij taxonomy.yaml o brakujące patologie i sources.yaml wyłącznie o faktycznie użyte konkretne publikacje. Użyj formalnego polskiego języka raportowania, placeholderów {{...}}, statusu draft, wersji 0.1.0 oraz daty 2026-07-10. Omiń imageRefs, jeżeli obraz nie ma zweryfikowanego bezpośredniego URL HTTPS i źródła. Po zapisaniu zaktualizuj backlog i uruchom npm run validate.
```
