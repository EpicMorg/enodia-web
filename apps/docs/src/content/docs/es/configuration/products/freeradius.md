---
title: FreeRADIUS
description: Configuración de enodia para sondear FreeRADIUS por SSH.
---

Una sonda SSH: inicia sesión y ejecuta el propio `-v` del servidor. El
puerto predeterminado es `22`, sin esquema: el mismo mecanismo SSH, las
mismas credenciales y la misma verificación de la clave de host que la
familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
```

## Por qué SSH

RADIUS no tiene ningún intercambio de versiones, y tampoco lo tiene la
respuesta Status-Server de FreeRADIUS: sus diccionarios definen
contadores de estadísticas, ningún atributo de versión. Así que la
versión solo puede salir del propio binario del servidor. La sonda prueba
`freeradius` (Debian/Ubuntu) y `radiusd` (familia RHEL, compilaciones
desde el código fuente), primero por nombre y después por su ruta en
`/usr/sbin`, ya que el `PATH` de una sesión SSH sin inicio de sesión a
menudo no incluye `/usr/sbin`.

## Autenticación — obligatoria

Una credencial SSH, `ssh-key` o `password`: consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## FreeRADIUS en un contenedor

Cuando FreeRADIUS se ejecuta en Docker o Podman y el propio host no tiene
el binario, indique el contenedor en `options`: el comando se ejecuta
entonces mediante `docker exec` (o `podman exec`):

```yaml
targets:
  - id: radius-01
    product: freeradius
    address: radius-01.example.com
    credentials: linux-host-ssh
    options:
      container: freeradius          # el nombre del contenedor
      container_runtime: podman      # opcional: docker (predeterminado) o podman
```

El usuario SSH debe tener permiso para usar ese runtime. El nombre del
contenedor se comprueba contra el propio patrón de nombres de Docker
antes de incluirse en el comando remoto.

## Campos registrados

- `version`: p. ej. `3.2.10`, de `FreeRADIUS Version 3.2.10 (git #9071ea041)`
- `extra.git`: el hash de git de la compilación, cuando está presente
- `extra.container`: el nombre del contenedor, cuando se define `options.container`
- `extra.hostKeyVerified`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un
[bloque `cve:`](/es/cve/). Ambos se siguen tal como se publican: el rango
de NVD para BlastRADIUS (CVE-2024-3596) solo cubre las versiones
anteriores a la 3.0.27, sin nada para la rama 3.2 (corregido en la
3.2.5), así que un host con la 3.2.3 no obtiene ningún hallazgo por él.

## Resolvedor del ciclo de vida

`github-tag-branches:FreeRADIUS/freeradius-server`. endoflife.date no
tiene ninguna página de FreeRADIUS (404 confirmado), y FreeRADIUS
mantiene en paralelo las ramas 3.0.x y 3.2.x, etiquetando las versiones
como `release_3_2_10`. Este tipo de resolvedor lee las etiquetas como
**un ciclo de vida por cada rama major.minor**, cada una con su propia
etiqueta más reciente, de modo que una 3.0.28 con todos los parches
aparece como `current` en su rama, con una rama más reciente disponible,
no como «por detrás de la 3.2.10». Solo se lee la página máxima de
GitHub, de 100 etiquetas; como los demás resolvedores de GitHub, no
incluye fechas de EOL, y `GITHUB_TOKEN` eleva su límite de tasa
(consulte [Productos compatibles](/es/products/)).
