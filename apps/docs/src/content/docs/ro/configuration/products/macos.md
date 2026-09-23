---
title: macOS
description: Configurarea enodia pentru a sonda macOS prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar rulează `sw_vers` — modul standard, documentat, de a citi identitatea
sistemului de operare al unui Mac — în loc să citească un fișier.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## De ce `sw_vers`, nu `uname -a`

`uname -a` din Darwin include în rezultat numele de gazdă al mașinii —
ceva ce această sondă nu are niciun motiv să vadă sau să stocheze.
Rezultatul pe trei linii `ProductName`/`ProductVersion`/`BuildVersion` al
`sw_vers` nu conține nimic din toate acestea. Verificat live pe un Mac
real (macOS 15.4, `BuildVersion 24E248`, prin SSH) — EULA Apple
restricționează virtualizarea macOS la hardware Apple autentic, așa că
acesta a fost singurul produs din întreaga familie SSH care a necesitat
un Mac fizic real în locul unui container sau al unei imagini VM
descărcabile.

Este recunoscut doar `ProductName: macOS` (de la 10.12 Sierra înainte) —
versiunile mai vechi raportau în schimb `"Mac OS X"`, o formă care nu a
fost niciodată confirmată live pe un sistem real, așa că este tratată ca
neacceptată, în loc să fie ghicită.

## Câmpuri înregistrate

- `version` — din `ProductVersion`
- `extra.buildVersion` — din `BuildVersion`, atunci când este prezent
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:macos`.
