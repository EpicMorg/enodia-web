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

La base de datos a la que se conecta toma por defecto el mismo valor que
el nombre de usuario (comportamiento por defecto del servidor); por ahora
no existe ningún campo de configuración para indicar explícitamente otro
nombre de base de datos.

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
