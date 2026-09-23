---
title: Mattermost
description: Configuración de enodia para sondear Mattermost.
---

Lee `GET /api/v4/config/client?format=old` para obtener la versión: el
mismo endpoint público de configuración del cliente que necesita una
página de inicio de sesión antes de que exista ninguna sesión.

```yaml
targets:
  - id: mattermost-main
    product: mattermost
    address: https://mattermost.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

La respuesta real es un volcado completo de la configuración del
cliente: más de un centenar de claves, incluidos indicadores de
funcionalidades, colores de los botones de SSO y campos que realmente
identifican el despliegue (`SiteName`, `SupportEmail`, un ID de
telemetría/diagnóstico, una clave pública de firma). Nada de eso
describe el software en sí, por lo que solo se leen `Version` y los
campos `Build*`.

## Campos registrados

- `version`
- `extra.buildNumber`, `extra.buildHash`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:mattermost`.
