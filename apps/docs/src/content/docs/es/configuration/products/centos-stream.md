---
title: CentOS Stream
description: Configuración de enodia para sondear CentOS Stream por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host.

```yaml
targets:
  - id: centos-stream-host
    product: centos-stream
    address: host.example.com
    credentials: linux-host-ssh
```

## Verificación de la identidad del fabricante — más que una simple coincidencia de `ID`

Verificado en vivo contra `quay.io/centos/centos:stream9`: `/etc/os-release`
indica `ID="centos"` (**el mismo `ID` que usa el
[CentOS Linux](/es/configuration/products/centos/) heredado y ya en EOL**),
así que este producto comprueba además `NAME="CentOS Stream"`, el campo
que realmente distingue a ambos. `product: centos-stream` apuntado a un
host CentOS 7 heredado (o viceversa) no supera la verificación de
identidad en lugar de registrarse bajo el producto equivocado.

## Campos registrados

Los mismos que el resto de la familia: `version` a partir de `VERSION_ID`,
más `extra.hostKeyVerified`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:centos-stream`.
