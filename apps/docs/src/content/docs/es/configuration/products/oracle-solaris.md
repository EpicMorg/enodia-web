---
title: Oracle Solaris
description: Configuración de enodia para sondear Oracle Solaris por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero lee `/etc/release` en lugar de un archivo os-release o de
`uname -sr`.

```yaml
targets:
  - id: solaris-host
    product: oracle-solaris
    address: host.example.com
    credentials: linux-host-ssh
```

## Por qué no `uname -sr`

A diferencia de OpenBSD/NetBSD, `uname -sr` no sirve aquí: en Solaris
solo informa la versión del kernel SunOS (`"SunOS 5.11"` para todas las
versiones de Solaris 11.x, ya que la numeración de SunOS está desacoplada
de la versión del producto), así que no puede distinguir 11.3 de 11.4.
La propia línea `"Oracle Solaris 11.4 X86"` de `/etc/release` contiene
la versión real.

No se puede obtener ninguna imagen descargable sin una cuenta de
Oracle/licencia OTN, así que esto se verificó mediante
`vmactions/solaris-vm`, que compila y vuelve a publicar el Solaris 11.4
CBE propio de Oracle, de libre redistribución (Common Build Environment,
pensado precisamente para este tipo de uso en CI).

## Campos registrados

- `version`: extraída de `/etc/release`
- `extra.hostKeyVerified`

## Correlación de CVE

No se contrasta: NVD registra sus niveles de parche en un campo CPE que el comparador no lee, por lo que contrastar solo por la versión marcaría un host totalmente parcheado con todos los CVE corregidos alguna vez en esa versión. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:oracle-solaris`.
