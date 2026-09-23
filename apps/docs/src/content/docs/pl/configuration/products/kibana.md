---
title: Kibana
description: Konfiguracja enodia do sondowania produktu Kibana.
---

Odczytuje `GET /api/status` — z założenia nieuwierzytelniony (to endpoint,
którego orkiestratory używają jako sondy liveness/readiness; sonda
readiness w oficjalnym Helm charcie Elastic odpytuje curlem dokładnie tę
ścieżkę bez poświadczeń).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Uwierzytelnianie

Brak. Potwierdzono na żywo na rzeczywistym kontenerze
`docker.elastic.co/kibana/kibana` (z rzeczywistym Elasticsearch jako
zapleczem): odpowiedź zawiera pełną wersję nawet wtedy, gdy Kibana wciąż
się uruchamia i odpowiada `503` („jeszcze niegotowa”) — treść zawiera ją
niezależnie od kodu statusu.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:kibana`.
