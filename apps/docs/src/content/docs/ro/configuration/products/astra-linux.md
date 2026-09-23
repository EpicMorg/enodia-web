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

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are un calendar pentru Astra Linux (404
confirmat pentru `astra`, `astralinux` și `astra-linux`). Doar pentru
inventar.
