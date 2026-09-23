---
title: nginx
description: Configuración de enodia para sondear nginx.
---

Lee la cabecera de respuesta `Server` que nginx envía en todas las
respuestas. No hay endpoint de versión: nginx (a diferencia de la API
REST de NGINX Plus) no expone nada más de forma anónima; `/stub_status`
de `ngx_http_stub_status_module` ofrece contadores de conexiones, nunca
una versión.

```yaml
targets:
  - id: nginx-main
    product: nginx
    address: https://www.example.com
```

## Autenticación

Ninguna: se acepta cualquier código de estado, ya que nginx pone su
propia cabecera `Server` en las páginas de error y en las redirecciones
igual que en un `200`. Un destino cuyo `/` resulte dar 404 o esté detrás
de un vhost con autenticación Basic sigue informando la versión sin
problema. Confirmado en vivo contra contenedores `nginx:1.27.4` reales
para ambos casos.

## `server_tokens off` elimina la versión

El ajuste de endurecimiento propio de nginx (habitual en producción)
pone en la cabecera un simple `"nginx"` sin ninguna versión: un producto
confirmado sin nada que comparar con un calendario del ciclo de vida, no
un error del analizador.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:nginx`.
