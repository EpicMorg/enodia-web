---
title: MongoDB
description: Konfiguracja enodia do sondowania produktu MongoDB.
---

Surowa sonda protokołu przewodowego (wire protocol), a nie HTTP —
`address` to `host` lub `host:port`, bez schematu. Gdy port zostanie
pominięty, domyślnie używany jest `27017`. Wykonuje polecenie `buildInfo`
przez protokół przewodowy (`OP_MSG`) i odczytuje jego pole `version` — bez
biblioteki klienckiej, bez zapytania w stylu `SELECT`.

```yaml
targets:
  - id: mongodb-main
    product: mongodb
    address: db.example.com:27017
```

## Uwierzytelnianie

Brak — `buildInfo` należy do niewielkiego zestawu poleceń, na które MongoDB
zawsze odpowiada przed uwierzytelnieniem. Potwierdzono na żywo na dwóch
rzeczywistych kontenerach `mongo:7`, jednym bez żadnej kontroli dostępu
i drugim z `--auth` i skonfigurowanym użytkownikiem root: oba zwróciły
identyczny, pełny dokument `buildInfo` bez wysłania jakichkolwiek
poświadczeń.

## Rejestrowane pola

- `version`
- `extra.enterprise` — `"true"`, gdy `modules` w `buildInfo` zawiera
  `enterprise`, `"false"`, gdy nie zawiera (serwer community ma pustą
  tablicę); niezgłaszane, gdy pola brak

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/). Uwzględnia edycję: sonda zapisuje edycję serwera w `extra.enterprise`, a instancja community nie widzi wyników dotyczących wyłącznie edycji enterprise. Przy nieznanej edycji zachowywane są wszystkie wyniki.

## Resolver cyklu życia

`endoflife:mongodb`.
