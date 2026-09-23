---
title: YouTrack
description: Configuración de enodia para sondear YouTrack.
---

Lee `GET /api/config?fields=version`.

```yaml
targets:
  - id: youtrack-main
    product: youtrack
    address: https://youtrack.example.com
```

## Autenticación

No es necesaria: confirmado en vivo contra una instancia real de YouTrack
expuesta a Internet; este endpoint no necesita credenciales, y cualquier
campo solicitado aparte de `version` (`buildDate`, `edition`, ...) se
ignora en silencio para un llamante anónimo en lugar de devolverse. Se
acepta `bearer` si, aun así, prefiere autenticarse.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:youtrack`.
