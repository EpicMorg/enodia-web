---
title: FreeBSD
description: Konfiguracja enodia do sondowania systemu FreeBSD przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## Jedyny produkt w tej rodzinie odczytujący inną ścieżkę

Każdy inny produkt w tej rodzinie odczytuje `/etc/os-release`; FreeBSD
stanowi wyjątek. FreeBSD sam generuje `/var/run/os-release`, dynamicznie,
przy starcie (`/etc/rc.d/os-release`) — w dokładnie tym samym formacie
`KEY=VALUE`, który dystrybucje Linuksa dostarczają statycznie
w `/etc/os-release`. Zweryfikowano na żywo przez QEMU (oficjalny obraz
chmurowy qcow2 FreeBSD — dla FreeBSD nie istnieje obraz Dockera):
`ID=freebsd`, `VERSION_ID="15.1"`.

## Korelacja CVE

Brak dopasowania — NVD zapisuje poziomy poprawek w polu CPE, którego mechanizm dopasowania nie odczytuje, więc dopasowanie po samym wydaniu oznaczyłoby w pełni załatany host każdym CVE, jakie kiedykolwiek naprawiono w tym wydaniu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:freebsd`.
