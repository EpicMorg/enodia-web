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

Se corelează **per pachet instalat** cu secdb-ul Alpine pentru ramura gazdei (`main.json` și `community.json`, în `cve.alpine.path`), nu după versiune. Ramura este major.minor din `VERSION_ID` (3.20.3 → v3.20); edge nu are o ramură numerotată și nu primește constatări. Sonda citește, de asemenea, `/lib/apk/db/installed` în aceeași interogare SSH și indexează pachetele după **origine** (cheia proprie a secdb: `libcrypto3` și `libssl3` sunt ambele `openssl`) — stocate ca `packages` ale observației, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Sunt raportate doar CVE-urile care au o corecție mai nouă decât ce este instalat, câte o constatare per origine, cu link către pagina sa de pe security.alpinelinux.org; secdb nu conține severitate. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

`endoflife:alpine-linux`.
