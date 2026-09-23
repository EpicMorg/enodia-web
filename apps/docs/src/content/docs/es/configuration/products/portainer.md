---
title: Portainer
description: Configuración de enodia para sondear Portainer.
---

Lee `GET /api/system/status` para obtener la versión (el alias antiguo
`/api/status` responde de forma idéntica, pero esta sonda siempre usa la
ruta actual).

```yaml
targets:
  - id: portainer-main
    product: portainer
    address: https://portainer.example.com
```

## Autenticación

Ninguna: el endpoint es público a propósito y está accesible incluso antes
de que se haya creado la cuenta de administrador obligatoria del primer
arranque.

## Campos registrados

- `version`
- `extra.instanceId`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:portainer/portainer`: endoflife.date no tiene un calendario de
Portainer (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
