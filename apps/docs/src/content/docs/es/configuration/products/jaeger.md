---
title: Jaeger
description: Configuración de enodia para sondear Jaeger.
---

Lee la versión que el query-service de Jaeger (el componente que sirve la
interfaz, puerto 16686 de forma predeterminada) incrusta en su propio
`index.html` mediante una búsqueda y sustitución en tiempo de compilación:
no hay una API de versión aparte.

```yaml
targets:
  - id: jaeger-main
    product: jaeger
    address: https://jaeger.example.com
```

## Autenticación

Ninguna: Jaeger no tiene ninguna autenticación propia. Un despliegue
detrás de un proxy inverso o de una pasarela SSO (oauth2-proxy es una
opción habitual en la práctica) responde con una redirección al flujo de
inicio de sesión de esa pasarela en lugar del HTML de Jaeger, lo que se
manifiesta como el error «no JAEGER_VERSION found» de esta sonda: no es
algo que esta sonda pueda completar por sí sola, el mismo tipo de
limitación que tendría un producto con inicio de sesión por formulario.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:jaeger`.
