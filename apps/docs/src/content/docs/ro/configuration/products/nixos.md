---
title: NixOS
description: Configurarea enodia pentru a sonda NixOS prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat pe o captură reală a rootfs-ului din ISO: `ID=nixos`,
`VERSION_ID="26.05"`. Singura imagine de pe Docker Hub, `nixos/nix`, este
doar managerul de pachete Nix rulând pe o bază non-NixOS, fără niciun
`/etc/os-release` — nu este o țintă de verificare utilizabilă, motiv
pentru care s-a folosit în schimb o captură a rootfs-ului din ISO.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:nixos`.
