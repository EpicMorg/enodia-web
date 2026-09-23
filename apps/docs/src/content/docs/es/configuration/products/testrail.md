---
title: TestRail
description: Configuración de enodia para sondear TestRail.
---

Lee `GET /version.txt`, un archivo estático simple que TestRail incluye en
su raíz web, no una respuesta de la API REST. La propia API REST
documentada de TestRail (`get_current_user` y similares) necesita
credenciales y no incluye en absoluto la versión del producto, y por eso
esta sonda lee en su lugar el archivo estático.

```yaml
targets:
  - id: testrail-main
    product: testrail
    address: https://testrail.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Campos registrados

Solo `version`: el contenido del archivo sin espacios sobrantes, exactamente como se sirve.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene un calendario de TestRail (404
confirmado). Por ahora, solo inventario.
