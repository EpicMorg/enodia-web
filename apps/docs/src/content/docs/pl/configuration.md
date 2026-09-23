---
title: Konfiguracja
description: Każde pole, które przyjmują enodia.yaml, credentials.yaml i settings.yaml.
---

enodia odczytuje maksymalnie trzy pliki: **`enodia.yaml`** (wymagany —
inwentarz usług), opcjonalny osobny **`credentials.yaml`** oraz
opcjonalny **`settings.yaml`** (osobiste preferencje wyświetlania, nigdy
niewymagany). Wszystkie trzy to zwykły YAML.

## `enodia.yaml`

### Poziom główny

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # opcjonalne, zobacz niżej
defaults:                            # opcjonalne
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # opcjonalne, zobacz „Korelacja CVE”
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # opcjonalne, zobacz „Poświadczenia”
targets: []                          # usługi do monitorowania
```

`schemaVersion` jest sprawdzane przy odczycie — przyszła wersja jest
odrzucana z zaleceniem aktualizacji, zamiast być optymistycznie
parsowana.

### `defaults`

Dotyczy każdego celu, o ile nie zostanie nadpisane na poziomie
konkretnego celu.

| Pole | Typ | Znaczenie |
|---|---|---|
| `timeout` | duration | Limit czasu pojedynczego żądania (domyślnie `10s`, jeśli nigdzie nie ustawiono) |
| `concurrency` | int | Ile celów jest sondowanych jednocześnie |
| `retries` | int | Liczba ponowień — ponawiany jest tylko `ErrUnreachable`; odrzucone poświadczenie nie zadziała lepiej przy drugiej próbie |
| `backoff` | duration | Opóźnienie między ponowieniami |

Czasy trwania używają składni duration z Go: `500ms`, `10s`, `2m`,
`1h30m`.

### `cve`

Opcjonalne. Wskazuje enodia eksport BDU FSTEC (`cve.bdu.path`) i/lub
kanały JSON NVD (`cve.nvd.path`) pobrane samodzielnie — enodia nigdy ich
nie pobiera. Ścieżki względne są rozwiązywane względem katalogu tego
pliku konfiguracyjnego, a skonfigurowana ścieżka, która nie istnieje,
jest błędem. Co to robi, jak zdobyć pliki i które produkty są
dopasowywane: [Korelacja CVE](/pl/cve/).

### `targets`

Jeden wpis na usługę:

```yaml
targets:
  - id: jira-main               # wymagane, stałe przy zmianach nazwy - metryki i historia są do tego przypisane
    name: Jira (production)     # opcjonalne, domyślnie id
    product: jira                # wymagane - zobacz Obsługiwane produkty
    address: https://jira.example.com   # wymagane
    credentials: jira-token      # opcjonalne, nazwa wpisu w credentials:
    timeout: 15s                 # opcjonalne, nadpisuje defaults.timeout
    path: /rest/api/2/serverInfo # opcjonalne, zależne od produktu - większość sond ma rozsądną wartość domyślną
    method: GET                  # opcjonalne
    headers:                     # opcjonalne, dodatkowe nagłówki wysyłane z każdym żądaniem
      X-Custom: value
    allow_insecure_transport: false   # opcjonalne - zobacz „Najpierw HTTPS” w Koncepcjach
    tls:                          # opcjonalne, zobacz „TLS” niżej
      ca_file: /etc/enodia/ca.pem
    options:                      # opcjonalne, parametry klucz/wartość zależne od produktu
      key: value
    parser:                       # tylko dla product: generic - zobacz niżej
      type: regex
```

`address` zapisuje się dokładnie tak, jak by się go wpisało — każda
sonda parsuje go samodzielnie. Sam host bez prefiksu `https://`/`http://`
jest rozwiązywany automatycznie (zobacz
[Koncepcje](/pl/concepts/#najpierw-https-poświadczenia-domyślnie-nigdy-nie-są-wysyłane-otwartym-tekstem));
można też uruchomić `enodia config resolve`, aby zobaczyć, jakiego
schematu użyłby każdy cel, bez wysyłania jakichkolwiek poświadczeń.

`options` to dowolna mapa zależna od produktu — większość sond całkowicie
ją ignoruje. [`p4d`/`p4p`](/pl/configuration/products/p4d/) są pierwszymi,
które faktycznie ją odczytują: `options.binary` nadpisuje ścieżkę do CLI
`p4`, które wywołują.

Dokładny endpoint, wymagania dotyczące uwierzytelniania i rejestrowane
pola dla każdej z 90 wbudowanych sond opisuje sekcja **Konfiguracja
produktów** w panelu bocznym (lub tabela
[Obsługiwane produkty](/pl/products/)) — `path`, `credentials`
i `options` powyżej to ogólny kształt; strona każdego produktu mówi, czego
on faktycznie potrzebuje.

### TLS (`tls:`)

Trzy poziomy, w kolejności od najbardziej poprawnego:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # firmowy pakiet CA - większość zamkniętych środowisk ma własne PKI
  pin_sha256:                         # przypięte odciski certyfikatu końcowego
    - "AB:CD:...:EF"
  server_name: internal.example.com   # nadpisanie SNI
  min_version: "1.2"                  # minimalna wersja TLS
  insecure: true                      # ostateczność - zobacz niżej
```

`insecure: true` generuje ostrzeżenie przy każdym uruchomieniu, a nie
tylko podczas walidacji, ponieważ ma zwyczaj bycia dodawanym
„tymczasowo” i pozostawania na lata. Trafia też do obserwacji, więc
raport służy jednocześnie jako audyt TLS całej floty — widać, które
usługi są sprawdzane bez weryfikacji.

## Poświadczenia

Nazwane wpisy, do których odwołuje się pole `credentials:` celu po
nazwie:

```yaml
credentials:
  jira-token:
    kind: bearer
    value: "${JIRA_TOKEN}"

  gitlab-token:
    kind: token-header
    header: PRIVATE-TOKEN
    value: "${GITLAB_TOKEN}"

  vault-basic:
    kind: basic
    username: enodia
    password: "${VAULT_PASSWORD}"

  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
    passphrase: "${SSH_KEY_PASSPHRASE}"   # opcjonalne, tylko jeśli klucz jest zaszyfrowany
```

| `kind` | Używane pola | Wysyła |
|---|---|---|
| `none` (domyślnie, jeśli pominięto) | — | brak poświadczenia |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | własny nagłówek, np. `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | HTTP Basic auth |
| `password` | `password` (oraz `username` dla protokołów, które go używają — Redis ACL, PostgreSQL) | natywne uwierzytelnianie protokołu (Redis `AUTH`, hasło połączenia SQL, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (opcjonalne) | uwierzytelnianie kluczem publicznym SSH, dla sond identyfikujących system operacyjny przez SSH (zobacz [Obsługiwane produkty](/pl/products/)) |

Sam `username` z `kind: password` i bez `private_key_file` również
działa dla celów SSH — sondy SSH przyjmują hasło albo klucz prywatny,
tak jak każdy klient SSH (`username` plus `password` w `kind: password`
albo `username` plus `private_key_file` w `kind: ssh-key`).

### Weryfikacja klucza hosta SSH

Każda sonda oparta na SSH używa tego samego bloku `tls:`, którego sondy
HTTPS używają do weryfikacji certyfikatu — `pin_sha256` zawiera tu
szesnastkowy SHA-256 kodowania przewodowego samego klucza hosta, a nie
certyfikatu TLS, ale schemat jest ten sam: „przypnij odcisk albo ustaw
`insecure` i otrzymuj ostrzeżenia”:

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 klucza hosta, z ssh-keyscan lub podobnego narzędzia
      # insecure: true      # ostateczność — całkowicie pomija weryfikację klucza hosta
```

Jeśli nie ustawiono ani `pin_sha256`, ani `insecure: true`, połączenie
jest odrzucane, zanim zostanie wysłane jakiekolwiek poświadczenie.

### `credentials_file`

Osobny plik o tym samym kształcie co wbudowana mapa `credentials:`:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

Dzięki temu inwentarz usług można zatwierdzić w git, a sekrety całkowicie
pozostają poza nim. Wpisy w `credentials_file` mają pierwszeństwo przed
wbudowanym wpisem o tej samej nazwie. `credentials_file` jest
rozwiązywany względem pliku konfiguracyjnego, który go wskazuje, a nie
bieżącego katalogu.

### Podstawianie zmiennych środowiskowych

Każda wartość tekstowa w `enodia.yaml` lub `credentials.yaml` może
odwoływać się do zmiennej środowiskowej:

- `${VAR}` — zastępowane wartością `$VAR`; brak zmiennej jest błędem.
- `${VAR:-default}` — zastępowane wartością `$VAR` lub `default`, jeśli
  zmienna nie jest ustawiona.

## Integracja z HashiCorp Vault Agent

Ani wbudowanej mapy `credentials:` w `enodia.yaml`, ani osobnego pliku
`credentials.yaml` nie musi pisać człowiek. Oba to po prostu pliki,
które enodia odczytuje na nowo przy każdym uruchomieniu — potwierdzone
w kodzie źródłowym: `enodia check` wczytuje konfigurację i poświadczenia
od zera przy każdym wywołaniu, a `enodia serve --interval` robi to samo
w każdym cyklu odświeżania (`Config.Build` wywołuje `LoadCredentials`
za każdym razem, gdy uruchamia się `collectObservations` — nic nie jest
buforowane na czas życia procesu, więc edycja któregokolwiek z plików
działa bez restartu). Właśnie do tego służy mechanizm renderowania
`template` w
[Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent).
enodia nie ma własnej integracji specyficznej dla Vault — nie jest
potrzebna, ponieważ oba poniższe mechanizmy już bezpośrednio się z nim
łączą.

### Vault Agent renderuje zmienne środowiskowe

Należy wskazać w bloku `template` (lub `env_template`) Vault Agent
sekrety potrzebne celowi i odwołać się do nich w zwykły sposób, przez
opisane wyżej
[podstawianie zmiennych środowiskowych](#podstawianie-zmiennych-środowiskowych):

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

Tryb `exec` Vault Agent uruchamia samą enodia (lub skrypt opakowujący
wywołujący `enodia check`) jako nadzorowany proces potomny, wstrzykując
wyrenderowane zmienne bezpośrednio do środowiska tego procesu — żaden
sekret nigdy nie trafia na dysk jako plik, który enodia musiałaby
odczytać. Blok `exec` Vault Agent obsługuje też restartowanie procesu
potomnego, gdy zmieni się szablonowany sekret — przydaje się to, jeśli
długo działający `enodia serve` ma natychmiast przejąć zrotowany token,
zamiast liczyć na to, że będzie on jeszcze ważny przy następnym takcie
`--interval`. Dokładną konfigurację tego opisuje dokumentacja Vault
Agent — leży to całkowicie po stronie Vault Agent.

### Vault Agent renderuje bezpośrednio `credentials.yaml`

Należy wskazać w `credentials_file:` ścieżkę, do której zapisuje blok
`template` Vault Agent, i przygotować szablon dokładnie w kształcie,
jakiego oczekuje [`credentials_file`](#credentials_file):

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Blok template Vault Agent — poglądowo; dokładną składnię opisuje dokumentacja Vault Agent"
template {
  destination = "/run/enodia/credentials.yaml"
  perms       = "0600"
  contents    = <<EOT
jira-token:
  kind: bearer
  value: "{{ with secret "secret/data/enodia/jira" }}{{ .Data.data.token }}{{ end }}"
EOT
}
```

Ta ścieżka w ogóle nie wymaga konfigurowania `exec`/restartu: `enodia
check` odczytuje `credentials_file` od zera przy każdym wywołaniu,
a `enodia serve` odczytuje go w każdym cyklu odświeżania, niezależnie od
tego, jak zmienił się na dysku. Zarówno `enodia check` uruchamiany
z crona, jak i długo działający `enodia serve` po prostu przejmują to,
co Vault Agent zapisał ostatnio, według własnego harmonogramu — po
stronie enodia nie ma tu nic do skonfigurowania.

### Tak czy inaczej obowiązują zasady obsługi poświadczeń w enodia

Oba wzorce nadal podlegają wszystkiemu, co opisuje już sekcja
[Bezpieczeństwo](/pl/security/) — poświadczenia nigdy nie pojawiają się
w inwentarzu, eksportowanych raportach ani logach, a weryfikacja TLS
pozostaje włączona, chyba że zostanie wyłączona dla konkretnego celu.
To ustawienia `perms` i wybór katalogu docelowego w Vault Agent chronią
wyrenderowany plik przed odczytem przez cokolwiek innego; sama enodia
nie ma zdania na temat położenia `credentials_file`, poza rozwiązaniem
ścieżki względnej względem pliku konfiguracyjnego, który go wskazuje.

## Sonda generyczna

`product: generic` to furtka awaryjna dla celu, który nigdy nie
doczeka się dedykowanej sondy. Jej słownik jest celowo mały i zamrożony —
żadnych warunków, żadnych pętli, żadnych łańcuchów żądań, żadnych
szablonów. Cel, który potrzebuje czegokolwiek z tego, potrzebuje
prawdziwej sondy napisanej w Go, a nie kolejnych funkcji sondy
generycznej.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # ścieżka z kropkami (json), ścieżka tagów/w stylu XPath (xml) lub nazwa nagłówka
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # wygrywa pierwsza grupa przechwytująca - snake_case, zobacz niżej
      line: 1                # tylko plaintext - który wiersz odczytać
```

:::caution[Pisownia pola: `clean_regex`, a nie `cleanRegex` ani `cleanregex`]
`ParserSpec` ma teraz jawne tagi `yaml:` zgodne z konwencją snake_case
stosowaną w pozostałej części `enodia.yaml` (`ca_file`, `min_version`,
`allow_insecure_transport`, ...) — `clean_regex` jest poprawne od
2026-09-07. Przed tą poprawką struktura nie miała żadnych jawnych tagów,
więc obowiązywało domyślne zachowanie YAML bez tagów (małe litery, bez
podziału na słowa) i jedyną działającą pisownią było `cleanregex`; samo
`cleanRegex` nie działało nigdy. Za każdym razem potwierdzone
bezpośrednio na parserze, a nie wywnioskowane z opisu.
:::

## Lokalizacje plików

Zarówno `enodia.yaml`, jak i `settings.yaml` są wyszukiwane w ten sam
sposób: jawna ścieżka (`--config`/`--settings` albo
`$ENODIA_CONFIG`/`$ENODIA_SETTINGS` dla konkretnego pliku) zawsze
wygrywa i musi istnieć — literówka jest błędem, nigdy cichym przejściem
do innego pliku. W przeciwnym razie wyszukiwanie przebiega w podanej
niżej kolejności; pierwsze trafienie wygrywa bezwarunkowo, nic nie jest
scalane z kilku znalezionych plików. Lokalizacja ma pierwszeństwo przed
nazwą: trafienie w bieżącym katalogu zawsze wygrywa z trafieniem
w `$XDG_CONFIG_HOME`, które zawsze wygrywa z trafieniem w
`/etc/enodia/`, niezależnie od tego, która nazwa pasowała gdzie.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml`, jeśli `$XDG_CONFIG_HOME` nie jest ustawione)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Nieznalezienie niczego jest błędem — konfiguracja, której nie da się
znaleźć, zasługuje na głośną porażkę, bo zwykle oznacza, że za chwilę
zostanie użyty niewłaściwy plik (lub żaden). Polecenie `enodia config
path` pokazuje, który plik zostałby faktycznie wybrany.

**`settings.yaml`** — ta sama idea z kilkoma różnicami: sprawdzana jest
też zwykła nazwa `settings.` (nie tylko `enodia.settings.`), dodatkowo
sprawdzany jest katalog, w którym znajduje się uruchomiony plik
wykonywalny (nie tylko bieżący katalog — zobacz niżej), a nieznalezienie
niczego **nie** jest błędem — każde pole po prostu przyjmuje wbudowaną
wartość domyślną, ponieważ ten plik jest całkowicie opcjonalny:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml` (katalog zawierający uruchomiony plik wykonywalny)
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml`, jeśli `$XDG_CONFIG_HOME` nie jest ustawione)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Kroki 9-10 różnią się od bieżącego katalogu (kroki 1-8): instalacja
przenośna (rozpakowana gdziekolwiek, bez menedżera pakietów) działa
z katalogu, w którym akurat znajduje się operator, a ten — zwłaszcza
w systemie Windows — praktycznie nigdy nie jest samym katalogiem
instalacji (`install.ps1` domyślnie używa `%LOCALAPPDATA%\enodia`,
dodawanego do `PATH` — cały sens `PATH` polega na tym, że bieżący katalog
przestaje mieć znaczenie). Ten krok jest celowo ograniczony do
`settings.yaml` — to opcjonalne preferencje wyświetlania, więc
niewłaściwy lub podmieniony plik we współdzielonym katalogu instalacji
jest w najgorszym razie problemem kosmetycznym. `enodia.yaml` zawiera
poświadczenia i nie ma odpowiednika tego kroku.

## `settings.yaml`

Osobiste preferencje wyświetlania poszczególnych operatorów — nigdy
cele, nigdy poświadczenia, nigdy współdzielone tak, jak zwykle jest
`enodia.yaml`.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (domyślnie) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (domyślnie) | prometheus | html - używane zawsze, gdy samo
  # `export` jest uruchamiane bez --format
  default_format: html

html:
  # inline (domyślnie, w pełni offline) | cdn (ładuje Bootstrap/Bootswatch)
  assets: cdn

  # none (brak arkusza stylów) | default (czysty Bootstrap) | dowolny
  # z 26 prawdziwych motywów Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (domyślnie: ściga się jsdelivr z cdnjs i używa tego, który
  # odpowie pierwszy) | jsdelivr | cdnjs
  cdn: auto

  # opcjonalne: ogranicza eksport do jednego widoku zamiast wszystkich czterech
  # view: fleet
```

`render.default_view` dotyczy `--view` w `check`, gdy sama flaga nie
została podana. `export.default_format` robi to samo dla `--format`
w `export`. `html.*` ma znaczenie tylko dla `export --format html` —
co dokładnie zmienia każde pole, opisuje sekcja
[Raporty](/pl/reporting/).
