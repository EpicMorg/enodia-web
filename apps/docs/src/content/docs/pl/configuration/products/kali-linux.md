---
title: Kali Linux
description: Konfiguracja enodia do sondowania systemu Kali Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"` — datowana migawka wydania typu rolling release,
a nie dyskretna wersja.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — Kali to dystrybucja typu rolling release, a endoflife.date nie ma
dla niej kalendarza (potwierdzone 404) z tego samego powodu co Gentoo.
Wyłącznie do inwentarza.
