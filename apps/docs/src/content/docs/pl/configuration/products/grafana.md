---
title: Grafana
description: Konfiguracja enodia do sondowania produktu Grafana.
---

Odczytuje wersję z `GET /api/health`.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo, że ten endpoint odpowiada `200` z poprawną
treścią nawet przy błędnych poświadczeniach Basic. Istnieje na potrzeby
sprawdzania żywotności przez load balancer, a nie jako chroniona trasa
API, więc nie ma tu ścieżki z poświadczeniami do zaoferowania.

## Rejestrowane pola

- `version`
- `extra.commit`, `extra.database`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:grafana`.
