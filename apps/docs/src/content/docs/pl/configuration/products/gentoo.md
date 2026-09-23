---
title: Gentoo Linux
description: Konfiguracja enodia do sondowania systemu Gentoo Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `gentoo/stage3` (oficjalny obraz gentoo.org):
`ID=gentoo`, `VERSION_ID=2.18` — własny numer wydania Gentoo Base System,
a nie wersja dystrybucji w tradycyjnym sensie.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — Gentoo to dystrybucja typu rolling release, a endoflife.date nie ma
dla niej kalendarza (potwierdzone 404) z tego samego powodu: nie ma
dyskretnej wersji, dla której można by śledzić koniec wsparcia (EOL).
Wyłącznie do inwentarza.
