# Etap 25 — lista patologii TK

Do opracowania użyto kolejno `radiology-template-localizer` i `radiology-atlas-yaml-writer`, według [wspólnych wymagań etapu 23](prompty-skille-etap-23-tk-patologie.md#wymagania-wspólne). Zachowano status `draft` nowej treści i osobne typy badań dla protokołów specjalistycznych.

Pozycję 2a przypisano nienumerowanej odmie prężnej, a pozycje 43 i 44 w jednym wierszu listy odnoszą się do naczyniaka wątroby. Lista pomija numer 95. „Odma – inne” obejmuje odmę śródpiersia, „przepuklina – inna” przepuklinę Bochdaleka, a „rzadkie” sekwestrację płuca.

Dla każdej pozycji porównano istniejący zakres. Odrębne szablony dodano dla wariantów, które wymagają osobnego opisu lub protokołu. Wszystkie odnośniki wskazują odpowiadające pozycji pliki YAML.

## Klatka piersiowa

W [aplikacji](https://hciupinski.github.io/radio-templates/) wybierz **Jednostki chorobowe → TK klatki piersiowej – lista 34 patologii**. Zestaw obejmuje wszystkie pozycje tabeli, w tym rozwarstwienie i koarktację aorty. W trybie **Anatomia** protokoły aortalne znajdziesz pod **CT → Aorta i tętnice kończyn**.

Sprawdzono treść wszystkich 34 szablonów z zestawienia i zaktualizowano pozycje wymagające doprecyzowania. Źródła są dostępne w każdym szablonie. Opisy mają status `draft`.

| Nr | Szablony w atlasie | Stan | Protokół |
| --- | --- | --- | --- |
| 1 | [Płyn w jamie opłucnej](../content/templates/ct/klatka-piersiowa/oplucna/plyn-w-oplucnej.yaml) | Istniejący | CT klatki piersiowej |
| 2 | [Odma opłucnowa](../content/templates/ct/klatka-piersiowa/oplucna/odma-oplucnowa.yaml) | Istniejący | CT klatki piersiowej |
| 2a | [Podejrzenie odmy prężnej w TK](../content/templates/ct/klatka-piersiowa/oplucna/odma-prezna.yaml) | Nowy | CT klatki piersiowej |
| 3 | [Odma podskórna klatki piersiowej](../content/templates/ct/klatka-piersiowa/tkanki-miekkie-klatki-piersiowej/odma-podskorna.yaml) | Nowy | CT klatki piersiowej |
| 4 | [Odma śródpiersia](../content/templates/ct/klatka-piersiowa/srodpiersie/odma-srodpiersia.yaml) | Nowy | CT klatki piersiowej |
| 5 | [Niedodma płuca](../content/templates/ct/klatka-piersiowa/pluca/niedodma.yaml) | Nowy | CT klatki piersiowej |
| 6 | [Zapalenie płuc](../content/templates/ct/klatka-piersiowa/pluca/zapalenie-pluc.yaml) | Istniejący | CT klatki piersiowej |
| 7 | [Zmiany płucne w przebiegu COVID-19](../content/templates/ct/klatka-piersiowa/pluca/covid-19.yaml) | Nowy | CT klatki piersiowej |
| 8 | [Guz płuca podejrzany o nowotwór pierwotny](../content/templates/ct/klatka-piersiowa/pluca/podejrzenie-raka-pluca.yaml) | Istniejący | CT klatki piersiowej z kontrastem |
| 9 | [Rak płuca – ocena rozsiewu w klatce piersiowej](../content/templates/ct/klatka-piersiowa/pluca/rak-pluca-rozsiew.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 10 | [Zatorowość płucna](../content/templates/ct/klatka-piersiowa/tetnice-plucne/zatorowosc-plucna.yaml) | Istniejący | Angio-CT tętnic płucnych |
| 11 | [Zespół płata środkowego](../content/templates/ct/klatka-piersiowa/pluca/zespol-plata-srodkowego.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 12 | [Podejrzenie przerzutów do płuc](../content/templates/ct/klatka-piersiowa/pluca/przerzuty-do-pluc.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 13 | [Rozwarstwienie aorty](../content/templates/ct/klatka-piersiowa/aorta/rozwarstwienie-aorty.yaml) | Istniejący | Angio-CT aorty |
| 14 | [Koarktacja aorty](../content/templates/ct/klatka-piersiowa/aorta/koarktacja-aorty.yaml) | Nowy | Angio-CT aorty |
| 15 | [Chłoniak – zmiany w klatce piersiowej](../content/templates/ct/klatka-piersiowa/srodpiersie/chloniak-klatki.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 16 | [Guz przełyku podejrzany o nowotwór](../content/templates/ct/klatka-piersiowa/przelyk/rak-przelyku.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 17 | [Stan po usunięciu przełyku](../content/templates/ct/klatka-piersiowa/przelyk/stan-po-ezofagektomii.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 18 | [Zagęszczenia typu mlecznej szyby](../content/templates/ct/klatka-piersiowa/pluca/mleczna-szyba.yaml) | Nowy | HRCT klatki piersiowej |
| 19 | [Wzorzec UIP w podejrzeniu IPF](../content/templates/ct/klatka-piersiowa/pluca/uip-podejrzenie-ipf.yaml) | Nowy | HRCT klatki piersiowej |
| 20 | [Stłuczenie płuca](../content/templates/ct/klatka-piersiowa/pluca/stluczenie-pluca.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 21 | [Złamania żeber](../content/templates/ct/klatka-piersiowa/zebra/zlamania-zeber.yaml) | Nowy | CT klatki piersiowej |
| 22 | [Złamanie kręgosłupa piersiowego w CT klatki piersiowej](../content/templates/ct/klatka-piersiowa/kregoslup/zlamanie-kregoslupa-piersiowego.yaml) | Nowy | CT klatki piersiowej |
| 23 | [Podejrzenie urazu rdzenia w CT klatki piersiowej](../content/templates/ct/klatka-piersiowa/kregoslup/podejrzenie-urazu-rdzenia.yaml) | Nowy | CT klatki piersiowej |
| 24 | [Podejrzenie urazu tchawicy lub oskrzela](../content/templates/ct/klatka-piersiowa/drogi-oddechowe/uraz-tchawicy-oskrzeli.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 25 | [Uraz klatki piersiowej – ocena całościowa](../content/templates/ct/klatka-piersiowa/klatka-piersiowa/uraz-klatki-piersiowej.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 26 | [Przepuklina rozworu przełykowego](../content/templates/ct/klatka-piersiowa/przepona/przepuklina-rozworu-przelykowego.yaml) | Nowy | CT klatki piersiowej |
| 27 | [Przepuklina przeponowa Bochdaleka](../content/templates/ct/klatka-piersiowa/przepona/przepuklina-bochdaleka.yaml) | Nowy | CT klatki piersiowej |
| 28 | [Sekwestracja płuca](../content/templates/ct/klatka-piersiowa/pluca/sekwestracja-pluca.yaml) | Nowy | Angio-CT tętnic płucnych i krążenia systemowego |
| 29 | [Rozstrzenie oskrzeli](../content/templates/ct/klatka-piersiowa/pluca/rozstrzenie-oskrzeli.yaml) | Istniejący | HRCT klatki piersiowej |
| 30 | [Wole zamostkowe](../content/templates/ct/klatka-piersiowa/tarczyca/wole-zamostkowe.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 31 | [Podejrzenie blizny pozawałowej lewej komory](../content/templates/ct/klatka-piersiowa/serce/blizna-pozawalowa.yaml) | Nowy | CT klatki piersiowej |
| 32 | [Żylaki przełyku](../content/templates/ct/klatka-piersiowa/przelyk/zylaki-przelyku.yaml) | Nowy | CT klatki piersiowej z kontrastem |
| 33 | [Rak piersi – ocena rozsiewu w klatce piersiowej](../content/templates/ct/klatka-piersiowa/pluca/rak-piersi-rozsiew.yaml) | Nowy | CT klatki piersiowej z kontrastem |

## Jama brzuszna i miednica

| Nr | Szablony w atlasie | Stan |
| --- | --- | --- |
| 34 | [Perforacja przewodu pokarmowego](../content/templates/ct/jama-brzuszna/przewod-pokarmowy/perforacja-przewodu-pokarmowego.yaml) | Istniejący |
| 35 | [Niedrożność jelita cienkiego](../content/templates/ct/jama-brzuszna/jelito-cienkie/niedroznosc-jelita-cienkiego.yaml), [Niedrożność jelita grubego](../content/templates/ct/jama-brzuszna/jelito-grube/niedroznosc-jelita-grubego.yaml) | Istniejący i nowy |
| 36 | [Płyn w jamie otrzewnej](../content/templates/ct/jama-brzuszna/otrzewna/plyn-w-jamie-otrzewnej.yaml) | Nowy |
| 37 | [Krew w jamie otrzewnej](../content/templates/ct/jama-brzuszna/otrzewna/krwawienie-do-jamy-otrzewnej.yaml) | Nowy |
| 38 | [Podejrzenie rozsiewu do otrzewnej](../content/templates/ct/jama-brzuszna/otrzewna/rozsiew-do-otrzewnej.yaml) | Nowy |
| 39 | [Torbiel prosta wątroby](../content/templates/ct/jama-brzuszna/watroba/torbiel-prosta.yaml) | Nowy |
| 40 | [Przerzuty do wątroby](../content/templates/ct/jama-brzuszna/watroba/przerzuty-watroby.yaml) | Istniejący |
| 41 | [Podejrzenie raka wątrobowokomórkowego](../content/templates/ct/jama-brzuszna/watroba/hcc-wielofazowe-ct.yaml) | Istniejący |
| 42 | [Podejrzenie fibrolamellarnego raka wątrobowokomórkowego](../content/templates/ct/jama-brzuszna/watroba/fibrolamellarny-rak-watroby.yaml) | Nowy |
| 43 | [Naczyniak wątroby](../content/templates/ct/jama-brzuszna/watroba/naczyniak.yaml) | Nowy |
| 44 | [Naczyniak wątroby](../content/templates/ct/jama-brzuszna/watroba/naczyniak.yaml) | Nowy |
| 45 | [Ogniskowy rozrost guzkowy wątroby](../content/templates/ct/jama-brzuszna/watroba/fnh.yaml) | Nowy |
| 46 | [Podejrzenie ropnia wątroby](../content/templates/ct/jama-brzuszna/watroba/ropien.yaml) | Nowy |
| 47 | [Zakrzepica żyły wrotnej](../content/templates/ct/jama-brzuszna/zyla-wrotna/zakrzepica-zyly-wrotnej.yaml), [Zakrzepica żył wątrobowych – podejrzenie zespołu Budda-Chiariego](../content/templates/ct/jama-brzuszna/zyly-watrobowe/zakrzepica-zyl-watrobowych.yaml) | Istniejący i nowy |
| 48 | [Marskość wątroby](../content/templates/ct/jama-brzuszna/watroba/marskosc.yaml) | Nowy |
| 49 | [Stłuszczenie wątroby](../content/templates/ct/jama-brzuszna/watroba/stluszczenie.yaml) | Nowy |
| 50 | [Pierwotne stwardniające zapalenie dróg żółciowych](../content/templates/ct/jama-brzuszna/drogi-zolciowe/psc.yaml) | Nowy |
| 51 | [Kamica pęcherzyka żółciowego](../content/templates/ct/jama-brzuszna/pecherzyk-zolciowy/kamica.yaml) | Nowy |
| 52 | [Ostre zapalenie pęcherzyka żółciowego](../content/templates/ct/jama-brzuszna/pecherzyk-zolciowy/ostre-zapalenie-pecherzyka-zolciowego.yaml), [Przewlekłe zapalenie pęcherzyka żółciowego](../content/templates/ct/jama-brzuszna/pecherzyk-zolciowy/przewlekle-zapalenie.yaml) | Istniejący i nowy |
| 53 | [Podejrzenie raka pęcherzyka żółciowego](../content/templates/ct/jama-brzuszna/pecherzyk-zolciowy/rak-pecherzyka.yaml) | Nowy |
| 54 | [Kamica przewodu żółciowego wspólnego](../content/templates/ct/jama-brzuszna/drogi-zolciowe/kamica-przewodowa.yaml) | Istniejący |
| 55 | [Podejrzenie wewnątrzwątrobowego cholangiocarcinoma](../content/templates/ct/jama-brzuszna/watroba/cholangiocarcinoma-wewnatrzwatrobowe.yaml), [Podejrzenie pozawątrobowego cholangiocarcinoma](../content/templates/ct/jama-brzuszna/drogi-zolciowe/cholangiocarcinoma-pozawatrobowe.yaml) | Nowy |
| 56 | [Podejrzenie gruczolakoraka przewodowego trzustki](../content/templates/ct/jama-brzuszna/trzustka/gruczolakorak-przewodowy-trzustki.yaml) | Istniejący |
| 57 | [Podejrzenie IPMN trzustki](../content/templates/ct/jama-brzuszna/trzustka/ipmn.yaml) | Nowy |
| 58 | [Podejrzenie surowiczego nowotworu torbielowatego trzustki](../content/templates/ct/jama-brzuszna/trzustka/scn.yaml) | Nowy |
| 59 | [Podejrzenie śluzowego nowotworu torbielowatego trzustki](../content/templates/ct/jama-brzuszna/trzustka/mcn.yaml) | Nowy |
| 60 | [Podejrzenie raka żołądka](../content/templates/ct/jama-brzuszna/zoladek/rak-zoladka.yaml) | Nowy |
| 61 | [Podejrzenie chłoniaka żołądka](../content/templates/ct/jama-brzuszna/zoladek/chloniak-zoladka.yaml) | Nowy |
| 62 | [Podejrzenie chłoniaka – węzły jamy brzusznej](../content/templates/ct/jama-brzuszna/wezly-chlonne/chloniak-jamy-brzusznej.yaml) | Nowy |
| 63 | [Torbiel prosta nerki](../content/templates/ct/jama-brzuszna/nerki/torbiel-prosta-nerki.yaml), [Torbielowata zmiana nerki w klasyfikacji Bosniak 2019](../content/templates/ct/jama-brzuszna/nerki/torbielowata-zmiana-bosniak-2019.yaml) | Istniejący i nowy |
| 64 | [Kamica nerkowa](../content/templates/ct/jama-brzuszna/nerki/kamica.yaml) | Istniejący |
| 65 | [Kamica moczowodu z zastojem](../content/templates/ct/jama-brzuszna/moczowody/kamica-moczowodu-z-zastojem.yaml) | Istniejący |
| 66 | [Kamica pęcherza moczowego](../content/templates/ct/miednica/pecherz-moczowy/kamica-pecherza.yaml) | Nowy |
| 67 | [Lita zmiana nerki podejrzana o nowotwór](../content/templates/ct/jama-brzuszna/nerki/guz-lity-nerki.yaml) | Istniejący |
| 68 | [Podejrzenie wznowy raka nerki](../content/templates/ct/jama-brzuszna/nerki/podejrzenie-wznowy-raka-nerki.yaml) | Nowy |
| 69 | [Angiomyolipoma nerki](../content/templates/ct/jama-brzuszna/nerki/angiomyolipoma.yaml) | Nowy |
| 70 | [Ropień nerki](../content/templates/ct/jama-brzuszna/nerki/ropien-nerki.yaml) | Nowy |
| 71 | [Ostre odmiedniczkowe zapalenie nerek](../content/templates/ct/jama-brzuszna/nerki/ostre-odmiedniczkowe-zapalenie.yaml) | Istniejący |
| 72 | [Gruczolak nadnercza bogaty w lipidy](../content/templates/ct/jama-brzuszna/nadnercza/gruczolak-nadnercza.yaml) | Nowy |
| 73 | [Podejrzenie przerzutu do nadnercza](../content/templates/ct/jama-brzuszna/nadnercza/przerzut-do-nadnercza.yaml) | Nowy |
| 74 | [Zmiana tłuszczowa nadnercza – różnicowanie z angiomyolipoma](../content/templates/ct/jama-brzuszna/nadnercza/angiomyolipoma-nadnercza.yaml) | Nowy |
| 75 | [Uchyłkowatość jelita grubego](../content/templates/ct/jama-brzuszna/jelito-grube/uchylkowatosc.yaml) | Nowy |
| 76 | [Zapalenie uchyłków jelita grubego](../content/templates/ct/jama-brzuszna/jelito-grube/zapalenie-uchylkow.yaml) | Istniejący |
| 77 | [Ostre zapalenie wyrostka robaczkowego](../content/templates/ct/jama-brzuszna/wyrostek-robaczkowy/zapalenie-wyrostka.yaml) | Istniejący |
| 78 | [Aktywna choroba Leśniowskiego-Crohna jelita cienkiego](../content/templates/ct/jama-brzuszna/jelito-cienkie/aktywna-choroba-crohna.yaml), [Zapalenie jelit o nieswoistym obrazie](../content/templates/ct/jama-brzuszna/jelito-cienkie/zapalenie-jelit-nieswoiste.yaml) | Istniejący i nowy |
| 79 | [Podejrzenie nowotworu jelita grubego](../content/templates/ct/jama-brzuszna/jelito-grube/guz-jelita-grubego.yaml) | Nowy |
| 80 | [Nowotwór jelita grubego z podejrzeniem przerzutów](../content/templates/ct/jama-brzuszna/jelito-grube/rak-jelita-grubego-przerzuty.yaml) | Nowy |
| 81 | [Przepuklina ściany jamy brzusznej](../content/templates/ct/jama-brzuszna/sciana-jamy-brzusznej/przepuklina-sciany-brzucha.yaml) | Nowy |
| 82 | [Ostre śródmiąższowe obrzękowe zapalenie trzustki](../content/templates/ct/jama-brzuszna/trzustka/ostre-zapalenie-srodmiazszowe.yaml) | Nowy |
| 83 | [Ostre martwicze zapalenie trzustki](../content/templates/ct/jama-brzuszna/trzustka/ostre-zapalenie-martwicze.yaml) | Nowy |
| 84 | [Przewlekłe zapalenie trzustki](../content/templates/ct/jama-brzuszna/trzustka/przewlekle-zapalenie.yaml) | Nowy |
| 85 | [Tętniak aorty](../content/templates/ct/klatka-piersiowa/aorta/tetniak-aorty.yaml) | Istniejący |
| 86 | [Pęknięcie tętniaka aorty](../content/templates/ct/klatka-piersiowa/aorta/pekniecie-tetniaka-aorty.yaml) | Istniejący |
| 87 | [Aktywne krwawienie z tętnicy biodrowej lub jej gałęzi](../content/templates/ct/miednica/tetnice-biodrowe/aktywne-krwawienie-z-tetnicy-biodrowej.yaml) | Nowy |
| 88 | [Aktywne krwawienie z wątroby](../content/templates/ct/jama-brzuszna/watroba/aktywne-krwawienie-z-watroby.yaml) | Nowy |
| 89 | [Aktywne krwawienie ze śledziony](../content/templates/ct/jama-brzuszna/sledziona/aktywne-krwawienie-ze-sledziony.yaml) | Nowy |
| 90 | [Aktywne krwawienie do przewodu pokarmowego](../content/templates/ct/jama-brzuszna/przewod-pokarmowy/aktywne-krwawienie-do-przewodu-pokarmowego.yaml) | Nowy |
| 91 | [Zmiana guzowata trzonu macicy](../content/templates/ct/miednica/macica/guz-trzonu-macicy.yaml) | Nowy |
| 92 | [Zmiana przydatków podejrzana o nowotwór](../content/templates/ct/miednica/przydatki/zmiana-przydatkow-podejrzana-o-nowotwor.yaml) | Istniejący |
| 93 | [Macica mięśniakowata](../content/templates/ct/miednica/macica/miesniaki-macicy.yaml) | Nowy |
| 94 | [Guz szyjki macicy – ocena zasięgu w TK](../content/templates/ct/miednica/szyjka-macicy/guz-szyjki-macicy.yaml) | Nowy |
| 96 | [Podejrzenie zaawansowanej zmiany gruczołu krokowego](../content/templates/ct/miednica/gruczol-krokowy/guz-prostaty.yaml) | Nowy |
| 97 | [Zmiana pęcherza podejrzana o nowotwór](../content/templates/ct/miednica/pecherz-moczowy/zmiana-pecherza-podejrzana-o-nowotwor.yaml) | Istniejący |
| 98 | [Uraz pęcherza moczowego](../content/templates/ct/miednica/pecherz-moczowy/pekniecie-pecherza.yaml) | Istniejący |

## OUN i politrauma

| Nr | Szablony w atlasie | Stan |
| --- | --- | --- |
| 99 | [Krwotok śródmózgowy](../content/templates/ct/glowa/mozgowie/krwotok-srodmozgowy.yaml) | Istniejący |
| 100 | [Krwiak nadtwardówkowy](../content/templates/ct/glowa/mozgowie/krwiak-nadtwardowkowy.yaml) | Istniejący |
| 101 | [Krwiak podtwardówkowy](../content/templates/ct/glowa/mozgowie/krwiak-podtwardowkowy.yaml) | Istniejący |
| 102 | [Krwotok podpajęczynówkowy](../content/templates/ct/glowa/mozgowie/krwotok-podpajeczynowkowy.yaml) | Istniejący |
| 103 | [Przewlekły krwiak podtwardówkowy](../content/templates/ct/glowa/mozgowie/przewlekly-krwiak-podtwardowkowy.yaml) | Nowy |
| 104 | [Tętniak wewnątrzczaszkowy](../content/templates/ct/glowa/tetnice-wewnatrzczaszkowe/tetniak-wewnatrzczaszkowy.yaml) | Istniejący |
| 105 | [Zakrzepica zatok żylnych mózgowia](../content/templates/ct/glowa/zatoki-zylne-mozgowia/zakrzepica-zatok-zylnych.yaml) | Nowy |
| 106 | [Ostre niedokrwienie mózgu](../content/templates/ct/glowa/mozgowie/niedokrwienie-mozgu.yaml) | Istniejący |
| 107 | [Przebyty zawał mózgu](../content/templates/ct/glowa/mozgowie/przebyty-zawal-mozgu.yaml) | Nowy |
| 108 | [Zmiana oponowa podejrzana o oponiaka](../content/templates/ct/glowa/mozgowie/podejrzenie-oponiaka.yaml) | Nowy |
| 109 | [Zmiana mózgowia podejrzana o glejaka wysokiego stopnia](../content/templates/ct/glowa/mozgowie/podejrzenie-glioblastoma.yaml) | Nowy |
| 110 | [Zmiana mózgowia podejrzana o glejaka](../content/templates/ct/glowa/mozgowie/podejrzenie-astrocytoma.yaml) | Nowy |
| 111 | [Podejrzenie przerzutów do mózgowia](../content/templates/ct/glowa/mozgowie/przerzuty-do-mozgowia.yaml) | Istniejący |
| 112 | [Zmiana mózgowia podejrzana o chłoniaka](../content/templates/ct/glowa/mozgowie/podejrzenie-chloniaka-mozgu.yaml) | Nowy |
| 113 | [Zmiana mózgowia podejrzana o ropień](../content/templates/ct/glowa/mozgowie/podejrzenie-ropnia-mozgu.yaml) | Nowy |
| 114 | [Zmiany istoty białej podejrzane o naczyniopochodne](../content/templates/ct/glowa/mozgowie/zmiany-naczyniopochodne-istoty-bialej.yaml) | Nowy |
| 115 | [Podejrzenie zmian demielinizacyjnych](../content/templates/ct/glowa/mozgowie/podejrzenie-demielinizacji.yaml) | Nowy |
| 116 | [Podejrzenie mikrogruczolaka przysadki](../content/templates/ct/glowa/przysadka-i-okolica-siodla/podejrzenie-mikrogruczolaka-przysadki.yaml) | Nowy |
| 117 | [Podejrzenie makrogruczolaka przysadki](../content/templates/ct/glowa/przysadka-i-okolica-siodla/podejrzenie-makrogruczolaka-przysadki.yaml) | Nowy |
| 118 | [Zmiana okolicy siodła podejrzana o czaszkogardlaka](../content/templates/ct/glowa/przysadka-i-okolica-siodla/podejrzenie-czaszkogardlaka.yaml) | Nowy |
| 119 | [Złamanie sklepienia czaszki](../content/templates/ct/glowa/kosci-czaszki/zlamanie-sklepienia-czaszki.yaml) | Nowy |
| 120 | [Złamanie kości skroniowej](../content/templates/ct/glowa/kosci-czaszki/zlamanie-kosci-skroniowej.yaml) | Nowy |
| 121 | [Angio-CT jako badanie pomocnicze w ocenie krążenia mózgowego](../content/templates/ct/glowa/mozgowie/angiografia-ct-badanie-pomocnicze.yaml) | Nowy |
| 122 | [Penetrujący uraz głowy](../content/templates/ct/glowa/mozgowie/penetrujacy-uraz-glowy.yaml) | Nowy |
| 123 | [Uraz wielonarządowy](../content/templates/ct/glowa/narzady-w-badaniu-urazowym/uraz-wielonarzadowy.yaml) | Nowy |
