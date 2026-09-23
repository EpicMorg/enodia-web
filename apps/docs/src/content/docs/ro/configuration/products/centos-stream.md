---
title: CentOS Stream
description: Configurarea enodia pentru a sonda CentOS Stream prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Verificarea identității producătorului — mai mult decât o simplă potrivire pe `ID`

Verificat live pe `quay.io/centos/centos:stream9`: `/etc/os-release`
raportează `ID="centos"` — **același `ID` pe care îl folosește vechiul
[CentOS Linux](/ro/configuration/products/centos/), ajuns la EOL** — așa
că acest produs verifică și `NAME="CentOS Stream"`, câmpul care le
deosebește efectiv. `product: centos-stream` îndreptat spre o gazdă cu
vechiul CentOS 7 (sau invers) nu trece verificarea identității, în loc să
fie înregistrat sub produsul greșit.

## Câmpuri înregistrate

La fel ca în restul familiei: `version` din `VERSION_ID`, plus
`extra.hostKeyVerified`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:centos-stream`.
