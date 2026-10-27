---
title: PostgreSQL
description: Configuración de enodia para sondear PostgreSQL.
---

Una sonda de protocolo de red en bruto, no HTTP: `address` es `host` o
`host:port`, sin esquema. El puerto por defecto es `5432` si se omite.
También se acepta `product: postgres` como alias de `postgresql`.

La versión procede de un mensaje `ParameterStatus` que todo backend de
PostgreSQL envía automáticamente justo después de que la autenticación
tenga éxito; no hace falta una consulta `SHOW server_version` explícita.

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
```

## Autenticación

Solo es necesaria si el servidor realmente la solicita: la autenticación
trust no necesita ninguna credencial. Cuando sí la solicita, **se admiten
trust, cleartext, MD5 y SCRAM-SHA-256, y se negocian automáticamente**,
incluido SCRAM-SHA-256, el método por defecto en PostgreSQL 14+ y habitual
en 10-13, sin el cual la mayoría de los despliegues reales serían
inaccesibles.

```yaml
credentials:
  pg-app:
    kind: password
    username: enodia_ro   # opcional; si se omite, se usa "postgres"
    password: "${PG_PASSWORD}"
```

## Base de datos

La sonda solicita la base de datos `postgres`, que existe en todos los
servidores y concede `CONNECT` a todo el mundo, de modo que un rol que solo
tiene `LOGIN` revela la versión sin tener una base de datos propia. Para un
servidor sin base de datos `postgres`, indique otra en `options.database`:

```yaml
targets:
  - id: pg-main
    product: postgresql
    address: db.example.com:5432
    credentials: pg-app
    options:
      database: inventory
```

:::caution[Cambiado en la 2.2.1]
Hasta la 2.2.0 la sonda solicitaba una base de datos con el nombre del
usuario de login, así que un rol que solo tiene login fallaba con
`database "<user>" does not exist`. Un destino que dependiera de eso tiene
que indicar ahora su base de datos en `options.database`.
:::

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Desde la 2.2, `cve.postgresql.path`
añade las propias páginas de seguridad del proyecto, que nombran la
corrección por versión mayor: para una versión mayor que nombren las
páginas guardadas, su veredicto sustituye a los rangos sin rama de BDU,
que de otro modo marcan la última versión de cada versión mayor más
antigua. Consulte
[Datos propios de los fabricantes → PostgreSQL](/es/cve/#postgresql).

## Resolvedor del ciclo de vida

`endoflife:postgresql`.
