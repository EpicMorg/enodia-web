---
title: Oracle Solaris
description: Konfiguracja enodia do sondowania systemu Oracle Solaris przez SSH.
---

Używa tego samego mechanizmu SSH, poświadczeń i weryfikacji klucza hosta co
rodzina [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/),
ale odczytuje `/etc/release` zamiast pliku os-release czy
`uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Dlaczego nie `uname -sr`

W przeciwieństwie do OpenBSD/NetBSD `uname -sr` tu nie działa: w Solarisie
zawsze podaje tylko wersję jądra SunOS (`"SunOS 5.11"` dla każdego wydania
Solaris 11.x — wersjonowanie SunOS jest oddzielone od wersji produktu),
więc nie da się nim odróżnić 11.3 od 11.4. Prawdziwą wersję zawiera
wiersz `"Oracle Solaris 11.4 X86"` z `/etc/release`.

Żadnego obrazu do pobrania nie da się uzyskać bez konta Oracle/licencji
OTN, więc weryfikację przeprowadzono przez `vmactions/solaris-vm`, który
buduje i ponownie publikuje własny, swobodnie redystrybuowalny Solaris 11.4
CBE (Common Build Environment, przeznaczony właśnie do tego rodzaju użycia
w CI).

## Rejestrowane pola

- `version` — wyodrębniona z `/etc/release`
- `extra.hostKeyVerified`

## Korelacja CVE

Brak dopasowania — NVD zapisuje poziomy poprawek w polu CPE, którego mechanizm dopasowania nie odczytuje, więc dopasowanie po samym wydaniu oznaczyłoby w pełni załatany host każdym CVE, jakie kiedykolwiek naprawiono w tym wydaniu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:oracle-solaris`.
