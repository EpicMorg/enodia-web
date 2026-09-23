---
title: postmarketOS
description: Konfiguracja enodia do sondowania systemu postmarketOS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na rzeczywistym zrzucie rootfs z obrazu ISO:
`ID="postmarketos"`, `VERSION_ID="v26.06"` — wiodące `v` to własny format
dostawcy, przekazywany bez zmian; porównywanie wersji w `enodia` i tak
usuwa wiodące `v`/`V` przed porównaniem — tak samo traktowane są tagi
wydań GitHub w postaci `v1.2.3` w innych miejscach narzędzia.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:postmarketos`.
