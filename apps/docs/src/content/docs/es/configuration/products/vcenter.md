---
title: vCenter Server
description: Configuración de enodia para sondear VMware vCenter Server.
---

Llama a `ServiceContent.about` mediante la propia llamada SOAP de
descubrimiento `RetrieveServiceContent` de la API de vSphere en `/sdk`: la
misma llamada y el mismo endpoint a los que responde
[ESXi](/es/configuration/products/esxi/), y que se distinguen por el campo
`apiType`.

```yaml
targets:
  - id: vcenter-main
    product: vcenter
    address: https://vcenter.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra una instancia real de producción de
vCenter 8.0.3, sin ninguna credencial.

## Verificación de la identidad del fabricante

`apiType` se compara con `"VirtualCenter"`: un host ESXi real responde a
la misma llamada con `apiType=HostAgent` (consulte
[ESXi](/es/configuration/products/esxi/), que realiza esta misma
comprobación a la inversa). Apuntar `product: vcenter` a un host ESXi
falla de forma explícita en lugar de registrarse como un dato erróneo.

## No es lo mismo que una versión anterior de esta sonda

Antes, esta sonda leía en su lugar `/sdk/vimServiceVersions.xml`, que
responde de forma idéntica tanto en ESXi como en vCenter (por lo que nunca
podía distinguirlos) y notifica la versión del esquema de la API `vim25`
(p. ej. `"8.0.3.0"`) en lugar de la versión comercial real del producto.
La sonda actual, basada en `RetrieveServiceContent`, resuelve ambos
problemas: versión real y verificación real de la identidad.

## Campos registrados

- `version`: la versión comercial real, p. ej. `8.0.3`
- `extra.build`, cuando está presente

## Correlación de CVE

No se contrasta: casi todas sus entradas son literales del estilo `7.0` + `update_1` que el comparador no lee, así que el resultado sería o nada o todo. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:vcenter`.
