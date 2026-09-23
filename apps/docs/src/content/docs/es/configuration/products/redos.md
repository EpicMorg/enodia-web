---
title: RED OS
description: Configuración de enodia para sondear RED OS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: redos-host
    product: redos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `alrdockerhub/redos:7.3.1` (contenido real de
RED OS: `HOME_URL`/`BUG_REPORT_URL` apuntan a red-soft.ru): `ID="redos"`,
`VERSION_ID="7.3.1"`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene hoy un calendario de RED OS. Solo inventario.
