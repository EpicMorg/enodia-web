---
title: Alpine Linux
description: Konfiguracja enodia do sondowania systemu Alpine Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `alpine:latest`: `ID=alpine` (uwaga: samo pole
`ID`, a nie `alpine-linux` — wartość `product:` dodaje `-linux` dla
jasności, samo dopasowanie odbywa się względem krótszego ciągu dostawcy),
`VERSION_ID=3.24.1`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:alpine-linux`.
