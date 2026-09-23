---
title: ClickHouse
description: Configuración de enodia para sondear ClickHouse.
---

Ejecuta `SELECT version()` contra la interfaz HTTP de ClickHouse (puerto
8123 por defecto) y lee la respuesta en texto plano.

```yaml
targets:
  - id: clickhouse-main
    product: clickhouse
    address: https://clickhouse.example.com:8123
```

## Autenticación

Opcional. Las imágenes recientes exigen que `CLICKHOUSE_PASSWORD` esté
definido (no hay una contraseña vacía por defecto para el usuario default
a la que recurrir, a diferencia de instalaciones más antiguas), así que
una petición sin autenticar contra una instancia endurecida recibe un
`401` normal, tratado igual que en cualquier otra sonda:

```yaml
credentials:
  clickhouse-default:
    kind: basic
    username: default
    password: "${CLICKHOUSE_PASSWORD}"
```

Que un despliegue concreto necesite credenciales o no depende por
completo de cómo se haya configurado.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:clickhouse`.
