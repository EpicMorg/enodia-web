---
title: LibreTranslate
description: Configuración de enodia para sondear LibreTranslate.
---

Lee `GET /spec`, el propio documento OpenAPI (Swagger 2.0) de la API, que
es público incluso donde traducir requiere una clave de API. El esquema
por defecto es `https`.

```yaml
targets:
  - id: translate-main
    product: libretranslate
    address: https://translate.example.com
```

## Verificación de la identidad del fabricante

`info.version` es la versión del servidor. La sonda exige además que
`info.title` sea `"LibreTranslate"`, para que el documento Swagger de
otro servicio no se lea como el de LibreTranslate.

## Autenticación

Ninguna: `/spec` es público y la sonda no acepta ningún tipo de credencial
(una clave de API solo hace falta para traducir, algo que la sonda nunca
hace). Desde la 2.2.0, una credencial configurada en este destino es un
error de configuración en lugar de ignorarse; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

Solo `version`: p. ej. `1.9.6`, de `info.version` (confirmado en vivo en
`libretranslate/libretranslate:latest`, versión v1.9.6). Esta sonda no
registra ningún campo `extra`.

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables
para este producto. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`github:LibreTranslate/LibreTranslate`: endoflife.date no tiene un
calendario de LibreTranslate (404 confirmado), por lo que se resuelve
contra GitHub Releases: solo la última etiqueta publicada que no sea
prerelease, sin fechas eol/support/lts (GitHub no tiene opinión sobre la
política de ciclo de vida, solo sobre «cuál es la última versión»).
