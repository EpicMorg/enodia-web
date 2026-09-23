---
title: openSUSE
description: Configurarea enodia pentru a sonda openSUSE prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Acoperă atât Leap, cât și Tumbleweed

Spre deosebire de majoritatea verificărilor simple de egalitate pe `ID`
din această familie, aceasta acceptă orice `ID` care începe cu
`opensuse-`. Verificat live pe `opensuse/leap:latest`:
`ID="opensuse-leap"`, `VERSION_ID="16.0"`. Tumbleweed
(`ID="opensuse-tumbleweed"`) nu este acoperit aici de un exemplu real de
test, dar are același prefix `opensuse-`, așa că este acceptat de același
produs, în loc să rămână nepotrivit.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:opensuse`.
