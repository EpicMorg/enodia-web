---
title: Kali Linux
description: Configurarea enodia pentru a sonda Kali Linux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"` — un instantaneu datat al unei distribuții
rolling-release, nu o versiune distinctă.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — Kali este rolling-release, iar endoflife.date nu are un
calendar pentru ea (404 confirmat), din același motiv ca Gentoo. Doar
pentru inventar.
