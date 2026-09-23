---
title: Slackware
description: Configurarea enodia pentru a sonda Slackware prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: slackware-host
    product: slackware
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `vbatts/slackware:14.2`: `ID=slackware`,
`VERSION_ID=14.2` — Slackware livrează într-adevăr `/etc/os-release`, în
ciuda documentației mai vechi care afirmă contrariul.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:slackware`.
