## Etap 13: tkanki miękkie - uraz, ciało obce, ganglion i podejrzenie mięsaka

### 1. `radiology-template-localizer`

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Krwiak.
Uwzględnij czas od urazu, leczenie przeciwkrzepliwe, trzy wymiary, fazę ewolucji, Doppler, dynamikę oraz różnicowanie z ropniem i guzem. Przy atypowym lub nierosnącym krwiaku podkreśl potrzebę dalszej diagnostyki. Użyj tylko konkretnych źródeł.
```

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Ciało obce.
Uwzględnij lokalizację w trzech płaszczyznach, wymiary, artefakty akustyczne, odległość od skóry, naczyń, nerwów i ścięgien oraz odczyn zapalny. Zaznacz ograniczenia ujemnego USG. Użyj tylko konkretnych źródeł.
```

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Ganglion.
Uwzględnij relację do stawu i pochewki ścięgna, wielokomorowość, szypułę, Doppler i ewentualny ucisk na nerw lub naczynie. Nie wymagaj, aby mały ganglion spełniał wszystkie cechy torbieli prostej. Użyj tylko konkretnych źródeł.
```

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Zmiana podejrzana o mięsaka.
Nie stawiaj rozpoznania histologicznego w USG. Opisz cechy ryzyka, relację do powięzi i struktur krytycznych oraz konieczność MR z kontrastem i konsultacji w ośrodku referencyjnym przed nieplanowaną biopsją lub wycięciem. Użyj tylko konkretnych źródeł.
```

### 2. `radiology-atlas-yaml-writer`

```text
Zapisz szablony YAML dla USG tkanek miękkich / Tkanka podskórna: Krwiak, Ciało obce, Ganglion oraz Zmiana podejrzana o mięsaka.

Wymagania repo:
- dodaj wymagane etykiety do taxonomy.yaml i konkretne wykorzystane źródła do sources.yaml
- status: draft; version: "0.1.0"; updatedAt: "2026-07-10"
- nie dodawaj imageRefs bez pewnego bezpośredniego URL i osobnej strony źródłowej
- uruchom npm run validate
```
