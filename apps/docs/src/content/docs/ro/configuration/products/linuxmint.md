---
title: Linux Mint
description: Configurarea enodia pentru a sonda Linux Mint prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat pe o captură reală a rootfs-ului din ISO: `ID=linuxmint`,
`VERSION_ID="22.3"` — cu adevărat identitatea proprie a Mint, spre
deosebire de singura imagine găsită pe Docker Hub
(`linuxmintd/mint22-amd64`, chroot-ul de build CI al Mint), care
raportează în schimb baza Ubuntu de dedesubt și ar fi fost un reper
greșit pentru potrivire.

## Corelare CVE

Se corelează **per pachet instalat** cu OVAL-ul Canonical pentru baza Ubuntu a gazdei (os-release `UBUNTU_CODENAME`, înregistrat ca `extra.codename`; fișierul se pune în `cve.oval.path`). Sonda listează, de asemenea, pachetele binare instalate (`dpkg-query`) și citește `uname -r`/`-m`/`-v` în aceeași interogare SSH — stocate ca `packages` ale observației, respectiv `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Sunt raportate doar CVE-urile care au o corecție mai nouă decât ce este instalat, câte o constatare per pachet, cu link către USN-ul său. Consultați [Corelare CVE](/ro/cve/#cve-uri-la-nivel-de-pachet-pentru-distribuțiile-linux).

## Rezolvatorul ciclului de viață

`endoflife:linuxmint`.
