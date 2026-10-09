---
title: NetBox
description: Konfiguracja enodia do sondowania produktu NetBox.
---

Odczytuje anonimową stronę logowania, `GET /login/`, której element
główny zawiera `data-netbox-version` — np. `4.3.3-Docker-3.3.0` w NetBox
uruchomionym z netbox-docker. Jeśli atrybutu brakuje, używana jest zamiast
tego wersja, z którą strona ładuje swój pakiet (`/static/netbox.js?v=4.3.3`).
Domyślnym schematem jest `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## Dlaczego strona logowania

REST API NetBox (`/api/status/`) wymaga tokenu; strona logowania zawiera
wersję bez niego (potwierdzone na żywo na produkcyjnym NetBox
z netbox-docker). Część przed `-Docker-` to własna wersja NetBox; reszta
to wersja obrazu netbox-docker.

## Uwierzytelnianie

Brak — strona logowania jest publiczna, a sonda nie przyjmuje żadnego
rodzaju poświadczeń. Od wersji 2.2.0 poświadczenie przypisane do celu
`netbox` jest błędem konfiguracji, a nie jest po cichu ignorowane — zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — wersja NetBox, np. `4.3.3`
- `extra.netboxDocker` — wersja obrazu netbox-docker (`3.3.0`), tylko
  gdy `data-netbox-version` ma przyrostek `-Docker-`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).
„LenelS2 NetBox” z BDU to inny produkt i nie jest używany.

## Resolver cyklu życia

`github:netbox-community/netbox` — endoflife.date nie ma kalendarza dla
NetBox (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”).
