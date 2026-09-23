---
title: macOS
description: Configuración de enodia para sondear macOS por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero ejecuta `sw_vers` (la forma estándar y documentada de leer la
identidad del SO de un Mac) en lugar de leer un archivo.

```yaml
targets:
  - id: mac-host
    product: macos
    address: host.example.com
    credentials: linux-host-ssh
```

## Por qué `sw_vers` y no `uname -a`

`uname -a` de Darwin incluye en su salida el nombre de host de la propia
máquina, algo que esta sonda no tiene ningún motivo para ver ni
almacenar. La salida de tres líneas `ProductName`/`ProductVersion`/`BuildVersion`
de `sw_vers` no contiene nada de eso. Verificado en vivo contra un Mac
real (macOS 15.4, `BuildVersion 24E248`, por SSH): la EULA de Apple
restringe la virtualización de macOS a hardware Apple genuino, así que
este fue el único producto de toda la familia SSH que necesitó un Mac
físico real en lugar de un contenedor o una imagen de VM descargable.

Solo se reconoce `ProductName: macOS` (de 10.12 Sierra en adelante): las
versiones anteriores informaban `"Mac OS X"` en su lugar, una forma nunca
confirmada en vivo contra un sistema real, por lo que se trata como no
compatible en lugar de suponerla.

## Campos registrados

- `version`: de `ProductVersion`
- `extra.buildVersion`: de `BuildVersion`, cuando está presente
- `extra.hostKeyVerified`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:macos`.
