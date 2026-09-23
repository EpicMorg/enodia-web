---
title: Proxmox VE
description: Configuración de enodia para sondear Proxmox VE.
---

Lee `GET /api2/json/version`.

```yaml
targets:
  - id: proxmox-main
    product: proxmox
    address: https://proxmox.example.com:8006
    credentials: proxmox-token
```

## Autenticación — obligatoria

Confirmado en vivo contra un host real de Proxmox VE 9.2.2: este endpoint
responde `401` sin credenciales. La forma del token de API propio de
Proxmox es un valor simple de la cabecera `Authorization`
(`PVEAPIToken=user@realm!tokenid=secret`, la cadena completa como un único
token), así que `token-header` encaja directamente, con su cabecera por
defecto (`Authorization`) ya correcta:

```yaml
credentials:
  proxmox-token:
    kind: token-header
    value: "PVEAPIToken=enodia@pve!readonly=${PROXMOX_TOKEN_SECRET}"
```

El flujo alternativo de ticket con usuario y contraseña (`POST /access/ticket`
para obtener una cookie de sesión más un token CSRF) no se admite a
propósito: es un esquema de inicio de sesión más pesado, y la propia
documentación de Proxmox recomienda de todos modos el token de API para la
automatización desatendida.

## Campos registrados

- `version`
- `extra.repoid`, cuando está presente

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:proxmox-ve`.
