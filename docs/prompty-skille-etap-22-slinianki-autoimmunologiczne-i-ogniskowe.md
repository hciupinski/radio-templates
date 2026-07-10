## Etap 22: USG ślinianek - Sjogren, zmiany łagodne i podejrzane

### 1. `radiology-template-localizer`

```text
Przygotuj pięć polskich, atlas-ready szablonów USG ślinianek przyusznych i podżuchwowych dla zespołu Sjogrena, gruczolaka wielopostaciowego, guza Warthina, torbieli ślinianki i zmiany podejrzanej o złośliwość. Zachowaj ostrożność: USG może sugerować typ zmiany, ale nie zastępuje rozstrzygnięcia histopatologicznego. Oprzyj treść wyłącznie na konkretnych źródłach: https://rmdopen.bmj.com/content/3/1/e000364, https://pmc.ncbi.nlm.nih.gov/articles/PMC5803158/ oraz https://pmc.ncbi.nlm.nih.gov/articles/PMC10546333/. Podaj jedynie wykorzystane źródła. Nie dodawaj imageRef bez bezpośredniego HTTPS imageUrl, osobnego sourceUrl i zweryfikowanego statusu licencji.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz pięć szablonów YAML w content/templates/usg/slinianki/slinianki-przyuszne-i-podzuchwowe/: zespol-sjogrena.yaml, gruczolak-wielopostaciowy.yaml, guz-warthina.yaml, torbiel-slinianki.yaml i podejrzenie-zlosliwosci.yaml. Rozszerz taxonomy.yaml oraz sources.yaml tylko o wymagane, rzeczywiście wykorzystane pozycje. Każdy plik ma używać formalnego polskiego języka, placeholderów {{...}}, statusu draft, wersji 0.1.0 i daty 2026-07-10. Bez pewnego bezpośredniego obrazu pozostaw imageRefs pominięte. Zaktualizuj backlog i uruchom npm run validate.
```
