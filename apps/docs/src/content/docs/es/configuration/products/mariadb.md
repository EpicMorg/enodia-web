---
title: MariaDB
description: Configuración de enodia para sondear MariaDB Server.
---

Un protocolo TCP en bruto, no HTTP: `address` es `host` o `host:port`,
sin esquema. El puerto predeterminado es `3306` cuando se omite. El mismo
handshake que [MySQL](/es/configuration/products/mysql/): MariaDB anuncia
su versión sin que se le pida, en el paquete de handshake inicial, antes
de cualquier paso de autenticación, por lo que esta sonda nunca necesita
una credencial.

```yaml
targets:
  - id: mariadb-main
    product: mariadb
    address: db.example.com:3306
```

## Autenticación

Ninguna: la versión se lee directamente del handshake.

## Verificación de la identidad del fabricante

MariaDB y MySQL hablan exactamente el mismo handshake y solo se
diferencian en un detalle: MariaDB antepone a su versión una máscara de
compatibilidad `5.5.5-` para los clientes antiguos de MySQL (confirmado
en vivo, sigue siendo así en MariaDB 10.11). Esta sonda exige esa máscara
y la elimina: apuntada a un servidor MySQL real, falla en lugar de
registrar un dato erróneo, la imagen especular de
[`mysql`](/es/configuration/products/mysql/#mariadb-es-un-producto-distinto)
rechazando un servidor MariaDB.

## Campos registrados

- `version`: la versión numérica, p. ej. `10.11.19`
- `extra.tag`: la etiqueta del fabricante que la sigue, p. ej.
  `MariaDB-ubu2204`, cuando está presente

## Correlación de CVE

Todavía no se contrasta: MariaDB es nueva en la 2.1, y upstream ha dejado su correspondencia de CVE para una pasada posterior y
específica. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:mariadb`.
