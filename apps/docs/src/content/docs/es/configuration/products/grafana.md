---
title: Grafana
description: Configuración de enodia para sondear Grafana.
---

Lee `GET /api/health` para obtener la versión.

```yaml
targets:
  - id: grafana-main
    product: grafana
    address: https://grafana.example.com
```

## Autenticación

Ninguna: confirmado en vivo, este endpoint responde `200` con un cuerpo
válido incluso con credenciales Basic incorrectas. Existe para la
comprobación de disponibilidad de un balanceador de carga, no como una
ruta de API protegida, así que no hay ninguna ruta con credenciales que
ofrecer aquí.

## Campos registrados

- `version`
- `extra.commit`, `extra.database`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:grafana`.
