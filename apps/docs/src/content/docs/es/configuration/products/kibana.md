---
title: Kibana
description: Configuración de enodia para sondear Kibana.
---

Lee `GET /api/status`, que por diseño no requiere autenticación (es lo
que usan los orquestadores como sonda de liveness/readiness; la propia
readiness probe del chart de Helm oficial de Elastic hace curl a esta
misma ruta sin credenciales).

```yaml
targets:
  - id: kibana-main
    product: kibana
    address: https://kibana.example.com
```

## Autenticación

Ninguna. Confirmado en vivo contra un contenedor
`docker.elastic.co/kibana/kibana` real (respaldado por un Elasticsearch
real): la respuesta incluye la versión completa incluso mientras Kibana
todavía se está iniciando y responde `503` por «todavía no está listo»;
el cuerpo ya la contiene, sea cual sea el código de estado.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:kibana`.
