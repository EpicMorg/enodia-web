---
title: postmarketOS
description: Configuración de enodia para sondear postmarketOS por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: postmarketos-host
    product: postmarketos
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado contra una captura real del rootfs de una ISO: `ID="postmarketos"`,
`VERSION_ID="v26.06"`; la `v` inicial es el formato propio del fabricante
y se transmite tal cual; la comparación de versiones de `enodia` ya elimina
una `v`/`V` inicial antes de comparar, el mismo tratamiento que reciben en
otras partes de la herramienta las etiquetas de release de GitHub del tipo
`v1.2.3`.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:postmarketos`.
