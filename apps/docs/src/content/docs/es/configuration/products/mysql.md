---
title: MySQL
description: Configuración de enodia para sondear MySQL Server.
---

Un protocolo TCP en bruto, no HTTP: `address` es `host` o `host:port`, sin
esquema `https://`/`http://` (no hay ningún esquema ausente sobre el que
advertir; consulte [Configuración](/es/configuration/#targets)). El
puerto predeterminado es `3306` cuando se omite.

Nunca se envía ninguna solicitud: MySQL anuncia su versión sin que se le
pida, en el paquete de handshake inicial, antes de cualquier paso de
autenticación, por lo que esta sonda nunca necesita una credencial para
observarla.

```yaml
targets:
  - id: mysql-main
    product: mysql
    address: db.example.com:3306
```

## Autenticación

Ninguna: la versión se lee directamente del handshake, antes del punto en
el que una credencial llegaría a importar.

## MariaDB es un producto distinto

MariaDB oculta su versión real tras un prefijo `5.5.5-` para los clientes
de MySQL anteriores al esquema de versiones propio de MariaDB; sigue
siendo así en una imagen actual de MariaDB 10.11. `product: mysql`
apuntado a un servidor MariaDB lo detecta y **falla a propósito**,
indicando la versión real de MariaDB en el error, en lugar de registrarla
en silencio como un dato de MySQL. Todavía no existe una sonda `mariadb`
dedicada: se trata de una parada definitiva, no de algo que hoy se pueda
sortear con la [sonda genérica](/es/configuration/products/generic/).

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:mysql`.
