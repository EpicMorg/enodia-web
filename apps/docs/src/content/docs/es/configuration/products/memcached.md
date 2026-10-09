---
title: memcached
description: Configuración de enodia para sondear memcached.
---

Una sonda TCP en bruto sobre el protocolo de texto, no HTTP: `address` es
`host` o `host:port`, sin esquema. El puerto por defecto es `11211` si se
omite. Envía `version` y lee la respuesta de una línea, `VERSION 1.6.45`.

```yaml
targets:
  - id: memcached-01
    product: memcached
    address: cache.example.com:11211
```

## Autenticación

Ninguna: el protocolo de texto no tiene autenticación. Un servidor
iniciado con SASL (`-S`) solo habla el protocolo binario y responde al
comando de texto con un error; eso se notifica como no compatible en
lugar de intentar adivinar.

## Campos registrados

Solo `version`: p. ej. `1.6.45`. Esta sonda no registra ningún campo
`extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:memcached`.
