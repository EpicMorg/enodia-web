---
title: phpIPAM
description: Configuración de enodia para sondear phpIPAM.
---

Lee la página de inicio de sesión, `GET /index.php?page=login`, de forma
anónima. El esquema por defecto es `https`.

```yaml
targets:
  - id: ipam-main
    product: phpipam
    address: https://ipam.example.com
```

## De dónde sale la versión

El pie de la página de inicio de sesión indica
`phpIPAM IP address management [v1.8.3]`, y cada hoja de estilos y script
de la página se carga con `?v=1.8.3_r002_v46`, el prefijo de scripts
propio de phpIPAM: la versión visible, la revisión del código y la versión
del esquema de la base de datos. El pie da la versión; el sufijo de los
recursos es la alternativa cuando el pie se ha eliminado al personalizarlo,
y la fuente de la revisión y de la versión del esquema. Las versiones
anteriores cargan los recursos con un simple `?v=1.7.3` (visto en una 1.7.3
de producción), sin las partes de revisión y esquema: la versión se sigue
leyendo, y los dos campos `extra` quedan entonces ausentes. Una página sin
ninguno de los dos se notifica como no compatible.

## Autenticación

Ninguna: la sonda lee una página anónima y no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial configurada en este destino es
un error de configuración en lugar de ignorarse; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: p. ej. `1.8.3`, de `phpIPAM IP address management [v1.8.3]`
  (confirmado en vivo en `phpipam/phpipam-www:latest`)
- `extra.revision`: la revisión del código del sufijo de los recursos,
  p. ej. `002`
- `extra.dbVersion`: la versión del esquema de la base de datos del sufijo
  de los recursos, p. ej. `46`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un
[bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:phpipam/phpipam`: endoflife.date no tiene un calendario de phpIPAM
(404 confirmado), por lo que se resuelve contra GitHub Releases: solo la
última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
