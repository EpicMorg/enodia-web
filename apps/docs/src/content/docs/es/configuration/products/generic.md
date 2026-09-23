---
title: Generic
description: Configuración de la sonda genérica de enodia para sistemas propios o no compatibles.
---

La vía de escape para todo lo que no tiene una sonda dedicada: un bloque
`parser:` escrito a mano en lugar de lógica Go compilada. La referencia
completa de campos, el vocabulario cerrado `json`/`xml`/`header`/`plaintext`/`regex`
y la nota sobre la grafía del campo `clean_regex` se encuentran en
[Configuración → La sonda genérica](/es/configuration/#la-sonda-genérica);
esta página existe solo para que `generic` aparezca en la barra lateral
junto a los otros 89 productos.

```yaml
targets:
  - id: in-house-api
    product: generic
    address: https://internal.example.com
    parser:
      type: regex
      regex: 'v(\d+\.\d+\.\d+)'
```

## Autenticación

Se aceptan `none`, `bearer`, `token-header` y `basic`: lo que realmente
espere su servicio interno.

## Correlación de CVE

No se contrasta: un analizador escrito a mano no tiene una identidad de producto con la que buscar CVE. Consulte [Correlación de CVE](/es/cve/#qué-productos-tienen-correspondencia).

## Resolvedor del ciclo de vida

Ninguno: por definición, un destino hecho a mano no tiene ningún
calendario que consultar. ¿No encuentra su producto en la lista de 89
sondas dedicadas? Consulte
[Productos compatibles](/es/products/#no-encuentra-su-producto) para las dos
alternativas: esta vía de escape o solicitar una sonda real.
