---
title: Elasticsearch
description: Configurarea enodia pentru a sonda Elasticsearch.
---

Citește `GET /` pentru versiune.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Autentificare

Opțională. Începând cu Elasticsearch 8.0, securitatea (HTTPS plus
autentificare Basic/Bearer/ApiKey) este activată implicit — o cerere
anonimă primește un `401` care anunță toate cele trei scheme. Basic auth
cu superutilizatorul `elastic` este singura schemă testată efectiv și
oferită aici:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Un cluster pornit cu `xpack.security.enabled=false` — o setare reală,
documentată — răspunde anonim la aceeași cerere prin HTTP simplu, cu un
corp identic; în acest caz nu este necesară nicio credențială.

## Câmpuri înregistrate

- `version` — din `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Corelare CVE

Se corelează cu NVD și BDU FSTEC atunci când este configurat un [bloc `cve:`](/ro/cve/).

## Rezolvatorul ciclului de viață

`endoflife:elasticsearch`.
