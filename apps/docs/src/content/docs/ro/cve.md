---
title: Corelare CVE
description: Compararea fiecărei versiuni sondate cu BDU FSTEC și NIST NVD, iar a pachetelor instalate pe gazdele Linux cu datele de securitate proprii producătorilor — din fișiere pe care le descărcați singuri.
---

Începând cu 2.0, enodia vă poate spune ce vulnerabilități cunoscute
afectează versiunea exactă raportată de fiecare țintă — alături de axele
patch/ciclu de viață/ramură, nu în locul lor. Compararea se face cu două
baze de date publice:

- **BDU FSTEC** — baza de date de vulnerabilități a FSTEC (Rusia),
  [bdu.fstec.ru](https://bdu.fstec.ru/).
- **NIST NVD** — National Vulnerability Database a SUA,
  [nvd.nist.gov](https://nvd.nist.gov/).

Oricare dintre ele funcționează și singură; cu ambele configurate,
constatările lor sunt combinate pentru fiecare CVE.

MariaDB este potrivit, de asemenea, cu propriul său tabel de CVE-uri
corectate (vedeți
[MariaDB: tabelul propriu al producătorului](#mariadb-the-vendors-own-table)).

Începând cu 2.1, zece distribuții Linux sunt potrivite și **per pachet
instalat** cu datele de securitate proprii producătorilor lor — Debian
Security Tracker, fișierele OVAL ale producătorilor și secdb-ul Alpine
(vedeți
[CVE-uri la nivel de pachet pentru distribuțiile Linux](#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux)).

Totul este opțional: o configurație fără bloc `cve:` se comportă exact
ca în 1.x, iar fiecare sursă funcționează de sine stătător.

## enodia nu descarcă niciodată singur bazele de date

Dumneavoastră descărcați fișierele, decideți când să le reîmprospătați
și indicați enodia unde se află. enodia nu are nicio cale de cod care să
acceseze singură vreuna dintre aceste surse — același raționament
pentru rețele închise ca în cazul
[designului în două faze](/ro/concepts/#două-faze-separabile-în-mod-deliberat):
mașina care rulează `check` nu are nevoie de acces la internet pentru
corelarea CVE, ci doar de o copie a fișierelor.

### BDU FSTEC

Un singur fișier, exportul complet al FSTEC (aproximativ 33 MB arhivat):

```bash
curl -fL --cacert ru-chain.pem \
  -o /var/lib/enodia/cve/bdu/vulxml.zip \
  https://bdu.fstec.ru/files/documents/vulxml.zip
```

bdu.fstec.ru folosește un certificat emis de CA-ul național al Rusiei
(Ministerul Dezvoltării Digitale), care nu se află în depozitele de
încredere obișnuite ale sistemului — un simplu `curl` eșuează cu o
eroare de certificat. În plus, serverul nu trimite certificatul
intermediar, iar `curl` (spre deosebire de un browser) nu descarcă
singur un certificat lipsă, așa că instalarea doar a rădăcinii nu este
suficientă. Construiți un pachet din rădăcină și din intermediarul
indicat de certificatul site-ului:

```bash
curl -fsS -o root.crt https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
curl -fsS -o sub.crt  http://nuc-cdp.digital.gov.ru/cdp/subca_ssl_rsa2024.crt
{ cat root.crt; echo; cat sub.crt; } > ru-chain.pem
```

Verificat în practică pe 2026-09-23. Dacă nu mai funcționează, cel mai
probabil intermediarul a fost înlocuit: câmpul *Authority Information
Access* al certificatului site-ului indică intermediarul curent
(`openssl s_client -connect bdu.fstec.ru:443 | openssl x509 -noout -ext authorityInfoAccess`).
`curl -k` obține și el fișierul, dar omite verificarea a ceea ce urmează
să introduceți în raportul de securitate.

### NIST NVD

Câte un fișier pentru fiecare an, `nvdcve-2.0-<year>.json.gz`, din 2002
până în anul curent. Puneți fișierele dorite într-un singur director:

```bash
mkdir -p /var/lib/enodia/cve/nvd && cd /var/lib/enodia/cve/nvd
for y in $(seq 2002 "$(date +%Y)"); do
  curl -fsSLO "https://nvd.nist.gov/feeds/json/cve/2.0/nvdcve-2.0-$y.json.gz"
done
```

Fișierul anului curent este actualizat zilnic; cei mai vechi se modifică
rar. Fiecare fișier are un fișier însoțitor `.meta`
(`nvdcve-2.0-<year>.meta`) cu dimensiunea și `sha256` — rețineți că
hash-ul este al JSON-ului *necomprimat*, nu al `.gz`.

### Debian Security Tracker

Un singur fișier, exportul JSON complet al trackerului (aproximativ
80 MB), pentru țintele `debian`:

```bash
curl -fsSL -o /var/lib/enodia/cve/debian.json \
  https://security-tracker.debian.org/tracker/data/json
```

Funcționează și copiile `.json.gz` și `.json.zip`.

### OVAL-ul producătorilor

Câte un fișier pentru fiecare versiune de distribuție din parcul
dumneavoastră, toate într-un singur director, pentru țintele `ubuntu`,
`linuxmint`, `rhel`, `rocky-linux`, `almalinux`, `oracle-linux`,
`astra-linux` și `redos`:

| Ținte | Fișier |
|---|---|
| Ubuntu, Linux Mint (baza sa Ubuntu) | `https://security-metadata.canonical.com/oval/com.ubuntu.<codename>.usn.oval.xml.bz2` |
| RHEL **și Rocky Linux** | `https://security.access.redhat.com/data/oval/v2/RHEL<N>/rhel-<N>.oval.xml.bz2` |
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

Fișierele sunt preluate așa cum sunt publicate, `.xml` sau `.xml.bz2`.
Versiunea căreia îi este destinat un fișier este citită din conținutul
său, niciodată din nume — așa că cele două fișiere RED OS, publicate
amândouă ca `redos.xml`, au nevoie doar de nume distincte pe disc. Două
fișiere sunt refuzate intenționat, cu o eroare care indică fișierul de
folosit în schimb:

- **OVAL-ul propriu al Rocky Linux** (`org.rockylinux.rlsa-<N>.xml`) —
  conține doar o mică parte din avizele Rocky și nu trece validarea
  schemei OVAL. Rocky recompilează pachetele Red Hat cu aceleași
  versiuni, așa că gazdele Rocky sunt potrivite cu fișierul Red Hat.
- **Varianta `oci.` a Ubuntu** — verifică fișierul de stare dpkg cu
  expresii regulate în loc de pachete.

Toate URL-urile au fost verificate live pe 2026-10-02.

### Secdb-ul Alpine

Două fișiere pentru fiecare ramură Alpine din parcul dumneavoastră,
`main` și `community`, pentru țintele `alpine-linux`. Au aceleași nume
în toate ramurile, așa că salvați-le sub nume distincte:

```bash
mkdir -p /var/lib/enodia/cve/alpine && cd /var/lib/enodia/cve/alpine
for b in v3.20 v3.22; do
  for r in main community; do
    curl -fsSL -o "$b-$r.json" "https://secdb.alpinelinux.org/$b/$r.json"
  done
done
```

### Tabelul propriu de CVE-uri al MariaDB

Un singur fișier, pentru țintele `mariadb`: pagina proprie a MariaDB
„Security Vulnerabilities (CVE) Fixed in MariaDB Community Server”,
salvată ca atare în sursa sa Markdown (circa 320 KB):

```bash
curl -fsSL -o /var/lib/enodia/cve/mariadb.md \
  https://mariadb.com/docs/server/security/cve/community-server.md
```

Verificat live pe 2026-10-09.

## Configurare

Un bloc `cve:` în `enodia.yaml` — nu în `settings.yaml`, deoarece
modifică evaluarea, nu doar afișarea:

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
  mariadb:
    path: /var/lib/enodia/cve/mariadb.md
targets:
  - id: gitlab-main
    product: gitlab
    address: https://gitlab.example.com
    credentials: gitlab-token
```

| Câmp | Acceptă |
|---|---|
| `cve.bdu.path` | un `.xml`, `.zip` (exportul așa cum este publicat) sau `.tar.gz`/`.tgz` |
| `cve.nvd.path` | un singur fișier `.json`, `.json.gz` sau `.json.zip`, ori un director care le conține |
| `cve.debian.path` | exportul trackerului: `.json`, `.json.gz` sau `.json.zip` |
| `cve.oval.path` | un fișier OVAL (`.xml` sau `.xml.bz2`) sau un director care le conține |
| `cve.alpine.path` | un fișier secdb `.json` sau un director care le conține |
| `cve.mariadb.path` | `community-server.md` al MariaDB, salvat ca atare |

Căile relative se rezolvă față de directorul fișierului de configurare
care le menționează, la fel ca `credentials_file`. Blocul este citit din
configurația pe care o folosește efectiv rularea — `--config`,
`$ENODIA_CONFIG` sau [căile de căutare implicite](/ro/configuration/#locațiile-fișierelor).
Aceasta include și `check --from inventory.jsonl`: un inventar colectat
într-o rețea închisă este corelat oriunde rulează `check`, cu condiția
ca acolo să fie găsită o configurație cu bloc `cve:`. Dacă nu este
găsită nicio configurație, `check --from` funcționează în continuare,
doar fără CVE-uri.

**O cale configurată care nu există reprezintă o eroare**, nu o omitere
tacită — `check` se încheie cu `stat ...: no such file or directory` în
loc să producă un raport care, pe nesimțite, nu conține niciun CVE.
Începând cu 2.1, `enodia config validate` verifică și existența fiecărei
căi configurate, așa că o greșeală de scriere apare mai întâi acolo.
Dacă un fișier poate fi efectiv parsat se află în continuare doar atunci
când o rulare îl încarcă.

:::caution[Căi Windows]
Scrieți o cale Windows fără ghilimele, între ghilimele simple, cu
slash-uri normale sau ca o cale UNC. Între ghilimele **duble** în YAML,
`\t` și `\n` devin un tab și o linie nouă — `"C:\tmp\bdu.zip"` ar indica
tacit altundeva, așa că enodia respinge la încărcare o cale care conține
un caracter de control, oferind un indiciu.
:::

## Prima rulare și cache-ul

BDU și NVD sunt parsate în flux, iar rezultatul este memorat în
directorul cache al sistemului de operare (`$XDG_CACHE_HOME/enodia/cve`,
adică implicit `~/.cache/enodia/cve` pe Linux;
`~/Library/Caches/enodia/cve` pe macOS; `%LocalAppData%\enodia\cve` pe
Windows). Prima rulare după modificarea unui fișier îl parsează complet
— aproximativ un minut pentru întregul NVD plus BDU; măsurat pe
2026-09-23 doar cu BDU plus fișierul NVD pentru 2026, 25 s. Fiecare
rulare ulterioară citește cache-ul: 0,2 s pentru aceleași date, un cache
de 11 MB. Nu există TTL — cheia cache-ului o constituie fișierele
înseși (dimensiunea și momentul modificării) și tabelele de produse ale
enodia, așa că înlocuirea unui fișier, adăugarea unui an în directorul
NVD sau actualizarea enodia declanșează fiecare, de la sine, o
reconstruire.

OVAL-ul parsat este memorat în cache în același mod — aproximativ 11 s
pentru a parsa împreună fișierele Ubuntu noble, RHEL 9, AlmaLinux 9 și
Oracle Linux 9, cea mai mare parte fiind bzip2. Exportul trackerului
Debian (aproximativ o secundă de parsare) și secdb-ul Alpine (câteva
sute de KB) nu sunt memorate în cache. Cu toate sursele configurate
simultan (BDU, NVD, Debian, opt fișiere OVAL, Alpine), în amonte s-a
măsurat pentru `check` aproximativ 22 s la rece și 3,4 s la cald, cu un
vârf de 0,5–0,6 GB de memorie — mai puțin dacă `cve.oval.path` conține
doar versiunile pe care le rulați efectiv.

`enodia serve` recitește blocul `cve:` și fișierele la fiecare ciclu
`--interval` (ieftin, din cache), așa că înlocuirea fișierelor din cron
intră în vigoare fără repornirea serverului.

## Unde apar constatările

- **`check`** — o coloană `CVES` în [vizualizările `compact` și
  `drift`](/ro/views/): numărul de CVE-uri distincte care afectează
  exact acea versiune. `-` înseamnă nicio constatare — niciun CVE nu
  afectează acea versiune, nu există bloc `cve:` sau enodia nu potrivește
  produsul (vedeți mai jos); coloana în sine este întotdeauna prezentă.
  `lifecycle` și `fleet` nu au această coloană.
- **`export --format html`** — aceeași coloană, cu un link informativ
  care deschide o listă pentru fiecare țintă: câte o linie pentru fiecare
  CVE, cele mai severe mai întâi, cu linkuri către NVD, cve.org și,
  pentru constatările BDU, către pagina bdu.fstec.ru; textul în rusă din
  BDU atunci când BDU conține CVE-ul, altfel descrierea în engleză din
  NVD; iar ratingul sub formă de insigne colorate, de exemplu
  `CRITICAL · CVSS 3.1 9.8`. Constatările la nivel de pachet sunt în
  schimb câte o linie per pachet — `linux 6.12.107-1 → 6.12.111-1`, cu
  link către avizul care conține corecția, cu lista sa de CVE-uri pliată
  dedesubt. Este realizată exclusiv în CSS — raportul offline implicit
  continuă să nu conțină deloc JavaScript.
- **`export --format json`** — fiecare constatare per sursă, complet, în
  array-ul `cves` al fiecărei evaluări: sursa (`bdu`/`nvd`), ID-ul
  avizului, ID-urile CVE, titlul, textul propriu de severitate al sursei,
  numele de produs sau CPE-ul potrivit, intervalul de versiuni și un
  rating CVSS parsat. Spre deosebire de tabel și de lista HTML, care
  numără câte o linie pentru fiecare CVE, JSON păstrează separat
  constatarea fiecărei surse — același CVE poate apărea o dată din BDU și
  câte o dată pentru fiecare CPE NVD potrivit. Constatările la nivel de
  pachet (sursa `debian`, `oval` sau `alpine`) conțin și versiunea
  instalată și cea corectată — vedeți [Raportare](/ro/reporting/#--format-json).
- **`export --format prometheus`** — fără date CVE.

**CVE-urile nu afectează severitatea sau codul de ieșire.** `SEVERITY`
este calculată în continuare doar din axele patch/ciclu de viață/ramură,
iar `--fail-on` cunoaște și el doar aceste trei axe — o constatare este
un fapt de examinat, nu un verdict pe care enodia l-a dat în numele
dumneavoastră. Dacă și cum ar trebui ca un CVE să escaladeze severitatea
este o întrebare deschisă în amonte.

## Ce produse sunt potrivite

64 dintre cele 96 de produse: 54 după numele produsului în BDU și NVD
(MariaDB și cu propriul său tabel — vedeți [mai jos](#mariadb-the-vendors-own-table)),
fiecare nume de producător/produs fiind verificat literal în exporturile
complete reale, și 10 distribuții Linux per pachet instalat (vedeți
secțiunea următoare). Consultați pagina fiecărui produs din
[Configurarea produselor](/ro/products/) pentru sursele sale.

Nepotrivite, fiecare dintr-un motiv anume:

- **Celelalte distribuții Linux de uz general** (Fedora, CentOS
  Stream, Amazon Linux, openSUSE, …) — CVE-urile lor sunt vulnerabilități
  ale pachetelor, un număr de versiune nu poate spune ce pachete au fost
  corectate între timp și încă nu există o sursă la nivel de pachet
  pentru ele.
- **Sistemele BSD și Oracle Solaris** — NVD înregistrează nivelurile lor
  de patch (`-p5` la FreeBSD, errata OpenBSD) într-un câmp CPE pe care
  acest mecanism de potrivire nu îl citește; potrivirea doar după versiune
  ar semnala un host complet actualizat cu fiecare CVE corectat vreodată
  în acea versiune.
- **ESXi și vCenter** — aceeași problemă: aproape toate intrările lor
  sunt literale de tipul `7.0` + `update_1`.
- **Synology DSM** — limite precum `6.2.4-25556-3`, pe care parserul
  strict de intervale le respinge.
- **TrueNAS** — prea puține intrări, versionate diferit față de ceea ce
  raportează sonda.
- **Nicio dată utilizabilă în niciuna dintre surse** — Kitsu, Zou,
  postgres_exporter, Perforce Proxy, Perforce Helix Swarm.
- **`generic`** — un parser scris manual nu are o identitate de produs
  care să poată fi căutată.
- **Încă nemapate** — pfSense și cele trei sonde BMC (Supermicro,
  Dell iDRAC, HP iLO 4), toate noi în 2.1. În amonte,
  maparea lor CVE a fost lăsată pentru o etapă ulterioară, dedicată.

## CVE-uri la nivel de pachet pentru distribuțiile Linux

Un număr de versiune nu poate spune ce pachete de pe o gazdă au fost
corectate între timp, așa că aceste zece distribuții sunt potrivite în
schimb per pachet instalat. Sondele lor citesc pachetele instalate și
kernelul care rulează în aceeași interogare SSH cu versiunea însăși, iar
fiecare pachet este verificat cu datele de securitate proprii
distribuției sale:

| Sondă | Sursă | Cheie |
|---|---|---|
| `debian` | Debian Security Tracker | `cve.debian.path` |
| `ubuntu` | OVAL Canonical | `cve.oval.path` |
| `linuxmint` | OVAL Canonical, pentru baza sa Ubuntu | `cve.oval.path` |
| `rhel`, `rocky-linux` | OVAL Red Hat | `cve.oval.path` |
| `almalinux` | OVAL AlmaLinux | `cve.oval.path` |
| `oracle-linux` | OVAL Oracle | `cve.oval.path` |
| `astra-linux` | OVAL Astra Linux (SE 1.7, 1.8) | `cve.oval.path` |
| `redos` | OVAL RED OS (7.3, 8.0) | `cve.oval.path` |
| `alpine-linux` | Secdb Alpine | `cve.alpine.path` |

**Sunt raportate doar CVE-urile care au deja o corecție mai nouă decât
ce este instalat** — ceea ce ar închide un upgrade (și, pentru kernel, o
repornire). CVE-urile pe care producătorul nu le-a corectat încă sunt
omise: sunt aceleași pe fiecare gazdă a unei versiuni și nimeni nu poate
acționa în privința lor, așa că le-ar îngropa pe cele care pot fi
rezolvate.

**O constatare per pachet, nu per CVE.** Doar un kernel rămas în urmă
poate avea peste o mie de CVE-uri; o listă per CVE ar fi imposibil de
citit. Fiecare constatare numește pachetul, versiunea sa instalată,
versiunea care închide toate CVE-urile din el și avizul care conține
acea corecție (USN, RHSA, ALSA, ELSA, buletin Astra, ROS sau pagina din
trackerul Debian/Alpine). Coloana `CVES` numără în continuare CVE-uri,
nu pachete.

**Versiunile sunt comparate după regulile proprii fiecărui manager de
pachete** — ordonarea dpkg, rpm și apk, verificată în amonte cu
`apt_pkg`, rpm și apk-tools pe mii de perechi reale de versiuni pentru
fiecare — plus fluxurile de module AppStream (un pachet este potrivit
doar cu corecțiile propriului flux), arhitectura Oracle Linux, variantele
FIPS și Ksplice și kernelul **care rulează**, nu orice pachete de kernel
s-ar întâmpla să fie instalate. Fiecare sursă a fost verificată încrucișat
în amonte cu `oscap oval eval`, `dnf updateinfo`, python3-apt sau
`apk version -t` pe gazde și containere reale, cu rezultate identice.

**Proxmox VE** primește constatări la nivel de pachet printr-o a doua
țintă: o țintă SSH [`debian`](/ro/configuration/products/debian/) pe
aceeași gazdă, alături de ținta sa API
[`proxmox`](/ro/configuration/products/proxmox/). Pachetul `linux` al
Debian este potrivit doar cu un kernel Debian care rulează, astfel încât
kernelul propriu al Proxmox nu este confundat cu unul.

### Potrivire în funcție de ediție

GitLab, HashiCorp Vault, Nextcloud și MongoDB publică liste de CVE-uri
separate pentru edițiile lor community și enterprise. Sondele lor
înregistrează ediția proprie a serverului în `extra.enterprise`, iar o
instanță community nu mai vede constatările exclusiv enterprise — pe
date reale, GitLab 19.2.2 CE vede 4 din cele 9 ale NVD, Nextcloud 27.1.3
CE 11 din 23. Când ediția este necunoscută (un server mai vechi care nu
o raportează), toate constatările sunt păstrate.

### SSH

Sonda [`ssh`](/ro/configuration/products/ssh/) acoperă orice
implementare SSH, așa că potrivirea se face după banner: `OpenSSH_…`
caută OpenSSH, `dropbear_…` caută Dropbear, iar orice alt stack SSH nu
primește nicio căutare, în loc să împrumute CVE-urile OpenSSH.

## MariaDB: tabelul propriu al producătorului

MariaDB întreține simultan cinci sau șase serii de versiuni, iar BDU și
NVD descriu amândouă o corectare dintr-o serie ca pe un interval deschis
(„before 11.4.10”) — care acoperă apoi și fiecare serie mai veche,
inclusiv pe cele care nu au avut niciodată eroarea. Pe versiunile reale
din parc, acest lucru a semnalat cele mai recente versiuni, complet
corectate, ale seriilor întreținute (10.11.19, 11.4.13), în timp ce
aceleași două baze de date au omis 9 dintre cele 21 de CVE-uri pe care
MariaDB însăși le enumeră pentru 10.11.8.

`cve.mariadb.path` adaugă tabelul propriu al MariaDB cu CVE-urile
corectate, care numește versiunea de corectare **pentru fiecare serie**.
Este combinat cu BDU și NVD, cu o singură regulă suplimentară: pentru un
CVE cunoscut de tabelul MariaDB, verdictul acestuia are prioritate — o
constatare BDU sau NVD ale cărei CVE-uri sunt acoperite de tabel și pe
care tabelul nu le semnalează pentru această versiune este eliminată.
CVE-urile pe care tabelul nu le enumeră (mai noi decât copia
dumneavoastră descărcată, existente doar în BDU sau fără identificator
CVE) provin în continuare din BDU și NVD.

Cum este citit tabelul:

- O serie cu propria corectare este vulnerabilă de la prima sa versiune
  până la acea corectare.
- O serie fără corectare proprie, care era încă întreținută când CVE-ul
  a fost corectat în altă serie, nu este afectată — MariaDB corectează
  toate seriile active împreună.
- O serie care se încheiase deja până atunci este semnalată pentru
  fiecare versiune, cu cea mai mică corectare dintr-o serie mai nouă
  drept versiunea la care să treceți (`FixStatus` indică acest lucru).
  Aceasta înclină intenționat spre raportare, și doar pentru seriile
  încheiate.

Fără `cve.mariadb.path`, țintele `mariadb` sunt potrivite în continuare
doar cu BDU și NVD — cu problema de suprapunere descrisă mai sus.

## Limitări cunoscute

- **BDU poate raporta în exces între ramuri.** O intrare BDU enumeră
  adesea câte un interval separat pentru fiecare ramură de mentenanță,
  toate având aceeași limită inferioară, astfel încât o versiune care
  este deja corecția pe propria ramură poate totuși să se încadreze în
  intervalul mai larg al unei ramuri înrudite (Confluence 8.3.3 față de
  CVE-2023-22515 este exemplul documentat). Intervalele NVD pentru
  același CVE au propriile limite inferioare și nu au această problemă.
  enodia preferă în mod deliberat să raporteze o constatare care trebuie
  verificată suplimentar decât să rateze tacit una reală.
- **Intrările NVD fără nicio constrângere de versiune sunt eliminate.**
  Măsurate pe exporturile complete, acestea erau aproape toate CVE-uri
  vechi de decenii atașate unor versiuni actuale; costul este rarul CVE
  cu adevărat necorectat înregistrat în acest mod.
- **Acoperirea la nivel de pachet are propriile lacune.** Trackerul
  Debian acoperă doar versiunile încă susținute de echipa de securitate
  Debian (bookworm, trixie, testing, sid) — gazdele mai vechi nu primesc
  constatări la nivel de pachet. Alpine edge nu are o ramură numerotată
  și nici nu primește. OVAL nu este evaluat ca de un interpretor complet:
  cheile de semnare ale pachetelor nu sunt verificate, așa că un pachet
  terț cu numele unui pachet al distribuției este comparat ca și cum ar
  fi al distribuției. Pachetele de kernel ale Astra Linux sunt comparate
  așa cum sunt instalate, nu așa cum rulează.
- **Condițiile NVD cu mai multe produse** („vulnerabil doar cu biblioteca
  Y”) nu sunt evaluate — o sondă raportează un singur produs pentru
  fiecare țintă, așa că fiecare intrare vulnerabilă pentru un produs
  potrivit contează de sine stătător.
