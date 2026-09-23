---
title: Slackware
description: Konfiguracja enodia do sondowania systemu Slackware przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: slackware-host
    product: slackware
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `vbatts/slackware:14.2`: `ID=slackware`,
`VERSION_ID=14.2` — Slackware faktycznie dostarcza `/etc/os-release`,
wbrew starszej dokumentacji twierdzącej, że tak nie jest.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:slackware`.
