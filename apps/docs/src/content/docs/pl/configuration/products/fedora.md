---
title: Fedora Linux
description: Konfiguracja enodia do sondowania systemu Fedora Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: fedora-host
    product: fedora
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `fedora:latest`: `ID=fedora`, `VERSION_ID=44`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:fedora`.
