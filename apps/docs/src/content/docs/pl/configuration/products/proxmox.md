---
title: Proxmox VE
description: Konfiguracja enodia do sondowania produktu Proxmox VE.
---

Odczytuje `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Uwierzytelnianie — wymagane

Potwierdzono na żywo na rzeczywistym hoście Proxmox VE 9.2.2: ten endpoint
bez poświadczeń odpowiada `401`. Własny format tokenu API Proxmox to zwykła
wartość nagłówka `Authorization` —
`PVEAPIToken=user@realm!tokenid=secret`, cały ciąg jako jeden token — więc
`token-header` pasuje bezpośrednio, a jego domyślny nagłówek
(`Authorization`) jest już właściwy:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

Alternatywny przepływ z biletem opartym na nazwie użytkownika i haśle
(`POST /access/ticket` w celu uzyskania ciasteczka sesji oraz tokenu CSRF)
celowo nie jest obsługiwany — to cięższy model logowania sesyjnego,
a dokumentacja Proxmox i tak zaleca token API dla automatyzacji
działającej bez nadzoru.

## Rejestrowane pola

- `version`
- `extra.repoid`, jeśli występuje

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

Ten cel obejmuje sam Proxmox VE. Aby uzyskać CVE w pakietach
zainstalowanych na hoście, należy dodać drugi cel dla tego samego hosta
z [`product: debian`](/pl/configuration/products/debian/) przez SSH —
jego os-release to os-release Debiana. Pakiet `linux` Debiana jest
dopasowywany tylko do działającego jądra Debiana, więc własne jądro
Proxmoksa nie zostanie z nim pomylone, a pakiety budowane przez Proxmox
nie otrzymują znalezisk (nie ma dla nich publicznego źródła danych).
Zobacz stronę [Korelacja CVE](/pl/cve/#cve-na-poziomie-pakietów-dla-dystrybucji-linuksa).

## Resolver cyklu życia

`endoflife:proxmox-ve`.
