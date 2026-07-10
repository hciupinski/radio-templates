## Etap 21: USG ślinianek - obraz prawidłowy, kamica i zapalenia

### 1. `radiology-template-localizer`

```text
Przygotuj cztery polskie, atlas-ready szablony USG ślinianek przyusznych i podżuchwowych dla obrazu prawidłowego, kamicy ślinianek, ostrego zapalenia ślinianki i przewlekłego zapalenia ślinianki. Obejmij ocenę obu ślinianek, przewodów wyprowadzających, złogów, Dopplera, ropnia i węzłów okołogruczołowych. Oprzyj treść wyłącznie na: "US of the Major Salivary Glands" (https://pubmed.ncbi.nlm.nih.gov/16702452/) oraz "Ultrasound in Inflammatory and Obstructive Salivary Gland Diseases" (https://www.mdpi.com/2077-0383/10/16/3547). Podaj tylko źródła rzeczywiście wykorzystane. Z materiału MDPI użyj obrazu tylko wtedy, gdy zapiszesz bezpośredni URL HTTPS, osobny sourceUrl, opis widocznych cech i licencję CC BY 4.0.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz cztery szablony YAML w content/templates/usg/slinianki/slinianki-przyuszne-i-podzuchwowe/: prawidlowa.yaml, kamica-slinianki.yaml, ostre-zapalenie.yaml i przewlekle-zapalenie.yaml. Dodaj konieczne etykiety taxonomy.yaml i wyłącznie konkretne źródła do sources.yaml. W szablonach kamicy, ostrego i przewlekłego zapalenia dodaj tylko zweryfikowane obrazy z artykułu MDPI, z direct imageUrl, sourceUrl, sourceId, widocznymi cechami i CC BY. Nie dodawaj obrazu referencyjnego do wariantu prawidłowego bez spełnienia tych kryteriów. Użyj formalnego polskiego języka, statusu draft, wersji 0.1.0 i daty 2026-07-10; zaktualizuj backlog i uruchom npm run validate.
```
