---
title: FreeBSD
description: Configuración de enodia para sondear FreeBSD por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host.

```yaml
targets:
  - id: freebsd-host
    product: freebsd
    address: host.example.com
    credentials: linux-host-ssh
```

## El único producto de esta familia que lee otra ruta

Todos los demás productos de esta familia leen `/etc/os-release`; FreeBSD
es la excepción. FreeBSD genera `/var/run/os-release` por sí mismo, de
forma dinámica, durante el arranque (`/etc/rc.d/os-release`), con
exactamente la misma forma `KEY=VALUE` que las distribuciones Linux
incluyen de forma estática en `/etc/os-release`. Verificado en vivo
mediante QEMU (la imagen qcow2 oficial de FreeBSD para la nube; no existe
ninguna imagen Docker de FreeBSD): `ID=freebsd`, `VERSION_ID="15.1"`.

## Correlación de CVE

No se contrasta: NVD registra sus niveles de parche en un campo CPE que el comparador no lee, por lo que contrastar solo por la versión marcaría un host totalmente parcheado con todos los CVE corregidos alguna vez en esa versión. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:freebsd`.
