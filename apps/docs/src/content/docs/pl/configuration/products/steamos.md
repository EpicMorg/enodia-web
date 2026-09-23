---
title: SteamOS
description: Konfiguracja enodia do sondowania systemu SteamOS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na rzeczywistym zrzucie rootfs z obrazu ISO SteamOS 2
(oparty na Debianie, nazwa kodowa „brewmaster”): `ID=steamos`,
`VERSION_ID="2"`. Oczekuje się, że SteamOS 3.x (oparty na Archu, obecny
system Steam Decka, nazwa kodowa „holo”) ma to samo `ID=steamos` — własny
branding Valve jest spójny mimo przepisania systemu — ale nie zostało to
jeszcze potwierdzone na żywo, potwierdzono tylko 2.x; proste dopasowanie
`ID=steamos` obejmuje obie wersje bez potrzeby specjalnej obsługi którejkolwiek.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:steamos`.
