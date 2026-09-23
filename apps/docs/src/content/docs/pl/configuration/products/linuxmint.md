---
title: Linux Mint
description: Konfiguracja enodia do sondowania systemu Linux Mint przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na rzeczywistym zrzucie rootfs z obrazu ISO: `ID=linuxmint`,
`VERSION_ID="22.3"` — rzeczywiście własna tożsamość Minta, w przeciwieństwie
do jedynego znalezionego obrazu w Docker Hub (`linuxmintd/mint22-amd64`,
chroot do budowania CI samego Minta), który zamiast tego zgłasza bazowe
Ubuntu i byłby niewłaściwym punktem odniesienia do dopasowania.

## Korelacja CVE

Brak dopasowania — CVE dystrybucji ogólnego przeznaczenia to podatności pakietów, a numer wydania nie mówi, które pakiety załatano od tego czasu. Zobacz stronę [Korelacja CVE](/pl/cve/#które-produkty-są-dopasowywane).

## Resolver cyklu życia

`endoflife:linuxmint`.
