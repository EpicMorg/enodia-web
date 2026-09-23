---
title: VMware Photon OS
description: Configuración de enodia para sondear VMware Photon OS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: photon-host
    product: photon
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra la imagen oficial de nivel superior `photon:5.0`
(del programa Docker Official Images, no del repositorio propio
`vmware/photon`, que se queda en la 2.0): `ID=photon`, `VERSION_ID=5.0`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:photon`.
