---
title: Harbor
description: Konfiguracja enodia do sondowania produktu Harbor (rejestr kontenerów).
---

Odczytuje `GET /api/v2.0/systeminfo`.

```yaml
targets:
  - id: harbor-main
    product: harbor
    address: https://harbor.example.com
```

## Uwierzytelnianie

Opcjonalne. Potwierdzono na żywo na rzeczywistym stosie `goharbor/harbor`
v2.12.2: `harbor_version` jest zwracane bez żadnych poświadczeń w każdej
obecnie wydanej wersji — błędne lub zmyślone poświadczenia są po cichu
traktowane jak anonimowe zamiast odpowiedzi `401`; ten endpoint nigdy nie
odrzuca żądania wprost.

:::note[Warto obserwować zmiany w repozytorium źródłowym]
Kod źródłowy Harbor (w wersji, na której zweryfikowano tę sondę) na
gałęzi głównej już uzależnia `harbor_version` od sprawdzenia
uwierzytelnionej sesji — w chwili pisania nie było to jeszcze wydane —
co zmierza ku przyszłemu wydaniu wymagającemu poświadczeń dla tego pola.
`basic` jest tu już oferowane na tę okoliczność:

```yaml
credentials:
  harbor-admin:
    kind: basic
    username: admin
    password: "${HARBOR_PASSWORD}"
```
:::

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:harbor`.
