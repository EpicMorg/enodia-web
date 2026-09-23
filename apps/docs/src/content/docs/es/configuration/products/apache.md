---
title: Apache HTTP Server
description: Configuración de enodia para sondear Apache HTTP Server.
---

Lee la cabecera de respuesta `Server` que Apache httpd envía en cada
respuesta; es el mismo tipo de problema que con [nginx](/es/configuration/products/nginx/):
no existe ningún endpoint de versión, y cualquier código de estado sigue
llevando la cabecera. Se acepta `product: httpd` como alias.

```yaml
targets:
  - id: apache-main
    product: apache
    address: https://www.example.com
```

## Autenticación

Ninguna: la cabecera `Server` se envía en cada respuesta, independientemente de la autenticación.

## `ServerTokens Prod` elimina la versión

Confirmado en vivo contra contenedores reales `httpd:2.4`: la compilación
por defecto responde `"Apache/2.4.68 (Unix)"`; `ServerTokens Prod` (la
directiva de endurecimiento propia de Apache, habitual en producción) lo
reduce a un simple `"Apache"` sin ninguna versión: un producto confirmado
sin nada que comparar con un calendario de ciclo de vida, no un error del
analizador.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:apache-http-server`: tanto `apache` como `httpd` redirigen con
un 301 a este slug en endoflife.date; enodia resuelve directamente el slug
de destino en lugar de dar ese salto adicional en cada consulta.
