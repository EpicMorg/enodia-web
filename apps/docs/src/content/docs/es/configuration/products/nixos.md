---
title: NixOS
description: Configuración de enodia para sondear NixOS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: nixos-host
    product: nixos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado contra una captura real del rootfs de la ISO: `ID=nixos`,
`VERSION_ID="26.05"`. La única imagen de Docker Hub, `nixos/nix`, es
solo el gestor de paquetes Nix ejecutándose sobre una base que no es
NixOS y sin ningún `/etc/os-release`: no es un destino de verificación
utilizable, y por eso se usó en su lugar una captura del rootfs de la
ISO.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:nixos`.
