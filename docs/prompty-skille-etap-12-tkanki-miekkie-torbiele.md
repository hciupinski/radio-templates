## Etap 12: tkanki miękkie - zmiany torbielowate

### 1. `radiology-template-localizer`

#### Prompt: `USG tkanek miękkich / Tkanka podskórna / Torbiel`

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Torbiel.

Wymagania:
- nie przesądzaj etiologii wyłącznie na podstawie prostego obrazu płynowego
- uwzględnij: warstwę anatomiczną, trzy wymiary, ścianę, zawartość, wzmocnienie za tylną ścianą, przegródki, Doppler i odczyn zapalny
- przygotuj: assessmentChecklist, reportTemplate, impressionTemplate, clinicalNotes, differential i followUp
- sourceRefs wyłącznie do konkretnych wykorzystanych źródeł
- imageRefs tylko przy pewnym bezpośrednim URL obrazu i osobnym URL strony źródłowej
```

#### Prompt: `USG tkanek miękkich / Tkanka podskórna / Kaszak`

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Kaszak.

Wymagania:
- potraktuj kaszak jako kliniczne określenie powierzchownej torbieli skórnej; nie utożsamiaj go bezwarunkowo z konkretnym podtypem histologicznym
- uwzględnij: łączność ze skórą, zawartość, obwódkę, wzmocnienie za tylną ścianą, Doppler oraz cechy pęknięcia i zapalenia
- sourceRefs wyłącznie do konkretnych wykorzystanych źródeł
- nie dodawaj imageRefs bez pewnego bezpośredniego URL
```

#### Prompt: `USG tkanek miękkich / Tkanka podskórna / Torbiel naskórkowa`

```text
Przygotuj polski szablon opisu dla: USG tkanek miękkich / Tkanka podskórna / Torbiel naskórkowa.

Wymagania:
- opisz cechy: powierzchowne położenie, echa keratynowe, obwódkę, wzmocnienie za tylną ścianą, brak przepływu wewnętrznego i połączenie ze skórą
- uwzględnij objaw submarine sign wyłącznie gdy jest widoczny
- wyjaśnij, że pęknięcie lub zapalenie może zmienić typowy obraz
- sourceRefs wyłącznie do konkretnych wykorzystanych źródeł
- imageRefs tylko przy pewnym bezpośrednim URL obrazu i osobnym URL strony źródłowej
```

### 2. `radiology-atlas-yaml-writer`

#### Prompt: zapis YAML dla trzech szablonów

```text
Zapisz gotowe szablony atlasowe jako pliki YAML dla:
- modality: USG
- examTypes: [USG tkanek miękkich]
- organ: Tkanka podskórna
- pathology: [Torbiel], [Kaszak], [Torbiel naskórkowa]
- target paths:
  - content/templates/usg/tkanki-miekkie/tkanka-podskorna/torbiel.yaml
  - content/templates/usg/tkanki-miekkie/tkanka-podskorna/kaszak.yaml
  - content/templates/usg/tkanki-miekkie/tkanka-podskorna/torbiel-naskorkowa.yaml

Wymagania repo:
- w razie potrzeby dodaj brakujące pozycje do taxonomy.yaml i sources.yaml
- status: draft
- version: "0.1.0"
- updatedAt: "2026-07-10"
- sourceRefs tylko do faktycznie wykorzystanych, konkretnych źródeł
- imageRefs wyłącznie z bezpośrednim URL, stroną źródłową i trybem licencji
- uruchom npm run validate po zapisie
```
