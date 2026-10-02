---
title: Linux Mint
description: Configuración de enodia para sondear Linux Mint por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: mint-host
    product: linuxmint
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado contra una captura real del rootfs de la ISO: `ID=linuxmint`,
`VERSION_ID="22.3"`: realmente la identidad propia de Mint, a diferencia
de la única imagen encontrada en Docker Hub (`linuxmintd/mint22-amd64`,
el chroot de compilación de la propia CI de Mint), que en su lugar
informa de la base Ubuntu subyacente y habría sido lo incorrecto contra
lo que comparar.

## Correlación de CVE

Se coteja **por paquete instalado** con el OVAL de Canonical para la base Ubuntu del host (`UBUNTU_CODENAME` de os-release, registrado como `extra.codename`; el archivo va en `cve.oval.path`). La sonda también enumera los paquetes binarios instalados (`dpkg-query`) y lee `uname -r`/`-m`/`-v` en el mismo viaje de ida y vuelta por SSH; se almacenan como `packages` de la observación, y como `extra.kernelRelease`, `extra.arch`, `extra.kernelVersion`. Solo se informan las CVE con una corrección más reciente que lo instalado, un hallazgo por paquete, enlazado a su USN. Consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

`endoflife:linuxmint`.
