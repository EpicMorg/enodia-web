---
title: TrueNAS
description: Configuración de enodia para sondear TrueNAS.
---

Lee `GET /api/v2.0/system/info`.

```yaml
targets:
  - id: truenas-main
    product: truenas
    address: https://truenas.example.com
    credentials: truenas-key
```

## Autenticación — obligatoria

Confirmado en vivo contra un host real de TrueNAS 25.10.7: este endpoint
responde `401` sin credenciales. Una clave de API funciona como un token
bearer simple:

```yaml
credentials:
  truenas-key:
    kind: bearer
    value: "${TRUENAS_API_KEY}"
```

## No es una sonda SSH, pese a ser un SO de appliance

Una versión anterior de esta sonda leía en su lugar `/etc/version` por SSH
(el propio `/etc/os-release` de TrueNAS informa de la base Debian
subyacente, no del propio TrueNAS: la misma carencia del archivo de
identidad que tiene [Astra Linux](/es/configuration/products/astra-linux/)).
En cuanto se dispuso de un destino real con API contra el que verificar,
la versión HTTP sustituyó por completo a la SSH: enodia no tiene un
mecanismo de reserva con doble transporte por producto, así que se impone
la forma más sencilla y que mejor encaja, en lugar de que ambas coexistan.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

No se contrasta: hay muy pocas entradas, y con versiones distintas de las que notifica la sonda. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:truenas`.
