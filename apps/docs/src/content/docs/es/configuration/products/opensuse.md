---
title: openSUSE
description: Configuración de enodia para sondear openSUSE por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host.

```yaml
targets:
  - id: opensuse-host
    product: opensuse
    address: host.example.com
    credentials: linux-host-ssh
```

## Coincide tanto con Leap como con Tumbleweed

A diferencia de la mayoría de las comprobaciones de igualdad simple de
`ID` de esta familia, esta coincide con cualquier `ID` que empiece por
`opensuse-`. Verificado en vivo contra `opensuse/leap:latest`:
`ID="opensuse-leap"`, `VERSION_ID="16.0"`. Tumbleweed
(`ID="opensuse-tumbleweed"`) no está cubierto aquí por un fixture real,
pero comparte el mismo prefijo `opensuse-`, por lo que este mismo
producto lo acepta en lugar de dejarlo sin coincidencia.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:opensuse`.
