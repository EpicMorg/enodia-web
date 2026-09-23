---
title: openEuler
description: Konfiguracja enodia do sondowania systemu openEuler przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo przez `vmactions/openeuler-vm` (24.03-LTS-SP4,
domyślne wydanie tej akcji): `ID="openEuler"` — **wielkie E, potwierdzone
na żywo, nie małe** — oraz `VERSION_ID="24.03"`.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — endoflife.date nie ma obecnie kalendarza dla openEuler. Wyłącznie do inwentarza.
