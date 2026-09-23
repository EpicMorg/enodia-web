---
title: Redis
description: Configuración de enodia para sondear Redis.
---

Una sonda del protocolo RESP en bruto, no HTTP: `address` es `host` o
`host:port`, sin esquema. El puerto por defecto es `6379` si se omite. Lee
`redis_version` de `INFO server`.

```yaml
targets:
  - id: redis-main
    product: redis
    address: cache.example.com:6379
```

## Autenticación

Opcional: la mayoría de los despliegues de Redis no tienen `requirepass`,
y enodia no puede saber de antemano si un despliegue concreto lo tiene. Un
destino sin credencial configurada simplemente prueba primero `INFO` y
solo envía `AUTH` cuando el servidor rechaza realmente la petición simple
con `NOAUTH`.

```yaml
credentials:
  redis-auth:
    kind: password
    password: "${REDIS_PASSWORD}"

  # usuario ACL de Redis 6+: indique también username
  redis-acl-user:
    kind: password
    username: enodia_ro
    password: "${REDIS_PASSWORD}"
```

Una contraseña incorrecta o ausente cuando se requiere una se manifiesta
como un error de autenticación (`NOAUTH`/`WRONGPASS`), igual que en
cualquier otra sonda con credenciales.

## Campos registrados

Solo `version`: esta sonda no registra ningún campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:redis`.
