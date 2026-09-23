---
title: Traefik
description: Configuración de enodia para sondear Traefik.
---

Lee `GET /api/version`.

```yaml
targets:
  - id: traefik-main
    product: traefik
    address: https://traefik.example.com
```

## Autenticación

Opcional. Confirmado en vivo contra un contenedor real `traefik:v3.1`: con
el router de la API habilitado (desactivado por defecto: en una instancia
estándar no se establece ni `--api` ni `--api.insecure`) bajo
`--api.insecure=true`, este endpoint no necesita credenciales. Un
despliegue que, en cambio, coloca el router de la API detrás de su propio
middleware de autenticación Basic/Digest (la forma «segura» documentada
por Traefik para exponerlo) responde con desafíos HTTP Basic normales:

```yaml
credentials:
  traefik-basic:
    kind: basic
    username: admin
    password: "${TRAEFIK_PASSWORD}"
```

Una instancia sin la API habilitada responde aquí `404`, lo que no se
distingue de una dirección incorrecta.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra` (`Codename` y
`startDate` describen la versión publicada, no el despliegue, y no se leen).

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:traefik`.
