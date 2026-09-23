---
title: Alpine Linux
description: Configuración de enodia para sondear Alpine Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: alpine-host
    product: alpine-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `alpine:latest`: `ID=alpine` (nota: el campo
`ID` tal cual, no `alpine-linux`; el valor de `product:` añade `-linux`
por claridad, pero la coincidencia se hace con la cadena más corta del
fabricante), `VERSION_ID=3.24.1`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:alpine-linux`.
