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

## 2.2.0+0 — 2026-10-09

`enodia cve update` descarcă singur bazele de date CVE, datele de
securitate proprii producătorilor (MariaDB, Atlassian, PostgreSQL, nginx)
se alătură BDU și NVD, potrivirea CVE ajunge la iLO 4, iDRAC și Synology
DSM și apar 27 de sonde noi — 123 în total. Fiecare cheie `cve:` nouă
este opțională, iar configurațiile și inventarele 2.1 funcționează
nemodificate — cu excepția unei credențiale de un tip pe care produsul ei
nu îl citește niciodată, care este acum o eroare (vedeți Corectat).

### Adăugat

- **[`enodia cve update`](/ro/cve/#enodia-cve-update)** descarcă bazele
  de date CVE pe care le numește fiecare `cve.*.path` configurat — BDU,
  NVD (anul curent, anul trecut și anii lipsă; `--all-years` pentru toți),
  Debian, OVAL și Alpine (versiunile deja existente pe disc, cele de care
  au nevoie inventarele `--from`, `--oval`/`--alpine`), MariaDB,
  Atlassian, PostgreSQL (`--postgresql` pentru paginile per versiune
  majoră) și nginx. If-Modified-Since; o descărcare înlocuiește un fișier
  doar după ce acesta se încarcă. TLS este verificat față de rădăcinile
  sistemului plus `cve.update.ca_file` și `cve.update.ca_dir` sau deloc,
  cu `cve.update.tls_skip_verify`. Toate celelalte comenzi continuă să nu
  descarce niciodată nimic.
- **27 de sonde noi:**
  - [`splunk`](/ro/configuration/products/splunk/) — API-ul de management al splunkd pe 8089, Basic sau un token Splunk.
  - [`code-server`](/ro/configuration/products/code-server/) — `codeServerVersion` din pagina de autentificare.
  - [`phpipam`](/ro/configuration/products/phpipam/) — subsolul paginii de autentificare și versiunea resurselor.
  - [`domainmod`](/ro/configuration/products/domainmod/) — CHANGELOG-ul din rădăcina sa web.
  - [`netdata`](/ro/configuration/products/netdata/) — `/api/v1/info` anonim al agentului.
  - [`libretranslate`](/ro/configuration/products/libretranslate/) — documentul OpenAPI public `/spec`.
  - [`torrserver`](/ro/configuration/products/torrserver/) — `/echo`.
  - [`kafka`](/ro/configuration/products/kafka/) — versiunea brokerului prin SSH, din propriul său jar, opțional într-un container; build-urile Confluent Platform sunt raportate ca `confluent`, cu linia Apache Kafka pe care o conțin.
  - [`home-assistant`](/ro/configuration/products/home-assistant/) — `/api/config` cu un token de acces de lungă durată, `kind: bearer`.
  - [`openhab`](/ro/configuration/products/openhab/) — rădăcina REST anonimă `/rest/`.
  - [`doxygen`](/ro/configuration/products/doxygen/) — ce versiune Doxygen a generat un site de documentație, din marcajul său de generator.
  - [`qbittorrent`](/ro/configuration/products/qbittorrent/) — API-ul Web UI după o autentificare prin formular, `kind: password`.
  - [`netbox`](/ro/configuration/products/netbox/) — `data-netbox-version` din pagina de autentificare anonimă.
  - [`greenbone`](/ro/configuration/products/greenbone/) — (aliasuri `openvas`, `gsad`) versiunea gsad din răspunsul său `/gmp`, fără autentificare.
  - [`posthog`](/ro/configuration/products/posthog/) — commitul git al PostHog găzduit local, din pagina sa de autentificare anonimă.
  - [`uptime-kuma`](/ro/configuration/products/uptime-kuma/) — se autentifică prin API-ul socket.io al Uptime Kuma (`kind: password`) și citește versiunea trimisă după autentificare.
  - [`wapt`](/ro/configuration/products/wapt/) — `/ping` anonim al serverului WAPT.
  - [`minio`](/ro/configuration/products/minio/) — `minio --version` prin SSH, opțional într-un container; numele `RELEASE.<timestamp>` ale MinIO se compară acum ca versiuni.
  - [`sentry`](/ro/configuration/products/sentry/) — versiunea Sentry găzduit local din pagina sa de autentificare anonimă.
  - [`zookeeper`](/ro/configuration/products/zookeeper/) — cuvântul de patru litere `srvr`.
  - [`ghost`](/ro/configuration/products/ghost/) — `/ghost/api/admin/site/` anonim, care oferă major.minor.
  - [`onlyoffice`](/ro/configuration/products/onlyoffice/) — și [`euro-office`](/ro/configuration/products/euro-office/): ONLYOFFICE Docs și fork-ul său Euro-Office, citite anonim din `/index.html` al serverului de documente; un server al celeilalte mărci este refuzat, cu indicarea produsului de folosit.
  - [`weblate`](/ro/configuration/products/weblate/) — subsolul anonim „Powered by Weblate”.
  - [`memcached`](/ro/configuration/products/memcached/) — comanda `version` a protocolului text, fără credențiale.
  - [`rabbitmq`](/ro/configuration/products/rabbitmq/) — `/api/overview` al pluginului de management, `kind: basic`.
  - [`cassandra`](/ro/configuration/products/cassandra/) — `release_version` prin protocolul nativ CQL v4, `kind: password` când clusterul are PasswordAuthenticator.
- **CVE-uri pentru țintele [`mariadb`](/ro/configuration/products/mariadb/).**
  BDU și NVD acoperă acum MariaDB, iar un nou `cve.mariadb.path` citește
  tabelul propriu al MariaDB cu CVE-urile corectate (`community-server.md`),
  care cunoaște versiunea de corectare pentru fiecare serie. Acolo unde
  tabelul MariaDB cunoaște un CVE, verdictul său înlocuiește intervalele
  deschise ale BDU și NVD, astfel încât cea mai recentă versiune a unei
  serii întreținute nu mai este semnalată pentru CVE-uri corectate doar în
  serii mai noi — consultați
  [Datele proprii ale producătorilor](/ro/cve/#datele-proprii-ale-producătorilor).
- **`cve.atlassian.path`**: datele CVE proprii ale Atlassian, per
  versiune, pentru `jira`, `confluence`, `bitbucket` și `bamboo`, inclusiv
  CVE-urile dependențelor terțe. Evaluare în cadrul fiecărei ramuri;
  pentru o versiune pe care Atlassian o enumeră, verdictul său are
  prioritate — consultați [Atlassian](/ro/cve/#atlassian).
- **`cve.postgresql.path` și `cve.nginx.path`**: paginile de securitate
  proprii ale proiectelor, cu versiunea de corectare per ramură.
  Versiunile curente PostgreSQL 17/16/15/14 și nginx 1.30.5 nu mai
  afișează intervalele fără ramură ale BDU — consultați
  [PostgreSQL](/ro/cve/#postgresql) și [nginx](/ro/cve/#nginx).
- **CVE-uri pentru încă 24 de produse**: cassandra, code-server,
  domainmod, doxygen, ghost, greenbone, home-assistant, kafka, memcached,
  minio, netbox, netdata, onlyoffice, openhab, pfsense, phpipam,
  qbittorrent, rabbitmq, sentry, splunk, uptime-kuma, wapt, weblate,
  zookeeper. Versiunile cu marcaj temporal ale MinIO se compară; pfSense
  CE și Splunk Enterprise omit intervalele altor ediții; build-urile
  Kafka Confluent nu primesc nicio căutare.
- **CVE-uri pentru [`hp-ilo4`](/ro/configuration/products/hp-ilo4/),
  [`dell-idrac`](/ro/configuration/products/dell-idrac/) și
  [`synology-dsm`](/ro/configuration/products/synology-dsm/).** iDRAC este
  potrivit per generație, citită din modelul Redfish; DSM compară
  versiunea, build-ul și Update-ul (`7.2.1-69057-6`), iar sonda
  înregistrează acum Update-ul în `extra.update` — consultați
  [Dell iDRAC și Synology DSM](/ro/cve/#dell-idrac-și-synology-dsm).
  În total, 91 dintre cele 123 de produse sunt acum potrivite — consultați
  [ce produse sunt potrivite](/ro/cve/#ce-produse-sunt-potrivite).
- O pagină [Confidențialitate](/ro/privacy/): la ce se conectează enodia
  (țintele dumneavoastră, endoflife.date, API-ul GitHub — doar nume de
  produse și de depozite — și, doar pentru `enodia cve update`,
  publicatorii bazelor de date CVE) și ce stochează (doar propriile
  dumneavoastră fișiere și un cache local). Fără telemetrie.

### Modificat

- Resolverul `github` omite versiunile al căror tag denumește o
  pre-versiune (`5.3.0.M2`, `2026.10.0b7`, `-rc1`, `-beta.1`), chiar și
  atunci când GitHub nu le marchează ca atare; citește ca versiuni
  tag-urile scrise cu underscore (`Release_1_18_0`) și cele cu prefixul
  `release-` (`release-5.2.4`); și elimină un `<repo>-`/`<repo>_` inițial
  din tag-uri, astfel încât `weblate-2026.10` este citit ca `2026.10` —
  consultați [Produse acceptate](/ro/products/).
- [`teamcity`](/ro/configuration/products/teamcity/) funcționează fără
  credențiale: fără niciuna configurată, citește anonim
  `/app/rest/server/version`, accesibil pe fiecare TeamCity verificat de la
  2017.2 până la 2026.1, chiar și cu autentificarea ca guest dezactivată.
  Un token selectează în continuare `/app/rest/server`, ca înainte.

### Corectat

- CVE-urile [`jenkins`](/ro/configuration/products/jenkins/): o versiune
  LTS corectată nu mai este semnalată de intervalul weekly al aceleiași
  corecții (LTS 2.568.3 de „before 2.580”). Intervalele weekly și LTS se
  aplică acum doar propriei linii de versiuni.
- Resolverul `github` nu mai eșuează pe depozitele a căror listă de
  versiuni depășește 1 MiB (cea a minio/minio are 3,4 MB): acum citește
  până la 8 MiB.
- **O credențială de un tip pe care produsul său nu îl trimite niciodată
  este acum o eroare de configurare**, în loc să fie ignorată tacit.
  `kind: password` pe un produs HTTP (RouterOS, Harbor, …) trimitea
  cererea fără niciun antet `Authorization`; `config validate` numește
  acum tipurile pe care produsul le acceptă — pentru o autentificare web,
  acesta este `kind: basic`. **Verificați-vă configurația înainte de
  upgrade**: o rulare cu o astfel de credențială refuză acum să pornească.
  Consultați [Configurare → Credențiale](/ro/configuration/#credențiale).

## 2.1.1+0 — 2026-10-08

### Corectat

- MariaDB 11.0+ nu își mai maschează versiunea în spatele `5.5.5-`
  (`11.4.9-MariaDB-…`), așa că [`mysql`](/ro/configuration/products/mysql/)
  înregistra astfel de servere ca MySQL, iar
  [`mariadb`](/ro/configuration/products/mariadb/) le refuza. Acum ambele
  sonde recunosc MariaDB în oricare dintre cele două forme. O țintă
  `product: mysql` îndreptată spre MariaDB 11.0+ eșuează acum — schimbați-o
  în `product: mariadb`.

## 2.1.0+0 — 2026-10-01

Corelarea CVE ajunge până la pachetele instalate pe zece distribuții
Linux și apar șase sonde noi. Nimic nu se strică: noile chei `cve:` sunt
opționale, iar inventarele doar primesc câmpuri opționale, așa că
configurațiile și inventarele 2.0 funcționează nemodificate.

### Adăugat

- **[CVE-uri la nivel de pachet pentru distribuțiile Linux](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).**
  Sondele de sistem de operare citesc acum și pachetele instalate și
  kernelul care rulează, în aceeași unică interogare SSH, iar datele de
  securitate proprii fiecărei distribuții sunt potrivite per pachet.
  Fiecare sursă este un fișier pe care îl descărcați, ca BDU și NVD:
  - `cve.debian.path` — JSON-ul Debian Security Tracker, pentru
    [`debian`](/ro/configuration/products/debian/).
  - `cve.oval.path` — fișiere OVAL ale producătorilor, câte unul per
    versiune, pentru [`ubuntu`](/ro/configuration/products/ubuntu/),
    [`linuxmint`](/ro/configuration/products/linuxmint/) (prin baza sa
    Ubuntu), [`rhel`](/ro/configuration/products/rhel/),
    [`rocky-linux`](/ro/configuration/products/rocky-linux/) (cu fișierul
    Red Hat — cel propriu al Rocky este refuzat ca inutilizabil),
    [`almalinux`](/ro/configuration/products/almalinux/),
    [`oracle-linux`](/ro/configuration/products/oracle-linux/),
    [`astra-linux`](/ro/configuration/products/astra-linux/) (SE 1.7/1.8)
    și [`redos`](/ro/configuration/products/redos/) (7.3/8.0). OVAL-ul
    parsat este memorat în cache, ca BDU și NVD.
  - `cve.alpine.path` — secdb-ul Alpine, pentru
    [`alpine-linux`](/ro/configuration/products/alpine-linux/).
- Sunt raportate doar CVE-urile care au deja o corecție mai nouă decât
  ce este instalat — ceea ce ar închide un upgrade (și, pentru kernel, o
  repornire). O constatare per pachet, cu link către avizul care conține
  corecția (USN, RHSA, ALSA, ELSA, buletin Astra, ROS, pagina din
  trackerul Debian/Alpine), cu toate CVE-urile pliate sub ea în raportul
  HTML.
- Potrivirea urmează regulile proprii fiecărui manager de pachete:
  ordonarea versiunilor dpkg, rpm și apk, fluxurile de module AppStream,
  arhitectura și variantele FIPS și Ksplice ale Oracle, precum și
  kernelul care rulează, nu orice pachete de kernel ar fi instalate.
  Fiecare sursă a fost verificată încrucișat cu instrumentul de referință
  (`oscap oval eval`, `dnf updateinfo`, python3-apt, `apk version -t`) pe
  containere reale, cu rezultate identice.
- Sonde noi: [`mariadb`](/ro/configuration/products/mariadb/),
  [`pfsense`](/ro/configuration/products/pfsense/) (Community Edition,
  prin SSH), [`supermicro-bmc`](/ro/configuration/products/supermicro-bmc/),
  [`dell-idrac`](/ro/configuration/products/dell-idrac/) și
  [`hp-ilo4`](/ro/configuration/products/hp-ilo4/) (prin Redfish), precum
  și [`freeradius`](/ro/configuration/products/freeradius/) (prin SSH, cu
  `options.container` pentru un FreeRADIUS în Docker sau Podman). 96 de
  sonde în total.
- Rezolvatorul `github-tag-branches`: câte un ciclu de viață per
  major.minor din tag-urile GitHub, pentru proiectele care întrețin mai
  multe ramuri simultan (FreeRADIUS 3.0.x și 3.2.x).
- FreeRADIUS este potrivit atât în NVD, cât și în BDU.

### Corectat

- Notația prescurtată „8.0 U3k” a VMware din calendarul ciclului de
  viață este acum considerată egală cu „8.0.3”: o gazdă
  [vCenter](/ro/configuration/products/vcenter/) sau
  [ESXi](/ro/configuration/products/esxi/) 8.0 actualizată nu mai apare
  ca `ahead`.
- Coloanele LATEST/CYCLE afișează versiuni curățate pentru produsele
  rezolvate prin GitHub, nu tag-ul brut (`2026.9.1`, nu `v2026.9.1`).
- `config validate` raportează un fișier `cve.*.path` lipsă, în loc să
  treacă și să eșueze mai târziu în `check`.

### Note

- O gazdă [Proxmox VE](/ro/configuration/products/proxmox/) primește
  constatări la nivel de pachet printr-o a doua țintă SSH `debian`,
  alături de ținta sa API `proxmox`; pachetul `linux` al Debian este
  potrivit doar cu un kernel Debian care rulează, astfel încât kernelul
  propriu al Proxmox nu este confundat cu unul.
- Cu toate sursele configurate simultan (BDU, NVD, Debian, opt fișiere
  OVAL, Alpine), `check` a durat ~22 s la rece și ~3,4 s la cald, cu un
  vârf de ~0,5–0,6 GB — mai puțin dacă `cve.oval.path` conține doar
  versiunile pe care le rulați.
- Istoricul depozitului a fost rescris și resemnat pentru a elimina
  numele de gazdă interne; fiecare tag a fost recreat pe istoricul
  rescris. Binarele de lansare până la 2.0.0+0 raportează hash-uri de
  commit de dinainte de rescriere.
- MariaDB, pfSense și sondele BMC nu au încă o mapare CVE.

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
  Consultați [cum le descărcați](/ro/cve/#descărcarea-bazelor-de-date),
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
