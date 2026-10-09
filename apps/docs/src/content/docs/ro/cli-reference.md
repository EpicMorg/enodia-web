---
title: Referință CLI
description: Fiecare comandă enodia, direct din --help.
---

Fiecare comandă acceptă și `-h`/`--help`. Această pagină este generată
din aceeași ieșire, sincronizată manual cu binarul efectiv compilat, nu
scrisă din memorie.

## Flag-uri globale

Disponibile pentru fiecare comandă:

```
--config string     path to enodia.yaml (default: search standard locations)
--settings string   path to settings.yaml (default: search standard locations; missing is not an error)
```

## `enodia collect`

```
collect only gathers facts: an unreachable target is recorded as an
observation with an error, not treated as a command failure. The exit
code reflects whether collection itself ran, not what it found - that
judgement is check's job.
```

```
-o, --output string   output file, or - for stdout (default "-")
```

## `enodia check`

```
check evaluates the patch, lifecycle and newer-branch axes for every
target as of the moment its data was collected. Without --from it
collects first, in this same process - not a second code path. With
--from it reads an existing inventory and only ever reaches the network
for the lifecycle resolver.

--view selects the table focus: compact (default), lifecycle, drift, or
fleet - the offline-only view of version spread across a product's
instances. When --view is not passed, settings.yaml's render.default_view
applies instead of the compact default, if set.
```

```
--fail-on strings   escalate an axis value to a hard failure, e.g. --fail-on=patch:behind (repeatable)
--from string       read an existing inventory instead of collecting
--view string       table view: compact, lifecycle, drift, or fleet (default "compact")
--warn-days int      warn this many days before a lifecycle boundary is reached
```

## `enodia export`

```
export writes one self-contained file - nothing here serves it; nginx,
a cron job, or a systemd timer regenerating it is what does.

--format selects json, prometheus, or html. When --format is not passed,
settings.yaml's export.default_format applies instead, if set; the
built-in default stays json either way.

--view restricts an html export to one view (compact, lifecycle, drift,
or fleet) instead of all four stacked sections; ignored by
json/prometheus, which always carry every observation and assessment.
```

```
--fail-on strings   escalate an axis value to a hard failure (repeatable)
--format string     output format: json, prometheus, or html (default "json")
--from string       read an existing inventory instead of collecting
-o, --output string  output file, or - for stdout (default "-")
--view string        html only: restrict the report to one view (compact, lifecycle, drift, fleet); default is all four
--warn-days int       warn this many days before a lifecycle boundary is reached
```

## `enodia config`

Trei subcomenzi, fără flag-uri proprii în afara celor globale.

### `enodia config path`

Afișează ce fișier de configurare ar fi folosit efectiv, conform ordinii
de căutare curente — consultați [Configurare](/ro/configuration/#locațiile-fișierelor).

### `enodia config resolve`

```
resolve tries https, then http (never http first - that would put a
credential on the wire in the clear), for every target whose address
has no explicit scheme. It sends no credentials and does not modify the
config file - it only reports what scheme each target would use.
```

### `enodia config validate`

Validează fișierul de configurare și referințele sale la credențiale —
inclusiv dacă numele `credentials:` declarat al unei ținte se rezolvă
efectiv la o intrare pe care sonda o înțelege, complet offline.

## `enodia cve`

O singură subcomandă, fără opțiuni proprii în afara celor globale.

### `enodia cve update`

```
update downloads into each configured cve.*.path what that entry reads:
BDU's vulxml.zip, NVD's yearly files (this year, last year and any year
not on disk yet; every year with --all-years), the Debian Security Tracker
JSON, vendor OVAL files, Alpine secdb, and MariaDB's, Atlassian's,
PostgreSQL's and nginx's own data. It is the only command that fetches
them; check, collect and serve never do.

OVAL releases, Alpine branches and PostgreSQL majors come from the files
already in those directories, from the inventories given with --from, and
from --oval/--alpine/--postgresql.

Each file is sent If-Modified-Since its copy on disk, downloaded beside it,
loaded by the same code the CVE lookup uses, and only then moved over the
old one, so a failed or broken download never replaces a working file.
TLS is verified against the system's roots plus cve.update.ca_file and
cve.update.ca_dir; cve.update.tls_skip_verify turns verification off.
Exit status 1 if any file failed; the rest are still updated.
```

```
--all-years                refresh every NVD year, not only this one, last one and missing ones
--alpine stringArray       an Alpine branch to fetch secdb for, e.g. v3.22 (repeatable)
--dry-run                  list what would be fetched, download nothing
--from stringArray         an inventory to read OVAL releases, Alpine branches and PostgreSQL majors from (repeatable)
--oval stringArray         an OVAL release to fetch: ubuntu:<codename>, rhel:<N>, almalinux:<N>, oracle-linux:<N>, astra-linux:<X.Y>, redos:<X.Y> (repeatable)
--postgresql stringArray   a PostgreSQL major whose own security page to fetch, e.g. 13 (repeatable)
```

Ce necesită fiecare sursă și cum sunt alese versiunile:
[Corelare CVE → `enodia cve update`](/ro/cve/#enodia-cve-update).

## `enodia products`

Listează fiecare produs acceptat — consultați
[Produse acceptate](/ro/products/) pentru tabelul complet.

## `enodia history`

```
history reads every "*.jsonl" file in --dir and evaluates each one
against its own collection time - not today - building one timeline
per target ID. Producing that directory needs no code at all, just
"enodia collect -o \"$(date +%F).jsonl\"" on a schedule. This command is
the other half: reading many of them back as one history.
```

```
--dir string         directory of dated *.jsonl inventories (required)
--fail-on strings    escalate an axis value to a hard failure (repeatable)
--format string      output format: table or json (default "table")
-o, --output string   output file, or - for stdout (default "-")
--warn-days int        warn this many days before a lifecycle boundary is reached
```

## `enodia serve`

```
serve collects and evaluates on a timer (--interval) and serves
whatever the last successful cycle produced - a request never triggers
a new collection. There is no built-in authentication or TLS: put this
behind a reverse proxy.

Endpoints: / (HTML, all four views), /report.json, /metrics
(Prometheus), /healthz (liveness only - never touches the snapshot).
```

```
--fail-on strings     escalate an axis value to a hard failure (repeatable) - reflected in the served report, not a process exit code
--interval duration    how often to refresh the snapshot (default 1h0m0s)
--listen string         address to listen on (default ":8080")
--warn-days int          warn this many days before a lifecycle boundary is reached
```

## `enodia version`

Afișează versiunea enodia, commit-ul și data build-ului.

## `enodia about`

Afișează logo-ul enodia împreună cu informațiile despre build: versiunea,
commit-ul, data build-ului, versiunea Go, platforma, numărul de produse
(sonde), licența și URL-ul repository-ului.

## `enodia completion`

Generează un script de autocompletare pentru shell. Rulați
`enodia completion --help` pentru shell-ul specific pe care îl folosiți
(bash, zsh, fish, powershell).
