---
title: TeamCity
description: Configuración de enodia para sondear JetBrains TeamCity.
---

Lee la versión de forma anónima desde `GET /app/rest/server/version`
cuando no hay credenciales configuradas, o desde `GET /app/rest/server`
(el punto de entrada al que remite en primer lugar la propia referencia
de la API REST de TeamCity) cuando hay un token.

```yaml
targets:
  - id: teamcity-main
    product: teamcity
    address: https://teamcity.example.com
    # credentials: teamcity-pat    # opcional, véase más abajo
```

## Autenticación — opcional, y fácil de confundir si la añade

**No se necesitan credenciales.** TeamCity sirve `/app/rest/server/version`
a cualquiera, como texto plano (`2026.1.1 (build 222577)`), incluso con el
inicio de sesión como invitado desactivado. Confirmado en servidores
nuevos de la 2017.2 a la 2026.1 sin ningún administrador creado, y en
siete instancias de producción (de la 2024.03 a la 2026.1.3) sin
credenciales. No es acceso de invitado: `/app/rest/server` y los
endpoints exclusivos de invitado se rechazan en esos mismos servidores.
Mientras TeamCity se está iniciando, responde a cualquier ruta con una
página HTML de mantenimiento con código 200, por lo que la respuesta debe
coincidir por completo con `YYYY.N[.N] (build N)` o el destino falla como
no analizable.

**Con un token configurado**, la sonda lee `/app/rest/server` en su lugar:
usted ha pedido una lectura autenticada, esta incluye además `internalId`,
y un token incorrecto sigue siendo un error de autenticación visible en
lugar de quedar enmascarado por la ruta anónima. `/app/rest/server` nunca
es anónimo: una instancia nueva responde `401` con desafíos tanto Basic
como Bearer. TeamCity tiene **dos tipos distintos de token,
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
- `extra.buildNumber`
- `extra.internalId`: solo con un token (`/app/rest/server`)

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene un calendario de TeamCity (404
confirmado). Por ahora, solo inventario.
