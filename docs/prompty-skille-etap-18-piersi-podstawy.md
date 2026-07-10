## Etap 18: USG piersi - podstawowy blok BI-RADS

### 1. `radiology-template-localizer`

```text
Przygotuj polskie szablony USG piersi dla obrazu prawidłowego, torbieli prostej, torbieli powikłanej i fibroadenoma. Użyj słownika BI-RADS oraz podaj kategorię i dalsze postępowanie tylko zgodne z pełną morfologią zmiany. Użyj wyłącznie konkretnych źródeł ACR.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz cztery szablony YAML w content/templates/usg/piersi/piersi/, dodaj wymagane elementy taxonomy.yaml i sources.yaml, nie dodawaj imageRefs bez bezpośrednich zweryfikowanych URL i uruchom npm run validate.
```
