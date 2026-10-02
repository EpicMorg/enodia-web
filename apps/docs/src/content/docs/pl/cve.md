---
title: Korelacja CVE
description: Dopasowywanie każdej wykrytej wersji do BDU FSTEC i NIST NVD, a zainstalowanych pakietów hostów z Linuksem do własnych danych bezpieczeństwa ich dostawców — na podstawie samodzielnie pobranych plików.
---

Od wersji 2.0 enodia potrafi wskazać, które znane podatności dotyczą
dokładnie tej wersji, którą zgłasza każdy cel — obok osi
poprawki/cyklu życia/gałęzi, a nie zamiast nich. Dopasowanie odbywa się
względem dwóch publicznych baz danych:

- **BDU FSTEC** — baza podatności FSTEC (Rosja),
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — amerykańska National Vulnerability Database,
  [nvd.nist.gov](https://nvd.nist.gov/).

Każda z nich działa samodzielnie; przy skonfigurowaniu obu ich
znaleziska są scalane według CVE.

Od wersji 2.1 dziesięć dystrybucji Linuksa jest ponadto dopasowywanych
**według zainstalowanych pakietów** do własnych danych bezpieczeństwa ich
dostawców — Debian Security Tracker, plików OVAL dostawców i secdb
Alpine (zobacz
[CVE na poziomie pakietów dla dystrybucji Linuksa](#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa)).

Wszystko to jest opcjonalne: konfiguracja bez bloku `cve:` zachowuje się
dokładnie tak jak w 1.x, a każde źródło działa samodzielnie.

## enodia nigdy sama nie pobiera baz danych

Pliki pobiera się samodzielnie, samodzielnie decyduje się, kiedy je
odświeżyć, i wskazuje je enodia. enodia nie ma żadnej ścieżki kodu, która
sama łączyłaby się z którymkolwiek z tych źródeł — to to samo
rozumowanie dotyczące sieci zamkniętej co w przypadku
[architektury dwufazowej](/pl/concepts/#dwie-fazy-celowo-rozdzielne):
maszyna uruchamiająca `check` nie potrzebuje dostępu do internetu do
dopasowywania CVE, a jedynie kopii plików.

### BDU FSTEC

Jeden plik, pełny eksport FSTEC (około 33 MB po spakowaniu):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

bdu.fstec.ru używa certyfikatu z rosyjskiego krajowego CA (Mincyfry),
którego nie ma w typowych systemowych magazynach zaufania — zwykły
`curl` kończy się błędem certyfikatu. Serwer nie wysyła też swojego
certyfikatu pośredniego, a `curl` (w przeciwieństwie do przeglądarki)
nie pobierze brakującego certyfikatu sam, więc zainstalowanie samego
certyfikatu głównego nie wystarczy. Należy zbudować pakiet z certyfikatu
głównego i certyfikatu pośredniego wskazanego w certyfikacie witryny:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Sprawdzone na żywo 2026-09-23. Jeśli przestanie działać, certyfikat
pośredni najprawdopodobniej został wymieniony: aktualny wskazuje pole
*Authority Information Access* samego certyfikatu witryny (`openssl
s_client -connect bdu.fstec.ru:443 | openssl x509 -noout -ext
authorityInfoAccess`). `curl -k` również pobierze plik, ale pominie
weryfikację tego, co za chwilę trafi do raportu bezpieczeństwa.

### NIST NVD

Jeden plik na rok, `nvdcve-2.0-<year>.json.gz`, od 2002 do bieżącego
roku. Potrzebne pliki należy umieścić w jednym katalogu:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

Plik bieżącego roku jest aktualizowany codziennie; starsze lata zmieniają
się rzadko. Każdy plik ma towarzyszący plik `.meta`
(`nvdcve-2.0-<year>.meta`) z rozmiarem i `sha256` — należy pamiętać, że
skrót dotyczy *nieskompresowanego* JSON-a, a nie pliku `.gz`.

### Debian Security Tracker

Jeden plik, pełny eksport JSON trackera (około 80 MB), dla celów
`debian`:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

Działają również kopie `.json.gz` i `.json.zip`.

### OVAL dostawców

Jeden plik na każde wydanie dystrybucji we flocie, wszystkie w jednym
katalogu, dla celów `ubuntu`, `linuxmint`, `rhel`, `rocky-linux`,
`almalinux`, `oracle-linux`, `astra-linux` i `redos`:

| Cele | Plik |
|---|---|
| Ubuntu, Linux Mint (jego baza Ubuntu) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **i Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
| AlmaLinux | `https://security.almalinux.org/oval/org.almalinux.alsa-<N>.xml.bz2` |
| Oracle Linux | `https://linux.oracle.com/security/oval/com.oracle.elsa-ol<N>.xml.bz2` |
| Astra Linux SE 1.7, 1.8 | `https://dl.astralinux.ru/astra/oval/<1.7\|1.8>_x86-64/oval-definitions-alse-<1.7\|1.8>.xml` |
| RED OS 7.3, 8.0 | `https://redos.red-soft.ru/support/secure/<7.3\|8.0>/redos.xml` |

```bash
mkdir -p /var/lib/enodia/cve/oval && cd /var/lib/enodia/cve/oval
curl -fsSLO https://security-metadata.canonical.com/oval/com.ubuntu.noble.usn.oval.xml.bz2
curl -fsSLO https://security.access.redhat.com/data/oval/v2/RHEL9/rhel-9.oval.xml.bz2
curl -fsSL -o redos-8.0.xml https://redos.red-soft.ru/support/secure/8.0/redos.xml
```

Pliki są przyjmowane w opublikowanej postaci, `.xml` lub `.xml.bz2`. To,
którego wydania dotyczy plik, jest odczytywane z jego zawartości, nigdy
z nazwy — dlatego dwa pliki RED OS, oba publikowane jako `redos.xml`,
wymagają jedynie różnych nazw na dysku. Dwa pliki są celowo odrzucane,
z błędem wskazującym plik, którego należy użyć zamiast nich:

- **Własny OVAL Rocky Linux** (`org.rockylinux.rlsa-<N>.xml`) — zawiera
  niewielki ułamek biuletynów Rocky i nie przechodzi walidacji schematu
  OVAL. Rocky przebudowuje pakiety Red Hata z tymi samymi wersjami,
  więc hosty Rocky są dopasowywane do pliku Red Hata.
- **Wariant `oci.` Ubuntu** — sprawdza plik statusu dpkg wyrażeniami
  regularnymi zamiast pakietów.

Wszystkie adresy URL sprawdzono na żywo 2026-10-02.

### Secdb Alpine

Dwa pliki na każdą gałąź Alpine we flocie, `main` i `community`, dla
celów `alpine-linux`. Mają takie same nazwy we wszystkich gałęziach,
więc należy je zapisać pod różnymi nazwami:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

## Konfiguracja

Blok `cve:` w `enodia.yaml` — nie w `settings.yaml`, ponieważ zmienia
on ocenę, a nie tylko sposób wyświetlania:

```yaml title="enodia.yaml"
schemaVersion: 1
cve:
  bdu:
    path: /var/lib/enodia/cve/bdu/vulxml.zip
  nvd:
    path: /var/lib/enodia/cve/nvd
  debian:
    path: /var/lib/enodia/cve/debian.json
  oval:
    path: /var/lib/enodia/cve/oval
  alpine:
    path: /var/lib/enodia/cve/alpine
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Pole | Przyjmuje |
|---|---|
| `cve.bdu.path` | plik `.xml`, `.zip` (eksport w opublikowanej postaci) lub `.tar.gz`/`.tgz` |
| `cve.nvd.path` | pojedynczy plik `.json`, `.json.gz` lub `.json.zip` albo katalog takich plików |
| `cve.debian.path` | eksport trackera: `.json`, `.json.gz` lub `.json.zip` |
| `cve.oval.path` | jeden plik OVAL (`.xml` lub `.xml.bz2`) albo katalog takich plików |
| `cve.alpine.path` | jeden plik secdb `.json` albo katalog takich plików |

Ścieżki względne są rozwiązywane względem katalogu pliku
konfiguracyjnego, który je wskazuje, tak samo jak `credentials_file`.
Blok jest odczytywany z konfiguracji faktycznie używanej w danym
uruchomieniu — `--config`, `$ENODIA_CONFIG` lub
[domyślnych ścieżek wyszukiwania](/pl/configuration/#lokalizacje-plików).
Dotyczy to także `check --from inventory.jsonl`: inwentarz zebrany
wewnątrz sieci zamkniętej jest korelowany tam, gdzie uruchamiany jest
`check`, o ile zostanie tam znaleziona konfiguracja z blokiem `cve:`.
Gdy nie uda się znaleźć żadnej konfiguracji, `check --from` nadal działa,
tylko bez CVE.

**Skonfigurowana ścieżka, która nie istnieje, jest błędem**, a nie
cichym pominięciem — `check` kończy działanie z `stat ...: no such file
or directory`, zamiast wygenerować raport, w którym po cichu brakuje
CVE. Od wersji 2.1 `enodia config validate` również sprawdza, czy każda
skonfigurowana ścieżka istnieje, więc literówka ujawnia się już tam. To,
czy plik faktycznie daje się sparsować, nadal wychodzi na jaw dopiero
wtedy, gdy uruchomienie go wczytuje.

:::caution[Ścieżki w systemie Windows]
Ścieżkę Windows należy zapisać bez cudzysłowów, w pojedynczych
cudzysłowach, z ukośnikami zwykłymi lub jako ścieżkę UNC. W
**podwójnych** cudzysłowach YAML `\t` i `\n` stają się tabulatorem
i znakiem nowego wiersza — `"C:\tmp\bdu.zip"` po cichu wskazywałoby
gdzie indziej, dlatego enodia odrzuca przy wczytywaniu ścieżkę
zawierającą znak sterujący, podając wskazówkę.
:::

## Pierwsze uruchomienie i pamięć podręczna

BDU i NVD są parsowane strumieniowo, a wynik jest buforowany
w katalogu pamięci podręcznej systemu (`$XDG_CACHE_HOME/enodia/cve`,
czyli domyślnie `~/.cache/enodia/cve` w Linuksie;
`~/Library/Caches/enodia/cve` w macOS; `%LocalAppData%\enodia\cve`
w Windows). Pierwsze uruchomienie po zmianie pliku parsuje go
w całości — około minuty dla całego NVD i BDU; zmierzone 2026-09-23 dla
BDU z samym plikiem NVD za 2026 rok: 25 s. Każde kolejne uruchomienie
czyta pamięć podręczną: 0,2 s dla tych samych danych, pamięć podręczna
11 MB. Nie ma TTL — pamięć podręczna jest kluczowana samymi plikami
(rozmiarem i czasem modyfikacji) oraz własnymi tabelami produktów
enodia, więc podmiana pliku, dodanie roku do katalogu NVD lub
aktualizacja enodia same z siebie wywołują przebudowę.

Sparsowany OVAL jest buforowany w ten sam sposób — około 11 s na
sparsowanie łącznie plików Ubuntu noble, RHEL 9, AlmaLinux 9 i Oracle
Linux 9, w większości na dekompresję bzip2. Eksport trackera Debiana
(około sekundy parsowania) i secdb Alpine (kilkaset KB) nie są
buforowane. Przy wszystkich źródłach skonfigurowanych jednocześnie (BDU,
NVD, Debian, osiem plików OVAL, Alpine) upstream zmierzył `check` na
około 22 s na zimno i 3,4 s na ciepło, przy szczytowym zużyciu
0,5–0,6 GB pamięci — mniej, jeśli `cve.oval.path` zawiera tylko
faktycznie używane wydania.

`enodia serve` odczytuje ponownie blok `cve:` i pliki w każdym cyklu
`--interval` (tanio, z pamięci podręcznej), więc podmiana plików
z crona działa bez restartu serwera.

## Gdzie pojawiają się znaleziska

- **`check`** — kolumna `CVES` w [widokach `compact`
  i `drift`](/pl/views/): liczba różnych CVE dotyczących dokładnie tej
  wersji. `-` oznacza brak znalezisk — żadne nie dotyczą tej wersji, nie
  ma bloku `cve:` albo enodia nie dopasowuje produktu (zobacz niżej);
  sama kolumna jest zawsze obecna. `lifecycle` i `fleet` nie mają tej
  kolumny.
- **`export --format html`** — ta sama kolumna z linkiem informacyjnym
  otwierającym listę dla danego celu: jeden wiersz na CVE, od
  najpoważniejszego, z linkami do NVD, cve.org oraz — dla znalezisk
  z BDU — strony bdu.fstec.ru; rosyjski tekst BDU, jeśli BDU zawiera
  dane CVE, a w przeciwnym razie angielski opis NVD; a także ocena
  w postaci kolorowych plakietek, np. `CRITICAL · CVSS 3.1 9.8`.
  Znaleziska na poziomie pakietów to zamiast tego jeden wiersz na
  pakiet — `linux 6.12.107-1 → 6.12.111-1`, z linkiem do biuletynu
  zawierającego poprawkę i zwiniętą pod spodem listą CVE. To czysty
  CSS — domyślny raport offline nadal nie zawiera w ogóle JavaScriptu.
- **`export --format json`** — każde znalezisko z każdego źródła
  w całości, w tablicy `cves` każdej oceny: źródło (`bdu`/`nvd`),
  identyfikator biuletynu, identyfikatory CVE, tytuł, własny tekst
  ważności ze źródła, dopasowana nazwa produktu lub CPE, zakres wersji
  i sparsowana ocena CVSS. W przeciwieństwie do tabeli i listy HTML,
  które liczą jeden wiersz na CVE, JSON zachowuje znalezisko każdego
  źródła osobno — to samo CVE może pojawić się raz z BDU i raz na każde
  pasujące CPE z NVD. Znaleziska na poziomie pakietów (źródło
  `debian`, `oval` lub `alpine`) zawierają też wersję zainstalowaną
  i wersję z poprawką — zobacz [Raporty](/pl/reporting/#--format-json).
- **`export --format prometheus`** — brak danych CVE.

**CVE nie wpływają na ważność ani na kod wyjścia.** `SEVERITY` jest
nadal wyliczane wyłącznie z osi poprawki/cyklu życia/gałęzi, a
`--fail-on` również zna tylko te trzy osie — znalezisko to fakt do
przejrzenia, a nie werdykt wydany przez enodia w imieniu użytkownika.
To, czy i jak CVE powinno podnosić ważność, pozostaje otwartą kwestią
w projekcie upstream.

## Które produkty są dopasowywane

63 z 96 produktów: 53 według nazwy produktu w BDU i NVD, przy czym nazwa
producenta/produktu każdego z nich została dosłownie sprawdzona
w prawdziwych pełnych eksportach, oraz 10 dystrybucji Linuksa według
zainstalowanych pakietów (zobacz następną sekcję). Źródła dla danego
produktu podaje jego własna strona w sekcji
[Konfiguracja produktów](/pl/products/).

Niedopasowywane, każde z konkretnego powodu:

- **Pozostałe dystrybucje Linuksa ogólnego przeznaczenia** (Fedora,
  CentOS Stream, Amazon Linux, openSUSE, …) — ich CVE to podatności
  pakietów, numer wydania nie mówi, które pakiety zostały od tego czasu
  załatane, a źródła na poziomie pakietów dla nich jeszcze nie ma.
- **Systemy BSD i Oracle Solaris** — NVD zapisuje ich poziomy poprawek
  (`-p5` we FreeBSD, errata OpenBSD) w polu CPE, którego ten mechanizm
  dopasowujący nie odczytuje; dopasowanie po samym wydaniu oznaczyłoby
  w pełni załatany host każdym CVE, jakie kiedykolwiek naprawiono w tym
  wydaniu.
- **ESXi i vCenter** — ten sam problem: niemal wszystkie ich wpisy to
  literały w stylu `7.0` + `update_1`.
- **Synology DSM** — granice w rodzaju `6.2.4-25556-3`, które ścisły
  parser zakresów odrzuca.
- **TrueNAS** — zbyt mało wpisów, wersjonowanych inaczej niż to, co
  zgłasza sonda.
- **Brak użytecznych danych w obu źródłach** — Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm.
- **`generic`** — ręcznie napisany parser nie ma tożsamości produktu,
  którą można by wyszukać.
- **Jeszcze niezmapowane** — MariaDB, pfSense i trzy sondy BMC
  (Supermicro, Dell iDRAC, HP iLO 4), wszystkie nowe w 2.1. Upstream
  odłożył ich mapowanie CVE na późniejszy, osobny etap.

## CVE na poziomie pakietów dla dystrybucji Linuksa

Numer wydania nie mówi, które pakiety na hoście zostały od tego czasu
załatane, dlatego te dziesięć dystrybucji jest zamiast tego
dopasowywanych według zainstalowanych pakietów. Ich sondy odczytują
zainstalowane pakiety i działające jądro w tym samym przebiegu SSH co
samą wersję, a każdy pakiet jest sprawdzany względem własnych danych
bezpieczeństwa danej dystrybucji:

| Sonda | Źródło | Klucz |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | OVAL Canonical | `cve.oval.path` |
| `linuxmint` | OVAL Canonical, dla jego bazy Ubuntu | `cve.oval.path` |
| `rhel`, `rocky-linux` | OVAL Red Hat | `cve.oval.path` |
| `almalinux` | OVAL AlmaLinux | `cve.oval.path` |
| `oracle-linux` | OVAL Oracle | `cve.oval.path` |
| `astra-linux` | OVAL Astra Linux (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | OVAL RED OS (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | Secdb Alpine | `cve.alpine.path` |

**Zgłaszane są tylko CVE, dla których istnieje już poprawka nowsza niż
zainstalowana wersja** — czyli to, co zamknęłaby aktualizacja (a w
przypadku jądra — ponowne uruchomienie). CVE, których dostawca jeszcze
nie naprawił, są pomijane: są takie same na każdym hoście danego
wydania i nikt nie może nic z nimi zrobić, więc przysłoniłyby te, na
które można zareagować.

**Jedno znalezisko na pakiet, a nie na CVE.** Samo zaległe jądro może
nieść ponad tysiąc CVE; lista według CVE byłaby nieczytelna. Każde
znalezisko podaje pakiet, jego zainstalowaną wersję, wersję zamykającą
wszystkie jego CVE oraz biuletyn zawierający tę poprawkę (USN, RHSA,
ALSA, ELSA, biuletyn Astra, ROS albo stronę trackera Debiana/Alpine).
Kolumna `CVES` nadal liczy CVE, a nie pakiety.

**Wersje są porównywane według reguł danego menedżera pakietów** —
porządku dpkg, rpm i apk, sprawdzonego w upstream względem `apt_pkg`,
rpm i apk-tools na tysiącach prawdziwych par wersji dla każdego z nich —
z uwzględnieniem strumieni modułów AppStream (pakiet jest dopasowywany
tylko do poprawek z własnego strumienia), architektury Oracle Linux,
wariantów FIPS i Ksplice oraz **działającego** jądra, a nie tych
pakietów jądra, które akurat są zainstalowane. Każde źródło zostało
w upstream porównane z `oscap oval eval`, `dnf updateinfo`, python3-apt
lub `apk version -t` na prawdziwych hostach i kontenerach, z identycznymi
wynikami.

**Proxmox VE** otrzymuje znaleziska pakietów jako drugi cel: cel SSH
[`debian`](/pl/configuration/products/debian/) na tym samym hoście, obok
celu API [`proxmox`](/pl/configuration/products/proxmox/). Pakiet
`linux` Debiana jest dopasowywany tylko do działającego jądra Debiana,
więc własne jądro Proxmoksa nie zostanie z nim pomylone.

### Dopasowywanie z uwzględnieniem edycji

GitLab, HashiCorp Vault, Nextcloud i MongoDB publikują osobne listy CVE
dla edycji community i enterprise. Ich sondy zapisują edycję zgłaszaną
przez serwer w `extra.enterprise`, a instancja community nie widzi już
znalezisk dotyczących wyłącznie wersji enterprise — na prawdziwych
danych GitLab 19.2.2 CE widzi 4 z 9 znalezisk NVD, Nextcloud 27.1.3 CE —
11 z 23. Gdy edycja jest nieznana (starszy serwer, który jej nie
zgłasza), zachowywane są wszystkie znaleziska.

### SSH

Sonda [`ssh`](/pl/configuration/products/ssh/) obejmuje dowolną
implementację SSH, więc dopasowanie odbywa się po banerze: `OpenSSH_…`
wyszukuje OpenSSH, `dropbear_…` wyszukuje Dropbear, a każdy inny stos
SSH nie jest wyszukiwany wcale, zamiast pożyczać CVE OpenSSH.

## Znane ograniczenia

- **BDU może zgłaszać nadmiarowo między gałęziami.** Jeden wpis BDU
  często wymienia osobny zakres dla każdej gałęzi utrzymaniowej,
  wszystkie z tą samą dolną granicą, więc wersja, która jest już
  poprawką w swojej gałęzi, może nadal mieścić się w szerszym zakresie
  gałęzi sąsiedniej (udokumentowanym przykładem jest Confluence 8.3.3
  względem CVE-2023-22515). Zakresy NVD dla tego samego CVE mają własne
  dolne granice i nie mają tego problemu. enodia celowo woli zgłosić
  znalezisko do ponownego sprawdzenia, niż po cichu przeoczyć prawdziwe.
- **Wpisy NVD bez żadnego ograniczenia wersji są pomijane.** Pomiary na
  pełnych eksportach pokazały, że były to niemal wyłącznie CVE sprzed
  dziesięcioleci przypisane do bieżących wydań; kosztem jest rzadkie,
  naprawdę nienaprawione CVE zapisane w ten sposób.
- **Pokrycie na poziomie pakietów ma własne luki.** Tracker Debiana
  obejmuje tylko wydania nadal wspierane przez zespół bezpieczeństwa
  Debiana (bookworm, trixie, testing, sid) — starsze hosty nie otrzymują
  znalezisk pakietów. Alpine edge nie ma numerowanej gałęzi i również
  ich nie otrzymuje. OVAL nie jest oceniany jak przez pełny interpreter:
  klucze podpisujące pakiety nie są sprawdzane, więc pakiet zewnętrzny
  o nazwie pakietu dystrybucji jest porównywany tak, jakby pochodził
  z dystrybucji. Pakiety jądra Astra Linux są porównywane jako
  zainstalowane, a nie jako działające.
- **Warunki wieloproduktowe NVD** („podatne tylko z biblioteką Y”) nie
  są oceniane — sonda zgłasza jeden produkt na cel, więc każdy podatny
  wpis dla dopasowanego produktu liczy się samodzielnie.
