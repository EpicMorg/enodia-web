---
title: HAProxy
description: Configuración de enodia para sondear HAProxy.
---

Lee la versión del encabezado de la propia **página de estadísticas** de
HAProxy: HAProxy no tiene endpoint de versión y, a diferencia de nginx,
de forma predeterminada no envía ninguna cabecera `Server` que lo
identifique.

```yaml
targets:
  - id: haproxy-main
    product: haproxy
    address: https://haproxy.example.com
```

`/stats` es la ruta predeterminada de esta sonda: configure `path:`
explícitamente solo si su página de estadísticas está montada en otro
lugar.

## La página de estadísticas debe estar habilitada

Confirmado en vivo contra un contenedor `haproxy:3.0` real: la página de
estadísticas (`stats enable` en la propia configuración de HAProxy; **no
está activada de forma predeterminada**) es la única superficie anónima
que incluye la versión: la exportación de estadísticas `;csv` no tiene
ninguna columna de versión en su cabecera de ~140 columnas, por lo que
esta sonda lee específicamente la forma HTML.

## Autenticación

Opcional. `stats auth user:pass` (la directiva de configuración propia de
HAProxy para esta página) es HTTP Basic normal:

```yaml
credentials:
  haproxy-stats:
    kind: basic
    username: admin
    password: "${HAPROXY_STATS_PASSWORD}"
```

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:haproxy`.
