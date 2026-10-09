---
title: ONLYOFFICE Docs
description: Configuración de enodia para sondear ONLYOFFICE Docs.
---

Lee la raíz del servidor de documentos, `GET /index.html`, de forma
anónima; responde incluso con JWT activado: «Server is functioning
normally. Version: 9.4.0. Build: 129. Release date: … Package type: 0. …».
Después lee `GET /welcome/` para comprobar la marca. El esquema por
defecto es `https`.

```yaml
targets:
  - id: onlyoffice-main
    product: onlyoffice
    address: https://office.example.com
```

## Una sonda, dos productos

ONLYOFFICE Docs y su bifurcación
[Euro-Office](/es/configuration/products/euro-office/) (tal como se
distribuye para Nextcloud) son el mismo servidor y comparten una sonda,
pero cada uno tiene su propia línea de versiones, así que cada uno es un
producto propio con su propio resolvedor: comparado con las versiones de
ONLYOFFICE, un Euro-Office actualizado aparecería siempre como
desactualizado.

`/index.html` es idéntico en ambos, así que la marca sale del título de
`/welcome/`: «ONLYOFFICE Docs Community Edition» frente a «Euro-Office
Docs Community Edition». **Un servidor de la otra marca se rechaza
indicando el producto que debe usarse**: `product: onlyoffice` apuntado a
un servidor Euro-Office falla con `this document server is Euro-Office, not ONLYOFFICE —
use product: euro-office`, en lugar de registrarlo como un dato de
ONLYOFFICE (del mismo modo que [`mysql`](/es/configuration/products/mysql/)
rechaza MariaDB). Si la página de bienvenida está desactivada (404), se da
por hecho que el servidor es lo que indica la configuración.

El comando `version` del servicio de coedición necesita el secreto JWT, y
`api.js` no incluye ninguna versión; de ahí `/index.html`.

## Autenticación

Ninguna: ambas páginas son públicas y la sonda no acepta ningún tipo de
credencial. Desde la 2.2.0, una credencial asociada a un destino
`onlyoffice` es un error de configuración y no se ignora en silencio;
consulte [Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: p. ej. `9.4.0`
- `extra.build`: el número de compilación, p. ej. `129`
- `extra.edition`: a partir del tipo de paquete: `community` (0),
  `enterprise` (1) o `developer` (2)
- `extra.brand`: la marca del título de `/welcome/` (`ONLYOFFICE`),
  cuando la página de bienvenida está activa

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).
Se usa `onlyoffice:document_server` de NVD; `onlyoffice:server` es el
Community Server, un producto aparte.

## Resolvedor del ciclo de vida

`github:ONLYOFFICE/DocumentServer`: endoflife.date no tiene un calendario
de ONLYOFFICE (404 confirmado), por lo que se resuelve contra GitHub
Releases: solo la última etiqueta publicada que no sea prerelease, sin
fechas eol/support/lts (GitHub no tiene opinión sobre la política de ciclo
de vida, solo sobre «cuál es la última versión»).
