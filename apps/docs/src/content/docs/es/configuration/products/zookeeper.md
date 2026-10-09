---
title: Apache ZooKeeper
description: Configuración de enodia para sondear Apache ZooKeeper.
---

Una sonda TCP en bruto sobre el puerto de cliente, no HTTP: `address` es
`host` o `host:port`, sin esquema. El puerto por defecto es `2181` si se
omite. Envía la palabra de cuatro letras `srvr` y lee la respuesta hasta
que el servidor cierra la conexión.

```yaml
targets:
  - id: zk-01
    product: zookeeper
    address: zk-01.example.com:2181
```

## Por qué `srvr`

ZooKeeper 3.5+ solo permite `srvr` por defecto
(`4lw.commands.whitelist`): `stat`, `mntr`, `ruok` y el resto responden
«is not executed because it is not in the whitelist». Si un servidor ha
quitado también `srvr` de la lista blanca, el destino falla como no
compatible. El AdminServer (HTTP, 8080) incluye los mismos datos, pero a
menudo no está expuesto; el puerto de cliente siempre lo está.

## Autenticación

Ninguna: las palabras de cuatro letras no tienen autenticación.

## Campos registrados

- `version`: p. ej. `3.9.6`, de
  `Zookeeper version: 3.9.6-a355171b081b5b60749db8f19cca1528b0df936f, built on 2026-09-03 19:29 UTC`
- `extra.git`: el hash de git de la compilación, cuando está presente
- `extra.mode`: la línea `Mode:`, p. ej. `standalone`

## Correlación de CVE

Se contrasta con NVD y BDU FSTEC cuando hay configurado un [bloque `cve:`](/es/cve/).

## Resolvedor del ciclo de vida

`endoflife:zookeeper`.
