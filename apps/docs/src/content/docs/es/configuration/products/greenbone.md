---
title: Greenbone / OpenVAS
description: Configuración de enodia para sondear Greenbone / OpenVAS.
---

Lee la versión de gsad (el daemon web Greenbone Security Assistant que
está delante de OpenVAS) desde `GET /gmp`. El esquema por defecto es
`https`. Se aceptan `product: openvas` y `product: gsad` como alias.

```yaml
targets:
  - id: greenbone-main
    product: greenbone
    address: https://greenbone.example.com
```

## Por qué el 401 de `/gmp`

gsad envuelve cada respuesta de `/gmp` en un sobre que incluye su versión,
también el 401 de una petición sin sesión:
`<envelope><version>24.12.0</version><vendor_version></vendor_version>…`
(«Authentication required … (GSA 24.12.0)»). La sonda acepta ese 401 y
lee el sobre. La propia interfaz web es un paquete estático de React sin
ninguna versión.

La versión es la de gsad. El escáner (openvas-scanner) y gvmd, que están
detrás, tienen versiones propias y no son visibles sin iniciar sesión.

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Campos registrados

- `version`: p. ej. `24.12.0`, de `<envelope><version>`
- `extra.vendorVersion`: `<vendor_version>`, cuando no está vacío

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/),
como gsad (`greenbone_security_assistant`), no como el daemon
`openvas_manager`.

## Resolvedor del ciclo de vida

`github:greenbone/gsad`: endoflife.date no tiene un calendario de
Greenbone (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
