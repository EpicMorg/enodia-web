---
title: Owncast
description: Configuración de enodia para sondear Owncast.
---

Lee `GET /api/status` para obtener la versión.

```yaml
targets:
  - id: owncast-main
    product: owncast
    address: https://owncast.example.com
```

## Autenticación

Ninguna: la ruta no tiene ningún middleware que exija autenticación en el
propio código fuente de Owncast, confirmado contra un contenedor
`owncast/owncast:latest` en vivo.

## Campos registrados

- `version`: de `versionNumber`
- `extra.online`: `"true"`/`"false"`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:owncast/owncast`: endoflife.date no tiene un calendario de
Owncast (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
