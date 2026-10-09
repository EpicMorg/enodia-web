---
title: MinIO
description: Configuración de enodia para sondear MinIO por SSH.
---

Una sonda SSH: inicia sesión y ejecuta el propio `--version` del binario
del servidor (`minio` por nombre y después `/usr/local/bin/minio`). El
puerto predeterminado es `22`, sin esquema: el mismo mecanismo SSH, las
mismas credenciales y la misma verificación de la clave de host que la
familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/).

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
```

## Por qué SSH

MinIO no ofrece la versión de forma anónima en ninguna superficie de red:
la cabecera `Server` de la API S3 es un simple `MinIO`, el
`/api/v1/login` anónimo de la consola solo devuelve la estrategia de
inicio de sesión, y la API de administración y las métricas de Prometheus
necesitan una clave de administrador o un token bearer generado con `mc`.

## MinIO en un contenedor

Cuando MinIO se ejecuta en Docker o Podman y el propio host no tiene el
binario, indique el contenedor en `options`: el comando se ejecuta
entonces mediante `docker exec` (o `podman exec`):

```yaml
targets:
  - id: minio-01
    product: minio
    address: minio-01.example.com
    credentials: linux-host-ssh
    options:
      container: minio               # el nombre del contenedor
      container_runtime: podman      # opcional: docker (predeterminado) o podman
```

El usuario SSH debe tener permiso para usar ese runtime. El nombre del
contenedor se comprueba contra el propio patrón de nombres de Docker
antes de incluirse en el comando remoto.

## Nombres de versión como versiones

MinIO nombra sus versiones por una marca de tiempo UTC
(`RELEASE.2025-10-15T17-29-55Z`), tanto en `--version` como en sus
etiquetas de GitHub. enodia convierte ese nombre, con o sin un
`_<MARKER>` tras `RELEASE` (las compilaciones internas indican
`RELEASE_INHOUSE.…`), en un `2025.10.15.17.29.55` comparable, tanto en la
versión observada como en la etiqueta del resolvedor.

## Autenticación — obligatoria

Una credencial SSH, `ssh-key` o `password`: consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Campos registrados

- `version`: p. ej. `RELEASE_INHOUSE.2025-03-12T18-04-18Z`, de
  `minio version RELEASE_INHOUSE.2025-03-12T18-04-18Z (commit-id=…)`
- `extra.build`: el marcador tras `RELEASE_` en una compilación que no es
  de upstream, p. ej. `INHOUSE`
- `extra.commit`: el `commit-id`, cuando está presente
- `extra.runtime`: el runtime de Go de la línea `Runtime:`, p. ej.
  `go1.24.4`
- `extra.container`: el nombre del contenedor, cuando se define `options.container`
- `extra.hostKeyVerified`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un
[bloque `cve:`](/es/cve/). Ambas fuentes escriben sus límites como marcas
de tiempo de versión (`2025-10-15t17-29-55z`, en mayúsculas o
minúsculas), que se convierten a la misma forma con puntos que la versión
sondeada para que ambas se puedan comparar; un límite dado como una fecha
simple sigue sin poder analizarse.

## Resolvedor del ciclo de vida

`github:minio/minio`: endoflife.date no tiene ninguna página de MinIO (404
confirmado), por lo que se resuelve contra GitHub Releases: solo la última
etiqueta publicada que no sea prerelease, sin fechas eol/support/lts. El
repositorio está archivado: la última versión de la edición community es
`RELEASE.2025-10-15T17-29-55Z`, que es contra la que se compara cualquier
MinIO a partir de ahora.
