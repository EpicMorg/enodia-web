---
title: postmarketOS
description: Configurarea enodia pentru a sonda postmarketOS prin SSH.
---

Face parte din familia [Identificarea sistemului de operare prin SSH](/ro/configuration/products/ssh-os-probes/)
— consultați pagina respectivă pentru mecanismul comun, credențiale și
verificarea cheii de gazdă. Verifică câmpul `ID` din `/etc/os-release`.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificat pe o captură reală a rootfs-ului din ISO: `ID="postmarketos"`,
`VERSION_ID="v26.06"` — prefixul `v` este formatul propriu al
producătorului, transmis ca atare; comparația de versiuni din `enodia`
elimină deja un `v`/`V` inițial înainte de comparare, același tratament
pe care îl primesc în altă parte a instrumentului tag-urile de release
GitHub de forma `v1.2.3`.

## Corelare CVE

Nu se corelează — CVE-urile unei distribuții de uz general sunt vulnerabilități ale pachetelor, iar numărul versiunii nu poate spune ce pachete au fost corectate între timp. Consultați [Corelare CVE](/ro/cve/#ce-produse-sunt-potrivite).

## Rezolvatorul ciclului de viață

`endoflife:postmarketos`.
