---
title: Apache Cassandra
description: Configuración de enodia para sondear Apache Cassandra.
---

Una sonda del protocolo nativo CQL, no HTTP: `address` es `host` o
`host:port`, sin esquema. El puerto por defecto es `9042` si se omite. Lee
`release_version` con `SELECT release_version FROM system.local`.

```yaml
targets:
  - id: cassandra-01
    product: cassandra
    address: cassandra-01.example.com:9042
```

## Protocolo

Cassandra no tiene API HTTP, así que enodia habla CQL directamente, sin
driver: `STARTUP`, después (solo cuando el servidor responde
`AUTHENTICATE`) una respuesta SASL PLAIN, y después la única consulta.
`OPTIONS`/`SUPPORTED`, el único intercambio previo a la autenticación,
incluye las versiones de CQL y del protocolo, pero no la del propio
servidor. Se usa la versión 4 del protocolo porque todas las versiones
compatibles de Cassandra la hablan: la 3.x, la 4.x y la 5.0 la aceptan,
mientras que la 3.11 rechaza la v5. Cassandra 2.x (como máximo v3) lleva
mucho tiempo sin soporte y no se intenta.

## Autenticación

Opcional, `kind: password`: solo se envía cuando el clúster la solicita
(`PasswordAuthenticator`). Consulte
[Configuración → Credenciales](/es/configuration/#credenciales).

```yaml
credentials:
  cassandra-ro:
    kind: password
    username: enodia_ro
    password: "${CASSANDRA_PASSWORD}"
```

Un clúster que requiere autenticación sin ninguna credencial configurada
falla con un error de autenticación que nombra su autenticador; unas
credenciales rechazadas también son un error de autenticación.

## Campos registrados

Solo `version`: p. ej. `5.0.9` o `3.11.19`. Esta sonda no registra ningún
campo `extra`.

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:apache-cassandra`.
