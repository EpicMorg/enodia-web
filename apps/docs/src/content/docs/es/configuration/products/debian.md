---
title: Debian
description: Configuración de enodia para sondear Debian por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero, desde la 1.1.1, ya no forma parte del mecanismo común
`osReleaseFamilyProbe` que describe esa página; consulte más abajo.

```yaml
targets:
  - id: debian-host
    product: debian
    address: host.example.com
    credentials: linux-host-ssh
```

## Su propia sonda, no la común de os-release, desde la 1.1.1

El `VERSION_ID` de `/etc/os-release` de Debian nunca incluye la versión
puntual: se confirmó en vivo que una instalación de Debian 13 totalmente
actualizada sigue indicando simplemente `VERSION_ID="13"`, igual que una
instalación recién hecha. La versión puntual real (`13.6`) solo está en
`/etc/debian_version`. Sin embargo, no es seguro fiarse únicamente de ese
archivo: se confirmó en vivo que una imagen real de Ubuntu 24.04 también
lo incluye, heredado de su linaje de compilación, con el contenido
`trixie/sid`, que no significa nada para la versión propia de Ubuntu.
Esta sonda lee ambos archivos en un único viaje de ida y vuelta por SSH,
confirma primero `ID=debian` y solo confía en el contenido de
`debian_version` cuando es un número simple separado por puntos; tanto la
copia propia de Debian testing (`forky/sid`) como la heredada de Ubuntu
recurren correctamente a `VERSION_ID` en su lugar.

Verificado en vivo contra `debian:bookworm-slim`: `ID=debian`,
`VERSION_ID="12"`.

## Campos registrados

- `version` — la versión puntual cuando `/etc/debian_version` la tiene,
  p. ej. `13.6`; en caso contrario, el `VERSION_ID` tal cual
- `extra.debianVersion` — el contenido sin procesar de
  `/etc/debian_version`, siempre que el archivo exista y no esté vacío,
  incluso cuando no era un número simple separado por puntos (como el
  `forky/sid` de Debian testing, útil verlo tal cual en lugar de
  descartarlo en silencio)
- `extra.hostKeyVerified`

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:debian`, sin cambios.
