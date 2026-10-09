---
title: PostHog
description: Configuración de enodia para sondear PostHog.
---

Lee la página anónima de inicio de sesión, `GET /login`, de un PostHog
autoalojado. La página incluye
`window.POSTHOG_APP_CONTEXT = JSON.parse("{...}")` (un documento JSON
dentro de un literal de cadena de JavaScript), y su `commit_sha` se
notifica como la versión. El esquema por defecto es `https`.

```yaml
targets:
  - id: posthog-main
    product: posthog
    address: https://posthog.example.com
```

## El commit de git es la versión

PostHog ya no publica versiones numeradas: una instalación autoalojada
(hobby) sigue la rama principal, y el único identificador que expone es el
commit a partir del cual se compiló (confirmado en vivo, de forma anónima,
en una instancia autoalojada de producción). Así que aquí `version` es un
hash de commit como `55babe9554`, no un número de versión. `/_preflight/`
también es anónimo, pero solo incluye el estado de los servicios y el
realm; `/api/instance_status` necesita inicio de sesión.

## Autenticación

Ninguna: la página de inicio de sesión es pública y la sonda no acepta
ningún tipo de credencial. Desde la 2.2.0, una credencial asociada a un
destino `posthog` es un error de configuración y no se ignora en
silencio; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: el commit de git, p. ej. `55babe9554`
- `extra.commit`: el mismo commit
- `extra.realm`: p. ej. `hosted-clickhouse`, cuando la página lo incluye

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).
Los límites de versión de NVD para PostHog son hashes de commit, que no se
pueden comparar.

## Resolvedor del ciclo de vida

Ninguno: no hay versiones con las que comparar un commit. Saber cuánto se
ha quedado atrás un commit respecto a la rama principal requeriría la API
de comparación de GitHub, un tipo de resolvedor distinto de todos los que
tiene enodia; no se hace. Solo inventario.
