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

Dopasowywany **według zainstalowanych pakietów** do OVAL Canonical dla bazy Ubuntu hosta (`UBUNTU_CODENAME` z os-release, zapisywany jako `extra.codename`; plik trafia do `cve.oval.path`). Sonda wyświetla też listę zainstalowanych pakietów binarnych (`dpkg-query`) i odczytuje `uname -r`/`-m`/`-v` w tym samym przebiegu SSH — zapisywane jako `packages` obserwacji oraz `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Zgłaszane są tylko CVE z poprawką nowszą niż zainstalowana wersja, jedno znalezisko na pakiet, z linkiem do jego USN. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:linuxmint`.
