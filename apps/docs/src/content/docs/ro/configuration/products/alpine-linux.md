---
title: Alpine Linux
description: Configurarea enodia pentru a sonda Alpine Linux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `alpine:latest`: `ID=alpine` (atenție: câmpul `ID`
simplu, nu `alpine-linux` — valoarea `product:` adaugă `-linux` pentru
claritate, iar potrivirea se face cu șirul mai scurt al producătorului),
`VERSION_ID=3.24.1`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:alpine-linux`.
