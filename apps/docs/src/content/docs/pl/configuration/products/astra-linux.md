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

Dopasowywany **według zainstalowanych pakietów** do własnego OVAL Astra Linux dla SE 1.7 lub 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, w `cve.oval.path`) — dane Debiana nie mają tu zastosowania, ponieważ wersje pakietów Astra to jej własne przebudowy. Wydanie jest dopasowywane według major.minor wersji (`1.8.6` → 1.8). Sonda wyświetla też listę zainstalowanych pakietów binarnych (`dpkg-query`) w tym samym przebiegu SSH co `/etc/astra_version` — zapisywane jako `packages` obserwacji, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Znaleziska prowadzą do własnego biuletynu Astra albo do BDU, gdy dostawca żadnego nie podaje (1.7). Dane Astra nie zawierają ważności, a jej pakiety jądra są porównywane jako zainstalowane, a nie jako działające. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

Brak — endoflife.date nie ma kalendarza dla Astra Linux (potwierdzone 404
pod `astra`, `astralinux` i `astra-linux`). Wyłącznie do inwentarza.
