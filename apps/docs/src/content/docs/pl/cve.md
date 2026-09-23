---
title: Korelacja CVE
description: Dopasowywanie każdej wykrytej wersji do BDU FSTEC i NIST NVD na podstawie samodzielnie pobranych plików.
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
znaleziska są scalane według CVE. Funkcja jest całkowicie opcjonalna:
konfiguracja bez bloku `cve:` zachowuje się dokładnie tak jak w 1.x.

## enodia nigdy sama nie pobiera baz danych

Pliki pobiera się samodzielnie, samodzielnie decyduje się, kiedy je
odświeżyć, i wskazuje je enodia. enodia nie ma żadnej ścieżki kodu, która
sama łączyłaby się z bdu.fstec.ru lub nvd.nist.gov — to to samo
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
CVE. `enodia config validate` sprawdza kształt bloku (w tym opisaną niżej
kontrolę znaków sterujących), ale nie to, czy pliki istnieją — jest to
sprawdzane dopiero wtedy, gdy uruchomienie faktycznie je wczytuje.

:::caution[Ścieżki w systemie Windows]
Ścieżkę Windows należy zapisać bez cudzysłowów, w pojedynczych
cudzysłowach, z ukośnikami zwykłymi lub jako ścieżkę UNC. W
**podwójnych** cudzysłowach YAML `\t` i `\n` stają się tabulatorem
i znakiem nowego wiersza — `"C:\tmp\bdu.zip"` po cichu wskazywałoby
gdzie indziej, dlatego enodia odrzuca przy wczytywaniu ścieżkę
zawierającą znak sterujący, podając wskazówkę.
:::

## Pierwsze uruchomienie i pamięć podręczna

Oba źródła są parsowane strumieniowo, a wynik jest buforowany
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
  w postaci kolorowych plakietek, np. `CRITICAL · CVSS 3.1 9.8`. To czysty
  CSS — domyślny raport offline nadal nie zawiera w ogóle JavaScriptu.
- **`export --format json`** — każde znalezisko z każdego źródła
  w całości, w tablicy `cves` każdej oceny: źródło (`bdu`/`nvd`),
  identyfikator biuletynu, identyfikatory CVE, tytuł, własny tekst
  ważności ze źródła, dopasowana nazwa produktu lub CPE, zakres wersji
  i sparsowana ocena CVSS. W przeciwieństwie do tabeli i listy HTML,
  które liczą jeden wiersz na CVE, JSON zachowuje znalezisko każdego
  źródła osobno — to samo CVE może pojawić się raz z BDU i raz na każde
  pasujące CPE z NVD.
- **`export --format prometheus`** — brak danych CVE.

**CVE nie wpływają na ważność ani na kod wyjścia.** `SEVERITY` jest
nadal wyliczane wyłącznie z osi poprawki/cyklu życia/gałęzi, a
`--fail-on` również zna tylko te trzy osie — znalezisko to fakt do
przejrzenia, a nie werdykt wydany przez enodia w imieniu użytkownika.
To, czy i jak CVE powinno podnosić ważność, pozostaje otwartą kwestią
w projekcie upstream.

## Które produkty są dopasowywane

52 z 90 produktów, przy czym nazwa producenta/produktu każdego z nich
została dosłownie sprawdzona w prawdziwych pełnych eksportach — źródła
dla danego produktu podaje jego własna strona w sekcji
[Konfiguracja produktów](/pl/products/).

Niedopasowywane, każde z konkretnego powodu:

- **Dystrybucje Linuksa ogólnego przeznaczenia** (Debian, Ubuntu, RHEL,
  Alma, Rocky, Fedora, RED OS, Astra Linux, …) — ich CVE to podatności
  pakietów; numer wydania nie mówi, które pakiety zostały od tego czasu
  załatane.
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
- **Warunki wieloproduktowe NVD** („podatne tylko z biblioteką Y”) nie
  są oceniane — sonda zgłasza jeden produkt na cel, więc każdy podatny
  wpis dla dopasowanego produktu liczy się samodzielnie.
