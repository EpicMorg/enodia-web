---
title: Gentoo Linux
description: Configurarea enodia pentru a sonda Gentoo Linux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `gentoo/stage3` (imaginea oficială gentoo.org):
`ID=gentoo`, `VERSION_ID=2.18` — numărul de versiune propriu al Gentoo
Base System, nu o versiune de distribuție în sensul tradițional.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — Gentoo este o distribuție rolling-release, iar endoflife.date
nu are un calendar pentru ea (404 confirmat) din același motiv: nu există
o versiune distinctă în raport cu care să se urmărească EOL. Doar pentru
inventar.
