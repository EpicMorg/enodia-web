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

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:linuxmint`.
