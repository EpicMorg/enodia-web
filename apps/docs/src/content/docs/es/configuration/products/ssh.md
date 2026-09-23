---
title: SSH
description: Configuración de enodia para sondear el banner de un servidor SSH.
---

Una sonda TCP en bruto, no HTTP: `address` es `host` o `host:port`, sin
esquema. El puerto por defecto es `22` si se omite. Lee la cadena de
identificación que todo servidor SSH envía sin que se le pida en el mismo
instante en que un cliente se conecta (RFC 4253 §4.2): sin autenticación,
sin intercambio de claves, solo la conexión TCP.

No está ligada a un único fabricante: OpenSSH, Dropbear y cualquier otra
implementación que hable el protocolo de transporte SSH se identifican de
la misma manera, y por eso el producto es el genérico `ssh` en lugar de
una sonda por implementación.

```yaml
targets:
  - id: bastion-main
    product: ssh
    address: bastion.example.com:22
```

## Autenticación

Ninguna: el banner se envía antes de que exista cualquier paso de
autenticación.

## Qué significa «versión» aquí

`version` es la cadena de software exactamente como se notifica, p. ej.
`OpenSSH_10.3` u `OpenSSH_9.6p1`, no un número normalizado, ya que `ssh`
abarca varias implementaciones sin relación entre sí. Cualquier
comentario final de la distribución (p. ej. el sufijo
`Ubuntu-3ubuntu13.18` de Ubuntu) se descarta en lugar de tratarse como
parte de la versión.

## Campos registrados

- `version`: la cadena de software
- `extra.protocol`: la versión del protocolo SSH, p. ej. `2.0`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Se contrasta según el banner: `OpenSSH_…` como OpenSSH, `dropbear_…` como Dropbear; cualquier otra implementación de SSH no recibe ninguna búsqueda, en lugar de recibir los CVE de OpenSSH.

## Resolvedor del ciclo de vida

Ninguno: `ssh` no es un único producto con un único calendario de ciclo
de vida; OpenSSH y Dropbear tienen cada uno el suyo, y el `Meta` de una
sonda es estático independientemente de lo que resulte ejecutar un
destino concreto. Solo inventario.
