---
title: EuroLinux
description: Configurarea enodia pentru a sonda EuroLinux prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

Nu există nicio imagine Docker pentru EuroLinux — verificarea s-a făcut în
schimb pe o captură reală a rootfs-ului din ISO (mediul de instalare
propriu-zis, examinat offline): `ID="eurolinux"`, `VERSION_ID="8.10"`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:eurolinux`.
