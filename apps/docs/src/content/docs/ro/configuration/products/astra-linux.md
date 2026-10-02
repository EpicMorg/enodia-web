---
title: Astra Linux
description: Configurarea enodia pentru a sonda Astra Linux prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar citește un alt fișier: `/etc/astra_version`, fișierul de identitate
propriu al Astra, în locul `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## De ce nu `/etc/os-release`

Astra Linux este bazat pe Debian și are `/etc/os-release`
(`ID_LIKE=debian`), dar `VERSION_ID` al său este inutilizabil: s-a
confirmat live (`epicmorg/astralinux:1.7-main` și `:1.8-main`) că are
valoarea `"1.8_x86-64"` — un sufix de arhitectură inclus direct în șirul
versiunii. `/etc/astra_version` nu are nimic din toate acestea: un simplu
`"1.8.6"`/`"1.7.9"`, versiunea de întreținere reală pe care o urmărește
Astra însăși.

## Câmpuri înregistrate

- `version` — din `/etc/astra_version`
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează **per pachet instalat** cu OVAL-ul propriu al Astra Linux pentru SE 1.7 sau 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, în `cve.oval.path`) — datele Debian nu se aplică, deoarece versiunile pachetelor Astra sunt propriile sale recompilări. Versiunea se potrivește după major.minor (`1.8.6` → 1.8). Sonda listează, de asemenea, pachetele binare instalate (`dpkg-query`) în aceeași interogare SSH cu `/etc/astra_version` — stocate ca `packages` ale observației, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Constatările au link către buletinul propriu al Astra sau către BDU atunci când producătorul nu citează niciunul (1.7). Datele Astra nu conțin severitate, iar pachetele sale de kernel sunt comparate așa cum sunt instalate, nu așa cum rulează. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru Astra Linux (404
confirmat pentru `astra`, `astralinux` și `astra-linux`). Doar pentru
inventar.
