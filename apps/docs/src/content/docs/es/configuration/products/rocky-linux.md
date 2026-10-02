---
title: Rocky Linux
description: Configuración de enodia para sondear Rocky Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: rocky-host
    product: rocky-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `rockylinux:9`: `ID="rocky"` (el valor de `ID`
de os-release propio de Rocky, distinto del nombre de `product:`) y
`VERSION_ID="9.3"`.

## Correlación de CVE

Se coteja **por paquete instalado** con el OVAL **de Red Hat** (`rhel-<N>.oval.xml.bz2`, en `cve.oval.path`): Rocky recompila los paquetes de Red Hat con las mismas versiones, y el archivo OVAL propio de Rocky se rechaza (contiene una pequeña fracción de los avisos de Rocky y no supera la validación del esquema OVAL). La sonda también enumera los paquetes binarios instalados (`rpm -qa`, con el stream de módulo de AppStream de cada paquete) y lee `uname -r`/`-m`/`-v` en el mismo viaje de ida y vuelta por SSH; se almacenan como `packages` y `modules` de la observación, y como `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. De varios kernels instalados, se compara el que está en ejecución. Solo se informan las CVE con una corrección más reciente que lo instalado, un hallazgo por paquete. Algunas proceden de correcciones que Red Hat publicó como avisos de corrección de errores (RHBA), que `dnf updateinfo --security` no muestra. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

`endoflife:rocky-linux`.
