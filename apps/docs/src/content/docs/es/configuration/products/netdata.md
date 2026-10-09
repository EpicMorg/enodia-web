---
title: Netdata
description: Configuración de enodia para sondear Netdata.
---

Lee el `GET /api/v1/info` del agente, que por defecto se sirve sin inicio
de sesión. El esquema por defecto es `https`.

```yaml
targets:
  - id: netdata-01
    product: netdata
    address: https://netdata-01.example.com
```

## Qué se lee

La respuesta empieza por `"version": "v2.12.1"`, con `release-channel` al
lado. El resto describe el host (uid, kernel, etiquetas, hardware, nube),
y nada de eso describe el software en sí, por lo que solo se leen la
versión y el canal de publicación. Una respuesta sin `version` se notifica
como no compatible (no es Netdata).

## Autenticación

Opcional: por defecto, el agente responde de forma anónima. `basic` o
`bearer` se envían cuando están configurados, para un agente detrás de un
proxy que los solicite; desde la 2.2.0, cualquier otro tipo es un error de
configuración. Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

```yaml
credentials:
  netdata-proxy:
    kind: basic
    username: enodia
    password: "${NETDATA_PROXY_PASSWORD}"
```

## Campos registrados

- `version`: tal como la indica el agente, p. ej. `v2.12.1` (confirmado
  en vivo en `netdata/netdata:stable`)
- `extra.releaseChannel`: p. ej. `stable` o `nightly`, cuando está
  presente

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un
[bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github:netdata/netdata`: endoflife.date no tiene un calendario de Netdata
(404 confirmado), por lo que se resuelve contra GitHub Releases: solo la
última etiqueta publicada que no sea prerelease, sin fechas
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última versión»).
