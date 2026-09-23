---
title: Identificarea sistemului de operare prin SSH
description: Cum funcționează familia de sonde SSH/os-release/uname din enodia — comună pentru 30 de produse de tip sistem de operare.
---

30 dintre produsele enodia — toate distribuțiile Linux, FreeBSD, OpenBSD,
NetBSD, macOS, Oracle Solaris, OPNsense și CentOS-ul vechi — sunt
identificate prin **SSH**, nu prin HTTP. Această pagină explică o singură
dată mecanismul comun; pagina proprie a fiecărui sistem de operare (cu
link din [Produse acceptate](/ro/products/)) indică doar valoarea
specifică `product:`, câmpul exact de identitate pe care îl verifică și
rezolvatorul ciclului de viață.

## Cum funcționează

O conexiune SSH, o comandă, o deconectare — acesta nu este un client
generic de execuție la distanță, ci exact cât este necesar pentru a citi
un singur fapt de identitate:

- **21 de produse** citesc `/etc/os-release` (fișierul de identitate
  standardizat de systemd, prezent în orice distribuție Linux modernă,
  plus propriul `/var/run/os-release` al FreeBSD, generat dinamic la
  pornire în aceeași formă `KEY=VALUE`) și verifică câmpul `ID` — un
  mecanism comun, generic (`osReleaseFamilyProbe`).
- **Încă 2** ([Debian](/ro/configuration/products/debian/),
  [Ubuntu](/ro/configuration/products/ubuntu/)) citesc tot
  `/etc/os-release`, dar printr-o sondă dedicată proprie, nu prin
  mecanismul generic de mai sus — ambele distribuții lasă `VERSION_ID`
  imprecis (cel al Debian nu conține niciodată o versiune de întreținere
  (point release); cel al Ubuntu rămâne fixat la prima lansare și nu
  reflectă niciodată o versiune de întreținere ulterioară), așa că
  fiecare citește mai departe pentru a obține versiunea reală: Debian
  verifică suplimentar `/etc/debian_version`, iar Ubuntu preferă câmpul
  `VERSION` din același fișier atunci când acesta este mai precis.
  Consultați paginile lor pentru detalii.
- **2 produse** (OpenBSD, NetBSD) nu au deloc un fișier echivalent cu
  os-release — sursa identității este în schimb `uname -sr` (`"<kernel name>
  <release>"`, de exemplu `"OpenBSD 7.9"`).
- **Încă 5** (Astra Linux, CentOS-ul vechi, macOS, OPNsense, Oracle
  Solaris) citesc fiecare un fișier sau o comandă de identitate distinctă,
  specifică produsului — consultați paginile lor.

`product:` este întotdeauna declarat explicit și verificat în raport cu
câmpul real de identitate, niciodată ghicit din răspuns (același
principiu pe care îl folosesc
[sondele Atlassian](/ro/configuration/products/jira/) pentru `<typeId>`
din manifestul lor) — a îndrepta o gazdă Debian spre `product: ubuntu`
este o greșeală reală de configurare, care eșuează explicit în loc să fie
înregistrată ca un fapt greșit.

## Configurare

```yaml
targets:
  - id: web-01
    product: debian          # sau orice alt produs de tip SO — consultați pagina sa
    address: web-01.example.com
    credentials: linux-host-ssh
    tls:
      pin_sha256:
        - "AB:CD:...:EF"      # sha256 al cheii SSH a gazdei
```

```yaml
credentials:
  linux-host-ssh:
    kind: ssh-key
    username: enodia-ro
    private_key_file: /etc/enodia/ssh/id_ed25519
```

Portul implicit este `22` atunci când `address` nu conține unul — fără
schemă, la fel ca la MySQL/Redis (un simplu `host:port`, nu un URL).

## Autentificare — obligatorie

Fiecare sondă din această familie are `Required: true` — nu există o cale
anonimă către identitatea unui sistem de operare, spre deosebire de
majoritatea produselor bazate pe HTTP. Funcționează două forme de
credențiale, exact ca la orice client SSH:

- `kind: password` — `username` + `password`
- `kind: ssh-key` — `username` + `private_key_file` (+ `passphrase` dacă
  cheia este criptată)

Consultați [Configurare → Credențiale](/ro/configuration/#credențiale)
pentru referința completă a câmpurilor.

## Verificarea cheii de gazdă

Reutilizează același bloc `tls:` pe care sondele HTTPS îl folosesc pentru
fixarea certificatelor (pinning) — `tls.pin_sha256` conține SHA-256 în
hexazecimal al codificării de rețea (wire encoding) a cheii SSH a gazdei
(nu un certificat TLS), iar `tls.insecure: true` este aceeași renunțare
de ultimă instanță, semnalată cu avertisment în același fel. **Dacă
niciuna nu este setată, conexiunea este refuzată înainte de a trimite
vreo credențială.** Consultați
[Configurare → Verificarea cheii de host SSH](/ro/configuration/#verificarea-cheii-de-host-ssh)
pentru explicația completă.

## Câmpuri înregistrate

Fiecare sondă din această familie înregistrează:

- `version` — din `VERSION_ID` (familia os-release) sau din versiunea
  kernelului (familia uname); Debian și Ubuntu citesc mai departe pentru
  o versiune de întreținere precisă, pe care `VERSION_ID` singur nu o
  conține — consultați paginile lor
- `extra.hostKeyVerified` — `"true"`/`"false"`, dacă `tls.pin_sha256` s-a
  potrivit efectiv (apare la fel cum apare `TLSVerified` pentru țintele
  HTTPS — un audit la nivelul întregii flote al țintelor SSH care au
  cheia fixată)

## O țintă fără fișierul sau comanda corespunzătoare eșuează explicit

Atât `cat /etc/os-release` pe o gazdă care nu are acest fișier, cât și
`uname -sr` care raportează alt nume de kernel returnează o eroare clară
de tip „nu este acest produs”, nu un eșec generic de conexiune — sesiunea
SSH în sine a reușit, verificarea identității este cea care a eșuat.
