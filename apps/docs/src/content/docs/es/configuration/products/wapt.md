---
title: WAPT
description: Configuración de enodia para sondear WAPT.
---

Lee el `GET /ping` del servidor WAPT (Tranquil IT), que este sirve sin
sesión.

```yaml
targets:
  - id: wapt-main
    product: wapt
    address: https://wapt.example.com
```

## Qué versión se notifica

`/ping` incluye tanto `version` (`1.8.2`) como `git_hash`
(`1.8.2.7334-2d15afd9-debian-10-amd64`), que empieza por el número de
compilación completo. Cuando ese número de compilación amplía `version`,
se notifica en su lugar: `1.8.2.7334`, no `1.8.2`. Confirmado en vivo en
un servidor WAPT 1.8.2 de producción.

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Campos registrados

- `version`: p. ej. `1.8.2.7334`
- `extra.edition`: p. ej. `community`
- `extra.apiVersion`: p. ej. `v3`
- `extra.gitHash`: p. ej. `1.8.2.7334-2d15afd9-debian-10-amd64`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

Tiene en cuenta la edición: la propia edición de WAPT
(`community`/`enterprise`) ya coincide con los términos de NVD y se
transmite tal cual. Cualquier otro valor se trata como una edición
desconocida, que conserva todos los hallazgos.

## Resolvedor del ciclo de vida

Ninguno: WAPT no tiene página en endoflife.date (404 confirmado), y las
etiquetas de GitHub de Tranquil IT se detuvieron en la 1.5; las versiones
se publican en su propio sitio, que ningún resolvedor de enodia lee. Solo
inventario.
