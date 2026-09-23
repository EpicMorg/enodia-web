---
title: Zou
description: Configuración de enodia para sondear Zou (backend de API de CG-Wire).
---

Lee `GET /api/status` para obtener la versión: el backend de API real
detrás del stack de seguimiento de producción de CG-Wire, conocido
habitualmente por la marca [Kitsu](/es/configuration/products/kitsu/), su
frontend en Vue.js, que no tiene un endpoint de versión propio.

```yaml
targets:
  - id: zou-main
    product: zou
    address: https://kitsu.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Verificación de la identidad del fabricante

El campo `name` de la respuesta se compara con `"Zou"`, con el mismo
razonamiento que en las sondas de Atlassian y Jellyfin: nombrar el
producto explícitamente en la configuración debe detectar una URL que
apunta al servicio equivocado.

## `zou` frente a `kitsu`: la misma sonda, distintos resolvedores, no un alias

`product: kitsu` usa exactamente el mismo endpoint y la misma
implementación de la sonda; consulte [su propia página](/es/configuration/products/kitsu/)
para saber por qué ambos están registrados como productos separados en
lugar de como un producto con un alias: el propio repositorio de GitHub de
`zou` no publica ninguna Release utilizable (solo etiquetas git simples,
confirmado en vivo), por lo que `product: zou` se queda sin resolvedor en
lugar de arriesgarse a compararse con los números de versión del
componente equivocado.

## Campos registrados

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp`: indicadores del estado de los
  componentes, `"true"`/`"false"`

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: el repositorio de GitHub `cgwire/zou` no tiene ninguna Release
utilizable contra la que resolver (confirmado en vivo: su API de Releases
devuelve una lista vacía, solo hay etiquetas git simples). Si considera
que su despliegue «ejecuta Kitsu» en lugar de «ejecuta Zou»,
`product: kitsu` le ofrece en su lugar un resolvedor real contra
`cgwire/kitsu`, apuntando exactamente a este mismo backend.
