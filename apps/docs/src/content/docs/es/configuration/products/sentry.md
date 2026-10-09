---
title: Sentry
description: Configuración de enodia para sondear Sentry.
---

Lee la página anónima de inicio de sesión de un Sentry autoalojado,
`GET /auth/login/` (que redirige a la página de inicio de sesión de la
única organización). Cada página incluye `window.__initialData = {...}`, y
su `version.current` es la versión. El esquema por defecto es `https`.

```yaml
targets:
  - id: sentry-main
    product: sentry
    address: https://sentry.example.com
```

## Por qué la página de inicio de sesión

Confirmado en vivo, de forma anónima, en una 26.2.1 autoalojada de
producción. El mismo objeto `version` también tiene un campo `latest` (la
propia comprobación de actualizaciones de Sentry), que **no** se usa: con
esa comprobación desactivada estaba desactualizado (`21.7.0`). La raíz de
la API, `/api/0/`, también es anónima, pero su `"version":
"0"` es la versión de la API, no la del servidor;
`/api/0/internal/health/` necesita autenticación.

## Autenticación

Ninguna: la página de inicio de sesión es pública y la sonda no acepta
ningún tipo de credencial. Desde la 2.2.0, una credencial asociada a un
destino `sentry` es un error de configuración y no se ignora en silencio;
consulte [Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: de `version.current`, p. ej. `26.2.1`
- `extra.build`: el commit de git de `version.build`
- `extra.mode`: `sentryMode`, p. ej. `SELF_HOSTED`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).
Las entradas «Sentry» de la BDU se refieren al SDK, no al servidor, y no
se usan.

## Resolvedor del ciclo de vida

`github:getsentry/self-hosted`: endoflife.date no tiene un calendario de
Sentry (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»). Las etiquetas de versión de
getsentry/self-hosted (`26.8.0`, `26.9.0`, …) son las versiones del
servidor que instala.
