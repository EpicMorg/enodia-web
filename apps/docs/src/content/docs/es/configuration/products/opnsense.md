---
title: OPNsense
description: Configuración de enodia para sondear OPNsense por SSH.
---

Usa el mismo mecanismo SSH, las mismas credenciales y la misma
verificación de la clave de host que la familia de
[identificación del SO por SSH](/es/configuration/products/ssh-os-probes/),
pero ejecuta `opnsense-version` en lugar de leer un archivo.

```yaml
targets:
  - id: opnsense-host
    product: opnsense
    address: host.example.com
    credentials: linux-host-ssh
```

## Por qué un comando y no un archivo

OPNsense se asienta sobre una base FreeBSD sin ningún `/etc/os-release`,
y su versión real está repartida entre varios archivos de componentes en
`/usr/local/opnsense/version/` (base, kernel, core, pkgs), sin un único
archivo de identidad evidente. `opnsense-version` es el wrapper propio de
OPNsense que lee el correcto e imprime todo en una sola línea.
Verificado en vivo contra una instancia real de OPNsense 26.7, a la que
se accedió mediante `vmactions/opnsense-vm`: `"OPNsense 26.7 (amd64)"`.

## Campos registrados

- `version`: extraída de la salida de `opnsense-version`
- `extra.hostKeyVerified`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:opnsense`.
