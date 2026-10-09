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

## 2.2.0+0 — 2026-10-09

`enodia cve update` samo pobiera bazy CVE, własne dane bezpieczeństwa
dostawców (MariaDB, Atlassian, PostgreSQL, nginx) dołączają do BDU i NVD,
dopasowywanie CVE obejmuje iLO 4, iDRAC i Synology DSM, a do tego
dochodzi 27 nowych sond — łącznie 123. Każdy nowy klucz `cve:` jest
opcjonalny, a konfiguracje i inwentarze z 2.1 działają bez zmian — poza
poświadczeniem rodzaju, którego dany produkt nigdy nie odczytuje, co
jest teraz błędem (zobacz Naprawiono).

### Dodano

- **[`enodia cve update`](/pl/cve/#enodia-cve-update)** pobiera bazy
  CVE wskazane przez każde skonfigurowane `cve.*.path` — BDU, NVD
  (bieżący rok, poprzedni rok i brakujące lata; `--all-years` dla
  wszystkich), Debian, OVAL i Alpine (wydania już obecne na dysku, te,
  których potrzebują inwentarze z `--from`, `--oval`/`--alpine`),
  MariaDB, Atlassian, PostgreSQL (`--postgresql` dla stron
  poszczególnych wersji głównych) i nginx. If-Modified-Since; pobrany
  plik zastępuje poprzedni dopiero po pomyślnym wczytaniu. TLS jest
  weryfikowane względem certyfikatów głównych systemu oraz
  `cve.update.ca_file` i `cve.update.ca_dir` albo wcale przy
  `cve.update.tls_skip_verify`. Żadne inne polecenie nadal niczego nie
  pobiera.
- **27 nowych sond:**
  - [`splunk`](/pl/configuration/products/splunk/) — API zarządzania splunkd na porcie 8089, Basic lub token Splunk.
  - [`code-server`](/pl/configuration/products/code-server/) — `codeServerVersion` ze strony logowania.
  - [`phpipam`](/pl/configuration/products/phpipam/) — stopka strony logowania i wersja zasobów.
  - [`domainmod`](/pl/configuration/products/domainmod/) — CHANGELOG w katalogu głównym aplikacji webowej.
  - [`netdata`](/pl/configuration/products/netdata/) — anonimowe `/api/v1/info` agenta.
  - [`libretranslate`](/pl/configuration/products/libretranslate/) — publiczny dokument OpenAPI `/spec`.
  - [`torrserver`](/pl/configuration/products/torrserver/) — `/echo`.
  - [`kafka`](/pl/configuration/products/kafka/) — wersja brokera przez SSH z jego własnego pliku jar, opcjonalnie w kontenerze; kompilacje Confluent Platform są zgłaszane jako `confluent` wraz z linią Apache Kafka, którą zawierają.
  - [`home-assistant`](/pl/configuration/products/home-assistant/) — `/api/config` z długoterminowym tokenem dostępu, `kind: bearer`.
  - [`openhab`](/pl/configuration/products/openhab/) — anonimowy katalog główny REST `/rest/`.
  - [`doxygen`](/pl/configuration/products/doxygen/) — która wersja Doxygen wygenerowała witrynę dokumentacji, na podstawie jej znacznika generatora.
  - [`qbittorrent`](/pl/configuration/products/qbittorrent/) — API Web UI po zalogowaniu przez formularz, `kind: password`.
  - [`netbox`](/pl/configuration/products/netbox/) — `data-netbox-version` z anonimowej strony logowania.
  - [`greenbone`](/pl/configuration/products/greenbone/) — (aliasy `openvas`, `gsad`) wersja gsad z jego odpowiedzi `/gmp`, bez uwierzytelniania.
  - [`posthog`](/pl/configuration/products/posthog/) — commit git samodzielnie hostowanego PostHog z jego anonimowej strony logowania.
  - [`uptime-kuma`](/pl/configuration/products/uptime-kuma/) — loguje się przez API socket.io Uptime Kuma (`kind: password`) i odczytuje wersję wysyłaną po zalogowaniu.
  - [`wapt`](/pl/configuration/products/wapt/) — anonimowe `/ping` serwera WAPT.
  - [`minio`](/pl/configuration/products/minio/) — `minio --version` przez SSH, opcjonalnie w kontenerze; nazwy `RELEASE.<timestamp>` MinIO są teraz porównywane jako wersje.
  - [`sentry`](/pl/configuration/products/sentry/) — wersja samodzielnie hostowanego Sentry z jego anonimowej strony logowania.
  - [`zookeeper`](/pl/configuration/products/zookeeper/) — czteroliterowe polecenie `srvr`.
  - [`ghost`](/pl/configuration/products/ghost/) — anonimowe `/ghost/api/admin/site/`, które podaje major.minor.
  - [`onlyoffice`](/pl/configuration/products/onlyoffice/) — oraz [`euro-office`](/pl/configuration/products/euro-office/): ONLYOFFICE Docs i jego fork Euro-Office, odczytywane anonimowo z `/index.html` serwera dokumentów; serwer drugiej marki jest odrzucany ze wskazaniem produktu, którego należy użyć.
  - [`weblate`](/pl/configuration/products/weblate/) — anonimowa stopka „Powered by Weblate”.
  - [`memcached`](/pl/configuration/products/memcached/) — polecenie `version` protokołu tekstowego, bez poświadczeń.
  - [`rabbitmq`](/pl/configuration/products/rabbitmq/) — `/api/overview` wtyczki zarządzania, `kind: basic`.
  - [`cassandra`](/pl/configuration/products/cassandra/) — `release_version` przez natywny protokół CQL v4, `kind: password`, gdy klaster używa PasswordAuthenticator.
- **CVE dla celów [`mariadb`](/pl/configuration/products/mariadb/).**
  BDU i NVD obejmują teraz MariaDB, a nowe `cve.mariadb.path` odczytuje
  własną tabelę naprawionych CVE MariaDB (`community-server.md`), która
  zna wydanie z poprawką dla każdej serii. Tam, gdzie tabela MariaDB zna
  dane CVE, jej werdykt zastępuje otwarte zakresy BDU i NVD, więc
  najnowsze wydanie utrzymywanej serii nie jest już oznaczane CVE
  naprawionymi wyłącznie w nowszych seriach — zobacz
  [Własne dane dostawców](/pl/cve/#własne-dane-dostawców).
- **`cve.atlassian.path`**: własne dane CVE Atlassian dla poszczególnych
  wydań `jira`, `confluence`, `bitbucket` i `bamboo`, łącznie z CVE
  zależności zewnętrznych. Oceniane w obrębie każdej gałęzi; dla
  wydania, które Atlassian wymienia, rozstrzyga jego werdykt — zobacz
  [Atlassian](/pl/cve/#atlassian).
- **`cve.postgresql.path` i `cve.nginx.path`**: własne strony
  bezpieczeństwa projektów, z wydaniem z poprawką dla każdej gałęzi.
  Bieżące wydania PostgreSQL 17/16/15/14 i nginx 1.30.5 nie pokazują już
  zakresów BDU bez podziału na gałęzie — zobacz
  [PostgreSQL](/pl/cve/#postgresql) i [nginx](/pl/cve/#nginx).
- **CVE dla 24 kolejnych produktów**: cassandra, code-server, domainmod,
  doxygen, ghost, greenbone, home-assistant, kafka, memcached, minio,
  netbox, netdata, onlyoffice, openhab, pfsense, phpipam, qbittorrent,
  rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate, zookeeper. Wersje
  MinIO w postaci znaczników czasu są porównywalne; pfSense CE i Splunk
  Enterprise pomijają zakresy innych edycji; kompilacje Confluent Kafka
  nie są wyszukiwane.
- **CVE dla [`hp-ilo4`](/pl/configuration/products/hp-ilo4/),
  [`dell-idrac`](/pl/configuration/products/dell-idrac/)
  i [`synology-dsm`](/pl/configuration/products/synology-dsm/).** iDRAC
  jest dopasowywany według generacji, odczytywanej z modelu Redfish; DSM
  porównuje wersję, kompilację i Update (`7.2.1-69057-6`), a sonda
  zapisuje teraz Update w `extra.update` — zobacz
  [Dell iDRAC i Synology DSM](/pl/cve/#dell-idrac-i-synology-dsm).
  Łącznie dopasowywanych jest teraz 91 ze 123 produktów — zobacz,
  [które produkty są dopasowywane](/pl/cve/#które-produkty-są-dopasowywane).
- Strona [Prywatność](/pl/privacy/): z czym łączy się enodia (własne
  cele, endoflife.date, API GitHub — wyłącznie nazwy produktów
  i repozytoriów — oraz, wyłącznie przy `enodia cve update`, wydawcy baz
  CVE) i co przechowuje (wyłącznie własne pliki użytkownika i lokalną
  pamięć podręczną). Bez telemetrii.

### Zmieniono

- Resolver `github` pomija wydania, których tag wskazuje na wersję
  przedpremierową (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`), nawet
  gdy GitHub ich tak nie oznacza; odczytuje jako wersje tagi zapisane
  z podkreśleniami (`Release_1_18_0`) i z prefiksem `release-`
  (`release-5.2.4`); a także usuwa z tagów początkowe `<repo>-`/`<repo>_`,
  więc `weblate-2026.10` jest odczytywane jako `2026.10` — zobacz
  [Obsługiwane produkty](/pl/products/).
- [`teamcity`](/pl/configuration/products/teamcity/) działa bez
  poświadczeń: gdy żadnych nie skonfigurowano, odczytuje anonimowy
  `/app/rest/server/version`, dostępny w każdym sprawdzonym TeamCity od
  2017.2 do 2026.1, nawet przy wyłączonym logowaniu gościa. Token nadal
  wybiera `/app/rest/server`, tak jak wcześniej.

### Naprawiono

- CVE [`jenkins`](/pl/configuration/products/jenkins/): naprawione
  wydanie LTS nie jest już oznaczane przez zakres weekly tej samej
  poprawki (LTS 2.568.3 przez „before 2.580”). Zakresy weekly i LTS
  dotyczą teraz wyłącznie własnej linii wydań.
- Resolver `github` nie kończy się już błędem w repozytoriach, których
  lista wydań przekracza 1 MiB (lista minio/minio ma 3,4 MB): teraz
  odczytuje do 8 MiB.
- **Poświadczenie rodzaju, którego dany produkt nigdy nie wysyła, jest
  teraz błędem konfiguracji**, zamiast być po cichu pomijane.
  `kind: password` przy produkcie HTTP (RouterOS, Harbor, …) powodowało
  wysłanie żądania w ogóle bez nagłówka `Authorization`; `config validate`
  podaje teraz rodzaje, które produkt przyjmuje — dla logowania webowego
  jest to `kind: basic`. **Przed aktualizacją należy sprawdzić
  konfigurację**: uruchomienie z takim poświadczeniem teraz odmawia
  startu. Zobacz [Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## 2.1.1+0 — 2026-10-08

### Naprawiono

- MariaDB 11.0+ nie maskuje już swojej wersji prefiksem `5.5.5-`
  (`11.4.9-MariaDB-…`), więc [`mysql`](/pl/configuration/products/mysql/)
  zapisywała takie serwery jako MySQL, a
  [`mariadb`](/pl/configuration/products/mariadb/) je odrzucała. Teraz
  obie sondy rozpoznają MariaDB w każdej z dwóch postaci. Cel
  `product: mysql` wskazujący na MariaDB 11.0+ kończy się teraz błędem —
  należy przełączyć go na `product: mariadb`.

## 2.1.0+0 — 2026-10-01

Korelacja CVE schodzi do poziomu zainstalowanych pakietów w dziesięciu
dystrybucjach Linuksa, a do tego dochodzi sześć nowych sond. Nic się nie
psuje: nowe klucze `cve:` są opcjonalne, a inwentarze zyskują jedynie
pola opcjonalne, więc konfiguracje i inwentarze z 2.0 działają bez
zmian.

### Dodano

- **[CVE na poziomie pakietów dla dystrybucji Linuksa](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).**
  Sondy systemów operacyjnych w swoim jednym przebiegu SSH odczytują
  teraz również zainstalowane pakiety i działające jądro, a własne dane
  bezpieczeństwa każdej dystrybucji są dopasowywane według pakietów.
  Każde źródło to plik pobierany samodzielnie, tak jak BDU i NVD:
  - `cve.debian.path` — JSON z Debian Security Tracker, dla
    [`debian`](/pl/configuration/products/debian/).
  - `cve.oval.path` — pliki OVAL dostawców, po jednym na wydanie, dla
    [`ubuntu`](/pl/configuration/products/ubuntu/),
    [`linuxmint`](/pl/configuration/products/linuxmint/) (przez jego bazę
    Ubuntu), [`rhel`](/pl/configuration/products/rhel/),
    [`rocky-linux`](/pl/configuration/products/rocky-linux/) (względem
    pliku Red Hata — własny plik Rocky jest odrzucany jako bezużyteczny),
    [`almalinux`](/pl/configuration/products/almalinux/),
    [`oracle-linux`](/pl/configuration/products/oracle-linux/),
    [`astra-linux`](/pl/configuration/products/astra-linux/) (SE 1.7/1.8)
    i [`redos`](/pl/configuration/products/redos/) (7.3/8.0). Sparsowany
    OVAL jest buforowany tak jak BDU i NVD.
  - `cve.alpine.path` — secdb Alpine, dla
    [`alpine-linux`](/pl/configuration/products/alpine-linux/).
- Zgłaszane są tylko CVE, dla których istnieje już poprawka nowsza niż
  zainstalowana wersja — czyli to, co zamknęłaby aktualizacja (a w
  przypadku jądra — ponowne uruchomienie). Jedno znalezisko na pakiet,
  z linkiem do biuletynu zawierającego poprawkę (USN, RHSA, ALSA, ELSA,
  biuletyn Astra, ROS, strona trackera Debiana/Alpine), ze wszystkimi
  CVE zwiniętymi pod nim w raporcie HTML.
- Dopasowanie stosuje własne reguły każdego menedżera pakietów: porządek
  wersji dpkg, rpm i apk, strumienie modułów AppStream, architekturę
  Oracle, warianty FIPS i Ksplice oraz działające jądro, a nie te
  pakiety jądra, które akurat są zainstalowane. Każde źródło zostało
  porównane z narzędziem referencyjnym (`oscap oval eval`,
  `dnf updateinfo`, python3-apt, `apk version -t`) na prawdziwych
  kontenerach, z identycznymi wynikami.
- Nowe sondy: [`mariadb`](/pl/configuration/products/mariadb/),
  [`pfsense`](/pl/configuration/products/pfsense/) (Community Edition,
  przez SSH), [`supermicro-bmc`](/pl/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/pl/configuration/products/dell-idrac/) i
  [`hp-ilo4`](/pl/configuration/products/hp-ilo4/) (przez Redfish) oraz
  [`freeradius`](/pl/configuration/products/freeradius/) (przez SSH,
  z `options.container` dla FreeRADIUS w Dockerze lub Podmanie). Łącznie
  96 sond.
- Resolver `github-tag-branches`: jeden cykl życia na każde major.minor
  na podstawie tagów GitHuba, dla projektów utrzymujących jednocześnie
  kilka gałęzi (FreeRADIUS 3.0.x i 3.2.x).
- FreeRADIUS jest dopasowywany zarówno w NVD, jak i w BDU.

### Naprawiono

- Skrót VMware „8.0 U3k” w kalendarzu cyklu życia jest teraz równy
  „8.0.3”: załatany host [vCenter](/pl/configuration/products/vcenter/)
  lub [ESXi](/pl/configuration/products/esxi/) 8.0 nie wyświetla się już
  jako `ahead`.
- Kolumny LATEST/CYCLE pokazują oczyszczone wersje dla produktów
  rozwiązywanych przez GitHub, a nie surowy tag (`2026.9.1`, a nie
  `v2026.9.1`).
- `config validate` zgłasza brakujący plik `cve.*.path`, zamiast przejść
  pomyślnie i zawieść później w `check`.

### Uwagi

- Host [Proxmox VE](/pl/configuration/products/proxmox/) otrzymuje
  znaleziska pakietów jako drugi cel SSH `debian`, obok celu API
  `proxmox`; pakiet `linux` Debiana jest dopasowywany tylko do
  działającego jądra Debiana, więc własne jądro Proxmoksa nie zostanie
  z nim pomylone.
- Przy wszystkich źródłach skonfigurowanych jednocześnie (BDU, NVD,
  Debian, osiem plików OVAL, Alpine) `check` trwał ~22 s na zimno
  i ~3,4 s na ciepło, przy szczytowym zużyciu ~0,5–0,6 GB — mniej, jeśli
  `cve.oval.path` zawiera tylko faktycznie używane wydania.
- Historia repozytorium została przepisana i ponownie podpisana, aby
  usunąć wewnętrzne nazwy hostów; każdy tag utworzono ponownie na
  przepisanej historii. Pliki binarne wydań do 2.0.0+0 włącznie zgłaszają
  hashe commitów sprzed przepisania.
- MariaDB, pfSense i sondy BMC nie mają jeszcze mapowania CVE.

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
  [jak je pobrać](/pl/cve/#pobieranie-baz-danych),
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
