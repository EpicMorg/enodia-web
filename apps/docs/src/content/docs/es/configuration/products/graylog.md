---
title: Graylog
description: Configuración de enodia para sondear Graylog.
---

Lee `GET /api/`: el recurso raíz de la propia API REST, un documento de
descubrimiento público que todo nodo de Graylog responde sin credenciales.

```yaml
targets:
  - id: graylog-main
    product: graylog
    address: https://graylog.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra un contenedor `graylog/graylog` real
(junto con el MongoDB y el Elasticsearch de los que depende): la raíz
responde de forma anónima.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:graylog`.
