---
title: OPNsense
description: Configurarea enodia pentru a sonda OPNsense prin SSH.
---

Folosește același mecanism SSH, aceleași credențiale și aceeași verificare
a cheii de gazdă ca familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/),
dar rulează `opnsense-version` în loc să citească un fișier.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## De ce o comandă, nu un fișier

OPNsense rulează pe o bază FreeBSD fără niciun `/etc/os-release`, iar
versiunea sa reală este împărțită între mai multe fișiere de componente
din `/usr/local/opnsense/version/` (base, kernel, core, pkgs) — nu există
un singur fișier de identitate evident. `opnsense-version` este wrapperul
propriu al OPNsense, care citește fișierul potrivit și afișează totul pe
o singură linie. Verificat live pe o instanță reală OPNsense 26.7,
accesată prin `vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Câmpuri înregistrate

- `version` — extras din rezultatul `opnsense-version`
- `extra.hostKeyVerified`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:opnsense`.
