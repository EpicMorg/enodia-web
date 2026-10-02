---
title: Debian
description: Configurarea enodia pentru a sonda Debian prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar — începând cu 1.1.1 — nu mai face parte din mecanismul comun
`osReleaseFamilyProbe` descris pe acea pagină; vedeți mai jos.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Sondă proprie, nu cea comună os-release, începând cu 1.1.1

`VERSION_ID` din `/etc/os-release` al Debian nu conține niciodată o
versiune de întreținere — confirmat live, o instalare Debian 13 complet
actualizată raportează în continuare simplu `VERSION_ID="13"`, identic cu
o instalare din prima zi. Versiunea de întreținere reală (`13.6`) se află
doar în `/etc/debian_version`. Acest fișier nu este însă sigur de luat în
considerare de unul singur: s-a confirmat live că o imagine reală Ubuntu
24.04 livrează și ea unul, moștenit din descendența sa de build, cu
conținutul `trixie/sid` — lipsit de sens pentru versiunea proprie a
Ubuntu. Această sondă citește ambele fișiere într-un singur schimb SSH,
confirmă mai întâi `ID=debian` și are încredere în conținutul
`debian_version` doar atunci când acesta este un număr simplu cu puncte —
copia proprie a Debian testing (`forky/sid`) și cea moștenită de Ubuntu
trec ambele corect la `VERSION_ID`.

Verificat live pe `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Câmpuri înregistrate

- `version` — versiunea de întreținere atunci când `/etc/debian_version`
  o conține, de exemplu `13.6`; altfel, simplul `VERSION_ID`
- `extra.debianVersion` — conținutul brut al `/etc/debian_version`, ori de
  câte ori fișierul există și nu este gol, chiar și atunci când nu a fost
  un număr simplu cu puncte (cum este `forky/sid` din Debian testing, util
  de văzut ca atare în loc să fie eliminat în tăcere)
- `extra.codename` — os-release `VERSION_CODENAME`, care alege versiunea
  din tracker
- `extra.kernel` — versiunea Debian a kernelului care rulează, din `uname -v`
- `packages` — pachetele sursă instalate și versiunile lor (vezi mai jos)
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează **per pachet instalat** cu Debian Security Tracker (`cve.debian.path`), nu după versiune. Sonda citește pachetele *sursă* instalate (`source:Package`/`source:Version` din `dpkg-query` — cheia proprie a trackerului) și versiunea Debian a kernelului care rulează (din `uname -v`) în aceeași interogare SSH cu versiunea însăși. Sunt raportate doar CVE-urile pe care Debian le-a corectat deja într-o versiune mai nouă decât cea instalată, câte o constatare per pachet sursă, cu link către pagina sa din tracker. Trackerul acoperă doar versiunile încă susținute de echipa de securitate Debian (bookworm, trixie, testing, sid); gazdele mai vechi nu primesc constatări la nivel de pachet. O gazdă Proxmox VE este acoperită de o țintă `debian` ca aceasta — consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

`endoflife:debian` — neschimbat.
