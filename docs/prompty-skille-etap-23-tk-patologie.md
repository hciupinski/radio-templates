# Etap 23 — patologie w TK i angio-TK u dorosłych

Dla każdego bloku przekaż oba prompty kolejno. Do każdego promptu dołącz poniższe wymagania odpowiedniego skilla.

## Wymagania wspólne

**`radiology-template-localizer`**. Opracuj jeden szablon na patologię w formalnej polszczyźnie używanej w opisach radiologicznych. Użyj listy cech do oceny, gotowych zdań z polami `{{nazwa_pola}}` i krótkich wniosków. Zweryfikuj obraz zmian w konkretnych artykułach Radiopaedia, The Radiology Assistant i przeglądach obrazowych. Oprzyj klasyfikacje, zalecenia i protokoły na właściwych wytycznych. Zwróć tylko wykorzystane odnośniki. Dla obrazów sprawdź bezpośredni HTTPS, osobną stronę atrybucji, licencję i widoczne cechy.

**`radiology-atlas-yaml-writer`**. Zapisz pliki w `content/templates/ct/<obszar>/<narzad>/<patologia>.yaml` i uzupełnij używane etykiety, synonimy TK i CTA oraz konkretne źródła. Użyj statusu `draft`, wersji `0.1.0` i daty `2026-11-15`. Zachowaj oddzielne etykiety protokołów oraz pomiń `imageRefs` bez potwierdzonych danych. Zaktualizuj katalog i backlog. Uruchom `npm run validate`.

## TK głowy

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Krwiak nadtwardówkowy, Krwiak podtwardówkowy, Krwotok podpajęczynówkowy, Krwotok śródmózgowy, Ostre niedokrwienie mózgu, Podejrzenie przerzutów do mózgowia, Wodogłowie. Uwzględnij objawy wczesnego niedokrwienia, przedziały krwawienia, efekt masy, układ komorowy i ograniczenia oceny po kontraście.
- `radiology-atlas-yaml-writer`. Zapisz 7 szablonów w podkatalogach `glowa/mozgowie/`. Użyj etykiet badania CT głowy bez kontrastu, CT głowy z kontrastem.

## TK twarzoczaszki

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Pozaprzegrodowe zapalenie tkanek oczodołu, Przewlekłe zapalenie zatok przynosowych, Złamanie dna oczodołu, Złamanie kompleksu jarzmowo-szczękowego, Złamanie kości nosa, Złamanie typu Le Fort, Złamanie żuchwy. W złamaniach opisz linie, przemieszczenie i zagrożone struktury. W zapaleniach uwzględnij drogi szerzenia i powikłania oczodołowe.
- `radiology-atlas-yaml-writer`. Zapisz 7 szablonów w podkatalogach `twarzoczaszka/kosci-twarzoczaszki/`, `twarzoczaszka/oczodoly/`, `twarzoczaszka/zatoki-przynosowe/`. Użyj etykiet badania CT twarzoczaszki bez kontrastu, CT oczodołów z kontrastem, CT zatok przynosowych bez kontrastu.

## TK szyi

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Guz gardła lub krtani, Ostre zapalenie ślinianki, Podejrzane przerzutowe węzły chłonne szyi, Ropień okołomigdałkowy, Ropień przestrzeni głębokich szyi, Zapalenie nagłośni i okolicy nadgłośniowej. Uwzględnij przestrzenie szyi, drożność dróg oddechowych, zbiorniki, ich szerzenie oraz ocenę poziomów węzłowych i naciekania.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w podkatalogach `szyja/tkanki-miekkie-szyi/`. Użyj etykiet badania CT szyi z kontrastem.

## TK klatki piersiowej

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Odma opłucnowa, Płyn w jamie opłucnej, Przypadkowy guzek lity płuca, Włóknienie płuc, Zapalenie płuc, Zatorowość płucna. Rozróżnij rutynową TK, HRCT oraz angio-TK tętnic płucnych i uwzględnij ograniczenia każdego protokołu.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w podkatalogach `klatka-piersiowa/oplucna/`, `klatka-piersiowa/pluca/`, `klatka-piersiowa/tetnice-plucne/`. Użyj etykiet badania CT klatki piersiowej, HRCT klatki piersiowej, Angio-CT tętnic płucnych.

## TK jamy brzusznej

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Niedokrwienie jelita, Niedrożność jelita cienkiego, Ostre zapalenie trzustki, Ostre zapalenie wyrostka robaczkowego, Perforacja przewodu pokarmowego, Przerzuty do wątroby, Uraz śledziony, Zapalenie uchyłków jelita grubego. Uwzględnij fazy, położenie i powikłania. Dla ostrego niedokrwienia jelit użyj angio-TK naczyń krezkowych.
- `radiology-atlas-yaml-writer`. Zapisz 8 szablonów w podkatalogach `jama-brzuszna/jelito-cienkie/`, `jama-brzuszna/jelito-grube/`, `jama-brzuszna/przewod-pokarmowy/`, `jama-brzuszna/sledziona/`, `jama-brzuszna/trzustka/`, `jama-brzuszna/watroba/`, `jama-brzuszna/wyrostek-robaczkowy/`. Użyj etykiet badania Angio-CT naczyń krezkowych, CT jamy brzusznej i miednicy.

## TK miednicy

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Krwiak miednicy, Ropień jajnikowo-jajowodowy, Uraz pęcherza moczowego, Złamanie kości krzyżowej, Złamanie panewki stawu biodrowego, Złamanie pierścienia miednicy. Oddziel ocenę urazu kostnego i tkanek miękkich. W urazie pęcherza zastosuj kontekst cystografii CT.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w podkatalogach `miednica/kosc-krzyzowa/`, `miednica/panewka-stawu-biodrowego/`, `miednica/pecherz-moczowy/`, `miednica/pierscien-miednicy/`, `miednica/przydatki/`, `miednica/tkanki-miekkie-miednicy/`. Użyj etykiet badania CT miednicy, Cystografia CT.

## TK kręgosłupa

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Podejrzenie przerzutów do kręgosłupa, Złamanie atlasu, Złamanie kompresyjne trzonu kręgu, Złamanie wybuchowe trzonu kręgu, Złamanie zęba C2, Zmiany zwyrodnieniowe kręgosłupa. Uwzględnij poziom, morfologię, ustawienie, kanał kręgowy oraz ograniczenia TK w ocenie więzadeł i struktur nerwowych.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w podkatalogach `kregoslup/kregoslup/`. Użyj etykiet badania CT kręgosłupa.

## Angio-TK tętnic kończyn

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Miażdżycowe zwężenie tętnic kończyn dolnych, Niedrożność tętnicy kończyny dolnej, Tętniak tętnicy podkolanowej, Uraz tętnicy kończyny dolnej, Uraz tętnicy kończyny górnej. Uwzględnij odcinki tętnic, dystalny napływ, krążenie oboczne i artefakty ograniczające ocenę.
- `radiology-atlas-yaml-writer`. Zapisz 5 szablonów w podkatalogach `konczyna-dolna/tetnice-konczyn-dolnych/`, `konczyna-gorna/tetnice-konczyny-gornej/`. Użyj etykiet badania Angio-CT tętnic kończyn dolnych, Angio-CT tętnic kończyny górnej.

## Angio-TK głowy

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Malformacja tętniczo-żylna mózgu, Niedrożność dużego naczynia mózgowego, Skurcz tętnic mózgowych, Tętniak wewnątrzczaszkowy, Zwężenie tętnicy wewnątrzczaszkowej. Podaj tętnicę, stronę, segment i cechy choroby. Zaznacz ograniczenia badania jednofazowego.
- `radiology-atlas-yaml-writer`. Zapisz 5 szablonów w podkatalogach `glowa/tetnice-wewnatrzczaszkowe/`. Użyj etykiet badania Angio-CT głowy.

## Angio-TK aorty

- `radiology-template-localizer`. Opracuj opisy dla następujących pozycji: Krwiak śródścienny aorty, Owrzodzenie drążące aorty, Pęknięcie tętniaka aorty, Przeciek okołoprotezowy po EVAR, Rozwarstwienie aorty, Tętniak aorty. Uwzględnij fazy, odcinki, odejścia gałęzi, pomiary prostopadłe do osi i rodzaje powikłań po EVAR.
- `radiology-atlas-yaml-writer`. Zapisz 6 szablonów w podkatalogach `klatka-piersiowa/aorta/`. Użyj etykiet badania Angio-CT aorty.
