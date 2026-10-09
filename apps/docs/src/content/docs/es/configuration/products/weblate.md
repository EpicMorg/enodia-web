---
title: Weblate
description: Configuración de enodia para sondear Weblate.
---

Lee `GET /about/` de forma anónima. El esquema por defecto es `https`.

```yaml
targets:
  - id: weblate-main
    product: weblate
    address: https://weblate.example.com
```

## De dónde sale la versión

El pie de cada página de Weblate indica `Powered by <a href="https://weblate.org/">Weblate 2026.10</a>`,
y su enlace a la documentación apunta a `docs.weblate.org/en/weblate-2026.10/`.
La sonda lee primero el pie y, si este se ha eliminado al personalizarlo,
el enlace a la documentación; una página sin ninguno de los dos se
notifica como no compatible. Se lee `/about/` porque existe en todo
Weblate; un sitio con `REQUIRE_LOGIN` lo redirige a la página de inicio
de sesión, que incluye el mismo pie. La raíz de la API REST (`/api/`)
también es anónima, pero no incluye ninguna versión, y `/api/metrics/`
necesita un token.

Weblate pasó a versiones de calendario después de la 5.x (`2026.9`,
`2026.9.1`, `2026.10`); ambas formas se analizan.

## Autenticación

Ninguna: la sonda lee una página anónima y no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial configurada en este destino es
un error de configuración en lugar de ignorarse; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

Solo `version`: p. ej. `2026.10` (confirmado en vivo en
`weblate/weblate:latest`). Esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:WeblateOrg/weblate`: endoflife.date no tiene un calendario de
Weblate (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»). Weblate etiqueta sus
versiones como `weblate-2026.10`; desde la 2.2.0, el resolvedor quita un
`<repo>-` o `<repo>_` inicial de las etiquetas de versión, de modo que
LATEST y CYCLE indican `2026.10`.
