---
title: Ubuntu
description: Configuración de enodia para sondear Ubuntu por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero, desde la 1.1.1, ya no forma parte del mecanismo común
`osReleaseFamilyProbe` que describe esa página; véase más abajo.

```yaml
targets:
  - id: ubuntu-host
    product: ubuntu
    address: host.example.com
    credentials: linux-host-ssh
```

## Su propia sonda, no la común de os-release, desde la 1.1.1

El `VERSION_ID` de `/etc/os-release` de Ubuntu nunca cambia a propósito
una vez publicada una versión, confirmado en vivo (de `14.04` a `24.10`):
un host `22.04` totalmente parcheado, tras varias versiones puntuales y
nuevos medios de instalación, sigue notificando `VERSION_ID="22.04"`, no
`22.04.5`. La versión puntual solo existe en el campo `VERSION` del mismo
archivo (`VERSION="22.04.5 LTS
(Jammy Jellyfish)"`), y solo para una versión LTS que haya publicado más
de una; el `VERSION` de una versión no LTS no incluye ningún segmento
adicional (confirmado en vivo: `VERSION="24.10 (Oracular Oriole)"`, que
coincide exactamente con `VERSION_ID`). Esta sonda prefiere el número de
`VERSION` sobre `VERSION_ID` siempre que sea estrictamente más preciso y
comparta el mismo prefijo major.minor; no hay un segundo archivo que leer,
a diferencia de la solución de [Debian](/es/configuration/products/debian/)
para la misma carencia de fondo, ya que la precisión ya está en el mismo
archivo, solo que en otro campo. Todos los demás productos de la familia
común de os-release se auditaron de la misma manera; ninguno de los
restantes tiene esta carencia.

Verificado en vivo contra `ubuntu:24.04`: `ID=ubuntu`, `VERSION_ID="24.04"`.

## Campos registrados

- `version`: la versión puntual precisa cuando `VERSION` la tiene, p. ej.
  `22.04.5`; en caso contrario, el `VERSION_ID` sin más
- `extra.hostKeyVerified`

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:ubuntu`, sin cambios.
