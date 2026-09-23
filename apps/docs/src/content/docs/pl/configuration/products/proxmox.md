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

## Resolver cyklu życia

`endoflife:proxmox-ve`.
