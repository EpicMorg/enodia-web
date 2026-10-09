---
title: NetBox
description: Configuración de enodia para sondear NetBox.
---

Lee la página anónima de inicio de sesión, `GET /login/`, cuyo elemento
raíz incluye `data-netbox-version`: p. ej. `4.3.3-Docker-3.3.0` en un
NetBox ejecutado desde netbox-docker. Si falta el atributo, se usa en su
lugar la versión con la que la página carga su paquete
(`/static/netbox.js?v=4.3.3`). El esquema por defecto es `https`.

```yaml
targets:
  - id: netbox-main
    product: netbox
    address: https://netbox.example.com
```

## Por qué la página de inicio de sesión

La API REST de NetBox (`/api/status/`) necesita un token; la página de
inicio de sesión incluye la versión sin él (confirmado en vivo en un
NetBox de producción desde netbox-docker). La parte anterior a `-Docker-`
es la versión propia de NetBox; el resto es la versión de la imagen de
netbox-docker.

## Autenticación

Ninguna: la página de inicio de sesión es pública y la sonda no acepta
ningún tipo de credencial. Desde la 2.2.0, una credencial asociada a un
destino `netbox` es un error de configuración y no se ignora en silencio;
consulte [Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: la versión de NetBox, p. ej. `4.3.3`
- `extra.netboxDocker`: la versión de la imagen de netbox-docker
  (`3.3.0`), solo cuando `data-netbox-version` tiene un sufijo `-Docker-`

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).
El «LenelS2 NetBox» de la BDU es un producto distinto y no se usa.

## Resolvedor del ciclo de vida

`github:netbox-community/netbox`: endoflife.date no tiene un calendario de
NetBox (404 confirmado), por lo que se resuelve contra GitHub Releases:
solo la última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
