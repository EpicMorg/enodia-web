---
title: Historia zmian
description: Istotne zmiany w enodia, wydanie po wydaniu.
---

Kanonicznym źródłem jest
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
samej enodia — ta strona go odzwierciedla, jest synchronizowana wraz
z resztą witryny przy każdym wydaniu i zawiera linki do pozostałych
części dokumentacji tam, gdzie zmiana wpływa na faktyczny sposób
konfiguracji. Tagi mają postać `MAJOR.MINOR.PATCH+BUILD`, bez prefiksu
`v`; `+BUILD` to metadane kompilacji semver, używane wyłącznie przy
ponownej kompilacji bez zmian funkcjonalnych, a nie do omijania
rzeczywistego podbicia wersji.

## 2.0.0+0 — 2026-09-23

Wersja główna z powodu dużej funkcji, a nie niezgodności: korelacja CVE
to pierwsza oś oceny, która nie dotyczy cyklu życia. Istniejące pliki
`enodia.yaml`, `settings.yaml` i inwentarze działają bez zmian — nowy
blok `cve:` jest opcjonalny, a konfiguracja bez niego zachowuje się
dokładnie tak jak w 1.2.

### Dodano

- **[Korelacja CVE](/pl/cve/)** z dwiema lokalnymi bazami danych, BDU
  FSTEC i NIST NVD. enodia nigdy ich nie pobiera: `vulxml.zip` z BDU
  i roczne pliki `nvdcve-2.0-<year>.json.gz` z NVD pobiera się
  samodzielnie i wskazuje w `cve.bdu.path` / `cve.nvd.path` w
  `enodia.yaml` (plik, a w przypadku NVD — katalog plików). Każde źródło
  działa samodzielnie. Oba są parsowane strumieniowo i buforowane:
  pierwsze uruchomienie po zmianie bazy danych trwa około minuty dla
  całego NVD i BDU, każde kolejne — poniżej sekundy. Zobacz,
  [jak je pobrać](/pl/cve/#enodia-nigdy-sama-nie-pobiera-baz-danych),
  w tym dodatkowy certyfikat CA potrzebny dla bdu.fstec.ru.
- **52 dopasowywane sondy** (53 nazwy produktów w upstream — `ssh` liczy
  się zarówno jako OpenSSH, jak i Dropbear), czyli każda sonda
  z użytecznymi danymi w którymkolwiek źródle. Celowo niedopasowywane,
  każde z podanego powodu: dystrybucje Linuksa ogólnego przeznaczenia
  (ich CVE dotyczą pakietów), systemy BSD i Solaris, ESXi/vCenter
  i Synology DSM (poziomy poprawek i sufiksy kompilacji, których
  mechanizm dopasowujący jeszcze nie odczytuje) — zobacz,
  [które produkty są dopasowywane](/pl/cve/#które-produkty-są-dopasowywane),
  oraz strony poszczególnych produktów.
- **Dopasowywanie z uwzględnieniem edycji** dla
  [GitLab](/pl/configuration/products/gitlab/),
  [Vault](/pl/configuration/products/vault/),
  [Nextcloud](/pl/configuration/products/nextcloud/) i
  [MongoDB](/pl/configuration/products/mongodb/): instancja community nie
  widzi już znalezisk dotyczących wyłącznie wersji enterprise (na
  prawdziwych danych GitLab 19.2.2 CE widzi 4 z 9 znalezisk NVD,
  Nextcloud 27.1.3 CE — 11 z 23). Te cztery sondy zapisują teraz edycję
  serwera w `extra.enterprise`; przy nieznanej edycji zachowywane są
  wszystkie znaleziska.
- Cele [`ssh`](/pl/configuration/products/ssh/) są dopasowywane jako
  OpenSSH lub Dropbear na podstawie banera; każdy inny stos SSH nie jest
  wyszukiwany w bazach CVE, zamiast dostawać CVE OpenSSH.
- **Kolumna `CVES`** w [widokach compact i drift](/pl/views/) polecenia
  `check`, licząca różne CVE.
- **Lista dla każdego CVE** w
  [`export --format html`](/pl/reporting/#lista-cve), w czystym CSS
  bez JavaScriptu, dzięki czemu raport inline pozostaje plikiem offline
  bez żadnego `<script>`: jeden wiersz na CVE z linkami do NVD, cve.org
  i bdu.fstec.ru, rosyjski tekst BDU, jeśli BDU zawiera dane CVE,
  kolorowa ocena `CRITICAL · CVSS 3.1 9.8`, od najpoważniejszego.
- [`export --format json`](/pl/reporting/#--format-json) zawiera każde
  znalezisko z każdego źródła w tablicy `cves` każdej oceny, w tym
  ustrukturyzowaną ocenę CVSS sparsowaną z obu źródeł.
- Sonda [`fortios`](/pl/configuration/products/fortios/) dla Fortinet
  FortiGate, przez jego REST API z tokenem REST API Admin.
- Raporty HTML w trybie CDN zapamiętują dla każdego odbiorcy zamknięcie
  ostrzeżenia „wymaga dostępu do internetu”.

### Uwagi

- Blok `cve:` jest odczytywany z konfiguracji faktycznie używanej
  w danym uruchomieniu — `--config`, `$ENODIA_CONFIG` lub domyślnych
  ścieżek wyszukiwania.
- Ścieżki Windows działają bez cudzysłowów, w pojedynczych
  cudzysłowach, z ukośnikami zwykłymi lub jako ścieżki UNC.
  W podwójnych cudzysłowach YAML `\t` i `\n` stają się tabulatorem
  i znakiem nowego wiersza, więc taka ścieżka jest odrzucana przy
  wczytywaniu ze wskazówką.
- `cisco-ios-xe` na dobre wypadł z planu rozwoju.

## 1.2.1+0 — 2026-09-10

### Naprawiono

- [`p4d`/`p4p`](/pl/configuration/products/p4d/#limit-czasu) nie stosowały
  `timeout` do podprocesu CLI `p4`, który wywołują — każda inna sonda
  w tym drzewie ogranicza własny transport do `timeout`, zanim sięgnie
  do sieci, a ta tego nie robiła. Proces `p4` zawieszony na łączeniu
  z nieosiągalnym serwerem bezpośrednim (brak odpowiedzi, brak resetu —
  dokładnie to zachowanie sieci, które jest w ogóle powodem, dla którego
  te dwie sondy wywołują `p4`) wisiał w nieskończoność, blokując cały
  przebieg zbierania danych. Zgłoszone bezpośrednio na podstawie
  prawdziwego zawieszenia na produkcji.

## 1.2.0+0 — 2026-09-10

### Dodano

- Sondy [`p4d`](/pl/configuration/products/p4d/) i
  [`p4p`](/pl/configuration/products/p4p/) dla Perforce Helix Core
  Server i Perforce Proxy. Własny protokół RPC Perforce został w pełni
  odtworzony metodą inżynierii wstecznej, a ręcznie zbudowany klient
  poprawnie odtworzył jego handshake z prawdziwym proxy, ale dokładnie
  ten sam, zweryfikowany bajt po bajcie handshake jest po cichu
  odrzucany przez prawdziwe bezpośrednie serwery `p4d` z powodów
  niewidocznych po stronie klienta. Obie sondy wywołują zamiast tego
  własne CLI `p4` operatora — to pierwsze sondy w enodia, które
  uruchamiają zewnętrzny proces zamiast bezpośrednio mówić protokołem
  sieciowym. Ścieżkę pliku binarnego można skonfigurować dla każdego celu
  przez [`options.binary`](/pl/configuration/#targets) (z powrotem do
  `p4` z `$PATH`); działa to identycznie w systemie Windows, ze
  wskazaniem na `p4.exe`. Odpowiedź proxy odróżnia się od odpowiedzi
  serwera bezpośredniego po obecności jej własnego pola `proxyVersion` —
  każda z sond odrzuca kształt odpowiedzi tej drugiej.

### Naprawiono

- Parser wyniku `p4 -Ztag` nie usuwał windowsowych znaków końca wiersza:
  prawdziwy `p4.exe` zapisuje `\r\n`, pozostawiając końcowe `\r`
  w wartościach pól, takich jak `ServerID`.
- `probe.Observation.Resolver` (dodane w 1.1.0+0 dla
  [SonarQube](/pl/configuration/products/sonarqube/)) było zwykłą
  strukturą, a nie wskaźnikiem — `omitempty` w `encoding/json` nie ma
  pojęcia „pustej” wartości dla struktury, więc każda pojedyncza
  obserwacja serializowała w eksportach JSON zbędne `"resolver":{}`,
  a nie tylko obserwacje SonarQube. Poprawiono na wskaźnik, z tego
  samego powodu, dla którego `tlsVerified` już jest nullable, a nie
  gołym `false`.

## 1.1.1+0 — 2026-09-10

### Naprawiono

- [`debian`](/pl/configuration/products/debian/) zgłaszał samą wersję
  główną (`13`) zamiast faktycznego wydania punktowego (`13.6`) —
  `VERSION_ID` w `/etc/os-release` Debiana nigdy go nie zawiera, nawet
  w w pełni załatanej instalacji; wydanie punktowe znajduje się tylko
  w `/etc/debian_version`. `debian` przeniesiono ze wspólnego mechanizmu
  `osReleaseFamilyProbe` do własnej, dedykowanej sondy, która odczytuje
  oba pliki i ufa `debian_version` dopiero po potwierdzeniu `ID=debian`
  oraz tego, że zawartość jest zwykłą liczbą z kropkami — potwierdzono,
  że prawdziwy obraz Ubuntu zawiera identyczny plik z bezużyteczną,
  odziedziczoną zawartością.
- [`ubuntu`](/pl/configuration/products/ubuntu/) miał tę samą lukę:
  `VERSION_ID` nigdy się nie zmienia po wydaniu, więc w pełni załatany
  host `22.04` zgłaszał samo `22.04`, a nie `22.04.5`. `ubuntu` również
  przeniesiono ze wspólnego mechanizmu do własnej sondy, która
  preferuje wydanie punktowe z pola `VERSION` w `os-release`, gdy jest
  ono ściśle bardziej precyzyjne niż `VERSION_ID`. Każdy inny produkt ze
  wspólnej rodziny
  [identyfikacji systemu operacyjnego przez SSH](/pl/configuration/products/ssh-os-probes/)
  został sprawdzony w ten sam sposób; żaden z pozostałych nie ma tej
  luki.

W żadnym z nich nie zmienia się konfiguracja — ta sama wartość
`product:`, te same poświadczenia, ten sam endpoint. Jedynie zgłaszane
`version` stało się bardziej precyzyjne.

## 1.1.0+0 — 2026-09-10

### Dodano

- Resolver cyklu życia `github-tags` dla produktu, który nie publikuje
  w ogóle GitHub Releases, a jedynie tagi w postaci bez kropek — dał
  [pgAdmin](/pl/configuration/products/pgadmin/) pierwszy działający
  resolver (tagi `pgadmin-org/pgadmin4` to `REL-9_17`, konwertowane na
  `9.17`, przy czym wybierany jest tag o najwyższej sparsowanej wersji,
  a nie pierwszy z nich).
- Zmienna środowiskowa **`GITHUB_TOKEN`** — uwierzytelnia każde
  wyszukiwanie cyklu życia oparte na GitHubie, podnosząc limit bez
  uwierzytelniania z 60 żądań na godzinę do 5000 na godzinę. Zobacz
  [Obsługiwane produkty](/pl/products/#aplikacje-i-usługi-infrastrukturalne).
- Sonda może teraz nadpisać resolver cyklu życia swojego produktu dla
  pojedynczej obserwacji — na rzadki przypadek, gdy właściwy kalendarz
  można poznać dopiero po zobaczeniu odpowiedzi producenta z wersją.
  Po raz pierwszy użyte do rozdzielenia
  [SonarQube](/pl/configuration/products/sonarqube/) na SonarQube Server
  i SonarQube Community Build — dwa osobne produkty od podziału
  wprowadzonego przez SonarSource pod koniec 2024 roku, śledzone jako dwie
  różne strony endoflife.date z różnymi danymi cykli.

### Naprawiono

- Błędy resolvera były wcześniej pokazywane w raporcie tylko jako
  `resolver_error`, bez możliwości odróżnienia limitu żądań GitHuba od
  błędu DNS czy zmienionego API. `enodia check`/`export` wypisują teraz
  w takim przypadku na stderr rzeczywisty błąd źródłowy.
- SonarQube był zawsze porównywany z kalendarzem cyklu życia Community
  Build, nawet w przypadku instancji SonarQube Server — zbieranie
  wersji działało, ale raport i tak pokazywał niedopasowany cykl. Teraz
  jest to rozstrzygane dla każdej instancji na podstawie samego ciągu
  wersji.

### Zmieniono

- Publikowanie obrazu kontenera (`ghcr.io/epicmorg/enodia`, z kopiami
  lustrzanymi także w Docker Hub i Quay) zostało całkowicie przeniesione
  z potoku wydań tego repozytorium do monorepozytorium `EpicMorg/docker`,
  według własnego harmonogramu kompilacji tamtego repozytorium. Adres
  publikowanego obrazu i tagi (`latest`, `1`, dokładna wersja) się nie
  zmieniły, ale sam obraz jest teraz wyłącznie `linux/amd64` i działa
  jako root — zobacz [Pierwsze kroki](/pl/getting-started/#instalacja).

## 1.0.0+0 — 2026-09-09

Pierwsze wydanie. `collect → inventory.jsonl → evaluate → assessment →
render` od początku do końca, zweryfikowane na prawdziwej infrastrukturze
produkcyjnej:

- **87 sond**, każda w jednym pliku, wkompilowana i jawnie
  zarejestrowana — większość mówi przez HTTP, niektóre
  ([Redis](/pl/configuration/products/redis/),
  [PostgreSQL](/pl/configuration/products/postgresql/),
  [MySQL](/pl/configuration/products/mysql/),
  [MongoDB](/pl/configuration/products/mongodb/)) bezpośrednio własnym
  protokołem sieciowym, a rosnąca grupa (każda popularna dystrybucja
  Linuksa, systemy BSD, macOS, OPNsense, Proxmox VE, TrueNAS, Synology
  DSM, urządzenia sieciowe) jest odpytywana przez
  [SSH](/pl/configuration/products/ssh-os-probes/) lub HTTP API
  producenta, zamiast zakładać, że endpoint z wersją w ogóle istnieje.
- [`product: generic`](/pl/configuration/products/generic/) — sonda
  definiowana wyłącznie w konfiguracji, dla wszystkiego, co wewnętrzne,
  z celowo zamrożonym słownikiem (bez warunków, pętli i szablonów).
- Rozwiązywanie cyklu życia z użyciem endoflife.date i GitHub Releases,
  buforowane na dysku, oceniane na trzech niezależnych osiach (odstęp
  od poprawek, faza cyklu życia, nowsza gałąź) zamiast jednego
  spłaszczonego werdyktu — zobacz [Koncepcje](/pl/concepts/).
- Cztery [widoki raportu](/pl/views/) w wynikach w postaci tabeli, HTML,
  JSON i Prometheus.
- [`enodia serve`](/pl/cli-reference/#enodia-serve) — serwer HTTP
  oparty wyłącznie na migawkach; zbieraniem zajmuje się ticker w tle,
  a handlery zawsze tylko odczytują ostatnią migawkę.
- [Schemat konfiguracji](/pl/configuration/) z podstawianiem
  `${VAR}`/`${VAR:-default}`, dedykowanym magazynem poświadczeń oraz
  przypinaniem TLS i jawnym włączaniem trybu insecure dla każdego celu.
- Pakiety: `.deb`, `.rpm`, `.apk` i `.pkg.tar.zst` dla Archa,
  dedykowany, nieuprzywilejowany użytkownik systemowy `enodia`, strony
  man dla każdego polecenia, surowe archiwa dla
  Linuksa/Windows/macOS/Androida (Termux) i obraz kontenera — zobacz
  [Pierwsze kroki](/pl/getting-started/). Sumy kontrolne podpisywane
  przez cosign w trybie keyless (OIDC, bez klucza, którym trzeba zarządzać
  lub który mógłby wyciec).
