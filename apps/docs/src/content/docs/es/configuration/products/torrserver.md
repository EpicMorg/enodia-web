---
title: TorrServer
description: Configuración de enodia para sondear TorrServer.
---

Lee `GET /echo`, al que TorrServer responde con su versión como texto
plano. El esquema por defecto es `https`.

```yaml
targets:
  - id: torrserver-main
    product: torrserver
    address: https://torrserver.example.com
```

## Forma de la versión

`/echo` responde, p. ej., `MatriX.146`: un nombre en clave y un número,
con la misma grafía que las etiquetas de versión de TorrServer en GitHub
(`MatriX.146`, `MatriX.145.2`). La versión se registra tal cual; la
comparación usa los números tras el nombre en clave, en ambos lados. Una
respuesta que no tenga esa forma (por ejemplo, una página HTML) se
notifica como no compatible.

## Autenticación

Opcional. `basic` se envía si está configurado, para una instancia con su
propia autenticación activada; si no hay ninguna configurada, la petición
es anónima. `basic` es el único tipo aceptado: desde la 2.2.0, cualquier
otro tipo es un error de configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

```yaml
credentials:
  torrserver-auth:
    kind: basic
    username: admin
    password: "${TORRSERVER_PASSWORD}"
```

## Campos registrados

Solo `version`: p. ej. `MatriX.146` (lo que respondió en `/echo` un
`ghcr.io/yourok/torrserver:latest` en vivo). Esta sonda no registra
ningún campo `extra`.

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables
para este producto. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`github:YouROK/TorrServer`: endoflife.date no tiene un calendario de
TorrServer (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
