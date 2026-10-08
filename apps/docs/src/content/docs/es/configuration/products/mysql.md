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

La versión del handshake de MariaDB la delata: MariaDB 10.x la oculta
tras un prefijo `5.5.5-` para los clientes antiguos de MySQL
(`5.5.5-10.11.19-MariaDB-ubu2204`), y MariaDB 11.0+ la envía sin máscara
pero etiquetada (`11.4.13-MariaDB-ubu2404`). `product: mysql` apuntado a
un servidor MariaDB detecta cualquiera de las dos formas y **falla a
propósito**, indicando la versión real de MariaDB en el error, en lugar
de registrarla en silencio como un dato de MySQL. Desde la 2.1, MariaDB
tiene su propia sonda: use
[`product: mariadb`](/es/configuration/products/mariadb/) para ella.

:::caution[MariaDB 11.0+ antes de la 2.1.1]
Hasta la 2.1.0 solo se reconocía la máscara `5.5.5-`, por lo que un
servidor MariaDB 11.0+ detrás de un destino `product: mysql` se
registraba **como MySQL** y se contrastaba con el ciclo de vida de MySQL.
Desde la 2.1.1 ese destino falla en su lugar: cámbielo a
`product: mariadb`.
:::

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:mysql`.
