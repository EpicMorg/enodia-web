---
title: Elasticsearch
description: Configuración de enodia para sondear Elasticsearch.
---

Lee `GET /` para obtener la versión.

```yaml
targets:
  - id: es-main
    product: elasticsearch
    address: https://es.example.com:9200
```

## Autenticación

Opcional. Desde Elasticsearch 8.0, la seguridad (HTTPS más autenticación
Basic/Bearer/ApiKey) está activada por defecto: una petición anónima
recibe un `401` que anuncia los tres esquemas. La autenticación Basic con
el superusuario `elastic` es el único esquema realmente probado y
ofrecido aquí:

```yaml
credentials:
  es-elastic:
    kind: basic
    username: elastic
    password: "${ES_PASSWORD}"
```

Un clúster iniciado con `xpack.security.enabled=false` (un ajuste real y
documentado) responde a la misma petición de forma anónima por HTTP sin
cifrar con un cuerpo idéntico; en ese caso no se necesita ninguna
credencial.

## Campos registrados

- `version` — de `version.number`
- `extra.clusterName`, `extra.luceneVersion`, `extra.buildHash`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:elasticsearch`.
