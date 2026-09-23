---
title: RED OS
description: Configurarea enodia pentru a sonda RED OS prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat live pe `alrdockerhub/redos:7.3.1` (conținut RED OS real —
`HOME_URL`/`BUG_REPORT_URL` indică red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

Niciunul — endoflife.date nu are astăzi un calendar pentru RED OS. Doar
pentru inventar.
