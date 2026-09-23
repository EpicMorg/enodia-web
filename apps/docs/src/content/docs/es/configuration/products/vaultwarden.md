---
title: Vaultwarden
description: Configuración de enodia para sondear Vaultwarden.
---

Lee `GET /api/version`, que devuelve una cadena JSON simple (no un
objeto): el mismo endpoint y la misma forma de respuesta que el propio
[Bitwarden](/es/configuration/products/bitwarden/). No se necesitan
credenciales: las aplicaciones cliente usan este endpoint para comprobar
la compatibilidad del servidor antes de que exista un inicio de sesión.

```yaml
targets:
  - id: vaultwarden-main
    product: vaultwarden
    address: https://vault.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## No es el mismo producto que Bitwarden

Vaultwarden es una reimplementación desde cero en Rust de la API de
servidor de Bitwarden, no un fork: tiene su propia numeración de versiones
independiente, que no sigue las versiones de Bitwarden. Precisamente por
eso está registrado como un `product:` distinto: comparar la versión de
una instalación de Vaultwarden con un calendario de ciclo de vida con la
etiqueta `bitwarden` sería comparar dos esquemas de numeración sin
relación entre sí.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:dani-garcia/vaultwarden`: endoflife.date no tiene un calendario
`vaultwarden` (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de
ciclo de vida, solo sobre «cuál es la última versión»).
