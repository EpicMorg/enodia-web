---
title: OpenBSD
description: Configuración de enodia para sondear OpenBSD por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero no del grupo os-release: OpenBSD no incluye ningún equivalente de
os-release, así que la fuente de identidad es `uname -sr`. Consulte la
página de la familia para el mecanismo común, las credenciales y la
verificación de la clave de host.

```yaml
targets:
  - id: openbsd-host
    product: openbsd
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo mediante `vmactions/openbsd-vm` (no existe ninguna
otra imagen preinstalada descargable): `uname -sr` → `"OpenBSD 7.9"`,
sin ningún nombre de host, a diferencia de `uname -a`, que esta sonda no
usa deliberadamente.

## Correlación de CVE

No se contrasta: NVD registra sus niveles de parche en un campo CPE que el comparador no lee, por lo que contrastar solo por la versión marcaría un host totalmente parcheado con todos los CVE corregidos alguna vez en esa versión. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:openbsd`.
