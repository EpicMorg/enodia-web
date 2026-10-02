---
title: Alpine Linux
description: Configuración de enodia para sondear Alpine Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `alpine:latest`: `ID=alpine` (nota: el campo
`ID` tal cual, no `alpine-linux`; el valor de `product:` añade `-linux`
por claridad, pero la coincidencia se hace con la cadena más corta del
fabricante), `VERSION_ID=3.24.1`.

## Correlación de CVE

Se coteja **por paquete instalado** con el secdb de Alpine para la rama del host (`main.json` y `community.json`, en `cve.alpine.path`), no por versión. La rama es el major.minor de `VERSION_ID` (3.20.3 → v3.20); edge no tiene una rama numerada y no obtiene hallazgos. La sonda también lee `/lib/apk/db/installed` en el mismo viaje de ida y vuelta por SSH e indexa los paquetes por su **origen** (la clave propia de secdb: `libcrypto3` y `libssl3` son ambos `openssl`); se almacenan como `packages` de la observación, además de `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Solo se informan las CVE con una corrección más reciente que lo instalado, un hallazgo por origen, enlazado a su página en security.alpinelinux.org; secdb no incluye severidad. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

`endoflife:alpine-linux`.
