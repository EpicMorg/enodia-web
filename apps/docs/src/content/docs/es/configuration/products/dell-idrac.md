---
title: Dell iDRAC
description: Configuración de enodia para sondear un Dell iDRAC mediante Redfish.
---

Dos solicitudes mediante Redfish: `GET /redfish/v1` para la identidad del
fabricante y, a continuación, `GET /redfish/v1/Managers/iDRAC.Embedded.1`
para la versión del firmware.

```yaml
targets:
  - id: blade-1a-idrac
    product: dell-idrac
    address: https://idrac-blade-1a.example.com
    credentials: idrac-ro
```

## Autenticación — obligatoria

Autenticación HTTP Basic; sin ella, los endpoints responden `401`
(confirmado en vivo).

```yaml
credentials:
  idrac-ro:
    kind: basic
    username: enodia
    password: "${IDRAC_PASSWORD}"
```

Basta con una cuenta de iDRAC de solo lectura. Los iDRAC suelen servir un
certificado autofirmado: fíjelo en lugar de desactivar la verificación,
consulte [Configuración → TLS](/es/configuration/#tls-tls).

## Verificación de la identidad del fabricante

Por qué dos solicitudes: confirmado en vivo en un iDRAC real de 12.ª
generación, el propio recurso Manager no lleva ningún marcador del
fabricante, mientras que la raíz del servicio `/redfish/v1` lleva
`Oem.Dell` (con la etiqueta de servicio) y la cadena de producto
«Integrated Dell Remote Access Controller». La primera solicitud confirma
que se trata de un Dell; la segunda lee la versión.
`iDRAC.Embedded.1` es el id estándar de Dell para el controlador
integrado, y es el que se comprueba.

Un **CMC** de Dell (el controlador a nivel de chasis de un chasis de
blades) es un producto distinto, sin ningún endpoint Redfish, y no está
cubierto.

## Campos registrados

- `version`: `FirmwareVersion`, p. ej. `2.65.65.65`
- `extra.model`, cuando está presente
- `extra.serviceTag`, cuando está presente

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/). Desde la 2.2. Ambas bases de datos
nombran cada generación de iDRAC como un producto propio, con números de
firmware que se solapan, así que la generación se lee de `extra.model`
(el modelo de Redfish, p. ej. `12G Modular` → iDRAC7; 11G iDRAC6, 13G
iDRAC8, 14G–16G iDRAC9, 17G iDRAC10). Sin modelo, solo se busca el
firmware 3.x y posterior (solo puede ser iDRAC9); consulte
[Dell iDRAC y Synology DSM](/es/cve/#dell-idrac-y-synology-dsm).

## Resolvedor del ciclo de vida

Ninguno: el firmware de los BMC no tiene ningún calendario público de
ciclo de vida (404 confirmado con todos los slugs probados). Solo
inventario.
