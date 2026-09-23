---
title: NixOS
description: Konfiguracja enodia do sondowania systemu NixOS przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na rzeczywistym zrzucie rootfs z obrazu ISO: `ID=nixos`,
`VERSION_ID="26.05"`. Jedyny obraz w Docker Hub, `nixos/nix`, to tylko
menedżer pakietów Nix działający na bazie innej niż NixOS, w ogóle bez
`/etc/os-release` — nie nadaje się jako cel weryfikacji, dlatego zamiast
niego użyto zrzutu rootfs z obrazu ISO.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:nixos`.
