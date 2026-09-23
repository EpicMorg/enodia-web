---
title: pgAdmin
description: Configuración de enodia para sondear pgAdmin.
---

Decodifica la versión a partir de la cadena de consulta `?ver=NNNNN` para
invalidar la caché que pgAdmin añade a cada recurso estático de su propia
página de inicio de sesión; es anónima por diseño, ya que tiene que
renderizarse antes de que exista ninguna sesión.

```yaml
targets:
  - id: pgadmin-main
    product: pgadmin
    address: https://pgadmin.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Cómo se decodifica la versión

Confirmado contra un contenedor real `dpage/pgadmin4` y el propio código
fuente de pgAdmin (`version.py`): `NNNNN` es `APP_VERSION_INT`, documentado
allí como `[X]XYYZZ` (release, revisión y, después, un código de sufijo);
por ejemplo, `91700` para la release 9, revisión 17, sufijo `00` (GA). En
`version` solo se reconstruye la parte release.revisión; un código de
sufijo distinto de cero (una compilación beta/dev) no tiene ninguna
correspondencia textual documentada que permita reconstruirlo a partir del
código, por lo que se expone como `extra.suffixCode` en lugar de intentar
adivinarlo.

## Campos registrados

- `version`, por ejemplo `9.17`
- `extra.suffixCode`, solo cuando es distinto de cero

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`github-tags:pgadmin-org/pgadmin4`. endoflife.date no tiene un calendario
de pgAdmin (404 confirmado), y `pgadmin-org/pgadmin4` no tiene ninguna
GitHub Release (confirmado en vivo: el endpoint de releases devuelve un
array vacío), solo etiquetas con la forma `REL-9_17` en lugar de una
versión con puntos. El tipo de resolvedor `github-tags` existe
precisamente para esto: convierte esa forma en `9.17` y elige la etiqueta
*de mayor valor al analizarla* de la página obtenida, en lugar de fiarse
del orden de la lista, ya que el endpoint de etiquetas no documenta
ninguna garantía de orden, a diferencia del orden cronológico inverso de
Releases. Al igual que el resolvedor `github:` simple, solo conoce la
«última versión»: no hay fechas eol/support/lts, ya que el endpoint de
etiquetas no incluye ninguna. Consulte [Productos compatibles](/es/products/#aplicaciones-y-servicios-de-infraestructura)
para la variable de entorno `GITHUB_TOKEN`, que eleva el límite de
peticiones de este resolvedor.
