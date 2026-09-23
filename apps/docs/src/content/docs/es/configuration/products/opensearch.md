---
title: OpenSearch
description: Configuración de enodia para sondear OpenSearch.
---

Lee `GET /`: el mismo endpoint y la misma forma que
[Elasticsearch](/es/configuration/products/elasticsearch/), ya que
OpenSearch es un fork de Elasticsearch 7.10.2 que mantuvo casi sin
cambios la forma de su respuesta raíz.

```yaml
targets:
  - id: opensearch-main
    product: opensearch
    address: https://opensearch.example.com:9200
```

## Verificación de la identidad del fabricante

`version.distribution` se compara con `"opensearch"`: confirmado en vivo
contra contenedores reales de ambos, un Elasticsearch real no tiene ni
este campo ni el lema «The OpenSearch Project» de OpenSearch. Apuntar
`product: opensearch` a un Elasticsearch normal falla de forma explícita
en lugar de informar en silencio la versión de Elasticsearch como si
fuera la de OpenSearch.

## Autenticación

Opcional. La postura de seguridad coincide exactamente con la de
Elasticsearch: un contenedor recién creado necesita que
`OPENSEARCH_INITIAL_ADMIN_PASSWORD` esté definido y, de forma
predeterminada, responde por HTTPS y exige autenticación Basic;
`DISABLE_SECURITY_PLUGIN=true` (un ajuste real y documentado) responde a
la misma solicitud de forma anónima por HTTP sin cifrar.

```yaml
credentials:
  opensearch-admin:
    kind: basic
    username: admin
    password: "${OPENSEARCH_PASSWORD}"
```

## Campos registrados

- `version`: de `version.number`
- `extra.clusterName`, `extra.luceneVersion`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:opensearch`.
