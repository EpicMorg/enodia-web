---
title: HP iLO 4
description: Configuración de enodia para sondear un HP iLO 4.
---

Lee `GET /redfish/v1/Managers/1/` (con la barra final, que se confirmó en
vivo que importa) para obtener la versión del firmware del controlador.

```yaml
targets:
  - id: vm43-ilo
    product: hp-ilo4
    address: https://ilo-vm43.example.com
    credentials: ilo-ro
```

## Autenticación — obligatoria

Autenticación HTTP Basic; sin ella, el endpoint responde `401`
(confirmado en vivo).

```yaml
credentials:
  ilo-ro:
    kind: basic
    username: enodia
    password: "${ILO_PASSWORD}"
```

Basta con una cuenta de iLO de solo lectura. Los iLO suelen servir un
certificado autofirmado: fíjelo en lugar de desactivar la verificación,
consulte [Configuración → TLS](/es/configuration/#tls-tls).

## Solo iLO 4

La API de iLO 4 se denomina a sí misma «HP RESTful Root Service»: una API
de HP anterior a Redfish, no una implementación de Redfish. Pero este
recurso concreto coincide con Redfish lo suficiente como para leerse de
la misma manera. La identidad se comprueba por su clave `Oem.Hp`. iLO 5
cumple plenamente con Redfish y muy probablemente necesita otra
comprobación; no había ningún iLO 5 disponible para confirmarlo en vivo,
así que todavía no tiene sonda, en lugar de tener una basada en
suposiciones.

## Campos registrados

- `version`: extraída de `FirmwareVersion`: `iLO 4 v2.82` → `2.82`
- `extra.raw`: la cadena `FirmwareVersion` completa

## Correlación de CVE

Todavía no se contrasta: las sondas de BMC son nuevas en la 2.1, y upstream ha dejado su correspondencia de CVE para una pasada
posterior y específica. Consulte
[Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: el firmware de los BMC no tiene ningún calendario público de
ciclo de vida (404 confirmado con todos los slugs probados). Solo
inventario.
