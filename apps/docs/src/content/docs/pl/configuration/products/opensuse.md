---
title: openSUSE
description: Konfiguracja enodia do sondowania systemu openSUSE przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Dopasowuje zarówno Leap, jak i Tumbleweed

W przeciwieństwie do większości prostych porównań `ID` w tej rodzinie ta
sonda dopasowuje każde `ID` zaczynające się od `opensuse-`. Zweryfikowano
na żywo na `opensuse/leap:latest`: `ID="opensuse-leap"`, `VERSION_ID="16.0"`.
Tumbleweed (`ID="opensuse-tumbleweed"`) nie jest tu pokryty rzeczywistym
zestawem testowym, ale ma ten sam prefiks `opensuse-`, więc jest
akceptowany przez ten sam produkt, zamiast pozostać niedopasowanym.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:opensuse`.
