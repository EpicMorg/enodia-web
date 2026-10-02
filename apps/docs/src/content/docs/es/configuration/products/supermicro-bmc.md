---
title: Supermicro BMC
description: Configuración de enodia para sondear un BMC de Supermicro mediante Redfish.
---

Lee `GET /redfish/v1/Managers/1` (el propio recurso Manager de Redfish
del BMC) para obtener la versión de su firmware.

```yaml
targets:
  - id: srv125-bmc
    product: supermicro-bmc
    address: https://bmc-srv125.example.com
    credentials: bmc-admin
```

## Autenticación — obligatoria

Autenticación HTTP Basic; sin ella, el endpoint responde `401`
(confirmado en vivo).

```yaml
credentials:
  bmc-admin:
    kind: basic
    username: ADMIN
    password: "${BMC_PASSWORD}"
```

Basta con una cuenta de BMC de solo lectura. Los BMC suelen servir un
certificado autofirmado: fíjelo en lugar de desactivar la verificación,
consulte [Configuración → TLS](/es/configuration/#tls-tls).

## Verificación de la identidad del fabricante

Confirmado en vivo contra dos generaciones: una placa de la serie X12
(AST2600, firmware `01.05.25`) y otra más antigua de la época X9/X10
(firmware `01.73.13`). Ninguna lleva un campo de fabricante al que esta
sonda pueda llegar con una sola solicitud, pero ambas llevan una clave
`Oem.Supermicro` en este mismo recurso, así que eso es lo que se
comprueba. El BMC de otro fabricante que responda en la misma ruta falla
en lugar de registrarse como Supermicro.

## Campos registrados

- `version`: `FirmwareVersion`, p. ej. `01.05.25`
- `extra.model`, cuando está presente

## Correlación de CVE

Todavía no se contrasta: las sondas de BMC son nuevas en la 2.1, y upstream ha dejado su correspondencia de CVE para una pasada
posterior y específica. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: el firmware de los BMC no tiene ningún calendario público de
ciclo de vida (404 confirmado con todos los slugs probados). Solo
inventario.
