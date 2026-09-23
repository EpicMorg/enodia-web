---
title: Elasticsearch
description: Konfiguracja enodia do sondowania produktu Elasticsearch.
---

Odczytuje wersję z `GET /`.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Uwierzytelnianie

Opcjonalne. Od Elasticsearch 8.0 zabezpieczenia (HTTPS plus
uwierzytelnianie Basic/Bearer/ApiKey) są domyślnie włączone — anonimowe
żądanie otrzymuje `401` z informacją o wszystkich trzech schematach.
Uwierzytelnianie Basic z superużytkownikiem `elastic` to jedyny schemat
faktycznie przetestowany i oferowany tutaj:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Klaster uruchomiony z `xpack.security.enabled=false` — rzeczywistym,
udokumentowanym ustawieniem — odpowiada na to samo żądanie anonimowo przez
zwykłe HTTP z identyczną treścią; w takim przypadku poświadczenia nie są
wymagane.

## Rejestrowane pola

- `version` — z `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:elasticsearch`.
