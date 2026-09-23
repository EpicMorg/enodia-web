---
title: Kali Linux
description: Configuración de enodia para sondear Kali Linux por SSH.
---

Forma parte de la familia de [identificación del SO por SSH](/es/configuration/products/ssh-os-probes/):
consulte esa página para el mecanismo común, las credenciales y la
verificación de la clave de host. Coincide con el campo `ID` de `/etc/os-release`.

```yaml
targets:
  - id: kali-host
    product: kali-linux
    address: host.example.com
    credentials: linux-host-ssh
```

Verificado en vivo contra `kalilinux/kali-rolling`: `ID=kali`,
`VERSION_ID="2026.3"`: una instantánea fechada de rolling release, no una
versión discreta.

## Correlación de CVE

No se contrasta: los CVE de una distribución de propósito general son vulnerabilidades de paquetes, y el número de versión no indica qué paquetes se han parcheado desde entonces. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: Kali es rolling release, y endoflife.date no tiene calendario
para ella (404 confirmado) por la misma razón que Gentoo. Solo inventario.
