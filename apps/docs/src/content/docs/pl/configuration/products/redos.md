---
title: RED OS
description: Konfiguracja enodia do sondowania systemu RED OS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `alrdockerhub/redos:7.3.1` (rzeczywista
zawartość RED OS — `HOME_URL`/`BUG_REPORT_URL` wskazują na red-soft.ru):
`ID="redos"`, `VERSION_ID="7.3.1"`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — endoflife.date nie ma obecnie kalendarza dla RED OS. Wyłącznie do inwentarza.
