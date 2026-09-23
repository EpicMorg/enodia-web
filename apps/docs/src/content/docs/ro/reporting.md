---
title: Rapoarte
description: export --format json/prometheus/html și ce modifică settings.yaml în raportul HTML.
---

`enodia export` scrie un raport într-unul dintre cele trei formate.
Toate trei acceptă `--from` (citirea unui inventar existent în loc de
colectare) și `-o`/`--output` (o cale de fișier sau `-` pentru stdout,
valoarea implicită).

```bash
enodia export --format json
enodia export --format prometheus
enodia export --format html -o report.html
```

Valoarea implicită integrată a `--format` este `json`, dar
`export.default_format` din `settings.yaml` o suprascrie ori de câte ori
`--format` nu este transmis — un `--format` explicit are întotdeauna
prioritate, aceeași ordine de precedență pe care o folosesc deja în alte
locuri `render.default_view`/`html.view`. Consultați
[Configurare](/ro/configuration/#settingsyaml).

## `--format json`

Fiecare observație și fiecare evaluare, complet — `--view` este ignorat.
Acesta este formatul de utilizat dacă doriți să aplicați propria
politică de severitate peste faptele enodia (consultați
[Concepte](/ro/concepts/#faptele-și-judecata-sunt-separate)).

Cu un [bloc `cve:`](/ro/cve/) configurat, fiecare evaluare conține și un
array `cves` — câte o intrare pentru fiecare constatare, pentru fiecare
sursă (un CVE prezent atât în BDU, cât și în NVD apare de două ori; NVD
câte o dată pentru fiecare CPE potrivit):

```json
{
  "Source": "bdu",
  "AdvisoryID": "BDU:2026-11879",
  "CVEIDs": ["CVE-2026-19478"],
  "Title": "Уязвимость программной платформы … GitLab EE/ CE …",
  "Severity": "Высокий уровень опасности (базовая оценка CVSS 2.0 составляет 9,7) …",
  "MatchedName": "Gitlab",
  "RangeText": "от 19.2.0 до 19.2.4",
  "FixStatus": "Уязвимость устранена",
  "CVSS": { "Version": "3.1", "Score": 9.4, "Severity": "CRITICAL" }
}
```

`Severity` și `RangeText` sunt textul propriu al sursei, preluat
cuvânt cu cuvânt; `CVSS` este un singur rating extras din acesta, ales
mai întâi CVSS 3.1/3.0, apoi 4.0, apoi 2.0 — 3.x este versiunea pe care
o are aproape fiecare CVE în ambele surse, astfel încât scorurile dintr-o
listă rămân pe aceeași scară. Coloana `CVES` din vizualizările tabelare
numără CVE-urile distincte din aceste intrări, nu intrările în sine.

## `--format prometheus`

Un textfile Prometheus, destinat
[colectorului textfile al `node_exporter`](https://github.com/prometheus/node_exporter)
— scrieți-l, după un program, într-un loc pe care `node_exporter` este
configurat să îl scaneze, la fel ca orice altă metrică textfile.
Constatările CVE nu sunt exportate ca metrici.

## `--format html`

Un singur fișier, autonom. Nu există un server web integrat — `enodia`
nu îl servește singur (consultați
[Concepte](/ro/concepts/#niciun-server-web-integrat-care-interoghează-la-cerere));
direcționați nginx către el și regenerați-l din cron sau dintr-un timer
systemd. `enodia serve` (consultați
[Referință CLI](/ro/cli-reference/#enodia-serve)) este alternativa dacă
doriți totuși ca acesta să fie servit automat, după propriul program.

`--view` restricționează raportul la o singură vizualizare în loc de
toate cele patru secțiuni suprapuse. `html.view` din `settings.yaml`
face același lucru atunci când flag-ul nu este transmis.

### Offline în mod implicit

`html.assets` din `settings.yaml` controlează de ce are nevoie fișierul
generat:

- **`inline`** (implicit) — zero resurse externe. Verificat: niciun
  `<script` nicăieri în ieșire și nimic încărcat prin `http(s)://` —
  singurele astfel de URL-uri sunt linkuri simple (subsolul, paginile
  NVD/cve.org/BDU din lista de CVE-uri). Se afișează identic și într-o
  rețea complet închisă.
- **`cdn`** — încarcă Bootstrap și o temă [Bootswatch](https://bootswatch.com/)
  de pe un CDN și adaugă în pagină un avertisment vizibil că raportul are
  nevoie de acces la internet pentru a fi afișat cu stiluri. `html.theme`
  alege tema (`none`, `default` sau oricare dintre cele 26 de teme reale
  Bootswatch); `html.cdn` alege CDN-ul — `auto` (implicit) pune în
  competiție jsdelivr și cdnjs prin câte o cerere `HEAD` și trece la cel
  care răspunde primul, astfel încât blocarea unui CDN într-o anumită
  rețea nu strică și stilurile raportului. Prima afișare folosește
  întotdeauna jsdelivr; competiția doar *actualizează* ulterior foaia de
  stiluri. Raportul primește și un selector de teme, reținut pentru
  fiecare vizitator în `localStorage`-ul browserului, iar butonul de
  închidere al avertismentului este reținut în același mod — odată
  închis, rămâne închis în acel browser și în rapoartele regenerate.

Consultați [Configurare](/ro/configuration/#settingsyaml) pentru
exemplul complet de `settings.yaml`.

### Lista de CVE-uri

Cu un [bloc `cve:`](/ro/cve/) configurat, celula `CVES` din secțiunile
`compact` și `drift` devine un link care deschide lista de CVE-uri a
țintei respective: câte o linie pentru fiecare CVE, cele mai severe mai
întâi, cu linkuri către NVD, cve.org și, pentru constatările BDU, către
pagina bdu.fstec.ru, iar ratingul este afișat sub formă de insigne
colorate (`CRITICAL · CVSS 3.1 9.8`). Descrierea este textul în rusă din
BDU atunci când BDU conține CVE-ul, iar altfel textul în engleză din NVD.
Este realizată exclusiv în CSS (un modal `:target`), așa că funcționează
la fel și în modul `inline`, fără niciun script.

### Culorile rândurilor în modul CDN

Cu `html.assets: cdn`, fiecare rând primește o clasă contextuală
Bootstrap — roșu pentru o instanță eșuată, verde pentru una accesibilă —
în orice temă este configurată, nu o culoare fixă pe care enodia o
întreține pentru fiecare temă:

```html
<table class="table table-striped table-hover table-sm align-middle">
<thead><tr><th>PRODUCT</th><th>VERSION</th><th>STATUS</th><th>COUNT</th><th>INSTANCES</th></tr></thead>
<tbody>
<tr class="table-danger"><td>gitlab</td><td>(unknown)</td><td>auth</td><td>1</td><td>gitlab-2</td></tr>
<tr class="table-success"><td>gitlab</td><td>18.2.1</td><td>ok</td><td>1</td><td>gitlab-1</td></tr>
<tr class="table-danger"><td>jira</td><td>(unknown)</td><td>unreachable</td><td>1</td><td>jira-staging</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.1</td><td>ok</td><td>1</td><td>jira-3</td></tr>
<tr class="table-success"><td>jira</td><td>10.3.2</td><td>ok</td><td>2</td><td>jira-1, jira-2</td></tr>
</tbody>
</table>
```

### Subsol și favicon

Subsolul fiecărui raport generat conține linkuri către proiectul de pe
GitHub, precum și către `enodia.sh` și `docs.enodia.sh` — simple
`<a href>`, nu încărcări de resurse, deci nu afectează garanția offline a
modului `inline` (aceasta se referă strict la resursele *încărcate*, nu
la textul inert al hiperlinkurilor). Ambele moduri primesc și un favicon
pentru tab: `inline` încorporează direct în fișier o mică copie base64 a
`apple-touch-icon.png` de pe `enodia.sh` (nu întregul `favicon.ico`
multi-rezoluție, care ar adăuga aproximativ o jumătate de megabyte
fiecărui raport pentru o pictogramă de tab); modul `cdn` face în schimb
legătura către pictogramele live de pe `enodia.sh`, deoarece acest mod
are oricum nevoie de acces la internet pentru a fi afișat.

### Resurse terțe

`html.assets: cdn` încarcă Bootstrap și, cu excepția cazului
`html.theme: none`, o temă Bootswatch — ambele sub licență MIT — de pe
jsdelivr sau cdnjs în momentul în care cineva deschide raportul într-un
browser. Niciuna nu este inclusă în enodia în sine sau în vreun artefact
de lansare; fiecare raport în modul CDN le menționează pe amândouă după
nume, cu un link către licența lor, în propriul subsol.

## Istoric pe baza mai multor inventare

`enodia collect -o "$(date +%F).jsonl"` rulat după un program produce
deja aproape tot ce îi trebuie lui `enodia history` — un director de
inventare datate. `history --dir <that directory>` citește fiecare fișier
`*.jsonl` din el și îl evaluează la momentul propriei colectări,
construind câte o cronologie pentru fiecare ID de țintă. Consultați
[Referință CLI](/ro/cli-reference/#enodia-history).
