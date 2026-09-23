---
title: VMware Photon OS
description: Konfiguracja enodia do sondowania systemu VMware Photon OS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na oficjalnym obrazie najwyższego poziomu
`photon:5.0` (program Docker Official Images — nie własne repozytorium
`vmware/photon`, które kończy się na 2.0): `ID=photon`, `VERSION_ID=5.0`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:photon`.
