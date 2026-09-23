---
title: Bitwarden
description: Configuración de enodia para sondear un servidor Bitwarden autoalojado.
---

Solo autoalojado: no tiene sentido apuntar esta sonda al servicio en la
nube de Bitwarden. Lee `GET /api/version`, que devuelve una cadena JSON
simple (no un objeto). No hacen falta credenciales: las aplicaciones
cliente usan este endpoint para comprobar la compatibilidad del servidor
antes de que exista un inicio de sesión.

```yaml
targets:
  - id: bitwarden-main
    product: bitwarden
    address: https://vault.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## No es el mismo producto que Vaultwarden

[Vaultwarden](/es/configuration/products/vaultwarden/) es una
reimplementación desde cero en Rust de la API del servidor Bitwarden, no
un fork, con su propia numeración de versiones independiente. Expone el
mismo endpoint y la misma forma de respuesta, pero está registrado como un
`product:` aparte: apuntar una instalación de Vaultwarden a
`product: bitwarden` compararía la versión de un proyecto con el historial
de versiones del otro.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:bitwarden/server`: endoflife.date no tiene un calendario
`bitwarden` (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
