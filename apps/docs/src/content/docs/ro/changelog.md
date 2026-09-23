---
title: Jurnal de modificări
description: Modificările notabile din enodia, versiune cu versiune.
---

Sursa canonică este
[`CHANGELOG.md`](https://github.com/EpicMorg/enodia/blob/master/CHANGELOG.md)
al enodia — această pagină îl reflectă, fiind sincronizată împreună cu
restul acestui site la fiecare lansare, cu linkuri către restul acestei
documentații acolo unde o modificare afectează modul în care ați
configura efectiv ceva. Tag-urile urmează formatul
`MAJOR.MINOR.PATCH+BUILD`, fără prefixul `v`; `+BUILD` reprezintă
metadate de build semver, folosite doar pentru un rebuild fără
modificări funcționale, nu pentru a evita o creștere reală a versiunii.

## 2.0.0+0 — 2026-09-23

O versiune majoră pentru o funcționalitate majoră, nu pentru o
incompatibilitate: corelarea CVE este prima axă de evaluare care nu
ține de ciclul de viață. Fișierele existente `enodia.yaml`,
`settings.yaml` și de inventar funcționează nemodificate — noul bloc
`cve:` este opțional, iar o configurație fără el se comportă exact ca în
1.2.

### Adăugat

- **[Corelare CVE](/ro/cve/)** cu două baze de date locale, BDU FSTEC și
  NIST NVD. enodia nu le descarcă niciodată: dumneavoastră descărcați
  `vulxml.zip` din BDU și fișierele anuale NVD
  `nvdcve-2.0-<year>.json.gz` și indicați-le prin `cve.bdu.path` /
  `cve.nvd.path` în `enodia.yaml` (un fișier sau, pentru NVD, un
  director de fișiere). Oricare sursă funcționează și singură. Ambele
  sunt parsate în flux și memorate în cache: prima rulare după
  modificarea unei baze de date durează aproximativ un minut pentru
  întregul NVD plus BDU, fiecare rulare ulterioară sub o secundă.
  Consultați [cum le descărcați](/ro/cve/#enodia-nu-descarcă-niciodată-singur-bazele-de-date),
  inclusiv certificatul CA suplimentar de care are nevoie bdu.fstec.ru.
- **52 de sonde potrivite** (53 de nume de produse în amonte — `ssh`
  contează atât ca OpenSSH, cât și ca Dropbear), fiecare sondă cu date
  utilizabile în oricare dintre surse. Nepotrivite în mod deliberat,
  fiecare dintr-un motiv declarat: distribuțiile Linux de uz general
  (CVE-urile lor sunt la nivel de pachet), sistemele BSD și Solaris,
  ESXi/vCenter și Synology DSM (niveluri de patch și sufixe de build pe
  care mecanismul de potrivire încă nu le citește) — consultați
  [ce produse sunt potrivite](/ro/cve/#ce-produse-sunt-potrivite) și
  pagina fiecărui produs.
- **Potrivire în funcție de ediție** pentru
  [GitLab](/ro/configuration/products/gitlab/),
  [Vault](/ro/configuration/products/vault/),
  [Nextcloud](/ro/configuration/products/nextcloud/) și
  [MongoDB](/ro/configuration/products/mongodb/): o instanță community nu
  mai vede constatările exclusiv enterprise (pe date reale, GitLab
  19.2.2 CE vede 4 din cele 9 ale NVD, Nextcloud 27.1.3 CE 11 din 23).
  Cele patru sonde înregistrează acum ediția serverului în
  `extra.enterprise`; o ediție necunoscută păstrează toate
  constatările.
- Țintele [`ssh`](/ro/configuration/products/ssh/) sunt potrivite ca
  OpenSSH sau Dropbear după banner; orice alt stack SSH nu primește
  nicio căutare CVE, în loc să primească CVE-urile OpenSSH.
- O **coloană `CVES`** în [vizualizările compact și drift](/ro/views/)
  ale `check`, care numără CVE-urile distincte.
- O **listă per CVE** în [`export --format html`](/ro/reporting/#lista-de-cve-uri),
  realizată exclusiv în CSS, fără JavaScript, astfel încât raportul
  inline rămâne un fișier offline cu zero `<script>`: câte o linie pentru
  fiecare CVE, cu linkuri către NVD, cve.org și bdu.fstec.ru, textul în
  rusă din BDU atunci când BDU conține CVE-ul, un rating colorat
  `CRITICAL · CVSS 3.1 9.8`, cele mai severe mai întâi.
- [`export --format json`](/ro/reporting/#--format-json) conține fiecare
  constatare per sursă în `cves` al fiecărei evaluări, inclusiv un
  rating CVSS structurat, parsat din ambele surse.
- Sonda [`fortios`](/ro/configuration/products/fortios/) pentru Fortinet
  FortiGate, prin REST API-ul său, cu un token REST API Admin.
- Rapoartele HTML în modul CDN rețin pentru fiecare vizitator
  închiderea avertismentului „necesită acces la internet”.

### Note

- Blocul `cve:` este citit din configurația pe care o folosește efectiv
  rularea — `--config`, `$ENODIA_CONFIG` sau căile de căutare implicite.
- Căile Windows funcționează fără ghilimele, între ghilimele simple, cu
  slash-uri normale sau ca căi UNC. Între ghilimele duble în YAML, `\t`
  și `\n` devin un tab și o linie nouă, așa că o astfel de cale este
  respinsă la încărcare, cu un indiciu.
- `cisco-ios-xe` a fost scos definitiv din planul de dezvoltare.

## 1.2.1+0 — 2026-09-10

### Corectat

- [`p4d`/`p4p`](/ro/configuration/products/p4d/#timp-limită) nu aplicau
  `timeout` subprocesului CLI `p4` pe care îl apelează — fiecare altă
  sondă din acest arbore își limitează propriul transport la `timeout`
  înainte de a accesa rețeaua, iar aceasta nu o făcea. Un proces `p4`
  blocat în încercarea de a se conecta la un server direct inaccesibil
  (niciun răspuns, niciun reset — exact comportamentul de rețea care
  este motivul pentru care aceste două sonde apelează `p4`) rămânea
  blocat la nesfârșit, oprind o întreagă rulare de colectare. Raportat
  direct pe baza unui blocaj real în producție.

## 1.2.0+0 — 2026-09-10

### Adăugat

- Sondele [`p4d`](/ro/configuration/products/p4d/) și
  [`p4p`](/ro/configuration/products/p4p/), pentru Perforce Helix Core
  Server și Perforce Proxy. Protocolul RPC de rețea al Perforce a fost
  complet decodificat prin inginerie inversă, iar un client construit
  manual i-a reprodus corect handshake-ul cu un proxy real, dar exact
  acel handshake, verificat ca fiind corect la nivel de byte, este
  ignorat tacit de serverele `p4d` directe reale, din motive care nu
  sunt vizibile din partea clientului. Ambele sonde apelează în schimb
  CLI-ul `p4` al operatorului — primele sonde din enodia care rulează un
  proces extern în loc să vorbească direct un protocol de rețea. Calea
  binarului este configurabilă pentru fiecare țintă prin
  [`options.binary`](/ro/configuration/#targets) (cu revenire la `p4`
  din `$PATH`); funcționează identic pe Windows, indicând `p4.exe`.
  Răspunsul unui proxy se deosebește de cel al unui server direct prin
  prezența câmpului propriu `proxyVersion` — fiecare sondă respinge
  forma celeilalte.

### Corectat

- Parserul ieșirii `p4 -Ztag` nu elimina terminațiile de linie Windows:
  un `p4.exe` real scrie `\r\n`, lăsând un `\r` la final în valorile
  câmpurilor precum `ServerID`.
- `probe.Observation.Resolver` (adăugat în 1.1.0+0 pentru
  [SonarQube](/ro/configuration/products/sonarqube/)) era o structură
  simplă, nu un pointer — `omitempty` din `encoding/json` nu are
  conceptul de „gol” pentru o valoare de tip structură, așa că fiecare
  observație serializa un `"resolver":{}` inutil în exporturile JSON, nu
  doar cele ale SonarQube. Corectat la un pointer, din același motiv
  pentru care `tlsVerified` poate fi deja null în loc de un simplu
  `false`.

## 1.1.1+0 — 2026-09-10

### Corectat

- [`debian`](/ro/configuration/products/debian/) raporta doar versiunea
  majoră (`13`) în loc de versiunea punctuală reală (`13.6`) —
  `VERSION_ID` din `/etc/os-release` al Debian nu o conține niciodată,
  nici măcar pe o instalare complet actualizată; versiunea punctuală se
  află doar în `/etc/debian_version`. `debian` a fost mutat de pe
  mecanismul comun `osReleaseFamilyProbe` pe propria sondă dedicată,
  care citește ambele fișiere și are încredere în `debian_version` doar
  după ce confirmă `ID=debian` și faptul că acesta conține un simplu
  număr cu puncte — s-a confirmat că o imagine Ubuntu reală livrează
  exact același fișier, cu un conținut moștenit lipsit de sens.
- [`ubuntu`](/ro/configuration/products/ubuntu/) avea aceeași lacună:
  `VERSION_ID` nu se schimbă niciodată după lansarea unei versiuni, așa
  că un host `22.04` complet actualizat raporta doar `22.04`, nu
  `22.04.5`. Și `ubuntu` a fost mutat de pe mecanismul comun pe propria
  sondă, care preferă versiunea punctuală din câmpul `VERSION` al
  `os-release` atunci când aceasta este strict mai precisă decât
  `VERSION_ID`. Fiecare alt produs din familia comună
  [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
  a fost auditat în același mod; niciunul dintre celelalte nu are
  această lacună.

Nicio modificare de configurație pentru niciunul — aceeași valoare
`product:`, aceleași credențiale, același endpoint. Doar `version`
raportat a devenit mai precis.

## 1.1.0+0 — 2026-09-10

### Adăugat

- Un rezolvator al ciclului de viață `github-tags`, pentru un produs care
  nu publică deloc GitHub Releases, ci doar tag-uri într-o formă fără
  puncte — i-a oferit lui [pgAdmin](/ro/configuration/products/pgadmin/)
  primul rezolvator funcțional (tag-urile `pgadmin-org/pgadmin4` sunt
  `REL-9_17`, convertite în `9.17`, alegând tag-ul cu cea mai mare
  valoare parsată, nu primul).
- Variabila de mediu **`GITHUB_TOKEN`** — autentifică fiecare căutare a
  ciclului de viață bazată pe GitHub, ridicând limita neautentificată de
  la 60 de cereri/oră la 5000/oră. Consultați
  [Produse acceptate](/ro/products/#aplicații-și-servicii-de-infrastructură).
- O sondă poate acum suprascrie rezolvatorul ciclului de viață al
  produsului său pentru fiecare observație, pentru cazul rar în care
  calendarul corect poate fi cunoscut doar după ce se vede răspunsul de
  versiune al producătorului. Folosit prima dată pentru a separa
  [SonarQube](/ro/configuration/products/sonarqube/) în SonarQube Server
  și SonarQube Community Build — două produse separate de la divizarea
  făcută de SonarSource la sfârșitul lui 2024, urmărite ca două pagini
  endoflife.date diferite, cu date diferite despre cicluri.

### Corectat

- Eșecurile rezolvatorului afișau în raport doar `resolver_error`, fără
  nicio modalitate de a deosebi o limită de rată GitHub de un eșec DNS
  sau de un API restructurat. `enodia check`/`export` afișează acum în
  stderr eroarea reală de bază atunci când se întâmplă acest lucru.
- SonarQube era comparat întotdeauna cu calendarul ciclului de viață
  Community Build, chiar și pentru o instanță SonarQube Server —
  colectarea versiunii funcționa, dar raportul afișa oricum un ciclu
  nepotrivit. Acum este rezolvat pentru fiecare instanță, pe baza
  șirului de versiune în sine.

### Modificat

- Publicarea imaginii de container (`ghcr.io/epicmorg/enodia`, oglindită
  și pe Docker Hub și Quay) a fost mutată complet din pipeline-ul de
  lansare al acestui repository în monorepo-ul `EpicMorg/docker`, după
  programul de build al acelui repository. Adresa imaginii publicate și
  tag-urile (`latest`, `1`, versiunea exactă) sunt neschimbate, dar
  imaginea în sine este acum doar `linux/amd64` și rulează ca root —
  consultați [Primii pași](/ro/getting-started/#instalare).

## 1.0.0+0 — 2026-09-09

Versiunea inițială. `collect → inventory.jsonl → evaluate → assessment → render`,
cap-coadă, verificat pe infrastructură reală de producție:

- **87 de sonde**, câte un fișier fiecare, compilate și înregistrate
  explicit — majoritatea vorbesc HTTP, unele
  ([Redis](/ro/configuration/products/redis/),
  [PostgreSQL](/ro/configuration/products/postgresql/),
  [MySQL](/ro/configuration/products/mysql/),
  [MongoDB](/ro/configuration/products/mongodb/)) vorbesc direct propriul
  protocol de rețea, iar un set în creștere (fiecare distribuție Linux
  importantă, sistemele BSD, macOS, OPNsense, Proxmox VE, TrueNAS,
  Synology DSM, echipamente de rețea) este accesat prin
  [SSH](/ro/configuration/products/ssh-os-probes/) sau printr-un API
  HTTP al producătorului, în loc să presupună că există un endpoint de
  versiune.
- [`product: generic`](/ro/configuration/products/generic/) — o sondă
  definită doar prin configurație, pentru orice sistem intern, cu un
  vocabular înghețat în mod deliberat (fără condiții, bucle sau
  șabloane).
- Rezolvarea ciclului de viață pe baza endoflife.date și a GitHub
  Releases, memorată în cache pe disc, evaluată pe trei axe
  independente (decalajul de patch, faza ciclului de viață, ramura mai
  nouă), în loc de un singur verdict comprimat — consultați
  [Concepte](/ro/concepts/).
- Patru [vizualizări ale raportului](/ro/views/) pentru ieșirea tabelară,
  HTML, JSON și Prometheus.
- [`enodia serve`](/ro/cli-reference/#enodia-serve) — un server HTTP
  bazat exclusiv pe snapshot-uri; un ticker în fundal colectează, iar
  handler-ele citesc întotdeauna doar ultimul snapshot.
- [Schema de configurare](/ro/configuration/) cu interpolare
  `${VAR}`/`${VAR:-default}`, un depozit dedicat de credențiale și
  fixarea TLS/opțiunea explicită pentru conexiuni nesigure pentru
  fiecare țintă.
- Pachete: `.deb`, `.rpm`, `.apk` și `.pkg.tar.zst` pentru Arch, un
  utilizator de sistem dedicat, neprivilegiat, `enodia`, pagini de
  manual pentru fiecare comandă, arhive simple pentru
  Linux/Windows/macOS/Android (Termux) și o imagine de container —
  consultați [Primii pași](/ro/getting-started/). Sumele de control
  sunt semnate cu cosign keyless (OIDC, fără nicio cheie de gestionat
  sau care să poată fi compromisă).
