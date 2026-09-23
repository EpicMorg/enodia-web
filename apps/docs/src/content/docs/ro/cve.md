---
title: Corelare CVE
description: Compararea fiecărei versiuni sondate cu BDU FSTEC și NIST NVD, din fișiere pe care le descărcați singuri.
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
constatările lor sunt combinate pentru fiecare CVE. Funcția este complet
opțională: o configurație fără bloc `cve:` se comportă exact ca în 1.x.

## enodia nu descarcă niciodată singur bazele de date

Dumneavoastră descărcați fișierele, decideți când să le reîmprospătați
și indicați enodia unde se află. enodia nu are nicio cale de cod care să
acceseze singură bdu.fstec.ru sau nvd.nist.gov — același raționament
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
`enodia config validate` verifică forma blocului (inclusiv verificarea
caracterelor de control de mai jos), dar nu și existența fișierelor —
aceasta este verificată doar atunci când o rulare le încarcă efectiv.

:::caution[Căi Windows]
Scrieți o cale Windows fără ghilimele, între ghilimele simple, cu
slash-uri normale sau ca o cale UNC. Între ghilimele **duble** în YAML,
`\t` și `\n` devin un tab și o linie nouă — `"C:\tmp\bdu.zip"` ar indica
tacit altundeva, așa că enodia respinge la încărcare o cale care conține
un caracter de control, oferind un indiciu.
:::

## Prima rulare și cache-ul

Ambele surse sunt parsate în flux, iar rezultatul este memorat în
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
  `CRITICAL · CVSS 3.1 9.8`. Este realizată exclusiv în CSS — raportul
  offline implicit continuă să nu conțină deloc JavaScript.
- **`export --format json`** — fiecare constatare per sursă, complet, în
  array-ul `cves` al fiecărei evaluări: sursa (`bdu`/`nvd`), ID-ul
  avizului, ID-urile CVE, titlul, textul propriu de severitate al sursei,
  numele de produs sau CPE-ul potrivit, intervalul de versiuni și un
  rating CVSS parsat. Spre deosebire de tabel și de lista HTML, care
  numără câte o linie pentru fiecare CVE, JSON păstrează separat
  constatarea fiecărei surse — același CVE poate apărea o dată din BDU și
  câte o dată pentru fiecare CPE NVD potrivit.
- **`export --format prometheus`** — fără date CVE.

**CVE-urile nu afectează severitatea sau codul de ieșire.** `SEVERITY`
este calculată în continuare doar din axele patch/ciclu de viață/ramură,
iar `--fail-on` cunoaște și el doar aceste trei axe — o constatare este
un fapt de examinat, nu un verdict pe care enodia l-a dat în numele
dumneavoastră. Dacă și cum ar trebui ca un CVE să escaladeze severitatea
este o întrebare deschisă în amonte.

## Ce produse sunt potrivite

52 dintre cele 90 de produse, fiecare nume de producător/produs fiind
verificat literal în exporturile complete reale — consultați pagina
fiecărui produs din [Configurarea produselor](/ro/products/) pentru
sursele sale.

Nepotrivite, fiecare dintr-un motiv anume:

- **Distribuțiile Linux de uz general** (Debian, Ubuntu, RHEL, Alma,
  Rocky, Fedora, RED OS, Astra Linux, …) — CVE-urile lor sunt
  vulnerabilități ale pachetelor; un număr de versiune nu poate spune ce
  pachete au fost corectate între timp.
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
- **Condițiile NVD cu mai multe produse** („vulnerabil doar cu biblioteca
  Y”) nu sunt evaluate — o sondă raportează un singur produs pentru
  fiecare țintă, așa că fiecare intrare vulnerabilă pentru un produs
  potrivit contează de sine stătător.
