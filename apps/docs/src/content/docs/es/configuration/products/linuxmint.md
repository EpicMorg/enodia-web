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

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:linuxmint`.
