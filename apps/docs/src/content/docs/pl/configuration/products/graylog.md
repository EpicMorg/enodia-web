---
title: Graylog
description: Konfiguracja enodia do sondowania produktu Graylog.
---

Odczytuje `GET /api/` — główny zasób samego REST API, publiczny dokument
discovery, na który każdy węzeł Graylog odpowiada bez poświadczeń.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Uwierzytelnianie

Brak — potwierdzono na żywo na rzeczywistym kontenerze `graylog/graylog`
(wraz z MongoDB i Elasticsearch, od których zależy): zasób główny
odpowiada anonimowo.

## Rejestrowane pola

Tylko `version` — ta sonda nie zapisuje żadnych pól `extra`.

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:graylog`.
