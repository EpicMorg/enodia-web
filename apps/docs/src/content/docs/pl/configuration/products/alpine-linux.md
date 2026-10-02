---
title: Alpine Linux
description: Konfiguracja enodia do sondowania systemu Alpine Linux przez SSH.
---

Należy do rodziny [identyfikacji systemów operacyjnych przez SSH](/pl/configuration/products/ssh-os-probes/)
— wspólny mechanizm, poświadczenia i weryfikację klucza hosta opisano na
tamtej stronie. Dopasowuje pole `ID` z `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Zweryfikowano na żywo na `alpine:latest`: `ID=alpine` (uwaga: samo pole
`ID`, a nie `alpine-linux` — wartość `product:` dodaje `-linux` dla
jasności, samo dopasowanie odbywa się względem krótszego ciągu dostawcy),
`VERSION_ID=3.24.1`.

## Korelacja CVE

Dopasowywany **według zainstalowanych pakietów** do secdb Alpine dla gałęzi hosta (`main.json` i `community.json`, w `cve.alpine.path`), a nie według wydania. Gałąź to major.minor z `VERSION_ID` (3.20.3 → v3.20); edge nie ma numerowanej gałęzi i nie otrzymuje znalezisk. Sonda odczytuje też `/lib/apk/db/installed` w tym samym przebiegu SSH i kluczuje pakiety według **pochodzenia** (origin — własny klucz secdb: `libcrypto3` i `libssl3` to oba `openssl`) — zapisywane jako `packages` obserwacji, plus `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Zgłaszane są tylko CVE z poprawką nowszą niż zainstalowana wersja, jedno znalezisko na pochodzenie, z linkiem do jego strony na security.alpinelinux.org; secdb nie zawiera ważności. Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:alpine-linux`.
