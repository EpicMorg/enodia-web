---
title: VMware ESXi
description: Configuración de enodia para sondear VMware ESXi.
---

Llama a `ServiceContent.about` mediante la propia llamada de
descubrimiento SOAP `RetrieveServiceContent` de la API de vSphere en
`/sdk`: la misma llamada y el mismo endpoint a los que responde
[vCenter Server](/es/configuration/products/vcenter/), diferenciados por
el campo `apiType`.

```yaml
targets:
  - id: esxi-main
    product: esxi
    address: https://esxi-host.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra un host ESXi 8.0.3 real de producción,
sin ninguna credencial.

## Verificación de la identidad del fabricante

`apiType` se compara con `"HostAgent"`: un vCenter Server real responde a
la misma llamada con `apiType=VirtualCenter` (consulte
[vCenter Server](/es/configuration/products/vcenter/), que realiza esta
misma comprobación a la inversa). Apuntar `product: esxi` a una instancia
de vCenter falla de forma explícita en lugar de registrarse como un dato
erróneo.

## Campos registrados

- `version` — p. ej. `8.0.3`
- `extra.build`, cuando está presente

## Correlación de CVE

No se contrasta: casi todas sus entradas son literales del estilo `7.0` + `update_1` que el comparador no lee, así que el resultado sería o nada o todo. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`endoflife:esxi`.
