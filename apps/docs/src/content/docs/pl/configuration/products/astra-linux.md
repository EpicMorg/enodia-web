---
title: Astra Linux
description: Konfiguracja enodia do sondowania systemu Astra Linux przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale odczytuje inny plik: `/etc/astra_version`, własny plik tożsamości
Astry, zamiast `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Dlaczego nie `/etc/os-release`

Astra Linux jest oparta na Debianie i ma `/etc/os-release`
(`ID_LIKE=debian`), ale jej `VERSION_ID` jest bezużyteczne: potwierdzono
na żywo (`epicmorg/astralinux:1.7-main` i `:1.8-main`), że zawiera
`"1.8_x86-64"` — sufiks architektury wpisany bezpośrednio w ciąg wersji.
`/etc/astra_version` nie ma nic takiego: zwykłe `"1.8.6"`/`"1.7.9"`,
czyli prawdziwe wydanie punktowe, które śledzi sama Astra.

## Rejestrowane pola

- `version` — z `/etc/astra_version`
- `extra.hostKeyVerified`

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza dla Astra Linux (potwierdzone 404
pod `astra`, `astralinux` i `astra-linux`). Wyłącznie do inwentarza.
