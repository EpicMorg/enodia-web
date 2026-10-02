---
title: pfSense
description: Configuración de enodia para sondear pfSense Community Edition por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero lee los archivos propios de pfSense `/etc/version` y `/etc/platform`
en un solo viaje de ida y vuelta.

```yaml
targets:
  - id: pfsense-fw
    product: pfsense
    address: fw.example.com
    credentials: linux-host-ssh
```

## Autenticación — obligatoria

Una credencial SSH, `ssh-key` o `password`: consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

## Solo Community Edition

Confirmado en vivo contra tres hosts reales de pfSense CE
(`2.7.2-RELEASE`, `2.8.1-RELEASE`): `/etc/version` contiene exactamente
la versión que muestra el propio panel de pfSense, y `/etc/platform`
contiene `pfSense`.

**pfSense Plus**, la edición comercial de Netgate, es un producto
distinto con su propio esquema de versiones basado en el calendario
(`24.11`, no `2.x.y-RELEASE`). Según su documentación, indica
`pfSense-Plus` en `/etc/platform`; esta sonda lo rechaza en lugar de
registrar un host Plus como un dato de CE. No había ningún host Plus
disponible para confirmarlo en vivo: se basa únicamente en la
documentación.

## Campos registrados

- `version`: `/etc/version` tal cual, p. ej. `2.8.1-RELEASE`
- `extra.hostKeyVerified`

## Correlación de CVE

Todavía no se contrasta: pfSense es nuevo en la 2.1, y upstream ha dejado su correspondencia de CVE para una pasada posterior y
específica. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: endoflife.date no tiene ninguna página con `pfsense`,
`pfsense-ce` ni `pfsense-plus` (404 confirmado). Por ahora, solo
inventario.
