---
title: Kitsu
description: Configuración de enodia para sondear Kitsu (el frontend de seguimiento de producción de CG-Wire).
---

«Kitsu» es la marca con la que se conoce habitualmente el stack de
seguimiento de producción de CG-Wire, pero Kitsu en sí es un frontend en
Vue.js **sin ningún endpoint de versión propio**. Lo que realmente
responde a `GET /api/status` (confirmado en vivo, incluso en un host que
se llama literalmente «kitsu» en DNS) es
[Zou](/es/configuration/products/zou/), el backend de API con el que
habla Kitsu. Apunte `address` a ese mismo backend, exactamente igual que
haría con `product:
zou`: no hay ninguna URL de «Kitsu» aparte que configurar.

```yaml
targets:
  - id: kitsu-main
    product: kitsu
    address: https://kitsu.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Por qué `kitsu` es un producto distinto de `zou` y no un alias

Ambos apuntan al mismo backend Zou y al mismo endpoint, pero necesitan
**resolvedores del ciclo de vida distintos**: el propio repositorio de
GitHub `cgwire/zou` solo publica etiquetas git sin más (confirmado en
vivo: su API de Releases devuelve una lista vacía), que el resolvedor de
GitHub Releases de enodia no puede leer en absoluto. `cgwire/kitsu` sí
tiene GitHub Releases reales, y es lo que de verdad quiere seguir un
despliegue que se considera «ejecutando Kitsu». Los números de versión
de ambos repositorios divergen realmente (el backend Zou va por delante
de Kitsu), así que comparar bajo el nombre `zou`, «técnicamente más
preciso», compararía en silencio con los números del componente
equivocado; de ahí dos productos registrados que comparten una misma
implementación de sonda, y no un único producto con un alias.

## Campos registrados

- `version`
- `extra.databaseUp`, `extra.keyValueStoreUp`, `extra.eventStreamUp`,
  `extra.jobQueueUp`, `extra.indexerUp`: indicadores de estado de los
  componentes, `"true"`/`"false"`

## Correlación de CVE

No se contrasta: ninguna de las dos bases de datos tiene datos utilizables para este producto. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

`github:cgwire/kitsu`: solo la última release de GitHub; sin datos
eol/support/lts (GitHub no tiene opinión sobre la política de ciclo de
vida, solo sobre «cuál es la última etiqueta»).
