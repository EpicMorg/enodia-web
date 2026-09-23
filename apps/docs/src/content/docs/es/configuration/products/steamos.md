---
title: SteamOS
description: Configuración de enodia para sondear SteamOS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: steamos-host
    product: steamos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado contra una captura real del rootfs de una ISO de SteamOS 2
(basado en Debian, nombre en clave "brewmaster"): `ID=steamos`,
`VERSION_ID="2"`. Se espera que SteamOS 3.x (basado en Arch, el SO actual
de Steam Deck, nombre en clave "holo") comparta el mismo `ID=steamos` (la
marca propia de Valve es coherente a lo largo de la reescritura), pero
esto todavía no se ha confirmado en vivo, solo la 2.x; la coincidencia
simple con `ID=steamos` cubre ambas sin necesidad de tratar ninguna como
caso especial.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:steamos`.
