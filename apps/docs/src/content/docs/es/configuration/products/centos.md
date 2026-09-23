---
title: CentOS Linux (heredado)
description: Configuración de enodia para sondear CentOS Linux heredado, ya en EOL, por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero lee otro archivo: `/etc/redhat-release`, no `/etc/os-release`.

```yaml
targets:
  - id: centos-host
    product: centos
    address: host.example.com
    credentials: linux-host-ssh
```

## Por qué no la familia os-release

Se trata del CentOS Linux heredado y ya en EOL (5/6/7/8), a diferencia de
[CentOS Stream](/es/configuration/products/centos-stream/), su sucesor aún
vigente. Se confirmó en vivo que CentOS 5 y 6 son anteriores por completo
a la convención os-release de systemd (no tienen `/etc/os-release` en
absoluto), mientras que `/etc/redhat-release` existe en toda la familia
RHEL desde mucho antes. Las flotas reales todavía los ejecutan: que CentOS
llegue a su fin de vida no retira las máquinas que siguen usándolo, y esa
es exactamente la situación que enodia existe para sacar a la luz, no para
disimular.

Verificado en vivo con `centos:5` (`"CentOS release 5.11 (Final)"`),
`:6` (`"CentOS release 6.10 (Final)"`) y `:7` (`"CentOS Linux release
7.9.2009 (Core)"`). El propio `/etc/redhat-release` de un host CentOS
Stream 9 (`"CentOS Stream release 9"`) **no** coincide con este patrón: la
coincidencia exige "CentOS release" o "CentOS Linux release" justo después
de "CentOS ", de modo que una instancia Stream nunca se identifica
erróneamente como `centos` heredado, aunque ambos archivos existan en
ambas líneas de producto.

## Campos registrados

- `version` — el número de versión extraído de `/etc/redhat-release`
- `extra.hostKeyVerified`

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:centos`.
