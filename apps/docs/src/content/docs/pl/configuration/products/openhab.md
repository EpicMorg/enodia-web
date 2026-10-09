---
title: openHAB
description: Konfiguracja enodia do sondowania produktu openHAB.
---

Odczytuje katalog główny REST API, `GET /rest/`, który openHAB serwuje bez
logowania.

```yaml
targets:
  - id: openhab-main
    product: openhab
    address: https://openhab.example.com
```

## Która wersja jest którą

`/rest/` odpowiada dwiema wersjami: `version` najwyższego poziomu (`"8"`),
która jest wersją samego REST API, oraz `runtimeInfo.version` (`"5.2.2"`),
która jest wersją openHAB — potwierdzone na żywo na `openhab/openhab:latest`,
którego `version.properties` podawał openhab-distro 5.2.2. Sonda zgłasza
`runtimeInfo.version`; wersja REST API trafia do `extra`.

## Uwierzytelnianie

Opcjonalne. `/rest/` domyślnie odpowiada anonimowo; `/rest/systeminfo`
wymaga zalogowania i nie jest używany. Dla instancji z wyłączonym dostępem
anonimowym przekazywane są poświadczenia `bearer` lub `basic`, jeśli
zostały skonfigurowane:

```yaml
credentials:
  openhab-token:
    kind: bearer
    value: "${OPENHAB_TOKEN}"
```

Każdy inny rodzaj jest błędem konfiguracji. Zobacz
[Konfiguracja → Poświadczenia](/pl/configuration/#poświadczenia).

## Rejestrowane pola

- `version` — `runtimeInfo.version`, np. `5.2.2`
- `extra.build` — `runtimeInfo.buildString`, np. `Release Build`
- `extra.restApiVersion` — `version` najwyższego poziomu, np. `8`

## Korelacja CVE

Dopasowywany do NVD, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`github:openhab/openhab-distro` — endoflife.date nie ma kalendarza dla
openHAB (potwierdzone 404), więc zamiast tego jest rozwiązywany przez
GitHub Releases: wyłącznie najnowszy opublikowany tag niebędący wydaniem
wstępnym (prerelease), bez dat eol/support/lts (GitHub nie ma zdania na
temat polityki cyklu życia, zna tylko „najnowsze wydanie”). openhab-distro
publikuje kamienie milowe (`5.3.0.M2`) jako zwykłe wydania, nieoznaczone
jako wydania wstępne; resolver pomija je na podstawie nazwy tagu, aby
kamień milowy nie sprawiał, że każdy stabilny openHAB wygląda na
przestarzały.
