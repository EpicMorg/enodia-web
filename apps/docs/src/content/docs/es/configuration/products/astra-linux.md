---
title: Astra Linux
description: Configuración de enodia para sondear Astra Linux por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero lee otro archivo: `/etc/astra_version`, el archivo de identidad
propio de Astra, en lugar de `/etc/os-release`.

```yaml
targets:
  - id: astra-host
    product: astra-linux
    address: host.example.com
    credentials: linux-host-ssh
```

## Por qué no `/etc/os-release`

Astra Linux está basada en Debian y sí incluye `/etc/os-release`
(`ID_LIKE=debian`), pero su `VERSION_ID` no es utilizable: se confirmó en
vivo (`epicmorg/astralinux:1.7-main` y `:1.8-main`) que contiene
`"1.8_x86-64"`, con un sufijo de arquitectura incrustado directamente en
la cadena de versión. `/etc/astra_version` no tiene nada de eso: un simple
`"1.8.6"`/`"1.7.9"`, la versión puntual real que sigue la propia Astra.

## Campos registrados

- `version` — de `/etc/astra_version`
- `extra.hostKeyVerified`

## Correlación de CVE

Se coteja **por paquete instalado** con el OVAL propio de Astra Linux para SE 1.7 o 1.8 (`oval-definitions-alse-<1.7|1.8>.xml`, en `cve.oval.path`): los datos de Debian no son aplicables, ya que las versiones de los paquetes de Astra son recompilaciones propias. La versión se coteja por su major.minor (`1.8.6` → 1.8). La sonda también enumera los paquetes binarios instalados (`dpkg-query`) en el mismo viaje de ida y vuelta por SSH que `/etc/astra_version`; se almacenan como `packages` de la observación, además de `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Los hallazgos enlazan al boletín propio de Astra o, cuando el fabricante no cita ninguno (1.7), a BDU. Los datos de Astra no incluyen severidad, y sus paquetes de kernel se comparan tal como están instalados, no según el que está en ejecución. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene un calendario de Astra Linux (404
confirmado con `astra`, `astralinux` y `astra-linux`). Solo inventario.
