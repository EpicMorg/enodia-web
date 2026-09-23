---
title: Sonatype Nexus Repository
description: Configuración de enodia para sondear Sonatype Nexus Repository.
---

Lee la cabecera de respuesta `Server` que Nexus envía en todas las
respuestas (la misma forma que [nginx](/es/configuration/products/nginx/)/
[Apache](/es/configuration/products/apache/)), pero consultando el
endpoint de estado anónimo creado para ello en lugar de `/`, ya que ese
es una comprobación de estado rápida y sin cuerpo, no la página completa
del portal.

```yaml
targets:
  - id: nexus-main
    product: nexus
    address: https://nexus.example.com
```

## Autenticación

Ninguna: confirmado en vivo contra un contenedor `sonatype/nexus3` real:
`"Nexus/3.96.0-09 (COMMUNITY)"` tanto en el endpoint de estado como en
la página del portal y en un desafío `401` de otro endpoint que sí está
protegido. A diferencia de nginx/Apache, no hay documentada ni se
encontró ninguna opción de configuración para reducirlo a un simple
`"Nexus"`, pero esta sonda degrada a un error claro en lugar de fallar
de forma abrupta si alguna versión futura o una configuración con proxy
inverso llegara a hacerlo.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra` (la edición,
p. ej. `COMMUNITY`/`PRO`, se descarta, ya que `product: nexus` ya la
implica y no necesita registrarse por destino).

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:nexus`.
