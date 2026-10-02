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
- `extra.codename` — `VERSION_CODENAME` de os-release, que selecciona la
  versión en el tracker
- `extra.kernel` — la versión de Debian del kernel en ejecución, de `uname -v`
- `packages` — los paquetes fuente instalados y sus versiones (véase más abajo)
- `extra.hostKeyVerified`

## Correlación de CVE

Se coteja **por paquete instalado** con el Debian Security Tracker (`cve.debian.path`), no por versión. La sonda lee los paquetes *fuente* instalados (`source:Package`/`source:Version` de `dpkg-query`, la clave propia del tracker) y la versión de Debian del kernel en ejecución (de `uname -v`) en el mismo viaje de ida y vuelta por SSH que la propia versión. Solo se informan las CVE que Debian ya ha corregido en una versión más reciente que la instalada, un hallazgo por paquete fuente, enlazado a su página del tracker. El tracker solo cubre las versiones que el equipo de seguridad de Debian sigue manteniendo (bookworm, trixie, testing, sid); los hosts más antiguos no obtienen hallazgos de paquetes. Un host Proxmox VE se cubre con un destino `debian` como este; consulte [Correlación de CVE](/es/cve/#cve-a-nivel-de-paquete-para-distribuciones-linux).

## Resolvedor del ciclo de vida

`endoflife:debian`, sin cambios.
