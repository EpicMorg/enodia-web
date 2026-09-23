---
title: Logstash
description: Configuración de enodia para sondear Logstash.
---

Lee `GET /` en la propia API HTTP de monitorización de Logstash: **puerto
9600 de forma predeterminada, no los puertos de Elasticsearch ni de
Kibana**.

```yaml
targets:
  - id: logstash-main
    product: logstash
    address: https://logstash.example.com:9600
```

## Autenticación

Ninguna. La API de monitorización de Logstash no tiene ninguna
autenticación integrada: está pensada para aislarse con un cortafuegos,
no para protegerse con credenciales. Confirmado en vivo contra un
contenedor `docker.elastic.co/logstash/logstash` real.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:logstash`.
