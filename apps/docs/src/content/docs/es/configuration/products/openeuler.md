---
title: openEuler
description: Configuración de enodia para sondear openEuler por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: openeuler-host
    product: openeuler
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo mediante `vmactions/openeuler-vm` (24.03-LTS-SP4, la
versión predeterminada de la action): `ID="openEuler"` (**E mayúscula,
confirmado en vivo, no minúscula**) y `VERSION_ID="24.03"`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene hoy un calendario de openEuler. Solo inventario.
