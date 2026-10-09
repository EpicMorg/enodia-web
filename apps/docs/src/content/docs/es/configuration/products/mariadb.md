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
diferencian en la cadena de versión, que tiene dos formas, ambas
confirmadas en vivo:

- **MariaDB 10.x** oculta su versión tras un prefijo de compatibilidad
  `5.5.5-` para los clientes antiguos de MySQL:
  `5.5.5-10.11.19-MariaDB-ubu2204`. La máscara se elimina.
- **MariaDB 11.0+** abandonó la máscara: `11.4.13-MariaDB-ubu2404`,
  `12.3.3-MariaDB-ubu2404`. El `-MariaDB` de la versión es entonces la
  única señal. Se reconoce desde la 2.1.1; la 2.1.0 rechazaba estos
  servidores.

Se acepta cualquiera de las dos formas. Apuntada a un servidor MySQL
real, cuya versión no tiene ninguna de las dos, la sonda falla en lugar
de registrar un dato erróneo, la imagen especular de
[`mysql`](/es/configuration/products/mysql/#mariadb-es-un-producto-distinto)
rechazando un servidor MariaDB.

## Campos registrados

- `version`: la versión numérica, p. ej. `10.11.19`
- `extra.tag`: la etiqueta del fabricante que la sigue, p. ej.
  `MariaDB-ubu2204`, cuando está presente

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/) y, con `cve.mariadb.path`, con la propia tabla de CVE corregidas de MariaDB, cuyo veredicto por serie prevalece sobre los rangos abiertos de BDU y NVD. Consulte [Datos propios de los fabricantes → MariaDB](/es/cve/#mariadb).

## Resolvedor del ciclo de vida

`endoflife:mariadb`.
