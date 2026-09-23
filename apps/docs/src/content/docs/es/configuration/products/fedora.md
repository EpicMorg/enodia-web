---
title: Fedora Linux
description: Configuración de enodia para sondear Fedora Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: fedora-host
    product: fedora
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `fedora:latest`: `ID=fedora`, `VERSION_ID=44`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:fedora`.
