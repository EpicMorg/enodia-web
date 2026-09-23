---
title: OpenSearch
description: Konfiguracja enodia do sondowania produktu OpenSearch.
---

Odczytuje `GET /` — ten sam endpoint i format co
[Elasticsearch](/pl/configuration/products/elasticsearch/), ponieważ
OpenSearch to fork Elasticsearch 7.10.2, który zachował format odpowiedzi
głównego endpointu niemal bez zmian.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Weryfikacja tożsamości producenta

`version.distribution` jest porównywane z `"opensearch"` — potwierdzono na
żywo na rzeczywistych kontenerach obu produktów, że prawdziwy
Elasticsearch nie ma ani tego pola, ani sloganu OpenSearch „The
OpenSearch Project”. Wskazanie `product: opensearch` na zwykły
Elasticsearch kończy się wyraźnym błędem, zamiast po cichu zgłosić wersję
Elasticsearch jako wersję OpenSearch.

## Uwierzytelnianie

Opcjonalne. Model zabezpieczeń jest dokładnie taki sam jak
w Elasticsearch: świeży kontener w ogóle wymaga ustawienia
`OPENSEARCH_INITIAL_ADMIN_PASSWORD` i domyślnie odpowiada przez HTTPS
z wymaganym uwierzytelnianiem Basic; `DISABLE_SECURITY_PLUGIN=true`
(rzeczywiste, udokumentowane ustawienie) sprawia, że na identyczne żądanie
odpowiada anonimowo przez zwykłe HTTP.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Rejestrowane pola

- `version` — z `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Korelacja CVE

Dopasowywany do NVD i BDU FSTEC, gdy skonfigurowano [blok `cve:`](/pl/cve/).

## Resolver cyklu życia

`endoflife:opensearch`.
