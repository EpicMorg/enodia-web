---
title: WordPress
description: Configuración de enodia para sondear WordPress.
---

Prueba dos superficies anónimas, en orden, y usa la que responda primero:

1. La propia línea `<generator>` del feed RSS (`/?feed=rss2`, la forma con
   cadena de consulta, que funciona independientemente de que haya
   configurados enlaces permanentes amigables).
2. La etiqueta `<meta name="generator" content="WordPress X.Y.Z" />` de la
   página de inicio (`/`).

```yaml
targets:
  - id: wordpress-main
    product: wordpress
    address: https://blog.example.com
```

## Autenticación

Ninguna: el endpoint no acepta ninguna forma de credencial.

## Por qué se prueba primero el feed

El feed sobrevive al paso de endurecimiento más habitual: WordPress
registra su etiqueta generator en los hooks del feed por separado de la
propia acción `wp_head` de la página de inicio, así que el fragmento de
una línea `remove_action('wp_head',
'wp_generator')` que da todo tutorial de «oculte su versión de WordPress»
solo elimina la etiqueta de la página de inicio, no la del feed;
confirmado leyendo los propios registros de hooks de WordPress, no
supuesto. Un sitio que haya ido más allá y haya desactivado por completo
los feeds, o eliminado ambas señales, termina en un error claro de «no
compatible».

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:wordpress`.
