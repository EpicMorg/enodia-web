---
title: Red Hat Enterprise Linux
description: Configuración de enodia para sondear RHEL por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: rhel-host
    product: rhel
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `registry.redhat.io/ubi9` (la Universal Base
Image gratuita del propio Red Hat): `ID=rhel`, `VERSION_ID="9.8"`.

## Correlación de CVE

Se coteja **por paquete instalado** con el OVAL de Red Hat para la versión mayor del host (`rhel-<N>.oval.xml.bz2`, en `cve.oval.path`), no por versión. La sonda también enumera los paquetes binarios instalados (`rpm -qa`, con el stream de módulo de AppStream de cada paquete) y lee `uname -r`/`-m`/`-v` en el mismo viaje de ida y vuelta por SSH; se almacenan como `packages` y `modules` de la observación, y como `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. De varios kernels instalados, se compara el que está en ejecución. Solo se informan las CVE con una corrección más reciente que lo instalado, un hallazgo por paquete, enlazado a su RHSA. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

`endoflife:rhel`.
