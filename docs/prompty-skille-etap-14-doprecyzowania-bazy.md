## Etap 14: doprecyzowania istniejącej bazy

### 1. `radiology-template-localizer`

```text
Rozbuduj USG jamy brzusznej / Wątroba / Stłuszczenie o odrębne warianty łagodne, umiarkowane i znaczne. Określ je jako półilościową ocenę USG, nie jako histologiczne stopniowanie. Użyj tylko aktualnych, konkretnych wytycznych.
```

```text
Doprecyzuj USG jamy brzusznej / Pęcherzyk żółciowy / Kamica jako szablon dla złogów ruchomych i wskaż osobny wariant dla złogu zaklinowanego. Doprecyzuj, że istniejące zapalenie dotyczy ostrego zapalenia, a wariant przewlekły jest osobnym plikiem.
```

```text
Rozbuduj USG szyi / Tarczyca / Guzek TI-RADS o pięć kroków punktacji ACR TI-RADS oraz progi BAC i kontroli dla TR1-TR5. Użyj wyłącznie oficjalnych materiałów ACR.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz trzy nowe warianty stłuszczenia, zaktualizuj szablony kamicy, ostrego zapalenia i guzka TI-RADS oraz dodaj wyłącznie konkretne źródła. Uruchom npm run validate.
```
