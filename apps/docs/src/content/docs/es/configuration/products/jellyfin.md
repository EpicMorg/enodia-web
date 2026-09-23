---
title: Jellyfin
description: Configuración de enodia para sondear Jellyfin.
---

Lee `GET /System/Info/Public` para obtener la versión: la variante
«Public» del endpoint de información del sistema de Jellyfin,
accesible a propósito antes de que exista un inicio de sesión.

```yaml
targets:
  - id: jellyfin-main
    product: jellyfin
    address: https://jellyfin.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Verificación de la identidad del fabricante

El `ProductName` de la respuesta se compara con `"Jellyfin Server"`. La
misma respuesta también incluye el `ServerName` propio de este
despliegue, un `Id` de instalación persistente y su `LocalAddress`;
nada de eso describe el software en sí, por lo que solo se leen
`Version` y `ProductName`.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:jellyfin/jellyfin`: endoflife.date no tiene un calendario de
Jellyfin (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
