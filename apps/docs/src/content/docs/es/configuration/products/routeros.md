---
title: MikroTik RouterOS
description: Configuración de enodia para sondear MikroTik RouterOS.
---

Lee `GET /rest/system/resource`, la API REST de RouterOS (RouterOS 7.1+;
el servicio `www`, activado por defecto en una instalación nueva, debe
estar habilitado).

```yaml
targets:
  - id: router-main
    product: routeros
    address: https://router.example.com
    credentials: routeros-admin
```

## Autenticación — obligatoria

Confirmado en vivo contra una VM real de CHR (Cloud Hosted Router) 7.24.2:
este endpoint siempre responde `401` sin credenciales, y la página anónima
de inicio de sesión de webfig en `/` tampoco incluye ningún texto de
versión. Se trata de la propia API de administración de un router, así que
exigir credenciales es la postura por defecto correcta, no una opción de
endurecimiento que haya que sortear.

```yaml
credentials:
  routeros-admin:
    kind: basic
    username: enodia-ro
    password: "${ROUTEROS_PASSWORD}"
```

El banner SSH (`"SSH-2.0-ROSSSH"`, confirmado en vivo) tampoco incluye
ninguna versión, lo que descarta un enfoque basado en el banner SSH como
el que usan [SSH](/es/configuration/products/ssh/)/[MySQL](/es/configuration/products/mysql/).

## Campos registrados

- `version`
- `extra.boardName`, `extra.architecture`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:routeros`.
