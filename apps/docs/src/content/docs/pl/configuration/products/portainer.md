---
title: Portainer
description: Konfiguracja enodia do sondowania produktu Portainer.
---

Odczytuje wersję z `GET /api/system/status` (starszy alias `/api/status`
odpowiada identycznie, ale ta sonda zawsze używa bieżącej ścieżki).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Uwierzytelnianie

Brak — endpoint jest celowo publiczny, dostępny jeszcze przed utworzeniem
obowiązkowego konta administratora przy pierwszym uruchomieniu.

## Rejestrowane pola

- `version`
- `extra.instanceId`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:portainer/portainer` — endoflife.date nie ma kalendarza dla Portainer
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub Releases:
wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym (prerelease), bez dat eol/support/lts
(GitHub nie ma zdania na temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
