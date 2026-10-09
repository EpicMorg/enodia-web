---
title: code-server
description: Configuración de enodia para sondear code-server.
---

Lee `GET /login` de forma anónima. El esquema por defecto es `https`. La
página de inicio de sesión incluye `<meta id="coder-options" data-settings="{...}">`
(JSON con escapes HTML), y su `codeServerVersion` es la versión del
servidor; la sonda quita los escapes del atributo y lo decodifica.

```yaml
targets:
  - id: code-main
    product: code-server
    address: https://code.example.com
```

## Por qué la página de inicio de sesión

El propio `/version` de code-server necesita la contraseña, y `/healthz`
no incluye ninguna versión. La página de inicio de sesión es accesible sin
iniciar sesión y contiene las mismas opciones con las que se inicia el
editor. Una página sin elemento `coder-options` se notifica como no
compatible (no es code-server).

## Autenticación

Ninguna: la sonda lee una página anónima y no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial configurada en este destino es
un error de configuración en lugar de ignorarse; consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

Solo `version`: p. ej. `4.141.0` (confirmado en vivo en
`codercom/code-server:latest`, cuyo `code-server --version` indicaba
4.141.0 con Code 1.141.0). Esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:coder/code-server`: endoflife.date no tiene un calendario de
code-server (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
