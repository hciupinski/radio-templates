## Etap 19: USG piersi - zmiany zapalne, poporodowe i martwica tłuszczowa

### 1. `radiology-template-localizer`

```text
Przygotuj cztery polskie, atlas-ready szablony USG piersi dla: zapalenia sutka, ropnia piersi, galactocele oraz martwicy tłuszczowej piersi. Uwzględnij ocenę skóry, miąższu, ewentualnej kolekcji, Dopplera i węzłów pachowych, a dla galactocele oraz martwicy tłuszczowej kategorię BI-RADS zależną od pełnej morfologii. Oprzyj treść wyłącznie na konkretnych źródłach: ACR Appropriateness Criteria "Breast Infection or Abscess" (https://acsearch.acr.org/docs/3199448/Narrative/), "Breast Imaging and Intervention during Pregnancy and Lactation" (https://pmc.ncbi.nlm.nih.gov/articles/PMC10560982/) oraz "Fat Necrosis of the Breast" (https://pmc.ncbi.nlm.nih.gov/articles/PMC4378709/). Przedstaw jedynie źródła faktycznie wykorzystane. Wyszukaj obrazy, ale nie proponuj imageRef bez bezpośredniego adresu HTTPS do pliku obrazu i potwierdzonego źródła strony.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz cztery zwalidowane szablony YAML w content/templates/usg/piersi/piersi/: zapalenie-sutka.yaml, ropien-piersi.yaml, galactocele.yaml i martwica-tluszczowa.yaml. Uzupełnij taxonomy.yaml o cztery jednostki chorobowe oraz sources.yaml wyłącznie o rzeczywiście użyte konkretne publikacje ACR i PMC. Zastosuj formalny polski język opisów, placeholdery {{...}}, status draft, version 0.1.0 i datę 2026-07-10. Dodaj imageRefs tylko po spełnieniu wszystkich wymagań bezpośredniego URL HTTPS, sourceUrl i znanego statusu licencji; w przeciwnym razie je pomiń. Zaktualizuj backlog oraz uruchom npm run validate.
```
