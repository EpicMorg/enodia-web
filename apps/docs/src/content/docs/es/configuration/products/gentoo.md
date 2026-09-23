---
title: Gentoo Linux
description: Configuración de enodia para sondear Gentoo Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: gentoo-host
    product: gentoo
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `gentoo/stage3` (la imagen oficial de
gentoo.org): `ID=gentoo`, `VERSION_ID=2.18`, que es el número de versión
propio de Gentoo Base System, no una versión de la distribución en el
sentido tradicional.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: Gentoo es una distribución rolling release, y endoflife.date no
tiene un calendario para ella (404 confirmado) por el mismo motivo: no hay
una versión concreta con la que controlar el EOL. Solo inventario.
