---
title: ProFTPD
description: Configuración de enodia para sondear ProFTPD.
---

Una sonda TCP en bruto, no HTTP: `address` es `host` o `host:port`, sin
esquema. El puerto por defecto es `21` si se omite. Lee el saludo FTP (la
respuesta `220` de la RFC 959) que todo servidor envía sin que se le pida
al conectarse, y busca una versión dentro de él.

```yaml
targets:
  - id: ftp-main
    product: proftpd
    address: ftp.example.com:21
```

## Autenticación

Ninguna: el saludo se envía antes de cualquier paso de autenticación.

## La configuración por defecto no incluye ninguna versión

Sin ninguna directiva `ServerIdent` configurada (el comportamiento por
defecto real, confirmado en vivo tanto contra un host real de producción
como contra un contenedor `instantlinux/proftpd` recién creado), el saludo
dice `"ProFTPD Server (<ServerName>) [<address>]"`, sin ninguna versión.
La versión solo aparece si un administrador configura explícitamente
`ServerIdent on "... %{version} ..."`, algo también confirmado en vivo:
`"ProFTPD 1.3.9c ready at 127.0.0.1"`. Por tanto, el caso «no se encontró
ninguna versión» de esta sonda es el habitual, no la excepción.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:proftpd`.
