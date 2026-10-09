---
title: Netdata
description: Konfiguracja enodia do sondowania produktu Netdata.
---

Odczytuje `GET /api/v1/info` agenta, domyślnie serwowany bez logowania.
Domyślnym schematem jest `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## Co jest odczytywane

Odpowiedź zaczyna się od `"version": "v2.12.1"`, obok którego znajduje
się `release-channel`. Reszta opisuje hosta — uid, jądro, etykiety,
sprzęt, chmurę — a nic z tego nie opisuje samego oprogramowania, dlatego
odczytywane są tylko wersja i kanał wydań. Odpowiedź bez `version` jest
zgłaszana jako nieobsługiwana (to nie Netdata).

## Uwierzytelnianie

Opcjonalne — agent domyślnie odpowiada anonimowo. `basic` lub `bearer`
są przekazywane, gdy zostaną skonfigurowane, dla agenta za proxy, które
ich wymaga; od wersji 2.2.0 każdy inny rodzaj jest błędem konfiguracji.
Zobacz [Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Rejestrowane pola

- `version` — tak, jak zgłasza ją agent, np. `v2.12.1` (potwierdzone na
  żywo na `netdata/netdata:stable`)
- `extra.releaseChannel` — np. `stable` lub `nightly`, jeśli występuje

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:netdata/netdata` — endoflife.date nie ma kalendarza dla Netdata
(potwierdzone 404), więc zamiast tego jest rozwiązywany przez GitHub
Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem wstępnym
(prerelease), bez dat eol/support/lts (GitHub nie ma zdania na temat
polityki cyklu życia, zna tylko „najnowsze wydanie”).
