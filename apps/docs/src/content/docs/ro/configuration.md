---
title: Configurare
description: Fiecare câmp acceptat de enodia.yaml, credentials.yaml și settings.yaml.
---

enodia citește până la trei fișiere: **`enodia.yaml`** (obligatoriu —
inventarul serviciilor dumneavoastră), un fișier separat opțional
**`credentials.yaml`** și un fișier opțional **`settings.yaml`**
(preferințe personale de afișare, niciodată obligatoriu). Toate trei
sunt YAML simplu.

## `enodia.yaml`

### Nivelul superior

```yaml
schemaVersion: 1
credentials_file: credentials.yaml   # opțional, vedeți mai jos
defaults:                            # opțional
  timeout: 10s
  concurrency: 5
  retries: 2
  backoff: 500ms
cve:                                 # opțional, vedeți „Corelare CVE”
  bdu:
    path: vulxml.zip
  nvd:
    path: nvd/
credentials: {}                      # opțional, vedeți „Credențiale”
targets: []                          # serviciile dumneavoastră
```

`schemaVersion` este verificat la citire — o versiune viitoare este
refuzată, cu recomandarea de a face upgrade, în loc să fie parsată
optimist.

### `defaults`

Se aplică fiecărei ținte, cu excepția cazului în care este suprascris
pentru o anumită țintă.

| Câmp | Tip | Semnificație |
|---|---|---|
| `timeout` | duration | Timp limită per cerere (implicit: `10s` dacă nu este setat nicăieri) |
| `concurrency` | int | Câte ținte sunt sondate simultan |
| `retries` | int | Numărul de reîncercări — doar `ErrUnreachable` este reîncercat; o credențială respinsă nu va reuși la a doua încercare |
| `backoff` | duration | Întârzierea dintre reîncercări |

Duratele folosesc sintaxa de durată din Go: `500ms`, `10s`, `2m`,
`1h30m`.

### `cve`

Opțional. Indică enodia un export BDU FSTEC (`cve.bdu.path`) și/sau
feed-uri JSON NVD (`cve.nvd.path`) pe care le-ați descărcat singuri —
enodia nu le descarcă niciodată. Căile relative se rezolvă față de
directorul acestei configurații, iar o cale configurată care nu există
reprezintă o eroare. Ce face, cum obțineți fișierele și ce produse sunt
potrivite: [Corelare CVE](/ro/cve/).

### `targets`

Câte o intrare pentru fiecare serviciu:

```yaml
targets:
  - id: jira-main               # obligatoriu, stabil la redenumiri - metricile și istoricul se bazează pe el
    name: Jira (production)     # opțional, implicit egal cu id
    product: jira                # obligatoriu - vedeți Produse acceptate
    address: https://jira.example.com   # obligatoriu
    credentials: jira-token      # opțional, numele unei intrări din credentials:
    timeout: 15s                 # opțional, suprascrie defaults.timeout
    path: /rest/api/2/serverInfo # opțional, specific produsului - majoritatea sondelor au o valoare implicită rezonabilă
    method: GET                  # opțional
    headers:                     # opțional, antete suplimentare trimise cu fiecare cerere
      X-Custom: value
    allow_insecure_transport: false   # opțional - vedeți „HTTPS mai întâi” în Concepte
    tls:                          # opțional, vedeți „TLS” mai jos
      ca_file: /etc/enodia/ca.pem
    options:                      # opțional, parametri cheie/valoare specifici produsului
      key: value
    parser:                       # doar pentru product: generic - vedeți mai jos
      type: regex
```

`address` se scrie exact așa cum l-ați tasta — fiecare sondă îl parsează
singură. Un host simplu, fără prefixul `https://`/`http://`, este
rezolvat automat (consultați [Concepte](/ro/concepts/#https-mai-întâi-credențialele-nu-sunt-niciodată-trimise-în-clar-în-mod-implicit))
sau puteți rula `enodia config resolve` pentru a vedea ce schemă ar
folosi fiecare țintă, fără a trimite nicio credențială.

`options` este o hartă liberă, specifică fiecărui produs — majoritatea
sondelor o ignoră complet. [`p4d`/`p4p`](/ro/configuration/products/p4d/)
sunt primele care citesc efectiv o astfel de hartă: `options.binary`
suprascrie calea către CLI-ul `p4` pe care îl apelează.

Consultați **Configurarea produselor** în bara laterală (sau tabelul
[Produse acceptate](/ro/products/)) pentru endpoint-ul exact, cerințele
de autentificare și câmpurile înregistrate pentru fiecare dintre cele
90 de sonde integrate — `path`, `credentials` și `options` de mai sus
reprezintă forma generală; pagina fiecărui produs spune de ce are
nevoie efectiv.

### TLS (`tls:`)

Trei niveluri, în ordinea descrescătoare a corectitudinii:

```yaml
tls:
  ca_file: /etc/enodia/corp-ca.pem   # un pachet CA corporativ - majoritatea mediilor închise au propria PKI
  pin_sha256:                         # amprenta (amprentele) fixată a certificatului final
    - "AB:CD:...:EF"
  server_name: internal.example.com   # suprascrierea SNI
  min_version: "1.2"                  # versiunea minimă TLS
  insecure: true                      # ultimă soluție - vedeți mai jos
```

`insecure: true` emite un avertisment la fiecare rulare, nu doar la
validare, deoarece are obiceiul de a fi adăugat „temporar” și de a
rămâne ani de zile. De asemenea, ajunge în observație, astfel încât un
raport servește și ca audit TLS pentru întreaga flotă — puteți vedea ce
servicii sunt verificate fără validare.

## Credențiale

Intrări cu nume, referite după nume din câmpul `credentials:` al unei
ținte:

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
    passphrase: "${SSH_KEY_PASSPHRASE}"   # opțional, doar dacă cheia este criptată
```

| `kind` | Câmpuri folosite | Trimite |
|---|---|---|
| `none` (implicit dacă este omis) | — | nicio credențială |
| `bearer` | `value` | `Authorization: Bearer <value>` |
| `token-header` | `header`, `value` | un antet personalizat, de exemplu `PRIVATE-TOKEN`, `X-Vault-Token` |
| `basic` | `username`, `password` | autentificare HTTP Basic |
| `password` | `password` (plus `username`, pentru protocoalele care îl folosesc — Redis ACL, PostgreSQL) | autentificare nativă a protocolului (Redis `AUTH`, parola unei conexiuni SQL, ...) |
| `ssh-key` | `username`, `private_key_file`, `passphrase` (opțional) | autentificare SSH cu cheie publică, pentru sondele de identificare a sistemului de operare prin SSH (consultați [Produse acceptate](/ro/products/)) |

`username` cu `kind: password` și fără `private_key_file` funcționează
și pentru țintele SSH — sondele SSH acceptă fie o parolă, fie o cheie
privată, la fel ca orice client SSH (`username` plus `password` cu
`kind: password` sau `username` plus `private_key_file` cu
`kind: ssh-key`).

### Verificarea cheii de host SSH

Fiecare sondă bazată pe SSH reutilizează același bloc `tls:` pe care
sondele HTTPS îl folosesc pentru verificarea certificatelor —
`pin_sha256` conține aici SHA-256 în format hex al codificării de rețea
a cheii de host, nu un certificat TLS, dar forma este aceeași: „fixați
o amprentă sau specificați `insecure` și primiți un avertisment”:

```yaml
targets:
  - id: linux-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"   # sha256 al cheii de host, din ssh-keyscan sau similar
      # insecure: true      # ultimă soluție — omite complet verificarea cheii de host
```

Dacă nu este setat nici `pin_sha256`, nici `insecure: true`, conexiunea
este refuzată înainte de a fi trimisă vreo credențială.

### `credentials_file`

Un fișier separat, cu aceeași formă ca harta inline `credentials:`:

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

Acesta este mecanismul care permite includerea inventarului de servicii
în git, în timp ce secretele rămân complet în afara lui. Intrările din
`credentials_file` au prioritate față de o intrare inline cu același
nume. `credentials_file` se rezolvă relativ la fișierul de configurare
care îl menționează, nu la directorul curent.

### Interpolarea variabilelor de mediu

Orice valoare de tip șir din `enodia.yaml` sau `credentials.yaml` poate
face referire la o variabilă de mediu:

- `${VAR}` — înlocuit cu valoarea lui `$VAR`; lipsa acesteia este o
  eroare.
- `${VAR:-default}` — înlocuit cu valoarea lui `$VAR` sau cu `default`
  dacă nu este setată.

## Integrarea cu HashiCorp Vault Agent

Nici harta inline `credentials:` din `enodia.yaml`, nici un fișier
separat `credentials.yaml` nu trebuie scrise de un om. Ambele sunt
simple fișiere pe care enodia le citește din nou la fiecare rulare —
confirmat în codul sursă: `enodia check` reîncarcă de la zero
configurația și credențialele la fiecare invocare, iar
`enodia serve --interval` face același lucru la fiecare ciclu de
reîmprospătare (`Config.Build` apelează `LoadCredentials` de fiecare
dată când rulează `collectObservations` — nimic nu este memorat pe
durata de viață a procesului, așa că modificarea oricăruia dintre
fișiere intră în vigoare fără repornire). Aceasta este exact forma
pentru care a fost construită randarea `template` a
[Vault Agent](https://developer.hashicorp.com/vault/docs/agent-and-proxy/agent).
enodia nu are o integrare proprie specifică Vault — nici nu este
necesară, deoarece cele două mecanisme de mai jos se combină deja direct
cu el.

### Vault Agent randează variabile de mediu

Direcționați blocul `template` (sau `env_template`) al Vault Agent către
secretele de care are nevoie o țintă și faceți referire la ele în mod
obișnuit, prin
[interpolarea variabilelor de mediu](#interpolarea-variabilelor-de-mediu)
de mai sus:

```yaml title="credentials.yaml"
jira-token:
  kind: bearer
  value: "${JIRA_TOKEN}"
```

Modul `exec` al Vault Agent rulează enodia însuși (sau un script
wrapper care apelează `enodia check`) ca proces copil supravegheat,
injectând variabilele randate direct în mediul acelui proces — niciun
secret nu ajunge vreodată pe disc sub forma unui fișier pe care enodia
trebuie să îl citească. Blocul `exec` al Vault Agent permite și
repornirea procesului copil atunci când se modifică un secret din
șablon, dacă doriți ca un `enodia serve` care rulează îndelungat să
preia imediat un token rotit, în loc să se bazeze pe faptul că acesta
este încă valid la următorul tick `--interval` — consultați documentația
Vault Agent pentru configurația exactă, aceasta ține exclusiv de partea
Vault Agent.

### Vault Agent randează direct un `credentials.yaml`

Direcționați `credentials_file:` către calea în care scrie blocul
`template` al Vault Agent și creați un șablon cu exact forma pe care o
așteaptă [`credentials_file`](#credentials_file):

```yaml title="enodia.yaml"
schemaVersion: 1
credentials_file: /run/enodia/credentials.yaml
targets:
  - id: jira-main
    product: jira
    address: https://jira.example.com
    credentials: jira-token
```

```hcl title="Vault Agent template stanza — illustrative; see Vault Agent's own docs for exact syntax"
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

Această variantă nu necesită deloc configurarea `exec`/repornirii:
`enodia check` recitește de la zero `credentials_file` la fiecare
invocare, iar `enodia serve` îl recitește la fiecare ciclu de
reîmprospătare, indiferent de modul în care s-a schimbat pe disc. Un
`enodia check` programat prin cron sau un `enodia serve` care rulează
îndelungat preiau pur și simplu ceea ce a scris ultima dată Vault Agent,
după propriul program — nu este nimic specific enodia de configurat.

### În ambele cazuri, se aplică gestionarea credențialelor proprie enodia

Ambele variante se încadrează în continuare în tot ceea ce acoperă deja
[Securitate](/ro/security/) — credențialele nu apar niciodată în
inventar, în rapoartele exportate sau în jurnale, iar verificarea TLS
rămâne activată, cu excepția cazului în care renunțați la ea pentru o
anumită țintă. Opțiunea `perms` a Vault Agent și alegerea directorului
de destinație sunt cele care împiedică accesul altor procese la fișierul
randat; enodia nu are nicio preferință privind locul în care se află
`credentials_file`, în afară de rezolvarea unei căi relative față de
fișierul de configurare care o menționează.

## Sonda generică

`product: generic` este soluția de rezervă pentru o țintă care nu va
primi niciodată o sondă dedicată. Vocabularul său este în mod deliberat
restrâns și înghețat — fără condiții, fără bucle, fără cereri
înlănțuite, fără șabloane. O țintă care are nevoie de oricare dintre
acestea are nevoie de o sondă reală scrisă în Go, nu de mai multe
funcționalități ale sondei generice.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex          # json | xml | header | plaintext | regex
      key: version          # cale cu puncte (json), cale tag/de tip XPath (xml) sau nume de antet
      regex: 'v(\d+\.\d+\.\d+)'
      clean_regex: '^v'     # primul grup de captură câștigă - snake_case, vedeți mai jos
      line: 1                # doar plaintext - ce linie se citește
```

:::caution[Ortografia câmpului: `clean_regex`, nu `cleanRegex` sau `cleanregex`]
`ParserSpec` are acum tag-uri `yaml:` explicite, conforme cu convenția
snake_case din restul `enodia.yaml` (`ca_file`, `min_version`,
`allow_insecure_transport`, ...) — `clean_regex` este corect începând cu
2026-09-07. Înainte de această corecție, structura nu avea deloc tag-uri
explicite, așa că se aplica valoarea implicită YAML pentru câmpuri fără
tag (litere mici, fără separarea cuvintelor), iar singura ortografie
funcțională era `cleanregex`; un simplu `cleanRegex` nu a funcționat
niciodată. Confirmat direct cu parserul de fiecare dată când a fost
verificat, nu presupus din text.
:::

## Locațiile fișierelor

Atât `enodia.yaml`, cât și `settings.yaml` sunt găsite în același mod:
o cale explicită (`--config`/`--settings` sau `$ENODIA_CONFIG`/
`$ENODIA_SETTINGS` pentru un fișier exact) are întotdeauna prioritate și
trebuie să existe — o greșeală de tipar este o eroare, niciodată o
trecere tacită la alt fișier. În lipsa acesteia, se efectuează o căutare
în ordinea de mai jos; prima potrivire câștigă definitiv, nimic nu este
combinat din mai multe fișiere găsite. Locația contează mai mult decât
numele: o potrivire în directorul curent câștigă întotdeauna în fața
uneia din `$XDG_CONFIG_HOME`, care câștigă întotdeauna în fața uneia din
`/etc/enodia/`, indiferent de numele potrivit în fiecare loc.

**`enodia.yaml`:**

1. `./enodia.yaml`
2. `./enodia.yml`
3. `./config.yaml`
4. `./config.yml`
5. `./.enodia.yaml`
6. `./.enodia.yml`
7. `./.config.yaml`
8. `./.config.yml`
9. `$XDG_CONFIG_HOME/enodia/enodia.yaml` (`~/.config/enodia/enodia.yaml` dacă `$XDG_CONFIG_HOME` nu este setat)
10. `$XDG_CONFIG_HOME/enodia/enodia.yml`
11. `$XDG_CONFIG_HOME/enodia/config.yaml`
12. `$XDG_CONFIG_HOME/enodia/config.yml`
13. `/etc/enodia/enodia.yaml`
14. `/etc/enodia/enodia.yml`
15. `/etc/enodia/config.yaml`
16. `/etc/enodia/config.yml`

Negăsirea niciunui fișier este o eroare — o configurație care nu poate
fi găsită merită un eșec zgomotos, deoarece de obicei înseamnă că
urmează să fie folosit fișierul greșit (sau niciunul). Rulați
`enodia config path` pentru a vedea ce fișier ar fi preluat efectiv.

**`settings.yaml`** — aceeași idee, cu câteva diferențe: verifică și
numele simplu `settings.` (nu doar `enodia.settings.`), verifică în plus
directorul în care se află executabilul care rulează (nu doar directorul
curent — vedeți mai jos), iar negăsirea niciunui fișier **nu** este o
eroare — fiecare câmp revine pur și simplu la valoarea sa implicită
integrată, deoarece acest fișier este complet opțional:

1. `./enodia.settings.yaml`
2. `./enodia.settings.yml`
3. `./settings.yaml`
4. `./settings.yml`
5. `./.enodia.settings.yaml`
6. `./.enodia.settings.yml`
7. `./.settings.yaml`
8. `./.settings.yml`
9. `<directory containing the running executable>/settings.yaml`
10. `<same>/settings.yml`
11. `$XDG_CONFIG_HOME/enodia/settings.yaml` (`~/.config/enodia/settings.yaml` dacă `$XDG_CONFIG_HOME` nu este setat)
12. `$XDG_CONFIG_HOME/enodia/settings.yml`
13. `/etc/enodia/settings.yaml`
14. `/etc/enodia/settings.yml`

Pașii 9-10 sunt distincți de directorul curent (pașii 1-8): o instalare
portabilă (dezarhivată oriunde, fără manager de pachete) rulează din
orice director s-ar afla operatorul în acel moment, care, în special pe
Windows, practic nu este niciodată directorul de instalare
(`install.ps1` folosește implicit `%LOCALAPPDATA%\enodia`, adăugat în
`PATH` — tocmai rostul lui `PATH` este ca directorul curent să nu mai
conteze). Acest pas este limitat în mod deliberat la `settings.yaml` —
conține preferințe opționale de afișare, așa că un fișier greșit sau
compromis într-un director de instalare partajat este, în cel mai rău
caz, o problemă cosmetică. `enodia.yaml` conține credențiale și nu are
un pas echivalent.

## `settings.yaml`

Preferințe de afișare personale, pentru fiecare operator — niciodată
ținte, niciodată credențiale, niciodată partajate așa cum este de obicei
`enodia.yaml`.

```yaml title="settings.yaml"
schemaVersion: 1

render:
  # compact (implicit) | lifecycle | drift | fleet
  default_view: fleet

export:
  # json (implicit) | prometheus | html - folosit ori de câte ori `export`
  # este rulat fără --format
  default_format: html

html:
  # inline (implicit, complet offline) | cdn (încarcă Bootstrap/Bootswatch)
  assets: cdn

  # none (fără nicio foaie de stiluri) | default (Bootstrap simplu) | oricare dintre
  # cele 26 de teme reale Bootswatch: brite, cerulean, cosmo, cyborg, darkly,
  # flatly, journal, litera, lumen, lux, materia, minty, morph, pulse,
  # quartz, sandstone, simplex, sketchy, slate, solar, spacelab,
  # superhero, united, vapor, yeti, zephyr
  theme: lumen

  # auto (implicit: pune în competiție jsdelivr și cdnjs, îl folosește pe cel
  # care răspunde primul) | jsdelivr | cdnjs
  cdn: auto

  # opțional: restricționează exportul la o singură vizualizare în loc de toate patru
  # view: fleet
```

`render.default_view` se aplică pentru `--view` al comenzii `check` ori
de câte ori flag-ul nu a fost transmis. `export.default_format` face
același lucru pentru `--format` al comenzii `export`. `html.*` contează
doar pentru `export --format html` — consultați [Rapoarte](/ro/reporting/)
pentru ce modifică efectiv fiecare câmp.
