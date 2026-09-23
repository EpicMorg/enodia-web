---
title: EuroLinux
description: Configuración de enodia para sondear EuroLinux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: eurolinux-host
    product: eurolinux
    address: host.example.com
    credentials: linux-host-ssh
```

No existe ninguna imagen Docker de EuroLinux, así que se verificó con una
captura real del rootfs de la ISO (el propio medio de instalación,
examinado sin conexión): `ID="eurolinux"`, `VERSION_ID="8.10"`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:eurolinux`.
