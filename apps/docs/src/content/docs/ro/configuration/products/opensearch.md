---
title: OpenSearch
description: Configurarea enodia pentru a sonda OpenSearch.
---

Citește `GET /` — același endpoint și aceeași formă ca la
[Elasticsearch](/ro/configuration/products/elasticsearch/), deoarece
OpenSearch este un fork al Elasticsearch 7.10.2 care a păstrat aproape
neschimbată forma răspunsului de la rădăcină.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Verificarea identității producătorului

`version.distribution` este comparat cu `"opensearch"` — confirmat live
pe containere reale ale ambelor produse: un Elasticsearch real nu are
nici acest câmp, nici sloganul „The OpenSearch Project” al OpenSearch. A
îndrepta `product: opensearch` spre un Elasticsearch obișnuit eșuează
explicit, în loc să raporteze în tăcere versiunea Elasticsearch drept
versiune OpenSearch.

## Autentificare

Opțională. Configurația de securitate este identică cu cea a
Elasticsearch: un container nou cere obligatoriu setarea
`OPENSEARCH_INITIAL_ADMIN_PASSWORD` și răspunde implicit prin HTTPS, cu
Basic auth obligatoriu; `DISABLE_SECURITY_PLUGIN=true` (o setare reală,
documentată) răspunde anonim la aceeași cerere prin HTTP simplu.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Câmpuri înregistrate

- `version` — din `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:opensearch`.
