---
title: RED OS
description: Configuración de enodia para sondear RED OS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `alrdockerhub/redos:7.3.1` (contenido real de
RED OS: `HOME_URL`/`BUG_REPORT_URL` apuntan a red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Correlación de CVE

Se coteja **por paquete instalado** con el OVAL propio de RED OS para la 7.3 o la 8.0 (`redos.xml` de `redos.red-soft.ru/support/secure/<7.3|8.0>/`, en `cve.oval.path`): los datos de RHEL no son aplicables, ya que las versiones de los paquetes de RED OS son propias (`.el7` en la 7.3, `.red80` en la 8.0). La versión se coteja por su major.minor. La sonda también enumera los paquetes binarios instalados (`rpm -qa`, con el stream de módulo de AppStream de cada paquete) y lee `uname -r`/`-m`/`-v` en el mismo viaje de ida y vuelta por SSH; se almacenan como `packages` y `modules` de la observación, y como `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. De varios kernels instalados, se compara el que está en ejecución. Los hallazgos enlazan a los boletines `ROS-…` de RED OS e incluyen la severidad propia del fabricante. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene hoy un calendario de RED OS. Solo inventario.
