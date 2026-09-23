---
title: TeamCity
description: Configuración de enodia para sondear JetBrains TeamCity.
---

Lee `GET /app/rest/server` (el punto de entrada al que remite en primer
lugar la propia referencia de la API REST de TeamCity) para obtener la
versión.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    credentials: teamcity-pat
```

## Autenticación — obligatoria, y fácil de confundir

No hay acceso anónimo por defecto: una instancia nueva responde `401` con
desafíos tanto Basic como Bearer (el inicio de sesión como invitado está
desactivado por defecto). TeamCity tiene **dos tipos distintos de token,
confirmado en vivo, que solo funcionan como tipos de credencial opuestos**:

- El **token de arranque de superusuario** de un solo uso que un servidor
  nuevo escribe en el log en su primer inicio solo funciona como
  **Basic**: nombre de usuario vacío y el token como contraseña. Enviado
  como un `Authorization: Bearer` sin más, se rechaza.
- El **token de acceso personal** de un usuario normal (Profile → Access
  Tokens, la forma en que se autentica realmente la automatización de
  larga duración) es lo contrario: confirmado contra siete instancias
  reales de producción, funciona como **Bearer** y se rechaza de plano
  como Basic («Incorrect username or password», incluso con un nombre de
  usuario vacío).

```yaml
credentials:
  # token de arranque: Basic, nombre de usuario vacío
  teamcity-bootstrap:
    kind: basic
    username: ""
    password: "${TEAMCITY_BOOTSTRAP_TOKEN}"

  # token de acceso personal: Bearer
  teamcity-pat:
    kind: bearer
    value: "${TEAMCITY_TOKEN}"
```

Use el token de acceso personal en cualquier configuración de larga
duración: el token de arranque está pensado para sustituirse tras el
primer inicio de sesión.

## Campos registrados

- `version`: la cadena completa, p. ej. `2026.2 (build 238924)`
- `extra.buildNumber`, `extra.internalId`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene un calendario de TeamCity (404
confirmado). Por ahora, solo inventario.
