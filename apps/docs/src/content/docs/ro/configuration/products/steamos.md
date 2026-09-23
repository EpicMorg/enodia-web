---
title: SteamOS
description: Configurarea enodia pentru a sonda SteamOS prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat pe o captură reală a rootfs-ului din ISO pentru SteamOS 2
(bazat pe Debian, nume de cod „brewmaster”): `ID=steamos`,
`VERSION_ID="2"`. SteamOS 3.x (bazat pe Arch, sistemul de operare actual
al Steam Deck, nume de cod „holo”) ar trebui să aibă același
`ID=steamos` — brandingul Valve este consecvent de-a lungul rescrierii —,
dar acest lucru nu a fost încă confirmat live, doar 2.x a fost;
potrivirea simplă `ID=steamos` le acoperă pe amândouă fără a necesita un
caz special pentru vreuna.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:steamos`.
