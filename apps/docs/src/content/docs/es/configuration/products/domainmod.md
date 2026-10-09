---
title: DomainMOD
description: Configuración de enodia para sondear DomainMOD.
---

Lee `GET /CHANGELOG`, el archivo de cambios que DomainMOD incluye en su
raíz web, servido como archivo estático. El esquema por defecto es
`https`.

```yaml
targets:
  - id: domainmod-main
    product: domainmod
    address: https://domains.example.com
```

A un DomainMOD instalado en una subruta (`DOMAINMOD_WEB_ROOT`) se llega
incluyendo esa ruta en la dirección, p. ej.
`https://www.example.com/domainmod`.

## Por qué el CHANGELOG

DomainMOD muestra `Version 4.23.0` solo en el pie del diseño para usuarios
con sesión iniciada. El CHANGELOG es anónimo: empieza por
`DomainMOD CHANGELOG`, una línea separadora y después la entrada más
reciente primero: `v4.23.0     2025-01-04`. La sonda exige ese
encabezado, para que el archivo de cambios de otra aplicación no se lea
como el de DomainMOD. Un servidor web que bloquee el archivo hace que el
destino sea «no compatible».

## Autenticación

Ninguna: la sonda lee un archivo estático y no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial configurada en este destino es
un error de configuración en lugar de ignorarse; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

Solo `version`: p. ej. `4.23.0`, de la entrada más reciente del CHANGELOG,
`v4.23.0     2025-01-04` (confirmado en vivo en `domainmod/domainmod:latest`,
cuyo `software.inc.php` indica `SOFTWARE_VERSION = '4.23.0'`). Esta sonda
no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:domainmod/domainmod`: endoflife.date no tiene un calendario de
DomainMOD (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
