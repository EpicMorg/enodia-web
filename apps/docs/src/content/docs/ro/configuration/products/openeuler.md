---
title: openEuler
description: Configurarea enodia pentru a sonda openEuler prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live prin `vmactions/openeuler-vm` (24.03-LTS-SP4, versiunea
implicită a acțiunii): `ID="openEuler"` — **cu E majusculă, confirmat
live, nu cu literă mică** — și `VERSION_ID="24.03"`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are astăzi un calendar pentru openEuler.
Doar pentru inventar.
